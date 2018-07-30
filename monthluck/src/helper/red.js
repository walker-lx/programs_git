// ver 1.0.5
// created by liuyu 2017.08.02
// update 2017.12.12
var version = 'ver1.0.5';
console.log(version);
import utils from '../util/util.js';

(function (window) {
  "use strict";

  var version = 'ver1.0.5';
  console.log(version);
  var root = window;
  // default share params
  var defaultParams = {
    title: '给你分享一个万年历红包',
    text: '100%有奖，立刻能用！',
    image: 'https://raw.githubusercontent.com/18883846209/img/master/img/%E7%BA%A2%E5%8C%85.png'
  }
  let imgSrc = 'https://raw.githubusercontent.com/18883846209/img/master/img/%E5%88%86%E4%BA%AB200icon.jpg';
  let shareData = {
    goodsId: utils.getQueryValue('goodsid'), // goodsId
		parterId: utils.getQueryValue('parterid'), // parterId
		orderId: utils.getQueryValue('orderid'), // 订单编号
		url: window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock'),
		wxShareTitle: '你的未来三十天什么最重要？', // 微信分享 title ，一般不设置。除非你自己想写别的分享内容
		wxShareText: '点击查看未来运势，全方位了解未来吉凶。', // 微信分享内容，一般不设置。除非你自己想写别的分享内容
		wxShareImage: imgSrc, // 微信分享图片，一般不设置。除非你自己想写别的分享内容
		wxShareUrl: window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock')
  };
  let detaildata = {
    orderid: utils.getQueryValue('orderid'),
		deviceid: utils.getQueryValue('deviceid'), // eslint-disable-line
		GLBirthday: utils.getQueryValue('GLBirthday'),
		sex: utils.getQueryValue('sex'),
		name: utils.getQueryValue('name')
  }
  shareData.url += utils.jsonToQueryString(detaildata) + '&share=1';
  shareData.wxShareUrl += utils.jsonToQueryString(detaildata) + '&share=1';
  // let detaildata = localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')) : JSON.parse(decodeURIComponent(utils.getQueryValue('user_info')));
  // shareData.url = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + '?user_info=' + encodeURIComponent(JSON.stringify(detaildata)) + '&share=1&username=' + encodeURIComponent(utils.getQueryValue('username'));
	// shareData.wxShareUrl = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + '?user_info=' + encodeURIComponent(JSON.stringify(detaildata)) + '&share=1&username=' + encodeURIComponent(utils.getQueryValue('username'));  
  // if (localStorage.getItem('user_info')) {
  //   shareData.url += '?user_info=' + localStorage.getItem('user_info') + '&share=1&username=' + (localStorage.getItem('name') || utils.getQueryValue('username'));
	// 	shareData.wxShareUrl += '?user_info=' + localStorage.getItem('user_info') + '&share=1&username=' + (localStorage.getItem('name') || utils.getQueryValue('username'));    
	// }
	// else {
  //   shareData.url += '?user_info=' + utils.getQueryValue('user_info') + '&share=1username=' + (localStorage.getItem('name') || utils.getQueryValue('username'));
	// 	shareData.wxShareUrl += '?user_info=' + utils.getQueryValue('user_info') + '&share=1username=' + (localStorage.getItem('name') || utils.getQueryValue('username'));    
  // }
  let shareData1 = {
    title: '你的未来三十天什么最重要？',
    text: '点击查看未来运势，全方位了解未来吉凶。',
    image: imgSrc,
    imgUrl: imgSrc,
    url: shareData.url
  };
  // detaildata.orderid = utils.getQueryValue('orderid1');
	// redParam.wxShareUrl = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + '?share=1&user_info=' + encodeURIComponent(JSON.stringify(detaildata)) + '&username=' + encodeURIComponent(utils.getQueryValue('username')); // eslint-disable-line
  var device = {};
  var shareParams = {};
  var ua = window.navigator.userAgent;
  device.weixin = /MicroMessenger/i.test(ua);
  device.wnl = /wnl/i.test(ua);
  var isSharePlatform = device.weixin || device.wnl;
  root.shareRedPackage = shareRedPackage;

  getPromise(window);
  addStyle();
  insertRedpackageDOM();
  function shareRedPackage(params, cb) {
    if (Object.prototype.toString.call(params) !== '[object Object]') return false;
    params.url = params.url.replace('lock', 'index');
    shareParams = params;
    var shareUrl = encodeURIComponent(params.url.replace(/payresult=1/ig, ''));
    var local_orderRedpackage;
    var args = {
      goodsId: shareParams.goodsId,
      parterId: shareParams.parterId,
      orderId: shareParams.orderId,
      shareUrl: shareUrl
    }

    shareParams.url = 'http://mobile.51wnl.com/numberology/redpackage/redpackage.html?' + stringify(args);

    //初始化加载资源
    loadWeChatSDK().then(function (res) {
      return weixinhandler();
    }).then(function (res) {
      // console.log(res)
      return checkIsTips({
        goodsId: shareParams.goodsId,
        parterId: shareParams.parterId,
        orderId: shareParams.orderId
      })
    }).then(function (res) {
      console.log('是否弹出红包:', res.data);
      if (res.data) {
        localStorage.setItem('showred', 1);
      }
      else {
        localStorage.setItem('showred', 2);
      }
      var isPay = (/payresult=1/ig).test(window.location.href);
      var isSharePlatform = device.weixin || device.wnl;
      console.log(res.data, isPay, isSharePlatform);
      if (res.data && isPay && isSharePlatform) {
        if (!device.weixin) {
          showRedPackage();
        } else {
          wx.ready(function () {
            console.log('wxshare ready');
            showRedPackage();
            wxShare(params, true);
            typeof cb === 'function' && cb();
          });
        }
        wx.error(function (e) {
          alert(JSON.stringify(e));
          console.log(e)
        })

      } else {
        wx.ready(function () {
          console.log('wxshare ready')
          wxShare(params, false);
          typeof cb === 'function' && cb();
        });
        wx.error(function (e) {
          alert(JSON.stringify(e));
          console.log(e)
        });
        if (utils.isWeixin) {
          // console.log('abc');
          // console.log(shareData, '微信分享参数');
          window.wnlui.wxShare(shareData1);
        }
        else {
            // window.wnlui.wnlShare.setShareData({
            //     // image: ((window.location.href.indexOf('https') > -1) ? 'https://' : 'http://') + 'mobile.51wnl.com/numberology/monthluck/static/img/share-img@3x.jpg'
            //     image: ((window.location.href.indexOf('https') > -1) ? 'https://' : 'http://') + window.location.host + window.location.pathname.replace('result.html', '') + '/static/img/share-img@3x.jpg'
            // });
            window.wnlui.wnlShare.setShareData(shareData1);
        }
      }
    })

  }
  root.shareCallback = function () {
    _$('.redpackage-mask').classList.add('hidden');
    if (utils.isWeixin) {
        // console.log('abc');
        // console.log(shareData, '微信分享参数');
        window.wnlui.wxShare(shareData1);
    }
    else {
        // window.wnlui.wnlShare.setShareData({
        //     image: ((window.location.href.indexOf('https') > -1) ? 'https://' : 'http://') + window.location.host + window.location.pathname.replace('result.html', '') + '/static/img/share-img@3x.jpg'
        // });
        window.wnlui.wnlShare.setShareData(shareData1);
    }
  }

  function insertRedpackageDOM() {
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
      _$('.showShareMask').classList.add('hidden');
      	if (utils.isWeixin) {
          window.wnlui.wxShare(shareData1);
        }
        else {
          // window.wnlui.wnlShare.setShareData({
          //   image: ((window.location.href.indexOf('https') > -1) ? 'https://' : 'http://') + window.location.host + window.location.pathname.replace('result.html', '') + '/static/img/share-img@3x.jpg'
          // });
          window.wnlui.wnlShare.setShareData(shareData1);
        }
    });

    _$('.redpackage-btn').addEventListener('click', function () {
      if (device.weixin) {
        _$('.showShareMask').classList.remove('hidden');
      } else {
        console.log(!device.weixin && !device.wnl);
        if (!device.weixin && !device.wnl) {
          return false;
        }
        commitShare({
          title: shareParams.title || defaultParams.title,
          text: shareParams.text || defaultParams.text,
          image: shareParams.image || defaultParams.image,
          url: shareParams.url,
        }, 'weixin');
      }
    });
  }

  //burst redpackage
  function showRedPackage() {
    setTimeout(function () {
      _$('.redpackage-mask').classList.remove('hidden');
      setTimeout(function () {
        _$('.redpackage').style.transform = 'scale(1)';
        _$('.redpackage').classList.add('.tr');
        _$('.redpackage').style.webkitTransform = 'scale(1)';
      }, 50)
    }, 500);
  }

  function checkIsTips(params) {
    var data = {
      goodsid: params.goodsId,
      parterid: params.parterId,
      orderid: params.orderId
    }
    return new Promise(function (resolve, reject) {
      promise.post('//order.51wnl.com/api/coupon/CheckIsTips', data).then(function (error, text, xhr) {
        if (text) {
          resolve(JSON.parse(text));
        } else {
          reject(error);
        }
      })
    });
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
      title = shareParams.title || defaultParams.title;
      text = shareParams.text || defaultParams.text;
      imageURL = shareParams.image || defaultParams.image;
      url = shareParams.url;
    } else {
      title = params.wxShareTitle || defaultParams.title;
      text = params.wxShareText || defaultParams.text;
      imageURL = params.wxShareImage || defaultParams.image;
      url = params.wxShareUrl.replace(/payresult=1/ig, '');
    }

    setShareParams(title, text, imageURL, url);

    function setCallback() {
      _$('.showShareMask').classList.add('hidden');
      _$('.redpackage-mask').classList.add('hidden');
      title = params.wxShareTitle || defaultParams.title;
      text = params.wxShareText || defaultParams.text;
      imageURL = params.wxShareImage || defaultParams.image;
      url = params.wxShareUrl.replace(/payresult=1/ig, '');
      setShareParams(title, text, imageURL, url);
    }

    function setShareParams(title, text, imageURL, url) {
      wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: url, // 分享链接
        imgUrl: imageURL, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          setCallback();
        },
        cancel: function () {
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
          setCallback();
        },
        cancel: function () {
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
          setCallback();
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
    }

  }

  function loadWeChatSDK() {
    var weChatSDK = document.createElement('script');
    weChatSDK.src = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js';
    _$('head').insertAdjacentElement('beforeend', weChatSDK);

    return new Promise(function (resolve, reject) {
      weChatSDK.onload = function (e) {
        resolve(weChatSDK);
      };
      weChatSDK.onerror = function (e) {
        reject(new Error('Could not load image at ' + weChatSDK.src));
      };
    });
  }


  function weixinhandler() {
    return new Promise(function (resolve, reject) {
      promise.get('//b.cqyouloft.com/interface/API/weixinhandler.ashx', {
        requesturl: location.href
      }).then(function (error, text, xhr) {
        if (text && typeof text === 'string') {
          var result = JSON.parse(text);
          wx.config({
            /**
             * 开启调试模式,调用的所有api的返回值会在客户端alert出来，
             * 若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，
             * 仅在pc端时才会打印。
             */
            debug: false,
            appId: result.appid, // 必填，公众号的唯一标识
            timestamp: result.timestamp, // 必填，生成签名的时间戳
            nonceStr: result.nonceStr, // 必填，生成签名的随机串
            signature: result.signature,// 必填，签名，见附录1
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          resolve(result);
        } else {
          reject(error);
        }
      })
    });
  }
  /**
   * add inline style
   *
   */
  function addStyle() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(".hidden{display:none}.redpackage-mask{z-index:1000;width:100%;height:100%;position:fixed;}.redpackage{z-index:1001;line-height:1.15;position:fixed;top:20%;left:50%;margin-left:-135px;color:#fff;text-align:center;font-size:17px;width:270px;height:341px;border-radius:20px;background-color:#dc564a;-webkit-box-shadow:0 6px 20px 0 rgba(0, 0, 0, .3);box-shadow:0 6px 20px 0 rgba(0, 0, 0, .3);background:url('http://mobile.51wnl.com/numberology/redpackage/img/hongbao-img@3x.png') no-repeat center;background-size:cover;-webkit-transform:scale(0.1);transform:scale(0.1);-webkit-transition:all 1s cubic-bezier(.51, .97, .44, 1.3);-o-transition:all 1s cubic-bezier(.51, .97, .44, 1.3);transition:all 1s cubic-bezier(.51, .97, .44, 1.3)}.redpackage-close{width:30px;height:30px;background-color:#dc564a;position:absolute;right:-8px;top:-8px;border-radius:50%;background-image:url('http://mobile.51wnl.com/numberology/redpackage/img/close2.png');background-position:center;background-repeat:no-repeat;background-size:50%}.redpackage-text-1{margin-top:16px}.redpackage-text-2{margin-top:10px}.redpackage-coin{width:80px;height:82px;margin:25px auto 15px;background:url('http://mobile.51wnl.com/numberology/redpackage/img/hongbao-coin@3x.png');background-size:cover}.redpackage-text-3{list-style:initial;font-size:36px;color:#fcdf79;font-weight:700;font-style:italic}.redpackage-text-4{font-weight:700;color:#fcdf79;margin-top:10px;}.redpackage-btn{width:230px;height:44px;border-radius:50px;background-color:#fcdf79;-webkit-box-shadow:inset 0 -3px 0 0 rgba(216, 191, 104, .5);box-shadow:inset 0 -3px 0 0 rgba(216, 191, 104, .5);font-weight:700;line-height:44px;text-align:center;color:#dc564a;margin:24px auto 0}.showShareMask{position:fixed;z-index:102;left:0;top:0;right:0;bottom:0;background-color:rgba(0, 0, 0, .68)}.shareArrow{position:absolute;top:0;right:20px;width:62px;height:102px;background-image:url('http://mobile.51wnl.com/numberology/redpackage/img/share-arrow.png');background-repeat:no-repeat;background-size:62px 102px;z-index:9999}.tr{-webkit-transform:scale(1)!important;transform:scale(1)}"));
    _$('head').appendChild(style);
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
  function getPromise(exports) {
    /*
 *  Copyright 2012-2013 (c) Pierre Duquesne <stackp@online.fr>
 *  Licensed under the New BSD License.
 *  https://github.com/stackp/promisejs
 */

    function Promise() {
      this._callbacks = [];
    }

    Promise.prototype.then = function (func, context) {
      var p;
      if (this._isdone) {
        p = func.apply(context, this.result);
      } else {
        p = new Promise();
        this._callbacks.push(function () {
          var res = func.apply(context, arguments);
          if (res && typeof res.then === 'function')
            res.then(p.done, p);
        });
      }
      return p;
    };

    Promise.prototype.done = function () {
      this.result = arguments;
      this._isdone = true;
      for (var i = 0; i < this._callbacks.length; i++) {
        this._callbacks[i].apply(null, arguments);
      }
      this._callbacks = [];
    };

    function join(promises) {
      var p = new Promise();
      var results = [];

      if (!promises || !promises.length) {
        p.done(results);
        return p;
      }

      var numdone = 0;
      var total = promises.length;

      function notifier(i) {
        return function () {
          numdone += 1;
          results[i] = Array.prototype.slice.call(arguments);
          if (numdone === total) {
            p.done(results);
          }
        };
      }

      for (var i = 0; i < total; i++) {
        promises[i].then(notifier(i));
      }

      return p;
    }

    function chain(funcs, args) {
      var p = new Promise();
      if (funcs.length === 0) {
        p.done.apply(p, args);
      } else {
        funcs[0].apply(null, args).then(function () {
          funcs.splice(0, 1);
          chain(funcs, arguments).then(function () {
            p.done.apply(p, arguments);
          });
        });
      }
      return p;
    }

    /*
     * AJAX requests
     */

    function _encode(data) {
      var payload = "";
      if (typeof data === "string") {
        payload = data;
      } else {
        var e = encodeURIComponent;
        var params = [];

        for (var k in data) {
          if (data.hasOwnProperty(k)) {
            params.push(e(k) + '=' + e(data[k]));
          }
        }
        payload = params.join('&')
      }
      return payload;
    }

    function new_xhr() {
      var xhr;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        try {
          xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
      }
      return xhr;
    }


    function ajax(method, url, data, headers) {
      var p = new Promise();
      var xhr, payload;
      data = data || {};
      headers = headers || {};

      try {
        xhr = new_xhr();
      } catch (e) {
        p.done(promise.ENOXHR, "");
        return p;
      }

      payload = _encode(data);
      if (method === 'GET' && payload) {
        url += '?' + payload;
        payload = null;
      }

      xhr.open(method, url);

      var content_type = 'application/x-www-form-urlencoded';
      for (var h in headers) {
        if (headers.hasOwnProperty(h)) {
          if (h.toLowerCase() === 'content-type')
            content_type = headers[h];
          else
            xhr.setRequestHeader(h, headers[h]);
        }
      }
      xhr.setRequestHeader('Content-type', content_type);


      function onTimeout() {
        xhr.abort();
        p.done(promise.ETIMEOUT, "", xhr);
      }

      var timeout = promise.ajaxTimeout;
      if (timeout) {
        var tid = setTimeout(onTimeout, timeout);
      }

      xhr.onreadystatechange = function () {
        if (timeout) {
          clearTimeout(tid);
        }
        if (xhr.readyState === 4) {
          var err = (!xhr.status ||
            (xhr.status < 200 || xhr.status >= 300) &&
            xhr.status !== 304);
          p.done(err, xhr.responseText, xhr);
        }
      };

      xhr.send(payload);
      return p;
    }

    function _ajaxer(method) {
      return function (url, data, headers) {
        return ajax(method, url, data, headers);
      };
    }

    var promise = {
      Promise: Promise,
      join: join,
      chain: chain,
      ajax: ajax,
      get: _ajaxer('GET'),
      post: _ajaxer('POST'),
      put: _ajaxer('PUT'),
      del: _ajaxer('DELETE'),

      /* Error codes */
      ENOXHR: 1,
      ETIMEOUT: 2,

      /**
       * Configuration parameter: time in milliseconds after which a
       * pending AJAX request is considered unresponsive and is
       * aborted. Useful to deal with bad connectivity (e.g. on a
       * mobile network). A 0 value disables AJAX timeouts.
       *
       * Aborted requests resolve the promise with a ETIMEOUT error
       * code.
       */
      ajaxTimeout: 0
    };

    if (typeof define === 'function' && define.amd) {
      /* AMD support */
      define(function () {
        return promise;
      });
    } else {
      exports.promise = promise;
    }

  }
})(window);
