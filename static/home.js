function btnClick() {
    const inputText = $("#inputText").val();
    console.log(inputText)
//     const response = {
//   "count": [
//     1,
//     3,
//     4,
//     1,
//     1,
//     2,
//     1,
//     2,
//     1,
//     2
//   ],
//   "keyword": [
//     "\ubb34\uc778 \uc138\ub825",
//     "\uc544\ub4e4",
//     "\uc655\uc704",
//     "\uce21\uadfc",
//     "\ucd94\ub300",
//     "\uace0\ub824",
//     "\uc2e0\ud765",
//     "\uacf5\uc591\uc655",
//     "\uc591\ub825",
//     "\uc774\uc131\uacc4"
//   ],
//   "questions": [
//     [
//       "\uc774\uc790\ucd98\uc758 \uc544\ub4e4\uc774\uc790 \uace0\ub824\uc758 \uc2e0\ud765 \ubb34\uc778 \uc138\ub825\uc774\uc5c8\ub358 \uc774\uc131\uacc4\ub294 1388\ub144 \uc704\ud654\ub3c4 \ud68c\uad70\uc73c\ub85c \uad70\uc0ac\uc815\ubcc0\uc744 \uc77c\uc73c\ucf30\ub2e4"
//     ],
//     [
//       "\uc774\uc790\ucd98\uc758 \uc544\ub4e4\uc774\uc790 \uace0\ub824\uc758 \uc2e0\ud765 \ubb34\uc778 \uc138\ub825\uc774\uc5c8\ub358 \uc774\uc131\uacc4\ub294 1388\ub144 \uc704\ud654\ub3c4 \ud68c\uad70\uc73c\ub85c \uad70\uc0ac\uc815\ubcc0\uc744 \uc77c\uc73c\ucf30\ub2e4",
//       "\n\n\ud615 \uc815\uc885\uc744 \uaf2d\ub450\uac01\uc2dc\ub85c \uc138\uc6e0\ub2e4\uac00 \uace7 \uc655\uad8c\uc744 \uc591\uc704 \ubc1b\uc740 \ud0dc\uc870\uc758 \uc544\ub4e4 \uc774\ubc29\uc6d0(\ud0dc\uc885)\uc740 \ud2b9\uad8c\uce35\uc774 \uc18c\uc720\ud558\uace0 \uc788\ub294 \uac1c\uc778 \uc0ac\ubcd1\ub4e4\uc744 \uac15\uc81c \ud574\uc0b0\ud558\uc5ec \uc870\uc120\uad70\uc5d0 \ud3b8\uc785\ud558\uace0 \ud638\ud328\ubc95\uc744 \uc2e4\uc2dc\ud558\uba70 \uc655\uad8c\uc744 \ub300\ud3ed \uac15\ud654\ud558\uc600\uace0, \uc815\ub3c4\uc804\uc744 \uc554\uc0b4\ud55c \ub4a4 \uad00\ub8cc \uc81c\ub3c4\ub97c \uc7ac\uc0c1 \uc911\uc2ec \uc758\uc815\ubd80\uc11c\uc0ac\uc81c\uc5d0\uc11c \uc784\uae08 \uc911\uc2ec\uc778 \uc721\uc870\uc9c1\uacc4\uc81c\ub85c \uac1c\ud3b8\ud558\uc600\ub2e4",
//       " \uc138\uc885\ub300\uc655\uc740 1443\ub144 \uc9d1\ud604\uc804\uc744 \uad81\ub0b4\uc5d0 \uc124\uce58\ud558\uc5ec \ud559\ubb38\uc744 \uc7a5\ub824\ud558\uace0, \uc7a5\uc601\uc2e4\uc744 \ub4f1\uc6a9\ud558\uc5ec \uc544\ub4e4 \ubb38\uc885\uacfc \ud568\uaed8 \uacfc\ud559 \ubc1c\uc804\uc5d0 \ud798\uc37c\uace0, \ud6c8\ubbfc\uc815\uc74c\uc744 \ucc3d\uc81c\ud558\uba70 \uc560\ubbfc\uc815\uce58\ub97c \ud3bc\ucce4\ub2e4"
//     ],
//     [
//       " \uadf8\ub294 \ucc3d\uc655\u00b7\uacf5\uc591\uc655\uc744 \uc655\uc704\uc5d0 \uc62c\ub838\ub2e4\uac00 \uc2e0\ub3c8\uc758 \uc0ac\uc0dd\uc544\ub77c\uace0 \uc0ac\uac74\uc744 \uc870\uc791\ud558\uc5ec \ud3d0\uc704\ud558\ub294 \ub4f1 \uc815\uad8c\u00b7\uad70\uad8c\u00b7\uacbd\uc81c\uad8c\uc744 \ud589\uc0ac\ud558\uc600\uace0, \uc804\uc81c \uac1c\ud601\uc744 \ub2e8\ud589\ud588\ub2e4",
//       " 1392\ub144 7\uc6d4 17\uc77c(\uc591\ub825 8\uc6d4 5\uc77c)\uc5d0\ub294 \uacf5\uc591\uc655\uc774 \uc655\ub300\ube44\uc5d0\uac8c \uc900 \uc625\uc0c8\ub97c \uc774\uc131\uacc4\uac00 \ubc1b\uc544 \ub4e4\uc5b4 \uc8fc\ubcc0 \uce21\uadfc\ub4e4\uc758 \ucd94\ub300\ub85c \uc655\uc704\uc5d0 \uc624\ub974\uba74\uc11c \uc870\uc120\uc655\uc870\uac00 \uc2dc\uc791\ub418\uc5c8\ub2e4",
//       " \uc774\ud6c4 \uc655\uc704\uc5d0 \uc624\ub978 \ub2e8\uc885\uc744 \uacc4\uc720\uc815\ub09c\uc73c\ub85c \ubab0\uc544\ub0b8 \uadf8\uc758 \uc0bc\ucd0c \uc138\uc870\ub294 \uc815\ud1b5\uc131\uc5d0 \uc774\uc758\ub97c \uc81c\uae30\ud558\ub294 \uc138\ub825\uc744 \uc81c\uac70\ud55c \ub4a4 \ud0dc\uc885\ucc98\ub7fc \uc721\uc870\uc9c1\uacc4\uc81c\ub97c \ucc44\ud0dd, \uc655\uad8c\uc744 \uac15\ud654\ud558\uc600\uace0, \u300a\ub3d9\uad6d\ud1b5\uac10\u300b, \u300a\uad6d\uc870\ubcf4\uac10\u300b \ub4f1\uc744 \uc9d3\uae30\ub3c4 \ud588\ub2e4",
//       " \uc0ac\ub9bc\uacfc \ud6c8\uad6c\ub97c \ubaa8\ub450 \ubc30\ucc99\ud558\uace0 \ub3c5\ub2e8\uc801\uc73c\ub85c \uc815\uce58\ub97c \ud55c \uc5f0\uc0b0\uad70\uc744 \uc911\uc885\ubc18\uc815\uc73c\ub85c \ud3d0\uc704\ud558\uace0 \uc655\uc704\uc5d0 \uc624\ub978 \uc911\uc885\uc740 \uc870\uad11\uc870\ub97c \uc911\uc6a9\ud558\ub294 \ub4f1 \uc0ac\ub9bc \uacf5\uc2e0\uc5d0\uac8c \ud718\ub458\ub9ac\uc9c0 \uc54a\uc73c\ub824 \uc560\ub97c \uc37c\uc73c\ub098, \uc774\ub807\ub2e4 \ud560 \uce58\uc801\uc744 \ub0a8\uae30\uc9c0\ub294 \ubabb\ud588\ub2e4"
//     ],
//     [
//       " 1392\ub144 7\uc6d4 17\uc77c(\uc591\ub825 8\uc6d4 5\uc77c)\uc5d0\ub294 \uacf5\uc591\uc655\uc774 \uc655\ub300\ube44\uc5d0\uac8c \uc900 \uc625\uc0c8\ub97c \uc774\uc131\uacc4\uac00 \ubc1b\uc544 \ub4e4\uc5b4 \uc8fc\ubcc0 \uce21\uadfc\ub4e4\uc758 \ucd94\ub300\ub85c \uc655\uc704\uc5d0 \uc624\ub974\uba74\uc11c \uc870\uc120\uc655\uc870\uac00 \uc2dc\uc791\ub418\uc5c8\ub2e4"
//     ],
//     [
//       " 1392\ub144 7\uc6d4 17\uc77c(\uc591\ub825 8\uc6d4 5\uc77c)\uc5d0\ub294 \uacf5\uc591\uc655\uc774 \uc655\ub300\ube44\uc5d0\uac8c \uc900 \uc625\uc0c8\ub97c \uc774\uc131\uacc4\uac00 \ubc1b\uc544 \ub4e4\uc5b4 \uc8fc\ubcc0 \uce21\uadfc\ub4e4\uc758 \ucd94\ub300\ub85c \uc655\uc704\uc5d0 \uc624\ub974\uba74\uc11c \uc870\uc120\uc655\uc870\uac00 \uc2dc\uc791\ub418\uc5c8\ub2e4"
//     ],
//     [
//       "\uc774\uc790\ucd98\uc758 \uc544\ub4e4\uc774\uc790 \uace0\ub824\uc758 \uc2e0\ud765 \ubb34\uc778 \uc138\ub825\uc774\uc5c8\ub358 \uc774\uc131\uacc4\ub294 1388\ub144 \uc704\ud654\ub3c4 \ud68c\uad70\uc73c\ub85c \uad70\uc0ac\uc815\ubcc0\uc744 \uc77c\uc73c\ucf30\ub2e4",
//       "[13] 1393\ub144 2\uc6d4 15\uc77c\uc5d0\ub294 \uad6d\ud638\ub97c \u2018\uc870\uc120\u2019\uc73c\ub85c \uc815\ud558\uace0,[4] 1394\ub144\uc5d0\ub294 \ud55c\uc591\uc744 \ub3c4\uc74d\uc73c\ub85c \ud558\uc5ec[14] \u201c\uc7ac\uc0c1 \uc911\uc2ec \uc815\uce58\u201d\ub97c \uafc8\uafb8\ub358 \uc815\ub3c4\uc804\uc744 \uc911\uc2ec\uc73c\ub85c \uace0\ub824\uc758 \uae30\uc874 \uc81c\ub3c4\ub97c \uae09\uc9c4\uc801\uc73c\ub85c \uace0\ucce4\ub2e4"
//     ],
//     [
//       "\uc774\uc790\ucd98\uc758 \uc544\ub4e4\uc774\uc790 \uace0\ub824\uc758 \uc2e0\ud765 \ubb34\uc778 \uc138\ub825\uc774\uc5c8\ub358 \uc774\uc131\uacc4\ub294 1388\ub144 \uc704\ud654\ub3c4 \ud68c\uad70\uc73c\ub85c \uad70\uc0ac\uc815\ubcc0\uc744 \uc77c\uc73c\ucf30\ub2e4"
//     ],
//     [
//       " \uadf8\ub294 \ucc3d\uc655\u00b7\uacf5\uc591\uc655\uc744 \uc655\uc704\uc5d0 \uc62c\ub838\ub2e4\uac00 \uc2e0\ub3c8\uc758 \uc0ac\uc0dd\uc544\ub77c\uace0 \uc0ac\uac74\uc744 \uc870\uc791\ud558\uc5ec \ud3d0\uc704\ud558\ub294 \ub4f1 \uc815\uad8c\u00b7\uad70\uad8c\u00b7\uacbd\uc81c\uad8c\uc744 \ud589\uc0ac\ud558\uc600\uace0, \uc804\uc81c \uac1c\ud601\uc744 \ub2e8\ud589\ud588\ub2e4",
//       " 1392\ub144 7\uc6d4 17\uc77c(\uc591\ub825 8\uc6d4 5\uc77c)\uc5d0\ub294 \uacf5\uc591\uc655\uc774 \uc655\ub300\ube44\uc5d0\uac8c \uc900 \uc625\uc0c8\ub97c \uc774\uc131\uacc4\uac00 \ubc1b\uc544 \ub4e4\uc5b4 \uc8fc\ubcc0 \uce21\uadfc\ub4e4\uc758 \ucd94\ub300\ub85c \uc655\uc704\uc5d0 \uc624\ub974\uba74\uc11c \uc870\uc120\uc655\uc870\uac00 \uc2dc\uc791\ub418\uc5c8\ub2e4"
//     ],
//     [
//       " 1392\ub144 7\uc6d4 17\uc77c(\uc591\ub825 8\uc6d4 5\uc77c)\uc5d0\ub294 \uacf5\uc591\uc655\uc774 \uc655\ub300\ube44\uc5d0\uac8c \uc900 \uc625\uc0c8\ub97c \uc774\uc131\uacc4\uac00 \ubc1b\uc544 \ub4e4\uc5b4 \uc8fc\ubcc0 \uce21\uadfc\ub4e4\uc758 \ucd94\ub300\ub85c \uc655\uc704\uc5d0 \uc624\ub974\uba74\uc11c \uc870\uc120\uc655\uc870\uac00 \uc2dc\uc791\ub418\uc5c8\ub2e4"
//     ],
//     [
//       "\uc774\uc790\ucd98\uc758 \uc544\ub4e4\uc774\uc790 \uace0\ub824\uc758 \uc2e0\ud765 \ubb34\uc778 \uc138\ub825\uc774\uc5c8\ub358 \uc774\uc131\uacc4\ub294 1388\ub144 \uc704\ud654\ub3c4 \ud68c\uad70\uc73c\ub85c \uad70\uc0ac\uc815\ubcc0\uc744 \uc77c\uc73c\ucf30\ub2e4",
//       " 1392\ub144 7\uc6d4 17\uc77c(\uc591\ub825 8\uc6d4 5\uc77c)\uc5d0\ub294 \uacf5\uc591\uc655\uc774 \uc655\ub300\ube44\uc5d0\uac8c \uc900 \uc625\uc0c8\ub97c \uc774\uc131\uacc4\uac00 \ubc1b\uc544 \ub4e4\uc5b4 \uc8fc\ubcc0 \uce21\uadfc\ub4e4\uc758 \ucd94\ub300\ub85c \uc655\uc704\uc5d0 \uc624\ub974\uba74\uc11c \uc870\uc120\uc655\uc870\uac00 \uc2dc\uc791\ub418\uc5c8\ub2e4"
//     ]
//   ]
// }
//           glo_key = response['keyword']
//           glo_count = response['count']
//           glo_questions = response['questions']

//     $('.wrap-loading').addClass('display-none');
//            $("#head").empty()
//            $("#head").append(`ATLAS 인공지능이 키워드를 추출했습니다.<br>아래 우측 박스에 문제로 만들 키워드를 선택하세요.`)
//            $("#resultWindow").empty()
//            $("#resultWindow").append(`
//            <thead>
//                <tr>
//                <th>키워드</th><th>선택</th>
//                </tr>
//            </thead>`)
//                for (let i =0; i< glo_key.length; i++) {
//                    let result= glo_key[i];
//                    $("#resultWindow").append(`
//                    <tbody>
//                    <tr>
//                    <td>${result}</td>
//                    <td><input type="checkbox" onclick="inputTypeClick(this)" name= chkbox></td>
//                    </tr>
//                    </tbody>`)}

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
    console.log("HERE")
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
        change = questionToString.replaceAll(select_keyword[i], '___')
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
  console.log(localStorage.clear())
  window.location.href = 'http://127.0.0.1:5000/testlet_t'
}