//2016-12-06 修改aLink.href = iosSchema;  gjh
var ua = window.navigator.userAgent;
var browser = {
	isAndroid: function () {
		return navigator.userAgent.match(/Android/i) ? true : false;
	},
	isIOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	isWx: function () {
		return navigator.userAgent.match(/micromessenger/i) ? true : false;
	},
	isWp: function () {
		return ua.toLowerCase().indexOf('windows phone') > -1;
	},
	isWnl: function () {
		return ua.toLowerCase().indexOf('wnl') > -1;
	},
	getIOSVersion: function () {
		if (window.MSStream) {
			return false;
		}
		var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/), version;
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
};
var loadTimer = null;
/*
	apkLink：可选，安卓apk下载地址，不传则应用宝微下载
 */
function loadSchema(apkLink) {
	// var iosSchema;
	// if(schema = '') {
	// 	iosSchema = 'https://jptjios.51wnl.com/lilith';  	
	// }
	var iosSchema = 'http://jptjios.51wnl.com/lilith';  	
	var wxAppLink = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.lilith&android_schema=' + azAppLink;//应用宝中app的链接
	var azAppLink = 'arouter://m.youloft.com/ui/mainactivity';
	var loadWating = 1000;
	var iframe = document.createElement('iframe'),
		aLink = document.createElement('a'),
		body = document.body;
	// 隐藏iframe及a
	aLink.style.cssText = iframe.style.cssText = 'display:none;width:0px;height:0px;';
	if (browser.isAndroid()) {
		if (browser.isWx()) {
			window.location.href = wxAppLink;
		}
		else {
			aLink.href = azAppLink;
		}
	}else if (browser.isIOS()) {
		if (browser.getIOSVersion() < 9) {
			window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.lilith';
			return;
		}
		aLink.href = iosSchema;
	}
	body.appendChild(aLink);
	console.log(aLink);
	aLink.click();
	// 如果LOAD_WAITING时间后,还是无法唤醒app，则直接打开下载页
	// opera 无效
	var start = Date.now();
	loadTimer = setTimeout(function () {
		if (document.hidden || document.webkitHidden) {
			return;
		}
		// 如果app启动，浏览器最小化进入后台，则计时器存在推迟或者变慢的问题
		// 那么代码执行到此处时，时间间隔必然大于设置的定时时间
		if (Date.now() - start > loadWating + 200) {
			// come back from app

			// 如果浏览器未因为app启动进入后台，则定时器会准时执行，故应该跳转到下载页
		}
		else {
			if (browser.isAndroid()) {
				if (browser.isWx()) {
					window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.lilith';
				}
				else {
					window.location.href = apkLink && apkLink.length !== 0 ? apkLink : wxAppLink;
				}
			}
			else if (browser.isIOS()) {
				// window.location.href = wxAppLink;
				window.location.href = 'https://itunes.apple.com/cn/app/id1261255522?mt=8';
			}
		}
	}, loadWating);
	//当本地app被唤起，则页面会隐藏掉，就会触发pagehide与visibilitychange事件
	//在部分浏览器中可行，网上提供方案，作hack处理
	var visibilitychange = function () {
		var tag = document.hidden || document.webkitHidden;
		tag && clearTimeout(loadTimer);
	};
	document.addEventListener('visibilitychange', visibilitychange, false);
	document.addEventListener('webkitvisibilitychange', visibilitychange, false);
	// pagehide 必须绑定到window
	window.addEventListener('pagehide', function () {
		clearTimeout(loadTimer);
	}, false);
}