function loginbtn() {
  input_id = document.getElementById('id_value')
  input_pw = document.getElementById('pw_value')
  $.ajax({
        type: "GET",
        url: "/session",
        data: {},
        async:true,
        success: function(response){
          console.log(response)
          response [{},{},{}]
          for (let i =0; i< response.length; i++) {
            let list = response[i]
            if (input_id == list[id]){
              if (input_pw == list[password]){
                localStorage.setItem('session',JSON.stringify(list[status]))
                if (JSON.parse(localStorage.getItem("session")) == '선생'){
                  window.location.href = 'http://127.0.0.1:5000/pageSelect'
                }else{window.location.href = 'http://127.0.0.1:5000/testlet_s'}
              }else{alert('비밀번호를 확인하여 주십시오')}
            }
          }
          alert('로그인 오류. 아이디를 확인하여 ')
        }
        })
        }

function enterkey() {
  if (window.event.keyCode == 13) {
  loginbtn();}
}

function joinbtn() {
  window.location.href = "http://127.0.0.1:5000/atlas_join"
}
