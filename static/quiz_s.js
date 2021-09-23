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

function saveanswerbtn() {
    score= 0
    wrong= []
    $.ajax({
        type: "GET",
        url: "/list",
        data: {},
        async:true,
        success: function(response){
            console.log(response)
            response [{},{},{},{}]
            let list = response[num];
            for(let i=0; i<JSON.parse(list["answer"]).length; i++) {
                let txObj = document.getElementById("answer"+i).value;
                console.log(JSON.parse(list["answer"])[i])
                console.log(txObj)
                if(JSON.parse(list["answer"])[i] == txObj) {
                    score= score+1
                }
                console.log(score)
            }
            window.location.href = 'http://127.0.0.1:5000/testlet_s'
            alert((JSON.parse(list["answer"])).length+'문제중 '+score+'개 맞았습니다!')
        }
    })
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
        return array
}

function no4overlap(array) {
    if (! array) {var array = []};
    let n = Math.floor(Math.random() * falsekeyword.length);
    if (array.length < 4 && array.indexOf(falsekeyword[n]) < 0) {     //&& array.indexOf(n) < 0, 리스트내부에 보기가 같은게 들어가지 않도록 해준다
        array.push(falsekeyword[n]);
        return no4overlap(array)
    } else if (array.length < 4) {
    return no4overlap(array)
    } else {return array;}
}

function hint() {
    var confirmflag = confirm('힌트를 보시겠습니까?')
    if(confirmflag == true){
        selquiz =[]
        $.ajax({
            type: "GET",
            url: "/list",
            data: {},
            async:true,
            success: function(response){
                console.log(response)
                response [{},{},{},{}]
                let list = response[num];
                $("#list").empty()
                for(let i=0; i<JSON.parse(list["blank_q"]).length; i++){
                    selquiz[i] = []       //arr[select_keyword.length][4] 만들기?
                    selquiz[i].push(JSON.parse(list["answer"])[i])
                    selquiz[i] = no4overlap(selquiz[i])  //사지선다 객관식
                    selquiz[i] = shuffle(selquiz[i])

                    $("#list").append(`
                    <ul>문제${i+1}. ${JSON.parse(list["blank_q"])[i]} <br> 힌트 : ${selquiz[i].join('  /  ')} <br> <input type='text' name='answer' id="answer${i}" /></ul>
                    `)
                }
            }
        })
    }
}

function studentClick() {
  console.log(localStorage.clear())
  window.location.href = 'http://127.0.0.1:5000/testlet_s'
}
