$(function () {
    if (document.addEventListener) {
        document.addEventListener("touchstart", function () {
        }, false);
    }
    var dateNow=new Date();
    dateNow.setDate(dateNow.getDate()+2);
    var nowYear=dateNow.getFullYear();
    var nowMonth=dateNow.getMonth();
    var nowDay=dateNow.getDate();
    $('.beginDateTxt').mobiscroll().datePicker({
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
    $('.beginDateTxt').mobiscroll("setArrayVal", [nowYear, nowMonth+1, nowDay], !1, !1, !1, 0);
    $('.endDateTxt').mobiscroll().datePicker({
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
    $('.endDateTxt').mobiscroll("setArrayVal", [nowYear, nowMonth+1, nowDay], !1, !1, !1, 0);


    $("select").on("click",function () {
        $(this).prev("span").addClass("select");
        $(".select_mask").removeClass("hidden");
    });
    $("select").on("blur",function () {
        $(".select_mask").trigger("click");
    });
    $(".select_mask").click(function () {
        $(this).addClass("hidden");
    });
    var versioncode=getQueryString("versioncode");
    if(versioncode){
        localStorage.setItem("versioncode",versioncode);
    }


    var router=new Router();
    router.route("#/",function(req,next){
        $(".zj_zrqq_step1").removeClass("hidden");
        $(".zj_zrqq_step2").addClass("hidden");
        $(".zj_zrqq_step3").addClass("hidden");
    });
    router.route("#/step2",function(req,next){
        $(".zj_zrqq_step1").addClass("hidden");
        $(".zj_zrqq_step2").removeClass("hidden");
        $(".zj_zrqq_step3").addClass("hidden");
    });
    router.route("#/step3",function(req,next){
        $(".zj_zrqq_step1").addClass("hidden");
        $(".zj_zrqq_step2").addClass("hidden");
        $(".zj_zrqq_step3").removeClass("hidden");
    });
    router.play(1);


    location.href="protocol://getuserinfo#userinfocallback";

    var submitUrl="/mingli/interface/createordernew";
    var price=188;
    var purposeId="A1";
    var goodsId="931BD0493BA944DEAC5E14731DFA9091";
    // goodsId = "7C55ABAD7F8F4BE2A7744F8578196E44";  //测试用goodsId
    var submitObject;

    $(".next_step_btn").click(function () {
        var contactName = "", contactTel = "";


        //男主人姓名
        var qiaoqianMaleName=$(".qiaoqianMaleNameTxt").val().trim();
        //女主人姓名
        var qiaoqianFemaleName=$(".qiaoqianFemaleNameTxt").val().trim();
        //男主人出生日期
        var qiaoqianMaleBornDate=$(".qiaoqianMaleBornDate").val().substr(3).trim().replace("年","-").replace("月","-").replace("日","");
        //女主人出生日期
        var qiaoqianFemaleBornDate=$(".qiaoqianFemaleBornDate").val().substr(3).trim().replace("年","-").replace("月","-").replace("日","");

        //宅屋坐向
        var zuoxiang=$(".zuoxiangTxt").val().trim();
        //其他家庭成员生辰信息
        var familyBornTime=$(".familyTxa").val().trim();
        familyBornTime=familyBornTime.indexOf("提示：")>-1?"":familyBornTime;


        var beginDate=$(".beginDateTxt").val().substr(3).trim().replace("年","-").replace("月","-").replace("日","");
        var endDate=$(".endDateTxt").val().substr(3).trim().replace("年","-").replace("月","-").replace("日","");
        var endDateTime=new Date(str2Int(endDate.substring(0,4)),str2Int(endDate.substring(5,7))-1,str2Int(endDate.substring(8,10))).getTime();
        var beginDateTime=new Date(str2Int(beginDate.substring(0,4)),str2Int(beginDate.substring(5,7))-1,str2Int(beginDate.substring(8,10))).getTime();
        var otherRequest=$(".otherTxa").val().trim();
        if ($(this).hasClass("btn_step1")){
            if(qiaoqianMaleName.length===0&&qiaoqianFemaleName.length===0){
                drawToast("请至少输入一位主人的姓名");
                return false;
            }
            if(qiaoqianMaleBornDate===""&&qiaoqianFemaleBornDate===""){
                drawToast("请至少选择一位主人的出生日期");
                return false;
            }
            if(qiaoqianMaleBornTime==="-1"&&qiaoqianFemaleBornTime==="-1"){
                drawToast("请至少选择一位主人的出生时间");
                return false;
            }
            router.redirect("#/step2");
        }
        else if ($(this).hasClass("btn_step2")){
            if(zuoxiang.length===0){
                drawToast("请填写宅屋坐向");
                return false;
            }
            //if(familyBornTime.length===0){
            //    drawToast("请填写其他家庭成员生辰信息");
            //    return false;
            //}
            router.redirect("#/step3");
        }
        else if ($(this).hasClass("btn_step3")){
            if(beginDate===""){
                drawToast("请选择开始日期");
                return false;
            }
            if(endDate===""){
                drawToast("请选择结束日期");
                return false;
            }
            if(endDateTime-beginDateTime<=0){
                drawToast("结束日期应大于开始日期");
                return false;
            }
            submitObject={
                name:contactName,
                contactTel:contactTel,
                beginDate:beginDate,
                endDate:endDate,
                purposeId:purposeId,
                qiaoqianMaleName:qiaoqianMaleName,
                qiaoqianMaleBornDate:qiaoqianMaleBornDate,
                qiaoqianMaleBornTime:qiaoqianMaleBornTime,
                qiaoqianFemaleName:qiaoqianFemaleName,
                qiaoqianFemaleBornDate:qiaoqianFemaleBornDate,
                qiaoqianFemaleBornTime:qiaoqianFemaleBornTime,
                zuoxiang:zuoxiang,
                familyBornTime:familyBornTime,
                otherRequest:otherRequest,
                price:price
            };

            //弹窗逻辑(双人)
            var f = qiaoqianMaleBornDate.slice(0,4);
            var c = qiaoqianMaleBornDate.slice(5,7);
            var e = qiaoqianMaleBornDate.slice(8,11);
            //
            var n = qiaoqianFemaleBornDate.slice(0,4);
            var p = qiaoqianFemaleBornDate.slice(5,7);
            var k = qiaoqianFemaleBornDate.slice(8,11);
            console.log(f +'-'+ c +'-'+ e);
            // console.log(Lunar.toLunar(f, c, e));
            var dateArray = $.toLunar(f, c, e);
            var dateArrayFeMale = $.toLunar(n, p, k);
        
            
            //男方信息
            $('.user_info_male .user_name').html(qiaoqianMaleName);
            $('.user_info_male .user_sex').html("男")
            $('.user_info_female .user_sex').html("女")
        
            if(qiaoqianMaleBornTime === '24'){
                
                if($('.qiaoqianMaleBornDate').val().trim() === '') {
                    $('.user_info_male .new_birthday').html('公历' + ' ' + '不清楚');
                    $('.user_info_male .old_birthday').html('农历' + ' ' + '不清楚');
                }
                else {
                    $('.user_info_male .new_birthday').html($('.qiaoqianMaleBornDate').val() + ' ' + '不清楚');
                    $('.user_info_male .old_birthday').html("农历 " + dateArray.lYear + "年" + dateArray.IMonthCn + dateArray.IDayCn + " " + "不清楚");
                }
            }else {
                
                if($('.qiaoqianMaleBornDate').val().trim() === '') {
                    $('.user_info_male .new_birthday').html('公历' + ' ' + qiaoqianMaleBornTime + '时');
                    $('.user_info_male .old_birthday').html('农历' +' ' + qiaoqianMaleBornTime + '时')
                }
                else {
                    $('.user_info_male .new_birthday').html($('.qiaoqianMaleBornDate').val() + ' ' + qiaoqianMaleBornTime + '时');
                    $('.user_info_male .old_birthday').html("农历 " + dateArray.lYear + "年" + dateArray.IMonthCn + dateArray.IDayCn + " " + qiaoqianMaleBornTime + '时');
                }
            }
            //女方信息
            $('.user_info_female .user_name').html(qiaoqianFemaleName);
            if(qiaoqianFemaleBornTime === '24'){
                if($('.qiaoqianFemaleBornDate').val().trim() === '') {
                    $('.user_info_female .new_birthday').html('公历' + ' ' + '不清楚');
                    $('.user_info_female .old_birthday').html('农历' + ' ' + '不清楚');
                }
                else {
                    $('.user_info_female .new_birthday').html($('.qiaoqianFemaleBornDate').val() + ' ' + '不清楚');
                    $('.user_info_female .old_birthday').html("农历 " + dateArrayFeMale.lYear + "年" + dateArrayFeMale.IMonthCn + dateArrayFeMale.IDayCn + "日" + " " + "不清楚");
                }
                
            }else {
                if($('.qiaoqianFemaleBornDate').val().trim() === '') {
                    $('.user_info_female .new_birthday').html('公历' + ' ' + qiaoqianMaleBornTime + '时');
                    $('.user_info_female .old_birthday').html('农历' +' ' + qiaoqianMaleBornTime + '时')
                }
                else{
                    $('.user_info_female .new_birthday').html($('.qiaoqianFemaleBornDate').val() + ' ' + qiaoqianFemaleBornTime + '时');
                    $('.user_info_female .old_birthday').html("农历 " + dateArrayFeMale.lYear + "年" + dateArrayFeMale.IMonthCn + dateArrayFeMale.IDayCn + "日" + " " + qiaoqianFemaleBornTime + '时');
                }
            }
                                  
            $(".bg_mask").removeClass("hidden");
            $('.pop_outbox').removeClass('hidden');
        }
    });

    $(document).on('click','.back_btn',function () {
        $(".bg_mask").addClass("hidden");
        $('.pop_outbox').addClass('hidden');
    })
    $(document).on('click','.submit_btn',function () {
        var pushToken=localStorage["pushToken"]||getQueryString("pushToken");
        var deviceMacId=localStorage["deviceMacId"]||getQueryString("mac") || getQueryString('machash');
        var wnlUserId=localStorage["wnlUserId"]||getQueryString("userId") || getQueryString('wnlid');
        var appver=localStorage["appver"]||getQueryString("appver");
        var idfa=localStorage["idfa"]||getQueryString("idfa");
        var gid=localStorage["gid"]||getQueryString("gid");
        //新增参数
        var osver = localStorage["osver"]||getQueryString("osver");
        var clientType = localStorage["clientType"];
        var deviceId = localStorage["deviceid"] || getQueryString('deviceId') || getQueryString('deviceid') || getQueryString('gid');
        var boundId = localStorage["boundid"] || getQueryString('boundId') || getQueryString('boundid');
        var posId = localStorage["posid"] || getQueryString('posId') || getQueryString('posid');
        var imeiNumber = localStorage["imei"] || getQueryString('imei');

        var code = getQueryString('code');

        if(pushToken&&!localStorage["pushToken"]){
            localStorage.setItem("pushToken",pushToken);
        }
        if(deviceMacId&&!localStorage["deviceMacId"]){
            localStorage.setItem("deviceMacId",deviceMacId);
        }
        if(wnlUserId&&!localStorage["wnlUserId"]){
            localStorage.setItem("wnlUserId",wnlUserId);
        }
        if(appver&&!localStorage["appver"]){
            localStorage.setItem("appver",appver);
        }
        if(idfa&&!localStorage["idfa"]){
            localStorage.setItem("idfa",idfa);
        }
        if(gid&&!localStorage["gid"]){
            localStorage.setItem("gid",gid);
        }
        //新增参数
        if(deviceId&&!localStorage["deviceid"]){
            localStorage.setItem("deviceid",deviceId);
        }
        if(boundId&&!localStorage["boundid"]){
            localStorage.setItem("boundid",boundId);
        }
        if(posId&&!localStorage["posid"]){
            localStorage.setItem("posid",posId);
        }
        if(imeiNumber&&!localStorage["imei"]){
            localStorage.setItem("imei",imeiNumber);
        }
        $(".bg_mask").addClass("hidden");
        $('.pop_outbox').addClass('hidden');

        $(".mask").removeClass("hidden");
        $.ajax({
            url:submitUrl,
            type:"POST",
            data:{
                type:purposeId,
                msg:JSON.stringify(submitObject),
                price:price,
                pushtoken:pushToken,//用户的设备推送id
                userid:wnlUserId,//注册用户的万年历用户id
                mac:deviceMacId,
                idfa:idfa,
                gid:gid,
                //新增参数
                goodsID:goodsId, //产品ID 必填
                parterID:"mingli",
                clientType:clientType, //设备类型 必填
                deviceID:deviceId,    //设备ID 必填
                imeiNumber:imeiNumber,
                posID:posId,
                boundID:boundId,
                appVersion:appver,
                sysVersion:osver
            },
            dataType: 'json',
            success: function(data){
                $(".mask").addClass("hidden");
                if(data.status=="0"){
                    var source="择吉日-乔迁";
                    // window.location.href="orderDetail.html"+"?id="+data.msg;
                    // window.location.href="orderDetail.html"+"?id="+data.msg + '&goodsId=' + goodsId + '&deviceId=' + deviceId + "&code=" + code;
                    window.location.href = '//order.51wnl.com/pay_web/index_t.html?money=' + price + '&source=' + source + '&parterid=mingli&goodsid=' + goodsId + '&parteruserid=' + deviceId + '&data=' + data.msg + '&returnUrl=' + encodeURIComponent('http://' + location.host + location.pathname.replace(/(zj_index|zj_zrcx|zj_zrjh|zj_zrqq|zj_zrkz)/ig,'orderDetail') + '?id=' + data.msg + '&goodsId=' + goodsId +'&deviceId=' + deviceId +'&code=' + code) +  '&failUrl='+ encodeURIComponent('#');
                }
                else{
                drawToast(data.msg);     //待约定错误代码
                }
            },
            error: function(xhr, type,error){
                $(".mask").addClass("hidden");
                drawToast("服务器错误,请重试");
            }
        })
    })


    $('.qiaoqianMaleBornDate').mobiscroll().datePicker({
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
    $('.qiaoqianMaleBornDate').mobiscroll("setArrayVal", [1990, 1, 1], !1, !1, !1, 0);
    var qiaoqianMaleBornTime="-1";
    $("#ddlBirthHour_male").change(function () {
        $(this).prev("span").addClass("select");
        $(".select_mask").trigger("click");
        if($(this).val()==="-1"||$(this).val()==="null"||$(this).val().length===0){
            return false;
        }
        qiaoqianMaleBornTime=$(this).val();
        $(".bornTimeTxt_male").html($("#ddlBirthHour_male option:selected").html());
    });
    $("#ddlBirthHour_male").val("24");
    $("#ddlBirthHour_male").trigger("change");
    $('.qiaoqianFemaleBornDate').mobiscroll().datePicker({
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
    $('.qiaoqianFemaleBornDate').mobiscroll("setArrayVal", [1990, 1, 1], !1, !1, !1, 0);
    var qiaoqianFemaleBornTime="-1";
    $("#ddlBirthHour_female").change(function () {
        $(this).prev("span").addClass("select");
        $(".select_mask").trigger("click");
        if($(this).val()==="-1"||$(this).val()==="null"||$(this).val().length===0){
            return false;
        }
        qiaoqianFemaleBornTime=$(this).val();
        $(".bornTimeTxt_female").html($("#ddlBirthHour_female option:selected").html());
    });
    $("#ddlBirthHour_female").val("24");
    $("#ddlBirthHour_female").trigger("change");
    if(window.ylwindow&&ylwindow.enableShare){
        ylwindow.enableShare(false);
    }
});
function appCallback_showShare(){
    return 0;
}
var intervalCounter = 0;
function drawToast(message) {
    var alert = document.getElementById("toast");
    if (alert.className.match(new RegExp('(\\s|^)' + 'show' + '(\\s|$)'))){
        return false;
    }
    alert.style.opacity = .9;
    alert.innerHTML = message.substr(0,3)+"<span class='tip_txt'>&nbsp;"+message.substring(3)+"</span>";
    alert.className+="show";
    intervalCounter = setTimeout(function(){
        alert.style.opacity = 0;
        clearInterval(intervalCounter);
    }, 1500);
    setTimeout(function () {
        alert.className=alert.className.replace("show","");
    },2000);
}
//针对Android webview  parseInt时的将"0"开始的字符转换成0的bug，将字符转换为int
function str2Int(str){
    str = str.replace(/^0+/g, '');
    if(str.length == 0){
        return 0;
    }
    return parseInt(str);
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
var originalAllObj;
function userinfocallback(result) {
    var originalString = Base64.decode(result);
    originalAllObj = JSON.parse(originalString);
    if ("mingli_zrqq_data" in localStorage) {
        originalAllObj.zrqq = JSON.parse(localStorage.getItem("mingli_zrqq_data"));
    }
    var originalObj={};
    if(originalAllObj.zrqq) {
        originalObj = originalAllObj.zrqq;
        if(originalObj.name&&originalObj.name.length!==0){
            $(".nameTxt").val(originalObj.name);
        }
        if(originalObj.contactTel&&originalObj.contactTel.length!==0){
            $(".telTxt").val(originalObj.contactTel);
        }
        if(originalObj.beginDate&&originalObj.beginDate.length!==0){
            var year=(originalObj.beginDate.substring(0,4)),month=(originalObj.beginDate.substring(5,7)),day=(originalObj.beginDate.substring(8,10));
            $(".beginDateTxt").val("公历 "+year+"年"+month+"月"+day+"日");
            $('.beginDateTxt').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
        }
        if(originalObj.endDate&&originalObj.endDate.length!==0){
            var year=(originalObj.endDate.substring(0,4)),month=(originalObj.endDate.substring(5,7)),day=(originalObj.endDate.substring(8,10));
            $(".endDateTxt").val("公历 "+year+"年"+month+"月"+day+"日");
            $('.endDateTxt').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
        }


        if(originalObj.zuoxiang&&originalObj.zuoxiang.length!==0){
            $(".zuoxiangTxt").val(originalObj.zuoxiang);
        }
        if(originalObj.qiaoqianMaleName&&originalObj.qiaoqianMaleName.length!==0){
            $(".qiaoqianMaleNameTxt").val(originalObj.qiaoqianMaleName);
        }
        if(originalObj.qiaoqianFemaleBornDate&&originalObj.qiaoqianFemaleBornDate.length!==0){
            var year=(originalObj.qiaoqianFemaleBornDate.substring(0,4)),month=(originalObj.qiaoqianFemaleBornDate.substring(5,7)),day=(originalObj.qiaoqianFemaleBornDate.substring(8,10));
            $(".qiaoqianMaleBornDate").val("公历 "+year+"年"+month+"月"+day+"日");
            $('.qiaoqianMaleBornDate').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
        }
        if(originalObj.qiaoqianMaleBornTime&&originalObj.qiaoqianMaleBornTime.length!==0){
            var hour=originalObj.qiaoqianMaleBornTime.substr(0,2);
            $("#ddlBirthHour_male").val(hour);
            $("#ddlBirthHour_male").trigger("change");
        }


        if(originalObj.qiaoqianFemaleName&&originalObj.qiaoqianFemaleName.length!==0){
            $(".qiaoqianFemaleNameTxt").val(originalObj.qiaoqianFemaleName);
        }
        if(originalObj.qiaoqianFeMaleBornDate&&originalObj.qiaoqianFeMaleBornDate.length!==0){
            var year=(originalObj.qiaoqianFeMaleBornDate.substring(0,4)),month=(originalObj.qiaoqianFeMaleBornDate.substring(5,7)),day=(originalObj.qiaoqianFeMaleBornDate.substring(8,10));
            $(".qiaoqianFemaleBornDate").val("公历 "+year+"年"+month+"月"+day+"日");
            $('.qiaoqianFemaleBornDate').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
        }
        if(originalObj.qiaoqianFemaleBornTime&&originalObj.qiaoqianFemaleBornTime.length!==0){
            var hour=originalObj.qiaoqianFemaleBornTime.substr(0,2);
            $("#ddlBirthHour_female").val(hour);
            $("#ddlBirthHour_female").trigger("change");
        }


        if(originalObj.familyBornTime&&originalObj.familyBornTime.length!==0){
            $(".familyTxa").val(originalObj.familyBornTime);
            $(".familyTxa").removeClass("multipleLinePlaceholder");
        }
        if(originalObj.otherRequest&&originalObj.otherRequest.length!==0){
            $(".otherTxa").val(originalObj.otherRequest);
        }
    }
    else if(originalAllObj.native_jryc||originalAllObj.native_usercenter) {
        originalObj = originalAllObj.native_jryc || originalAllObj.native_usercenter;
        if(originalObj.sex!=undefined&&parseInt(originalObj.sex)!==-1) {
            var sex1 =parseInt(originalObj.sex);
            if(sex1===1){
                if(originalObj.name&&originalObj.name.length!==0){
                    $(".qiaoqianMaleNameTxt").val(originalObj.name);
                }
                if(originalObj.date&&originalObj.date.length!==0){
                    var year=(originalObj.date.substring(0,4)),month=(originalObj.date.substring(5,7)),day=(originalObj.date.substring(8,10));
                    $(".qiaoqianMaleBornDate").val("公历 "+year+"年"+month+"月"+day+"日");
                    $('.qiaoqianMaleBornDate').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
                }
                if(originalObj.time&&originalObj.time.length!==0){
                    var hour=originalObj.time.substr(0,2);
                    $("#ddlBirthHour_male").val(hour);
                    $("#ddlBirthHour_male").trigger("change");
                }
            }
            else{
                if(originalObj.name&&originalObj.name.length!==0){
                    $(".qiaoqianFemaleNameTxt").val(originalObj.name);
                }
                if(originalObj.date&&originalObj.date.length!==0){
                    var year=(originalObj.date.substring(0,4)),month=(originalObj.date.substring(5,7)),day=(originalObj.date.substring(8,10));
                    $(".qiaoqianFemaleBornDate").val("公历 "+year+"年"+month+"月"+day+"日");
                    $('.qiaoqianFemaleBornDate').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
                }
                if(originalObj.time&&originalObj.time.length!==0){
                    var hour=originalObj.time.substr(0,2);
                    $("#ddlBirthHour_female").val(hour);
                    $("#ddlBirthHour_female").trigger("change");
                }
            }
        }
    }
}
var title="万年历的专家亲测很准的哦，小伙伴们也快来试一下";
var textObj = {
    text: title,
    image: "1",
    url:location.href,
    pureText:title,
    prefix:""
};
var textObj1={
    text: title,
    image: "1",
    targetUrl:location.href,
    perfix:""
};
function appCallback_share(){
    try{
        if(window.ylwindow){
            ylwindow.reportHasShare(true);
            location.href="protocol://share:" + encodeURI(JSON.stringify(textObj1));
        }
        else{
            location.href="protocol://share#" + encodeURI(JSON.stringify(textObj));
        }
    }
    catch (e){}
    return 1;
}

/**用法
 * Lunar.toSolar(2016, 6, 3); 农历转化公历
 * Lunar.toLunar(2016, 7, 6); 公历转化农历
 */
var Lunar = {
  MIN_YEAR : 1891,
  MAX_YEAR : 2100,
  lunarInfo : [
    [0,2,9, 21936], [6,1,30, 9656], [0,2,17, 9584], [0,2,6, 21168], [5,1,26,43344], [0,2,13,59728],
    [0,2,2, 27296], [3,1,22,44368], [0,2,10,43856], [8,1,30,19304], [0,2,19,19168], [0,2,8, 42352],
    [5,1,29,21096], [0,2,16,53856], [0,2,4, 55632], [4,1,25,27304], [0,2,13,22176], [0,2,2, 39632],
    [2,1,22,19176], [0,2,10,19168], [6,1,30,42200], [0,2,18,42192], [0,2,6, 53840], [5,1,26,54568],
    [0,2,14,46400], [0,2,3, 54944], [2,1,23,38608], [0,2,11,38320], [7,2,1, 18872], [0,2,20,18800],
    [0,2,8, 42160], [5,1,28,45656], [0,2,16,27216], [0,2,5, 27968], [4,1,24,44456], [0,2,13,11104],
    [0,2,2, 38256], [2,1,23,18808], [0,2,10,18800], [6,1,30,25776], [0,2,17,54432], [0,2,6, 59984],
    [5,1,26,27976], [0,2,14,23248], [0,2,4, 11104], [3,1,24,37744], [0,2,11,37600], [7,1,31,51560],
    [0,2,19,51536], [0,2,8, 54432], [6,1,27,55888], [0,2,15,46416], [0,2,5, 22176], [4,1,25,43736],
    [0,2,13, 9680], [0,2,2, 37584], [2,1,22,51544], [0,2,10,43344], [7,1,29,46248], [0,2,17,27808],
    [0,2,6, 46416], [5,1,27,21928], [0,2,14,19872], [0,2,3, 42416], [3,1,24,21176], [0,2,12,21168],
    [8,1,31,43344], [0,2,18,59728], [0,2,8, 27296], [6,1,28,44368], [0,2,15,43856], [0,2,5, 19296],
    [4,1,25,42352], [0,2,13,42352], [0,2,2, 21088], [3,1,21,59696], [0,2,9, 55632], [7,1,30,23208],
    [0,2,17,22176], [0,2,6, 38608], [5,1,27,19176], [0,2,15,19152], [0,2,3, 42192], [4,1,23,53864],
    [0,2,11,53840], [8,1,31,54568], [0,2,18,46400], [0,2,7, 46752], [6,1,28,38608], [0,2,16,38320],
    [0,2,5, 18864], [4,1,25,42168], [0,2,13,42160], [10,2,2,45656], [0,2,20,27216], [0,2,9, 27968],
    [6,1,29,44448], [0,2,17,43872], [0,2,6, 38256], [5,1,27,18808], [0,2,15,18800], [0,2,4, 25776],
    [3,1,23,27216], [0,2,10,59984], [8,1,31,27432], [0,2,19,23232], [0,2,7, 43872], [5,1,28,37736],
    [0,2,16,37600], [0,2,5, 51552], [4,1,24,54440], [0,2,12,54432], [0,2,1, 55888], [2,1,22,23208],
    [0,2,9, 22176], [7,1,29,43736], [0,2,18, 9680], [0,2,7, 37584], [5,1,26,51544], [0,2,14,43344],
    [0,2,3, 46240], [4,1,23,46416], [0,2,10,44368], [9,1,31,21928], [0,2,19,19360], [0,2,8, 42416],
    [6,1,28,21176], [0,2,16,21168], [0,2,5, 43312], [4,1,25,29864], [0,2,12,27296], [0,2,1, 44368],
    [2,1,22,19880], [0,2,10,19296], [6,1,29,42352], [0,2,17,42208], [0,2,6, 53856], [5,1,26,59696],
    [0,2,13,54576], [0,2,3, 23200], [3,1,23,27472], [0,2,11,38608], [11,1,31,19176],[0,2,19,19152],
    [0,2,8, 42192], [6,1,28,53848], [0,2,15,53840], [0,2,4, 54560], [5,1,24,55968], [0,2,12,46496],
    [0,2,1, 22224], [2,1,22,19160], [0,2,10,18864], [7,1,30,42168], [0,2,17,42160], [0,2,6, 43600],
    [5,1,26,46376], [0,2,14,27936], [0,2,2, 44448], [3,1,23,21936], [0,2,11,37744], [8,2,1, 18808],
    [0,2,19,18800], [0,2,8, 25776], [6,1,28,27216], [0,2,15,59984], [0,2,4, 27424], [4,1,24,43872],
    [0,2,12,43744], [0,2,2, 37600], [3,1,21,51568], [0,2,9, 51552], [7,1,29,54440], [0,2,17,54432],
    [0,2,5, 55888], [5,1,26,23208], [0,2,14,22176], [0,2,3, 42704], [4,1,23,21224], [0,2,11,21200],
    [8,1,31,43352], [0,2,19,43344], [0,2,7, 46240], [6,1,27,46416], [0,2,15,44368], [0,2,5, 21920],
    [4,1,24,42448], [0,2,12,42416], [0,2,2, 21168], [3,1,22,43320], [0,2,9, 26928], [7,1,29,29336],
    [0,2,17,27296], [0,2,6, 44368], [5,1,26,19880], [0,2,14,19296], [0,2,3, 42352], [4,1,24,21104],
    [0,2,10,53856], [8,1,30,59696], [0,2,18,54560], [0,2,7, 55968], [6,1,27,27472], [0,2,15,22224],
    [0,2,5, 19168], [4,1,25,42216], [0,2,12,42192], [0,2,1, 53584], [2,1,21,55592], [0,2,9, 54560]
  ],
  //是否闰年
  isLeapYear : function(year) {
    return ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));
  },
  //天干地支年
  lunarYear : function(year) {
    var gan = ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
      zhi = ['申', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未'],
      str = year.toString().split("");
    return gan[str[3]] + zhi[year % 12];
  },
  //生肖年
  zodiacYear : function(year) {
    var zodiac = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊'];
    return zodiac[year % 12];
  },
  //公历月份天数
  //@param year 阳历-年
  //@param month 阳历-月
  solarMonthDays : function(year, month) {
    var FebDays = this.isLeapYear(year) ? 29 : 28;
    var monthHash = ['', 31, FebDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return monthHash[month];
  },
  //农历月份天数
  lunarMonthDays : function(year, month) {
    var monthData = this.lunarMonths(year);
    return monthData[month - 1];
  },
  //农历月份天数数组
  lunarMonths : function(year) {
    var yearData = this.lunarInfo[year - this.MIN_YEAR];
    var leapMonth = yearData[0];
    var bit = (+yearData[3]).toString(2);
    var months = [];
    for (var i = 0; i < bit.length; i++) {
      months[i] = bit.substr(i, 1);
    }
   
    for (var k = 0, len = 16 - months.length; k < len; k++) {
      months.unshift('0');
    }
   
    months = months.slice(0, (leapMonth == 0 ? 12 : 13));
    for (var i = 0; i < months.length; i++) {
      months[i] = +months[i] + 29;
    }
    return months;
  },
  //农历每年的天数
  //@param year 农历年份
  lunarYearDays : function(year) {
    var monthArray = this.lunarYearMonths(year);
    var len = monthArray.length;
    return (monthArray[len-1] == 0 ? monthArray[len-2] : monthArray[len-1]);
  },
  //
  lunarYearMonths : function(year) {
    var monthData = this.lunarMonths(year);
    var res = [];
    var temp = 0;
    var yearData = this.lunarInfo[year - this.MIN_YEAR];
    var len = (yearData[0] == 0 ? 12 : 13);
    for (var i = 0; i < len; i++) {
      temp = 0;
      for (j = 0; j <= i; j++) {
        temp += monthData[j];
      }
      res.push(temp);
    }
    return res;
  },
  //获取闰月
  //@param year 农历年份
  leapMonth : function(year){
    var yearData = this.lunarInfo[year - this.MIN_YEAR];
    return yearData[0];
  },
  //计算农历日期与正月初一相隔的天数
  betweenLunarDays : function(year, month, day) {
    var yearMonth = this.lunarMonths(year);
    var res = 0;
    for (var i = 1; i < month; i++) {
      res += yearMonth[i-1];
    }
    res += day - 1;
    return res;
  },
  //计算2个阳历日期之间的天数
  //@param year 阳历年
  //@param month
  //@param day
  //@param l_month 阴历正月对应的阳历月份
  //@param l_day  阴历初一对应的阳历天
  betweenSolarDays : function(year, month, day, l_month, l_day) {
    var time1 = new Date(year +"-"+ month +"-"+ day).getTime(),
      time2 = new Date(year +"-"+ l_month +"-"+ l_day).getTime();
    return Math.ceil((time1-time2)/24/3600/1000);
  },
  //根据距离正月初一的天数计算阴历日期
  //@param year 阳历年
  //@param between 天数
  lunarByBetween : function(year, between) {
    var lunarArray = [], yearMonth = [], t = 0, e = 0, leapMonth = 0, m = '';
    if (between == 0) {
      t = 1;
      e = 1;
      m = '正月';
    } else {
      year = between > 0 ? year : (year - 1);
      yearMonth = this.lunarYearMonths(year);
      leapMonth = this.leapMonth(year);
      between  = between > 0 ? between : (this.lunarYearDays(year) + between);
      for (var i = 0; i < 13; i++) {
        if (between == yearMonth[i]) {
          t = i + 2;
          e = 1;
          break;
        } else if (between < yearMonth[i]) {
          t = i + 1;
          e = between - ((yearMonth[i-1]) ? yearMonth[i-1] : 0) + 1;
          break;
        }
      }
       
      m = (leapMonth != 0 && t == leapMonth + 1)
      ? ('闰' + this.chineseMonth(t-1))
      : this.chineseMonth(((leapMonth != 0 && leapMonth + 1 < t) ? (t - 1) : t));
    }
    lunarArray.push(year, t, e); //年 月 日
    lunarArray.push(this.lunarYear(year),
            this.zodiacYear(year),
            m,
            this.chineseNumber(e)); //天干地支年 生肖年 月份 日
    lunarArray.push(leapMonth); //闰几月
    return lunarArray;
  },
  //中文月份
  chineseMonth : function(month) {
    var monthHash = ['', '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
    return monthHash[month];
  },
  //中文日期
  chineseNumber : function(num) {
    var dateHash = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    if (num <= 10) {
      res = '初'+ dateHash[num];
    } else if (num > 10 && num < 20) {
      res = '十'+ dateHash[num-10];
    } else if (num == 20) {
      res = "二十";
    } else if (num > 20 && num < 30) {
      res = "廿"+ dateHash[num-20];
    } else if (num == 30) {
      res = "三十";
    }
    return res;
  },
  //转换农历
  toLunar : function(year, month, day) {
    var yearData = this.lunarInfo[year - this.MIN_YEAR];
    if (year == this.MIN_YEAR && month <= 2 && day <= 9) {
      return [1891, 1, 1, '辛卯', '兔', '正月', '初一'];
    }
    return this.lunarByBetween(year, this.betweenSolarDays(year, month, day, yearData[1], yearData[2]));
  },
  //转换公历
  //@param year 阴历-年
  //@param month 阴历-月，闰月处理：例如如果当年闰五月，那么第二个五月就传六月，相当于阴历有13个月
  //@param date 阴历-日
  toSolar : function(year, month, day) {
    var yearData = this.lunarInfo[year - this.MIN_YEAR];
    var between = this.betweenLunarDays(year, month, day);
    var ms = new Date(year +"-" + yearData[1] +"-"+ yearData[2]).getTime();
    var s = ms + between * 24 * 60 * 60 * 1000;
    var d = new Date();
    d.setTime(s);
    year = d.getFullYear();
    month = d.getMonth() + 1;
    day  = d.getDate();
    return [year, month, day];
  }
};