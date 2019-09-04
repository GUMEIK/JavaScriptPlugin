# 数据类型判断
## 数据的基本类型
### 原始数据类型
String Number Boolean Undefined Null
### 引用数据类型
Function Object Array
## 判别方法
- 首先，大多数数据类型（除了Null,Object,Array）都是可以使用typeof方法进行判断的，因此，数据类型判断的重点其实也就是Null,Object,Array三种数据类型的判断。
### instanceof
```javascript
- null instance of Object --->false
- arr instanceof Array ---> true  
  obj instanceof Array ---> false
- arr instanceof Object --->true  
  obj instanceof Object --->true
  ```
### construct
```javascript
- [].constructor == Array true  
  obj.constructor == Object  true
  - 要注意此处返回的不是字符串
  - 使用此种方法判断null会报错，需要进行处理：
  obj.constructor == 'Object' false
  ```
### toString
```javascript
Object.prototype.toString = function(){

}
```
此方法的调用形式为obj.toString();其内部原理是通过this进行判断是谁在调用该方法，因此，可以通过改变其this指向来进行数据类型的判断

```javascript
返回的是字符串
Object.prototype.toString.call([])  [object Array]
Object.prototype.toString.call(123) [object Number]
Object.prototype.toString.call({})  [object Null]
同样，也会有[object String]，[object Function]，[object Boolean]
```
## 调用形式
$.type(target);  
target 为要进行判断的数据；
## 方法实现
因使用toString()方法最简便也最高大上，所以此处采用此种方法：
```javascript
  plugin.prototype.type = function (target) {
        var result = typeof (target);
        if (result != 'object') {
            return result;
        } else {
            var template = {
                '[object Object]': 'object',
                '[object Array]': 'array',
                '[object Null]': 'null',
            }
            var temp = Object.prototype.toString.call(target);
            return template[temp];
        }
    }
```