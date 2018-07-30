// Andriod 取消显示收藏按钮
if (window.ylwindow && ylwindow.enableCollect) {
  ylwindow.enableCollect(false);
}
// Andriod 取消显示分享按钮
if (window.ylwindow && ylwindow.enableShare) {
  ylwindow.enableShare(false);
}
window.appCallback_showShare = function() {
  return 0;
};

function onloadMigu() {
  /* 获取参数信息 */
  function getQueryString(name) {
    var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg) || window.location.hash.substr(1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return null;
  }
  /* toast */
  function toast(msg) {
    $('.toast').text(msg);
    $('.toastContent').removeClass('toasthidden');
    $('.toastContent').addClass('toastshow');
    setTimeout(function() {
      $('.toastContent').removeClass('toastshow');
      $('.toastContent').addClass('toasthidden');
    }, 2000);
  }

  function GetIOSVersion() {
    if (window.MSStream) {
      return false;
    }
    var match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
      version;
    if (match !== undefined && match !== null) {
      version = [parseInt(match[1], 10), parseInt(match[2] || 0, 10), parseInt(match[3] || 0, 10)];
      return version.join('.');
    }

    return false;
  }

  function getAndroidVersion() {
    var match = ua.match(/android\s([0-9\.]*)/);
    return match ? parseFloat(match[1]) : false;
  }
  var ua = navigator.userAgent.toLowerCase();
  //用户登录标志
  var flag = true;
  var uniqueId = '';
  var deviceId;
  var clientType = ua.indexOf('android') > -1 ? 'Youloft_Android' : 'Youloft_IOS';
  var channel = getQueryString('channel');
  var pToken = getQueryString('pToken');
  var token = getQueryString('pushToken');
  var Idfa = getQueryString('idfa');
  var DeviceMac = getQueryString('mac');
  var ImeiNumber = getQueryString('imei');
  var BoundId = getQueryString('boundid') || getQueryString('boundId');
  var AppVersion = /[a-zA-Z]/.test(ua.split(' ').pop()) ? '1.0.0' : ua.split(' ').pop();
  var SysVersion = GetIOSVersion() || getAndroidVersion();

  var loginData;
  var miguToken = getQueryString('token') || localStorage.getItem('miguToken'); // migu 用户登录凭证
  var miguMsisdn; // migu 用户手机号码
  var userInfoData;
  var BYBData; // 包月包数据
  var orderAsMberData;
  var cancelAsMberData;
  var queryMemberData;
  var miguChannelCode = '002106I';
  var miguServiceId = '698039034100000145';
  var definedseq = '';
  var miguCpId;
  var miguBizCode;
  var miguCpparam;
  var miguSalePrice;
  var miguQuery = 1; // 进行咪咕包月包查询，1：首次进入进行查询；2：点击开通权益进行查询
  var assMemberkey = '';

  // 咪咕迭代，如果 SDK 静默登录成功，则走客户端的 SDK，否则走网页的 SDK
  var isMiguActive = ylwindow.isMiguActive();
  // alert('isMiguActive' + isMiguActive);
  if (isMiguActive) {
    $('.tlgzy,.tlgqy').click(function(e) {
      e.stopPropagation();
    });

    $('.user-img img').attr('src', './img/user-normal-img.png');
    setTimeout(function() {
      location.href = 'protocol://getuserinfo#userinfocallback';
    }, 400);
    //判断用户是否已登录
    window.userinfocallback = function(result) {
      var originalString = WNLBase64.decode(result);
      var originalAllObj = JSON.parse(originalString);
      if (!originalAllObj.native_score) {
        return false;
      }
      var native_score = originalAllObj.native_score;
      if (!native_score.userId || native_score.userId.length == '') {
        //未登录
        flag = false;
        location.href = 'protocol://enterlogin#';
      } else {
        //已登录，唯一标识为用户ID
        flag = true;
        uniqueId = native_score.userId;
        deviceId = native_score.deviceId;
        // $.ajax({ // 获取查询密钥
        //   url: '//coco70.51wnl.com/numberologyNew/mg/AddMember?UserID=' + uniqueId,
        //   type: 'get',
        //   success: function(res) {
        //     console.log(res);
        //     var userstr = JSON.parse(ylwindow.queryAssMember(miguServiceId, '', ''));
        //     alert(userstr.resCode);
        //     alert(userstr.resMsg);
        //     alert(userstr.mobile);
        //     alert(userstr.name);
        //   }
        // });
        $.ajax({
          type: 'get',
          url: '//mmp.51wnl.com/api4.5.2/GetMemInfo.ashx?userId=' + uniqueId,
          async: false,
          dataType: 'jsonp',
          contentType: 'application/json;charset=utf-8',
          success: function(result) {
            // 模拟
            var data = result.data;
            // alert(data);
            $('.user-login-name span').text(WNLBase64.decode(data.nickName));
            if (!data.userIcon || data.userIcon === '') {
              $('.user-img img').attr('src', './img/user-normal-img.png');
            } else {
              $('.user-img img').attr('src', data.userIcon);
            }
            if (data.isFree) {
              $('.tlgzy').attr(
                'href',
                '//mobile.51wnl.com/numberology/vip/tlp/dist/index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&boundid=[BUNDLE]&posId=[posId]&vip=1'
              );
              $('.tlgqy').attr(
                'href',
                '//mobile.51wnl.com/numberology/vip/gqy/#/?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&boundid=[BUNDLE]&posId=[posId]&DONTURLENCODE=[DONTURLENCODE]&isVip=true'
              );
            } else {
              $('.tlgzy').attr(
                'href',
                '//mobile.51wnl.com/numberology/vip/tlp/dist/index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&boundid=[BUNDLE]&posId=[posId]'
              );
              $('.tlgqy').attr(
                'href',
                '//mobile.51wnl.com/numberology/vip/gqy/#/?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&boundid=[BUNDLE]&posId=[posId]&DONTURLENCODE=[DONTURLENCODE]'
              );
            }
            /* data.isMember = false; */
            if (data.isMember) {
              var str = '会员期至' + data.expireDate.substr(0, 4) + '年' + data.expireDate.substr(5, 2) + '月' + data.expireDate.substr(8, 2) + '日';
              $('.user-login-date').text(str);
              $('.user-login-shape').css({
                background: 'url(./img/hyxt-hybz-yeah@3x.png)  no-repeat',
                'background-size': 'cover'
              });
            } else {
              $('.user-login-date').text('您目前还不是会员');
              $('.user-login-shape').css({
                background: 'url(./img/hyxt-hybz-none@3x.png)  no-repeat',
                'background-size': 'cover'
              });
            }
          },
          error: function() {
            console.log('error');
          }
        });
        $('.index-content').removeClass('hidden');
        $('.user-info .user-noLogin').hide();
        $('.user-info .user-login').show();
      }
    };
    // 如果静默登录成功
    // alert('静默登录成功1');
    // var miguUserInfoAndroid = JSON.parse(ylwindow.getMiguUserInfo());
    // var miguMemLevel = miguUserInfoAndroid.userInfoRsp.memLevel; // 会员等级，0：非会员，2：高级会员；3：特级会员
    // // alert(miguMemLevel);
    // // alert(miguUserInfoAndroid.userInfoRsp.username);
    // if (miguMemLevel === '0') {
    //   // 如果是非会员，显示立即开通
    //   $('.order-member').removeClass('hidden');
    //   alert('非会员');
    // } else {
    //   $('.view-quanyi').removeClass('hidden');
    // }
    var userstr = JSON.parse(ylwindow.queryAssMember(miguServiceId, '', '')); // 获取用户订购信息
    // alert(userstr);
    // alert(userstr.resCode);
    // alert(userstr.resMsg);
    // alert(userstr.mobile);
    // alert(userstr.name);
    if (userstr.resCode === '000000') {
      $('.tuiding').removeClass('hidden');
      $('.view-quanyi').removeClass('hidden');
    } else {
      $('.order-member').removeClass('hidden');
    }
    $('.tuiding').on('click', function() {
      $('.mask,.confirm-pop').removeClass('hidden');
    });
    $('.tuiding-btn').on('click', function() {
      // alert('click');
      if (isMiguActive) {
        ylwindow.cancelAssMember(miguServiceId, '20', 'cancelasMberCallback');
        window.cancelasMberCallback = function(res) {
          // alert(res);
          // alert(res.resultCode + 'resultCode');
          // alert(res.resCode + 'resCode');
          // alert(res.resMsg);
          if (parseInt(res.resultCode) === 0) {
            toast('退订成功');
            setTimeout(function() {
              // location.href = 'http://mobile.51wnl.com/temporary/member/index.html';
              location.reload();
            }, 1500);
          } else {
            toast('退订失败');
          }
        }
      } else {
        // 网页sdk退购
        cancelAsMberData = {
          channelCode: miguChannelCode,
          token: miguToken,
          serviceId: miguServiceId,
          youCallbackName: 'cancel_asMberCallback'
        };
        cancel_asMber(cancelAsMberData);
      }
    });
    $('.view-quanyi').on('click', function() {
      // alert('查看');
      $('.tel-num').text(miguMsisdn);
      $('.migu-content').removeClass('hidden');
      $('.index-content').addClass('hidden');
      miguMsisdn = localStorage.getItem('miguMsisdn');
      if (miguToken) {
        userInfoData = {
          youCallbackName: 'getUserInfoCallback_td',
          channelCode: miguChannelCode,
          token: miguToken
        };
        getUserInfo(userInfoData);
      } else {
        loginData = {
          youCallbackName: 'successLogin',
          channelCode: miguChannelCode,
          loginType: '1',
          callBackUrl: 'http://mobile.51wnl.com/temporary/member/index.html'
        };
        // loginType(loginData);
      }
    });
    $('.order-member').on('click', function() {
      var isAgree = $('#wnl-migu-agree').is(':checked');
      if (!isAgree) {
        toast('请同意万年历咪咕黄金包会员协议');
        return;
      }
      // alert('立即开通点击');
      // $('.migu-content').removeClass('hidden');
      // $('.index-content').addClass('hidden');
      // 客户端 SDK 进行会员订购
      // ylwindow.cancelAssMember(miguServiceId, '20', 'cancelasMberCallback');
      // window.cancelasMberCallback = function(res) {
      //   alert(res);
      //   alert(res.resCode);
      //   alert(res.resMsg);
      //   alert(res.resultCode);
      // }
      ylwindow.openAssociateMembe(miguServiceId, definedseq, 'associateMembeCallback');
      window.associateMembeCallback = function(res) {
        // alert('联合会员回调1');
        assMemberkey = res.assMemberkey;
        // alert(res.resCode + 'resCode');
        // alert(res.resultCode + 'resultCode');
        // alert(res.resMsg);
        var resultCode = parseInt(res.resultCode);
        if (resultCode === 1) {
          $('.view-quanyi').removeClass('hidden');
          $('.order-member').addClass('hidden');
          $('.tuiding').removeClass('hidden');
          toast('订购成功');
          setTimeout(function() {
            // location.href = 'http://mobile.51wnl.com/temporary/member/index.html';
            location.reload();
          }, 1500);
        } else {
          $('.view-quanyi').addClass('hidden');
          $('.order-member').removeClass('hidden');
          toast('订购失败');
        }
      };
    });
    $('.download-migu').on('click', function() {
      location.href = 'https://mobile.51wnl.com/temporary/member/migumusic.html';
    });
  } else {
    // 网页 SDK 进行会员订购
    openMiGuInit(miguChannelCode, 'initTest');
  }

  window.initTest = function(res) {
    $('.tlgzy,.tlgqy').click(function(e) {
      e.stopPropagation();
    });

    $('.user-img img').attr('src', './img/user-normal-img.png');
    setTimeout(function() {
      location.href = 'protocol://getuserinfo#userinfocallback';
    }, 400);
    //判断用户是否已登录
    window.userinfocallback = function(result) {
      var originalString = WNLBase64.decode(result);
      var originalAllObj = JSON.parse(originalString);
      if (!originalAllObj.native_score) {
        return false;
      }
      var native_score = originalAllObj.native_score;
      if (!native_score.userId || native_score.userId.length == '') {
        //未登录
        flag = false;
        location.href = 'protocol://enterlogin#';
      } else {
        //已登录，唯一标识为用户ID
        flag = true;
        uniqueId = native_score.userId;
        deviceId = native_score.deviceId;
        $.ajax({
          type: 'get',
          url: '//mmp.51wnl.com/api4.5.2/GetMemInfo.ashx?userId=' + uniqueId,
          async: false,
          dataType: 'jsonp',
          contentType: 'application/json;charset=utf-8',
          success: function(result) {
            // 模拟
            var data = result.data;
            $('.user-login-name span').text(WNLBase64.decode(data.nickName));
            if (!data.userIcon || data.userIcon === '') {
              $('.user-img img').attr('src', './img/user-normal-img.png');
            } else {
              $('.user-img img').attr('src', data.userIcon);
            }
            if (data.isFree) {
              $('.tlgzy').attr(
                'href',
                '//mobile.51wnl.com/numberology/vip/tlp/dist/index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&boundid=[BUNDLE]&posId=[posId]&vip=1'
              );
              $('.tlgqy').attr(
                'href',
                '//mobile.51wnl.com/numberology/vip/gqy/#/?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&boundid=[BUNDLE]&posId=[posId]&DONTURLENCODE=[DONTURLENCODE]&isVip=true'
              );
            } else {
              $('.tlgzy').attr(
                'href',
                '//mobile.51wnl.com/numberology/vip/tlp/dist/index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&boundid=[BUNDLE]&posId=[posId]'
              );
              $('.tlgqy').attr(
                'href',
                '//mobile.51wnl.com/numberology/vip/gqy/#/?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&boundid=[BUNDLE]&posId=[posId]&DONTURLENCODE=[DONTURLENCODE]'
              );
            }
            /* data.isMember = false; */
            if (data.isMember) {
              // $(".view-quanyi").removeClass("hidden");
              var str = '会员期至' + data.expireDate.substr(0, 4) + '年' + data.expireDate.substr(5, 2) + '月' + data.expireDate.substr(8, 2) + '日';
              $('.user-login-date').text(str);
              $('.user-login-shape').css({
                background: 'url(./img/hyxt-hybz-yeah@3x.png)  no-repeat',
                'background-size': 'cover'
              });
            } else {
              $('.user-login-date').text('您目前还不是会员');
              // $(".order-member").removeClass("hidden");
              $('.user-login-shape').css({
                background: 'url(./img/hyxt-hybz-none@3x.png)  no-repeat',
                'background-size': 'cover'
              });
            }
            // 判断是否还是万年历咪咕会员，如果是，显示查看权益，如果不是显示开通
            // 首先进行 咪咕 登录
            if (miguToken) {
              // 查询用户登录信息，获取 msisdn
              userInfoData = {
                youCallbackName: 'getUserInfoCallback',
                channelCode: miguChannelCode,
                token: miguToken
              };
              getUserInfo(userInfoData);
            } else {
              loginData = {
                youCallbackName: 'successLogin',
                channelCode: miguChannelCode,
                loginType: '1',
                callBackUrl: 'https://mobile.51wnl.com/temporary/member/index.html'
              };
              // loginType(loginData);
            }
          },
          error: function() {
            console.log('error');
          }
        });
        $('.index-content').removeClass('hidden');
        if (getQueryString('token')) {
          this.localStorage.setItem('miguToken', getQueryString('token'));
          toast('咪咕登录成功~');
        }
        $('.user-info .user-noLogin').hide();
        $('.user-info .user-login').show();
      }
    };

    // 咪咕音乐初始化及登录
    window.successLogin = function(res) {
      location.href = res.loginUrl;
    };

    // 用户信息回调
    window.getUserInfoCallback = function(res) {
      // alert('订购会员，获取用户信息回调' + JSON.stringify(res));
      if (res.resCode === '000000') {
        // 登录token存在本地，30分钟过期，如果过期则重新登录
        miguMsisdn = res.msisdn;
        localStorage.setItem('miguMsisdn', miguMsisdn);
        // 进行包月包策略查询，获取 bizInfoMon(包月业务策略信息)
        BYBData = {
          channelCode: miguChannelCode,
          token: miguToken,
          serviceId: '698039034100000145',
          count: '1',
          type: '9',
          youCallbackName: 'queryStrategyBYBCallback'
        };
        // alert("包月包业务查询参数" + JSON.stringify(BYBData));
        queryStrategyBYB(BYBData);
      } else {
        loginData = {
          youCallbackName: 'successLogin',
          channelCode: miguChannelCode,
          loginType: '1',
          callBackUrl: 'http://mobile.51wnl.com/temporary/member/index.html'
        };
        toast('咪咕登录过期，请重新登录');
        localStorage.removeItem('miguToken');
        // setTimeout(() => {
        //   loginType(loginData);
        // }, 1500);
      }
    };
    window.getUserInfoCallback_td = function(res) {
      // alert('查看权益，获取用户信息回调' + JSON.stringify(res));
      if (res.resCode === '000000') {
        miguMsisdn = res.msisdn;
        localStorage.setItem('miguMsisdn', miguMsisdn);
        //  进行联合会员订购关系查询
        queryMemberData = {
          youCallbackName: 'queryMember_asMberCallback_td',
          channelCode: miguChannelCode,
          token: miguToken,
          serviceId: miguServiceId
        };
        queryMember_asMber(queryMemberData);
      } else {
        loginData = {
          youCallbackName: 'successLogin',
          channelCode: miguChannelCode,
          loginType: '1',
          callBackUrl: 'http://mobile.51wnl.com/temporary/member/index.html'
        };
        toast('咪咕登录过期，请重新登录');
        localStorage.removeItem('miguToken');
        // setTimeout(() => {
        //   loginType(loginData);
        // }, 1500);
      }
    };
    // 包月包查询回调
    window.queryStrategyBYBCallback = function(res) {
      // 获取联合会员订购必要参数
      // alert(JSON.stringify(res.bizInfoMon));
      miguBizCode = res.bizInfoMon.bizCode;
      miguCpId = res.bizInfoMon.cpId;
      miguCpparam = res.bizInfoMon.cpparam;
      miguSalePrice = res.bizInfoMon.salePrice;

      //  进行联合会员订购关系查询
      queryMemberData = {
        youCallbackName: 'queryMember_asMberCallback',
        channelCode: miguChannelCode,
        token: miguToken,
        serviceId: miguServiceId
      };
      queryMember_asMber(queryMemberData);
    };

    // 联合会员关系查询回调
    window.queryMember_asMberCallback = function(res) {
      //
      // alert("联合会员订购查询回调：" + JSON.stringify(res));
      // 模拟数据
      // res = {
      // 	resCode: "000005"
      // };
      if (res.resCode !== '000000' && miguQuery === 2) {
        // 如果没有订阅
        //联合订购
        orderAsMberData = {
          channelCode: miguChannelCode,
          token: miguToken,
          serviceId: miguServiceId,
          youCallbackName: 'order_asMberCallback',
          name: 'order_asMber',
          cpId: miguCpId,
          bizCode: miguBizCode,
          cpparam: miguCpparam,
          salePrice: miguSalePrice,
          excode: '',
          defSeq: ''
        };
        // alert("联合会员订购参数：" + JSON.stringify(orderAsMberData));
        order_asMber(orderAsMberData);
      } else if (res.resCode !== '000000' && miguQuery === 1) {
        // 首次查询，并且没有订购
        // alert('首次查询，并且没有订购');
        $('.order-member').removeClass('hidden');
      } else if (res.resCode === '000000' && miguQuery === 1) {
        // 首次查询，已订购
        // alert('首次查询，已订购');
        $('.view-quanyi').removeClass('hidden');
      } else {
        toast(res.resMsg);
      }
    };

    //联合会员关系查询 ===== 退订
    window.queryMember_asMberCallback_td = function(res) {
      // alert("执行联合会员退订关系查询" + JSON.stringify(res));
      // res = {
      // 	resCode: "000000"
      // };
      $('.index-content').addClass('hidden');
      $('.migu-content').removeClass('hidden');
      $('.tel-num').text(miguMsisdn);
      if (res.resCode === '000000') {
        // 如果已订购
        $('.tuiding').removeClass('hidden');
      } else {
        // toast(res.resMsg);
      }
    };
    // 联合会员回调
    window.order_asMberCallback = function(res) {
      // alert("联合会员订购接口回调" + JSON.stringify(res));

      //模拟返回数据
      // res = {
      // 	resCode: "000000"
      // };
      // 退订成功告知后台，并进行记录
      if (res.resCode === '000000') {
        $.ajax({
          type: 'post',
          url:
            '//coco70.51wnl.com/numberologyNew/mg/AddMember?UserID=' +
            uniqueId +
            '&DeviceID=' +
            deviceId +
            '&ClientType=' +
            clientType +
            '&Channel=' +
            channel +
            '&PToken=' +
            pToken +
            '&Token=' +
            token +
            '&Idfa=' +
            Idfa +
            '&DeviceMac=' +
            DeviceMac +
            '&ImeiNumber=' +
            ImeiNumber +
            '&BoundId=' +
            BoundId +
            '&SysVersion=' +
            SysVersion +
            '&AppVersion=' +
            AppVersion +
            'assMemberkey' + assMemberkey,
          async: false,
          dataType: 'json',
          contentType: 'application/json;charset=utf-8',
          success: function(res) {
            toast('万年历咪咕黄金会员订购成功');
            // 刷新页面 从而展示 migu 会员
            setTimeout(function() {
              // location.href = 'http://mobile.51wnl.com/temporary/member/index.html';
              location.reload();
            }, 1500);
          }
        });
      } else {
        toast(res.resMsg);
      }
      $('.view-quanyi').on('click', function() {
        // alert('查看');
        $('.tel-num').text(miguMsisdn);
        $('.migu-content').removeClass('hidden');
        $('.index-content').addClass('hidden');
        miguMsisdn = localStorage.getItem('miguMsisdn');
        if (miguToken) {
          userInfoData = {
            youCallbackName: 'getUserInfoCallback_td',
            channelCode: miguChannelCode,
            token: miguToken
          };
          getUserInfo(userInfoData);
        } else {
          loginData = {
            youCallbackName: 'successLogin',
            channelCode: miguChannelCode,
            loginType: '1',
            callBackUrl: 'https://mobile.51wnl.com/temporary/member/index.html'
          };
          // loginType(loginData);
        }
      });
    };

    // 取消联合会员回调
    window.cancel_asMberCallback = function(res) {
      // alert("退订回调参数：" + JSON.stringify(res));
      // 模拟退订成功参数
      // res = {
      // 	resCode: "000000"
      // };
      if (res.resCode === '000000') {
        // 通知后台，退订成功
        $.ajax({
          type: 'post',
          url: '//coco70.51wnl.com/numberologyNew/mg/DelMember?userid=' + uniqueId + '&deviceid=' + deviceId,
          async: false,
          dataType: 'json',
          contentType: 'application/json;charset=utf-8',
          success: function(res) {
            $('.confirm-pop').addClass('hidden');
            $('.mask').addClass('hidden');
            toast('退订成功');
            setTimeout(function() {
              // location.href = 'http://mobile.51wnl.com/temporary/member/index.html';
              location.reload();
            }, 1500);
          }
        });
      } else {
        toast(res.resMsg);
      }
    };
    $('.mask').on('touchmove', function(e) {
      e.preventDefault();
    });
    //如果用户已登录
    $('.order-member').on('click', function() {
      var isAgree = $('#wnl-migu-agree').is(':checked');
      if (!isAgree) {
        toast('请同意万年历咪咕黄金包会员协议');
        return;
      }
      // 咪咕音乐迭代
      // alert("登录Token：" + miguToken);
      miguQuery = 2; // 订购时进行查询
      if (miguToken) {
        // 查询用户登录信息，获取 msisdn
        userInfoData = {
          youCallbackName: 'getUserInfoCallback',
          channelCode: miguChannelCode,
          token: miguToken
        };
        getUserInfo(userInfoData);
      } else {
        loginData = {
          youCallbackName: 'successLogin',
          channelCode: miguChannelCode,
          loginType: '1',
          callBackUrl: 'http://mobile.51wnl.com/temporary/member/index.html'
        };
        // loginType(loginData);
      }
    });
    // 退订
    $('.tuiding').on('click', function() {
      $('.mask,.confirm-pop').removeClass('hidden');
    });
    $('.tuiding-btn').on('click', function() {
      // alert('click');
      if (isMiguActive) {
        ylwindow.cancelAssMember(miguServiceId, '20', 'cancelasMberCallback');
        window.cancelasMberCallback = function(res) {
          // alert(res);
          if (parseInt(res.resultCode) === 1) {
            toast('退订成功');
            setTimeout(function() {
              // location.href = 'http://mobile.51wnl.com/temporary/member/index.html';
              location.reload();
            }, 1500);
          } else {
            toast('退订失败');
          }
        }
      } else {
        // 网页sdk退购
        cancelAsMberData = {
          channelCode: miguChannelCode,
          token: miguToken,
          serviceId: miguServiceId,
          youCallbackName: 'cancel_asMberCallback'
        };
        cancel_asMber(cancelAsMberData);
      }
    });
  };
  function initCommon() {
    $('.agree-content').on('click', function() {
      $('.index-content').addClass('noscroll');
      $('.mask,.wnl-migu-arree-content').removeClass('hidden');
    });
    $('.wnl-migu-arree-content').on('click', function() {
      $('.mask,.wnl-migu-arree-content').addClass('hidden');
      $('.index-content').removeClass('noscroll');
    });
    $('.mask').on('click', function() {
      $('.mask,.confirm-pop,.wnl-migu-arree-content').addClass('hidden');
      $('.index-content').removeClass('noscroll');
    });
    $('.download-migu').on('click', function() {
      location.href = 'https://mobile.51wnl.com/temporary/member/migumusic.html';
    });
    $('.member-sliver').click(function() {
      if (flag === true) {
        var data = {
          userId: uniqueId,
          Type: '1'
        };
        // location.href = "//order.51wnl.com/pay_web/index_t.html?money=15&source=白银会员&parterid=WnlMember&goodsid=39C4EDEBE2BB424FB653D9B362014ECE&parteruserid=" + uniqueId + "&data=" + JSON.stringify(data) + "&returnUrl=" + encodeURIComponent('//' + location.host + location.pathname);
        location.href =
          '//order.51wnl.com/pay_web/index_t.html?money=15&source=白银会员&parterid=WnlMember&goodsid=39C4EDEBE2BB424FB653D9B362014ECE&parteruserid=' +
          uniqueId +
          '&data=' +
          JSON.stringify(data) +
          '&returnUrl=' +
          encodeURIComponent('//' + location.host + location.pathname);
      } else {
        location.href = 'protocol://enterlogin#';
      }
    });
    $('.member-bronze').click(function() {
      if (flag === true) {
        var data = {
          userId: uniqueId,
          Type: '0'
        };
        // location.href = "//order.51wnl.com/pay_web/index_t.html?money=10&source=青铜会员&parterid=WnlMember&goodsid=AE4C3696088D4A3D93CDDF68AB3EB9A6&parteruserid=" + uniqueId + "&data=" + JSON.stringify(data) + "&returnUrl=" + encodeURIComponent('//' + location.host + location.pathname);
        location.href =
          '//order.51wnl.com/pay_web/index_t.html?money=10&source=青铜会员&parterid=WnlMember&goodsid=AE4C3696088D4A3D93CDDF68AB3EB9A6&parteruserid=' +
          uniqueId +
          '&data=' +
          JSON.stringify(data) +
          '&returnUrl=' +
          encodeURIComponent('//' + location.host + location.pathname);
      } else {
        location.href = 'protocol://enterlogin#';
      }
    });
    //点击顶部头像栏进行登录
    $('.user-noLogin,.user-img').on('click', function() {
      if (flag === false) {
        location.href = 'protocol://enterlogin#';
      }
    });
  }
  initCommon();
}
