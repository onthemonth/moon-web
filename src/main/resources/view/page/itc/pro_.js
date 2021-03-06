// 在框架中只有 Mgq 与 I 暴露在外面, 其余的所有内容应该在闭包中
(function (window, undefined) {


// 定义Mgq构造函数
    function Mgq(selector) {
        console.log(Mgq.fn.init);
        console.log(Mgq.fn.init.prototype);
        return new Mgq.fn.init(selector);
    }

    Mgq.fn = Mgq.prototype = {
        constructor: Mgq,

        type: 'Mgq',

        length: 0,

        // 核心模块内容
        init: function (selector) {
            // 假设 这里 的 init 就是 jq 的init, 因此可以考虑各种参数

            // '', null, undefined
            if (!selector) {
                return this;
            }


            // str
            if (typeof selector == 'string') {
                // 这里可能是 html 的字符串, 也可能是 选择器
                if (selector.charAt(0) === '<') {
                    // 是 html 字符串
                    // 将字符串转换成 DOM 对象, 并加到 this 中
                    [].push.apply(this, Mgq.parseHTML(selector));
                } else {
                    // 是选择器
                    // 获取元素, 并加到 this 中
                    // 使用 Mgq.Select
                    [].push.apply(this, Mgq.Select(selector));
                }
                return this;
            }


            // fn
            if (typeof selector == 'function') {
                // 此时发现事件处理有一定的问题, 因此对于页面下载的 onload 方法必须重新实现
                // window.onload = selector;
                // 如果不考虑事件的追加, 那么直接这么写即可

                // 如果需要考虑事件追加, 那么直接看有没有已经绑定的事件处理函数
                // 如果没有, 直接赋值. 即 window.onload = selector;
                // 但是如果有函数怎么办?
                // 如果有, 将已经绑定的函数取出来, 和当前传入的函数组合到一起. 只要保证顺序 与 最终可以被调用即可

                var oldFunc = window.onload;

                if (typeof oldFunc === 'function') {

                    // 将 oldFunc 与 selector 组合一下, 保证最后页面加
                    // 载完毕后可以被调用, 并且先调用 oldFunc, 再调用 selecotr
                    window.onload = function () {
                        oldFunc();
                        selector();
                    };
                } else {
                    window.onload = selector;
                }
            }

            // dom
            if (selector.nodeType) {
                // this[this.length++] = selector;
                this[0] = selector;
                this.length = 1;
                return this;
            }

            // Mgq
            if (selector.type == 'Mgq') {
                // 如果是 Mgq 对象简单的来说就是返回 这个对象就可以了

                // 理论上说 如果传入的就是一个 Mgq 对象什么也不做, 因此
                // 可以直接返回该对象, 但是会将刚刚创建的 this 丢掉.
                // 或者将 selector 中的 所有项 加到 this 中, 返回 this
                // Mgq 对象之间区别, 实际上就是这个 数组项

                // return selector;

                [].push.apply(this, selector);
                return this;

            }

            // 不知道的 return this
            // 这里返回, 返回的内容就是一个 空的 伪数组, 但是带有原型中的方法
            // 需要用一个 DOM 对象初始化这个 Mgq 对象
            // 需要在 这个伪数组中存储一个 DOM 对象.

            // 数组的情况
            // 如果传入的东西不是上面的各种类型, 直接将其当做数组处理
            // 默认就是伪数组, 如果不是伪数组就放到伪数组的第 0 项中
            if (selector.length >= 0) {
                [].push.apply(this, selector);
            } else {
                this[0] = selector;
                this.length = 1;
            }
            return this;
        },

        // 将 Mgq 对象转换成数组返回
        toArray: function () {
            return [].slice.call(this, 0);
        },

        // 根据参数返回 DOM 对象或 DOM 数组
        get: function (index) {
            if (index === undefined) {
                return this.toArray();
            } else {
                if (index >= 0) {
                    return this[index];
                } else {
                    return this[this.length + index];
                }
            }
        },


        eq: function (index) {
            var newObj = this.constructor(this.get(index));
            newObj.prev = this;
            return newObj;
        },

        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },


        each: function (callback) {

            Mgq.each(this, callback);
            return this;
        },

        map: function (callback) {

            return Mgq.map(this, callback);

        }


    };
    Mgq.fn.init.prototype = Mgq.fn;

// 添加 extend 方法
    Mgq.extend = Mgq.fn.extend = function (obj) {
        for (var k in obj) {
            this[k] = obj[k];
        }
    };


// 添加核心模块的工具方法
    Mgq.extend({
        each: function (array, callback) {
            if (array.length >= 0) {  // 伪数组和数组
                for (var i = 0; i < array.length; i++) {
                    var res = callback.call(array[i], i, array[i]);
                    if (res === false) {
                        break;
                    }
                }

            } else { // 一般对象

                for (var k in array) {
                    var res = callback.call(array[k], k, array[k]);
                    if (res === false) {
                        break;
                    }
                }

            }
            return array;
        },

        map: function (array, callback) {
            var res = [];
            if (array.length >= 0) { // 数组或伪数组

                for (var i = 0; i < array.length; i++) {
                    var v = callback(array[i], i);
                    if (v !== undefined) {
                        res.push(v);
                    }
                }

            } else { // 对象

                for (var k in array) {
                    var v = callback(array[k], k);
                    if (v !== undefined) {
                        res.push(v);
                    }
                }
            }
            return res;
        }

    });


    /********************************************************
     *
     *
     * 2000 年 1 月 2 日 什么地方 什么时间 实现的 什么功能 作者是 ...
     *
     *
     **********************************************************/




// 选择器模块放到这里
    var Select =

        (function () {

//1> 定义一个 support 对象. 将需要使用的方法进行处理, 得到方法的能力
//2> 需要使用的可能有兼容性的方法, 定义一个可以完成该方法的函数来替代. 在函数内部进行兼容处理
//3> 定义 select 函数. 首先看是否支持 qsa, 如果支持直接使用. 如果不支持自己再来实现

            var support = {},

                rnative = /\[native code\]/,

                push = [].push;	// 一开始就存储方法, 后面再是用的时候就不用每次都创建数组了. 也避免了原型的搜索


// 处理 push 的兼容性问题
            try {

                push.apply([], document.getElementsByTagName('*'));

            } catch (e) {
                // 自定义
                push = {
                    apply: function (a, b) {
                        // 将 b 中的每一个元素加到 a 中
                        for (var i = 0; i < b.length; i++) {
                            a[a.length++] = b[i];
                        }
                        return a.length;
                    }
                };
            }

            support.qsa = rnative.test(document.querySelectorAll + '');
            support.getElementsByClassName = rnative.test(document.getElementsByClassName);
            support.trim = rnative.test(String.prototype.trim + '');


            var div = document.createElement('div');
            support.getElementsByClassName2 = rnative.test(div.getElementsByClassName);


// 判断数组的方法
            support.indexOf = rnative.test(Array.prototype.indexOf + '');


// 判断数组 array 中是否含有 search 元素
// 如果数组支持 indexOf 就应该使用数组提供的方法, 不支持才自定义实现
// indexOf 还需要一个参数, 就是 查找的开始位置
            function indexOf(array, search, startIndex) {
                startIndex = startIndex || 0;

                if (support.indexOf) {
                    return array.indexOf(search, startIndex);
                }

                for (var i = startIndex; i < array.length; i++) {
                    if (array[i] === search) {
                        return i;
                    }
                }
                return -1;
            }


// 提供进行筛选重复的方法
            function unique(arr) {
                var newArr = [];
                for (var i = 0; i < arr.length; i++) {
                    // if ( newArr.indexOf( arr[ i ] ) == -1 ) {
                    if (indexOf(newArr, arr[i]) == -1) {
                        newArr.push(arr[i]);
                    }
                }
                return newArr;
            }


            function getByClass(className, node) {
                if (node == document && support.getElementsByClassName ||
                    node.nodeType == 1 && support.getElementsByClassName2) {

                    return node.getElementsByClassName(className);
                } else {
                    // 用自己的算法实现
                    var arr = [],
                        list = node.getElementsByTagName('*'),
                        tempClassName;
                    for (var i = 0; i < list.length; i++) {
                        // if ( list[ i ].getAttribute( 'class' ).split( ' ' ).indexOf( className ) != -1  ) {
                        tempClassName = list[i].getAttribute('class');

                        if (!tempClassName) continue;
                        // 避免过多的花括号与缩进

                        if (indexOf(tempClassName.split(' '),
                                className) != -1) {

                            arr.push(list[i]);
                        }
                    }
                    return arr;
                }
            }

            function trim(str) {
                // 将 str 两边的空格去掉
                if (support.trim) {
                    return str.trim();
                }
                return str.replace(/^\s+|\s+$/g, '');
            }


            var Select = function (selector, results) {

                results = results || [];

                if (support.qsa) {

                    push.apply(results, document.querySelectorAll(selector));

                    return unique(results);
                }


                return select2(selector, results);
            }


// 获取元素的基本方法
            function t(tagName, results) {
                results = results || [];
                push.apply(results, document.getElementsByTagName(tagName));
                return results;
            }

            function c(className, results) {
                results = results || [];
                push.apply(results, getByClass(className, document));
                return results;
            }

            function id(idName, results) {
                results = results || [];
                var dom = document.getElementById(idName);
                if (dom) {
                    push.apply(results, [dom]);
                    // results[ results.length++ ] = dom;
                }
                return results;
            }


            function select2(selector, results) {
                // 将字符串 selector split 成一个数组, 然后去除两端的空格, 遍历, 遍历的时候使用 select3
                results = results || [];
                var list = selector.split(',');
                for (var i = 0; i < list.length; i++) {

                    select3(trim(list[i]), results);

                }
                return unique(results);
            }


            function select3(selector, results) {
                // 只考虑 4 个基本选择器: #id, .className, tag, *
                // 判断传入的 selector 是四种选择器中的哪一种
                var first = selector.charAt(0);

                if (selector.split(' ').length === 1) {
                    // 如果中间不含有空格, 那么就考虑基本选择器
                    if (selector === '*') {
                        return t(selector, results);
                    } else if (first === '#') {
                        return id(selector.slice(1), results);

                    } else if (first === '.') {
                        return c(selector.slice(1), results);

                    } else {
                        return t(selector, results);
                    }
                } else {
                    // 处理其他的选择器
                    throw new Error('当前版本还不支持该选择器, 请联系 .....');
                }
            }


            return Select;

        })();

    Mgq.Select = Select;


// DOM 操作模块放到这里
// 工具方法
//var node = document.createElement( 'div' );
//Mgq.parseHTML = function ( str ) {
//	node.innerHTML = str;
//	var arr = [];
//	arr.push.apply( arr, node.childNodes );
//	return arr;
//};
    Mgq.parseHTML = (function () {

        var node = document.createElement('div');

        function parseHTML(str) {
            node.innerHTML = str;
            var arr = [];
            arr.push.apply(arr, node.childNodes);
            return arr;
        }

        return parseHTML;

    })();


// DOM 实例方法

    Mgq.extend({
        append: function (parent, element) {
            parent.appendChild(element);
        },
        prepend: function (parent, element) {
            parent.insertBefore(element, parent.firstChild);
        }

    });


    Mgq.fn.extend({
        // 1> 构造数据原型
        // 2> 添加
        // 3> 返回新数据
        appendTo: function (selector) {
            var iObj = this.constructor(selector);
            var tObj;
            var newObj = this.constructor();  // 创建一个新对象. 用于构成链的变化
            var arr = [];
            for (var i = 0; i < iObj.length; i++) {
                for (var j = 0; j < this.length; j++) {

                    tObj = i === iObj.length - 1
                        ? this[j]
                        : this[j].cloneNode(true);

                    arr.push(tObj);

                    // iObj[ i ].appendChild( tObj );
                    Mgq.append(iObj[i], tObj);
                }
            }

            [].push.apply(newObj, arr);

            newObj.prev = this;

            return newObj;
        },


        end: function () {
            return this.prev || this;  // 恢复链
        },

        append: function (selector) {
            this.constructor(selector).appendTo(this);
            return this;
        },

        prependTo: function (selector) {
            var iObj = this.constructor(selector);
            var tObj;
            var newObj = this.constructor();  // 创建一个新对象. 用于构成链的变化
            var arr = [];
            for (var i = 0; i < iObj.length; i++) {
                for (var j = 0; j < this.length; j++) {

                    tObj = i === iObj.length - 1
                        ? this[j]
                        : this[j].cloneNode(true);

                    arr.push(tObj);

                    Mgq.prepend(iObj[i], tObj);
                }
            }

            [].push.apply(newObj, arr);

            newObj.prev = this;

            return newObj;
        },
        prepend: function (selector) {
            this.constructor(selector).prependTo(this);
            return this;
        }
    });


// 事件处理
    Mgq.fn.extend({
        on: function (type, callback) {
            return this.each(function (i, v) {
                this.addEventListener(type, callback);
            });
        },
        off: function (type, callback) {
            return this.each(function () {
                this.removeEventListener(type, callback);
            });
        }
    });

    Mgq.each(("onblur,onfocus,onclick,onmousedown,onmouseenter,onmouseleave,onmousemove,onmouseout," +
    "onmouseover,onmouseup,onmousewheel,onkeydown,onkeypress,onkeyup").split(','), function (i, v) {

        // 此时 v 是每一个 事件, 例如 'onclick', 去掉 on, slice( 2 )
        var event = v.slice(2);
        Mgq.fn[event] = function (callback) {
            return this.on(event, callback);
        };

    });


    Mgq.extend({
        getStyle: function (dom, name) {
            if (dom.currentStyle) {
                // IE 低版本
                return dom.currentStyle[name];
            } else {
                return window.getComputedStyle(dom)[name];
            }
        }

    });

    Mgq.fn.extend({
        css: function (name, value) {
            if (typeof name === 'string' && typeof value === 'string') {
                // 带有两个参数
                // 遍历设置
                this.each(function () {
                    // this 就是 DOM 对象
                    this.style[name] = value;
                });

            } else if (typeof name === 'string' && value === undefined) {
                // 获取样式值
                return Mgq.getStyle(this.get(0), name);
            } else if (typeof name === 'object' && value === undefined) {
                // 遍历添加多个样式
                this.each(function () {
                    // this 就是 DOM 对象
                    for (var k in name) {
                        this.style[k] = name[k];
                    }

                    /*
                     var that = this;
                     I.each( name, function ( k, v ) {
                     that.style[ k ] = v;
                     });
                     */
                });
            }
            return this;
        },

        addClass: function (name) {

            // 遍历每一个 DOM 对象, 如果没有该类属性就加上
            this.each(function () {
                // this 是 DOM 对象
                var value = this.className; // undefiend, "   "
                // 'c1 c2 c3'
                if (!value) {  // 没有 类名属性
                    this.className = name;
                } else if (value.split(' ').indexOf(name) == -1) {
                    this.className += ' ' + name;
                }
            });

            return this;
        },
        removeClass: function (name) {
            // 如果含有就移除, 如果没有就不管
            // 应该考虑循环移除
            // 就是如果用户添加了同名的类名, 应该全部移除
            // 循环移除
            this.each(function () {
                // this 就是 DOM 元素
                var value = this.className;
                // 需要移除的是 value 中的 name 值
                var arr = value.split(' ');
                var tmp;

                while (( tmp = arr.indexOf(name) ) != -1) {
                    arr.splice(tmp, 1);
                }

                // 赋值给 this.className
                this.className = arr.join(' ');
            });
            return this;
        },
        hasClass: function (name) {

            // 遍历凡是含有 的就是返回 true
            var res = this.map(function (v, i) {
                // v 就是 DOM 元素
                // 如果 v.className 中 含有 name 就返回一个 true
                // 为了可以减少更多的判断, 凡是看到 true 就 return
                var arr = v.className.split(' ');

                if (arr.indexOf(name) != -1) {
                    return true; // 如果不含有, 那么就不反回, 只有含有的时候才返回
                }
            });
            return res.length > 0;

            // ES5 中有 some
            // this 是伪数组
            /*
             return [].slice.call( this, 0 ).some(function ( v, i ) {
             return new RegExp( '\\b' + name + '\\b', 'g' ).test( v.className )
             });*/
        },

        toggleClass: function (name) {
            var that = this;
            this.each(function () {
                if (that.constructor(this).hasClass(name)) {
                    // 有
                    that.constructor(this).removeClass(name);
                } else {
                    // 没有
                    that.constructor(this).addClass(name);
                }
            });
            return this;
        }

    });


// 属性操作
    Mgq.fn.extend({

        attr: function (name, value) {

            if (typeof name === 'string' && typeof value === 'string') {
                this.each(function () {
                    // this DOM 对象
                    this.setAttribute(name, value);
                });
            } else if (typeof name === 'string' && value === undefined) {
                return this[0].getAttribute(name);
            } else if (typeof name === 'object' && value === undefined) {
                this.each(function () {
                    for (var k in name) {
                        this.setAttribute(k, name[k]);
                    }
                });

            }
            return this;
        },

        removeAttr: function (name) {
            if (typeof name === 'string') {
                this.each(function () {

                    // this 就是 DOM 对象
                    this.removeAttribute(name);
                });

            }
            return this;
        },


        prop: function (name, value) {

            if (typeof name === 'string' && typeof value === 'function') {
                this.each(function (v, i) {
                    // this DOM 对象
                    this[name] = value.call(this, this, i);
                });
            } else if (typeof name === 'string' && typeof value === 'boolean') {
                this.each(function () {
                    // this DOM 对象
                    this[name] = value;
                });
            } else if (typeof name === 'string' && value === undefined) {
                return this[0][name];
            } else if (typeof name === 'object' && value === undefined) {
                this.each(function () {
                    for (var k in name) {
                        this[k] = name[k];
                    }
                });

            }
            return this;

        },


        text: function (text) {
            if (typeof text == 'string') {
                this.each(function () {
                    this.innerText = text;
                });
            } else if (text === undefined) {
                return this.get(0).innerText;
            }
            return this;
        },

        html: function (html) {
            if (typeof html == 'string') {
                this.each(function () {
                    this.innerHTML = html;
                });
            } else if (html === undefined) {
                return this.get(0).innerHTML;
            }
            return this;
        },

        val: function (value) {
            if (typeof value == 'string') {
                this.each(function () {
                    this.value = value;
                    // I( this ).attr( 'value', value );
                });
            } else if (value === undefined) {
                return this.get(0).value;
            }
            return this;
        }


    });


// 工具方法

// 模块方法


    window.Mgq = window.I = Mgq;

})(window);


















