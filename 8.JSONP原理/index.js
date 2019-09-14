function JSONPAjax(opations){
    // var url = opations.url;
    // // 生成一个随机函数
    // var callback = "cb" + Math.floor(Math.random()*10000);
    // // 在window上添加这个函数
    // window[callback] = opations.success;
    // // 生成script标签
    // var script = document.createElement('script');
    // // 将请求作为script的src属性发送出去
    // // 发送的请求是否存在参数
    // if(url.indexOf("?") > 0){
    //     script.src = url + "&callback=" +callback;
    // }else{
    //     script.src = url + "?callback=" + callback;
    // }
    // script.id = callback;
    // document.body.appendChild(script)
}



JSONPAjax({
    url:'https://developer.duyiedu.com/edu/testJsonp',
    success(data){
        console.log(data)
    }
})