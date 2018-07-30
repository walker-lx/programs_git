export function getQueryValue(key) {
  var reg = new RegExp('(^|&?)' + key + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg) || window.location.hash.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}
export function preloadimages(arrImg) {
  var newimages = [];
  var loadedimages = 0;
  var postaction = function () {}; // 此处增加了一个postaction函数
  var arr = (typeof arrImg !== 'object') ? [arrImg] : arrImg;

  function imageloadpost() {
    loadedimages++;
    if (loadedimages === arr.length) {
      postaction(newimages); // 加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
    }
  }
  for (var i = 0; i < arr.length; i++) {
    newimages[i] = new Image();
    newimages[i].src = arr[i];
    newimages[i].onload = function () {
      imageloadpost();
    };
    newimages[i].onerror = function () {
      imageloadpost();
    };
  }
  return { // 此处返回一个空白对象的done方法
    done: function (f) {
      postaction = f || postaction;
    }
  };
}

/*
 * iphoneX
 */
export function fixIphoneX(cb) {
  var iphone = window.navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/);
  var width = window.innerWidth;
  if (iphone && window.devicePixelRatio === 3 && width === 375) {
    typeof cb === 'function' && cb();
  }
}
