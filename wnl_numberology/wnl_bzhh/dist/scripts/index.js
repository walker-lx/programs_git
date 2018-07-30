var __dayInfo = false,
  __mryy = false,
  __tianqi = false,
  __yiji = false,
  __xingzuo = false,
  __gdtad = false,
  __bazi = false,
  __baziHidden = false,
  __isFlagShow = false,
  __isAndroid = false,
  __isIOS = false,
  __pageView = false,
  __theAdProtocol = '';

/*获取设备信息*/
var WIN = window,
  DOC = document,
  URL = location.href,
  PN = location.pathname,
  UA = WIN.navigator.userAgent,
  IsAndroid = (/Android|HTC/i.test(UA) || (WIN.navigator['platform'] + '')
    .match(/Linux/i)),
  /* HTC Flyer平板的UA字符串中不包含Android关键词 */
  IsIPad = !IsAndroid && /iPad/i.test(UA),
  IsIPhone = !IsAndroid && /iPod|iPhone/i.test(UA),
  IsIOS = IsIPad || IsIPhone,
  IsLiebaoFast = /LieBaoFast/i.test(UA),
  IsWeixin = /MicroMessenger/i.test(UA),
  IsWnl = /wnl/i.test(UA);

// iphoneX适配
function isIphoneX() {
  ua = window.navigator.userAgent;
  if (ua.match(/iPhone|iPad|iPod/i)) {
    if (parseInt(window.devicePixelRatio) === 3 && parseInt(window.screen.width) === 375) {
      return true;
    }
    return false;
  }
  return false;
}

function iphoneXFits(container, fitsArr) {
  var iphoneXbanner = '<div class="iphoneXBanner" style="height:34px;width: 100%;position:fixed;bottom: 0;z-index: 9999;background-color: rgba(0, 0, 0, 0.3);"></div>'
  $('body').append(iphoneXbanner);
  paddingBottomFits(container);
  bottomArrFits(fitsArr);
}

function paddingBottomFits(container) {
  if (container.length > 0) {
    $(container).css({
      'padding-bottom': 34
    })
  }
}

function bottomArrFits(fitsArr) {
  var i;
  for (i = 0; i < fitsArr.length; i++) {
    var bottomSet = parseInt($(fitsArr[i]).css('bottom')) + 34;
    $(fitsArr[i]).css('bottom', bottomSet);
  }
}
if (isIphoneX()) {
  // 需上移的包裹容器
  var container = 'body';
  // 需上移的Fixed按钮
  var fitsArr = [];
  iphoneXFits(container, fitsArr);
}


$(function () {
  var max_show_count = 5,
    total_count = 0,
    show_height = 0,
    total_height = 0;
  var timer = setInterval(function () {
    if (__dayInfo && __mryy && __tianqi && __yiji && __xingzuo) {
      $('body').removeClass('hidden');
      clearInterval(timer);
    }
  }, 100);
  /*八字測算需求*/
  $('.bazi_get').on('click', function () {
    location.href = 'protocol://setjryc';
    //_czc.push(﻿["_trackPageview","/download/thunder5.0.exe","http://www.mysite.com/list/"]);
    _czc.push(﻿['_trackEvent', '八字运势点击-jryl.bzys.c', '今日一览clickEvent']);
  });

  setTimeout(function () {
    console.log('goto protocol');
    location.href = 'protocol://getuserinfo#userinfocallback';
  }, 0);

  /*獲區當日信息*/
  var festivalUrl =
    '//cfg.51wnl.com/api/getconfigbyparajson.aspx?appid=ios-wnl-free&appver=2&configkey=Festival_ZH_CN&lastupdate=';
  var festivalData;
  var citycode = getQueryString('citycode');
  var astro = getQueryString('astro');
  var dateString = getQueryString('date').substring(0, 8);
  var year = dateString.substring(0, 4),
    month = str2Int(dateString.substring(4, 6)),
    day = str2Int(dateString.substring(6, 8));
  var dateObj = new Date(year, month - 1, day);
  var chooseMonthLunarInfo = new calendar(year, month - 1);
  var lYear = chooseMonthLunarInfo[day - 1].lYear;
  var lMonth = chooseMonthLunarInfo[day - 1].lMonth;
  var lDay = chooseMonthLunarInfo[day - 1].lDay;
  $('.monthBg').html('<span>' + month + '月<span>');
  $('.dayNum').html(day);
  var weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  $('.weekString').html(weekList[dateObj.getDay()]);
  //节气
  //$('.jieqi').html(chooseMonthLunarInfo[day - 1].solarTerms);
  $('.jieqi').html(solarTerm[solarTermsDay.indexOf(parseInt(month) * 100 + parseInt(day))]);
  //农历日期
  var monthCN = (chooseMonthLunarInfo[day - 1].isLeap ? ' 闰' : ' ') +
    monthName[lMonth - 1] + cDay(lDay);
  $('.lunarDay').html(monthCN);
  $('.weekIndex').html('第' + getYearWeek(year, month, day) + '周');
  $('.xingzuo').html(getAstro(month, day) + '座');
  var pet = getPet(lYear, getLichunOffset(year, month - 1, day));
  $('.gzYear').html(chooseMonthLunarInfo[day - 1].cYear + '年');
  $('.gzMonth').html(chooseMonthLunarInfo[day - 1].cMonth + '月');
  $('.gzDay').html(chooseMonthLunarInfo[day - 1].cDay + '日');
  $('.shuxiang').html('属' + pet);
  getFestivalData(lYear, lMonth, lDay, year, month - 1, day);
  /*獲區每日一言*/
  $.ajax({
    url: '//www.51wnl.com/api/getdailysentenceweb.ashx',
    dataType: 'jsonp',
    data: {
      dt: year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (
        day < 10 ? ('0' + day) : day)
    },
    success: function (data) {
      if (data.result) {
        var title = data.result.S;
        $('.mryy').html(title);
      } else {
        $('.mryyItem').remove();
      }
      __mryy = true;
    }
  });
  /*獲區天氣信息*/
  $.ajax({
    url: '//weather.51wnl.com/weatherinfo/gettodayweather',
    dataType: 'jsonp',
    data: {
      citycode: citycode
    },
    success: function (data) {
      if (data && data.cityName && data.temp && data.desc) {
        $('.tianqi1').html(data.cityName + '&nbsp;&nbsp;' + data.temp
          .replace('/', '~') + '&nbsp;&nbsp;' + data.desc);
        if (data.qulity) {
          $('.tianqi2').html('空气质量&nbsp;&nbsp;' + data.qulity);
          if (data.qulity === '轻度' || data.qulity === '中度' || data.qulity ===
            '重度') {
            $('.tianqi2').html('空气质量&nbsp;&nbsp;' + data.qulity +
              '污染');
          }
        }
        //$(".verticleLine").height($(".infoList").height()-122);
      } else {
        $('.tianqiItem').remove();
      }
      __tianqi = true;
    }
  });
  /*獲區星座信息*/
  $.ajax({
    url: '//c.51wnl.com/Api4.3.5/GetCurrentInfo.ashx',
    dataType: 'jsonp',
    data: {
      astro: astro,
      citycode: citycode,
      av: '4.3.5',
      md: 'iphone3,4'
    },
    success: function (data) {
      if (data.data.astroLuckColor) {
        $('.luckyColor').html(data.data.astroLuckColor);
      }
      if (data.data.astroLuckNum !== undefined || data.data.astroLuckNum !==
        null) {
        $('.luckyNum').html(data.data.astroLuckNum);
      }
      if (data.data.astroPair) {
        $('.pairAstro').html(data.data.astroPair);
      }
      if (data.data.astroTotalScore) {
        for (var i = 0; i < data.data.astroTotalScore; i++) {
          $('.star:eq(' + i + ')').addClass('active');
        }
      }
      __xingzuo = true;
    }
  });

  /*獲區宜忌信息*/
  var hlObj = querySAByDay(new Date(year, month - 1, day));
  var dayHuangliObj = {
    'dayHuangliYi': '无',
    'dayHuangliJi': '无'
  };
  dayHuangliObj.dayHuangliYi = !hlObj.yi || hlObj.yi.trim().length === 0 ?
    '-' : hlObj.yi.trim();
  dayHuangliObj.dayHuangliJi = !hlObj.ji || hlObj.ji.trim().length === 0 ?
    '-' : hlObj.ji.trim();
  $('.yiDescContent').html(dayHuangliObj.dayHuangliYi.split(' ').join('  '));
  $('.jiDescContent').html(dayHuangliObj.dayHuangliJi.split(' ').join('  '));

  /*獲區節日信息*/
  function getFestivalData(lYear, lMonth, lDay, year, month, day) {
    var vacationFestivalData = localStorage['vacationFestivalData'];
    if (vacationFestivalData) {
      vacationFestivalData = JSON.parse(vacationFestivalData);
      festivalUrl += vacationFestivalData.lastupdate;
      if (vacationFestivalData.festivalData) {
        festivalData = JSON.parse(vacationFestivalData.festivalData);
        getJieriList(lYear, lMonth, lDay, year, month, day);
      }
    } else {
      vacationFestivalData = {};
      $.ajax({
        url: festivalUrl,
        dataType: 'jsonp',
        jsonp: 'callback',
        async: false,
        success: function (result) {
          if (result.status) {
            vacationFestivalData.festivalData = utf8to16(base64decode(
              result.msg));
            vacationFestivalData.lastupdate = result.r;
            localStorage.setItem('vacationFestivalData', JSON.stringify(
              vacationFestivalData));
            festivalData = JSON.parse(vacationFestivalData.festivalData);
            getJieriList(lYear, lMonth, lDay, year, month, day);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log('节日信息报错');
        }
      });
    }
  }

  function getJieriList(lYear, lMonth, lDay, sYear, sMonth, sDay) {
    lYear = parseInt(lYear, 10);
    sYear = parseInt(sYear, 10);
    sMonth += 1;
    var lDateString = (lMonth < 10 ? '0' + lMonth : lMonth.toString()) + (
      lDay < 10 ? '0' + lDay : lDay.toString());
    var sDateString = (sMonth < 10 ? '0' + sMonth : sMonth.toString()) + (
      sDay < 10 ? '0' + sDay : sDay.toString());
    var jieriList = [];
    var sJieriList = festivalData.S[sDateString];
    if (sJieriList && sJieriList.length > 0) {
      for (var i = 0; i < sJieriList.length; i++) {
        if (sYear >= parseInt(sJieriList[i].Y, 10) && parseInt(sJieriList[i]
            .P, 10) > 5) {
          jieriList.push(sJieriList[i]);
        }
      }
    }
    var lJieriList = festivalData.L[lDateString];
    if (lJieriList && lJieriList.length > 0) {
      for (var i = 0; i < lJieriList.length; i++) {
        if (lYear >= parseInt(lJieriList[i].Y, 10) && parseInt(lJieriList[i]
            .P, 10) > 5) {
          jieriList.push(lJieriList[i]);
        }
      }
    }
    var wDateString = getWeekIndexString(sYear, sMonth, sDay);
    var wJieriList = festivalData.W[wDateString];
    if (wJieriList && wJieriList.length > 0) {
      for (var i = 0; i < wJieriList.length; i++) {
        if (sYear >= parseInt(wJieriList[i].Y, 10) && parseInt(wJieriList[i]
            .P, 10) > 5) {
          jieriList.push(wJieriList[i]);
        }
      }
    }
    if (jieriList.length > 0) {
      jieriList.sort(function (a, b) {
        a = parseInt(a.P, 10);
        b = parseInt(b.P, 10);
        if (a === b) {
          return 0;
        } else {
          return a < b ? 1 : -1;
        }
      });
      $.each(jieriList, function () {
        $('<span class="festivalItem">' + this.V + '</span>').appendTo(
          '.festivalItems');
      });
    } else {
      $('.festivalListItem').remove();
    }
    __yiji = true;
    __dayInfo = true;
    return jieriList;
  }

  function getWeekIndexString(year, month, day) {
    var weekIndex = Math.ceil(day / 7);
    var week = new Date(year, (month - 1), day).getDay();
    var weekString = (month < 10 ? '0' + month : month.toString()) +
      weekIndex + week;
    return weekString;
  }

  function str2Int(str) {
    str = str.replace(/^0+/g, '');
    if (str.length == 0) {
      return 0;
    }
    return parseInt(str);
  }

  function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return null;
  }

  /*獲取設備信息,不是客戶端顯示下載banner*/
  var ua = navigator.userAgent.toLocaleLowerCase();
  console.log(ua);
  var wnl = ua.indexOf('wnl') > -1;
  if (!wnl) {
    $('.wnlBanner').show();
  }
  $('.closeBanner').click(function () {
    $('.wnlBanner').hide();
    $('.main').css('margin', '5px');
  });
  $('.downloadBtn').click(function () {
    var wx = ua.indexOf('micromessenger') > -1;
    var isIOSPhone = ua.indexOf('iphone') > -1 || ua.indexOf('ipod') >
      -1;
    __isIOS = isIOSPhone || ua.indexOf('ipad') > -1;
    __isAndroid = ua.indexOf('android') > -1;
    if (wx) {
      location.href =
        'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653';
    } else {
      if (__isIOS) {
        location.href = 'http://um0.cn/89wDL';
      } else if (__isAndroid) {
        location.href =
          'http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]';
      } else {
        location.href = 'http://www.51wnl.com';
      }
    }
  });
  if (ua.indexOf('wnl') > -1 && ua.indexOf('simple') > -1) {
    $('.yiTitle').addClass('wnl_lite');
    $('.jiTitle').addClass('wnl_lite');
  }


  if (IsIOS) {
    Wannianli.appVersion = parseInt(UA.split(' ').pop().replace(/\./g, '')) >=
      426 ? '4.2.6' : '0.0.0';
  } else if (IsAndroid) {
    Wannianli.versionCode = parseInt(UA.split(' ').pop().replace(/\./g, '')) >=
      433 ? 70 : 0;
    //判断是否加载广告
    if (/noad/i.test(UA)) {
      Wannianli.versionCode = 0;
    }
    //大于73
    else if (UA.indexOf('wnlver/') != -1) {
      Wannianli.versionCode = UA.substring(UA.indexOf('wnlver/') + 7, UA.indexOf('wnlver/') + 10).trim();
    }
  }
  /*
   * 判断客户端版本,低版本或不予展示八字测算.
   */
  if (/simple/.test(UA)) {
    __baziHidden = true;
  } else if (IsIOS && parseInt(UA.split(' ').pop().replace(/\./g, '')) < 457) {
    console.log('isIOS' + isIOS);
    console.log(parseInt(Wannianli.appVersion.split('.').join('')));
    __baziHidden = true;
  } else if (IsAndroid && parseInt(UA.split(' ').pop().replace(/\./g, '')) < 463) {
    console.log('isAndroid' + isAndroid);
    console.log(parseInt(Wannianli.appVersion.split('.').join('')));
    __baziHidden = true;
  } else {
    __baziHidden = false;
  }

  /*
   * 广告数据
   */



  if (!__isFlagShow) {
    //   Wannianli.adList = [{
    //     "title": "熹妃传",
    //     "img": "http://pgdt.gtimg.cn/gdt/0/c69fea202d444d55b2e75f3366f117c3.JPG/0?ck=a1a813d35430b889591a4723392de3d4",
    //     "desc": "穿衣服也步步惊心！如此宫斗你能活几集？穿衣服也步步惊心！如此宫斗你能活几集？",
    //     "icon": "http://pgdt.gtimg.cn/gdt/0/7574da3c85446fe1bf3556f5f749cbd9.JPG/0?ck=7de195d268ddbc53d3cb99e5804d839f"
    //   }, {
    //     "title": "丧尸之战",
    //     "img": "http://pgdt.gtimg.cn/gdt/0/01d7c40168b73a7be2968025e86d905a.JPG/0?ck=a61c032bef38bb8634fc05e152b5f9e8",
    //     "desc": "敢来玩这款游戏的人，都是爷们~",
    //     "icon": "http://is3.mzstatic.com/image/thumb/Purple62/v4/ba/c4/be/bac4be57-4a24-7bd3-e923-06aa86b89cdc/source/60x60bb.jpg"
    //   }, {
    //     "title": "去哪儿旅行",
    //     "img": "http://pgdt.gtimg.cn/gdt/0/DAAE0gqAPoAIwABZBXxUBfCPoSMHAs.jpg/0?ck=197e8beb4c2afb9bf775945d65081a1c",
    //     "desc": "别说你坐不起飞机，那是你没用对APP！",
    //     "icon": "http://pgdt.gtimg.cn/gdt/0/DAAE0gqAA8AA8AABBXGcKEDKalL4ff.jpg/0?ck=89b6ed05106f33538b7325875eea29c8"
    //   }, {
    //     "title": "点击查看",
    //     "img": "http://pgdt.gtimg.cn/gdt/0/bbf61210e1916af5e351f2d652cbe0a8.JPG/0?ck=4049564edfc80e8f214fd5c8c7b2f4ed",
    //     "desc": "防虫有联盟，虫虫去无踪。每月一驱，爱宠无忧！",
    //     "icon": "http://pgdt.gtimg.cn/gdt/0/318e9a389bdbc6ee81f914a0e5d96bf2.JPG/0?ck=ddc5ac3eefd93a4c317873d0552bf936"
    //   }, {
    //     "title": "猎趣",
    //     "img": "http://pgdt.gtimg.cn/gdt_crt_65/0/DAAF9GUAPoAIwABZBXOrhAC4LQz6v4.jpg/0?ck=4c3452f77ce2a4c5bbd438a52734312f",
    //     "desc": "准备换手机了，售卖我用过的手机，价格可再谈，搜索我叫魅魅哦",
    //     "icon": "http://pgdt.gtimg.cn/gdt/0/DAAF9GUAA8AA8AABBXGIRjCrursCya.jpg/0?ck=21ea0e2e70cc399c555715993fedd1de"
    //   }, {
    //     "title": "Finger",
    //     "img": "http://pgdt.gtimg.cn/gdt_crt_65/0/DAAHY1tAPoAIwABZBXwAjNA3EHykLv.jpg/0?ck=e422523ca8b2697b7ce06f9de9951560",
    //     "desc": "同学暑假回来居然会弹吉他了，原来在这学的，太强大了！",
    //     "icon": "http://pgdt.gtimg.cn/gdt/0/DAAHY1tAA8AA8AABBXXhroBrT7gPVh.jpg/0?ck=d64c98c227b20d938dc82c90b0220e4c"
    //   }]
  }
  //加载广点通广告
  var timers = setInterval(function () {
    if (Wannianli.adList.length > 0) {
      timers && clearInterval(timers);
      gdtShow(1, '#gdtSection', 0);
      $('.adItem').removeClass('hidden');
      $('.verticleLine').height($('.infoList').height() - $(
        '#gdtSection').height() - 22);
      __isFlagShow = true;
    }
  }, 1000);
});
var Wannianli = {
  'adList': []
};

function ad2callback(data) {
  var string = (typeof data == 'string') ? data : JSON.stringify(data);
  var arr = (typeof data == 'string') ? JSON.parse(data) : data;
  Wannianli.adList = arr;
  console.log(JSON.stringify(Wannianli.adList));
  for (var i = 0; i < arr.length; i++) {
    //展示上报
    (function (arg) {
      setTimeout(function () {
        location.href = 'protocol://reportinjectedadim#' + arg;
      }, 500 * arg);
    })(i);
  };
}

function gdtShow(type, eleid, index, statType) {
  switch (type) {
    case 1:
      // $(eleid).html(
      // 	'<div class="back"><div class="footer"><span class="desc">探索BOSS1 2016 秋冬男装新品系列</span><span class="more">广告</span></div></div>'
      // )
      // $(eleid).html('<a class="back" href="protocol://clickinjectedadat#' + index + '"><img src="' + Wannianli.adList[index].img + '" /><p><i>广告</i>' + Wannianli.adList[index].desc + '</p></a>');
      // alert(index);
      // console.log(index);
      $(eleid).html('<a href="protocol://clickinjectedadat#' + index + '"><div class="back" style="background:url(' + Wannianli.adList[index].img + ');background-size:cover;"><div class="footer"><span class="desc">' + Wannianli.adList[index].desc + '</span><span class="more">广告</span></div></div></a>');
      break;
    case 2:
      $(eleid).append(
        '<div class="i-topicad i-item"><a href="protocol://clickinjectedadat#' +
        index + '" class="imgbox" stat="' + statType + '"><span>' + Wannianli
        .adList[index].desc + '</span><img src="' + Wannianli.adList[index].img +
        '" class="imglazyload_y" /><p class="i-infos"><em class="i-views">' +
        (Math.round(Math.random() * 10000) + 5000) +
        '人浏览</em><i class="i-tuiguang"></i></p></a></div>');
      break;
    case 3:
      $(eleid).find('dl').last().after(
        '<dl class="i-thumbs i-item"><a href="protocol://clickinjectedadat#' +
        index + '" stat="' + statType +
        '"><dt><span class="imgbox"><img src="' + Wannianli.adList[index].img +
        '" class="imglazyload_y"></span></dt><dd><span>' + Wannianli.adList[
          index].desc + '</span><p class="i-infos"><em class="i-views">' + (
          Math.round(Math.random() * 10000) + 5000) +
        '人浏览</em><i class="i-tuiguang"></i></p></dd></a></dl>');
      break;
    default:
      break;
  }
}
/*
客户端-用户设置八字测算后-回调函数
*/
function ycinfoCallback() {
  setTimeout(function () {
    location.href = 'protocol://getuserinfo#userinfocallback';
  }, 0);
}
/*
 * 获取八字运势数据API
 */
function getBazicesuan(name, sex, date, time) {
  var theSex = (sex == 1) ? '男' : '女';
  var theUrl = '//coco70.51wnl.com/numberologynew/fortune/GetDailyFortune?name=' + name +
    '&sex=' + theSex + '&birthday=' + date + '+' + time + '时';
  console.log('ajax here');
  $.ajax({
    url: encodeURI(theUrl),
    type: 'get',
    dataType: 'json',
    success: function (response) {
      console.log(response.data);
      setTimeout(function () {
        $('.score0_after').html(response.data.scoreLv0 + '分');
        $('.score2_after').html(response.data.scoreLv1 + '分');
        $('.score1_after').html(response.data.scoreLv2 + '分');
        $('.score3_after').html(response.data.scoreLv3 + '分');
        // $('.score[name="' + response.data.scoreNameLv1 + '"]').attr('scoreValue',
        //     response.data.scoreLv1 + '分');
        //
        // $('.score[name="' + response.data.scoreNameLv2 + '"]').attr('scoreValue',
        //       response.data.scoreLv2 + '分');
        //
        // $('.score[name="' + response.data.scoreNameLv3 + '"]').attr('scoreValue',
        //         response.data.scoreLv3 + '分');

        $('.highlight[name="' + response.data.scoreNameLv0 + '"]').attr(
          'value', response.data.scoreTextLv0);
        $('.highlight[name="' + response.data.scoreNameLv0 + '"]').css(
          'width', highlight(response.data.scoreLv0) + 'rem');
        $('.highlight[name="' + response.data.scoreNameLv1 + '"]').attr(
          'value', response.data.scoreTextLv1);
        $('.highlight[name="' + response.data.scoreNameLv1 + '"]').css(
          'width', highlight(response.data.scoreLv1) + 'rem');
        $('.highlight[name="' + response.data.scoreNameLv2 + '"]').attr(
          'value', response.data.scoreTextLv2);
        $('.highlight[name="' + response.data.scoreNameLv2 + '"]').css(
          'width', highlight(response.data.scoreLv2) + 'rem');
        $('.highlight[name="' + response.data.scoreNameLv3 + '"]').attr(
          'value', response.data.scoreTextLv3);
        $('.highlight[name="' + response.data.scoreNameLv3 + '"]').css(
          'width', highlight(response.data.scoreLv3) + 'rem');
        $('.bazicesuan').show();
      }, 0);
      if (!__pageView) {
        _czc.push(﻿['_trackPageview', '八字运势展示-jryl.bzys.im', '今日一览pageview']);
        __pageView = true;
      }
    },
    error: function (response) {
      // console.log(response);
      // setTimeout(function () {
      // 	$('.score0_after').html(response.data.scoreLv0 + '分');
      // 	$('.score2_after').html(response.data.scoreLv1 + '分');
      // 	$('.score1_after').html(response.data.scoreLv2 + '分');
      // 	$('.score3_after').html(response.data.scoreLv3 + '分');
      // 	// $('.score[name="' + response.data.scoreNameLv1 + '"]').attr('scoreValue',
      // 	//     response.data.scoreLv1 + '分');
      // 	//
      // 	// $('.score[name="' + response.data.scoreNameLv2 + '"]').attr('scoreValue',
      // 	//       response.data.scoreLv2 + '分');
      // 	//
      // 	// $('.score[name="' + response.data.scoreNameLv3 + '"]').attr('scoreValue',
      // 	//         response.data.scoreLv3 + '分');
      //
      // 	$('.highlight[name="' + response.data.scoreNameLv0 + '"]').attr(
      // 		'value', response.data.scoreTextLv0);
      // 	$('.highlight[name="' + response.data.scoreNameLv0 + '"]').css(
      // 		'width', highlight(response.data.scoreLv0) + 'rem');
      // 	$('.highlight[name="' + response.data.scoreNameLv1 + '"]').attr(
      // 		'value', response.data.scoreTextLv1);
      // 	$('.highlight[name="' + response.data.scoreNameLv1 + '"]').css(
      // 		'width', highlight(response.data.scoreLv1) + 'rem');
      // 	$('.highlight[name="' + response.data.scoreNameLv2 + '"]').attr(
      // 		'value', response.data.scoreTextLv2);
      // 	$('.highlight[name="' + response.data.scoreNameLv2 + '"]').css(
      // 		'width', highlight(response.data.scoreLv2) + 'rem');
      // 	$('.highlight[name="' + response.data.scoreNameLv3 + '"]').attr(
      // 		'value', response.data.scoreTextLv3);
      // 	$('.highlight[name="' + response.data.scoreNameLv3 + '"]').css(
      // 		'width', highlight(response.data.scoreLv3) + 'rem');
      // 	$('.bazicesuan').show();
      // }, 0);
      // _czc.push(﻿['_trackPageview', '八字运势展示-jryl.bzys.im', '今日一览pageview']);
    }
  });
  __bazi = true;
  setTimeout(function () {
    console.log('Ad loading...');
    if (IsIOS && parseInt(Wannianli.appVersion.split('.').join('')) >= 426) {
      location.href = 'protocol://requestInjectedAd#1103821819#6080606226818307#6#ad2callback';
    } else if (IsAndroid && parseInt(Wannianli.versionCode) >= 73) {
      location.href = 'protocol://requestInjectedAd#1101052841#5030020286553836#6#ad2callback';
    } else if (IsAndroid && parseInt(Wannianli.versionCode) >= 70) {
      location.href = 'protocol://requestInjectedAd#1103948728#1000704531685781#6#ad2callback';
    }
  }, 0);
}
/*
 * 用户信息回调
 */
function userinfocallback(result) {
  console.log('getuserinfo');
  var originalString = Base64.decode(result); //base64解密
  var originalAllObj = JSON.parse(originalString);
  var originalObj = {};
  originalObj = originalAllObj.native_jryc || originalAllObj.native_bzys || originalAllObj.native_usercenter || originalObj;

  // 因为版本不需要显示八字测算这里隐藏
  if (__baziHidden) {
    console.log('bazihidden')
    setTimeout(function () {
      console.log('Ad loading...');
      if (IsIOS && parseInt(Wannianli.appVersion.split('.').join('')) >= 426) {
        location.href = 'protocol://requestInjectedAd#1103821819#6080606226818307#6#ad2callback';
      } else if (IsAndroid && parseInt(Wannianli.versionCode) >= 73) {
        location.href = 'protocol://requestInjectedAd#1101052841#5030020286553836#6#ad2callback';
      } else if (IsAndroid && parseInt(Wannianli.versionCode) >= 70) {
        location.href = 'protocol://requestInjectedAd#1103948728#1000704531685781#6#ad2callback';
      }
    }, 0);
    $('.bazicesuan').hide();
    __bazi = true;
    return;
  }
  console.log(originalObj);
  // 回调获得信息 显示八字测算内容
  if (originalObj && originalObj.name && originalObj.name.length !== 0 && originalObj.date && originalObj.date.length !== 0) {
    console.log('has originaObj.name');
    __bazi = true;
    $('.bazi_get').html(originalObj.name);
    console.log(originalObj.time);
    if (originalObj.time || originalObj.time.length !== 0) {
      getBazicesuan(originalObj.name, originalObj.sex, originalObj.date, originalObj.time.substring(0, 2));
    } else {
      getBazicesuan(originalObj.name, originalObj.sex, originalObj.date);
    }
  } else {
    // 检查localstorage
    console.log('check the view_count :' + localStorage.getItem('bazi_view_count'));
    if (localStorage.hasOwnProperty('bazi_view_count')) {
      console.log('hasLS');
      if (localStorage.getItem('bazi_view_count') === -1) {
        //console.log('被客户端强制定为' + localStorage.getItem('bazi_view_count') + '讲道理不会走到这里来');
        __bazi = true;
      } else if (localStorage.getItem('bazi_view_count') >= 1 && localStorage.getItem(
          'bazi_view_count') <= 3) {
        console.log('显示默认数据!');
        localStorage.setItem('bazi_view_count', parseInt(localStorage.getItem(
          'bazi_view_count')) + 1);
        $('.bazicesuan').show();
        _czc.push(﻿['_trackPageview', '八字运势展示-jryl.bzys.im', '今日一览pageview']);
        __bazi = true;
      } else {
        localStorage.setItem('bazi_view_count', 0);
        console.log('hide' + localStorage.getItem('bazi_view_count'));
        $('.bazicesuan').hide();
        __bazi = true;
      }
    } else {
      console.log('init');
      localStorage.setItem('bazi_view_count', 1);
      _czc.push(﻿['_trackPageview', '八字运势展示-jryl.bzys.im', '今日一览pageview']);
      $('.bazicesuan').show();
      __bazi = true;
    }
    setTimeout(function () {
      console.log('Ad loading...');
      if (IsIOS && parseInt(Wannianli.appVersion.split('.').join('')) >= 426) {
        location.href = 'protocol://requestInjectedAd#1103821819#6080606226818307#6#ad2callback';
      } else if (IsAndroid && parseInt(Wannianli.versionCode) >= 73) {
        location.href = 'protocol://requestInjectedAd#1105#1105103#4#ad2callback';
      } else if (IsAndroid && parseInt(Wannianli.versionCode) >= 70) {
        location.href = 'protocol://requestInjectedAd#1101052841#5030020286553836#6#ad2callback';
      }
    }, 0);
  }
}
/*
 * 根据运势得分设定宽度;
 */
function highlight(value) {
  return (0.85 * parseInt(value)) / 100.0;
}
