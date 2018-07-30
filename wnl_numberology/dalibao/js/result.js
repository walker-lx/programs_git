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
    var source = "新年大礼包";
    var parterId = "BigGift";
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
    function getResult() {
        var par1= getQueryValue('orderID');
        var par2= getQueryValue('deviceId');
        var par3= getQueryValue('userId');
        
        $.ajax({
            url: "//coco70.51wnl.com/numberologynew/BigGift/GetOrderDetail?OrderID="+par1+"&userid="+par3+"&deviceid=" + par2,
            type: "GET",
            dataType: 'json',
            success: function(res){
                if(!res.data.isPay){
                    location.href = '//mobile.51wnl.com/numberology/dalibao/index.html?userId='+par3+'&deviceId='+par2+'&pushToken='+pushToken+'&pToken='+pToken+'&mac='+mac+'&imei='+imei+'&idfa='+idfa+'&channel='+channel+'&posId='+posId+'&boundId='+boundId;
                }
                console.log(res);
                for(var i=0;i< res.data.productList.length;i++){
                    var item = '<div value="' + res.data.productList[i].url.replace('&payresult=1', '') + '" class="goodsItem" ><div class="goodsImg" style="width:100%;background-image:url(' + res.data.productList[i].img + ')"></div><div class="redirectBtn">点击查看结果</div></div>';
                    $('.resultgoods').append(item);
                }
                $('.goodsItem').on('click',function(){
                    location.href = $(this).attr('value');
                })
                $(".success_content").removeClass("hidden");
            }
        })
    }
    getResult();
    
    function getProduct2() {
        $.ajax({
            url: "//coco70.51wnl.com/numberologynew/BaseCeSuan/GetRelevantGoodsList?type=5&size=3",
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