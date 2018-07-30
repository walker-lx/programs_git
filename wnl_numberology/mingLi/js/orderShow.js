$(function () {
    var orderUrl = "/mingli/interface/showdetail";
    var orderResultUrl = "/mingli/interface/getextraData";
    var orderid = getQueryString("orderid");


    $.getJSON(orderResultUrl, { orderid: orderid, type: 0 }, function (result) {
        if (result.status === 0) {
            $(".replyContent").html(result.msg.replace(/\r\n/g,'<br/>').replace(/\n/g,'<br/>'));
        }
    });


    $.getJSON(orderResultUrl, { orderid: orderid, type: 1 }, function (result) {
        if (result.status === 0) {
            $(".endContent").html(result.msg.replace(/\r\n/g,'<br/>').replace(/\n/g,'<br/>'));
        }
    });

    $.getJSON(orderUrl, { orderid: orderid }, function (result) {
        var content = JSON.parse(result.msg.content);
        var purposeId = content.purposeId;
        var cat1 = "", cat2 = "";
        switch (purposeId) {
            case "A1": //乔迁择日
                cat1 = "择吉";
                cat2 = "乔迁择日";
                break;
            case "A2": //出行动身
                cat1 = "择吉";
                cat2 = "出行动身";
                break;
            case "A3": //公司开张
                cat1 = "择吉";
                cat2 = "公司开张";
                break;
            case "A4": //择日合婚
                cat1 = "择吉";
                cat2 = "择吉结婚";
                break;
            case "B1":
                cat1 = "紫薇斗数";
                cat2 = "紫薇问事";
                break;
            case "B11":
                cat1 = "紫薇斗数";
                cat2 = "紫薇问事-单项预测投资";
                break;
            case "B12":
                cat1 = "紫薇斗数";
                cat2 = "紫薇问事-单项预测事业";
                break;
            case "B13":
                cat1 = "紫薇斗数";
                cat2 = "紫薇问事-单项预测婚姻";
                break;
            case "B14":
                cat1 = "紫薇斗数";
                cat2 = "紫薇问事-单项预测家庭";
                break;
            case "B16":
                cat1 = "紫薇斗数";
                cat2 = "紫薇问事-单项预测财运";
                break;
            case "B17":
                cat1 = "紫薇斗数";
                cat2 = "紫薇问事-单项预测考学";
                break;
            case "B18":
                cat1 = "紫薇斗数";
                cat2 = "紫薇问事-单项预测合作";
                break;
            case "B19":
                cat1 = "紫薇斗数";
                cat2 = "紫薇问事-单项预测健康";
                break;
            case "B110":
                cat1 = "紫薇斗数";
                cat2 = "紫薇问事-单项预测置业";
                break;
            case "B111":
                cat1 = "紫薇斗数";
                cat2 = "紫薇问事-单项预测出行";
                break;
            case "B15":
                cat1 = "紫薇斗数";
                cat2 = "紫薇问事-合婚";
                break;
            case "B2":
                cat1 = "紫薇斗数";
                cat2 = "紫薇全命";
                break;
            case "B3":
                cat1 = "紫薇斗数";
                cat2 = "紫薇精装";
                break;
            case "C1": //单项预测投资
                cat1 = "八字";
                cat2 = "单项预测投资";
                break;
            case "C2": //单项预测事业
                cat1 = "八字";
                cat2 = "单项预测事业";
                break;
            case "C3": //单项预测婚姻
                cat1 = "八字";
                cat2 = "单项预测婚姻";
                break;
            case "C4": //单项预测家庭
                cat1 = "八字";
                cat2 = "单项预测家庭";
                break;
            case "C6": //单项预测财运
                cat1 = "八字";
                cat2 = "单项预测财运";
                break;
            case "C7": //单项预测考学
                cat1 = "八字";
                cat2 = "单项预测考学";
                break;
            case "C8": //单项预测合作
                cat1 = "八字";
                cat2 = "单项预测合作";
                break;
            case "C9": //单项预测健康
                cat1 = "八字";
                cat2 = "单项预测健康";
                break;
            case "C10":  //单项预测置业
                cat1 = "八字";
                cat2 = "单项预测置业";
                break;
            case "C11":  //单项预测出行
                cat1 = "八字";
                cat2 = "单项预测出行";
                break;
            case "C5": //合婚
                cat1 = "八字";
                cat2 = "八字合婚";
                break;
        }
        $(".orderCategory1").html(cat1 + "-" + cat2);
        $(".clientReplyContent").html(result.msg.orderextra);
        if (content.name.length === 0) {
            $(".orderName").parent(".orderDetailLine").addClass("hidden");
        }
        if (purposeId.substr(0, 1) === "B" || purposeId.substr(0, 1) === "C") {
            $(".orderContent").addClass('hidden');
            $(".ziweibazi").removeClass('hidden');
            $(".orderName").html(content.name);
            if (content.bornDate.indexOf("-") > -1) {
                $(".sex").html(parseInt(content.sex) === 1 ? "男" : "女");
                $(".bornDate").html(content.bornDate+'（公历）');
            }
            else {
                $(".sex").html(parseInt(content.sex) === 0 ? "男" : "女");
                $(".bornDate").html(content.bornDate.substring(0, 4) + "-" + content.bornDate.substring(4, 6) + "-" + content.bornDate.substring(6, 8)+'（公历）');
            }
            $(".bornTime").html(content.bornTime === "24" ? "不详" : (content.bornTime + "点"));
            if (purposeId === "C5") {
                $(".hehunContent").removeClass("hidden");
                $(".hehunOrderName").html(content.hehunName);
                if (content.hehunBornDate.indexOf("-") > -1) {
                    $(".hehunSex").html(parseInt(content.hehunSex) === 1 ? "男" : "女");
                    $(".hehunBornDate").html(content.hehunBornDate+'（公历）');
                }
                else {
                    $(".hehunSex").html(parseInt(content.hehunSex) === 0 ? "男" : "女");
                    $(".hehunBornDate").html(content.hehunBornDate.substring(0, 4) + "-" + content.hehunBornDate.substring(4, 6) + "-" + content.hehunBornDate.substring(6, 8)+'（公历）');
                }
                $(".hehunBornTime").html(content.hehunBornTime === "24" ? "不详" : (content.hehunBornTime + "点"));
            }
            $(".ethnic").html(content.ethnic);
            $(".marriage").html(parseInt(content.marriage) === 0 ? "已婚" : "未婚");
            $(".familyDesc").html(content.familyDesc.indexOf("父亲，王五，男，公历1960年1月1日21时出生") > -1 ? "无" : content.familyDesc);
            if (content.beginDate.indexOf("-") > -1) {
                $(".ziweibazi .beginDate").html(content.beginDate+'（公历）');
                $(".ziweibazi .endDate").html(content.endDate+'（公历）');
            }
            else {
                $(".ziweibazi .beginDate").html(content.beginDate.substring(0, 4) + "-" + content.beginDate.substring(4, 6) + "-" + content.beginDate.substring(6, 8)+'（公历）');
                $(".ziweibazi .endDate").html(content.endDate.substring(0, 4) + "-" + content.endDate.substring(4, 6) + "-" + content.endDate.substring(6, 8)+'（公历）');
            }
            $(".otherRequest").html(content.otherRequest);
        }
        else if (purposeId === "A1") {
            $(".orderContent").addClass('hidden');
            $(".qiaoqian").removeClass('hidden');
            $(".orderName").html(content.name);
            $(".qiaoqianMaleName").html(content.qiaoqianMaleName);
            if (content.qiaoqianMaleBornDate.indexOf("-") > -1) {
                $(".qiaoqianMaleBornDate").html(content.qiaoqianMaleBornDate+'（公历）');
            }
            else {
                $(".qiaoqianMaleBornDate").html(content.qiaoqianMaleBornDate.substring(0, 4) + "-" + content.qiaoqianMaleBornDate.substring(4, 6) + "-" + content.qiaoqianMaleBornDate.substring(6, 8) +'（公历）');
            }
            if (content.qiaoqianFemaleBornDate.indexOf("-") > -1) {
                $(".qiaoqianFemaleBornDate").html(content.qiaoqianFemaleBornDate +'（公历）');
            }
            else {
                $(".qiaoqianFemaleBornDate").html(content.qiaoqianFemaleBornDate.substring(0, 4) + "-" + content.qiaoqianFemaleBornDate.substring(4, 6) + "-" + content.qiaoqianFemaleBornDate.substring(6, 8) +'（公历）') ;
            }
            if (content.beginDate.indexOf("-") > -1) {
                $(".qiaoqian .beginDate").html(content.beginDate +'（公历）');
            }
            else {
                $(".qiaoqian .beginDate").html(content.beginDate.substring(0, 4) + "-" + content.beginDate.substring(4, 6) + "-" + content.beginDate.substring(6, 8)+'（公历）');
            }
            if (content.endDate.indexOf("-") > -1) {
                $(".qiaoqian .endDate").html(content.endDate+'（公历）');
            }
            else {
                $(".qiaoqian .endDate").html(content.endDate.substring(0, 4) + "-" + content.endDate.substring(4, 6) + "-" + content.endDate.substring(6, 8)+'（公历）');
            }
            $(".qiaoqianMaleBornTime").html(content.qiaoqianMaleBornTime === "24" ? "不详" : (content.qiaoqianMaleBornTime + "点"));
            $(".qiaoqianFemaleName").html(content.qiaoqianFemaleName);
            $(".qiaoqianFemaleBornTime").html(content.qiaoqianFemaleBornTime === "24" ? "不详" : (content.qiaoqianFemaleBornTime + "点"));
            $(".zuoxiang").html(content.zuoxiang);
            $(".familyBornTime").html(content.familyBornTime);
            $(".qiaoqianOtherRequest").html(content.otherRequest);
        }
        else if (purposeId === "A2") {
            $(".orderContent").addClass('hidden');
            $(".chuxing").removeClass('hidden');
            $(".orderName").html(content.name);
            $(".chuxingName").html(content.chuxingName);
            if (content.chuxingBornDate.indexOf("-") > -1) {
                $(".chuxingSex").html(parseInt(content.chuxingSex) === 1 ? "男" : "女");
                $(".chuxingBornDate").html(content.chuxingBornDate +'（公历）');
                $(".chuxing .beginDate").html(content.beginDate +'（公历）');
                $(".chuxing .endDate").html(content.endDate +'（公历）');
            }
            else {
                $(".chuxingSex").html(parseInt(content.chuxingSex) === 0 ? "男" : "女");
                $(".chuxingBornDate").html(content.chuxingBornDate.substring(0, 4) + "-" + content.chuxingBornDate.substring(4, 6) + "-" + content.chuxingBornDate.substring(6, 8)+'（公历）');
                $(".chuxing .beginDate").html(content.beginDate.substring(0, 4) + "-" + content.beginDate.substring(4, 6) + "-" + content.beginDate.substring(6, 8)+'（公历）');
                $(".chuxing .endDate").html(content.endDate.substring(0, 4) + "-" + content.endDate.substring(4, 6) + "-" + content.endDate.substring(6, 8)+'（公历）');
            }
            $(".chuxingBornTime").html(content.chuxingBornTime === "24" ? "不详" : (content.chuxingBornTime + "点"));
            $(".bornAddress").html(content.bornAddress);
            $(".goAddress").html(content.goAddress);
            $(".chuxingOtherRequest").html(content.otherRequest);
        }
        else if (purposeId === "A3") {
            $(".orderContent").addClass('hidden');
            $(".kaizhang").removeClass('hidden');
            $(".orderName").html(content.name);
            $(".kaizhangName").html(content.kaizhangName);
            if (content.kaizhangBornDate.indexOf("-") > -1) {
                $(".kaizhangSex").html(parseInt(content.kaizhangSex) === 1 ? "男" : "女");
                $(".kaizhangBornDate").html(content.kaizhangBornDate+'（公历）');
                $(".kaizhang .beginDate").html(content.beginDate+'（公历）');
                $(".kaizhang .endDate").html(content.endDate+'（公历）');
            }
            else {
                $(".kaizhangSex").html(parseInt(content.kaizhangSex) === 0 ? "男" : "女");
                $(".kaizhangBornDate").html(content.kaizhangBornDate.substring(0, 4) + "-" + content.kaizhangBornDate.substring(4, 6) + "-" + content.kaizhangBornDate.substring(6, 8)+'（公历）');
                $(".kaizhang .beginDate").html(content.beginDate.substring(0, 4) + "-" + content.beginDate.substring(4, 6) + "-" + content.beginDate.substring(6, 8)+'（公历）');
                $(".kaizhang .endDate").html(content.endDate.substring(0, 4) + "-" + content.endDate.substring(4, 6) + "-" + content.endDate.substring(6, 8)+'（公历）');
            }
            $(".kaizhangBornTime").html(content.kaizhangBornTime === "24" ? "不详" : (content.kaizhangBornTime + "点"));
            $(".gongsiZuoxiang").html(content.gongsiZuoxiang);
            $(".partnerBornTime").html(content.partnerBornTime);
            $(".kaizhangOtherRequest").html(content.otherRequest);
        }
        else if (purposeId === "A4") {
            $(".orderContent").addClass('hidden');
            $(".hehun").removeClass('hidden');
            $(".orderCategory1").html(cat1 + "-" + cat2);
            $(".orderName").html(content.name);


            $(".hehunMaleName").html(content.hehunMaleName);

            if (content.hehunMaleBornDate.indexOf("-") > -1) {
                $(".hehunMaleBornDate").html(content.hehunMaleBornDate+'（公历）');
                $(".hehunFeMaleBornDate").html(content.hehunFeMaleBornDate+'（公历）');
                $(".hehun .beginDate").html(content.beginDate+'（公历）');
                $(".hehun .endDate").html(content.endDate+'（公历）');
            }
            else {
                $(".hehunMaleBornDate").html(content.hehunMaleBornDate.substring(0, 4) + "-" + content.hehunMaleBornDate.substring(4, 6) + "-" + content.hehunMaleBornDate.substring(6, 8) +'（公历）');
                $(".hehunFeMaleBornDate").html(content.hehunFeMaleBornDate.substring(0, 4) + "-" + content.hehunFeMaleBornDate.substring(4, 6) + "-" + content.hehunFeMaleBornDate.substring(6, 8) +'（公历）');
                $(".hehun .beginDate").html(content.beginDate.substring(0, 4) + "-" + content.beginDate.substring(4, 6) + "-" + content.beginDate.substring(6, 8) +'（公历）');
                $(".hehun .endDate").html(content.endDate.substring(0, 4) + "-" + content.endDate.substring(4, 6) + "-" + content.endDate.substring(6, 8) +'（公历）');
            }

            $(".hehunMaleBornTime").html(content.hehunMaleBornTime === "24" ? "不详" : (content.hehunMaleBornTime + "点"));
            $(".maleBornAddress").html(content.maleBornAddress);
            // $(".hehunMaleFatherZodiac").html(content.hehunMaleFatherZodiac);
            // $(".hehunMaleMotherZodiac").html(content.hehunMaleMotherZodiac);
            $(".hehunMaleFatherZodiac").html(!isNaN(content.hehunMaleFatherZodiac)?zodiacList[parseInt(content.hehunMaleFatherZodiac)-1]:content.hehunMaleFatherZodiac);
            $(".hehunMaleMotherZodiac").html(!isNaN(content.hehunMaleMotherZodiac)?zodiacList[parseInt(content.hehunMaleMotherZodiac)-1]:content.hehunMaleMotherZodiac);

            $(".hehunFeMaleName").html(content.hehunFeMaleName);
            $(".hehunFeMaleBornTime").html(content.hehunFeMaleBornTime === "24" ? "不详" : (content.hehunFeMaleBornTime + "点"));
            $(".femaleBornAddress").html(content.femaleBornAddress);
            // $(".hehunFeMaleFatherZodiac").html(!isNaN(content.hehunMaleMotherZodiac)?zodiacList[parseInt(content.hehunMaleMotherZodiac)-1]:content.hehunMaleMotherZodiac);
            // $(".hehunFeMaleMotherZodiac").html(!isNaN(content.hehunFeMaleMotherZodiac)?zodiacList[parseInt(content.hehunFeMaleMotherZodiac)-1]:content.hehunFeMaleMotherZodiac);
            $(".hehunFeMaleFatherZodiac").html(!isNaN(content.hehunFeMaleFatherZodiac)?zodiacList[parseInt(content.hehunFeMaleFatherZodiac)-1]:content.hehunFeMaleFatherZodiac);
            $(".hehunFeMaleMotherZodiac").html(!isNaN(content.hehunFeMaleMotherZodiac)?zodiacList[parseInt(content.hehunFeMaleMotherZodiac)-1]:content.hehunFeMaleMotherZodiac);

            $(".hehunOtherRequest").html(content.otherRequest);
        }
    });
var zodiacList=['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];




    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }
});