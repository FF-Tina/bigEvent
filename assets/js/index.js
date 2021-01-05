// 获取用户头像和昵称
getUserInfo()
function getUserInfo(){
    $.ajax({
        url:'/my/userinfo',
        // headers:{
        //     // 数据认证
        //     Authorization:localStorage.getItem('token')
        // },
        success:function(res){
            console.log(res);
            if(res.status===1&&res.message==='身份认证失败！'){
                return
            }
            // 处理头像和昵称数据
            renderUserInfo(res.data)
            console.log(res.data);
        },
        
    })
    function renderUserInfo(data){
        // console.log(data);
        // console.log(data.user_pic);
        // 昵称优先于名称 运用与 找真值 找到了返回
        console.log(data);
        let name = data.nickname || data.username
        // 文字设置
        let first = name[0].toUpperCase()
        //头像设置：如果user_pic为null隐藏img user_pic有头像
        $('#welcome').text('欢迎'+ name)
        if(data.user_pic){
            $('.layui-nav-img').attr('src',data.user_pic).show()
            $('.text-avatar').hide()
        }else{
            $('.text-avatar').text(first).show()
            $('.layui-nav-img').hide()
        }
        let layer = layui.layer
        $('#logoutBtn').on('click',function(){
            // console.log(layer);
            // layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
            //     //do something
                // layer.close(index);
            //   });
            layer.confirm('确定删除吗？', {icon: 3, title:'提示'}, function(index){
                //do something
                console.log(index);               
                // 跳转到登录页面
                // 将token清除
                localStorage.removeItem('token')
                // 跳转
                location.href = '/home/login.html'
                // 关闭窗口
                layer.close(index);
              });
    })
}
}



















// function getUserInfo(){
//     $.ajax({
//         url:'',
//         headers:{
//             //设置请求头()
//             Authorization:localStorage.getItem('token')
//         },
//         success:function(res){
//             console.log(res);
//             // 调用函数renderUserInfo将头像昵称渲染出来,将数据传过去进行渲染
//             renderUserInfo(res.data)
//         }
//     })
//     // renderUserInfo函数可以将头像和昵称渲染出来 data形参将用户数据渲染出来
//     function renderUserInfo(data){
//         // 先处理名称 优先展示昵称 短路运算符 或
//         let name = data.nicname || data.username //找真值 找到昵称 名称不执行
//         // 万物皆对象 [0] 字符串也为对象
//         let first = name[0].toUppercase()
//         $('#welcome').text('欢迎'+name)
//         // 头像:如果用户头像存在展示用户头像，不存在显示文字头像
//         if(data.user-pic){
//             // 展示用户头像 隐藏文字头像
//             $('.layui-nav-img').attr('src',data.user-pic).show()
//             $('.text-avatar').hide()
//         }else{
//             $('.layui-').hide()
//             $('.text-avatar').text(first).show()
//         }
