# 数组扁平化
数组扁平化就是将一个嵌套多层的数组 array (嵌套可以是任何层数)转换为只有一层的数组。

比如：    

[ [1, 2, 3, [4, 5, [6]], [6, 8] ]]   
经过扁平化后变为：    
 [1, 2, 3, 4, 5, 6, 6, 8]

## 实现原理
- 判断数组中的每一项是不是数组，如果不是，就放进新数组，如果是，则将其数组拆分(想办法使其变为一维数组)出来，然后把拆分之后的内容再次进行判断，如此递归


- 举例 ：
```javascript
[1,2,[3,4]]
arr[0]--->1--->newArr[1];push
arr[1]--->2--->newArr[1,2];push
arr[2]-->[3,4]->newArr[3,4]concat
```

## 实现源码
```javascript
function delayering(arr){
    var newArr = [];
    for(var i = 0;i < arr.length;i++){
        if(arr[i].constructor == Array){
            newArr = newArr.concat(delayering(arr[i]));
        }else{
            // 能进到这里面的都是一维数组
            // push(操作原数组)或者concat(返回新数组)
            // newArr = newArr.concat(arr[i]);
            // 此处即为递归的出口
            newArr.push(arr[i])
        }
    }
    return newArr;
}
```

