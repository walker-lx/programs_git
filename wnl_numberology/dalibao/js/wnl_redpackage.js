// ver 1.0.2
// create by liuyu 2017.08.02
// update 2017.08.10
(function (window) {
    "use strict";
    var version = 'ver1.0.3';
    console.log(version)
    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this;
    // 默认分享参数
    var _defaultArgs = {
        title: '给你分享一个万年历红包',
        text: '100%有奖，立刻能用！',
        image: 'https://mobile.51wnl.com/numberology/redpackage/img/hongbao-share.jpg',
    }
    var device = {};
    var _shareArgs = {};
    var ua = window.navigator.userAgent;
    device.weixin = /MicroMessenger/i.test(ua);

    device.wnl = /wnl/i.test(ua);

    root.shareRedPackage = function (params, cb) {
        if (Object.prototype.toString.call(params) === '[object Object]') {
            _shareArgs = params;
            var shareUrl = encodeURIComponent(params.url.replace(/payresult=1/ig, ''));
            var args = {
                goodsId: _shareArgs.goodsId,
                parterId: _shareArgs.parterId,
                orderId: _shareArgs.orderId,
                shareUrl: shareUrl
            }
            _shareArgs.url = '//mobile.51wnl.com/numberology/redpackagedev/redpackage.html?' + stringify(args);
            setElement(params);

            //初始化加载资源
            appendResource(function () {
                checkIsTips({
                    goodsId: _shareArgs.goodsId,
                    parterId: _shareArgs.parterId,
                    orderId: _shareArgs.orderId
                }).then(function (error, text, xhr) {
                    var data = JSON.parse(text);
                    var isPay = (/payresult=1/ig).test(window.location.href);
                    var isSharePlatform = device.weixin || device.wnl;
                    console.log('是否弹出红包:', data.data)
                    if (data.data && isPay && isSharePlatform) {
                        wx.ready(function () {
                            console.log('wxshare ready');
                            wxShare(params, true);
                            typeof cb === 'function' && cb();
                        });
                        wx.error(function (e) {
                            alert(JSON.stringify(e));
                            console.log(e)
                        })
                        //弹出红包
                        setTimeout(function () {
                            _$('.redpackage-mask').classList.remove('hidden');
                            setTimeout(function () {
                                _$('.redpackage').style.transform = 'scale(1)';
                                _$('.redpackage').classList.add('.tr');
                                _$('.redpackage').style.webkitTransform = 'scale(1)';
                            }, 50)
                        }, 1000);
                    } else {
                        wx.ready(function () {
                            console.log('wxshare ready')
                            wxShare(params, false);
                            typeof cb === 'function' && cb();
                        });
                        wx.error(function (e) {
                            alert(JSON.stringify(e));
                            console.log(e)
                        })
                    }
                });
            });
        } else {
            throw new Error('object not available');
        }
    }

    root.shareCallback = function () {
        _$('.redpackage-mask').classList.add('hidden');
    }

    function _$(element) {
        var el = document.querySelectorAll(element);
        return el.length > 1 ? el : el[0];
    }

    function stringify(obj) {
        var str = '';
        var keys = Object.keys(obj);
        keys.forEach(function (v, k, arr) {
            k < arr.length - 1 ?
                str += v + '=' + obj[v] + '&' :
                str += v + '=' + obj[v]
        });
        return str;
    }

    function setElement(params) {
        var el = '<div class="redpackage-mask hidden">\
                    <div class="redpackage">\
                        <div class="redpackage-close"></div>\
                        <div class="redpackage-text-1">你和你的朋友都可</div>\
                        <div class="redpackage-text-2">抽取随机金额优惠券</div>\
                        <div class="redpackage-coin"></div>\
                        <div class="redpackage-text-3">100%</div>\
                        <div class="redpackage-text-4">中奖</div>\
                        <div class="redpackage-btn">与好友分享红包</div>\
                    </div>\
                </div>\
			    <div class="showShareMask hidden">\
			        <div class="shareArrow"></div>\
			    </div>'
        _$('body').insertAdjacentHTML('afterbegin', el);

        var redpackage = _$('.redpackage-mask');

        redpackage.addEventListener('touchmove', function (e) {
            e.preventDefault();
        })

        _$('.redpackage-close').addEventListener('click', function () {
            redpackage.classList.add('hidden');
            var obj = {
                wxShareTitle: "指明事业方向，让你不再迷茫！",
                wxShareText: "全面剖析你一生事业“钱”景，助你的人生扬帆起航！",
                wxShareUrl: "https://mobile.51wnl.com/numberology/xpgz/index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&channel=[CHANNEL]&posId=[posId]&boundId=[BUNDLE]",
                wxShareImage: "https://mobile.51wnl.com/numberology/xpgz/img/top-picture.jpg"
            };
            wxShare(obj, false);
        });


        _$('.redpackage-btn').addEventListener('click', function (params) {
            wxShare(params, true);
            if (device.weixin) {
                _$('.showShareMask').classList.remove('hidden');
            } else {
                console.log(!device.weixin && !device.wnl);
                if (!device.weixin && !device.wnl) {
                    return false;
                }
                commitShare({
                    title: _shareArgs.title || _defaultArgs.title,
                    text: _shareArgs.text || _defaultArgs.text,
                    image: _shareArgs.image || _defaultArgs.image,
                    url: _shareArgs.url,
                }, 'weixin');
            }
        });
    }

    function checkIsTips(params) {
        var data = {
            goodsid: params.goodsId,
            parterid: params.parterId,
            orderid: params.orderId
        }
        return promise.post('//order.51wnl.com/api/coupon/CheckIsTips', data);
    }


    function commitShare(args, platform) {
        var params = {
            direct: true,
            callback: 'shareCallback',
            platform: '',
            shareData: {}
        }
        //设置分享参数
        var shareData = {};
        var perload = false;
        if (args.image === undefined || args.image === null || args.image === '' || args.image === 'shot') {
            perload = false;
        } else {
            perload = true;
        }
        shareData[platform] = platform;
        shareData[platform] = {
            //分享标题
            title: args.title,
            //分享文本
            text: args.text,
            //分享链接图标或者图片
            image: args.image,
            //分享链接
            url: args.url,
            //是否预加载
            preload: perload
        };
        params.shareData = shareData;
        params.platform = platform;
        console.log(params);
        try {
            if (window.ylwindow) {
                ylwindow.reportHasShare(true);
                window.location.href = "protocol://share#" + encodeURIComponent(JSON.stringify(params));
            } else {
                window.location.href = "protocol://share#" + encodeURIComponent(JSON.stringify(params));
                return 1;
            }
        } catch (e) {
            // alert(e);
        }
        return 1;
    }

    function wxShare(params, flag) {
        var title, text, imageURL, url;
        if (flag) {
            title = _shareArgs.title || _defaultArgs.title;
            text = _shareArgs.text || _defaultArgs.text;
            imageURL = _shareArgs.image || _defaultArgs.image;
            url = _shareArgs.url;
        } else {
            title = params.wxShareTitle || _defaultArgs.title;
            text = params.wxShareText || _defaultArgs.text;
            imageURL = params.wxShareImage || _defaultArgs.image;
            url = params.wxShareUrl.replace(/payresult=1/ig, '');
        }
        setShareParams(title, text, imageURL, url);

        function setCallback() {
            _$('.showShareMask').classList.add('hidden');
            _$('.redpackage-mask').classList.add('hidden');
            title = params.wxShareTitle || _defaultArgs.title;
            text = params.wxShareText || _defaultArgs.text;
            imageURL = params.wxShareImage || _defaultArgs.image;
            url = params.wxShareUrl.replace(/payresult=1/ig, '');
            setShareParams(title, text, imageURL, url);
        }

        function setCallback2() {
            _$('.showShareMask').classList.add('hidden');
            _$('.redpackage-mask').classList.add('hidden');
            title = "指明事业方向，让你不再迷茫！";
            text = "全面剖析你一生事业“钱”景，助你的人生扬帆起航！";
            imageURL = "https://mobile.51wnl.com/numberology/xpgz/img/top-picture.jpg";
            url = "https://mobile.51wnl.com/numberology/xpgz/index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&channel=[CHANNEL]&posId=[posId]&boundId=[BUNDLE]";
            setShareParams(title, text, imageURL, url);
        }

        function setShareParams(title, text, imageURL, url) {
            wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: url, // 分享链接
                imgUrl: imageURL, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    // setCallback();
                    setCallback2();
                },
                cancel: function () {
                    _$('.showShareMask').classList.add('hidden');
                    // 用户取消分享后执行的回调函数
                }
            });
            //获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: text, // 分享描述
                link: url, // 分享链接
                imgUrl: imageURL, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    // setCallback();
                    setCallback2();
                },
                cancel: function () {
                    _$('.showShareMask').classList.add('hidden');
                    // 用户取消分享后执行的回调函数
                }
            });
            //获取“分享到QQ”按钮点击状态及自定义分享内容接口
            wx.onMenuShareQQ({
                title: title, // 分享标题
                desc: text, // 分享描述
                link: url, // 分享链接
                imgUrl: imageURL, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    // setCallback();
                    setCallback2();
                },
                cancel: function () {
                    _$('.showShareMask').classList.add('hidden');
                    // 用户取消分享后执行的回调函数
                }
            });
        }

    }

    function appendResource(cb) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(".hidden{display:none}.redpackage-mask{z-index:1000;width:100%;height:100%;position:fixed;}.redpackage{z-index:1001;line-height:1.15;position:fixed;top:20%;left:50%;margin-left:-135px;color:#fff;text-align:center;font-size:17px;width:270px;height:341px;border-radius:20px;background-color:#dc564a;-webkit-box-shadow:0 6px 20px 0 rgba(0, 0, 0, .3);box-shadow:0 6px 20px 0 rgba(0, 0, 0, .3);background:url('data:image/png;base64,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') no-repeat center;background-size:cover;-webkit-transform:scale(0.1);transform:scale(0.1);-webkit-transition:all 1s cubic-bezier(.51, .97, .44, 1.3);-o-transition:all 1s cubic-bezier(.51, .97, .44, 1.3);transition:all 1s cubic-bezier(.51, .97, .44, 1.3)}.redpackage-close{width:30px;height:30px;background-color:#dc564a;position:absolute;right:-8px;top:-8px;border-radius:50%;background-image:url('http://mobile.51wnl.com/numberology/redpackage/img/close2.png');background-position:center;background-repeat:no-repeat;background-size:50%}.redpackage-text-1{margin-top:16px}.redpackage-text-2{margin-top:10px}.redpackage-coin{width:80px;height:82px;margin:25px auto 15px;background:url('http://mobile.51wnl.com/numberology/redpackage/img/hongbao-coin@3x.png');background-size:cover}.redpackage-text-3{list-style:initial;font-size:36px;color:#fcdf79;font-weight:700;font-style:italic}.redpackage-text-4{font-weight:700;color:#fcdf79;margin-top:10px;}.redpackage-btn{width:230px;height:44px;border-radius:50px;background-color:#fcdf79;-webkit-box-shadow:inset 0 -3px 0 0 rgba(216, 191, 104, .5);box-shadow:inset 0 -3px 0 0 rgba(216, 191, 104, .5);font-weight:700;line-height:44px;text-align:center;color:#dc564a;margin:24px auto 0}.showShareMask{position:fixed;z-index:102;left:0;top:0;right:0;bottom:0;background-color:rgba(0, 0, 0, .68)}.shareArrow{position:absolute;top:0;right:20px;width:62px;height:102px;background-image:url('http://mobile.51wnl.com/numberology/redpackage/img/share-arrow.png');background-repeat:no-repeat;background-size:62px 102px}.tr{-webkit-transform:scale(1)!important;transform:scale(1)}"));
        _$('head').appendChild(style);
        var promiseJs = document.createElement('script');
        promiseJs.src = '//mobile.51wnl.com/numberology/redpackage/js/promise.js';
        promiseJs.type = 'text/javascript';
        _$('head').insertAdjacentElement('beforeend', promiseJs);

        promiseJs.onload = function () {
            var weixinJs = document.createElement('script');
            weixinJs.src = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';
            weixinJs.type = 'text/javascript';
            _$('head').insertAdjacentElement('beforeend', weixinJs);
            weixinJs.onload = function () {
                promise.get('//b.cqyouloft.com/interface/API/weixinhandler.ashx', {
                    requesturl: location.href
                }).then(function (error, text, xhr) {
                    var result = JSON.parse(text);
                    // console.log(result)
                    wx.config({
                        /**
                         * 开启调试模式,调用的所有api的返回值会在客户端alert出来，
                         * 若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，
                         * 仅在pc端时才会打印。
                         */
                        debug: false,
                        appId: 'wx347ab26567c5465f', // 必填，公众号的唯一标识
                        timestamp: result.timestamp, // 必填，生成签名的时间戳
                        nonceStr: result.nonceStr, // 必填，生成签名的随机串
                        signature: result.signature, // 必填，签名，见附录1
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                })
                typeof cb === 'function' && cb();
            }
        }

    }
})(window);