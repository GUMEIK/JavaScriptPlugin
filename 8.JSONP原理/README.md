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
```js
//jsonp雏形，三步走，url中callback,window注册callback,script标签的处理
function JSONPAjax(){
    //1.在window上注册回调函数
    window['ppp'] = function(data){
        console.log(data)
    }
    //2.将回调函数作为参数拼劲到url中
    let url = 'https://developer.duyiedu.com/edu/testJsonp?callback=' + 'ppp';
    //3.script标签的处理
    let script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}

function ajaxJSONP(opations){
    let callback = 'cb' + Math.floor(Math.random()*10000);
    window[callback] = opations.success;
    let url = opations.url.indexOf('?') > 0 ? opations.url + '&callback=' + callback : opations.url + '?callback=' + callback;
    let scriptDom = document.createElement('script');
    scriptDom.src = url;
    scriptDom.id = callback;
    document.body.appendChild(scriptDom);
}
ajaxJSONP({
    url:'https://developer.duyiedu.com/edu/testJsonp',
    success:function (data) {
        console.log(data)
    }
})


/*
* 写jsonp原理主要有以下三个方面：
* 1.url中的必须有一个参数为callback(无论位置在哪里),该参数为一个回调函数的名字
* 2.该回调函数需要绑定在window上
* 3.创建script标签，标签的src属性为url地址，将script标签插入到body中。
* 其他细节方面：
* 1.script的id
* 2.url的拼接，是否要传递参数
* 3.回调函数命名的随机性
* */
```







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



