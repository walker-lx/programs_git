import 'babel-polyfill';
import { wxShare } from '@wnl/ui';
// import { util } from '@wnl/util';
// import html2canvas from 'html2canvas';
// import Picker from 'liuz-better-picker';
import '../static/flexible';
import '../static/animationFrame';
import '../css/call.scss';
import '../static/jquery.toast.css';
import '../static/jquery.toast';
import utils from '../static/helper';
import imgupload from '../static/upload';
import '../static/scroll';
// import getTransform from '../static/getcss';
import checkCountry from '../static/check';
// import '../static/vconsole.min';

const bg = require('../assets/beijing03(1).jpg');
// const fg = require('../assets/faguo.png');
// const bls = require('../assets/bilishi.png');
// const bx = require('../assets/baxi.png');
// const rd = require('../assets/ruidian.png');
// const rb = require('../assets/riben.png');
// const els = require('../assets/eluosi.png');
// const dm = require('../assets/danmai.png');
// const mxg = require('../assets/moxige.png');
// const kldy = require('../assets/keluodiya.png');
// const glby = require('../assets/gelunbiya.png');

const rankno = {
  3: '④',
  4: '⑤',
  5: '⑥',
  6: '⑦',
  7: '⑧',
  8: '⑨',
  9: '⑩',
  10: '⑪',
  11: '⑫',
  12: '⑬',
  13: '⑭',
  14: '⑮',
  15: '⑯'
};
let calllist = [
  // { index: 0, name: '西班牙队', num: '2476' },
];

let countrylist = [
  // {
  //   code: '', flag: fg, text: '法国队', top: 0
  // },
];

// console.log(countrylist);
let shareData = {
  title: '世界杯支持谁？',
  text: '快为你喜爱的球队打CALL吧！',
  image: 'https://qiniu.image.cq-wnl.com/content/20180706c5963a8d4aaa478ba81cc027d851049f.jpg',
  imgUrl: 'https://qiniu.image.cq-wnl.com/content/20180706c5963a8d4aaa478ba81cc027d851049f.jpg',
  url: `${window.location.protocol}//${window.location.host + window.location.pathname.replace('call', 'index')}`
};

const api = {
  dev: {
    call: 'http://192.168.1.110:8988/numberologynew/WorldCall/AddCall',
    getcountrylist: 'http://192.168.1.110:8988/numberologynew/WorldCall/SelectCountry',
    getcountrylistlog: 'http://192.168.1.110:8988/numberologynew/WorldCall/SelectAllCountry',
    getcalllist: 'http://192.168.1.110:8988/numberologynew/WorldCall/SelectCountryLog',
    iscall: 'http://192.168.1.110:8988/numberologynew/WorldCall/IsCall'
  },
  env: {
    call: '//coco70.51wnl.com/numberologyNew/WorldCall/AddCall',
    getcountrylist: '//coco70.51wnl.com/numberologyNew/WorldCall/SelectCountry',
    getcalllist: '//coco70.51wnl.com/numberologyNew/WorldCall/SelectCountryLog',
    iscall: '//coco70.51wnl.com/numberologyNew/WorldCall/IsCall',
    getcountrylistlog: '//coco70.51wnl.com/numberologyNew/WorldCall/SelectAllCountry'
  }
};
window.onload = () => {
  let choosename;
  let choosecode;
  let chooseno;
  let num;
  // $('.country_select_con').css('transform', `translate3d(0, 20px, 0)`);
  // console.log(getTransform('.country_select_con'));
  $('#marquee-top').marquee();
  let ua = navigator.userAgent.toLocaleLowerCase();
  let w = document.body.offsetWidth;
  let h = document.body.offsetHeight;
  if (utils.isAndroid && window.devicePixelRatio >= 3) {
    $('.index').addClass('az');
    $('.csbtn').addClass('az');
  }
  if (utils.isIOS && document.body.offsetWidth >= 412 && h <= 780) {
    $('.index').addClass('ios');
    $('.csbtn').addClass('ios');
  }
  if ((utils.isIOS && w <= 325)) {
    // alert('test');
    // $('.index').addClass('ios');
    $('.rank-wrap').addClass('iossmall');
    $('.csbtn').addClass('iossmall');
    $('.center').addClass('iossmall');
    // $('.call_btn_box, .search').addClass('iossmall');
    $('.sharebtn').addClass('iossmall');
  }
  // alert(window.devicePixelRatio);
  if ((utils.isAndroid && h >= 710)) {
    // alert('test');
    $('.index').addClass('azbig');
    $('.csbtn').addClass('azbig');
  }
  if ((utils.isAndroid && window.devicePixelRatio >= 3 && w <= 360 && ua.indexOf('oppo') > -1 && !(ua.indexOf('sm701') > -1))) {
    // alert(ua);
    $('.index').addClass('oppo');
    $('.center').addClass('oppo');
    $('.csbtn').addClass('oppo');
    $('.scroll_box').addClass('oppo');
  }
  if (ua.indexOf('sm701') > -1) {
    $('.csbtn').addClass('cz');
  }
  if (ua.indexOf('huawei') > -1) {
    $('.index').addClass('huawei');
    $('.csbtn').addClass('ios');
    $('.rank-wrap').addClass('huawei');
    if (w <= 375) {
      $('.sharebtn').addClass('huawei');
    }
  }
  if (ua.indexOf('honor') > -1 && w <= 375) {
    $('.index').addClass('honor');
    $('.csbtn').addClass('ios');
    $('.sharebtn').addClass('huawei');
    $('.rank-wrap').addClass('honor');
  }
  $('.csbtn').on('click', () => {
    window.location.href = 'https://mobile.51wnl.com/numberology/xpgz/index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&channel=[CHANNEL]&posId=PRO&boundId=[BUNDLE]';
  });
  wxShare(shareData);
  function setTip(obj) {
    $('.text1').html(obj.text1);
    $('.text2').html(obj.text2);
    $('.text3').html(obj.text3);
  }
  let iscalldata = {
    name: utils.getParam('nickname') || localStorage.getItem('nickname') || 'test',
    openid: utils.getParam('openid') || localStorage.getItem('openid') || 'test',
    // date: utils.getAddDayDate(0).join('-')
    date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
  };
  // console.log(iscalldata);
  function addcallitem(name, country, img) { // 添加打call列表
    let calldom = $('.call_list_item').eq(0).clone();
    // console.log(calldom);
    calldom.removeClass('hidden');
    calldom.addClass('list_item marqueeItem');
    calldom.find('.item_country').html(country);
    calldom.find('.item_name').html(name);
    calldom.find('.callimg').attr('src', img);
    calldom.appendTo($('.scroll_list'));
  }
  // addcallitem('test', '中国');
  function addcallitemlist(calldata) {
    // const countrydom = $('.list_item').eq(0).clone();
    // countrydom.removeClass('hidden');
    // countrydom.find('.item_country').html(country);
    // countrydom.find('.item_name').html(name);
    // countrydom.appendTo($('.country_select_con'));
    calldata.forEach((item) => {
      addcallitem(item.userName, item.countryName, item.userImg);
    });
  }
  $.ajax({
    url: api.env.getcalllist,
    type: 'GET',
    success: (res) => {
      console.log(JSON.parse(res).data);
      let data = JSON.parse(res).data;
      addcallitemlist(data);
    },
    error: (err) => {
      console.log(err, 'err');
    }
  });
  // alert(window.location.href);
  if (utils.getParam('img')) {
    // $('.country_select, .center').addClass('hidden');
    $('.index').addClass('hidden');
    shareData.url = `${window.location.protocol}//${window.location.host + window.location.pathname}?img=${utils.getParam('img')}`;
    wxShare(shareData);
    $('#img').attr('src', utils.getParam('img'));
  } else {
    $('.img').addClass('hidden');
    console.log(iscalldata);
    $.ajax({ // 是否打call
      url: api.env.iscall,
      type: 'POST',
      data: iscalldata,
      success: (res) => {
        console.log(res, 'iscall');
        let data = JSON.parse(res);
        if (data.data.iscall) {
          choosecode = data.data.countrycode;
          setTip({
            text1: '你今日已成功打CALL',
            text2: '记得明天再来刷票~',
            text3: '让朋友也帮你打CALL球队！'
          });
          // $('.country_select, .center').removeClass('hidden');
          // $('.sharebtn').addClass('hidden');
          $('.tip, .sharebtn').removeClass('hidden');
          $('.bottom').addClass('hidden');
          $('.dispage').removeClass('hidden');
          // shareData.url = `${window.location.protocol}//${window.location.host + window.location.pathname}?img=${localStorage.getItem('shareimg')}`;
          // wxShare(shareData);
          setTimeout(() => {
            $('.tip').addClass('hidden');
            // $('.bottom').addClass('hidden');
            $('.dispage').addClass('hidden');
          }, 5000);
          // $.toast().reset('all');
        } else {
          $('.bottom').removeClass('hidden');
        }
      },
      error: (res) => {
        console.log(res);
      }
    });
  }
  function circleImg(ctx, img, x, y, r) { // 绘制圆形头像
    ctx.save();
    let d = 2 * r;
    let cx = x + r;
    let cy = y + r;
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore();
  }
  // console.log(api);
  let canvas = document.createElement('canvas');
  const _w = document.body.offsetWidth;
  const _h = _w * 1.8;
  canvas.width = _w * 3;
  canvas.height = _h * 3;
  let ctx = canvas.getContext('2d');
  ctx.scale(1, 1);
  function drawImg(_ctx, imgsrc, x, y) { // 绘制图片
    let img = new Image();
    img.crossOrigin = 'anonymous';
    return new Promise((resolve) => {
      img.onload = () => {
        _ctx.drawImage(img, x, y, _w * 3, _h * 3);
        // setTimeout(() => {
        resolve(canvas);
        // }, 800);
      };
      img.src = imgsrc;
    });
  }
  function drawText(_ctx, text, size, color, y) {
    let x = 84;
    let fontsize = size || '75px';
    let _text = text;
    return new Promise((resolve) => {
      _ctx.beginPath();
      // _text = text && text.length > 4 ? text.slice(0, 4) + '...' : text;
      _ctx.fillStyle = color;
      _ctx.font = fontsize + ' "SF Pro SC", "HanHei SC", "SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Apple Legacy Chevron", "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"'; // eslint-disable-line
      _ctx.fillText(_text, x, y);
      _ctx.closePath();
      resolve(canvas);
    });
  }
  function failTip() {
    $('.dispage').addClass('hidden');
    $.toast().reset('all');
    $.toast({
      text: '打卡失败'
    });
  }
  function addcountrydom(_flag, _name) {
    const countrydom = $('.country_select_item').eq(0).clone();
    countrydom.removeClass('hidden');
    countrydom.find('.item_flag').attr('src', _flag);
    countrydom.find('.item_name').html(_name);
    countrydom.appendTo($('.country_select_con'));
  }
  function addcountrylist(arr) {
    arr.forEach((item) => {
      // console.log('1');
      addcountrydom(item.flag, item.text);
    });
    // const fill = $('.fill').eq(0).clone();
    // fill.removeClass('hidden');
    // fill.appendTo($('.country_select_con'));
  }
  function addRankItem(el, no, country, _num) {
    let dom = $('.rank_item_temp').clone();
    dom.removeClass('hidden');
    dom.removeClass('rank_item_temp');
    dom.addClass('rank_item');
    dom.find('.rank_item_no').html(no);
    dom.find('.rank_item_country_text').html(country);
    dom.find('.num').html(_num);
    dom.find('.rank_item_num').css('width', ((_num / 99999) * 1.79) + 'rem');
    dom.appendTo(el);
  }
  function addRankList(arr, el, isfront) {
    arr.forEach((item, index) => {
      if (index < 3 && isfront) {
        addRankItem(el, '', item.name, item.num);
      } else {
        // console.log(calllist[index], index);
        addRankItem(el, rankno[arr[index].index], item.name, item.num);
      }
    });
  }
  // addRankList(calllist.slice(0, 8), $('.front'), true);
  // addRankList(calllist.slice(8, calllist.length), $('.behind'));
  function getranklist(cb) {
    calllist = [];
    $('.rank_item').remove();
    $.ajax({
      url: api.env.getcountrylist,
      type: 'GET',
      success: (res) => {
        console.log(JSON.parse(res).data);
        let data = JSON.parse(res).data;
        data.forEach((item, eq) => {
          // console.log(item);
          calllist.push({
            index: eq, name: item.name, num: item.num, code: item.code
          });
        });
        // console.log(calllist);
        if (calllist.length > 8) {
          $('.down').removeClass('hidden');
          $('.upbox').addClass('hidden');
          addRankList(calllist.slice(0, 8), $('.front'), true);
          addRankList(calllist.slice(8, calllist.length), $('.behind'));
        } else {
          $('.down, .upbox').addClass('hidden');
          addRankList(calllist.slice(0, calllist.length), $('.front'), true);
          // addRankList(calllist.slice(8, calllist.length), $('.behind'));
        }
        $('.rank_item_no').eq(1).addClass('no1');
        $('.rank_item_no').eq(2).addClass('no2');
        $('.rank_item_no').eq(3).addClass('no3');
        if (cb) {
          cb();
        }
      },
      error: () => {
        // failTip();
      },
      complete: () => {
        // $('.dispage').addClass('hidden');
        // $.toast().reset('all');
      }
    });
  }
  getranklist();
  $.ajax({
    url: api.env.getcountrylistlog,
    type: 'GET',
    success: (res) => {
      // console.log(JSON.parse(res).data);
      let data = JSON.parse(res).data;
      data.forEach((item, index) => {
        countrylist.push({
          code: item.code,
          flag: item.pic,
          text: item.name,
          top: index * 30
        });
      });
      // countrylist.pop();
      addcountrylist(countrylist);
      console.log(countrylist);
    },
    error: () => {
      // failTip();
    },
    complete: () => {
      // $('.dispage').addClass('hidden');
      // $.toast().reset('all');
    }
  });
  const down = $('.down');
  const up = $('.upbox');
  const rank = $('.rank');
  const front = $('.front');
  const behind = $('.behind');
  const callbtn = $('.call_btn_box');
  // const dispage = $('.dispage');
  const selectlist = $('.country_select_con');
  const searchbtn = $('.search_icon');
  // selectlist.on('scroll', () => {
  //   console.log(selectlist.scrollTop());
  // });
  down.on('click', () => { // 下页
    down.addClass('hidden');
    up.removeClass('hidden');
    rank.addClass('moveup');
    front.addClass('opa');
    behind.removeClass('opa');
  });
  up.on('click', () => { // 上页
    up.addClass('hidden');
    down.removeClass('hidden');
    rank.removeClass('moveup');
    front.removeClass('opa');
    behind.addClass('opa');
  });
  $('.tip, .dispage').on('click', () => {
    $('.tip').addClass('hidden');
    $('.dispage').addClass('hidden');
  });
  // let code;
  // alert(window.location.href);
  function drawPage(obj, cb) {
    drawImg(ctx, bg, 0, 0).then(setTimeout(() => {
      // console.log(canvas.toDataURL('image/jpeg', 0.8));
      let headimg = new Image();
      headimg.crossOrigin = 'anonymous';
      // headimg.setAttribute('crossOrigin', 'anonymous');
      // console.time();
      // headimg.src = bg;
      headimg.onerror = (res) => {
        console.log(res, 'res');
      };
      headimg.onload = () => {
        circleImg(ctx, headimg, 74, 410, 50);
        console.log('draw1');
        // console.timeEnd();
        drawText(ctx, `${obj.name || '用户ID'}`, '60px', 'white', 573);
        drawText(ctx, `为${obj.country}队`, '60px', 'white', 648);
        drawText(ctx, '成功打CALL', '60px', 'white', 723);
        drawText(ctx, `至第${obj.no || ''}名!`, '60px', 'white', 798);
        drawText(ctx, '快为你喜爱的球', '48px', '#FF0A0A', 945);
        drawText(ctx, '打CALL吧', '48px', '#FF0A0A', 998);
        drawText(ctx, `${obj.no1 || '葡萄牙'}队`, '32px', 'rgba(255, 255, 255, 0.9)', 1111);
        drawText(ctx, `${obj.no1num}人打CALL`, '32px', 'rgba(255, 255, 255, 0.9)', 1148);
        drawText(ctx, `${obj.no2 || '占星'}队`, '32px', 'rgba(255, 255, 255, 0.9)', 1206);
        drawText(ctx, `${obj.no2num}人打CALL`, '32px', 'rgba(255, 255, 255, 0.9)', 1243);
        drawText(ctx, `${obj.no3 || '丹麦'}队`, '32px', 'rgba(255, 255, 255, 0.9)', 1301);
        drawText(ctx, `${obj.no3num}人打CALL`, '32px', 'rgba(255, 255, 255, 0.9)', 1338);
        drawText(ctx, `${obj.no4 || '德国'}队`, '32px', 'rgba(255, 255, 255, 0.9)', 1396);
        drawText(ctx, `${obj.no4num}人打CALL`, '32px', 'rgba(255, 255, 255, 0.9)', 1433);
        // setTimeout(() => {
        let _src = canvas.toDataURL('image/jpeg', 0.8);
        console.log(_src);
        // console.log(_src);
        let src;
        new imgupload({ // eslint-disable-line
          base64String: _src,
          uploadCallback: (_res) => {
            src = _res;
            console.log(src);
            $('#img').attr('src', src);
            shareData.url = `${window.location.protocol}//${window.location.host + window.location.pathname}?img=${src}`;
            localStorage.setItem('shareimg', src);
            cb();
          }
        });
        // console.log(canvas1.toDataURL('image/jpeg, 0.8'));
      };
      // headimg.src = 'https://raw.githubusercontent.com/18883846209/img/master/img/%E7%BA%A2%E5%8C%85.png';
      // headimg.src = 'http://thirdwx.qlogo.cn/mmopen/vi_32/cAjicEjEUF9J0X3H2LMDBVGGzTeicaEUw1GY674hzzaWlsQAjrI5ZT6HpP6TFiclp2zMiaiagpnoIEMQiakrvP9coNwA/132';
      headimg.src = utils.getParam('headimg') + '?' + new Date().getTime() || bg;
      // }, 400);
    }, 500));
  }
  function getcssy(el) {
    let str = el.css('transform').toString();
    let start = str.indexOf('(') + 1;
    let end = str.indexOf(')');
    let len = str.slice(start, end).split(',').length - 1;
    return parseInt(str.slice(start, end).split(',')[len].trim());
  }
  $('.index').on('touchmove', (e) => {
    e.preventDefault();
  });
  callbtn.on('click', () => { // 打call
    $('.dispage').removeClass('hidden');
    $.toast().reset('all');
    $.toast({
      text: '加载中...',
      hideAfter: true
    });
    let transY = Math.abs(Math.round(getcssy(selectlist) / 30) * 30);
    setTimeout(() => {
      countrylist.forEach((item) => {
        if (item.top === transY) {
          choosename = item.text;
          choosecode = item.code;
          // chooseno = index + 1;
        }
      });
      // calllist.forEach((item, index) => {
      //   if (item.code === choosecode) {
      //     chooseno = index + 1;
      //   }
      // });
      // localStorage.setItem('code', choosecode);
      let calldata = {
        UserName: iscalldata.name,
        CountryCode: choosecode || 'C0DB874E04A61391',
        UserImg: utils.getParam('headimg') || 'https://qiniu.image.cq-wnl.com/3339d2071b1f40389073eb6da6ab0068.png',
        OpenID: iscalldata.openid
      };
      $.ajax({
        url: api.env.call,
        type: 'POST',
        data: calldata,
        success: (res) => {
          // let num1;
          // let num2;
          // let num3;
          // let num4;
          let resdata = JSON.parse(res);
          console.log(resdata);
          if (resdata.data) {
            // console.log('chengg');
            num = resdata.data.num;
            getranklist(() => {
              // num1 = $('.rank_item').eq(0).find('.num').text();
              // num2 = $('.rank_item').eq(1).find('.num').text();
              // num3 = $('.rank_item').eq(2).find('.num').text();
              // num4 = $('.rank_item').eq(3).find('.num').text();
              let tipdata = {
                text1: '你已成功打CALL',
                text2: `有 ${num || 87} 位小伙伴和你一样为`,
                text3: `${choosename || ''}队 疯狂打call！`
              };
              setTip(tipdata);
              $('.tip, .sharebtn').removeClass('hidden');
              $('.bottom').addClass('hidden');
              $('.dispage').addClass('hidden');
              $.toast().reset('all');
              // let drawdata = {
              //   // name: '用户ID',
              //   name: iscalldata.name,
              //   country: choosename,
              //   no1: $('.rank_item').eq(0).find('.rank_item_country_text').text(),
              //   no2: $('.rank_item').eq(1).find('.rank_item_country_text').text(),
              //   no3: $('.rank_item').eq(2).find('.rank_item_country_text').text(),
              //   no4: $('.rank_item').eq(3).find('.rank_item_country_text').text(),
              //   no1num: num1,
              //   no2num: num2,
              //   no3num: num3,
              //   no4num: num4,
              //   no: chooseno
              // };
              // shareData.title = `我为${choosename}队 成功打CALL！`;
              // drawPage(drawdata, () => {
              //   $('.tip, .sharebtn').removeClass('hidden');
              //   $('.bottom').addClass('hidden');
              //   $('.dispage').addClass('hidden');
              //   $.toast().reset('all');
              //   wxShare(shareData);
              // });
            });
            setTimeout(() => {
              $('.tip').addClass('hidden');
            }, 5000);
          } else {
            // console.log('aaaa');
            $.toast().reset('all');
            $.toast({
              text: '今天已成功打call',
              hideAfter: 800
            });
            $('.dispage').addClass('hidden');
          }
        },
        error: () => {
          failTip();
        }
      });
    }, 400);
  });
  $('.sharebtn').on('click', () => {
    // console.log(getcssy(selectlist));
    $('.dispage').removeClass('hidden');
    $.toast().reset('all');
    $.toast({
      text: '正在生成你的结果...',
      hideAfter: true
    });
    let num1;
    let num2;
    let num3;
    let num4;
    num1 = $('.rank_item').eq(0).find('.num').text();
    num2 = $('.rank_item').eq(1).find('.num').text();
    num3 = $('.rank_item').eq(2).find('.num').text();
    num4 = $('.rank_item').eq(3).find('.num').text();
    // console.log(chooseno);
    // debugger;
    // let tipdata = {
    //   text1: '你已成功打CALL',
    //   text2: `有 ${num || 87} 位小伙伴和你一样为`,
    //   text3: `${choosename || ''}队 疯狂打call！`
    // };
    // setTip(tipdata);
    countrylist.forEach((item) => {
      if (item.code === choosecode) {
        choosename = item.text;
        choosecode = item.code;
        // chooseno = index + 1;
      }
    });
    calllist.forEach((item, index) => {
      if (item.code === choosecode) {
        chooseno = index + 1;
      }
    });
    let drawdata = {
      // name: '用户ID',
      name: iscalldata.name,
      country: choosename || '',
      no1: $('.rank_item').eq(0).find('.rank_item_country_text').text(),
      no2: $('.rank_item').eq(1).find('.rank_item_country_text').text(),
      no3: $('.rank_item').eq(2).find('.rank_item_country_text').text(),
      no4: $('.rank_item').eq(3).find('.rank_item_country_text').text(),
      no1num: num1,
      no2num: num2,
      no3num: num3,
      no4num: num4,
      no: chooseno || ''
    };
    shareData.title = `我为${choosename}队 成功打CALL！`;
    drawPage(drawdata, () => {
      // $('.tip, .sharebtn').removeClass('hidden');
      $('.bottom').addClass('hidden');
      $('.dispage').addClass('hidden');
      $('.index').addClass('hidden');
      $('.img').removeClass('hidden');
      $.toast().reset('all');
      wxShare(shareData);
    });
  });
  // let posY = 1;
  // let istouch = false;
  // let scroll;
  // const list = $('.scroll_list');
  // let h = document.querySelector('.scroll_list').scrollHeight;
  // // list.on('scroll', () => {
  // //   // console.log(e.target.scrollTop);
  // //   // console.log(list.scrollTop());
  // //   // posY = list.scrollTop();
  // // });
  // // console.log(h);
  // let dataarr = [
  //   { name: 'qwe', country: '中国' },
  //   { name: 'qwe', country: '中国' },
  //   { name: 'qwe', country: '中国' },
  //   { name: 'qwe', country: '中国' },
  //   { name: 'qwe', country: '中国' },
  //   { name: 'qwe', country: '中国' }
  // ];
  // function addItem(nickname, country) {
  //   let dom = $('.list_item').eq(0).clone();
  //   dom.removeClass('hidden');
  //   dom.find('.item_name').html(nickname);
  //   dom.find('.item_country').html(country);
  //   dom.appendTo(list);
  // }
  // function addData(arr) {
  //   arr.forEach((item) => {
  //     addItem(item.name, item.country);
  //   });
  // }
  // function listscroll() {
  //   scroll = window.requestAnimationFrame(listscroll);
  //   if (posY >= h - 170) {
  //     // window.cancelAnimationFrame(listscroll);
  //     addData(dataarr);
  //     // posY = 1;
  //   }
  //   posY += 0.5;
  //   if (!istouch) {
  //     list.animate({
  //       scrollTop: posY
  //     }, 1000 / 60);
  //   } else {
  //     window.cancelAnimationFrame(scroll);
  //   }
  // }
  // // scroll = window.requestAnimationFrame(listscroll);
  // list.on('touchstart touchmove', () => {
  //   istouch = true;
  //   console.log('stop');
  //   window.cancelAnimationFrame(scroll);
  // });
  // list.on('touchend touchcancel', () => {
  //   istouch = false;
  //   setTimeout(() => {
  //     posY = list.scrollTop();
  //     console.log(posY);
  //     scroll = window.requestAnimationFrame(listscroll);
  //   }, 3000);
  // });
  // let disy;
  let y0;
  let movey;
  let endy;
  let country = document.querySelector('.country_select_con');
  searchbtn.on('click', () => {
    console.log(checkCountry($('#input').val(), countrylist));
    if (checkCountry($('#input').val(), countrylist).length > 0) {
      // selectlist.animate({
      //   scrollTop: checkCountry($('#input').val(), countrylist)[0].top
      // }, 300);
      country.style.transform = `translate3d(0, -${checkCountry($('#input').val(), countrylist)[0].top}px, 0)`;
    } else {
      $.toast().reset('all');
      $.toast({
        text: '没有该国家的信息',
        hideAfter: 800
      });
    }
  });
  // selectlist.css('transform', `translate3d(0, -30px, 0)`);
  // console.log(getcssy(selectlist));
  // selectlist.on('scroll', (e) => {
  //   // console.log(e.target.scrollTop);
  //   disy = e.target.scrollTop;
  // });
  // selectlist.on('touchend', () => {
  //   // console.log(disy / 30);
  //   setTimeout(() => {
  //     selectlist.animate({
  //       scrollTop: Math.round((disy / 30)) * 30
  //     }, 100);
  //   }, 50);
  // });
  selectlist.on('touchstart', (e) => {
    // console.log(e.targetTouches[0].clientY);
    endy = getcssy(selectlist);
    y0 = e.targetTouches[0].pageY;
  });
  selectlist.on('touchmove', (e) => {
    // console.log(e.targetTouches[0].clientY);
    let dis = e.targetTouches[0].pageY;
    movey = dis - y0;
    // console.log(movey, y0, getcssy(selectlist), 'move');
    country.style.transform = `translate3d(0, ${endy + movey}px, 0)`;
    country.style.webkitTransform = `translate3d(0, ${endy + movey}px, 0)`;
    // if (utils.isIOS && w <= 325) {
    //   country.style.transform = `translateY(${endy + movey}px)`;
    // }
  });
  // country.style.transform = `translate3d(0, -150px, 0)`;
  selectlist.on('touchend', () => {
    endy = getcssy(selectlist);
    // console.log(endy, movey);
    let lasttop = countrylist.length >= 1 ? countrylist[countrylist.length - 1].top : 0;
    if (endy >= 0 && movey >= 5) {
      country.style.transform = `translate3d(0, 0, 0)`;
      country.style.webkitTransform = `translate3d(0, 0, 0)`;
    // } else if (endy <= -150 && movey <= 5) {
    } else if (endy <= -lasttop && movey <= 5) {
      // country.style.transform = `translate3d(0, -150px, 0)`;
      // country.style.webkitTransform = `translate3d(0, -150px, 0)`;
      country.style.transform = `translate3d(0, -${lasttop}px, 0)`;
      country.style.webkitTransform = `translate3d(0, -${lasttop}px, 0)`;
    } else {
      country.style.transform = `translate3d(0, ${Math.round((endy / 30)) * 30}px, 0)`;
      country.style.webkitTransform = `translate3d(0, ${Math.round((endy / 30)) * 30}px, 0)`;
    }
    // country.style.transform = `translate3d(0, 0, 0)`;
    // country.style.transform = `translate3d(0, ${Math.round((endy / 30)) * 30}px, 0)`;
    // if (timer) {
    //   clearTimeout(timer);
    // } else {
    //   timer = setTimeout(() => {
    //     endy = parseInt(getTransform('.country_select_con')[1]);
    //     console.log(endy);
    //   }, 50);
    // }
  });
  // if (utils.isIOS && w <= 325) {
  //   // selectlist.css('transform', `translate3d(0, -30px, 0)`);
  //   // console.log(getcssy(selectlist));
  //   selectlist.on('scroll', (e) => {
  //     // console.log(e.target.scrollTop);
  //     disy = e.target.scrollTop;
  //   });
  //   selectlist.on('touchend', () => {
  //     // console.log(disy / 30);
  //     setTimeout(() => {
  //       selectlist.animate({
  //         scrollTop: Math.round((disy / 30)) * 30
  //       }, 100);
  //     }, 50);
  //   });
  // } else {
  //   selectlist.on('touchstart', (e) => {
  //     // console.log(e.targetTouches[0].clientY);
  //     endy = getcssy(selectlist);
  //     y0 = e.targetTouches[0].pageY;
  //   });
  //   selectlist.on('touchmove', (e) => {
  //     // console.log(e.targetTouches[0].clientY);
  //     let dis = e.targetTouches[0].pageY;
  //     movey = dis - y0;
  //     // console.log(movey, y0, getcssy(selectlist), 'move');
  //     country.style.transform = `translate3d(0, ${endy + movey}px, 0)`;
  //     if (utils.isIOS && w <= 325) {
  //       country.style.transform = `translateY(${endy + movey}px)`;
  //     }
  //   });
  //   selectlist.on('touchend', () => {
  //     endy = getcssy(selectlist);
  //     console.log(endy, movey);
  //     if (endy >= 0 && movey >= 5) {
  //       country.style.transform = `translate3d(0, 0, 0)`;
  //     } else if (endy <= -150 && movey <= 5) {
  //       country.style.transform = `translate3d(0, -150px, 0)`;
  //     } else {
  //       country.style.transform = `translate3d(0, ${Math.round((endy / 30)) * 30}px, 0)`;
  //     }
  //     // country.style.transform = `translate3d(0, 0, 0)`;
  //     // country.style.transform = `translate3d(0, ${Math.round((endy / 30)) * 30}px, 0)`;
  //     // if (timer) {
  //     //   clearTimeout(timer);
  //     // } else {
  //     //   timer = setTimeout(() => {
  //     //     endy = parseInt(getTransform('.country_select_con')[1]);
  //     //     console.log(endy);
  //     //   }, 50);
  //     // }
  //   });
  // }
  // new picker( // eslint-disable-line
  //   [
  //     //展示的选择数据，单列的只有一个数组参数
  //     {
  //       label: `<div class="country"><img><span>aad</span></div>`, //key，用于显示
  //       value: 0 //value 具体的值
  //     },
  //     {
  //       label: '🇩🇪德国',
  //       value: 1
  //     },
  //     {
  //       label: '🇫🇷法国',
  //       value: 3
  //     },
  //     {
  //       label: '🇬🇧英国',
  //       value: 4
  //     }
  //   ],
  //   {
  //     className: 'singleLinePicker', //弹出框的class属性
  //     container: 'body', //弹出框插入的dom元素
  //     defaultIndex: [0], //默认每一列展示的index序号，从0开始
  //     onChange: (result) => {
  //       //选择项改变的时候的回调
  //       console.log(result);
  //     },
  //     onConfirm: (result) => {
  //       //点击确定后的回调
  //       console.log(result);
  //     },
  //     id: 'singleLinePicker' //当前picker的id，用于在一个页面中还有多个picker时缓存上一次的选择
  //   }
  // );
};