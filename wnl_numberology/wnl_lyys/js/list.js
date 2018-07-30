var userId = '',
	deviceId = '';
$(function () {
	// setTimeout(function () {
	// 	location.href = 'protocol://getuserinfo#userinfocallback';
	// }, 0);
	var dateNow = new Date();
	// var localData = JSON.parse(localStorage.getItem('wnl_lyys_local_data'));
	// userId = localData.userId;
	// deviceId = localData.deviceId;
	// var imei = localData.imei;
	// var mac = localData.mac;
	// var pushToken = localData.pushToken;
	// var pToken = localData.pToken;
	// var sourceType = localData.sourceType;

	userId = getQueryValue('userId');
	deviceId = getQueryValue('deviceId');
	var posId = getQueryValue('posId') || getQueryValue('posid');
	var pushToken = getQueryValue('pushToken') || getQueryValue('pushtoken');
	var mac = getQueryValue('mac');
	var imei = getQueryValue('imei');
	var pToken = getQueryValue('pToken') || getQueryValue('ptoken');
	var sourceType = getQueryValue('sourceType');
	var idfa = getQueryValue('idfa');
	var jsonObj = {
		userId: userId,
		deviceId: deviceId,
		posId: posId,
		pushToken: pushToken,
		mac: mac,
		imei: imei,
		idfa: idfa,
		pToken: pToken,
		sourceType: sourceType
	};
	var jsonString = jsonToQueryString(jsonObj);

	$.ajax({
		cache: false,
		type: 'GET',
		dataType: 'json',
		url: '//coco70.51wnl.com/numberologynew/lunar/GetOrderList',
		data: {
			'userId': userId,
			'deviceId': deviceId,
			'mac': mac,
			'imei': imei,
			'pushToken': pushToken,
			'pToken': pToken,
			'channel': sourceType
		},
		success: function (result) {
			if (result.status == 0) {
				for (var i = 0; i < result.data.length; i++) {
					for (var j = 0; j < result.data[i].orderList.length; j++) {
						initOrderItem(result.data[i].orderList[j]);
					}
				}
				$('.order_item').each(function () {
					var maxLength = $(this).find('.result_name_content').width() + 30 > $(this).find('.result_date_content').width() ? $(this).find('.result_name_content').width() + 30 : $(this).find('.result_date_content').width();
					$(this).find('.result_name_content').width(maxLength);
					$(this).find('.result_date_content').width(maxLength);
					// $(this).find('.result_name_content,.result_date_content').css('left', '50%');
					// $(this).find('.result_name_content,.result_date_content').css('margin-left', '-' + maxLength / 2 + 'px');
				});
			}
		}
	});

	function initOrderItem(data) {
		if (!data.beginMonth || !data.endMonth) {
			return false;
		}
		var temp_order_item = $('.temp_order_item').clone();
		var name = data.name;
		if (checkWordLen(name) > 8) {
			name = name.substr(0, 4) + '...';
		}
		temp_order_item.find('.info_name').html(name);
		temp_order_item.find('.info_sex').html(data.sex ? '男' : '女');
		temp_order_item.find('.info_date').html(data.birthDay.substr(0, 10).replace('-', '年').replace('-', '月') + '日' + (data.timeHour !== 24 ? data.timeHour + '时' : ''));
		temp_order_item.attr('href', 'result.html' + jsonString + '&orderid=' + data.id + '&code=' + data.code + '&history=1');
		var beginYear = str2Int(data.beginMonth.substr(0, 4)),
			beginMonth = str2Int(data.beginMonth.substr(5));
		var index = 0;
		for (var i = 0; i < monthInfo.length; i++) {
			if (beginYear === monthInfo[i].year && beginMonth === monthInfo[i].month) {
				index = i;
				break;
			}
		}
		var beginDate = monthInfo[index].beginDate,
			endDate = monthInfo[index].endDate;
		if (data.orderType === 0) {
			temp_order_item.find('.order_month').html(((beginYear !== dateNow.getFullYear()) ? (beginYear + '年') : '') + beginMonth + '月');
		} else {
			endDate = monthInfo[index + 2].beginDate;
			temp_order_item.find('.order_month').html(((beginYear !== dateNow.getFullYear()) ? (beginYear + '年') : '') + beginMonth + '月/' + ((str2Int(monthInfo[index + 1].beginDate.substr(0, 4)) !== dateNow.getFullYear()) ? (monthInfo[index + 1].beginDate.substr(0, 4) + '年') : '') + str2Int(monthInfo[index + 1].beginDate.substr(4, 2)) + '月/' + ((str2Int(monthInfo[index + 2].beginDate.substr(0, 4)) !== dateNow.getFullYear()) ? (monthInfo[index + 2].beginDate.substr(0, 4) + '年') : '') + str2Int(monthInfo[index + 2].beginDate.substr(4, 2)) + '月');
		}
		temp_order_item.find('.order_date_range').html(((str2Int(beginDate.substr(0, 4)) !== dateNow.getFullYear()) ? (beginDate.substr(0, 4) + '年') : '') + str2Int(beginDate.substr(4, 2)) + '月' + str2Int(beginDate.substr(6, 2)) + '日~' + ((str2Int(endDate.substr(0, 4)) !== dateNow.getFullYear()) ? (endDate.substr(0, 4) + '年') : '') + +str2Int(endDate.substr(4, 2)) + '月' + str2Int(endDate.substr(6, 2)) + '日');
		temp_order_item.removeClass('temp_order_item');
		temp_order_item.removeClass('hidden');
		temp_order_item.appendTo('.order_list');
	}
});
//检测文字长度
function checkWordLen(str) {
	var num = 0;
	for (var i = 0, l = str.length; i < l; i++) {
		if (str.charCodeAt(i) > 255) { //大于255为中文,小于为英文
			num += 2;
		} else {
			num++;
		}
	}
	return num;
}

function str2Int(str) {
	str = str.replace(/^0+/g, '');
	if (str.length == 0) {
		return 0;
	}
	return parseInt(str);
}
var monthInfo = [{
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
var title = '每月运势早知道';
var text = '流月运势详批，事业、爱情、财富、健康独家开运秘诀';
var imageURL = 'https://coco70.51wnl.com/numberologynew/lyys/img/share.jpg';
var textObj = {
	title: title,
	text: text,
	image: '0',
	imageURL: imageURL,
	url: location.href,
	pureText: text,
	prefix: ''
};
var textObj1 = {
	title: title,
	text: text,
	image: '0',
	imageURL: imageURL,
	targetUrl: location.href,
	perfix: ''
};

function appCallback_share() {
	try {
		if (window.ylwindow) {
			ylwindow.reportHasShare(true);
			location.href = 'protocol://share:' + encodeURI(JSON.stringify(textObj1));
		} else {
			location.href = 'protocol://share#' + encodeURI(JSON.stringify(textObj));
		}
	} catch (e) {}
	return 1;
}

function getQueryValue(key, style) {
	if (style === undefined || style === '') {
		style = '&';
	}
	var match = location.href.match(new RegExp(key + '=([^' + style + ']*)'));
	return (match && match[1]) || '';
}

function jsonToQueryString(json) {
	return '?' +
		Object.keys(json).map(function (key) {
			return encodeURIComponent(key) + '=' +
				encodeURIComponent(json[key]);
		}).join('&');
}
