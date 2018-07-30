// iphoneX适配
function isIphoneX(){
	var ua = window.navigator.userAgent;
	if (ua.match(/iPhone|iPad|iPod/i)) {
		if (parseInt(window.devicePixelRatio) ===3 && parseInt(window.screen.width) === 375) {
		return true;
		}
		return false;
	}
    return false;
}

$(function(){
    if (navigator.userAgent.toLowerCase().indexOf("android")===-1){
        FastClick.attach(document.body);
    }
    $("a").bind('taphold', function(event) {
        event.preventDefault();
    });

    $('.marquee-top').marquee();

    if(isIphoneX()){
        $('.bottom-fix').removeClass('hidden');
        $('.bottom-btn').css({'bottom':'34px'});
        $('.wnl_history_btn').addClass('wnl_history_btn_iphoneX');
    }
    // 显示底部按钮
    $(window).scroll(function () {
        var dtop = $(window).scrollTop();
        var top1 = $('.showBtn').offset().top;
        if(dtop >= top1 - 10) {
            $('.bottom-btn').removeClass('bottom-btn-hidden');
            if(isIphoneX()) {
                $('.wnl_history_btn').addClass('wnl_history_btn_up_iphoneX');
            }
            else {
                $('.wnl_history_btn').addClass('wnl_history_btn_up');
            }
            
        }
        else {
            $('.bottom-btn').addClass('bottom-btn-hidden');
            if(isIphoneX()) {
                $('.wnl_history_btn').removeClass('wnl_history_btn_up_iphoneX');
            }
            else {
                $('.wnl_history_btn').removeClass('wnl_history_btn_up');
            }
        }    
        // if(dtop >= top1 - 10) {
        //     $('.bottom-btn').animate({bottom: '0'}).show();
        // }
        // else {
        //     $('.bottom-btn').animate({bottom: '-54px'}).show();
        // }      
    });
    $('.wnl_history_btn').click(function(){
        // 我的订单点击
        _czc.push(['_trackEvent', 'cs_history', 'zjr_index+click+cs_history']);
    })

    $('.bottom-btn').click(function(){
        // 开始择吉日点击统计
        _czc.push(['_trackEvent', 'start_zjr', 'zjr_index+click+start_zjr']);

        $('.pop-mask').animate({opacity:'0.5'}).show();
        if(isIphoneX()){
            $('.bottom-pop').animate({bottom:'34'}).show();
        }
        else {
            $('.bottom-pop').animate({bottom:'-1'}).show();
        }
        
        $('body').css('overflow','hidden');
    })
    $('.pop-mask, .close-icon').click(function(){
        $('.pop-mask').animate({opacity:'0'}).hide();
        $('.bottom-pop').animate({bottom:'-425px'}).show();
        $('body').css('overflow','auto');
    })

    var ua = window.navigator.userAgent;
    var appVersion = parseInt(ua.split(' ').pop().replace(/\./g, ''))
    var sysVersion = GetIOSVersion() || getAndroidVersion();
    console.log("appver:"+ appVersion + "sysver:" +sysVersion);
    function GetIOSVersion() {
        if (window.MSStream) {
            return false;
        }
        var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
            version;
        if (match !== undefined && match !== null) {
            version = [
                parseInt(match[1], 10),
                parseInt(match[2], 10),
                parseInt(match[3] || 0, 10)
            ];
            return parseFloat(version.join('.'));
        }
        return false;
    }

    function getAndroidVersion() {
        ua = ua.toLowerCase();
        var match = ua.match(/android\s([0-9\.]*)/);
        return match ? parseFloat(match[1]) : false;
    }

    var pushToken = getQueryString("pushToken");
    var deviceMacId = getQueryString("mac") || getQueryString('machash');
    var wnlUserId = getQueryString("userId") || getQueryString("userid") || getQueryString('wnlid');
    var appver = appVersion || getQueryString("appver");
    var model = getQueryString("model");
    var osver = sysVersion || getQueryString("osver");
    // var bundle = getQueryString("bundle");
    var idfa = getQueryString("idfa");
    var gid = getQueryString("gid");
    //新增参数
    var deviceId=getQueryString("deviceId") || getQueryString("deviceid") || getQueryString('gid');
    var boundId=getQueryString("boundId") || getQueryString("boundid");
    var posId=getQueryString("posId") || getQueryString("posid");
    var imei=getQueryString("imei");

    if (wnlUserId === null || wnlUserId === '' || wnlUserId.toLowerCase() === '[wnluserid]') {
        wnlUserId = '';
    }
    wnlUserId = wnlUserId === '' || wnlUserId == null ? wnlUserId : wnlUserId.replace('?name=', '');

    if (deviceId === null || deviceId === '' || deviceId.toLowerCase() === '[openudid]') {
        deviceId = '';
    }
    if (gid === null || gid === '' || gid.toLowerCase() === '[openudid]') {
        gid = '';
    }
    gid = deviceId;

    if(osver){
        localStorage.setItem("pushToken", pushToken);
        localStorage.setItem("deviceMacId", deviceMacId);
        localStorage.setItem("wnlUserId", wnlUserId);
        localStorage.setItem("appver", appver);
        localStorage.setItem("model", model);
        localStorage.setItem("osver", osver);
        // localStorage.setItem("bundle", bundle);
        localStorage.setItem("idfa", idfa);
        localStorage.setItem("gid", gid);
            //新增参数
        localStorage.setItem("deviceid",deviceId);
        localStorage.setItem("boundid",boundId);
        localStorage.setItem("posid",posId);
        localStorage.setItem("imei",imei);
    }
    var versioncode=getQueryString("versioncode");
    if(versioncode){
        localStorage.setItem("versioncode",versioncode);
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
    $(".item_link").click(function () {
       var href=$(this).data("href");
        var ua=navigator.userAgent.toLocaleLowerCase();
        if (ua.indexOf("wnl")===-1){
            drawToast("更多测算功能，请下载万年历");
            var down_href="";
            var wx=ua.indexOf("micromessenger")>-1;
            var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
            var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
            var isAndroid=ua.indexOf("android")>-1;
            if(wx){
                down_href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
            }
            else{
                if(isIOS){
                    down_href="http://um0.cn/89wDL";
                }
                else if(isAndroid){
                    down_href="http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]";
                }
                else{
                    down_href="http://www.51wnl.com";
                }
            }
            setTimeout(function () {
                location.href=down_href;
            },500);
            return false;
        }
        //location.href=href;
    });
    //var old_top= 0,new_top=0;
    //$(".test").on("touchstart", function () {
    //    old_top=document.body.scrollTop;
    //});
    //$(".test").on("click", function () {
    //    setTimeout(function () {
    //        new_top=document.body.scrollTop;
    //        $(".tel_txt").html(old_top+"   "+new_top+"    "+(new_top-old_top));
    //    },700);
    //})

});
var intervalCounter = 0;
function drawToast(message) {
    var alert = document.getElementById("toast");
    alert.style.opacity = .9;
    alert.innerHTML = message;
    var client_width=alert.clientWidth;
    alert.style.marginLeft="-"+client_width/2+"px";
    intervalCounter = setInterval(function(){
        var alert = document.getElementById("toast");
        alert.style.opacity = 0;
        clearInterval(intervalCounter);
    }, 1500);
}

// window.appCallback_share = function () {
//     var textObj = {
//         title: '万年历择吉日',
//         text: '不知道怎么挑选好日子？专业择吉大师帮你搞定！',
//         image: '0',
//         imageURL: 'http://coco70.51wnl.com/mingli/img/zj/share.jpg',
//         url: 'http://coco70.youloft.cn/mingli/zj_index.html',
//         pureText: '不知道怎么挑选好日子？专业择吉大师帮你搞定！',
//         prefix: ''
//     };
//     var textObj1 = {
//         title: '万年历择吉日',
//         text: '不知道怎么挑选好日子？专业择吉大师帮你搞定！',
//         image: '0',
//         imageURL: 'https://coco70.51wnl.com/mingli/img/zj/share.jpg',
//         targetUrl: 'http://coco70.youloft.cn/mingli/zj_index.html',
//         perfix: ''
//     };
//     try {
//         if (window.ylwindow) {
//             ylwindow.reportHasShare(true);
//             location.href = 'protocol://share:' + encodeURI(JSON.stringify(textObj1));
//         }
//         else {
//             location.href = 'protocol://share#' + encodeURI(JSON.stringify(textObj));
//         }
//     }
//     catch (e) { }
//     return 1;
// };
var title="万年历择吉日";
var textObj = {
    title: title,
    text: '不知道怎么挑选好日子？专业择吉大师帮你搞定！',
    image: "0",
    imageURL: 'https://coco70.51wnl.com/mingli/img/zj/share.jpg',
    url:"http://coco70.51wnl.com/mingli/zj_index.html",
    pureText:'不知道怎么挑选好日子？专业择吉大师帮你搞定！',
    prefix:""
};
var textObj1={
    title: title,
    text: '不知道怎么挑选好日子？专业择吉大师帮你搞定！',
    image: "0",
    imageURL: 'http://coco70.51wnl.com/mingli/img/zj/share.jpg',
    targetUrl:"http://coco70.51wnl.com/mingli/zj_index.html",
    perfix:""
};
function appCallback_share(){
    try{
        if(window.ylwindow){
            ylwindow.reportHasShare(true);
            location.href="protocol://share:" + encodeURI(JSON.stringify(textObj1));
        }
        else{
            location.href="protocol://share#" + encodeURI(JSON.stringify(textObj));
        }
    }
    catch (e){}
    return 1;
}
/*
 * marquee plugin
 * @animateTime 运动时间
 * @stopTime 暂停时间
 * @adjustHeight 调整高度
 */
(function ($) {
	$.fn.marquee = function (option) {
		var self = this;
		var defaultSetting = {
			animateTime: 1000,
			stopTime: 5000,
			adjustHeight: 15
		};
		var setting = $.extend(defaultSetting, option);
		setTimeout(function () {
			setInterval(function () {
				var size = parseInt(self.find('.marqueeItem:first').height()) + setting.adjustHeight;
				self.animate({
					marginTop: -size + 'px'
				}, setting.animateTime, function () {
					self.find('.marqueeItem').next().prependTo(self);
					self.find(".marqueeItem:first").hide();
					self.css({
						marginTop: 0 + 'px'
					});
					self.find('.marqueeItem:last').removeClass('hidden');
					self.find('.marqueeItem:first').show();
				});
			}, setting.stopTime);
		}, 0)
		return this;
	}
}(jQuery));