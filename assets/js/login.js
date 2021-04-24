$(function(){
    $('#link_reg,#link_login').on('click',function(){
        $('.reg-box,.login-box').toggle()
    })
    // 1.表单验证
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          repass:function(value,item){
              var pass=$('.reg-box [name=password]').val()
              if(pass!==value){
                  return '两次密码不一致'
                //   return layui.layer.msg('两次密码不一致',{icon:5})
              }
            //   layui.layer.msg('设置成功',{icon:6})
          }
    })
    // 2.注册页面
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data = {
          username: $('.reg-box [name=username]').val(),
          password: $('.reg-box [name=password]').val().trim()
        }
        $.ajax({
          type: "post",
          url: "http://api-breakingnews-web.itheima.net/api/reguser",
          data: data,
          success: function (res) {
            console.log(res);
            if(res.status!==0){
              return layui.layer.msg(res.message,{icon:5})
            }
             layui.layer.msg(res.message,{ icon : 6},function(){
              //  注册成功后进入登录页面
               $('#link_login').click()
             })
          }
        });


        
    })
    // 3.登录页面
    $('.login-box').on('submit',function(e){
      // 阻止表单默认行为
       e.preventDefault()
       var data = {
         username: $('#form_login [name="username"]').val().trim(),
         password: $('#form_login [name="password"]').val().trim()
       }
      //  ajax请求
      $.ajax({
        type: "post",
        url: "http://api-breakingnews-web.itheima.net/api/login",
        data: data,
        success: function (res) {
          console.log(res);
          if(res.status!==0){
            return layui.layer.msg(res.message,{ icon : 5})
          }
          layui.layer.msg(res.message,{icon :6 },function(){
            // 把token保存到本地
            localStorage.setItem('token',res.token)
            // 转到index页面
            location.href='/index.html'
          })
          
          
        }
      });
    })





})
