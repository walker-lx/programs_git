function drawText (str, ctx, initX, initY) {
  var linewidth = 5
  var lastindex = 0
  var initheight = 250
  var w = document.body.offsetWidth - 50
  initY = initY || initheight
  ctx.beginPath()
  ctx.shadowBlur = 0
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
  ctx.font = '16px Arial'
  ctx.fillStyle = '#333'
  for (var i = 0, len = str.length; i < len; i++) {
    linewidth = linewidth + ctx.measureText(str[i]).width + 3
    if (linewidth > w) {
      ctx.fillText(str.substring(lastindex, i), initX, initY)
      initY = initY + 32
      linewidth = 5
      lastindex = i
    }
    if (i === str.length - 1) {
      ctx.fillText(str.substring(lastindex, i + 1), initX, initY)
    }
  }
  ctx.closePath()
}
$(function () {
  var picsrc
  function drawPic (imgsrc, width, height, x, y) {
    var img = new Image()
    img.onload = function () {
      ctx.beginPath()
      ctx.drawImage(img, x, y, width, height)
      ctx.closePath()
    }
    img.src = imgsrc
  }
  var canvas = document.querySelector('#canvas')
  var ctx = canvas.getContext('2d')
  var _w = document.body.offsetWidth
  canvas.width = _w - 50
  // console.log(document.querySelector('.text').scrollHeight)
  function drawRel (n) {
    var y
    var centerh
    var textH = document.querySelector('.text').scrollHeight
    if (n == 1) {
      // centerh = document.querySelector('.bottom1').scrollHeight + document.querySelector('.center1').offsetHeight
      centerh = textH < (_w - 50) * ((1329 - 881 - 329) / 975) ? (_w - 50) * ((1329 - 881 - 329) / 975) : textH
      y = (_w - 50) * (881 / 975)
      canvas.height = y + (_w - 50) * (329 / 975) + centerh
      canvas.width = canvas.width * 3
      canvas.height = canvas.height * 3
      ctx.scale(3, 3)
      drawPic('img/1-1.jpg', _w - 50, (_w - 50) * (881 / 975), 0, 0)
      drawPic('img/1-2.jpg', _w - 50, centerh, 0, y)
      drawPic('img/1-3.jpg', _w - 50, (_w - 50) * (329 / 975), 0, centerh + y)
      setTimeout(function () {
        drawText(editText, document.querySelector('#canvas').getContext('2d'), 25, y)
      }, 1500)
    }
    else if (n == 2) {
      centerh = textH < (_w - 50) * (100 / 975) ? (_w - 50) * (100 / 975) : textH
      y = (_w - 50) * (900 / 975)
      canvas.height = y + centerh + (_w - 50) * (329 / 975)
      canvas.width = canvas.width * 3
      canvas.height = canvas.height * 3
      // console.log(centerh + y)
      ctx.scale(3, 3)
      drawPic('img/2-1.jpg', _w - 50, (_w - 50) * (900 / 975), 0, 0)
      drawPic('img/2-2.jpg', _w - 50, centerh, 0, y)
      drawPic('img/2-3.jpg', _w - 50, (_w - 50) * (329 / 975), 0, y + centerh)
      setTimeout(function () {
        drawText(editText, document.querySelector('#canvas').getContext('2d'), 25, y)
      }, 1500)
    }else {
      centerh = textH < (_w - 50) * ((1329 - 597 - 286) / 975) ? (_w - 50) * ((1329 - 597 - 286) / 975) : textH
      y = (_w - 50) * (597 / 975)
      canvas.height = y + (_w - 50) * (286 / 975) + centerh
      canvas.width = canvas.width * 3
      canvas.height = canvas.height * 3
      ctx.scale(3, 3)
      drawPic('img/3-1.jpg', _w - 50, (_w - 50) * (597 / 975), 0, 0)
      drawPic('img/3-2.jpg', _w - 50, centerh, 0, y)
      drawPic('img/3-3.jpg', _w - 50, (_w - 50) * (286 / 975), 0, centerh + y)
      setTimeout(function () {
        drawText(editText, document.querySelector('#canvas').getContext('2d'), 25, y + 20)
      }, 1500)
    }
    console.log(canvas.height)
  }
  window.onresize = function () {
    $('textarea').focus(function () {
      document.querySelector('.swiper-container').scrollIntoView(true)
    })
    document.querySelector('.swiper-container').scrollIntoView(true)
  }
  $('.finish').click(function () {
    // drawPic()
    toast('图片生成中...', 2500)
    console.log(index)
    drawRel(index)
    setTimeout(function () {
      picsrc = canvas.toDataURL('image/jpeg', 0.6)
      $('#img').attr('src', picsrc)
      // $('#img').css('background', 'url(' + picsrc + ') no-rereat center')
      $('.swiper-container, .tip, .finish').addClass('hidden')
      $('.rel').removeClass('hidden')
      $('.longpress').removeClass('hidden')
    }, 2500)
  })
})
