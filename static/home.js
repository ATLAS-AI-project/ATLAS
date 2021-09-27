window.onload= function() {
  if (localStorage.getItem('session') == 1){
    return 'ok'
  }else if (localStorage.getItem('session') == 2 || localStorage.getItem('session') == 3){
    alert('권한이 없습니다')
    window.location.href = 'http://127.0.0.1:5000/testlet_s'
  }else{alert('권한이 없습니다')
    window.location.href = 'http://127.0.0.1:5000/login'}
  }

function btnClick() {
    const inputText = $("#inputText").val();
    console.log(inputText)

    $.ajax({
        type: "POST",
        url: "/inputText",
        data: {data:inputText},
        async:true,
        success: function(response){
           console.log(response)
           glo_key = response['keyword']
           glo_count = response['count']
           glo_questions = response['questions']
        },
        beforeSend:function(){
            $('.wrap-loading').removeClass('display-none');
        },
        complete:function(){
            $('.wrap-loading').addClass('display-none');
            $("#head").empty()
            $("#head").append(`ATLAS 인공지능이 키워드를 추출했습니다.<br>아래 우측 박스에 문제로 만들 키워드를 선택하세요.`)
            $("#resultWindow").empty()
            $("#resultWindow").append(`
            <thead>
                <tr>
                <th>키워드</th><th>선택</th>
                </tr>
            </thead>`)
                for (let i =0; i< glo_key.length; i++) {
                    let result= glo_key[i];
                    $("#resultWindow").append(`
                    <tbody>
                    <tr>
                    <td>${result}</td>
                    <td><input type="checkbox" name= chkbox></td>
                    </tr>
                    </tbody>`)}
        }
    })
}

function inputTypeClick(obj) {
    console.dir(obj)
}

function btnClick1() {

   $("#resultWindow").empty()
   $("#resultWindow").append(`
   <thead>
       <tr>
          <th>키워드</th>
          <th>선택</th>
       </tr>
   </thead>`)
   for (let i =0; i< glo_key.length; i++) {
      let result= glo_key[i];
      $("#resultWindow").append(`
        <tbody>
          <tr>
            <td>${result}</td>
            <td><input type="checkbox" name= chkbox></td>
          </tr>
        </tbody>`)}
 }

function checkByte(obj){
    const maxByte = 3000; //최대 3000바이트
    const text_val = obj.value; //입력한 문자
    const text_len = text_val.length; //입력한 문자수

    let totalByte=0;
    for(let i=0; i<text_len; i++){
        const each_char = text_val.charAt(i);
        const uni_char = escape(each_char) //유니코드 형식으로 변환
        if(uni_char.length>4){
            // 한글 : 2Byte
            totalByte += 2;
        }else{
            // 영문,숫자,특수문자 : 1Byte
            totalByte += 1;
        }
    }

    if(totalByte>maxByte){
        alert('최대 3000Byte(1500자)까지만 입력가능합니다.');
            document.getElementById("nowByte").innerText = totalByte;
            document.getElementById("nowByte").style.color = "red";
        }else{
            document.getElementById("nowByte").innerText = totalByte;
            document.getElementById("nowByte").style.color = "green";
        }
}

function btnClick2(){
     $("#resultWindow").prop("checked", true);
     $("#resultWindow").prop("checked", false);
     const inputText = $("#inputText").val();
     console.log(inputText)
     idxes = []
     select_keyword = []
     select_question = []
     final_question = []

     $('input:checkbox[name=chkbox]').each(function() {
        if(this.checked){
           idx = $('input:checkbox[name=chkbox]').index(this);
           idxes.push(idx);
         }
     })
     $("#resultWindow").empty()
     idxes.forEach(function(idx) {
        console.log(glo_key)
        select_keyword.push(glo_key[idx])
        console.log(select_keyword)
        select_question.push(glo_questions[idx])
        console.log(select_question)
//            $("#resultWindow").append(`<tr><td>${select_keyword}</td><td>${select_question}</td></tr>`)
    })
     for (let i =0; i< select_question.length; i++) {
        questionToString = select_question[i].toString()
        console.log(questionToString)
        change = questionToString.replaceAll(select_keyword[i], '___________')
        change2 = change.replaceAll('.,', '.\n\n')
        final_question.push(change)
    }
        console.log(final_question)
    localStorage.setItem('key',JSON.stringify(glo_key))
    localStorage.setItem('count',JSON.stringify(glo_count))
    localStorage.setItem('questions',JSON.stringify(glo_questions))
    localStorage.setItem('select_keyword',JSON.stringify(select_keyword))
    localStorage.setItem('select_question',JSON.stringify(select_question))
    localStorage.setItem('final_question',JSON.stringify(final_question))
    window.location.href = 'http://127.0.0.1:5000/quiz'
 }

function listbtn() {
  window.location.href = 'http://127.0.0.1:5000/testlet_t'
}

function gradebtn() {
    window.location.href = 'http://127.0.0.1:5000/grades'
}
