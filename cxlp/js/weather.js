var ua=navigator.userAgent.toLocaleLowerCase();
var wnl=ua.indexOf("wnl")>-1;
var wx1=ua.indexOf("micromessenger")>-1;
var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
var isAndroid=ua.indexOf("android")>-1;
var isWP=ua.indexOf("windows phone")>-1;
var clientWidth = $(window).width();
var zoom=Math.round(clientWidth * 10000 / 375) / 10000;
if(clientWidth<980&&window.devicePixelRatio>1){
    $('body').css("zoom",zoom);
}
$(function(){
    FastClick.attach(document.body);
    if(document.addEventListener){
        document.addEventListener("touchstart", function(){}, true);
    }

    var data=getQueryString("data");
    if(data){
        data=JSON.parse(data);
        console.log(data);
        $(".location-name").html(data.city);
        $(".temp").html(parseInt(data.wd));
        $(".temp-overview").html(data.tq+' '+data.wd);
        $(".wlist .fs").html(data.fx);
        $(".wlist .sd").html(data.sd);
        if(!data.zs||data.zs==="0"||data.zs.length===0){
            $(".wlist .kq").parent().remove();
        }
        else{
            $(".wlist .kq").html(data.zs+" | "+data.desc);
        }
    }
    $(".rightIcons").height($(".weatherInfoContent").height());
    //{
    //    "city":"城市名称",
    //    "wd":"温度 10-16",
    //    "tq":"天气  晴朗",
    //    "fx":"风向 南风",
    //    "sd":"湿度",
    //    "zs":"空气指数",
    //    "desc":"空气指数描述  轻度污染"
    //}


    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
            //return r[2];
        }
        return null;
    }

    
    if(!wnl){
        $(".wnlBanner").show();
    }
    $(".closeBanner").click(function(){
        $(".wnlBanner").hide();
    });
    $(".downloadBtn").click(function(){
        if(wx1){
            _czc.push(['_trackEvent','weather_download_wx_click', 'click', 'weather_download_wx_click']);
            location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
        }
        else{
            if(isIOS){
                _czc.push(['_trackEvent','weather_download_ios_click', 'click', 'weather_download_ios_click']);
                location.href="http://itunes.apple.com/cn/app/id419805549?mt=8";
            }
            else if(isAndroid){
                _czc.push(['_trackEvent','weather_download_android_click', 'click', 'weather_download_android_click']);
                location.href="http://download.eoemarket.com/app?id=54861&co_id=0&client_id=140&channel_id=807";
            }
            else if(isWP){
                _czc.push(['_trackEvent','weather_download_wp_click', 'click', 'weather_download_wp_click']);
                location.href="http://www.windowsphone.com/en-us/store/app/%E4%B8%87%E5%B9%B4%E5%8E%86/8ffa51ca-df17-e011-9264-00237de2db9e";
            }
            else{
                location.href="http://www.51wnl.com";
            }
        }
    });

});