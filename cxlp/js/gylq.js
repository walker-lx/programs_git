$(function(){
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
        "shareDate":getQueryString("shareDate"),
        "id":getQueryString("id")
    };

    if(!shareData.userIcon){
        shareData.userIcon="img/wnl_icon.png";
    }
    if(!shareData.username){
        shareData.username="万年历-观音灵签";
    }
    //if(shareData.id===null){
    //    shareData.id=1;
    //}
    if(shareData.id==="0"||shareData.id===null||shareData.id==="-1"){
        //$(".userImgContent").addClass("hidden");
        //$(".wnlImgContent").removeClass("hidden");
        shareData.id=1;
        $(".shareInfoContent").addClass("hidden");
        $(".lotIndex").removeClass("hidden");
    }
    else{
        $(".shareInfoContent").removeClass("hidden");
        $(".lotIndex").addClass("hidden");
    }
    if(!shareData.shareDate||shareData.shareDate==="null"){
        shareData.shareDate=(new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate();
    }
    $(".userImg").attr("src",shareData.userIcon);
    $(".username").html(shareData.username);
    $(".shareDate").html("分享于"+shareData.shareDate);



    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }
//    _bd_share_config.common.bdText=shareData.shareContent;
//    _bd_share_config.common.bdDesc=shareData.shareContent;

    var ua=navigator.userAgent.toLocaleLowerCase();
    var wnl=ua.indexOf("wnl")>-1;
    var wx=ua.indexOf("micromessenger")>-1;
    var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
    var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
    var isAndroid=ua.indexOf("android")>-1;
    var isWP=ua.indexOf("windows phone")>-1;
    if(!wnl){
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

    var titleColor="";
    var labelContent=null;
    var qianId=parseInt(shareData.id,10)-1;
    if(!labelContent){
        $.getJSON("data/gylq/labelContent.json",function(result){
            labelContent=result;
            initQianResult(labelContent[qianId],qianId);
        })
    }
    else{
        initQianResult(labelContent[qianId],qianId);
    }
    $(".lotGoBtn").click(function(){
        $(".userImgContent").addClass("hidden");
        $(".wnlImgContent").removeClass("hidden");
        $(".shareInfoContent").addClass("hidden");
        $(".lotIndex").removeClass("hidden");
    });
    var frameIndex= 0,totalIndex= 0,intervalTimer,animating=false;
    $(".lotStartBtn").click(function(){
        if(animating){
            return false;
        }
        animating=true;
        frameIndex= 0;
        totalIndex= 0;
        intervalTimer=setInterval(function () {
            frameIndex++;
            if(frameIndex>3){
                frameIndex=0;
            }
            var positionIndex=-150*frameIndex;
            $(".lotsBox").css("background-position",positionIndex+"px 0");
            totalIndex++;
            if(totalIndex>9){
                animating=false;
                clearInterval(intervalTimer);
                var randomIndex=Math.floor(Math.random()*100)-1;
                if(!labelContent){
                    $.getJSON("data/gylq/labelContent.json",function(result){
                        labelContent=result;
                        showQianResult(labelContent[randomIndex],randomIndex);
                    })
                }
                else{
                    showQianResult(labelContent[randomIndex],randomIndex);
                }
            }
        },180);
    });
    function initQianResult(content,index){
        if(!content){
            return false;
        }
        var qianN=content.N;
        var spaceLastIndex=qianN.lastIndexOf(" ");
        var qianNum=qianN.substring(0,spaceLastIndex);
        var qianLevel=qianN.substring(spaceLastIndex+1);
        if(qianLevel==="上签"){
            titleColor="#ff524b";
        }
        else if(qianLevel==="中签"){
            titleColor="#2aae8f";
        }
        else{
            titleColor="#497f9d";
        }
        $(".shareTxt .qianNum").html(qianNum);
        $(".shareTxt .qianLevel").html(qianLevel);
        $(".shareTxt .qianTxt").html(content.P);
        $(".shareTxt .jieTxt").html(content.J.substr(4));
        $(".shareTxt .xianTxt").html(content.X.substr(4));
        $(".shareTxt .qianDesc").html(content.Y.substr(4));
        $.get("data/gylq/"+(997+index)+".txt",function(result){
            var allusionsNameIndex=result.indexOf("</b>");
            var allusionsName=result.substring(3,allusionsNameIndex);
            $(".shareTxt .allusionsName").html(allusionsName);
            var allusionsDescIndex=result.indexOf("<br>");
            var allusionsDesc=result.substring(allusionsDescIndex+4);
            $(".shareTxt .allusionsDesc").html(allusionsDesc);
        });
        _bd_share_config.common.bdText=_bd_share_config.common.bdDesc="我在万年历抽到 "+qianNum+" "+qianLevel+" "+content.P.replace(new RegExp(/\s/g),",")+" 。我也试试："+location.href;
        _bd_share_config.share[0].bdText=_bd_share_config.share[0].bdDesc="我在万年历抽到 "+qianNum+" "+qianLevel+" "+content.P.replace(new RegExp(/\s/g),",")+" 。我也试试："+location.href;
        $(".title").css("color",titleColor);
    }
    function showQianResult(content,index){
        var qianN=content.N;
        var spaceLastIndex=qianN.lastIndexOf(" ");
        var qianNum=qianN.substring(0,spaceLastIndex);
        var qianLevel=qianN.substring(spaceLastIndex+1);
        if(qianLevel==="上签"){
            titleColor="#ff524b";
        }
        else if(qianLevel==="中签"){
            titleColor="#2aae8f";
        }
        else{
            titleColor="#497f9d";
        }
        $(".resultContent .qianNum").html(qianNum);
        $(".resultContent .qianLevel").html(qianLevel);
        $(".resultContent .qianTxt").html(content.P);
        $(".title1").css("color",titleColor);
        $(".lotIndex").addClass("hidden");
        $(".resultContent").removeClass("hidden");
        index+=1;
        _bd_share_config.share[0].bdUrl="http://"+location.host+location.pathname+"?shareDate="+(new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate()+"&id="+index;
        _bd_share_config.common.bdText=_bd_share_config.common.bdDesc="我在万年历抽到 "+qianNum+" "+qianLevel+" "+content.P.replace(new RegExp(/\s/g),",")+" 。我也试试："+_bd_share_config.share[0].bdUrl;
        _bd_share_config.share[0].bdText=_bd_share_config.share[0].bdDesc="我在万年历抽到 "+qianNum+" "+qianLevel+" "+content.P.replace(new RegExp(/\s/g),",")+" 。我也试试："+_bd_share_config.share[0].bdUrl;
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