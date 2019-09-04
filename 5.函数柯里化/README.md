# 函数柯里化

## 什么是函数柯里化
- 函数柯里化就是将一个多参数的函数转为少参数甚至单参数的函数执行。
## 作用
- 用以处理多参数函数被反复调用且每次调用时传入的参数都相同的场景：  
比如：

```javascript
ajax(method,url,data);
调用的时候:
ajax('post','www.baidu.com/web/info','name=xxx&age=18');  
ajax('post','www.baidu.com/web/test','name=ppp&age=19');  
ajax('post','www.baidu.com/web/test','name=dida&age=30'); 
```
此时就可以利用柯里化来对其进行处理，固定每次调用的相同的参数，  提高代码的可维护性和阅读性。
由于前两次调用的请求方式都为post，因此我们可以将post这个参数进行固定
var postAjax = Curry(ajax,'post');//此处的post即为要固定的参数，接下来用postAjax进行调用的时候，就不用再次传入post这个参数了，只需要将剩下的两个参数传入就可以了。  
即：
```javascript
postAjax('www.baidu.com/web/test','name=ppp&age=19')；  
postAjax('www.baidu.com/web/test','name=dida&age=30')；
```
此时，由于前两个参数又相同了，因此我们可以再次进行柯里化：   
var postAjaxParams = postAjax('www.baidu.com/web/test')；
执行时只需：
```javascript
postAjaxParams('name=ppp&age=19');   
postAjaxParams('name=dida&age=30');   
```
## 函数Curry调用形式
```javascript
var handle = Curry(func);
```
func为要进行柯里化的函数，handle接受Curry的返回值，即上文中的postAjax和postAjaxParams。  

## 方法实现
```javascript
plugin.prototype.Curry = function (func) {
        var args = [].slice.call(arguments, 1);
        var slef = this;
        return function () {
            var totalParams = args.concat([].slice.call(arguments, 0));
            if (func.length == totalParams.length) {
                return func.apply(this, totalParams)
            } else {
                totalParams.unshift(func);
                return Curry.apply(slef, totalParams)
            }
        }
    }
```