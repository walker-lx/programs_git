$(function() {
    FastClick.attach(document.body);
    var ua=navigator.userAgent.toLocaleLowerCase();
    var wnl=ua.indexOf("wnl")>-1;
    var wx=ua.indexOf("micromessenger")>-1;
    var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
    var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
    var isAndroid=ua.indexOf("android")>-1;
    var isWP=ua.indexOf("windows phone")>-1;
    $('.llsBanner').on('touchstart',function() {
        if(isAndroid) {
            if(wx) {
                window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.lilith';
            }
                window.location.href = "https://qiniu.image.cq-wnl.com/lilith/download/android.apk?v=201708161443";           
        }else {
            if(wx) {
                window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.lilith';
            }
                window.location.href = "https://itunes.apple.com/cn/app/id1261255522?mt=8";             
        }
    })
})