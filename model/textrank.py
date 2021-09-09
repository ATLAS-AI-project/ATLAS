import networkx
import re
import jpype
import konlpy

# 문장읽기
class RawSentence:
    def __init__(self, textIter):
        if type(textIter) == str:
            self.textIter = textIter.split('\n')
        else:
            self.textIter = textIter
        self.rgxSplitter = re.compile('([.!?:](?:["\']|(?![0-9])))')

    def __iter__(self):
        for line in self.textIter:
            ch = self.rgxSplitter.split(line)  # 특수부호를 기준으로 라인 split함.
            for s in map(lambda a, b: a + b, ch[::2],
                         ch[1::2]):  # 함수 / a 짝수라인 / b 홀수라인  --> 결국 문장부호 단위로 한 줄씩 나눠진 문자열 생성
                if not s: continue
                yield s

            # 파일로 문장 읽어오기


class RawSentenceReader:
    def __init__(self, filepath):
        self.filepath = filepath
        self.rgxSplitter = re.compile('([.!?:](?:["\']|(?![0-9])))')

    def __iter__(self):
        for line in open(self.filepath, encoding='utf-8'):
            ch = self.rgxSplitter.split(line)
            for s in map(lambda a, b: a + b, ch[::2], ch[1::2]):
                if not s: continue
                yield s


# 품사읽기
class RawTaggerReader:
    def __init__(self, filepath, tagger=None):
        if tagger:
            self.tagger = tagger
        else:
            from konlpy.tag import Komoran
            self.tagger = Komoran()
        self.filepath = filepath
        self.rgxSplitter = re.compile('([.!?:](?:["\']|(?![0-9])))')

    def __iter__(self):
        for line in open(self.filepath, encoding='utf-8'):
            ch = self.rgxSplitter.split(line)
            for s in map(lambda a, b: a + b, ch[::2], ch[1::2]):
                if not s: continue
                yield self.tagger.pos(s)


class TextRank:
    def __init__(self, **kargs):
        # kargs가 중요한게 아니라 **가 중요함. 변수는 딕셔너리로 처리
        # *변수는 변수를 튜플로 처리
        # 함수 파라미터 작성은 일반 변수 - * - ** 순서로 해야 함
        self.graph = None
        self.window = kargs.get('window', 5)  # get() 통해 초기값 설정
        self.coef = kargs.get('coef', 1.0)
        self.threshold = kargs.get('threshold', 0.005)
        self.dictCount = {}
        self.dictBiCount = {}
        self.dictNear = {}
        self.nTotal = 0

    def load(self, sentenceIter, wordFilter=None):
        def insertPair(a, b):
            if a > b:
                a, b = b, a  # 작은 것부터 큰 것으로 정렬하려는 것 같은데.. 왠지 모르겠네
            elif a == b:
                return
            self.dictBiCount[a, b] = self.dictBiCount.get((a, b), 0) + 1

        def insertNearPair(a, b):
            self.dictNear[a, b] = self.dictNear.get((a, b), 0) + 1

        for sent in sentenceIter:
            for i, word in enumerate(sent):
                if wordFilter and not wordFilter(word): continue
                self.dictCount[word] = self.dictCount.get(word, 0) + 1
                self.nTotal += 1
                if i - 1 >= 0 and (not wordFilter or wordFilter(sent[i - 1])): insertNearPair(sent[i - 1], word)
                if i + 1 < len(sent) and (not wordFilter or wordFilter(sent[i + 1])): insertNearPair(word, sent[i + 1])
                for j in range(i + 1, min(i + self.window + 1, len(sent))):
                    if wordFilter and not wordFilter(sent[j]): continue
                    if sent[j] != word: insertPair(word, sent[j])

    def loadSents(self, sentenceIter, tokenizer=None):
        import math
        def similarity(a, b):
            n = len(a.intersection(b))
            return n / float(len(a) + len(b) - n) / (math.log(len(a) + 1) * math.log(len(b) + 1))

        if not tokenizer: rgxSplitter = re.compile('[\\s.,:;-?!()"\']+')
        sentSet = []
        for sent in filter(None, sentenceIter):
            if type(sent) == str:
                if tokenizer:
                    s = set(filter(None, tokenizer(sent)))
                else:
                    s = set(filter(None, rgxSplitter.split(sent)))
            else:
                s = set(sent)
            if len(s) < 2: continue
            self.dictCount[len(self.dictCount)] = sent
            sentSet.append(s)

        for i in range(len(self.dictCount)):
            for j in range(i + 1, len(self.dictCount)):
                s = similarity(sentSet[i], sentSet[j])
                if s < self.threshold: continue
                self.dictBiCount[i, j] = s

    def getPMI(self, a, b):
        import math
        co = self.dictNear.get((a, b), 0)
        if not co: return None
        return math.log(float(co) * self.nTotal / self.dictCount[a] / self.dictCount[b])

    def getI(self, a):
        import math
        if a not in self.dictCount: return None
        return math.log(self.nTotal / self.dictCount[a])

    def build(self):
        import networkx
        self.graph = networkx.Graph()
        self.graph.add_nodes_from(self.dictCount.keys())
        for (a, b), n in self.dictBiCount.items():
            self.graph.add_edge(a, b, weight=n * self.coef + (1 - self.coef))

    def rank(self):
        import networkx
        return networkx.pagerank(self.graph, weight='weight')

    def extract(self, ratio=0.1):
        ranks = self.rank()
        cand = sorted(ranks, key=ranks.get, reverse=True)[:int(len(ranks) * ratio)]
        pairness = {}
        startOf = {}
        tuples = {}
        for k in cand:
            tuples[(k,)] = self.getI(k) * ranks[k]
            for l in cand:
                if k == l: continue
                pmi = self.getPMI(k, l)
                if pmi: pairness[k, l] = pmi

        for (k, l) in sorted(pairness, key=pairness.get, reverse=True):
            # print(k[0], l[0], pairness[k, l])
            if k not in startOf: startOf[k] = (k, l)

        for (k, l), v in pairness.items():
            pmis = v
            rs = ranks[k] * ranks[l]
            path = (k, l)
            tuples[path] = pmis / (len(path) - 1) * rs ** (1 / len(path)) * len(path)
            last = l
            while last in startOf and len(path) < 7:
                if last in path: break
                pmis += pairness[startOf[last]]
                last = startOf[last][1]
                rs *= ranks[last]
                path += (last,)
                tuples[path] = pmis / (len(path) - 1) * rs ** (1 / len(path)) * len(path)

        used = set()
        both = {}
        for k in sorted(tuples, key=tuples.get, reverse=True):
            if used.intersection(set(k)): continue
            both[k] = tuples[k]
            for w in k: used.add(w)

        # for k in cand:
        #    if k not in used or True: both[k] = ranks[k] * self.getI(k)

        return both

    def summarize(self, ratio=0.333):
        r = self.rank()
        ks = sorted(r, key=r.get, reverse=True)[:int(len(r) * ratio)]
        return ' '.join(map(lambda k: self.dictCount[k], sorted(ks)))


class RawTagger:
    def __init__(self, textIter, tagger=None):
        import re
        if tagger:
            self.tagger = tagger
        else:
            from konlpy.tag import Komoran  # 형태분석기 Komoran 사용. 필요시 변경할 것
            self.tagger = Komoran()
        if type(textIter) == str:
            self.textIter = textIter.split('\n')
        else:
            self.textIter = textIter
        self.rgxSplitter = re.compile('([.!?:](?:["\']|(?![0-9])))')

    def __iter__(self):
        for line in self.textIter:
            ch = self.rgxSplitter.split(line)
            for s in map(lambda a, b: a + b, ch[::2], ch[1::2]):
                if not s: continue
                yield self.tagger.pos(s)


class Runner:
    def __init__(self, window, coef, extract):
        self.window = window
        self.coef = coef
        self.extract = extract

    def Run(self, final_result):
        list_result = []
        Speech_result = ""
        strText = final_result
        tr = TextRank(window=self.window, coef=self.coef)  # 여기서 window, coef 변경하면서
        # print('Load...')
        stopword = set([('있', 'VV'), ('하', 'VV'), ('되', 'VV'), ('없', 'VV')])
        tr.load(RawTagger(strText), lambda w: w not in stopword and (w[1] in ('NNG', 'NNP')))
        # print('Build...')
        tr.build()
        kw = tr.extract(self.extract)
        for k in sorted(kw, key=kw.get, reverse=True):
            # print("%s\t%g" % (k, kw[k]))
            # print(k)
            if len(k) == 2:
                Speech_result = k[0][0] + " " + k[1][0]
                list_result.append(Speech_result)
            else:
                list_result.append(k[0][0])

        #   print(c)
        return list_result

    def Save_file_Txt(self, list_result, file_name):  # KoBart와 달리 따로 저장 기능을 준 이유는 TextRank는 전체 문장을 받아오기 때문
        final_result_key = ""
        for i in range(len(list_result)):
            final_result_key += list_result[i]
            final_result_key += '\n'

        # with open("/content/drive/MyDrive/txt_data/" + file_name + ".txt", 'w') as text_file:
        #     text_file.write(final_result_key)

        print("Job Done")

    def Save_folder_file_Txt(self, list_result, folder_name,
                             file_name):  # KoBart와 달리 따로 저장 기능을 준 이유는 TextRank는 전체 문장을 받아오기 때문
        final_result_key = ""
        for i in range(len(list_result)):
            final_result_key += list_result[i]
            final_result_key += '\n'

        # with open("/content/drive/MyDrive/txt_data/" + folder_name + "/" + folder_name + file_name + ".txt",
        #           'w') as text_file:
        #     text_file.write(final_result_key)

        print("Job Done")