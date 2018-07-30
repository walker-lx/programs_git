$(function () {
    if (document.addEventListener) {
        document.addEventListener("touchstart", function () {
        }, false);
    }
    if (FastClick != undefined) {
        FastClick.attach(document.body);
    }
    location.href="protocol://getlocalsdksupport#localsdksupportcallback";
    setTimeout(function () {
        location.href = "protocol://getuserinfo#userinfocallback";
    },0);

    $(".zhifuCount").html(money+"元");

    $(".introTitle").html("项目：【"+source+"】");

    $(".jifenCount").click(function () {
        if(native_score.score===0){
            return false;
        }
        if($(this).find(".selectIcon").hasClass("active")){
            $(".zhifuCount").removeClass("jifen");
            $(".payedCount").addClass("hidden");
            $(".zhifuCount").html(money+"元");
            //$(".zhifuSongTipTxt").addClass("hidden");
            isUseScore=false;
        }
        else{
            $(".zhifuCount").addClass("jifen");
            $(".payedCount").removeClass("hidden");
            var score=native_score.score;
            var maxScore=money/2*100;
            if(score>=maxScore){
                $(".payedCount").html(toFixed(money / 2,2)+"元");
                $(".maxScore").removeClass("hidden");
                $(".redJinfenNum").html(maxScore);
            }
            else{
                $(".payedCount").html(toFixed(money - score / 100,2)+"元");
                $(".maxScore").addClass("hidden");
                $(".redJinfenNum").html(score);
            }
            $(".songNum").html(money*10);
            //$(".zhifuSongTipTxt").removeClass("hidden");
            isUseScore=true;
        }
        $(this).find(".selectIcon").toggleClass("active");
    });
    function toFixed(num, s) {
		var times = Math.pow(10, s)
		var des = num * times + 0.5
		des = parseInt(des, 10) / times
		return des + ''
	}
    var ua=navigator.userAgent.toLocaleLowerCase();
    var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
    var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
    var isAndroid=ua.indexOf("android")>-1;
    var sourceType="wnl";
    if(isIOS){
        sourceType="wnl_ios";
		var boundid=localStorage.getItem("boundid");
		if(boundid){
			var boundstring="";
			switch(boundid){
				case "com.ireadercity.yhgrlc":
					boundstring="_5";
					break;
				case "com.51wnl.wnl-shadow2":
					boundstring="_2";
					break;
				case "com.51wnl.wnl-shadow1":
					boundstring="_1";
					break;
				case "com.ireadercity.zhwll":
					boundstring="";
					break;
			}
			sourceType+=(boundstring);
		}
    }
    else if(isAndroid){
        sourceType="wnl_android";
    }
    else{
        sourceType="other"
    }
    $(".wxConfirmBtn").click(function () {
        $(".mask").removeClass("hidden");
        $.ajax({
            url:"../../NRLorder/PayOrderWithScore",
            type:"get",
            data:{
                orderId:orderId,
                returnUrl:returnUrl,
                channel:sourceType,
                isUseScore:isUseScore,
                userId:native_score.userId?native_score.userId:"",
                PayType:1
            },
            success: function (result) {
                $(".mask").addClass("hidden");
                result=JSON.parse(result);
                if(result.status===0){
                    location.href="protocol://paywechat#"+encodeURI(decodeURI(result.data+"<p>"+orderId));
                }
            }
        })
    });
    $(".zfbConfirmBtn").click(function () {
        $(".mask").removeClass("hidden");
        var payType=0;
        if($(this).data("sdk")){
            payType=2;
        }
        else{
            //var ua=navigator.userAgent.toLocaleLowerCase();
            //var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
            //var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
            //var isAndroid=ua.indexOf("android")>-1;
            //var sourceType=-1;
            //if(isIOS){
            //    sourceType=0;
            //}
            //else if(isAndroid){
            //    sourceType=1;
            //}
            //else{
            //    sourceType=2
            //}
            //if(source==="八字测算"){
            //    window.location.href="../../NRLorder/PayedOrder?orderid="+orderId+"&returnUrl=/numberology/tools/bzcs_result.html&sourceType="+sourceType;
            //}
            //else{
            //    window.location.href="../../NRLorder/PayedOrder?orderid="+orderId+"&returnUrl=/numberology/tools/bzhhpayed.html&sourceType="+sourceType;
            //}
        }
        $.ajax({
            url:"../../NRLorder/PayOrderWithScore",
            type:"get",
            data:{
                orderId:orderId,
                returnUrl:returnUrl,
                channel:sourceType,
                isUseScore:isUseScore,
                userId:native_score&&native_score.userId?native_score.userId:"",
                PayType:payType
            },
            success: function (result) {
                $(".mask").addClass("hidden");
                result=JSON.parse(result);
                if(payType===0){
                    location.href=result.data;
                }
                else{
                    if(result.status===0){
                        location.href="protocol://payali#"+encodeURI(decodeURI(result.data+"<p>"+orderId));
                    }
                }
            }
        })
    });
    if(window.ylwindow){
        ylwindow.enableShare(false);
    }
    //userinfocallback();
});
var native_score;
var isUseScore=false;
var isIpad=navigator.userAgent.toLowerCase().indexOf("ipad")>-1;
function userinfocallback(result) {
    var originalString = Base64.decode(result);
    var originalAllObj = JSON.parse(originalString);
    if (!originalAllObj.native_score) {
        return false;
    }
    native_score = originalAllObj.native_score;
    if (!native_score.score&&native_score.score!==0){
        return false;
    }
    //native_score={
    //    "score": 2000000,//积分
    //    "shareWechatTimeLine": 1,//分享到朋友圈
    //    "scrollToHomeBottom": 1,//主页滑倒底部
    //    "openTool": 1,//打开一个小工具
    //    "firstLogin": 1,//首次登录
    //    "perfectUserInfo": 1,//完善个人信息
    //    "createReminder": 1,//创建一条提醒
    //    "showContellation": 1,//查看星座详情
    //    "updateTime": 23112342134,//更新时间
    //    "userId":"wnl_test",
    //    "deviceId":"abc"
    //};
    if(native_score.userId&&native_score.userId.length!==0){
        if(native_score.score!==0){
            $(".zhifuCount").addClass("jifen");
            $(".payedCount").removeClass("hidden");
        }
        else{
            $(".payedCount").addClass("hidden");
            $(".jifenCount").find(".selectIcon").removeClass("active");
            $(".jifenTxt").css("color","#999999");
        }
        $(".jifenCount").removeClass("hidden");
        $(".loginLink").addClass("hidden");
        $(".zhifuSongTipTxt").removeClass("hidden");
        var score=native_score.score;
        var maxScore=money/2*100;
        if(score>=maxScore){
            $(".payedCount").html(money/2+"元");
            $(".maxScore").removeClass("hidden");
            $(".redJinfenNum").html(maxScore);
            if($(window).width()<360){
                $(".jifenCount").css("padding","20px 10px 18px")
            }
        }
        else{
            $(".payedCount").html((money-score/100)+"元");
            $(".maxScore").addClass("hidden");
            $(".redJinfenNum").html(score);
        }
        $(".songNum").html(money*10);
        isUseScore=true;
    }
    else{
        $(".zhifuCount").removeClass("jifen");
        $(".payedCount").addClass("hidden");
        $(".jifenCount").addClass("hidden");
        $(".loginLink").removeClass("hidden");
        $(".zhifuSongTipTxt").addClass("hidden");
        isUseScore=false;
    }
    if(isIpad){
        $(".zhifuCount").removeClass("jifen");
        $(".payedCount").addClass("hidden");
        $(".jifenCount").addClass("hidden");
        $(".loginLink").addClass("hidden");
        $(".zhifuSongTipTxt").addClass("hidden");
        isUseScore=false;
    }
}
function localsdksupportcallback(result){
    var localsdksupport=JSON.parse(result);
    if(localsdksupport.wechatpay===1){
        $(".wxConfirmBtn").removeClass("hidden");
    }
    if(localsdksupport.alipay===1){
        $(".zfbConfirmBtn").data("sdk","1");
    }
}
var money=parseInt(getQueryString("money"));
var source=getQueryString("source");
var orderId=getQueryString("orderid");
var returnUrl=getQueryString("returnUrl");
function payResult(result){
    $(".mask").addClass("hidden");
    if(parseInt(result)===1){
        if(source==="八字测算"){
            window.location.href="../../tools/bzcs_result.html?orderid="+orderId;
        }
        else{
            window.location.href="../../tools/bzhhpayed.html?orderid="+orderId;
        }
    }
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
function appCallback_showShare(){
    return 0;
}
