# -*- coding: utf-8 -*-
# TextBlanker의 입력값이 lecture는 강의 텍스트, keywords는 강의자가 선택한 키워드 str
# lecture에 들어갈 텍스트를 직접 넣을 수 있고 여러개의 키워드 str을 받을 수 있는 코드
class TextBlanker:
    def __init__(self, lecture, keywords):
        self.lecture = lecture
        self.keywords = keywords


#키워드 선택하는 함수입니다.
    def Select(self):
        lines = self.lecture.split(".")
        keyword_sentence = []
        count_dic = {}

        for i in range(len(self.keywords)):
            count = 0
            for each_line in lines:
                if each_line.find(self.keywords[i])>=0:
                    keyword_sentence.append(each_line)
                    keyword_sentence.append(self.keywords[i])
                    count +=1
                else:
                    pass
            count_dic[self.keywords[i]] = count
            count = 0
        # print(count_dic)
        # 키워드 및 키워드를 포함한 문장 개수 산출

        zero_keywords = []  # 키워드로 추출되었으나 실제 출현한 문장이 0개인 것들을 저장할 리스트
        for i in range(len(count_dic)):
            if count_dic[self.keywords[i]] == 0:
                zero_keywords.append(self.keywords[i])
        # print(zero_keywords)

        finded_keywords = []  # 띄어쓰기 제거 후 원래 문장을 찾은 키워드
        for i in range(len(zero_keywords)):
            Replaced = zero_keywords[i].replace(" ", "")
            count_zero = 0
            for each_line in lines:
                if each_line.find(Replaced)>=0:
                    count_zero += 1
                else:
                    pass
            if count_zero > 0:
                count_dic[Replaced] = count_dic.pop(zero_keywords[i])
                count_dic[Replaced] = count_zero
                count_zero = 0
                finded_keywords.append(zero_keywords[i])
            else:
                pass
        # print(finded_keywords)
        for i in range(len(finded_keywords)):
            zero_keywords.remove(finded_keywords[i])

        # 띄어쓰기 제거 후 키워드 추출

        # print(zero_keywords)
        fixed_zero_keywords = []  # 같은 단어가 제거된 키워드
        fixed_finded_keywords = []  # 제거된 키워드 중 발견된 키워드
        for i in range(len(zero_keywords)):
            splited_zero_keywords = zero_keywords[i].split()
            non_list = []
            for j in range(len(splited_zero_keywords)):
                if (zero_keywords[i].count(splited_zero_keywords[j])>=1 and (splited_zero_keywords[j]) not in non_list):
                    non_list.append(splited_zero_keywords[j])
            # print(" ".join(non_list))
            fixed_zero_keywords.append(" ".join(non_list))

        for i in range(len(fixed_zero_keywords)):
            fixed_count_zero = 0
            for each_line in lines:
                if each_line.find(fixed_zero_keywords[i])>=0:
                    fixed_count_zero += 1
                else:
                    pass
            if fixed_count_zero > 0:
                count_dic[fixed_zero_keywords[i]] = count_dic.pop(zero_keywords[i])
                count_dic[fixed_zero_keywords[i]] = fixed_count_zero
                fixed_count_zero = 0
                fixed_finded_keywords.append(fixed_zero_keywords[i])
            else:
                pass
        # print(fixed_finded_keywords)
        for i in range(len(fixed_finded_keywords)):
            fixed_zero_keywords.remove(fixed_finded_keywords[i])


        # 완전히 같은 단어 제거 후 키워드 추출

        # print(fixed_zero_keywords)

        # print(count_dic)

        Sel_keywords = []
        # Return_keywords = []
        for key, values in count_dic.items():
            # print(f'입력된 문장속에 <{key}>는 총 <{values}>개 있습니다')
            # print(f'<{key}>를 선택하시겠습니까?')
            # info_answer = print(f'입력된 문장속에 <{key}>는 총 <{values}>개 있습니다')
            # select_answer = print(f'<{key}>를 선택하시겠습니까?'
            if count_dic[key] != 0:
                Sel_keywords.append(key)
            else:
                pass

        print(Sel_keywords)

        results = []
        question_for_keywords = []
        lines = self.lecture.split(".")
        for keyword in Sel_keywords:
            keyword_sentence = []
            for each_line in lines:
                if each_line.find(keyword) >=0:
                    keyword_sentence.append(each_line + '.\n')
                else:
                    pass
            question_for_keywords.append(keyword_sentence)
        keyword_sentence.append('.') 


        key = count_dic.keys()
        key_list = []
        value_list = []
        print(value_list)
        for i in key:
            if count_dic[i] != 0:
                key_list.append(i)
                value_list.append(count_dic.get(i))

        coupang = dict(keyword = key_list, count = value_list, questions = question_for_keywords)
        print(coupang)

        return coupang
        # Return_keywords = Sel_keywords
        # print(Return_keywords)
        # return info_answer, select_answer, Sel_keywords 퀴즈 생성


    def Multi_Quiz(self):
        print('POP UP QUIZ!!')
        print('다음 빈 칸에 들어갈 적절한 단어는 무엇일까요?')
        print()
        # for num in range(len(Please)):
        #     print(Please[num])

        for order in range(len(self.result)):
            correct_answer = self.result[order][1]
            print(f'{order + 1}번 문제')
            for num in range(len(self.result[order][0])):
                quiz = self.result[order][0][num].lstrip()
                quiz = quiz.rstrip()
                # print(f'{num+1}번 문제')
                print(quiz)

                # 학습자의 정답을 입력 받고 출력해줌
            print()
            student_answer = input()
            print(f'student_answer = {student_answer}')
            if student_answer == correct_answer:
                print('정답입니다!!\n')
            else:
                print('\n오답입니다.')
                print(f'정답은 {correct_answer} 입니다. \n')

    # result에 들어가야 할 것은 TextBlanker의 결과를 받는 변수()
    # 선택된 하나의 키워드에 대한 퀴즈 생성
    def Single_Quiz(self):
        print('POP UP QUIZ!!')
        print('다음 빈 칸에 들어갈 적절한 단어는 무엇일까요?')
        print()
        # for num in range(len(Please)):
        #     print(Please[num])
        print(self.result[1])
        print('k')
        print(self.result[0])
        correct_answer = self.result[1]
        for num in range(len(self.result[0])):
            quiz = self.result[0][num].lstrip()
            quiz = quiz.rstrip()
            print(f'{num + 1}번 문제')
            print(quiz)

        student_answer = input()
        print(f'student_answer = {student_answer}')
        if student_answer == correct_answer:
            print('정답입니다!!')
        else:
            print('오답입니다.')
