$(function(){
    var startPickDate=new Date(),endPickDate=new Date();
    function startDatePicking(){
        var startPickYear=parseInt($dp.cal.getNewP('y'),10);
        var startPickMonth=parseInt($dp.cal.getNewP('M'),10)-1;
        var startPickDay=parseInt($dp.cal.getNewP('d'),10);
        var tempStartPickDate=new Date(startPickYear,startPickMonth,startPickDay);
        if(endPickDate<tempStartPickDate){
            alert("结束日期应大于开始日期");
            return true;
        }
        startPickDate=tempStartPickDate;
        getZjrList();
    }
    function startDatePicked(){
        $(".startDatePick").val(startPickDate.getFullYear()+"年"+(startPickDate.getMonth()+1)+"月"+startPickDate.getDate()+"日");
        $(".startDatePick").html(startPickDate.getFullYear()+"年"+(startPickDate.getMonth()+1)+"月"+startPickDate.getDate()+"日");
    }
    function endDatePicking(){
        var endPickYear=parseInt($dp.cal.getNewP('y'),10);
        var endPickMonth=parseInt($dp.cal.getNewP('M'),10)-1;
        var endPickDay=parseInt($dp.cal.getNewP('d'),10);
        var tempEndPickDate=new Date(endPickYear,endPickMonth,endPickDay);
        if(tempEndPickDate<startPickDate){
            alert("结束日期应大于开始日期");
            return true;
        }
        endPickDate=tempEndPickDate;
        getZjrList();
    }
    function endDatePicked(){
        $(".endDatePick").val(endPickDate.getFullYear()+"年"+(endPickDate.getMonth()+1)+"月"+endPickDate.getDate()+"日");
        $(".endDatePick").html(endPickDate.getFullYear()+"年"+(endPickDate.getMonth()+1)+"月"+endPickDate.getDate()+"日");
    }
    $(".startDatePick").on("click", function () {
        WdatePicker({dateFmt:'yyyy年MM月dd日',onpicking:startDatePicking,onpicked:startDatePicked});
    });
    $(".endDatePick").on("click", function () {
        WdatePicker({dateFmt:'yyyy年MM月dd日',onpicking:endDatePicking,onpicked:endDatePicked})
    });

    //var arrayList=null,dataYear=2014;
    //$.getJSON("./data/zjr/2014.json",function(result) {
    //    arrayList=result;
    //});


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
        shareData.username="万年历-择吉日";
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

    var ua=navigator.userAgent.toLocaleLowerCase();
    var wx=ua.indexOf("micromessenger")>-1;
    var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
    var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
    var isAndroid=ua.indexOf("android")>-1;
    var isWP=ua.indexOf("windows phone")>-1;
    if(!isIOSPhone&&!isAndroid&&!isWP){
        $(".shareContent").removeClass("hidden");
        $(".shareBtn").hover(function(){
            $(".shareDomPanel").fadeIn();
            $(".downloadPanel").fadeOut();
        },function(){});
        $(".shareDomPanel").hover(function(){
            $(".shareDomPanel").fadeIn();
            $(".downloadPanel").fadeOut();
        },function(){
            $(".shareDomPanel").fadeOut();
        });
        $(".downloadBtn").hover(function(){
            $(".shareDomPanel").fadeOut();
            $(".downloadPanel").fadeIn();
        },function(){});
        $(".downloadPanel").hover(function(){
            $(".shareDomPanel").fadeOut();
            $(".downloadPanel").fadeIn();
        },function(){
            $(".downloadPanel").fadeOut();
        });
    }
    else{
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
    }
    var dateNow=new Date();
    var yearNow=dateNow.getFullYear();
    var monthNow=dateNow.getMonth();
    var dayNow=dateNow.getDate();
    startPickDate=new Date(yearNow,monthNow,dayNow);
    var endDate=dateNow;
    endDate.setMonth(endDate.getMonth()+1);
    endPickDate=new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate());
    $(".startDatePick").val(yearNow+"年"+(monthNow+1)+"月"+dayNow+"日");
    $(".startDatePick").html(yearNow+"年"+(monthNow+1)+"月"+dayNow+"日");
    $(".endDatePick").val(endDate.getFullYear()+"年"+(endDate.getMonth()+1)+"月"+endDate.getDate()+"日");
    $(".endDatePick").html(endDate.getFullYear()+"年"+(endDate.getMonth()+1)+"月"+endDate.getDate()+"日");

    var name=getQueryString("name")?getQueryString("name"):"嫁娶",type=getQueryString("type")?getQueryString("type"):"0";
    var $yjSelect=$(".yjSelect"),$yjItemSelect=$(".yjItemSelect");
    $yjSelect.on("change", function () {
        var selectedOption=$(".yjSelect option:selected");
        $(".yjUISelect .selectTxt").html(selectedOption.html());
        getZjrList();
    });
    $yjSelect.val(type);
    $yjSelect.trigger("change");

    $yjItemSelect.on("change", function () {
        var selectedOption=$(".yjItemSelect option:selected");
        $(".yjItemUISelect .selectTxt").html(selectedOption.html());
        getZjrList();
    });
    $yjItemSelect.val(name);
    $yjItemSelect.trigger("change");
    getZjrList();
    function getZjrList(){
        var selectedOption=$(".yjSelect option:selected");
        var yjSelectVal=selectedOption.val();
        var yjSelectString=selectedOption.html();
        selectedOption=$(".yjItemSelect option:selected");
        var yjItemSelectVal=selectedOption.val();
        var yjItemSelectString=selectedOption.html();
        var yjDayCount= 0,targetArrayList=[];
        for(var item in arrayList){
            if(arrayList.hasOwnProperty(item)){
                var itemYear=str2Int(item.substr(1,4));
                var itemMonth=str2Int(item.substr(5,2));
                var itemDay=str2Int(item.substr(7,2));
                var itemDate=new Date(itemYear,itemMonth-1,itemDay);
                var yjData=yjSelectVal==="0"?arrayList[item].y:arrayList[item].j;
                if(itemDate>=startPickDate&&itemDate<=endPickDate&&yjData.indexOf(yjItemSelectString)>-1){
                    targetArrayList.push(itemDate);
                    yjDayCount++;
                }
            }
        }
        $(".yjDayCountTip").html(yjSelectString+" "+yjItemSelectString+"的日子共有"+yjDayCount+"天");
        targetArrayList.sort(function(a,b){
            if (a === b) {
                return 0;
            }
            else {
                return a > b ? 1 : -1;
            }
        });
        dateNow=new Date();
        yearNow=dateNow.getFullYear();
        monthNow=dateNow.getMonth();
        dayNow=dateNow.getDate();
        var dateNowDay=new Date(yearNow,monthNow,dayNow),intervalTime= 0,intervalDay=0;
        $(".resultList").empty();
        for(var i=0;i<targetArrayList.length;i++){
            var targetItemDate=targetArrayList[i];
            intervalTime=(targetItemDate.getTime()-dateNowDay.getTime())/(1000*3600*24);
            if(intervalTime===0){
                intervalDay="今天";
            }
            else if(intervalTime>0){
                intervalDay=Math.abs(intervalTime)+"天后";
            }
            else if(intervalTime<0){
                intervalDay=Math.abs(intervalTime)+"天前";
            }
            var tempResultItem=$(".tempResultItem").clone();
            tempResultItem.find(".sDate").html(targetItemDate.getFullYear()+"年"+(targetItemDate.getMonth()+1)+"月"+targetItemDate.getDate()+"日");
            tempResultItem.find(".lDate").html("农历"+getLDateString(targetItemDate));
            tempResultItem.find(".dayCount").html(intervalDay);
            tempResultItem.removeClass("tempResultItem");
            tempResultItem.appendTo(".resultList");
            tempResultItem.removeClass("hidden");
        }
        var lastedDate=dateNowDay;
        for(var i=0;i<targetArrayList.length;i++){
            var targetItemDate=targetArrayList[i];
            intervalTime=(targetItemDate.getTime()-dateNowDay.getTime())/(1000*3600*24);
            if(intervalTime===0){
                lastedDate=targetItemDate;
                break;
            }
            else if(intervalTime>0){
                lastedDate=targetItemDate;
                break;
            }
            lastedDate=targetItemDate;
        }
        _bd_share_config.share[0].bdUrl="http://"+location.host+location.pathname+"?shareDate="+(new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate();
        _bd_share_config.share[0].bdText=_bd_share_config.share[0].bdDesc=startPickDate.getFullYear()+"."+(startPickDate.getMonth()+1)+"."+startPickDate.getDate()+"~"+endPickDate.getFullYear()+"."+(endPickDate.getMonth()+1)+"."+endPickDate.getDate()+"，"
        +yjSelectString+yjItemSelectString+"的日子共有"+yjDayCount+"天，最近的日子是"+lastedDate.getFullYear()+"."+(lastedDate.getMonth()+1)+"."+lastedDate.getDate()+"。查看更多吉日信息："+_bd_share_config.share[0].bdUrl;
    }
    function getLDateString(targetDate){
        var lunarDate= new Lunar(targetDate);
        return lunarDate.year+"年"+monthName[lunarDate.month-1]+cDay(lunarDate.day);
    }
    function str2Int(str){
        str = str.replace(/^0+/g, '');
        if(str.length == 0){
            return 0;
        }
        return parseInt(str);
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