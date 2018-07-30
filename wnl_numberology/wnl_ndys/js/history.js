var astroList = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];
$(function() {
	var userId = getQueryValue('userId');
	var deviceId = getQueryValue('deviceId');
	var wnl_command_wx_local = localStorage.getItem('wnl_pay_ndys_local');
	if (wnl_command_wx_local) {
		wnl_command_wx_local = JSON.parse(wnl_command_wx_local);
		var openid = wnl_command_wx_local.id;
		userId = '';
		deviceId = 'wx_' +  openid;
	}
	$.ajax({
		cache: false,
		type: 'GET',
		dataType: 'json',
		url: '//coco70.51wnl.com/numberologynew/TarotFate/GetOrderList',
		// url: '//showvote.cqyouloft.com/numberologynew/TarotFate/GetOrderList',
		data: {
			'UserID': userId,
			'DeviceID': deviceId
		},
		success: function(result) {
			if (result.status == 0) {
				for (var i = 0; i < result.data.length; i++) {
					var item = result.data[i];
					var temp_history_item = $('.temp_history_item').clone();
					var index = astroList.indexOf(item.starName);
					temp_history_item.attr('href', 'result.html?orderid=' + item.orderID + '&userId=' + userId + '&deviceId=' + deviceId + '&index=' + index);
					temp_history_item.find('.item_name').html('姓名：' + decodeURIComponent(item.name));
					temp_history_item.find('.item_date').html('测算时间：' + item.createTime.substr(0, 10).replace('-', '年').replace('-', '月') + '日');
					for (var j = 0; j < item.details.length; j++) {
						if (parseInt(item.details[j].payStatus, 10) === 1) {
							temp_history_item.find('.quarter_list .quarter_item:nth(' + j + ')').addClass('payed');
						}
					}
					temp_history_item.removeClass('hidden');
					temp_history_item.removeClass('temp_history_item');
					temp_history_item.appendTo('.history_list');
				}
			}
		}
	});
});

function getQueryValue(key, style) {
	if (style === undefined || style === '') {
		style = '&';
	}
	var match = location.href.match(new RegExp(key + '=([^' + style + ']*)'));
	return (match && match[1]) || '';
}
var title = '八字难理解？生肖怕不准？';
var text = '没关系！万年历独创年运让你2017所向披靡！';
var imageURL = 'https://coco70.51wnl.com/numberologynew/ndys/img/share.jpg';
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
		}
		else {
			location.href = 'protocol://share#' + encodeURI(JSON.stringify(textObj));
		}
	}
	catch (e) {}
	return 1;
}