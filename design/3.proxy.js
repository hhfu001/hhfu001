
/*
当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问。
客户实际上访问的是替身对象。替身对象对请求做出一些处理之后，再把请求转交给本体对象。


此模式最基本的形式是对访问进行控制。
代理对象和另一个对象（本体）实现的是同样的接口，可是实际上工作还是本体在做，它才是负责执行所分派的任务的那个对象或类，
代理对象不会在另以对象的基础上修改任何方法，也不会简化那个对象的接口
*/
// 虚拟代理 设置loading图
var myImage = (function () {
    var imgNode = document.createElement('img');

    document.body.appendChild(imgNode);
    return {
        setSrc: function (src) {
            imgNode.src = src;
        }
    }
})();
var proxyImage = (function () {
    var img = new Image;
    img.onload = function () {
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function (src) {
            myImage.setSrc('file:// /C:/Users/svenzeng/Desktop/loading.gif');
            img.src = src;
        }
    }
})();
proxyImage.setSrc('http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg');



// 虚拟代理 合并请求
var synchronousFile = function (id) {
    console.log('开始同步文件，id 为: ' + id);
};
var proxySynchronousFile = (function () {
    var cache = [], // 保存一段时间内需要同步的 ID
        timer; // 定时器
    return function (id) {
        cache.push(id);
        if (timer) { // 保证不会覆盖已经启动的定时器
            return;
        }
        timer = setTimeout(function () {
            synchronousFile(cache.join(',')); clearTimeout(timer); // 清空定时器 timer = null;
            cache.length = 0; // 清空 ID 集合
        }, 2000);
    }
    // 2 秒后向本体发送需要同步的 ID 集合
})();

