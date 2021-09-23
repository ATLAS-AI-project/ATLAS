function join_submit() {
  const id = document.getElementById('id_to_join').value;
  const password = document.getElementById('pwd_to_join').value;
  const passwordchk = document.getElementById('pwd_doublecheck').value;
  if(password != passwordchk){
    alert('비밀번호가 일치 하지 않습니다.');
    return false;
    }
  const user_name = document.getElementById('user_name').value;
  const school_name = document.getElementById('school_name').value;
  const year_born = document.getElementById('year_born').value;
  const month_born = document.getElementById('month_born').value;
  const day_born = document.getElementById('day_born').value;
  const teacher_or_student = document.getElementById('teacher_or_student').value;
  console.log(id, password, passwordchk , month_born, day_born, teacher_or_student)

  $.ajax({
        type: "POST",
        url: "/join",
        data: {id : id,
           password : password,
           user_name : user_name,
           school_name : school_name,
           year_born : year_born,
           month_born : month_born,
           day_born : day_born,
           teacher_or_student : teacher_or_student},
        async:true,
        success: function(){
          alert('가입 완료!')
        }
})
}
