# 数组简单去重
## 去重原理
利用对象的相关属性：若一个对象obj不存在xxx属性，则obj.xxx的值为undefined，可利用这一性质对数组进行处理。
## 调用形式
$.uniqueArray(Array)
## 代码实现
```javascript
 plugin.prototype.uniqueArray = function (arr) {
        var obj = {};
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (obj[arr[i]] == undefined) {
                newArr.push(arr[i]);
                obj[arr[i]] = "aaa"
            }
        }
        return newArr;
    }
```
