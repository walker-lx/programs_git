$(function () {
    // (function (doc, win) {
    // var docEl = doc.documentElement,
    //     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    //     recalc = function () {
    //     var clientWidth = docEl.clientWidth;
    //     if (!clientWidth) return;
    //     docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
    //     };

    // // Abort if browser does not support addEventListener
    // if (!doc.addEventListener) return;
    // win.addEventListener(resizeEvt, recalc, false);
    // doc.addEventListener('DOMContentLoaded', recalc, false);
    // })(document, window);
    var clientWidth = $(window).width();
    var zoom=Math.round(clientWidth * 10000 / 375) / 10000;
    if(clientWidth<980&&window.devicePixelRatio>1){
        $('body').css("zoom",zoom);
    }
    FastClick.attach(document.body);
    if(document.addEventListener){
        document.addEventListener("touchstart", function(){}, true);
    }

    var shareData={
        "userIcon":getQueryString("userIcon"),
        "username":getQueryString("username"),
        "shareDate":getQueryString("shareDate")
    };

    if(!shareData.userIcon){
        shareData.userIcon="img/wnl_icon.png";
    }
    if(!shareData.username){
        shareData.username="万年历-财喜罗盘";
    }
    if(shareData.id===null){
        shareData.id=1;
    }
    if(!shareData.shareDate||shareData.shareDate==="null"){
        shareData.shareDate=(new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate();
    }
    
    $(".userImg").attr("src",shareData.userIcon);
    $(".username").html(shareData.username);
    $(".shareDate").html("分享于"+shareData.shareDate);

//    _bd_share_config.common.bdText=shareData.shareContent;
//    _bd_share_config.common.bdDesc=shareData.shareContent;

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
    var wx=ua.indexOf("micromessenger")>-1;
    var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
    var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
    var isAndroid=ua.indexOf("android")>-1;
    var isWP=ua.indexOf("windows phone")>-1;
    if(!wnl){
        $(".mainContent").css("marginTop","93px"); 
        $(".wnlBanner").show();
    }
    $(".closeBanner").click(function(){
        $(".wnlBanner").hide();
    });
    $(".downloadBtn").click(function(){
        if(wx){
            location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
        }
        else{
            if(isIOS){
                location.href="http://itunes.apple.com/cn/app/id419805549?mt=8";
            }
            else if(isAndroid){
                location.href="http://download.eoemarket.com/app?id=54861&co_id=0&client_id=140&channel_id=807";
            }
            else if(isWP){
                location.href="http://www.windowsphone.com/en-us/store/app/%E4%B8%87%E5%B9%B4%E5%8E%86/8ffa51ca-df17-e011-9264-00237de2db9e";
            }
            else{
                location.href="http://www.51wnl.com";
            }
        }
    });

    var dataObj={},csString="",xsString="",fsString="",yagString="",yigString="";
    var $cxImg=$(".cxImg");

    var dateNow=new Date();
    var hourNow=dateNow.getHours();
    var lumarHourIndex=getLumarHourIndex(hourNow);
    getCxData(lumarHourIndex);
    //var yearNow=dateNow.getFullYear();
    //var monthNow=dateNow.getMonth()+1;
    //var dayNow=dateNow.getDate();
    //var hourNow=dateNow.getHours();
    //compassCNOfDate(dateNow);
    //var lumarHourIndex=getLumarHourIndex(hourNow);
    //console.log(compassCNOfDate(dateNow));
    //var fileString=yearNow+"-"+(monthNow<10?"0"+monthNow:monthNow);
    //var dayString=(monthNow<10?"0"+monthNow:monthNow.toString())+(dayNow<10?"0"+dayNow:dayNow.toString());
    //getCxData(fileString,dayString,lumarHourIndex);
    function getCxData(hourIndex){
        var hourCxData=compassCNOfDate(dateNow);
        $(".hourNum").html(hourCxData.l);
        $(".jx").html(hourCxData.jx);
        if(hourCxData.jx==="吉"){
            $(".jx").addClass("j");
        }
        else{
            $(".jx").addClass("x");
        }
        csString=hourCxData.cai;
        xsString=hourCxData.xi;
        fsString=hourCxData.fu;
        yagString=hourCxData.yang;
        yigString=hourCxData.yin; 



        // console.log(yigString);       
        //csString="西南";
        //xsString="正南";
        //fsString="西南";
        $(".hourDistace").html((2*hourIndex-1<0?23:2*hourIndex-1)+":00 - "+(2*hourIndex+1)+":00");
        var offset=13.5;        
        // var csPositionObj=getPositionByName(csString);
        // $(".csImg").css("left",csPositionObj.x);
        // $(".csImg").css("top",csPositionObj.y);
        // if(csString!==xsString){
        //     var xsPositionObj=getPositionByName(xsString);
        //     $(".xsImg").css("left",xsPositionObj.x);
        //     $(".xsImg").css("top",xsPositionObj.y);
        // }
        // else{
        //     offset=10;
        //     var xsPositionObj=getPositionByName(xsString);
        //     $(".xsImg").css("left",xsPositionObj.x+offset);
        //     $(".xsImg").css("top",xsPositionObj.y);
        //     console.log(offset)
        // }
        // if(fsString===xsString){
        //     offset=10;
        // }
        // else if(fsString===csString){
        //     offset=10;
        // }
        // else{
        //     offset=0;
        // }
        // var fsPositionObj=getPositionByName(fsString);
        // $(".fsImg").css("left",fsPositionObj.x+offset);
        // $(".fsImg").css("top",fsPositionObj.y);
         var xsPositionObj=getPositionByName(xsString);
        var csPositionObj=getPositionByName(csString);  
        var fsPositionObj=getPositionByName(fsString);                      
        $(".xsImg").css("left",xsPositionObj.x);
        $(".xsImg").css("top",xsPositionObj.y);
        $(".csImg").css("left",csPositionObj.x);
        $(".csImg").css("top",csPositionObj.y);
        $(".fsImg").css("left",fsPositionObj.x);
        $(".fsImg").css("top",fsPositionObj.y);  

        var yagPositionObj=getPositionByName(yagString);
        $(".yagImg").css("left",yagPositionObj.x);
        $(".yagImg").css("top",yagPositionObj.y); 
        if(yagString === xsString && yagString === csString && yagString === fsString) {
            var xsPositionObj=getPositionByName(xsString);
            var csPositionObj=getPositionByName(csString);  
            var fsPositionObj=getPositionByName(fsString);                      
            $(".xsImg").css("left",xsPositionObj.x);
            $(".xsImg").css("top",xsPositionObj.y+offset);
            $(".csImg").css("left",csPositionObj.x);
            $(".csImg").css("top",csPositionObj.y-offset);
             $(".fsImg").css("left",fsPositionObj.x);
            $(".fsImg").css("top",fsPositionObj.y+offset);
        } else if(yagString === fsString && yagString === csString){
            var fsPositionObj=getPositionByName(fsString);
            var csPositionObj=getPositionByName(csString);            
            $(".fsImg").css("left",fsPositionObj.x);
            $(".fsImg").css("top",fsPositionObj.y+offset);
            $(".csImg").css("left",csPositionObj.x);
            $(".csImg").css("top",csPositionObj.y-offset);
        }  else if(yagString === fsString && yagString === xsString){
            var fsPositionObj=getPositionByName(fsString);
            var xsPositionObj=getPositionByName(xsString);            
            $(".fsImg").css("left",fsPositionObj.x);
            $(".fsImg").css("top",fsPositionObj.y+offset);
            $(".xsImg").css("left",xsPositionObj.x);
            $(".xsImg").css("top",xsPositionObj.y-offset);
        }  else if(yagString === xsString && yagString === csString){
            var xsPositionObj=getPositionByName(xsString);
            var csPositionObj=getPositionByName(csString);            
            $(".xsImg").css("left",xsPositionObj.x);
            $(".xsImg").css("top",xsPositionObj.y+offset);
            $(".csImg").css("left",csPositionObj.x);
            $(".csImg").css("top",csPositionObj.y-offset);
        }   else if(yagString === xsString){
            var xsPositionObj=getPositionByName(xsString);
            $(".xsImg").css("left",xsPositionObj.x);
            $(".xsImg").css("top",xsPositionObj.y+offset);
        }   else if(yagString === fsString){
            var fsPositionObj=getPositionByName(fsString);
            $(".fsImg").css("left",fsPositionObj.x);
            $(".fsImg").css("top",fsPositionObj.y+offset);
        } else if(yagString === csString){
            var csPositionObj=getPositionByName(csString);
            $(".csImg").css("left",csPositionObj.x);
            // console.log(offset)
            $(".csImg").css("top",csPositionObj.y+offset);
        } else if(xsString === csString && xsString === fsString){
            var csPositionObj=getPositionByName(csString);
            var xsPositionObj=getPositionByName(xsString);
            var fsPositionObj=getPositionByName(fsString);            
            $(".csImg").css("left",csPositionObj.x);
            $(".csImg").css("top",csPositionObj.y);
             $(".xsImg").css("left",xsPositionObj.x);
            $(".xsImg").css("top",xsPositionObj.y+offset);
             $(".fsImg").css("left",fsPositionObj.x);
            $(".fsImg").css("top",fsPositionObj.y-offset);
        }else if(xsString === csString){
            var csPositionObj=getPositionByName(csString);
            var xsPositionObj=getPositionByName(xsString);
            $(".csImg").css("left",csPositionObj.x);
            $(".csImg").css("top",csPositionObj.y);
             $(".xsImg").css("left",xsPositionObj.x);
            $(".xsImg").css("top",xsPositionObj.y+offset);
        }else if(xsString === fsString){
            var xsPositionObj=getPositionByName(xsString);
            var fsPositionObj=getPositionByName(fsString);            
             $(".xsImg").css("left",xsPositionObj.x);
            $(".xsImg").css("top",xsPositionObj.y);
             $(".fsImg").css("left",fsPositionObj.x);
            $(".fsImg").css("top",fsPositionObj.y+offset);
        }else if(fsString === csString){
            var csPositionObj=getPositionByName(csString);
            var fsPositionObj=getPositionByName(fsString);
            $(".csImg").css("left",csPositionObj.x);
            $(".csImg").css("top",csPositionObj.y);
             $(".fsImg").css("left",fsPositionObj.x);
            $(".fsImg").css("top",fsPositionObj.y+offset);
        }
        // else {
        //     var xsPositionObj=getPositionByName(xsString);
        //     var csPositionObj=getPositionByName(csString);  
        //     var fsPositionObj=getPositionByName(fsString);                      
        //     $(".xsImg").css("left",xsPositionObj.x);
        //     $(".xsImg").css("top",xsPositionObj.y);
        //     $(".csImg").css("left",csPositionObj.x);
        //     $(".csImg").css("top",csPositionObj.y);
        //     $(".fsImg").css("left",fsPositionObj.x);
        //     $(".fsImg").css("top",fsPositionObj.y);            
        // }

       var yigPositionObj=getPositionByName(yigString);
        $(".yigImg").css("left",yigPositionObj.x);
        $(".yigImg").css("top",yigPositionObj.y); 
        if(yigString === xsString && yigString === csString && yigString === fsString){
            var xsPositionObj=getPositionByName(xsString);
            var csPositionObj=getPositionByName(csString);  
            var fsPositionObj=getPositionByName(fsString);                      
            $(".xsImg").css("left",xsPositionObj.x);
            $(".xsImg").css("top",xsPositionObj.y+offset);
            $(".csImg").css("left",csPositionObj.x);
            $(".csImg").css("top",csPositionObj.y-offset);
             $(".fsImg").css("left",fsPositionObj.x);
            $(".fsImg").css("top",fsPositionObj.y+offset);
        }else if(yigString === fsString && yigString === csString){
            var fsPositionObj=getPositionByName(fsString);
            var csPositionObj=getPositionByName(csString);            
            $(".fsImg").css("left",fsPositionObj.x);
            $(".fsImg").css("top",fsPositionObj.y+offset);
            $(".csImg").css("left",csPositionObj.x);
            $(".csImg").css("top",csPositionObj.y-offset);
        }  else if(yigString === fsString && yigString === xsString){
            var fsPositionObj=getPositionByName(fsString);
            var xsPositionObj=getPositionByName(xsString);            
            $(".fsImg").css("left",fsPositionObj.x);
            $(".fsImg").css("top",fsPositionObj.y+offset);
            $(".xsImg").css("left",xsPositionObj.x);
            $(".xsImg").css("top",xsPositionObj.y-offset);
        }  else if(yigString === xsString && yigString === csString){
            var xsPositionObj=getPositionByName(xsString);
            var csPositionObj=getPositionByName(csString);  
            $(".xsImg").css("left",xsPositionObj.x);
            $(".xsImg").css("top",xsPositionObj.y+offset);
            $(".csImg").css("left",csPositionObj.x);
            $(".csImg").css("top",csPositionObj.y-offset);
        }   else if(yigString === fsString){
            var fsPositionObj=getPositionByName(fsString);
            $(".fsImg").css("left",fsPositionObj.x);
            $(".fsImg").css("top",fsPositionObj.y+offset);
        } else if(yigString === csString){
            var csPositionObj=getPositionByName(csString);
            $(".csImg").css("left",csPositionObj.x);
            $(".csImg").css("top",csPositionObj.y+offset);
        } else if(yigString === xsString) {
            var xsPositionObj=getPositionByName(xsString);
            $(".xsImg").css("left",xsPositionObj.x);
            $(".xsImg").css("top",xsPositionObj.y+offset);
        } 
        // else {
        //     console.log('')
        //     var xsPositionObj=getPositionByName(xsString);
        //     var csPositionObj=getPositionByName(csString);  
        //     var fsPositionObj=getPositionByName(fsString);                      
        //     $(".xsImg").css("left",xsPositionObj.x);
        //     $(".xsImg").css("top",xsPositionObj.y);
        //     $(".csImg").css("left",csPositionObj.x);
        //     $(".csImg").css("top",csPositionObj.y);
        //     $(".fsImg").css("left",fsPositionObj.x);
        //     $(".fsImg").css("top",fsPositionObj.y);            
        // }
        

        $cxImg.removeClass("hidden");
        if(csString === '正西') {
            $(".csPositoin").html('<img src="./img/cxlp/cxlp-h5-west@3x.png">');
        }else if(csString === '正东') {
            $(".csPositoin").html('<img src="./img/cxlp/cxlp-h5-east@3x.png">');            
        }else if(csString === '正北') {
            $(".csPositoin").html('<img src="./img/cxlp/cxlp-h5-north@3x.png">');            
        }else if(csString === '正南') {
            $(".csPositoin").html('<img src="./img/cxlp/cxlp-h5-south@3x.png">');            
        }else if(csString === '西北') {
            $(".csPositoin").html('<img src="./img/cxlp/cxlp-h5-wn@3x.png">');            
        }else if(csString === '东北') {
            $(".csPositoin").html('<img src="./img/cxlp/cxlp-h5-en@3x.png">');            
        }else if(csString === '东南') {
            $(".csPositoin").html('<img src="./img/cxlp/cxlp-h5-es@3x.png">');            
        }else {
            $(".csPositoin").html('<img src="./img/cxlp/cxlp-h5-ws@3x.png">');            
        }

        if(xsString === '正西') {
            $(".xsPositoin").html('<img src="./img/cxlp/cxlp-h5-west@3x.png">');
        }else if(xsString === '正东') {
            $(".xsPositoin").html('<img src="./img/cxlp/cxlp-h5-east@3x.png">');            
        }else if(xsString === '正北') {
            $(".xsPositoin").html('<img src="./img/cxlp/cxlp-h5-north@3x.png">');            
        }else if(xsString === '正南') {
            $(".xsPositoin").html('<img src="./img/cxlp/cxlp-h5-south@3x.png">');            
        }else if(xsString === '西北') {
            $(".xsPositoin").html('<img src="./img/cxlp/cxlp-h5-wn@3x.png">');            
        }else if(xsString === '东北') {
            // console.log(xsString)
            $(".xsPositoin").html('<img src="./img/cxlp/cxlp-h5-en@3x.png">');            
        }else if(xsString === '东南') {
            $(".xsPositoin").html('<img src="./img/cxlp/cxlp-h5-es@3x.png">');            
        }else {
            $(".xsPositoin").html('<img src="./img/cxlp/cxlp-h5-ws@3x.png">');            
        }

        if(fsString === '正西') {
            $(".fsPositoin").html('<img src="./img/cxlp/cxlp-h5-west@3x.png">');
        }else if(fsString === '正东') {
            $(".fsPositoin").html('<img src="./img/cxlp/cxlp-h5-east@3x.png">');            
        }else if(fsString === '正北') {
            $(".fsPositoin").html('<img src="./img/cxlp/cxlp-h5-north@3x.png">');            
        }else if(fsString === '正南') {
            $(".fsPositoin").html('<img src="./img/cxlp/cxlp-h5-south@3x.png">');            
        }else if(fsString === '西北') {
            $(".fsPositoin").html('<img src="./img/cxlp/cxlp-h5-wn@3x.png">');            
        }else if(fsString === '东北') {
            $(".fsPositoin").html('<img src="./img/cxlp/cxlp-h5-en@3x.png">');            
        }else if(fsString === '东南') {
            $(".fsPositoin").html('<img src="./img/cxlp/cxlp-h5-es@3x.png">');            
        }else {
            $(".fsPositoin").html('<img src="./img/cxlp/cxlp-h5-ws@3x.png">');            
        }

        if(yagString === '正西') {
            $(".yagPositoin").html('<img src="./img/cxlp/cxlp-h5-west@3x.png">');
        }else if(yagString === '正东') {
            $(".yagPositoin").html('<img src="./img/cxlp/cxlp-h5-east@3x.png">');            
        }else if(yagString === '正北') {
            $(".yagPositoin").html('<img src="./img/cxlp/cxlp-h5-north@3x.png">');            
        }else if(yagString === '正南') {
            $(".yagPositoin").html('<img src="./img/cxlp/cxlp-h5-south@3x.png">');            
        }else if(yagString === '西北') {
            $(".yagPositoin").html('<img src="./img/cxlp/cxlp-h5-wn@3x.png">');            
        }else if(yagString === '东北') {
            $(".yagPositoin").html('<img src="./img/cxlp/cxlp-h5-en@3x.png">');            
        }else if(yagString === '东南') {
            $(".yagPositoin").html('<img src="./img/cxlp/cxlp-h5-es@3x.png">');            
        }else {
            $(".yagPositoin").html('<img src="./img/cxlp/cxlp-h5-ws@3x.png">');            
        }

        if(yigString === '正西') {
            $(".yigPositoin").html('<img src="./img/cxlp/cxlp-h5-west@3x.png">');
        }else if(yigString === '正东') {
            $(".yigPositoin").html('<img src="./img/cxlp/cxlp-h5-east@3x.png">');            
        }else if(yigString === '正北') {
            $(".yigPositoin").html('<img src="./img/cxlp/cxlp-h5-north@3x.png">');            
        }else if(yigString === '正南') {
            $(".yigPositoin").html('<img src="./img/cxlp/cxlp-h5-south@3x.png">');            
        }else if(yigString === '西北') {
            $(".yigPositoin").html('<img src="./img/cxlp/cxlp-h5-wn@3x.png">');            
        }else if(yigString === '东北') {
            $(".yigPositoin").html('<img src="./img/cxlp/cxlp-h5-en@3x.png">');            
        }else if(yigString === '东南') {
            $(".yigPositoin").html('<img src="./img/cxlp/cxlp-h5-es@3x.png">');            
        }else {
            $(".yigPositoin").html('<img src="./img/cxlp/cxlp-h5-ws@3x.png">');            
        }
        
        // $(".xsPositoin").html(xsString);
        // $(".fsPositoin").html(fsString);
        // $(".yagPositoin").html(yagString);
        // $(".yigPositoin").html(yigString);        
        // _bd_share_config.common.bdText=_bd_share_config.common.bdDesc="我的财神位在"+csString+" 喜神位在"+xsString+" 福神位在"+fsString+" 阳贵在"+yagString+" 阴贵在"+yigString+"  下载万年历查看我的财喜神位：www.51wnl.com/noteshare/download.html";
        // alert(_bd_share_config.common.bdText)
        // wnlShare.setShareData.title = wnlShare.setShareData.text = "我的财神位在"+csString+" 喜神位在"+xsString+" 福神位在"+fsString+" 阳贵在"+yagString+" 阴贵在"+yigString+"  下载万年历查看我的财喜神位：www.51wnl.com/noteshare/download.html";
        // wnlShare.setShareData({
        //     title: "我的财神位在"+csString+" 喜神位在"+xsString+" 福神位在"+fsString+" 阳贵在"+yagString+" 阴贵在"+yigString+"  下载万年历查看我的财喜神位：www.51wnl.com/noteshare/download.html",
        //     text: "我的财神位在"+csString+" 喜神位在"+xsString+" 福神位在"+fsString+" 阳贵在"+yagString+" 阴贵在"+yigString+"  下载万年历查看我的财喜神位：www.51wnl.com/noteshare/download.html",
        //     url : 'http://mobile.51wnl.com/temporary/cxlp/cxlp.html',
        //     image : "http://mobile.51wnl.com/temporary/cxlp/img/share.jpg"
        // });

    window.share = {
        title: "财喜罗盘"
    }

    var localUrl=location.href.replace('home','index');
    var imgUrl = "https://mobile.51wnl.com/temporary/cxlp/img/cxlp/share.png";
    console.log(imgUrl);
        window.appCallback_share = function () {
            var textObj = {
                // title: "我的财神位在"+csString+" 喜神位在"+xsString+" 福神位在"+fsString+" 阳贵在"+yagString+" 阴贵在"+yigString+"  下载万年历查看我的财喜神位：www.51wnl.com/noteshare/download.html",
                title: share.title,
                text: "我的财神位在"+csString+" 喜神位在"+xsString+" 福神位在"+fsString+" 阳贵在"+yagString+" 阴贵在"+yigString+"  下载万年历查看我的财喜神位：www.51wnl.com/noteshare/download.html",
                image: '0',
                imageURL: imgUrl,
                url: localUrl,
                pureText: "我的财神位在"+csString+" 喜神位在"+xsString+" 福神位在"+fsString+" 阳贵在"+yagString+" 阴贵在"+yigString+"  下载万年历查看我的财喜神位：www.51wnl.com/noteshare/download.html",
                prefix: ''
            };
            var textObj1 = {
                // title: "我的财神位在"+csString+" 喜神位在"+xsString+" 福神位在"+fsString+" 阳贵在"+yagString+" 阴贵在"+yigString+"  下载万年历查看我的财喜神位：www.51wnl.com/noteshare/download.html",
                title: share.title,                
                text: "我的财神位在"+csString+" 喜神位在"+xsString+" 福神位在"+fsString+" 阳贵在"+yagString+" 阴贵在"+yigString+"  下载万年历查看我的财喜神位：www.51wnl.com/noteshare/download.html",
                image: '0',
                imageURL: imgUrl,
                targetUrl: localUrl,
                perfix: ''
            };
            try {
                if (window.ylwindow) {
                    ylwindow.reportHasShare(true);
                    location.href = 'protocol://share:' + encodeURI(JSON.stringify(textObj1));
                }
                else {
                    location.href = 'protocol://share#' + encodeURI(JSON.stringify(textObj));
                }
            }
            catch (e) { }
            return 1;
        };
// appCallback_share();

    }
    function getPositionBySameName(cxString){
        var positionObj={
            "x1":0,
            "y1":0,
            "x2":0,
            "y2":0
        };
        switch (cxString){
            case "西北":
                positionObj.x1=35;
                positionObj.y1=35;
                positionObj.x2=62;
                positionObj.y2=35;
                break;
            case "正北":
                positionObj.x1=172.5-15;
                positionObj.y1=-12;
                positionObj.x2=172.5-15;
                positionObj.y2=-12;
                break;
            case "东北":
                positionObj.x1=345-78+14;
                positionObj.y1=172.5-150+12;
                // positionObj.y1=345-78+14;
                positionObj.x2=345-78+14;
                positionObj.y2=172.5-150+12;    
                break;
            case "正东":
                positionObj.x1=345-15;
                positionObj.y1=172.5-15;
                positionObj.x2=345-15+27;
                positionObj.y2=172.5-15;
                break;
            case "东南":
                positionObj.x1=345-78+14-14;
                positionObj.y1=345-78+12;
                positionObj.x2=345-78+14+14;
                positionObj.y2=345-78+12;
                break;
            case "正南":
                positionObj.x1=172.5-15-14;
                positionObj.y1=345-12;
                positionObj.x2=172.5-15+14;
                positionObj.y2=345-12;
                break;
            case "西南":
                positionObj.x1=35-14;
                positionObj.y1=345-78+12;
                positionObj.x2=35+14;
                positionObj.y2=345-78+12;
                break;
            case "正西":
                positionObj.x1=-14;
                positionObj.y1=172.5-15;
                positionObj.x2=-14-37;
                positionObj.y2=172.5-15;
                break;
        }
        return positionObj;
    }
    function getPositionByName(cxString){
        var positionObj={
            "x":0,
            "y":0
        };
        switch (cxString){
            case "西北":
                positionObj.x=35;
                positionObj.y=35;
                break;
            case "正北":
                positionObj.x=172.5-15;
                positionObj.y=-12;
                break;
            case "东北":
                // positionObj.x=345-78+14;
                positionObj.x=345-78+14;                
                positionObj.y=172.5-150+12;
                break;
            case "正东":
                positionObj.x=345-15;
                positionObj.y=172.5-15;
                break;
            case "东南":
                positionObj.x=345-78+14;
                positionObj.y=345-78+12;
                break;
            case "正南":
                positionObj.x=172.5-15;
                positionObj.y=345-12;
                break;
            case "西南":
                positionObj.x=35;
                positionObj.y=345-78+12;
                break;
            case "正西":
                positionObj.x=0-14;
                positionObj.y=172.5-15;
                break;
        }
        return positionObj;
    }
    function getLumarHourIndex(hour){
        return (Math.floor(hour/2)+hour%2)%12;
    }
// $('.cxList div').click(function() {
//     $(this).find('div').eq(0).css('backgroundColor','#d93448');
//     $(this).find('span').eq(1).css('color','#fff');
    
//     console.log($(this).find('span').eq(0).text().slice(0,1));
// })



    $(".contentMask").click(function(){
        $(".qrcodeImgContent").addClass("hidden");
    });
    $(".downloadLink").click(function () {
        downloadAction();
    });
    $(".wnlDownloadBtn").click(function () {
        downloadAction();
    });
    function downloadAction(){
        if(wx){
            location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
        }
        else{
            if(isIOS){
                location.href="http://itunes.apple.com/cn/app/id419805549?mt=8";
            }
            else if(isAndroid){
                location.href="http://download.eoemarket.com/app?id=54861&co_id=0&client_id=140&channel_id=807";
            }
            else if(isWP){
                location.href="http://www.windowsphone.com/en-us/store/app/%E4%B8%87%E5%B9%B4%E5%8E%86/8ffa51ca-df17-e011-9264-00237de2db9e";
            }
            else{
                $("html,body").scrollTop(0);
                $(".qrcodeImgContent").removeClass("hidden");
            }
        }
    }
});