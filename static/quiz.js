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
      let result = final_question[i];
      let keyword = select_keyword[i];
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

function homebtn() {
  window.location.href = 'http://127.0.0.1:5000/home'
}

function savebtn() {
  filename = document.getElementById("title_print").value;
//  quest = final_question.toString().replace(/,/g, '.\n\n\n')
  quest = final_question.toString().replace()
  var save = document.createElement('a');
  save.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(quest));
  save.setAttribute('download', filename);
  if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        save.dispatchEvent(event);
            $.ajax({
            type: "POST",
            url: "/save",
            data: {
                blank_q_name : filename,
                blank_q : localStorage.getItem("final_question"),
                answer : localStorage.getItem("select_keyword")
                },
            async:true,
            success: function(response){
        }
    })
    }
  }

//  function downloadbtn() {
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
  window.location.href = 'http://127.0.0.1:5000/testlet_t'
}

function studentClick() {
  window.location.href = 'http://127.0.0.1:5000/testlet_s'
}

function quizClick() {
  window.location.href = 'http://127.0.0.1:5000/quiz_s'
}
