# 深度克隆
无论是数组还是对象，都可以使用for(var prop in obj/arr){},如果是数组，prop就是被循环的索引位；
## 克隆过程(origin,target)
1. 判断prop是否是对象本身而不是原型上的属性；
```javascript
origin.hasOwnProperty(prop)
```
2. 判断origin[prop]是原始值还是引用值。  若是引用值直接克隆
```javascript
if(origin[prop] == 'object'){

}else{
    target[prop] = origin[prop];
}
```
3. 若origin[prop]是引用值，则判断是数组还是对象，并建立相应的空数组或空对象
```javascript
if(origin[prop] == 'object'){
    if(Object.prototype.toString(origin[prop]) == '[object Array]'){
        target[prop] = [];
    }else{
        target[prop] = {}
    }
}else{

}
```
4. 执行递归，对 origin[prop] 和 target[prop]重新进行deepClone,出口为origin[prop] 为原始值
## 实现代码
