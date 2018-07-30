/* eslint-disable */
(function(global) {
    "use strict";
    var _Base64 = global.Base64;
    var version = "2.1.7";
    var buffer;
    if (typeof module !== "undefined" && module.exports) { buffer = require("buffer").Buffer }
    var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var b64tab = function(bin) { var t = {}; for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i; return t }(b64chars);
    var fromCharCode = String.fromCharCode;
    var cb_utob = function(c) { if (c.length < 2) { var cc = c.charCodeAt(0); return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | cc & 63) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63) } else { var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320); return fromCharCode(240 | cc >>> 18 & 7) + fromCharCode(128 | cc >>> 12 & 63) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63) } };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function(u) { return u.replace(re_utob, cb_utob) };
    var cb_encode = function(ccc) {
        var padlen = [0, 2, 1][ccc.length % 3],
            ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0),
            chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? "=" : b64chars.charAt(ord & 63)];
        return chars.join("")
    };
    var btoa = global.btoa ? function(b) { return global.btoa(b) } : function(b) { return b.replace(/[\s\S]{1,3}/g, cb_encode) };
    var _encode = buffer ? function(u) { return (u.constructor === buffer.constructor ? u : new buffer(u)).toString("base64") } : function(u) { return btoa(utob(u)) };
    var encode = function(u, urisafe) { return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g, function(m0) { return m0 == "+" ? "-" : "_" }).replace(/=/g, "") };
    var encodeURI = function(u) { return encode(u, true) };
    var re_btou = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g");
    var cb_btou = function(cccc) {
        switch (cccc.length) {
            case 4:
                var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3),
                    offset = cp - 65536;
                return fromCharCode((offset >>> 10) + 55296) + fromCharCode((offset & 1023) + 56320);
            case 3:
                return fromCharCode((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
            default:
                return fromCharCode((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1))
        }
    };
    var btou = function(b) { return b.replace(re_btou, cb_btou) };
    var cb_decode = function(cccc) {
        var len = cccc.length,
            padlen = len % 4,
            n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
            chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 255), fromCharCode(n & 255)];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join("")
    };
    var atob = global.atob ? function(a) { return global.atob(a) } : function(a) { return a.replace(/[\s\S]{1,4}/g, cb_decode) };
    var _decode = buffer ? function(a) { return (a.constructor === buffer.constructor ? a : new buffer(a, "base64")).toString() } : function(a) { return btou(atob(a)) };
    var decode = function(a) { return _decode(String(a).replace(/[-_]/g, function(m0) { return m0 == "-" ? "+" : "/" }).replace(/[^A-Za-z0-9\+\/]/g, "")) };
    var noConflict = function() {
        var Base64 = global.Base64;
        global.Base64 = _Base64;
        return Base64
    };
    global.Base64 = { VERSION: version, atob: atob, btoa: btoa, fromBase64: decode, toBase64: encode, utob: utob, encode: encode, encodeURI: encodeURI, btou: btou, decode: decode, noConflict: noConflict };
    if (typeof Object.defineProperty === "function") {
        var noEnum = function(v) { return { value: v, enumerable: false, writable: true, configurable: true } };
        global.Base64.extendString = function() {
            Object.defineProperty(String.prototype, "fromBase64", noEnum(function() { return decode(this) }));
            Object.defineProperty(String.prototype, "toBase64", noEnum(function(urisafe) { return encode(this, urisafe) }));
            Object.defineProperty(String.prototype, "toBase64URI", noEnum(function() { return encode(this, true) }))
        }
    }
})(window);
if (this["Meteor"]) { Base64 = global.Base64 }
/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find(list, f) {
    return list.filter(f)[0];
}
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy(obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj);
    if (hit) {
        return hit.copy;
    }
    const copy = Array.isArray(obj) ? [] : {};
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    });
    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache);
    });
    return copy;
}
 
function forEachValue(obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key));
}
 
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
 
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
 
function isPromise(val) {
    return val && typeof val.then === 'function';
}
 
function assert(condition, msg) {
    if (!condition) throw new Error(`[vuex] ${msg}`);
}
var ua = window.navigator.userAgent;
var isWeixin = /MicroMessenger/i.test(ua);
var isWnl = /wnl/i.test(ua);
var appVersion = parseInt(ua.substr(ua.indexOf('wnl ') + 4, 5).replace(/\./g, ''));
var appVersionString = ua.substr(ua.indexOf('wnl ') + 4, 5);
var iOSVersion = GetIOSVersion();
var androidVersion = getAndroidVersion();
var isAndroid = /Android|HTC/i.test(ua) || (window.navigator['platform'] + '').match(/Linux/i);
var isIPad = !isAndroid && /iPad/i.test(ua);
var isIPhone = !isAndroid && /iPod|iPhone/i.test(ua);
var isIOS = isIPad || isIPhone;
var isIphoneX = isIPhone && window.innerWidth === 375 && window.devicePixelRatio === 3;
 
function GetIOSVersion() {
    if (window.MSStream) {
        return false;
    }
    var match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
        version;
    if (match !== undefined && match !== null) {
        version = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3] || 0, 10)];
        return parseFloat(version.join('.'));
    }
    return false;
}
 
function getAndroidVersion() {
    ua = ua.toLowerCase();
    var match = ua.match(/android\s([0-9\.]*)/);
    return match ? parseFloat(match[1]) : false;
}
 
function jsonToQueryString(json) {
    return (
        '?' +
        Object.keys(json)
        .map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
        })
        .join('&')
    );
}
 
function checkPhone(text) {
    return /^\d{11}$/.test(text);
}
 
function canEditUserDetail() {
    // if ((isIOS && appVersion >= 455) || (isAndroid && appVersion >= 460)) {
    //     return true;
    // }
    return false;
}
 
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}
 
function formatDate(date, fmt) {
    var o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    return fmt;
}
 
function str2Int(str) {
    str = str.replace(/^0+/g, '');
    if (str.length == 0) {
        return 0;
    }
    return parseInt(str);
}
 
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
 
function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += ' ' + cls;
}
 
function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}
 
function toggleClass(obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls);
    }
    else {
        addClass(obj, cls);
    }
}
 
function outHeight(elm) {
    var elmHeight, elmMargin;
    if (document.all) {
        // IE
        elmHeight = elm.currentStyle.height;
        elmMargin = parseInt(elm.currentStyle.marginTop, 10) + parseInt(elm.currentStyle.marginBottom, 10) + 'px';
    }
    else {
        // Mozilla
        elmHeight = document.defaultView
            .getComputedStyle(elm, '')
            .getPropertyValue('height')
            .replace('px', '');
        elmMargin =
            parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top')) +
            parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom'));
    }
    return Math.ceil(elmHeight + elmMargin);
}
 
function getQueryValue(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg) || window.location.hash.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
/**
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @param Number atleast 至少多长时间触发一次
 * @return Function 延迟执行的方法
 */
function throttle(fn, delay, atleast) {
    var timer = null;
    var previous = null;
    return function(args) {
        var now = +new Date();
        if (!previous) previous = now;
        if (atleast && now - previous > atleast) {
            fn(args);
            // 重置上一次开始时间为本次结束时间
            previous = now;
            clearTimeout(timer);
        }
        else {
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn(args);
                previous = null;
            }, delay);
        }
    };
}
 
function getDayDistance(startDate, endDate) {
    var starttimes = startDate.getTime();
    var endtimes = endDate.getTime();
    var intervalTime = starttimes - endtimes; //两个日期相差的毫秒数 一天86400000毫秒
    var InterDays = Math.floor(((intervalTime).toFixed(2) / 86400000)); //加1，是让同一天的两个日期返回一天
    return InterDays;
}
 
function getDayDistanceString(distance) {
    var dayDistance = '';
    if (distance === 0) {
        dayDistance = '今天';
    }
    else if (distance === -1) {
        dayDistance = '明天';
    }
    else if (distance === 1) {
        dayDistance = '昨天';
    }
    else if (distance < -1) {
        dayDistance = Math.abs(distance) + '天后';
    }
    else if (distance > 1) {
        dayDistance = distance + '天前';
    }
    return dayDistance;
}
 
function setHairlines() {
    if (window.devicePixelRatio && devicePixelRatio >= 2) {
        var testElem = document.createElement('div');
        testElem.style.border = '.5px solid transparent';
        document.body.appendChild(testElem);
        if (testElem.offsetHeight == 1) {
            document.querySelector('html').classList.add('hairlines');
        }
        document.body.removeChild(testElem);
    }
}

function findBreakPoint (text, width, context) {
    var min = 0;
    var max = text.length - 1;
     
    while (min <= max) {
        var middle = Math.floor((min + max) / 2);
        var middleWidth = context.measureText(text.substr(0, middle)).width;
        var oneCharWiderThanMiddleWidth = context.measureText(text.substr(0, middle + 1)).width;
        if (middleWidth <= width && oneCharWiderThanMiddleWidth > width) {
            return middle;
        }
        if (middleWidth < width) {
            min = middle + 1;
        } else {
            max = middle - 1;
        }
    }
     
    return -1;
}
function breakLinesForCanvas (cav, text, width, font) {
    // var canvas = document.getElementById('canvas');
    var context = cav.getContext('2d');
    var result = [];
    var breakPoint = 0;
     
    if (font) {
        context.font = font;
    }
     
    while ((breakPoint = findBreakPoint(text, width, context)) !== -1) {
        result.push(text.substr(0, breakPoint));
        text = text.substr(breakPoint);
    }
     
    if (text) {
        result.push(text);
    }
     
    return result;
}

function getQiNiuTk(imgdata) {
    imgdata = imgdata.substring(23);
    var xmlhttp;
    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
      }
    else
      {// code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            console.log(xmlhttp.responseText);
            var res = JSON.parse(xmlhttp.responseText);
            var url = "//upload.qiniu.com/putb64/-1"; //非华东空间需要根据注意事项 1 修改上传域名
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange=function(){
                if (xhr.readyState==4){
                  console.log(xhr.responseText);
                  var resData = JSON.parse(xhr.responseText);
                  console.log(resData.key);
                  return resData.key;
                }
            }
            xhr.open("POST", url, false);
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.setRequestHeader("Authorization", 'UpToken '+res.token);
            xhr.send(imgdata);
        }
    }
    xmlhttp.open("GET","https://msg.51wnl.com/api/Active/qintoken",false);
    xmlhttp.send();
}

var util = {
    isWnl,
    isWeixin,
    isIOS,
    isAndroid,
    appVersion,
    appVersionString,
    iOSVersion,
    androidVersion,
    isIphoneX,
    find,
    deepCopy,
    forEachValue,
    isObject,
    isEmptyObject,
    isPromise,
    assert,
    jsonToQueryString,
    checkPhone,
    formatNumber,
    formatDate,
    str2Int,
    hasClass,
    addClass,
    removeClass,
    toggleClass,
    outHeight,
    getQueryValue,
    throttle,
    base64decode: Base64.decode,
    base64encode: Base64.encode,
    getDayDistance,
    getDayDistanceString,
    setHairlines,
    breakLinesForCanvas,
    getQiNiuTk
};
export default util;