/**
 * Created by maguoqiang on 2017/1/10.
 */
/**
 * 第一次在jQuery中看到这种写法，很是纠结这是什么意思。
 后来经查证，这是一对括号中定义了一个匿名函数并马上对其进行调用，这段代码是马上执行的。最后面那个小括号
 及里面的参数就是对这个匿名函数调用及传的参数。


 参数undefined主要是解决ie8的一个bug 例1： var undefined = '111' ;(function(window) { alert(undefined);//IE8 '111' 其他浏览器 显示undefined
 */
    //此种方式所有浏览器(包含ie8)undefined
/*var undefined="dddd";
(function(window,undefined){
    alert(undefined);
})(window);*/
//此种方式ie8 弹出ddd,其余浏览器为undefined
var undefined="ddd";
(function(window){
    alert(undefined);
})(window);

var mgq=(function(){
    console.log("out run.");
    var mgq=function(){
        console.log("in run.");
        return mgq;
        };
})();

var a = "a";
(function(){
    var a="b";
    alert(a);//b
})();
alert(a);//a

