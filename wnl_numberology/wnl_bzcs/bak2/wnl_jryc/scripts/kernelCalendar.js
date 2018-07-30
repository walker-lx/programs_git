
/*****************************************************************************
日期资料
*****************************************************************************/

var lunarInfo = new Array(
0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
0x14b63);

var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");

var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
var nStr2 = new Array('初', '十', '廿', '卅', '□');
var monthName = new Array("正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月");

/*****************************************************************************
日期计算
*****************************************************************************/

//====================================== 返回农历 y年的总天数
function lYearDays(y) {
    var i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
    return (sum + leapDays(y));
}

//====================================== 返回农历 y年闰月的天数
function leapDays(y) {
    if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
    else return (0);
}

//====================================== 返回农历 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {

    ///<summary>
    ///返回农历 y年闰哪个月 1-12 , 没闰返回 0
    ///</summary>


    return (lunarInfo[y - 1900] & 0xf);
}

//====================================== 返回农历 y年m月的总天数
function monthDays(y, m) {
    return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}


//====================================== 算出农历, 传入日期控件, 返回农历日期控件
//                                       该控件属性有 .year .month .day .isLeap
function Lunar(objDate) {

    var i, leap = 0, temp = 0;
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;

    for (i = 1900; i < 2050 && offset > 0; i++) { temp = lYearDays(i); offset -= temp; }

    if (offset < 0) { offset += temp; i--; }

    this.year = i;

    leap = leapMonth(i); //闰哪个月
    this.isLeap = false;

    for (i = 1; i < 13 && offset > 0; i++) {
        //闰月
        if (leap > 0 && i == (leap + 1) && this.isLeap == false)
        { --i; this.isLeap = true; temp = leapDays(this.year); }
        else
        { temp = monthDays(this.year, i); }

        //解除闰月
        if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;

        offset -= temp;
    }

    if (offset == 0 && leap > 0 && i == leap + 1)
        if (this.isLeap)
        { this.isLeap = false; }
        else
        { this.isLeap = true; --i; }

    if (offset < 0) { offset += temp; --i; }

    this.month = i;
    this.day = offset + 1;
}

//==============================返回公历 y年某m+1月的天数
function solarDays(y, m) {
    if (m == 1)
        return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
    else
        return (solarMonth[m]);
}
//============================== 传入 offset 返回干支, 0=甲子
function cyclical(num) {
    return (Gan[num % 10] + Zhi[num % 12]);
}

//============================== 阴历属性
function calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, cYear, cMonth, cDay) {

    this.isToday = false;
    //瓣句
    this.sYear = sYear;   //公元年4位数字
    this.sMonth = sMonth;  //公元月数字
    this.sDay = sDay;    //公元日数字
    this.week = week;    //星期, 1个中文
    //农历
    this.lYear = lYear;   //公元年4位数字
    this.lMonth = lMonth;  //农历月数字
    this.lDay = lDay;    //农历日数字
    this.isLeap = isLeap;  //是否为农历闰月?
    //八字
    this.cYear = cYear;   //年柱, 2个中文
    this.cMonth = cMonth;  //月柱, 2个中文
    this.cDay = cDay;    //日柱, 2个中文

    this.color = '';

    this.lunarFestival = ''; //农历节日
    this.solarFestival = ''; //公历节日
    this.solarTerms = ''; //节气
}

//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y, n) {
    var offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
    return (offDate.getUTCDate());
}

//============================== 返回阴历控件 (y年,m+1月)
/*
功能说明: 返回整个月的日期资料控件

使用方式: OBJ = new calendar(年,零起算月);

OBJ.length      返回当月最大日
OBJ.firstWeek   返回当月一日星期

由 OBJ[日期].属性名称 即可取得各项值

OBJ[日期].isToday  返回是否为今日 true 或 false

其他 OBJ[日期] 属性参见 calElement() 中的注解
*/

function calendar(y, m) {
	var Today = new Date();
	var tY = Today.getFullYear();
	var tM = Today.getMonth();
	var tD = Today.getDate();
    var sDObj, lDObj, lY, lM, lD = 1, lL, lX = 0, tmp1, tmp2, tmp3, lM2, lY2, lD2, xs, fs, cs;
    var cY, cM, cD; //年柱,月柱,日柱
    var lDPOS = new Array(3);
    var n = 0;
    var firstLM = 0;
    sDObj = new Date(y, m, 1, 0, 0, 0, 0);    //当月一日日期
    this.length = solarDays(y, m);       //公历当月天数
    this.firstWeek = sDObj.getDay();    //公历当月1日星期几
    ////////年柱 1900年立春后为庚子年(60进制36)
    if (m < 2) cY = cyclical(y - 1900 + 36 - 1);
    else cY = cyclical(y - 1900 + 36);
    var term2 = sTerm(y, 2); //立春日期
    ////////月柱 1900年1月小寒以前为 丙子月(60进制12)
    var firstNode = sTerm(y, m * 2) //返回当月「节」为几日开始
    cM = cyclical((y - 1900) * 12 + m + 12);
    lM2 = (y - 1900) * 12 + m + 12;
    //当月一日与 1900/1/1 相差天数
    //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
    var dayCyclical = Date.UTC(y, m, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    for (var i = 0; i < this.length; i++) {
        if (lD > lX) {
            sDObj = new Date(y, m, i + 1);    //当月一日日期
            lDObj = new Lunar(sDObj);     //农历
            lY = lDObj.year;              //农历年
            lM = lDObj.month;             //农历月
            lD = lDObj.day;               //农历日
            lL = lDObj.isLeap;            //农历是否闰月
            lX = lL ? leapDays(lY) : monthDays(lY, lM); //农历当月最后一天
            if (n == 0) firstLM = lM;
            lDPOS[n++] = i - lD + 1;
        }
        //依节气调整二月分的年柱, 以立春为界
        if (m == 1 && (i + 1) == term2) {
            cY = cyclical(y - 1900 + 36);
            lY2 = (y - 1900 + 36);
        }
        //依节气月柱, 以「节」为界
        if ((i + 1) == firstNode) {
            cM = cyclical((y - 1900) * 12 + m + 13);
            lM2 = (y - 1900) * 12 + m + 13;
        }
        //日柱
        cD = cyclical(dayCyclical + i);
        lD2 = (dayCyclical + i);
        this[i] = new calElement(y, m + 1, i + 1, nStr1[(i + this.firstWeek) % 7], lY, lM, lD++, lL, cY, cM, cD);
        if ((lD2) % 10 == 0 || (lD2) % 10 == 5) { xs = '东北'; }
        else if ((lD2) % 10 == 1 || (lD2) % 10 == 6) { xs = '西北'; }
        else if ((lD2) % 10 == 2 || (lD2) % 10 == 7) { xs = '西南'; }
        else if ((lD2) % 10 == 3 || (lD2) % 10 == 8) { xs = '正南'; }
        else if ((lD2) % 10 == 4 || (lD2) % 10 == 9) { xs = '东南'; }
        if ((lD2) % 10 == 0 || (lD2) % 10 == 1) { fs = '东南'; }
        else if ((lD2) % 10 == 2 || (lD2) % 10 == 3) { fs = '正东'; }
        else if ((lD2) % 10 == 4) { fs = '正北'; }
        else if ((lD2) % 10 == 5) { fs = '正南'; }
        else if ((lD2) % 10 == 6 || (lD2) % 10 == 7) { fs = '西南'; }
        else if ((lD2) % 10 == 8) { fs = '西北'; }
        else if ((lD2) % 10 == 9) { fs = '正西'; }
        if ((lD2) % 10 == 0 || (lD2) % 10 == 1) { cs = '东北'; }
        else if ((lD2) % 10 == 2 || (lD2) % 10 == 3) { cs = '西南'; }
        else if ((lD2) % 10 == 4 || (lD2) % 10 == 5) { cs = '正北'; }
        else if ((lD2) % 10 == 6 || (lD2) % 10 == 7) { cs = '正东'; }
        else if ((lD2) % 10 == 8 || (lD2) % 10 == 9) { cs = '正南'; }
    }
    //节气
    tmp1 = sTerm(y, m * 2) - 1;
    tmp2 = sTerm(y, m * 2 + 1) - 1;
    tmp1 = solarTermChange(y + "-" + (m + 1)+"-"+(tmp1+1), tmp1);
    tmp2 = solarTermChange(y + "-" + (m + 1) + "-" + (tmp2 + 1), tmp2);
    this[tmp1].solarTerms = solarTerm[m * 2];
    this[tmp2].solarTerms = solarTerm[m * 2 + 1];
    if (m == 3) this[tmp1].color = 'red'; //清明颜色
}

//====================== 中文日期
function cDay(d) {
    var s;

    switch (d) {
        case 10:
            s = '初十'; break;
        case 20:
            s = '二十'; break;
            break;
        case 30:
            s = '三十'; break;
            break;
        default:
            s = nStr2[Math.floor(d / 10)];
            s += nStr1[d % 10];
    }
    return (s);
}
//===================返回属相
function getPet (birthyear,lichunOffset) {
    var start = 1900,value="";
    x = (birthyear-start) % 12;
    if(x!==0&&lichunOffset<0){
        x-=1;
    }
    value=Animals[x];
    return value;
}
//节气日期的调整
function solarTermChange(detailday, tem) {
    var TermChangeDayArray = {
        "2012-5-21": "20", "2012-12-6": "7", "2013-2-3": "4", "2013-7-23": "22",
        "2013-12-21": "22", "2014-3-5": "6", "2015-1-5": "6", "2017-7-23": "22",
        "2017-12-21": "22", "2018-2-18": "19", "2018-3-20": "21", "2019-2-5": "4",
        "2019-6-22": "21", "2020-7-7": "6", "2020-8-23": "22", "2020-12-6": "7"
    };

    var result;
    try {
        if (typeof TermChangeDayArray[detailday] != 'undefined') {
            result = parseInt( TermChangeDayArray[detailday],10)-1;
        }
        else {
            result = tem;
        }
    }
    catch (e) {
        result = tem;
    }
    return result;
}
function GetSolarDateFromLunar(yearparam,monthparam,dayparam){
    var isleappara = false;
    if (monthparam == "13") {
        isleappara = true;
        monthparam = leapMonth(parseInt(yearparam, 10));
    }
    return GetSolarFromLunar(yearparam,monthparam,dayparam,isleappara);
}
function GetSolarFromLunar(year, month, day, isLeap) {

    ///<summary>通过农历年月日，是否闰月得到阳历日期</summary>
    ///<return type="string" />

    ///思路 先计算农历距离1.1日的天数差

    year = parseInt(year, 10);
    month = parseInt(month, 10);
    day = parseInt(day, 10);

    var haveLeapmonth = leapMonth(year);
    var DayCounts = 0;
    var Diffrence = 0;
    for (var i = 1; i < month; i++) {
        DayCounts += monthDays(year, i);
    }
    if (haveLeapmonth > 0) {
        if (month > haveLeapmonth) {
            DayCounts += leapDays(year);
        }
        else {
            if (month == haveLeapmonth && isLeap) {
                DayCounts += monthDays(year, month);
            }
        }
    }
    DayCounts += day;

    var solarTolunar = new calendar(year, 0);
    var solarFirstDay = solarTolunar[0];

    var PreYearDayCount = 0;
    try {
        for (var j = 1; j < solarFirstDay.lMonth; j++) {
            PreYearDayCount += monthDays(solarFirstDay.lYear, j);
        }
    }
    catch (e) {
        alert(e.message);
    }
    if (solarFirstDay.isLeap) {
        PreYearDayCount += monthDays(solarFirstDay.lYear, solarFirstDay.lMonth);
    }
    PreYearDayCount += solarFirstDay.lDay;

    if (solarFirstDay.lYear < year) {
        var PreYearTotal = lYearDays(solarFirstDay.lYear);

        PreYearDayCount+=leapDays(solarFirstDay.lYear);
        Diffrence = PreYearTotal - PreYearDayCount+DayCounts;
    }
    else {
        Diffrence = DayCounts - PreYearDayCount;
    }
    return DateCalculate(new Date(year, 0, 1), Diffrence, "d");
}
/*时间计算
 calculateDate:计算的时间基数 时间类型
 number:计算的参数  整形
 type  :类型 枚举类型
 返回时间类型
 */
function DateCalculate(calculateDate,number,type)
{
    var calculateResult;
    switch (type) {
        case "s":
            calculateResult = new Date(Date.parse(calculateDate) + (1000 * parseInt(number)));
            break;
        case "m":
            calculateResult = new Date(Date.parse(calculateDate) + (60000 * parseInt(number)));
            break;
        case "h":
            calculateResult = new Date(Date.parse(calculateDate) + (3600000 * parseInt(number)));
            break;
        case "d":
            calculateResult = new Date(Date.parse(calculateDate) + (86400000 * parseInt(number)));
            break;
        case "w":
            calculateResult = new Date(Date.parse(calculateDate) + ((86400000 * 7) * parseInt(number)));
            break;
        case "M":
            calculateResult = new Date(calculateDate.getFullYear(), (calculateDate.getMonth()) + parseInt(number), calculateDate.getDate(),
                calculateDate.getHours(), calculateDate.getMinutes(), calculateDate.getSeconds());
            break;
        case "y":
            calculateResult = new Date(calculateDate.getFullYear() + parseInt(number), (calculateDate.getMonth()), calculateDate.getDate(),
                calculateDate.getHours(), calculateDate.getMinutes(), calculateDate.getSeconds());
            break;
    }
    return calculateResult;
}
