var localTag="";
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


    $(".subtitleTxt1").click(function () {
        $("#tipModal1").modal();
    });


    if($(window).width()<=320&&$(".multipleLinePlaceholder").css("height")!=="90px"){
        $(".multipleLinePlaceholder").css("height","90px");
    }

    var ua = window.navigator.userAgent;
    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
    var deviceIsAndroid = ua.match(/Android/i) ? true : false;
    if(deviceIsIOS){
        $(".descTitleTxt").css("padding-bottom","0");
        localStorage.setItem("clientType",'Youloft_IOS')
    }
    if(deviceIsAndroid) {
        localStorage.setItem("clientType","Youloft_Android")
    }
    if(!deviceIsIOS && !deviceIsAndroid) {
        localStorage.setItem("clientType","other")
    }
    var versioncode=getQueryString("versioncode");
    if(versioncode){
        localStorage.setItem("versioncode",versioncode);
    }
    localTag=$(".tagDom").html();
    location.href="protocol://getuserinfo#userinfocallback";
    //else{
    //    localStorage.removeItem("versioncode");
    //}

    var submitUrl="/mingli/interface/createordernew";
    var price=parseInt($(".selectSelect2").data("price"));
    var purposeId=$(".selectSelect2").data("purposeid");
    var source=$(".selectSelect2").data("source");
    var goodsId;
    // goodsId = "7C55ABAD7F8F4BE2A7744F8578196E44";  //测试用goodsId

    var submitObject;
    var clientObj={};

    $(".selectSelect").click(function () {
        $(".selectIcon").removeClass("active");
        $(this).find(".selectIcon").addClass("active");
        price=parseInt($(this).data("price"));
        purposeId=$(this).data("purposeid");
    });

    switch (purposeId) {
        case "C2":
            goodsId = "65A5541F040A4CBB94F4E7A44EAD8B19";
            break;
        case "B12":
            goodsId = "5345ED8EE7084221BC283E269D7A1FEC";
            break;
        case "C3":
            goodsId = "18F28608445049DF8642FBC29EFA6D2D";
            break;
        case "B13":
            goodsId = "5D69636DEA9D40A5B39D03BF39974F16";
            break;
        case "C6":
            goodsId = "5C6352E468B449BE876FB7DDB59975D9";
            break;
        case "B16":
            goodsId = "6D4F750699884AE0B58F5063F9A92869";
            break;
        case "C7":
            goodsId = "49293006E9B347C59EE21DD69FAB9AD3";
            break;
        case "B17":
            goodsId = "02521103434C4AFB8279C5BDEAB1404A";
            break;
        case "C5":
            goodsId = "0FE1FDB632654AF28976A7276BB28AFB";
            break;
        case "B15":
            goodsId = "E1969F27B6CA4375A8D8F6551C6A7D2F";
            break;
        case "A1":
            goodsId = "931BD0493BA944DEAC5E14731DFA9091";
            break;
        case "A4":
            goodsId = "81BA0FE0E1E9444C93A0EB97DFA4A5DA";
            break;
        case "A2":
            goodsId = "DECFD72B6F1045F7908BC71938F8FF3F";
            break;
        case "A3":
            goodsId = "19027B3EA47F4F03BAB222280F760C1B";
            break;
        case "C11":
            goodsId = "FCD4FBE10C34435DACC981798E11DA1D";
            break;
        case "B111":
            goodsId = "0915F3DBF7A14FB69F737B446E24DB6E";
            break;
        case "C1":
            goodsId = "C0026D2233AB404FBE4AC68F93C09F75";
            break;
        case "B11":
            goodsId = "EC8EAAAB561B473B88C36FC03D901C4B";
            break;
        case "C4":
            goodsId = "EEBC6A5B397C4E10B5BF32349691E581";
            break;
        case "B14":
            goodsId = "FE0616F0244D496D9B0D07C9C9D74FEF";
            break;
        case "C9":
            goodsId = "03F2D365A6A54D71922133A6F31626EC";
            break;
        case "B19":
            goodsId = "15B8EE8E373249158E8627F5A80B66D0";
            break;
        case "C8":
            goodsId = "4595A12ABFA24A48B4A1D056E3479CE5";
            break;
        case "B18":
            goodsId = "EC801B42C2304BE698C71527094235E4";
            break;
        case "C10":
            goodsId = "B3D6C30061C045A9B91AB7222368530B";
            break;
        case "B110":
            goodsId = "6343E3ADBFBA4C1D8B8F52FF86175B3B";
            break;
    }

    // goodsId = "7C55ABAD7F8F4BE2A7744F8578196E44";  //测试用goodsId

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
        localStorage.setItem(localTag,JSON.stringify(localObj));

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
    $(document).on('click','.back_btn, .bg_mask',function () {
        $(".bg_mask").addClass("hidden");
        $('.pop_outbox').addClass('hidden');
    });
    $(document).on('click','.submit_btn',function () {
        var pushToken=localStorage["pushToken"]||getQueryString("pushToken");
        var deviceMacId=localStorage["deviceMacId"]||getQueryString("mac");
        var wnlUserId=localStorage["wnlUserId"]||getQueryString("userId");
        var appver=localStorage["appver"]||getQueryString("appver");   //appversion
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
    localTag=$(".tagDom").html();
    if (localTag in localStorage) {
        originalAllObj[localTag] = JSON.parse(localStorage.getItem(localTag));
    }
    var originalObj = originalAllObj[localTag] || originalAllObj.native_jryc || originalAllObj.native_usercenter;
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
    if(originalObj.marriage&&parseInt(originalObj.marriage)!==-1){
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
