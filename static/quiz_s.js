window.onload= function() {
  num = JSON.parse(localStorage.getItem("num"))
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
          console.log(typeof(JSON.parse(list["blank_q"])))
          for(let i=0; i<JSON.parse(list["blank_q"]).length; i++){
            $("#list").append(`
            <ul>문제${i+1}. ${JSON.parse(list["blank_q"])[i]} <br> <input type='text' name='answer' /></ul>
      `)
          }
    }
})
}