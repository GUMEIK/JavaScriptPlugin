
// 1.判断是不是原始值
// 2.判断是数组还是对象
// 3.建立相应的数组或对象
var obj = {
    name:'GUMEI',
    age:18,
    friend:['ming','gangan'],
    other:{
        name:'xzl',
        age:17
    }
}
var obj1 = {};

function deepClone(origin,target){
    target = target || {};
    toStr = Object.prototype.toString;
    for(var prop in origin){
        if(origin.hasOwnProperty(prop)){
            if(origin[prop] !== "null" && typeof(origin[prop]) == 'object'){
                if(toStr.call(origin[prop]) == "[object Array]"){
                    target[prop] = [];
                }else{
                    target[prop] = {};
                }
                deepClone(origin[prop],target[prop])
            }else{
                target[prop] = origin[prop];
            }

        }
    }
    return target;
}
// function deepClone(origin,target){
//     for(var prop in origin){
//         if(origin.hasOwnProperty(prop)){
//             if( origin[prop] !== "null" && typeof origin[prop] == 'object'){
//                 if(Object.prototype.toString(origin[prop]) == "[object Array]"){
//                     target.prototype = [];
//                 }else{
//                     target[prop] = {}
//                 }
//                 deepClone(origin[prop],target[prop]);
//             }else{
//                 target[prop] = origin[prop]
//             }
//         }
//     }
//     return target;
// }