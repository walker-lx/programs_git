import 'babel-polyfill';
import { wxShare } from '@wnl/ui';
import { util } from '@wnl/util';
import '../static/flexible';
import '../static/animationFrame';
import '../css/index.scss';
// import utils from '../static/helper';
import '../static/jquery.toast.css';
import '../static/jquery.toast';
import utils from '../static/helper';
// import '../static/vconsole.min';

const Base64 = require('js-base64').Base64;

// window.shareCallback = () => {
//   _czc.push(['_trackEvent', 'DWJ2018_shared_wnl', 'sharecallback']) //eslint-disable-line
// };
let shareData = {
  title: '世界杯支持谁？',
  text: '快为你喜爱的球队打CALL吧！',
  image: 'https://qiniu.image.cq-wnl.com/content/20180706c5963a8d4aaa478ba81cc027d851049f.jpg',
  imgUrl: 'https://qiniu.image.cq-wnl.com/content/20180706c5963a8d4aaa478ba81cc027d851049f.jpg',
  url: `${window.location.protocol}//${window.location.host + window.location.pathname}`
};

window.onload = function() {
  let nickname = '';
  let openid = '';
  let headimg = '';
  const callbtn = $('.callbtn');
  // let ua = navigator.userAgent.toLocaleLowerCase();
  // if (ua.indexOf('oppo') > -1) {
  //   $('.index').addClass('oppo');
  //   // alert('oppo');
  //   // $('.csbtn').addClass('ios');
  //   // $('.rank-wrap').addClass('huawei');
  // }
  let w = document.body.offsetWidth;
  let h = document.body.offsetHeight;
  // alert(w / h);
  if ((w / (h + 64)) >= 0.56 && utils.isIOS && h <= 740) {
    // alert('test');
    $('.index').addClass('ios');
  }
  if ((w / (h + 64)) >= 0.57 && utils.isAndroid) {
    // alert('test');
    $('.index').addClass('ios');
  }
  // wnlShare.setShare(shareData);
  wxShare(shareData);
  function getNickName() { // eslint-disable-line
    if (util.isWeixin) { // 获取用户昵称
      // localStorage.clear();
      // if (localStorage.getItem('openid') || util.getQueryValue('headimg')) {
      if (util.getQueryValue('openid')) {
        nickname = util.getQueryValue('nickname') || localStorage.getItem('nickname');
        openid = util.getQueryValue('openid') || localStorage.getItem('openid');
        headimg = util.getQueryValue('headimgurl') || localStorage.getItem('headimg');
        // localStorage.setItem('nickname', nickname);
        // localStorage.setItem('openid', openid);
        // localStorage.setItem('headimg', headimg);
        $('.index').removeClass('hidden');
        // alert(headimg);
      } else {
        window.location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + encodeURIComponent(window.location.href) + '?islogin=0';
      }
      // nameDom.html(decodeURIComponent(nickname) && decodeURIComponent(nickname).length > 4 ? decodeURIComponent(nickname).slice(0, 4) : decodeURIComponent(nickname)); // eslint-disable-line
    } else if (util.isWnl) {
      setTimeout(() => {
        window.location.href = 'protocol://getuserinfo#userinfocallback';
      }, 0);
      window.userinfocallback = (res) => {
        let _res = JSON.parse(Base64.decode(res));
        if (_res.native_score.userId) {
          // alert(JSON.stringify(_res.native_usercenter));
          if (_res.native_usercenter.displayname) {
            nickname = _res.native_usercenter.displayname;
          } else if (_res.native_usercenter.name) {
            nickname = _res.native_usercenter.name;
          } else if (_res.native_usercenter.nickname) {
            nickname = _res.native_usercenter.nickname;
          } else {
            nickname = '';
          }
        } else {
          nickname = '';
        }
        // nameDom.html(decodeURIComponent(nickname) && decodeURIComponent(nickname).length > 4 ? decodeURIComponent(nickname).slice(0, 4) : decodeURIComponent(nickname)); //eslint-disable-line
      };
    } else {
      nickname = '';
      // nameDom.html(decodeURIComponent(nickname) && decodeURIComponent(nickname).length > 4 ? decodeURIComponent(nickname).slice(0, 4) : decodeURIComponent(nickname)); //eslint-disable-line
    }
  }
  getNickName();
  callbtn.on('click', () => {
    // alert(openid);
    // if (utils.isWx) {
    // alert('wx');
    // window.location.href = './call.html?nickname=' + nickname + '&openid=' + openid + '11&headimg=' + headimg;
    // if (headimg.indexOf('https')) {
    //   headimg
    // }
    // headimg = 'http://asdasd';
    let head = headimg.replace('http', 'https');
    window.location.href = `${window.location.protocol}//${window.location.host + window.location.pathname.replace('index', 'call')}?nickname=${nickname}&openid=${openid}&headimg=${head}`; // eslint-disable-line
    // }
  });
  // $('.wxsharemask').on('click', function() { // eslint-disable-line
  //   $(this).addClass('hidden');
  // });
  // _czc.push(['_trackEvent', `DWJ2018_pageview_${typeczc}`, 'show']) //eslint-disable-line
};
