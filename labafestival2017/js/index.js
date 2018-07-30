function getParam (name, url) { // 获取地址栏参数
  if (typeof name !== 'string') return false
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  var results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
function getymd (AddDayCount) {
  var dd = new Date()
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1; // 获取当前月份
  var d = dd.getDate(); // 获取当前几号 
  return y + '年' + m + '月' + d + '日'
}
function getpageId (id) { // 获取页面id
  var pageid
  switch (id) {
    case 'index_cj':
      pageid = '.index'
      break
    case 'pt_cj':
      pageid = '.pt'
      break
    case 'ptpage_cj':
      pageid = '.ptpage'
      break
    case 'cjpage_cj':
      pageid = '.cjpage'
      break
    case 'noward_cj':
      pageid = '.noward'
      break
    case 'zjpage_cj':
      pageid = '.zjpage'
      break
    default:
      break
  }
  return pageid
}
function isAward (id) {
  if (id === 6 || id === 4 || id === 2 || id === 0) {
    return false
  }
  return true
}
function Base64 () {

  // private property
  _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

  // public method for encoding
  this.encode = function (input) {
    var output = ''
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4
    var i = 0
    input = _utf8_encode(input)
    while (i < input.length) {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      output = output +
      _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
    }
    return output
  }

  // public method for decoding
  this.decode = function (input) {
    var output = ''
    var chr1, chr2, chr3
    var enc1, enc2, enc3, enc4
    var i = 0
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++))
      enc2 = _keyStr.indexOf(input.charAt(i++))
      enc3 = _keyStr.indexOf(input.charAt(i++))
      enc4 = _keyStr.indexOf(input.charAt(i++))
      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4
      output = output + String.fromCharCode(chr1)
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2)
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3)
      }
    }
    output = _utf8_decode(output)
    return output
  }

  // private method for UTF-8 encoding
  _utf8_encode = function (string) {
    string = string.replace(/\r\n/g, '\n')
    var utftext = ''
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n)
      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }
    return utftext
  }

  // private method for UTF-8 decoding
  _utf8_decode = function (utftext) {
    var string = ''
    var i = 0
    var c = c1 = c2 = 0
    while (i < utftext.length) {
      c = utftext.charCodeAt(i)
      if (c < 128) {
        string += String.fromCharCode(c)
        i++
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1)
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
        i += 2
      } else {
        c2 = utftext.charCodeAt(i + 1)
        c3 = utftext.charCodeAt(i + 2)
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        i += 3
      }
    }
    return string
  }
}

$(function () {
  // var awardarr = [
  //   {'id': 0, 'text': '谢谢参与', 'angel': Math.random() < 0.5 ? Math.floor(Math.random() * 22.5) : Math.floor(Math.random() * 22.5 + 337.5)},
  //   {'id': 1, 'text': '礼品卡1', 'angel': Math.floor(Math.random() * 45) + 292.5},
  //   { 'id': 2, 'text': '谢谢参与', 'angel': Math.floor(Math.random() * 45) + 247.5},
  //   { 'id': 3, 'text': '台历', 'angel': Math.floor(Math.random() * 45) + 202.5},
  //   { 'id': 4, 'text': '谢谢参与', 'angel': Math.floor(Math.random() * 45) + 157.5},
  //   { 'id': 5, 'text': '礼品卡2', 'angel': Math.floor(Math.random() * 45) + 112.5},
  //   { 'id': 6, 'text': '谢谢参与', 'angel': Math.floor(Math.random() * 45) + 67.5},
  //   { 'id': 7, 'text': '台历', 'angel': Math.floor(Math.random() * 45) + 22.5}
  // ]
  var awardarr = [{
    'id': 0,
    'text': '谢谢参与',
    'angel': 0 || 360
  },
    {
      'id': 1,
      'text': '礼品卡2',
      'angel': 315
    },
    {
      'id': 2,
      'text': '谢谢参与',
      'angel': 270
    },
    {
      'id': 3,
      'text': '台历',
      'angel': 225
    },
    {
      'id': 4,
      'text': '谢谢参与',
      'angel': 180
    },
    {
      'id': 5,
      'text': '礼品卡1',
      'angel': 135
    },
    {
      'id': 6,
      'text': '谢谢参与',
      'angel': 90
    },
    {
      'id': 7,
      'text': '台历',
      'angel': 45
    }
  ]
  function getAward (id) {
    if (id === 1) {
      $('.zjcontent').find('.line3').html('获得价值169元')
    }
    if (id === 3 || id === 7) {
      $('.zjcontent').find('.line2').removeClass('hidden')
      $('.zjcontent').find('.line3').addClass('hidden')
      $('.zjcontent').find('.line4').addClass('hidden')
    }
    if (id === 5) {
      $('.zjcontent').find('.line3').html('获得价值99元')
    }
  }
  function addDom (name, time, jp) {
    var prizelist = $('.prizelist')
    prizelist.append('<div class="item"><div class="listitem"><div class="nickname">' + name + '</div><div class="t">' + time + '</div><div class="getprize">' + jp + '</div></div></div>')
  }
  // function getWnlUserInfo (info, cb) {
  //   var param = {
  //     OpenId: info.openid,
  //     UnionId: info.unionid,
  //     Gender: info.gender,
  //     Platform: '2',
  //     OpenName: info.openName,
  //     Desc: '',
  //     AppId: 'ServiceAccount'
  //   }
  //   var data = {
  //     DataString: JSON.stringify(param)
  //   }
  //   $.ajax({
  //     url: '//u.51wnl.com/Login/OpenLogin?cid=Youloft_Android&av=4.2.6&mac=00:11:22:33:44:55&idfa=b622c089e7e14d2c2fa8c9129dafbb51&did=b622c089e7e14d2c2fa8c9129dafbb51&chn=wnl_anzhi&cc=CN&lang=zh&bd=com.youloft.calendar',
  //     dataType: 'json',
  //     type: 'POST',
  //     data: data,
  //     success: function (result) {
  //       if (typeof cb === 'function') {
  //         cb(result)
  //       }
  //     },
  //     error: function (e) {
  //       console.log(e)
  //     }
  //   })
  // }
  var username
  var uid
  var did
  var awardId
  var isZj
  var isclick = 0
  // 设置分享
  wnlui.wnlShare.setShareData({
    title: '腊八玩拼图，考眼力，拼速度！',
    friendtitle: '腊八玩拼图，考眼力，拼速度，赢好礼！',
    text: '这里有好礼相送，速速来领。',
    image: 'https://b.cqyouloft.com/labafestival2017/img/share.png',
    imgUrl: 'https://b.cqyouloft.com/labafestival2017/img/share.png',
    url: 'https://b.cqyouloft.com/labafestival2017/index.html?share=0',
    link: 'https://b.cqyouloft.com/labafestival2017/index.html?share=0',
    callback: function () {
      $('.wxsharemask').addClass('hidden')
    // $('.fail').addClass('hidden')
    }
  })
  // wnlui.wnlShare.showSharePlatform()
  wnlui.wxShare({
    title: '腊八玩拼图，考眼力，拼速度！',
    friendtitle: '腊八玩拼图，考眼力，拼速度，赢好礼！',
    text: '这里有好礼相送，速速来领。',
    image: 'https://b.cqyouloft.com/labafestival2017/img/share.png',
    imgUrl: 'https://b.cqyouloft.com/labafestival2017/img/share.png',
    url: 'https://b.cqyouloft.com/labafestival2017/index.html?share=0',
    link: 'https://b.cqyouloft.com/labafestival2017/index.html?share=0',
    callback: function () {
      $('.wxsharemask').addClass('hidden')
    // $('.fail').addClass('hidden')
    }
  })
  localStorage.setItem('uid', getParam('userId'))
  localStorage.setItem('did', getParam('deviceId'))
  var succarrlen = localStorage.getItem('succarr')
  var succarr1 = succarrlen ? uniquearr(succarrlen.split(',')) : []
  var succcount1 = localStorage.getItem('succcount') ? uniquearr(localStorage.getItem('succcount').split(',')) : []
  $('.cjcount').html(getcount())
  // localStorage.setItem('finishnum', succarr1.length)
  // $('.cjcount').html(parseInt(localStorage.getItem('cjcount')) <= 0 ? 0 : parseInt(localStorage.getItem('cjcount')))
  // if (localStorage.getItem('today')) {
  //   if (localStorage.getItem('today') !== getymd()) {
  //     cjcount = 0
  //     localStorage.setItem('cjcount', 0)
  //     $('.cjcount').html(0)
  //     localStorage.setItem('today', getymd())
  //   }
  // }
  if (getParam('share') == '0') {
    location.href = 'https://b.cqyouloft.com/labafestival2017/index.html'
    wnlui.wnlShare.setShareData({
      title: '腊八玩拼图，考眼力，拼速度！',
      friendtitle: '腊八玩拼图，考眼力，拼速度，赢好礼！',
      text: '这里有好礼相送，速速来领。',
      image: 'https://b.cqyouloft.com/labafestival2017/img/share.png',
      imgUrl: 'https://b.cqyouloft.com/labafestival2017/img/share.png',
      url: 'https://b.cqyouloft.com/labafestival2017/index.html?share=0',
      link: 'https://b.cqyouloft.com/labafestival2017/index.html?share=0',
      callback: function () {
        $('.wxsharemask').addClass('hidden')
      // $('.fail').addClass('hidden')
      }
    })
    // wnlui.wnlShare.showSharePlatform()
    wnlui.wxShare({
      title: '腊八玩拼图，考眼力，拼速度！',
      friendtitle: '腊八玩拼图，考眼力，拼速度，赢好礼！',
      text: '这里有好礼相送，速速来领。',
      image: 'https://b.cqyouloft.com/labafestival2017/img/share.png',
      imgUrl: 'https://b.cqyouloft.com/labafestival2017/img/share.png',
      url: 'https://b.cqyouloft.com/labafestival2017/index.html?share=0',
      link: 'https://b.cqyouloft.com/labafestival2017/index.html?share=0',
      callback: function () {
        $('.wxsharemask').addClass('hidden')
      // $('.fail').addClass('hidden')
      }
    })
  }
  if (getParam('share') == '1') {
    var succnumber = getParam('num')
    var succnumarr = getParam('succarr')
    if (succnumber >= 6) {
      share.title = '腊八玩拼图，我已成功通关,赶紧来挑战。'
      share.friendtitle = '腊八玩拼图，我已成功通关，赶紧来挑战。'
      share.url = location.href.replace('https', 'http') + '?share=1&num=6&name=' + encodeURIComponent($('.appname').html()),
      share.link = location.href.replace('https', 'http') + '?share=1&num=6&name=' + encodeURIComponent($('.appname').html())
      wnlui.wnlShare.setShareData(share)
      wnlui.wxShare(share)
    }else if (succnumber > 0) {
      share.title = '腊八玩拼图，我已开启' + succnumber + '/6的通关之路，赶紧来挑战。'
      share.friendtitle = '腊八玩拼图，我已开启' + succnumber + '/6的通关之路，赶紧来挑战。'
      share.url = location.href.replace('https', 'http') + '?share=1&num=' + succnumber + '&succarr=' + succnumarr + '&name=' + encodeURIComponent($('.appname').html()),
      share.link = location.href.replace('https', 'http') + '?share=1&num=' + succnumber + '&succarr=' + succnumarr + '&name=' + encodeURIComponent($('.appname').html())
      wnlui.wnlShare.setShareData(share)
      wnlui.wxShare(share)
    }else {
      wnlui.wnlShare.setShareData(share)
      wnlui.wxShare(share)
    }
    $('.qr').removeClass('hidden')
    $('.sharetop').addClass('hidden')
    $('.wnlpic').removeClass('hidden')
    $('.sharetext').removeClass('hidden')
    // console.log(uniquearr(getParam('succarr').split(',')), 'arr')
    if (parseInt(getParam('num')) >= 6) {
      $('.index').addClass('hidden')
      $('.sharepage').removeClass('hidden')
      $('.succ_share').removeClass('hidden')
      $('.succshare_btn').addClass('hidden')
    }else if (parseInt(getParam('num')) > 0) {
      var numarr = uniquearr(getParam('succarr').split(','))
      // console.log(getParam('num'))
      // for (var i = 0; i < parseInt(getParam('num')); i++) {
      //   $('.nosucc_share').find('.succitem' + (i + 1)).css('backgroundImage', 'url("img/succ' + parseInt(numarr[i]) + '.png")')
      // }
      for (var i = 0; i < parseInt(getParam('num')); i++) {
        $('.nosucc_share').find('.succitem' + parseInt(uniquearr(getParam('succarr').split(','))[i])).css('backgroundImage', 'url("img/noshadow' + parseInt(uniquearr(getParam('succarr').split(','))[i]) + '.png")')
      }
      var music = document.getElementById('audio')
      $('.play').click(function () {
        $(this).addClass('hidden')
        $('.stop').removeClass('hidden')
        // if (music.paused) {
        music.play()
      // }else {
      // music.pause()
      // }
      })
      $('.stop').click(function () {
        $(this).addClass('hidden')
        $('.play').removeClass('hidden')
        // if (music.paused) {
        // music.play()
        // }else {
        music.pause()
      // }
      })
      // console.log('url("img/succ' + parseInt(numarr[0]) + '.png")', 'aa')
      $('.appname').html(decodeURIComponent(getParam('name')))
      $('#succnum, .succnum').html(numarr.length)
      $('.index').addClass('hidden')
      $('.sharepage').removeClass('hidden')
      $('.succ_share').addClass('hidden')
      $('.succshare_btn').addClass('hidden')
      $('.nosucc_share').removeClass('hidden')
    }else {
      location.href = 'http://b.cqyouloft.com/labafestival2017/index.html?fail=1'
    }
    _czc.push(['_trackEvent', 'laba2017sharesucc' + wnltype, 'share']) // eslint-disable-line
    _czc.push(['_trackEvent', 'laba2017sharesucc' + wxtype, 'share'])
  }
  if (succcount1.length === 0) {
    console.log('0')
  }else {
    for (var i = 0; i < succcount1.length; i++) {
      var item = parseInt(succcount1[i])
      $('#item' + item).css('backgroundImage', 'url("img/noshadow' + item + '.png")')
    }
  }
  var firstTouch = true
  // --创建页面监听，等待微信端页面加载完毕 触发音频播放
  document.addEventListener('DOMContentLoaded', function () {
    function audioAutoPlay () {
      var audio = document.getElementById('audio')
      audio.play()
      document.addEventListener('WeixinJSBridgeReady', function () {
        audio.play()
      }, false)
    }
    audioAutoPlay()
  })
  // --创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
  document.addEventListener('touchstart', function () {
    function audioAutoPlay () {
      var audio = document.getElementById('audio')
      if (firstTouch) {
        audio.play()
      }else {
        return
      }
      firstTouch = false
    }
    audioAutoPlay()
  })
  _czc.push(['_trackEvent', 'laba2017index' + wnltype, 'show']) // eslint-disable-line
  _czc.push(['_trackEvent', 'laba2017index' + wxtype, 'show'])
  function getWnlUserInfo (info, cb) {
    var param = {
      OpenId: info.openid,
      UnionId: info.unionid,
      Gender: info.gender,
      Platform: '2',
      OpenName: info.openName,
      Desc: '',
      AppId: 'ServiceAccount'
    }
    var data = {
      DataString: JSON.stringify(param)
    }
    $.ajax({
      url: '//u.51wnl.com/Login/OpenLogin?cid=Youloft_Android&av=4.2.6&mac=00:11:22:33:44:55&idfa=b622c089e7e14d2c2fa8c9129dafbb51&did=b622c089e7e14d2c2fa8c9129dafbb51&chn=wnl_anzhi&cc=CN&lang=zh&bd=com.youloft.calendar',
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function (result) {
        if (typeof cb === 'function') {
          cb(result)
        }
      },
      error: function (e) {
        console.log(e)
      }
    })
  }
  var islogin
  var wnl_tlp_local = localStorage.getItem('wnl_tlp_local')
  if (browser.isWx()) {
    islogin = 1    
    if (wnl_tlp_local) {
      localStorage.setItem('userid', JSON.parse(wnl_tlp_local).wnlUserId)
      localStorage.setItem('deviceid', JSON.parse(wnl_tlp_local).unionid)
      uid = localStorage.getItem('userid')
      did = localStorage.getItem('deviceid')
      username = JSON.parse(wnl_tlp_local).openName.length > 4 ? JSON.parse(wnl_tlp_local).openName.slice(0, 4) : JSON.parse(wnl_tlp_local).openName
    // console.log('wxname', JSON.parse(wnl_tlp_local).openName)
    // console.log('wxname', username)
    } else {
      var openid = getParam('openid')
      if (openid) {
        var wnl_tlp_local = {}
        wnl_tlp_local.openid = getParam('openid')
        wnl_tlp_local.unionid = getParam('unionid')
        wnl_tlp_local.gender = getParam('sex')
        wnl_tlp_local.openName = getParam('nickname')
        getWnlUserInfo(wnl_tlp_local, function (result) {
          wnl_tlp_local.wnlUserId = result.data.wnlUserId
          // config.payInfo.UserID = result.data.wnlUserId
          // config.payInfo.DeviceID = result.data.unionid
          localStorage.setItem('userid', result.data.wnlUserId)
          localStorage.setItem('deviceid', result.data.unionid)
          localStorage.setItem('wnl_tlp_local', JSON.stringify(wnl_tlp_local))
          uid = localStorage.getItem('userid')
          did = localStorage.getItem('deviceid')
          username = JSON.parse(wnl_tlp_local).openName.length > 4 ? JSON.parse(wnl_tlp_local).openName.slice(0, 4) : JSON.parse(wnl_tlp_local).openName || '我'
        // $('.wnl_history_btn').css('display', 'block')
        })
      }else {
        $('.maskshow').removeClass('hidden')
        location.href = 'https://b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + encodeURIComponent(window.location.href)
      }
    }
    if (getParam('name')) {
      $('.appname').html(getParam('name'))
    }else {
      $('.appname').html(username || '我')
    }
  }else {
    $('.appname').html('我')
  }
  if (browser.isWnl()) { // 获取用户昵称
    // setTimeout(function () {
    // alert(uid)
    window.location.href = 'protocol://getuserinfo#userinfocallback'
    window.userinfocallback = function (rel) {
      var base64 = new Base64()
      var data = base64.decode(rel)
      // alert(data)
      // alert(JSON.parse(data).native_usercenter.nickname)
      data = JSON.parse(data)
      if (data.native_usercenter) {
        var getname = data.native_usercenter.nickname || data.native_usercenter.name
        // username = getname.length > 4 ? getname.slice(0, 4) : getname
        // console.log(username, 'username')
        // alert(data.native_usercenter.nickname)
        var uniqueId = data.native_score.userId
        $.ajax({
          url: '//www.51wnl.com/Api4.5.2/GetUserInfo4Com.ashx',
          type: 'GET',
          dataType: 'jsonp',
          data: {
            'userid': uniqueId
          },
          success: function (result) {
            if (result.status === 1) {
              // headimgurl = result.data.icon
              var wnlname = result.data.nickName
              if (wnlname && wnlname.length !== 0) {
                username = base64.decode(wnlname).length > 4 ? base64.decode(wnlname).slice(0, 4) : base64.decode(wnlname)
              } else if (result.data.realName) {
                username = result.data.realName.length > 4 ? result.data.realName : result.data.realName
              } else {
                username = '我'
              }
              $('.appname').html(username)
              islogin = 1            
            }
          }
        })
        uid = data.native_score.userId
        did = data.native_score.deviceId
        var token = data.native_score.usertoken
        console.log(uid, '登录')
        console.log(token, 'token')
      } else {
        islogin = 0
        // location.href = 'protocol://enterlogin#'
        username = '我'
        $('.appname').html(username)
      }
    }
    // }, 4000)
  }
  // if (browser.isWx()) {
  //   if (openid) {
  //     $('.maskshow').addClass('hidden')
  //     // this.maskshow = false
  //     // wxNickName = getparam('nickname') || '我'
  //     var openid = getparam('openid')
  //     var unionid = getParam('unionid')
  //     var gender = getParam('gender')
  //     var openname = getParam('nickname')
  //     username = openname.length > 4 ? openname.slice(0, 4) : openname
  //     // console.log('已获取到信息')
  //     $('.appname').html(username)
  //     var param = {
  //       OpenId: openid,
  //       UnionId: unionid,
  //       Gender: gender,
  //       Platform: '2',
  //       OpenName: openname,
  //       Desc: '',
  //       AppId: 'ServiceAccount'
  //     }
  //     var data = {
  //       DataString: JSON.stringify(param)
  //     }
  //     $.ajax({
  //       url: '//u.51wnl.com/Login/OpenLogin?cid=Youloft_Android&av=4.2.6&mac=00:11:22:33:44:55&idfa=b622c089e7e14d2c2fa8c9129dafbb51&did=b622c089e7e14d2c2fa8c9129dafbb51&chn=wnl_anzhi&cc=CN&lang=zh&bd=com.youloft.calendar',
  //       dataType: 'json',
  //       type: 'POST',
  //       data: data,
  //       success: function (result) {
  //         // if (typeof cb === 'function') {
  //         //   cb(result)
  //         // }
  //         uid = result.data.wnlUserId
  //         did = result.data.unionid
  //       },
  //       error: function (e) {
  //         console.log(e)
  //       }
  //     })
  //     if (getParam('name')) {
  //       $('.appname').html(getParam('name'))
  //     }else {
  //       $('.appname').html(username)
  //     }
  //   }
  //   else {
  //     $('.maskshow').removeClass('hidden')
  //     location.href = 'https://b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + encodeURIComponent(window.location.href)
  //   }
  // }
  // 分享页面打开
  // console.log(uniquearr(localStorage.getItem('succarr').split(',')))
  $.ajax({ // 获取中奖记录
    // url: '//192.168.1.110:9678/contentapi/api4.4.0/Lottery/GetLotteryLog',
    url: '//c.51wnl.com/contentapi/api4.4.0/Lottery/GetLotteryLog',
    type: 'POST',
    dataType: 'json',
    data: {
      // 'ActivityId': 'E7E461DD6B174DB89AB2667F3BC5224E'
      'ActivityId': '8D2B4938CFCA4774A9730C61A12E108F'
    },
    success: function (res) {
      console.log(res.data, '数据')
      var data = res.data
      var len = res.data.length
      var uname
      var utime
      var jp
      for (var i = 0; i < len; i++) {
        if (data[i].nickName == null) {
          continue
        }
        uname = data[i].nickName.length > 4 ? data[i].nickName.slice(0, 4) : data[i].nickName
        utime = data[i].createTime.split(' ')[0].split('-')[0] + '年' + data[i].createTime.split(' ')[0].split('-')[1] + '月' + data[i].createTime.split(' ')[0].split('-')[2] + '日'
        jp = data[i].awardName
        addDom(uname, utime, jp)
      }
    },
    fail: function (e) {
      console.log(e)
    }
  })
  $('.sub_again').on('click', function () {
    $('#ptimg').empty()
    $('.progress_ani').css('width', '100%')
    $('.progresstime').find('span').html(20)
    $('.countdown').removeClass('hidden')
    if (parseInt($('.cjcount').html()) <= 0) {
      $('.cjpage, .pt, .ptpage, .sharepage, .noaward, .zjpage').addClass('hidden')
      $('.index').removeClass('hidden')
    }else {
      $('.progress_ani').css('width', '100%')
      $('.progresstime').find('span').html('20')
      next()
    }
    _czc.push(['_trackEvent', 'laba2017cjagain' + wnltype, 'click']) // eslint-disable-line
    _czc.push(['_trackEvent', 'laba2017cjagain' + wxtype, 'click'])
  })
  // $('.qd').click(function () {
  //   location.href = 'protocol://enterlogin#'
  //   $('.login').addClass('hidden')
  // })
  // $('.fq').click(function () {
  //   // location.href = 'protocol://enterlogin#'
  //   $('.login').addClass('hidden')
  // })
  // 点击拼图
  $('.open1').click(function () {
    if (browser.isWnl()) {
      if (islogin === 1) {
        $('.index').addClass('hidden')
        $('.wnlpic').removeClass('hidden')
        $('.pt').removeClass('hidden')
      } else {
        // $('.login').removeClass('hidden')
        toast('请登录后开始玩额！', 600)
        setTimeout(function () {
          location.href = 'protocol://enterlogin#'
        }, 700);

      }
    }
    if (browser.isWx()) {
      $('.index').addClass('hidden')
      $('.wnlpic').removeClass('hidden')
      $('.pt').removeClass('hidden')
    }

    // console.log(localStorage.getItem('uid'), 'uid')
    var succnumber = localStorage.getItem('succcount') ? uniquearr(localStorage.getItem('succcount').split(',')).length : 0
    var succnumarr = localStorage.getItem('succcount') ? localStorage.getItem('succcount') : ''
    if (succnumber >= 6) {
      share.title = '腊八玩拼图，我已成功通关,赶紧来挑战。'
      share.friendtitle = '腊八玩拼图，我已成功通关，赶紧来挑战。'
      share.url = location.href.replace('https', 'http') + '?share=1&num=6&name=' + encodeURIComponent($('.appname').html()),
      share.link = location.href.replace('https', 'http') + '?share=1&num=6&name=' + encodeURIComponent($('.appname').html())
      wnlui.wnlShare.setShareData(share)
      wnlui.wxShare(share)
    }else if (succnumber > 0) {
      share.title = '腊八玩拼图，我已开启' + succnumber + '/6的通关之路，赶紧来挑战。'
      share.friendtitle = '腊八玩拼图，我已开启' + succnumber + '/6的通关之路，赶紧来挑战。'
      share.url = location.href.replace('https', 'http') + '?share=1&num=' + succnumber + '&succarr=' + succnumarr + '&name=' + encodeURIComponent($('.appname').html()),
      share.link = location.href.replace('https', 'http') + '?share=1&num=' + succnumber + '&succarr=' + succnumarr + '&name=' + encodeURIComponent($('.appname').html())
      wnlui.wnlShare.setShareData(share)
      wnlui.wxShare(share)
    }else {
      wnlui.wnlShare.setShareData(share)
      wnlui.wxShare(share)
    }
    // if (browser.isWnl()) {
    //   wnlui.wnlShare.showSharePlatform()
    // }
    // if (browser.isWx()) {
    //   $('.wxsharemask').removeClass('hidden')
    // }
    // if (browser.isWnl()) {
    //   wnlui.wnlShare.showSharePlatform()
    // }
    // if (browser.isWx()) {
    //   $('.wxsharemask').removeClass('hidden')
    // }
    _czc.push(['_trackEvent', 'laba2017open' + wnltype, 'click']) // eslint-disable-line
    _czc.push(['_trackEvent', 'laba2017open' + wxtype, 'click'])
  })
  $('.share, .sub_share, .fail_share').on('click', function () {
    var succnumber = localStorage.getItem('succcount') ? uniquearr(localStorage.getItem('succcount').split(',')).length : 0
    var succnumarr = localStorage.getItem('succcount') ? localStorage.getItem('succcount') : ''
    // $('.fail').addClass('hidden')
    if (succnumber >= 6) {
      share.title = '腊八玩拼图，我已成功通关,赶紧来挑战。'
      share.friendtitle = '腊八玩拼图，我已成功通关，赶紧来挑战。'
      share.url = location.href.replace('https', 'http') + '?share=1&num=6&name=' + encodeURIComponent($('.appname').html()),
      share.link = location.href.replace('https', 'http') + '?share=1&num=6&name=' + encodeURIComponent($('.appname').html())
      wnlui.wnlShare.setShareData(share)
      wnlui.wxShare(share)
    }else if (succnumber > 0) {
      share.title = '腊八玩拼图，我已开启' + succnumber + '/6的通关之路，赶紧来挑战。'
      share.friendtitle = '腊八玩拼图，我已开启' + succnumber + '/6的通关之路，赶紧来挑战。'
      share.url = location.href.replace('https', 'http') + '?share=1&num=' + succnumber + '&succarr=' + succnumarr + '&name=' + encodeURIComponent($('.appname').html()),
      share.link = location.href.replace('https', 'http') + '?share=1&num=' + succnumber + '&succarr=' + succnumarr + '&name=' + encodeURIComponent($('.appname').html())
      wnlui.wnlShare.setShareData(share)
      wnlui.wxShare(share)
    }else {
      wnlui.wnlShare.setShareData(share)
      wnlui.wxShare(share)
    }
    if (browser.isWnl()) {
      wnlui.wnlShare.showSharePlatform()
    }
    if (browser.isWx()) {
      $('.wxsharemask').removeClass('hidden')
    }
    _czc.push(['_trackEvent', 'laba2017share' + wnltype, 'share']) // eslint-disable-line
    _czc.push(['_trackEvent', 'laba2017share' + wxtype, 'share'])
  })
  // $('.fail_share').on('click', function () {
  //   // $('.fail').addClass('hidden')    
  //   if (localStorage.getItem('succcount')) {
  //     var n = uniquearr(localStorage.getItem('succcount').split(',')).length || 0
  //     var succnumarr1 = localStorage.getItem('succcount') ? localStorage.getItem('succcount') : ''
  //     if (n > 6) {
  //       share.title = '腊八玩拼图，我已成功通关,赶紧来挑战。'
  //       share.friendtitle = '腊八玩拼图，我已成功通关,赶紧来挑战。'
  //       share.url = location.href.replace('https', 'http') + '?share=1&num=6',
  //       share.link = location.href.replace('https', 'http') + '?share=1&num=6'        
  //       wnlui.wnlShare.setShareData(share)
  //       wnlui.wxShare(share)
  //     }else if (n > 0) {
  //       share.title = '腊八玩拼图，我已开启' + $('.succnum').html() + '/6的通关之路，赶紧来挑战。'
  //       share.friendtitle = '腊八玩拼图，我已开启' + $('.succnum').html() + '/6的通关之路，赶紧来挑战。'
  //       share.url = location.href.replace('https', 'http') + '?share=1&num=' + $('.succnum').html() + '&succarr=' + succnumarr1 + '&name=' + encodeURIComponent($('.appname').html()),
  //       share.link = location.href.replace('https', 'http') + '?share=1&num=' + $('.succnum').html() + '&succarr=' + succnumarr1 + '&name=' + encodeURIComponent($('.appname').html())        
  //       wnlui.wnlShare.setShareData(share)
  //       wnlui.wxShare(share)
  //     }
  //   }else {
  //     wnlui.wnlShare.setShareData(share)
  //     wnlui.wxShare(share)
  //   }
  //   if (browser.isWnl()) {
  //     wnlui.wnlShare.showSharePlatform()
  //   }
  //   if (browser.isWx()) {
  //     $('.wxsharemask').removeClass('hidden')
  //   }
  //   _czc.push(['_trackEvent', 'laba2017share' + wnltype, 'share']) // eslint-disable-line
  //   _czc.push(['_trackEvent', 'laba2017share' + wxtype, 'share'])
  // })
  $('.wxsharemask').click(function () {
    $('.wxsharemask').addClass('hidden')
  })
  var music = document.getElementById('audio')
  $('.play').click(function () {
    $(this).addClass('hidden')
    $('.stop').removeClass('hidden')
    // if (music.paused) {
    music.pause()
  // }else {
  // music.pause()
  // }
  })
  $('.stop').click(function () {
    $(this).addClass('hidden')
    $('.play').removeClass('hidden')
    // if (music.paused) {
    // music.play()
    // }else {
    music.play()
  // }
  })

  $('.rule').click(function () { // 规则
    $(this).addClass('rule1')
    $('.rulemask').removeClass('hidden')
  })
  $('.prize').click(function () { // 记录
    $(this).addClass('prize1')
    $('.prizemask').removeClass('hidden')
  })
  $('.closerule').click(function () {
    $('.rulemask').addClass('hidden')
  })
  $('.closeprize').click(function () {
    $('.prizemask').addClass('hidden')
  })

  $('.succshare_again').on('click', function () { // 通关后点击再玩一次
    $('.sharepage').addClass('hidden')
    $('.wnlpic').addClass('hidden')
    $('.index').removeClass('hidden')
  })
  $('.cjbtn').on('click', function (e) { // 点击抽奖
    jx()
    if ($('.cjcount').html() == 0) {
      toast('请完成拼图获取抽奖次数！', 1000)
    }else {
      $('.index, .pt, .ptpage, .sharepage, .noaward, .zjpage, .infowrite').addClass('hidden')
      $('.cjpage, .zj_content').removeClass('hidden')
      _czc.push(['_trackEvent', 'laba2017cj' + wnltype, 'click']) // eslint-disable-line
      _czc.push(['_trackEvent', 'laba2017cj' + wxtype, 'click'])
    }
  })
  $('.cjicon').bind('click', function () { // 抽奖圆盘转动
    if (isclick === 0) {
      var itemid = succarr[succarr.length - 1]
      succarr.splice(succarr.length - 1, 1)
      setlocal(succarr, cjcount)
      console.log(awardId)
      var card1arr = [0, 1, 2, 4, 6]
      var card2arr = [0, 2, 4, 5, 6]
      var tlarr = [0, 2, 3, 4, 6, 7]
      var nozj = [0, 2, 4, 6]
      var awarditem
      isclick = 1
      $.ajax({ // 抽奖
        // url: '//192.168.1.110:9678/contentapi/api4.4.0/Lottery/DoLottery',
        url: '//c.51wnl.com/contentapi/api4.4.0/Lottery/DoLottery',
        type: 'POST',
        data: {
          // 'ActivityId': 'E7E461DD6B174DB89AB2667F3BC5224E',
          'ActivityId': '8D2B4938CFCA4774A9730C61A12E108F',
          'UId': uid ? uid : localStorage.getItem('uid'),
          'type': 1
        },
        success: function (res) {
          awardId = res.data.award.name
          isZj = res.data.resultCode
          console.log(awardId, 'id')
          console.log(isZj, 'iszj')
          if (isZj === 1) {
            if (awardId === '169礼品卡') {
              awarditem = 1
            }else if (awardId === '99礼品卡') {
              awarditem = 5
            } else if (awardId === '台历') {
              awarditem = Math.random() < 0.5 ? 3 : 7
            } else {
              awarditem = nozj[Math.floor(Math.random() * 4)]
            }
          }else {
            awarditem = nozj[Math.floor(Math.random() * 4)]
          }
          $('.circletext').rotate({
            angle: 0, // 起始角度
            animateTo: awardarr[awarditem].angel + 360 * 3, // 结束的角度
            // animateTo: 315 + 360 * 3, // 结束的角度            
            duration: 2800, // 转动时间
            callback: function () {
              // console.log(isAward(awarditem.id))
              getAward(awarditem)
              setTimeout(function () {
                $('.cjpage').addClass('hidden')
                // $('.zjpage').removeClass('hidden')
                if (isAward(awarditem)) {
                  $('.zjpage').removeClass('hidden')
                  $('.noaward').addClass('hidden')
                }else {
                  $('.noaward').removeClass('hidden')
                  $('.zjpage').addClass('hidden')
                }
              }, 300)
              isclick = 0
            }, // 回调函数
          })
        }
      })
      $('.cjcount').html(parseInt($('.cjcount').html()) - 1 <= 0 ? 0 : parseInt($('.cjcount').html()) - 1)
    }else {
      toast('请不要重复点击', 500)
    }
  })
  window.onresize = function () {
    document.querySelector('.scroll').scrollIntoView(true)
  }
  $('.zjbtn').on('click', function () { // 跳转信息填写页面
    $('.zj_content').addClass('hidden')
    $('.infowrite').removeClass('hidden')
  })
  $('.info_sub').on('click', function () { // 领取奖品
    var uname = $('#username').val().trim()
    var userphone = $('#userphone').val().trim()
    var useraddr = $('#useraddr').val().trim()
    toast('信息提交中...', 900)
    // 生成签名字符串
    var sign = ''
    var jsonList = ['address', 'deviceid', 'gameprivatekey', 'gametype', 'mobile', 'nickname', 'uid']
    // var jsondata = {
    //   address: useraddr,
    //   deviceid: 'aaa',
    //   gameprivatekey: '41438e35d8b234f0f9e67eba0ca0656e',
    //   gametype: 'E7E461DD6B174DB89AB2667F3BC5224E',
    //   mobile: userphone,
    //   nickname: uname,
    //   uid: 'aaa'
    // }
    var jsonData = {
      address: encodeURIComponent(useraddr),
      deviceid: encodeURIComponent(did ? did : 'aaa'),
      gameprivatekey: encodeURIComponent('41438e35d8b234f0f9e67eba0ca0656e'),
      gametype: encodeURIComponent('8D2B4938CFCA4774A9730C61A12E108F'),
      mobile: encodeURIComponent(userphone),
      nickname: encodeURIComponent(uname),
      uid: encodeURIComponent(uid ? uid : 'bbb')
    }
    for (var i = 0; i < jsonList.length; i += 1) {
      if (!jsonData[jsonList[i]]) {
        continue
      }
      else if (jsonData[jsonList[i]].toString().length === 0) {
        continue
      }
      if (i > 0) {
        sign += '&' + jsonList[i] + '=' + jsonData[jsonList[i]]
      }else {
        sign += jsonList[i] + '=' + jsonData[jsonList[i]]
      }
    }
    console.log(sign, '签名前')
    sign = md5(sign)
    console.log(sign, '签名后')
    console.log('username', uname)
    console.log('deviceid', did)
    console.log('uid', uid)
    console.log('address', useraddr)
    $.ajax({ // 提交信息
      // url: 'http://192.168.1.110:9846/atcapi/api/GameActivity/SubInfo',
      url: '//b.cqyouloft.com/atcapi/api/GameActivity/SubInfo',
      headers: {
        sign: sign
      },
      type: 'POST',
      ContentType: 'application/x-www-form-urlencoded',
      data: {
        // 'gametype': 'E7E461DD6B174DB89AB2667F3BC5224E',
        'gametype': '8D2B4938CFCA4774A9730C61A12E108F',
        'deviceid': did ? did : localStorage.getItem('did'),
        // 'deviceid': 'aaa',
        'nickname': uname,
        'mobile': userphone,
        'address': useraddr,
        'uid': uid ? uid : localStorage.getItem('uid')
      // 'uid': 'bbb'
      },
      success: function (response) {
        console.log(response.msg, '相应')
        if (response.status == 200) {
          $('.infowrite').addClass('hidden')
          $('.sub_succ').removeClass('hidden')
        }else {
          toast(response.msg)
        }
      },
      fail: function () {
        console.log('失败')
      },
      complete: function (e) {
        console.log(e, '完成')
      }
    })
  // console.log(useraddr)
  })
  $('.awardagain').on('click', function () { // 未中奖点击继续
    jx()
    $('#ptimg').empty()
    $('.succ').addClass('hidden')
    $('.fail').addClass('hidden')
    $('.before').removeClass('hidden')
    $('.noaward').addClass('hidden')
    $('.pt').removeClass('hidden')
    flag = 3
  })
  $('.fail_again').on('click', function () { // 失败后点击继续
    for (var i = 0; i < succarr1.length; i++) {
      var item = parseInt(succarr1[i])
      $('#item' + item).css('backgroundImage', 'url("img/noshadow' + item + '.png")')
    }
    $('.progress_ani').css('width', '100%')
    $('.before').removeClass('hidden')
    $('.progresstime').find('span').html(20)
    $('.fail').addClass('hidden')
    $('.ptpage').addClass('hidden')
    $('.pt').removeClass('hidden')
    clearInterval(timer2)
    _czc.push(['_trackEvent', 'laba2017fail' + wnltype, 'show']) // eslint-disable-line
    _czc.push(['_trackEvent', 'laba2017fail' + wxtype, 'show'])
  })
  $('.item').click(function (e) { // 点击任意一幅图
    var clickid = e.target.id.slice(4, 5)
    var pttime = $('#pt_time')
    var showpt = $('.showpt')
    var failimg = $('.fail_img')
    var fail = $('.fail')
    $('#ptimg').empty()
    var game = new Game(clickid, 3, 3)
    var count = 4
    flag = 0
    $('.succ').addClass('hidden')
    // $('.fail').addClass('hidden')
    $('.before').removeClass('hidden')
    // console.log(getcount())
    // console.log(gettext(3))
    $('.showpt').removeClass('hidden')
    $('.progress_ani').css('width', '100%')
    $('.imgdesc').css('backgroundImage', 'url("img/ptdesc' + clickid + '.png")')
    $('.remember').find('span').eq(0).html(gettext(parseInt(clickid)))
    $('.pt').addClass('hidden')
    $('.ptpage').removeClass('hidden')
    jx()
    timer = setInterval(function () {
      $('.countdown').css('backgroundImage', 'url("img/' + count + '.png")')
      count--
      if (count <= 0) {
        clearInterval(timer)
      }
    }, 1000)
    setTimeout(function () {
      var progresstime = $('.progresstime').find('span')
      var time = 19
      $('.countdown').addClass('hidden')
      $('.before').addClass('hidden')
      game.startGame()
      $('.progress_ani').animate({
        width: 0
      }, 20000)
      timer2 = setInterval(function () {
        // if (!$('.succ').hasClass('hidden')) {
        //   $('.fail').addClass('hidden')
        // }
        progresstime.html(time)
        time--
        if (time < 0) {
          flag = 2
          failimg.css('backgroundImage', 'url("img/pt' + parseInt(clickid) + '.png")')
          showpt.addClass('hidden')
          $('#ptimg').empty()
          $('.countdown').css('backgroundImage', 'url("img/5.png")').removeClass('hidden')
          fail.removeClass('hidden')
          clearInterval(timer2)
          time = 19
        }
        // if (time < 0) {
        //   clearInterval(timer2)
        //   time = 19
        // }
        else if (flag === 1) {
          // console.log(localStorage.getItem('succarr'))
          var num = uniquearr(localStorage.getItem('succarr').split(',')).length
          // $('.cjcount').html(getcount())
          clearInterval(timer2)
          // $('.fail').addClass('hidden')
          $('.progress_ani').animate({
            width: 0
          }, 20000).stop(true)
          progresstime.html('5')
          $('.progresstime').find('span').html(20)
          $('.progress_ani').css('width', '100%')
        // cjcount++
        // $('.cjcount').html(cjcount)
        // localStorage.setItem('succarr', succarr)
        // localStorage.setItem('cjcount', cjcount)
        // console.log(cjcount)
        }
        else if (flag === 2) {
          clearInterval(timer2)
          $('.progress_ani').animate({
            width: 0
          }, 20000).stop()
          progresstime.html('5')
          $('.progresstime').find('span').html(20)
          $('.progress_ani').css('width', '100%')
        }
        else if (flag === 3) {
          clearInterval(timer2)
          $('.progress_ani').animate({
            width: 0
          }, 20000).stop()
          progresstime.html('5')
          $('.progresstime').find('span').html(20)
          $('.progress_ani').css('width', '100%')
        }else {
          flag = 0
        }
      }, 850)
    }, 5000)
  })
})
