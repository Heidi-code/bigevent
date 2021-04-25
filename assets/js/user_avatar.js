// 入口函数
$(function(){
// 把图片初始化成裁剪区域
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
// 点击上传弹出文件选择框
 $('#btnChooseImage').on('click',function(){
     $('#file').click()
 })
// 上传新图片，更换裁剪的图片
$('#file').on('change',function(e){
    // var fileList= this.files
    var fileList= e.target.files
    if(fileList.length === 0){
        return layui.layer.msg('请选择文件')
    }
    // 拿到用户选择的文件
    var file = fileList[0]
    // 根据选择的文件，创建一个对应的 URL 地址：
    var newImgURL = URL.createObjectURL(file)
    // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域

})
// 上传头像
$('#btnUpload').on('click',function(){
    // 
    var fileList = $('#file')[0].files
    if(fileList.length===0){
        return layui.layer.msg('请选择头像')
    }
    // 将裁剪后的图片，输出为 base64 格式的字符串
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      // ajax 请求
      $.ajax({
         type: "post",
         url: "/my/update/avatar",
         data: {
        avatar:dataURL
        },
       success: function (res) {
        console.log(res);
        if(res.status !== 0){
            return  layui.layer.msg(res.message,{icon:5})
        }
        layui.layer.msg(res.message,{icon:6},function(){
            //更新头像
            window.parent.GetUserInfo()
        })
        
    }
      });

})



})