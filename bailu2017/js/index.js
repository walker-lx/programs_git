//获取url地址中的参数值
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r !== null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}

window.share = {
	title : '【查收】白露时节有好运！',//设置分享到朋友圈的题目
	friendTitle : '【查收】白露时节有好运！',//设置分享给好友的题目
	link : 'https://b.cqyouloft.com/bailu2017/index.html?share=1',//分享链接
	imgUrl : 'https://b.cqyouloft.com/bailu2017/img/share.jpg',//分享icon
	desc : '你有一张白露好运卡待领取>>'//附加的描述信息
};
var shareOB = window.share,shareimg,sharepic = getQueryString('sharepic'),count,count1;//初始化万年历分享对象
// var adArr = []
$(function() {
	FastClick.attach(document.body);//消除移动端点击延迟
	var ua=navigator.userAgent.toLocaleLowerCase();
    var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
    var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
	var isAndroid=ua.indexOf("android")>-1;
	if(isIOS) {
		_czc.push(['_trackEvent','bailu2017_index_ios', 'show']);
		$('#link').click(function() {
			location.href = 'https://www.51wnl.com/linksite/DoLink.aspx?key=3899&loc=10&MAC=[MAC]&IDFA=[IDFA]&OPENUDID=[OPENUDID]&IMEI=[IMEI]&WNLUSERID=[WNLUSERID]'
			console.log('ios')
			_czc.push(['_trackEvent','bailu2017_link_ios', 'click']);
		})
	} else if(isAndroid) {
		_czc.push(['_trackEvent','bailu2017_index_android', 'show']);		
		$('#link').click(function() {
			location.href = 'https://www.51wnl.com/linksite/DoLink.aspx?key=3900&loc=10&MAC=[MAC]&IDFA=[IDFA]&OPENUDID=[OPENUDID]&IMEI=[IMEI]&WNLUSERID=[WNLUSERID]'
			_czc.push(['_trackEvent','bailu2017_link_android', 'click']);
		})
	}
	//首页燕子动画
	var mouseDom = $(".bird");
    var mouseImg = mouseDom.find("img");
    var mouseAnimate = function () {
        mouseDom.css("display", "block");
        mouseDom.removeClass('fadeout');
        var width = $(".page").width();
        var p5 = {x: -96, y: 180};
        var p4 = {x: width / 4 * 1, y: 220};
        var p3 = {x: width / 4 * 2, y: 200};
        var p2 = {x: width / 4 * 3, y: 100};
        var p1 = {x: width / 4 * 4 - 85, y: 85};
        var bezierAnimate = new bezier({
            points: [p1, p2, p3, p4, p5],
            frame: function (np, v) {
                var mouseDom = $(".bird");
                mouseDom.css({left: np.x, top: np.y});
                mouseScal(v);
                // console.log("np", np);
            },
            complete: function () {
                mouseDom.fadeOut(500,function() {
					$(this).addClass('fadeout');
				});
            },
            duration: 2000
        });
    }
    var mouseScal = function (ease) {
        var height = 96 + ease * 20;
        var width = 96 + ease * 40;
        mouseImg.attr("height", height);
        mouseImg.attr("width", width);
    }
    function manFrame() {
		mouseAnimate();
    }
    setTimeout(function () {
        manFrame();
    }, 800);
    $(window).resize(function () {
        setTimeout(function () {
            manFrame();
        }, 800);
	})


	var img = new Image();
	img.src = 'https://b.cqyouloft.com/bailu2017/img/card' +Math.floor(Math.random()*5+1)+ '.jpg';
	img.onload = function() {
		$(img).addClass('results');
		count = img.src.substr(42,1);
		$('.shadow').removeClass('hidden').append(img);//生成随机的结果页
	}
	//首页点击
    $('.page').bind('touchstart',function(e) {
		if(isIOS) {
			_czc.push(['_trackEvent','bailu2017_indexclick_ios', 'click']);		
		} else {
			_czc.push(['_trackEvent','bailu2017_indexclick_android', 'click']);					
		}
		e.preventDefault();
		$('.foot,.icon').fadeOut(300);
        $('.water').addClass('down');
		$('.page').fadeOut(1500);
		$('.page1').fadeIn(3000);
		
		// console.log(count)
		shareImage=$('.shadow').find('img').eq(0).attr("src");
		shareOB=shareImage;
		share.title = '【好友@你】好运卡待查收';
		share.friendTitle = '【好友@你】好运卡待查收';
		share.desc = '你有一张白露好运卡待领取>>';
		share.link = 'https://b.cqyouloft.com/bailu2017/index.html?sharepic=https://b.cqyouloft.com/bailu2017/img/card' + count + '.jpg';
		setShareInfo();
		// });	
    });
	
	//再领一次
    $('.again').click(function() {     
		if(isIOS) {
			_czc.push(['_trackEvent','bailu2017_resultclick_ios', 'click']);		
		} else {
			_czc.push(['_trackEvent','bailu2017_resultclick_android', 'click']);					
		}
		$('.again').attr('disabled','true');		  
		$('.water').removeClass('down');
		var shadow2 = "<div class='shadow2'><img class='results' src='https://b.cqyouloft.com/bailu2017/img/card" +Math.floor(Math.random()*5+1)+ ".jpg'></div>";		
		count1 = $(shadow2).find('img').attr('src').substr(42,1);
		var img1 = new Image();
		img1.src = 'https://b.cqyouloft.com/bailu2017/img/card' +count1+ '.jpg';
		img1.onload = function() {
			$('.top1').append(shadow2);	
				$('.top1').find('div').eq(0).animate({marginLeft:'-100%',opacity:0},900,function() {
				$(this).remove();
			});
			$('.shadow2').animate({
				left: 0,
			},900,function() {
				$('.again').removeAttr('disabled');
			});
		
		}
		// console.log(img1)	       		       
		
		shareImage=$('.shadow2').find('img').eq(0).attr("src");
		shareOB=shareImage;
		share.link = 'https://b.cqyouloft.com/bailu2017/index.html?sharepic=https://b.cqyouloft.com/bailu2017/img/card' +count1+ '.jpg';
		setShareInfo();	
    });

	//点击分享
	$('.share').click(function() {
		if(isIOS) {
			_czc.push(['_trackEvent','bailu2017_resultshare_ios', 'click']);		
		} else {
			_czc.push(['_trackEvent','bailu2017_resultshare_android', 'click']);					
		}
		if (WNLUtil.isWnl) {
			if ((WNLUtil.isIOS && WNLUtil.appVersion <= 450) || (WNLUtil.isAndroid && WNLUtil.appVersion <= 451)) {
				WNLUtil.setShareDataOld({
					pureText: share.title,
					text: share.title,
					image: '0',
					url: share.link,
					targetUrl: share.link,
					imageURL: share.imgUrl
				});
				//分享埋点
				if (WNLUtil.isIOS) {
					_czc.push(['_trackEvent','bailu2017_oldshare_ios', 'click']);
				}else if (WNLUtil.isAndroid) {
					_czc.push(['_trackEvent','bailu2017_oldshare_android', 'click']);
				}
				}else {
					$('.sharemask, .wnl-sharetool').removeClass('hidden');
					setWnlShare(shareOB);
					if (WNLUtil.isIOS) {
						_czc.push(['_trackEvent','bailu2017_newshare_ios', 'click']);
				}else if (WNLUtil.isAndroid) {
						_czc.push(['_trackEvent','bailu2017_newshare_android', 'click']);
						}
					}
				}
				else if (WNLUtil.isWeixin) {
					if (WNLUtil.isIOS) {
						_czc.push(['_trackEvent', 'bailu2017_wxsharebtn_ios', 'click']);
					} else if (WNLUtil.isAndroid) {
						_czc.push(['_trackEvent', 'bailu2017_wxsharebtn_android', 'click']);
					}
					$('.showShareMask').removeClass('hidden');//移除分享列表
				}
	})

	if(sharepic) {
		$('.shadow,.shadow2').remove();
		$('.page').addClass('hidden');
		$('.page1').find('.top1').append('<img id="imgshare" src="' +sharepic+ '"/>');
		$('#imgshare').addClass('results');
		$('.page1').find('.again,.share').addClass('hidden');
		$('.page1').find('.click').removeClass('hidden');
		$('.page1').removeClass('hidden');
		$('.page1').find('.click').click(function() {
			window.location.href = 'https://b.cqyouloft.com/bailu2017/index.html';
		})
		if(isIOS) {
			_czc.push(['_trackEvent','bailu2017_sharepageclick_ios', 'click']);		
		} else {
			_czc.push(['_trackEvent','bailu2017_sharepageclick_android', 'click']);					
		}
	}

    //万年历、微信分享工具设置
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
			$('.showShareMask').addClass('hidden');            
			_czc.push(['_trackEvent', 'bailu2017_wxshare_timeline', 'click']);//埋点统计，后台可查看
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
			_czc.push(['_trackEvent', 'bailu2017_wxshare_appmessage', 'click']);
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
			_czc.push(['_trackEvent', 'bailu2017_wxshare_qq', 'click']);
		},
		cancel: function () {
			// 用户取消分享后执行的回调函数
		}
	});
}

function shareCallback(state) {
	$('.sharemask, .wnl-sharetool').addClass('hidden');
	if (WNLUtil.isAndroid) {
		_czc.push(['_trackEvent', 'bailu2017_appshare_android', 'click']);
	}
	else if (WNLUtil.isIOS) {
		_czc.push(['_trackEvent', 'bailu2017_appshare_ios', 'click']);
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
			// WNLUtil.setShareData('qq', {
			// 	title: share.title,
			// 	text: share.title,
			// 	image: param,
			// 	url: share.link
			// });
			// window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
            WNLUtil.setShareDataForImage('qq', param);
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
		$('.weibo').click(function(){
            if(WNLUtil.isIOS){
                WNLUtil.setShareDataForImage('sina', param);
                window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
            }else if (WNLUtil.isAndroid) {
                WNLUtil.setShareDataForSina('sina', param);
    			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
                // WNLUtil.setShareData('sina', {
                //     title: share.title,
                //     text: share.title+share.link,
                //     image: share.imgUrl,
                //     url: share.link
                // });
                // window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
            }
            // android 4.6.3 不支持直接分享图片了。。。下个版本改回来
			// WNLUtil.setShareDataForSina('sina', param);
			// window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
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
				title: '',
				text: share.desc,
				image: share.imgUrl,
				url: share.link
			});
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
		$('.weibo').click(function(){
			if(WNLUtil.isIOS){
				WNLUtil.setShareData('sina', {
					title: '',
					text: share.desc,
					image: share.imgUrl,
					url: share.link
				});
				window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
			}else if (WNLUtil.isAndroid) {
				WNLUtil.setShareData('sina', {
					title: share.title,
					text: share.title+share.link,
					image: share.imgUrl,
					url: share.link
				});
				window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
			}
		});
	}
}
