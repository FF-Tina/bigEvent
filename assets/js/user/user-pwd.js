let form = layui.form
let layer = layui.layer
form.verify({
    pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    newPwd:function(value){
        console.log(value);//新密码
        let oldPwd = $('[name=oldPwd]').val()
        if(value === oldPwd) {
            return '原密码和新密码不能相同'
        }
    },
    rePwd:function(value){
        console.log(value);//新密码
        let newPwd = $('[name=newPwd]').val()
        if(value !== newPwd) {
            return '两次输入密码不一致'
        }
    },
  });
  $('#form').on('submit',function(e){
      e.preventDefault()
      let data = $(this).serialize()
      $.ajax({
          type:'POST',
          url:'/my/updatepwd',
          data,
          success:function(res){
              console.log(res);
              if(res.status !== 0){
                  return layer.msg(res.message)
              }
              layer.msg(res.message)
            //   reset用dom对象调用
            //   $('#form')[0].reset()
          }
          
      })
      this.reset()
  })