$(function () {
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
  var page = 1
  var toast = new wnlui.toast()
  function addDom (text, index) {
    // var el = document.createDocumentFragment()
    var dom = '<div class="item"><div class="text text' + index + '">' + text + '</div><div class="make"><div class="btn btn' + index + '">制作贺卡</div><button class="copy copy' + index + '" id="copy" data-clipboard-action="copy" data-clipboard-target=".text' + index + '">复制</button></div></div>'
    $('.card').append(dom)
  }

  // 点击按钮复制
  var clipboard = new Clipboard('.copy')
  clipboard.on('success', function (e) {
    toast.show('复制成功')
  })
  clipboard.on('error', function (e) {
    toast.show('复制失败，请长按文字区域复制')
  })
  function addLabel (id, content) {
    var dom = '<div class="label" id="' + id + '">' + content + '</div>'
    $('.top').append(dom)
  }
  function getBless (p, id) { // 获取祝福语列表(test)
    $.ajax({
      url: 'https://wxpro.cqyouloft.com/v1/riddles/bless?p=' + p + '&l=' + id,
      type: 'GET',
      success: function (res) {
        var rel = res.data
        // console.log(rel)
        // console.log('成功')
        // console.log('add')
        if (rel.length <= 0) {
          return
        }else {
          for (var i = 0; i < rel.length; i++) {
            addDom(rel[i].content, i)
          }
        }
      },
      fail: function () {
        toast.show('获取数据失败！')
      },
      complete: function () {
        // console.log('完成')
      }
    })
  }
  var chooseid
  $(document).on('touchstart', '.label', function (e) {
    page = 1
    chooseid = e.target.id
    $('.label').removeClass('choosed')
    // $(this).addClass('choosed')
    e.target.className = 'label choosed'
    $('.card').empty()
    getBless(page, chooseid)
  })
  $(document).on('touchend', '.btn', function (e) { // 跳转制作卡片页面
    // console.log(e.currentTarget.className)
    var n = e.currentTarget.className.slice(7, 8)
    var val = document.getElementsByClassName('text')[n].innerHTML
    location.href = location.href.replace('index', 'card') + '?val=' + val
  })
  function stopDrop () { // 禁止滑动超出边界
    var lastY; // 最后一次y坐标点
    $(document.body).on('touchstart', function (event) {
      lastY = event.originalEvent.changedTouches[0].clientY; // 点击屏幕时记录最后一次Y坐标。
    })
    $(document.body).on('touchmove', function (event) {
      var y = event.originalEvent.changedTouches[0].clientY
      var st = $(this).scrollTop(); // 滚动条高度
      if (y >= lastY && st <= 1) { // 如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
        lastY = y
        $('.top').css('position', 'absolute')
        event.preventDefault()
      }else {
        $('.top').css('position', 'fixed')
      }
      lastY = y
    })
    $(document.body).on('touchend', function (event) {
      var y = event.originalEvent.changedTouches[0].clientY
      var st = $(this).scrollTop(); // 滚动条高度
      if (y >= lastY && st <= 1) { // 如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
        lastY = y
        $('.top').css('position', 'absolute')
        event.preventDefault()
      } else {
        $('.top').css('position', 'fixed')
      }
      lastY = y
    })
  }
  stopDrop()
  $.ajax({ // 获取祝福语标签信息
    url: 'https://wxpro.cqyouloft.com/v1/riddles/labels',
    type: 'GET',
    success: function (res) {
      // console.log(res.data)
      var data = res.data
      for (var i = 0; i < data.length; i++) {
        addLabel(data[i].id, data[i].name)
      }
      document.querySelector('.label').className = 'label choosed'
      chooseid = $('.label').eq(0).attr('id')
      page = 1
      getBless(page, chooseid)
      // if (browser.isIOS() && browser.getIOSVersion() < 11) {
        // var y = 0
        // document.addEventListener('touchstart', function (e) {
        //   y = e.touches[0].pageY
        // }, false)
        // var last_known_scroll_position = 0
        // var ticking = false
        // function doSomething (scroll_pos) {
        //   // do something with the scroll position
        //   // document.addEventListener('touchmove', scroll, false)
        //   // function scroll (e) {
        //   // e.preventDefault()
        //   window.scroll(0, y - scroll_pos + window.scrollY)
        //   // TODO ...
        //   console.log(window.scrollY)
        //   var scrollTop = $(this).scrollTop()
        //   var scrollHeight = $(document).height()
        //   var windowHeight = $(this).height()
        //   if (window.scrollY > 0) {
        //     $('.top').css('position', 'fixed')
        //   } else {
        //     $('.top').css('position', 'absolute')
        //   }
        //   if (scrollTop + windowHeight >= scrollHeight - 30) {
        //     page++
        //     getBless(page, chooseid)
        //   }
        // // }
        // }
        // window.addEventListener('touchmove', function (e) {
        //   e.preventDefault()
        //   var _y = e.touches[0].pageY
        //   last_known_scroll_position = window.scrollY
        //   if (!ticking) {
        //     window.requestAnimationFrame(function () {
        //       doSomething(_y)
        //       ticking = false
        //     })
        //   }
        //   ticking = true
        // })
        // document.addEventListener('touchmove', scroll, false)
        // function scroll (e) {
        //   e.preventDefault()
        //   window.scroll(0, y - e.touches[0].pageY + window.scrollY)
        //   // TODO ...
        //   var scrollTop = $(this).scrollTop()
        //   var scrollHeight = $(document).height()
        //   var windowHeight = $(this).height()
        //   if (window.scrollY > 0) {
        //     $('.top').css('position', 'fixed')
        //   } else {
        //     $('.top').css('position', 'absolute')
        //   }
        //   if (scrollTop + windowHeight >= scrollHeight - 30) {
        //     page++
        //     getBless(page, chooseid)
        //   }
        // }
      // }else {
      var last_known_scroll_position = 0
      var ticking = false
      function doSomething (scroll_pos) {
        var scrollTop = $(this).scrollTop()
        var scrollHeight = $(document).height()
        var windowHeight = $(this).height()
        // console.log($(window).scrollTop())
        // if (scrollTop > 0) {
        //   $('.top').css('position', 'fixed')
        // } else {
        //   $('.top').css('position', 'absolute')
        // }
        if (scrollTop + windowHeight >= scrollHeight - 30) {
          // alert("到底了")
          page++
          getBless(page, chooseid)
        }
      }
      window.addEventListener('scroll', function (e) {
        last_known_scroll_position = window.scrollY
        if (!ticking) {
          window.requestAnimationFrame(function () {
            doSomething(last_known_scroll_position)
            ticking = false
          })
        }
        ticking = true
      })
      // }
    },
    fail: function () {
      toast.show('获取数据失败')
    }
  })
})
