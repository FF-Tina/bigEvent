$.ajaxPrefilter(function(options){
    // 每次请求发送前，都会执行该函数
    options.url='http://api-breakingnews-web.itheima.net'+ options.url
})