//设备判断
let ua = window.navigator.userAgent;
let android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
let ios = ua.match(/(iPhone\sOS)\s([\d_]+)/);
let weixin = /MicroMessenger/i.test(ua);
let wnl = /wnl/i.test(ua);

let device = {
  android,
  ios,
  weixin,
  wnl
}

device.appVersion = /^\d.*\d$/ig.test(ua.split(' ').pop()) ? ua.split(' ').pop() : '1.0.0';
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

export default device;


