console.log('확인')

loginBtn = () => window.location.href = 'http://127.0.0.1:5000/pageSelect'

function enterkey() {
  if (window.event.keyCode == 13) {
  loginBtn();}
}