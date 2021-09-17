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
            <ul>문제지 ${list["index"]}. : ${list["blank_q_name"]}<input type='radio' name='list' /></ul>
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
    console.log(localStorage.clear())
}
