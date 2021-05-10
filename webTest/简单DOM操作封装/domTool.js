var domTool = function () { //构造函数模式，
    var flag = "getElementsByClassName" in document;
    console.log(flag);
    //getElementByClassName 在ie中是不存在的，用这个来判断是否为IE浏览器;
}

domTool.prototype = { //dom操作方法定义在domTool的原型对象上的;
    constructor: domTool, //重写prototype后，constructor会指向一个新的构造函数，
    //也就是现在创建的这个，我们要用到原来构造函数里的flag，所以在这里重新指向domTool;
    //常用函数
    getElementByClassName: function (context, cName) { //获取指定类名的元素 ，返回数组（不是伪数组）
        //原函数返回的是伪数组，且不支持ie浏览器
        var context = context || documnet;//判断是否传入父元素
        var arr = [];
        if (this.flag) {
            return this.listToArray(context.getElementByClassName(cName));
        }
        var allNode = context.getElementByTagName("*");
        var reg = new RegExp(cName);
        for (var i = 0; i <= allNode.length; i++) {
            if (reg.test(allNode[i])) {
                arr.push(allNode[i]);
            }
        }
        return arr;
    },
    toJSON: function (JSONStr) { //将JSON字符串转换为json对象
        var jsonObj = null;
        try {
            jsonObj = JSON.parse(jsonStr);//如果支持 JSON.parse则直接使用 JSON.parse将JSON字符串转换为JSON对象。
        } catch (e) {
            jsonObj = eval("(" + jsonStr + ")"); //eval会以代码的形式执行传入的字符串
            //因为json字符串是以{}开头结尾的，必须加括号区分，否则会执行{}内语句
        }
        return jsonObj;
    },
    listToArray: function (likeAry) {//类数组转化为数组；
        var ary = [];
        if (this.flag) {
            ary = [].slice.call(likeAry, 0);//[].slice.call(arguments)能将具有length属性的对象转成数组。
        } else {                           //Array.prototype.slice.call(arguments);本质上没有区别，但是经过专业测试，前者快一点
            for (var i = 0; i < likeAry.length; i++) {
                ary.push(likeAry[i]);
            }
        }
        return ary;
    },
    //dom操作
    getEleChildren: function (parent, tagName) {//获取指定节点名的元素节点们；第二个参数如果不传，返回obj下的所有子元素节点；
        var allNode = parent.childNodes,
            arr = [],
            reg = new RegExp("^" + tagName + "$", "i");
        for (var i = 0; i < allNode.length; i++) {
            if (allNode[i].nodeType === 1) {
                if (tagName) {//tagName不可能为0，false之类的数；所以可以用if直接判断传进来的参数；
                    if (reg.test(allNode[i].nodeName)) {
                        arr.push(allNode[i]);
                    }
                    continue;
                }
                arr.push(allNode[i]);
            }
        }
        return arr;
    },
    getFirst: function (curEle) {//获取第一个元素节点；
        var children = this.getEleChildren(curEle);
        return children.length > 0 ? children[0] : null; //三元运算符
    },
    getLast: function (curEle) {//获取最后一个元素节点；
        var children = this.getEleChildren(curEle);
        return children.length > 0 ? children[children.length - 1] : null;
    },
    getPre: function (curEle) {//上一个兄弟节点；
        if (this.flag) {
            return curEle.previousElementSibling; //普通浏览器
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {//排除文本节点
            pre = pre.previousSibling;
        }
        return pre;
    },
    getPres: function (curEle) {//获得所有哥哥们；
        var ary = [],
            attr = this.flag ? "previousElementSibling" : "previousSibling";
        var pre = curEle[attr];
        while (pre) {
            if (pre.nodeType === 1) {
                ary.unshift(pre);
            }
            pre = pre[attr];
        }
        return ary;

    },
     getNext: function (curEle) {//下一个弟弟节点，第一个弟弟节点；
        if (this.flag) {
            return curEle.nextElementSibling;
        }
        var next = curEle.nextSibling;
        while (next && next.nodeType !== 1) {
            next = next.nextSibling;
        }
        return next;
    },
    getNexts: function (curEle) {//获取所有的弟弟们；
        var ary = [],
            next = this.getNext(curEle);
        while (next) {
            ary.push(next);
            next = this.getNext(next);
        }
        return ary;
    },
    getSibling: function (curEle) {//获取上一个哥哥和下一个弟弟；
        var ary = [],
            pre = this.getPre(curEle),
            next = this.getNext(curEle);
        pre ? ary.push(pre) : void 0;
        next ? ary.push(next) : void 0;
        return ary;
    },
    getSiblings: function (curEle) {//获取所有的兄弟们（除了自己）
        var pres = this.getPres(curEle),
            nexts = this.getNexts(curEle);
        return pres.concat(nexts);
    },
    getIndex: function (curEle) {//获取元素的索引值；
        return this.getPres(curEle).length;
    },



    /***设置CSS***/
    // 获取css属性值
    getCss:function(curEle,attr) {
        var reg = /^(?:margin|padding|border|float|position|display|background|backgroundColor)$/;
        var value = this.flag ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
        return !reg.test(attr) ? parseFloat(value) : value;
    },
    // 设置css属性值
    setCss:function (curEle,attr,value) {//设置CSS属性值
        {
            switch (attr) {
                case "opacity":
                    curEle["style"][attr] = value;
                    curEle["style"]["filter"] = "alpha(opacity=" + (value * 100) + ")";
                    break;
                case "float":
                    curEle["style"].cssFloat = value;
                    curEle["style"].styleFloat = value;
                    break;
                case "backgroundColor":
                    curEle["style"][attr] = value;
                    break;
                case "zIndex":
                    curEle["style"][attr] = value;
                    break;
                default:
                    curEle["style"][attr] = !isNaN(value) ? value += "px" : value;
            }
        }
    },
    setGroupCss: function (curEle,cssObj) {//给元素设置一组属性；cssObj是一个对象类型；
        for (var key in cssObj) {
            this.setCss(curEle, key, cssObj[key]);
        }
    },

    hasClassName: function (curEle,cName) {//判断是否有某个className；
        var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)");
        return reg.test(curEle.className);
    },
    addClassName: function (curEle,cName) {//增加某个className；
        if (!this.hasClassName(curEle,cName)) {
            curEle.className += (" " + cName);
        }
    },
    removeClassName: function (curEle,cName) {//移除类样式的方法；
        var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)", "g");
        if (this.hasClassName(curEle,cName)) {
            curEle.className = curEle.className.replace(reg, " ");
        }
    }
}
