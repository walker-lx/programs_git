var flag = 0
var succarr = localStorage.getItem('succarr') ? localStorage.getItem('succarr').split(',') : [] // 存放拼图成功的图片id
var succcount = localStorage.getItem('succcount') ? localStorage.getItem('succcount').split(',') : []
var cjcount = parseInt(localStorage.getItem('cjcount')) || 0 // 抽奖次数
var failimgid
var that
var timer
var timer2
var browser = {
  isAndroid: function () {
    return navigator.userAgent.match(/Android/i) ? true : false
  },
  isIOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false
  },
  isWx: function () {
    return navigator.userAgent.match(/micromessenger/i) ? true : false
  },
  isWp: function () {
    return navigator.userAgent.toLowerCase().indexOf('windows phone') > -1
  },
  isWnl: function () {
    return navigator.userAgent.toLowerCase().indexOf('wnl') > -1
  },
  getIOSVersion: function () {
    if (window.MSStream) {
      return false
    }
    var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
    var version
    if (match !== undefined && match !== null) {
      version = [
        parseInt(match[1], 10),
        parseInt(match[2], 10),
        parseInt(match[3] || 0, 10)
      ]
      return parseFloat(version.join('.'))
    }
    return false
  }
}
var share = {
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
}
var wnltype, wxtype
if (browser.isWnl()) {
  if (browser.isIOS()) {
    wnltype = 'wnl_ios'
  }
  else if (browser.isAndroid()) {
    wnltype = 'wnl_az'
  }
}
if (browser.isWx()) {
  if (browser.isIOS()) {
    wxtype = 'wx_ios'
  }
  else if (browser.isAndroid()) {
    wxtype = 'wx_az'
  }
}
function jx () {
  if (timer !== '') {
    clearInterval(timer)
  }
  if (timer2 !== '') {
    clearInterval(timer2)
  }
  $('.progress_ani').animate({
    width: 0
  }, 20000).stop(true)
  $('.progresstime').find('span').html('5')
  $('#pt_time').html('20')
  $('.progress_ani').css('width', '100%')
  $('.countdown').css('backgroundImage', 'url("img/5.png")')
  $('.countdown').removeClass('hidden')
// $('#ptimg').empty()
}
function uniquearr (arr) { // 数组去重
  var res = []
  var json = {}
  for (var i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i])
      json[arr[i]] = 1
    }
  }
  return res
}
function getcount () {
  if (localStorage.getItem('succarr')) {
    if (localStorage.getItem('succarr').length <= 0) {
      return 0
    }else {
      return localStorage.getItem('succarr').split(',').length
    }
  }else {
    return 0
  }
}
function getsuccnum () {
  if (localStorage.getItem('succarr')) {
    if (localStorage.getItem('succarr').length <= 0) {
      return 0
    }else {
      return uniquearr(localStorage.getItem('succarr').split(',')).length
    }
  }else {
    return 0
  }
}
function gettext (id) {
  var n = id
  var text
  switch (n) {
    case 1:
      text = '腊八粥'
      break
    case 2:
      text = '腊八蒜'
      break
    case 3:
      text = '腊八豆腐'
      break
    case 4:
      text = '吃冰'
      break
    case 5:
      text = '祭祀'
      break
    case 6:
      text = '吃腊八面'
      break
    default:
      text = '一'
  }
  return text
}
function next () {
  var showpt = $('.showpt')
  var fail = $('.fail')
  var succ = $('.succ')
  var pttime = $('#pt_time')
  var failimg = $('.fail_img')
  var succimg = $('.succ_img')
  var succagain = $('.succ_again')
  var progresstime = $('.progresstime').find('span')
  flag = 0
  var imgnum
  $('.before').removeClass('hidden')
  for (var i = 1; i < 7; i++) {
    // console.log($('#item' + i + '').css('backgroundImage'))
    if ($('#item' + i + '').css('backgroundImage').indexOf('wh') !== -1) {
      if (uniquearr(localStorage.getItem('succarr').split(',')).length >= 6) {
        $('.ptpage').addClass('hidden')
        $('.sharepage').removeClass('hidden')
      }else {
        imgnum = i
        $('.ptpage').removeClass('hidden')
        showpt.removeClass('hidden')
        break
      }
    }
  }
  // console.log(imgnum)
  $('.remember').find('span').eq(0).html(gettext(imgnum))
  jx()
  var game = new Game(imgnum, 3, 3)
  var count = 4
  $('.imgdesc').css('backgroundImage', 'url("img/ptdesc' + imgnum + '.png")')
  succ.addClass('hidden')
  var timer = setInterval(function () {
    $('.countdown').css('backgroundImage', 'url("img/' + count + '.png")')
    count--
    if (count === 0) {
      clearInterval(timer)
    }
  }, 1000)
  setTimeout(function () {
    $('.before').addClass('hidden')
    $('.countdown').addClass('hidden')
    game.startGame()
    $('.progress_ani').animate({
      width: 0
    }, 20000)
    var progresstime = $('.progresstime').find('span')
    var time = 19
    timer2 = setInterval(function () {
      progresstime.html(time)
      time--
      if (time < 0) {
        flag = 2
        failimg.css('backgroundImage', 'url("img/pt' + that.img_id + '.png")')
        failimgid = that.img_id
        showpt.addClass('hidden')
        // $('#ptimg').empty()
        $('.countdown').css('backgroundImage', 'url("img/5.png")').removeClass('hidden')
        fail.removeClass('hidden')
        clearInterval(timer2)
        time = 0
      }
      if (time < 0) {
        clearInterval(timer2)
      }
      else if (flag === 1) {
        // console.log(localStorage.getItem('succarr'))
        // clearInterval(timer2)
        $('.progress_ani').animate({
          width: 0
        }, 20000).stop(true)
        progresstime.html('5')
        $('.progress_ani').css('width', '100%')
        $('.progresstime').find('span').html('20')
      }
    // else {
    //   flag = 0
    // }
    }, 850)
  }, 5000)
}
function again (num) {
  var showpt = $('.showpt')
  var fail = $('.fail')
  var succ = $('.succ')
  var pttime = $('#pt_time')
  var failimg = $('.fail_img')
  var succimg = $('.succ_img')
  var succagain = $('.succ_again')
  var progresstime = $('.progresstime').find('span')
  // var n = num || 1
  $('.item' + that.img_id + '').css('backgroundImage', 'url("img/noshadow' + that.img_id + '.png")')
  succimg.css('backgroundImage', 'url("img/pt' + that.img_id + '.png")')
  showpt.addClass('hidden')
  succ.removeClass('hidden')
  $('#ptimg').empty()
  // $('.remember').find('span').html(n)
  $('.countdown').removeClass('hidden')
  $('.countdown').css('backgroundImage', 'url("img/5.png")')
  $('.progress_ani').css('width', '100%')
  progresstime.html(20)
}
$('.succ_again').click(function () { // 成功后继续拼图
  $('.imgdesc').css('backgroundImage', 'url("img/ptdesc' + that.img_id + '.png")')
  next()
  $('.fail').addClass('hidden')
  _czc.push(['_trackEvent', 'laba2017jx' + wnltype, 'show']) // eslint-disable-line
  _czc.push(['_trackEvent', 'laba2017jx' + wxtype, 'show'])
})
function setlocal (value1, value2) {
  localStorage.setItem('succarr', value1)
  localStorage.setItem('cjcount', value2)
}
function Game (img_id, row, col) {
  this.con = document.getElementById('ptimg')
  this.item = []
  // this.conwidth = 6.33
  // this.conheight = 5.52
  this.conwidth = document.body.offsetWidth - 59
  this.conheight = (document.body.offsetWidth - 59) * (5.5 / 6.32)
  this.row = row || 3
  this.col = col || 3
  this.minwidth = this.conwidth / this.col
  this.minheight = this.conheight / this.row
  this.num = this.row * this.col; // 图片的数量
  this.arr = []; // 初始化数组
  this.newarr = []; // 随机图片数组
  this.pos = []; // 存放位置的
  this.img_id = img_id || 4
  this.init()
  this.len = this.arr.length
  this.minIndex = 10
  that = this
}
var oFrag = document.createDocumentFragment()
Game.prototype.init = function () {
  for (var i = 1;i <= this.num;i++) {
    this.arr.push(i)
  }
  this.newarr = this.arr.slice(0)

  for (var i = 0;i < this.num;i++) {
    var div = document.createElement('div')
    var img = new Image()
    if ($(window).width() >= 414 && i % 3 === 1) {
      div.setAttribute('style', 'background-image:url(img/pt' + this.img_id + '.png);background-position: -' + (i % this.col) * (this.minwidth) + 'px -' + Math.floor((i) / this.col) * this.minheight + 'px;float:left;height:' + this.minheight + 'px;width:' + (this.minwidth) + 'px;')
      div.setAttribute('class', 'div' + i)
    }else {
      div.setAttribute('class', 'div' + i)
      div.setAttribute('style', 'background-image:url(img/pt' + this.img_id + '.png);background-position: -' + (i % this.col) * (this.minwidth) + 'px -' + Math.floor((i) / this.col) * this.minheight + 'px;float:left;height:' + this.minheight + 'px;width:' + this.minwidth + 'px;')}
    this.item.push(div)
    oFrag.appendChild(div)
  }
  img.onload = function () {
    $('#ptimg').append(img)
  }
  // this.con.appendChild(oFrag)
  img.src = 'https://b.cqyouloft.com/labafestival2017/img/pt' + this.img_id + '.png'
// console.log(img)
}
// Game.prototype.endGame = function () {
//   this.con.innerHTML = ''
//   // this.con.setAttribute('style', 'background-image:url(img/pt' + this.img_id + '.png) no-repeat;background-size:6.32rem 5.5rem;')
//   this.con.setAttribute('style', 'background-image:url(img/pt' + this.img_id + '.png)')
// }
Game.prototype.isSuccess = function () {
  for (var i = 0;i < this.len - 1;i++) {
    if (this.newarr[i] != this.arr[i]) {
      return false
    }
  }
  flag = 1
  return true
}
Game.prototype.startGame = function () {
  flag = 0
  var self = this
  this.newarr.sort(function (a, b) {
    return Math.random() > 0.5 ? 1 : -1
  })
  if ($('#ptimg').find('img')) {
    $('#ptimg').find('img').remove()
  }
  this.con.appendChild(oFrag)

  for (var i = 0;i < this.len;i++) {
    this.pos[i] = [this.item[i].offsetLeft, this.item[i].offsetTop]
  // console.log(this.pos[i])
  }
  for (var i = 0;i < this.len;i++) {
    var n = this.newarr[i] - 1
    this.item[i].style.float = 'none'
    this.item[i].style.left = this.pos[i][0] + 'px'
    this.item[i].style.top = this.pos[i][1] + 'px'
    this.item[i].style.backgroundPosition = '-' + (n % this.col) * this.minwidth + 'px -' + Math.floor((n) / this.col) * this.minheight + 'px'
    this.item[i].style.position = 'absolute'
    this.item[i].index = i
    this.drag(this.item[i])
  // if (this.item[i].left == 0 && this.item[i].top == 0) {
  //   this.item[i].style.borderRadius = '10px'
  // }
  }
  // console.log(this.pos)
  // var usetime = 0
  // var playtime = setInterval(function () {
  //   usetime = usetime + 1
  //   $('.count').html(usetime)
  //   if (self.isSuccess()) {
  //     clearInterval(playtime)
  //     $('.usetime').html(usetime)
  //     $('.tips,.timer').hide()
  //     $('.download,.buttons,.successtext').show()
  //     self.endGame()
  //     self.con.removeEventListener('touchstart', function (e) { e.preventDefault(); }, false)
  //   }
  // }, 1000)
  if (self.isSuccess()) {
    succarr.push(self.img_id)
    succcount.push(self.img_id)
    localStorage.setItem('succcount', succcount)
    // cjcount++
    setlocal(succarr, cjcount)
    clearInterval(timer2)
    again()
    $('.fail').addClass('hidden')
    self.drag = null
    flag = 1
    if (uniquearr(localStorage.getItem('succcount').split(',')).length >= 6) {
      $('.ptpage').addClass('hidden')
      $('.sharepage').removeClass('hidden')
    }
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
    $('.cjcount').html(getcount())
    $('.succnum').html(localStorage.getItem('succcount') ? uniquearr(localStorage.getItem('succcount').split(',')).length : 0)
  }
}

Game.prototype.drag = function (o) {
  var pic = $('.ptimg_img').find('div')
  var disl
  var dist
  var self = this,near = null
  o.ontouchstart = function (e) {
    // for (var i = 0; i < 9; i++) {
    //   pic.eq(i).removeClass('div' + i)
    //   if (pic.eq(i).hasClass('border' + i)) {
    //     pic.eq(i).removeClass('border' + i)
    //   }
    // }
    var ev = window.event || e,
      disX = ev.touches[0].clientX - o.offsetLeft,
      disY = ev.touches[0].clientY - o.offsetTop
    o.style.zIndex = self.minIndex++
    o.className = ''
    document.ontouchmove = function (e) {
      var ev = window.event || e,
        l = ev.touches[0].clientX - disX,
        t = ev.touches[0].clientY - disY

      near = self.findNear(o)
      if (near) {
        near.className = ''
      // console.log('a')
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
          succarr.push(self.img_id)
          // cjcount++
          succcount.push(self.img_id)
          localStorage.setItem('succcount', succcount)
          setlocal(succarr, cjcount)
          again()
          clearInterval(timer2)
          // $('.fail').addClass('hidden')
          // $('.fail_desc').addClass('hidden')
          self.drag = null
          flag = 1
          if (uniquearr(localStorage.getItem('succcount').split(',')).length >= 6) {
            $('.ptpage').addClass('hidden')
            $('.sharepage').removeClass('hidden')
          }
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
          $('.cjcount').html(getcount())
          $('.succnum').html(localStorage.getItem('succcount') ? uniquearr(localStorage.getItem('succcount').split(',')).length : 0)
        }
      }else {
        self.move(o, {left: self.pos[o.index][0],top: self.pos[o.index][1]})
      }
      console.log(self.arr)
      $('#ptimg').find('div').eq(self.arr[0] - 1).addClass('border1')
      $('#ptimg').find('div').eq(self.arr[2] - 1).addClass('border2')
      $('#ptimg').find('div').eq(self.arr[6] - 1).addClass('border3')
      $('#ptimg').find('div').eq(self.arr[8] - 1).addClass('border4')
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
    // this.item[i].className = ''
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
function toast (text, ms) {
  // Game.prototype.toast = function (text, ms) {
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
// }
}
