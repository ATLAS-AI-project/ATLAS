# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, jsonify
import model.Kobart as KB
import model.textrank as TR
# import model.textdivide as TD
import model.sentenceextraction as SE
import pymysql

app = Flask(__name__)

db = pymysql.connect(host='localhost', port=3306, user='root', passwd='123123', db='ATLAS', charset="utf8")
cursor = db.cursor()

# ------ Kobart, TextRank 조건 설정 -----#
KBR = KB.Runner(eos_token_id=1, max_length=500, num_beams=5)
TRR = TR.Runner(window=5, coef=1, extract=0.5)

@app.route("/", methods=["GET"])
def startpage(): # 페이지에서 값을 받아오는 메소드
    return render_template('atlas_start.html')

@app.route("/login", methods=["GET"])
def login_page():
    return render_template('login.html')

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

@app.route("/inputText", methods=["POST"])  # postman - body 체크!
def insert_text():
# single text(textarea)를 받아서 Kobart로 요약, TextRank로 키워드 추출
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

@app.route("/testlet_t", methods=["GET"])
# 선생님용 문제지 리스트 페이지
def testlet_t_page():
    return render_template('testlet_t.html')

@app.route("/testlet_s", methods=["GET"])
# 학생용 문제지 리스트 페이지
def testlet_s_page():
    return render_template('testlet_s.html')

@app.route("/grades", methods=["GET"])
def grades_page():
    return render_template('grades.html')

@app.route("/quiz_s", methods=["GET"])
def quiz_s_page():
    return render_template('quiz_s.html')

@app.route("/quiz_t", methods=["GET"])
def quiz_t_page():
    return render_template('quiz_t.html')

@app.route("/atlas_join", methods=["GET"])
def atlas_join_page():
    return render_template('atlas_join.html')

@app.route("/join_submit", methods=["GET"])
def join_submit():
    return render_template('pageSelect.html')

@app.route("/save", methods=["POST"])  #데이터를 저장하는 기능
def save_page():
    blank_q_name = request.form["blank_q_name"]
    blank_q = request.form["blank_q"]
    answer = request.form["answer"]
    print('문제: ' + blank_q)
    print('문제지이름: ' + blank_q_name)
    print('키워드(정답): ' + answer)
    sql = f"""
        insert into questions (answer, blank_q, blank_q_name) values ('%s','%s','%s');
        """ % (answer, blank_q, blank_q_name)
    # f를 붙이는 것은 뒤에 나오는 변수 %s, $s, %s 를 """ """ 안에서도 실제 변수로 받기 위해서이다.
    # """ """ 기호는 """ """ 안에 위치한 글자를 보이는 그대로 전송한다.
    cursor.execute(sql)
    db.commit()
    return "OK"

@app.route("/list", methods=["GET"])
def list_page():
    sql = """select * from questions"""
    cursor.execute(sql)
    results = cursor.fetchall()
    questions_dict = []
    for result in results:
        questions_dict.append({
            'index': result[0],
            'blank_q_name': result[1],
            'blank_q': result[2],
            'answer': result[3]
        })
    print(questions_dict)
    return jsonify(questions_dict)

@app.route("/delete", methods=["DELETE"])
def delete_page():
    index = request.args.get("index")
    sql = """
        delete from questions where id = %s
    """ % index
    cursor.execute(sql)
    db.commit()
    return "OK"

@app.route("/join", methods=["POST"])
def join_page():
    id = request.form["id"]
    print('아이디=' + id)
    password = request.form["password"]
    print('비밀번호=' + password)
    user_name = request.form["user_name"]
    print('회원의 이름=' + user_name)
    school_name = request.form["school_name"]
    print('학교명=' + school_name)
    year_born = request.form["year_born"]
    print('태어난 년도=' + year_born)
    month_born = request.form["month_born"]
    print('태어난 달=' + month_born)
    day_born = request.form["day_born"]
    print('태어난 일=' + day_born)
    user_status = request.form["teacher_or_student"]
    print('회원의 신분(1=선생,2=학생,3=일반)=' + user_status)
    sql = f"""
            insert into user_info (user_id, password, user_name, school_name, year_born, month_born, day_born, user_status) values ('%s','%s','%s','%s','%s','%s','%s','%s');
            """ % (user_id, password, user_name, school_name, year_born, month_born, day_born, user_status)
    cursor.execute(sql)
    db.commit()
    return "OK"

@app.route("/session", methods=["GET"])
def login_sessions():
    sql = """select * from user_info"""
    cursor.execute(sql)
    results = cursor.fetchall()
    login_session = []
    for result in results:
        login_session.append({
            'id': result[1],
            'password': result[2],
            'status': result[8]
        })
    print(login_session)
    return jsonify(login_session)

if __name__ == "__main__":
    app.run(debug=True)
