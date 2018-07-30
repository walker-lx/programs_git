
window.share = {
	title : '2017最火游戏！不能不玩的游戏合集！',//设置分享的题目
	friendTitle : '2017最热门的在线手机游戏！',//分享之后显示的题目
	link : 'https://b.cqyouloft.com/gamecenter/album.html?share=1',//分享链接
	imgUrl : 'https://b.cqyouloft.com/gamecenter/img/share.jpg',//图片的链接
	desc : '占领排行榜的超热门！不玩你就亏大了！'//附加的描述信息
};
var shareOB = window.share,shareImage;

$(function() {
    FastClick.attach(document.body);
	// WNLUtil.isIOS ? location.href = 'https://b.cqyouloft.com/gamecenter/album.html&ios_zt=1' : WNLUtil.isAndroid,
	// location.href = 'https://b.cqyouloft.com/gamecenter/album.html';
    
	$('.cqimg,.chuanqi').click(function(){
		if(WNLUtil.isAndroid) {
			location.href = 'http://www.51wnl.com/gamecentertest/index.html#/detail/135'
		}else if(WNLUtil.isIOS) {
			location.href = 'http://www.51wnl.com/gamecentertest/index.html#/detail/48?ios_zt=1'
		}
        // window.location.href = "http://www.51wnl.com/gamecenter/index.html#/detail/135";
    });

    $('.ssimg,.shengshi').click(function(){
		if(WNLUtil.isAndroid) {
			location.href = 'http://www.51wnl.com/gamecentertest/index.html#/detail/141'
		}else if(WNLUtil.isIOS) {
			location.href = 'http://www.51wnl.com/gamecentertest/index.html#/detail/54?ios_zt=1'
		}
        // window.location.href = "http://www.51wnl.com/gamecenter/index.html#/detail/141";
    })

    $('.hcimg,.huancheng').click(function(){
		if(WNLUtil.isAndroid) {
			location.href = 'http://www.51wnl.com/gamecentertest/index.html#/detail/334'
		}else if(WNLUtil.isIOS) {
			location.href = 'http://www.51wnl.com/gamecentertest/index.html#/detail/333?ios_zt=1'
		}
        //window.location.href = "http://www.51wnl.com/gamecenter/index.html#/detail/334";
    })

    $('.lmimg,.lianmeng').click(function(){
		if(WNLUtil.isAndroid) {
			location.href = 'http://www.51wnl.com/gamecentertest/index.html#/detail/182'
		}else if(WNLUtil.isIOS) {
			location.href = 'http://www.51wnl.com/gamecentertest/index.html#/detail/181?ios_zt=1'
		}
        //window.location.href = "http://www.51wnl.com/gamecenter/index.html#/detail/182";
    })

    $('.kdimg,.koudai').click(function(){
		if(WNLUtil.isAndroid) {
			location.href = 'http://www.51wnl.com/gamecentertest/index.html#/detail/190'
		}else if(WNLUtil.isIOS) {
			location.href = 'http://www.51wnl.com/gamecentertest/index.html#/detail/189?ios_zt=1'
		}
        //window.location.href = "http://www.51wnl.com/gamecenter/index.html#/detail/190";
    })

	//万年历分享工具设置
	$('.showShareMask').click(function(){
		$(this).addClass('hidden');
	});

	$('.sharemask, .cancle-share').click(function(){
		$('.sharemask, .wnl-sharetool').addClass('hidden');
	});

    wx.ready(function() {  //微信分享
		setShareInfo();
	});
})

function setShareInfo() {
	//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
	wx.onMenuShareTimeline({
		title: share.title, // 分享标题
		link: share.link, // 分享链接
		imgUrl: share.imgUrl, // 分享图标
		success: function () {
			// 用户确认分享后执行的回调函数
			_czc.push(['_trackEvent', 'gamecenter_wxshare_timeline', 'click']);//统计分享次数，后台可查看
		},
		cancel: function () {
			// 自定义用户取消分享后执行的回调函数
		}
	});

	//获取“分享给朋友”按钮点击状态及自定义分享内容接口
	wx.onMenuShareAppMessage({
		title: share.friendTitle, // 分享标题(引用分享给朋友之后的标题)
		desc: share.desc, // 分享描述
		link: share.link, // 分享链接
		imgUrl: share.imgUrl, // 分享图片地址
		//type: '', // 分享类型,music、video或link，不填默认为link
		//dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () {
			// 用户确认分享后执行的回调函数
			$('.showShareMask').addClass('hidden');
			_czc.push(['_trackEvent', 'gamecenter_wxshare_appmessage', 'click']);
		},
		cancel: function () {
			// 用户取消分享后执行的回调函数
		}
	});

	//获取“分享到QQ”按钮点击状态及自定义分享内容接口
	wx.onMenuShareQQ({
		title: share.title, // 分享标题
		desc: share.desc, // 分享描述
		link: share.link, // 分享链接
		imgUrl: share.imgUrl, // 分享图标
		success: function () {
			// 用户确认分享后执行的回调函数
			$('.showShareMask').addClass('hidden');
			_czc.push(['_trackEvent', 'gamecenter_wxshare_qq', 'click']);
		},
		cancel: function () {
			// 用户取消分享后执行的回调函数
		}
	});
}

function shareCallback(state) {
	$('.sharemask, .wnl-sharetool').addClass('hidden');
	if (WNLUtil.isAndroid) {
		_czc.push(['_trackEvent', 'gamecenter_appshare_android', 'click']);
	}
	else if (WNLUtil.isIOS) {
		_czc.push(['_trackEvent', 'gamecenter_appshare_ios', 'click']);
	}
}

function showWnlShareTool(){
	$('.sharemask, .wnl-sharetool').removeClass('hidden');
	setWnlShare(shareOB);
}

function setWnlShare(param){
	if (typeof param == 'string') {
		$('.weixin').click(function(){
			WNLUtil.setShareDataForImage('weixin', param);
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
		$('.weixin_circle').click(function(){
			WNLUtil.setShareDataForImage('weixin_circle', param);
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
		$('.qq').click(function(){
			WNLUtil.setShareData('qq', {
				title: share.title,
				text: share.title,
				image: param,
				url: share.link
			});
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
		$('.weibo').click(function(){
			WNLUtil.setShareDataForImage('sina', param);
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
	}else if (typeof param == 'object') {
		$('.weixin').click(function(){
			WNLUtil.setShareData('weixin', {
				title: share.title,
				text: share.desc,
				image: share.imgUrl,
				url: share.link
			});
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
		$('.weixin_circle').click(function(){
			WNLUtil.setShareData('weixin_circle', {
				title: share.title,
				text: share.desc,
				image: share.imgUrl,
				url: share.link
			});
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
		$('.qq').click(function(){
			WNLUtil.setShareData('qq', {
				title: share.title,
				text: share.desc,
				image: share.imgUrl,
				url: share.link
			});
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
		$('.weibo').click(function(){
			WNLUtil.setShareData('sina', {
				title: share.title,
				text: share.desc,
				image: share.imgUrl,
				url: share.link
			});
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
	}
}