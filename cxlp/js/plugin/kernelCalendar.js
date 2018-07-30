
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



var BASE_STEMS_DATE=new Date(1899, 1, 4, 0, 0);
var JXTable = [
    0xD2C, 0x34B, 0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34B, 0xCD2, 0xB34,//甲子，乙丑，丙寅，丁卯，戊辰，己巳，庚午，辛未，壬申，癸酉
    0x2DD, 0x4A3, 0xD2C, 0x34B, 0xCD2, 0xB34, 0x2C5, 0x4B2, 0xD2C, 0x34B,//甲戌，乙亥，丙子，丁丑，戊寅，己卯，庚辰，辛巳，壬午，癸未
    0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34A, 0xCD2, 0xB34, 0x2CD, 0x4B3,//甲申，乙酉，丙戌，丁亥，戊子，己丑，庚寅，辛卯，壬辰，癸巳
    0xD2C, 0x34B, 0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34B, 0xCD2, 0xB24,//甲午，乙未，丙申，丁酉，戊戌，己亥，庚子，辛丑，壬寅，癸卯
    0x2CD, 0x4A3, 0xD28, 0x34B, 0xCD2, 0xB34, 0x2CD, 0x4A3, 0xD2C, 0x34B,//甲辰，乙巳，丙午，丁未，戊申，己酉，庚戌，辛亥，壬子，癸丑
    0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34B, 0xCF2, 0xB34, 0x2CD, 0x4B3 //甲寅，乙卯，丙辰，丁巳，戊午，己未，庚申，辛酉，壬戌，癸亥
];

var  range = [
    "23:00-00:59",
    "01:00-02:59",
    "03:00-04:59",
    "05:00-06:59",
    "07:00-08:59",
    "09:00-10:59",
    "11:00-12:59",
    "13:00-14:59",
    "15:00-16:59",
    "17:00-18:59",
    "19:00-20:59",
    "21:00-22:59"
];

var  CompassNames = ["正北", "东北", "正东", "东南", "正南", "西南", "正西", "西北"];

var  JXNames = ["吉", "凶"];

var CompassUnknown = -1;
var CompassNorth = 0;
var CompassNortheast = 1;
var CompassEast = 2;
var CompassSoutheast = 3;
var CompassSouth = 4;
var CompassSouthwest = 5;
var CompassWest = 6;
var CompassNorthwest = 7;

var JXStatusUnknown = -1;
var JXStatusJi = 0;
var JXStatusXiong = 1;

/**
 * 获取节气索引
 *
 * @param solar
 * @param ignoreTime
 * @return
 */
function stemIndexOfSolar(solar, lunarHour, ignoreTime) {
    var stemIndex = -1;
    if (ignoreTime) {
        stemIndex = getStemsDay(solar);
    }
    else {
        stemIndex = getStemBranchHour(solar,lunarHour) % 10;
    }
    return stemIndex;
}
/**
 * 干日
 *
 * @param date
 * @return
 */
function getStemsDay(date) {
    var  dayOffset = getIntervalDays(BASE_STEMS_DATE, date);
    if (dayOffset > 0) {
        return parseInt((dayOffset + 9) % 10);
    }
    return 0;
}
/**
 * 获取干支计时
 *
 * @param _date
 * @param lunarHour
 * @return
 */
function getStemBranchHour(_date,lunarHour) {
    var  dayOffset = getIntervalDays(BASE_STEMS_DATE, _date);
    var dt = parseInt((dayOffset + 9) % 10);
    var hb = lunarHour;
    var ht = (hb + ((dt > 4) ? (dt - 5) : dt) * 2) % 10;
    var termHour = ((6 * ht - 5 * hb) + 60) % 60;
    return termHour;
}
/**
 * 干支计日
 *
 * @param date
 * @return
 */
function getStemsBranchDay(date) {
    var  dayOffset = getIntervalDays(BASE_STEMS_DATE, date);
    if (dayOffset > 0) {
        var t = parseInt((dayOffset + 9) % 10);
        var b = parseInt((dayOffset + 3) % 12);
        return ((6 * t - 5 * b) + 60) % 60;
    }
    return -1;
}
function getIntervalDays(base_date,_date){
    _date.setHours(0);
    _date.setMinutes(0);
    _date.setSeconds(0);
    _date.setMilliseconds(0);
    return Math.floor(Math.abs(base_date - _date)/(1000*60*60*24));
}
/**
 * 根据Stem计算财神罗盘位置
 * 坎->正北;坤->西南;震->正东;巽->东南;乾->西北;卦->正西;艮->东北;离->正南
 * 甲艮乙坤丙丁兑；戊己财神坐坎位；庚辛正东壬癸南；此是财神正方位。
 *
 * @param stemIndex
 * @return
 */
function caiCompassValueOfStemIndex(stemIndex) {
    var  value = CompassUnknown;
    switch (stemIndex) {
        case 0://甲
            value = CompassNortheast;
            break;
        case 1://乙
            value = CompassSouthwest;
            break;
        case 2://丙
        case 3://丁
            value = CompassWest;
            break;
        case 4://戊
        case 5://己
            value = CompassNorth;
            break;
        case 6://庚
        case 7://辛
            value = CompassEast;
            break;
        case 8://壬
        case 9://癸
            value = CompassSouth;
            break;
        default:
            break;
    }
    return value;
}
/**
 * 计算喜神方位
 *
 * @param stemIndex
 * @return
 */
/*甲己在艮乙庚乾；丙辛坤位喜神安；丁壬只在离中坐；戊癸原在巽中间。*/
function xiCompassValueOfStemIndex(stemIndex) {
    var value = CompassUnknown;
    switch (stemIndex) {
        case 0://甲
        case 5://己
            value = CompassNortheast;
            break;
        case 1://乙
        case 6://庚
            value = CompassNorthwest;
            break;
        case 2://丙
        case 7://辛
            value = CompassSouthwest;
            break;
        case 3://丁
        case 8://壬
            value = CompassSouth;
            break;
        case 4://戊
        case 9://癸
            value = CompassSoutheast;
            break;
        default:
            break;
    }
    return value;
}
/**
 * 计算福神方位
 *
 * @param stemIndex
 * @return
 */
/*甲己正北是福神；丙辛西北乾宫存；乙庚坤位戊癸艮；丁壬巽上妙追寻。*/
/*其它地方查到的福神与这句口诀都不相符：甲乙：东南、丙丁：东、庚辛：西南、戊：北、己：南、壬：西北、癸：西 */
function fuCompassValueOfStemIndex(stemIndex) {
    var value = CompassUnknown;
    switch (stemIndex) {
        case 0://甲
        case 1://乙
            value = CompassSoutheast;
            break;
        case 2://丙
        case 3://丁
            value = CompassEast;
            break;
        case 4://戊
            value = CompassNorth;
            break;
        case 5://己
            value = CompassSouth;
            break;
        case 6://庚
        case 7://辛
            value = CompassSouthwest;
            break;
        case 8://壬
            value = CompassNorthwest;
            break;
        case 9://癸
            value = CompassWest;
            break;
        default:
            break;
    }
    return value;
}

function yinCompassValueOfStemIndex(stemIndex) {
    var value = CompassUnknown;
    switch (stemIndex) {
        case 0://甲
            value = CompassNortheast;
            break;
        case 1://乙
            value = CompassNorth;
            break;
        case 2://丙
            value = CompassNorthwest;
            break;
        case 3://丁
            value = CompassWest;
            break;
        case 4://戊
            value = CompassSouthwest;
            break;
        case 5://己
            value = CompassSouthwest;
            break;
        case 6://庚
            value = CompassSouthwest;
            break;
        case 7://辛
            value = CompassSouth;
            break;
        case 8://壬
            value = CompassSoutheast;
            break;
        case 9://癸
            value = CompassEast;
            break;
        default:
            break;
    }
    return value;
}
function yangCompassValueOfStemIndex(stemIndex) {
    var value = CompassUnknown;
    switch (stemIndex) {
        case 0://甲
        case 1://乙
            value = CompassSouthwest;
            break;
        case 2://丙
            value = CompassWest;
            break;
        case 3://丁
            value = CompassNorthwest;
            break;
        case 4://戊
            value = CompassNortheast;
            break;
        case 5://己
            value = CompassNorth;
            break;
        case 6://庚
        case 7://辛
            value = CompassNortheast;
            break;
        case 8://壬
            value = CompassEast;
            break;
        case 9://癸
            value = CompassSoutheast;
            break;
        default:
            break;
    }
    return value;
}
/**
 * 方位
 *
 * @param value
 * @return
 */
function getCompassName(value) {
    if (value < 0 || value > CompassNames.length) {
        return "";
    }
    return CompassNames[value];
}
function getLumarHourIndex(hour){
    return (Math.floor(hour/2)+hour%2)%12;
}
/**
 * 吉凶名称
 *
 * @param value
 * @return
 */
function getJXName(value) {
    if (value < 0 || value > JXNames.length) {
        return "";
    }
    return JXNames[value];
}
/**
 * 计算当前时辰吉凶
 *
 * @param solar
 * @return
 */
function jixiongStatusOfDateTime(solar,hourNow) {
    var status = JXStatusUnknown;
    var stemIndex = getStemsBranchDay(solar);//[self.lunarMgr stemBranchDayOfSolarDate:solar];
    if (stemIndex > -1 && stemIndex < 60) {
        var hexValue = JXTable[stemIndex];
        var chineseHour = getLumarHourIndex(hourNow);//[datetime ylChineseNumHour];
        var moveCount = (11 - chineseHour);
        var value = (hexValue >> moveCount) & 0x1;
        status = value > 0 ? JXStatusJi : JXStatusXiong;
    }
    return status;
}
var lunarHourList=["子时","丑时","寅时","卯时","辰时","巳时","午时","未时","申时","酉时","戌时","亥时"];
/**
 * 计算财神方位根据时辰
 *
 * @param solar
 * @param lunarHour
 * @return
 */
function compassCNOfDate(solar) {
    var hourNow=solar.getHours();
    var hourIndex=getLumarHourIndex(hourNow);
    var stemIndex = getStemBranchHour(solar, hourIndex) % 10;
    var caiValue = caiCompassValueOfStemIndex(stemIndex);
    var xiValue = xiCompassValueOfStemIndex(stemIndex);
    var fuValue = fuCompassValueOfStemIndex(stemIndex);
    var yangValue = yangCompassValueOfStemIndex(stemIndex);
    var yinValue = yinCompassValueOfStemIndex(stemIndex);    
    var jixiong = getJXName(jixiongStatusOfDateTime(solar,hourNow));
    return {
        "cai":getCompassName(caiValue),
        "xi":getCompassName(xiValue),
        "fu":getCompassName(fuValue),
        "yang":getCompassName(yangValue),
        "yin":getCompassName(yinValue),        
        "jx":jixiong,
        "l":lunarHourList[hourIndex]
    }
}
