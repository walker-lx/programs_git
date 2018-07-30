$(function () {
    FastClick.attach(document.body);
    if($(window).height()<400&&$(".yiqiDesc1").css("position")==="absolute"){
        $(".yiqiDesc1").css("position","static");
    }
    if($(window).height()<400&&$(".wnlBannerLink").css("position")==="absolute"){
        $(".wnlBannerLink").css("position","static");
    }
    var share=getQueryString("share");
    $(".wnlBannerLink").click(function(){
        var ua=navigator.userAgent.toLocaleLowerCase();
        var wx=ua.indexOf("micromessenger")>-1;
        var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
        var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
        var isAndroid=ua.indexOf("android")>-1;
        if(wx){
            _hmt.push(['_trackEvent','jryc_download_wx_click', 'click', 'jryc_download_wx_click', 'jryc_download_wx_click']);
            location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
        }
        else{
            if(isIOS){
                _hmt.push(['_trackEvent','jryc_download_ios_click', 'click', 'jryc_download_ios_click', 'jryc_download_ios_click']);
                location.href="http://um0.cn/89wDL";
            }
            else if(isAndroid){
                _hmt.push(['_trackEvent','jryc_download_android_click', 'click', 'jryc_download_android_click', 'jryc_download_android_click']);
                location.href="http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]";
            }
            else{
                location.href="http://www.51wnl.com";
            }
        }
    });
    var orderid = getQueryString("orderid");
    var url = "/numberology/NRLorder/GetOrderAnswer?orderid=" + orderid;
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (data) {
            if (data && data.status == 0)
            {
                if(data.data.isPayed){
                    location.href="bzhhpayed.html?orderid="+orderid;
                }
                $(".nameContent").html(data.data.maleName+" & "+data.data.femaleName);
                $(".count").html(data.data.rateScore);
                $(".rateStringContent").html(data.data.rateString);
                var randomCount=Math.floor(Math.random()*-5+10);
                $("#percent").html(data.data.rateScore-randomCount>=100?100:data.data.rateScore-randomCount);
                if(share){
                    $(".wnlBannerLink").removeClass("hidden");
                }
                else{
                    $(".yiqiDesc1").removeClass("hidden");
                }
                $(".main").removeClass("hidden");
                $(".leftDescContent").width($(".descWrapper").width()/2+5);
            }
        }
    });
    $(".descContent1").click(function () {
        $(".viewDetail").trigger("click");
    });
    $(".viewDetail").click(function () {
        if(share){
            $("#tipModal").modal();
            $(".downloadBtn").click(function () {
                // 下载链接
                var ua=navigator.userAgent.toLocaleLowerCase();
                var wx=ua.indexOf("micromessenger")>-1;
                var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
                var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
                var isAndroid=ua.indexOf("android")>-1;
                if(wx){
                    _hmt.push(['_trackEvent','bzhh_download_wx_click', 'click', 'bzhh_download_wx_click', 'bzhh_download_wx_click']);
                    location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
                }
                else{
                    if(isIOS){
                        _hmt.push(['_trackEvent','bzhh_download_ios_click', 'click', 'bzhh_download_ios_click', 'bzhh_download_ios_click']);
                        location.href="http://um0.cn/89wDL";
                    }
                    else if(isAndroid){
                        _hmt.push(['_trackEvent','bzhh_download_android_click', 'click', 'bzhh_download_android_click', 'bzhh_download_android_click']);
                        location.href="http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]";
                    }
                    else{
                        location.href="http://www.51wnl.com";
                    }
                }
            });
        }
        else{
            $("#dvPay").modal();
        }
    });
    $(".pickConfirmBtn").click(function () {
        var ua=navigator.userAgent.toLocaleLowerCase();
        var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
        var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
        var isAndroid=ua.indexOf("android")>-1;
        var sourceType=-1;
        if(isIOS){
            sourceType=0;
        }
        else if(isAndroid){
            sourceType=1;
        }
        else{
            sourceType=2
        }
        window.location.href = "/numberology/NRLorder/PayedOrder?orderid="+orderid+"&returnUrl=/Numberology/Tools/bzhhpayed.html&sourceType="+sourceType;
    });
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
});
var textObj1,textObj;
function appCallback_share(){
    _hmt.push(['_trackEvent','bzhh_share_click', 'click', 'bzhh_share_click', 'bzhh_share_click']);
    var title="我在万年历做的八字合婚测算，好准！你也来看看？";
    var link=location.href+"&share=1";
    textObj = {
        text: title,
        image: "1",
        url:link,
        pureText:title,
        prefix:""
    };
    textObj1={
        text: title,
        image: "1",
        targetUrl:link,
        perfix:""
    };
    try{
        if(window.ylwindow){
            ylwindow.reportHasShare(true);
            location.href="protocol://share:" + encodeURI(JSON.stringify(textObj1));
        }
        else{
            location.href="protocol://share#" + encodeURI(JSON.stringify(textObj));
        }
    }
    catch (e){
        alert(e)
    }
    return 1;
}