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
        "sxId":getQueryString("sxId"),
        "categoryId":getQueryString("categoryId"),
        "projectName":getQueryString("projectName")
    };
    var year=getQueryString("year");
    if(!shareData.userIcon){
        shareData.userIcon="img/wnl_icon.png";
    }
    if(!shareData.username){
        shareData.username="万年历-生肖运程";
    }
    if(!shareData.shareDate||shareData.shareDate==="null"){
        shareData.shareDate=(new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate();
    }
    if(!shareData.sxId){
        shareData.sxId="1";
    }
    if(!shareData.categoryId){
        shareData.categoryId="0";
    }
    if(!shareData.projectName){
        shareData.projectName="yuncheng";
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


    $(".lotGoBtn").click(function(){
        $(".shareInfoContent").addClass("hidden");
        $(".sxycContent").removeClass("hidden");
    });
    var sxYearList=[
        ["1948","1960","1972","1984","1996"],
        ["1949","1961","1973","1985","1997"],
        ["1950","1962","1974","1986","1998"],
        ["1951","1963","1975","1987","1999"],
        ["1952","1964","1976","1988","2000"],
        ["1953","1965","1977","1989","2001"],
        ["1954","1966","1978","1990","2002"],
        ["1955","1967","1979","1991","2003"],
        ["1944","1956","1968","1980","1992","2004"],
        ["1945","1957","1969","1981","1993"],
        ["1946","1958","1970","1982","1994"],
        ["1947","1959","1971","1983","1995"]
    ];
    var sxInfoList={},sxId=shareData.sxId;
    if(!sxInfoList["sx"+sxId]){
        load_script("./data/sxyc/"+sxId+".js",function(){
            sxInfoList["sx"+sxId]=result;
            initShareTxt(sxInfoList["sx"+sxId]);
        })
    }
    else{
        initShareTxt(sxInfoList["sx"+sxId]);
    }
    function initShareTxt(result){
        var sxName=result.title;
        var detailObj=getProjectDetail(shareData.categoryId,shareData.projectName);
        var categoryName=detailObj.categoryName,projectName=detailObj.projectName;
        var projectDesc=result[shareData.projectName];
        $(".shareTitle").html("属"+sxName+categoryName);
        $(".projectName").html(projectName);
        $(".projectDesc").html(projectDesc);
        _bd_share_config.share[0].bdUrl="http://"+location.host+location.pathname+"?shareDate="+(new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate()+
        "&sxId="+shareData.sxId+"&categoryId="+shareData.categoryId+"&projectName="+shareData.projectName;
        $.ajax({
            url:"http://api.t.sina.com.cn/short_url/shorten.json?source=1681459862&url_long="+ _bd_share_config.share[0].bdUrl,
            dataType:"jsonp",
            success: function (result) {
                _bd_share_config.share[0].bdUrl=result[0].url_short;
                _bd_share_config.share[0].bdText=_bd_share_config.share[0].bdDesc=categoryName+"-"+projectName+"："+projectDesc.replace(/<div>/g, '').replace(/<\/div>/g, '').substr(0,90)+"...查看我的2014运程："+_bd_share_config.share[0].bdUrl;
            }
        });
    }
    function getProjectDetail(categoryId,projectName){
        var detailObj={
            "categoryName":"",
            "projectName":""
        };
        if(categoryId==="0"){
            if(year){
                detailObj.categoryName=year+"年各方面运势";
            }
            else{
                detailObj.categoryName="2014年各方面运势";
            }
            switch (projectName){
                case "yuncheng":
                    detailObj.projectName="运程预测";
                    break;
                case "caiyun":
                    detailObj.projectName="财运预测";
                    break;
                case "shiye":
                    detailObj.projectName="事业运势";
                    break;
                case "ganqing":
                    detailObj.projectName="感情姻缘运势";
                    break;
                case "jiankang":
                    detailObj.projectName="健康运势";
                    break;
            }
        }
        else if(categoryId==="1"){
            if(year){
                detailObj.categoryName="不同年份的人"+year+"年运程大全及破解";
            }
            else{
                detailObj.categoryName="不同年份的人2014年运程大全及破解";
            }
            detailObj.projectName=projectName+"年";
        }
        else if(categoryId==="2") {
            if(year){
                detailObj.categoryName = year+"年每月运势预测";
            }
            else{
                detailObj.categoryName = "2014年每月运势预测";
            }
            switch (projectName) {
                case "month1":
                    detailObj.projectName = "一月";
                    break;
                case "month2":
                    detailObj.projectName = "二月";
                    break;
                case "month3":
                    detailObj.projectName = "三月";
                    break;
                case "month4":
                    detailObj.projectName = "四月";
                    break;
                case "month5":
                    detailObj.projectName = "五月";
                    break;
                case "month6":
                    detailObj.projectName = "六月";
                    break;
                case "month7":
                    detailObj.projectName = "七月";
                    break;
                case "month8":
                    detailObj.projectName = "八月";
                    break;
                case "month9":
                    detailObj.projectName = "九月(闰)";
                    break;
                case "month10":
                    detailObj.projectName = "十月";
                    break;
                case "month11":
                    detailObj.projectName = "十一月";
                    break;
                case "month12":
                    detailObj.projectName = "十二月";
                    break;
            }
        }
        return detailObj;
    }
    var $resultContent=$(".resultContent");
    $(".sxList a").click(function(){
        if(!$(this).hasClass("active")){
            $(".sxList a").removeClass("active");
            $(this).addClass("active");
            sxId=parseInt($(this).data("id"),10);
            if(!sxInfoList["sx"+sxId]){
                load_script("data/sxyc/"+sxId+".js",function(){
                    sxInfoList["sx"+sxId]=result;
                })
            }
            var categoryId=$(".levelSelect1").val(),projectName=$(".levelSelect2").val();
            var selectedOption=$(".levelSelect1 option:selected");
            var selectedVal=selectedOption.val();
            if(selectedVal==="-1"){
                return false
            }
            if(selectedVal==="1"){
                $(".levelSelect1").trigger("change");
                $resultContent.html("");
                $resultContent.css("height",'auto');
            }
            else{
                selectedOption=$(".levelSelect2 option:selected");
                selectedVal=selectedOption.val();
                if(selectedVal==="-1"){
                    return false
                }
                if(!sxInfoList["sx"+sxId]){
                    load_script("data/sxyc/"+sxId+".js",function(){
                        sxInfoList["sx"+sxId]=result;
                        var projectDesc=sxInfoList["sx"+sxId][selectedVal];
                        $resultContent.html(projectDesc);
                        if(categoryId!=="-1"&&projectName!=="-1"){
                            var detailObj=getProjectDetail(categoryId,projectName);
                            var categoryName=detailObj.categoryName,resultProjectName=detailObj.projectName;
                            _bd_share_config.share[0].bdUrl="http://"+location.host+location.pathname+"?shareDate="+(new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate()+
                            "&sxId="+sxId+"&categoryId="+categoryId+"&projectName="+projectName;
                            $.ajax({
                                url:"http://api.t.sina.com.cn/short_url/shorten.json?source=1681459862&url_long="+ _bd_share_config.share[0].bdUrl,
                                dataType:"jsonp",
                                success: function (result) {
                                    _bd_share_config.share[0].bdUrl=result[0].url_short;
                                    _bd_share_config.share[0].bdText=_bd_share_config.share[0].bdDesc=categoryName+"-"+resultProjectName+"："+projectDesc.replace(/<div>/g, '').replace(/<\/div>/g, '').substr(0,90)+"...查看我的2014运程："+_bd_share_config.share[0].bdUrl;
                                }
                            });
                        }
                    })
                }
                else{
                    var projectDesc=sxInfoList["sx"+sxId][selectedVal];
                    $resultContent.html(projectDesc);
                    if(categoryId!=="-1"&&projectName!=="-1"){
                        var detailObj=getProjectDetail(categoryId,projectName);
                        var categoryName=detailObj.categoryName,resultProjectName=detailObj.projectName;
                        _bd_share_config.share[0].bdUrl="http://"+location.host+location.pathname+"?shareDate="+(new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate()+
                        "&sxId="+sxId+"&categoryId="+categoryId+"&projectName="+projectName;
                        $.ajax({
                            url:"http://api.t.sina.com.cn/short_url/shorten.json?source=1681459862&url_long="+ _bd_share_config.share[0].bdUrl,
                            dataType:"jsonp",
                            success: function (result) {
                                _bd_share_config.share[0].bdUrl=result[0].url_short;
                                _bd_share_config.share[0].bdText=_bd_share_config.share[0].bdDesc=categoryName+"-"+resultProjectName+"："+projectDesc.replace(/<div>/g, '').replace(/<\/div>/g, '').substr(0,90)+"...查看我的2014运程："+_bd_share_config.share[0].bdUrl;
                            }
                        });
                    }
                }
            }
        }
    });
    var $levelSelect2=$(".levelSelect2");
    $(".levelSelect1").on("change",function(){
        var selectedOption=$(".levelSelect1 option:selected");
        var selectedVal=selectedOption.val();
        $(".levelUISelect1 .selectTxt").html(selectedOption.html());
        $(".levelUISelect2 .selectTxt").html("请选择");
        $(".levelSelect2 option").remove();
        $levelSelect2.append('<option value="-1">请选择</option>');
        $resultContent.css("height",'0');
        if(selectedVal==="-1"){
            return false
        }
        if(selectedVal==="0"){
            $levelSelect2.append('<option value="yuncheng">运程预测</option>');
            $levelSelect2.append('<option value="caiyun">财运预测</option>');
            $levelSelect2.append('<option value="shiye">事业运势</option>');
            $levelSelect2.append('<option value="ganqing">感情姻缘运势</option>');
            $levelSelect2.append('<option value="jiankang">健康运势</option>');
        }
        else if(selectedVal==="1"){
            for(var i=0;i<sxYearList[sxId-1].length;i++){
                $levelSelect2.append('<option value="'+sxYearList[sxId-1][i]+'">'+sxYearList[sxId-1][i]+'年</option>');
            }
        }
        else if(selectedVal==="2"){
            $levelSelect2.append('<option value="month1">一月</option>');
            $levelSelect2.append('<option value="month2">二月</option>');
            $levelSelect2.append('<option value="month3">三月</option>');
            $levelSelect2.append('<option value="month4">四月</option>');
            $levelSelect2.append('<option value="month5">五月</option>');
            $levelSelect2.append('<option value="month6">六月</option>');
            $levelSelect2.append('<option value="month7">七月</option>');
            $levelSelect2.append('<option value="month8">八月</option>');
            $levelSelect2.append('<option value="month9">九月(闰)</option>');
            $levelSelect2.append('<option value="month10">十月</option>');
            $levelSelect2.append('<option value="month11">十一月</option>');
            $levelSelect2.append('<option value="month12">十二月</option>');
        }
        $(".resultContent").html("");
    });
    $levelSelect2.on("change",function(){
        var selectedOption=$(".levelSelect2 option:selected");
        var selectedVal=selectedOption.val();
        $(".levelUISelect2 .selectTxt").html(selectedOption.html());
        if(selectedVal==="-1"){
            return false
        }
        var categoryId=$(".levelSelect1").val(),projectName=$(".levelSelect2").val();
        if(!sxInfoList["sx"+sxId]){
            load_script("data/sxyc/"+sxId+".js",function(){
                sxInfoList["sx"+sxId]=result;
                var projectDesc=sxInfoList["sx"+sxId][selectedVal];
                $resultContent.html(projectDesc);
                if(categoryId!=="-1"&&projectName!=="-1"){
                    var detailObj=getProjectDetail(categoryId,projectName);
                    var categoryName=detailObj.categoryName,resultProjectName=detailObj.projectName;
                    _bd_share_config.share[0].bdUrl="http://"+location.host+location.pathname+"?shareDate="+(new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate()+
                    "&sxId="+sxId+"&categoryId="+categoryId+"&projectName="+projectName;
                    $.ajax({
                        url:"http://api.t.sina.com.cn/short_url/shorten.json?source=1681459862&url_long="+ _bd_share_config.share[0].bdUrl,
                        dataType:"jsonp",
                        success: function (result) {
                            _bd_share_config.share[0].bdUrl=result[0].url_short;
                            _bd_share_config.share[0].bdText=_bd_share_config.share[0].bdDesc=categoryName+"-"+resultProjectName+"："+projectDesc.replace(/<div>/g, '').replace(/<\/div>/g, '').substr(0,90)+"...查看我的2014运程："+_bd_share_config.share[0].bdUrl;
                        }
                    });
                }
            })
        }
        else{
            var projectDesc=sxInfoList["sx"+sxId][selectedVal];
            $resultContent.html(projectDesc);
            if(categoryId!=="-1"&&projectName!=="-1"){
                var detailObj=getProjectDetail(categoryId,projectName);
                var categoryName=detailObj.categoryName,resultProjectName=detailObj.projectName;
                _bd_share_config.share[0].bdUrl="http://"+location.host+location.pathname+"?shareDate="+(new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate()+
                "&sxId="+sxId+"&categoryId="+categoryId+"&projectName="+projectName;
                $.ajax({
                    url:"http://api.t.sina.com.cn/short_url/shorten.json?source=1681459862&url_long="+ _bd_share_config.share[0].bdUrl,
                    dataType:"jsonp",
                    success: function (result) {
                        _bd_share_config.share[0].bdUrl=result[0].url_short;
                        _bd_share_config.share[0].bdText=_bd_share_config.share[0].bdDesc=categoryName+"-"+resultProjectName+"："+projectDesc.replace(/<div>/g, '').replace(/<\/div>/g, '').substr(0,90)+"...查看我的2014运程："+_bd_share_config.share[0].bdUrl;
                    }
                });
            }
        }
        $resultContent.css("height",'auto');
    });
    function load_script(url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        if (script.readyState) { //IE
            script.onreadystatechange = function() {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null;
                    callback();
                }
            }
        }
        else { //others
            script.onload = function() {
                callback();
            }
        }
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
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