// 获取用户头像和昵称
function getUserInfo(){
    $.ajax({
        url:'',
        headers:{
            //设置请求头()
            Authorization:localStorage.getItem('token')
        },
        success:function(res){
            console.log(res);
            // 调用函数renderUserInfo将头像昵称渲染出来,将数据传过去进行渲染
            renderUserInfo(res.data)
        }
    })
    // renderUserInfo函数可以将头像和昵称渲染出来 data形参将用户数据渲染出来
    function renderUserInfo(data){
        // 先处理名称 优先展示昵称 短路运算符 或
        let name = data.nicname || data.username //找真值 找到昵称 名称不执行
        // 万物皆对象 [0] 字符串也为对象
        let first = name[0].toUppercase()
        $('#welcome').text('欢迎'+name)
        // 头像:如果用户头像存在展示用户头像，不存在显示文字头像
        if(data.user-pic){
            // 展示用户头像 隐藏文字头像
            $('.layui-nav-img').attr('src',data.user-pic).show()
            $('.text-avatar').hide()
        }else{
            $('.layui-').hide()
            $('.text-avatar').text(first).show()
        }
    }
}