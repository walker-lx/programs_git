"use strict";
var root = typeof self == 'object' && self.self === self && self ||
    typeof global == 'object' && global.global === global && global ||
    this;
//设备判断
var device = {};
var ua = root.navigator.userAgent;
var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
// Android
if (android) {
    device.os = 'android'
    device.osVersion = android[2]
    device.android = true
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0
}
if (ipad || iphone || ipod) {
    device.os = 'ios'
    device.ios = true
}
// iOS
if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.')
    device.iphone = true
}
if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.')
    device.ipad = true
}
// iOS 8+ changed UA
if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
        device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0]
    }
}
device.weixin = /MicroMessenger/i.test(ua);
// Pixel Ratio
device.pixelRatio = window.devicePixelRatio || 1
device.wnl = /wnl/i.test(ua)
device.appVersion = parseInt(ua.split(' ').pop().replace(/\./g, ''))

device.sysVersion = GetIOSVersion() || getAndroidVersion();

function GetIOSVersion() {
    if (window.MSStream) {
        return false;
    }
    var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
        version;
    if (match !== undefined && match !== null) {
        version = [
            parseInt(match[1], 10),
            parseInt(match[2], 10),
            parseInt(match[3] || 0, 10)
        ];
        return parseFloat(version.join('.'));
    }

    return false;
}

function getAndroidVersion() {
    ua = ua.toLowerCase();
    var match = ua.match(/android\s([0-9\.]*)/);
    return match ? parseFloat(match[1]) : false;
}

export function parseURL(url) {
    var a = document.createElement('a');
    a.href = url
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            var ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length,
                i = 0,
                s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = decodeURIComponent(s[1]);
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}


export function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

var store = (function () {
    var store = {}

    store.setItem = function (key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    store.getItem = function (key) {
        return JSON.parse(window.localStorage.getItem(key))
    }
    return store
})();

export { device, store }
