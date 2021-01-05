$(function(){
    $('#gotoregister').on('click',function(){
        $('.register').show()
        $('.login').hide()
        $('#gotologin').on('click',function(){
            $('.register').hide()
            $('.login').show()
        })
    })
    //2.密码长度限制
    let form = layui.form
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        // 两次密码是否一致
        prepqd:function(value){
            console.log(value);
            let pwd = $('.register input[name=password]').val()
            if(value !== pwd){
                return '两次密码不一致'
            }
        }
      }); 
      let layer = layui.layer
      $('#register').on('submit',function(e){
          e.preventDefault()
        //   用jq调用的serialize()获取数据
          let data = $(this).serialize()
          $.ajax({
              type:'POST',
              url:'/api/reguser',
              data,
              success:function(res){
                  console.log(res);
                  if(res.status !== 0){
                      return layer.msg(res.message)
                  }
                  layer.msg(res.message)
              }
          })

      })
      $('#login').on('submit',function(e){
          e.preventDefault()
        //   用jq调用的serialize()获取数据
          let data = $(this).serialize()
          $.ajax({
              type:'POST',
              url:'/api/login',
              data,
              success:function(res){
                  console.log(res);
                  if(res.status !== 0){
                      return layer.msg(res.message)
                  }
                //   登录成功后，将token保存到本地
                localStorage.setItem('token',res.token)
                  layer.msg(res.message,function(){
                    location.href = '/home/index.html'
                  })
              }
          })

      })
})
//1.切换登录与注册
//2.密码长度限制
//3.两次密码校验
//4.提交注册表单
//5.提交登录表单

// 检验错误：1.查看请求头方式 2.查看类型 3.查看数据

