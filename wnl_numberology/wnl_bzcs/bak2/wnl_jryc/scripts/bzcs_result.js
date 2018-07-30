$(function () {
    FastClick.attach(document.body);
    var localData = JSON.parse(localStorage.getItem('wnl_lyys_local_data'));
    var posId = localData && localData.posId ? localData.posId : '';
    var apiLoadResult = "../NRLorder/GetOrderAnswer?orderid=";
    var orderId = getQueryString("orderid");
    var share=getQueryString("share");
    if(share){
        $(".viewDetail").css("margin-bottom","25px");
    }
    setTimeout(function () {
        location.href = "protocol://getuserinfo#userinfocallback";
    },0);
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
    $("#btnViewDetail").click(function () {
        if(share){
            $("#tipModal").modal();
            $(".downloadBtn").click(function () {
                //下载链接
                var ua=navigator.userAgent.toLocaleLowerCase();
                var wx=ua.indexOf("micromessenger")>-1;
                var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
                var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
                var isAndroid=ua.indexOf("android")>-1;
                if(wx){
                    _hmt.push(['_trackEvent','bzcs_download_wx_click', 'click', 'bzcs_download_wx_click', 'bzcs_download_wx_click']);
                    location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
                }
                else{
                    if(isIOS){
                        _hmt.push(['_trackEvent','bzcs_download_ios_click', 'click', 'bzcs_download_ios_click', 'bzcs_download_ios_click']);
                        location.href="http://um0.cn/89wDL";
                    }
                    else if(isAndroid){
                        _hmt.push(['_trackEvent','bzcs_download_android_click', 'click', 'bzcs_download_android_click', 'bzcs_download_android_click']);
                        location.href="http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]";
                    }
                    else{
                        location.href="http://www.51wnl.com";
                    }
                }
            });
        }
        else{
            // location.href="payWeb/index.html?orderid="+orderId+"&returnUrl="+("http://"+location.host+location.pathname)+"&money=98&source=八字测算";
            location.href='http://order.51wnl.com/pay_web/index_t.html?money=98&source=八字测算&parterid=NRLorder&goodsid=41DBA1789A644753A408CD78DAF79B00&parteruserid='+uniqueId+
            '&data='+orderId+'&posId='+posId+'&returnUrl=' + encodeURIComponent('http://' + location.host + location.pathname+'?orderid=' +orderId);


            //var versionIndex=getWNLVersion();
            //if(versionIndex>=433){
            //    location.href="payWeb/index.html?orderid="+orderId+"&returnUrl=../tools/bzcs_result.html&money=98&source=八字测算";
            //}
            //else{
            //    $("#dvPay").modal();
            //}
        }
    });
    $("#btnPay").click(function () {
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
        window.location.href="/numberology/NRLorder/PayedOrder?orderid="+orderId+"&returnUrl=/numberology/tools/bzcs_result.html&sourceType="+sourceType;
    });
    function getWNLVersion(){
        var ua=navigator.userAgent.toLowerCase();
        //var ua="Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H141 wnl 4.3.3".toLowerCase();
        var index1=ua.indexOf("wnl");
        var versionCode=ua.substring(index1+4);
        var codeList=versionCode.split(".");
        return parseInt(codeList[0]*100)+parseInt(codeList[1]*10)+parseInt(codeList[2]);
    }
    $(".hhInfoTitle").click(function () {
        $(".viewDetail").trigger("click");
    });
    loadInfo();
    function loadInfo(){
        if (!orderId) {
            alert("请传入orderid");
            return false;
        }
        else {
            if (orderId.length < 30||orderId.length>40) {
                alert("请传入正确的orderid");
                return false;
            }
            else {
                $.ajax({
                    cache: false,
                    type: "GET",
                    dataType: "json",
                    url: apiLoadResult + orderId,
                    success: function (result) {
                        if (result.status == 0) {
                            if(share){
                                $(".wnlBannerLink").removeClass("hidden");
                            }
                            else{
                                $(".yiqiDesc1").removeClass("hidden");
                            }
                            var baziResult = result.data;
                            if (baziResult.isPayed) {
                                isPayed=1;
                                $("#dvFreeResult").hide();
                                $("#dvPaidResult").show();
                                $(".xingqingContent").text(baziResult.xingQing);
                                $(".bazi").text(baziResult.baZi);
                                var year=baziResult.birth.substring(0,4),month=baziResult.birth.substring(5,7),day=baziResult.birth.substring(8,10),hour=baziResult.birth.substring(11,13);
                                if(baziResult.birth.substring(14)==="59:59"){
                                    $(".gongli").text(year+"年"+month+"月"+day+"日");
                                }
                                else{
                                    $(".gongli").text(year+"年"+month+"月"+day+"日"+hour+"时");
                                }
                                $(".name").text(baziResult.name);
                                $(".sex").text(baziResult.sex);
                                var mkpTd = '<td class="jiShiItem"><span class="timeIndex"><%- time %></span><span class="timeDesc"><%- timeDesc %></span></td>';
                                $.each(baziResult.daYunYear, function (index, item) {
                                    if (index % 2 == 0) {
                                        $("#tbdJiShi1").append('<tr class="timeLine"></tr>');
                                    }
                                    var index1=item.indexOf("("),index2=item.indexOf(")");
                                    var time=item.substr(0,index1),timeDesc=item.substring(index1+1,index2);
                                    $("#tbdJiShi1").children().last().append(_.template(mkpTd)({
                                        time: time,
                                        timeDesc: timeDesc
                                    }));
                                });
                                var wuxingReg=/\d+%/g;
                                var wuxingList=baziResult.wuXingLiLiang.match(wuxingReg);
                                console.log(wuxingList);
                                $(".jinPercent").html(wuxingList[0]);
                                $(".muPercent").html(wuxingList[1]);
                                $(".shuiPercent").html(wuxingList[2]);
                                $(".huoPercent").html(wuxingList[3]);
                                $(".tuPercent").html(wuxingList[4]);
                                $(".zuixi").html(baziResult.zuiXi.replace(/\s/g,"；").replace("数字:；","数字:"));
                                $(".cixi").html(baziResult.ciXi.replace(/\s/g,"；").replace("数字:；","数字:"));
                                $(".zuiji").html(baziResult.zuiJi.replace(/\s/g,"；").replace("数字:；","数字:"));
                                $(".ciji").html(baziResult.ciJi.replace(/\s/g,"；").replace("数字:；","数字:"));
                                $(".pingchang").html(baziResult.pingChang.replace(/\s/g,"；").replace("数字:；","数字:"));
                                var liuNianTemplate = '<div class="dayunTitle1 liunianTitle" data-year="<%- justYear %>"><div class="titleIcon"></div><div class="titleTxt"><%- year %>运势得分：<span class="yunshiScore"><%- score %></span></div><div class="leftRadius"></div><div class="rightRadius"></div></div>\
											<div class="liunianTxt">\
												<div>【简评】</div>\
												<div><%- text %></div>\
												<div class="mt15">【吉神】</div>\
												<div><%- jiShen %></div>\
												<div class="mt15">【凶神】</div>\
												<div><%- xiongShen %></div>\
												<div class="mt15">【流年十神】：<span><%- shiShenName %></span></div>\
												<div><%- shiShenText %></div>\
											</div>';

                                $.each(baziResult.liuNian, function () {
                                    var mkpItem = _.template(liuNianTemplate)({
                                        justYear: this.year.substring(0, 4),
                                        year: this.year,
                                        score: this.score,
                                        text: this.text.replace(/\/n/g,""),
                                        jiShen: this.jiShen.replace(/\/n/g,""),
                                        xiongShen: this.xiongShen.replace(/\/n/g,""),
                                        shiShenName: this.shiShenName.replace(/\/n/g,""),
                                        shiShenText: this.shiShenText.replace(/\/n/g,"")
                                    });

                                    $("#dvLiuNian").append(mkpItem);
                                });
                                var daYunTemplate = '<div class="dayunTitle1 liunianTitle"><div class="titleIcon"></div><div class="titleTxt"><%- year %><div class="leftRadius"></div><div class="rightRadius"></div></div></div>\
											<div class="dayunTxt">\
												<div>【大运得分】 <%- score %></div>\
												<div><%- text %></div>\
												<div class="mt15">【大运起落】</div>\
												<div><%- qiLuo %></div>\
												<div class="mt15">【大运十神】</div>\
												<div><%- shiShen %></div>\
												<div class="mt15">【大运冲合】</div>\
												<div><%- chongHe %></div>\
											</div>';

                                $.each(baziResult.daYun, function(){
                                    var mkpItem = _.template(daYunTemplate)({
                                        year: this.year,
                                        score: this.score,
                                        text: this.text.replace(/\/n/g,""),
                                        qiLuo: this.qiLuo.replace(/\/n/g,""),
                                        shiShen: this.shiShen.replace(/\/n/g,""),
                                        chongHe: this.chongHe.replace(/\/n/g,"")
                                    });

                                    $(_.template("[data-year=<%- startYear %>]")({
                                        startYear: this.year.substring(0, 4)
                                    })).before(mkpItem);
                                });
                                if (result.data.xiYong){
                                    var xiyong_list=result.data.xiYong.split(" ");
                                    $($(".title1")[0]).html("最喜五行"+xiyong_list[0]+"：");
                                    $($(".title1")[1]).html("次喜五行"+xiyong_list[1]+"：");
                                    $($(".title1")[2]).html("最忌五行"+xiyong_list[2]+"：");
                                    $($(".title1")[3]).html("次忌五行"+xiyong_list[3]+"：");
                                    $($(".title1")[4]).html("平常五行"+xiyong_list[4]+"：");
                                }
                            }
                            else {
                                $("#dvFreeResult").show();
                                $("#dvPaidResult").hide();
                                var length=Math.floor($(".xingqingContent").width()/15);
                                $(".xingqingContent").text(baziResult.xingQing.substr(0,length*5-2)+"...");
                                $(".bazi").text(baziResult.baZi);
                                var year=parseInt(baziResult.birth.substring(0,4)),month=baziResult.birth.substring(5,7),day=baziResult.birth.substring(8,10),hour=baziResult.birth.substring(11,13);
                                var yearNow=(new Date()).getFullYear();
                                if(yearNow-year<10||yearNow-year>80){
                                    $(".btnContent").addClass("hidden");
                                    $(".tipLine").addClass("hidden");
                                    $(".moreLinkContent").addClass("hidden");
                                }
                                if(baziResult.birth.substring(14)==="59:59"){
                                    $(".gongli").text(year+"年"+month+"月"+day+"日");
                                }
                                else{
                                    $(".gongli").text(year+"年"+month+"月"+day+"日"+hour+"时");
                                }
                                $(".name").text(baziResult.name);
                                $(".sex").text(baziResult.sex);
                                //大运格式不对
                                var dayunList=baziResult.daYun.split(";");
                                console.log(dayunList);
                                var mkpTd = '<td class="jiShiItem"><span class="timeIndex"><%- time %></span><span class="timeDesc"><%- timeDesc %></span></td>';
                                dayunList.length=dayunList.length-1;
                                $.each(dayunList, function (index, item) {
                                    if(item.length>=0){
                                        if (index % 2 == 0) {
                                            $("#tbdJiShi").append('<tr class="timeLine"></tr>');
                                        }
                                        var index1=item.indexOf("("),index2=item.indexOf(")");
                                        var time=item.substr(0,index1),timeDesc=item.substring(index1+1,index2);
                                        $("#tbdJiShi").children().last().append(_.template(mkpTd)({
                                            time: time,
                                            timeDesc: "("+timeDesc+")"
                                        }));
                                    }
                                });
                                $(".dayunContent").removeClass("hidden");
                            }
                        }
                        else {
                            alert("获取测算数据错误,错误信息为" + result.msg);
                        }
                    },
                    error: function (xhr, ajaxOperation, throwErr) {
                        return;
                    }
                });
            }
        }
    }



    //$("#cmsModal").modal();



    $(".downloadBtn").click(function () {
        var clientObj={
            "cmsShow":{
                "isNone":1
            }
        };
        location.href="protocol://saveuserinfo#"+Base64.encode(JSON.stringify(clientObj));
        //setTimeout(function () {
        //    location.href="http://dl.cm.ksmobile.com/static/res/37/c3/cm_security_cn.apk_500084.apk";
        //},0);
        ylwindow.downloadApk(null,"猎豹安全大师","http://dl.cm.ksmobile.com/static/res/37/c3/cm_security_cn.apk_500084.apk");
    });
    $(".noneBtn").click(function () {
        var clientObj={
            "cmsShow":{
                "isNone":1
            }
        };
        location.href="protocol://saveuserinfo#"+Base64.encode(JSON.stringify(clientObj));
    });
});



var isNone=0,isShow= 0,isPayed=0,uniqueId='';//用户设备当前标识 
function userinfocallback(result){
    var originalString=Base64.decode(result);
    var originalAllObj=JSON.parse(originalString);
    if(originalAllObj.cmsShow.isNone){
        isNone=1;
    }
	if (!originalAllObj.native_score) {
		return false;
	}
	var native_score = originalAllObj.native_score;
	if((!native_score.userId||native_score.userId.length===0)){
		//未登录
		uniqueId=native_score.deviceId;//设备标识，重装会变
	}
	else{
		//已登录
		uniqueId=native_score.userId;
	}
}
function ylappCallback_back(){
    if(navigator.userAgent.toLowerCase().indexOf("android")<0){
        return 0;
    }
    if(isNone||isShow){
        if(ylwindow){
            ylwindow.reportHasBack(false);
        }
        return 0;
    }
    if(isPayed){
        $("#cmsModal").modal();
        isShow=true;
        ylwindow.reportHasBack(true);
    }
}



var textObj1,textObj;
function appCallback_share(){
    _hmt.push(['_trackEvent','bzcs_share_click', 'click', 'bzcs_share_click', 'bzcs_share_click']);
    var title="我在万年历做的八字测算，好准！你也来看看？";
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
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}