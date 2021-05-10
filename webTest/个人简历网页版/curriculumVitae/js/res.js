;
(function(win){
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem(){
        var width = docEl.getBoundingClientRect().width; //获取屏幕宽度
        if(width > 640){  //最大宽度
            width = 640;
        }
        //设计1rem ，等于设计稿当中的100px的值
        //这样rem的值就出来了
        var rem = width/6.4
        docEl.style.fontSize = rem +'px';
    }

    win.addEventListener('resize', function(){
        this.clearTimeout(tid); //取消执行code，每当缩放的时候，先取消前一个定时器，在开启下一个定时器
        tid = this.setTimeout(refreshRem,300); //开启定时器
    },false);
    win.addEventListener('pageshow', function(){
        if(this.event.persisted) {
            this.clearTimeout(tid);
            tid = this.setTimeout(refreshRem,300);
        }
    },false);
    refreshRem();
})(window);