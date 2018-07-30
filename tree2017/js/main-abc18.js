function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
//Toast
function toast(text, ms) {
    if (!text) {
        return false;
    }
    var dom = $('<div class="public_toast">' + text + '</div>');
    var ms = ms || 1500;
    $('body').append(dom);
    setTimeout(function() {
        dom.addClass('public_toast_show');
    }, 10);
    setTimeout(function() {
        dom.removeClass('public_toast_show');
        dom.on('webkitTransitionEnd', function() {
            dom.remove();
        });
    }, ms);
}

$.fn.longPress = function(fn) {
	var timeout = undefined;
	var $this = this;
	for(var i = 0;i<$this.length;i++){
		$this[i].addEventListener('touchstart', function(event) {
			timeout = setTimeout(fn, 800);  //长按时间超过800ms，则执行传入的方法
			}, false);
		$this[i].addEventListener('touchend', function(event) {
			clearTimeout(timeout);  //长按时间少于800ms，不会执行传入的方法
			}, false);
	}
}

var sharePic = getQueryString("sharePic");
var shareOB, shareImage;
window.share = {
    title: '测过的人都被准疯了！史上最强的颜值测试！',
    friendTitle: '【好友@你】敢不敢来一场颜值较量',
    link: 'https://b.cqyouloft.com/tree2017/index.html?&share=1',
    imgUrl: 'https://b.cqyouloft.com/tree2017/img/share.jpg',
    desc: '你的颜值到底具有什么神秘的力量！'
};
shareOB = window.share;

//上传图片回调
function filecodecallback(data){
    $('.loading').show();
    $.ajax({
        url: 'https://h5-jp.51wnl.com/upload/image',
        type: 'POST',
        data: {"action":"postimage", "imgData": data},
        dataType: 'JSON',
        success: function(data){
            createPic(data.url);
        },
        error: function(){
            $('.loading').hide();
            toast("上传失败，请重试~");
        }
    });
}

function createPic(imgSrc){
    var userPic = new Image();
    userPic.onload = function(){
        var sw = userPic.width;
        var sh = userPic.height;
        var sx,sy;
        if (sw>sh) {
            sx = (sw-sh)/2;
            sy = 0;
            ctx.drawImage(userPic,sx,sy,sh,sh, 270, 100, 260, 260);
        }else{
            sx = 0;
            sy = (sh-sw)/2;
            ctx.drawImage(userPic,sx,sy,sw,sw, 270, 100, 260, 260);
        }
        var imgData = backcanvas.toDataURL("image/jpeg", 0.8);
        $.ajax({
            url: location.protocol + '//msg.51wnl.com/index.php/Asset/ImageLoader/ltt',
            type: 'POST',
            data: {"img": imgData},
            dataType: 'JSON',
            success: function(result){
                var resultImg = new Image();
                resultImg.src = result.data.url;
                resultImg.onload = function(){
                    $('#backCanvas').addClass('hidden');
                    $('.page2 .box').append('<img src="'+result.data.url+'" />');
                    $('.page1, .loading').hide();
                    $('.page2').show();
                    if (WNLUtil.isWeixin) {
                        if (WNLUtil.isIOS) {
                            _czc.push(['_trackEvent', 'tree2017_made_wx', 'show', 'ios']);
                        }else if (WNLUtil.isAndroid) {
                            _czc.push(['_trackEvent', 'tree2017_made_wx', 'show', 'az']);
                        }
                    }else if (WNLUtil.isWnl) {
                        if (WNLUtil.isIOS) {
                            _czc.push(['_trackEvent', 'tree2017_made_wnl', 'show', 'ios']);
                        }else if (WNLUtil.isAndroid) {
                            _czc.push(['_trackEvent', 'tree2017_made_wnl', 'show', 'az']);
                        }
                    }
                };
                shareImage = result.data.url;
                shareOB = shareImage;
                share.title = '【颜值大考验】我的长相竟然......';
                share.friendTitle = '【来挑战！】我的颜值竟然有这样的力量！';
                share.desc = '敢不敢和我来一场颜值较量！';
                share.link = 'https://b.cqyouloft.com/tree2017/index.html?&sharePic='+result.data.url;
                setShareInfo();
            },
            error: function(){
                $('.loading').hide();
                toast('当前参与人数过多，请稍后重试~');
            }
        });
    };
    userPic.crossOrigin = "";
    userPic.src = imgSrc;
}

var backcanvas = document.getElementById('backCanvas');
var ctx = backcanvas.getContext('2d');
backcanvas.width = 800;
backcanvas.height = 1000;
var canvasbg = new Image();
canvasbg.src = 'https://b.cqyouloft.com/tree2017/img/0'+Math.ceil(Math.random()*7)+'.jpg';
canvasbg.onload = function(){
    ctx.drawImage(canvasbg, 0, 0, 800, 1000);
};

$(function(){
    FastClick.attach(document.body);

    if (sharePic) {
        $('#backCanvas').addClass('hidden');
        $('.page2 .box').append('<img src="'+sharePic+'" />');
        $('.page1, .loading').hide();
        $('.page2').show();
        $('.againBtn, .shareBtn').addClass('hidden');
        $('.homeBtn').removeClass('hidden');
    }

    if (WNLUtil.isWeixin) {
        if (WNLUtil.isIOS) {
            _czc.push(['_trackEvent','tree2017_pageview_wx', 'view', 'ios']);
        }else if (WNLUtil.isAndroid) {
            _czc.push(['_trackEvent','tree2017_pageview_wx', 'view', 'az']);
        }
    }else if (WNLUtil.isWnl) {
        if (WNLUtil.isIOS) {
            _czc.push(['_trackEvent','tree2017_pageview_wnl', 'view', 'ios']);
        }else if (WNLUtil.isAndroid) {
            _czc.push(['_trackEvent','tree2017_pageview_wnl', 'view', 'az']);
        }
    }

    if (WNLUtil.isWnl && WNLUtil.isAndroid) {
        $('.upload-box, .face-box').click(function () {
            _czc.push(['_trackEvent', 'tree2017_upload_wnl', 'upload', 'az']);
            location.href = "protocol://getfilecode#filecodecallback";
        });
    }else{
        $('#upload').change(function(event){
            $('.loading').show();
            if (WNLUtil.isWeixin) {
                if (WNLUtil.isIOS) {
                    _czc.push(['_trackEvent', 'tree2017_upload_wx', 'upload', 'ios']);
                }else if (WNLUtil.isAndroid) {
                    _czc.push(['_trackEvent', 'tree2017_upload_wx', 'upload', 'az']);
                }
            }else if (WNLUtil.isWnl) {
                if (WNLUtil.isIOS) {
                    _czc.push(['_trackEvent', 'tree2017_upload_wnl', 'upload', 'ios']);
                }else if (WNLUtil.isAndroid) {
                    _czc.push(['_trackEvent', 'tree2017_upload_wnl', 'upload', 'az']);
                }
            }
            lrz(event.target.files[0], {
                width: 260,quality:0.6
            }).then(function (rst){
                var userPic = new Image();
                userPic.src = rst.base64;
                userPic.onload = function(){
                    var sw = userPic.width;
                    var sh = userPic.height;
                    var sx,sy;
                    if (sw>sh) {
                        sx = (sw-sh)/2;
                        sy = 0;
                        ctx.drawImage(userPic,sx,sy,sh,sh, 270, 100, 260, 260);
                    }else{
                        sx = 0;
                        sy = (sh-sw)/2;
                        ctx.drawImage(userPic,sx,sy,sw,sw, 270, 100, 260, 260);
                    }
                    var imgData = backcanvas.toDataURL("image/jpeg", 0.8);
                    $.ajax({
                        url: location.protocol + '//msg.51wnl.com/index.php/Asset/ImageLoader/ltt',
                        type: 'POST',
                        data: {"img": imgData},
                        dataType: 'JSON',
                        success: function(result){
                            var resultImg = new Image();
                            resultImg.src = result.data.url;
                            resultImg.onload = function(){
                                $('#backCanvas').addClass('hidden');
                                $('.page2 .box').append('<img src="'+result.data.url+'" />');
                                $('.page1, .loading').hide();
                                $('.page2').show();
                                if (WNLUtil.isWeixin) {
                                    if (WNLUtil.isIOS) {
                                        _czc.push(['_trackEvent', 'tree2017_made_wx', 'show', 'ios']);
                                    }else if (WNLUtil.isAndroid) {
                                        _czc.push(['_trackEvent', 'tree2017_made_wx', 'show', 'az']);
                                    }
            			        }else if (WNLUtil.isWnl) {
                                    if (WNLUtil.isIOS) {
                                        _czc.push(['_trackEvent', 'tree2017_made_wnl', 'show', 'ios']);
                                    }else if (WNLUtil.isAndroid) {
                                        _czc.push(['_trackEvent', 'tree2017_made_wnl', 'show', 'az']);
                                    }
            					}
                            };
                            shareImage = result.data.url;
                            shareOB = shareImage;
                            share.title = '【颜值大考验】我的长相竟然......';
                            share.friendTitle = '【来挑战！】我的颜值竟然有这样的力量！';
                            share.desc = '敢不敢和我来一场颜值较量！';
            				share.link = 'https://b.cqyouloft.com/tree2017/index.html?&sharePic='+result.data.url;
            				setShareInfo();
                        },
                        error: function(){
                            $('.loading').hide();
                            toast('当前参与人数过多，请稍后重试~');
                        }
                    });
                };
            });
        });

        $('#upload2').change(function(event){
            $('.loading').show();
            if (WNLUtil.isWeixin) {
                if (WNLUtil.isIOS) {
                    _czc.push(['_trackEvent', 'tree2017_upload_wx', 'upload', 'ios']);
                }else if (WNLUtil.isAndroid) {
                    _czc.push(['_trackEvent', 'tree2017_upload_wx', 'upload', 'az']);
                }
            }else if (WNLUtil.isWnl) {
                if (WNLUtil.isIOS) {
                    _czc.push(['_trackEvent', 'tree2017_upload_wnl', 'upload', 'ios']);
                }else if (WNLUtil.isAndroid) {
                    _czc.push(['_trackEvent', 'tree2017_upload_wnl', 'upload', 'az']);
                }
            }

            lrz(event.target.files[0], {
                width: 260,quality:0.6
            }).then(function (rst){
                var userPic = new Image();
                userPic.src = rst.base64;
                userPic.onload = function(){
                    var sw = userPic.width;
                    var sh = userPic.height;
                    var sx,sy;
                    if (sw>sh) {
                        sx = (sw-sh)/2;
                        sy = 0;
                        ctx.drawImage(userPic,sx,sy,sh,sh, 270, 100, 260, 260);
                    }else{
                        sx = 0;
                        sy = (sh-sw)/2;
                        ctx.drawImage(userPic,sx,sy,sw,sw, 270, 100, 260, 260);
                    }
                    var imgData = backcanvas.toDataURL("image/jpeg", 0.8);
                    $.ajax({
                        url: location.protocol + '//msg.51wnl.com/index.php/Asset/ImageLoader/ltt',
                        type: 'POST',
                        data: {"img": imgData},
                        dataType: 'JSON',
                        success: function(result){
                            var resultImg = new Image();
                            resultImg.src = result.data.url;
                            resultImg.onload = function(){
                                $('#backCanvas').addClass('hidden');
                                $('.page2 .box').append('<img src="'+result.data.url+'" />');
                                $('.page1, .loading').hide();
                                $('.page2').show();
                                if (WNLUtil.isWeixin) {
                                    if (WNLUtil.isIOS) {
                                        _czc.push(['_trackEvent', 'tree2017_made_wx', 'show', 'ios']);
                                    }else if (WNLUtil.isAndroid) {
                                        _czc.push(['_trackEvent', 'tree2017_made_wx', 'show', 'az']);
                                    }
            			        }else if (WNLUtil.isWnl) {
                                    if (WNLUtil.isIOS) {
                                        _czc.push(['_trackEvent', 'tree2017_made_wnl', 'show', 'ios']);
                                    }else if (WNLUtil.isAndroid) {
                                        _czc.push(['_trackEvent', 'tree2017_made_wnl', 'show', 'az']);
                                    }
            					}
                            };
                            shareImage = result.data.url;
                            shareOB = shareImage;
                            share.title = '【颜值大考验】我的长相竟然......';
                            share.friendTitle = '【来挑战！】我的颜值竟然有这样的力量！';
                            share.desc = '敢不敢和我来一场颜值较量！';
            				share.link = 'https://b.cqyouloft.com/tree2017/index.html?&sharePic='+result.data.url;
            				setShareInfo();
                        },
                        error: function(){
                            $('.loading').hide();
                            toast('当前参与人数过多，请稍后重试~');
                        }
                    });
                };
            });
        });

    }

    $('.page2 .box').longPress(function(){
		if (WNLUtil.isWeixin) {
            if (WNLUtil.isIOS) {
                _czc.push(['_trackEvent', 'tree2017_img_wx', 'press', 'ios']);
            }else if (WNLUtil.isAndroid) {
                _czc.push(['_trackEvent', 'tree2017_img_wx', 'press', 'az']);
            }
        }else if (WNLUtil.isWnl) {
            if (WNLUtil.isIOS) {
                _czc.push(['_trackEvent', 'tree2017_img_wnl', 'press', 'ios']);
            }else if (WNLUtil.isAndroid) {
                _czc.push(['_trackEvent', 'tree2017_img_wnl', 'press', 'az']);
            }
		}
	});

    $('.againBtn').click(function(){
        if (WNLUtil.isWeixin) {
            if (WNLUtil.isIOS) {
                _czc.push(['_trackEvent', 'tree2017_again_wx', 'click', 'ios']);
            }else if (WNLUtil.isAndroid) {
                _czc.push(['_trackEvent', 'tree2017_again_wx', 'click', 'az']);
            }
        }else if (WNLUtil.isWnl) {
            if (WNLUtil.isIOS) {
                _czc.push(['_trackEvent', 'tree2017_again_wnl', 'click', 'ios']);
            }else if (WNLUtil.isAndroid) {
                _czc.push(['_trackEvent', 'tree2017_again_wnl', 'click', 'az']);
            }
		}

        ctx.clearRect(0, 0, backcanvas.width, backcanvas.height);
        var canvasbg = new Image();
        canvasbg.src = 'https://b.cqyouloft.com/tree2017/img/0'+Math.ceil(Math.random()*7)+'.jpg';
        canvasbg.onload = function(){
            ctx.drawImage(canvasbg, 0, 0, 800, 1000);
        };

        var upload = $("#upload");
        upload.replaceWith( upload.val('').clone( true ) );
        $('.page1').show();
        $('.page2').hide();
        $('.page2 .box img').remove();
        share.title = '测过的人都被准疯了！史上最强的颜值测试！';
        share.friendTitle = '【好友@你】敢不敢来一场颜值较量';
        share.desc = '你的颜值到底具有什么神秘的力量！';
        share.link = 'https://b.cqyouloft.com/tree2017/index.html?&share=1';
        setShareInfo();
        shareOB = window.share;
	});

	//分享按钮
    $(".shareBtn").click(function () {
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
                appCallback_share();
                if (WNLUtil.isIOS) {
            		_czc.push(['_trackEvent','tree2017_oldshare_ios', 'click']);
            	}else if (WNLUtil.isAndroid) {
            		_czc.push(['_trackEvent','tree2017_oldshare_android', 'click']);
            	}
            }else {
                $('.sharemask, .wnl-sharetool').removeClass('hidden');
                setWnlShare(shareImage);
                if (WNLUtil.isIOS) {
            		_czc.push(['_trackEvent','tree2017_newshare_ios', 'click']);
            	}else if (WNLUtil.isAndroid) {
            		_czc.push(['_trackEvent','tree2017_newshare_android', 'click']);
            	}
            }
        }
        else if (WNLUtil.isWeixin) {
            if (WNLUtil.isIOS) {
                _czc.push(['_trackEvent', 'tree2017_wxsharebtn_ios', 'click']);
            } else if (WNLUtil.isAndroid) {
                _czc.push(['_trackEvent', 'tree2017_wxsharebtn_android', 'click']);
            }
            $('.showShareMask').removeClass("hidden");
        }
    });

    $('.homeBtn').click(function(){
		if (WNLUtil.isWeixin) {
            _czc.push(['_trackEvent', 'tree2017_home_wx', 'click']);
        }
        $('.againBtn, .shareBtn').removeClass('hidden');
        $('.homeBtn').addClass('hidden');

        ctx.clearRect(0, 0, backcanvas.width, backcanvas.height);
        var canvasbg = new Image();
        canvasbg.src = 'https://b.cqyouloft.com/tree2017/img/0'+Math.ceil(Math.random()*7)+'.jpg';
        canvasbg.onload = function(){
            ctx.drawImage(canvasbg, 0, 0, 800, 1000);
        };

        var upload = $("#upload");
        upload.replaceWith( upload.val('').clone( true ) );
        $('.page1').show();
        $('.page2').hide();
        $('.page2 .box img').remove();
        share.title = '测过的人都被准疯了！史上最强的颜值测试！';
        share.friendTitle = '【好友@你】敢不敢来一场颜值较量';
        share.desc = '你的颜值到底具有什么神秘的力量！';
        share.link = 'https://b.cqyouloft.com/tree2017/index.html?&share=1';
        setShareInfo();
        shareOB = window.share;

    });

    $('.showShareMask').click(function(){
        $(this).addClass('hidden');
    });

    $('.sharemask, .cancle-share').click(function(){
        $('.sharemask, .wnl-sharetool').addClass('hidden');
    });

	wx.ready(function(){
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
            $('.showShareMask').addClass('hidden');
            _czc.push(['_trackEvent', 'tree2017_wxshare_timeline', 'click']);
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    //获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.onMenuShareAppMessage({
        title: share.friendTitle, // 分享标题
        desc: share.desc, // 分享描述
        link: share.link, // 分享链接
        imgUrl: share.imgUrl, // 分享图标
        //type: '', // 分享类型,music、video或link，不填默认为link
        //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            $('.showShareMask').addClass('hidden');
            _czc.push(['_trackEvent', 'tree2017_wxshare_appmessage', 'click']);
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
            _czc.push(['_trackEvent', 'tree2017_wxshare_qq', 'click']);
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}

function shareCallback(state) {
    $('.sharemask, .wnl-sharetool').addClass('hidden');
    if (WNLUtil.isAndroid) {
        _czc.push(['_trackEvent', 'tree2017_appshare_android', 'click']);
    }
    else if (WNLUtil.isIOS) {
        _czc.push(['_trackEvent', 'tree2017_appshare_ios', 'click']);
    }
}

function showWnlShareTool(){
    $('.sharemask, .wnl-sharetool').removeClass('hidden');
    setWnlShare(shareOB);
}
function setWnlShare(param){
    if (typeof param == "string") {
        $('.weixin').click(function(){
            WNLUtil.setShareDataForImage('weixin', param);
            window.location.href = "protocol://share#" + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.weixin_circle').click(function(){
            WNLUtil.setShareDataForImage('weixin_circle', param);
            window.location.href = "protocol://share#" + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.qq').click(function(){
            WNLUtil.setShareData('qq', {
                title: share.title,
                text: share.title,
                image: param,
                url: share.link
            });
            window.location.href = "protocol://share#" + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.weibo').click(function(){
            WNLUtil.setShareDataForImage('sina', param);
            window.location.href = "protocol://share#" + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
    }else if (typeof param == "object") {
        $('.weixin').click(function(){
            WNLUtil.setShareData('weixin', {
                title: share.title,
                text: share.desc,
                image: share.imgUrl,
                url: share.link
            });
            window.location.href = "protocol://share#" + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.weixin_circle').click(function(){
            WNLUtil.setShareData('weixin_circle', {
                title: share.title,
                text: share.desc,
                image: share.imgUrl,
                url: share.link
            });
            window.location.href = "protocol://share#" + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.qq').click(function(){
            WNLUtil.setShareData('qq', {
                title: share.title,
                text: share.desc,
                image: share.imgUrl,
                url: share.link
            });
            window.location.href = "protocol://share#" + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.weibo').click(function(){
            WNLUtil.setShareData('sina', {
                title: share.title,
                text: share.desc,
                image: share.imgUrl,
                url: share.link
            });
            window.location.href = "protocol://share#" + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
    }
}
