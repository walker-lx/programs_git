$(function(){
    FastClick.attach(document.body);
    if(document.addEventListener){
        document.addEventListener("touchstart", function(){}, true);
    }

    var ua=navigator.userAgent.toLocaleLowerCase();
    var wx1=ua.indexOf("micromessenger")>-1;
    var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
    var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
    var isAndroid=ua.indexOf("android")>-1;
    var isWP=ua.indexOf("windows phone")>-1;
    $(".downloadBtn").click(function(){
        if(wx1){
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
    var title="";
    //发送朋友标题
    var fTitle=title;
    //分享描述
    var desc=title;
    //分享链接
    var link=location.href;
    //分享图片链接
    var imgUrl='http://activity.youloft.cn/yuncheng/img/icon.png';
    var monthList=["JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEP","OCT","NOV","DEC"];
    var weekList=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var nowDate=new Date();
    var date=getQueryString("date"),year= nowDate.getFullYear(),month= nowDate.getMonth()+1,day=nowDate.getDate();
    if(date&&date.length!==0){
        year=str2Int(date.substring(0,4));
        month=str2Int(date.substring(5,7));
        day=str2Int(date.substring(8,10));
        nowDate=new Date(year,month-1,day);
    }
    $(".dayNumber").html(day<10?("0"+day):day);
    $(".monthNum").html(monthList[month-1]+".");
    $(".weekNum").html(weekList[nowDate.getDay()].toUpperCase());
    var imgWidth=$(".imgWrapper").width();
    // var imgHeight=$(window).height()-64;
    var imgHeight=$(window).height();
    $(".contentImg").width(imgWidth);
    $(".contentImg").height(imgHeight);
    $(".closeBanner").click(function(){
        $(".wnlBanner").hide();
        // $(".imgWrapper").css("marginTop",0);
        // $(".contentImg").height($(window).height());
    });
    $.ajax({
        url:"http://www.51wnl.com/api/getdailysentenceweb.ashx",
        dataType:"jsonp",
        data:{
            dt:year+"-"+(month<10?("0"+month):month)+"-"+(day<10?("0"+day):day)
        },
        success: function (data) {
            if(data.succeed==="true"){
                title=data.result.S;
                $(".yyTxt").html(title);
                // $(".yyTxt").html("明天是世上增值最快的一块土地，因它充满了希望。");
                _bd_share_config.common.bdText=_bd_share_config.common.bdDesc=title;
                _bd_share_config.share[0].bdText=_bd_share_config.share[0].bdDesc=title;
                // if(isAndroid&&wx1){
                //     $(".contentImg").attr("src",data.result.LargeImg);
                // }
                // else{
                //     // $(".contentImg").attr("src",data.result.LargeImg+"?imageView2/1/w/"+(imgWidth*2)+"/h/"+(imgHeight*2)+"/q/90");
                //     $(".contentImg").attr("src",data.result.LargeImg);
                // }
                $(".contentImg").attr("src",data.result.LargeImg+"?imageView2/1/w/"+(imgWidth*2)+"/h/"+(imgHeight*2)+"/q/90");
                fTitle=title;
                desc=title;
                setShareInfo();
            }
        }
    });
    $(".contentImg").on("load",function(){
        $(".main").removeClass("visibilityHidden");
        if($(".yyTxt").height()>41){
            $(".yyTxt").addClass("multiple_line");
            $(".dayInfo").addClass("multiple_line");
        }
    })
    wx.ready(function(){
        setShareInfo();
    });
    wx.error(function(res){
        //alert(JSON.stringify(res));
    });
    function setShareInfo(){
        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: fTitle, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            //type: '', // 分享类型,music、video或link，不填默认为link
            //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //获取“分享到QQ”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }
    function str2Int(str){
        str = str.replace(/^0+/g, '');
        if(str.length == 0){
            return 0;
        }
        return parseInt(str);
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }







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
        if(wx1){
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
