var _hmt = _hmt || [];
var posId = getQueryString("posId") && getQueryString("posId").length !== 0 ? getQueryString("posId") : "";
var boundId = getQueryString("boundId") && getQueryString("boundId").length !== 0 ? getQueryString("boundId") : "";
var couponId = getQueryString('couponId') || '';
var pageObj = (function () {
	return {
		api: {
			createOrder: "//coco70.51wnl.com/NumberologyNew/NRLorder/CreatejpOrder?",
			getResult: "../tools/bzcs_result.html?posId=" + posId + "&couponId=" + couponId + "&imei=" + imei + "&orderid="
		},
		page: {
			history: "../bzcs_history.html?userId=wnl_test&deviceId=&mac=&imei="
		}
	};
})();
var userId = "",
	deviceId = "";

userId = getQueryString("userId") && getQueryString("userId").length !== 0 ? getQueryString("userId") : "";
deviceId = getQueryString("deviceId") && getQueryString("deviceId").length !== 0 ? getQueryString("deviceId") : "";
var ua = window.navigator.userAgent;
var appVersion = /[a-zA-Z]/.test(ua.split(' ').pop()) ? '1.0.0' : ua.split(' ').pop();
var sysVersion = GetIOSVersion() || getAndroidVersion();

function GetIOSVersion() {
	if (window.MSStream) {
		return false;
	}
	var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
		version;
	if (match !== undefined && match !== null) {
		version = [
			parseInt(match[1], 10),
			parseInt(match[2] || 0, 10),
			parseInt(match[3] || 0, 10)
		];
		return version.join('.');
	}

	return false;
}

function getAndroidVersion() {
	ua = ua.toLowerCase();
	var match = ua.match(/android\s([0-9\.]*)/);
	return match ? parseFloat(match[1]) : false;
}
userId = getQueryString("userId") && getQueryString("userId").length !== 0 ? getQueryString("userId") : "";
deviceId = getQueryString("deviceId") && getQueryString("deviceId").length !== 0 ? getQueryString("deviceId") : "";
var mac = getQueryString("mac") && getQueryString("mac").length !== 0 ? getQueryString("mac") : "",
	channel = getQueryString("channel") && getQueryString("channel").length !== 0 ? getQueryString("channel") : "",
	imei = getQueryString("imei") && getQueryString("imei").length !== 0 ? getQueryString("imei") : "",
	idfa = getQueryString("idfa") && getQueryString("idfa").length !== 0 ? getQueryString("idfa") : "";
var Token = getQueryString('pToken') || getQueryString('PToken') || getQueryString('ptoken') || "";
var pToken = getQueryString('pushToken') || getQueryString('PushToken') || getQueryString('pushtoken') || "";
if (boundId) {
	localStorage.setItem("boundid", boundId);
} else {
	localStorage.removeItem("boundId");
}
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
};
var sourceType = 'wnl';
if (browser.isIOS()) {
	sourceType = 'wnl_ios';
	if (boundId) {
		var boundstring = '';
		switch (boundId) {
		case 'com.ireadercity.yhgrlc':
			boundstring = '_5';
			break;
		case 'com.51wnl.wnl-shadow2':
			boundstring = '_2';
			break;
		case 'com.51wnl.wnl-shadow1':
			boundstring = '_1';
			break;
		case 'com.ireadercity.zhwll':
			boundstring = '';
			break;
		}
		sourceType += (boundstring);
	}
} else if (browser.isAndroid()) {
	sourceType = 'wnl_android';
} else {
	sourceType = 'other';
}
//var ua=navigator.userAgent.toLocaleLowerCase();
//imei
//if(ua.indexOf("android")>-1||imei!=="[IMEI]"){
//    deviceId="";
//}
//else{
//    imei="";
//}
//var versionIndex=getWNLVersion();
//if(versionIndex>=433){
//    var oldHref=window.location.href;
//    window.location.href=oldHref.replace("Numberology","NumberologyTest");
//}
//function getWNLVersion(){
//    var ua=navigator.userAgent.toLowerCase();
//    //var ua="Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H141 wnl 4.3.3".toLowerCase();
//    var index1=ua.indexOf("wnl");
//    var versionCode=ua.substring(index1+4);
//    var codeList=versionCode.split(".");
//    return parseInt(codeList[0]*100)+parseInt(codeList[1]*10)+parseInt(codeList[2]);
//}
if (userId === null || userId.toLowerCase() === "[wnluserid]") {
	userId = "";
}
if (deviceId === null || deviceId.toLowerCase() === "[openudid]") {
	deviceId = "";
}
if (mac === null || mac.toLowerCase() === "[mac]") {
	mac = "";
}
if (imei === null || imei.toLowerCase() === "[imei]") {
	imei = "";
}
if (idfa === null || idfa.toLowerCase() === "[idfa]") {
	idfa = "";
}
// 判断非微信下 && userId 和 deviceId 为空 || 不是wnl客户端打开时 调用guid生成接口
console.log('check');
if (!browser.isWx() && (!browser.isWnl() || (userId === '' && deviceId === ''))) {
	console.log('check2');
	if (localStorage.getItem('wnl_tlp_guid')) {
		console.log('check3');
		userId = localStorage.getItem('wnl_tlp_guid');
		deviceId = localStorage.getItem('wnl_tlp_guid');
	} else {
		console.log('check22');
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/UniqueID/NewGuid',
			type: 'get',
			data: 'json',
			success: function (response) {
				userId = response.toString();
				deviceId = response.toString();
				localStorage.setItem('wnl_tlp_guid', userId);
				console.log('check32');
			}
		});
	}
}

var openid = '';
var unionid = '';
document.addEventListener('WeixinJSBridgeReady', function () {
	openid = getQueryString('openid');
	unionid = getQueryString('unionid');
	//如果执行到这块的代码,就说明是在微信内部浏览器内打开的.
	var wnl_loc = JSON.parse(localStorage.getItem('wnl_tlp_local'));
	if (wnl_loc && wnl_loc.wnlUserId) {
		userId = wnl_loc.wnlUserId;
		openid = wnl_loc.openid;
		unionid = wnl_loc.unionid;
		deviceId = '';
		if (localStorage.getItem('trigger_flag') === 'yes') {
			$("#btnMeasure").trigger('click');
		}
	} else if (!openid) {
		window.localStorage.setItem('wnl_location_direct', window.location.href);
		//location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
	} else {
		var datastring = "{\"OpenId\":\"" + openid + "\",\"Unionid\":\"" + unionid + "\",\"Gender\":0,\"Platform\":\"2\",\"OpenName\":\"E10ADC3949BA59ABBE56E057F20F883E\",\"Desc\":\"\",\"AppId\":\"ServiceAccount\"}"
		var data = {
			'DataString': datastring
		}
		$.ajax({
			url: '//u.51wnl.com/Login/OpenLogin?cid=Youloft_Android&av=4.2.6&mac=00:11:22:33:44:55&idfa=b622c089e7e14d2c2fa8c9129dafbb51&did=b622c089e7e14d2c2fa8c9129dafbb51&chn=wnl_anzhi&cc=CN&lang=zh&bd=com.youloft.calendar',
			dataType: 'json',
			type: 'POST',
			data: data,
			async: false,
			success: function (response) {
				userId = response.data.wnlUserId;

				//测试
				window.localStorage.setItem('wnl_tlp_local', JSON.stringify({
					wnlUserId: userId,
					openid: openid,
					unionid: unionid
				}));
				location.href = localStorage.getItem('wnl_location_direct');
			},
			error: function (response) {
				console.log(response);
			}
		});
	}
});

$(function () {
	//confirm(document.referrer);
	//if($(window).width()<=320&&$(".projectLine").css("font-size")!=="11px"){
	//    $(".projectLine").css("font-size","11px");
	//    $("#spBirthDate").css("text-indent","0");
	//}
	//if($(window).height()<520&&$(".yiqiDesc").css("position")==="absolute"){
	//    $(".yiqiDesc").css("position","static");
	//}
	//if($(window).height()<520&&$(".wnlBannerLink").css("position")==="absolute"){
	//    $(".wnlBannerLink").css("position","static");
	//}

	$(window).on("resize", function () {
		if ($(window).height() > 520) {
			$(".yiqiDesc").css("position", "absolute");
		} else if ($(window).height() < 520 && $(".yiqiDesc").css("position") === "absolute") {
			$(".yiqiDesc").css("position", "static");
		}
		if ($(window).height() > 520) {
			$(".wnlBannerLink").css("position", "absolute");
		} else if ($(window).height() < 520 && $(".wnlBannerLink").css("position") === "absolute") {
			$(".wnlBannerLink").css("position", "static");
		}
	});
	var bornDate = "";
	var is_android = navigator.userAgent.toLocaleLowerCase().indexOf("android") > -1;
	// if(navigator.userAgent.toLocaleLowerCase().indexOf("android")===-1){
	//     FastClick.attach(document.getElementById("btnMeasure"));
	// }
	//FastClick.attach(document.body);
	$(document).on("touchstart", function (e) {}, true);

	$('#spBirthDate').mobiscroll().datePicker({
		theme: "ios",
		mode: "scroller",
		display: "bottom",
		lang: "zh",
		isSolar: 1,
		enableSolarLunar: 1,
		showSolarLunar: 0,
		enableIgnore: 0,
		onSelect: function (r, t) {}
	});
	$('#spBirthDate').mobiscroll("setArrayVal", [1990, 1, 1], !1, !1, !1, 0);


	$("#ddlBirthHour").on("click", function () {
		$(".mask").removeClass("hidden");
	});
	$("#ddlBirthHour").on("blur", function () {
		$(".mask").trigger("click");
	});
	$(".mask").click(function () {
		$(this).addClass("hidden");
	});


	$("#ddlBirthHour").change(function () {
		$(".mask").trigger("click");
		if ($(this).val() === "-1" || $(this).val() === "null" || $(this).val().length === 0) {
			return false;
		}
		bornTime = $(this).val();
		$(".bornTimeTxt").html($("#ddlBirthHour option:selected").html());
	});
	$(".sexSelect").click(function () {
		$(".sexIcon").removeClass("active");
		$(this).find(".sexIcon").addClass("active");
		if ($(this).hasClass("manSexSelect")) {
			sex = 1;
		} else if ($(this).hasClass("womanSexSelect")) {
			sex = 0;
		}
	});

	$("#ddlBirthHour").val("24");
	$("#ddlBirthHour").trigger("change");
	$("#txtName").val("");
	$("#spBirthDate").val("");
	$("#descModal .modal-body").height($("#descModal").height() - 45 - 51);

	if (browser.isWnl()) {
		setTimeout(function () {
			location.href = "protocol://getuserinfo#userinfocallback";
		}, 0);
	}
	var isWorking = false;
	$("#btnMeasure").on('click', function () {
		if (isWorking) {
			return false;
		}
		var name = $("#txtName").val().trim();
		bornDate = $("#spBirthDate").val().substr(3).trim().replace("年", "-").replace("月", "-").replace("日", "");
		if (localStorage.getItem('trigger_flag') === 'yes') {
			name = localStorage.getItem('trigger_name');
			bornDate = localStorage.getItem('trigger_bornDate');
			bornTime = localStorage.getItem('trigger_bornTime');
			localStorage.setItem('trigger_flag', 'no');
		}

		_hmt.push(['_trackEvent', 'bacs_confirm', 'click', 'confirm']);
		isWorking = true;

		if (name.length === 0) {
			isWorking = false;
			$("#tipModal").modal({
				showString: "请填写您的姓名"
			});
			return false;
		}

		if (bornDate.length === 0) {
			isWorking = false;
			$("#tipModal").modal({
				showString: "请选择您的出生日期"
			});
			return false;
		}
		if (bornTime === "-1") {
			isWorking = false;
			$("#tipModal").modal({
				showString: "请选择您的出生时间"
			});
			return false;
		}

		if (browser.isWx()) {
			if (!openid) {
				localStorage.setItem('trigger_flag', 'yes');
				localStorage.setItem('trigger_name', name);
				localStorage.setItem('trigger_bornDate', bornDate);
				localStorage.setItem('trigger_bornTime', bornTime);
				location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
			}
		}
		
		if (userId === "" && deviceId === "" && mac === "" && imei === "") {
			isWorking = false;
			$("#tipModal").modal({
				showString: "未获取到相关信息"
			});
			return false;
		}

		var prm = {
			name: name,
			birth: bornDate + ' ' + bornTime + ':00:00',
			sex: sex,
			userId: userId,
			deviceId: deviceId,
			mac: "",
			clientType: sourceType,
			posId: posId,
			boundId: boundId,
			Token: Token,
			pToken: pToken,
			GoodsID: '41DBA1789A644753A408CD78DAF79B00',
			imei: imei,
			idfa: idfa,
			sysVersion: sysVersion,
			appVersion: appVersion
		};
		if (bornTime === "24") {
			prm.birth = bornDate + ' ' + '01:59:59';
		}
		var clientObj = {
			"bzcs": {
				"name": name, //姓名 未填传空字符串
				"sex": sex, //性别 0：女 1：男 -1：未填
				"date": bornDate, //出生日期 1988-04-22 未填传空字符串
				"time": bornTime + ':00' //出生时间  未填传空字符串
			}
		};
		if (originalAllObj && !originalAllObj.native_jryc) {
			clientObj = {
				"bzcs": {
					"name": name,
					"sex": sex,
					"date": bornDate,
					"time": bornTime + ':00'
				},
				"native_jryc": {
					"name": name,
					"sex": sex,
					"date": bornDate,
					"time": bornTime + ':00'
				}
			};
			if (bornTime === "24") {
				clientObj.native_jryc.time = "";
			}
		}
		$.ajax({
			cache: false,
			type: "GET",
			dataType: "json",
			url: pageObj.api.createOrder + $.param(prm),
			success: function (result) {
				isWorking = false;
				if (result.status == 0) {
					if (browser.isWnl()) {
						location.href = "protocol://saveuserinfo#" + Base64.encode(JSON.stringify(clientObj));
					}
					$(".redirectLink").attr("href", pageObj.api.getResult + result.data);
					setTimeout(function () {
						if (is_android) {
							window.location.href = pageObj.api.getResult + result.data;
						} else {
							$(".clickContent").trigger("click");
						}
					}, 0);
				} else {
					alert("创建订单错误,请重试");
				}
			},
			error: function (xhr, ajaxOperation, throwErr) {
				isWorking = false;
				return false;
			}
		})
	});

	$("#btnRecords").click(function () {
		_hmt.push(['_trackEvent', 'bacs_history', 'click', 'history']);
		$(".redirectLink").attr("href", "bzcs_history.html?userId=" + userId + "&deviceId=" + deviceId + "&mac=" + mac + "&imei=" + imei + '&posId=' + posId + '&channel=' + channel);
		setTimeout(function () {
			if (is_android) {
				window.location.href = "bzcs_history.html?userId=" + userId + "&deviceId=" + deviceId + "&mac=" + mac + "&imei=" + imei + '&posId=' + posId + '&channel=' + channel;
			} else {
				$(".clickContent").trigger("click");
			}
		}, 0);
	});
	$(".infoIntroContent").click(function () {
		$("#descModal").modal();
		$("body").addClass("noscroll");
	});
	$("#descModal").on("hide.bs.modal", function () {
		$("body").removeClass("noscroll");
	});
	if (getQueryString("share")) {
		$(".wnlBannerLink").removeClass("hidden");
		$(".yiqiDesc").addClass("hidden");
	}
	ua = navigator.userAgent.toLowerCase();
	var wnl = ua.indexOf("wnl") > -1;
	if (!wnl) {
		$(".wnlBanner").show();
	}
	$(".closeBanner").click(function () {
        $(".wnlBanner").hide();
        
	});
	$(".downloadBtn").click(function () {
		var ua = navigator.userAgent.toLocaleLowerCase();
		var wx = ua.indexOf("micromessenger") > -1;
		var isIOSPhone = ua.indexOf("iphone") > -1 || ua.indexOf("ipod") > -1;
		var isIOS = isIOSPhone || ua.indexOf("ipad") > -1;
		var isAndroid = ua.indexOf("android") > -1;
		if (wx) {
			_hmt.push(['_trackEvent', 'jryc_download_wx_click', 'click', 'jryc_download_wx_click', 'jryc_download_wx_click']);
			location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
		} else {
			if (isIOS) {
				_hmt.push(['_trackEvent', 'jryc_download_ios_click', 'click', 'jryc_download_ios_click', 'jryc_download_ios_click']);
				location.href = "http://um0.cn/89wDL";
			} else if (isAndroid) {
				_hmt.push(['_trackEvent', 'jryc_download_android_click', 'click', 'jryc_download_android_click', 'jryc_download_android_click']);
				location.href = "http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]";
			} else {
				location.href = "http://www.51wnl.com";
			}
		}
	});


});
var textObj1, textObj;

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}

function appCallback_share() {
	_hmt.push(['_trackEvent', 'bzcs_share_click', 'click', 'bzcs_share_click', 'bzcs_share_click']);
	var title = "我在万年历做的八字测算，好准！你也来看看？";
	var link = location.href + "&share=1";
	var imageURL = '//mobile.51wnl.com/numberology/Tools/img/bzcsShare.jpg';
	textObj = {
		text: title,
		image: '0',
		imageURL: imageURL,
		url: link,
		pureText: title,
		prefix: ""
	};
	textObj1 = {
		text: title,
		image: '0',
		imageURL: imageURL,
		targetUrl: link,
		perfix: ""
	};
	try {
		if (window.ylwindow) {
			ylwindow.reportHasShare(true);
			location.href = "protocol://share:" + encodeURI(JSON.stringify(textObj1));
		} else {
			location.href = "protocol://share#" + encodeURI(JSON.stringify(textObj));
		}
	} catch (e) {
		alert(e)
	}
	return 1;
}
var sex = 1; //男
var bornTime = "-1";
var originalAllObj;

function userinfocallback(result) {
	var originalString = Base64.decode(result);
	originalAllObj = JSON.parse(originalString);
	var originalObj = originalAllObj.bzcs || originalAllObj.native_jryc || originalAllObj.native_usercenter;
	if (originalObj.name && originalObj.name.length !== 0) {
		$(".nameTxt").val(originalObj.name);
	}
	if (originalObj.date && originalObj.date.length !== 0) {
		var year = (originalObj.date.substring(0, 4)),
			month = (originalObj.date.substring(5, 7)),
			day = (originalObj.date.substring(8, 10));
		$("#spBirthDate").val("公历 " + year + "年" + month + "月" + day + "日");
		$('#spBirthDate').mobiscroll("setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
	}
	if (originalObj.time && originalObj.time.length !== 0) {
		var hour = originalObj.time.substr(0, 2);
		$("#ddlBirthHour").val(hour);
		$("#ddlBirthHour").trigger("change");
	}
	if (originalObj.sex !== undefined && parseInt(originalObj.sex) !== -1) {
		sex = parseInt(originalObj.sex);
		if (sex === 0) {
			$(".manSexSelect .sexIcon").removeClass("active");
			$(".womanSexSelect .sexIcon").addClass("active");
		} else {
			$(".manSexSelect .sexIcon").addClass("active");
			$(".womanSexSelect .sexIcon").removeClass("active");
		}
	}
	if (originalAllObj.native_score) {
		var native_score = originalAllObj.native_score;
		if (native_score.userId && native_score.userId.length !== 0 && userId.length === 0) {
			userId = native_score.userId;
		}
		if (native_score.deviceId && native_score.deviceId.length !== 0 && deviceId.length === 0) {
			deviceId = native_score.deviceId;
		}
	}
}

function str2Int(str) {
	str = str.replace(/^0+/g, '');
	if (str.length == 0) {
		return 0;
	}
	return parseInt(str);
}

function ylappCallback_back() {
	if (localStorage.getItem("old_bzcs_tag")) {
		localStorage.removeItem("old_bzcs_tag");
		document.location.href = "protocol://exit#";
		return 1;
	} else {
		return 0;
	}
}
//<script>
//var testCount=1;
//function ylappCallback_back()
//{
//    confirm("back click 4");
//    if(testCount===1){
//        document.location.href="protocol://exit#";
//        setTimeout(function () {
//            $("#clickConent").trigger("click");
//        },0);
//        testCount++;
//    }
//    else{
//        testCount=1;
//        document.location.href="protocol://exit#";
//    }
//    return 1;
//}
//</script>
//<script>
//function ylappCallback_back()
//{
//    document.location.href="http://zj.ios.ijinshan.com/wnl/jp";
//    return 1;
//}
//</script>
