num = JSON.parse(localStorage.getItem("num"))

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
          console.log(typeof(JSON.parse(list["blank_q"])))
          for(let i=0; i<JSON.parse(list["blank_q"]).length; i++){
            $("#list").append(`
            <ul>문제${i+1}. ${JSON.parse(list["blank_q"])[i]} <br> <input type='text' name='answer' id="answer${i}" /></ul>
      `)
          }
    }
})
}

function saveanswerbtn() {
  num = JSON.parse(localStorage.getItem("num"))
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
          for(let i=0; i<JSON.parse(list["answer"]).length; i++){
            let txObj = document.getElementById("answer"+i).value;
            console.log(JSON.parse(list["answer"])[i])
            console.log(txObj)
            if(JSON.parse(list["answer"])[i] == txObj){
              score= score+1
            }
            console.log(score)
          }
            window.location.href = 'http://127.0.0.1:5000/testlet_s'
            alert((JSON.parse(list["answer"])).length+'문제중 '+score+'개 맞았습니다!')
            }
})
}

function downloadbtn() {
  $.ajax({
        type: "GET",
        url: "/list",
        data: {},
        async:true,
        success: function(response){
        console.log(num)
        response [{},{},{},{}]
        let list = response[num]
        console.log(list)
        filename = list["blank_q_name"];
        text = list["blank_q"].toString().replace();
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

function studentClick() {
  console.log(localStorage.clear())
  window.location.href = 'http://127.0.0.1:5000/testlet_s'
}
