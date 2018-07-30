import 'babel-polyfill';
import { wnlShare, wxShare } from '@wnl/ui';
import { util } from '@wnl/util';
import html2canvas from 'html2canvas';
// import domtoimage from 'dom-to-image';
import '../static/jquery.toast.css';
import '../static/jquery.toast';
import '../static/flexible';
import '../css/index.scss';
import { addBtnState, play, getQueryValue } from '../static/helper';
import imgupload from '../static/upload';
// import '../static/vconsole.min';

const Base64 = require('js-base64').Base64;
const img1 = require('../assets/pic-baozhatang.jpg'); // 爆炸糖
const img2 = require('../assets/pic-dalishuishou@3x.jpg'); // 大力水手
const img3 = require('../assets/pic-hundouluo.jpg'); // 魂斗罗
const img4 = require('../assets/pic-jiafeimao@3x.jpg'); // 加菲猫
const img5 = require('../assets/pic-kenan@3x.jpg'); // 柯南
const img6 = require('../assets/pic-paopaotang@3x.jpg'); // 泡泡堂
const img7 = require('../assets/pic-sandajian.jpg'); // 三大件
const img8 = require('../assets/pic-zhuomicang.jpg'); // 捉迷藏

const questionsarr = {
  q1: {
    q: '没有饰演过赌圣、赌神、赌侠的男星是？',
    ans: [
      {
        text: '周润发',
        isRight: false
      },
      {
        text: '刘德华',
        isRight: false
      },
      {
        text: '周星驰',
        isRight: false
      },
      {
        text: '郑少秋',
        isRight: true
      }
    ]
  },
  q2: {
    q: '请问《舒克和贝塔》中贝塔坦克使用的强力型炮弹是？',
    ans: [
      {
        text: '石头',
        isRight: false
      },
      {
        text: '花生米',
        isRight: true
      },
      {
        text: '优乐美',
        isRight: false
      },
      {
        text: '钻石',
        isRight: false
      }
    ]
  },
  q3: {
    q: '“水浒传”中被称为“拼命三郎”的是？',
    ans: [
      {
        text: '石秀',
        isRight: true
      },
      {
        text: '时迁',
        isRight: false
      },
      {
        text: '花荣',
        isRight: false
      },
      {
        text: '卢俊义',
        isRight: false
      }
    ]
  },
  q4: {
    q: '《七龙珠》中的龟仙人最喜欢干什么？',
    ans: [
      {
        text: '偷看美女',
        isRight: true
      },
      {
        text: '练习武功',
        isRight: false
      },
      {
        text: '早起晨练',
        isRight: false
      },
      {
        text: '偷吃美食',
        isRight: false
      }
    ]
  },
  q5: {
    q: ' 图中这只猫的名字叫什么？',
    hasimg: true,
    img: img4,
    ans: [
      {
        text: '加菲猫',
        isRight: true
      },
      {
        text: '大脸猫',
        isRight: false
      },
      {
        text: '叮当猫',
        isRight: false
      },
      {
        text: ' 文化猫',
        isRight: false
      }
    ]
  },
  q6: {
    q: '图中的俩人是什么关系呢？',
    hasimg: true,
    img: img5,
    ans: [
      {
        text: '恋人',
        isRight: true
      },
      {
        text: '姐弟',
        isRight: false
      },
      {
        text: '兄妹',
        isRight: false
      },
      {
        text: '母子',
        isRight: false
      }
    ]
  },
  q7: {
    q: '由邓丽君所唱的歌曲"恰似你的温柔”，歌词第一句是？',
    ans: [
      {
        text: '我爱你有几分',
        isRight: false
      },
      {
        text: '桃花朵朵开',
        isRight: false
      },
      {
        text: '某年某月某一天',
        isRight: true
      },
      {
        text: '再说一次我爱你',
        isRight: false
      }
    ]
  },
  q8: {
    q: '图中的零食叫什么名字？',
    hasimg: true,
    img: img6,
    ans: [
      {
        text: '大大泡泡糖',
        isRight: false
      },
      {
        text: '西瓜泡泡糖',
        isRight: true
      },
      {
        text: '比巴卜泡泡糖',
        isRight: false
      },
      {
        text: '绿箭口香糖',
        isRight: false
      }
    ]
  },
  q9: {
    q: '图中的动画人物喜欢吃什么？',
    hasimg: true,
    img: img2,
    ans: [
      {
        text: '娃娃菜',
        isRight: false
      },
      {
        text: '菠菜',
        isRight: true
      },
      {
        text: '油菜',
        isRight: false
      },
      {
        text: '白菜',
        isRight: false
      }
    ]
  },
  q10: {
    q: '电视剧还珠格格中含香嫁给皇上前曾与麦尔丹私奔了几次?',
    ans: [
      {
        text: '六次',
        isRight: false
      },
      {
        text: '七次',
        isRight: true
      },
      {
        text: '八次',
        isRight: false
      },
      {
        text: '九次',
        isRight: false
      }
    ]
  },
  q11: {
    q: '白娘子传奇里面的情侣CP是哪一对？',
    ans: [
      {
        text: '许仙与白娘子',
        isRight: true
      },
      {
        text: '法海与白娘子',
        isRight: false
      },
      {
        text: '小青与许仙',
        isRight: false
      },
      {
        text: '小青与法海',
        isRight: false
      }
    ]
  },
  q12: {
    q: '这段语音出现在以下哪部作品中呢？',
    hasmusic: true,
    img: '',
    ans: [
      {
        text: '还珠格格',
        isRight: false
      },
      {
        text: '大话西游',
        isRight: false
      },
      {
        text: '喜剧之王',
        isRight: true
      },
      {
        text: '神雕侠侣',
        isRight: false
      }
    ]
  },
  q13: {
    q: '在动画片“黑猫警长”中的老鼠头目的绰号叫什么？',
    ans: [
      {
        text: '一只耳',
        isRight: true
      },
      {
        text: '吃猫鼠',
        isRight: false
      },
      {
        text: '独耳鼠',
        isRight: false
      },
      {
        text: '小二哥',
        isRight: false
      }
    ]
  },
  q14: {
    q: '请问图片中这个游戏叫什么？',
    hasimg: true,
    img: img3,
    ans: [
      {
        text: '魂斗罗',
        isRight: true
      },
      {
        text: '超级马里奥',
        isRight: false
      },
      {
        text: '坦克大战',
        isRight: false
      },
      {
        text: '拳皇98',
        isRight: false
      }
    ]
  },
  q15: {
    q: '图中所指是哪个年代的结婚必备三大件？',
    hasimg: true,
    img: img7,
    ans: [
      {
        text: '60年代',
        isRight: false
      },
      {
        text: '70年代',
        isRight: true
      },
      {
        text: '80年代',
        isRight: false
      },
      {
        text: '90年代',
        isRight: false
      }
    ]
  },
  q16: {
    q: '图中零食的名字是以下哪一个？',
    hasimg: true,
    img: img1,
    ans: [
      {
        text: '口香糖',
        isRight: false
      },
      {
        text: '爆炸糖',
        isRight: true
      },
      {
        text: '一口爽',
        isRight: false
      },
      {
        text: '糖豆',
        isRight: false
      }
    ]
  },
  q17: {
    q: '“灌篮高手”中，在湘北对阵海南最后一刻惜败后，樱木花道有什么特殊举动？',
    ans: [
      {
        text: '愤然离场',
        isRight: false
      },
      {
        text: '剃头雪耻',
        isRight: true
      },
      {
        text: '痛哭流涕',
        isRight: false
      },
      {
        text: '向晴子表白',
        isRight: false
      }
    ]
  },
  q18: {
    q: '图中的这个游戏的名字叫什么？',
    hasimg: true,
    img: img8,
    ans: [
      {
        text: '捉迷藏',
        isRight: true
      },
      {
        text: '丢手绢',
        isRight: false
      },
      {
        text: '跳房子',
        isRight: false
      },
      {
        text: '扔铁环',
        isRight: false
      }
    ]
  },
  q19: {
    q: '在葫芦兄弟中，哪位兄弟可以刀枪不入？',
    ans: [
      {
        text: '三娃（黄色）',
        isRight: true
      },
      {
        text: '二娃（橙色）',
        isRight: false
      },
      {
        text: '六娃（蓝色）',
        isRight: false
      },
      {
        text: '七娃（紫色）',
        isRight: false
      }
    ]
  },
  q20: {
    q: '名侦探柯蓝里面哪个女生不喜欢柯南？',
    ans: [
      {
        text: '园子',
        isRight: true
      },
      {
        text: '吉田步美',
        isRight: false
      },
      {
        text: '灰原哀',
        isRight: false
      },
      {
        text: '毛利兰',
        isRight: false
      }
    ]
  }
};
const rel = {
  lgd: {
    title: '老古董',
    text: '你的童心已大量丢失，但你拥有着无坚不摧的意志，在生活中无所畏惧。但在今天请重拾你的童心，过一个快乐的儿童节！'
  },
  xdr: {
    title: '小大人',
    text: '你的童心正在修复中，你总是给人一种老成的姿态，敏锐地洞悉这世俗的一切，但愿你能用一颗赤子之心去善待生活。'
  },
  lwt: {
    title: '老顽童',
    text: '对你来说，岁月流金，但你有一颗不老的童心，当你面对任何困难都保持着乐观的态度，所以自然而然很多就迎刃而解了。'
  },
  lxh: {
    title: '老小孩',
    text: '哎呦不错哦，你是具有满满童心的潜力股，你的生活充满快乐和阳光，就算偶有阴霾也会被你的纯真童心驱散，让你拥有着强大的治愈力量。'
  },
  dxh: {
    title: '大小孩',
    text: '其实你骨子里还是个不愿长大的小孩，不分任何场合毫不掩饰你的孩子气，用一颗纯真的心去对待生活中的任何事物！你就是世间最美好的存在！'
  },
  hzw: {
    title: '孩子王',
    text: '童心百分百的你，让人感觉与你相处起来很愉快，你内心的单纯，往往能化解很多复杂的情与事，仿佛带有一种治愈的力量，给身边的人都带去快乐！'
  }
};
let type = '';
// let _czc = [];
if (util.isWeixin) {
  type = 'wx';
}
if (util.isWnl) {
  type = 'wnl';
}
// console.log(util.isWnl);
let shareData = {
  title: '51万年历与你一起追忆童年时光！',
  text: '赶紧坐上时光机，唤醒沉睡的童年记忆。',
  image: 'https://qiniu.image.cq-wnl.com/content/201805176998019a15854b98bd9a9277a6a12d7b.jpg',
  imgUrl: 'https://qiniu.image.cq-wnl.com/content/201805176998019a15854b98bd9a9277a6a12d7b.jpg',
  url: `${window.location.protocol}//${window.location.host + window.location.pathname}`,
  callback: () => {
    _czc.push(['_trackEvent', 'RTJ2018_shared_' + type, 'show']) //eslint-disable-line
  }
};
window.shareCallback = () => {
  _czc.push(['_trackEvent', 'RTJ2018_shared_' + type, 'show']) //eslint-disable-line
};
window.onload = function() {
  const audio = document.querySelector('#audio');
  const _play = $('.play');
  const _pause = $('.pause');
  let src = '';
  const share = $('.share');
  const again = $('.again');
  let n = 0;
  let score = 0;
  let click = true;
  let time = null;
  let nickname;
  function wxsharecall() {
    $('.wxsharemask').addClass('hidden');
    _czc.push(['_trackEvent', 'RTJ2018_shared_' + type, 'show']) //eslint-disable-line
  }
  if (getQueryValue('share')) {
    $('#index, #question, .detail').addClass('hidden');
    $('.resultpage').removeClass('hidden');
    $('#result_img').addClass('show');
    $('#result_img').removeClass('hidden');
    play(audio);
    // shareData.title = encodeURIComponent(getQueryValue('name')) + '竟是传说中的"' + $('.result_desc1').text() + $('.result_desc2').text() + $('.result_desc3').text() + '"，童心值为' + score + '分。'; // eslint-disable-line
    // shareData.text = '你离童年只有一颗童心的距离，赶紧来测你的童心值是多少！';
    // shareData.url = `${window.location.protocol}//${window.location.host + window.location.pathname}?score=${score}&share=1&name=${encodeURIComponent(nickname)}`; // eslint-disable-line
    // new wxShare(shareData); // eslint-disable-line
    if (getQueryValue('img')) {
      $('#result_img').attr('src', getQueryValue('img'));
    }
  } else {
    $('#index').removeClass('hidden');
    $('#question, .resultpage').addClass('hidden');
    $('#result_img').removeClass('show');
    $('.detail').removeClass('hidden');
  }
  let ua = navigator.userAgent;
  if (ua.toLocaleLowerCase().indexOf('huawei') > -1 && document.body.offsetWidth >= 380 && document.body.offsetWidth <= 412) { // 华为mate8
    $('.result_btn').addClass('huawei');
    $('.answer').addClass('bigscreen');
  } else {
    $('.result_btn').removeClass('huawei');
    $('.answer').removeClass('bigscreen');
  }
  if (ua.toLocaleLowerCase().indexOf('a889') > -1 && util.androidVersion < 4.4) { // 联想az4.2
    $('.result_title, .title').addClass('lenovo');
    $('.title_text, .text').addClass('lenovo');
    $('.title_score, .score').addClass('lenovo');
    $('.result_desc, .wz').addClass('lenovo');
    $('._bg').addClass('lenovo');
    $('.result_btn').addClass('lenovo');
    $('.btn').addClass('lenovo');
  } else {
    $('.result_title, .title').removeClass('lenovo');
    $('.title_text, .text').removeClass('lenovo');
    $('.title_score, .score').removeClass('lenovo');
    $('.result_desc, .wz').removeClass('lenovo');
    $('._bg').removeClass('lenovo');
    $('.result_btn').removeClass('lenovo');
    $('.btn').removeClass('lenovo');
  }
  if (util.isWeixin) {
    shareData.callback = wxsharecall;
  }
  function setPage(_score, desc1, desc2, desc3, text, name = '你') { // 更新页面数据
    $('.name, #name').html(name.length > 4 ? name.slice(0, 4) + '...' : name);
    // $('#name').attr('value', name.length > 4 ? name.slice(0, 4) : name);
    $('#score, .scorenum').html(_score);
    $('.result_desc1, ._desc1').html(desc1);
    $('.result_desc2, ._desc2').html(desc2);
    $('.result_desc3, ._desc3').html(desc3);
    $('.result_text, ._text').html(text);
  }
  function stopbg() {
    audio.pause();
    _pause.removeClass('hidden');
    _play.addClass('hidden');
    // playbtn = 0;
  }
  function playbg() {
    audio.play();
    _pause.addClass('hidden');
    _play.removeClass('hidden');
    // playbtn = 1;
  }
  let clickmusic = 1;
  function domToImg() { // eslint-disable-line
    audio.removeAttribute('autoplay');
    html2canvas(document.getElementById('resultpage_img'), {
      allowTaint: true,
      useCORS: true
    }).then((canvas) => { // eslint-disable-line
      let _src = canvas.toDataURL('image/jpeg', 1);
      // let _src = canvas;
      // console.log(_src);
      setTimeout(() => {
        new imgupload({ // eslint-disable-line
          base64String: _src,
          uploadCallback: (res) => {
            console.log(res);
            src = res;
            shareData.url = `${window.location.protocol}//${window.location.host + window.location.pathname}?share=1&score=${score}&share=1&name=${encodeURIComponent(nickname)}&img=${src}`; // eslint-disable-line
            new wxShare(shareData); // eslint-disable-line
            new wnlShare.setShareData({ // eslint-disable-line
              image: src || ''
            });
            if (!$('#result_img').attr('src') || $('#result_img').attr('src').length < 10) {
              $('#result_img, #relimg').attr('src', res);
            }
            $('#index, #question').addClass('hidden');
            $('.resultpage').removeClass('hidden');
            $('.disclick').addClass('hidden');
            $.toast().reset('all');
          }
        });
      }, 200);
    }).catch((err) => {
      console.log(err);
      $.toast().reset('all');
      $.toast({
        text: '网络错误',
        showHideTransition: 'fade',
        hideAfter: 800
      });
      $('.disclick').addClass('hidden');
    });
  }
  share.on('click', () => {
    if (util.isWnl) {
      // alert(src);
      wnlShare.showSharePlatform();
    }
    if (util.isWeixin) {
      $('.wxsharemask').removeClass('hidden');
    }
    _czc.push(['_trackEvent', 'RTJ2018_shareBtn_' + type, 'show']) //eslint-disable-line
  });
  $('.wxsharemask').on('click', () => {
    $('.wxsharemask').addClass('hidden');
  });
  play(audio);
  // console.log(util);
  if (util.isWeixin) {
    shareData.callback = () => {
      $('.wxsharemask').addClass('hidden');
      _czc.push(['_trackEvent', 'RTJ2018_shared_' + type, 'show']) //eslint-disable-line
    };
  }
  // shareData.callback = () => {
  //   _czc.push(['_trackEvent', 'RTJ2018_shared_' + type, 'show']) //eslint-disable-line
  // };
  // shareData.shareCallback = () => {
  //   _czc.push(['_trackEvent', 'RTJ2018_shared_' + type, 'show']) //eslint-disable-line
  // };
  new wnlShare.setShareData(shareData); // eslint-disable-line
  new wxShare(shareData); // eslint-disable-line
  function getNickName() { // eslint-disable-line
    if (util.isWeixin) { // 获取用户昵称
      // console.log('wx');
      if (localStorage.getItem('nickname') || util.getQueryValue('nickname')) {
        nickname = util.getQueryValue('nickname') || localStorage.getItem('nickname');
        localStorage.setItem('nickname', nickname);
      } else {
        window.location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + encodeURIComponent(window.location.href);
      }
    } else if (util.isWnl) {
      // setTimeout(() => {
      setTimeout(() => {
        window.location.href = 'protocol://getuserinfo#userinfocallback';
      }, 0);
      window.userinfocallback = (res) => {
        // alert(Base64.decode(res));
        let _res = JSON.parse(Base64.decode(res));
        if (_res.native_score.userId) {
          nickname = _res.native_usercenter.nickname ? _res.native_usercenter.nickname : _res.native_usercenter.name;
        } else {
          nickname = '你';
        }
      };
      // }, 0);
    } else {
      nickname = '你';
    }
  }
  getNickName();
  // let playbtn = 1;
  $('.wxsharemask').on('click', () => {
    $('.wxsharemask').addClass('hidden');
  });
  $('.index_btn').on('click', () => {
    $('#index').addClass('hidden');
    $('#question').removeClass('hidden');
    _czc.push(['_trackEvent', 'RTJ2018_enter_' + type, 'show']) //eslint-disable-line
  });
  $('.play').on('click', () => {
    stopbg();
    clickmusic = 0;
  });
  $('.pause').on('click', () => {
    playbg();
    clickmusic = 1;
  });

  const qaudio = document.querySelector('#qaudio');
  if (util.isWeixin) {
    shareData.callback = () => {
      $('.wxsharemask').addClass('hidden');
      _czc.push(['_trackEvent', 'RTJ2018_shared_' + type, 'show']) //eslint-disable-line
    };
  }
  let initarr = [...Object.keys(questionsarr)];// 题目编号
  let quesarr = [];
  // quesarr.push('q17');
  // initarr.splice(16, 1);
  const anstext = $('.ans_text');
  const question = $('.question');
  // const answer = $('.answer');
  const _hasmusic = $('.has_music'); // 是否显示音乐
  const _hasimg = $('.has_img'); // 是否显示图片
  const right = $('.right');
  const wrong = $('.wrong');
  const bg = $('.has_music_bg');
  // quesarr.push('q5');
  // initarr.splice(4, 1);
  console.log(quesarr);
  function changeQues(index) { // 切换到下一题
    right.addClass('hidden');
    wrong.addClass('hidden');
    anstext.removeClass('isright');
    anstext.removeClass('iswrong');
    question.removeClass('hasimg');
    question.removeClass('hasmusic');
    // console.log(index);
    if (index < 10) {
      if (questionsarr[quesarr[index]].hasmusic) { // eslint-disable-line
        question.addClass('hasmusic');
        _hasimg.addClass('hidden');
        _hasmusic.removeClass('hidden');
      } else if (questionsarr[quesarr[index]].hasimg) {
        _hasimg.css('background-image', 'url(' + questionsarr[quesarr[index]].img + ')');
        question.addClass('hasimg');
        _hasimg.removeClass('hidden');
        _hasmusic.addClass('hidden');
      } else {
        _hasimg.addClass('hidden');
        _hasmusic.addClass('hidden');
        question.removeClass('hasmusic');
        question.removeClass('hasimg');
      }
      $('.q_num').html(index + 1);
      $('.q_text').html(questionsarr[quesarr[index]].q);
      $('#a').html(questionsarr[quesarr[index]].ans[0].text);
      $('#b').html(questionsarr[quesarr[index]].ans[1].text);
      $('#c').html(questionsarr[quesarr[index]].ans[2].text);
      $('#d').html(questionsarr[quesarr[index]].ans[3].text);
    }
  }
  addBtnState('.a', $('.a'), 'click');
  addBtnState('.b', $('.b'), 'click');
  addBtnState('.c', $('.c'), 'click');
  addBtnState('.d', $('.d'), 'click');
  function getQue() {
    initarr = [...Object.keys(questionsarr)];// 题目编号
    quesarr = [];
    for (let i = 0; i < 10; i += 1) { //获取随机10道题
      let rand = Math.floor(Math.random() * initarr.length);
      quesarr.push(initarr[rand]);
      initarr.splice(rand, 1);
    }
  }
  getQue();
  changeQues(0);
  again.on('click', () => {
    // setTimeout(() => {
    //   window.location.href = `${window.location.protocol}//${window.location.host + window.location.pathname}`;
    // }, 500);
    $('#result_img').addClass('hidden');
    $('#result_img').removeAttr('src');
    n = 0;
    score = 0;
    click = true;
    getQue();
    changeQues(0);
    $('#index').removeClass('hidden');
    $('#question, .resultpage').addClass('hidden');
    // title: '51万年历与你一起追忆童年时光！',
    // text: '赶紧坐上时光机，唤醒沉睡的童年记忆。',
    shareData.title = '51万年历与你一起追忆童年时光！';
    shareData.text = '赶紧坐上时光机，唤醒沉睡的童年记忆。';
    shareData.url = `${window.location.protocol}//${window.location.host + window.location.pathname}`;
    new wnlShare.setShareData(shareData); // eslint-disable-line
    new wxShare(shareData); // eslint-disable-line
    _czc.push(['_trackEvent', 'RTJ2018_again_' + type, 'show']) //eslint-disable-line 
    _czc.push(['_trackEvent', 'RTJ2018_pageview_' + type, 'show']) //eslint-disable-line
  });
  // quesarr.reverse();
  anstext.on('click', function () { // eslint-disable-line
    // if (n >= 10) return;
    if (click) {
      click = false;
      $('.right, .wrong').addClass('hidden');
      qaudio.pause();
      if (clickmusic === 1) {
        playbg();
      } else {
        stopbg();
      }
      // playbg();
      anstext.removeClass('isright');
      anstext.removeClass('iswrong');
      if (time) {
        clearInterval(time);
      }
      if (questionsarr[quesarr[n]].ans[parseInt($(this).attr('data-num'))].isRight) {
        $(this).find('.wrong').addClass('hidden');
        $(this).find('.right').removeClass('hidden');
        $(this).addClass('isright');
        score += 10;
      } else {
        $(this).find('.right').addClass('hidden');
        $(this).find('.wrong').removeClass('hidden');
        $(this).addClass('iswrong');
      }
      setTimeout(() => {
        if (n >= 10) return;
        changeQues(n);
        click = true;
      }, 300);
      n += 1;
    }
    if (n >= 10) {
      $('.disclick').removeClass('hidden');
      $('#result_img').removeClass('hidden');
      $.toast().reset('all');
      $.toast('正在生成你的结果...');
      // setTimeout(() => {
      // window.location.href = `../result.html?score=${score}&name=${getQueryValue('name')}`;
      // window.location.href = `${window.location.protocol}//${window.location.host + window.location.pathname.replace('index', 'result')}?score=${score}&name=${nickname}&playbtn=${playbtn}`; // eslint-disable-line
      if (score < 60) {
        setPage(score, rel.lgd.title.split('')[0], rel.lgd.title.split('')[1], rel.lgd.title.split('')[2], rel.lgd.text, nickname);
      } else if (score === 60) {
        setPage(score, rel.xdr.title.split('')[0], rel.xdr.title.split('')[1], rel.xdr.title.split('')[2], rel.xdr.text, nickname);
      } else if (score === 70) {
        setPage(score, rel.lwt.title.split('')[0], rel.lwt.title.split('')[1], rel.lwt.title.split('')[2], rel.lwt.text, nickname);
      } else if (score === 80) {
        setPage(score, rel.lxh.title.split('')[0], rel.lxh.title.split('')[1], rel.lxh.title.split('')[2], rel.lxh.text, nickname);
      } else if (score === 90) {
        setPage(score, rel.dxh.title.split('')[0], rel.dxh.title.split('')[1], rel.dxh.title.split('')[2], rel.dxh.text, nickname);
      } else {
        setPage(score, rel.hzw.title.split('')[0], rel.hzw.title.split('')[1], rel.hzw.title.split('')[2], rel.hzw.text, nickname);
      }
      domToImg();
      // $('#name, .name').html($('#name').attr('value').length > 4 ? $('#name').attr('value').slice(0, 4) : $('#name').attr('value'));
      shareData.title = $('#name').html() + '竟是传说中的"' + $('.result_desc1').text() + $('.result_desc2').text() + $('.result_desc3').text() + '"，童心值为' + score + '分。'; // eslint-disable-line
      shareData.text = '你离童年只有一颗童心的距离，赶紧来测你的童心值是多少！';
      shareData.url = `${window.location.protocol}//${window.location.host + window.location.pathname}?score=${score}&share=1&name=${encodeURIComponent(nickname)}`; // eslint-disable-line
      shareData.callback = () => {
        $('.wxsharemask').addClass('hidden');
        _czc.push(['_trackEvent', 'RTJ2018_shared_' + type, 'show']) //eslint-disable-line
      };
      // new wnlShare.setShareData(shareData); // eslint-disable-line
      // new wxShare(shareData); // eslint-disable-line
      // }, 200);
    }
  });
  $('.wxsharemask').on('click', () => {
    $('.wxsharemask').addClass('hidden');
  });
  $('.has_music').on('click', () => {
    if (qaudio.paused) {
      let index = 1;
      time = setInterval(() => {
        // console.log(index);
        bg.removeClass('bg1');
        bg.removeClass('bg2');
        bg.removeClass('bg3');
        bg.addClass('bg' + index);
        index += 1;
        if (index > 3) {
          index = 1;
        }
      }, 400);
      qaudio.play();
      stopbg();
    } else {
      clearInterval(time);
      bg.removeClass('bg1');
      bg.removeClass('bg2');
      bg.removeClass('bg3');
      qaudio.pause();
      playbg();
    }
  });
  $('#qaudio').on('ended', () => {
    clearInterval(time);
    bg.removeClass('bg1');
    bg.removeClass('bg2');
    bg.removeClass('bg3');
    if (clickmusic === 1) {
      playbg();
    } else {
      stopbg();
    }
  });
  _czc.push(['_trackEvent', 'RTJ2018_pageview_' + type, 'show']) //eslint-disable-line
};
