# 防抖
## 为什么要进行防抖
在有些时候不希望在事件持续触发的过程中那么频繁地去执行函数,此时,我们就可以采取防抖这种策略。
当函数在delay时间内再次被触发，函数就不执行，直到delay时间内没有被再次触发才执行该函数。
## 调用形式
$.debounce(handle,delay);  
其中，handle为要进行防抖的函数，delay为设定的时间区间。
## 实现代码
```javascript
    plugin.prototype.debounce = function (handle, delay) {
        var timer = null;
        return function () {
            var self = this;
            var args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                handle.apply(self, args)
            }, delay)
        }
    };
```
