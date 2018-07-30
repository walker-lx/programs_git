$(function () {
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
        }
    };
    // 获取参数
    function getQueryValue(key, style) {
        if (style === undefined || style === '') {
            style = '&';
        }
        var match = location.href.match(new RegExp(key + '=([^' + style + ']*)'));
        return (match && match[1]) || '';
    }

    var userId = getQueryValue('userId') || getQueryValue('userid');
    var deviceId = getQueryValue('deviceId') || getQueryValue('deviceid');
    var pushToken = getQueryValue('pushToken') || getQueryValue('pushtoken'); //andriod推送token
    var pToken = getQueryValue('pToken') || getQueryValue('ptoken'); //ios推送token
    var mac = getQueryValue('mac');
    var imei = getQueryValue('imei');
    var idfa = getQueryValue('idfa');
    var boundId = getQueryValue('boundId');
    var posId = getQueryValue('posId') || getQueryValue('posid') || getQueryValue('posID');
    var channel = getQueryValue('channel') || getQueryValue('CHANNEL') || 'appstore';
    var orderId = getQueryValue('orderId') || getQueryValue('orderid') || getQueryValue('orderID');
    var couponId = getQueryValue('couponId') || getQueryValue('couponid') || '';
    var unpay = getQueryValue('unpay') || ''
    var source = "一生事业运";
    var parterId = "ChartWorkLuck";
    var openId = '';
    if (browser.isWx()) {
        var wnl_loc = JSON.parse(localStorage.getItem('wnl_tlp_local'));
        if (wnl_loc && wnl_loc.openid) {
            openId = wnl_loc.openid;
            userId = wnl_loc.wnlUserId;
        }
    } else {
        if (localStorage.getItem('wnl_tlp_guid')) {
            userId = localStorage.getItem('wnl_tlp_guid');
        }
    }
    var uniqueId = userId;
    if (userId == "") {
        uniqueId = deviceId;
    }

    $(".main").addClass("hidden");

    // 分值星星展示
    function showStar(el, score) {
        var r = /^\+?[1-9][0-9]*$/; //正整数
        if (r.test(score)) {
            for (var i = 0; i < score; i++) {
                $(el).find('.score').eq(i).addClass("score-star");
            }
            if (score < 5) {
                for (var i = score; i < 5; i++) {
                    $(el).find('.score').eq(i).addClass("score-star-null");
                }
            }
        } else {
            score = parseInt(score);
            for (var i = 0; i < score; i++) {
                $(el).find('.score').eq(i).addClass("score-star");
            }
            $(el).find('.score').eq(score).addClass("score-star-half");
            for (var i = score + 1; i < 5; i++) {
                $(el).find('.score').eq(i).addClass("score-star-null");
            }
        }
    }
    // 获取测算结果
    function getContent() {
        console.log(posId);
        $.ajax({
            url: '//coco70.51wnl.com/numberologynew/ChartWorkLuck/GetOrderDetail?UserID=' + userId + '&DeviceID=' + deviceId + '&OrderID=' + orderId,
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                $(".main").removeClass("hidden");
                console.log(res);
                var data = res.data.contentData;
                var goodsId = res.data.goodsID;
                var price = res.data.price;
                if (!res.data.isPay) {
                    // 解锁前  结果页
                    var f1 = data.f1;
                    var f2 = data.f2;
                    var keywords = data.g1.split(",");
                    $(".content").removeClass("hidden");
                    $(".lock-btn").removeClass("hidden");
                    $(".keywords01").html(keywords[0]);
                    $(".keywords02").html(keywords[1]);
                    $(".keywords03").html(keywords[2]);
                    $(".nature-content").html(data.z1);
                    showStar('.f1', f1);
                    showStar('.f2', f2);
                    $(".pay-btn,.lock-btn,.more-content").click(function () {
                        pay(goodsId, price)
                    })
                    
                } else {
                    // 解锁后  结果页
                    var f1 = data.f1;
                    var f2 = data.f2;
                    var f3 = data.f3;
                    var f4 = data.f4;
                    var f5 = data.f5;

                    showStar('.f1', f1);
                    showStar('.f2', f2);
                    showStar('.f3', f3);
                    showStar('.f4', f4);
                    showStar('.f5', f5);

                    var keywords = data.g1.split(",");
                    $(".keywords01").html(keywords[0]);
                    $(".keywords02").html(keywords[1]);
                    $(".keywords03").html(keywords[2]);
                    $(".nature-content").html(data.z1);
                    $(".pay-btn").addClass("hidden");
                    $(".content1").removeClass("hidden");
                    $(".content2").removeClass("hidden");
                    $(".other").addClass("hidden");
                    $(".success_content").removeClass("hidden");
                    $(".z2").html(data.z2).removeClass("result-content-bg");
                    $(".z3").html(data.z3).removeClass("result-content-bg");
                    $(".z4").html(data.z4);
                    $(".z5").html(data.z5);
                    $(".z6").html(data.z6);
                    $(".z7").html(data.z7);
                    $(".z8").html(data.z8);
                    $(".z9").html(data.z9);
                    $(".z10").html(data.z10);
                    $(".z11").html(data.z11);
                    $(".lock-btn").addClass("hidden");
                    var shareUrl = "https://mobile.51wnl.com/numberology/xpgz/index.html?posId=" + posId;
                    console.log(data);
                    shareRedPackage({
                        goodsId: goodsId,
                        parterId: parterId,
                        orderId: orderId,
                        url: shareUrl,
                        wxShareTitle: '拆开红包，查看事业财运能否芝麻开花！',
                        wxShareText: '拆开红包，查看事业财运能否芝麻开花！',
                        wxShareImage: '1',
                        wxShareUrl: shareUrl
                    });

                }
            },
            err: function (res) {
                console.log('err:' + err);
            }

        });
    }
    getContent();
    //   运营位1
    // function getProduct1() {
    //     $.ajax({
    //         url: "//coco70.51wnl.com/numberologynew/BaseCeSuan/GetRelevantGoodsList?type=4&size=1",
    //         type: "GET",
    //         dataType: "json",
    //         success: function (res) {
    //             // console.log(res);
    //             var data = res.data[0];
    //             // console.log(data.img);
    //             $(".work_link").attr("href", data.url);
    //             $(".work_link img").attr("src", data.img);

    //         },
    //         error: function () {

    //         }
    //     })
    // };
    //   运营位2
    function getProduct2() {
        $.ajax({
            url: "//coco70.51wnl.com/numberologynew/BaseCeSuan/GetRelevantGoodsList?type=3&size=3",
            type: "GET",
            dataType: "json",
            success: function (res) {
                var data = res.data;
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    $(".other_link .link").eq(i).attr("href", data[i].url);
                    $(".other_link .link").eq(i).find("img").attr("src", data[i].img);
                    $(".other_link .link").eq(i).find(".link_title").html(data[i].title);
                    $(".other_link .link").eq(i).find(".link_number").html(data[i].useNum+"人参与");
                }

            },
            error: function () {

            }
        })
    };
    // getProduct1();
    getProduct2();
    // 支付
    function pay(goodsId, price) {
        // $.ajax({
        //     url: "//coco70.51wnl.com/numberologynew/BaseCeSuan/GetPosPrice?parterid=ChartWorkLuck&posid=" + posId,
        //     type: "GET",
        //     dateType: "json",
        //     success: function (res) {
        //         console.log(res);
        //         var data = JSON.parse(res);
        //         var price = data.data.price;
        //         console.log(data);
        window.location.href = '//order.51wnl.com/pay_web/index_t.html?money=' + price + '&source=' + source + '&parterid=' + "wnl_mall_" + parterId + '&goodsid=' +
            goodsId + '&parteruserid=' + uniqueId + '&data=' + orderId + '&posId=' + posId + '&openid=' + openId + '&couponId=' + couponId +
            '&returnUrl=' + encodeURIComponent(location.href);
        //     },
        //     error: function (res) {
        //         console.log("获取价格失败");
        //     }
        // });
    }
    // iphoneX适配
    function isIphoneX() {
        ua = window.navigator.userAgent;
        if (ua.match(/iPhone|iPad|iPod/i)) {
            if (parseInt(window.devicePixelRatio) === 3 && parseInt(window.screen.width) === 375) {
                return true;
            }
            return false;
        }
        return false;
    }
    if (isIphoneX()) {
         $(".iphoneXBanner").removeClass("hidden");
         $(".main").css("margin-bottom","34px");
   }
})