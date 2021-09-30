num = localStorage.getItem("num")
falsekeyword = ['신진사대부', '권문세족', '음서', '대농장', '중소지주', '신흥 무인세력', '이성계', '위화도 회군', '4불가론', '과전법', '성리학', '하여가', '단심가', '전통과 명분', '정몽주', '이방원', '선죽교', '관학파', '훈구파', '이황', '이이', '세종', '정도전', '사학파', '사림파', '1592년', '임진왜란', '서인', '노론', '세도가문', '유향소', '향약', '서원', '삼사', '언론', '사간원', '사헌부', '홍문관', '조선경국전', '경제문감', '불씨잡변', '주자가례', '왕자의 난', '6조 직계제', '의정부', '재상 중심', '중서문하성', '낭사', '왕권 견제', '사병 혁파', '양전사업', '토지조사', '호패법 ', '노비안검법', '전민변정도감', '의정부서사제', '왕권과 신권의 조화', '집현전', '경연', '4군 6진', '한글', '계유정난', '서연']

function noerror(jsondata){
  let result0 = jsondata.replace(/\n/gi, "\\n")
  let result1 = result0.replace(/\t/gi,"\\t")
  let result2 = result1.replace(/\f/gi, "\\f")

  let final = result2.replace(/\r/gi, "\\r")
  final = final.replace(/[\u0000-\u0019]+/g,"")
  return final
}


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
            console.log(list["blank_q"])
            for(let i=0; i<JSON.parse(noerror(list["blank_q"])).length; i++){
                $("#list").append(`
                <ul>문제${i+1}<br> ${JSON.parse(noerror(list["blank_q"]))[i].toString().replace(/\.,/g, '.<br>')} <br> <input type='text' name='answer' id="answer${i}" /></ul>
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
                for(let i=0; i<JSON.parse(noerror(list["blank_q"])).length; i++){
                    selquiz[i] = []       //arr[select_keyword.length][4] 만들기?
                    selquiz[i].push(JSON.parse(list["answer"])[i])
                    selquiz[i] = no4overlap(selquiz[i])  //사지선다 객관식
                    selquiz[i] = shuffle(selquiz[i])

                    $("#list").append(`
                    <ul>문제${i+1}<br> ${JSON.parse(noerror(list["blank_q"]))[i].toString().replace(/\.,/g, '.<br>')} <br><br> 힌트 :&nbsp ${selquiz[i].join(' &nbsp  /  &nbsp ')} <br> <input type='text' name='answer' id="answer${i}" /><br><br><br></ul>
                    `)
                }
            }
        })
    }
}

function studentClick() {
  window.location.href = 'http://127.0.0.1:5000/testlet_s'
}
