$(function(){
    // 获取用户基本信息
    GetUserInfo()
    // 退出登录
    var layer = layui.layer
    $('#logout').on('click',function(){
        layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
            // 清除token
            localStorage.removeItem('token')
            // 转到登录页面
            location.href = '/login.html'
            layer.close(index);
          });
    })
})
// 将获取用户基本信息和渲染用户信息，放在入口函数的外边，变成全局变量
function GetUserInfo(){
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        // 设置请求头
        success: function (res) {
            console.log(res);
            // 判断是否获取成功
            if(res.status !== 0){
                return layui.layer.msg(res.message,{icon:5})
            }
            layui.layer.msg(res.message,{icon:5})
            // 渲染用户头像
            renderAvatar(res.data)
        },
    });
}
   // 渲染用户信息封装函数
function renderAvatar(user){
    // 设置欢迎语句
    var name = user.nickname || user.username 
    $('#welcome').html('欢迎  ' + name)
    // // 设置头像
    var pic = user.user_pic
    if(pic){
        $('.layui-nav-img').attr('src',pic).show()
        $('.text-avatar').hide()

    } else {
        $('.text-avatar').html(name[0].toUpperCase()).show()
        $('.layui-nav-img').hide()
    }
        }