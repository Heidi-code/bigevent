// 入口函数
$(function(){
    // 1.自定义表单验证规则
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        samePwd: function(value){
            if($('[name=oldPwd]').val()=== value){
                return '新旧密码不能一致'
            }
        },
        rePwd: function(value){
            if($('[name=newPwd]').val()!==value){
                return '两次密码不一致'
            }

        }
    }) 
    // 2.完成重置密码更改
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if(res.status!==0){
                    return layui.layer.msg(res.message,{icon:5})
                }
                layui.layer.msg(res.message,{icon:6},function(){
                    // 清空表单
                    $('.layui-form')[0].reset()
                })

                
            }
        });

    })
    
})