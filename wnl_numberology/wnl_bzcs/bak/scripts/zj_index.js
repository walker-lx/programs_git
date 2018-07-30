$(function(){
    if (navigator.userAgent.toLowerCase().indexOf("android")===-1){
        FastClick.attach(document.body);
    }
    $("a").bind('taphold', function(event) {
        event.preventDefault();
    });
    var pushToken=getQueryString("pushToken");
    var deviceMacId=getQueryString("machash");
    var wnlUserId=getQueryString("wnlid");
    var appver=getQueryString("appver");
    var model=getQueryString("model");
    var osver=getQueryString("osver");
    var bundle=getQueryString("bundle");
    var idfa=getQueryString("idfa");
    var gid=getQueryString("gid");
    if(osver){
        localStorage.setItem("pushToken",pushToken);
        localStorage.setItem("deviceMacId",deviceMacId);
        localStorage.setItem("wnlUserId",wnlUserId);
        localStorage.setItem("appver",appver);
        localStorage.setItem("model",model);
        localStorage.setItem("osver",osver);
        localStorage.setItem("bundle",bundle);
        localStorage.setItem("idfa",idfa);
        localStorage.setItem("gid",gid);
    }
    var versioncode=getQueryString("versioncode");
    if(versioncode){
        localStorage.setItem("versioncode",versioncode);
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
    $(".item_link").click(function () {
       var href=$(this).data("href");
        var ua=navigator.userAgent.toLocaleLowerCase();
        if (ua.indexOf("wnl")===-1){
            drawToast("更多测算功能，请下载万年历");
            var down_href="";
            var wx=ua.indexOf("micromessenger")>-1;
            var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
            var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
            var isAndroid=ua.indexOf("android")>-1;
            if(wx){
                down_href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
            }
            else{
                if(isIOS){
                    down_href="http://um0.cn/89wDL";
                }
                else if(isAndroid){
                    down_href="http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]";
                }
                else{
                    down_href="http://www.51wnl.com";
                }
            }
            setTimeout(function () {
                location.href=down_href;
            },500);
            return false;
        }
        //location.href=href;
    });
    //var old_top= 0,new_top=0;
    //$(".test").on("touchstart", function () {
    //    old_top=document.body.scrollTop;
    //});
    //$(".test").on("click", function () {
    //    setTimeout(function () {
    //        new_top=document.body.scrollTop;
    //        $(".tel_txt").html(old_top+"   "+new_top+"    "+(new_top-old_top));
    //    },700);
    //})

});
var intervalCounter = 0;
function drawToast(message) {
    var alert = document.getElementById("toast");
    alert.style.opacity = .9;
    alert.innerHTML = message;
    var client_width=alert.clientWidth;
    alert.style.marginLeft="-"+client_width/2+"px";
    intervalCounter = setInterval(function(){
        var alert = document.getElementById("toast");
        alert.style.opacity = 0;
        clearInterval(intervalCounter);
    }, 1500);
}
var title="万年历的专家亲测很准的哦，小伙伴们也快来试一下";
var textObj = {
    text: title,
    image: "1",
    url:"http://coco70.youloft.cn/mingli/zj_index.html",
    pureText:title,
    prefix:""
};
var textObj1={
    text: title,
    image: "1",
    targetUrl:"http://coco70.youloft.cn/mingli/zj_index.html",
    perfix:""
};
function appCallback_share(){
    try{
        if(window.ylwindow){
            ylwindow.reportHasShare(true);
            location.href="protocol://share:" + encodeURI(JSON.stringify(textObj1));
        }
        else{
            location.href="protocol://share#" + encodeURI(JSON.stringify(textObj));
        }
    }
    catch (e){}
    return 1;
}