import 'babel-polyfill';
import { wnlShare, wxShare } from '@wnl/ui';
// import { wnlShare } from '@wnl/ui';
import { util } from '@wnl/util';
// import html2canvas from 'html2canvas';
// import wxShare from '../static/wxshare';
import '../static/flexible';
import '../css/index.scss';
import { getQueryValue, play } from '../static/helper';
import imgupload from '../static/upload';
// import '../static/vconsole.min';

const img1 = require('../assets/jdlp.jpg');
const img2 = require('../assets/mrys.jpg');
const img3 = require('../assets/slxx.jpg');
const img4 = require('../assets/tmdz.jpg');
const img5 = require('../assets/txsy.jpg');
const img6 = require('../assets/xrll.jpg');
const img7 = require('../assets/hh1.jpg');
const img8 = require('../assets/hh2.jpg');
const img9 = require('../assets/hh3.jpg');
const img10 = require('../assets/hh4.jpg');
const qr = require('../assets/QR.jpg');
// const qr = 'https://qiniu.image.cq-wnl.com/content/201805315a71351fb9684f72bfd3448f19cdaf4b.jpg';

const Base64 = require('js-base64').Base64;

const chooseOne = {
  bl: img3,
  mz: img4,
  xd: img3,
  bg: img2,
  ds: img4,
  ht: img6,
  lr: img5,
  xr: img6,
  xy: img5,
  gy: img2,
  mg: img4,
  hs: img2,
  no: img1
};

const chooseTwo = [img7, img8, img9, img10];

window.shareCallback = () => {
  _czc.push(['_trackEvent', 'DWJ2018_shared_wnl', 'sharecallback']) //eslint-disable-line
};
window.onload = function() {
  let typeczc = 'wnl';
  let nickname = '个性';
  const nameDom = $('#name');
  $('.index').removeClass('hidden');
  if (util.isWeixin) {
    typeczc = 'wx';
  }
  // console.log(util);
  if (util.isAndroid) {
    $('.wnlshare-qq').addClass('hidden');
  }
  if (util.isIOS) {
    $('.wnlshare-qzone').addClass('hidden');
  }
  function setShare(type = 0, t = '', desc = '', _url = '', shareimg = '') { // 设置分享
    let shareData = {
      title: t.length > 0 ? t : '端午年年过，51万年历今年给你与“粽”不同！',
      text: desc.length > 0 ? desc : '是时候来彰显自己独特的个性了，赶紧来领取吧！',
      image: 'https://qiniu.image.cq-wnl.com/content/20180529ca7698b1184744a481ba4f241becca7a.jpg',
      imgUrl: 'https://qiniu.image.cq-wnl.com/content/20180529ca7698b1184744a481ba4f241becca7a.jpg',
      url: _url.length > 0 ? _url : `${window.location.protocol}//${window.location.host + window.location.pathname}`
    };
    // alert(JSON.stringify(shareData));
    if (type === 0) { // 首页过渡页分享
      wnlShare.setShareData(shareData); // eslint-disable-line
      wxShare(shareData); // eslint-disable-line
    } else if (type === 1) { // 结果页分享
      if (util.isWeixin) {
        wxShare({ // eslint-disable-line
          title: shareData.title,
          text: shareData.text,
          imgUrl: shareData.image,
          url: shareData.url,
          callback: () => {
            $('.wxsharemask').addClass('hidden');
            _czc.push(['_trackEvent', 'DWJ2018_shared_wx', 'sharecallback']) //eslint-disable-line
          }
        });
      } else {
        wnlShare.setShareData({ // eslint-disable-line
          image: shareimg && shareimg.length > 0 ? shareimg : 'https://qiniu.image.cq-wnl.com/FvG7XjoJIoGFr5GTypn9ozG_nZS1'
        });
        // console.log(shareimg);
        // new wnlShare.setShareData(shareData); // eslint-disable-line
      }
    }
  }
  // alert(navigator.userAgent);
  // console.log(util);
  function getNickName() { // eslint-disable-line
    if (util.isWeixin) { // 获取用户昵称
      // localStorage.clear();
      if (localStorage.getItem('nickname') || util.getQueryValue('nickname')) {
        nickname = util.getQueryValue('nickname') || localStorage.getItem('nickname');
        localStorage.setItem('nickname', nickname);
      } else {
        localStorage.setItem('login', '2');
        window.location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + encodeURIComponent(window.location.href) + '?islogin=0';
      }
      // alert(localStorage.getItem('login'));
      if (getQueryValue('islogin')) {
        $('.transition').addClass('wxnologin');
        $('.result_btn').addClass('btnbottom');
        if (util.isIOS && window.innerWidth <= 325) {
          $('.transition').addClass('iosnologin');
          $('.transitionbtn').addClass('iosbottom');
          $('.result_btn').addClass('iosbtnbottom');
          $('.longpress').addClass('ioslong');
        }
      } else {
        $('.transition').removeClass('wxnologin');
        $('.result_btn').removeClass('btnbottom');
      }
      nameDom.html(decodeURIComponent(nickname) && decodeURIComponent(nickname).length > 4 ? decodeURIComponent(nickname).slice(0, 4) : decodeURIComponent(nickname)); // eslint-disable-line
    } else if (util.isWnl) {
      setTimeout(() => {
        window.location.href = 'protocol://getuserinfo#userinfocallback';
      }, 0);
      window.userinfocallback = (res) => {
        let _res = JSON.parse(Base64.decode(res));
        // if (navigator.userAgent.toLowerCase().indexOf('sm701')) {
        //   alert(JSON.stringify(_res));
        // }
        if (_res.native_score.userId) {
          // alert(JSON.stringify(_res.native_usercenter));
          if (_res.native_usercenter.displayname) {
            nickname = _res.native_usercenter.displayname;
          } else if (_res.native_usercenter.name) {
            nickname = _res.native_usercenter.name;
          } else if (_res.native_usercenter.nickname) {
            nickname = _res.native_usercenter.nickname;
          } else {
            nickname = '个性';
          }
        } else {
          nickname = '个性';
        }
        nameDom.html(decodeURIComponent(nickname) && decodeURIComponent(nickname).length > 4 ? decodeURIComponent(nickname).slice(0, 4) : decodeURIComponent(nickname)); //eslint-disable-line
      };
    } else {
      nickname = '个性';
      nameDom.html(decodeURIComponent(nickname) && decodeURIComponent(nickname).length > 4 ? decodeURIComponent(nickname).slice(0, 4) : decodeURIComponent(nickname)); //eslint-disable-line
    }
  }
  getNickName();
  setShare();
  // if (navigator.userAgent.toLowerCase().indexOf('sm701')) {
  //   wxShare({
  //     title: '端午年年过，51万年历今年给你与“粽”不同！',
  //     text: '是时候来彰显自己独特的个性了，赶紧来领取吧！',
  //     imgUrl: 'https://qiniu.image.cq-wnl.com/content/20180529ca7698b1184744a481ba4f241becca7a.jpg',
  //     url: `${window.location.protocol}//${window.location.host + window.location.pathname}`
  //   });
  // }
  if (getQueryValue('share') && util.isWeixin) {
    $('.img').attr('src', getQueryValue('img'));
    $('.index, .transition, .longpress, .result_btn').addClass('hidden');
    $('.img').addClass('show');
    $('.result').removeClass('hidden');
    // console.log('aa');
  }
  nameDom.html(decodeURIComponent(nickname) && decodeURIComponent(nickname).length > 4 ? decodeURIComponent(nickname).slice(0, 4) : decodeURIComponent(nickname)); //eslint-disable-line
  $('.indexbtn').on('click', () => {
    $('.index').addClass('hidden');
    $('.transition').removeClass('hidden');
    _czc.push(['_trackEvent', `DWJ2018_enter_${typeczc}`, 'click']) //eslint-disable-line
  });
  const audio = document.getElementById('audio');
  const playbtn = $('.play');
  const pausebtn = $('.pause');
  play(audio);
  playbtn.on('click', () => {
    audio.pause();
    playbtn.addClass('hidden');
    pausebtn.removeClass('hidden');
  });
  pausebtn.on('click', () => {
    audio.play();
    pausebtn.addClass('hidden');
    playbtn.removeClass('hidden');
  });

  // resize
  let clientHeight = window.innerHeight;
  let ua = navigator.userAgent.toLocaleLowerCase();
  if (ua.indexOf('huawei') > -1) {
    $('.transition').addClass('haskeyboard');
    $('.transitionbtn').addClass('btnkeyboard');
    $('.result_btn').addClass('btnbottom');
  }
  // console.log(clientHeight);
  $(window).on('resize', () => {
    let nowClientHeight = window.innerHeight;
    // console.log(nowClientHeight);
    if (clientHeight > nowClientHeight) {
      //键盘弹出的事件处理
      // console.log('大于');
      $('.transition').addClass('haskeyboard');
      $('.transitionbtn').addClass('btnkeyboard');
    } else {
      //键盘收起的事件处理
      // console.log('小于');
      $('.transition').removeClass('haskeyboard');
      $('.transitionbtn').removeClass('btnkeyboard');
    }
    // console.log('change');
  });
  // 过渡页
  const item = $('.item');
  let chooseNum = 0;
  let choosezz = 'no';
  let src = '';
  let click = true;
  let canvas = document.createElement('canvas');
  // let w = 375;
  // let h = 375 * (150 / 1080);
  const w = 325;
  const h = 325 * (1550 / 1080);
  canvas.width = w * 3;
  canvas.height = h * 3;
  let ctx = canvas.getContext('2d');
  ctx.scale(1, 1);
  function toast(text, ms) {
    const _toast = $('#toast');
    _toast.text(text);
    _toast.removeClass('hidden');
    if (ms > 0) {
      setTimeout(() => {
        _toast.addClass('hidden');
      }, ms);
    }
  }
  function drawImg(_ctx, imgsrc, x, y) { // 绘制图片
    let img = new Image();
    // img.crossOrigin = 'anonymous';
    return new Promise((resolve) => {
      img.onload = () => {
        if (x || y) {
          ctx.drawImage(img, x, y, 975, 975 * (150 / 1080));
        } else {
          ctx.drawImage(img, 0, 0, w * 3, 975 * (1400 / 1080));
        }
        resolve(canvas);
      };
      img.src = imgsrc;
    });
  }
  function drawText(_ctx, text, color) {
    const _w = (document.body.offsetWidth - 50) * 3;
    let namewidth;
    let _text;
    return new Promise((resolve) => {
      _ctx.beginPath();
      _text = text && text.length > 4 ? text.slice(0, 4) + '...' : text;
      _ctx.fillStyle = color;
      _ctx.font = '75px "SF Pro SC", "HanHei SC", "SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Apple Legacy Chevron", "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"'; // eslint-disable-line
      namewidth = _ctx.measureText(_text).width;
      if (window.innerWidth <= 325) {
        _ctx.fillText(text, ((_w - namewidth) / 2) - 25 + 65, 200);
      } else {
        _ctx.fillText(text, ((_w - namewidth) / 2) - 35, 200);
      }
      _ctx.closePath();
      _ctx.beginPath();
      _ctx.fillStyle = color;
      // _ctx.font = '75px dw';
      if (window.innerWidth <= 325) {
        _ctx.fillText('牌', ((_w - namewidth) / 2) - 25 + namewidth + 65, 200);
      } else {
        _ctx.fillText('牌', ((_w - namewidth) / 2) - 35 + namewidth, 200);
      }
      _ctx.closePath();
      resolve(canvas);
    });
  }
  // 选择粽子
  const tip = $('.tip');
  item.on('click', function() { // eslint-disable-line
    // console.log($(this).attr('data-zz'));
    // console.log(Math.floor(Math.random() * 4));
    if (click) {
      choosezz = $(this).attr('data-zz');
      let choosed = $(this).find('.choose_icon');
      let dis = $(this).find('.item_mask');
      if (dis.hasClass('hidden')) {
        if (choosed.hasClass('hidden')) {
          choosed.removeClass('hidden');
          chooseNum += 1;
        } else {
          choosed.addClass('hidden');
          chooseNum -= 1;
        }
      }
      console.log(chooseNum);
      if (chooseNum >= 3) { // 选择超过3种
        tip.html('最多只可选择3种材料哟');
        for (let i = 0; i < 12; i += 1) {
          if (item.eq(i).find('.choose_icon').hasClass('hidden')) {
            item.eq(i).find('.item_mask').removeClass('hidden');
          } else {
            item.eq(i).find('.item_mask').addClass('hidden');
          }
        }
      } else {
        tip.html('可选择1-3种材料到粽叶中');
        item.find('.item_mask').addClass('hidden');
      }
    }
    // console.log(chooseNum);
  });
  $('.transitionbtn').on('click', () => {
    if (click) {
      click = false;
      let rand = Math.floor(Math.random() * 4);
      let textcolor = '';
      let resultimg = '';
      toast('正在生成你的结果...');
      // console.log(choosezz);
      if (chooseNum <= 1) {
        textcolor = '#567a4a';
        if (chooseNum <= 0) {
          choosezz = 'no';
          resultimg = img1;
        } else {
          resultimg = chooseOne[choosezz];
        }
        if (choosezz === 'no') {
          textcolor = '#887352';
          $('.title').addClass('class2');
        } else {
          $('.title').removeClass('class2');
        }
        $('.top, .result_detail').css('background-image', `url(${resultimg})`);
      } else {
        textcolor = '#887352';
        resultimg = chooseTwo[rand];
        // console.log(chooseTwo[rand]);
        $('.top, .result_detail').css('background-image', `url(${resultimg})`);
        $('.title').addClass('class2');
      }
      drawImg(ctx, resultimg).then(() => { // 生成图片
        drawImg(ctx, qr, 0, 975 * (1400 / 1080)).then(() => {
          // ctx.font = '50px dw';
          // ctx.fillText('我爱的', 10, 100);
          drawText(ctx, decodeURIComponent(nickname).length > 4 ? decodeURIComponent(nickname).slice(0, 4) : decodeURIComponent(nickname), textcolor).then((rel) => { // eslint-disable-line
            let _src = rel.toDataURL('image/jpeg', 0.8);
            // console.log(_src);
            new imgupload({ // eslint-disable-line
              base64String: _src,
              uploadCallback: (_res) => {
                src = _res;
                console.log(src);
                if (!$('.img').attr('src') || $('.img').attr('src').length < 10) {
                  $('.img').attr('src', src);
                }
                $('.index, .transition, #toast').addClass('hidden');
                $('.result').removeClass('hidden');
                // setShare();
                setShare(1, `万万没想到，${decodeURIComponent(nickname).length > 4 ? decodeURIComponent(nickname).slice(0, 4) : decodeURIComponent(nickname)}竟然是这样的一只粽，简直惊呆了！`, '“粽”有一款适合你，让你个性更出“粽”！赶紧来领取吧！', `${window.location.protocol}//${window.location.host + window.location.pathname}?share=1&img=${src}`, src); // eslint-disable-line
                click = true;
              }
            });
          });
        }).catch((err) => {
          console.log(err);
          $('#toast').addClass('hidden');
          toast('网络错误', 850);
          click = true;
        });
      });
    }
    _czc.push(['_trackEvent', `DWJ2018_make_${typeczc}`, 'click']) //eslint-disable-line
  });

  // 结果页
  $('.againbtn').on('click', () => {
    click = true;
    chooseNum = 0;
    choosezz = 'no';
    item.find('.choose_icon').addClass('hidden');
    item.find('.item_mask').addClass('hidden');
    $('.img').removeAttr('src');
    tip.html('可选择1-3种材料到粽叶中');
    $('.result, .index').addClass('hidden');
    $('.transition').removeClass('hidden');
    setShare();
    _czc.push(['_trackEvent', `DWJ2018_again_${typeczc}`, 'click']) //eslint-disable-line
  });
  $('.sharebtn').on('click', () => {
    if (util.isWnl) {
      // alert(src);
      wnlShare.showSharePlatform();
    }
    if (util.isWeixin) {
      $('.wxsharemask').removeClass('hidden');
    }
    _czc.push(['_trackEvent', `DWJ2018_shareBtn_${typeczc}`, 'show']) //eslint-disable-line
  });
  $('.wxsharemask').on('click', function() { // eslint-disable-line
    $(this).addClass('hidden');
  });
  _czc.push(['_trackEvent', `DWJ2018_pageview_${typeczc}`, 'show']) //eslint-disable-line
};
