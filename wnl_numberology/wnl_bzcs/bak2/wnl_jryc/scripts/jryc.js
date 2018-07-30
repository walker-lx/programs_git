var wnl_utils = (function () {
    function getQS(name) {
        var sValue = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]*)(\&?)", "i"));
        return decodeURIComponent(sValue ? sValue[1] : sValue);
    }
    return {
        getQS: getQS
    };
})();
var pageObj = (function () {
    var dicTime = {
        "子": "23:00~01:00",
        "丑": "01:00~03:00",
        "寅": "03:00~05:00",
        "卯": "05:00~07:00",
        "辰": "07:00~09:00",
        "巳": "09:00~11:00",
        "午": "11:00~13:00",
        "未": "13:00~15:00",
        "申": "15:00~17:00",
        "酉": "17:00~19:00",
        "戌": "19:00~21:00",
        "亥": "21:00~23:00"
    };
    return {
        api: {
            getResult: "/numberology/NRLorder/getluckday?"
        },
        page: {},
        person: {
            name: decodeURIComponent(wnl_utils.getQS("name")),
            birthday: decodeURIComponent(wnl_utils.getQS("birthday")),
            sex: decodeURIComponent(wnl_utils.getQS("sex"))
        },
        dicTime: dicTime
    };
})();
$(function () {
    var share=getQueryString("share");
    var prm = pageObj.person;
    if (!prm.birthday) {
        alert("请输入正确的用户生日");
        return;
    }

    var realName=Base64.decode(pageObj.person.name);
    if(realName.length===0){
        $("#name").addClass("hidden");
    }
    if(share&&realName.length===0){
        $(".nameContent").addClass("hidden");
        $(".percentContent").css("padding-top","37px");
    }
    if(share){
        $(".wnlBanner").show();
        $(".mingpanLink").attr("href","bzmp.html?share=1&name="+prm.name+"&birthday="+prm.birthday+"&sex="+prm.sex);
    }
    else{
        $(".mingpanLink").attr("href","bzmp.html?name="+prm.name+"&birthday="+prm.birthday+"&sex="+prm.sex);
    }

    var ua=navigator.userAgent.toLocaleLowerCase();
    var wnl=ua.indexOf("wnl")>-1;
    if(!wnl){
        $(".wnlBanner").show();
    }
    $(".closeBanner").click(function(){
        $(".wnlBanner").hide();
    });
    $(".downloadBtn").click(function(){
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
    if(localStorage["jrycLastData"]){
        var lastData=JSON.parse(localStorage["jrycLastData"]);
        var lastUpdateDate=lastData.lastUpdateDate,birthday=lastData.birthday;
        var dateNow=new Date();
        var dateNowString=dateNow.getFullYear()+"-"+dateNow.getMonth()+"-"+dateNow.getDate();
        //if(lastUpdateDate===dateNowString&&birthday===pageObj.person.birthday&&pageObj.person.sex===lastData.sex){
        if(lastUpdateDate===dateNowString&&birthday===pageObj.person.birthday){
            $("#name").text(realName);
            $("#sex").text(lastData.sex);
            $("#birthday").text(pageObj.person.birthday);
            $(".count").text(lastData.score);
            $("#caiWei").text(lastData.caiWei.replace(/、/g," "));
            $("#chong").text(lastData.chong);
            $("#color").text(lastData.color);
            $("#food").text(lastData.food.replace(/、/g," "));
            $("#ganZhi").text(lastData.ganZhi);
            $("#jianXing").text(lastData.jianXing.replace("（","(").replace("）",")"));
            $("#number").text(lastData.number);
            $("#shuai").text(lastData.shuai.replace(/、/g," "));
            $("#taoHua").text(lastData.taoHua);
            $("#wang").text(lastData.wang.replace(/、/g," "));
            localStorage["lastData"]=JSON.stringify(lastData);
            var lastNum=parseInt(pageObj.person.birthday.substring(pageObj.person.birthday.lastIndexOf("-")+1,pageObj.person.birthday.length))%10;
            $("#percent").text(lastData.score-lastNum+ '%');
            var mkpTd = '<td class="jiShiItem"><span class="timeIndex"><%- time %></span><span class="timeDesc"><%- timeDesc %></span></td>';
            $.each(lastData.jiShi, function (index, item) {
                if (index % 2 == 0) {
                    $("#tbdJiShi").append('<tr class="timeLine"></tr>');
                }
                $("#tbdJiShi").children().last().append(_.template(mkpTd)({
                    time: item,
                    timeDesc: pageObj.dicTime[item]
                }));
            });
            var title=realName+"的今日运程得分"+lastData.score+"分，已经超过"+(lastData.score - lastNum)+"%的网友。";
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
        }
        else{
            getData();
        }
    }
    else{
        getData();
    }
   function getData(){
       prm.sex="男";
       var realName=Base64.decode(prm.name).substr(0,10);
        prm.name=Base64.encode(realName);
       $.ajax({
           cache: false,
           type: "GET",
           dataType: "json",
           url: pageObj.api.getResult + $.param(prm),
           success: function (result) {
               if (result.status == 0) {
                   var data = result.data;
                   $("#name").text(realName);
                   $("#sex").text(pageObj.person.sex);
                   data.sex=pageObj.person.sex;
                   $("#birthday").text(pageObj.person.birthday);
                   var dateNow=new Date();
                   data.lastUpdateDate=dateNow.getFullYear()+"-"+dateNow.getMonth()+"-"+dateNow.getDate();
                   data.birthday=pageObj.person.birthday;
                   $(".count").text(data.score);
                   $("#caiWei").text(data.caiWei.replace(/、/g," "));
                   $("#chong").text(data.chong);
                   $("#color").text(data.color);
                   $("#food").text(data.food.replace(/、/g," "));
                   $("#ganZhi").text(data.ganZhi);
                   $("#jianXing").text(data.jianXing.replace("（","(").replace("）",")"));
                   $("#number").text(data.number);
                   $("#shuai").text(data.shuai.replace(/、/g," "));
                   $("#taoHua").text(data.taoHua);
                   $("#wang").text(data.wang.replace(/、/g," "));
                   localStorage["jrycLastData"]=JSON.stringify(data);
                   var lastNum=parseInt(pageObj.person.birthday.substring(pageObj.person.birthday.lastIndexOf("-")+1,pageObj.person.birthday.length))%10;
                   $("#percent").text(data.score-lastNum+ '%');
                   var mkpTd = '<td class="jiShiItem"><span class="timeIndex"><%- time %></span><span class="timeDesc"><%- timeDesc %></span></td>';
                   $.each(data.jiShi, function (index, item) {
                       if (index % 2 == 0) {
                           $("#tbdJiShi").append('<tr class="timeLine"></tr>');
                       }
                       $("#tbdJiShi").children().last().append(_.template(mkpTd)({
                           time: item,
                           timeDesc: pageObj.dicTime[item]
                       }));
                   });
                   var title=realName+"的今日运程得分"+data.score+"分，已经超过"+(data.score - lastNum)+"%的网友。";
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
               }
               else {
                   alert("获取结果失败,请重试");
               }
           },
           error: function (xhr, ajaxOperation, throwErr) {
               return false;
           }
       });
   }
    $.ajax({
        url:"http://apic.51wnl.com/CttApi/GetBaZiCeSuanUsedCount",
        type:"get",
        dataType:"jsonp",
        success: function (result) {
            //result=JSON.parse(result);
            if(result.status===200){
                $(".cesuanTxt2").html("已有"+result.data+"人使用");
            }
        }
    });
    var userId=getQueryString("userId")&&getQueryString("userId")!=="null"&&getQueryString("userId").length!==0?getQueryString("userId"):"",
        deviceId=getQueryString("deviceId")&&getQueryString("deviceId")!=="null"&&getQueryString("deviceId").length!==0?getQueryString("deviceId"):"",
        mac=getQueryString("mac")&&getQueryString("mac")!=="null"&&getQueryString("mac").length!==0?getQueryString("mac"):"",
        imei=getQueryString("imei")&&getQueryString("imei")!=="null"&&getQueryString("imei").length!==0?getQueryString("imei"):"";
    var ua=navigator.userAgent.toLocaleLowerCase();
    if(share){
        $(".editLink").addClass("hidden");
        $(".ceshiLink").click(function () {
            $("#tipModal").modal();
        });
        $(".downloadBtn").click(function () {
            // 下载链接
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
    }
    else{
        //if(ua.indexOf("android")>-1||imei!=="[IMEI]"){
        //    $(".ceshiLink").attr("href","bzcs_index.html?userId="+userId+"&deviceId="+deviceId+"&mac="+mac+"&imei="+imei);
        //}
        //else{
        //    $(".ceshiLink").attr("href","bzcs_index.html?userId="+userId+"&deviceId="+deviceId);
        //}
        $(".ceshiLink").attr("href","bzcs_index.html?userId="+userId+"&deviceId="+deviceId+"&mac="+mac+"&imei="+imei);
    }
    $(".bazicesuan_ad").click(function () {
        $(".clickContent").trigger("click");
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
    _hmt.push(['_trackEvent','jryc_share_click', 'click', 'jryc_share_click', 'jryc_share_click']);
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
