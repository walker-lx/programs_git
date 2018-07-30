//生成一个唯一码
function unique() {
    var guid = "{";
    for (var i = 1; i <= 32; i++){
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) ||  (i == 20))
            guid += "-";
        }
    guid += "}";
    guid = guid.substring(1,guid.length-2);
    return guid;
}

//长按
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

//获取url地址中的参数
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r !== null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}

//错误信息提示
function tip(msg) {
	var node = '<div id="err">' + msg + '</div>';
	$('body').append(node);
	$('#err').addClass('errMsg');
}


window.share = {
	title : '这个清明，一起来种株佛心莲吧。',//设置分享的题目
	friendTitle : '这个清明，一起来种株佛心莲吧。',//分享之后显示的题目
	link : 'https://b.cqyouloft.com/qingming2017/index.html?share=1',//分享链接
	imgUrl : 'https://b.cqyouloft.com/qingming2017/img/share.jpg',//图片的链接
	desc : '千灯万盏，不如心灯一盏。'//附加的描述信息
};
var shareOB = window.share,result = getQueryString('result'),title,content;

$(function() {
	//alert(localStorage.getItem('masteUser'));
    FastClick.attach(document.body);
	$('.page2 .imgpage2').find('img').remove();
	
	//背景音乐控制(解决ios端某些机型不能自动播放背景音乐的问题)
	function autoPlayMusic() {
		// 自动播放音乐效果，解决浏览器或者APP自动播放问题
		function musicInBrowserHandler() {
			musicPlay(true);
			document.body.removeEventListener('touchstart', musicInBrowserHandler);
		}
		document.body.addEventListener('touchstart', musicInBrowserHandler);

		// 自动播放音乐效果，解决微信自动播放问题
		function musicInWeixinHandler() {
			musicPlay(true);
			document.addEventListener("WeixinJSBridgeReady", function () {
				musicPlay(true);
			}, false);
			document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
		}
		document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
	}
	function musicPlay(isPlay) {
		var audio = document.getElementsByClassName('music')[0];
		if (isPlay && audio.paused) {
			audio.play();
		}
		if (!isPlay && !audio.paused) {
			audio.pause();
		}
	}
	autoPlayMusic();


	var music = document.getElementsByClassName('music')[0];
	var musicbtn = document.getElementsByClassName('musicbtn')[0];
	var img = document.getElementsByTagName('img')[0];
	
	$('img').eq(0).addClass('circle');
	$('.musicbtn').click(function() {
		if(music.paused) {
			music.play();
			$('img').eq(0).addClass('circle');
			img.src = './img/music_on@2x.png';
		}else {
			$('img').eq(0).removeClass('circle');
			music.pause();
			img.src = './img/music_off@2x.png';
		}
	})
	
	var userId = unique();
	
	//区分万年历和微信打开
	if (WNLUtil.isWeixin) {
		if (WNLUtil.isIOS) {
			_czc.push(['_trackEvent','qingming2017_into_ios', 'view', 'ios']);
		}else if (WNLUtil.isAndroid) {
			_czc.push(['_trackEvent','qingming2017_into_az', 'view', 'az']);
		};
	}else if (WNLUtil.isWnl) {
		if (WNLUtil.isIOS) {
			_czc.push(['_trackEvent','qingming2017_click_wnl', 'view', 'ios']);
		}else if (WNLUtil.isAndroid) {
			_czc.push(['_trackEvent','qingming2017_click_wnl_az', 'view', 'az']);
		}
	};

    var arr = ['每个人所见所遇到的都早有安排，一切都是缘。缘起缘灭，缘聚缘散，一切都是天意。','今生种种皆是前生因果。世间万物皆空。唯其空，便能包容万物。','菩提本非树，明镜亦无台。本来无一物，何处染尘埃。','人生有八苦：生，老，病，死，爱别离，怨长久，求不得，放不下。唯有身心放空，方能人离难，难离身，一切灾殃化为尘。','笑着面对，不去埋怨。悠然，随心，随性，随缘。注定让一生改变的，只在百年后，那一朵花开的时间。'];
    $('.page1').click(function() {
		// if(localStorage.getItem('masteUser') === userId) {
		// 	userId = localStorage.getItem('masteUser');
		// } else {
		// 	userId = unique();
		// };
		if (WNLUtil.isWeixin) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','qingming2017_click_ios', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','qingming2017_click_az', 'view', 'az']);
			};
		}else if (WNLUtil.isWnl) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','qingming2017_click_wnl', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','qingming2017_click_wnl_az', 'view', 'az']);
			}
		};

		$('.yq11').addClass('yq1');
		$('.yq22').addClass('yq2');
		$('.yq33').addClass('yq3');
		$('.yq44').addClass('yq4');
		$('.yq55').addClass('yq5');	

		$('.yq111').addClass('yq1x');
		$('.yq222').addClass('yq2x');
		$('.yq333').addClass('yq3x');
		$('.yq444').addClass('yq4x');
		$('.yq555').addClass('yq5x');	

        $.ajax({
            url: 'https://msg.51wnl.com/api/Active/getrank?userid=' + userId,
            type: 'post',
            success: function(response) {
				//alert(response);
                var text = $.parseJSON(response);
				var title = text['num'];
				var content = Math.floor(Math.random()*5+1);
                $('.page2').find('.num').text(title);
				$('.page2').find('.text').text(arr[content]);

				var anim = document.getElementsByClassName('yq55')[0];
				//var circle3 = document.getElementsByClassName('.circle3')[0];
				setTimeout(function() {
					$('.page1').fadeOut(800);
					$('.page2').fadeIn(800);
					setTimeout(function(){
						var w = $('.top1').width();
						var h = $('.top1')[0].clientHeight;
						console.log(w,h);
						//要将 canvas 的宽高设置成容器宽高的 2 倍
						var canvas = document.createElement("canvas");  
						canvas.width = w * 2;
						canvas.height = h * 2;
						canvas.style.width = w + "px";
						canvas.style.height = h + "px";
						var context = canvas.getContext("2d");
						//然后将画布缩放，将图像放大两倍画到画布上
						context.scale(2,2);
					
						html2canvas($('.top1'), {
						canvas:canvas,
						onrendered: function(canvas) {
							//document.body.innerHTML='';
							var dataUrl = canvas.toDataURL("image/png");  
							console.log(dataUrl);
							var newImg = document.createElement("img");
							newImg.src =  dataUrl;
							newImg.width = w;
							$.ajax({
								url: location.protocol + '//msg.51wnl.com/index.php/Asset/ImageLoader/ltt',
								type: 'POST',
								data: {"img": dataUrl},
								dataType: 'JSON',
								success: function(result){
									var resultImg = new Image();
									resultImg.src = result.data.url;
									resultImg.onload = function(){
										$('.page2 .imgpage2').append('<img src="'+result.data.url+'" />');
								
									};
									share.title = '我种下了第'+ $('.page2').find('.num').text() +'株佛心莲，它代表了……';
									share.friendTitle = '我种下了第'+ $('.page2').find('.num').text() +'株佛心莲';
									share.desc = '它代表的竟然是……';
									share.link = 'https://b.cqyouloft.com/qingming2017/index.html?result=1&title=' + title + '&conten=' + content+'&pic='+result.data.url;
									setShareInfo();
									}
								});
							}
						})
					},800);	
					
				},1000)
			}	
		})

		//长按事件埋点
		$('.page2').longTouch(function() {
			if (WNLUtil.isWeixin) {
				if (WNLUtil.isIOS) {
					_czc.push(['_trackEvent','qingming2017_long_ioswx', 'view', 'ios']);
				}else if (WNLUtil.isAndroid) {
					_czc.push(['_trackEvent','qingming2017_long_azwx', 'view', 'az']);
				};
			}else if (WNLUtil.isWnl) {
				if (WNLUtil.isIOS) {
					_czc.push(['_trackEvent','qingming2017_long_ioswnl', 'view', 'ios']);
				}else if (WNLUtil.isAndroid) {
					_czc.push(['_trackEvent','qingming2017_long_azwnl', 'view', 'az']);
				}
			};
		})
	});


	//结果页分享页面
	if(result) {

		if (WNLUtil.isWeixin) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','qingming2017_longresult_wx', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','qingming2017_longresult_wx', 'view', 'az']);
			};
		}else if (WNLUtil.isWnl) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','qingming2017_share_ioswnl', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','qingming2017_share_azwnl', 'view', 'az']);
			}
		};
		$('.pagefoot').addClass('hidden');
		$('.qrwx').removeClass('hidden');
		var pic = getQueryString('pic');
		var picimg = "<img id='sharepic' src='"+ pic +"'>";
		$('.sharepic').append(picimg);
		
		//$('.imgpage2,imgpage2 img').addClass('hidden');
		//$('.qrwx').removeClass('hidden');
		$('.page2').find('.top').text('我种下了第' + getQueryString('title') + '株佛心莲');
		$('.page2').find('.text').text(arr[getQueryString('conten')]);
		$('.page1').addClass('hidden');
		$('.page2').removeClass('hidden');
	}
    //点击再种一株
    $('.page2').find('.again').click(function() {

		if (WNLUtil.isWeixin) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','qingming2017_again_ios', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','qingming2017_again_az', 'view', 'az']);
			};
		}else if (WNLUtil.isWnl) {
			if (WNLUtil.isIOS) {
				_czc.push(['_trackEvent','qingming2017_click_wnl', 'view', 'ios']);
			}else if (WNLUtil.isAndroid) {
				_czc.push(['_trackEvent','qingming2017_click_wnl_az', 'view', 'az']);
			}
		};

		$('.page2 .imgpage2').find('img').remove();
		$('.yq11').removeClass('yq1');
		$('.yq22').removeClass('yq2');
		$('.yq33').removeClass('yq3');
		$('.yq44').removeClass('yq4');
		$('.yq55').removeClass('yq5');

		$('.yq111').removeClass('yq1x');
		$('.yq222').removeClass('yq2x');
		$('.yq333').removeClass('yq3x');
		$('.yq444').removeClass('yq4x');
		$('.yq555').removeClass('yq5x');
        $('.page2').fadeOut(800);
        $('.page1').fadeIn(800);
        userId = unique();//重新生成唯一码
		share.title = '这个清明，一起来种株佛心莲吧。';
		share.friendTitle = '这个清明，一起来种株佛心莲吧。';
		share.desc = '千灯万盏，不如心灯一盏。';
		share.link = 'https://b.cqyouloft.com/qingming2017/index.html';
		setShareInfo();	
    });

    //点击分享
    $('.page2').find('.share').click(function() {
        //分享之后...
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
					_czc.push(['_trackEvent','qingming2017_oldshare_ios', 'click']);
				}else if (WNLUtil.isAndroid) {
					_czc.push(['_trackEvent','qingming2017_oldshare_az', 'click']);
				}
				}else {
					$('.sharemask, .wnl-sharetool').removeClass('hidden');
					setWnlShare(shareOB);
					if (WNLUtil.isIOS) {
						_czc.push(['_trackEvent','qingming2017_newshare_ios', 'click']);
				}else if (WNLUtil.isAndroid) {
						_czc.push(['_trackEvent','qingming2017_newshare_az', 'click']);
						}
					}
				}
				else if (WNLUtil.isWeixin) {
					if (WNLUtil.isIOS) {
						_czc.push(['_trackEvent', 'qingming2017_wxsharebtn_ios', 'click']);
					} else if (WNLUtil.isAndroid) {
						_czc.push(['_trackEvent', 'qingming2017_wxsharebtn_android', 'click']);
					}
					$('.showShareMask').removeClass('hidden');//移除分享列表
				};	
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
			_czc.push(['_trackEvent', 'qingming2017_wxshare_timeline', 'click']);//统计分享次数，后台可查看
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
			_czc.push(['_trackEvent', 'qingming2017_wxshare_appmessage', 'click']);
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
			_czc.push(['_trackEvent', 'qingming2017_wxshare_qq', 'click']);
		},
		cancel: function () {
			// 用户取消分享后执行的回调函数
		}
	});
}

function shareCallback(state) {
	$('.sharemask, .wnl-sharetool').addClass('hidden');
	if (WNLUtil.isAndroid) {
		_czc.push(['_trackEvent', 'qingming2017_appshare_android', 'click']);
	}
	else if (WNLUtil.isIOS) {
		_czc.push(['_trackEvent', 'qingming2017_appshare_ios', 'click']);
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
			if(WNLUtil.isIOS){
				WNLUtil.setShareData('sina', {
					title: share.title,
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
