window.share = {
    title: "我已经购买了预知未来的年货大礼包，你呢？",
    friendTitle: '我已经购买了预知未来的年货大礼包，你呢？',
    text: "新年到底旺不旺，赶紧打开望一望",
    url: "https://mobile.51wnl.com/numberology/dalibao/index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&channel=[CHANNEL]&posId=[posId]&boundId=[BUNDLE]",
    imgUrl: "https://mobile.51wnl.com/numberology/dalibao/img/toutu.jpg"
};
if(location.href.indexOf('result')!== -1){
    window.share.url = location.href;
}
$('.sharemask, .cancle-share').click(function () {
    $('.sharemask, .wnl-sharetool').addClass('hidden');
});
wx.ready(function () { //微信分享
        setShareInfo();
});

// // 隐藏分享
// if (window.ylwindow) {
//     window.ylwindow.enableShare(false);
// }
// function appCallback_showShare() {
//     return 0;
// }

// 微信分享
function setShareInfo() {
    //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    wx.onMenuShareTimeline({
        title: window.share.title, // 分享标题
        link: window.share.url, // 分享链接
        imgUrl: window.share.imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            $('.showShareMask').addClass('hidden');
        },
        cancel: function () {
            // 自定义用户取消分享后执行的回调函数
        }
    });

    //获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.onMenuShareAppMessage({
        title: window.share.friendTitle, // 分享标题(引用分享给朋友之后的标题)
        desc: window.share.text, // 分享描述
        link: window.share.url, // 分享链接
        imgUrl: window.share.imgUrl, // 分享图片地址
        //type: '', // 分享类型,music、video或link，不填默认为link
        //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            $('.showShareMask').addClass('hidden');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    //获取“分享到QQ”按钮点击状态及自定义分享内容接口
    wx.onMenuShareQQ({
        title: window.share.title, // 分享标题
        desc: window.share.text, // 分享描述
        link: window.share.url, // 分享链接
        imgUrl: window.share.imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            $('.showShareMask').addClass('hidden');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}

// newshare
function shareCallback(state) {
    $('.sharemask, .wnl-sharetool').addClass('hidden');
    $('.redpackage-mask').addClass('hidden');
}

function showWnlShareTool() {
    $('.sharemask, .wnl-sharetool').removeClass('hidden');
    setWnlShare(window.share);
}

function setWnlShare(param) {
    if (typeof param == 'string') {
        $('.weixin').click(function () {
            WNLUtil.setShareDataForImage('weixin', param);
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.weixin_circle').click(function () {
            WNLUtil.setShareDataForImage('weixin_circle', param);
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.qq').click(function () {
            WNLUtil.setShareData('qq', {
                title: window.share.title,
                text: window.share.title,
                image: param,
                url: window.share.url,
            });
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.weibo').click(function () {
            WNLUtil.setShareDataForImage('sina', param);
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
    } else if (typeof param == 'object') {
        $('.weixin').click(function () {
            WNLUtil.setShareData('weixin', {
                title: window.share.title,
                text: window.share.text,
                image: window.share.imgUrl,
                url: window.share.url,
            });
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.weixin_circle').click(function () {
            WNLUtil.setShareData('weixin_circle', {
                title: window.share.title,
                text: window.share.text,
                image: window.share.imgUrl,
                url: window.share.url
            });
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.qq').click(function () {
            WNLUtil.setShareData('qq', {
                title: window.share.title,
                text: window.share.text,
                image: window.share.imgUrl,
                url: window.share.url
            });
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.weibo').click(function () {
            WNLUtil.setShareData('sina', {
                title: window.share.title,
                text: window.share.text,
                image: window.share.imgUrl,
                url: window.share.url
            });
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
    }
}