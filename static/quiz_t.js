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
falsekeyword = ['신진사대부', '권문세족', '음서', '대농장', '중소지주', '신흥 무인세력', '이성계', '위화도 회군', '4불가론', '과전법', '성리학', '하여가', '단심가', '전통과 명분', '정몽주', '이방원', '선죽교', '관학파', '훈구파', '이황', '이이', '세종', '정도전', '사학파', '사림파', '1592년', '임진왜란', '서인', '노론', '세도가문', '유향소', '향약', '서원', '삼사', '언론', '사간원', '사헌부', '홍문관', '조선경국전', '경제문감', '불씨잡변', '주자가례', '왕자의 난', '6조 직계제', '의정부', '재상 중심', '중서문하성', '낭사', '왕권 견제', '사병 혁파', '양전사업', '토지조사', '호패법 ', '노비안검법', '전민변정도감', '의정부서사제', '왕권과 신권의 조화', '집현전', '경연', '4군 6진', '한글', '계유정난', '서연']

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
