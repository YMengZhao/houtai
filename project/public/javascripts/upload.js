jQuery(function($){
    $("#file").on("change",function(){
        var data = new FormData();
        data.append("logo", $("#file")[0].files[0]);
        $.ajax({
            url: 'http://localhost:3000/users/upload',
            type: 'POST',
            cache: false, //不必须
            data: data,
            processData: false,
            contentType: false,
            success: function(data) {
                $("#img").prop("src",`http://localhost:3000/${data.file.filename}`);
            }
        })
    })
})
// var fileNode = document.getElementById("file");
// fileNode.onchange = function () {
//     var xmlhttp = new XMLHttpRequest();
//     //设置回调，当请求的状态发生变化时，就会被调用  
//     xmlhttp.onreadystatechange = function () {
//         //上传成功，返回的文件名，设置到父节点的背景中  
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             let data = JSON.parse(xmlhttp.responseText);
//             document.getElementById("img").src = `http://localhost:3000/${data.file.filename}`
//         }
//     }
//     //构造form数据 
//     var data = new FormData();
//     data.append("logo", fileNode.files[0]);
//     //设置请求，true：表示异步  
//     xmlhttp.open("post", "http://localhost:3000/users/upload", true);
//     //不要缓存  
//     //xmlhttp.setRequestHeader("If-Modified-Since", "0");  
//     //提交请求  
//     xmlhttp.send(data);
//     //清除掉，否则下一次选择同样的文件就进入不到onchange函数中了  
//     fileNode.value = null;
// }