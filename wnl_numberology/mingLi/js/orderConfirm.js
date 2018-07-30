$(function(){
    if (!is_iOS7()) {
        $(".top").css("top", "-20px");
        $(".main").css("top", "45px");
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
    var versioncode=localStorage["versioncode"];
    if(versioncode){
        $(".top").addClass("hidden");
        $(".main").css("top", "10px");
    }
    var orderUrl="/mingli/interface/showdetail";
    var orderResultUrl="/mingli/interface/getextraData";
    var uploadExtraDataUrl="/mingli/interface/uploadextradata";
    var orderId=getQueryString("id");

    $.getJSON(orderUrl,{orderid:orderId},function(result){
        var orderStatus=result.status;
        var statusString="";
        switch (orderStatus){
            case 0:
                statusString="【订单待付款】";
                break;
            case 1:
                statusString="【已付款待确认】";
                break;
            case 3:
                statusString="【订单待解答】";
                break;
            case 4:
                statusString="【订单解答完成】";
                break;
        }
        $(".orderState").html(statusString);
        $(".orderDetailNum").html("订单号: "+orderId);
        var content=JSON.parse(result.msg.content);
        $(".orderName").html(content.name);
//        var index1=content.bornDate.indexOf("-"),index2=content.bornDate.lastIndexOf("-");
//        var bornDate=content.bornDate.substring(0,index1)+"年"+content.bornDate.substring(index1+1,index2)+"月"+content.bornDate.substring(index2+1,content.bornDate.length)+"日";
//        $(".orderData").html(bornDate+" "+content.bornTime+":00生");
        var purposeId=content.purposeId;
        var cat1="",cat2="";
        switch (purposeId){
            case "A1": //乔迁择日
                cat1="择吉";
                cat2="乔迁择日";
                break;
            case "A2": //出行动身
                cat1="择吉";
                cat2="出行动身";
                break;
            case "A3": //公司开张
                cat1="择吉";
                cat2="公司开张";
                break;
            case "A4": //择日合婚
                cat1="择吉";
                cat2="择吉结婚";
                break;
            case "B1":
                cat1="紫薇斗数";
                cat2="紫薇问事";
                break;
            case "B11":
                cat1="紫薇斗数";
                cat2="紫薇问事-单项预测投资";
                break;
            case "B12":
                cat1="紫薇斗数";
                cat2="紫薇问事-单项预测事业";
                break;
            case "B13":
                cat1="紫薇斗数";
                cat2="紫薇问事-单项预测婚姻";
                break;
            case "B14":
                cat1="紫薇斗数";
                cat2="紫薇问事-单项预测家庭";
                break;
            case "B16":
                cat1="紫薇斗数";
                cat2="紫薇问事-单项预测财运";
                break;
            case "B17":
                cat1="紫薇斗数";
                cat2="紫薇问事-单项预测考学";
                break;
            case "B18":
                cat1="紫薇斗数";
                cat2="紫薇问事-单项预测合作";
                break;
            case "B19":
                cat1="紫薇斗数";
                cat2="紫薇问事-单项预测健康";
                break;
            case "B110":
                cat1="紫薇斗数";
                cat2="紫薇问事-单项预测置业";
                break;
            case "B111":
                cat1="紫薇斗数";
                cat2="紫薇问事-单项预测出行";
                break;
            case "B15":
                cat1="紫薇斗数";
                cat2="紫薇问事-合婚";
                break;
            case "B2":
                cat1="紫薇斗数";
                cat2="紫薇全命";
                break;
            case "B3":
                cat1="紫薇斗数";
                cat2="紫薇精装";
                break;
            case "C1": //单项预测投资
                cat1="八字";
                cat2="单项预测投资";
                break;
            case "C2": //单项预测事业
                cat1="八字";
                cat2="单项预测事业";
                break;
            case "C3": //单项预测婚姻
                cat1="八字";
                cat2="单项预测婚姻";
                break;
            case "C4": //单项预测家庭
                cat1="八字";
                cat2="单项预测家庭";
                break;
            case "C6": //单项预测财运
                cat1="八字";
                cat2="单项预测财运";
                break;
            case "C7": //单项预测考学
                cat1="八字";
                cat2="单项预测考学";
                break;
            case "C8": //单项预测合作
                cat1="八字";
                cat2="单项预测合作";
                break;
            case "C9": //单项预测健康
                cat1="八字";
                cat2="单项预测健康";
                break;
            case "C10":  //单项预测置业
                cat1="八字";
                cat2="单项预测置业";
                break;
            case "C11":  //单项预测出行
                cat1="八字";
                cat2="单项预测出行";
                break;
            case "C5": //合婚
                cat1="八字";
                cat2="八字合婚";
                break;
        }
        $(".orderService").html(cat1);
        $(".orderCategory1").html(cat2);
        $(".orderDetailPrice").html("¥"+content.price);
    });
    $.getJSON(orderResultUrl,{orderid:orderId,type:0},function(result){
        if(result.status===0){
            $(".replyContent").html(result.msg.replace(/\r\n/g,'<br/>').replace(/\n/g,'<br/>'));
        }
    });
    $(".replyBtn").click(function(){
        var content=$(".extraTxa").val().trim();
        if(content.length===0){
            $("#myModal").modal({showString:"请填写大师解答需要提供的信息"});
            return false;
        }
        $.getJSON(uploadExtraDataUrl,{orderid:orderId,content:content},function(result){
            console.log(result);
            if(result.status===0){
                $("#myModal").modal({showString:"提交成功"});
                location.href="orders.html";
            }
            else{
                $("#myModal").modal({showString:result.msg});
            }
        });
    });
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }
});