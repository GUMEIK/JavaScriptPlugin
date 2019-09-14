# 使用场景
我想从接口获取一个数据，但是跨域了，不过这个接口支持JSONP。
# 实现原理(使用script标签的src属性)
- script标签可以引用其他域的资源，浏览器不对其进行限制，但src引进来的文件会被默认为js文件，浏览器会将其作为js代码执行
## 调用形式
```javascript
$.JSONPAjax({
    // 支持jsonp的接口
    url:'xxxxxxx',
    // 回调函数，data为请求回来的数据
    success:function(data){

    }
})
```
## 实现代码
```javascript
function JSONPAjax(opations){
    var url = opations.url;
    // 生成一个随机函数
    var callback = "cb" + Math.floor(Math.random()*10000);
    // 在window上添加这个函数
    window[callback] = opations.success;
    // 生成script标签
    var script = document.createElement('script');
    // 将请求作为script的src属性发送出去
    // 发送的请求是否存在参数
    if(url.indexOf("?") > 0){
        script.src = url + "&callback=" +callback;
    }else{
        script.src = url + "?callback=" + callback;
    }
    script.id = callback;
    document.body.appendChild(script)
}
```



