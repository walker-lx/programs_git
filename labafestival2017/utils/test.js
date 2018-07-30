function Game (row, col) {
  this.con = document.getElementById('ptimg')
  this.item = []
  this.conwidth = 6.6
  this.conheight = 5.4
  this.row = row || 3
  this.col = col || 3
  this.minwidth = this.conwidth / this.col
  this.minheight = this.conheight / this.row + 0.01
  this.num = this.row * this.col
  this.arr = []; // 初始化数组
  this.newarr = []; // 随机图片数组
  this.pos = []; // 存放位置的
  this.init()
  this.len = this.arr.length
  this.minIndex = 10
}
var turkys = [
  'turky',
  'turky1',
  'turky2'
]
var theTurky = turkys[Math.floor(Math.random() * 3)]
Game.prototype.init = function () {
  for (var i = 1;i <= this.num;i++) {
    this.arr.push(i)
  }
  this.newarr = this.arr.slice(0)
  var oFrag = document.createDocumentFragment()

  for (var i = 0;i < this.num;i++) {
    var div = document.createElement('div')
    if ($(window).width() >= 414 && i % 3 === 1) {
      div.setAttribute('style', 'background:url(http://b.cqyouloft.com/thanks2015/img/turky1.jpg) no-repeat; background-position: -' + (i % this.col) * this.minwidth + 'rem -' + Math.floor((i) / this.col) * this.minheight + 'rem;background-size: 6.6rem 5.4rem;float:left;height:' + this.minheight + 'rem;width:' + (this.minwidth) + 'rem;')
    }else {
      div.setAttribute('style', 'background:url(http://b.cqyouloft.com/thanks2015/img/turky1.jpg) no-repeat; background-position: -' + (i % this.col) * this.minwidth + 'rem -' + Math.floor((i) / this.col) * this.minheight + 'rem;background-size: 6.6rem 5.4rem;float:left;height:' + this.minheight + 'rem;width:' + this.minwidth + 'rem;')
    }
    this.item.push(div)
    oFrag.appendChild(div)
  }
  this.con.appendChild(oFrag)
}
Game.prototype.endGame = function () {
  this.con.innerHTML = ''
  this.con.setAttribute('style', 'background:url(http://b.cqyouloft.com/thanks2015/img/turky1.jpg) no-repeat;background-size:6.6rem 5.4rem;')
}
Game.prototype.isSuccess = function () {
  for (var i = 0;i < this.len - 1;i++) {
    if (this.newarr[i] != this.arr[i]) {
      return false
    }
  }
  return true
}
Game.prototype.startGame = function () {
  var self = this
  this.newarr.sort(function (a, b) {
    return Math.random() > 0.5 ? 1 : -1
  })
  for (var i = 0;i < this.len;i++) {
    this.pos[i] = [this.item[i].offsetLeft, this.item[i].offsetTop]
  }
  for (var i = 0;i < this.len;i++) {
    var n = this.newarr[i] - 1
    this.item[i].style.float = 'none'
    this.item[i].style.left = this.pos[i][0] + 'px'
    this.item[i].style.top = this.pos[i][1] + 'px'
    this.item[i].style.backgroundPosition = '-' + (n % this.col) * this.minwidth + 'rem -' + Math.floor((n) / this.col) * this.minheight + 'rem'
    this.item[i].style.position = 'absolute'
    this.item[i].index = i
    this.drag(this.item[i])
  }
  var usetime = 0
  var playtime = setInterval(function () {
    usetime = usetime + 1
    $('.count').html(usetime)
    if (self.isSuccess()) {
      clearInterval(playtime)
      $('.usetime').html(usetime)
      $('.tips,.timer').hide()
      $('.download,.buttons,.successtext').show()
      self.endGame()
      self.con.removeEventListener('touchstart', function (e) { e.preventDefault(); }, false)
      title = '这是我用' + usetime + '秒拼好的一只火鸡！拿走不谢，感恩节快乐！'
      fTitle = '这是我用' + usetime + '秒拼好的一只火鸡！'
      desc = '拿走不谢，感恩节快乐！'
      textObj = {
        text: title,
        image: '1',
        url: link,
        pureText: title,
        prefix: ''
      }
      textObj1 = {
        text: title,
        image: '1',
        targetUrl: link,
        perfix: ''
      }
      setShareInfo()
    }
  }, 1000)
}
Game.prototype.drag = function (o) {
  var self = this,near = null
  o.ontouchstart = function (e) {
    var ev = window.event || e,
      disX = ev.touches[0].clientX - o.offsetLeft,
      disY = ev.touches[0].clientY - o.offsetTop
    o.style.zIndex = self.minIndex++
    document.ontouchmove = function (e) {
      var ev = window.event || e,
        l = ev.touches[0].clientX - disX,
        t = ev.touches[0].clientY - disY

      near = self.findNear(o)
      if (near) {
        near.className = 'active'
      }
      o.style.left = l + 'px'
      o.style.top = t + 'px'
    }
    document.ontouchend = function () {
      if (near) {
        near.className = ''
        self.move(o, {left: self.pos[near.index][0],top: self.pos[near.index][1]})
        self.move(near, {left: self.pos[o.index][0],top: self.pos[o.index][1]})

        var temp = 0
        temp = near.index
        near.index = o.index
        o.index = temp

        for (var i = 0;i < self.len;i++) {
          self.arr[i] = (self.item[i].index + 1)
        }

        if (self.isSuccess()) {
          self.toast('成功过关!')
          self.drag = null
        }
      }else {
        self.move(o, {left: self.pos[o.index][0],top: self.pos[o.index][1]})
      }
      console.log(self.arr)

      // o.releaseCapture && o.releaseCapture()
      document.ontouchmove = null
      document.ontouchend = null
      return false
    }
    // this.setCapture && this.setCapture()
    ev.preventDefault && ev.preventDefault()
  }
}
Game.prototype.move = function (o, json, fn) {
  o.timer && clearInterval(o.timer)
  o.timer = setInterval(function () {
    var bStop = true
    for (var i in json) {
      var iCur = css(o, i)
      var iSpeed = (json[i] - iCur) / 5
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
      if (json[i] != iCur) {
        bStop = false
      }
      o.style[i] = (iCur + iSpeed) + 'px'
    }

    if (bStop) {
      clearInterval(o.timer)
      o.timer = null
      typeof fn == 'function' && fn()
    }
  }, 10)

  function css (o, attr) {
    var asd = parseInt($(o).css(attr).replace('px', ''))
    var cssCount = o.currentStyle ? Math.ceil(o.currentStyle[attr]) : Math.ceil(getComputedStyle(o, false)[attr])
    return asd
  }
}
Game.prototype.toast = function (text, ms) {
  if (!text) {
    return false
  }
  var dom = $('<div class="public_toast">' + text + '</div>')
  var ms = ms || 1500
  $('body').append(dom)
  setTimeout(function () {
    dom.addClass('public_toast_show')
  }, 10)
  setTimeout(function () {
    dom.removeClass('public_toast_show')
    dom.on('webkitTransitionEnd', function () {
      dom.remove()
    })
  }, ms)
}
Game.prototype.checkPZ = function (o1, o2) {
  if (o1 == o2)return
  var l1 = o1.offsetLeft,t1 = o1.offsetTop,r1 = o1.offsetWidth + l1,b1 = o1.offsetHeight + t1
  var l2 = o2.offsetLeft,t2 = o2.offsetTop,r2 = o2.offsetWidth + l2,b2 = o2.offsetHeight + t2
  if (l1 > r2 || t1 > b2 || r1 < l2 || b1 < t2) {
    return false
  }else {
    return true
  }
}
Game.prototype.findNear = function (o) {
  var iMin = 99999,index = -1
  for (var i = 0;i < this.len;i++) {
    this.item[i].className = ''
    if (this.checkPZ(o, this.item[i])) {
      var l = dis(o, this.item[i])
      if (iMin > l) {
        iMin = l
        index = i
      }
    }
  }
  if (index == -1) {
    return null
  }else {
    return this.item[index]
  }
  function dis (o1, o2) {
    var c1 = o1.offsetLeft - o2.offsetLeft,c2 = o1.offsetTop - o2.offsetTop
    return Math.sqrt(c1 * c1 + c2 * c2)
  }
}

// var ua = navigator.userAgent.toLowerCase()
// var wnl = ua.indexOf('wnl') > -1
// // weixin share
// var title = '感恩节全民拼火鸡，敢来拼一只火鸡送给我吗？'
// // 发送朋友标题
// var fTitle = '敢来拼一只火鸡送给我吗？'
// // 分享描述
// var desc = '感恩节全民拼火鸡，快来挑战吧！'
// // 分享链接
// var link = 'http://www.51wnl.com/activitynew/thanks2015/index.html'
// // 分享图片链接
// var imgUrl = 'http://www.51wnl.com/activitynew/thanks2015/img/shareicon.jpg'
// textObj = {
//   text: title,
//   image: '1',
//   url: link,
//   pureText: title,
//   prefix: ''
// }
// textObj1 = {
//   text: title,
//   image: '1',
//   targetUrl: link,
//   perfix: ''
// }
// function setShareInfo () {
//   // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
//   wx.onMenuShareTimeline({
//     title: title, // 分享标题
//     link: link, // 分享链接
//     imgUrl: imgUrl, // 分享图标
//     success: function () {
//       // 用户确认分享后执行的回调函数
//       $('.mask').addClass('hidden')
//     },
//     cancel: function () {
//       // 用户取消分享后执行的回调函数
//     }
//   })
//   // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
//   wx.onMenuShareAppMessage({
//     title: fTitle, // 分享标题
//     desc: desc, // 分享描述
//     link: link, // 分享链接
//     imgUrl: imgUrl, // 分享图标
//     // type: '', // 分享类型,music、video或link，不填默认为link
//     // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
//     success: function () {
//       // 用户确认分享后执行的回调函数
//       $('.mask').addClass('hidden')
//     },
//     cancel: function () {
//       // 用户取消分享后执行的回调函数
//     }
//   })
//   // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
//   wx.onMenuShareQQ({
//     title: title, // 分享标题
//     desc: desc, // 分享描述
//     link: link, // 分享链接
//     imgUrl: imgUrl, // 分享图标
//     success: function () {
//       // 用户确认分享后执行的回调函数
//       $('.mask').addClass('hidden')
//     },
//     cancel: function () {
//       // 用户取消分享后执行的回调函数
//     }
//   })
//   // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
//   wx.onMenuShareWeibo({
//     title: title, // 分享标题
//     desc: desc, // 分享描述
//     link: link, // 分享链接
//     imgUrl: imgUrl, // 分享图标
//     success: function () {
//       // 用户确认分享后执行的回调函数
//       $('.mask').addClass('hidden')
//     },
//     cancel: function () {
//       // 用户取消分享后执行的回调函数
//     }
//   })
// }
// var textObj1,textObj
// var isShare = false
// function appCallback_share () {
//   $('.shareMask').addClass('hidden')
//   isShare = true
//   _hmt.push(['_trackEvent', 'thanks2015_share_click', 'click', 'thanks2015_share_click', 'thanks2015_share_click'])
//   try {
//     if (window.ylwindow) {
//       ylwindow.reportHasShare(true)
//       location.href = 'protocol://share:' + encodeURI(JSON.stringify(textObj1))
//     }else {
//       location.href = 'protocol://share#' + encodeURI(JSON.stringify(textObj))
//     }
//   } catch (e) {
//     alert(e)
//   }
//   return 1
// }

// function getQueryString (name) {
//   var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
//   var r = window.location.search.substr(1).match(reg)
//   if (r != null) {
//     return decodeURIComponent(r[2])
//   }
//   return null
// }

$(function () {
  var again = getQueryString('again')
  if (again) {
    $('.section1').hide()
  }
  var t = new Game(3, 3)
//   FastClick.attach(document.body)
  /*var clientWidth = Math.min($(window).width(), $(window).height())
  var zoom=Math.round(clientWidth * 10000 / 375) / 10000
  if($(window).width()<=1024&&window.devicePixelRatio>1){
      $('.main').css("zoom",zoom)
  }*/
  $('.caption1').show()
  var container = document.querySelector('.container')
  var text3 = document.querySelector('.text3')
  var text7 = document.querySelector('.text7')
  var text11 = document.querySelector('.text11')
  text3.addEventListener('webkitAnimationEnd', function () {
    $('.caption1').fadeOut(1000)
    setTimeout(function () {
      $('.caption2').show()
    }, 1500)
  })
  text7.addEventListener('webkitAnimationEnd', function () {
    $('.caption2').fadeOut(1000)
    setTimeout(function () {
      $('.caption3').show()
    }, 1500)
  })
  text11.addEventListener('webkitAnimationEnd', function () {
    $('.section1').fadeOut(1000)
  /*setTimeout(function(){
  	$(".section2").show()
  },1500);*/
  })

  var clock = null
  $('.gogogo').click(function () {
    $('.section2').hide()
    // $(".section3").show()
    setTimeout(function () {
      $('.countdown').css('background', 'transparent')
    }, 1000)
    var seconds = 10
    clock = setInterval(function () {
      $('.countdown').html(seconds)
      seconds--
      if (seconds < 0) {
        clearInterval(clock)
        t.startGame()
        $('#start,.countdown').hide()
        $('.tips,.timer').show()
      }
    }, 1000)
  })
  $('#start').click(function () {
    clearInterval(clock)
    t.startGame()
    $('#start,.countdown').hide()
    $('.tips,.timer').show()
  })

  $('.playagain').click(function () {
    window.location.href = 'index.html?again=1'
  })

  wx.ready(function () {
    setShareInfo()
  })
  wx.error(function (res) {
    alert(JSON.stringify(res))
  })

  $('.share').click(function () {
    _hmt.push(['_trackEvent', 'thanks2015_share_click', 'click', 'thanks2015_share_click', 'thanks2015_share_click'])
    if (wnl) {
      isShare = true
      if (window.ylwindow) {
        ylwindow.reportHasShare(true)
        location.href = 'protocol://share:' + encodeURI(JSON.stringify(textObj1))
      }else {
        location.href = 'protocol://share#' + encodeURI(JSON.stringify(textObj))
      }
    }else {
      $('.mask').removeClass('hidden')
      return false
    }
  })
  $('.download').click(function () {
    if (wnl) {
      return false
    }else {
      var ua = navigator.userAgent.toLocaleLowerCase()
      var wx = ua.indexOf('micromessenger') > -1
      var isIOSPhone = ua.indexOf('iphone') > -1 || ua.indexOf('ipod') > -1
      var isIOS = isIOSPhone || ua.indexOf('ipad') > -1
      var isAndroid = ua.indexOf('android') > -1
      if (wx) {
        _hmt.push(['_trackEvent', 'thanks2015_download_wx_click', 'click', 'thanks2015_download_wx_click', 'thanks2015_download_wx_click'])
        location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653'
      }else {
        if (isIOS) {
          _hmt.push(['_trackEvent', 'thanks2015_download_ios_click', 'click', 'thanks2015_download_ios_click', 'thanks2015_download_ios_click'])
          location.href = 'http://um0.cn/3DERGu'
        }
        else if (isAndroid) {
          _hmt.push(['_trackEvent', 'thanks2015_download_android_click', 'click', 'thanks2015_download_android_click', 'thanks2015_download_android_click'])
          location.href = 'http://7xilyk.com2.z0.glb.qiniucdn.com/wnl_huanliang3_append.apk'
        }else {
          location.href = 'http://www.51wnl.com'
        }
      }
    }
  })
  $('.mask').click(function () {
    $(this).addClass('hidden')
  })
})
