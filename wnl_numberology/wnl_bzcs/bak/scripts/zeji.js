(function($){
    handleFocus = function(){
        var $this = $(this);
        if($this.val() === $this.attr('placeholdernl')){
            $this.val('');
            $this.css('color', '');
        }
    };
    handleBlur = function(){
        var $this = $(this);
        if($this.val() == ''){
            $this.val($this.attr('placeholdernl'));
            $this.css('color', 'gray');
        }
    };
    $('textarea[placeholdernl]').each(function(){
        var $this = $(this),
            value = $this.val(),
            placeholder = $this.attr('placeholder');
        $this.attr('placeholdernl', value ? value : placeholder);
        $this.val('');
        $this.focus(handleFocus).blur(handleBlur).trigger('blur');
    });
})(jQuery);
$(function(){
    var versioncode=localStorage["versioncode"];
    if(versioncode){
        $(".top").addClass("hidden");
        $(".main").css("top", "10px");
    }
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
    dateNow.setDate(dateNow.getDate()+2);
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
    $(".pickConfirmBtn").click(function () {
        var dateString="";
        if($(".solarBtn").hasClass("active")){
            var beginSYear=parseInt($(".sYearSelect").val());
            var beginSMonth=parseInt($(".sMonthSelect").val())+1;
            var beginSDay=parseInt($(".sDaySelect").val());
            dateString=beginSYear.toString()+(beginSMonth<10?("0"+beginSMonth):beginSMonth)+(beginSDay<10?("0"+beginSDay):beginSDay);
        }
        else{
            var beginLYear=parseInt($(".lYearSelect").val());
            var beginLMonth=parseInt($(".lMonthSelect").val());
            var beginLDay=parseInt($(".lDaySelect").val());
            var sDate=GetSolarDateFromLunar(beginLYear,beginLMonth,beginLDay);
            dateString=sDate.getFullYear().toString()+((sDate.getMonth()+1)<10?("0"+(sDate.getMonth()+1)):(sDate.getMonth()+1))+(sDate.getDate()<10?("0"+sDate.getDate()):sDate.getDate());
        }
        var tag=$(this).data("tag");
        var returnObj={
            "tag":tag,
            "value":dateString
        };
        selectedDateFromNative(returnObj)
    });






    FastClick.attach(document.body);
    $("a").bind('taphold', function(event) {
        event.preventDefault();
    });
    $(".backBtn1").click(function(){
        history.go(-1);
    });
    if (!versioncode&&!is_iOS7()) {
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
    $("select").on("click",function(event){
        event.stopPropagation();
    });
    $("select").on("touchstart",function(event){
        event.stopPropagation();
    });
    var submitUrl="/mingli/interface/createorder";
    var zejiLocalData={},globalLocalData={},isSameName=false;
    //开始日期点击
    $(".beginRangeDateUISelect").click(function(){
        var url="";
        if(beginDate.length===0){
            var date=new Date();
            date.setDate(date.getDate()+2);
            var nowYear=date.getFullYear();
            var nowMonth=date.getMonth()+1;
            var nowDay=date.getDate();
            //url="protocol://PickDate:"+nowYear+(nowMonth<10?"0"+nowMonth:nowMonth)+(nowDay<10?"0"+nowDay:nowDay)+"#1";
            url=nowYear.toString()+(nowMonth<10?"0"+nowMonth:nowMonth)+(nowDay<10?"0"+nowDay:nowDay)+"#1";
        }
        else{
            //url="protocol://PickDate:"+beginDate+"#1";
            url=beginDate+"#1";
        }
        //document.location = url;
        datepickerModal(url);
    });
    //结束日期点击
    $(".endRangeDateUISelect").click(function(){
        var url="";
        if(endDate.length===0){
            var date=new Date();
            date.setDate(date.getDate()+2);
            var nowYear=date.getFullYear();
            var nowMonth=date.getMonth()+1;
            var nowDay=date.getDate();
            //url="protocol://PickDate:"+nowYear+(nowMonth<10?"0"+nowMonth:nowMonth)+(nowDay<10?"0"+nowDay:nowDay)+"#2";
            url=nowYear.toString()+(nowMonth<10?"0"+nowMonth:nowMonth)+(nowDay<10?"0"+nowDay:nowDay)+"#2";
        }
        else{
            //url="protocol://PickDate:"+endDate+"#2";
            url=endDate+"#2";
        }
        //document.location = url;
        datepickerModal(url);
    });
    var price= 50,purposeId="A1";
    //类别按钮
    $(".qiaoqianBtn").click(function(){
        if(!$(this).hasClass("active")){
            price=50;
            purposeId="A1";
            $(".zejiCatgory input").removeClass("active");
            $(this).addClass("active");
            $(".categoryContent").addClass("hidden");
            $(".qiaoqianContent").removeClass("hidden");
        }
    });
    $(".kaizhangBtn").click(function(){
        if(!$(this).hasClass("active")){
            price=188;
            purposeId="A3";
            $(".zejiCatgory input").removeClass("active");
            $(this).addClass("active");
            $(".categoryContent").addClass("hidden");
            $(".kaizhangContent").removeClass("hidden");
        }
    });
    $(".chuxingBtn").click(function(){
        if(!$(this).hasClass("active")){
            price=50;
            purposeId="A2";
            $(".zejiCatgory input").removeClass("active");
            $(this).addClass("active");
            $(".categoryContent").addClass("hidden");
            $(".chuxingContent").removeClass("hidden");
        }
    });
    $(".hehunBtn").click(function(){
        if(!$(this).hasClass("active")){
            price=188;
            purposeId="A4";
            $(".zejiCatgory input").removeClass("active");
            $(this).addClass("active");
            $(".categoryContent").addClass("hidden");
            $(".hehunContent").removeClass("hidden");
        }
    });

    //乔迁
    //乔迁男主人出生日期点击
    $(".qiaoqianMaleBornDateUISelect").click(function(){
        var url="";
        if(qiaoqianMaleBornDate.length===0){
            url="19800615#3";
        }
        else{
            url=qiaoqianMaleBornDate+"#3";
        }
        datepickerModal(url);
    });
    //乔迁男主人设置出生时间
    var qiaoqianMaleBornTime="-1";
    var qiaoqianMaleBornTimeSelect=$(".qiaoqianMaleBornTimeSelect");
    qiaoqianMaleBornTimeSelect.append("<option value='24'>不详</option>");
    for(var i=0;i<=23;i++){
        qiaoqianMaleBornTimeSelect.append("<option value='"+i+"'>"+(i+"点")+"</option>");
    }
    //乔迁男主人出生时间选择改变事件
    qiaoqianMaleBornTimeSelect.change(function(){
        var selectOption=$(this).children("option:selected");
        qiaoqianMaleBornTime=selectOption.val();
        $(".qiaoqianMaleBornTimeUISelect span").html(selectOption.html());
        return false;
    });
    //乔迁女主人出生日期点击
    $(".qiaoqianFemaleBornDateUISelect").click(function(){
        var url="";
        if(qiaoqianFemaleBornDate.length===0){
            url="19800615#4";
        }
        else{
            url=qiaoqianFemaleBornDate+"#4";
        }
        datepickerModal(url);
    });
    //乔迁女主人设置出生时间
    var qiaoqianFemaleBornTime="-1";
    var qiaoqianFemaleBornTimeSelect=$(".qiaoqianFemaleBornTimeSelect");
    qiaoqianFemaleBornTimeSelect.append("<option value='24'>不详</option>");
    for(var i=0;i<=23;i++){
        qiaoqianFemaleBornTimeSelect.append("<option value='"+i+"'>"+(i+"点")+"</option>");
    }
    //乔迁女主人出生时间选择改变事件
    qiaoqianFemaleBornTimeSelect.change(function(){
        var selectOption=$(this).children("option:selected");
        qiaoqianFemaleBornTime=selectOption.val();
        $(".qiaoqianFemaleBornTimeUISelect span").html(selectOption.html());
        return false;
    });
    //乔迁确定按钮
    function qiaoqianSubmit(){
        //男主人姓名
        var qiaoqianMaleName=$(".qiaoqianMaleNameTxt").val().trim();
        //男主人出生日期
        //todo 出生日期模拟
//        qiaoqianMaleBornDate="20140714";
        //女主人姓名
        var qiaoqianFemaleName=$(".qiaoqianFemaleNameTxt").val().trim();
        if(qiaoqianMaleName.length===0&&qiaoqianFemaleName.length===0){
            $("#tipModal").modal({showString:"请至少输入一位主人的姓名"});
            return false;
        }
        if(qiaoqianMaleName.length!==0){
            zejiLocalData.qiaoqianMaleName=qiaoqianMaleName;
        }
        if(qiaoqianFemaleName.length!==0){
            zejiLocalData.qiaoqianFemaleName=qiaoqianFemaleName;
        }
        //女主人出生日期
        //todo 出生日期模拟
//        qiaoqianFemaleBornDate="2014-7-14";
        if(qiaoqianMaleBornDate===""&&qiaoqianFemaleBornDate===""){
            $("#tipModal").modal({showString:"请至少选择一位主人的出生日期"});
            return false;
        }
        if(qiaoqianMaleBornDate!==""){
            zejiLocalData.qiaoqianMaleBornDate=qiaoqianMaleBornDate;
        }
        if(qiaoqianFemaleBornDate!==""){
            zejiLocalData.qiaoqianFemaleBornDate=qiaoqianFemaleBornDate;
        }
        //女主人出生时间
        if(qiaoqianMaleBornTime==="-1"&&qiaoqianFemaleBornTime==="-1"){
            $("#tipModal").modal({showString:"请至少选择一位主人的出生时间"});
            return false;
        }
        if(qiaoqianMaleBornTime!=="-1"){
            zejiLocalData.qiaoqianMaleBornTime=qiaoqianMaleBornTime;
        }
        if(qiaoqianFemaleBornTime!=="-1"){
            zejiLocalData.qiaoqianFemaleBornTime=qiaoqianFemaleBornTime;
        }
        //宅屋坐向
        var zuoxiang=$(".zuoxiangTxt").val().trim();
        if(zuoxiang.length===0){
            $("#tipModal").modal({showString:"请填写宅屋坐向"});
            return false;
        }
        //其他家庭成员生辰信息
        var familyBornTime=$(".familyBornTimeTxa").val().trim();
        familyBornTime=familyBornTime.indexOf("提示：")>-1?"":familyBornTime;
        if(familyBornTime.length===0){
            $("#tipModal").modal({showString:"请填写其他家庭成员生辰信息"});
            return false;
        }
        zejiLocalData.familyDesc=familyBornTime;
        //其他要求
        var otherRequest=$(".otherRequestTxa").val().trim();
        var submitObject={
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
        var pushToken=localStorage["pushToken"];
        var deviceMacId=localStorage["deviceMacId"];
        var wnlUserId=localStorage["wnlUserId"];
        var appver=localStorage["appver"];
        var idfa=localStorage["idfa"];
        var gid=localStorage["gid"];
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
                gid:gid
            },
            dataType: 'json',
            success: function(data){
                $(".mask").addClass("hidden");
                if(data.status=="0"){
                    window.location.href="orderDetail.html"+"?id="+data.msg;
                }
                else{
                    $("#tipModal").modal({showString:data.msg});      //待约定错误代码
                }
            },
            error: function(xhr, type,error){
                $(".mask").addClass("hidden");
                $("#tipModal").modal({showString:"服务器错误,请重试"});
            }
        })
    }

    //公司开张
    //公司开张性别改变事件
    var kaizhangSex="-1";
    $(".kaizhangSexSelect").change(function(){
        var selectOption=$(this).children("option:selected");
        kaizhangSex=selectOption.val();
        $(".kaizhangSexUISelect span").html(selectOption.html());
        return false;
    });
    //公司开张出生日期点击
    $(".kaizhangBornDateUISelect").click(function(){
        var url="";
        if(kaizhangBornDate.length===0){
            url="19800615#5";
        }
        else{
            url=kaizhangBornDate+"#5";
        }
        datepickerModal(url);
    });
    //公司开张设置出生时间
    var kaizhangBornTime="-1";
    var kaizhangBornTimeSelect=$(".kaizhangBornTimeSelect");
    kaizhangBornTimeSelect.append("<option value='24'>不详</option>");
    for(var i=0;i<=23;i++){
        kaizhangBornTimeSelect.append("<option value='"+i+"'>"+i+"</option>");
    }
    //公司开张出生时间选择改变事件
    kaizhangBornTimeSelect.change(function(){
        var selectOption=$(this).children("option:selected");
        kaizhangBornTime=selectOption.val();
        $(".kaizhangBornTimeUISelect span").html(selectOption.html());
        return false;
    });
    function kaizhangSubmit(){
        //姓名
        var kaizhangName=$(".kaizhangNameTxt").val().trim();
        if(kaizhangName.length===0){
            $("#tipModal").modal({showString:"请填写主营业者姓名"});
            return false;
        }
        zejiLocalData.kaizhangName=kaizhangName;
//        if(!isNameChange&&!globalLocalData.name){
//            globalLocalData.name=kaizhangName;
//        }
        if(kaizhangName===globalLocalData.name){
            isSameName=true;
        }
        //性别
        if(kaizhangSex==="-1"){
            $("#tipModal").modal({showString:"请选择主营业者性别"});
            return false;
        }
        zejiLocalData.kaizhangSex=kaizhangSex;
        if(isSameName&&!globalLocalData.sex){
            globalLocalData.sex=kaizhangSex;
        }
        //todo 出生日期模拟
//        kaizhangBornDate="20140712";
        if(kaizhangBornDate.length===0){
            $("#tipModal").modal({showString:"请选择主营业者出生日期"});
            return false;
        }
        zejiLocalData.kaizhangBornDate=kaizhangBornDate;
        if(isSameName&&!globalLocalData.bornDate){
            globalLocalData.bornDate=kaizhangBornDate;
        }
        //出生时间
        if(kaizhangBornTime==="-1"){
            $("#tipModal").modal({showString:"请选择营业者出生时间"});
            return false;
        }
        zejiLocalData.kaizhangBornTime=kaizhangBornTime;
        if(isSameName&&!globalLocalData.bornTime){
            globalLocalData.bornTime=kaizhangBornTime;
        }
        //公司/商铺座向
        var gongsiZuoxiang=$(".gongsiZuoxiangTxt").val().trim();
        if(gongsiZuoxiang.length===0){
            $("#tipModal").modal({showString:"请填写公司/商铺座向"});
            return false;
        }
        //其他合作人生辰资料
        var partnerBornTime=$(".partnerBornTimeTxa").val().trim();
        partnerBornTime=partnerBornTime.indexOf("提示 如：某某")>-1?"":partnerBornTime;
        //其他要求
        var otherRequest=$(".otherRequestTxa").val().trim();
        var submitObject={
            name:contactName,
            contactTel:contactTel,
            beginDate:beginDate,
            endDate:endDate,
            purposeId:purposeId,
            kaizhangName:kaizhangName,
            kaizhangSex:kaizhangSex,
            kaizhangBornDate:kaizhangBornDate,
            kaizhangBornTime:kaizhangBornTime,
            gongsiZuoxiang:gongsiZuoxiang,
            partnerBornTime:partnerBornTime,
            otherRequest:otherRequest,
            price:price
        };
        var pushToken=localStorage["pushToken"];
        var deviceMacId=localStorage["deviceMacId"];
        var wnlUserId=localStorage["wnlUserId"];
        var appver=localStorage["appver"];
        var idfa=localStorage["idfa"];
        var gid=localStorage["gid"];
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
                gid:gid
            },
            dataType: 'json',
            success: function(data){
                $(".mask").addClass("hidden");
                if(data.status=="0"){
                    window.location.href="orderDetail.html"+"?id="+data.msg;
                }
                else{
                    $("#tipModal").modal({showString:data.msg});      //待约定错误代码
                }
            },
            error: function(xhr, type,error){
                $(".mask").addClass("hidden");
                $("#tipModal").modal({showString:"服务器错误,请重试"});
            }
        })
    }
    //出行动身
    //出行动身性别改变事件
    var chuxingSex="-1";
    $(".chuxingSexSelect").change(function(){
        var selectOption=$(this).children("option:selected");
        chuxingSex=selectOption.val();
        $(".chuxingSexUISelect span").html(selectOption.html());
        return false;
    });
    //出行动身出生日期点击
    $(".chuxingBornDateUISelect").click(function(){
        var url="";
        if(chuxingBornDate.length===0){
            url="19800615#6";
        }
        else{
            url=chuxingBornDate+"#6";
        }
        datepickerModal(url);
    });
    //出行动身设置出生时间
    var chuxingBornTime="-1";
    var chuxingBornTimeSelect=$(".chuxingBornTimeSelect")
    chuxingBornTimeSelect.append("<option value='24'>不详</option>");
    for(var i=0;i<=23;i++){
        chuxingBornTimeSelect.append("<option value='"+i+"'>"+(i+"点")+"</option>");
    }
    //出行动身出生时间选择改变事件
    chuxingBornTimeSelect.change(function(){
        var selectOption=$(this).children("option:selected");
        chuxingBornTime=selectOption.val();
        $(".chuxingBornTimeUISelect span").html(selectOption.html());
        return false;
    });
    var bornPrivince="",bornCity="",bornCountry="";
    var chuxingPrivince="",chuxingCity="",chuxingCountry="";
    
    var chuxingCitySelectData;
    //出生省级下拉选择改变事件
    $(".bornProvinceSelect").change(function(){
        var selectedOption=$(this).children("option:selected");
        var fileName=selectedOption.val();
        if(parseInt(fileName)===-1){
            return false;
        }
        zejiLocalData.provinceCode=fileName;
        globalLocalData.provinceCode=fileName;
        $(".bornProvinceUISelect span").html(selectedOption.html());
        bornPrivince=selectedOption.html();
        $(".bornCityUISelect span").html("出生城市");
        $(".bornCitySelect").empty();
        $(".bornCountryUISelect span").html("出生区/县");
        $(".bornCountrySelect").empty();
        bornCity="";
        bornCountry="";
        $.ajax({
            url:"../mingli/data/"+fileName+".json",
            type:"get",
            dataType:"json",
            success:function(result){
                chuxingCitySelectData=result;
                $(".bornCitySelect").append("<option value='-1'>请选择</option>");
                $.each(result,function(i){
                    $(".bornCitySelect").append("<option value='"+i+"'>"+this.t+"</option>");
                });
            }
        });
    });
    //出行省级下拉选择改变事件
    $(".goProvinceSelect").change(function(){
        var selectedOption=$(this).children("option:selected");
        var fileName=selectedOption.val();
        if(parseInt(fileName)===-1){
            return false;
        }
        $(".goProvinceUISelect span").html(selectedOption.html());
        chuxingPrivince=selectedOption.html();
        $(".goCityUISelect span").html("出行城市");
        $(".goCitySelect").empty();
        $(".goCountryUISelect span").html("出行区/县");
        $(".goCountrySelect").empty();
        chuxingCity="";
        chuxingCountry="";
        $.ajax({
            url:"../mingli/data/"+fileName+".json",
            type:"get",
            dataType:"json",
            success:function(result){
                chuxingCitySelectData=result;
                $(".goCitySelect").append("<option value='-1'>请选择</option>");
                $.each(result,function(i){
                    $(".goCitySelect").append("<option value='"+i+"'>"+this.t+"</option>");
                })
            }
        });
    });
    //出生市级下拉选择改变事件
    $(".bornCitySelect").change(function(){
        var selectedOption=$(this).children("option:selected");
        var cityIndex=selectedOption.val()==-1?zejiLocalData.cityCode:selectedOption.val();
        if(parseInt(cityIndex)===-1){
            return false;
        }
        zejiLocalData.cityCode=cityIndex;
        globalLocalData.cityCode=cityIndex;
        $(".bornCityUISelect span").html(selectedOption.html());
        bornCity=selectedOption.html();
        $(".bornCountryUISelect span").html("出生区/县");
        bornCountry="";
        var countryData=chuxingCitySelectData[cityIndex];
        $(".bornCountrySelect").empty();
        $(".bornCountrySelect").append("<option value='-1'>请选择</option>");
        if(countryData.s){
            $.each(countryData.s,function(i){
                $(".bornCountrySelect").append("<option value='"+i+"'>"+this.t+"</option>");
            });
        }
    });
    //出行市级下拉选择改变事件
    $(".goCitySelect").change(function(){
        var selectedOption=$(this).children("option:selected");
        var cityIndex=selectedOption.val();
        if(parseInt(cityIndex)===-1){
            return false;
        }
        $(".goCityUISelect span").html(selectedOption.html());
        chuxingCity=selectedOption.html();
        $(".goCountryUISelect span").html("出行区/县");
        chuxingCountry="";
        var countryData=chuxingCitySelectData[cityIndex];
        $(".goCountrySelect").empty();
        $(".goCountrySelect").append("<option value='-1'>请选择</option>");
        if(countryData.s){
            $.each(countryData.s,function(i){
                $(".goCountrySelect").append("<option value='"+i+"'>"+this.t+"</option>");
            })
        }
    });
    //出生县级下拉选择改变事件
    $(".bornCountrySelect").change(function(){
        var selectedOption=$(this).children("option:selected");
        var countryIndex=selectedOption.val();
        if(parseInt(countryIndex)===-1){
            return false;
        }
        zejiLocalData.countryCode=countryIndex;
        globalLocalData.countryCode=countryIndex;
        $(".bornCountryUISelect span").html(selectedOption.html());
        bornCountry=selectedOption.html();
    });
    //出行县级下拉选择改变事件
    $(".goCountrySelect").change(function(){
        var selectedOption=$(this).children("option:selected");
        var countryIndex=selectedOption.val();
        if(parseInt(countryIndex)===-1){
            return false;
        }
        $(".goCountryUISelect span").html(selectedOption.html());
        chuxingCountry=selectedOption.html();
    });
    function chuxingSubmit(){
        //姓名
        var chuxingName=$(".chuxingNameTxt").val().trim();
        if(chuxingName.length===0){
            $("#tipModal").modal({showString:"请填写出行人姓名"});
            return false;
        }
        zejiLocalData.chuxingName=chuxingName;
//        if(!isNameChange&&!globalLocalData.name){
//            globalLocalData.name=chuxingName;
//        }
        if(chuxingName===globalLocalData.name){
            isSameName=true;
        }
        //性别
        if(chuxingSex==="-1"){
            $("#tipModal").modal({showString:"请选择出行人性别"});
            return false;
        }
        zejiLocalData.chuxingSex=chuxingSex;
        if(isSameName&&!globalLocalData.sex){
            globalLocalData.sex=chuxingSex;
        }
        //todo 出生日期模拟
//        chuxingBornDate="20140712";
        if(chuxingBornDate.length===0){
            $("#tipModal").modal({showString:"请选择出行人出生日期"});
            return false;
        }
        zejiLocalData.chuxingBornDate=chuxingBornDate;
        if(isSameName&&!globalLocalData.bornDate){
            globalLocalData.bornDate=chuxingBornDate;
        }
        //出生时间
        if(chuxingBornTime==="-1"){
            $("#tipModal").modal({showString:"请选择出行人出生时间"});
            return false;
        }
        if(isSameName&&!globalLocalData.bornTime){
            globalLocalData.bornTime=chuxingBornTime;
        }
        zejiLocalData.chuxingBornTime=chuxingBornTime;
        //出生地地址
        if(bornCity===""){
            $("#tipModal").modal({showString:"请选择出行人出生地地址"});
            return false;
        }
        zejiLocalData.bornPrivince=bornPrivince;
        if(isSameName&&!globalLocalData.bornPrivince){
            globalLocalData.bornPrivince=bornPrivince;
        }
        zejiLocalData.bornCity=bornCity;
        if(isSameName&&!globalLocalData.bornCity){
            globalLocalData.bornCity=bornCity;
        }
        zejiLocalData.bornCountry=bornCountry;
        if(isSameName&&!globalLocalData.bornCountry){
            globalLocalData.bornCountry=bornCountry;
        }
        //出生地详细地址
        var bornAddress=$(".bornAddressTxt").val().trim();
        zejiLocalData.bornAddress=bornAddress;
        if(isSameName&&!globalLocalData.bornAddress){
            globalLocalData.bornAddress=bornAddress;
        }
        //出行地地址
        if(chuxingCity===""){
            $("#tipModal").modal({showString:"请选择出行人出行地地址"});
            return false;
        }
        //出行地详细地址
        var chuxingAddress=$(".goAddressTxt").val().trim();
        //其他要求
        var otherRequest=$(".otherRequestTxa").val().trim();
        var submitObject={
            name:contactName,
            contactTel:contactTel,
            beginDate:beginDate,
            endDate:endDate,
            purposeId:purposeId,
            chuxingName:chuxingName,
            chuxingSex:chuxingSex,
            chuxingBornDate:chuxingBornDate,
            chuxingBornTime:chuxingBornTime,
            bornAddress:bornPrivince+"-"+bornCity+"-"+bornCountry+"-"+bornAddress,
            goAddress:chuxingPrivince+"-"+chuxingCity+"-"+chuxingCountry+"-"+chuxingAddress,
            otherRequest:otherRequest,
            price:price
        };
        var pushToken=localStorage["pushToken"];
        var deviceMacId=localStorage["deviceMacId"];
        var wnlUserId=localStorage["wnlUserId"];
        var appver=localStorage["appver"];
        var idfa=localStorage["idfa"];
        var gid=localStorage["gid"];
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
                gid:gid
            },
            dataType: 'json',
            success: function(data){
                $(".mask").addClass("hidden");
                if(data.status=="0"){
                    window.location.href="orderDetail.html"+"?id="+data.msg;
                }
                else{
                    $("#tipModal").modal({showString:data.msg});      //待约定错误代码
                }
            },
            error: function(xhr, type,error){
                $(".mask").addClass("hidden");
                $("#tipModal").modal({showString:"服务器错误,请重试"});
            }
        })
    }
    //合婚部分
    var maleBornPrivince="",maleBornCity="",maleBornCountry="";
    var maleBornPrivinceCode,maleBornCityCode,maleBornCountryCode;
    var femaleBornPrivince="",femaleBornCity="",femaleBornCountry="";
    var femaleBornPrivinceCode,femaleBornCityCode,femaleBornCountryCode;
    var citySelectData;

    //男方信息省级下拉选择改变事件
    $(".hehunMaleBornProvinceSelect").change(function(){
        var selectedOption=$(this).children("option:selected");
        var fileName=selectedOption.val();
        if(parseInt(fileName)===-1){
            return false;
        }
        maleBornPrivinceCode=fileName;
        $(".hehunMaleBornProvinceUISelect span").html(selectedOption.html());
        maleBornPrivince=selectedOption.html();
        $(".hehunMaleBornCityUISelect span").html("出生城市");
        $(".hehunMaleBornCountryUISelect span").html("出生区/县");
        maleBornCity="";
        maleBornCountry="";
        $.ajax({
            url:"../mingli/data/"+fileName+".json",
            type:"get",
            dataType:"json",
            success:function(result){
                citySelectData=result;
                $(".hehunMaleBornCitySelect").empty();
                $(".hehunMaleBornCitySelect").append("<option value='-1'>请选择</option>");
                $.each(result,function(i){
                    $(".hehunMaleBornCitySelect").append("<option value='"+i+"'>"+this.t+"</option>");
                })
            }
        });
    });
    //女方信息省级下拉选择改变事件
    $(".hehunFeMaleBornProvinceSelect").change(function(){
        var selectedOption=$(this).children("option:selected");
        var fileName=selectedOption.val();
        if(parseInt(fileName)===-1){
            return false;
        }
        femaleBornPrivinceCode=fileName;
        $(".hehunFeMaleBornProvinceUISelect span").html(selectedOption.html());
        femaleBornPrivince=selectedOption.html();
        $(".hehunFeMaleBornCityUISelect span").html("出生城市");
        $(".hehunFeMaleBornCountryUISelect span").html("出生区/县");
        femaleBornCity="";
        femaleBornCountry="";
        $.ajax({
            url:"../mingli/data/"+fileName+".json",
            type:"get",
            dataType:"json",
            success:function(result){
                citySelectData=result;
                $(".hehunFeMaleBornCitySelect").empty();
                $(".hehunFeMaleBornCitySelect").append("<option value='-1'>请选择</option>");
                $.each(result,function(i){
                    $(".hehunFeMaleBornCitySelect").append("<option value='"+i+"'>"+this.t+"</option>");
                })
            }
        });
    });
    //男方信息市级下拉选择改变事件
    $(".hehunMaleBornCitySelect").change(function(){
        var selectedOption=$(this).children("option:selected");
        var cityIndex=selectedOption.val();
        if(parseInt(cityIndex)===-1){
            return false;
        }
        maleBornCityCode=cityIndex;
        $(".hehunMaleBornCityUISelect span").html(selectedOption.html());
        maleBornCity=selectedOption.html();
        $(".hehunMaleBornCountryUISelect span").html("出生区/县");
        maleBornCountry="";
        var countryData=citySelectData[cityIndex];
        $(".hehunMaleBornCountrySelect").empty();
        $(".hehunMaleBornCountrySelect").append("<option value='-1'>请选择</option>");
        if(countryData.s){
            $.each(countryData.s,function(i){
                $(".hehunMaleBornCountrySelect").append("<option value='"+i+"'>"+this.t+"</option>");
            })
        }
    });
    //女方信息市级下拉选择改变事件
    $(".hehunFeMaleBornCitySelect").change(function(){
        var selectedOption=$(this).children("option:selected");
        var cityIndex=selectedOption.val();
        if(parseInt(cityIndex)===-1){
            return false;
        }
        femaleBornCityCode=cityIndex;
        $(".hehunFeMaleBornCityUISelect span").html(selectedOption.html());
        femaleBornCity=selectedOption.html();
        $(".hehunFeMaleBornCountryUISelect span").html("出生区/县");
        femaleBornCountry="";
        var countryData=citySelectData[cityIndex];
        $(".hehunFeMaleBornCountrySelect").empty();
        $(".hehunFeMaleBornCountrySelect").append("<option value='-1'>请选择</option>");
        if(countryData.s){
            $.each(countryData.s,function(i){
                $(".hehunFeMaleBornCountrySelect").append("<option value='"+i+"'>"+this.t+"</option>");
            })
        }
    });
    //男方信息县级下拉选择改变事件
    $(".hehunMaleBornCountrySelect").change(function(){
        var selectedOption=$(this).children("option:selected");
        var countryIndex=selectedOption.val();
        if(parseInt(countryIndex)===-1){
            return false;
        }
        maleBornCountryCode=countryIndex;
        $(".hehunMaleBornCountryUISelect span").html(selectedOption.html());
        maleBornCountry=selectedOption.html();
    });
    //女方信息县级下拉选择改变事件
    $(".hehunFeMaleBornCountrySelect").change(function(){
        var selectedOption=$(this).children("option:selected");
        var countryIndex=selectedOption.val();
        if(parseInt(countryIndex)===-1){
            return false;
        }
        femaleBornCountryCode=countryIndex;
        $(".hehunFeMaleBornCountryUISelect span").html(selectedOption.html());
        femaleBornCountry=selectedOption.html();
    });
    //合婚男方出生日期点击
    $(".hehunMaleBornDateUISelect").click(function(){
        var url="";
        if(hehunMaleBornDate.length===0){
            url="19800615#7";
        }
        else{
            url=hehunMaleBornDate+"#7";
        }
        datepickerModal(url);
    });
    //合婚男方设置出生时间
    var hehunMaleBornTime="-1";
    var hehunMaleBornTimeSelect=$(".hehunMaleBornTimeSelect");
    hehunMaleBornTimeSelect.append("<option value='24'>不详</option>");
    for(var i=0;i<=23;i++){
        hehunMaleBornTimeSelect.append("<option value='"+i+"'>"+(i+"点")+"</option>");
    }
    //合婚男方出生时间选择改变事件
    hehunMaleBornTimeSelect.change(function(){
        var selectOption=$(this).children("option:selected");
        hehunMaleBornTime=selectOption.val();
        $(".hehunMaleBornTimeUISelect span").html(selectOption.html());
        return false;
    });
    //合婚男方父亲生肖
    var hehunMaleFatherZodiac="";
    $(".hehunMaleFatherYearSelect").change(function(){
        var selectOption=$(this).children("option:selected");
        hehunMaleFatherZodiac=selectOption.html();
        $(".hehunMaleFatherYearUISelect span").html(selectOption.html());
        return false;
    });
    //合婚男方母亲生肖
    var hehunMaleMotherZodiac="";
    $(".hehunMaleMotherYearSelect").change(function(){
        var selectOption=$(this).children("option:selected");
        hehunMaleMotherZodiac=selectOption.html();
        $(".hehunMaleMotherYearUISelect span").html(selectOption.html());
        return false;
    });
    //合婚女方出生日期点击
    $(".hehunFeMaleBornDateUISelect").click(function(){
        var url="";
        if(hehunFeMaleBornDate.length===0){
            url="19800615#8";
        }
        else{
            url=hehunFeMaleBornDate+"#8";
        }
        datepickerModal(url);
    });
    //合婚女方设置出生时间
    var hehunFemaleBornTime="-1";
    var hehunFemaleBornTimeSelect=$(".hehunFeMaleBornTimeSelect");
    hehunFemaleBornTimeSelect.append("<option value='24'>不详</option>");
    for(var i=0;i<=23;i++){
        hehunFemaleBornTimeSelect.append("<option value='"+i+"'>"+(i+"点")+"</option>");
    }
    //合婚女方出生时间选择改变事件
    hehunFemaleBornTimeSelect.change(function(){
        var selectOption=$(this).children("option:selected");
        hehunFemaleBornTime=selectOption.val();
        $(".hehunFeMaleBornTimeUISelect span").html(selectOption.html());
        return false;
    });
    //合婚女方父亲生肖
    var hehunFeMaleFatherZodiac="";
    $(".hehunFeMaleFatherYearSelect").change(function(){
        var selectOption=$(this).children("option:selected");
        hehunFeMaleFatherZodiac=selectOption.html();
        $(".hehunFeMaleFatherYearUISelect span").html(selectOption.html());
        return false;
    });
    //合婚女方母亲生肖
    var hehunFeMaleMotherZodiac="";
    $(".hehunFeMaleMotherYearSelect").change(function(){
        var selectOption=$(this).children("option:selected");
        hehunFeMaleMotherZodiac=selectOption.html();
        $(".hehunFeMaleMotherYearUISelect span").html(selectOption.html());
        return false;
    });
    function hehunSubmit(){
        //男方姓名
        var hehunMaleName=$(".hehunMaleNameTxt").val().trim();
        if(hehunMaleName.length===0){
            $("#tipModal").modal({showString:"请填写男方姓名"});
            return false;
        }
        zejiLocalData.hehunMaleName=hehunMaleName;
        //男方出生日期
        //todo 出生日期模拟
//        hehunMaleBornDate="20140712";
        if(hehunMaleBornDate.length===0){
            $("#tipModal").modal({showString:"请选择男方出生日期"});
            return false;
        }
        zejiLocalData.hehunMaleBornDate=hehunMaleBornDate;
        //男方出生时间
        if(hehunMaleBornTime==="-1"){
            $("#tipModal").modal({showString:"请选择男方出生时间"});
            return false;
        }
        zejiLocalData.hehunMaleBornTime=hehunMaleBornTime;
        //男方出生地址
        if(maleBornCity===""){
            $("#tipModal").modal({showString:"请选择男方出生地址"});
            return false;
        }
        zejiLocalData.maleBornPrivince=maleBornPrivince;
        zejiLocalData.maleBornCity=maleBornCity;
        zejiLocalData.maleBornCountry=maleBornCountry;

        zejiLocalData.maleBornPrivinceCode=maleBornPrivinceCode;
        zejiLocalData.maleBornCityCode=maleBornCityCode;
        zejiLocalData.maleBornCountryCode=maleBornCountryCode;
        //男方出生地详细地址
        var hehunMaleBornAddress=$(".hehunMaleBornAddressTxt").val().trim();
        zejiLocalData.maleBornAddress=hehunMaleBornAddress;
        //男方父亲生肖
        if(hehunMaleFatherZodiac===""){
            $("#tipModal").modal({showString:"请选择男方父亲生肖"});
            return false;
        }
        //男方母亲生肖
        if(hehunMaleMotherZodiac===""){
            $("#tipModal").modal({showString:"请选择男方母亲生肖"});
            return false;
        }
        //女方姓名
        var hehunFeMaleName=$(".hehunFeMaleNameTxt").val().trim();
        if(hehunFeMaleName.length===0){
            $("#tipModal").modal({showString:"请填写女方姓名"});
            return false;
        }
        zejiLocalData.hehunFeMaleName=hehunFeMaleName;
        //女方出生日期
        //todo 出生日期模拟
//        hehunFeMaleBornDate="20140712";
        if(hehunFeMaleBornDate.length===0){
            $("#tipModal").modal({showString:"请选择女方出生日期"});
            return false;
        }
        zejiLocalData.hehunFeMaleBornDate=hehunFeMaleBornDate;
        //女方出生时间
        if(hehunFemaleBornTime==="-1"){
            $("#tipModal").modal({showString:"请选择女方出生时间"});
            return false;
        }
        zejiLocalData.hehunFemaleBornTime=hehunFemaleBornTime;
        //女方出生地址
        if(femaleBornCity===""){
            $("#tipModal").modal({showString:"请选择女方出生地址"});
            return false;
        }
        zejiLocalData.femaleBornPrivince=femaleBornPrivince;
        zejiLocalData.femaleBornCity=femaleBornCity;
        zejiLocalData.femaleBornCountry=femaleBornCountry;

        zejiLocalData.femaleBornPrivinceCode=femaleBornPrivinceCode;
        zejiLocalData.femaleBornCityCode=femaleBornCityCode;
        zejiLocalData.femaleBornCountryCode=femaleBornCountryCode;
        //女方出生地详细地址
        var hehunFeMaleBornAddress=$(".hehunFeMaleBornAddressTxt").val().trim();
        zejiLocalData.femaleBornAddress=hehunFeMaleBornAddress;
        //女方父亲生肖
        if(hehunFeMaleFatherZodiac===""){
            $("#tipModal").modal({showString:"请选择女方父亲生肖"});
            return false;
        }
        //女方母亲生肖
        if(hehunFeMaleMotherZodiac===""){
            $("#tipModal").modal({showString:"请选择女方母亲生肖"});
            return false;
        }
        //其他要求
        var otherRequest=$(".otherRequestTxa").val().trim();
        var submitObject={
            name:contactName,
            contactTel:contactTel,
            beginDate:beginDate,
            endDate:endDate,
            purposeId:purposeId,
            hehunMaleName:hehunMaleName,
            hehunMaleBornDate:hehunMaleBornDate,
            hehunMaleBornTime:hehunMaleBornTime,
            maleBornAddress:maleBornPrivince+"-"+maleBornCity+"-"+maleBornCountry+"-"+hehunMaleBornAddress,
            hehunMaleFatherZodiac:hehunMaleFatherZodiac,
            hehunMaleMotherZodiac:hehunMaleMotherZodiac,
            hehunFeMaleName:hehunFeMaleName,
            hehunFeMaleBornDate:hehunFeMaleBornDate,
            hehunFeMaleBornTime:hehunFemaleBornTime,
            femaleBornAddress:femaleBornPrivince+"-"+femaleBornCity+"-"+femaleBornCountry+"-"+hehunFeMaleBornAddress,
            hehunFeMaleFatherZodiac:hehunFeMaleFatherZodiac,
            hehunFeMaleMotherZodiac:hehunFeMaleMotherZodiac,
            otherRequest:otherRequest,
            price:price
        };
        var pushToken=localStorage["pushToken"];
        var deviceMacId=localStorage["deviceMacId"];
        var wnlUserId=localStorage["wnlUserId"];
        var appver=localStorage["appver"];
        var idfa=localStorage["idfa"];
        var gid=localStorage["gid"];
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
                gid:gid
            },
            dataType: 'json',
            success: function(data){
                $(".mask").addClass("hidden");
                if(data.status=="0"){
                    window.location.href="orderDetail.html"+"?id="+data.msg;
                }
                else{
                    $("#tipModal").modal({showString:data.msg});      //待约定错误代码
                }
            },
            error: function(xhr, type,error){
                $(".mask").addClass("hidden");
                $("#tipModal").modal({showString:"服务器错误,请重试"});
            }
        })
    }
    var contactName="",contactTel="";
    $(".zejiConfirm").click(function(){
        //联系人
        contactName=$(".contactNameTxt").val().trim();
        if(contactName.length===0){
            $("#tipModal").modal({showString:"请填写联系人"});
            return false;
        }
        zejiLocalData.name=contactName;
        if(!globalLocalData.name){
            globalLocalData.name=contactName;
        }
        //联系电话
        contactTel=$(".contactTelTxt").val().trim();
        var telRag=/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
        if(!telRag.test(contactTel)){
            $("#tipModal").modal({showString:"请填写正确的联系电话"});
            return false;
        }
        zejiLocalData.contactTel=contactTel;
        if(!globalLocalData.contactTel){
            globalLocalData.contactTel=contactTel;
        }
        //开始日期
        //todo 开始日期模拟
//        beginDate="20140712";
        if(beginDate===""){
            $("#tipModal").modal({showString:"请选择开始日期"});
            return false;
        }
        //结束日期
        //todo 结束日期模拟
//        endDate="20140713";
        if(endDate===""){
            $("#tipModal").modal({showString:"请选择结束日期"});
            return false;
        }
        if((new Date(str2Int(endDate.substring(0,4)),str2Int(endDate.substring(4,6))-1,str2Int(endDate.substring(6,8))).getTime()-new Date(str2Int(beginDate.substring(0,4)),str2Int(beginDate.substring(4,6))-1,str2Int(beginDate.substring(6,8))).getTime())<=0){
            $("#tipModal").modal({showString:"结束日期应大于开始日期"});
            return false;
        }
        switch (purposeId){
            case "A1":
                qiaoqianSubmit();
                break;
            case "A3":
                kaizhangSubmit();
                break;
            case "A2":
                chuxingSubmit();
                break;
            case "A4":
                hehunSubmit();
                break;
        }
        localStorage["zejiLocalData"]=JSON.stringify(zejiLocalData);
        localStorage["globalLocalData"]=JSON.stringify(globalLocalData);
    });
    if(localStorage["globalLocalData"]||localStorage["zejiLocalData"]){
        if(localStorage["globalLocalData"]){
            globalLocalData=JSON.parse(localStorage["globalLocalData"]);
        }
        if(localStorage["zejiLocalData"]){
            zejiLocalData=JSON.parse(localStorage["zejiLocalData"]);
        }


        if(zejiLocalData.name||globalLocalData.name){
            $(".contactNameTxt").val(zejiLocalData.name||globalLocalData.name);
        }
        if(zejiLocalData.contactTel||globalLocalData.contactTel){
            $(".contactTelTxt").val(zejiLocalData.contactTel||globalLocalData.contactTel);
        }
        //乔迁
        //男
        if(globalLocalData.sex==="0"){
            if(globalLocalData.name){
                $(".qiaoqianMaleNameTxt").val(globalLocalData.name);
            }
            if(globalLocalData.bornDate){
                qiaoqianMaleBornDate=globalLocalData.bornDate;
                $(".qiaoqianMaleBornDateUISelect span").html(qiaoqianMaleBornDate.substring(0,4)+"-"+qiaoqianMaleBornDate.substring(4,6)+"-"+qiaoqianMaleBornDate.substring(6,8));
            }
            if(globalLocalData.bornTime){
                qiaoqianMaleBornTime=globalLocalData.bornTime;
                $(".qiaoqianMaleBornTimeSelect").val(qiaoqianMaleBornTime);
                $(".qiaoqianMaleBornTimeUISelect span").html(qiaoqianMaleBornTime==="24"?"不详":(qiaoqianMaleBornTime+"点"));
            }
        }
        //女
        else if(globalLocalData.sex==="1"){
            if(globalLocalData.name){
                $(".qiaoqianFemaleNameTxt").val(globalLocalData.name);
            }
            if(globalLocalData.bornDate){
                qiaoqianFemaleBornDate=globalLocalData.bornDate;
                $(".qiaoqianFemaleBornDateUISelect span").html(qiaoqianFemaleBornDate.substring(0,4)+"-"+qiaoqianFemaleBornDate.substring(4,6)+"-"+qiaoqianFemaleBornDate.substring(6,8));
            }
            if(globalLocalData.bornTime){
                qiaoqianFemaleBornTime=globalLocalData.bornTime;
                $(".qiaoqianFemaleBornTimeSelect").val(qiaoqianFemaleBornTime);
                $(".qiaoqianFemaleBornTimeUISelect span").html(qiaoqianFemaleBornTime==="24"?"不详":(qiaoqianFemaleBornTime+"点"));
            }
        }



        if(zejiLocalData.qiaoqianMaleName){
            $(".qiaoqianMaleNameTxt").val(zejiLocalData.qiaoqianMaleName);
        }
        if(zejiLocalData.qiaoqianMaleBornDate&&zejiLocalData.qiaoqianMaleBornDate.length>0){
            qiaoqianMaleBornDate=zejiLocalData.qiaoqianMaleBornDate;
            $(".qiaoqianMaleBornDateUISelect span").html(qiaoqianMaleBornDate.substring(0,4)+"-"+qiaoqianMaleBornDate.substring(4,6)+"-"+qiaoqianMaleBornDate.substring(6,8));
        }
        if(zejiLocalData.qiaoqianMaleBornTime){
            qiaoqianMaleBornTime=zejiLocalData.qiaoqianMaleBornTime;
            $(".qiaoqianMaleBornTimeSelect").val(qiaoqianMaleBornTime);
            var tempBornTime="";
            if(qiaoqianMaleBornTime==="-1"){
                tempBornTime="时间";
            }
            else{
                tempBornTime=qiaoqianMaleBornTime==="24"?"不详":(qiaoqianMaleBornTime+"点");
            }
            $(".qiaoqianMaleBornTimeUISelect span").html(tempBornTime);
        }

        if(zejiLocalData.qiaoqianFemaleName){
            $(".qiaoqianFemaleNameTxt").val(zejiLocalData.qiaoqianFemaleName);
        }
        if(zejiLocalData.qiaoqianFemaleBornDate&&zejiLocalData.qiaoqianFemaleBornDate.length>0){
            qiaoqianFemaleBornDate=zejiLocalData.qiaoqianFemaleBornDate;
            $(".qiaoqianFemaleBornDateUISelect span").html(qiaoqianFemaleBornDate.substring(0,4)+"-"+qiaoqianFemaleBornDate.substring(4,6)+"-"+qiaoqianFemaleBornDate.substring(6,8));
        }
        if(zejiLocalData.qiaoqianFemaleBornTime){
            qiaoqianFemaleBornTime=zejiLocalData.qiaoqianFemaleBornTime;
            $(".qiaoqianFemaleBornTimeSelect").val(qiaoqianFemaleBornTime);
            var tempBornTime="";
            if(qiaoqianFemaleBornTime==="-1"){
                tempBornTime="时间";
            }
            else{
                tempBornTime=qiaoqianFemaleBornTime==="24"?"不详":(qiaoqianFemaleBornTime+"点");
            }
            $(".qiaoqianFemaleBornTimeUISelect span").html(tempBornTime);
        }
        if(zejiLocalData.familyDesc||globalLocalData.familyDesc){
            $(".familyBornTimeTxa").val(zejiLocalData.familyDesc||globalLocalData.familyDesc);
        }
        //公司开张
        if(globalLocalData.name){
            $(".kaizhangNameTxt").val(globalLocalData.name);
        }
        if(globalLocalData.sex){
            kaizhangSex=globalLocalData.sex;
            $(".kaizhangSexSelect").val(kaizhangSex);
            $(".kaizhangSexUISelect span").html(kaizhangSex==="0"?"男":"女");
        }
        if(globalLocalData.bornDate){
            kaizhangBornDate=globalLocalData.bornDate;
            $(".kaizhangBornDateUISelect span").html(kaizhangBornDate.substring(0,4)+"-"+kaizhangBornDate.substring(4,6)+"-"+kaizhangBornDate.substring(6,8));
        }
        if(globalLocalData.bornTime){
            kaizhangBornTime=globalLocalData.bornTime;
            $(".kaizhangBornTimeSelect").val(kaizhangBornTime);
            $(".kaizhangBornTimeUISelect span").html(kaizhangBornTime==="24"?"不详":(kaizhangBornTime+"点"));
        }




        if(zejiLocalData.kaizhangName){
            $(".kaizhangNameTxt").val(zejiLocalData.kaizhangName);
        }
        if(zejiLocalData.kaizhangSex){
            kaizhangSex=zejiLocalData.kaizhangSex;
            $(".kaizhangSexSelect").val(kaizhangSex);
            $(".kaizhangSexUISelect span").html(kaizhangSex==="0"?"男":"女");
        }
        if(zejiLocalData.kaizhangBornDate){
            kaizhangBornDate=zejiLocalData.kaizhangBornDate;
            $(".kaizhangBornDateUISelect span").html(kaizhangBornDate.substring(0,4)+"-"+kaizhangBornDate.substring(4,6)+"-"+kaizhangBornDate.substring(6,8));
        }
        if(zejiLocalData.kaizhangBornTime){
            kaizhangBornTime=zejiLocalData.kaizhangBornTime;
            $(".kaizhangBornTimeSelect").val(kaizhangBornTime);
            $(".kaizhangBornTimeUISelect span").html(kaizhangBornTime==="24"?"不详":(kaizhangBornTime+"点"));
        }
        //出行动身
        if(globalLocalData.name){
            $(".chuxingNameTxt").val(globalLocalData.name);
        }
        if(globalLocalData.sex){
            chuxingSex=globalLocalData.sex;
            $(".chuxingSexSelect").val(globalLocalData.sex);
            $(".chuxingSexUISelect span").html(globalLocalData.sex==="0"?"男":"女");
        }
        if(globalLocalData.bornDate){
            chuxingBornDate=globalLocalData.bornDate;
            $(".chuxingBornDateUISelect span").html(chuxingBornDate.substring(0,4)+"-"+chuxingBornDate.substring(4,6)+"-"+chuxingBornDate.substring(6,8));
        }
        if(globalLocalData.bornTime){
            chuxingBornTime=globalLocalData.bornTime;
            $(".chuxingBornTimeSelect").val(chuxingBornTime);
            $(".chuxingBornTimeUISelect span").html(chuxingBornTime==="24"?"不详":(chuxingBornTime+"点"));
        }
        if(globalLocalData.bornPrivince&&globalLocalData.provinceCode){
            bornPrivince=globalLocalData.bornPrivince;
            $(".bornProvinceSelect").val(globalLocalData.provinceCode);
            $(".bornProvinceUISelect span").html(globalLocalData.bornPrivince);
        }
        if(globalLocalData.bornCity&&globalLocalData.cityCode){
            bornCity=globalLocalData.bornCity;
        }
        if(globalLocalData.bornCountry&&globalLocalData.countryCode) {
            bornCountry = globalLocalData.bornCountry;
        }
        if(globalLocalData.bornAddress){
            $(".bornAddressTxt").val(globalLocalData.bornAddress);
        }




        if(zejiLocalData.chuxingName){
            $(".chuxingNameTxt").val(zejiLocalData.chuxingName);
        }
        if(zejiLocalData.chuxingSex){
            chuxingSex=zejiLocalData.chuxingSex;
            $(".chuxingSexSelect").val(chuxingSex);
            $(".chuxingSexUISelect span").html(chuxingSex==="0"?"男":"女");
        }
        if(zejiLocalData.chuxingBornDate){
            chuxingBornDate=zejiLocalData.chuxingBornDate;
            $(".chuxingBornDateUISelect span").html(chuxingBornDate.substring(0,4)+"-"+chuxingBornDate.substring(4,6)+"-"+chuxingBornDate.substring(6,8));
        }
        if(zejiLocalData.chuxingBornTime){
            chuxingBornTime=zejiLocalData.chuxingBornTime;
            $(".chuxingBornTimeSelect").val(chuxingBornTime);
            $(".chuxingBornTimeUISelect span").html(chuxingBornTime==="24"?"不详":(chuxingBornTime+"点"));
        }
        if(zejiLocalData.bornPrivince&&zejiLocalData.provinceCode){
            bornPrivince=zejiLocalData.bornPrivince;
            $(".bornProvinceSelect").val(zejiLocalData.provinceCode);
            $(".bornProvinceUISelect span").html(zejiLocalData.bornPrivince);
        }
        if(zejiLocalData.bornCity&&zejiLocalData.cityCode){
            bornCity=zejiLocalData.bornCity;
        }
        if(zejiLocalData.bornCountry&&zejiLocalData.countryCode) {
            bornCountry = zejiLocalData.bornCountry;
        }
        if(zejiLocalData.bornAddress){
            $(".bornAddressTxt").val(zejiLocalData.bornAddress);
        }
        //择日合婚
        if(zejiLocalData.hehunMaleName){
            $(".hehunMaleNameTxt").val(zejiLocalData.hehunMaleName);
        }
        if(zejiLocalData.hehunMaleBornDate){
            hehunMaleBornDate=zejiLocalData.hehunMaleBornDate;
            $(".hehunMaleBornDateUISelect span").html(hehunMaleBornDate.substring(0,4)+"-"+hehunMaleBornDate.substring(4,6)+"-"+hehunMaleBornDate.substring(6,8));
        }
        if(zejiLocalData.hehunMaleBornTime){
            hehunMaleBornTime=zejiLocalData.hehunMaleBornTime;
            $(".hehunMaleBornTimeSelect").val(hehunMaleBornTime);
            $(".hehunMaleBornTimeUISelect span").html(hehunMaleBornTime==="24"?"不详":(hehunMaleBornTime+"点"));
        }
        if(zejiLocalData.maleBornPrivince&&zejiLocalData.maleBornPrivinceCode){
            maleBornPrivince=zejiLocalData.maleBornPrivince;
            maleBornPrivinceCode=zejiLocalData.maleBornPrivinceCode;
            $(".hehunMaleBornProvinceSelect").val(zejiLocalData.maleBornPrivinceCode);
            $(".hehunMaleBornProvinceUISelect span").html(zejiLocalData.maleBornPrivince);
        }
        if(zejiLocalData.maleBornCity&&zejiLocalData.maleBornCityCode){
            maleBornCity=zejiLocalData.maleBornCity;
            maleBornCityCode=zejiLocalData.maleBornCityCode;
        }
        if(zejiLocalData.maleBornCountry&&zejiLocalData.maleBornCountryCode) {
            maleBornCountry = zejiLocalData.maleBornCountry;
            maleBornCountryCode=zejiLocalData.maleBornCountryCode;
        }
        if(zejiLocalData.maleBornAddress){
            $(".hehunMaleBornAddressTxt").val(zejiLocalData.maleBornAddress);
        }

        if(zejiLocalData.hehunFeMaleName){
            $(".hehunFeMaleNameTxt").val(zejiLocalData.hehunFeMaleName);
        }
        if(zejiLocalData.hehunFeMaleBornDate){
            hehunFeMaleBornDate=zejiLocalData.hehunFeMaleBornDate;
            $(".hehunFeMaleBornDateUISelect span").html(hehunFeMaleBornDate.substring(0,4)+"-"+hehunFeMaleBornDate.substring(4,6)+"-"+hehunFeMaleBornDate.substring(6,8));
        }
        if(zejiLocalData.hehunFemaleBornTime){
            hehunFemaleBornTime=zejiLocalData.hehunFemaleBornTime;
            $(".hehunFeMaleBornTimeSelect").val(hehunFemaleBornTime);
            $(".hehunFeMaleBornTimeUISelect span").html(hehunFemaleBornTime==="24"?"不详":(hehunFemaleBornTime+"点"));
        }
        if(zejiLocalData.femaleBornPrivince&&zejiLocalData.femaleBornPrivinceCode){
            femaleBornPrivince=zejiLocalData.bornPrivince;
            femaleBornPrivinceCode=zejiLocalData.femaleBornPrivinceCode;
            $(".hehunFeMaleBornProvinceSelect").val(zejiLocalData.femaleBornPrivinceCode);
            $(".hehunFeMaleBornProvinceUISelect span").html(zejiLocalData.femaleBornPrivince);
        }
        if(zejiLocalData.femaleBornCity&&zejiLocalData.femaleBornCityCode){
            femaleBornCity=zejiLocalData.femaleBornCity;
            femaleBornCityCode=zejiLocalData.femaleBornCityCode;
        }
        if(zejiLocalData.femaleBornCountry&&zejiLocalData.femaleBornCountryCode) {
            femaleBornCountry = zejiLocalData.femaleBornCountry;
            femaleBornCountryCode=zejiLocalData.femaleBornCountryCode;
        }
        if(zejiLocalData.femaleBornAddress){
            $(".hehunFeMaleBornAddressTxt").val(zejiLocalData.femaleBornAddress);
        }
    }
});
function datepickerModal(objString){
    var dateString=objString.substr(0,8);
    var tagString=objString.substr(9,1);
    console.log(dateString+"     "+tagString);
    var year=dateString.substring(0,4);
    var month=dateString.substring(4,6);
    var day=dateString.substring(6,8);
    $(".lunarSelectContent input").removeClass("active");
    $(".solarBtn").addClass("active");
    $(".sDateContent").removeClass("hidden");
    $(".lDateContent").addClass("hidden");
    $(".sYearSelect").val(year);
    $(".sMonthSelect").val(str2Int(month)-1);
    $(".sDaySelect").val(str2Int(day));
    $(".sYearSelect").trigger("change");
    $(".sMonthSelect").trigger("change");
    $(".sDaySelect").trigger("change");
    $(".pickConfirmBtn").data("tag",tagString);
    $("#datePickModal").modal();
}
//针对Android webview  parseInt时的将"0"开始的字符转换成0的bug，将字符转换为int
function str2Int(str){
    str = str.replace(/^0+/g, '');
    if(str.length == 0){
        return 0;
    }
    return parseInt(str);
}
//择日期限日期1，择日期限日期2,乔迁男主人出生日期,乔迁女主人出生日期,公司开张出生日期,出行动身出生日期，合婚男方出生日期，合婚女方出生日期
var beginDate="",endDate="",qiaoqianMaleBornDate="",qiaoqianFemaleBornDate="",kaizhangBornDate="",chuxingBornDate="",hehunMaleBornDate="",hehunFeMaleBornDate="";
function selectedDateFromNative(retObj){
    //择日期限日期1
    if(parseInt(retObj.tag)==1){
        beginDate=retObj.value;
        $(".beginRangeDateUISelect span").html(beginDate.substring(0,4)+"-"+beginDate.substring(4,6)+"-"+beginDate.substring(6,8));
    }
    //择日期限日期2
    else if(parseInt(retObj.tag)==2){
        endDate=retObj.value;
        $(".endRangeDateUISelect span").html(endDate.substring(0,4)+"-"+endDate.substring(4,6)+"-"+endDate.substring(6,8));
    }
    //乔迁男主人出生日期
    else if(parseInt(retObj.tag)==3){
        qiaoqianMaleBornDate=retObj.value;
        $(".qiaoqianMaleBornDateUISelect span").html(qiaoqianMaleBornDate.substring(0,4)+"-"+qiaoqianMaleBornDate.substring(4,6)+"-"+qiaoqianMaleBornDate.substring(6,8));
    }
    //乔迁女主人出生日期
    else if(parseInt(retObj.tag)==4){
        qiaoqianFemaleBornDate=retObj.value;
        $(".qiaoqianFemaleBornDateUISelect span").html(qiaoqianFemaleBornDate.substring(0,4)+"-"+qiaoqianFemaleBornDate.substring(4,6)+"-"+qiaoqianFemaleBornDate.substring(6,8));
    }
    //公司开张出生日期
    else if(parseInt(retObj.tag)==5){
        kaizhangBornDate=retObj.value;
        $(".kaizhangBornDateUISelect span").html(kaizhangBornDate.substring(0,4)+"-"+kaizhangBornDate.substring(4,6)+"-"+kaizhangBornDate.substring(6,8));
    }
    //出行动身出生日期
    else if(parseInt(retObj.tag)==6){
        chuxingBornDate=retObj.value;
        $(".chuxingBornDateUISelect span").html(chuxingBornDate.substring(0,4)+"-"+chuxingBornDate.substring(4,6)+"-"+chuxingBornDate.substring(6,8));
    }
    //合婚男方出生日期
    else if(parseInt(retObj.tag)==7){
        hehunMaleBornDate=retObj.value;
        $(".hehunMaleBornDateUISelect span").html(hehunMaleBornDate.substring(0,4)+"-"+hehunMaleBornDate.substring(4,6)+"-"+hehunMaleBornDate.substring(6,8));
    }
    //合婚女方出生日期
    else if(parseInt(retObj.tag)==8){
        hehunFeMaleBornDate=retObj.value;
        $(".hehunFeMaleBornDateUISelect span").html(hehunFeMaleBornDate.substring(0,4)+"-"+hehunFeMaleBornDate.substring(4,6)+"-"+hehunFeMaleBornDate.substring(6,8));
    }
}