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
    var orderUrl="/mingli/interface/getlist?random="+Math.random();
    var deleteUrl="/mingli/interface/deleteorder";
    getOrderList();
    function getOrderList(){
        var wnlUserId=localStorage["wnlUserId"];
        var idfa=localStorage["idfa"];
        var gid=localStorage["gid"];
        $.getJSON(orderUrl,{userid:wnlUserId,idfa:idfa,gid:gid},function(result){
            if(result.status!==0&&result.status!==1){
                return false;
            }
            $(".orderList").empty();
            if(result.msg==="没有数据"){
                return false;
            }
            $.each(result.msg,function(){
                var tempOrderItem=$(".tempOrderItem").clone();
                var tempOrderid=this.orderid;
                tempOrderItem.find(".orderBum").html("订单号: "+tempOrderid);  
                var purposeId=this.ordertype;
                var cat1="",cat2="";
                var source="";
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
                        cat2="择日合婚";
                        source="择吉日-择吉结婚";
                        break;
                    case "B1":
                        cat1="紫微斗数";
                        cat2="紫微问事";
                        source="紫微问事";
                        break;
                    case "B11":
                        cat1="紫微斗数";
                        cat2="紫微问事/单项预测投资";
                        source="投资测算-紫微问事";
                        break;
                    case "B12":
                        cat1="紫微斗数";
                        cat2="紫微问事/单项预测事业";
                        source="事业测算-紫微问事";
                        break;
                    case "B13":
                        cat1="紫微斗数";
                        cat2="紫微问事/单项预测婚姻";
                        source="婚姻测算-紫微问事";
                        break;
                    case "B14":
                        cat1="紫微斗数";
                        cat2="紫微问事/单项预测家庭";
                        source="家庭测算-紫微问事";
                        break;
                    case "B16":
                        cat1="紫微斗数";
                        cat2="紫微问事/单项预测财运";
                        source="财运测算-紫微问事";
                        break;
                    case "B17":
                        cat1="紫微斗数";
                        cat2="紫微问事/单项预测考学";
                        source="学业测算-紫微问事";
                        break;
                    case "B18":
                        cat1="紫微斗数";
                        cat2="紫微问事/单项预测合作";
                        source="合作测算-紫微问事";
                        break;
                    case "B19":
                        cat1="紫微斗数";
                        cat2="紫微问事/单项预测健康";
                        source="健康测算-紫微问事";
                        break;
                    case "B110":
                        cat1="紫微斗数";
                        cat2="紫微问事/单项预测置业";
                        source="置业测算-紫微问事";
                        break;
                    case "B111":
                        cat1="紫微斗数";
                        cat2="紫微问事/单项预测出行";
                        source="出行测算-紫微问事";
                        break;
                    case "B15":
                        cat1="紫微斗数";
                        cat2="紫微问事/合婚";
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
                        cat2="合婚";
                        source="合婚测算-八字预测";
                        break;
                }
                tempOrderItem.find(".orderCategory").html(cat1+"/"+cat2);
                var createdate=this.createdate.substr(0,16);
                tempOrderItem.find(".orderDateTime").html(createdate);
                tempOrderItem.find(".orderPrice").html("¥"+this.orderprice);
                var orderStatus=this.orderstatus.toString();
                switch (orderStatus){
                    case "0":
                        tempOrderItem.find(".payBtn").removeClass("hidden");
                        tempOrderItem.attr("data-href","orderdetail.html?id="+tempOrderid);
                        break;
                    case "1":
                        tempOrderItem.find(".confirmedBtn").removeClass("hidden");
                        tempOrderItem.find(".deleteBtn").attr("disabled","disabled");
                        tempOrderItem.attr("data-href","orderConfirm.html?id="+tempOrderid);
                        break;
                    case "3":
                        tempOrderItem.find(".payedBtn").removeClass("hidden");
                        tempOrderItem.find(".deleteBtn").attr("disabled","disabled");
                        tempOrderItem.attr("data-href","orderdetail.html?id="+tempOrderid);
                        break;
                    case "4":
                        tempOrderItem.find(".finishedBtn").removeClass("hidden");
                        tempOrderItem.attr("data-href","orderdetail.html?id="+tempOrderid);
                        break;
                }
                tempOrderItem.attr("data-id",tempOrderid);
                tempOrderItem.attr("data-price",this.orderprice);
                tempOrderItem.attr("data-source",source);
                tempOrderItem.removeClass("hidden");
                tempOrderItem.removeClass("tempOrderItem");
                tempOrderItem.appendTo(".orderList");
            })
        });
    }
    $(document).delegate(".orderItem","click",function(){
        window.location.href=$(this).attr("data-href");
    });
    var selectOrderid="",price= 0,source="";
    $(document).delegate(".payBtn","click",function(){
        selectOrderid=$(this).parents(".orderItem").attr("data-id");
        price=$(this).parents(".orderItem").attr("data-price");
        source=$(this).parents(".orderItem").attr("data-source");
        payOrder(selectOrderid,price,source);
        //$("#payConfirmModal").modal();
        return false;
    });
    //确认支付弹出事件
    $("#payConfirmModal").on("shown",function(){
        timeOut=setTimeout(function(){
            payOrder(selectOrderid,price,source);
        },1500);
    });
    //确认支付消失事件
    $("#payConfirmModal").on("hidden",function(){
        clearTimeout(timeOut);
    });
    //确认支付
    $("#goPay").on("click",function(){
        payOrder(selectOrderid,price,source);
        return false;
    });
    //进入支付页面
    function payOrder(orderid,price,source){
        var versionIndex=getWNLVersion();
        if(versionIndex>=433){
            //confirm(orderid+"   "+price+"   "+source+"    "+versionIndex);
            window.location.href="http://coco70.youloft.cn/forturnpay/payWeb_mingli/index.html?orderid="+orderid+"&returnUrl=http://coco70.youloft.cn/mingli/orders.html&money="+price+"&source="+source;
        }
        else{
            window.location.href="../tradepay.aspx?orderid="+orderid;
        }
    }
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
    $(document).delegate(".deleteBtn","click",function(){
        if ($(this).attr('disabled') != undefined) {
            return false;
        }
        selectOrderid=$(this).parents(".orderItem").attr("data-id");
        $("#deleteConfirModal").modal();
        return false
    });
    $("#confirmDelete").click(function(){
        var wnlUserId=localStorage["wnlUserId"];
        var idfa=localStorage["idfa"];
        var gid=localStorage["gid"];
        $(".mask").removeClass("hidden");
        $.getJSON(deleteUrl,{userid:wnlUserId,idfa:idfa,gid:gid,orderid:selectOrderid},function(data){
            $(".mask").addClass("hidden");
            if(data.status=="0"){
                $("#myModal").modal({showString:"删除成功"});
                getOrderList();
            }
            else{
                $("#myModal").modal({showString:data.msg});
            }
        });
    })
});