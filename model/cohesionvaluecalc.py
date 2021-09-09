# !pip install soynlp

from soynlp.word import WordExtractor
from soynlp import DoublespaceLineCorpus

# from google.colab import drive
#
# drive.mount('/content/drive')

import numpy as np
import urllib.request

urllib.request.urlretrieve("https://raw.githubusercontent.com/lovit/soynlp/master/tutorials/2016-10-20.txt",
                           filename="2016-10-20.txt")
corpus = DoublespaceLineCorpus("2016-10-20.txt")
len(corpus)

# corpus = DoublespaceLineCorpus("/content/drive/MyDrive/Colab Notebooks/ASIBA/Organized/khist.txt")

word_extractor = WordExtractor()
word_extractor.train(corpus)
word_score_table = word_extractor.extract()
word_score = word_extractor.extract()

# scores = {word:score.cohesion_forward for word, score in word_score_table.items()}

# text_input = "금융감독원은 정부부처 중 하나로, 각종 금융거래의 흔적을 추적합니다."
text_input = "이번 프로모션은 소비자들에게 건강관리의 필요성을 알리고 생활에 활력을 선사하기 위한 체험 마케팅의 일환"

line_split_rmvd = text_input.replace("\n", '')  # 줄바꿈 제거
space_rmvd = line_split_rmvd.replace(" ", '')  # 띄어쓰기 제거
comma_rmvd = space_rmvd.replace(",", '')  # 쉼표 제거
question_rmvd = comma_rmvd.replace("?", '')  # 물음표 제거
exclamation_rmvd = question_rmvd.replace("!", '')  # 느낌표 제거

input_organized = exclamation_rmvd

temp_str = ""  # 빈 문자열. 입력 문자열을 한 글자씩 더해 가며 저장하기 위한 변수
outer_list = []  # 바깥 괄호. 안쪽에 cohesion_list 를 저장하기 위한 리스트.
cohesion_list = []  # 안쪽 리스트. 여기에 각 문자열의 cohesion 계산값이 저장됨.
str_list = []  # 한 글자씩 늘어나는  문자열이 리스트로 저장됨.

for i in range(len(input_organized)):  # 입력문자열의 길이 내에서
    temp_str += input_organized[i]  # 철자를 한 글자씩 더해 가면서 temp_str에 저장한다.
    # print(temp_str)

    try:
        temp_key = temp_str  # temp_str에 저장된 문자열을 temp_key로 정의함
        temp_value = word_score[temp_str].cohesion_forward  # temp_str에 저장된 문자열의 cohesion 값을 계산하여 temp_value 변수에 저장함.

        inner_list = [temp_key, temp_value]  # temp_key와 temp_value 를 1 * 2 사이즈의 리트스로 만들어서 inner_list 변수에 저장.

        outer_list.append((inner_list))  # inner_list 변수에 저장된 리스트를 다시 outer_list 리스트에 저장한다.
        # print(outer_list)

    except:  # 문자열이 유의미하지 않은 경우: 즉 cohesion 값이 없다면 에러 발생. 그 때 실행할 코드.
        # print(outer_list)

        for j in range(len(outer_list)):  # 에러가 발생한 문자열의 길이 내에서 계산해야 한다.
            cohesion_list.append(outer_list[j][1])
            str_list.append(outer_list[j][0])
            local_cohesion_max = max(cohesion_list)

        second_max = first_max = -float('inf')  # 최댓값, 두 번째 큰 값을 찾아서 그 값에 해당하는 문자열을 반환하는 코드.

        if cohesion_list != []:

            for n in cohesion_list:

                if n > first_max:
                    second_max = first_max
                    first_max = n

                elif second_max < n < first_max:
                    second_max = n

            print(cohesion_list)
            print(str_list)
            print('Max Value: ', local_cohesion_max)
            print("Second Max: ", second_max)

            if local_cohesion_max in cohesion_list:  # 위에서 찾은 값을 cohesion_list 에서 찾아서 그 인덱스 값과 같은 인덱스 값을 가진 문자열을 반환하는 코드
                print('최대값 인덱스: ', cohesion_list.index(local_cohesion_max))
                print('찾은 값: ', str_list[cohesion_list.index(local_cohesion_max)])

            if local_cohesion_max in cohesion_list:  # 위에서 찾은 값을 cohesion_list 에서 찾아서 그 인덱스 값과 같은 인덱스 값을 가진 문자열을 반환하는 코드
                print('두 번째 큰 값 인덱스: ', cohesion_list.index(second_max))
                print('두 번째 찾은 값: ', str_list[cohesion_list.index(second_max)])

        else:
            continue

        outer_list.clear()
        cohesion_list.clear()

        print("에러", i)
        temp_str = ""
        temp_str += input_organized[i]

        # continue*

    else:
        cohesion_list.clear()
        str_list.clear()