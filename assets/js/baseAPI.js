$.ajaxPrefilter(function(options){
// console.log(options);
options.url = 'http://api-breakingnews-web.itheima.net' + options.url
// 设置请求头
if(options.url.indexOf('/my/' !== -1)){
    options.headers= {
        Authorization: localStorage.getItem('token')||''
    }
}
options.complete =  function(res){
    // console.log(res);
        if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！' ){
              // 清除token
              localStorage.removeItem('token')
              // 转到登录页面
              location.href = '/login.html'
    }
}
})
