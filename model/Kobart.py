# -*- coding: utf-8 -*-

class Runner:
    def __init__(self, eos_token_id, max_length, num_beams):
        self.eos_token_id = eos_token_id
        self.max_length = max_length
        self.num_beams = num_beams

    def Run_Single_Text(self, text):  # 텍스트가 한 개일 때. 하단 text 부분에 텍스트를 넣고 결과 출력할 것.
        import torch
        from kobart import get_kobart_tokenizer
        #from kobart_transformers import get_kobart_tokenizer    #파이썬패키지  kobart_transformers 를 사용할경우 사용
        from transformers.models.bart import BartForConditionalGeneration  

        list_changer = []
        final_result = ""

        def load_model():
            model = BartForConditionalGeneration.from_pretrained("./kobart_summary" )
#             model = BartForConditionalGeneration.from_pretrained("hyunwoongko/kobart")
            # tokenizer = get_kobart_tokenizer()
            return model

        model = load_model()
        tokenizer = get_kobart_tokenizer()
        #` 저장된 파일을 불러와서 처리해도 되고 하단 text에 직접 입력값으로 넣어도 됨.
        # f = open("/content/drive/MyDrive/txt_data/" + folder_name + "/" + folder_name + "-" + str(i) + ".txt", "r")
        # text = f.read()
        # print(text)
        # f.close()

        text = text.replace('\n', '')
        input_ids = tokenizer.encode(text)
        input_ids = torch.tensor(input_ids)
        input_ids = input_ids.unsqueeze(0)

        # 원문 글의 길이에 따라 max_length 조절
        output = model.generate(input_ids, eos_token_id=self.eos_token_id, max_length=self.max_length,
                                num_beams=self.num_beams)
        output = tokenizer.decode(output[0], skip_special_tokens=True)
        print(output)
        list_changer.append(output)

        final_result = ""
        for i in range(len(list_changer)):
            final_result += list_changer[i]  # [] 형식 --> ""형식
            final_result += ' '  # 문장 간에 띄어쓰기 삽입

        # with open("/content/drive/MyDrive/txt_data/KoBart_Single_Text.txt", 'w') as text_file:
        #     text_file.write(final_result)

        return final_result  # 결과 확인: output([]) 또는 final_result("")

    def Run_Multi_Text(self, folder_name, OrNum):  # 텍스트가 여러 개인 경우. text_divder와 함께 사용해야 함.
        import torch
        from kobart_transformers import get_kobart_tokenizer
        from transformers.models.bart import BartForConditionalGeneration
        list_changer = []
        final_result = ""

        def load_model():
            model = BartForConditionalGeneration.from_pretrained("./kobart_summary" )
#             model = BartForConditionalGeneration.from_pretrained("hyunwoongko/kobart")
            tokenizer = get_kobart_tokenizer()
            return model

        model = load_model()
        tokenizer = get_kobart_tokenizer()

        for i in range(OrNum):
            # f = open("/content/drive/MyDrive/txt_data/" + folder_name + "/" + folder_name + "-" + str(i) + ".txt", "r")
            # text = f.read()
            # print(text)
            # f.close()

            text = text.replace('\n', '')  # 오류가 발생해서 잠시 주석화
            input_ids = tokenizer.encode(text)
            input_ids = torch.tensor(input_ids)
            input_ids = input_ids.unsqueeze(0)

            # 원문 글의 길이에 따라 max_length를 조절
            output = model.generate(input_ids, eos_token_id=self.eos_token_id, max_length=self.max_length,
                                    num_beams=self.num_beams)
            output = tokenizer.decode(output[0], skip_special_tokens=True)
            print(output)
            list_changer.append(output)

        for i in range(len(list_changer)):
            final_result += list_changer[i]
            final_result += ' '

        # with open("/content/drive/MyDrive/txt_data/" + folder_name + "/" + folder_name + "TextRank_1_5.txt", 'w') as text_file:
        #     text_file.write(final_result)

        return final_result  # 결과 확인: output([]) 또는 final_result("")
