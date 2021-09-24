function loginbtn() {
    const input_id = document.getElementById('id_value').value;
    console.log(JSON.stringify(input_id))
    const input_pw = document.getElementById('pwd_value').value;
    console.log(JSON.stringify(input_pw))

    $.ajax({
        type: "GET",
        url: "/session",
        data: {},
        async:true,
        success: function(response) {
            console.log(response)
            response [{}, {}, {}]
            for (let i = 0; i < response.length; i++) {
                let list = response[i]
                console.log(list['id'])
                if (input_id == list['id']) {
                    if (input_pw == list['password']) {
                        localStorage.setItem('session',list['status'])
                            if (localStorage.getItem("session") == 1) {
                                window.location.href = 'http://127.0.0.1:5000/pageSelect'
                            } else {window.location.href = 'http://127.0.0.1:5000/testlet_s'}
                    } else {alert('비밀번호를 확인하여 주십시오')}
                }
            }
        }
    })
}
break

function enterkey() {
    if (window.event.keyCode == 13) {
    loginbtn();}
}

function joinbtn() {
    window.location.href = "http://127.0.0.1:5000/atlas_join"
}
