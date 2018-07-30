function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	var patt = window.location.search; //获取参数部分
	var r = patt.substr(1).match(reg);
	if (r != null) {
		return decodeURI(r[2]);
	}
	return null;
}
var deviceid = getQueryString('deviceid');
var userid = getQueryString('userid');
var posid = getQueryString('posid');


$(function () {
	var orderData;

	function getOrderList() {
		$.ajax({
			url: '//coco70.51wnl.com/numberologyNew/TarotDisc/GetOrderList?deviceid=' + deviceid + '&userid=' + userid,
			// url: '//118.190.25.113:8010/numberologyNew/TarotDisc/GetOrderList?deviceid='+deviceid+'&userid='+userid,
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: function (res) {
				orderData = res;
				setOrderList(orderData);
			},
			error: function () {}
		});
	}

	function setOrderList(data) {
		console.log(data.data.length);
		for (var i = 0; i < data.data.length; i++) {
			var list_temp = $('.list_temp').clone();

			list_temp.attr('data-onesex', data.data[i].oneSex);
			list_temp.attr('data-twosex', data.data[i].twoSex);
			list_temp.attr('data-orderid', data.data[i].orderID);
			list_temp.find('.order_id').html(data.data[i].orderID);
			list_temp.find('.one_name').html(data.data[i].oneName);
			list_temp.find('.two_name').html(data.data[i].twoName);
			//未支付
			if (data.data[i].payStatus === 0) {
				list_temp.attr('data-status', 0);
				list_temp.find('.lock_status').html('未解锁');
				list_temp.find('.lock_status').addClass('locked');
				list_temp.find('.lock').attr('src', '../img/lock.png');
				list_temp.find('.lock').addClass('lock');
				list_temp.find('.second_btn').html('解锁');

			}
			//已支付
			else {
				list_temp.attr('data-status', 1);
				list_temp.find('.lock_status').html('已解锁');
				list_temp.find('.lock_status').addClass('unlocked');
				list_temp.find('.lock').attr('src', '../img/unlock.png');
				list_temp.find('.lock').addClass('unlock');
				list_temp.find('.second_btn').html('查看');
			}

			list_temp.removeClass('hidden');
			list_temp.removeClass('list_temp');
			list_temp.appendTo($('.inner_section'));
		}
	}

	getOrderList();

	var data_orderid;
	$(document).on('click', '.first_btn', function (event) {
		event.stopPropagation();
		$('.mask').fadeIn(100);
		$('.prompt_explain').fadeIn(100);
		data_orderid = $(this).parent().parent().data('orderid');
		console.log(data_orderid);
		$('.prompt_explain').attr('data-order', data_orderid);
	});

	$(document).on('click', '.confirm_btn', function () {
		$('.mask').fadeOut(100);
		$('.prompt_explain').fadeOut(100);
		var temp = $('.list_temp');
		if (temp.length > 0) {
			$.ajax({
				url: '//coco70.51wnl.com/numberologynew/TarotDisc/modifyorder?deviceid=' + deviceid + '&orderid=' + data_orderid,
				// url: '//118.190.25.113:8010/numberologynew/TarotDisc/modifyorder?deviceid='+ deviceid +'&orderid='+ data_orderid,
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				success: function () {
					$('[data-orderid=' + data_orderid + ']').remove();
				},
				error: function (res) {
					console.log(res);
				}
			});
		}
	});
	$(document).on('click', '.cancle_btn', function () {
		$('.mask').fadeOut(100);
		$('.prompt_explain').fadeOut(100);
		return false;
	});





	$(document).on('click', '.order_list_temp', function () {
		var orderid = $(this).find('.order_id').text();
		var oneName = $(this).find('.one_name').text();
		var twoName = $(this).find('.two_name').text();
		var oneSex = $(this).data('onesex');
		var twoSex = $(this).data('twosex');
		setTimeout(function () {
			location.href = location.href = 'result.html?orderid=' + orderid + '&userid=' + userid + '&deviceid=' + deviceid + '&posid=' + posid + '&onename=' + oneName + '&onesex=' + oneSex + '&twoname=' + twoName + '&twosex=' + twoSex;
		});
	});

	$(document).on('click', '.second_btn', function (event) {
		event.stopPropagation();
		var orderid = $(this).parent().parent().find('.order_id').text();
		var oneName = $(this).parent().parent().find('.one_name').text();
		var twoName = $(this).parent().parent().find('.two_name').text();
		var oneSex = $(this).parent().parent().data('onesex');
		var twoSex = $(this).parent().parent().data('twosex');

		if ($(this).parent().parent().data('status') === 0) {
			var money = '0.01';
			var source = '塔罗爱情合盘';
			var goodsid = '2C8B778C96D24DD2BD04F80710036E81';
			location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=' + money + '&source=' + source + '&parterid=TarotDisc&goodsid=' + goodsid + '&parteruserid=' + deviceid + '&data=' + orderid + '&returnUrl=' + encodeURIComponent('http://' + location.host + location.pathname + '?orderid=' + orderid);
		} else {
			location.href = 'result.html?orderid=' + orderid + '&userid=' + userid + '&deviceid=' + deviceid + '&posid=' + posid + '&onename=' + oneName + '&onesex=' + oneSex + '&twoname=' + twoName + '&twosex=' + twoSex;
		}
	});
});
//取消显示分享
if (window.ylwindow && window.ylwindow.enableShare) {
	window.ylwindow.enableShare(false);
}
window.appCallback_showShare = function () {
	return 0;
};
//取消显示收藏
if (window.ylwindow && window.ylwindow.enableCollect) {
	window.ylwindow.enableCollect(false);
}
window.appCallback_showCollect = function () {
	return 0;
};
