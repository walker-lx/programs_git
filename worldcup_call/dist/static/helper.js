// function addBtnState(dom, el, _class) {
//     let move;
//     $(document).on('touchend touchstart touchmove touchcancel', dom, function(e) { // eslint-disable-line
//       // if (!$(this).hasClass('active')) {
//       // 	return;
//       // }
//       if (e.type === 'touchstart') {
//         move = null;
//         if (_class) {
//           el.addClass(_class);
//         } else {
//           el.removeClass('hidden');
//         }
//       } else if (e.type === 'touchmove') {
//         if (move) return;
//         move = true;
//         if (_class) {
//           el.removeClass(_class);
//         } else {
//           el.addClass('hidden');
//         }
//       } else {
//         if (move) return;
//         if (_class) {
//           el.removeClass(_class);
//         } else {
//           el.addClass('hidden');
//         }
//       }
//     });
//   }
// export function getQueryValue(name) {
//   let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//   let r = window.location.search.substr(1).match(reg) || window.location.hash.substr(1).match(reg);
//   if (r != null) {
//     return decodeURIComponent(r[2]);
//   }
//   return null;
// }
// function play(el) {
//   let firstTouch = true
//   // --创建页面监听，等待微信端页面加载完毕 触发音频播放
//   document.addEventListener('DOMContentLoaded', function () {
//     function audioAutoPlay () {
//       // var audio = document.getElementById('audio')
//       el.play()
//       document.addEventListener('WeixinJSBridgeReady', function () {
//         el.play()
//       }, false)
//     }
//     audioAutoPlay()
//   })
//   // --创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
//   document.addEventListener('touchstart', function () {
//     function audioAutoPlay () {
//       if (firstTouch) {
//         el.play()
//       }else {
//         return
//       }
//       firstTouch = false
//     }
//     audioAutoPlay()
//   })
// }


/**
 * [getParam 获取单个url参数]
 * @param  {String} name [参数名称]
 * @param  {String} url   [default:location.href]
 * @return {String|Boolean}
 */
function getParam(name, url) {
  if (typeof name !== 'string') return false;
  if (!url) url = window.location.href;
  // 当遇到name[xx]时，对括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
  name = name.replace(/[\[\]]/g, '\\$&'); // eslint-disable-line
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * [longPress 长按事件]
 * @param {*} el [dom对象]
 * @param {function} fn [回调函数]
 * @param {number} [ms=800] [长按时间]
 */
function longPress(el, fn, ms = 800) {
  let timer = null;
  el.addEventListener('touchstart', () => {
    timer = setTimeout(fn, ms);
  }, false);
  el.addEventListener('touchmove', (e) => {
    e.preventDefault();
  }, false);
  el.addEventListener('touchend', () => {
    clearTimeout(timer);
  }, false);
}

function getIOSVersion() {
  if (window.MSStream) {
    return false;
  }
  let match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
  if (match !== undefined && match !== null) {
    let version = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3] || 0, 10)];
    // return parseFloat(version.join('.'));
    return version.join('.');
  }
  return false;
}

function getAndroidVersion() {
  let match = navigator.userAgent.toLowerCase().match(/android\s([0-9\.]*)/); // eslint-disable-line
  // return match ? parseFloat(match[1]) : false;
  return match ? match[1] : false;
}

function jsonToParams(json) {
  return ('?' + Object.keys(json).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key])).join('&'));
}

function getcss(o, key) { // 获取元素css样式
  return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
}

function getAddDayDate(AddDay, date) {
  let nowDate = date ? new Date(date.toString()) : new Date();
  nowDate.setDate(nowDate.getDate() + (AddDay ? parseInt(AddDay) : 0)); // 获取AddDay天后的日期
  let y1 = nowDate.getFullYear();
  let m1 = nowDate.getMonth() + 1; // 获取月份
  let d1 = nowDate.getDate();
  // let h1 = nowDate.getHours();
  // let min1 = nowDate.getMinutes();
  // let s1 = nowDate.getSeconds();
  // let ms1 = nowDate.getMilliseconds();
  // console.log(nowDate);
  // let m0 = new Date().getMonth() + 1;
  // let d0 = new Date().getDate();
  // return `${parseInt(m0)}月${parseInt(d0)}日-${m1}月${d1}日`;
  // return [y1, m1, d1, h1, min1, s1, ms1];
  return [y1, m1, d1];
}

const ua = navigator.userAgent.toLowerCase();
// const isWnl = /wnl/i.test(ua);
// const appVersion = parseInt(ua.substr(ua.indexOf('wnl ') + 4, 5).replace(/\./g, ''));
// const appVersionString = ua.substr(ua.indexOf('wnl ') + 4, 5);
// const isIphoneX = isIPhone && window.innerWidth === 375 && window.devicePixelRatio === 3;
// const isIE = /msie/i.test(ua);
// const isSafari = /afari/.test(ua);
const isWx = /micromessenger/i.test(ua);
const isQQ = /\sqq|mqqbrowser/i.test(ua);
const iOSVersion = getIOSVersion();
const androidVersion = getAndroidVersion();
const isAndroid = /android|htc/i.test(ua) || (window.navigator.platform + '').match(/linux/i);
const isIPad = !isAndroid && /ipad/i.test(ua);
const isIPhone = !isAndroid && /ipod|iphone/i.test(ua);
const isIOS = isIPad || isIPhone;

const utils = {
  getParam,
  longPress,
  getIOSVersion,
  getAndroidVersion,
  jsonToParams,
  iOSVersion,
  androidVersion,
  isAndroid,
  isIOS,
  isWx,
  isQQ,
  getcss,
  getAddDayDate
};

export default utils;
