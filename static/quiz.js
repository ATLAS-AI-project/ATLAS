window.onload= function() {
    key = JSON.parse(localStorage.getItem("key"))
    count = JSON.parse(localStorage.getItem("count"))
    questions = JSON.parse(localStorage.getItem("questions"))
    select_keyword = JSON.parse(localStorage.getItem("select_keyword"))
    console.log(JSON.parse(localStorage.getItem("select_keyword")))
    select_question = JSON.parse(localStorage.getItem("select_question"))
    console.log(JSON.parse(localStorage.getItem("select_question")))
    final_question = JSON.parse(localStorage.getItem("final_question"))
   $("#testlist").empty()
   for (let i =0; i< final_question.length; i++) {
      let result= final_question[i];
      let keyword= select_keyword[i];
      $("#quizlist").append(`
        <tbody>
          <tr>
            <td>${result}</td>
          </tr>
          <tr>
            <td>정답 : ${keyword}</td>
          </tr>
        </tbody>`)}
 }
//console.log(localStorage.clear())로 나중에 데이터를 지워주어야함 <-이거는 브라우저에서 삭제를 안하면 계속남아있음

function homebtn() {
  console.log(localStorage.clear())
  window.location.href = 'http://127.0.0.1:5000/home'
}

function savebtn() {
  filename = document.getElementById("title_print").value;
  quest = final_question.toString().replace(/,/g, '.\n\n\n')
  var save = document.createElement('a');
  save.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(quest));
  save.setAttribute('download', filename);
  const answer = confirm('문제지를 저장하시겠습니까?')   // prompt(),if(answer) 함수로 수정시 제목입력칸을 없에고 파일이름을 다운받을때 정할수 있도록 수정가능
  if (true){
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        save.dispatchEvent(event);
    }
  }

//  function dwltn() {
//    filename = document.getElementById("title_print").value;
//    quest = final_question.toString().replace(/,/g, '.\n\n\n')
//    var save = document.createElement('a');
//    save.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(quest));
//    save.setAttribute('download', filename);
//    if (document.createEvent) {
//          var event = document.createEvent('MouseEvents');
//          event.initEvent('click', true, true);
//          save.dispatchEvent(event);
//      }
//    }

function listbtn() {
  console.log(localStorage.clear())
  window.location.href = 'http://127.0.0.1:5000/testlet_t'
}
