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
    var p=getQueryString("p");
    if((!p||p==="i")&&shareData.id&&shareData.id!=="null"){
        shareData.id=parseInt(shareData.id)-1;
    }
    if(!shareData.userIcon){
        shareData.userIcon="img/wnl_icon.png";
    }
    if(!shareData.username){
        shareData.username="万年历-周公解梦";
    }
    if(!shareData.shareDate||shareData.shareDate==="null"){
        shareData.shareDate=(new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate();
    }
    if(!shareData.id||shareData.id=="null"){
        //shareData.id="1";
        $(".shareInfoContent").addClass("hidden");
        $(".dreamContent").removeClass("hidden");
    }
    $(".userImg").attr("src",shareData.userIcon);
    $(".username").html(shareData.username);
    $(".shareDate").html("分享于"+shareData.shareDate);
    $(".shareContentTxt").html(shareData.shareContent);
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

    $(".shareInfoContent").height($(window).height()-66);


    var allCategoryList=[],shareDreamTitle="";
    for(var i=0;i<categoryData.length;i++){
        for(var j=0;j<categoryData[i].childrenList.length;j++){
            allCategoryList.push({
                "id":categoryData[i].childrenList[j].i,
                "name":categoryData[i].childrenList[j].n
            });
            if(parseInt(shareData.id,10)===categoryData[i].childrenList[j].i){
                shareDreamTitle=categoryData[i].childrenList[j].n;
                $(".shareDreamTitle").html(shareDreamTitle);
            }
        }
    }
    $.get("data/zgjm/answers/"+shareData.id+".txt",function(result){
        $(".shareDreamContent").html(result);
        _bd_share_config.share[0].bdUrl="http://"+location.host+location.pathname+"?shareDate="+(new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate()+"&id="+shareData.id;
        _bd_share_config.share[0].bdText=_bd_share_config.share[0].bdDesc="我梦到了:"+shareDreamTitle+"，万年历中的解释为:"+result+"。查看更多周公解梦信息："+_bd_share_config.share[0].bdUrl;
    });

    $(".lotGoBtn").click(function(){
       $(".shareInfoContent").addClass("hidden");
       $(".dreamContent").removeClass("hidden");
    });

    if("oninput" in document.body){
        $(".searchTxt").on("input",searchResult);
    }
    else{
        $(".searchTxt").on("keyup",searchResult);
    }

    var searchTxt="";
    function searchResult(){
        var searchCurrentVal=$(this).val().replace(/(^\s*)|(\s*$)/g,"");
        if(searchCurrentVal.length===0){
            $(".recommandList").empty();
            $(".recommandContent").addClass("hidden");
            $(".dreamListContent").removeClass("hidden");
        }
        else{
            if(searchTxt!==searchCurrentVal){
                console.log(searchCurrentVal);
                $(".recommandList").empty();
                for(var i=0;i<allCategoryList.length;i++){
                    if(allCategoryList[i].name.indexOf(searchCurrentVal)>-1){
                        $(".recommandList").append('<a class="searchItem" href="javascript:void(0)" data-id="'+allCategoryList[i].id+'">'+allCategoryList[i].name+'</a>');
                    }
                }
                $(".recommandContent").removeClass("hidden");
                $(".dreamListContent").addClass("hidden");
            }
        }
        searchTxt=searchCurrentVal;
    }
    $(".levelItem1").click(function(){
        var id=parseInt($(this).data("id"),10);
        var lineString=getLineString(id);
        if($(this).hasClass("active")){
            $(lineString).slideToggle(100);
        }
        else{
            var arrowIndex=getArrowIndex(id);
            $(lineString).find(".arrowContent").css("margin-left",((67+10)*arrowIndex+23)+"px");
            $(".levelItem1").removeClass("active");
            $(this).addClass("active");
            for(var i=0;i<categoryData.length;i++){
                if(id===categoryData[i].i){
                    var  childrenList=categoryData[i].childrenList;
                    $(lineString+" .levelList2").empty();
                    for(var j=0;j<childrenList.length;j++){
                        if(j%2===1){
                            $(lineString+" .levelList2").append(' <a class="levelItem2 secondItem" href="javascript:void(0)" data-id="'+childrenList[j].i+'">'+childrenList[j].n+'</a>')
                        }
                        else{
                            $(lineString+" .levelList2").append(' <a class="levelItem2" href="javascript:void(0)" data-id="'+childrenList[j].i+'">'+childrenList[j].n+'</a>')
                        }
                    }
                    $(lineString).slideDown(1000);
                    break;
                }
            }
        }
    });
    function getArrowIndex(id){
        if(id>=1&&id<=4){
            return id-1;
        }
        else if(id>=5&&id<=8){
            return id-5;
        }
        else if(id===0){
            return 2;
        }
        else{
            return id-9;
        }
    }
    function getLineString(id){
        if(id>=1&&id<=4){
            return ".line1";
        }
        else if(id>=5&&id<=8){
            return ".line2";
        }
        else{
            return ".line3";
        }
    }
    $(".resultContent").height($(window).height()-66);
    $(document).on("click",".levelItem2",function(){
        var id=parseInt($(this).data("id"),10);
        $(".categoryLevel2").addClass("hidden");
        var resultDreamTitle=$(this).html();
        $(".resultDreamTitle").html(resultDreamTitle);
        $.get("data/zgjm/answers/"+id+".txt",function(result){
            $(".resultDreamContent").html(result);
            _bd_share_config.share[0].bdUrl="http://"+location.host+location.pathname+"?shareDate="+(new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate()+"&id="+id;
            _bd_share_config.share[0].bdText=_bd_share_config.share[0].bdDesc="我梦到了:"+resultDreamTitle+"，万年历中的解释为:"+result+"。查看更多周公解梦信息："+_bd_share_config.share[0].bdUrl;
        });
        $(".categoryContent").addClass("hidden");
        $(".recommandContent").addClass("hidden");
        $(".searchTxt").addClass("hidden");
        $(".resultContent").removeClass("hidden");
    });
    $(document).on("click",".searchItem",function(){
        var id=parseInt($(this).data("id"),10);
        $(".categoryLevel2").addClass("hidden");
        var resultDreamTitle=$(this).html();
        $(".resultDreamTitle").html(resultDreamTitle);
        $.get("data/zgjm/answers/"+id+".txt",function(result){
            $(".resultDreamContent").html(result);
            _bd_share_config.share[0].bdUrl="http://"+location.host+location.pathname+"?shareDate="+(new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate()+"&id="+id;
            _bd_share_config.share[0].bdText=_bd_share_config.share[0].bdDesc="我梦到了:"+resultDreamTitle+"，万年历中的解释为:"+result+"。查看更多周公解梦信息："+_bd_share_config.share[0].bdUrl;
        });
        $(".categoryContent").addClass("hidden");
        $(".recommandContent").addClass("hidden");
        $(".searchTxt").addClass("hidden");
        $(".dreamListContent").removeClass("hidden");
        $(".resultContent").removeClass("hidden");
    });
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