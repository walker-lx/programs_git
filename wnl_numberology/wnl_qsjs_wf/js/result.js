var qianshiDesc;
//分享图片URL
var imageURL;


var userId;
var deviceId;
var orderId;

var mac;
var imei;
var idfa;
var channel;
var boundId;
var pushToken;
var pToken;
var posId;
var posId;
var couponId;
var openId;
var unionId;

var isPay;
var isShare;
var isPayBack;
var goodsId;

/* goodsId = 'F4B189A3A2A447DB828F2D6A4FB40FDC'; //正式 */
goodsId = 'C96997A0DCDF436CB902ED40E0840AB2'; //测试
/* goodsId = '0DF4029BD4C0430AA989C94348509B31' //往返APP-正式 */
/* goodsId = 'E734EF5E95F04EADB4EB809F06969241' //往返APP-测试 */

function getQueryValue(key) {
	var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg) || window.location.hash.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}

userId = getQueryValue('userId') || getQueryValue('userid');
deviceId = getQueryValue('deviceId') || getQueryValue('deviceid');
orderId = getQueryValue('orderId') || getQueryValue('orderid');
posId = getQueryValue('posId') || getQueryValue('posid');
pToken = getQueryValue('pToken') || getQueryValue('ptoken');
pushToken = getQueryValue('pushToken') || getQueryValue('pushtoken');
mac = getQueryValue('mac');
imei = getQueryValue('imei');
idfa = getQueryValue('idfa');
boundId = getQueryValue('boundid') || getQueryValue('boundId');
channel = getQueryValue('channel');
couponId = getQueryValue('couponId') || '';
isShare = getQueryValue('isShare');
isPayBack = getQueryValue('isPayBack');
openid = '';
unionid = '';

var ua = window.navigator.userAgent;
//判断设备
var browser = {
	isAndroid: function () {
		return ua.match(/Android/i) ? true : false;
	},
	isIOS: function () {
		return ua.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	isWx: function () {
		return ua.match(/micromessenger/i) ? true : false;
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

var isWanNianLi = /wnl/i.test(ua);

if (browser.isWx()) {
	var wnl_loc = JSON.parse(localStorage.getItem('wnl_tlp_local'));
	if (wnl_loc && wnl_loc.openid) {
		openid = wnl_loc.openid;
		userid = wnl_loc.wnlUserId;
	}
} else {
	if (localStorage.getItem('wnl_tlp_guid')) {
		userid = localStorage.getItem('wnl_tlp_guid');
	}
}


$(document).on('click', '.shareSection', function () {
	appCallback_share();
})

$(document).on('click', '.shareSubmitBtn', function () {
	location.href = 'https://mobile.51wnl.com/numberology/qsjs/index.html?userId=WNLUSERID&deviceId=OPENUDID&pushToken=PTOKEN&pToken=PTOKEN&mac=MAC&imei=IMEI&idfa=IDFA&channel=CHANNEL&posId=posId&boundId=BUNDLE';
})

//穿越前世
$(document).on('click', '.bottomFixBtnPaid', function () {
	location.href = location.href.replace('&payresult=1', '') + '&isShare=1&isPayBack=1';
})

//回到今生
$(document).on('click', '.bottomFixBtnBack', function () {
	location.href = location.href.replace('&isShare=1&isPayBack=1', '').replace('&payresult=1', '');
})

//相关产品
getRelevantGoods();

function getRelevantGoods() {
	$.ajax({
		url: '//coco70.51wnl.com/numberologynew/BaseCeSuan/GetRelevantGoodsList?size=3',
		type: 'get',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		async: false,
		beforeSend: function () {

		},
		success: function (res) {
			var goodsData = res.data;
			var goodsTemplate = '<div class="bottomProductContent">\
                    <img src="<%- imgUrl %>" class="">\
                    <div class="productTitle"><%- title %></div>\
                    <div class="productTestNum"><%- usenumStr %></div>\
                    <a class="goodsURL" href="<%- url %>"></a>\
                    </div>';

			$.each(goodsData, function (index, item) {
				var usenumStrDis;
				if (this.useNum > 10000) {
					usenumStrDis = parseFloat(this.useNum / 10000);
					usenumStrDis = usenumStrDis.toFixed(1) + '万';
				} else {
					usenumStrDis = this.useNum;
				}
				var mkpItem = _.template(goodsTemplate)({
					imgUrl: this.img,
					title: this.title,
					usenumStr: usenumStrDis + '人参与',
					url: this.url,
				});
				$('.bottomProduct').append(mkpItem);
			})

		},
		error: function (res) {
			console.log('res=' + res);
		}
	});
}

//支付
$(document).on('click', '.jinshegnContentDetail,.bottomFixBtnFree', function () {
	var money = 68;
	var source = '星盘前世今生';
	var parterId = 'ChartPastLife';
	goodsId = goodsId;
	var orderName = '星盘前世今生';
	if (!unionId) {
		if (userId) {
			unionId = userId;
		} else {
			unionId = deviceId;
		}
	}

	location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=' + money + '&source=' + source + '&orderName=' + orderName + '&parterid=' + parterId + '&goodsid=' + goodsId + '&parteruserid=' + unionId +
		'&data=' + orderId + '&posId=' + posId + '&openid=' + openid + '&couponId=' + couponId + '&imei=' + imei + '&channel=' + channel + '&returnUrl=' + encodeURIComponent(location.href);
})

getOrderDetail()

function getOrderDetail() {
	var jsonData = JSON.stringify({
		UserID: userId,
		OrderID: orderId,
		DeviceID: deviceId
	})

	$.ajax({
		url: '//coco70.51wnl.com/numberologynew/ChartPastLife/GetOrderDetail',
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		data: jsonData,
		async: false,
		beforeSend: function () {

		},
		success: function (res) {
			var resultData = res.data;
			dataImg = resultData.img;
			isPay = res.data.isPay;
			if (!isPay) {
				var sex = res.data.sex;
				//根据性别随机去图片
				$('.qianshiPic').css('background-image', 'url(' + dataImg + ')');
				imageURL = dataImg;

				//如果是分享
				if (isShare == 1) {
					$('.shareSubmitBtn').show();
				} else {
					$('.isShare').show();
				}
				var resultJsonData = res.data.contentData;
				var lunhuiJsonData = resultJsonData[1];
				var yeliData = resultJsonData[2]

				var qinshiLunHuiString;
				var name = resultData.name;
				if (name.length > 4) {
					$('.qianshiLunHuiNum').css('letter-spacing', -0.4);
				}
				var sex = resultData.sex;
				var lunhuiNum = lunhuiJsonData[0].other;
				qianshiDesc = lunhuiJsonData[1].other;
				var qianshiDesc01Detail = lunhuiJsonData[2].content;
				var qianshiDesc02 = lunhuiJsonData[3].content;
				var qianshiJuePei = lunhuiJsonData[4].other;
				qinshiLunHuiString = name + '经历了' + lunhuiNum + '世轮回';

				$('.qianshiLunHuiNum').text(qinshiLunHuiString);
				$('.qianshiDesc').text(qianshiDesc);
				$('.qianshiDesc01Detail').text(qianshiDesc01Detail);
				$('.qianshiDesc02').text(qianshiDesc02);
				$('.qianshiJuePei').text('前世绝配：' + qianshiJuePei);

				var yeliScore = yeliData[0].other.replace(/[^0-9]/ig, "");
				var yeliContentDetail = yeliData[1].content;

				$('.yeliBoxColor').css('width', yeliScore);
				$('.yeliScore').text(yeliScore);
				$('.yeliContentDetail').text(yeliContentDetail);

				$('.resultFree').show();
				$('.copyright').show();
				if (isShare) {
					$('.copyright').css('margin-bottom', '8px');
				} else {
					$('.bottomFixBtnFree').show();
				}


				if (isWanNianLi) {
					$('.shareSection').show();
				}

			} else {

				//配置红包
				/* if (/payresult=1/.test(location.href)) {
					var shareUrl = 'https://mobile.51wnl.com/numberology/qsjs/index.html?userId=WNLUSERID&deviceId=OPENUDID&pushToken=PTOKEN&pToken=PTOKEN&mac=MAC&imei=IMEI&idfa=IDFA&channel=CHANNEL&posId=posId&boundId=BUNDLE';
					shareRedPackage({
						goodsId: goodsId,
						parterId: "ChartPastLife",
						orderId: orderId,
						url: shareUrl,
						wxShareTitle: '点这里！窥探你前世的秘密！',
						wxShareText: '揭晓前世之命，解开今生的结。',
						wxShareImage: 'https://qiniu.image.cq-wnl.com/content/20170905149cb5987b9a4c039d29dcf57a194d34.png',
						wxShareUrl: location.href.replace('&payresult=1', '') + '&isShare=1',
					});
				} */
				dataImg = resultData.img;
				imageURL = dataImg;
				//获取后台产品配置
				getProduct();

				function getProduct() {
					$.ajax({
						url: '//coco70.51wnl.com/numberologynew/BaseCeSuan/GetRelevantGoodsList?size=3',
						type: 'post',
						dataType: 'json',
						contentType: 'application/json;charset=utf-8',
						async: false,
						beforeSend: function () {

						},
						success: function (res) {
							var productData = res.data;
						},
						error: function (res) {
							console.log('res=' + res);
						}
					});
				}
				if (isShare) {
					var sex = res.data.sex;
					dataImg = resultData.img;
					//根据性别随机去图片
					$('.qianshiPic').css('background-image', 'url(' + dataImg + ')');
					imageURL = dataImg;

					$('.shareSubmitBtn').show();
					var resultJsonData = res.data.contentData;
					var lunhuiJsonData = resultJsonData[1];
					var yeliData = resultJsonData[2]

					var qinshiLunHuiString;
					var name = resultData.name;
					if (name.length > 4) {
						$('.qianshiLunHuiNum').css('letter-spacing', -0.4);
					}
					var sex = resultData.sex;
					var lunhuiNum = lunhuiJsonData[0].other;
					qianshiDesc = lunhuiJsonData[1].other;
					var qianshiDesc01Detail = lunhuiJsonData[2].content;
					var qianshiDesc02 = lunhuiJsonData[3].content;
					var qianshiJuePei = lunhuiJsonData[4].other;
					qinshiLunHuiString = name + '经历了' + lunhuiNum + '世轮回';

					$('.qianshiLunHuiNum').text(qinshiLunHuiString);
					$('.qianshiDesc').text(qianshiDesc);
					$('.qianshiDesc01Detail').text(qianshiDesc01Detail);
					$('.qianshiDesc02').text(qianshiDesc02);
					$('.qianshiJuePei').text('前世绝配：' + qianshiJuePei);

					var yeliScore = yeliData[0].other.replace(/[^0-9]/ig, "");
					var yeliContentDetail = yeliData[1].content;

					$('.yeliBoxColor').css('width', yeliScore);
					$('.yeliScore').text(yeliScore);
					$('.yeliContentDetail').text(yeliContentDetail);

					if (isPayBack == 1) {
						$('.bottomProduct').show();
						$('.shareSubmitBtn').hide();
						$('.bottomFixBtnBack').show();
						$('.resultPaid').show();
						$('.isPaidShare').hide();
						$('.copyright').css('margin-bottom', '55px');
					} else {
						$('.copyright').css('margin-bottom', '7px');
					}

					$('.resultFree').show();
					$('.copyright').show();

				} else {
					var resultJsonData = res.data.contentData;

					var lunhuiJsonData = resultJsonData[1];
					qianshiDesc = lunhuiJsonData[1].other;
					//今生的命运指引
					var zhiyinJsonData = resultJsonData[3];
					var zhiyinKeyWords = zhiyinJsonData[0].keyWords.split('#');
					var zhiyinContent1 = zhiyinJsonData[1].content;
					var zhiyinContent2 = zhiyinJsonData[2].content;
					$($('.jinshengLabelContent')[0]).text(zhiyinKeyWords[0]);
					$($('.jinshengLabelContent')[1]).text(zhiyinKeyWords[1]);
					$($('.jinshengLabelContent')[2]).text(zhiyinKeyWords[2]);
					$($('.zhiyinContentDetail')[0]).text(zhiyinContent1);
					$($('.zhiyinContentDetail')[1]).text(zhiyinContent2);

					//宿命的本我性格
					var xinggeJsonData = resultJsonData[4];
					var xinggeKeyWords = xinggeJsonData[0].keyWords.split('#');
					$($('.xinggeLabelKeyWords')[0]).text(xinggeKeyWords[0]);
					$($('.xinggeLabelKeyWords')[1]).text(xinggeKeyWords[1]);
					$($('.xinggeLabelKeyWords')[2]).text(xinggeKeyWords[2]);
					$('.xinggeContentDetail').text(xinggeJsonData[1].content);

					//今生命运的启示
					var qishiJsonData = resultJsonData[5];
					if (qishiJsonData[0].keyWords.length > 12) {
						$('.qishiLabelKeyWords').css({
							"width": "80%",
							"left": "10%"
						})
					}
					$('.qishiLabelKeyWords').text(qishiJsonData[0].keyWords.replace('。', ''));
					$('.qishiContentDetail').text(qishiJsonData[1].content);
					$('.resultPaid').show();

					//今生努力的目标
					var mubiaoJsonData = resultJsonData[6];
					if (mubiaoJsonData[0].keyWords.length > 12) {
						$('.mubiaoLabelKeyWords').css({
							"width": "80%",
							"left": "10%"
						})
					}
					$('.mubiaoLabelKeyWords').text(mubiaoJsonData[0].keyWords);
					$('.mubiaoContentDetail').text(mubiaoJsonData[1].content);

					//今生痛苦的根源
                    var tongkuJsonData = resultJsonData[7];
                    if (tongkuJsonData[0].keyWords.length > 12) {
						$('.tongkuLabelKeyWords').css({
							"width": "80%",
							"left": "10%"
						})
					}
					$('.tongkuLabelKeyWords').text(tongkuJsonData[0].keyWords);
					$($('.tongkuContentDetail')[0]).text(tongkuJsonData[1].content);
					$($('.tongkuContentDetail')[1]).text(tongkuJsonData[2].content);

					//今生好运的来源
                    var haoyunJsonData = resultJsonData[8];
                    if (haoyunJsonData[0].keyWords.length > 12) {
						$('.haoyunLabelKeyWords').css({
							"width": "80%",
							"left": "10%"
						})
					}
					$('.haoyunLabelKeyWords').text(haoyunJsonData[0].keyWords);
					$($('.haoyunContentDetail')[0]).text(haoyunJsonData[1].content);
					$($('.haoyunContentDetail')[1]).text(haoyunJsonData[2].content);

					//透视另一半的样子
					var lingyibanJsonData = resultJsonData[9];
					$($('.lingyibanContentDetail')[0]).text(lingyibanJsonData[0].content);
					$($('.lingyibanContentDetail')[1]).text(lingyibanJsonData[1].content);

					//今生的感情症结
                    var ganqingJsonData = resultJsonData[10];
                    if (ganqingJsonData[0].keyWords.length > 12) {
						$('.ganqingLabelKeyWords').css({
							"width": "80%",
							"left": "10%"
						})
					}
					$('.ganqingLabelKeyWords').text(ganqingJsonData[0].keyWords);
					$('.ganqingContentDetail').text(ganqingJsonData[1].content);


					$('.resultPaid').show();
					$('.copyright').show();
					$('.bottomFixBtnPaid').show();

					if (isShare) {
						$('.bottomFixBtnBack').show();
					}
				}

				$('.bottomProduct').show();
			}
		},
		error: function (res) {
			console.log('res=' + res);
		}
    });
    
    /* 适配iphoneX */
    if(browser.isIOS() && window.devicePixelRatio===3 && document.body.clientWidth === 375) {
        $('.bottomFixBtn').addClass('iphoneXAdaptationFixed');
        $('.copyright').addClass('copyrightIphoneX');
        $('.iphoneXAdaptation').show();
    }
    /* $('.bottomFixBtn').addClass('iphoneXAdaptationFixed');
    $('.copyright').addClass('copyrightIphoneX');
    $('.iphoneXAdaptation').show(); */
}


/* 独立页面分享 */
var title = '原来我上辈子是“' + qianshiDesc + '” ！ 你是什么？';
var text = '原来我上辈子是“' + qianshiDesc + '” ！ 你是什么？';
var currUrl = location.href.replace('&payresult=1', '') + '&isShare=1';
var textObj = {
	title: title,
	text: text,
	image: '0',
	imageURL: imageURL,
	url: location.href.replace('&payresult=1', '') + '&isShare=1',
	pureText: text,
	prefix: ''
};
var textObj1 = {
	title: title,
	text: text,
	image: '0',
	imageURL: imageURL,
	targetUrl: location.href.replace('&payresult=1', '') + '&isShare=1',
	prefix: ''
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

function ylappCallback_back() {
	if (getQueryValue('history') !== '') {
		if (window.ylwindow) {
			ylwindow.reportHasBack(false);
		}
		return 0;
	}
	location.href = 'index.html?userid=' + userId + '&deviceid=' + deviceId + '&pushtoken=' + pushToken + '&ptoken=' + pToken + '&mac=' + mac + '&imei=' + imei + '&boundid=' + sourceType;
	if (window.ylwindow) {
		ylwindow.reportHasBack(true);
	}
	return 1;
}
