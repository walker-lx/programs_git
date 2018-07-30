/*
万年历客户端分享js库
2016/11/15 create by liuyu
*/
(function() {
    "use strict";
    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this;
    //设备判断
    var device = {},
        ua = root.navigator.userAgent,
        android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
    // Android
    if (android) {
        device.os = 'android';
        device.osVersion = android[2];
        device.android = true;
        device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
        device.osVersion = iphone[2].replace(/_/g, '.');
        device.iphone = true;
    }
    if (ipad) {
        device.osVersion = ipad[2].replace(/_/g, '.');
        device.ipad = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
        if (device.osVersion.split('.')[0] === '10') {
            device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
        }
    }
    device.isWeixin = /MicroMessenger/i.test(ua);
    // Pixel Ratio
    device.pixelRatio = window.devicePixelRatio || 1;

    var isAndroid = device.android,
        isIPad = device.ipad,
        isIPhone = device.iphone,
        isIOS = device.ios,
        isWeixin = device.isWeixin,
        isWnl = /wnl/i.test(ua),
        appVersion = parseInt(ua.split(' ').pop().replace(/\./g, ''));
    /*==================================================================
    direct必须设为true，如果需要旧版弹框分享请使用旧版分享方式
    ===================================================================*/
    function ShareObject(callback, platform, shareData) {
        //是否直接发送分享信息，默认为true
        this.direct = true;
        //发送分享信息后的回调函数名
        this.callback = callback;
        //分享平台名
        this.platform = platform;
        //分享数据对象
        this.shareData = shareData;
    }
    /*==================================================================
    image设为0，并且不填imageURL的情况下，客户端只分享text设置的文字，
    image设为0，并设置了imageURL地址，客户端分享的图标为imageURL设置的图片
    image设为1，分享的链接图标为系统截图，并且imageURL参数无效
    ===================================================================*/
    function ShareObjectOld(text, image, targetUrl, imageURL) {
        if (isIOS) {
            //分享标题
            this.pureText = text;
            //截图或者使用自定义图片
            this.image = image || '0';
            // 链接地址
            this.url = targetUrl;
            //自定义图片地址
            this.imageURL = imageURL;
        } else if (isAndroid) {
            //分享标题
            this.text = text;
            //截图或者使用自定义图片
            this.image = image || '0';
            // 链接地址
            this.targetUrl = targetUrl;
            //自定义图片地址
            this.imageURL = imageURL;
        }
    }

    function isObject(param) {
        return Object.prototype.toString.call(param) === '[object Object]';
    }
    //平台数组
    var platformList = ['qq', 'qzone', 'weixin', 'weixin_circle', 'sina', 'email', 'sms'];
    root.WNLUtil = {
        version: '1.0.1',
        isAndroid: isAndroid,
        isIPad: isIPad,
        isIPhone: isIPhone,
        isIOS: isIOS,
        isWeixin: isWeixin,
        isWnl: isWnl,
        appVersion: appVersion,
        device: device,
        shareObjectOld: null,
        shareObject: null,
        callback: 'shareCallback',
        //设置旧版分享数据
        setShareDataOld: function(param) {
            if (isObject(param)) {
                if (isIOS) {
                    this.shareObjectOld = new ShareObjectOld(param.pureText, param.image, param.url, param.imageURL);
                } else if (isAndroid) {
                    this.shareObjectOld = new ShareObjectOld(param.text, param.image, param.targetUrl, param.imageURL);
                }
            } else {
                throw new Error('object not available');
            }
        },
        /*==================================================================
        设置分享平台和分享参数
        不设置image地址，默认分享图标为万年历图标
        设置image为shot，默认分享图标为屏幕截图
        设置image参数为shot，不设置title和text,默认直接分享屏幕截图
        设置image参数为链接地址，不设置title和text,默认直接分享链接图片
        ===================================================================*/
        setShareData: function(platform, param) {
            if (isObject(param)) {
                var shareData = {},
                    perload = false;
                if (param.image === undefined || param.image === null || param.image === '' || param.image === 'shot') {
                    perload = false;
                } else {
                    perload = true;
                }
                shareData[platform] = platform;
                shareData[platform] = {
                    //分享标题
                    title: param.title,
                    //分享文本
                    text: param.text,
                    //分享链接图标或者图片
                    image: param.image,
                    //分享链接
                    url: param.url,
                    //是否预加载
                    preload: perload
                };
                this.shareObject = new ShareObject(WNLUtil.callback, platform, shareData);
            } else {
                throw new Error('object not available');
            }

        },
        //设置直接分享到微信，不用填平台参数
        setShareDataForWeichat: function(param) {
            this.setShareData('weixin', param);
        },
        //设置只分享图片
        setShareDataForImage: function(platform, param) {
            var shareData = {},
                perload = false;
            if (param === undefined || param === null || param === '' || param === 'shot') {
                perload = false;
            } else {
                perload = true;
            }
            shareData[platform] = {
                image: param,
                preload: perload
            };
            this.shareObject = new ShareObject(WNLUtil.callback, platform, shareData);
        },
        setShareDataForSina: function(platform, param) {
            var shareData = {},
                perload = false;
            if (param === undefined || param === null || param === '' || param === 'shot') {
                perload = false;
            } else {
                perload = true;
            }
            shareData[platform] = {
                title: '分享图片',
                image: param,
                preload: perload
            };
            this.shareObject = new ShareObject(WNLUtil.callback, platform, shareData);
        },
        //地址栏参数转对象
        ParseQueryString: function(str) {
            var ret = Object.create(null);
            if (typeof str !== 'string') {
                return ret;
            }

            str = str.trim().replace(/^(\?|#|&)/, '');

            if (!str) {
                return ret;
            }

            str.split('&').forEach(function(param) {
                var parts = param.replace(/\+/g, ' ').split('=');
                var key = parts.shift();
                var val = parts.length > 0 ? parts.join('=') : undefined;
                key = decodeURIComponent(key);
                val = val === undefined ? null : decodeURIComponent(val);
                if (ret[key] === undefined) {
                    ret[key] = val;
                } else if (Array.isArray(ret[key])) {
                    ret[key].push(val);
                } else {
                    ret[key] = [ret[key], val];
                }
            });
            return ret;
        },
        //设置客户端下载链接
        setDownLoad: function() {
            if (isWeixin) {
                location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
            } else {
                if (isIOS) {
                    location.href = "http://um0.cn/89wDL";
                } else if (isAndroid) {
                    location.href = "http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]";
                } else {
                    location.href = "http://www.51wnl.com";
                }
            }
        }
    };
    //向客户端发送分享请求
    root.appCallback_share = function() {
        /*
        if (WNLUtil.shareObjectOld && WNLUtil.shareObjectOld instanceof ShareObjectOld) {
            if (isIOS) {
                try {
                    location.href = "protocol://share#" + encodeURI(JSON.stringify(WNLUtil.shareObjectOld));
                    // WNLUtil.shareObjectOld = {};
                } catch (e) {
                    alert(e);
                }
            } else if (isAndroid) {
                try {
                    if (window.ylwindow) {
                        ylwindow.reportHasShare(true);
                        location.href = "protocol://share:" + encodeURI(JSON.stringify(WNLUtil.shareObjectOld));
                        // WNLUtil.shareObjectOld = {};
                    }
                } catch (e) {
                    alert(e);
                }
            }
            return 1;
        } else if (WNLUtil.shareObject && WNLUtil.shareObject instanceof ShareObject) {
            if ((isIOS && appVersion < 450) || (isAndroid && appVersion < 451)) {
                alert('新版分享需要IOS450或者Android451');
                return 0;
            }
            try {
                if (window.ylwindow) {
                    ylwindow.reportHasShare(true);
                    window.location.href = "protocol://share#" + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
                    // WNLUtil.shareObject = {};
                } else {
                    window.location.href = "protocol://share#" + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
                    // WNLUtil.shareObject = {};
                }
            } catch (e) {
                alert(e);
            }
            return 1;
        }else {
        */
        if ((isIOS && appVersion <= 450) || (isAndroid && appVersion <= 451)) {
            if (isIOS) {
                try {
                    location.href = "protocol://share#" + encodeURI(JSON.stringify(WNLUtil.shareObjectOld));
                    // WNLUtil.shareObjectOld = {};
                } catch (e) {
                    alert(e);
                }
            } else if (isAndroid) {
                try {
                    if (window.ylwindow) {
                        ylwindow.reportHasShare(true);
                        location.href = "protocol://share:" + encodeURI(JSON.stringify(WNLUtil.shareObjectOld));
                        // WNLUtil.shareObjectOld = {};
                    }
                } catch (e) {
                    alert(e);
                }
            }
            return 1;
        }else{
            if (WNLUtil.shareObjectOld && WNLUtil.shareObjectOld instanceof ShareObjectOld) {
                if (isIOS) {
                    try {
                        location.href = "protocol://share#" + encodeURI(JSON.stringify(WNLUtil.shareObjectOld));
                    } catch (e) {
                        alert(e);
                    }
                } else if (isAndroid) {
                    try {
                        if (window.ylwindow) {
                            ylwindow.reportHasShare(true);
                            location.href = "protocol://share:" + encodeURI(JSON.stringify(WNLUtil.shareObjectOld));
                        }
                    } catch (e) {
                        alert(e);
                    }
                }
                return 1;
            }else{
                if(showWnlShareTool && (typeof showWnlShareTool == 'function')){
                    if (window.ylwindow) {
                        ylwindow.reportHasShare(true);
                    }
                    showWnlShareTool();
                }
                return 1;
            }
        }
        // }
    };
})();
/*==================
模块导入支持
====================*/
if (typeof(module) !== 'undefined') {
    exports.WNLUtil = global.WNLUtil;
    exports.appCallback_share = global.appCallback_share;
} else if (typeof define === 'function' && define.amd) {
    define([], function() {
        'use strict';
        return window.WNLUtil;
    });
}
