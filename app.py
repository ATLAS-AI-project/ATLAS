# -*- coding: utf-8 -*-
from flask import Flask, render_template, request
import model.Kobart as KB
import model.textrank as TR
# import model.textdivide as TD
import model.sentenceextraction as SE

app = Flask(__name__)

# ------ Kobart, TextRank 조건 설정 -----#
KBR = KB.Runner(eos_token_id=1, max_length=500, num_beams=5)
TRR = TR.Runner(window=5, coef=1, extract=0.5)

@app.route("/", methods=["GET"])
def startpage(): # 페이지에서 값을 받아오는 메소드
    return render_template('atlas_start.html')

@app.route("/home", methods=["GET"])
def mainpage(): # 페이지에서 값을 받아오는 메소드
    return render_template('home.html')

@app.route("/pageSelect", methods=["GET"])
def pageSelect(): # 페이지에서 값을 받아오는 메소드
    return render_template('pageSelect.html')

# @app.route("/result", methods=["POST","GET"]) # 페이지에서 값을 받아오는 메소드
# def result():
#     if request.method == 'POST': # 만약 페이지에서 보내는 것이 POST 메소드 타입이라면
#         result = request.form # 결과 값을 result에 담아준다.
#         print(result.get('text')) # 이 데이터가 사용자가 입력한 정보
#         output = TextRank_Runner.TextRank_Run # 글자 추출 모델  * 주의 할 점 TextRank_Run 뒤에 ()를 붙이면 안된다.
#         print(output(result.get('text'))) # 글자 추출 결과
#         return render_template('index.html', result=result)

@app.route("/inputText", methods=["POST"]) #postman - body 체크!
def insert_text():
# ------ single text(textarea)받아서 Kobart로 요약, TextRank로 키워드 추출 -----#
    inputText = request.form["data"]
    print(inputText)
    KB_Result = KBR.Run_Single_Text(text=inputText)
    TR_Result = TRR.Run(final_result=KB_Result)
    print(TR_Result)
    toStr = " / ".join(TR_Result)
    print(toStr)
    SEB = SE.TextBlanker(inputText, TR_Result)
    coupang = SEB.Select()
    return coupang

@app.route("/quiz", methods=["GET"])
def quiz_page():
    return render_template('quiz.html')

if __name__ == "__main__":
    app.run(debug=True) #http://127.0.0.1:5000/