


function ajax (opations){
    return new Promise((resolve,reject)=>{
        var xhr = new XMLHttpRequest();

        var method = opations.method || 'GET';
        var url = opations.url;
        var data = opations.data;

        xhr.open(method,url,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4  ){
                if(xhr.status == 200){
                    resolve(JSON.parse(xhr.responseText));
                }else{
                    reject(new Error('数据请求失败'))
                }    
            }
        }
        // 为了防止上面那个方法还没有赋值完成
        if(method == 'POST'){
            xhr.send(data);
        }else{
            xhr.send();
        }
    })
}

ajax({
    method:'POST',
    url:'http://106.13.75.179/api/student/queryAllStudent',
    data:{

    }
}).then((val)=>{
    console.log(val)
}).catch(error=>{
    console.log(error)
})