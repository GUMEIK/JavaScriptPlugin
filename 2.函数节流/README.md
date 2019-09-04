# 函数节流
## 为什么要进行函数节流？
其实，函数节流和函数防抖的目的是一样的，其差别在于执行方法不同。  

函数防抖是“delay时间里没有被再次触发再执行函数”，而节流是“不管你delay时间里面触发了多少次，都只执行一次函数”

## 节流的两种版本
### 立即执行版本
利用时间戳进行判断，只要被触发就立即执行，且执行完后没有拖延，而定时器版本在执行完毕后由于定时器的作用，还将要再次执行一次。
### 定时器版本
原理和防抖差不多，只不过“防抖是如果有定时器，就把定时器清除了，不让函数执行”，而“节流是如果有定时器存在，就直接return，不让其破坏定时器的正常执行，并在函数执行完成以后，设置定时器为null”

## 调用形式
$.throttle(handle,delay,immediately)
其中：handle为要进行节流的函数，delay为时间区间，而immediately为是否要进行立即执行版本的节流

## 代码实现
```javascript
plugin.prototype.throttle = function (handle, delay, immediately) {
        if (immediately == undefined) {
            immediately = false;
        }
        if (immediately) {
            var time = null;
            if (!time || Date.now() - time >= delay) {
                handle.apply(this, arguments);
                time = Date.now()
            }
        } else {
            var timer = null;
            return function () {
                var self = this;
                var args = arguments;
                if (timer) {
                    return;
                }
                timer = setTimeout(function () {
                    handle.apply(self, args);
                    timer = null;
                }, delay)
            }
        }
    }
```
