var pageObj = (function () {
    return {
        api: {
            createOrder: "/numberology/NRLorder/CreatejpOrder?",
            getResult: "/numberology/tools/bzcs_result.html?orderid="
        },
        page:{
            history: "/numberology/bzcs_history.html?userId=wnl_test&deviceId=&mac=&imei="
        }
    };
})();
$(function () {
    var bornDate="";


    FastClick.attach(document.body);
    $(".solarBtn").click(function () {
        $(".lunarSelectContent input").removeClass("active");
        $(this).addClass("active");
        $(".sDateContent").removeClass("hidden");
        $(".lDateContent").addClass("hidden");
    });
    $(".lunarBtn").click(function () {
        $(".lunarSelectContent input").removeClass("active");
        $(this).addClass("active");
        $(".lDateContent").removeClass("hidden");
        $(".sDateContent").addClass("hidden");
    });
    var sYearSelect=$(".sYearSelect"),sMonthSelect=$(".sMonthSelect"),sDaySelect=$(".sDaySelect");
    var lYearSelect=$(".lYearSelect"),lMonthSelect=$(".lMonthSelect"),lDaySelect=$(".lDaySelect");
    sYearSelect.change(function(){
        var selectedOption=$(".sYearSelect option:selected");
        $(".sYearUISelect .selectTxt").html(selectedOption.html());
        var selectedYear=parseInt(sYearSelect.val());
        var selectedMonth=parseInt(sMonthSelect.val());
        var selectedDay=parseInt(sDaySelect.val());
        var sMonthDayCount=new Date(selectedYear,selectedMonth+1,0).getDate();
        sDaySelect.empty();
        for (var ld = 1; ld < sMonthDayCount + 1; ld++) {
            sDaySelect.append("<option value='" + ld + "' >" + ld + "日</option> ");
        }
        sDaySelect.val(selectedDay>sMonthDayCount?1:selectedDay);
        sDaySelect.trigger("change");
    });
    sMonthSelect.change(function () {
        var selectedOption=$(".sMonthSelect option:selected");
        var selectedHtml= selectedOption.html();
        $(".sMonthUISelect .selectTxt").html(selectedHtml);
        var selectedYear=parseInt(sYearSelect.val());
        var selectedMonth=parseInt(sMonthSelect.val());
        var selectedDay=parseInt(sDaySelect.val());
        var sMonthDayCount=new Date(selectedYear,selectedMonth+1,0).getDate();
        sDaySelect.empty();
        for (var ld = 1; ld < sMonthDayCount + 1; ld++) {
            sDaySelect.append("<option value='" + ld + "' >" + ld + "日</option> ");
        }
        sDaySelect.val(selectedDay>sMonthDayCount?1:selectedDay);
        sDaySelect.trigger("change");
    });
    sDaySelect.change(function () {
        var selectedOption=$(".sDaySelect option:selected");
        $(".sDayUISelect .selectTxt").html(selectedOption.html());
    });
    lYearSelect.change(function () {
        var selectedOption=$(".lYearSelect option:selected");
        $(".lYearUISelect .selectTxt").html(selectedOption.html());
        var selectedYear=parseInt(lYearSelect.val());
        var selectedMonth=parseInt(lMonthSelect.val());
        var leapmonth=leapMonth(selectedYear);
        if(selectedMonth===13&&leapmonth===0){
            selectedMonth=1;
        }
        lMonthSelect.empty();
        for(var i=1;i<13;i++){
            lMonthSelect.append('<option value="'+i+'">'+monthName[i-1]+'</option>');
            if(i===leapmonth){
                lMonthSelect.append('<option value="13">闰'+monthName[i-1]+'</option>');
            }
        }
        lMonthSelect.val(selectedMonth);
        lMonthSelect.trigger("change");
    });
    lMonthSelect.change(function () {
        var selectedOption=$(".lMonthSelect option:selected");
        var selectedHtml= selectedOption.html();
        selectedHtml=selectedHtml.length>2?selectedHtml.substr(0,selectedHtml.length-1):selectedHtml;
        $(".lMonthUISelect .selectTxt").html(selectedHtml);
        var selectedYear=parseInt(lYearSelect.val());
        var selectedMonth=parseInt(lMonthSelect.val());
        var selectedDay=parseInt(lDaySelect.val());
        var selectedLunarDayCounts = monthDays(selectedYear, selectedMonth);
        lDaySelect.empty();
        for (var ld = 1; ld < selectedLunarDayCounts + 1; ld++) {
            lDaySelect.append("<option value='" + ld + "' >" + cDay(ld) + "</option> ");
        }
        lDaySelect.val(selectedDay>selectedLunarDayCounts?1:selectedDay);
        lDaySelect.trigger("change");
    });
    lDaySelect.change(function () {
        var selectedOption=$(".lDaySelect option:selected");
        $(".lDayUISelect .selectTxt").html(selectedOption.html());
    });
    var dateNow=new Date();
    //dateNow.setDate(dateNow.getDate()+2);
    var nowYear=dateNow.getFullYear();
    var nowMonth=dateNow.getMonth();
    var nowDay=dateNow.getDate();
    sYearSelect.empty();
    for(var i=1900;i<=2050;i++){
        sYearSelect.append('<option value="'+i+'">'+i+'年</option>')
    }
    sYearSelect.val(nowYear);
    sMonthSelect.empty();
    for(var i=1;i<13;i++){
        sMonthSelect.append('<option value="'+(i-1)+'">'+i+'月</option>');
    }
    sMonthSelect.val(nowMonth);
    var sMonthDayCount=new Date(nowYear,nowMonth+1,0).getDate();
    sDaySelect.empty();
    for (var ld = 1; ld < sMonthDayCount + 1; ld++) {
        sDaySelect.append("<option value='" + ld + "' >" + ld + "日</option> ");
    }
    sDaySelect.val(nowDay);
    sYearSelect.trigger("change");
    sMonthSelect.trigger("change");
    sDaySelect.trigger("change");
    var lunarDate= new Lunar(dateNow);
    lYearSelect.empty();
    for(var i=1900;i<=2050;i++){
        lYearSelect.append('<option value="'+i+'">'+i+'年</option>')
    }
    lYearSelect.val(lunarDate.year);
    var monthselected = lunarDate.month;
    if (lunarDate.isLeap) {
        monthselected = "13";
    }
    var leapmonth=leapMonth(lunarDate.year);
    lMonthSelect.empty();
    for(var i=1;i<13;i++){
        lMonthSelect.append('<option value="'+i+'">'+monthName[i-1]+'</option>');
        if(i===leapmonth){
            lMonthSelect.append('<option value="13">闰'+monthName[i-1]+'</option>');
        }
    }
    lMonthSelect.val(monthselected);
    var selectedLunarDayCounts = monthDays(lunarDate.year, lunarDate.month);
    lDaySelect.empty();
    for (var ld = 1; ld < selectedLunarDayCounts + 1; ld++) {
        lDaySelect.append("<option value='" + ld + "' >" + cDay(ld) + "</option> ");
    }
    lDaySelect.val(lunarDate.day);
    lYearSelect.trigger("change");
    lMonthSelect.trigger("change");
    lDaySelect.trigger("change");
    $(".dateConfirmBtn").click(function () {
        var dateString="";
        if($(".solarBtn").hasClass("active")){
            var beginSYear=parseInt($(".sYearSelect").val());
            var beginSMonth=parseInt($(".sMonthSelect").val())+1;
            var beginSDay=parseInt($(".sDaySelect").val());
            dateString=beginSYear.toString()+"-"+(beginSMonth<10?("0"+beginSMonth):beginSMonth)+"-"+(beginSDay<10?("0"+beginSDay):beginSDay);
        }
        else{
            var beginLYear=parseInt($(".lYearSelect").val());
            var beginLMonth=parseInt($(".lMonthSelect").val());
            var beginLDay=parseInt($(".lDaySelect").val());
            var sDate=GetSolarDateFromLunar(beginLYear,beginLMonth,beginLDay);
            dateString=sDate.getFullYear().toString()+"-"+((sDate.getMonth()+1)<10?("0"+(sDate.getMonth()+1)):(sDate.getMonth()+1))+"-"+(sDate.getDate()<10?("0"+sDate.getDate()):sDate.getDate());
        }
        bornDate=dateString;
        $("#spBirthDate").html("公历 "+dateString);
    });



    $("#descModal .modal-body").height($("#descModal").height()-45-51);
    var sex=1;//男
    var bornTime="-1";
    $(".bornDate").click(function () {
        $("#datePickModal").modal();
    });
    $("#ddlBirthHour").change(function () {
        bornTime=$(this).val();
        $(".bornTimeTxt").html($("#ddlBirthHour option:selected").html());
    });
    $(".sexSelect").click(function () {
        $(".sexIcon").removeClass("active");
        $(this).find(".sexIcon").addClass("active");
        if($(this).hasClass("manSexSelect")){
            sex=1;
        }
        else if($(this).hasClass("womanSexSelect")){
            sex=0;
        }
    });
    var userId=getQueryString("userId"),
        deviceId=getQueryString("deviceId"),
        mac=getQueryString("mac"),
        imei=getQueryString("imei");
    $("#btnMeasure").click(function () {
        var name=$("#txtName").val().trim();
        if(name.length===0){
            $("#tipModal").modal({showString:"请填写您的姓名"});
            return false;
        }
        if(bornDate.length===0){
            $("#tipModal").modal({showString:"请选择您的出生日期"});
            return false;
        }
        if(bornTime==="-1"){
            $("#tipModal").modal({showString:"请选择您的出生时间"});
            return false;
        }
        var prm = {
            name: name,
            birth: bornDate + ' ' + bornTime + ':00:00',
            sex: sex,
            userId: userId,
            deviceId: deviceId,
            mac: mac,
            imei: imei
            //userId: "wnl_test",
            //deviceId: "device_id_qwert",
            //mac: "00:11:22:33:44:55",
            //imei: "imei_asdfg"
        };

        $.ajax({
            cache: false,
            type: "GET",
            dataType: "json",
            url: pageObj.api.createOrder + $.param(prm),
            success: function (result) {
                if (result.status == 0) {
                    window.location.href = pageObj.api.getResult + result.data;
                }
                else {
                    alert("创建订单错误,错误信息为" + result.msg);
                }
            },
            error: function (xhr, ajaxOperation, throwErr) {
                debugger;
                return;
            }
        })
    });
    $("#btnRecords").click(function () {
        window.location.href = "bzcs_history.html?userId="+userId+"&deviceId="+deviceId+"&mac="+mac+"&imei="+imei;
    });
    $(".infoIntroContent").click(function () {
       $("#descModal").modal();
    });
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
});