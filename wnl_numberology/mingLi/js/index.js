$(function(){
	FastClick.attach(document.body);
    $("a").bind('taphold', function(event) {
        event.preventDefault();
    });

    var ua = window.navigator.userAgent;
    var appVersion = parseInt(ua.split(' ').pop().replace(/\./g, ''))
    var sysVersion = GetIOSVersion() || getAndroidVersion();
    console.log("appver:"+ appVersion + "sysver:" +sysVersion);
    function GetIOSVersion() {
        if (window.MSStream) {
            return false;
        }
        var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
            version;
        if (match !== undefined && match !== null) {
            version = [
                parseInt(match[1], 10),
                parseInt(match[2], 10),
                parseInt(match[3] || 0, 10)
            ];
            return parseFloat(version.join('.'));
        }
        return false;
    }

    function getAndroidVersion() {
        ua = ua.toLowerCase();
        var match = ua.match(/android\s([0-9\.]*)/);
        return match ? parseFloat(match[1]) : false;
    }

    var pushToken=getQueryString("pushToken");
    var deviceMacId=getQueryString("mac");
    var wnlUserId=getQueryString("userId");
    var appver=appVersion || getQueryString("appver");
    var model=getQueryString("model");
    var osver=sysVersion || getQueryString("osver");
    var bundle=getQueryString("bundle");
    var idfa=getQueryString("idfa");
    var gid=getQueryString("gid");
    //新增参数
    var deviceId=getQueryString("deviceId") || getQueryString("deviceid");
    var boundId=getQueryString("boundId") || getQueryString("boundid");
    var posId=getQueryString("posId") || getQueryString("posid");
    var imei=getQueryString("imei");

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
        //新增参数
        localStorage.setItem("deviceid",deviceId);
        localStorage.setItem("boundid",boundId);
        localStorage.setItem("posid",posId);
        localStorage.setItem("imei",imei);
    }
    var versioncode=getQueryString("versioncode");
    if(versioncode){
        $(".title").addClass("hidden");
        localStorage.setItem("versioncode",versioncode);
    }
    else{
        localStorage.removeItem("versioncode");
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }


    var ua=navigator.userAgent.toLocaleLowerCase();
    var wnl=ua.indexOf("wnl")>-1;
    /*if (ua.indexOf("wnl")===-1){
        $(".wnlBannerLink").removeClass("hidden");
        $(".bannerBtn").addClass("hidden");
    }*/
    if(!wnl){
        $(".wnlBanner").show();
        $(".bannerBtn").hide();
    }
    $(".closeBanner").click(function(){
        $(".wnlBanner").hide();
        $(".main").css("marginBottom","0px");
    });
    $(".downloadBtn").click(function(){
        var wx=ua.indexOf("micromessenger")>-1;
        var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
        var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
        var isAndroid=ua.indexOf("android")>-1;
        if(wx){
            location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
        }
        else{
            if(isIOS){
                location.href="http://um0.cn/89wDL";
            }
            else if(isAndroid){
                location.href="http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]";
            }
            else{
                location.href="http://www.51wnl.com";
            }
        }
    });
});