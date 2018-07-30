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
    var price=298;
    var purposeId="B2";
    var source="紫微全命";
    var goodsId="4131CBE46D5B490185F16271829FABEF";
    // goodsId = "7C55ABAD7F8F4BE2A7744F8578196E44";  //测试用goodsId
    var submitObject;
    var clientObj={};

    $(".confirmBtn").click(function () {
        //姓名
        var name=$(".nameTxt").val().trim();
        if(name.length===0){
            $("#tipModal").modal({showString:"请填写您的姓名"});
            return false;
        }
        //民族
        var ethnic=$(".ethnicTxt").val().trim();
        if(ethnic.length===0){
            $("#tipModal").modal({showString:"请填写民族"});
            return false;
        }
        //性别
        if(sex==="-1"){
            $("#tipModal").modal({showString:"请选择性别"});
            return false;
        }
        var bornDate=$(".bornDate").val().substr(3).trim().replace("年","-").replace("月","-").replace("日","");
        if(bornDate===""){
            $("#tipModal").modal({showString:"请选择出生日期"});
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
        //家庭状况
        var familyDesc=$(".familyTxa").val().trim();
        familyDesc=familyDesc.indexOf("提示：")>-1?"":familyDesc;
        if(familyDesc.length===0){
            $("#tipModal").modal({showString:"请填写家庭状况"});
            return false;
        }
        //其他要求
        var otherRequest=$(".otherTxa").val().trim();
        submitObject={
            name:name,
            sex:sex,
            bornDate:bornDate,
            bornTime:bornTime,
            ethnic:ethnic,
            marriage:marriage,
            familyDesc:familyDesc,
            purposeId:purposeId,
            beginDate:beginDate,
            endDate:endDate,
            otherRequest:otherRequest,
            price:price
        };
        var localObj={
            name:name,
            sex:sex,
            date:bornDate,
            time:bornTime,
            ethnic:ethnic,
            marriage:marriage,
            familyDesc:familyDesc,
            beginDate:beginDate,
            endDate:endDate,
            otherRequest:otherRequest
        };
        localStorage.setItem("mingli_zwqm_data",JSON.stringify(localObj));
        
        if(originalAllObj&&!originalAllObj.native_jryc) {
            clientObj = {
                "native_jryc": {
                    "name": name,
                    "sex": sex,
                    "date": bornDate,
                    "time": bornTime + ':00'
                }
            };
            if(bornTime==="24"){
                clientObj.native_jryc.time="";
            }
        }

        //弹窗逻辑
        var f = bornDate.slice(0,4);
        var c = bornDate.slice(5,7);
        var e = bornDate.slice(8,11);
        console.log(f +'-'+ c +'-'+ e);
        console.log($.toLunar(f, c, e));
        var dateArray = $.toLunar(f, c, e);
        $('.user_name').html(name);
        if(sex === 0) {
            $('.user_sex').html("男")
        }
        if(sex === 1) {
            $('.user_sex').html("女")
        }
        if(bornTime === '24'){
            $('.new_birthday').html($('.bornDate').val() + ' ' + '不清楚');
            $('.old_birthday').html("农历 " + dateArray.lYear + "年" + dateArray.IMonthCn + dateArray.IDayCn + " " + "不清楚");
        }else {
            $('.new_birthday').html($('.bornDate').val() + ' ' + bornTime + '时');
            $('.old_birthday').html("农历 " + dateArray.lYear + "年" + dateArray.IMonthCn + dateArray.IDayCn + " " + bornTime + '时');
        }
        
                    
        $(".bg_mask").removeClass("hidden");
        $('.pop_outbox').removeClass('hidden');
          
    });
    $(document).on('click','.back_btn',function () {
        $(".bg_mask").addClass("hidden");
        $('.pop_outbox').addClass('hidden');
    });
    $(document).on('click','.submit_btn',function () {
        
        var pushToken=localStorage["pushToken"]||getQueryString("pushToken");
        var deviceMacId=localStorage["deviceMacId"]||getQueryString("machash");
        var wnlUserId=localStorage["wnlUserId"]||getQueryString("wnlid");
        var appver=localStorage["appver"]||getQueryString("appver");;
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
            url: submitUrl,
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
                    location.href="protocol://saveuserinfo#"+Base64.encode(JSON.stringify(clientObj));
                    setTimeout(function () {
                        window.location.href="orderDetail.html"+"?id="+data.msg + '&goodsId=' + goodsId + '&deviceId=' + deviceId + "&code=" + code;
                        //window.location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=' + price + '&source=' + source + '&parterid=mingli&goodsid=' + goodsId + '&parteruserid=' + deviceId + '&data=' + data.msg + '&returnUrl=' + encodeURIComponent('http://' + location.host + location.pathname + '?orderid=' + data.msg + '&code=' + code);
                    },0);
                }
                else{
                    $("#tipModal").modal({showString:data.msg});      //待约定错误代码
                }
            },
            error: function(xhr, type, error){
                $(".mask").addClass("hidden");
                $("#tipModal").modal({showString:"服务器错误,请重试"});
            }
        })
    })


    $(".sexSelect").click(function () {
        $(".sexIcon").removeClass("active");
        $(this).find(".sexIcon").addClass("active");
        if($(this).hasClass("manSexSelect")){
            sex=0;
        }
        else if($(this).hasClass("womanSexSelect")){
            sex=1;
        }
    });
    $('.bornDate').mobiscroll().datePicker({
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
    $('.bornDate').mobiscroll("setArrayVal", [1990, 1, 1], !1, !1, !1, 0);
    var bornTime="-1";
    $("#ddlBirthHour").change(function () {
        $(".select_mask").trigger("click");
        if($(this).val()==="-1"||$(this).val()==="null"||$(this).val().length===0){
            return false;
        }
        bornTime=$(this).val();
        $(".bornTimeTxt").html($("#ddlBirthHour option:selected").html());
    });
    $("#ddlBirthHour").val("24");
    $("#ddlBirthHour").trigger("change");
    $(".marrigeSelect").click(function () {
        $(".marrigeIcon").removeClass("active");
        $(this).find(".marrigeIcon").addClass("active");
        if($(this).hasClass("marriedSelect")){
            marriage=0;
        }
        else if($(this).hasClass("marrigeSelect")){
            marriage=1;
        }
    });
});
var sex=0;
var marriage=1;
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
    if ("mingli_zwqm_data" in localStorage) {
        originalAllObj.zwqm = JSON.parse(localStorage.getItem("mingli_zwqm_data"));
    }
    var originalObj = originalAllObj.zwqm || originalAllObj.native_jryc || originalAllObj.native_usercenter;
    if(originalObj.name&&originalObj.name.length!==0){
        $(".nameTxt").val(originalObj.name);
    }
    if(originalObj.ethnic&&originalObj.ethnic.length!==0){
        $(".ethnicTxt").val(originalObj.ethnic);
    }
    if(originalObj.sex!=undefined&&parseInt(originalObj.sex)!==-1){
        sex=parseInt(originalObj.sex);
        if(sex===0){
            $(".manSexSelect .sexIcon").removeClass("active");
            $(".womanSexSelect .sexIcon").addClass("active");
        }
        else{
            $(".manSexSelect .sexIcon").addClass("active");
            $(".womanSexSelect .sexIcon").removeClass("active");
        }
    }
    if(originalObj.date&&originalObj.date.length!==0){
        var year=(originalObj.date.substring(0,4)),month=(originalObj.date.substring(5,7)),day=(originalObj.date.substring(8,10));
        $(".bornDate").val("公历 "+year+"年"+month+"月"+day+"日");
        $('.bornDate').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
    }
    if(originalObj.time&&originalObj.time.length!==0){
        var hour=originalObj.time.substr(0,2);
        $("#ddlBirthHour").val(hour);
        $("#ddlBirthHour").trigger("change");
    }
    if(originalObj.marriage!=undefined&&parseInt(originalObj.marriage)!==-1){
        marriage=parseInt(originalObj.marriage);
        if(marriage===0){
            $(".marrigeSelect1 .marrigeIcon").removeClass("active");
            $(".marriedSelect .marrigeIcon").addClass("active");
        }
        else{
            $(".marrigeSelect1 .marrigeIcon").addClass("active");
            $(".marriedSelect .marrigeIcon").removeClass("active");
        }
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
    if(originalObj.familyDesc&&originalObj.familyDesc.length!==0){
        $(".familyTxa").val(originalObj.familyDesc);
        $(".familyTxa").removeClass("multipleLinePlaceholder");
    }
    if(originalObj.otherRequest&&originalObj.otherRequest.length!==0){
        $(".otherTxa").val(originalObj.otherRequest);
    }
}