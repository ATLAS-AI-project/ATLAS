select_keyword = JSON.parse(localStorage.getItem("select_keyword"))
console.log(JSON.parse(localStorage.getItem("select_keyword")))
final_question = JSON.parse(localStorage.getItem("final_question"))
console.log(JSON.parse(localStorage.getItem("final_question")))
falsekeyword = ['기마','기마로','중세','전사','전사','파생','파생된','파','명예','명','예','칭호','호우','호날두','호감','중세','중']
selquiz = []
quizz = ''
quiza = ''

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];  }
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

function selectquiz() {
  for (let i=0; i<select_keyword.length; i++) {
    selquiz[i] = []       //arr[select_keyword.length][4] 만들기?
    selquiz[i].push(select_keyword[i])
    console.log(selquiz[i])
    selquiz[i] = no4overlap(selquiz[i])  //사지선다 객관식
    console.log(selquiz[i])
    selquiz[i] = shuffle(selquiz[i])
    console.log(selquiz[i])
    console.log(selquiz[i][0])
    quizz = quizz.concat(final_question[i] + '\n' + selquiz[i].join('  /  ') + '\n\n\n')
    quiza = quiza.concat(final_question[i] + '\n' + selquiz[i].join('  /  ') + '\n' + '정답:' + select_keyword[i] + '\n\n\n')
  }
  console.log(quizz)
  console.log(quiza)
  return quizz, quiza
}