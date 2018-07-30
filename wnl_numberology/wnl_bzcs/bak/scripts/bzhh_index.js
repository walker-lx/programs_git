var userId="",deviceId="";
$(function () {
    var maleBornDate="",femalBornDate="";
    var is_android=navigator.userAgent.toLocaleLowerCase().indexOf("android")>-1;
    if(navigator.userAgent.toLocaleLowerCase().indexOf("android")===-1){
        FastClick.attach(document.getElementById("btnMeasure"));
    }
    $(document).on("touchstart", function (e) {},true);
    if(getQueryString("share")){
        $(".wnlBannerLink").removeClass("hidden");
        $(".yiqiDesc").addClass("hidden");
        if($(window).height()<560&&$(".wnlBannerLink").css("position")==="absolute"){
            $(".wnlBannerLink").css("position","static");
        }
    }
    else{
        if($(window).height()<560&&$(".yiqiDesc").css("position")==="absolute"){
            $(".yiqiDesc").css("position","static");
        }
    }
    $(window).on("resize", function () {
        if($(window).height()>560){
            $(".yiqiDesc").css("position","absolute");
        }
        else if($(window).height()<560&&$(".yiqiDesc").css("position")==="absolute"){
            $(".yiqiDesc").css("position","static");
        }
        if($(window).height()>560){
            $(".wnlBannerLink").css("position","absolute");
        }
        else if($(window).height()<560&&$(".wnlBannerLink").css("position")==="absolute"){
            $(".wnlBannerLink").css("position","static");
        }
    });
    $(".leftDescContent").width($(".descWrapper").width()/2+5);
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
    //var versionIndex=getWNLVersion();
    //if(versionIndex>=433){
    //    var oldHref=window.location.href;
    //    window.location.href=oldHref.replace("Numberology","NumberologyTest");
    //}
    //function getWNLVersion(){
    //    var ua=navigator.userAgent.toLowerCase();
    //    //var ua="Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H141 wnl 4.3.3".toLowerCase();
    //    var index1=ua.indexOf("wnl");
    //    var versionCode=ua.substring(index1+4);
    //    var codeList=versionCode.split(".");
    //    return parseInt(codeList[0]*100)+parseInt(codeList[1]*10)+parseInt(codeList[2]);
    //}
    location.href="protocol://getuserinfo#userinfocallback";
    $('#maleBornInput').mobiscroll().datePicker({
        theme: "ios",
        mode: "scroller",
        display: "bottom",
        lang: "zh",
        isSolar: 1,
        enableSolarLunar:1,
        showSolarLunar: 0,
        enableIgnore: 0,
        onSelect: function(r, t) {}
    });
    $('#maleBornInput').mobiscroll("setArrayVal", [1990, 1, 1], !1, !1, !1, 0);
    $('#femaleBornInput').mobiscroll().datePicker({
        theme: "ios",
        mode: "scroller",
        display: "bottom",
        lang: "zh",
        isSolar: 1,
        enableSolarLunar:1,
        showSolarLunar: 0,
        enableIgnore: 0,
        onSelect: function(r, t) {}
    });
    $('#femaleBornInput').mobiscroll("setArrayVal", [1990, 1, 1], !1, !1, !1, 0);


    $("#maleBirthHour").on("click",function () {
        $(".mask").removeClass("hidden");
    });
    $("#maleBirthHour").on("blur",function () {
        $(".mask").trigger("click");
    });
    $("#femaleBirthHour").on("click",function () {
        $(".mask").removeClass("hidden");
    });
    $("#femaleBirthHour").on("blur",function () {
        $(".mask").trigger("click");
    });
    $(".mask").click(function () {
        $(this).addClass("hidden");
    });
    $("#maleBirthHour").change(function () {
        $(".mask").trigger("click");
        if($(this).val()==="-1"||$(this).val()==="null"||$(this).val().length===0){
            return false;
        }
        maleBornTime=$(this).val();
        $("#maleBirthHourUI").html($("#maleBirthHour option:selected").html());
    });
    $("#femaleBirthHour").change(function () {
        $(".mask").trigger("click");
        if($(this).val()==="-1"||$(this).val()==="null"||$(this).val().length===0){
            return false;
        }
        femaleBornTime=$(this).val();
        $("#femaleBirthHourUI").html($("#femaleBirthHour option:selected").html());
    });

    userId=getQueryString("userId")&&getQueryString("userId").length!==0?getQueryString("userId"):"";
    deviceId=getQueryString("deviceId")&&getQueryString("deviceId").length!==0?getQueryString("deviceId"):"";
    var  mac=getQueryString("mac")&&getQueryString("mac").length!==0?getQueryString("mac"):"",
        imei=getQueryString("imei")&&getQueryString("imei").length!==0?getQueryString("imei"):"";

    //var ua=navigator.userAgent.toLocaleLowerCase();
    //if(ua.indexOf("android")>-1||imei!=="[IMEI]"){
    //    deviceId="";
    //}
    //else{
    //    imei="";
    //}
    if(userId.toLowerCase()==="[wnluserid]"){
        userId="";
    }
    if(deviceId.toLowerCase()==="[openudid]"){
        deviceId="";
    }
    if(mac.toLowerCase()==="[mac]"){
        mac="";
    }
    if(imei.toLowerCase()==="[imei]"){
        imei="";
    }
    $("#maleNameTxt").val("");
    $("#maleBornInput").val("");
    $("#maleBirthHour").val("24");
    $("#maleBirthHour").trigger("change");
    $("#femaleNameTxt").val("");
    $("#femaleBornInput").val("");
    $("#femaleBirthHour").val("24");
    $("#femaleBirthHour").trigger("change");
    var isWorking=false;
    $(".confirmBtn").click(function () {
        if(isWorking){
            return false;
        }
        if(userId===""&&deviceId===""&&mac===""&&imei===""){
            isWorking=false;
            $("#tipModal").modal({showString:"未获取到相关信息"});
            return false;
        }
        _hmt.push(['_trackEvent', 'bahh_confirm', 'click', 'confirm']);
        isWorking=true;
        var maleName=$("#maleNameTxt").val().trim();
        if(maleName.length===0){
            isWorking=false;
            $("#tipModal").modal({showString:"请输入男方姓名"});
            return false;
        }
        maleBornDate=$("#maleBornInput").val().substr(3).trim().replace("年","-").replace("月","-").replace("日","");
        if(maleBornDate.length===0){
            isWorking=false;
            $("#tipModal").modal({showString:"请选择男方出生日期"});
            return false;
        }
        if(maleBornTime==="-1"){
            isWorking=false;
            $("#tipModal").modal({showString:"请选择男方出生时间"});
            return false;
        }
        var femaleName=$("#femaleNameTxt").val().trim();
        if(femaleName.length===0){
            isWorking=false;
            $("#tipModal").modal({showString:"请输入女方姓名"});
            return false;
        }
        femalBornDate=$("#femaleBornInput").val().substr(3).trim().replace("年","-").replace("月","-").replace("日","");
        if(femalBornDate.length===0){
            isWorking=false;
            $("#tipModal").modal({showString:"请选择女方出生日期"});
            return false;
        }
        if(femaleBornTime==="-1"){
            isWorking=false;
            $("#tipModal").modal({showString:"请选择女方出生时间"});
            return false;
        }
        var prm = {
            MaleName: maleName,
            MaleBirthDay:maleBornDate + ' ' + maleBornTime + ':00:00',
            MaleWeiZhi:0,
            FeMaleName:femaleName,
            FeMaleBirthDay:femalBornDate + ' ' + femaleBornTime + ':00:00',
            FemaleWeiZhi:0,
            OrderType:1,
            UserId: userId,
            DeviceId: deviceId,
            Mac: "",
            Imei: imei
        };
        var clientObj={
            "bzhh":{
                "maleName":maleName,
                "maleDate":maleBornDate,
                "maleTime":maleBornTime + ':00',
                "femaleName":femaleName,
                "femaleDate":femalBornDate,
                "femaleTime":femaleBornTime + ':00'
            }
        };
        if(maleBornTime==="24"){
            prm.MaleBirthDay=maleBornDate+ ' ' + '01:59:59';
        }
        if(femaleBornTime==="24"){
            prm.FeMaleBirthDay=femalBornDate+ ' ' + '01:59:59';
        }
        $.ajax({
            cache: false,
            type: "GET",
            dataType: "json",
            url: "../NRLorder/CreatehhOrder?" + $.param(prm),
            success: function (data) {
                isWorking=false;
                if (data.status == 0) {
                    location.href="protocol://saveuserinfo#"+Base64.encode(JSON.stringify(clientObj));
                    $(".redirectLink").attr("href","bzhhfree.html?orderid=" + data.data);
                    setTimeout(function () {
                        if (is_android){
                            window.location.href = "bzhhfree.html?orderid=" + data.data;
                        }
                        else
                        {
                            $(".clickContent").trigger("click");
                        }
                    },0);
                }
            },
            error: function (xhr, ajaxOperation, throwErr) {
                isWorking=false;
                return false;
            }
        });
    });
    $("#btnRecords").click(function () {
        _hmt.push(['_trackEvent', 'bahh_history', 'click', 'history']);
        $(".redirectLink").attr("href","bzhhh.html?userId="+userId+"&deviceId="+deviceId+"&mac="+mac+"&imei="+imei);
        setTimeout(function () {
            if (is_android){
                window.location.href = "bzhhh.html?userId="+userId+"&deviceId="+deviceId+"&mac="+mac+"&imei="+imei;
            }
            else
            {
                $(".clickContent").trigger("click");
            }
        });
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
var originalAllObj;
var maleBornTime="-1",femaleBornTime="-1";
function userinfocallback(result){
    var originalString=Base64.decode(result);
    originalAllObj=JSON.parse(originalString);
    var originalObj;
    if(originalAllObj.bzhh){
        originalObj=originalAllObj.bzhh;
        if(originalObj.maleName&&originalObj.maleName.length!==0){
            $("#maleNameTxt").val(originalObj.maleName);
        }
        if(originalObj.maleDate&&originalObj.maleDate.length!==0){
            var year=(originalObj.maleDate.substring(0,4)),month=(originalObj.maleDate.substring(5,7)),day=(originalObj.maleDate.substring(8,10));
            $("#maleBornInput").val("公历 "+year+"年"+month+"月"+day+"日");
            $('#maleBornInput').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
        }
        if(originalObj.maleTime&&originalObj.maleTime.length!==0){
            var hour=originalObj.maleTime.substr(0,2);
            $("#maleBirthHour").val(hour);
            $("#maleBirthHour").trigger("change");
        }
        if(originalObj.femaleName&&originalObj.femaleName.length!==0){
            $("#femaleNameTxt").val(originalObj.femaleName);
        }
        if(originalObj.femaleDate&&originalObj.femaleDate.length!==0){
            var year=(originalObj.femaleDate.substring(0,4)),month=(originalObj.femaleDate.substring(5,7)),day=(originalObj.femaleDate.substring(8,10));
            $("#femaleBornInput").val("公历 "+year+"年"+month+"月"+day+"日");
            $('#femaleBornInput').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
        }
        if(originalObj.femaleTime&&originalObj.femaleTime.length!==0){
            var hour=originalObj.femaleTime.substr(0,2);
            $("#femaleBirthHour").val(hour);
            $("#femaleBirthHour").trigger("change");
        }
    }
    else if(originalAllObj.native_jryc||originalAllObj.native_usercenter){
        originalObj=originalAllObj.native_jryc||originalAllObj.native_usercenter;
        if(originalObj.sex!==undefined&&parseInt(originalObj.sex)!==-1) {
            var sex1 =parseInt(originalObj.sex);
            if(sex1===1){
                if(originalObj.name&&originalObj.name.length!==0){
                    $("#maleNameTxt").val(originalObj.name);
                }
                if(originalObj.date&&originalObj.date.length!==0){
                    var year=(originalObj.date.substring(0,4)),month=(originalObj.date.substring(5,7)),day=(originalObj.date.substring(8,10));
                    $("#maleBornInput").val("公历 "+year+"年"+month+"月"+day+"日");
                    $('#maleBornInput').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
                }
                if(originalObj.time&&originalObj.time.length!==0){
                    var hour=originalObj.time.substr(0,2);
                    $("#maleBirthHour").val(hour);
                    $("#maleBirthHour").trigger("change");
                }
            }
            else{
                if(originalObj.name&&originalObj.name.length!==0){
                    $("#femaleNameTxt").val(originalObj.name);
                }
                if(originalObj.date&&originalObj.date.length!==0){
                    var year=(originalObj.date.substring(0,4)),month=(originalObj.date.substring(5,7)),day=(originalObj.date.substring(8,10));
                    $("#femaleBornInput").val("公历 "+year+"年"+month+"月"+day+"日");
                    $('#femaleBornInput').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
                }
                if(originalObj.time&&originalObj.time.length!==0){
                    var hour=originalObj.time.substr(0,2);
                    $("#femaleBirthHour").val(hour);
                    $("#femaleBirthHour").trigger("change");
                }
            }
        }
    }
    if (originalAllObj.native_score) {
        var native_score = originalAllObj.native_score;
        if(native_score.userId&&native_score.userId.length!==0&&userId.length===0){
            userId=native_score.userId;
        }
        if(native_score.deviceId&&native_score.deviceId.length!==0&&deviceId.length===0){
            deviceId=native_score.deviceId;
        }
    }
}
function str2Int(str){
    str = str.replace(/^0+/g, '');
    if(str.length == 0){
        return 0;
    }
    return parseInt(str);
}
function ylappCallback_back()
{
    document.location.href="protocol://exit#";
}