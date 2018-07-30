;(function () {
  var bezier = function (point) {
    if (!point.easing) {
      // t: 当前时间, b: 开始值默认为0, c:结束值默认为1 , d: 持续时间，x：公式没有用到
      this.easing = function (x, t, b, c, data) { return c * Math.sqrt(1 - (t = t / data - 1) * t) + b; } // easeOutCirc
    }else {
      this.easing = point.easing
    }
    this.fps = point.fps || 30; // 动画间隔
    this.time = - this.fps; // 动画进行的当前时间
    this.duration = point.duration; // 动画持续时间
    this.points = point.points; // 贝塞尔曲线控制点
    this.frame = point.frame; // 每帧执行函数
    this.complete = point.complete; // 动画完成执行函数
    this.timer = ''; // 动画定时器
    this.animate()
  }

  var fn = bezier.prototype
  fn.animate = function () {
    var that = this
    var f = function () {
      that.time = Math.min(that.duration, that.time + that.fps)
      var v = that.easing(1, that.time, 0, 1, that.duration)
      var np = that.bezierEquation(that.points, v)
      that.frame(np, v)
      if (that.time == that.duration) {
        clearInterval(that.timer)
        if (that.complete)
          that.complete()
      }
    }
    this.timer = setInterval(f, this.fps)
  }
  /**
   * 计算 组合值 C（n, m）
   **/
  fn.calcCnm = function (n, m) {
    if (m + m > n) {
      m = n - m
    }

    for (var i = 1,a = 1;i <= m;i++, n--) {
      a = a * n / i
    }
    return a
  }

  /**
   * 幂运算 t的k次方
   **/
  fn.calcMi = function (t, k) {
    var result = 1
    while(--k >= 0){
      result *= t
    }
    return result
  }

  /**
   * 贝塞尔曲线公式
   **/
  fn.bezierEquation = function (points, t) {
    var n = points.length - 1
    var resultX = 0
    var resulty = 0
    for (var i = 0; i <= n; ++i) {
      resultX += this.calcCnm(n, i) * this.calcMi(t, i) * this.calcMi(1 - t, n - i) * points[i].x
      resulty += this.calcCnm(n, i) * this.calcMi(t, i) * this.calcMi(1 - t, n - i) * points[i].y
    }

    return {x: resultX,y: resulty}
  }
  window.bezier = bezier
})()
export default bezier
