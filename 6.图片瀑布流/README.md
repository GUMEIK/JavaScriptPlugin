# waterfall
## 什么是瀑布流
瀑布流就是根据容器宽度改变自适应调整图片位置
## 实现主要思路
### 图片宽度
图片宽度要为相同宽度，如此方可以宽度改变进行自适应调整
### 图片之间的间隙
首先，设置图片为绝对定位元素；接着判断要插入的父级是不是定位元素，若是，则不作处理；若不是，设置其为相对定位元素（对文档页面的影响最小）。
- 水平间隙
每张图片的left = (imgWidth(图片宽度) + GapH(水平方向图片间隙))*index(该图片在此行中的索引)
- 垂直间隙   
重复以下步骤：
1. var arr = [0,0,0,0,0];//假设有一行有五张图片，数组的每一位代表下一张图片的top值
2. 将所有图片存放至数组中，循环数组，取arr中最小的值minTop，设置其top值为minTop+'px'　　　　　
当第几次循环的时候，从数组随机取出一位因为其都是０，此图片的高度就是０+minTop，即第一行的图片都挨着容器顶部；
当第二栏循环的时候，假设数组变为：arr=[35,34,56,67,31]
第二栏第一张被循环的图片的高度为数组中的最低位３１＋最小间隙，接着依次进行循环
### 绑定窗口改变事件
当窗口改变的时候，重新设置图片的位置，为了不那么频繁的去触发函数，可以使用函数防抖，要注意，这个地方使用节流是不好使的。  
### 注意图片的异步加载
在每次创建了一个新的图片元素的时候，都要对其进行设置，因为图片的加载为异步过程，有可能在设置图片位置的时候，图片还没有加载进来，造成页面混乱。为了不过于频繁的执行设置位置的函数，可以使用防抖来进行处理。
## 调用形式
```javascript
$.createrWaterFall({
     minHGap: 5, //水平方向的最小间隙；
     minVGap: 5, //垂直方向的最小间隙；
     imgSrcs: [], //存放图片路径,数组
     imgWidth: 220, //单张图片的宽度
     container:document.getElementsByTagName('body')[0]//放置图片的容器
})

```
## 代码实现
```javascript
    plugin.prototype.createrWaterFall = function (option) {
        var defaultOption = {
            minHGap: 5, //水平方向的最小间隙；
            minVGap: 5, //垂直方向的最小间隙；
            imgSrcs: [], //存放图片路径,数组
            imgWidth: 220, //单张图片的宽度
            container:document.getElementsByTagName('body')[0]
        }
        // 对象混合
        var option = Object.assign({},defaultOption,option);

        var imgs = [];//存放所有的dom图片对象
        // 创建图片元素，函数写里面不会污染全局
        handleParent();
        createImgs();
        // 窗口尺寸变化事件,可以用函数防抖
// 
        var debounce = $.debounce(setImgPosition,300)
        window.onresize = debounce;
       
        function createImgs(){
            // 本来每张图片执行一次都要执行一遍这个函数
            // 执行太频繁了，所以可以用函数防抖来优化一下性能
            var debounce = $.debounce(setImgPosition,50)
            // 循环图片路径数组
            for(var i = 0;i < option.imgSrcs.length;i++){
                // 创建一个图片元素
                var img = document.createElement("img");
                // 设置图片的src属性
                img.src = option.imgSrcs[i];
                // 设置图片宽度
                img.style.width = option.imgWidth + 'px';
                // 将图片做为绝对定位；
                img.style.position = "absolute";
                // 设置动画效果,css3 过度
                img.style.transition = ".5s"
                imgs.push(img)
                // 图片加载完成之后；
                // 文件加载是一个异步的过程；
                // 每张图片加载完成后都要重新调用setImgPosition

                img.onload = debounce();//函数防抖，优化性能
                option.container.appendChild(img);
            }
        }
        
        // 处理父元素为定位元素
        function handleParent(){
            // 如果父元素不是定位元素，则白为realtive;
            // getComputedStyle
            var style = getComputedStyle(option.container)
            // console.log(style.position)
            if(style.position === "static"){
                option.container.style.position = "relative";
            }
        }
        // 设置图片位置(坐标)
        function setImgPosition(){
            var info = getHorizontalInfo();
            // 设置数组，用来存放下一张图片的top值，其长度为图片数量
            var arr = new Array(info.number);
            arr.fill(0);
            // arr = [0,0,0,0,0]
           imgs.forEach(function(img){
            //    从数组取出最小值,如果数值相同，就随机取出来
                var minTop = Math.min.apply(null,arr);
                img.style.top = minTop + 'px';
                // 找到最小值对应的列编号（索引）
                var index = arr.indexOf(minTop);
                arr[index] += img.clientHeight + option.minVGap;
                // 横坐标
                img.style.left = index * (option.imgWidth + info.gap) + 'px';
           })
            // 设置容器高度
            var maxTop = Math.max.apply(null,arr);
            option.container.style.height = maxTop - info.gap + 'px';
        }
        // 得到图片的水平分布信息
        function getHorizontalInfo(){
            // 
            var obj = {};
            // 得到容器宽度
            obj.containerWidth = option.container.clientWidth;
            // 一行有几张照片,只能少，不能多，向下取整
            obj.number = Math.floor((obj.containerWidth + option.minHGap)/(option.imgWidth + option.minHGap));
            // 重新计算图片间隙
            obj.gap = (obj.containerWidth - obj.number*option.imgWidth)/(obj.number - 1);

            return obj;
            // return{
            //     number:5,
            //     containerWidth:1000,//容器宽度
            //     gap:15
            // }
        }

    }
```