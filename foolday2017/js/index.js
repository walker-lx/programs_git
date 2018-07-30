//触摸设备上的长按事件
// $.fn.longTouch = function(obj) {
// 	for(var timer,i = 0,_this = this; i < _this.length; i ++) {
// 		_this[i].addEventListener('touchstart', function() {
// 			timer = setTimeout(obj, 800);
// 			$('.again,.share').prop('checked','true');
// 		}, false);
// 		_this[i].addEventListener('touchend', function() {
// 			timer = clearTimeout(timer);
// 			$('.again,.share').prop('checked','false');
// 		}, false);
// 	}
// };
$.fn.longTouch = function(e) {
	for (var t = void 0, a = this, i = 0; i < a.length; i++)
		a[i].addEventListener('touchstart', function() {
			t = setTimeout(e, 800);
			$('.again,.share').prop('checked','true');
		}, false),
		a[i].addEventListener('touchend', function() {
			clearTimeout(t);
			$('.again,.share').prop('checked','false');
		}, false);
};

//获取字符串
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r !== null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}

//获取随机数组	
function getArr() {
	var arr1 = [1,2,3,4,5,6];
	var arr = [];
	for(var i = 0; i < 6; i ++) {
		var num = Math.floor(Math.random() * arr1.length);
		arr[i] = arr1[num];
		arr1.splice(num,1);
	}
	return arr;
}

//初始化分享对象(非万年历),须定义全局对象;万年历需要重新定义另外的全局对象
window.share = {
	title : '查看我的隐藏神兽属相',//设置分享的题目
	friendTitle : '你的隐藏神兽属相是什么，快来测！',//分享之后显示的题目
	link : 'https://b.cqyouloft.com/foolday2017/index.html?share=1',//分享链接
	imgUrl : 'https://b.cqyouloft.com/foolday2017/img/share.jpg',//图片的链接
	desc : '我左青龙，右白虎，就看你的了！'//附加的描述信息
};
var shareOB = window.share,shareImage,sharePic = getQueryString('sharePic');



$(function() {
	 FastClick.attach(document.body);
	//  WNLUtil.isIOS ? (_czc.push(['_trackEvent', 'foolday2017_flink_ios', 'click']),
	// 	location.href = 'https://b.cqyouloft.com/foolday2017/index.html') : WNLUtil.isAndroid && (_czc.push(['_trackEvent', 'foolday2017_flink_android', 'click']),
	// 	location.href = 'http://b.cqyouloft.com/foolday2017/index.html');
	//页面访问埋点
	if (WNLUtil.isWeixin) {
		if (WNLUtil.isIOS) {
			_czc.push(['_trackEvent','foolday2017_take_wx', 'view', 'ios']);
		}else if (WNLUtil.isAndroid) {
			_czc.push(['_trackEvent','foolday2017_take_wx', 'view', 'az']);
		}
	}else if (WNLUtil.isWnl) {
		if (WNLUtil.isIOS) {
			_czc.push(['_trackEvent','foolday2017_take_wnl', 'view', 'ios']);
		}else if (WNLUtil.isAndroid) {
			_czc.push(['_trackEvent','foolday2017_take_wnl_az', 'view', 'az']);
		}
		$('.showluck').removeClass('hidden');
	}

	if (sharePic) {
		//分享成功埋点
		if (WNLUtil.isWeixin) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','foolday2017_succ_wx', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','foolday2017_succ_wx', 'view', 'az']);
			}
		}else if (WNLUtil.isWnl) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','foolday2017_succ_wnl', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','foolday2017_succ_wnl_az', 'view', 'az']);
			}
		}

		$('.page2 .label').append('<img src="'+sharePic+'" />');
		$('.page2').removeClass('hidden');
		$('.page1').hide();
		$('.again, .share').addClass('hidden');
		$('.home').removeClass('hidden');
		$('.showluck').addClass('hidden');
		$('.home').click(function() {
			WNLUtil.isIOS ? (_czc.push(['_trackEvent', 'foolday2017_flink_ios', 'click']),
			location.href = 'https://b.cqyouloft.com/foolday2017/index.html') : WNLUtil.isAndroid && (_czc.push(['_trackEvent', 'foolday2017_flink_android', 'click']),
			location.href = 'https://b.cqyouloft.com/foolday2017/index.html');
			//分享页面进入首页埋点
			if (WNLUtil.isWeixin) {
				if (WNLUtil.isIOS) {
					_czc.push(['_trackEvent','foolday2017_in_wx', 'view', 'ios']);
				}else if (WNLUtil.isAndroid) {
					_czc.push(['_trackEvent','foolday2017_in_wx', 'view', 'az']);
				}
			}else if (WNLUtil.isWnl) {
				if (WNLUtil.isIOS) {
					_czc.push(['_trackEvent','foolday2017_in_ios', 'view', 'ios']);
				}else if (WNLUtil.isAndroid) {
					_czc.push(['_trackEvent','foolday2017_in_az', 'view', 'az']);
				}
			}

		});
	}


	$('.hand').longTouch(function(){
		//长按事件埋点
		if (WNLUtil.isWeixin) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','foolday2017_longpress_wx', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','foolday2017_longpress_wx', 'view', 'az']);
			}
		}else if (WNLUtil.isWnl) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','foolday2017_longpress_ios', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','foolday2017_longpress_az', 'view', 'az']);
			}
		}

		$('.light').addClass('imglight');
	});

	var light = document.getElementsByClassName('light')[0];
	var imgnum;
	light.addEventListener('webkitAnimationEnd', function() {
		$('.page1').addClass('hidden');
		$('.page2').removeClass('hidden');
		$('.light').removeClass('imglight');
		var labelimg = new Image();
		// WNLUtil.isIOS ?
		// labelimg.src = 'https://b.cqyouloft.com/foolday2017/index.html' + getArr()[Math.floor(Math.random()*6)] + '.jpg' : WNLUtil.isAndroid,
		// labelimg.src = 'http://b.cqyouloft.com/foolday2017/index.html' + getArr()[Math.floor(Math.random()*6)] + '.jpg';
		labelimg.src = 'https://b.cqyouloft.com/foolday2017/img/' + getArr()[Math.floor(Math.random()*6)] + '.jpg';
		imgnum = labelimg.src.substring(labelimg.src.length-5,labelimg.src.length-4);
		$('.page2').find('.label').append(labelimg);
		
		$('.page2').find('.label').longTouch(function() {
			//结果页长按事件埋点
			if (WNLUtil.isWeixin) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','foolday2017_relpress_wx', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','foolday2017_relpress_wx', 'view', 'az']);
			}
		}else if (WNLUtil.isWnl) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','foolday2017_relpress_ios', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','foolday2017_relpress_az', 'view', 'az']);
			}
		}

		});
		
		//展现埋点
		if (WNLUtil.isWeixin) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','foolday2017_show_wx', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','foolday2017_show_wx', 'view', 'az']);
			}
		}else if (WNLUtil.isWnl) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','foolday2017_show_ios', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','foolday2017_show_az', 'view', 'az']);
			}
		}

		shareImage=labelimg.src;
		shareOB=shareImage;
		share.title = '厉害了我的神兽！快来查看你的隐藏属相';
		share.friendTitle = '我的隐藏神兽属相居然是这个！';
		share.desc = '这个神兽属性厉害了，快来测！';
		// WNLUtil.isIOS ?
		// share.link = 'https://b.cqyouloft.com/foolday2017/index.html?sharePic=https://b.cqyouloft.com/foolday2017/img/'+ imgnum +'.jpg' : WNLUtil.isAndroid,
		// share.link = 'http://b.cqyouloft.com/foolday2017/index.html?sharePic=https://b.cqyouloft.com/foolday2017/img/'+ imgnum +'.jpg';
		share.link = 'https://b.cqyouloft.com/foolday2017/index.html?sharePic=https://b.cqyouloft.com/foolday2017/img/'+ imgnum +'.jpg';
		setShareInfo();
	});
	//流年运势埋点统计
	$('.page2').find('.showluck').click(function(){
		WNLUtil.isIOS ? (_czc.push(['_trackEvent', 'foolday2017_flink_ios', 'click']),
		location.href = 'http://www.51wnl.com/linksite/DoLink.aspx?key=1174&loc=10&MAC=[MAC]&IDFA=[IDFA]&OPENUDID=[OPENUDID]&IMEI=[IMEI]&WNLUSERID=[WNLUSERID]') : WNLUtil.isAndroid && (_czc.push(['_trackEvent', 'foolday2017_flink_android', 'click']),
		location.href = 'http://www.51wnl.com/linksite/DoLink.aspx?key=1175&loc=10&MAC=[MAC]&IDFA=[IDFA]&OPENUDID=[OPENUDID]&IMEI=[IMEI]&WNLUSERID=[WNLUSERID]');
		//流年运势点击埋点
		if (WNLUtil.isWnl) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','foolday2017_clickluck_ios', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','foolday2017_clickluck_az', 'view', 'az']);
			}
		}
	});
	
	$('.again').click(function() {
		//再一次埋点
		if (WNLUtil.isWeixin) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','foolday2017_again_wx', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','foolday2017_again_wx', 'view', 'az']);
			}
		}else if (WNLUtil.isWnl) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','foolday2017_again_ios', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','foolday2017_again_az', 'view', 'az']);
			}
		}

		// share.title = '厉害了！这居然是我的神兽属性';
		// share.friendTitle = '我的隐藏神兽属相居然是这个！';
		// share.desc = '这个神兽属性厉害了，快来测！';
		// share.link = 'https://b.cqyouloft.com/foolday2017/index.html?sharePic=https://b.cqyouloft.com/foolday2017/img/imgnum.jpg';
		// setShareInfo();
		$('.page2').addClass('hidden');
		$('.page1').removeClass('hidden');
		$('.page2').find('img').remove();
	});

	$('.share').click(function () {
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
					_czc.push(['_trackEvent','foolday2017_oldshare_ios', 'click']);
				}else if (WNLUtil.isAndroid) {
					_czc.push(['_trackEvent','foolday2017_oldshare_android', 'click']);
				}
				}else {
					$('.sharemask, .wnl-sharetool').removeClass('hidden');
					setWnlShare(shareOB);
					if (WNLUtil.isIOS) {
						_czc.push(['_trackEvent','foolday2017_newshare_ios', 'click']);
				}else if (WNLUtil.isAndroid) {
						_czc.push(['_trackEvent','foolday2017_newshare_android', 'click']);
						}
					}
				}
				else if (WNLUtil.isWeixin) {
					if (WNLUtil.isIOS) {
						_czc.push(['_trackEvent', 'foolday2017_wxsharebtn_ios', 'click']);
					} else if (WNLUtil.isAndroid) {
						_czc.push(['_trackEvent', 'foolday2017_wxsharebtn_android', 'click']);
					}
					$('.showShareMask').removeClass('hidden');//移除分享列表
					$('.page2').find('.showluck').addClass('hidden');
				}
	});

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
});

function setShareInfo() {
	//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
	wx.onMenuShareTimeline({
		title: share.title, // 分享标题
		link: share.link, // 分享链接
		imgUrl: share.imgUrl, // 分享图标
		success: function () {
			// 用户确认分享后执行的回调函数
			_czc.push(['_trackEvent', 'foolday2017_wxshare_timeline', 'click']);//统计分享次数，后台可查看
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
			_czc.push(['_trackEvent', 'foolday2017_wxshare_appmessage', 'click']);
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
			_czc.push(['_trackEvent', 'foolday2017_wxshare_qq', 'click']);
		},
		cancel: function () {
			// 用户取消分享后执行的回调函数
		}
	});
}

function shareCallback(state) {
	$('.sharemask, .wnl-sharetool').addClass('hidden');
	if (WNLUtil.isAndroid) {
		_czc.push(['_trackEvent', 'foolday2017_appshare_android', 'click']);
	}
	else if (WNLUtil.isIOS) {
		_czc.push(['_trackEvent', 'foolday2017_appshare_ios', 'click']);
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

