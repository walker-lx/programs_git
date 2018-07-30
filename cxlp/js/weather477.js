var ua=navigator.userAgent.toLocaleLowerCase();
var wnl=ua.indexOf("wnl")>-1;
var wx1=ua.indexOf("micromessenger")>-1;
var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
var isAndroid=ua.indexOf("android")>-1;
var isWP=ua.indexOf("windows phone")>-1;
var clientWidth = $(window).width();
var zoom=Math.round(clientWidth * 10000 / 375) / 10000;
if(clientWidth<980&&window.devicePixelRatio>1){
    $('body').css("zoom",zoom);
}
$(function(){
	FastClick.attach(document.body);
	var cityid = getQueryString("cityid");

	//获取天气数据
	var weatherData;
	var getWeather = (function(citycode){
		$.ajax({
			url:'http://apic.51wnl.com/CttApi/GetWeatherDetail?tkn=6480F2A608958030D190E9E62590174A&cid=Youloft_IOS&av=4.4.2&mac=00:11:22:33:44:55&did=b622c089e7e14d2c2fa8c9129dafbb51&chn=wnl_anzhi&cc=CN&lang=zh&bd=com.youloft.calendar&t=1430366273&cver=6.0&lasttimestamp=&model=iphone&cardId=78&cityCode='+citycode+'&sign=66069614e98aba9d07b1ad26d94e2450',
			dataType:'JSON',
			type:'GET',
			async: false,
			success: function(result){
				if (typeof result == "object") {
					weatherData = result.data;
				}
				else if (typeof result == "string") {
					weatherData = JSON.parse(result.data);
				}
				var locationName = weatherData.c;
				var temp = weatherData.curr.ct;
				var wt = weatherData.curr.wt;
				var overview = weatherData.curr.tl+'° - '+weatherData.curr.th+'°';
				var fengsu = weatherData.curr.wd;
				var shidu = weatherData.curr.rh;
				var pm = weatherData.aqi;
				var wtext;
				switch(wt){
					case 0:
						wtext = "晴";
						break;
					case 1:
						wtext = "多云";
						break;
					case 2:
						wtext = "阴";
						break;
					case 4:
						wtext = "雷雨";
						break;
					case 5:
						wtext = "雷雨+冰雹";
						break;
					case 7:
						wtext = "小雨";
						break;
					case 8:
						wtext = "中雨";
						break;
					case 10:
						wtext = "大雨";
						break;
					case 14:
						wtext = "下雪";
						break;
					case 18:
						wtext = "雾";
						break;
					case 19:
						wtext = "冻雨";
						break;
					case 20:
						wtext = "沙尘";
						break;
					case 29:
						wtext = "飓风";
						break;
					case 9999:
						wtext = "-";
						break;
				}
				$(".location-name").html(locationName);
				$(".temp").html(temp);
				$(".temp-overview").html(wtext+' '+overview);
				$(".wlist .fs").html(fengsu);
				$(".wlist .sd").html(shidu+'%');
				$(".wlist .kq").html(pm.index+' | '+pm.grade);
			}
		});
		return weatherData;
	})(cityid);

	//获取生活指数
	var indexData;
	var getIndex = (function(cityid){
		$.ajax({
			url:'http://weather.51wnl.com/dress/getdress?cityid='+cityid,
			dataType:'JSON',
			type:'GET',
			async: false,
			success: function(result){
				if (typeof result == "object") {
					var result = result;
				}
				else if (typeof result == "string") {
					var result = JSON.parse(result);
				}
				indexData = result.msg;
				$(".wlist .cy").text(indexData.dressing.brief);
				$(".wlist .gm").text(indexData.flu.brief);
				$(".wlist .yd").text(indexData.sport.brief);
			}
		});
		return indexData;
	})(cityid);

	if(!wnl){
        $(".wnlBanner").show();
    }
	$(".closeBanner").click(function(){
        $(".wnlBanner").hide();
    });
    $(".downloadBtn").click(function(){
        if(wx1){
            location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
        }
        else{
            if(isIOS){
                location.href="http://itunes.apple.com/cn/app/id419805549?mt=8";
            }
            else if(isAndroid){
                location.href="http://download.eoemarket.com/app?id=54861&co_id=0&client_id=140&channel_id=807";
            }
            else if(isWP){
                location.href="http://www.windowsphone.com/en-us/store/app/%E4%B8%87%E5%B9%B4%E5%8E%86/8ffa51ca-df17-e011-9264-00237de2db9e";
            }
            else{
                location.href="http://www.51wnl.com";
            }
        }
    });
	
	var pm = weatherData.aqi;
	var wtext;
	switch(weatherData.curr.wt){
		case 0:
			wtext = "晴";
			break;
		case 1:
			wtext = "多云";
			break;
		case 2:
			wtext = "阴";
			break;
		case 4:
			wtext = "雷雨";
			break;
		case 5:
			wtext = "雷雨+冰雹";
			break;
		case 7:
			wtext = "小雨";
			break;
		case 8:
			wtext = "中雨";
			break;
		case 10:
			wtext = "大雨";
			break;
		case 14:
			wtext = "下雪";
			break;
		case 18:
			wtext = "雾";
			break;
		case 19:
			wtext = "冻雨";
			break;
		case 20:
			wtext = "沙尘";
			break;
		case 29:
			wtext = "飓风";
			break;
		case 9999:
			wtext = "-";
			break;
	}
	//weixin share
	var title = weatherData.c+'，'+weatherData.curr.tl+'°C~'+weatherData.curr.th+'°C'+'，'+wtext+'，'+weatherData.curr.wd+'，湿度'+weatherData.curr.rh+'%，空指'+pm.index+'，'+pm.grade;
	//发送朋友标题
	var fTitle = weatherData.c+'，'+weatherData.curr.tl+'°C~'+weatherData.curr.th+'°C'+'，'+wtext+'，'+weatherData.curr.wd+'，湿度'+weatherData.curr.rh+'%，空指'+pm.index+'，'+pm.grade;
	//分享描述
	var desc = "今天天气报告";
	//分享链接
	var link = 'http://weather.51wnl.com/pages/weather477.html?cityid='+cityid;
	//分享图片链接
	var imgUrl = 'http://weather.51wnl.com/pages/img/shareicon.jpg';
	
	/*textObj = {
        text: title,
        image: "0",
        imageURL:imgUrl,
        url:link,
        pureText:title,
        prefix:""
    };
    textObj1={
        text: title,
        image: "0",
        imageURL:imgUrl,
        targetUrl:link,
        perfix:""
    };*/
	function setShareInfo(){
	    //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
	    wx.onMenuShareTimeline({
	        title: title, // 分享标题
	        link: link, // 分享链接
	        imgUrl: imgUrl, // 分享图标
	        success: function () {
	            // 用户确认分享后执行的回调函数
	            // $(".mask").addClass("hidden");
	        },
	        cancel: function () {
	            // 用户取消分享后执行的回调函数
	        }
	    });
	    //获取“分享给朋友”按钮点击状态及自定义分享内容接口
	    wx.onMenuShareAppMessage({
	        title: fTitle, // 分享标题
	        desc: desc, // 分享描述
	        link: link, // 分享链接
	        imgUrl: imgUrl, // 分享图标
	        //type: '', // 分享类型,music、video或link，不填默认为link
	        //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	        success: function () {
	            // 用户确认分享后执行的回调函数
	            // $(".mask").addClass("hidden");
	        },
	        cancel: function () {
	            // 用户取消分享后执行的回调函数
	        }
	    });
	    //获取“分享到QQ”按钮点击状态及自定义分享内容接口
	    wx.onMenuShareQQ({
	        title: title, // 分享标题
	        desc: desc, // 分享描述
	        link: link, // 分享链接
	        imgUrl: imgUrl, // 分享图标
	        success: function () {
	            // 用户确认分享后执行的回调函数
	            // $(".mask").addClass("hidden");
	        },
	        cancel: function () {
	            // 用户取消分享后执行的回调函数
	        }
	    });
	    //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
	    wx.onMenuShareWeibo({
	        title: title, // 分享标题
	        desc: desc, // 分享描述
	        link: link, // 分享链接
	        imgUrl: imgUrl, // 分享图标
	        success: function () {
	            // 用户确认分享后执行的回调函数
	            // $(".mask").addClass("hidden");
	        },
	        cancel: function () {
	            // 用户取消分享后执行的回调函数
	        }
	    });
	}
	
	wx.ready(function(){
        setShareInfo();
    });
    wx.error(function(res){
        alert(JSON.stringify(res));
    });

});
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
/*var textObj1,textObj;
var isShare=false;
function appCallback_share(){
    $(".shareMask").addClass("hidden");
    isShare=true;
    _hmt.push(['_trackEvent','wnlWeather_share_click', 'click', 'wnlWeather_share_click', 'wnlWeather_share_click']);
    try{
        if(window.ylwindow){
            ylwindow.reportHasShare(true);
            location.href="protocol://share:" + encodeURI(JSON.stringify(textObj1));
        }
        else{
            location.href="protocol://share#" + encodeURI(JSON.stringify(textObj));
        }
    }
    catch (e){
        alert(e)
    }
    return 1;
}*/