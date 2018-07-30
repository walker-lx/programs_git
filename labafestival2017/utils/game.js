var board = []
function setpostop (i) { // 设置图片距离顶部的位置
  return i * 120 + 'px'
}
function setposleft (j) { // 设置图片距离左边的位置
  return j * 120 + 'px'
}
function nomove (board) {
  if (canmovedown() || canmoveleft() || canmoveup() || canmoveright()) {
    return false
  }
  return true
}
function canmoveleft (l, t) {
  var left = parseInt(l.replace('px', ''))
  var top = parseInt(t.replace('px', ''))
  var left_i = left / 120
  var top_i = top / 120
  if (left_i <= 0) {
    return false
  }
  else if (board[top_i][left_i - 1] !== 0) {
    return false
  }
  else {
    return true
  }
}
function canmoveright (l,t) {
  var left = parseInt(l.replace('px', ''))
  var top = parseInt(t.replace('px', ''))
  var left_i = left / 120
  var top_i = top / 120
  if (left_i >= 2) {
    return false
  }
  else if (board[top_i][left_i + 1] !== 0) {
    return false
  }
  else {
    return true
  }
}
function canmoveup (l, t) {
  var left = parseInt(l.replace('px', ''))
  var top = parseInt(t.replace('px', ''))
  var left_i = left / 120
  var top_i = top / 120
  if (top_i <= 0) {
    return false
  }
  else if (board[top_i - 1][left_i] !== 0) {
    return false
  }
  else {
    return true
  }
}
function canmovedown (l, t) {
  var left = parseInt(l.replace('px', ''))
  var top = parseInt(t.replace('px', ''))
  var left_i = left / 120
  var top_i = top / 120
  if (top_i >= 2) {
    return false
  }
  else if (board[top_i + 1][left_i] !== 0) {
    return false
  }
  else {
    return true
  }
  // for (var i = 0; i < 3; i++) {
  //   for (var j = 0; j < 3; j++) {
  //     if (board[2][j] === 1) {
  //       return false
  //     }
  //     else if (board[i][j] !== 0) {
  //       if (board[i][j + 1] === 0) {
  //         return true
  //       }
  //     }
  //   }
  // }
  // return false
}
function moveright (l, t, el) {
  var left = parseInt(l.replace('px', ''))
  var top = parseInt(t.replace('px', ''))
  var left_i = left / 120
  var top_i = top / 120
  board[top_i][left_i] = 0
  board[top_i][left_i + 1] = 1
  el.css('left', left + 120)
}
function moveup (l, t, el) {
  var left = parseInt(l.replace('px', ''))
  var top = parseInt(t.replace('px', ''))
  var left_i = left / 120
  var top_i = top / 120
  board[top_i][left_i] = 0
  board[top_i - 1][left_i] = 1
  el.css('top', top - 120)
}
function moveleft (l, t, el) {
  var left = parseInt(l.replace('px', ''))
  var top = parseInt(t.replace('px', ''))
  var left_i = left / 120
  var top_i = top / 120
  board[top_i][left_i] = 0
  board[top_i][left_i - 1] = 1
  el.css('left', left - 120)
}
function movedown (l, t, el) {
  var left = parseInt(l.replace('px', ''))
  var top = parseInt(t.replace('px', ''))
  var left_i = left / 120
  var top_i = top / 120
  board[top_i][left_i] = 0
  board[top_i + 1][left_i] = 1
  el.css('top', top + 120)
}
function getimgtop (el) { // 获取图片位置

}
function getimgleft (el) {
}
function getrandomimg (imglist) { // 随机位置生成图片
  var randx = parseInt(Math.floor(Math.random() * 3))
  var randy = parseInt(Math.floor(Math.random() * 3))
  var imgnum = 1
  console.log(randx, 'x')
  console.log(randy, 'y')
  // var num = parseInt(Math.floor(Math.random() * imglist.length))
  $('#demo').append('<div class="test" id="t0">')
  var imgdiv = $('#t0')
  imgdiv.css({
    'left': setposleft(randx),
    'top': setpostop(randy),
    // 'background-image': 'url("' + imglist[num] + '")'
    'background': imglist[0]
  })
  board[randy][randx] = 1
  // imglist.splice(0, 1)
  // var imgnum = imglist[num].slice(7, 8)
  for (var m = 0; m < 3; m++) {
    for (var n = 0; n < 3; n++) {
      if (board[m][n] === 1) {
        continue
      }
      $('#demo').append('<div class="test" id="t' + imgnum + '">')
      var _imgdiv = $('#t' + imgnum)
      _imgdiv.css({
        'left': setposleft(n),
        'top': setpostop(m),
        // 'background-image': 'url("' + imglist[num] + '")'
        'background': imglist[imgnum]
      })
      board[m][n] = 1
      // imglist.splice(imgnum, 1)
      imgnum++
      if (imgnum >= 8) {
        break
      }
    }
  }
}
function init () { // 初始化拼图视图
  for (var i = 0; i < 3; i++) {
    board[i] = []
    for (var j = 0; j < 3; j++) {
      board[i][j] = 0
    }
  }
  // var imglist = ['img/img0.png', 'img/img1.png', 'img/img2.png', 'img/img3.png', 'img/img4.png', 'img/img5.png', 'img/img6.png', 'img/img7.png']
  var imglist = ['red', 'black', 'blue', 'green', 'gray', 'yellow', 'orange', 'brown']
  getrandomimg(imglist)
  // console.log(board)
}
