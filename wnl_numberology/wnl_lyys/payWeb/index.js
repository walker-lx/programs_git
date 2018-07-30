var userId = '', deviceId = '';
$(function() {
	if (document.addEventListener) {
		document.addEventListener('touchstart', function() {
		}, false);
	}
	// if (FastClick != undefined) {
	//     FastClick.attach(document.body);
	// }
	location.href = 'protocol://getlocalsdksupport#localsdksupportcallback';
	// setTimeout(function () {
	// 	location.href = 'protocol://getuserinfo#userinfocallback';
	// }, 0);
	var localData = JSON.parse(localStorage.getItem('wnl_lyys_local_data'));
	userId = localData.userId;
	deviceId = localData.deviceId;
	var orderType = 0;
	$('.payedCount').html(money + '元');
	$('.introTitle').html('项目：【' + source + '】');
	var index = parseInt(getQueryString('index'));
	var beginMonth = monthInfo[index].beginDate.substr(0, 4) + '-' + monthInfo[index].beginDate.substr(4, 2);
	var endMonth = beginMonth;
	var discount = getQueryString('discount');
	if (discount && discount !== '0') {
		$('.zhifuCount').html(discount + '元');
		orderType = 1;
		endMonth = monthInfo[index + 2].beginDate.substr(0, 4) + '-' + monthInfo[index + 2].beginDate.substr(4, 2);
	}
	var pushToken = localData.pushToken;
	var pToken = localData.pToken;
	var idfa = localData.idfa;
	var sourceType = localData.sourceType;
	$('.wxConfirmBtn').click(function() {
		// alert(orderId);
		// alert(userId + '   ' + deviceId);
		$('.mask').removeClass('hidden');
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/lunar/PayOrderWithScore',
			type: 'get',
			data: {
				'id': orderId,
				'orderType': orderType,
				'returnUrl': returnUrl,
				'isUseScore': false,
				'userId': userId,
				'deviceId': deviceId,
				'payType': 1,
				'beginMonth': beginMonth,
				'endMonth': endMonth,
				'pushToken': pushToken,
				'pToken': pToken,
				'idfa': idfa,
				'channel': sourceType
			},
			success: function(result) {
				$('.mask').addClass('hidden');
				result = JSON.parse(result);
				if (result.status === 0) {
					orderId = result.data.id;
					code = result.data.code;
					location.href = 'protocol://paywechat#' + encodeURI(decodeURI(result.data.payData + '<p>' + orderId));
				}
			}
		});
	});
	$('.zfbConfirmBtn').click(function() {

		$('.mask').removeClass('hidden');
		var payType = 0;
		if ($(this).data('sdk')) {
			payType = 2;
		}
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/lunar/PayOrderWithScore',
			type: 'get',
			data: {
				'id': orderId,
				'orderType': orderType,
				'returnUrl': returnUrl,
				'channel': sourceType,
				'isUseScore': false,
				'userId': native_score && native_score.userId ? native_score.userId : '',
				'deviceId': deviceId,
				'payType': payType,
				'beginMonth': beginMonth,
				'endMonth': endMonth,
				'pushToken': pushToken,
				'pToken': pToken,
				'idfa': idfa
			},
			success: function(result) {
				$('.mask').addClass('hidden');
				result = JSON.parse(result);
				if (payType === 0) {
					location.href = result.data.payData;
				}
				else {
					if (result.status === 0) {
						orderId = result.data.id;
						code = result.data.code;
						location.href = 'protocol://payali#' + encodeURI(decodeURI(result.data.payData + '<p>' + orderId));
					}
				}
			}
		});
	});
	if (window.ylwindow) {
		ylwindow.enableShare(false);
	}
	//userinfocallback();
});
var native_score;
var isIpad = navigator.userAgent.toLowerCase().indexOf('ipad') > -1;
function userinfocallback(result) {
	var originalString = Base64.decode(result);
	var originalAllObj = JSON.parse(originalString);
	if (!originalAllObj.native_score) {
		return false;
	}
	native_score = originalAllObj.native_score;
	// if (!native_score.score && native_score.score !== 0) {
	// 	return false;
	// }
	if (isIpad) {
		$('.zhifuCount').removeClass('jifen');
		$('.payedCount').addClass('hidden');
		$('.jifenCount').addClass('hidden');
		$('.loginLink').addClass('hidden');
		$('.zhifuSongTipTxt').addClass('hidden');
	}
}
function localsdksupportcallback(result) {
	// alert(result);
	var localsdksupport = JSON.parse(result);
	if (localsdksupport.wechatpay === 1) {
		$('.wxConfirmBtn').removeClass('hidden');
	}
	if (localsdksupport.alipay === 1) {
		$('.zfbConfirmBtn').data('sdk', '1');
	}
}
var money = parseFloat(getQueryString('money'));
var source = getQueryString('source');
var orderId = getQueryString('orderid'), code = '';
// var data = getQueryString('data');
var returnUrl = getQueryString('returnUrl');
function payResult(result) {
	$('.mask').addClass('hidden');
	if (parseInt(result) === 1) {
		window.location.href = returnUrl + '?orderid=' + orderId + '&code=' + code;
	}
}
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}
function appCallback_showShare() {
	return 0;
}
var monthInfo = [
	{
		'year': 2016,
		'month': 11,
		'name': '',
		'beginDate': '20161107',
		'endDate': '20161206'
	},
	{
		'year': 2016,
		'month': 12,
		'name': '',
		'beginDate': '20161207',
		'endDate': '20170105'
	},
	{
		'year': 2017,
		'month': 1,
		'name': '',
		'beginDate': '20170106',
		'endDate': '20170202'
	},
	{
		'year': 2017,
		'month': 2,
		'name': '',
		'beginDate': '20170203',
		'endDate': '20170304'
	},
	{
		'year': 2017,
		'month': 3,
		'name': '',
		'beginDate': '20170305',
		'endDate': '20170403'
	},
	{
		'year': 2017,
		'month': 4,
		'name': '',
		'beginDate': '20170404',
		'endDate': '20170504'
	},
	{
		'year': 2017,
		'month': 5,
		'name': '',
		'beginDate': '20170505',
		'endDate': '20170604'
	},
	{
		'year': 2017,
		'month': 6,
		'name': '',
		'beginDate': '20170605',
		'endDate': '20170706'
	},
	{
		'year': 2017,
		'month': 7,
		'name': '',
		'beginDate': '20170707',
		'endDate': '20170806'
	},
	{
		'year': 2017,
		'month': 8,
		'name': '',
		'beginDate': '20170807',
		'endDate': '20170906'
	},
	{
		'year': 2017,
		'month': 9,
		'name': '',
		'beginDate': '20170907',
		'endDate': '20171007'
	},
	{
		'year': 2017,
		'month': 10,
		'name': '',
		'beginDate': '20171008',
		'endDate': '20171106'
	},
	{
		'year': 2017,
		'month': 11,
		'name': '',
		'beginDate': '20171107',
		'endDate': '20171206'
	},
	{
		'year': 2017,
		'month': 12,
		'name': '',
		'beginDate': '20171207',
		'endDate': '20180104'
	}
];