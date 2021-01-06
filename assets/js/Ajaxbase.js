$.ajaxPrefilter(function(options){
    // 每次请求发送前，都会执行该函数,options能够获取请求里的配置项
    options.url='http://api-breakingnews-web.itheima.net'+ options.url
    // 全部请求中都带上请求头
    // options.headers = {
    //     Authorization:localStorage.getItem('token')
    // }
    // 当出现/my开头的添加
    if(options.url.indexOf('/my') !== -1){
        options.headers = {
                Authorization:localStorage.getItem('token')
            }
    }
    options.complete = function(xhr){
        // console.log(xhr);
        //请求完成（不论成功失败）
        // console.log(xhr.responseJSON);
        if(xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！'){
            
            location.href = "/home/login.html";
        }
    }
})