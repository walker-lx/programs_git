$(function () {
    $(".briefLine div:first-child").width($(".briefLine").width()/2+50);
    var name = decodeURIComponent(getQueryString("name"));
    var birthday = decodeURIComponent(getQueryString("birthday"));
    var sex = decodeURIComponent(getQueryString("sex"));
    if(sex+""=="0"){
        sex="女";
    }
    else if(sex+""=="1"){
        sex="男";
    }
    var url = "/numberology/NRLorder/GetMingPan?name=" + name + "&birthday=" + birthday+"&sex="+sex;
    $("#name").text(Base64.decode(name));
    $("#sex").text(sex);
    var year=birthday.substring(0,4),month=birthday.substring(5,7),day=birthday.substring(8,10),hour=birthday.substring(11,13);
    $("#gongli").html(year+"年"+month+"月"+day+"日"+hour+"时");
    if(sex==="女"){
        $(".line2 .innerTxt").html("坤造");
    }
    if(getQueryString("share")){
        $(".yiqiDesc").addClass("hidden");
        $(".wnlBannerLink").removeClass("hidden");
    }
    $(".wnlBannerLink").click(function(){
        var ua=navigator.userAgent.toLocaleLowerCase();
        var wx=ua.indexOf("micromessenger")>-1;
        var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
        var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
        var isAndroid=ua.indexOf("android")>-1;
        if(wx){
            _hmt.push(['_trackEvent','jryc_download_wx_click', 'click', 'jryc_download_wx_click', 'jryc_download_wx_click']);
            location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
        }
        else{
            if(isIOS){
                _hmt.push(['_trackEvent','jryc_download_ios_click', 'click', 'jryc_download_ios_click', 'jryc_download_ios_click']);
                location.href="http://um0.cn/89wDL";
            }
            else if(isAndroid){
                _hmt.push(['_trackEvent','jryc_download_android_click', 'click', 'jryc_download_android_click', 'jryc_download_android_click']);
                location.href="http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]";
            }
            else{
                location.href="http://www.51wnl.com";
            }
        }
    });
    if(localStorage["bzmpLastData"]){
        var result=JSON.parse(localStorage["bzmpLastData"]);
        if(result.birthday===birthday&&result.sex===sex){
            $("#kongWang").html(result.kongWang.replace("、"," "));
            $("#term").text(result.jieQi);
            $("#mingGong").text(result.mingGong);
            $("#taiYuan").text(result.taiYuan);
            $("#jiShu").text(result.jiShu.replace("、"," "));
            $("#jiSe").text(result.jiSe);
            $("#jiWei").text(result.jiWei);
            $(".tiangan1").css('background-image','url("'+getTianganImg(result.tianGan[0])+'")');
            $(".tiangan2").css('background-image','url("'+getTianganImg(result.tianGan[1])+'")');
            $(".tiangan3").css('background-image','url("'+getTianganImg(result.tianGan[2])+'")');
            $(".tiangan4").css('background-image','url("'+getTianganImg(result.tianGan[3])+'")');
            $(".dizhi1").css('background-image','url("'+getDizhiImg(result.diZhi[0])+'")');
            $(".dizhi2").css('background-image','url("'+getDizhiImg(result.diZhi[1])+'")');
            $(".dizhi3").css('background-image','url("'+getDizhiImg(result.diZhi[2])+'")');
            $(".dizhi4").css('background-image','url("'+getDizhiImg(result.diZhi[3])+'")');
            $(".zanggan1").html(result.zangGan[0]);
            $(".zanggan2").html(result.zangGan[1]);
            $(".zanggan3").html(result.zangGan[2]);
            $(".zanggan4").html(result.zangGan[3]);
            $(".shishen1").html(result.cangGanShiShen[0]);
            $(".shishen2").html(result.cangGanShiShen[1]);
            $(".shishen3").html(result.cangGanShiShen[2]);
            $(".shishen4").html(result.cangGanShiShen[3]);
            $(".changsheng1").html(result.changSheng[0]);
            $(".changsheng2").html(result.changSheng[1]);
            $(".changsheng3").html(result.changSheng[2]);
            $(".changsheng4").html(result.changSheng[3]);
            $(".nayin1").html(result.naYin[0]);
            $(".nayin2").html(result.naYin[1]);
            $(".nayin3").html(result.naYin[2]);
            $(".nayin4").html(result.naYin[3]);
            var dayunList=result.daYun.split(";");
            dayunList.length=dayunList.length-1;
            var mkpTd = '<td class="jiShiItem"><span class="timeIndex"><%- time %></span><span class="timeDesc"><%- timeDesc %></span></td>';
            $.each(dayunList, function (index, item) {
                if (index % 2 == 0) {
                    $("#tbdJiShi").append('<tr class="timeLine"></tr>');
                }
                var index1=item.indexOf("("),index2=item.indexOf(")");
                var time=item.substr(0,index1),timeDesc=item.substring(index1+1,index2);
                $("#tbdJiShi").children().last().append(_.template(mkpTd)({
                    time: time,
                    timeDesc: timeDesc
                }));
            });
            $("#riYuan").text(result.riYuan);
            $("#xiJi").text(result.xiJi);
        }
        else{
            getData();
        }
    }
    else{
        getData();
    }
    function getData(){
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function (data) {
                if (data && data.status == 0) {
                    console.log(data.data);
                    var result=data.data;
                    result.birthday=birthday;
                    result.sex=sex;
                    localStorage["bzmpLastData"]=JSON.stringify(result);
                    $("#kongWang").html(result.kongWang.replace("、"," "));
                    $("#term").text(result.jieQi);
                    $("#mingGong").text(result.mingGong);
                    $("#taiYuan").text(result.taiYuan);
                    $("#jiShu").text(result.jiShu.replace("、"," "));
                    $("#jiSe").text(result.jiSe);
                    $("#jiWei").text(result.jiWei);
                    $(".tiangan1").css('background-image','url("'+getTianganImg(result.tianGan[0])+'")');
                    $(".tiangan2").css('background-image','url("'+getTianganImg(result.tianGan[1])+'")');
                    $(".tiangan3").css('background-image','url("'+getTianganImg(result.tianGan[2])+'")');
                    $(".tiangan4").css('background-image','url("'+getTianganImg(result.tianGan[3])+'")');
                    $(".dizhi1").css('background-image','url("'+getDizhiImg(result.diZhi[0])+'")');
                    $(".dizhi2").css('background-image','url("'+getDizhiImg(result.diZhi[1])+'")');
                    $(".dizhi3").css('background-image','url("'+getDizhiImg(result.diZhi[2])+'")');
                    $(".dizhi4").css('background-image','url("'+getDizhiImg(result.diZhi[3])+'")');
                    $(".zanggan1").html(result.zangGan[0]);
                    $(".zanggan2").html(result.zangGan[1]);
                    $(".zanggan3").html(result.zangGan[2]);
                    $(".zanggan4").html(result.zangGan[3]);
                    $(".shishen1").html(result.cangGanShiShen[0]);
                    $(".shishen2").html(result.cangGanShiShen[1]);
                    $(".shishen3").html(result.cangGanShiShen[2]);
                    $(".shishen4").html(result.cangGanShiShen[3]);
                    $(".changsheng1").html(result.changSheng[0]);
                    $(".changsheng2").html(result.changSheng[1]);
                    $(".changsheng3").html(result.changSheng[2]);
                    $(".changsheng4").html(result.changSheng[3]);
                    $(".nayin1").html(result.naYin[0]);
                    $(".nayin2").html(result.naYin[1]);
                    $(".nayin3").html(result.naYin[2]);
                    $(".nayin4").html(result.naYin[3]);
                    var dayunList=result.daYun.split(";");
                    dayunList.length=dayunList.length-1;
                    var mkpTd = '<td class="jiShiItem"><span class="timeIndex"><%- time %></span><span class="timeDesc"><%- timeDesc %></span></td>';
                    $.each(dayunList, function (index, item) {
                        if (index % 2 == 0) {
                            $("#tbdJiShi").append('<tr class="timeLine"></tr>');
                        }
                        var index1=item.indexOf("("),index2=item.indexOf(")");
                        var time=item.substr(0,index1),timeDesc=item.substring(index1+1,index2);
                        $("#tbdJiShi").children().last().append(_.template(mkpTd)({
                            time: time,
                            timeDesc: timeDesc
                        }));
                    });
                    $("#riYuan").text(result.riYuan);
                    $("#xiJi").text(result.xiJi);
                }
            }
        });
    }
    function getTianganImg(text){
        var img="";
        switch (text){
            case "甲":
                img="jia";
                break;
            case "乙":
                img="yi";
                break;
            case "丙":
                img="bing";
                break;
            case "丁":
                img="ding";
                break;
            case "戊":
                img="wu";
                break;
            case "己":
                img="ji";
                break;
            case "庚":
                img="geng";
                break;
            case "辛":
                img="xin";
                break;
            case "壬":
                img="ren";
                break;
            case "癸":
                img="gui";
                break;
        }
        return "img/tiangan/"+img+"@3x.png";
    }
    function getDizhiImg(text){
        var img="";
        switch (text){
            case "子":
                img="zi";
                break;
            case "丑":
                img="chou";
                break;
            case "寅":
                img="yin";
                break;
            case "卯":
                img="mao";
                break;
            case "辰":
                img="chen";
                break;
            case "巳":
                img="si";
                break;
            case "午":
                img="wu";
                break;
            case "未":
                img="wei";
                break;
            case "申":
                img="shen";
                break;
            case "酉":
                img="you";
                break;
            case "戌":
                img="xu";
                break;
            case "亥":
                img="hai";
                break;
        }
        return "img/dizhi/"+img+"@3x.png";
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
});
var textObj1,textObj;
function appCallback_share(){
    _hmt.push(['_trackEvent','bzmp_share_click', 'click', 'bzmp_share_click', 'bzmp_share_click']);
    var title="我在万年历查看我的八字命盘。";
    var link=location.href+"&share=1";
    textObj = {
        text: title,
        image: "1",
        url:link,
        pureText:title,
        prefix:""
    };
    textObj1={
        text: title,
        image: "1",
        targetUrl:link,
        perfix:""
    };
    try{
        if(window.ylwindow){
            ylwindow.reportHasShare(true);
            location.href="protocol://share:" + encodeURI(JSON.stringify(textObj1));
        }
        else{
            location.href="protocol://share#" + encodeURI(JSON.stringify(textObj));
        }
    }
    catch (e){
        alert(e)
    }
    return 1;
}