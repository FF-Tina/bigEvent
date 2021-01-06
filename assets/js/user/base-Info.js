$(function(){
    let form = layui.form
    form.verify({
    nickname: function(value){ //value：表单的值、item：表单的DOM对象
      if(value.length > 6){
          console.log(value);
          return '请输入1-6位数字'
      }
    }
  }) 
  getInfo()
  let layer = layui.layer
 function getInfo(){
  $.ajax({
    url:'/my/userinfo',
    success:function(res){
        console.log(res);
        if(res.status !== 0){
         return layer.msg('获取用户基本信息失败')
        }
        form.val("form", res.data);
    }
})
 }
  $('#resetBtn').click(function(e){
    // 不需要重置按钮的默认行为， 会让表单为空
    // 1.阻止默认行为
    e.preventDefault()
    // 2.重新获取
    getInfo()
  })
  // 修改表单的值
});
 
//获取表单区域所有值 --- 用监听表单的submit事件，实现修改功能
$('#form').on('submit',function(e){
  e.preventDefault()
  let data = $(this).serialize()
  $.ajax({
    type:'POST',
    url:'/my/userinfo',
    data,
    success:function(res){
      console.log(res);
      if(res.status !== 0){
        return layer.msg(res.message)
      }
      // 子页面的window.parent是index.html 修改用户名字需要重新调用全局的函数
      window.parent.getUserInfo()
      layer.msg(res.message)
    }
  })
})

