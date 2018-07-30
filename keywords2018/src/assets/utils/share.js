
export default function setWnlShare (param) {
  if (typeof param === 'string') {
    document.querySelector('.weixin').onclick = function () {
      window.WNLUtil.setShareDataForImage('weixin', param)
      window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(window.WNLUtil.shareObject))
    }
    document.querySelector('.weixin_circle').onclick = function () {
      window.WNLUtil.setShareDataForImage('weixin_circle', param)
      window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(window.WNLUtil.shareObject))
    }
    document.querySelector('.qq').onclick = function () {
      window.WNLUtil.setShareData('qq', {
        title: share.title,
        text: share.title,
        image: param,
        url: share.link
      })
      window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(window.WNLUtil.shareObject))
    }
    document.querySelector('.weibo').onclick = function () {
      window.WNLUtil.setShareDataForImage('sina', param)
      window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(window.WNLUtil.shareObject))
    }
  }
  else if (typeof param === 'object') {
    document.querySelector('.weixin').onclick = function () {
      window.WNLUtil.setShareData('weixin', {
        title: share.title,
        text: share.desc,
        image: share.imgUrl,
        url: share.link
      })
      window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(window.WNLUtil.shareObject))
    }
    document.querySelector('.weixin_circle').onclick = function () {
      window.WNLUtil.setShareData('weixin_circle', {
        title: share.title,
        text: share.desc,
        image: share.imgUrl,
        url: share.link
      })
      window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(window.WNLUtil.shareObject))
    }
    document.querySelector('.qq').onclick = function () {
      window.WNLUtil.setShareData('qq', {
        title: share.title,
        text: share.desc,
        image: share.imgUrl,
        url: share.link
      })
      window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(window.WNLUtil.shareObject))
    }
    document.querySelector('.weibo').onclick = function () {
      window.WNLUtil.setShareData('sina', {
        title: share.title,
        text: share.desc,
        image: share.imgUrl,
        url: share.link
      })
      window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(window.WNLUtil.shareObject))
    }
  }
}
