window.onload= function() {
  $.ajax({
        type: "GET",
        url: "/list",
        data: {},
        async:true,
        success: function(response){
          console.log(response)
          $("#list").empty()
          response [{},{},{},{}]
          for(let i=0; i<response.length; i++){
            let list = response[i];
            $("#list").append(`
            <ul>문제지 ${list["index"]}. : ${list["blank_q_name"]}<input type='radio' name='listt' value=${list["index"]} /></ul>
      `)

          }
    }
})
}

function homebtn() {
  console.log(localStorage.clear())
  window.location.href = 'http://127.0.0.1:5000/home'
}

function gradebtn() {
    window.location.href = 'http://127.0.0.1:5000/grades'
}

function delbtn(){
    let index = $('input[name=listt]:checked').val();
    $.ajax ({
    type: "DELETE",
        url: "/delete?index="+index,
        data: {index : index},
          success: function(response) {
          alert("삭제가 잘 되었습니다!")
          window.location.reload();
        }

    })
}
