var _hmt = _hmt || [];
var ua = window.navigator.userAgent;
var appVersion = /[a-zA-Z]/.test(ua.split(' ').pop()) ? '1.0.0' : ua.split(' ').pop();
var sysVersion = GetIOSVersion() || getAndroidVersion();

function GetIOSVersion() {
  if (window.MSStream) {
    return false;
  }
  var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
    version;
  if (match !== undefined && match !== null) {
    version = [
      parseInt(match[1], 10),
      parseInt(match[2] || 0, 10),
      parseInt(match[3] || 0, 10)
    ];
    return version.join('.');
  }
  return false;
}

function getAndroidVersion() {
  ua = ua.toLowerCase();
  var match = ua.match(/android\s([0-9\.]*)/);
  return match ? parseFloat(match[1]) : false;
}

var browser = {
  isAndroid: function () {
    return navigator.userAgent.match(/Android/i) ? true : false;
  },
  isIOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
  },
  isWx: function () {
    return navigator.userAgent.match(/micromessenger/i) ? true : false;
  },
  isWp: function () {
    return ua.toLowerCase().indexOf('windows phone') > -1;
  },
  isWnl: function () {
    return ua.toLowerCase().indexOf('wnl') > -1;
  },
  getIOSVersion: function () {
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
};
var sourceType = 'wnl';
if (browser.isIOS()) {
  sourceType = 'wnl_ios';
  if (boundId) {
    var boundstring = '';
    switch (boundId) {
      case 'com.ireadercity.yhgrlc':
        boundstring = '_5';
        break;
      case 'com.51wnl.wnl-shadow2':
        boundstring = '_2';
        break;
      case 'com.51wnl.wnl-shadow1':
        boundstring = '_1';
        break;
      case 'com.ireadercity.zhwll':
        boundstring = '';
        break;
    }
    sourceType += (boundstring);
  }
} else if (browser.isAndroid()) {
  sourceType = 'wnl_android';
} else {
  sourceType = 'other';
}

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
  var iphoneXbanner = '<div class="iphoneXBanner" style="height:34px;width: 100%;position:fixed;bottom: 0;z-index: 9999;background: rgba(255, 255, 255, 0);"></div>'
  $('body').append(iphoneXbanner);
  paddingBottomFits(container);
  bottomArrFits(fitsArr);
}

function paddingBottomFits(container) {
  var i;
  for (i = 0; i < container.length; i++) {
    var paddingSet = parseInt($(container[i]).css('padding-bottom')) + 34;
    $(container[i]).css({
      'padding-bottom': paddingSet
    });
  }
}

function bottomArrFits(fitsArr) {
  var i;
  for (i = 0; i < fitsArr.length; i++) {
    var bottomSet = parseInt($(fitsArr[i]).css('bottom')) + 34;
    $(fitsArr[i]).css({
      'bottom': bottomSet
    });
  }
}
if (isIphoneX()) {
  // 需上移的包裹容器
  var container = ['body', '.confirm_btn_fixed_link'];
  // 需上移的Fixed按钮
  var fitsArr = [];
  // iphoneXFits(container, fitsArr);
  $('.copyRight').css('padding-bottom', '60px');
  $('.wnl_history_btn').css('bottom', 44);
  $('.confirm_btn_fixed').addClass('confirm_btn_fixed_hidden_iphoneX');
  $('.confirm_btn_fixed').removeClass('confirm_btn_fixed_hidden');
  $('.confirm_btn_fixed_link').css({
    'padding-bottom': '34px'
  });
}

$(function () {
  var maleBornDate = "",
    femaleBornDate = "";
  var is_android = navigator.userAgent.toLocaleLowerCase().indexOf("android") > -1;

  /* 获取底部热门测算 */
  getHotCesuan();

  function getHotCesuan() {
    $.ajax({
      url: "//coco70.51wnl.com/numberologynew/BaseCeSuan/GetRelevantGoodsList?size=8&type=10",
      /* url: "//118.190.93.204:8032/numberologynew/BaseCeSuan/GetRelevantGoodsList?size=8&type=10", */
      type: "post",
      dataType: "json",
      contentType: "application/json;charset=utf-8",
      success: function (res) {
        if (res.data.length > 0) {
          // console.log("has data");
          var cesaunItemTemplate =
            '<a class="hot-cesuan-item" href="<%- itemUrl %>">\
						<div class="hot-cesuan-item-header">\
							<img src="<%- itemImg %>">\
						</div>\
						<div class="hot-cesuan-item-footer"><%- itemTitle %></div>\
					</a>';

          $.each(res.data, function () {
            var mkpItem = _.template(cesaunItemTemplate)({
              itemUrl: this.url + '&posId=' + posId,
              itemImg: this.img,
              itemTitle: this.title
            });
            $("#hotCesuanArea").append(mkpItem);
          });
          $(".hot-cesuan-area").removeClass("hidden");
          /* $(".hot-cesuan-item").on("click", function (e) {
            var url = e.currentTarget.dataset.url;
            console.log("url" + url);
            if (url.toLocaleLowerCase().indexOf("posid=") > -1) {
              // 如果配 posId
              // console.log("有 posId");
              // location.href = url.replace("&posId=[posId]", "") + "&posId=" + posId;
              location.href = url;
            } else {
              // 没有 posId;
              // console.log("没有 posId");
              location.href = url + "&posId=" + posId;
            }
          }); */
        } else {
          // console.log("has no data");
        }
      },
      error: function (res) {
        console.log("res=" + res);
      }
    });
  }


  $('.viewNumber').html(Math.floor(Date.parse(new Date()) / 1000 / 2) - 753000000);
  // if(navigator.userAgent.toLocaleLowerCase().indexOf("android")===-1){
  //     FastClick.attach(document.getElementById("btnMeasure"));
  // }
  // $(document).on("touchstart", function (e) {}, true);
  if (getQueryString("share")) {
    $(".wnlBannerLink").removeClass("hidden");
    $(".yiqiDesc").addClass("hidden");
    if ($(window).height() < 560 && $(".wnlBannerLink").css("position") === "absolute") {
      $(".wnlBannerLink").css("position", "static");
    }
  } else {
    if ($(window).height() < 560 && $(".yiqiDesc").css("position") === "absolute") {
      $(".yiqiDesc").css("position", "static");
    }
  }
  $(window).on("resize", function () {
    if ($(window).height() > 560) {
      $(".yiqiDesc").css("position", "absolute");
    } else if ($(window).height() < 560 && $(".yiqiDesc").css("position") === "absolute") {
      $(".yiqiDesc").css("position", "static");
    }
    if ($(window).height() > 560) {
      $(".wnlBannerLink").css("position", "absolute");
    } else if ($(window).height() < 560 && $(".wnlBannerLink").css("position") === "absolute") {
      $(".wnlBannerLink").css("position", "static");
    }
  });
  $(".leftDescContent").width($(".descWrapper").width() / 2 + 5);
  $(".wnlBannerLink").click(function () {
    var ua = navigator.userAgent.toLocaleLowerCase();
    var wx = ua.indexOf("micromessenger") > -1;
    var isIOSPhone = ua.indexOf("iphone") > -1 || ua.indexOf("ipod") > -1;
    var isIOS = isIOSPhone || ua.indexOf("ipad") > -1;
    var isAndroid = ua.indexOf("android") > -1;
    if (wx) {
      _hmt.push(['_trackEvent', 'jryc_download_wx_click', 'click', 'jryc_download_wx_click', 'jryc_download_wx_click']);
      location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
    } else {
      if (isIOS) {
        _hmt.push(['_trackEvent', 'jryc_download_ios_click', 'click', 'jryc_download_ios_click', 'jryc_download_ios_click']);
        location.href = "http://um0.cn/89wDL";
      } else if (isAndroid) {
        _hmt.push(['_trackEvent', 'jryc_download_android_click', 'click', 'jryc_download_android_click', 'jryc_download_android_click']);
        location.href = "http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]";
      } else {
        location.href = "http://www.51wnl.com";
      }
    }
  });
  if (browser.isWnl()) {
    setTimeout(function () {
      location.href = "protocol://getuserinfo#userinfocallback";
    }, 0);
  }
  $('#maleBornInput').mobiscroll().datePicker({
    theme: "ios",
    mode: "scroller",
    display: "bottom",
    lang: "zh",
    isSolar: 1,
    enableSolarLunar: 1,
    showSolarLunar: 0,
    enableIgnore: 0,
    onSelect: function (val) {
      console.log(val);
      var bornDate = val.substr(3);
      var year = (bornDate.substring(0, 4)),
        month = (bornDate.substring(5, 7)),
        day = (bornDate.substring(8, 10));
      if (str2Int(year) < 1936) {
        drawToast('该出生年份无数据，请重新选择');
        year = "1936";
        $('#maleBornInput').val('公历 ' + year + '年' + month + '月' + day + '日');
        $('#maleBornInput').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
      } else if (str2Int(year) >= (new Date()).getFullYear()) {
        drawToast('该出生年份无数据，请重新选择');
        year = "1991";
        $('#maleBornInput').val('公历 ' + year + '年' + month + '月' + day + '日');
        $('#maleBornInput').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
      }
    }
  });
  $('#maleBornInput').mobiscroll("setArrayVal", [1990, 1, 1], !1, !1, !1, 0);
  $('#femaleBornInput').mobiscroll().datePicker({
    theme: "ios",
    mode: "scroller",
    display: "bottom",
    lang: "zh",
    isSolar: 1,
    enableSolarLunar: 1,
    showSolarLunar: 0,
    enableIgnore: 0,
    onSelect: function (val) {
      console.log(val);
      var bornDate = val.substr(3);
      var year = (bornDate.substring(0, 4)),
        month = (bornDate.substring(5, 7)),
        day = (bornDate.substring(8, 10));
      if (str2Int(year) < 1936) {
        drawToast('该出生年份无数据，请重新选择');
        year = "1936";
        $('#femaleBornInput').val('公历 ' + year + '年' + month + '月' + day + '日');
        $('#femaleBornInput').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
      } else if (str2Int(year) >= (new Date()).getFullYear()) {
        drawToast('该出生年份无数据，请重新选择');
        year = "1991";
        $('#femaleBornInput').val('公历 ' + year + '年' + month + '月' + day + '日');
        $('#femaleBornInput').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
      }
    }
  });
  $('#femaleBornInput').mobiscroll("setArrayVal", [1990, 1, 1], !1, !1, !1, 0);

  $("#maleNameTxt, #maleBirthHour").on("click", function () {
    $(".mask").removeClass("hidden");
  });
  $("#maleNameTxt, #maleBirthHour").on("blur", function () {
    $(".mask").trigger("click");
  });
  $("#femaleNameTxt, #femaleBirthHour").on("click", function () {
    $(".mask").removeClass("hidden");
  });
  $("#femaleNameTxt, #femaleBirthHour").on("blur", function () {
    $(".mask").trigger("click");
  });
  $(".mask").click(function () {
    if (!$(".mask").hasClass("hidden")) {
      $(".mask").addClass("hidden");
    } else {
      return;
    }
  });
  $("#maleBirthHour").change(function () {
    $(".mask").trigger("click");
    if ($(this).val() === "-1" || $(this).val() === "null" || $(this).val().length === 0) {
      return false;
    }
    maleBornTime = $(this).val();
    $("#maleBirthHourUI").html($("#maleBirthHour option:selected").html());
  });
  $("#femaleBirthHour").change(function () {
    $(".mask").trigger("click");
    if ($(this).val() === "-1" || $(this).val() === "null" || $(this).val().length === 0) {
      return false;
    }
    femaleBornTime = $(this).val();
    $("#femaleBirthHourUI").html($("#femaleBirthHour option:selected").html());
  });

  $("#maleNameTxt").val("");
  $("#maleBornInput").val("");
  $("#maleBirthHour").val("24");
  $("#maleBirthHour").trigger("change");
  $("#femaleNameTxt").val("");
  $("#femaleBornInput").val("");
  $("#femaleBirthHour").val("24");
  $("#femaleBirthHour").trigger("change");
  var isWorking = false;
  $(".confirmBtn").on('click', function () {
    if (isWorking) {
      return false;
    }

    // if (userId === "" && deviceId === "" && mac === "" && imei === "") {
    // 	isWorking = false;
    // 	$("#tipModal").modal({
    // 		showString: "未获取到相关信息"
    // 	});
    // 	return false;
    // }
    _hmt.push(['_trackEvent', 'bahh_confirm', 'click', 'confirm']);
    isWorking = true;
    var maleName = $("#maleNameTxt").val().trim();
    maleBornDate = $("#maleBornInput").val().substr(3).trim().replace("年", "-").replace("月", "-").replace("日", "");
    var femaleName = $("#femaleNameTxt").val().trim();
    femaleBornDate = $("#femaleBornInput").val().substr(3).trim().replace("年", "-").replace("月", "-").replace("日", "");
    if (localStorage.getItem('trigger_flag') === 'yes') {
      maleName = localStorage.getItem('trigger_maleName');
      maleBornDate = localStorage.getItem('trigger_maleBornDate');
      maleBornTime = localStorage.getItem('trigger_maleBornTime');
      femaleName = localStorage.getItem('trigger_femaleName');
      femaleBornDate = localStorage.getItem('trigger_femaleBornDate');
      femaleBornTime = localStorage.getItem('trigger_femaleBornTime');
      localStorage.setItem('trigger_flag', 'no');
    }
    if (maleName.length === 0) {
      isWorking = false;
      drawToast('请输入男方姓名');
      return false;
    }
    if (maleName.length > 8 || femaleName.length > 8) {
      isWorking = false;
      drawToast('请输入真实姓名');
      return false;
    }
    var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    if (reg.test(maleName) || reg.test(femaleName)) {
      isWorking = false;
      drawToast('请输入真实姓名');
      return false;
    }

    if (maleBornDate.length === 0) {
      isWorking = false;
      drawToast('请选择男方出生日期');
      return false;
    }
    if (maleBornTime === "-1") {
      isWorking = false;
      drawToast('请选择男方出生时间');
      return false;
    }

    if (femaleName.length === 0) {
      isWorking = false;
      drawToast('请输入女方姓名');
      return false;
    }

    if (femaleBornDate.length === 0) {
      isWorking = false;
      drawToast('请选择女方出生日期');
      return false;
    }
    if (femaleBornTime === "-1") {
      isWorking = false;
      drawToast('请选择女方出生时间');
      return false;
    }

    $('.circleMask').removeClass('hidden');

    if (browser.isWx()) {
      if (!openid) {
        localStorage.setItem('trigger_flag', 'yes');
        localStorage.setItem('trigger_maleName', maleName);
        localStorage.setItem('trigger_maleBornDate', maleBornDate);
        localStorage.setItem('trigger_maleBornTime', maleBornTime);
        localStorage.setItem('trigger_femaleName', femaleName);
        localStorage.setItem('trigger_femaleBornDate', femaleBornDate);
        localStorage.setItem('trigger_femaleBornTime', femaleBornTime);
        location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
      }
    }

    var prm = {
      MaleName: maleName,
      MaleBirthDay: maleBornDate + ' ' + maleBornTime + ':00:00',
      MaleWeiZhi: 0,
      FeMaleName: femaleName,
      FeMaleBirthDay: femaleBornDate + ' ' + femaleBornTime + ':00:00',
      FemaleWeiZhi: 0,
      OrderType: 1,
      UserId: userId,
      DeviceId: deviceId,
      posId: posId,
      boundId: boundId,
      Token: pToken,
      pToken: pushToken,
      clientType: sourceType,
      GoodsID: '65F3A94EAF3B4C999ACAD54F4276D566',
      Mac: "",
      Imei: imei,
      idfa: idfa,
      sysVersion: sysVersion,
      appVersion: appVersion
    };
    var clientObj = {
      "bzhh": {
        "maleName": maleName,
        "maleDate": maleBornDate,
        "maleTime": maleBornTime + ':00',
        "femaleName": femaleName,
        "femaleDate": femaleBornDate,
        "femaleTime": femaleBornTime + ':00'
      }
    };
    if (maleBornTime === "24") {
      prm.MaleBirthDay = maleBornDate + ' ' + '01:59:59';
    }
    if (femaleBornTime === "24") {
      prm.FeMaleBirthDay = femaleBornDate + ' ' + '01:59:59';
    }
    $.ajax({
      cache: false,
      type: "GET",
      dataType: "json",
      url: "//coco70.51wnl.com/NumberologyNew/NRLorder/CreatehhOrder?" + $.param(prm),
      success: function (data) {
        isWorking = false;
        if (data.status == 0) {
          if (browser.isWnl()) {
            location.href = "protocol://saveuserinfo#" + Base64.encode(JSON.stringify(clientObj));
          }
          // 下单成功后跳转更新
          window.location.href = "bzhhfree.html?orderid=" + data.data + '&posId=' + posId + '&couponId=' + couponId + '&imei=' + imei + '&channel=' + channel;
          setTimeout(function () {
            $('.circleMask').addClass('hidden');
          }, 400);
          // $(".redirectLink").attr("href", "bzhhfree.html?orderid=" + data.data + '&posId=' + posId + '&couponId=' + couponId + '&imei=' + imei + '&channel=' + channel);
          // setTimeout(function () {
          // 	if (is_android) {
          // 		window.location.href = "bzhhfree.html?orderid=" + data.data + '&posId=' + posId + '&couponId=' + couponId + '&imei=' + imei + '&channel=' + channel;
          // 	} else {
          // 		$(".clickContent").trigger("click");
          // 	}
          // }, 0);
        }
      },
      error: function (xhr, ajaxOperation, throwErr) {
        isWorking = false;
        $('.circleMask').addClass('hidden');
        return false;
      }
    });
  });
  $("#btnRecords").click(function () {
    _hmt.push(['_trackEvent', 'bahh_history', 'click', 'history']);
    $(".redirectLink").attr("href", "bzhhh.html?userId=" + userId + "&deviceId=" + deviceId + "&mac=" + mac + "&imei=" + imei);
    setTimeout(function () {
      if (is_android) {
        window.location.href = "bzhhh.html?userId=" + userId + "&deviceId=" + deviceId + "&mac=" + mac + "&imei=" + imei + '&channel=' + channel + '&posId=' + posId;
      } else {
        $(".clickContent").trigger("click");
      }
    });
  });
  $(window).scroll(function () {
    if ($('.visible_confirm_btn').offset().top - $(document).scrollTop() <= -50) {
      if (isIphoneX()) {
        if ($('.confirm_btn_fixed').hasClass('confirm_btn_fixed_hidden_iphoneX')) {
          $('.confirm_btn_fixed').removeClass('confirm_btn_fixed_hidden_iphoneX');
          $('.wnl_history_btn').addClass('wnl_history_btn_up_iphoneX');
          $('.confirm_btn_fixed').css({
            'padding-bottom': '34px'
          });
          $('.confirm_btn_fixed').css({
            'height': '94px'
          })
        }
      } else {
        if ($('.confirm_btn_fixed').hasClass('confirm_btn_fixed_hidden')) {
          $('.confirm_btn_fixed').removeClass('confirm_btn_fixed_hidden');
          $('.wnl_history_btn').addClass('wnl_history_btn_up');
        }
      }
    } else {
      if (isIphoneX()) {
        if (!$('.confirm_btn_fixed').hasClass('confirm_btn_fixed_hidden_iphoneX')) {
          $('.confirm_btn_fixed').addClass('confirm_btn_fixed_hidden_iphoneX');
          $('.wnl_history_btn').removeClass('wnl_history_btn_up_iphoneX');
        }
      } else {
        if (!$('.confirm_btn_fixed').hasClass('confirm_btn_fixed_hidden')) {
          $('.confirm_btn_fixed').addClass('confirm_btn_fixed_hidden');
          $('.wnl_history_btn').removeClass('wnl_history_btn_up');
        }
      }
    }
  });

  $('.confirm_btn_fixed_link').click(function () {
    // var top_banner_height = $('.top_banner').height();
    // var name = $('#txtName').val().trim();
    // bornDate = $('#spBirthDate').val().substr(3).trim().replace('年', '-').replace('月', '-').replace('日', '');
    // if (name.length === 0) {
    // 	$('body').animate({
    // 		scrollTop: top_banner_height
    // 	}, 600);
    // 	setTimeout(function(){
    // 		drawToast('请填写您的姓名');
    // 	}, 600);
    // 	return false;
    // }
    // if (bornDate.length === 0) {
    // 	$('body').animate({
    // 		scrollTop: top_banner_height
    // 	}, 600);
    // 	setTimeout(function(){
    // 		drawToast('请选择您的出生日期');
    // 	}, 600);
    // 	return false;
    // }
    // if (bornTime === '-1') {
    // 	$('body').animate({
    // 		scrollTop: top_banner_height
    // 	}, 600);
    // 	setTimeout(function(){
    // 		drawToast('请选择您的出生时间');
    // 	}, 600);
    // 	return false;
    // }
    $('.confirmBtn').trigger('click');
  })

});
var textObj1, textObj;

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}

wnlui.wxShare({
  title: '八字合婚',
  text: '我在万年历看【八字合婚】，分享给你，一起看吧！',
  imgUrl: location.origin + '/numberology/Tools/images/bzhhShare.jpg',
  imageUrl: location.origin + '/numberology/Tools/images/bzhhShare.jpg',
  url: location.href + "&share=1"
});

function appCallback_share() {
  _hmt.push(['_trackEvent', 'bzhh_share_click', 'click', 'bzhh_share_click', 'bzhh_share_click']);
  var title = "我在万年历做的八字合婚测算，好准！你也来看看？";
  var link = location.href + "&share=1";
  var imageURL = location.origin + '/numberology/Tools/images/bzhhShare.jpg';
  textObj = {
    text: title,
    image: '0',
    imageURL: imageURL,
    url: link,
    pureText: title,
    prefix: ""
  };
  textObj1 = {
    text: title,
    image: '0',
    imageURL: imageURL,
    targetUrl: link,
    perfix: ""
  };
  try {
    if (window.ylwindow) {
      ylwindow.reportHasShare(true);
      location.href = "protocol://share:" + encodeURI(JSON.stringify(textObj1));
    } else {
      location.href = "protocol://share#" + encodeURI(JSON.stringify(textObj));
    }
  } catch (e) {
    alert(e)
  }
  return 1;
}
var originalAllObj;
var maleBornTime = "-1",
  femaleBornTime = "-1";

function userinfocallback(result) {
  var originalString = Base64.decode(result);
  originalAllObj = JSON.parse(originalString);
  var originalObj;
  if (originalAllObj.bzhh) {
    originalObj = originalAllObj.bzhh;
    if (originalObj.maleName && originalObj.maleName.length !== 0) {
      $("#maleNameTxt").val(originalObj.maleName);
    }
    if (originalObj.maleDate && originalObj.maleDate.length !== 0) {
      var year = (originalObj.maleDate.substring(0, 4)),
        month = (originalObj.maleDate.substring(5, 7)),
        day = (originalObj.maleDate.substring(8, 10));
      $("#maleBornInput").val("公历 " + year + "年" + month + "月" + day + "日");
      $('#maleBornInput').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
    }
    if (originalObj.maleTime && originalObj.maleTime.length !== 0) {
      var hour = originalObj.maleTime.substr(0, 2);
      $("#maleBirthHour").val(hour);
      $("#maleBirthHour").trigger("change");
    }
    if (originalObj.femaleName && originalObj.femaleName.length !== 0) {
      $("#femaleNameTxt").val(originalObj.femaleName);
    }
    if (originalObj.femaleDate && originalObj.femaleDate.length !== 0) {
      var year = (originalObj.femaleDate.substring(0, 4)),
        month = (originalObj.femaleDate.substring(5, 7)),
        day = (originalObj.femaleDate.substring(8, 10));
      $("#femaleBornInput").val("公历 " + year + "年" + month + "月" + day + "日");
      $('#femaleBornInput').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
    }
    if (originalObj.femaleTime && originalObj.femaleTime.length !== 0) {
      var hour = originalObj.femaleTime.substr(0, 2);
      $("#femaleBirthHour").val(hour);
      $("#femaleBirthHour").trigger("change");
    }
  } else if (originalAllObj.native_jryc || originalAllObj.native_usercenter) {
    originalObj = originalAllObj.native_jryc || originalAllObj.native_usercenter;
    if (originalObj.sex !== undefined && parseInt(originalObj.sex) !== -1) {
      var sex1 = parseInt(originalObj.sex);
      if (sex1 === 1) {
        if (originalObj.name && originalObj.name.length !== 0) {
          $("#maleNameTxt").val(originalObj.name);
        }
        if (originalObj.date && originalObj.date.length !== 0) {
          var year = (originalObj.date.substring(0, 4)),
            month = (originalObj.date.substring(5, 7)),
            day = (originalObj.date.substring(8, 10));
          $("#maleBornInput").val("公历 " + year + "年" + month + "月" + day + "日");
          $('#maleBornInput').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
        }
        if (originalObj.time && originalObj.time.length !== 0) {
          var hour = originalObj.time.substr(0, 2);
          $("#maleBirthHour").val(hour);
          $("#maleBirthHour").trigger("change");
        }
      } else {
        if (originalObj.name && originalObj.name.length !== 0) {
          $("#femaleNameTxt").val(originalObj.name);
        }
        if (originalObj.date && originalObj.date.length !== 0) {
          var year = (originalObj.date.substring(0, 4)),
            month = (originalObj.date.substring(5, 7)),
            day = (originalObj.date.substring(8, 10));
          $("#femaleBornInput").val("公历 " + year + "年" + month + "月" + day + "日");
          $('#femaleBornInput').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
        }
        if (originalObj.time && originalObj.time.length !== 0) {
          var hour = originalObj.time.substr(0, 2);
          $("#femaleBirthHour").val(hour);
          $("#femaleBirthHour").trigger("change");
        }
      }
    }
  }
  if (originalAllObj.native_score) {
    var native_score = originalAllObj.native_score;
    if (native_score.userId && native_score.userId.length !== 0 && userId.length === 0) {
      userId = native_score.userId;
    }
    if (native_score.deviceId && native_score.deviceId.length !== 0 && deviceId.length === 0) {
      deviceId = native_score.deviceId;
    }
  }
}

function str2Int(str) {
  str = str.replace(/^0+/g, '');
  if (str.length == 0) {
    return 0;
  }
  return parseInt(str);
}

function ylappCallback_back() {
  document.location.href = "protocol://exit#";
}

function drawToast(message) {
  var alert = document.getElementById('toast');
  if (alert.className.match(new RegExp('(\\s|^)' + 'show' + '(\\s|$)'))) {
    return false;
  }
  alert.className = alert.className.replace('lines', '');
  alert.style.opacity = .8;
  alert.innerHTML = message;
  var temp_alert = document.getElementById('toast1');
  temp_alert.innerHTML = message;
  alert.className += 'show';
  alert.style.marginLeft = '-' + temp_alert.offsetWidth / 2 + 'px';
  var intervalCounter = setTimeout(function () {
    alert.style.opacity = 0;
    clearInterval(intervalCounter);
  }, 1500);
  setTimeout(function () {
    alert.className = alert.className.replace('show', '');
    alert.innerHTML = '';
  }, 2000);
}

function getQueryValue(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}
