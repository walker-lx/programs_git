export function setItem(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getItem(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

export function stringify(obj) {
  var str = '';
  var keys = Object.keys(obj);
  keys.forEach(function (v, k, arr) {
    k < arr.length - 1 ?
      str += v + '=' + obj[v] + '&' :
      str += v + '=' + obj[v]
  });
  return str;
}

export function fixIphoneX(cb) {
  var iphone = window.navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/);
  var width = window.innerWidth;
  if (iphone && window.devicePixelRatio === 3 && width === 375) {
    typeof cb === 'function' && cb();
  }
}

export function _$(element) {
  var el = document.querySelectorAll(element);
  return el.length > 1 ? el : el[0];
}

export function isEmptyObject(e) {
  var t;
  for (t in e)
      return !1;
  return !0
}
