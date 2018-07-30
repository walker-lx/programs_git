$(function(){
    if (!is_iOS7()) {
        $(".top").css("top", "-20px");
        // $(".main").css("top", "45px");
    }
    var versioncode=localStorage["versioncode"];
    if(versioncode){
        $(".top").addClass("hidden");
        $(".main").css("top", "10px");
    }
    function is_iOS7() {
        var ua = navigator.userAgent.toLowerCase();
        var index1=ua.indexOf("cpu iphone os")+14;
        var osVersion=parseInt(ua.substr(index1,1));
        if (osVersion>=7) {
            return true;
        }
        else {
            return false;
        }
    }
    var orderUrl="/mingli/interface/showdetail";
    var orderResultUrl="/mingli/interface/getextraData";
    var orderId=getQueryString("id");
    var deviceId=getQueryString("deviceId");
    var goodsId=getQueryString("goodsId");
    var code=getQueryString("code");

    var price=0;
    var source="";
    $.getJSON(orderUrl,{orderid:orderId},function(result){
        var orderStatus=parseInt(result.msg.orderstatus,10);
        var statusString="";
        switch (orderStatus){
            case 0:
                statusString="【订单待付款】";
                $(".payShowBtn").removeClass("hidden");
                break;
            case 1:
                statusString="【已付款待确认】";
                break;
            case 3:
                statusString="【订单待解答】";
                $(".payedShowBtn").removeClass("hidden");
                break;
            case 4:
                statusString="【订单解答完成】";
                $(".finishShowBtn").removeClass("hidden");
                $.getJSON(orderResultUrl,{orderid:orderId,type:1},function(result){
                    if(result.status===0){
                        $(".replyContent").html(result.msg.replace(/\r\n/g,'<br/>').replace(/\n/g,'<br/>'));
                    }
                });
                $(".replyLine").removeClass("hidden");
                $(".replyContent").removeClass("hidden");
                break;
        }
        $(".orderState").html(statusString);
        $(".orderDetailNum").html("订单号: "+orderId);
        var content=JSON.parse(result.msg.content);
        $(".orderName").html(content.name);
        if (content.name.length===0){
            $(".orderName").parent(".orderDetailLine").addClass("hidden");
        }
//        var index1=content.bornDate.indexOf("-"),index2=content.bornDate.lastIndexOf("-");
//        var bornDate=content.bornDate.substring(0,index1)+"年"+content.bornDate.substring(index1+1,index2)+"月"+content.bornDate.substring(index2+1,content.bornDate.length)+"日";
//        $(".orderData").html(bornDate+" "+content.bornTime+":00生");
        var purposeId=content.purposeId;
        var cat1="",cat2="";
        switch (purposeId){
            case "A1": //乔迁择日
                cat1="择吉";
                cat2="乔迁择日";
                source="择吉日-乔迁";
                break;
            case "A2": //出行动身
                cat1="择吉";
                cat2="出行动身";
                source="择吉日-出行动身";
                break;
            case "A3": //公司开张
                cat1="择吉";
                cat2="公司开张";
                source="择吉日-公司开张";
                break;
            case "A4": //择日合婚
                cat1="择吉";
                cat2="择吉结婚";
                source="择吉日-择吉结婚";
                break;
            case "B1":
                cat1="紫微斗数";
                cat2="紫微问事";
                source="紫微问事";
                break;
            case "B11":
                cat1="紫微斗数";
                cat2="紫微问事-单项预测投资";
                source="投资测算-紫微问事";
                break;
            case "B12":
                cat1="紫微斗数";
                cat2="紫微问事-单项预测事业";
                source="事业测算-紫微问事";
                break;
            case "B13":
                cat1="紫微斗数";
                cat2="紫微问事-单项预测婚姻";
                source="婚姻测算-紫微问事";
                break;
            case "B14":
                cat1="紫微斗数";
                cat2="紫微问事-单项预测家庭";
                source="家庭测算-紫微问事";
                break;
            case "B16":
                cat1="紫微斗数";
                cat2="紫微问事-单项预测财运";
                source="财运测算-紫微问事";
                break;
            case "B17":
                cat1="紫微斗数";
                cat2="紫微问事-单项预测考学";
                source="学业测算-紫微问事";
                break;
            case "B18":
                cat1="紫微斗数";
                cat2="紫微问事-单项预测合作";
                source="合作测算-紫微问事";
                break;
            case "B19":
                cat1="紫微斗数";
                cat2="紫微问事-单项预测健康";
                source="健康测算-紫微问事";
                break;
            case "B110":
                cat1="紫微斗数";
                cat2="紫微问事-单项预测置业";
                source="置业测算-紫微问事";
                break;
            case "B111":
                cat1="紫微斗数";
                cat2="紫微问事-单项预测出行";
                source="出行测算-紫微问事";
                break;
            case "B15":
                cat1="紫微斗数";
                cat2="紫微问事-合婚";
                source="合婚测算-紫微问事";
                break;
            case "B2":
                cat1="紫微斗数";
                cat2="紫微全命";
                source="紫微全命";
                break;
            case "B3":
                cat1="紫微斗数";
                cat2="紫微精装";
                source="紫微精装";
                break;
            case "C1": //单项预测投资
                cat1="八字";
                cat2="单项预测投资";
                source="投资测算-八字预测";
                break;
            case "C2": //单项预测事业
                cat1="八字";
                cat2="单项预测事业";
                source="事业测算-八字预测";
                break;
            case "C3": //单项预测婚姻
                cat1="八字";
                cat2="单项预测婚姻";
                source="婚姻测算-八字预测";
                break;
            case "C4": //单项预测家庭
                cat1="八字";
                cat2="单项预测家庭";
                source="家庭测算-八字预测";
                break;
            case "C6": //单项预测财运
                cat1="八字";
                cat2="单项预测财运";
                source="财运测算-八字预测";
                break;
            case "C7": //单项预测考学
                cat1="八字";
                cat2="单项预测考学";
                source="学业测算-八字预测";
                break;
            case "C8": //单项预测合作
                cat1="八字";
                cat2="单项预测合作";
                source="合作测算-八字预测";
                break;
            case "C9": //单项预测健康
                cat1="八字";
                cat2="单项预测健康";
                source="健康测算-八字预测";
                break;
            case "C10":  //单项预测置业
                cat1="八字";
                cat2="单项预测置业";
                source="置业测算-八字预测";
                break;
            case "C11":  //单项预测出行
                cat1="八字";
                cat2="单项预测出行";
                source="出行测算-八字预测";
                break;
            case "C5": //合婚
                cat1="八字";
                cat2="八字合婚";
                source="合婚测算-八字预测";
                break;
        }
        $(".orderService").html(cat1);
        $(".orderCategory1").html(cat2);
        price=content.price;
        $(".orderDetailPrice").html("¥"+price);

        console.log(JSON.stringify({
            name: source,
            type:purposeId,
            price:price
        }))
    });
    $(".payShowBtn").click(function(){
        var versionIndex=getWNLVersion();
        // alert(versionIndex);
        if(versionIndex>=433 || browser.isWx()){
            //window.location.href="http://coco70.youloft.cn/forturnpay/payWeb_mingli/index.html?orderid="+orderId+"&returnUrl=http://coco70.youloft.cn/mingli/orders.html&money="+price+"&source="+source;
            window.location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=' + price + '&source=' + source + '&parterid=mingli&goodsid=' + goodsId + '&parteruserid=' + deviceId + '&data=' + orderId + '&returnUrl=' + encodeURIComponent('http://' + location.host + location.pathname + '?id=' + orderId + '&goodsId=' + goodsId +'&deviceId=' + deviceId +'&code=' + code);
        }
        else if(!browser.isWx() && !browser.isWnl()) {
            window.location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=' + price + '&source=' + source + '&parterid=mingli&goodsid=' + goodsId + '&parteruserid=' + deviceId + '&data=' + orderId + '&returnUrl=' + encodeURIComponent('http://' + location.host + location.pathname + '?id=' + orderId + '&goodsId=' + goodsId +'&deviceId=' + deviceId +'&code=' + code);
        }
        else{
            window.location.href="../tradepay.aspx?orderid="+orderId;
        }
    });

    var ua = window.navigator.userAgent;
    var browser = {
        isAndroid: function () {
            return ua.match(/Android/i) ? true : false;
        },
        isIOS: function () {
            return ua.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        isWx: function () {
            return ua.match(/micromessenger/i) ? true : false;
        },
        isWp: function () {
            return ua.toLowerCase().indexOf('windows phone') > -1;
        },
        isWnl: function () {
            return ua.toLowerCase().indexOf('wnl') > -1;
        }
    };


    function getWNLVersion(){
        var ua=navigator.userAgent.toLocaleLowerCase();
        var index1=ua.indexOf("wnl ");
        if(index1<0){
            return 0;
        }
        var versionCode=ua.substring(index1+4);
        var codeList=versionCode.split(".");
        return parseInt(codeList[0]*100)+parseInt(codeList[1]*10)+parseInt(codeList[2]);
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }


    //$("#cmsModal").modal();


    setTimeout(function () {
        location.href = "protocol://getuserinfo#userinfocallback";
    },0);
    $(".downloadBtn").click(function () {
        var clientObj={
            "cmsShow":{
                "isNone":1
            }
        };
        location.href="protocol://saveuserinfo#"+Base64.encode(JSON.stringify(clientObj));
        ylwindow.downloadApk(null,"猎豹安全大师","http://dl.cm.ksmobile.com/static/res/37/c3/cm_security_cn.apk_500084.apk");
        //setTimeout(function () {
        //    location.href="http://dl.cm.ksmobile.com/static/res/37/c3/cm_security_cn.apk_500084.apk";
        //},0);
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



var isNone=0,isShow= 0,isPayed=1;
function userinfocallback(result){
    var originalString=Base64.decode(result);
    var originalAllObj=JSON.parse(originalString);
    if(originalAllObj.cmsShow.isNone){
        isNone=1;
    }
}
//function ylappCallback_back(){
//    if(navigator.userAgent.toLowerCase().indexOf("android")<0){
//        return 0;
//    }
//    if(isNone||isShow){
//        if(ylwindow){
//            ylwindow.reportHasBack(false);
//        }
//        return 0;
//    }
//    if(isPayed){
//        $("#cmsModal").modal();
//        isShow=true;
//        ylwindow.reportHasBack(true);
//    }
//}