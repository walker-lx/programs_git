var ua = window.navigator.userAgent;
var appVersion = /[a-zA-Z]/.test(ua.split(' ').pop()) ? '1.0.0' : ua.split(' ').pop(); //app版本号
var sysVersion = getIOSVersion() || getAndroidVersion(); //系统版本号
if (posId == '[posId]' || posId == '') {
    posId = 'default';
}

console.log(location.href);
console.log('#-----4---'+couponId);
// 获取iOS版本号
function getIOSVersion() {
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
// 获取andriod版本号
function getAndroidVersion() {
    ua = ua.toLowerCase();
    var match = ua.match(/android\s([0-9\.]*)/);
    return match ? parseFloat(match[1]) : false;
}
// 获取参数值
function getQueryValue(key) {
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg) || window.location.hash.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
// 检测设备
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
    }
};
// clientType
var clientType = 'Youloft_IOS';
if (browser.isIOS()) {
    clientType = 'Youloft_IOS';
} else if (browser.isAndroid()) {
    clientType = 'Youloft_Android';
} else {
    clientType = 'other';
}

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
if (browser.isWx()) {
    channel = sourceType;
}
// 错误信息提示
function drawToast(message) {
    var alert = document.getElementById('toast');
    if (alert.className.match(new RegExp('(\\s|^)' + 'show' + '(\\s|$)'))) {
        return false;
    }
    alert.className = alert.className.replace('lines', '');
    alert.style.opacity = .8;
    alert.innerHTML = message;
    var temp_alert = document.getElementById('toast1');
    temp_alert.innerHTML = message;
    alert.className += 'show';
    alert.style.marginLeft = '-' + temp_alert.offsetWidth / 2 + 'px';
    intervalCounter = setTimeout(function () {
        alert.style.opacity = 0;
        clearInterval(intervalCounter);
    }, 1500);
    setTimeout(function () {
        alert.className = alert.className.replace('show', '');
        alert.innerHTML = '';
    }, 2000);
}

$(function () {
    var name;
    var bornDate; //农历出生日期
    var glBornDate; //公历出生日期
    var bornTime;
    var bornPlace;
    var calendartype; //历法 0公历 1农历
    var sex = 1; //1->男 0->女  默认为0
    var ordername = "星盘工作运";
    var orderId; //createOrder返回
    var parterId; //createOrder返回
    var goodsId; //createOrder返回

    if (!posId || (/posid/i).test(posId)) {
        posId = "default";
    }
    var long; //出生城市经度
    var lat; //出生城市纬度

    // 底部解锁按钮显示
    $(window).scroll(function () {
        if ($(".confirm_btn").offset().top - $(document).scrollTop() <= -50) {
            $(".confirm_btn_fixed_show").removeClass("confirm_btn_fixed_hidden");
            $('.wnl_history_btn').addClass('btn_pop');
        } else {
            $(".confirm_btn_fixed_show").addClass("confirm_btn_fixed_hidden");
            $('.wnl_history_btn').removeClass('btn_pop');
        }
    })

    // 出生日期选择
    $('.dateTxt').click(function () {
        var datePicker = new wnlui.datePicker({
            showLunar: true,
            defaultValue: [1990, 1, 1],
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                $('.dateTxt').attr("placeHolder", "");
                console.log(result);
                if (result.isSolar) {
                    var resultDate = result.dateObj;
                    calendartype = 0;
                    var dateStr = '公历 ' + resultDate.cYear + '年' + resultDate.cMonth + '月' + resultDate.cDay + '日';
                    $('.dateTxt').val(dateStr);
                    bornDate = resultDate.lYear + '-' + resultDate.lMonth + '-' + resultDate.lDay;
                    glBornDate = resultDate.cYear + '-' + resultDate.cMonth + '-' + resultDate.cDay;
                    localStorage.setItem("bornDate", bornDate);
                    localStorage.setItem("glBornDate", glBornDate);
                    localStorage.setItem("type", calendartype);
                } else {
                    var resultDate = result.dateObj;
                    calendartype = 1;
                    var dateStr = '农历 ' + resultDate.lYear + '年' + resultDate.IMonthCn + resultDate.IDayCn;
                    $('.dateTxt').val(dateStr);
                    bornDate = resultDate.lYear + '-' + resultDate.lMonth + '-' + resultDate.lDay;
                    glBornDate = resultDate.cYear + '-' + resultDate.cMonth + '-' + resultDate.cDay;
                    localStorage.setItem("bornDate", bornDate);
                    localStorage.setItem("glBornDate", glBornDate);
                    localStorage.setItem("type", calendartype);
                    // console.log(bornDate + "---" + glBornDate+"----"+calendrtype);
                }

            }
        });
        $('.wnlui_mask').on('touchmove', function (e) {
            e.preventDefault();
        });
        datePicker.show();

    });
    // 出生时间选择
    $("#bornTime").click(function () {
        wnlui.picker([{
                label: '不清楚',
                value: '12:00:00',
                /* disabled: true*/
            },
            {
                label: '00:00-00:59',
                value: '0:30:00'
            },
            {
                label: '01:00-01:59',
                value: '1:30:00'
            },
            {
                label: '02:00-02:59',
                value: '2:30:00'
            }, {
                label: '03:00-03:59',
                value: '3:30:00'
            },
            {
                label: '04:00-04:59',
                value: '4:30:00'
            },
            {
                label: '05:00-05:59',
                value: '5:30:00'
            },
            {
                label: '06:00-06:59',
                value: '6:30:00'
            },
            {
                label: '07:00-07:59',
                value: '7:30:00'
            },
            {
                label: '08:00-08:59',
                value: '8:30:00'
            }, {
                label: '09:00-09:59',
                value: '9:30:00'
            },
            {
                label: '10:00-10:59',
                value: '10:30:00'
            },
            {
                label: '11:00-11:59',
                value: '11:30:00'
            },
            {
                label: '12:00-12:59',
                value: '12:30:00'
            },
            {
                label: '13:00-13:59',
                value: '13:30:00'
            },
            {
                label: '14:00-14:59',
                value: '14:30:00'
            }, {
                label: '15:00-15:59',
                value: '15:30:00'
            },
            {
                label: '16:00-16:59',
                value: '16:30:00'
            },
            {
                label: '17:00-17:59',
                value: '17:30:00'
            },
            {
                label: '18:00-18:59',
                value: '18:30:00'
            },
            {
                label: '19:00-19:59',
                value: '19:30:00'
            },
            {
                label: '20:00-20:59',
                value: '20:30:00'
            }, {
                label: '21:00-21:59',
                value: '21:30:00'
            },
            {
                label: '22:00-22:59',
                value: '22:30:00'
            },
            {
                label: '23:00-23:59',
                value: '23:30:00'
            }
        ], {
            className: 'custom-classname',
            container: 'body',
            // defaultValue: [1],
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                $('#bornTime').attr("placeHolder", "");
                console.log(result);
                var timeStr = result[0].label;
                $('#bornTime').val(timeStr);
                bornTime = result[0].value;
                localStorage.setItem("bornTime", bornTime);
            },
            id: 'singleLinePicker'
        });
        $('.wnlui_mask').on('touchmove', function (e) {
            e.preventDefault();
        })
    });
    // 出生地点选择
    var cityPickerLongLat = new wnlui.cityPicker({
        cityCode: false,
        onChange: function (result) {
            console.log(result);
        },
        onConfirm: function (result) {
            $("#birthPlace").attr("placeHolder", "");
            console.log(result);
            var cityStr = result[0].label + '-' + result[1].label + '-' + result[2].label;
            console.log(cityStr);
            $('#birthPlace').val(cityStr);
            long = result[2].longitude;
            lat = result[2].latitude;
            localStorage.setItem("long", long);
            localStorage.setItem("lat", lat);
        }
    });
    $("#birthPlace").click(function () {
        cityPickerLongLat.show();
        $('.wnlui_mask').on('touchmove', function (e) {
            e.preventDefault();
        })

    });
    $('.circleMask, circleMaskBackground').on('touchmove', function (e) {
        e.preventDefault();
    });

    // 性别切换
    $(".sex-type").first().click(function () {
        alert(1);
        sex = 1; //男
        $(".sex-type").removeClass("sex-on");
        $(this).addClass("sex-on");
        if ($(".sex-bg").first().hasClass("sex-check2")) {
            $(".sex-bg").first().removeClass("sex-check2").addClass("male-bg");
            $(".sex-bg").last().removeClass("sex-check1").addClass("female-bg");
        }
    });
    $(".sex-type").last().click(function () {
        sex = 0; //女
        $(".sex-type").removeClass("sex-on");
        $(this).addClass("sex-on");
        $(".sex-bg").first().removeClass("male-bg").addClass("sex-check2");
        $(".sex-bg").last().removeClass("female-bg").addClass("sex-check1");
    });
    //
    $(".nameTxt").on("click", function () {
        $(".nameMask").removeClass("hidden");
    });
    $(".nameTxt").on("blur", function () {
        $(".nameMask").trigger("click");
    });
    $(".nameMask").click(function () {
        if (!$(".nameMask").hasClass("hidden")) {
            $(".nameMask").addClass("hidden");
        } else {
            return;
        }
    })
    // tips弹出与隐藏
    $(".tips").click(function () {
        $(".mask").fadeIn(100);
        $(".explain").fadeIn(200);
    });
    $(".mask,.close-img").click(function () {
        $(".mask").fadeOut(100);
        $(".explain").fadeOut(200);
    });

    console.log(123);
    // 底部解锁按钮点击
    $(".confirm_btn_fixed_show,.confirm_btn_reason").click(function () {
        name = $(".nameTxt").val().trim();
        var dateTxt = $(".dateTxt").val();
        bornPlace = $("#birthPlace").val();
        var borntime = $("#bornTime").val();
        if (name == '' || dateTxt == '' || bornPlace == '') {
            $("body").animate({
                scrollTop: 0
            }, 600);
            setTimeout(function () {
                drawToast("请输入您的姓名");
            }, 300);
        }
        if (dateTxt == '') {
            $("body").animate({
                scrollTop: 0
            }, 600);
            setTimeout(function () {
                drawToast("请选择您的出生日期");
            }, 300);
        }
        if (borntime == '') {
            $("body").animate({
                scrollTop: 0
            }, 600);
            setTimeout(function () {
                drawToast("请选择您的出生时间");
            }, 300);
        }
        if (bornPlace == '') {
            $("body").animate({
                scrollTop: 0
            }, 600);
            setTimeout(function () {
                drawToast("请选择您的出生地点");
            }, 300);
        }
        $(".confirm_btn").trigger("click");
    });
    // 获取参与人数
    function getOrderNum() {
        $.ajax({
            url: "//coco70.51wnl.com/numberologynew/ChartWorkLuck/GetCeSuanOrderNum",
            type: "GET",
            data: "",
            dataType: "json",
            success: function (result) {
                // var data="25000"
                var data = parseInt(result.data) + 10000;
                var str = "已有" + data + "人进行测算";
                if (data >= 100000) {
                    $(".order-number").html("已有99999+人进行测算");
                } else {
                    $(".order-number").html(str);
                }
            },
            error: function () {
                console.log("error");
            }
        })
    }
    getOrderNum();
    // $(".order-number span").html(25000);
    // 提交订单
    $(".confirm_btn").click(function () {
        name = $(".nameTxt").val().trim();
        bornPlace = $("#birthPlace").val();
        var borndate = $(".dateTxt").val();
        var borntime = $("#bornTime").val();
        // 检测是否合理
        if (name.length == 0) {
            drawToast("请填写您的姓名");
            return false;
        }
        var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
        if (reg.test(name)) {
            drawToast("请输入正确的姓名");
            return false;
        }
        if (name.match(/^[\u4e00-\u9fa5]+$/)) {
            if (name.length > 5) {
                drawToast("请输入正确的姓名");
                return false;
            }
        } else {
            if (name.length > 20) {
                drawToast("请输入正确的姓名");
                return false;
            }
        }
        if (borndate.length == 0) {
            drawToast("请选择您的出生日期");
            return false;
        }
        // 有效的出生年份范围
        var nowYear = parseInt(new Date().getFullYear());
        var year = localStorage.getItem("glBornDate");
        var bornYear = parseInt(year.slice(0, 4));

        if ((nowYear - bornYear < 10) || (bornYear > nowYear) || (nowYear - bornYear > 80)) {
            drawToast("该出生年份无数据，请重新选择");
            return false;
        }
        if (borntime.length == 0) {
            drawToast("请选择您的出生时间");
            return false;
        }
        if (bornPlace.length == 0) {
            drawToast("请选择您的出生地点");
            return false;
        }

        createOrder();

    });
    // 创建订单
    function createOrder() {
        var jsonData = JSON.stringify({
            Name: name,
            Birthday: localStorage.getItem("bornDate"),
            GLBirthday: localStorage.getItem("glBornDate"),
            CalendarType: localStorage.getItem("type"),
            birthtimeHour: localStorage.getItem("bornTime"),
            posid: posId,
            Long: localStorage.getItem("long"),
            Lat: localStorage.getItem("lat"),
            HomePageUrl: "https://mobile.51wnl.com/numberology/xpgz/index.html",
            DetailsUrl: "https://mobile.51wnl.com/numberology/xpgz/result.html?userId=" + userId + "&deviceId=" + deviceId + '&posId=' + posId + '&orderID=[ORDERID]',
            UnPayUrl: "https://mobile.51wnl.com/numberology/xpgz/result.html?userId=" + userId + "&deviceId=" + deviceId + '&posId=' + posId + '&couponId=' + couponId + '&orderID=[ORDERID]' + '&unpay=1',
            birthdaycity: bornPlace,
            Sex: sex,
            ordername: ordername,
            ClientType: clientType,
            PToken: pushToken,
            Token: pToken,
            UserID: userId,
            DeviceID: deviceId,
            Idfa: idfa,
            DeviceMac: mac,
            ImeiNumber: imei,
            sysversion: sysVersion,
            appversion: appVersion,
            boundid: boundId,
            Channel: sourceType,
            goodsID: "94CA5F6E0CD14E26B043322658CE3F85"
        });
        console.log(jsonData);
        $.ajax({
            url: '//coco70.51wnl.com/numberologynew/ChartWorkLuck/CreateOrder',
            cache: false,
            type: "POST",
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: jsonData,
            beforeSend: function () {
                $('.circleMask').removeClass('hidden');
            },
            success: function (res) {
                console.log(res);
                console.log(res.data);
                console.log(posId);
                $('.circleMask').addClass('hidden');
                orderId = res.data.orderID;
                parterId = res.data.parterID;
                goodsId = res.data.goodsID;
                if (orderId == '') {
                    drawToast('下单失败,请稍后重试');
                } else {
                  console.log('#-----5---'+couponId)
                    location.href = 'result.html?userId=' + userId + '&deviceId=' + deviceId + '&mac=' + mac + '&imei=' + imei + '&idfa=' + idfa + '&channel=' + channel + '&boundId=' + boundId + '&pushToken=' + pushToken + '&pToken=' + pToken + '&posId=' + posId + '&couponId=' + couponId + '&orderId=' + orderId + '&parterId=' + parterId + '&goodsId=' + goodsId;
                }

            },
            error: function (res) {
                console.log('res=' + res);
            }
        });
    }
    // 用户评论信息
    var jsonstring = [{
            name: "李先生",
            tel: "134****9772",
            text: "马上毕业面临失业，每天为找工作愁得焦头烂额，现在压力也越来越大，准备往自己适合的行业走，少走弯路吧。"
        }, {
            name: "刘先生",
            tel: "136****6585",
            text: "的确挺准的，只怪自己当初选错了行，刚好现在也有机会跳槽，希望越来越好！"
        }, {
            name: "李女士",
            tel: "131****6221",
            text: "很感谢！女孩子也是适合创业的，不必在意别人怎么看。"
        },
        {
            name: "刘女士",
            tel: "133****9654",
            text: "你们家的测算一直都很准！支持！！！"
        },
        {
            name: "欧先生",
            tel: "181****8586",
            text: "帮朋友算了一下，看了之后他明确了方向，终于不再迷茫了。"
        },
        {
            name: "赵女士",
            tel: "130****9656",
            text: "原来老板是这样看我的，看来自己得多注意了。"
        },
        {
            name: "谢女士",
            tel: "134****9772",
            text: "马上毕业面临失业，每天为找工作愁得焦头烂额，现在压力也越来越大，准备往自己适合的行业走，少走弯路吧。"
        },
        {
            name: "赵先生",
            tel: "188****9641",
            text: "希望多出一点财运的产品，最近手气很差，生意也不顺。"
        }, {
            name: "蒋先生",
            tel: "136****9655",
            text: "我适合做教师，现在是做销售的，只不过也有类似，有时候客户就像自己的学生一样，哈哈。"
        }, {
            name: "罗先生",
            tel: "130****1524",
            text: "成家立业，家是成了，事业还待开发啊。"
        }, {
            name: "钱女士",
            tel: "133****9977",
            text: "要是像里面说的明年会遇到合适的机遇就好了，不想再熬了。"
        }, {
            name: "韩先生",
            tel: "180****5110",
            text: "怪不得我喜欢看侦探小说，看来我是真的适合做侦探而不是会计。"
        }, {
            name: "文先生",
            tel: "132****1463",
            text: "准！不仅是看事业，财运的也可以参考。"
        }, {
            name: "陈女士",
            tel: "188****6969",
            text: "替孩子找我们觉得好的工作还不如找他适合的工作，现在是想通了。"
        }, {
            name: "郑女士",
            tel: "177****3513",
            text: "做一个女强人真的很累，但是确实是命中注定，只不过这样自己更有安全感一些。"
        }, {
            name: "黎女士",
            tel: "131****0106",
            text: "天啦！真的是神准！！！服了服了！！！！！"
        }, {
            name: "周女士",
            tel: "133****3543",
            text: "分析得很到位很专业，希望再有另一半的事业就好了，哈哈"
        }, {
            name: "张女士",
            tel: "138****8310",
            text: "在自己擅长的领域才能有好的发展，别去拿自己的弱项拼别人的长项。"
        }, {
            name: "钱先生",
            tel: "136****6622",
            text: "写得太有道理了，句句戳心，值得总结反思。"
        }, {
            name: "魏女士",
            tel: "134****9655",
            text: "从里面也看到了自己性格的缺点，要有好的财运和事业真的靠的是天赋和自己的命啊。"
        }, {
            name: "张先生",
            tel: "138****4775",
            text: "产品收费不贵，内容很详细，实则精品！"
        }, {
            name: "彭先生",
            tel: "139****9691",
            text: "要成大器就得看天时地利与人和。"
        }, {
            name: "朱先生",
            tel: "135****0005",
            text: "职场如战场，人际关系相当重要。"
        }, {
            name: "胡女士",
            tel: "188****4856",
            text: "今天工作不顺利，求明年能够升职加薪。"
        }, {
            name: "王女士",
            tel: "159****6569",
            text: "财富要慢慢积累，特别是我这样中年后财运特别好的人。"
        }, {
            name: "邓女士",
            tel: "131****6332",
            text: "没想到会有这么多方面来分析事业和财运，生活中也好注意这些。"
        }, {
            name: "侯女士",
            tel: "130****1212",
            text: "求转运，求霉运退散。"
        }, {
            name: "廖女士",
            tel: "187****8985",
            text: "希望能看到我的回复，我之前去一家公司，一家公司倒闭，现在换了适合的行业，工作很有动力，觉得整个人都好了。"
        }, {
            name: "代先生",
            tel: "177****3635",
            text: "创业很困难，特别是起步的时候，一定要多参考参考。"
        },
        {
            name: "杨女士",
            tel: "185****6869",
            text: "一如既往的好，虽然产品不多但是个个都是精品。"
        }
    ];

    $(".swiper-wrapper").marquee({
        animateTime: 1000,
        stopTime: 2000,
        adjustHeight: 16
    });
    var len = jsonstring.length;
    for (var i = 0; i < len; i++) {
        $(".swiper-wrapper").append(" <div class=' marqueeItem'><div class='slide-title'><div class='telphone'>" + jsonstring[i].tel + "</div><div class='name'>" + jsonstring[i].name + "</div> </div> <div class='content'>" + jsonstring[i].text + "</div> </div>");
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
         $(".confirm_btn_fixed_show").css("bottom", "34px");
         $(".about").css("margin-bottom", "63px");
         $(".confirm_btn_fixed_hidden").css("bottom", "-27px !important");
         $(".wnl_history_btn").addClass("btn_fit");
         $(".iphoneXBanner").removeClass("hidden");
    }

})
