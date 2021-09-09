# -*- coding: utf-8 -*-
from flask import Flask, render_template, request
import model.Kobart as KB
import model.textrank as TR
import model.textdivide as TD
import model.sentenceextraction as SE

app = Flask(__name__)

@app.route("/", methods=["GET"])
def main_page():
    return render_template('home.html')

@app.route("/inputText", methods=["POST"]) #postman - body 체크!
def insert_text():
# ------ Kobart, TextRank 조건 설정 -----#
    KBR = KB.Runner(eos_token_id=1, max_length=500, num_beams=5)
    TRR = TR.Runner(window=5, coef=1, extract=0.3)
# ------ single text(textarea)받아서 Kobart로 요약, TextRank로 키워드 추출 -----#
    inputText = request.form["data"]
    print(inputText)
    KB_Result = KBR.Run_Single_Text(text=inputText)
    TR_Result = TRR.Run(final_result=KB_Result)
    print(TR_Result)
    Sel_TR_Result = SE.TextBlanker(lecture=inputText, keywords=TR_Result).Select()
    # toStr = ",".join(TR_Result)
    # print(toStr)
    # return toStr
    return Sel_TR_Result


if __name__ == "__main__":
    app.run(debug=True) #http://127.0.0.1:5000/