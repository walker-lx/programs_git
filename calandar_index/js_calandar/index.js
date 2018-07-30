$.ajaxSetup({
  cache: false
});
$(function() {
  var year = new Date().getFullYear();
  $('.copyright-time').html('2008-' + year);
  if ($('.goverment').length > 0) {
    var url = location.href;
    var goverment_link = '',
      goverment_txt = '',
      goverment_icp = '';
    if (url.indexOf('51wnl.com') > -1) {
      goverment_txt = '渝公网安备 50019002500524号';
      goverment_link =
        'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' +
        goverment_txt.substr(6, goverment_txt.length - 2 - 5);
      goverment_icp = ' ICP: 渝ICP备11000038号-1';
    } else if (url.indexOf('cq-rili.com') > -1) {
      goverment_icp = ' ICP: 渝ICP备14005861号-3';
    } else if (url.indexOf('cqyouloft.com') > -1) {
      goverment_icp = ' ICP: 渝ICP备14005861号-2';
    } else if (url.indexOf('cq-wnl.com') > -1) {
      goverment_txt = '渝公网安备 50019002500794号';
      goverment_link =
        'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' +
        goverment_txt.substr(6, goverment_txt.length - 2 - 5);
      goverment_icp = ' ICP: 渝ICP备14005861号-4';
    } else if (url.indexOf('51wnl-cq.com') > -1) {
      goverment_txt = '渝公网安备 50019002500818号';
      goverment_link =
        'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' +
        goverment_txt.substr(6, goverment_txt.length - 2 - 5);
      goverment_icp = ' ICP: 渝ICP备17001599号-1';
    }
    $('.goverment_icp').html(goverment_icp);
    if (goverment_link !== '') {
      $('.goverment_link').html(goverment_txt);
      $('.goverment_link').attr('href', goverment_link);
    } else {
      $('.goverment_link').addClass('hidden');
    }
  }
  if (location.host.indexOf('youloft.cn') > -1) {
    $('.navLink.wnlgyp').removeClass('hidden');
  }

  // 获取参数值
  function getQueryValue(key) {
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg) || window.location.hash.substr(1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return null;
  }
  // 错误信息提示
  function drawToast(message) {
    var alert = document.getElementById('toast');
    if (alert.className.match(new RegExp('(\\s|^)' + 'show' + '(\\s|$)'))) {
      return false;
    }
    alert.className = alert.className.replace('lines', '');
    alert.style.opacity = 0.8;
    alert.innerHTML = message;
    var temp_alert = document.getElementById('toast1');
    temp_alert.innerHTML = message;
    alert.className += 'show';
    alert.style.marginLeft = '-' + temp_alert.offsetWidth / 2 + 'px';
    intervalCounter = setTimeout(function() {
      alert.style.opacity = 0;
      clearInterval(intervalCounter);
    }, 1500);
    setTimeout(function() {
      alert.className = alert.className.replace('show', '');
      alert.innerHTML = '';
    }, 2000);
  }
  // 判断是否能下载
  var istoast = false;
  if (getQueryValue('download') == 'toast') {
    istoast = true;
  }
  var windowWidth = $(window).width();
  var ua = navigator.userAgent.toLowerCase();
  var is_mobile = windowWidth < 1024;
  var is_ipad = ua.indexOf('ipad') > -1;
  var is_wx = ua.indexOf('micromessenger') > -1;
  var is_ios = ua.indexOf('iphone') > -1 || ua.indexOf('ipod') > -1 || ua.indexOf('ipad') > -1;
  var is_android = ua.indexOf('android') > -1;
  var is_wp = ua.indexOf('windows phone') > -1;
  if (is_mobile) {
    if (istoast) {
      $('.webLink').attr('href', 'https://mobile.51wnl.com/web/#/index/download=toast');
    } else {
      $('.webLink').attr('href', 'https://mobile.51wnl.com/web/');
    }
  }
  $('.iosLink').click(function() {
    if (is_wx) {
      location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653';
    } else {
      if (is_ios) {
        // location.href = "http://itunes.apple.com/cn/app/id419805549?mt=8";
        if (istoast) {
          drawToast('应用市场搜索“万年历”下载');
        } else {
          location.href = 'http://itunes.apple.com/cn/app/id419805549?mt=8';
        }
      } else if (is_android) {
        // location.href = "https://qiniu.apk.cq-wnl.com/10039.apk ";
        if (istoast) {
          drawToast('应用市场搜索“万年历”下载');
        } else {
          location.href = 'https://qiniu.apk.cq-wnl.com/20522.apk';
        }
      } else if (is_wp) {
        location.href =
          'http://www.windowsphone.com/en-us/store/app/%E4%B8%87%E5%B9%B4%E5%8E%86/8ffa51ca-df17-e011-9264-00237de2db9e';
      } else {
        $('.downlaodQRCode').removeClass('hidden');
        $('.downloadMask').removeClass('hidden');
      }
    }
  });
  $('.androidLink').click(function() {
    if (is_wx) {
      location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653';
    } else {
      if (is_ios) {
        if (istoast) {
          drawToast('应用市场搜索“万年历”下载');
        } else {
          location.href = 'http://itunes.apple.com/cn/app/id419805549?mt=8';
        }
      } else if (is_android) {
        if (istoast) {
          drawToast('应用市场搜索“万年历”下载');
        } else {
          location.href = 'https://qiniu.apk.cq-wnl.com/20522.apk';
        }
      } else if (is_wp) {
        location.href =
          'http://www.windowsphone.com/en-us/store/app/%E4%B8%87%E5%B9%B4%E5%8E%86/8ffa51ca-df17-e011-9264-00237de2db9e';
      } else {
        $('.downlaodQRCode').removeClass('hidden');
        $('.downloadMask').removeClass('hidden');
      }
    }
  });
  $('.downloadMask').click(function() {
    $(this).addClass('hidden');
    $('.qrcodeModal').addClass('hidden');
  });
  if (is_ios || is_android || is_wp) {
    $('.wxLink').attr('href', 'http://www.51wnl.com/activity/wx.html');
  }
  $('.wxLink').click(function(e) {
    if (is_ios || is_android || is_wp) {
      return true;
    } else {
      e.preventDefault();
      e.stopPropagation();
    }
    $('.wxQRCode').removeClass('hidden');
    $('.downloadMask').removeClass('hidden');
  });
  $('.qqLink').click(function() {
    if (is_ios || is_android || is_wp) {
      $('.qunContent').removeClass('hidden');
      $('.qunMask').removeClass('hidden');
      return false;
    }
  });
  $('.qunMask').click(function() {
    $(this).addClass('hidden');
    $('.qunContent').addClass('hidden');
  });
  $('.navMenu').click(function() {
    $('html').toggleClass('noscroll');
    if ($('.navList').css('display') === 'none') {
      $('.navList').css('display', 'block');
      $('.firstLine').addClass('rotate');
      $('.secondLine').addClass('rotate');
      $('.lastLine').addClass('hidden');
    } else {
      $('.navList').css('display', 'none');
      $('.firstLine').removeClass('rotate');
      $('.secondLine').removeClass('rotate');
      $('.lastLine').removeClass('hidden');
    }
  });

  $('.navLink.cooperate .navLinkTxt').on('click', function(e) {
    if ($(window).innerWidth() < 1024) {
      e.preventDefault();
      e.stopPropagation();
    }

    return;
  });
  $('.navLink.dynamics .navLinkTxt').on('click', function(e) {
    if ($(window).innerWidth() < 1024) {
      e.preventDefault();
      e.stopPropagation();
    }

    return;
  });
});
