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
    var baziLocalData={},globalLocalData={},isNameChange=false;
    //性别选择改变事件
    var sex="-1";
    $(".sexSelect").change(function(){
        var selectOption=$(this).children("option:selected");
        sex=selectOption.val();
        $(".sexUISelect span").html(selectOption.html());
        return false;
    });
    //合婚对象性别选择事件
    hehunSex="-1";
    $(".hehunSexSelect").change(function(){
        var selectOption=$(this).children("option:selected");
        hehunSex=selectOption.val();
        $(".hehunSexUISelect span").html(selectOption.html());
        return false;
    });
    //出生日期点击
    $(".bornDateUISelect").click(function(){
        var url="";
        if(bornDate.length===0){
            //url="protocol://PickDate:19800615#1";
            url="19800615#1";
        }
        else{
            //url="protocol://PickDate:"+bornDate+"#1";
            url=bornDate+"#1";
        }
        //document.location = url;
        datepickerModal(url);
    });
    //合婚对象出生日期点击
    $(".hehunBornDateUISelect").click(function(){
        var url="";
        if(hehunBornDate.length===0){
            //url="protocol://PickDate:19800615#4";
            url="19800615#4";
        }
        else{
            //url="protocol://PickDate:"+hehunBornDate+"#4";
            url=hehunBornDate+"#4";
        }
        //document.location = url;
        datepickerModal(url);
    });
    //设置出生时间
    var bornTime="-1";
    var bornTimeSelect=$(".bornTimeSelect");
    bornTimeSelect.append("<option value='24'>不详</option>");
    for(var i=0;i<=23;i++){
        bornTimeSelect.append("<option value='"+i+"'>"+(i+"点")+"</option>");
    }
    //出生时间选择改变事件
    bornTimeSelect.change(function(){
        var selectOption=$(this).children("option:selected");
        bornTime=selectOption.val();
        $(".bornTimeUISelect span").html(selectOption.html());
        return false;
    });
    //设置合婚对象出生时间
    var hehunBornTime="-1";
    var hehunBornTimeSelect=$(".hehunBornTimeSelect");
    hehunBornTimeSelect.append("<option value='24'>不详</option>");
    for(var i=0;i<=23;i++){
        hehunBornTimeSelect.append("<option value='"+i+"'>"+(i+"点")+"</option>");
    }
    //合婚对象出生时间选择改变事件
    hehunBornTimeSelect.change(function(){
        var selectOption=$(this).children("option:selected");
        hehunBornTime=selectOption.val();
        $(".hehunBornTimeUISelect span").html(selectOption.html());
        return false;
    });
    //是否结婚选择改变事件
    var marriage="-1";
    $(".marriageSelect").change(function(){
        var selectOption=$(this).children("option:selected");
        marriage=selectOption.val();
        $(".marriageUISelect span").html(selectOption.html());
        return false;
    });
    //所需项目选择改变事件
    var price= 0,purposeId="-1";
    $(".purposeSelect").change(function(e){
        $(".hehunContent").addClass("hidden");
        var selectOption=$(this).children("option:selected");
        purposeId=selectOption.val();
        switch (purposeId){
            case "-1": //请选择
                price=0;
                break;
            case "C1": //单项预测投资
                price=498;
                break;
            case "C2": //单项预测事业
                price=498;
                break;
            case "C3": //单项预测婚姻
                price=468;
                break;
            case "C4": //单项预测家庭
                price=468;
                break;
            case "C6": //单项预测财运
                price=388;
                break;
            case "C7": //单项预测考学
                price=198;
                break;
            case "C8": //单项预测合作
                price=108;
                break;
            case "C9": //单项预测健康
                price=108;
                break;
            case "C10":  //单项预测置业
                price=108;
                break;
            case "C11":  //单项预测出行
                price=98;
                break;
            case "C5": //合婚
                price=399;
                $(".hehunContent").removeClass("hidden");
                break;
        }
        $(".purposeUISelect span").html(selectOption.html());
        if(price===0){
            $(".purposeTxt").html("八字");
            $(".purposePrice").html("");
        }
        else{
            $(".purposeTxt").html("八字/"+selectOption.html());
            $(".purposePrice").html("¥"+price);
        }
        return false;
    });
    //开始日期点击
    $(".beginLimitDateUISelect").click(function(){
        var url="";
        if(beginDate.length===0){
            var date=new Date();
            date.setDate(date.getDate()+2);
            var nowYear=date.getFullYear();
            var nowMonth=date.getMonth()+1;
            var nowDay=date.getDate();
            //url="protocol://PickDate:"+nowYear+(nowMonth<10?"0"+nowMonth:nowMonth)+(nowDay<10?"0"+nowDay:nowDay)+"#2";
            url=nowYear.toString()+(nowMonth<10?"0"+nowMonth:nowMonth)+(nowDay<10?"0"+nowDay:nowDay)+"#2";
        }
        else{
            //url="protocol://PickDate:"+beginDate+"#2";
            url=beginDate+"#2";
        }
        //document.location = url;
        datepickerModal(url);
    });
    //结束日期点击
    $(".endLimitDateUISelect").click(function(){
        var url="";
        if(endDate.length===0){
            var date=new Date();
            date.setDate(date.getDate()+2);
            var nowYear=date.getFullYear();
            var nowMonth=date.getMonth()+1;
            var nowDay=date.getDate();
            //url="protocol://PickDate:"+nowYear+(nowMonth<10?"0"+nowMonth:nowMonth)+(nowDay<10?"0"+nowDay:nowDay)+"#3";
            url=nowYear.toString()+(nowMonth<10?"0"+nowMonth:nowMonth)+(nowDay<10?"0"+nowDay:nowDay)+"#3";
        }
        else{
            //url="protocol://PickDate:"+endDate+"#3";
            url=endDate+"#3";
        }
        //document.location = url;
        datepickerModal(url);
    });
    $(".baziConfirm").click(function(){
        //姓名
        var name=$(".nameTxt").val().trim();
        if(name.length===0){
            $("#tipModal").modal({showString:"请填写姓名"});
            return false;
        }
        baziLocalData.name=name;
        if(!globalLocalData.name){
            globalLocalData.name=name;
        }
        //性别
        if(sex==="-1"){
            $("#tipModal").modal({showString:"请选择性别"});
            return false;
        }
        baziLocalData.sex=sex;
        if(!globalLocalData.sex){
            globalLocalData.sex=sex;
        }
        //todo 出生日期模拟
//        bornDate="20140712";
        if(bornDate.length===0){
            $("#tipModal").modal({showString:"请选择出生日期"});
            return false;
        }
        baziLocalData.bornDate=bornDate;
        if(!globalLocalData.bornDate){
            globalLocalData.bornDate=bornDate;
        }
        //出生时间
        if(bornTime==="-1"){
            $("#tipModal").modal({showString:"请选择出生时间"});
            return false;
        }
        baziLocalData.bornTime=bornTime;
        if(!globalLocalData.bornTime){
            globalLocalData.bornTime=bornTime;
        }
        //民族
        var ethnic=$(".ethnicTxt").val().trim();
        if(ethnic.length===0){
            $("#tipModal").modal({showString:"请填写民族"});
            return false;
        }
        baziLocalData.ethnic=ethnic;
        if(!globalLocalData.ethnic){
            globalLocalData.ethnic=ethnic;
        }
        //是否结婚
        if(marriage==="-1"){
            $("#tipModal").modal({showString:"请选择婚否"});
            return false;
        }
        baziLocalData.marriage=marriage;
        if(!globalLocalData.marriage){
            globalLocalData.marriage=marriage;
        }
        //家庭状况
        var familyDesc=$(".familyTxa").val().trim();
        familyDesc=familyDesc.indexOf("提示：")>-1?"":familyDesc;
        if(familyDesc.length===0){
            $("#tipModal").modal({showString:"请填写家庭状况"});
            return false;
        }
        baziLocalData.familyDesc=familyDesc;
        if(!globalLocalData.familyDesc){
            globalLocalData.familyDesc=familyDesc;
        }
        //单项所需项目
        if(purposeId==="-1"){
            $("#tipModal").modal({showString:"请选择您所需项目"});
            return false;
        }
        if(purposeId==="C5"){
            //合婚对象姓名
            var hehunName=$(".hehunNameTxt").val().trim();
            if(hehunName.length===0){
                $("#tipModal").modal({showString:"请填写合婚对象姓名"});
                return false;
            }
            //合婚对象性别
            if(hehunSex==="-1"){
                $("#tipModal").modal({showString:"请选择合婚对象性别"});
                return false;
            }
            //todo 合婚对象出生日期模拟
//            bornDate="20140712";
            if(hehunBornDate.length===0){
                $("#tipModal").modal({showString:"请选择合婚对象出生日期"});
                return false;
            }
            //合婚对象出生时间
            if(hehunBornTime==="-1"){
                $("#tipModal").modal({showString:"请选择合婚对象出生时间"});
                return false;
            }
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
        //其他要求
        var otherRequest=$(".otherTxa").val().trim();
        var submitObject={
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
        if(purposeId==="C5"){
            submitObject.hehunName=hehunName;
            submitObject.hehunSex=hehunSex;
            submitObject.hehunBornDate=hehunBornDate;
            submitObject.hehunBornTime=hehunBornTime;
        }
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
        });
        localStorage["baziLocalData"]=JSON.stringify(baziLocalData);
        localStorage["globalLocalData"]=JSON.stringify(globalLocalData);
    });
    if(localStorage["globalLocalData"]){
//        confirm(localStorage["globalLocalData"]);
        globalLocalData=JSON.parse(localStorage["globalLocalData"]);
        if(globalLocalData.name){
            $(".nameTxt").val(globalLocalData.name);
        }
        if(globalLocalData.sex){
            sex=globalLocalData.sex;
            $(".sexSelect").val(globalLocalData.sex);
            $(".sexUISelect span").html(globalLocalData.sex==="0"?"男":"女");
        }
        if(globalLocalData.bornDate){
            bornDate=globalLocalData.bornDate;
            $(".bornDateUISelect span").html(bornDate.substring(0,4)+"-"+bornDate.substring(4,6)+"-"+bornDate.substring(6,8));
        }
        if(globalLocalData.bornTime){
            bornTime=globalLocalData.bornTime;
            $(".bornTimeSelect").val(bornTime);
            $(".bornTimeUISelect span").html(bornTime==="24"?"不详":(bornTime+"点"));
        }
        if(globalLocalData.ethnic){
            $(".ethnicTxt").val(globalLocalData.ethnic);
        }
        if(globalLocalData.marriage){
            marriage=globalLocalData.marriage;
            $(".marriageSelect").val(marriage);
            $(".marriageUISelect span").html(marriage=="0"?"已婚":"未婚");
        }
        if(globalLocalData.familyDesc){
            $(".familyTxa").val(globalLocalData.familyDesc);
        }
    }
    if(localStorage["baziLocalData"]){
        baziLocalData=JSON.parse(localStorage["baziLocalData"]);
        if(baziLocalData.name){
            $(".nameTxt").val(baziLocalData.name);
        }
        if(baziLocalData.sex){
            sex=baziLocalData.sex;
            $(".sexSelect").val(baziLocalData.sex);
            $(".sexUISelect span").html(baziLocalData.sex=="0"?"男":"女");
        }
        if(baziLocalData.bornDate){
            bornDate=baziLocalData.bornDate;
            $(".bornDateUISelect span").html(bornDate.substring(0,4)+"-"+bornDate.substring(4,6)+"-"+bornDate.substring(6,8));
        }
        if(baziLocalData.bornTime){
            bornTime=baziLocalData.bornTime;
            $(".bornTimeSelect").val(bornTime);
            $(".bornTimeUISelect span").html(bornTime==="24"?"不详":(bornTime+"点"));
        }
        if(baziLocalData.ethnic){
            $(".ethnicTxt").val(baziLocalData.ethnic);
        }
        if(baziLocalData.marriage){
            marriage=baziLocalData.marriage;
            $(".marriageSelect").val(marriage);
            $(".marriageUISelect span").html(marriage=="0"?"已婚":"未婚");
        }
        if(baziLocalData.familyDesc){
            $(".familyTxa").val(baziLocalData.familyDesc);
        }
    }


    var ua=navigator.userAgent.toLocaleLowerCase();
    if (ua.indexOf("wnl")===-1){
        $(".wnlBannerLink").removeClass("hidden");
    }
    $(".wnlBannerLink").click(function(){
        var wx=ua.indexOf("micromessenger")>-1;
        var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
        var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
        var isAndroid=ua.indexOf("android")>-1;
        if(wx){
            location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
        }
        else{
            if(isIOS){
                location.href="http://um0.cn/89wDL";
            }
            else if(isAndroid){
                location.href="http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]";
            }
            else{
                location.href="http://www.51wnl.com";
            }
        }
    });
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
//出生日期，开始日期，结束日期
var bornDate="",beginDate="",endDate="",hehunBornDate="";
function selectedDateFromNative(retObj){
    //出生日期
    if(parseInt(retObj.tag)==1){
        bornDate=retObj.value;
        $(".bornDateUISelect span").html(bornDate.substring(0,4)+"-"+bornDate.substring(4,6)+"-"+bornDate.substring(6,8));
    }
    //择日期限日期1
    else if(parseInt(retObj.tag)==2){
        beginDate=retObj.value;
        $(".beginLimitDateUISelect span").html(beginDate.substring(0,4)+"-"+beginDate.substring(4,6)+"-"+beginDate.substring(6,8));
    }
    //择日期限日期2
    else if(parseInt(retObj.tag)==3){
        endDate=retObj.value;
        $(".endLimitDateUISelect span").html(endDate.substring(0,4)+"-"+endDate.substring(4,6)+"-"+endDate.substring(6,8));
    }
    else if(parseInt(retObj.tag)==4){
        hehunBornDate=retObj.value;
        $(".hehunBornDateUISelect span").html(hehunBornDate.substring(0,4)+"-"+hehunBornDate.substring(4,6)+"-"+hehunBornDate.substring(6,8));
    }
}