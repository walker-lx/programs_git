let _compData = {
  '_toast_.isHide': false,// 控制组件显示隐藏
  '_toast_.content': ''// 显示的内容
}
let toastPannel = {
  // toast显示的方法
  show: function (data) {
    let self = this;
    this.setData({ '_toast_.isHide': true, '_toast_.content': data });
    setTimeout(function () {
      self.setData({ '_toast_.isHide': false })
    }, 1500)
  }
}
function ToastPannel() {
  let pages = getCurrentPages();
  let curPage = pages[pages.length - 1];
  this.__page = curPage;
  Object.assign(curPage, toastPannel);
  curPage.toastPannel = this;
  curPage.setData(_compData);
  return this;
}
module.exports = {
  ToastPannel
}

