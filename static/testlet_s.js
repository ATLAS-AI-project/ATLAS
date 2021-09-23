window.onload = function() {
    $.ajax({
        type: "GET",
        url: "/list",
        data: {},
        async:true,
        success: function(response) {
            console.log(response)
            response [{},{},{},{}]
            for(let i=0; i<response.length; i++) {
                let list = response[i];
                $("#list").append(`
                <ul>문제지 ${list["index"]}. : ${list["blank_q_name"]}<input type='radio' name='list' /></ul>
                `)
            }
        }
    })
}

function download_s_Click(){
    $.ajax({
        type: "GET",
        url: "/list",
        data: {},
        async:true,
        success: function(response){
        let num = $('input[name=list]:checked').index('input[name=list]');
        console.log(num)
        response [{},{},{},{}]
        let list = response[num]
        console.log(list)
        filename = list["blank_q_name"];
        text = list["blank_q"];
        var save = document.createElement('a');
        save.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        save.setAttribute('download', filename);
        if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        save.dispatchEvent(event);}
    }
})
}

function quizClick(){
    let num = $('input[name=list]:checked').index('input[name=list]');
    localStorage.setItem('num',JSON.stringify(num))
    window.location.href = 'http://127.0.0.1:5000/quiz_s'
}
