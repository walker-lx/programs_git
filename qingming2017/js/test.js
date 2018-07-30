function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r !== null) {
    return decodeURIComponent(r[2])
  }
  return null
}
// 获取随机数组
function getRandomArray (arr, num) {
  // 新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组
  var temp_array = [ ]
    for (var index in arr) {
      temp_array.push(arr[index])
    }
    // 取出的数值项,保存在此数组
    var return_array = [ ]
      for (var i = 0; i < num; i++) {
        // 判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length > 0) {
          // 在数组中产生一个随机索引
          var arrIndex = Math.floor(Math.random() * temp_array.length)
          // 将此随机索引的对应的数组元素值复制出来
          return_array[i] = temp_array[arrIndex]
          // 然后删掉此索引的数组元素,这时候temp_array变为新的数组
          temp_array.splice(arrIndex, 1)
        } else {
          // 数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
          break
        }
      }
      return return_array
    }

    // 检测表情
    function isEmojiCharacter (substring) {
      for (var i = 0; i < substring.length; i++) {
        var hs = substring.charCodeAt(i)
        if (0xd800 <= hs && hs <= 0xdbff) {
          if (substring.length > 1) {
            var ls = substring.charCodeAt(i + 1)
            var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000
            if (0x1d000 <= uc && uc <= 0x1f77f) {
              return true
            }
          }
        } else if (substring.length > 1) {
          var ls = substring.charCodeAt(i + 1)
          if (ls == 0x20e3) {
            return true
          }
        } else {
          if (0x2100 <= hs && hs <= 0x27ff) {
            return true
          } else if (0x2B05 <= hs && hs <= 0x2b07) {
            return true
          } else if (0x2934 <= hs && hs <= 0x2935) {
            return true
          } else if (0x3297 <= hs && hs <= 0x3299) {
            return true
          } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
            || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
            || hs == 0x2b50) {
            return true
          }
        }
      }
    }
    // 检测特殊字符
    function containSpecial (s) {
      var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/)
      return (containSpecial.test(s))
    }

    // 获取字符串长度
    function getByteLen (val) {
      var len = 0
      for (var i = 0; i < val.length; i++) {
        if (val[i].match(/[^x00-xff]/ig) != null)
          len += 2
        else
          len += 1
      }
      return len
    }

    // Toast
    function toast (text, ms) {
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

    $.fn.longPress = function (fn) {
      var timeout = undefined
      var $this = this
      for (var i = 0;i < $this.length;i++) {
        $this[i].addEventListener('touchstart', function (event) {
          timeout = setTimeout(fn, 800); // 长按时间超过800ms，则执行传入的方法
        }, false)
        $this[i].addEventListener('touchend', function (event) {
          clearTimeout(timeout); // 长按时间少于800ms，不会执行传入的方法
        }, false)
      }
    }

    var sharePic = getQueryString('sharePic')
    var shareOB, shareImage
    window.share = {
      title: '你收到一条来自好友的国庆标签！',
      friendTitle: '通知：你收到一条来自好友的国庆标签！',
      link: location.origin + '/guoqing2017/index.html?&share=1',
      imgUrl: location.origin + '/guoqing2017/img/male0.jpg',
      desc: '国庆长假这么嗨，查看属于自己的标签！'
    }
    shareOB = window.share

    $(function () {
      FastClick.attach(document.body)

      if (sharePic) {
        $('.resultPic').empty().append('<img src="' + sharePic + '" />')
        $('.page1').addClass('hidden')
        $('.againBtn, .shareBtn').addClass('hidden')
        $('.homeBtn').removeClass('hidden')
        $('.result').removeClass('hidden')
      }

      if (!WNLUtil.isWnl && !WNLUtil.isWeixin) {
        $('.shareBtn').addClass('hidden')
        $('.againBtn').css('margin', '0px')
      }

      $('.sex label').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected')
      })

      if (WNLUtil.isWeixin) {
        if (WNLUtil.isIOS) {
          _czc.push(['_trackEvent', 'guoqing2017_pageview_wx', 'view', 'ios'])
        }else if (WNLUtil.isAndroid) {
          _czc.push(['_trackEvent', 'guoqing2017_pageview_wx', 'view', 'az'])
        }
        $('.shareBtn button').text('告诉好友')
      }else if (WNLUtil.isWnl) {
        if (WNLUtil.isIOS) {
          _czc.push(['_trackEvent', 'guoqing2017_pageview_wnl', 'view', 'ios'])
        }else if (WNLUtil.isAndroid) {
          _czc.push(['_trackEvent', 'guoqing2017_pageview_wnl', 'view', 'az'])
        }
      }

      if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
          if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
            window.setTimeout(function () {
              document.activeElement.scrollIntoViewIfNeeded()
            }, 0)
          }
        })
      }

      $('#makeBtn').click(function () {
        var nickname = $.trim($('#nickname').val())
        var sex = $('.sex .selected').attr('data-sex')
        if (isEmojiCharacter(nickname) || containSpecial(nickname)) {
          toast('请不要输入特殊符号哦~')
          return false
        }
        if (getByteLen(nickname) < 3) {
          toast('输入的名字太短了吧~')
          return false
        }
        if (getByteLen(nickname) > 8) {
          toast('输入的名字太长了吧~')
          return false
        }

        $('.loading').removeClass('hidden')
        $('#makeBtn').text('正在生成...')
        if (WNLUtil.isWeixin) {
          if (WNLUtil.isIOS) {
            _czc.push(['_trackEvent', 'guoqing2017_make_wx', 'click', 'ios'])
          }else if (WNLUtil.isAndroid) {
            _czc.push(['_trackEvent', 'guoqing2017_make_wx', 'click', 'az'])
          }
        }else if (WNLUtil.isWnl) {
          if (WNLUtil.isIOS) {
            _czc.push(['_trackEvent', 'guoqing2017_make_wnl', 'click', 'ios'])
          }else if (WNLUtil.isAndroid) {
            _czc.push(['_trackEvent', 'guoqing2017_make_wnl', 'click', 'az'])
          }
        }

        $.ajax({
          url: 'https://msg.51wnl.com/api/Active/qintoken',
          dataType: 'JSON',
          type: 'GET',
          success: function (res) {
            console.log(res.token)
            var randomNum
            if (sex == 'male') {
              randomNum = Math.floor(Math.random() * 8)
            }else if (sex == 'female') {
              randomNum = Math.floor(Math.random() * 11)
            }
            var canvas = document.createElement('canvas')
            var ctx = canvas.getContext('2d')
            canvas.width = 750
            canvas.height = 915
            var canvasbg = new Image()
            canvasbg.src = 'img/' + sex + randomNum + '.jpg'
            canvasbg.onload = function () {
              ctx.drawImage(canvasbg, 0, 0, 750, 915)
              ctx.fillStyle = '#000'
              ctx.font = 'bold 34px -apple-system, "Helvetica Neue", "Helvetica", "STHeitiSC-Light", "Arial", sans-serif'
              ctx.textAlign = 'center'
              ctx.textBaseline = 'top'
              ctx.fillText(nickname + '的国庆标签', 375, 125)
              var imgdata = canvas.toDataURL('image/jpeg', 0.6)
              $('.resultPic').empty().append('<img src="' + imgdata + '" />')
              $('.page1, .loading').addClass('hidden')
              $('.result').removeClass('hidden')

              imgdata = imgdata.substring(23)

              var url = '//upload.qiniu.com/putb64/-1'; // 非华东空间需要根据注意事项 1 修改上传域名
              var xhr = new XMLHttpRequest()
              xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                  console.log(xhr.responseText)
                  var resData = JSON.parse(xhr.responseText)
                  var resultImg = new Image()
                  resultImg.src = 'https://qiniu.image.cq-wnl.com/' + resData.key
                  resultImg.onload = function () {
                    $('.resultPic').empty().append('<img src="' + resultImg.src + '" />')
                    // $('.page1, .loading').addClass('hidden')
                    // $('.result').removeClass('hidden')
                    if (WNLUtil.isWeixin) {
                      if (WNLUtil.isIOS) {
                        _czc.push(['_trackEvent', 'guoqing2017_made_wx', 'click', 'ios'])
                      }else if (WNLUtil.isAndroid) {
                        _czc.push(['_trackEvent', 'guoqing2017_made_wx', 'click', 'az'])
                      }
                    }else if (WNLUtil.isWnl) {
                      if (WNLUtil.isIOS) {
                        _czc.push(['_trackEvent', 'guoqing2017_made_wnl', 'click', 'ios'])
                      }else if (WNLUtil.isAndroid) {
                        _czc.push(['_trackEvent', 'guoqing2017_made_wnl', 'click', 'az'])
                      }
                    }
                  }
                  shareImage = 'https://qiniu.image.cq-wnl.com/' + resData.key
                  shareOB = shareImage
                  share.title = '神准！我的国庆标签太扎心！'
                  share.friendTitle = '神准！我的国庆标签太扎心！'
                  share.desc = '国庆长假这么嗨，查看属于自己的标签！'
                  share.link = location.origin + '/guoqing2017/index.html?sharePic=https://qiniu.image.cq-wnl.com/' + resData.key
                  setShareInfo()
                }
              }
              xhr.open('POST', url, true)
              xhr.setRequestHeader('Content-Type', 'application/octet-stream')
              xhr.setRequestHeader('Authorization', 'UpToken ' + res.token)
              xhr.send(imgdata)

            // $.ajax({
            //     url: location.protocol + '//msg.51wnl.com/index.php/Asset/ImageLoader/ltt',
            //     type: 'POST',
            //     data: {"img": imgdata},
            //     dataType: 'JSON',
            //     success: function(result){
            //         var resultImg = new Image()
            //         resultImg.src = result.data.url
            //         resultImg.onload = function(){
            //             $('.resultPic').empty().append('<img src="'+result.data.url+'" />')
            //             $('.page1, .loading').addClass('hidden')
            //             $('.result').removeClass('hidden')
            //             if (WNLUtil.isWeixin) {
            //                 if (WNLUtil.isIOS) {
            //                     _czc.push(['_trackEvent', 'guoqing2017_made_wx', 'click', 'ios'])
            //                 }else if (WNLUtil.isAndroid) {
            //                     _czc.push(['_trackEvent', 'guoqing2017_made_wx', 'click', 'az'])
            //                 }
            //             }else if (WNLUtil.isWnl) {
            //                 if (WNLUtil.isIOS) {
            //                     _czc.push(['_trackEvent', 'guoqing2017_made_wnl', 'click', 'ios'])
            //                 }else if (WNLUtil.isAndroid) {
            //                     _czc.push(['_trackEvent', 'guoqing2017_made_wnl', 'click', 'az'])
            //                 }
            //             }
            //         }
            //         shareImage = result.data.url
            //         shareOB = shareImage
            //         share.title = '神准！我的国庆标签太扎心！'
            //         share.friendTitle = '神准！我的国庆标签太扎心！'
            //         share.desc = '国庆长假这么嗨，查看属于自己的标签！'
            //         share.link = location.origin + '/guoqing2017/index.html?sharePic='+result.data.url
            //         setShareInfo()
            //     },
            //     error: function(){
            //         $('#makeBtn').text('生成我的分析')
            //         $('.loading').addClass('hidden')
            //         toast('当前参与人数过多，请稍后重试~')
            //     }
            // })
            }
          }

        })

        // var randomNum
        // if (sex == 'male') {
        //     randomNum = Math.floor(Math.random()*8)
        // }else if (sex == 'female') {
        //     randomNum = Math.floor(Math.random()*11)
        // }
        // var canvas = document.createElement('canvas')
        // var ctx = canvas.getContext('2d')
        // canvas.width = 750
        // canvas.height = 915
        // var canvasbg = new Image()
        // canvasbg.src = 'img/'+sex+randomNum+'.jpg'
        // canvasbg.onload = function(){
        //     ctx.drawImage(canvasbg, 0, 0, 750, 915)
        //     ctx.fillStyle = '#000'
        //     ctx.font = 'bold 34px -apple-system, "Helvetica Neue", "Helvetica", "STHeitiSC-Light", "Arial", sans-serif'
        //     ctx.textAlign = 'center'
        //     ctx.textBaseline = 'top'
        //     ctx.fillText(nickname+'的国庆标签', 375, 125)
        //     var imgdata = canvas.toDataURL("image/jpeg", 0.6)
        //     $.ajax({
        //         url: location.protocol + '//msg.51wnl.com/index.php/Asset/ImageLoader/ltt',
        //         type: 'POST',
        //         data: {"img": imgdata},
        //         dataType: 'JSON',
        //         success: function(result){
        //             var resultImg = new Image()
        //             resultImg.src = result.data.url
        //             resultImg.onload = function(){
        //                 $('.resultPic').empty().append('<img src="'+result.data.url+'" />')
        //                 $('.page1, .loading').addClass('hidden')
        //                 $('.result').removeClass('hidden')
        //                 if (WNLUtil.isWeixin) {
        //                     if (WNLUtil.isIOS) {
        //                         _czc.push(['_trackEvent', 'guoqing2017_made_wx', 'click', 'ios'])
        //                     }else if (WNLUtil.isAndroid) {
        //                         _czc.push(['_trackEvent', 'guoqing2017_made_wx', 'click', 'az'])
        //                     }
        //                 }else if (WNLUtil.isWnl) {
        //                     if (WNLUtil.isIOS) {
        //                         _czc.push(['_trackEvent', 'guoqing2017_made_wnl', 'click', 'ios'])
        //                     }else if (WNLUtil.isAndroid) {
        //                         _czc.push(['_trackEvent', 'guoqing2017_made_wnl', 'click', 'az'])
        //                     }
        //                 }
        //             }
        //             shareImage = result.data.url
        //             shareOB = shareImage
        //             share.title = '神准！我的国庆标签太扎心！'
        //             share.friendTitle = '神准！我的国庆标签太扎心！'
        //             share.desc = '国庆长假这么嗨，查看属于自己的标签！'
        //             share.link = location.origin + '/guoqing2017/index.html?sharePic='+result.data.url
        //             setShareInfo()
        //         },
        //         error: function(){
        //             $('#makeBtn').text('生成我的分析')
        //             $('.loading').addClass('hidden')
        //             toast('当前参与人数过多，请稍后重试~')
        //         }
        //     })
        // }

      })

      $('.resultPic').longPress(function () {
        if (WNLUtil.isWeixin) {
          if (WNLUtil.isIOS) {
            _czc.push(['_trackEvent', 'guoqing2017_imgpress_wx', 'press', 'ios'])
          }else if (WNLUtil.isAndroid) {
            _czc.push(['_trackEvent', 'guoqing2017_imgpress_wx', 'press', 'az'])
          }
        }else if (WNLUtil.isWnl) {
          if (WNLUtil.isIOS) {
            _czc.push(['_trackEvent', 'guoqing2017_imgpress_wnl', 'press', 'ios'])
          }else if (WNLUtil.isAndroid) {
            _czc.push(['_trackEvent', 'guoqing2017_imgpress_wnl', 'press', 'az'])
          }
        }
      })

      $('.homeBtn').click(function () {
        if (WNLUtil.isWeixin) {
          if (WNLUtil.isIOS) {
            _czc.push(['_trackEvent', 'guoqing2017_home_wx', 'click', 'ios'])
          }else if (WNLUtil.isAndroid) {
            _czc.push(['_trackEvent', 'guoqing2017_home_wx', 'click', 'az'])
          }
        }else if (WNLUtil.isWnl) {
          if (WNLUtil.isIOS) {
            _czc.push(['_trackEvent', 'guoqing2017_home_wnl', 'click', 'ios'])
          }else if (WNLUtil.isAndroid) {
            _czc.push(['_trackEvent', 'guoqing2017_home_wnl', 'click', 'az'])
          }
        }
        location.href = 'index.html?fr=share'
      })

      $('.againBtn').click(function () {
        if (WNLUtil.isWeixin) {
          if (WNLUtil.isIOS) {
            _czc.push(['_trackEvent', 'guoqing2017_again_wx', 'click', 'ios'])
          }else if (WNLUtil.isAndroid) {
            _czc.push(['_trackEvent', 'guoqing2017_again_wx', 'click', 'az'])
          }
        }else if (WNLUtil.isWnl) {
          if (WNLUtil.isIOS) {
            _czc.push(['_trackEvent', 'guoqing2017_again_wnl', 'click', 'ios'])
          }else if (WNLUtil.isAndroid) {
            _czc.push(['_trackEvent', 'guoqing2017_again_wnl', 'click', 'az'])
          }
        }
        $('.result').addClass('hidden')
        $('#makeBtn').text('生成我的分析')
        $('.page1').removeClass('hidden')

        window.share = {
          title: '你收到一条来自好友的国庆标签！',
          friendTitle: '通知：你收到一条来自好友的国庆标签！',
          link: location.origin + '/guoqing2017/index.html?&share=1',
          imgUrl: location.origin + '/guoqing2017/img/male0.jpg',
          desc: '国庆长假这么嗨，查看属于自己的标签！'
        }
        shareOB = window.share
      })

      // 分享按钮
      $('.shareBtn').click(function () {
        if (WNLUtil.isWnl) {
          if ((WNLUtil.isIOS && WNLUtil.appVersion <= 450) || (WNLUtil.isAndroid && WNLUtil.appVersion <= 451)) {
            WNLUtil.setShareDataOld({
              pureText: share.title,
              text: share.title,
              image: '0',
              url: share.link,
              targetUrl: share.link,
              imageURL: share.imgUrl
            })
            appCallback_share()
            if (WNLUtil.isIOS) {
              _czc.push(['_trackEvent', 'guoqing2017_oldshare_ios', 'click'])
            }else if (WNLUtil.isAndroid) {
              _czc.push(['_trackEvent', 'guoqing2017_oldshare_android', 'click'])
            }
          }else {
            $('.sharemask, .wnl-sharetool').removeClass('hidden')
            setWnlShare(shareImage)
            if (WNLUtil.isIOS) {
              _czc.push(['_trackEvent', 'guoqing2017_newshare_ios', 'click'])
            }else if (WNLUtil.isAndroid) {
              _czc.push(['_trackEvent', 'guoqing2017_newshare_android', 'click'])
            }
          }
        }
        else if (WNLUtil.isWeixin) {
          if (WNLUtil.isIOS) {
            _czc.push(['_trackEvent', 'guoqing2017_wxsharebtn_ios', 'click'])
          } else if (WNLUtil.isAndroid) {
            _czc.push(['_trackEvent', 'guoqing2017_wxsharebtn_android', 'click'])
          }
          $('.showShareMask').removeClass('hidden')
        }
      })

      $('.showShareMask').click(function () {
        $(this).addClass('hidden')
      })

      $('.sharemask, .cancle-share').click(function () {
        $('.sharemask, .wnl-sharetool').addClass('hidden')
      })

      wx.ready(function () {
        setShareInfo()
      })
    })

    function setShareInfo () {
      // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
      wx.onMenuShareTimeline({
        title: share.title, // 分享标题
        link: share.link, // 分享链接
        imgUrl: share.imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          $('.showShareMask').addClass('hidden')
          if (WNLUtil.isIOS) {
            _czc.push(['_trackEvent', 'guoqing2017_wxshare_timeline', 'click', 'ios'])
          } else if (WNLUtil.isAndroid) {
            _czc.push(['_trackEvent', 'guoqing2017_wxshare_timeline', 'click', 'az'])
          }
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
      wx.onMenuShareAppMessage({
        title: share.friendTitle, // 分享标题
        desc: share.desc, // 分享描述
        link: share.link, // 分享链接
        imgUrl: share.imgUrl, // 分享图标
        // type: '', // 分享类型,music、video或link，不填默认为link
        // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
          $('.showShareMask').addClass('hidden')
          if (WNLUtil.isIOS) {
            _czc.push(['_trackEvent', 'guoqing2017_wxshare_appmessage', 'click', 'ios'])
          } else if (WNLUtil.isAndroid) {
            _czc.push(['_trackEvent', 'guoqing2017_wxshare_appmessage', 'click', 'az'])
          }
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
      wx.onMenuShareQQ({
        title: share.title, // 分享标题
        desc: share.desc, // 分享描述
        link: share.link, // 分享链接
        imgUrl: share.imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          $('.showShareMask').addClass('hidden')
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
    }

    function shareCallback (state) {
      $('.sharemask, .wnl-sharetool').addClass('hidden')
      if (WNLUtil.isAndroid) {
        _czc.push(['_trackEvent', 'guoqing2017_appshare_android', 'click'])
      }
      else if (WNLUtil.isIOS) {
        _czc.push(['_trackEvent', 'guoqing2017_appshare_ios', 'click'])
      }
    }

    function showWnlShareTool () {
      $('.sharemask, .wnl-sharetool').removeClass('hidden')
      setWnlShare(shareOB)
    }
    function setWnlShare (param) {
      if (typeof param == 'string') {
        $('.weixin').click(function () {
          WNLUtil.setShareDataForImage('weixin', param)
          window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject))
        })
        $('.weixin_circle').click(function () {
          WNLUtil.setShareDataForImage('weixin_circle', param)
          window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject))
        })
        $('.qq').click(function () {
          WNLUtil.setShareDataForImage('qq', param)
          window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject))
        })
        $('.weibo').click(function () {
          WNLUtil.setShareDataForImage('sina', param)
          window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject))
        })
      }else if (typeof param == 'object') {
        $('.weixin').click(function () {
          WNLUtil.setShareData('weixin', {
            title: share.title,
            text: share.desc,
            image: share.imgUrl,
            url: share.link
          })
          console.log(WNLUtil.shareObject)
          window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject))
        })
        $('.weixin_circle').click(function () {
          WNLUtil.setShareData('weixin_circle', {
            title: share.title,
            text: share.desc,
            image: share.imgUrl,
            url: share.link
          })
          window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject))
        })
        $('.qq').click(function () {
          WNLUtil.setShareData('qq', {
            title: share.title,
            text: share.desc,
            image: share.imgUrl,
            url: share.link
          })
          window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject))
        })
        $('.weibo').click(function () {
          WNLUtil.setShareData('sina', {
            title: share.title,
            text: share.desc,
            image: share.imgUrl,
            url: share.link
          })
          window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject))
        })
      }
    }
