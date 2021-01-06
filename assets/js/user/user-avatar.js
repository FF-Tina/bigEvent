let layer = layui.layer
// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')

// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)
// 2.美化上传点击按钮
$('#uploadBtn').on('click',function(){
    $('#file').click()
   
})
// 2.1 当点击文件域的时候，触发change事件
$('#file').on('change',function(e){
    // console.dir(this);
    let file = this.files[0]
    // 如果文件没有变，那么让它return
    if(!file){
        return layer.msg('')
    }
    // console.log(file);
    var newImgURL = URL.createObjectURL(file)
    $image
    .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
          // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
})
// 3.发送请求拿到用户的选择的文件
$('#sureBtn').click(function(){
    var dataURL = $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
    })
	.toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
        type:'POST',
        url:'/my/update/avatar',
        data:{
            avatar:dataURL
        },
        success:function(res){
            console.log(res);
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            window.parent.getUserInfo()
        }
    })
   
})
