$(function(){
    let layer = layui.layer
    let form = layui.form
    // 获取文章列表
    info()
    function info(){
        $.ajax({
            url:'/my/article/cates',
            success:function(res){
                let contenthtml = template('trTpl',res)
                $('#tb').html(contenthtml)
                
            }
        })
    }
    // ------------添加文章分类-------------
    // 1.点击增加按钮，利用layui里面的layer.open方法创建 增加功能里的表单  
    // layer.open方法创建的content内容中是form表单形式，动态创建form表单，content：$(form表单)要将结构也放进去，所以用html
    let index
    $('#addbtn').click(function(){
       index = layer.open({
            type:1,
            title:'添加文章分类',
            content:$('#addtrTpl').html(),
            area:'500px', 
        })
        // 表单是动态创建出来的，得用事件委托
        $('body').on('submit','#mainform',function(e){
            e.preventDefault()
            // 手机添加层表单数据
            let data = $(this).serialize()
            $.ajax({
                type:'POST',
                url:'/my/article/addcates',
                data,
                success:function(res){   
                    console.log(res);
                    if(res.status !==0){
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    info()
                    layer.close(index) 
                }
            })
        })
    })
    // ------------编辑 弹出层功能 复制一份模板 open-------------
    let editindex;
    $('body').on('click','#editbtn',function(){
        // console.log(111);
        editindex = layer.open({
            type:1,
            title:'修改文章分类',
            content:$('#editTpl').html(),
            area:'500px', 
        })
        let id = $(this).attr('data-index')
        console.log(id);
        // 发送请求，获取form表单的数据
        $.ajax({
            url:'/my/article/cates/' + id,
            success:function(res){
                console.log(res.data);
                form.val("mainform",res.data)    
            }
        })
    }) 
    // 编辑的form表单的确认修改功能
    $('body').on('submit','#mainform',function(e){
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type:'POST',
            url:'/my/article/updatecate',
            data,
            success:function(res){
                console.log(res);
               if(res.status !== 0){
                return layer.msg(res.message)
               }
               layer.msg(res.message)
               info()
               layer.close(editindex)
            }
        })
    })
    // -----------------删除功能------------------
    $('body').on('click','#removebtn',function(){
        layer.confirm('确定删除吗？', function(index){            
            layer.close(index);
          });
        // 1.获取id
        let id = $(this).attr('data-index')
          $.ajax({
              url:'/my/article/deletecate/'+id,
              success:function(res){
                  console.log(res);
                  if(res.status !== 0){
                      return layer.msg(res.message)
                  }
                  layer.msg(res.message)
                //   重新绘制画面
                  info()
              }
          })       
    })
})