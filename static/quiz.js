window.onload= function() {
    key = JSON.parse(localStorage.getItem("key"))
    count = JSON.parse(localStorage.getItem("count"))
    questions = JSON.parse(localStorage.getItem("questions"))
    select_keyword = JSON.parse(localStorage.getItem("select_keyword"))
    select_question = JSON.parse(localStorage.getItem("select_question"))
    final_question = JSON.parse(localStorage.getItem("final_question"))
//    localStorage.clear()

   $("#testlist").empty()
   for (let i =0; i< final_question.length; i++) {
      let result= final_question[i];
      let keyword= select_keyword[i];
      $("#testlist").append(`
        <tbody>
          <tr>
            <td>${result}</td>
          </tr>
          <tr>
            <td>정답 : ${keyword}</td>
          </tr>
        </tbody>`)}
}

//localStorage.clear()로 나중에 데이터를 지워주어야함 (console에서)