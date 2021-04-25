// 入口函数
$(function(){
    // 1.获取用户信息
    initUserInfo()
    function initUserInfo(){
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (res) {
                console.log(res);
                // 判断用户信息是否获取成功
                if(res.status !== 0){
                    return layui.layer.msg(res.msg,{ icon : 5})
                }
                // 把用户信息展示到页面去
                // $('[name=username]').val(res.data.username)
                // $('[name=nickname]').val(res.data.nickname)
                // $('[name=email]').val(res.data.email)
                // $('[name=id]').val(res.data.id)
                // 快速给所有表单赋值
                layui.form.val('formUserInfo', res.data)
            }
        });
    }
    // 2.重置表单信息
    $('#btnReset').on('click',function(e){
        // 阻止表单默认行为
        e.preventDefault()
        // 重新渲染用户信息
        initUserInfo()
    })
    // 自定义验证昵称长度的规则
    layui.form.verify({
        nickname: function(value,item){
            if(value.length > 6){
                return ('昵称不能超过六个字符')
            }
        }
    })
    // 3.完成用户信息的修改功能
    $('.layui-form').on('submit',function(e){
         // 阻止表单默认行为
         e.preventDefault()
        //  获取表单信息
        var data = $(this).serialize()
        // 
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: data,
            success: function (res) {
                console.log(res);
                if(res.status !== 0){
                    layui.layer.msg(res.message,{icon:5})
                }
                layui.layer.msg(res.message,{icon:6})
                // 
                console.log(window.parent);
                window.parent.GetUserInfo()
            }
        });
        
        

    })






})