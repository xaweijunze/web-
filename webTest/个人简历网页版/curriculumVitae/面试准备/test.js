// 1.时间函数
function getDates() {
    var newTime = new Date();
    var year = newTime.getFullYear();
    var month = newTime.getMonth() + 1;
    var data = newTime.getDate();
    var hour = newTime.getHours();
    var min = newTime.getMinutes();
    var second = newTime.getSeconds();
    var weekday = toWeek(newTime.getDay());
    return `现在是北京时间：${year}年${month}月${data}日 星期${weekday} ，${hour}时${min}分${second}秒`
}
function toWeek(day) {
    switch (day) {
        case 0: return "日";
        case 1: return "一";
        case 2: return "二";
        case 3: return "三";
        case 4: return "四";
        case 5: return "五";
        case 6: return "六";
    }
}
// console.log(getDates());//返回的是第几周，从0开始


// 2.斐波那契数列
function toFBNC(n) {
    var arr = n > 0 ? [1] : [];
    for (var i = 1; i < n; i++) {
        arr.push(arr[i - 1] + (i >= 2 ? arr[i - 2] : 0))
    }
    return arr;
}
// console.log(toFBNC(20));

//3、 实现 var a = (5).plus(1).minus(6);
Number.prototype.plus = function (i) {
    return this + i;
}
Number.prototype.minus = function (i) {
    return this * i;
}
// var a = (5).plus(2).minus(6);
// console.log(a);


//4、输出document中所有成员和类型
function outPutAllKeyInDocument() {
    for (key in document) {
        document.write(key + ':' + document[key] + "<br/>");
    }
}
//5、 js添加表格
function createTable(hang, lie) {
    let row = '';
    let cell = '';
    for (var j = 0; j < hang; j++) {
        row = document.createElement('tr');
        document.getElementById('table0').appendChild(row);
        for (var i = 0; i < lie; i++) {
            cell = document.createElement('td');
            cell.innerHTML = "内容";
            row.appendChild(cell);
        }
    }

}
// createTable(2,2);


//6、 实现预加载图片：原理就是，HTML先加载完成一张临时图片，然后通过js加载最终所用的图片
function setImgCss(loadSrc) {
    var img0 = document.getElementById("img0");
    var img1 = new Image();
    img1.src = loadSrc;
    img1.onload = function () { //加载成功后设置图片样式和尺寸
        img0.src = this.src;
        img0.width = 50;
        img0.height = 50;
    }
}
// setImgCss("./img/skill/css.png");

//7、表格元素逆转 ，先获取表格元素，此时是伪数组的形式  
// 方法（1）利用`[].slice.call(arguments)`能将具有`length`属性的对象转成数组。 
function tbUpSetDown1() {
    let oTab = document.getElementById("tab1");
    let oBody = oTab.tBodies[0];
    let oTrs = oBody.rows;
    let a = [];
    for (let index = 0; index < oTrs.length; index++) {
        const element = oTrs[index];
        a.push(element);
    }
    a.reverse();
    for (let i = 0; i < a.length; i++) {
        const element = a[i];
        oBody.appendChild(element);
    }
}



//通过call借用数组的slice方法转换为数组
function tbUpSetDown1() {
    let oTab = document.getElementById("tab1");
    let oBody = oTab.tBodies[0];
    let oTrs = oBody.rows;
    let aRows = Array.prototype.slice.call(oTrs, 0);
    aRows.reverse();
    for (let i = 0; i < aRows.length; i++) {
        const element = aRows[i];
        oBody.appendChild(element);
    }
}
