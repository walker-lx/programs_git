/*
万年历客户端分享js库
2017/11/15 create by liuyu
update 2017/06/22 liuyu
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
        ios = ua.match(/(iPhone\sOS)\s([\d_]+)/);
    device.ios = device.android = false;

    if (android) {
        device.android = true;
    }

    if (ios) {
        device.ios = true;
    }

    device.weixin = /MicroMessenger/i.test(ua);
    device.wnl = /wnl/i.test(ua);

    var appVersion = parseInt(ua.split(' ').pop().replace(/\./g, ''));
    var offsetHeight = '';
    /*==================================================================
    分享参数
    ===================================================================*/
    var args = {};

    var params = {
        //是否直接发送分享信息，默认为true
        direct: true,
        //发送分享信息后的回调函数名
        callback: 'shareCallback',
        //分享平台名
        platform: '',
        //分享数据对象
        shareData: {}
    }
    /*==================================================================
    image设为0，并且不填imageURL的情况下，客户端只分享text设置的文字，
    image设为0，并设置了imageURL地址，客户端分享的图标为imageURL设置的图片
    image设为1，分享的链接图标为系统截图，并且imageURL参数无效
    ===================================================================*/
    var iosLegacyParams = {
        //分享标题
        pureText: '',
        //截图或者使用自定义图片
        image: '0',
        // 链接地址
        url: '',
        //自定义图片地址
        imageURL: '',
    }

    var androidLegacyParams = {
        //分享标题
        title: args.title || '',
        //分享内容
        text: args.text || '',
        //截图或者使用自定义图片
        image: '0',
        // 链接地址
        targetUrl: args.url || '',
        //自定义图片地址
        imageURL: args.image || ''
    }
    //判断参数是否是对象
    function isObject(param) {
        return Object.prototype.toString.call(param) === '[object Object]';
    }
    //设置分享参数
    function setParams(param, platform) {
        var shareData = {};
        var perload = false;
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
        params.shareData = shareData;
        params.platform = platform;
    }
    //平台数组
    root.wnlShare = {
        version: '1.2.0',
        appVersion: appVersion,
        device: device,
        callback: 'shareCallback',
        //设置旧版分享数据
        setShareData: function(param) {
            if (isObject(param)) {
                if (device.ios) {
                    iosLegacyParams.pureText = param.title;
                    iosLegacyParams.url = param.url;
                    iosLegacyParams.imageURL = param.image;
                } else {
                    androidLegacyParams.title = param.title;
                    androidLegacyParams.text = param.text;
                    androidLegacyParams.targetUrl = param.url;
                    androidLegacyParams.imageURL = param.image;
                }
                args = param;
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
            shareObject = new ShareObject(wnlShare.callback, platform, shareData);
        },
        //显示分享组件
        showSharePlatform: function() {
            showSharePlatform();
        },
        //设置直接分享
        singleShare: function(platform) {
            setParams(args, platform);
            commitShare();
        }
    };
    //向客户端发送分享请求
    root.appCallback_share = function() {
        // (device.iso && appVersion < 450) || (device.android && appVersion < 451)
        if ((device.iso && appVersion < 450) || (device.android && appVersion < 451)) {
            try {
                if (window.ylwindow) {
                    ylwindow.reportHasShare(true);
                    location.href = 'protocol://share:' + encodeURI(JSON.stringify(androidLegacyParams));
                } else {
                    location.href = 'protocol://share#' + encodeURI(JSON.stringify(iosLegacyParams));
                }
            } catch (e) {}
            return 1;
        } else {
            if (window.ylwindow) {
                ylwindow.reportHasShare(true);
                showSharePlatform();
            } else {
                showSharePlatform();
            }
        }
        return 1;
    };
    //新版向客户端发送分享请求
    function commitShare() {
        try {
            if (window.ylwindow) {
                ylwindow.reportHasShare(true);
                window.location.href = "protocol://share#" + encodeURIComponent(JSON.stringify(params));
                hiddenPlatForm(offsetHeight);
            } else {
                window.location.href = "protocol://share#" + encodeURIComponent(JSON.stringify(params));
                hiddenPlatForm(offsetHeight);
                return 1;
            }
        } catch (e) {
            alert(e);
        }
        return 1;
    }

    //添加分享组件
    window.onload = function() {
        addCssStyleSheet();
        insertShareElement();
    }

    function insertShareElement() {
        var node = '\<div class="wnlshare-platform">\
        <div class="wnlshare-mask"></div>\
            <div class="wnlshare-wrap">\
                <div class="wnlshare-list">' + getShareItem() + '</div>\
                <div class="wnlshare-line"></div>\
                <div class="wnlshare-button">取消分享</div>\
            </div>\
        </div>'
        document.body.insertAdjacentHTML('beforeend', node);

        _$('.wnlshare-list').addEventListener('click', function(e) {
            if (e.target.dataset.name) {
                setParams(args, e.target.dataset.name);
                console.log(params)
                commitShare();
            }
        });

        var platformListWrap = _$('.wnlshare-wrap');
        var platformMask = _$('.wnlshare-mask');
        var platformBtn = _$('.wnlshare-button');
        offsetHeight = platformListWrap.getBoundingClientRect().height;
        platformListWrap.style.transform = 'translateY(' + offsetHeight + 'px)';
        platformMask.addEventListener('click', function() {
            hiddenPlatForm(offsetHeight);
        })

        platformBtn.addEventListener('click', function() {
            hiddenPlatForm(offsetHeight);
        })
    }

    function getShareItem() {
        var html = '';
        var list = [
            { name: 'weixin', text: '微信好友', },
            { name: 'weixin_circle', text: '微信朋友圈', },
            { name: 'qq', text: 'QQ', },
            { name: 'qzone', text: 'QQ空间', },
            { name: 'sina', text: '新浪微博', },
            { name: 'email', text: '邮件', },
            { name: 'sms', text: '短信', }
        ];
        list.forEach(function(v, k) {
            html += '<div class="wnlshare-item wnlshare-' + v.name + '">\
                    <div class="wnlshare-item-icon" data-name="' + v.name + '"></div>\
                    <div class="wnlshare-item-name">' + v.text + '</div>\
                </div>'
        });
        return html;
    }
    //显示分享组件
    function showSharePlatform() {
        _$('.wnlshare-platform').style.visibility = 'visible';
        _$('.wnlshare-wrap').style.transform = 'translateY(0)';
        _$('.wnlshare-mask').style.opacity = '0.3';
    }

    function hiddenPlatForm(offsetHeight) {
        _$('.wnlshare-platform').style.visibility = 'hidden';
        _$('.wnlshare-wrap').style.transform = 'translateY(' + offsetHeight + 'px)';
        _$('.wnlshare-mask').style.opacity = '0';
    }

    function _$(element) {
        var el = document.querySelectorAll(element);
        return el.length > 1 ? el : el[0];
    }

    function addCssStyleSheet(decls) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(".wnlshare-platform{z-index:999;position:fixed;bottom:0;left:0;width:100%;visibility:hidden}.wnlshare-mask{z-index:8;width:100%;height:100%;position:fixed;top:0;left:0;opacity:.3;background-color:rgb(0, 0, 0);-webkit-transition:all .3s;transition:all .3s;-webkit-transition-timing-function:ease;transition-timing-function:ease}.wnlshare-wrap{z-index:9;width:100%;position:absolute;bottom:0;background-color:rgba(255, 255, 255, .95);-webkit-transition:all .3s;transition:all .3s;-webkit-transition-timing-function:ease;transition-timing-function:ease}.wnlshare-list{padding-bottom:10px;clear:both;overflow:hidden}.wnlshare-line{width:98%;height:1px;margin:0 auto;background-color:#ccc;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.wnlshare-button{height:50px;width:100%;text-align:center;color:#666;line-height:50px;position:relative;font-size:18px}.wnlshare-item{float:left;width:25%;margin-top:10px}.wnlshare-item-name{text-align:center;margin-top:10px;font-size:14px}.wnlshare-weixin .wnlshare-item-icon{background-color:#8dc81b;background-repeat:no-repeat;background-position:5px 5px}.wnlshare-weixin_circle .wnlshare-item-icon{background-position:5px -45px;background-color:#e7792a}.wnlshare-qq .wnlshare-item-icon{background-position:5px -95px;background-color:#58ceff}.wnlshare-qzone .wnlshare-item-icon{background-position:5px -145px;background-color:#ffc345}.wnlshare-sina .wnlshare-item-icon{background-position:5px -195px;background-color:#ff6058}.wnlshare-email .wnlshare-item-icon{background-position:5px -245px;background-color:#4996ff}.wnlshare-sms .wnlshare-item-icon{background-position:5px -295px;background-color:#04c400}.wnlshare-item-icon{border-radius:50%;width:60px;height:60px;margin:0 auto;background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAIwCAMAAAAmpBzsAAAAsVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+3mHKcAAAAOnRSTlMA+QsHA/TEJBU94hqZTuakwQ/Y79yIQ7ydaEEoy7getF5S6tTPqZAwLLBJoGM0glaUi3N4bq04Wsh8bZQIQAAADa5JREFUeNrs3GlT2kAAxvFnc3EaCIeAHKIcymGhKtQ+3/+DFUcwwGazG8JMO5383vfPJtlJyS4RmUwm85+xCz82Xq0u/FG1PMwhJWd17/JYsZmmaXcalPXvcKG7IqNNShcNr0kld4jE8j3GaTpIxuox3sZJ1qtSp4wk2tR7h7kCDz6W86YII/1fN2vuiSeYsmvcu3cAdHiwxs5P7lVhKizcYSfPgwF2tjy4gSGPB7fYKfEgd3o+PJjJ8ZtnA/jNg8nZBSvByBtDjbflgqHx63LGUAdGJtTy2+8PhdxTzvQUxqs3n4Dn5e/1ZDJ9+1WCVpFx3GYe84XPb6OfuoEKxugNnNWYp8TkGXHqVGvbA48RftpQa1CpiZXi48ZdKG2oMkGHKvUn3TyUfdi/qPaoHGOXCs8vgjGKARR6jFR2ehfecx8Yxc2/c2/8HAzdQyU/WHOvkGiIs3DGdwHs6zUHQJVfWlB4FpQN73gQhIdRxU5Fe/t5p0QEZR5Mj/6bvQUKgntvUFnzXANjfhv169wTrY/j06LiSMUqHqk1Rkh31BWLenXEuHF5bG0SdBFncTpC1KlVRAznNNDCiFr3iHHLT67gl0dUqPWKGOWv+7390inf94quX5pTR5Sg5vgU0zyO2I/UmCBGQazPP+8H44lcbHCAc3ZD9wUvqTnjVJDcG9XGFhLQn8ZeHhd5E4opbeFCLw1GqDq4mPXmUzJCGnanKsJWvcGdHNKx5j/a9x/eZNrpwln60hxMm//h9nFdpbKFTCaTyWQymQNr21l7NV8If+Qt3gsWUgl+zQRPiOoD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');background-size:50px}"));
        document.getElementsByTagName('head')[0].appendChild(style);
    }
})();
/*==================
模块导入支持
====================*/
if (typeof(module) !== 'undefined') {
    exports.wnlShare = global.wnlShare;
    exports.appCallback_share = global.appCallback_share;
} else if (typeof define === 'function' && define.amd) {
    define([], function() {
        'use strict';
        return window.wnlShare;
    });
}