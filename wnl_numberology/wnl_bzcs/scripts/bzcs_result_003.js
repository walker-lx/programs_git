$(function () {
    //定义goodsID
    var goodsIdTYAndroid = 'E5DCC5ABE757410A8BB39B53170B0762'; //android十年 正式
    var goodsIdTYIOS = '41DBA1789A644753A408CD78DAF79B00'; //IOS十年 正式
    var goodsIdEYAndroid = '51B37564B3F94E1A951F225C93EE7B1D' //android八十年 正式
    var goodsIdEYIOS = '74AF28CE574C4DB580DACD58EEFE0284' //IOS八十年 正式

    //测试goodsID
    // var goodsIdTYAndroid = '41DBA1789A644753A408CD78DAF79B00'; //android十年 测试
    // var goodsIdTYIOS = 'E4CF3D6698834375AD72BE533A67D5E4'; //IOS十年 测试
    // var goodsIdEYAndroid = 'F9AED0D1C119428BB1D1934832E1BC54' //android八十年 测试
    // var goodsIdEYIOS= '36460FC8DA6E4283B8FA3370D58E388B' //IOS八十年 测试 


	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return decodeURIComponent(r[2]);
		}
		return null;
	}
	var localData = JSON.parse(localStorage.getItem('wnl_lyys_local_data'));
	var posId = getQueryString('posid') || getQueryString('posId');
	var apiLoadResult = "//coco70.51wnl.com/NumberologyNew/NRLorder/GetOrderAnswer?orderid=";
	var userId = getQueryString("userid") || getQueryString("userId");
	var deviceId = getQueryString("deviceid") || getQueryString("deviceId");
	var orderId = getQueryString("orderid") || getQueryString("orderId");
	var imei = getQueryString('imei') || '';
	var couponId = getQueryString('couponId') || getQueryString('couponid') || '';
	var uniqueId = getQueryString('uniqueid') || getQueryString('uniqueId');
	var isShare = getQueryString('isShare') || 0;
	var isEightyYears = 0; // 0代表十年，1代表八十年

	var ua = navigator.userAgent.toLocaleLowerCase();
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
	var openid = '';
	if (browser.isWx()) {
		var wnl_loc = JSON.parse(localStorage.getItem('wnl_tlp_local'));
		if (wnl_loc && wnl_loc.openid) {
			openid = wnl_loc.openid;
		}
	}
	var isWeixin = /micromessenger/i.test(ua);
	var isWanNianLi = /wnl/i.test(ua);
	// 非万年历客户端下获取userid 或者openid
	if (isWeixin) {
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

	console.log(ua, browser.isIOS(), window.devicePixelRatio, document.body.clientWidth);
	if (isWanNianLi) {
		$('.bzcsBottomHrCopyright').removeClass('hidden');
		/* 适配iphoneX */
		if (browser.isIOS() && window.devicePixelRatio === 3 && document.body.clientWidth === 375) {
			$('.copyrightiPhoneX').css('margin-bottom', '34px')
		}
		$('.copyright').removeClass('hidden');
	} else {
		$('.bzcsBottomHrCopyright').css('display', 'none');
	}

	if (isShare) {
		$(".viewDetail").css("margin-bottom", "25px");
	}
	if (browser.isWnl()) {
		setTimeout(function () {
			location.href = "protocol://getuserinfo#userinfocallback";
		}, 0);
	}
	if (browser.isIOS()) {
		$('.eightyYearsFixBar').css({
			'background-color': 'rgba(252, 251, 249, 0.8)'
		});

		$('.payForBzcs').html('支付 ￥98 立即解锁');
	} else {
		$('.payForBzcs').html('支付 ￥78 立即解锁');
	}
	$(".wnlBannerLink").click(function () {
		var ua = navigator.userAgent.toLocaleLowerCase();
		var wx = ua.indexOf("micromessenger") > -1;
		var isIOSPhone = ua.indexOf("iphone") > -1 || ua.indexOf("ipod") > -1;
		var isIOS = isIOSPhone || ua.indexOf("ipad") > -1;
		var isAndroid = ua.indexOf("android") > -1;
		if (wx) {
			//_hmt.push(['_trackEvent', 'jryc_download_wx_click', 'click', 'jryc_download_wx_click', 'jryc_download_wx_click']);
			location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
		} else {
			if (isIOS) {
				//_hmt.push(['_trackEvent', 'jryc_download_ios_click', 'click', 'jryc_download_ios_click', 'jryc_download_ios_click']);
				location.href = "http://um0.cn/89wDL";
			} else if (isAndroid) {
				//_hmt.push(['_trackEvent', 'jryc_download_android_click', 'click', 'jryc_download_android_click', 'jryc_download_android_click']);
				location.href = "http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]";
			} else {
				location.href = "http://www.51wnl.com";
			}
		}
	});

	//更新订单价格
	function UpdateOrderPrice() {
		var jsonData = JSON.stringify({
			orderId: orderId,
			goodsID: goodsid
		})
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/NRLorder/UpdateOrderPrice',
			type: 'post',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: jsonData,
			beforeSend: function () {

			},
			success: function (res) {

			},
			error: function (res) {
				console.log('res=' + res);
			}
		});
	}

	var money;
	var goodsid;
	if (browser.isIOS()) {
		money = 98;
		/* goodsid = 'E4CF3D6698834375AD72BE533A67D5E4'; //测试 */
		goodsid = goodsIdTYIOS; //正式
		$('#tenYearsMoney').html(money);
		$('#eightyYearsMoney').html('298');
		$('#eightyYearsDiscount').html('596');
	} else {
		money = 78;
		/* goodsid = '41DBA1789A644753A408CD78DAF79B00'; //测试 */
		goodsid = goodsIdTYAndroid; //正式
		$('#tenYearsMoney').html(money);
		$('#eightyYearsMoney').html('268');
		$('#eightyYearsDiscount').html('526')
	}
	/*  解锁价格切换*/
	$(document).on('click', '.tenYears,.eightyYears', function () {
		$('.tenYears,.eightyYears').removeClass('active');
		$('.tenYears,.eightyYears').find('.priceCheckImg').css('background-image', 'url(./img/bzcs/check-box-normal.png)');
		$(this).addClass('active');
		$(this).find('.priceCheckImg').css('background-image', 'url(./img/bzcs/check-box-active.png)');
	})

	/* 价格弹窗的弹出 */

	$(document).on('click', '.mask', function () {
		$('.mask').hide();
		$('.bzcs_priceSelect').hide();
	})

	/* 优惠券展开 */
	$(document).on('click', '.moneyDropIcon', function () {
		$('.promoCodeContent').show();
		$('.moneyDropIcon').hide();
	})
	/* 年份查看选择器 */
	$(document).on('click', '.eightyYearsFixBarContent', function () {
		$('.fixedYear').removeClass('fixedYearActive');
		$('.fixedBarBottom').removeClass('fixedBarBottomActive');
		$(this).find('.fixedYear').addClass('fixedYearActive');
		$(this).find('.fixedBarBottom').addClass('fixedBarBottomActive');
	})
	$(document).on('click', '.xingshenDetail', function () {
		$('.mask').show();
		if (couponId) {
			IsShowUseCoupon(goodsid, money, orderId);
			$('.bzcs_share').show();
		} else {
			$('.bzcs_discount').show();
		}
		$('.bzcs_priceSelect').show();
	})

	$('.mask,.weui-mask,.weui-mask_transparent,bzcs_priceSelect').on('touchmove', function (e) {
		e.preventDefault();
	})

	/* 适配iphoneX */
	if (browser.isIOS() && window.devicePixelRatio === 3 && document.body.clientWidth === 375) {
		$('.bzcs_unlockedBtn').addClass('bottomSubmitFixedIphoneX');
        $('.wnlBanner').addClass('wnlBannerIphoneX');
        if(browser.isWnl()) {
            $('.bottomNotPaid').css('margin-bottom', '40px');
        } else {
            $('.bottomNotPaid').css('margin-bottom', '70px');
        }
		$('.iphoneXAdaptation').show();
	}

	/* 支付 */
	$(document).on('click', '.tenYears,.eightyYears,.payForBzcs', function () {
		if ($('.tenYears').hasClass('active')) {
			if (browser.isIOS()) {
				/* goodsid = 'E4CF3D6698834375AD72BE533A67D5E4'; //测试 */
				goodsid = goodsIdTYIOS; //正式
				money = $('#tenYearsMoney').html();
			} else {
				/* goodsid = '41DBA1789A644753A408CD78DAF79B00'; //测试 */
				goodsid = goodsIdTYAndroid ; //正式
				money = $('#tenYearsMoney').html();
			}
			if (couponId) {
				IsShowUseCoupon(goodsid, money, orderId);
			} else {
				$('.payForBzcs').text('支付 ￥' + money + ' 立即解锁');
			}

			_czc.push(['_trackEvent', '10years.C', 'bzcs_unlock_popup+click+10years']);
			isEightyYears = 0;
		} else {
			if (browser.isIOS()) {
				/* goodsid = '36460FC8DA6E4283B8FA3370D58E388B'; //测试 */
				goodsid = goodsIdEYIOS; //正式
				money = $('#eightyYearsMoney').html();
			} else {
				/* goodsid = 'F9AED0D1C119428BB1D1934832E1BC54'; //测试 */
				goodsid = goodsIdEYAndroid; //正式
				money = $('#eightyYearsMoney').html();
			}

			if (couponId) {
				IsShowUseCoupon(goodsid, money, orderId);
			} else {
				$('.payForBzcs').text('支付 ￥' + money + ' 立即解锁');
			}
			_czc.push(['_trackEvent', '80years.C', 'bzcs_unlock_popup+click+80years']);
			isEightyYears = 1;
		}
	})

	$(document).on('click', '.bzcs_unlockedBtn', function () {
		$('.mask').show();
		if (couponId) {
			IsShowUseCoupon(goodsid, money, orderId);
			$('.bzcs_share').show();
		} else {
			$('.bzcs_discount').show();
		}
		$('.bzcs_priceSelect').show();
	})
	$(document).on('click', '.payForBzcs', function () {
		//更新订单价格
		UpdateOrderPrice();

		if (!uniqueId) {
			if (userId) {
				uniqueId = userId;
			} else {
				uniqueId = deviceId;
			}
		}
		location.href = '//order.51wnl.com/pay_web/index_t.html?money=' + money + '&source=八字测算&orderName=八字测算&parterid=NRLorder&goodsid=' + goodsid + '&parteruserid=' + uniqueId +
			'&data=' + orderId + '&posId=' + posId + '&openid=' + openid + '&couponId=' + couponId + '&imei=' + imei + '&returnUrl=' + encodeURIComponent(location.href);
	})

	$("#btnViewDetail").click(function () {
		if (isShare) {
			$("#tipModal").modal();
			$(".downloadBtn").click(function () {
				//下载链接
				var ua = navigator.userAgent.toLocaleLowerCase();
				var wx = ua.indexOf("micromessenger") > -1;
				var isIOSPhone = ua.indexOf("iphone") > -1 || ua.indexOf("ipod") > -1;
				var isIOS = isIOSPhone || ua.indexOf("ipad") > -1;
				var isAndroid = ua.indexOf("android") > -1;
				if (wx) {
					//_hmt.push(['_trackEvent', 'bzcs_download_wx_click', 'click', 'bzcs_download_wx_click', 'bzcs_download_wx_click']);
					location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
				} else {
					if (isIOS) {
						//_hmt.push(['_trackEvent', 'bzcs_download_ios_click', 'click', 'bzcs_download_ios_click', 'bzcs_download_ios_click']);
						location.href = "http://um0.cn/89wDL";
					} else if (isAndroid) {
						//_hmt.push(['_trackEvent', 'bzcs_download_android_click', 'click', 'bzcs_download_android_click', 'bzcs_download_android_click']);
						location.href = "https://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]";
					} else {
						location.href = "https://www.51wnl.com";
					}
				}
			});
		} else {
			if (!uniqueId) {
				if (userId) {
					uniqueId = userId;
				} else {
					uniqueId = deviceId;
				}
			}
		}
	});


	$("#btnPay").click(function () {
		var ua = navigator.userAgent.toLocaleLowerCase();
		var isIOSPhone = ua.indexOf("iphone") > -1 || ua.indexOf("ipod") > -1;
		var isIOS = isIOSPhone || ua.indexOf("ipad") > -1;
		var isAndroid = ua.indexOf("android") > -1;
		var sourceType = -1;
		if (isIOS) {
			sourceType = 0;
		} else if (isAndroid) {
			sourceType = 1;
		} else {
			sourceType = 2
		}
		window.location.href = "/numberology/NRLorder/PayedOrder?orderid=" + orderId + "&returnUrl=/numberology/tools/bzcs_result.html&sourceType=" + sourceType;
	});

	function getWNLVersion() {
		var ua = navigator.userAgent.toLowerCase();
		var index1 = ua.indexOf("wnl");
		var versionCode = ua.substring(index1 + 4);
		var codeList = versionCode.split(".");
		return parseInt(codeList[0] * 100) + parseInt(codeList[1] * 10) + parseInt(codeList[2]);
	}
	$(".hhInfoTitle").click(function () {
		$(".viewDetail").trigger("click");
	});
	loadInfo();

	function loadInfo() {
		if (!orderId) {
			alert(orderId);
			alert("请传入orderid");
			return false;
		} else {
			if (orderId.length < 30 || orderId.length > 40) {
				alert("请传入正确的orderid");
				return false;
			} else {
				$.ajax({
					cache: false,
					type: "GET",
					dataType: "json",
					url: apiLoadResult + orderId,
					success: function (result) {
						if (result.status == 0) {
							if (isShare) {
								$(".wnlBannerLink").removeClass("hidden");
							} else {
								$(".yiqiDesc1").removeClass("hidden");
							}
							var baziResult = result.data;

							if (!/isShare=1/.test(location.href)) {
								//如果是不是卡片分享
								$('.infoData').removeClass('hidden');
								$('.dayunContent').removeClass('hidden');
								$('.xingqingContent').removeClass('hidden');
								$('.xingshenContent').removeClass('hidden');
							}

							/* 表格 */
							var liuNianList;
							var eightYearsZX = 0;
							if (baziResult.liuNian.length > 20) {
								liuNianList = baziResult.daYun;
								eightYearsZX = 1;
								$('#headerPanel').attr('value', '八十年运势卡');
								$('.ysChartTitle').text('八十年运势');

							} else {
								liuNianList = baziResult.liuNian;
								eightYearsZX = 0;
								$('#headerPanel').attr('value', '十年运势卡');
								$('.ysChartTitle').text('十年运势');
							}
							var timeDescs = new Array();
							var scores = new Array();
							$.each(liuNianList, function (index, item) {
								if (eightYearsZX == 0) {
									timeDescs.push(liuNianList[index].year.substr(0, 4));
								} else {
									timeDescs.push((liuNianList[index].year.substr(0, 9)).replace('—', '-'));
								}
								scores.push(liuNianList[index].score);
							})
							dataX = timeDescs;
							dataY = scores;

							// 指定图表的配置项和数据

							var defaults = {
								scaleStartValue: null, // Y 轴的起始值
								scaleLineColor: "rgba(255, 85, 0,1)", // Y/X轴的颜色
								scaleLineWidth: 1, // X,Y轴的宽度
								scaleShowLabels: true, // 刻度是否显示标签, 即Y轴上是否显示文字
								scaleLabel: "<%=value%>", // Y轴上的刻度,即文字
								scaleFontFamily: "'Arial'", // 字体
								scaleFontSize: 10, // 文字大小
								scaleFontStyle: "normal", // 文字样式
								scaleFontColor: "#333333", // 文字颜色
								scaleShowGridLines: true, // 是否显示网格
								scaleGridLineColor: "rgba(246, 226, 209, 0.85)", // 网格颜色
								scaleGridLineWidth: 1, // 网格宽度
								bezierCurve: false, // 是否使用贝塞尔曲线? 即:线条是否弯曲
								pointDot: true, // 是否显示点数
								pointDotRadius: 2, // 圆点的大小
								pointDotStrokeWidth: 1, // 圆点的笔触宽度, 即:圆点外层边框大小
								datasetStroke: true, // 数据集行程
								datasetStrokeWidth: 2, // 线条的宽度, 即:数据集
								datasetFill: true, // 是否填充数据集
								animation: true, // 是否执行动画
								animationSteps: 60, // 动画的时间
								animationEasing: "easeOutQuart", // 动画的特效
								onAnimationComplete: null, // 动画完成时的执行函数
								//tooltipCornerRadius: 4,
							}
							var lineChartData = {
								//表的X轴参数
								labels: dataX,
								datasets: [{
										fillColor: "rgba(246, 226, 209, 0.6)", //背景色，常用transparent透明
										strokeColor: "rgba(241, 114, 24, 1)", //线条颜色，也可用"#ffffff"
										pointColor: "rgba(255,255,255,1)", //点的填充颜色
										pointStrokeColor: "#f16300", //点的外边框颜色
										data: dataY //点的Y轴值
									},

								]
							}
							var ctx = document.getElementById("bzcs_ysChart").getContext("2d");
							window.myLine = new Chart(ctx).Line(lineChartData, defaults);

							if (baziResult.isPayed) {
								textObj.url = currUrl;
								textObj1.targetUrl = currUrl;
								if (!isWanNianLi) {
									$('.weixinShare').addClass('hidden');
								}
								$('.iphoneXAdaptation,.eightyYearsDiv').hide();
								$('.bzcsBottomHr').show();

								if (/payresult=1/.test(location.href)) {
									var goodsId;
									if (result.data.liuNian.length > 20) {
										if (browser.isIOS()) {
											/* goodsId = '36460FC8DA6E4283B8FA3370D58E388B'; //测试 */
											goodsId = goodsIdEYIOS; //正式
										} else {
											/* goodsId = 'F9AED0D1C119428BB1D1934832E1BC54'; //测试 */
											goodsId = goodsIdEYAndroid; //正式
										}
									} else {
										if (browser.isIOS()) {
											/* goodsId = 'E4CF3D6698834375AD72BE533A67D5E4'; //测试 */
											goodsId = goodsIdTYIOS; //正式
										} else {
											/* goodsId = '41DBA1789A644753A408CD78DAF79B00'; //测试 */
											goodsId = goodsIdTYAndroid; //正式
										}
									}
									var shareUrl = "//mobile.51wnl.com/numberology/bzcs/bzcs_index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&channel=[CHANNEL]&posId=[posId]&boundId=[BUNDLE]";
									shareRedPackage({
										goodsId: goodsId,
										parterId: "Lunar",
										orderId: orderId,
										title: '给你分享一个万年历红包',
										text: '100%有奖，立刻能用！',
										image: 'https://coco70.51wnl.com/numberologynew/gqy/static/img/rpshare.jpg',
										url: shareUrl,
										wxShareTitle: '惊！我的运势卡居然是这样',
										wxShareText: '赶快来领取你的专属未来运势卡吧！',
										wxShareImage: '1',
										wxShareUrl: location.href
									});
								}
								//隐藏未支付的页面
								$('.xingshenContent').addClass('hidden');
								$('.bzcs_unlockedBtn').addClass('hidden');
								$('.bottomNotPaid').addClass('hidden');
								$('.wxContentDetail').addClass('hidden');
								isPayed = 1;
								$('.bzcs_name').text(baziResult.name);
								$('.bzcs_sex').text(baziResult.sex);
								var bzcs_year = baziResult.birth.substring(0, 4);
								bzcs_year = bzcs_year + '年';
								var bzcs_month = baziResult.birth.substring(5, 7);
								bzcs_month = bzcs_month + '月';
								var bzcs_day = baziResult.birth.substring(8, 10);
								bzcs_day = bzcs_day + '日';
								var bzcs_hour = baziResult.birth.substring(11, 13);
								bzcs_hour = bzcs_hour + '时';
								$('.bzcs_year').text(bzcs_year);
								$('.bzcs_month').text(bzcs_month);
								$('.bzcs_day').text(bzcs_day);
								$('.bzcs_time').text(bzcs_hour);
								var bzArray = baziResult.baZi.split(' ');
								$('.bzcs_bz_year').text(bzArray[0]);
								$('.bzcs_bz_month').text(bzArray[1]);
								$('.bzcs_bz_day').text(bzArray[2]);
								$('.bzcs_bz_time').text(bzArray[3]);
								//流年折线图
								var dataX;
								var dataY;
								$('.wxContentTitle').removeClass('hidden');
								if (baziResult.liuNian.length > 20) {
									var dayunList = baziResult.daYunYear;
									var dayun = baziResult.daYun;
									var times = new Array();
									var timeDescs = new Array();
									var scores = new Array();
									$.each(dayunList, function (index, item) {
										if (item.length >= 0) {
											var index1 = item.indexOf("("),
												index2 = item.indexOf(")");
											var time = item.substr(0, index1),
												timeDesc = item.substring(index1 + 1, index2);
											timeDesc = timeDesc.substr(0, 4) + '~' + timeDesc.substr(5, 9);
											times.push(time);
											timeDescs.push(timeDesc);
										}
									});
									$.each(dayun, function (index, item) {
										scores.push(dayun[index].score);
									})

									dataX = [timeDescs[0], timeDescs[1], timeDescs[2], timeDescs[3], timeDescs[4], timeDescs[5], timeDescs[6], timeDescs[7]];

									dataY = [scores[0], scores[1], scores[2], scores[3], scores[4], scores[5], scores[6], scores[7]]

									$('.headerPanel').addClass('headerPanelEighty');

								}
								// 使用刚指定的配置项和数据显示图表。
								$('#bzcs_ysChart').show();
								//五行的饼图
								var wuXingLiLiang = baziResult.wuXingLiLiang.split(' ');
								$('.headerPanelBottom').css('margin', '0')
								$('.wxJin > .proportion').text(wuXingLiLiang[0].replace(':', ' '));
								$('.wxMu > .proportion').text(wuXingLiLiang[1].replace(':', ' '));
								$('.wxShui > .proportion').text(wuXingLiLiang[2].replace(':', ' '));
								$('.wxHuo > .proportion').text(wuXingLiLiang[3].replace(':', ' '));
								$('.wxTu > .proportion').text(wuXingLiLiang[4].replace(':', ' '));

								var jinPro = wuXingLiLiang[0].replace(/[^0-9]/ig, "");
								var muPro = wuXingLiLiang[1].replace(/[^0-9]/ig, "");
								var shuiPro = wuXingLiLiang[2].replace(/[^0-9]/ig, "");
								var huoPro = wuXingLiLiang[3].replace(/[^0-9]/ig, "");
								var tuPro = wuXingLiLiang[4].replace(/[^0-9]/ig, "");
								var myChartWX = echarts.init(document.getElementById('bzcs_wxChart'));
								optionWX = {
									title: {
										show: false
									},
									legend: {
										top: 'top',
										selectedMode: false
									},
									grid: {

									},
									toolbox: {
										show: false,
										feature: {
											mark: true,
											dataView: {
												readOnly: true
											},
											restore: true,
											saveAsImage: true
										}
									},
									tooltip: {
										show: false
									},
									color: ['#f9b90e', '#529671', '#2ea9df', '#f16300', '#e0bb87'],
									series: [{
										name: '',
										type: 'pie',
										radius: '100%',
										center: ['50%', '50%'],
										selectedOffset: 0,
										hoverAnimation: false,
										avoidLabelOverlap: false,
										data: [{
												value: jinPro,
												name: ''
											},
											{
												value: muPro,
												name: ''
											},
											{
												value: shuiPro,
												name: ''
											},
											{
												value: huoPro,
												name: ''
											},
											{
												value: tuPro,
												name: ''
											}
										],
										itemStyle: {
											emphasis: {
												shadowBlur: 1,
												shadowOffsetX: 0,
												shadowColor: 'rgba(0, 0, 0, 0.5)'
											},
											normal: {
												labelLine: {
													show: false
												}
											}
										}
									}]
								};
                                myChartWX.setOption(optionWX);
                                $('.headerPanel').removeClass('hidden');
								$('.wxContentDetailPaid').show();

								//获取围观人数
								if (!/isShare=1/.test(location.href)) {
									//不是分享
									$('.headerPanelBottomPaid').show();
									var useCountNum = baziResult.browseNum;
									if (useCountNum == 0) {
										var useCountStr = '出生时辰会为你保密，请放心分享';
										$('.weiguanNum').text(useCountStr);
									} else {
										var useCountStr = useCountNum + '人已围观';
									}

								} else {
									$('.headerPanelBottomShare').show();
									$('.bzcs_unlockedBtnShare').show();
									$('.wxContentTitle').removeClass('hidden');
									getUseCountShare();

									function getUseCountShare() {
										$.ajax({
											url: '//coco70.51wnl.com/numberologynew/NRLorder/GetUseCount?parterid=nrlorder',
											type: 'post',
											dataType: 'json',
											contentType: 'application/json;charset=utf-8',
											async: false,
											beforeSend: function () {

											},
											success: function (res) {
												var useCountNum = res.data;
												useCountStr = useCountNum + '人已围观';
												$('.headerPanelBottomLabel').text(useCountStr);
											},
											error: function (res) {
												console.log('res=' + res);
											}
										});
									}
									$('.bzcs_unlockedBtnShare').on('click', function () {
										location.href = 'http://mobile.51wnl.com/numberology/bzcs/bzcs_index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&channel=[CHANNEL]&posId=[posId]&boundId=[BUNDLE]';
									})
								}

								/* 卡片分享 */
								$(document).on('click', '.headerPanelBottomLabel,.headerPanelBottomView', function () {
									appCallback_share();
								})
								//大运years
								var dayunList = baziResult.daYunYear;
								var times = new Array()
								var timeDescs = new Array();
								$.each(dayunList, function (index, item) {
									if (item.length >= 0) {
										var index1 = item.indexOf("("),
											index2 = item.indexOf(")");
										var time = item.substr(0, index1),
											timeDesc = item.substring(index1 + 1, index2);
										timeDesc = timeDesc.substr(0, 4) + ' ~ ' + timeDesc.substr(5, 9);
										times.push(time);
										timeDescs.push(timeDesc);
									}
								});

								$('.dayunTime01').text(times[0]);
								$('.dayunTime02').text(times[1]);
								$('.dayunTime03').text(times[2]);
								$('.dayunTime04').text(times[3]);
								$('.dayunTime05').text(times[4]);
								$('.dayunTime06').text(times[5]);
								$('.dayunTime07').text(times[6]);
								$('.dayunTime08').text(times[7]);

								$('.dayunTimeDesc01').text(timeDescs[0]);
								$('.dayunTimeDesc02').text(timeDescs[1]);
								$('.dayunTimeDesc03').text(timeDescs[2]);
								$('.dayunTimeDesc04').text(timeDescs[3]);
								$('.dayunTimeDesc05').text(timeDescs[4]);
								$('.dayunTimeDesc06').text(timeDescs[5]);
								$('.dayunTimeDesc07').text(timeDescs[6]);
								$('.dayunTimeDesc08').text(timeDescs[7]);

								$('.xingqingDetail').text(baziResult.xingQing);

								//五行喜忌
								if (result.data.xiYong) {
									var xiyong_list = result.data.xiYong.split(" ");
									$($(".wuxingxijiTitleS")[0]).html("最喜五行" + xiyong_list[0]);
									$($(".wuxingxijiTitleS")[1]).html("次喜五行" + xiyong_list[1]);
									$($(".wuxingxijiTitleS")[2]).html("最忌五行" + xiyong_list[2]);
									$($(".wuxingxijiTitleS")[3]).html("次忌五行" + xiyong_list[3]);
									$($(".wuxingxijiTitleS")[4]).html("平常五行" + xiyong_list[4]);
								}
								$('.wuxingxijiDetail01').text(baziResult.zuiXi);
								$('.wuxingxijiDetail02').text(baziResult.ciXi);
								$('.wuxingxijiDetail03').text(baziResult.zuiJi);
								$('.wuxingxijiDetail04').text(baziResult.ciJi);
								$('.wuxingxijiDetail05').text(baziResult.pingChang);
								if (!/isShare=1/.test(location.href)) {
									$('.paidResult').removeClass('hidden');
								}
								if (!isWanNianLi) {
									$('.bzcsBottomHrCopyright').css('display', 'none');
								}
								var wuxingReg = /\d+%/g;
								var wuxingList = baziResult.wuXingLiLiang.match(wuxingReg);
								if (baziResult.liuNian.length > 20) {
									var fixBarisTrue;
									$('.eightyYearsDiv').show();
									if (!/isShare=1/.test(location.href)) {
										$('.eightyYearsFixBar').show();
									}
									window.onscroll = function () {
											var topScroll = document.body.scrollTop; //滚动的距离,距离顶部的距离
											var scrollHeight = $('#dvLiuNian').offset().top
											scrollHeight = scrollHeight - 65;
											if (topScroll > scrollHeight) {
												$('.eightyYearsFixBar').addClass('eightyYearsFixBarFixed');
												fixBarisTrue = true;

											} else {
												$('.eightyYearsFixBar').removeClass('eightyYearsFixBarFixed');
												fixBarisTrue = false;
											}
										},
										$($('.fixedYear')[0]).text(timeDescs[0]);
									$($('.fixedYear')[1]).text(timeDescs[1]);
									$($('.fixedYear')[2]).text(timeDescs[2]);
									$($('.fixedYear')[3]).text(timeDescs[3]);
									$($('.fixedYear')[4]).text(timeDescs[4]);
									$($('.fixedYear')[5]).text(timeDescs[5]);
									$($('.fixedYear')[6]).text(timeDescs[6]);
									$($('.fixedYear')[7]).text(timeDescs[7]);

									//根据年份选择卡选择对应的信息
									var eightyYearsLiuNian;
									var eightyYearsDaYun;
									eightyYearsLiuNian = baziResult.liuNian.slice(0, 10);
									eightyYearsDaYun = baziResult.daYun.slice(0, 1);
									showLNandDY();
									$(document).on('click', '.fixedYear01', function () {
										$('#dvLiuNian').empty();
										eightyYearsLiuNian = baziResult.liuNian.slice(0, 10);
										eightyYearsDaYun = baziResult.daYun.slice(0, 1);
										showLNandDY();
										if (fixBarisTrue) {
											var dvLiuNianTop = $('#dvLiuNian').offset().top - 49;
											$('body').scrollTop(dvLiuNianTop);
										}
									})
									$(document).on('click', '.fixedYear02', function () {
										$('#dvLiuNian').empty();
										eightyYearsLiuNian = baziResult.liuNian.slice(10, 20);
										eightyYearsDaYun = baziResult.daYun.slice(1, 2);
										showLNandDY();
										if (fixBarisTrue) {
											var dvLiuNianTop = $('#dvLiuNian').offset().top - 49;
											$('body').scrollTop(dvLiuNianTop);
										}

									})
									$(document).on('click', '.fixedYear03', function () {
										$('#dvLiuNian').empty();
										eightyYearsLiuNian = baziResult.liuNian.slice(20, 30);
										eightyYearsDaYun = baziResult.daYun.slice(2, 3);
										showLNandDY();
										if (fixBarisTrue) {
											var dvLiuNianTop = $('#dvLiuNian').offset().top - 49;
											$('body').scrollTop(dvLiuNianTop);
										}
									})
									$(document).on('click', '.fixedYear04', function () {
										$('#dvLiuNian').empty();
										eightyYearsLiuNian = baziResult.liuNian.slice(30, 40);
										eightyYearsDaYun = baziResult.daYun.slice(3, 4);
										showLNandDY();
										if (fixBarisTrue) {
											var dvLiuNianTop = $('#dvLiuNian').offset().top - 49;
											$('body').scrollTop(dvLiuNianTop);
										}
									})
									$(document).on('click', '.fixedYear05', function () {
										$('#dvLiuNian').empty();
										eightyYearsLiuNian = baziResult.liuNian.slice(40, 50);
										eightyYearsDaYun = baziResult.daYun.slice(4, 5);
										showLNandDY();
										if (fixBarisTrue) {
											var dvLiuNianTop = $('#dvLiuNian').offset().top - 49;
											$('body').scrollTop(dvLiuNianTop);
										}

									})
									$(document).on('click', '.fixedYear06', function () {
										$('#dvLiuNian').empty();
										eightyYearsLiuNian = baziResult.liuNian.slice(50, 60);
										eightyYearsDaYun = baziResult.daYun.slice(5, 6);
										showLNandDY();
										if (fixBarisTrue) {
											var dvLiuNianTop = $('#dvLiuNian').offset().top - 49;
											$('body').scrollTop(dvLiuNianTop);
										}

									})
									$(document).on('click', '.fixedYear07', function () {
										$('#dvLiuNian').empty();
										eightyYearsLiuNian = baziResult.liuNian.slice(60, 70);
										eightyYearsDaYun = baziResult.daYun.slice(6, 7);
										showLNandDY();
										if (fixBarisTrue) {
											var dvLiuNianTop = $('#dvLiuNian').offset().top - 49;
											$('body').scrollTop(dvLiuNianTop);
										}

									})
									$(document).on('click', '.fixedYear08', function () {
										$('#dvLiuNian').empty();
										eightyYearsLiuNian = baziResult.liuNian.slice(70, 80);
										eightyYearsDaYun = baziResult.daYun.slice(7, 8);
										showLNandDY();
										if (fixBarisTrue) {
											var dvLiuNianTop = $('#dvLiuNian').offset().top - 49;
											$('body').scrollTop(dvLiuNianTop);
										}

									})

									function showLNandDY() {
										var liuNianTemplate = '<div class="dayunYearDetailContent" data-year="<%- justYear %>">\
                                            <div class="dayunYearDetailTitle" ><%- year %>运势得分</div>\
                                            <div class="dayunYearDetailScore"><%- score %></div>\
                                            <div class="dayunYearDetailjpTtitle">简评</div>\
                                            <div class="dayunYearDetailjpContent"><%- text %></div>\
                                            <div class="dayunYearDetailHr"></div>\
                                            <div class="dayunYearDetailjsTtitle">吉神</div>\
                                            <div class="dayunYearDetailjsContent"><%- jiShen %></div>\
                                            <div class="dayunYearDetailHr"></div>\
                                            <div class="dayunYearDetailxsTtitle">凶神</div>\
                                            <div class="dayunYearDetailxsContent"><%- xiongShen %></div>\
                                            <div class="dayunYearDetailHr"></div>\
                                            <div class="dayunYearDetailllssTtitle"><%- shiShenName %></div>\
                                            <div class="dayunYearDetailllssContent"><%- shiShenText %></div>\
                                            </div>';

										$.each(eightyYearsLiuNian, function () {
											var mkpItem = _.template(liuNianTemplate)({
												justYear: this.year.substring(0, 4),
												year: this.year,
												score: this.score,
												text: this.text.replace(/\/n/g, ""),
												jiShen: this.jiShen.replace(/\/n/g, ""),
												xiongShen: this.xiongShen.replace(/\/n/g, ""),
												shiShenName: '流连十神 ：' + this.shiShenName.replace(/\/n/g, ""),
												shiShenText: this.shiShenText.replace(/\/n/g, "")
											});

											$("#dvLiuNian").append(mkpItem);
										});


										var daYunTemplate = '<div class="dayunYearTenContent">\
                                                    <div class="dayunYearTenTitle"><%- year %></div>\
                                                    <div class="dayunYearTenScoreTitle">大运得分</div>\
                                                    <div class="dayunYearTenScoreNum"><%- score %></div>\
                                                    <div class="dayunYearTenScoreContent"></div>\
                                                    <div class="dayunYearDetailHr"></div>\
                                                    <div class="dayunYearTenQLTitle">大运起落</div>\
                                                    <div class="dayunYearTenQLContent"><%- qiLuo %></div>\
                                                    <div class="dayunYearDetailHr"></div>\
                                                    <div class="dayunYearTenSSTitle">大运十神</div>\
                                                    <div class="dayunYearTenSSContent"><%- shiShen %></div>\
                                                    <div class="dayunYearDetailHr"></div>\
                                                    <div class="dayunYearTenCHTitle">大运冲合</div>\
                                                    <div class="dayunYearTenCHContent"><%- chongHe %></div>\
                                                </div>';

										$.each(eightyYearsDaYun, function () {
											var mkpItem = _.template(daYunTemplate)({
												year: this.year,
												score: this.score,
												text: this.text.replace(/\/n/g, ""),
												qiLuo: this.qiLuo.replace(/\/n/g, ""),
												shiShen: this.shiShen.replace(/\/n/g, ""),
												chongHe: this.chongHe.replace(/\/n/g, "")
											});

											$(_.template("[data-year=<%- startYear %>]")({
												startYear: this.year.substring(0, 4)
											})).before(mkpItem);
										});
									}
								} else {
									/* 流年和大运 */
									var liuNianTemplate = '<div class="dayunYearDetailContent" data-year="<%- justYear %>">\
                                            <div class="dayunYearDetailTitle" ><%- year %>运势得分</div>\
                                            <div class="dayunYearDetailScore"><%- score %></div>\
                                            <div class="dayunYearDetailjpTtitle">简评</div>\
                                            <div class="dayunYearDetailjpContent"><%- text %></div>\
                                            <div class="dayunYearDetailHr"></div>\
                                            <div class="dayunYearDetailjsTtitle">吉神</div>\
                                            <div class="dayunYearDetailjsContent"><%- jiShen %></div>\
                                            <div class="dayunYearDetailHr"></div>\
                                            <div class="dayunYearDetailxsTtitle">凶神</div>\
                                            <div class="dayunYearDetailxsContent"><%- xiongShen %></div>\
                                            <div class="dayunYearDetailHr"></div>\
                                            <div class="dayunYearDetailllssTtitle"><%- shiShenName %></div>\
                                            <div class="dayunYearDetailllssContent"><%- shiShenText %></div>\
                                            </div>';

									$.each(baziResult.liuNian, function () {
										var mkpItem = _.template(liuNianTemplate)({
											justYear: this.year.substring(0, 4),
											year: this.year,
											score: this.score,
											text: this.text.replace(/\/n/g, ""),
											jiShen: this.jiShen.replace(/\/n/g, ""),
											xiongShen: this.xiongShen.replace(/\/n/g, ""),
											shiShenName: '流连十神 ：' + this.shiShenName.replace(/\/n/g, ""),
											shiShenText: this.shiShenText.replace(/\/n/g, "")
										});

										$("#dvLiuNian").append(mkpItem);
									});
									var daYunTemplate = '<div class="dayunYearTenContent">\
                                                    <div class="dayunYearTenTitle"><%- year %></div>\
                                                    <div class="dayunYearTenScoreTitle">大运得分</div>\
                                                    <div class="dayunYearTenScoreNum"><%- score %></div>\
                                                    <div class="dayunYearTenScoreContent"></div>\
                                                    <div class="dayunYearDetailHr"></div>\
                                                    <div class="dayunYearTenQLTitle">大运起落</div>\
                                                    <div class="dayunYearTenQLContent"><%- qiLuo %></div>\
                                                    <div class="dayunYearDetailHr"></div>\
                                                    <div class="dayunYearTenSSTitle">大运十神</div>\
                                                    <div class="dayunYearTenSSContent"><%- shiShen %></div>\
                                                    <div class="dayunYearDetailHr"></div>\
                                                    <div class="dayunYearTenCHTitle">大运冲合</div>\
                                                    <div class="dayunYearTenCHContent"><%- chongHe %></div>\
                                                </div>';

									$.each(baziResult.daYun, function () {
										var mkpItem = _.template(daYunTemplate)({
											year: this.year,
											score: this.score,
											text: this.text.replace(/\/n/g, ""),
											qiLuo: this.qiLuo.replace(/\/n/g, ""),
											shiShen: this.shiShen.replace(/\/n/g, ""),
											chongHe: this.chongHe.replace(/\/n/g, "")
										});

										$(_.template("[data-year=<%- startYear %>]")({
											startYear: this.year.substring(0, 4)
										})).before(mkpItem);
									});

								}
							} else {
								UpdateOrderPrice();
								textObj.url = baseUrl;
								textObj1.targetUrl = baseUrl;
								$('.wxContentDetail').show();
								$('.headerPanelBottomFree').show();
								$('.ysChartContentImg').show();
								$('.bzcs_name').text(baziResult.name);
								$('.bzcs_sex').text(baziResult.sex);
								$('.bottomNotPaid').show();
								$('#headerPanel').attr('value', '十年运势卡');
								$('.bzcs_unlockedBtn').removeClass('hidden');
								$('.ysChartTitle').text('十年运势');

								var bzcs_year = baziResult.birth.substring(0, 4);
								bzcs_year = bzcs_year + '年';
								var bzcs_month = baziResult.birth.substring(5, 7);
								bzcs_month = bzcs_month + '月';
								var bzcs_day = baziResult.birth.substring(8, 10);
								bzcs_day = bzcs_day + '日';
								var bzcs_hour = baziResult.birth.substring(11, 13);
								bzcs_hour = bzcs_hour + '时';
								$('.bzcs_year').text(bzcs_year);
								$('.bzcs_month').text(bzcs_month);
								$('.bzcs_day').text(bzcs_day);
								$('.bzcs_time').text(bzcs_hour);

								var bzArray = baziResult.baZi.split(' ');

								$('.bzcs_bz_year').text(bzArray[0]);
								$('.bzcs_bz_month').text(bzArray[1]);
								$('.bzcs_bz_day').text(bzArray[2]);
								$('.bzcs_bz_time').text(bzArray[3]);
								$('.wxContentTitle').removeClass('hidden');
								var length = Math.floor($(".xingqingDetail").width() / 15);
								$(".xingqingDetail").text(baziResult.xingQing.substr(0, length * 5 - 2) + "...");
								$(".bazi").text(baziResult.baZi);
								var year = parseInt(baziResult.birth.substring(0, 4)),
									month = baziResult.birth.substring(5, 7),
									day = baziResult.birth.substring(8, 10),
									hour = baziResult.birth.substring(11, 13);
								var yearNow = (new Date()).getFullYear();
								if (yearNow - year < 10 || yearNow - year > 80) {
									/* 如果出生日期和现在相比，小于10或者大于80，者不显示付费按钮 */
									$(".btnContent").addClass("hidden");
									$(".tipLine").addClass("hidden");
									$(".moreLinkContent").addClass("hidden");
                                }
                                $('.headerPanel').removeClass('hidden');
								//大运格式不对
								var dayunList = baziResult.daYun.split(";");
								var times = new Array()
								var timeDescs = new Array();
								dayunList.length = dayunList.length - 1;
								$.each(dayunList, function (index, item) {
									if (item.length >= 0) {
										var index1 = item.indexOf("("),
											index2 = item.indexOf(")");
										var time = item.substr(0, index1),
											timeDesc = item.substring(index1 + 1, index2);
										timeDesc = timeDesc.substr(0, 4) + ' ~ ' + timeDesc.substr(5, 9);
										times.push(time);
										timeDescs.push(timeDesc);
									}
								});

								$('.dayunTime01').text(times[0]);
								$('.dayunTime02').text(times[1]);
								$('.dayunTime03').text(times[2]);
								$('.dayunTime04').text(times[3]);
								$('.dayunTime05').text(times[4]);
								$('.dayunTime06').text(times[5]);
								$('.dayunTime07').text(times[6]);
								$('.dayunTime08').text(times[7]);

								$('.dayunTimeDesc01').text(timeDescs[0]);
								$('.dayunTimeDesc02').text(timeDescs[1]);
								$('.dayunTimeDesc03').text(timeDescs[2]);
								$('.dayunTimeDesc04').text(timeDescs[3]);
								$('.dayunTimeDesc05').text(timeDescs[4]);
								$('.dayunTimeDesc06').text(timeDescs[5]);
								$('.dayunTimeDesc07').text(timeDescs[6]);
								$('.dayunTimeDesc08').text(timeDescs[7]);

								var nowYear = new Date();
								var priceTime01Dis = nowYear.getFullYear() + '年' + ' ~ ' + (nowYear.getFullYear() + 10) + '年';
								var priceTime02Dis = timeDescs[0].slice(0, 4) + '年 ~ ' + timeDescs[7].slice(6, 11) + '年';
								$('.priceTime01').text(priceTime01Dis);
								$('.priceTime02').text(priceTime02Dis);

								var length = Math.floor($(".xingqingDetail").width() / 15);
								$(".xingqingDetail").text(baziResult.xingQing.substr(0, length * 5 - 2) + "...");

								if (!/payresult=1/.test(location.href)) {
									$(document).on('click', '.headerPanelBottomLabel,.headerPanelBottomView', function () {
										$('.bzcs_unlockedBtn').trigger('click');
									})
								}
							}
						} else {
							alert("获取测算数据错误,错误信息为" + result.msg);
						}
					},
					error: function (xhr, ajaxOperation, throwErr) {
						return;
					}
				});
			}
		}
	}
	$(".downloadBtn").click(function () {
		var clientObj = {
			"cmsShow": {
				"isNone": 1
			}
		};
		location.href = "protocol://saveuserinfo#" + Base64.encode(JSON.stringify(clientObj));
		ylwindow.downloadApk(null, "猎豹安全大师", "http://dl.cm.ksmobile.com/static/res/37/c3/cm_security_cn.apk_500084.apk");
	});
	$(".noneBtn").click(function () {
		var clientObj = {
			"cmsShow": {
				"isNone": 1
			}
		};
		location.href = "protocol://saveuserinfo#" + Base64.encode(JSON.stringify(clientObj));
	});

	function IsShowUseCoupon(goodsid, money, orderId) {
		$.ajax({
			url: '//order.51wnl.com/api/coupon/IsShowUseCouponNew',
			type: 'post',
			dataType: 'json',
			async: false,
			data: {
				'goodsId': goodsid,
				'orderId': orderId
			},
			success: function (response) {
				if (response.data.isShow) {
					if (couponId) {
						CouponIDStatus(couponId, goodsid, orderId, money);
					}
				}
			}
		})
	}

	// 显示优惠券状态
	function CouponIDStatus(couponid, goodsid, fromUrl, money) {
		$.ajax({
			url: '//order.51wnl.com/api/coupon/CouponIDStatus',
			type: 'post',
			dataType: 'json',
			async: false,
			data: {
				couponId: couponid,
				goodsId: goodsid,
				orderId: orderId
			},
			success: function (response) {
				if (response.data.status) {
					$('.couponDesc').hide();
					$('.couponUse').show();
					$('.moneyNum').html(' ￥' + response.data.coupon.price);
					$('.bzcs_share').removeClass('hidden');
					$('.payForBzcs').text('支付 ￥' + (money - response.data.coupon.price) + ' 立即解锁');
				} else {
					$('.couponUse').hide();
					$('.couponDesc').show();
					$('.unlock_btn').text('支付 ￥' + money + ' 立即解锁');
					$('.couponDesc').html(response.data.remark);
					$('.bzcs_share').removeClass('hidden');
					$('.payForBzcs').text('支付 ￥' + money + ' 立即解锁');
				}
			}
		})
	}


})

/* 分享 */
var title = '惊！我的未来运势居然是这样...';
var text = '赶快来领取你的专属未来运势卡吧！';
var imageURL = 'https://qiniu.image.cq-wnl.com/content/20170824c4936b61b83049028cd8ef95484b8903.jpg';
var baseUrl = 'https://mobile.51wnl.com/numberology/bzcs/bzcs_index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&channel=[CHANNEL]&posId=[posId]&boundId=[BUNDLE]';
var currUrl = location.href.replace('&payresult=1', '') + '&isShare=1';
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
	targetUrl: location.href
};
wnlui.wxShare({
	title: '八字测算',
	text: '我在万年历看【八字测算】，分享给你，一起看吧！',
	imgUrl: imageURL,
	imageUrl: imageURL,
	url: currUrl
});

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

var isNone = 0,
	isShow = 0,
	isPayed = 0,
	uniqueId = ''; //用户设备当前标识
function userinfocallback(result) {
	var originalString = Base64.decode(result);
	var originalAllObj = JSON.parse(originalString);
	if (originalAllObj.cmsShow.isNone) {
		isNone = 1;
	}
	if (!originalAllObj.native_score) {
		return false;
	}
	var native_score = originalAllObj.native_score;
	//未登录
	if ((!native_score.userId || native_score.userId.length === 0)) {
		uniqueId = native_score.deviceId; //设备标识，重装会变
	} else {
		//已登录
		uniqueId = native_score.userId;
	}
}

function ylappCallback_back() {
	if (navigator.userAgent.toLowerCase().indexOf("android") < 0) {
		return 0;
	}
	if (isNone || isShow) {
		if (ylwindow) {
			ylwindow.reportHasBack(false);
		}
		return 0;
	}
	if (isPayed) {
		$("#cmsModal").modal();
		isShow = true;
		ylwindow.reportHasBack(true);
	}
}
