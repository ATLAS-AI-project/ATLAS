window.onload= function() {
  if (localStorage.getItem('session') == 1){
    return 'ok'
  }else if (localStorage.getItem('session') == 2 || localStorage.getItem('session') == 3){
    alert('권한이 없습니다')
    window.location.href = 'http://127.0.0.1:5000/testlet_s'
  }else{alert('권한이 없습니다')
    window.location.href = 'http://127.0.0.1:5000/login'}
  }

function homebtn() {
    window.location.href = 'http://127.0.0.1:5000/home'
}

function listbtn() {
    window.location.href = 'http://127.0.0.1:5000/testlet_t'
}

num = localStorage.getItem("num")
falsekeyword = ['기마','기마로','중세','전사','전사','파생','파생된','파','명예','명','예','칭호','호우','호날두','호감','중세','중']

window.onload= function() {
    $.ajax({
        type: "GET",
        url: "/list",
        data: {},
        async:true,
        success: function(response){
            console.log(response)
            response [{},{},{},{}]
            let list = response[num];
            $("#testlet_name").empty()
            $("#testlet_name").append(list["blank_q_name"])
            $("#list").empty()
            for(let i=0; i<JSON.parse(list["blank_q"]).length; i++){
                $("#list").append(`
                <ul>문제${i+1}. ${JSON.parse(list["blank_q"])[i]} <br> <input type='text' name='answer' id="answer${i}" /></ul>
                `)
            }
        }
    })
}
