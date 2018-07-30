$(function () {
    if (document.addEventListener) {
        document.addEventListener("touchstart", function () {}, false);
    }
    //if (FastClick != undefined) {
    //    FastClick.attach(document.body);
    //}
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
        $(".select_mask").removeClass("hidden");
    });
    $("select").on("blur",function () {
        $(".select_mask").trigger("click");
    });
    $(".select_mask").click(function () {
        $(this).addClass("hidden");
    });

    if($(window).width()<=320&&$(".multipleLinePlaceholder").css("height")!=="90px"){
        $(".multipleLinePlaceholder").css("height","90px");
    }
    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
    if(deviceIsIOS){
        $(".descTitleTxt").css("padding-bottom","0");
    }
    var versioncode=getQueryString("versioncode");
    if(versioncode){
        localStorage.setItem("versioncode",versioncode);
    }
    location.href="protocol://getuserinfo#userinfocallback";
    //else{
    //    localStorage.removeItem("versioncode");
    //}

    var submitUrl="/mingli/interface/createordernew";
    var price=188;
    var purposeId="A1";
    var source="择吉日-乔迁";
    var goodsId="931BD0493BA944DEAC5E14731DFA9091";
    // goodsId = "7C55ABAD7F8F4BE2A7744F8578196E44";  //测试用goodsId
    var submitObject;

    $(".confirmBtn").click(function () {
        var contactName=$(".nameTxt").val().trim();
        if(contactName.length===0){
            $("#tipModal").modal({showString:"请填写您的姓名"});
            return false;
        }
        var contactTel=$(".telTxt").val().trim();
        var telRag=/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
        if(!telRag.test(contactTel)){
            $("#tipModal").modal({showString:"请填写正确的联系电话"});
            return false;
        }
        var beginDate=$(".beginDateTxt").val().substr(3).trim().replace("年","-").replace("月","-").replace("日","");
        if(beginDate===""){
            $("#tipModal").modal({showString:"请选择开始日期"});
            return false;
        }
        var endDate=$(".endDateTxt").val().substr(3).trim().replace("年","-").replace("月","-").replace("日","");
        if(endDate===""){
            $("#tipModal").modal({showString:"请选择结束日期"});
            return false;
        }
        var endDateTime=new Date(str2Int(endDate.substring(0,4)),str2Int(endDate.substring(5,7))-1,str2Int(endDate.substring(8,10))).getTime();
        var beginDateTime=new Date(str2Int(beginDate.substring(0,4)),str2Int(beginDate.substring(5,7))-1,str2Int(beginDate.substring(8,10))).getTime();
        if(endDateTime-beginDateTime<=0){
            $("#tipModal").modal({showString:"结束日期应大于开始日期"});
            return false;
        }


        //男主人姓名
        var qiaoqianMaleName=$(".qiaoqianMaleNameTxt").val().trim();
        //女主人姓名
        var qiaoqianFemaleName=$(".qiaoqianFemaleNameTxt").val().trim();
        if(qiaoqianMaleName.length===0&&qiaoqianFemaleName.length===0){
            $("#tipModal").modal({showString:"请至少输入一位主人的姓名"});
            return false;
        }
        //男主人出生日期
        var qiaoqianMaleBornDate=$(".qiaoqianMaleBornDate").val().substr(3).trim().replace("年","-").replace("月","-").replace("日","");
        //女主人出生日期
        var qiaoqianFemaleBornDate=$(".qiaoqianFemaleBornDate").val().substr(3).trim().replace("年","-").replace("月","-").replace("日","");
        if(qiaoqianMaleBornDate===""&&qiaoqianFemaleBornDate===""){
            $("#tipModal").modal({showString:"请至少选择一位主人的出生日期"});
            return false;
        }
        if(qiaoqianMaleBornTime==="-1"&&qiaoqianFemaleBornTime==="-1"){
            $("#tipModal").modal({showString:"请至少选择一位主人的出生时间"});
            return false;
        }
        //宅屋坐向
        var zuoxiang=$(".zuoxiangTxt").val().trim();
        if(zuoxiang.length===0){
            $("#tipModal").modal({showString:"请填写宅屋坐向"});
            return false;
        }
        //其他家庭成员生辰信息
        var familyBornTime=$(".familyTxa").val().trim();
        familyBornTime=familyBornTime.indexOf("提示：")>-1?"":familyBornTime;
        if(familyBornTime.length===0){
            $("#tipModal").modal({showString:"请填写其他家庭成员生辰信息"});
            return false;
        }
        //其他要求
        var otherRequest=$(".otherTxa").val().trim();
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

        var dateArray = $.toLunar(f, c, e);
        var dateArrayFeMale = $.toLunar(n, p, k);
        
        //男方信息
        $('.user_info_male .user_name').html(qiaoqianMaleName);
        $('.user_info_male .user_sex').html("男")
        $('.user_info_female .user_sex').html("女")
    
        if(qiaoqianMaleBornTime === '24'){
            $('.user_info_male .new_birthday').html($('.qiaoqianMaleBornDate').val() + ' ' + '不清楚');
            $('.user_info_male .old_birthday').html("农历 " + dateArray.lYear + "年" + dateArray.IMonthCn + dateArray.IDayCn + " " + "不清楚");
        }else {
            $('.user_info_male .new_birthday').html($('.qiaoqianMaleBornDate').val() + ' ' + qiaoqianMaleBornTime + '时');
            $('.user_info_male .old_birthday').html("农历 " + dateArray.lYear + "年" + dateArray.IMonthCn + dateArray.IDayCn + " " + qiaoqianMaleBornTime + '时');
        }
        //女方信息
        $('.user_info_female .user_name').html(qiaoqianFemaleName);
        if(qiaoqianFemaleBornTime === '24'){
            $('.user_info_female .new_birthday').html($('.qiaoqianFemaleBornDate').val() + ' ' + '不清楚');
            $('.user_info_female .old_birthday').html("农历 " + dateArrayFeMale.lYear + "年" + dateArrayFeMale.IMonthCn + dateArrayFeMale.IDayCn + " " + "不清楚");
        }else {
            $('.user_info_female .new_birthday').html($('.qiaoqianFemaleBornDate').val() + ' ' + qiaoqianFemaleBornTime + '时');
            $('.user_info_female .old_birthday').html("农历 " + dateArrayFeMale.lYear + "年" + dateArrayFeMale.IMonthCn + dateArrayFeMale.IDayCn + " " + qiaoqianFemaleBornTime + '时');
        }
                                
        $(".bg_mask").removeClass("hidden");
        $('.pop_outbox').removeClass('hidden');
        
    });

    $(document).on('click','.back_btn',function () {
        $(".bg_mask").addClass("hidden");
        $('.pop_outbox').addClass('hidden');
    })
    $(document).on('click','.submit_btn',function () {
        var pushToken=localStorage["pushToken"]||getQueryString("pushToken");
        var deviceMacId=localStorage["deviceMacId"]||getQueryString("machash");
        var wnlUserId=localStorage["wnlUserId"]||getQueryString("wnlid");
        var appver=localStorage["appver"]||getQueryString("appver");
        var idfa=localStorage["idfa"]||getQueryString("idfa");
        var gid=localStorage["gid"]||getQueryString("gid");
        //新增参数
        var osver = localStorage["osver"]||getQueryString("osver");
        var clientType = localStorage["clientType"];
        var deviceId = localStorage["deviceid"] || getQueryString('deviceId') || getQueryString('deviceid');
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
                    // window.location.href="orderDetail.html"+"?id="+data.msg;
                    window.location.href="orderDetail.html"+"?id="+data.msg + '&goodsId=' + goodsId + '&deviceId=' + deviceId + "&code=" + code;
                }
                else{
                $("#tipModal").modal({showString:data.msg});     //待约定错误代码
                }
            },
            error: function(xhr, type,error){
                $(".mask").addClass("hidden");
                $("#tipModal").modal({showString:"服务器错误,请重试"});
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
        $(".select_mask").trigger("click");
        if($(this).val()==="-1"||$(this).val()==="null"||$(this).val().length===0){
            return false;
        }
        qiaoqianFemaleBornTime=$(this).val();
        $(".bornTimeTxt_female").html($("#ddlBirthHour_female option:selected").html());
    });
    $("#ddlBirthHour_female").val("24");
    $("#ddlBirthHour_female").trigger("change");
});
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
        if(originalObj.hehunFeMaleBornDate&&originalObj.hehunFeMaleBornDate.length!==0){
            var year=(originalObj.hehunFeMaleBornDate.substring(0,4)),month=(originalObj.hehunFeMaleBornDate.substring(5,7)),day=(originalObj.hehunFeMaleBornDate.substring(8,10));
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





