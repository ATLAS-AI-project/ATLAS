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
                <ul>문제지 이름 : ${list["blank_q_name"]}<input type='radio' name='listt' value=${list["index"]} /></ul>
                `)
          }
        }
    })
}

function homebtn() {
    console.log(localStorage.clear())
    window.location.href = 'http://127.0.0.1:5000/home'
}

function delbtn(){
    let index = $('input[name=listt]:checked').val();
    $.ajax ({
    type: "DELETE",
        url: "/delete?index="+index,
        data: {index : index},
          success: function(response) {
          alert("해당 문제지가 삭제되었습니다.")
          window.location.reload();
        }

    })
}

function gradebtn() {
    window.location.href = 'http://127.0.0.1:5000/grades'
}

function lookup_questions() {
    let num = $('input[name=listt]:checked').index('input[name=listt]');
    localStorage.setItem('num',JSON.stringify(num))
    window.location.href = 'http://127.0.0.1:5000/quiz_t'
}

function quizClick(){
    let num = $('input[name=listt]:checked').index('input[name=listt]');
    localStorage.setItem('num',JSON.stringify(num))
    window.location.href = 'http://127.0.0.1:5000/quiz_s'
}