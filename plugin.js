(function () {
    function plugin() {
        return new plugin.prototype.init();
    }
    plugin.prototype.init = function () {
        // 做初始化操作,相当于$()
    }
    // 1.函数防抖
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
    // 2.函数节流
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
    // 3.数组去重:$.uniqueArray(Array),需要用变量来接受返回的新数组
    plugin.prototype.uniqueArray = function (arr) {
        // if(!arr){
        //     return;
        // }
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
    // 4.数据类型判断
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
    // 5.函数柯里化
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
    // 6.图片瀑布流
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

    plugin.prototype.init.prototype = plugin.prototype;
    window.$ = window.plugin = plugin();
}())