import { device, parseURL, store, getQueryString } from './tool';
import config from './config';
import wnlHistory from './wnlHistory';
var share = config.share;
var URL = parseURL(window.location.href);
var path = URL.path;
var port = URL.port ? ':' + URL.port : '';
var Link = URL.protocol + '://' + URL.host + port + URL.path.replace(/(index|result)/ig, 'select');

//首页
if (path.indexOf('select') < 0 && path.indexOf('result') < 0) {
    // window.shareRedPackage({
    //     goodsId: '123',
    //     parterId: '123',
    //     orderId: '123',
    //     url: 'http://mobile.51wnl.com/numberology/worktool/index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&boundid=[BUNDLE]&idfa=[IDFA]&channel=[CHANNEL]&posId=[posId]',
    //     wxShareTitle: 'title',
    //     wxShareText: 'text',
    //     wxShareImage: 'https://mobile.51wnl.com/numberology/redpackage/img/hongbao-share.jpg',
    //     wxShareUrl: location.href
    // });
    var wnl_tlp_local = store.getItem('wnl_tlp_local');
    if (device.weixin) {
        if (wnl_tlp_local) {
            $('.wnl_history_btn').css('display', 'block');
            config.payInfo.UserID = wnl_tlp_local.wnlUserId;
            config.payInfo.DeviceID = wnl_tlp_local.unionid;
            console.log(wnl_tlp_local)
        } else {
            $('.wnl_history_btn').css('display', 'none');
            var openid = getQueryString('openid');
            if (openid) {
                var wnl_tlp_local = {}
                wnl_tlp_local.openid = getQueryString('openid');
                wnl_tlp_local.unionid = getQueryString('unionid');
                wnl_tlp_local.gender = getQueryString('sex');
                wnl_tlp_local.openName = getQueryString('nickname');
                getWnlUserInfo(wnl_tlp_local, function (result) {
                    wnl_tlp_local.wnlUserId = result.data.wnlUserId;
                    config.payInfo.UserID = result.data.wnlUserId;
                    config.payInfo.DeviceID = unionid;
                    store.setItem('wnl_tlp_local', wnl_tlp_local);
                    $('.wnl_history_btn').css('display', 'block');
                });
            } else {
                location.href = 'https://b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + encodeURIComponent(window.location.href);
            }
        }
    }
    if (!device.wnl && !device.weixin) {
        $('.wnl_history_btn').css('display', 'block');
        if (window.localStorage.length > 1 && window.localStorage.wnl_tlp_guid) {
            config.payInfo.UserID = localStorage.getItem('wnl_tlp_guid');
            config.payInfo.DeviceID = localStorage.getItem('wnl_tlp_guid');
            console.log(config.payInfo);
        }
        else {
            $.ajax({
                url: '//coco70.51wnl.com/numberologynew/UniqueID/NewGuid',
                type: 'get',
                data: 'json',
                async: 'false',
                success: function (response) {
                    var userid = response.toString();
                    localStorage.setItem('wnl_tlp_guid', userid);

                    config.payInfo.UserID = localStorage.getItem('wnl_tlp_guid');
                    config.payInfo.DeviceID = localStorage.getItem('wnl_tlp_guid');
                    console.log("设置信息" + config.payInfo.UserID);
                }

            });
        }
    }

    $('.loop').html(setFeedbackList(config.feedbackInfo))
    showFeedback($('.loop'), 40)
    setIssueList($('.issue-list .item'));

    var flag = true;
    $('.issue-list .item').on('click', function () {
        if (device.weixin) {
            if (wnl_tlp_local) {
                config.payInfo.UserID = wnl_tlp_local.wnlUserId;
                config.payInfo.DeviceID = wnl_tlp_local.unionid;
            } else {
                flag = false;
                location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
            }
        }
        if (flag) {
            flag = false;
            var question = $(this).data('question');
            var orderId = '';
            config.payInfo.Question = question;

            createOrder(config.payInfo, function (result) {
                if (result.status == 2) {
                    toast(result.msg);
                    return;
                }
                console.log(result)
                orderId = result.data.orderID;
                var uid = config.payInfo.UserID ? config.payInfo.UserID : config.payInfo.DeviceID
                toast('订单创建中');

                var url1 = window.location.href.replace(/(index|result)/ig, 'select') + '&workToolOrderId=' + orderId;
                if (device.weixin) {
                    url1 = decodeURIComponent(url1);
                    url1 = removeParams('headimgurl country city nickname province access_token unionid sex boundid', url1);
                }
                var url2 = window.location.href;

                var params = {
                    money: config.payInfo.price,
                    source: config.payInfo.ordername,
                    parterid: config.payInfo.ParterID,
                    goodsid: config.payInfo.GoodsID,
                    parteruserid: uid,
                    posId: config.payInfo.posId,
                    data: orderId,
                    returnUrl: encodeURIComponent(url1),
                    // failUrl: encodeURIComponent(url2),
                    couponId: config.payInfo.couponId,
                    imei: config.payInfo.imei,
                }

                if (device.wnl) {
                    setTimeout(function () {
                        window.location.href = 'http://order.51wnl.com/pay_web/index_t.html?' + stringify(params);
                    }, 1000);
                }
                else if (!device.wnl && !device.weixin) {
                    url1 = window.location.href.replace(/(index|result)/ig, 'select') + '&workToolOrderId=' + orderId;
                    url1 = setParam('userId', localStorage.getItem('wnl_tlp_guid'), url1);
                    url1 = setParam('deviceId', localStorage.getItem('wnl_tlp_guid'), url1);
                    params.returnUrl = encodeURIComponent(url1);
                    setTimeout(function () {
                        window.location.href = 'http://order.51wnl.com/pay_web/index_t.html?' + stringify(params);
                    }, 1000);
                }
                else {
                    if (window.location.href.indexOf('openid') < 0) {
                        params.openid = store.getItem('wnl_tlp_local').openid;
                    }
                    setTimeout(function () {
                        window.location.href = 'http://order.51wnl.com/pay_web/index_t.html?' + stringify(params);
                    }, 1000);
                }
            });
        }
    })
}

//选牌
if (path.indexOf('select') > -1) {
    $('.wnl_history_btn').css('display', 'none');
    var flag = true;
    var orderId = getQueryString('workToolOrderId');

    if (device.weixin) {
        var wnlUserId = store.getItem('wnl_tlp_local').wnlUserId;
        var unionid = store.getItem('wnl_tlp_local').unionid;
        if (wnlUserId && unionid) {
            config.payInfo.UserID = wnlUserId;
            config.payInfo.DeviceID = unionid;
        } else {
            toast('无效wnlUserId');
        }
    }
    if (!device.wnl && !device.weixin) {
        config.payInfo.UserID = localStorage.getItem('wnl_tlp_guid');
        config.payInfo.DeviceID = localStorage.getItem('wnl_tlp_guid');
    }

    if (!orderId) {
        toast('无效订单号');
        setTimeout(function () {
            var url = window.location.href.replace(/select/ig, 'index');
            url = removeParams('payresult workToolOrderId', url);
            window.location.href = url;
        }, 1000);
    }
    getOrderDetail(orderId, config.payInfo, function (result) {
        $('.select .title').text(result.data.question);
        if (result.data.payStatus == 1 && result.data.cardInfo == null) {
            LoadCard(result.data.question, config.payInfo, function (result) {
                setCardListIndex(result.data);
                $('.select .card-list').css('opacity', 1);
            })

            $('.card-wrap').on('click', function () {
                var $node = $(this);
                var cardId = $node.data('id')
                if (flag) {
                    flag = false;
                    $node.find('.card-front').addClass('rotate-card-front');
                    $node.find('.card-reverse').addClass('rotate-card-reverse');
                    $('.card-wrap').addClass('opacity-card').find('.card-front').addClass('hidden');
                    $(this).removeClass('opacity-card').find('.card-front').removeClass('hidden');

                    chooseCard(orderId, cardId, config.payInfo, function (result) {
                        if (result.status == 0) {
                            setTimeout(function () {
                                var url = window.location.href.replace(/select/ig, 'result');
                                // if (device.weixin && device.ios && window.location.href.indexOf('#') < 0) {
                                //     url = url.split('?');
                                //     url = url[0] + '?' + encodeURIComponent(url[1]);
                                // }
                                window.location.href = url;
                            }, 2000);
                        } else {
                            toast(result.msg);
                        }
                    });
                }
            });
        } else if (result.data.payStatus == 1 && result.data.cardInfo != null) {
            toast('该订单已选牌');
            setTimeout(function () {
                var url = window.location.href.replace(/select/ig, 'result');
                if (device.weixin && device.ios && window.location.href.indexOf('#') < 0) {
                    url = url.split('?');
                    url = url[0] + '?' + encodeURIComponent(url[1]);
                }
                window.location.href = url;
            }, 1000);
        } else {
            toast('无效订单号');
            setTimeout(function () {
                var url = window.location.href.replace(/select/ig, 'index');
                url = removeParams('payresult workToolOrderId', url);
                window.location.href = url;
            }, 1000);
        }
    })
}

//结果
if (path.indexOf('result') > -1) {
    $('.wnl_history_btn').css('display', 'none');
    var str = '';
    if (device.weixin) {
        var wnlUserId = store.getItem('wnl_tlp_local').wnlUserId;
        var unionid = store.getItem('wnl_tlp_local').unionid;
        if (wnlUserId && unionid) {
            config.payInfo.UserID = wnlUserId;
            config.payInfo.DeviceID = unionid;
        } else {
            toast('无效wnlUserId');
        }
    }

    var flag = true;
    $('.switch-card .icon-2').on('click', function () {
        if (flag) {
            flag = false;
            $('.switch-card .card').css('opacity', 0);
            setTimeout(function () {
                setResultIssueList($('.switch-card .item'), str);
            }, 1000);
            setTimeout(function () {
                flag = true;
            }, 2000);
        }
    })

    var orderId = getQueryString('workToolOrderId');
    if (!orderId) {
        toast('无效订单号');
    }

    getOrderDetail(orderId, config.payInfo, function (result) {
        if (result.status == '2') {
            return
        }
        var data = result.data.payedAnswer;
        var cardInfo = result.data.cardInfo;
        var cardId = result.data.cardID;
        if (!cardInfo) {
            toast('该订单未解锁或无效订单号');
            return
        }
        if (cardInfo.cardNO.trim() == '1') {
            $('.result  .name-des-reverse').text('逆位');
        }
        $('.result  .name-des .text').text(cardInfo.cardName);

        var keyWordList = cardInfo.keyWord.split('、');
        keyWordList.forEach(function (v, k, arr) {
            $('.result  .keywords-des').append('<div class="item">' + v + '</div>');
        })
        setKeyWords($('.result  .keywords-des .item'));

        $('.result .card-type .enname-des').text(cardInfo.cardEnName);
        $('.result .card-type .card img').attr('src', 'https://qiniu.image.cq-wnl.com/TWT_' + cardId + '.png');
        $('.result .card-type .card').css('opacity', 1);

        $('.result .condition .title').text(data.question);
        str = data.question;
        setResultIssueList($('.switch-card .item'), str);
        $('.result .level+.status').text(data.summary);

        $('.result .level .text').text(data.displayTitle);
        if (data.displayTitle == '危机指数') {
            $('.result .level+.status').addClass('warning-status');
            $('.result .level .text').addClass('warning-text');
        }
        $('.result .status+.status').text(data.answer);
        $('.result .layout').css('opacity', 1);

        var score = data.score;
        $('.result .level .icon').each(function (k, v, arr) {
            if (k + 0.5 == score) {
                score = score - 1;
                v.classList.add('yellow-star-half');
            } else if (k < score) {
                v.classList.add('yellow-star');
            }
        });

        window.shareRedPackage({
            goodsId: config.payInfo.GoodsID,
            parterId: config.payInfo.ParterID,
            orderId: orderId,
            url: 'http://mobile.51wnl.com/numberology/worktool/index.html?userId=&deviceId=wx',
            wxShareTitle: config.share.title,
            wxShareText: config.share.text,
            wxShareImage: config.share.imgUrl,
            wxShareUrl: location.href
        });
    })

    $('.switch-card .item').on('click', function () {
        if (flag) {
            var question = $(this).data('question');
            var orderId = '';
            config.payInfo.Question = question;

            createOrder(config.payInfo, function (result) {
                orderId = result.data.orderID;
                store.setItem('wnl_tlp_local_orderId', orderId);
                var uid = config.payInfo.UserID ? config.payInfo.UserID : config.payInfo.DeviceID
                toast('订单创建中');

                var url1 = window.location.href.replace(/(index|result)/ig, 'select');
                url1 = setParam('workToolOrderId', orderId, url1).replace(/&payresult=1/ig, '');

                var url2 = window.location.href;

                var params = {
                    money: config.payInfo.price,
                    source: config.payInfo.ordername,
                    parterid: config.payInfo.ParterID,
                    goodsid: config.payInfo.GoodsID,
                    parteruserid: uid,
                    posId: config.payInfo.posId,
                    data: orderId,
                    returnUrl: encodeURIComponent(url1),
                    failUrl: encodeURIComponent(url2),
                    couponId: config.payInfo.couponId,
                    imei: config.payInfo.imei
                }

                //支付
                if (device.wnl) {
                    setTimeout(function () {
                        window.location.href = 'http://order.51wnl.com/pay_web/index_t.html?' + stringify(params);
                    }, 1000);
                }
                else if (!device.wnl && !device.weixin) {
                    url1 = window.location.href.replace(/(index|result)/ig, 'select');
                    url1 = setParam('workToolOrderId', orderId, url1);
                    params.returnUrl = encodeURIComponent(url1);
                    setTimeout(function () {
                        window.location.href = 'http://order.51wnl.com/pay_web/index_t.html?' + stringify(params);
                    }, 1000);
                }
                else {
                    setTimeout(function () {
                        window.location.href = 'http://order.51wnl.com/pay_web/index_t.html?' + stringify(params);
                    }, 1000);
                }
            });
        }
    });
}
function getWnlUserInfo(info, cb) {
    var param = {
        OpenId: info.openid,
        UnionId: info.unionid,
        Gender: info.gender,
        Platform: '2',
        OpenName: info.openName,
        Desc: '',
        AppId: 'ServiceAccount',
    };
    var data = {
        DataString: JSON.stringify(param)
    }
    $.ajax({
        url: '//u.51wnl.com/Login/OpenLogin?cid=Youloft_Android&av=4.2.6&mac=00:11:22:33:44:55&idfa=b622c089e7e14d2c2fa8c9129dafbb51&did=b622c089e7e14d2c2fa8c9129dafbb51&chn=wnl_anzhi&cc=CN&lang=zh&bd=com.youloft.calendar',
        dataType: 'json',
        method: 'POST',
        data: data,
        success: function (result) {
            if (typeof cb === 'function') {
                cb(result);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function toast(text, time) {
    var toast = document.querySelector('#toast');
    var t = time || 1000;
    toast.style.transition = 'all 0.5s ease';
    toast.style.opacity = '1';
    toast.firstElementChild.textContent = text;
    setTimeout(function () {
        toast.style.transition = 'all 1s ease';
        toast.style.opacity = '0';
    }, t)
}

function setFeedbackList(list) {
    var html = ''
    list.forEach(function (v, k, arr) {
        html += '<div class="item clearfix">' +

            '<div class="name">' + v.name + ':</div>' +
            '<div class="content">' + v.content + '</div>' +
            '</div>'
    })
    return html + html
}

function showFeedback(node, time) {
    var t = 0
    var height = parseInt(node.height())
    setInterval(function () {
        t = t < -height / 2 - 1 ? 0 : t - 1
        node.css('margin-top', t + 'px');
    }, time)
}

function setIssueList($list) {
    GetRandomQuestion(function (cb) {
        $list.each(function (k, v, arr) {
            v.dataset.question = cb.data[k].question;
            v.firstElementChild.innerText = cb.data[k].question.replace(/？/ig, '');
        })
        $list.find('.card').css('opacity', '1');
    });
}

function setResultIssueList($list, str) {
    GetRandomQuestion(function (cb) {
        cb.data.forEach(function (v, k, arr) {
            if (v.question == str) {
                cb.data.splice(k, 1);
            }
        })
        $list.each(function (k, v, arr) {
            v.dataset.question = cb.data[k].question;
            v.firstElementChild.innerText = cb.data[k].question.replace(/？/ig, '');
        })
        $list.find('.card').css('opacity', '1');
    });
}

function GetRandomQuestion(cb) {
    $.ajax({
        dataType: 'json',
        url: '//coco70.51wnl.com/numberologynew/TarotWorkTool/GetRandomQuestion',
        success: function (result) {
            if (typeof cb === 'function') {
                cb(result)
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function createOrder(params, cb) {
    var data = {
        ParterID: params.ParterID,//支付商户id
        GoodsID: params.GoodsID,	//产品ID	
        ordername: params.ordername,//订单名称	
        Question: params.Question,	//问题	
        TotalFee: params.price,	//价格	
        ClientType: params.ClientType,	//平台名称	可取值，Youloft_IOS（默认），Youloft_Android
        Channel: params.Channel,//渠道码	
        PToken: params.PToken,	//android推送token	
        Token: params.Token,	//ios推送token	
        UserID: params.UserID,	//登录用户编号	
        DeviceID: params.DeviceID,	//设备编号	
        Idfa: params.Idfa,//广告标识符
        DeviceMac: params.DeviceMac,//mac	
        ImeiNumber: params.ImeiNumber,	//imei
        boundid: params.boundid,
        posId: params.posId,
        appVersion: params.appVersion,
        sysVersion: params.sysVersion

    }
    $.ajax({
        dataType: 'json',
        url: '//coco70.51wnl.com/numberologynew/TarotWorkTool/CreateOrder',
        data: data,
        success: function (result) {
            if (typeof cb === 'function') {
                cb(result)
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function getOrderDetail(orderId, params, cb) {
    var data = {
        orderid: orderId,//订单编号 必填
        ClientType: params.ClientType,	//平台名称	可取值，Youloft_IOS（默认），Youloft_Android
        Channel: params.Channel,//渠道码	
        PToken: params.PToken,	//android推送token	
        Token: params.Token,	//ios推送token	
        UserID: params.UserID,	//登录用户编号	
        DeviceID: params.DeviceID,	//设备编号	
        Idfa: params.Idfa,//广告标识符	
        DeviceMac: params.DeviceMac,//mac
        ImeiNumber: params.ImeiNumber,	//imei
    }
    $.ajax({
        dataType: 'json',
        url: '//coco70.51wnl.com/numberologynew/TarotWorkTool/GetOrderDetail',
        data: data,
        success: function (result) {
            if (typeof cb === 'function') {
                // console.log(result)
                cb(result)
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function LoadCard(question, params, cb) {
    var data = {
        question: question,	//问题名称 必填	
        ClientType: params.ClientType,	//平台名称	可取值，Youloft_IOS（默认），Youloft_Android
        Channel: params.Channel,//渠道码	
        PToken: params.PToken,	//android推送token	
        Token: params.Token,	//ios推送token	
        UserID: params.UserID,	//登录用户编号	
        DeviceID: params.DeviceID,	//设备编号	
        Idfa: params.Idfa,//广告标识符	
        DeviceMac: params.DeviceMac,//mac	
        ImeiNumber: params.ImeiNumber,	//imei
    }
    $.ajax({
        dataType: 'json',
        url: '//coco70.51wnl.com/numberologynew/TarotWorkTool/LoadCard',
        data: data,
        success: function (result) {
            if (typeof cb === 'function') {
                cb(result)
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function setCardListIndex(data) {
    var array = [];
    while (array.length < data.length) {
        var number = (Math.random() * (data.length - 1)).toFixed();
        if (array.indexOf(number) < 0) {
            array.push(number);
        }
    }
    var list = Array.prototype.slice.call(document.querySelectorAll('.card-wrap'))
    list.forEach(function (v, k) {
        v.dataset.id = data[array.pop()].id;
        v.firstElementChild.style.backgroundImage = 'url(https://qiniu.image.cq-wnl.com/TWT_' + v.dataset.id + '.png)';
    })
}

//选牌
function chooseCard(orderId, cardId, params, cb) {
    var data = {
        OrderID: orderId,
        cardID: cardId,
        ClientType: params.ClientType,	//平台名称	可取值，Youloft_IOS（默认），Youloft_Android
        Channel: params.Channel,//渠道码	
        PToken: params.PToken,	//android推送token	
        Token: params.Token,	//ios推送token	
        UserID: params.UserID,	//登录用户编号	
        DeviceID: params.DeviceID,	//设备编号	
        Idfa: params.Idfa,//广告标识符	
        DeviceMac: params.DeviceMac,//mac	
        ImeiNumber: params.ImeiNumber,	//imei
    }
    $.ajax({
        dataType: 'json',
        url: '//coco70.51wnl.com/numberologynew/TarotWorkTool/ChooseCard',
        data: data,
        success: function (result) {
            if (typeof cb === 'function') {
                cb(result)
            }
        },
        error: function (e) {
            console.log(e)
        }
    })
}

function setKeyWords(keyWordsList) {
    var colorList = ['#589bee', ' #0bc288', '#0bc288', ' #ff732e', '#f05253'];
    var arr = {};
    keyWordsList.each(function (k, v) {
        $(v).css({
            'color': colorList[k],
            'border-color': colorList[k]
        });
    });
}

function stringify(obj) {
    var str = '';
    var keys = Object.keys(obj);
    keys.forEach(function (v, k, arr) {
        k < arr.length - 1 ?
            str += v + '=' + obj[v] + '&' :
            str += v + '=' + obj[v]
    });
    return str;
}

function setParam(name, val, url) {
    if (typeof name !== 'string') return false;
    if (!url) url = window.location.href;
    var _name = name.replace(/[\[\]]/g, '\\$&');
    var value = name + '=' + encodeURIComponent(val);
    var regex = new RegExp(_name + '=[^&]*');
    var urlArr = url.split('#');
    var result = '';

    if (regex.exec(url)) {
        result = url.replace(regex, value);
    } else {
        result = urlArr[0] + '&' + value + (urlArr[1] || '');
    }

    return result
}

function removeParam(name, url) {
    if (typeof name !== 'string') return false;
    if (!url) url = window.location.href;
    var urlparts = url.split('?');
    var prefix = encodeURIComponent(name + '=');
    var pars = urlparts[1].split(/[&;]/g);
    var i = 0,
        len = pars.length;

    for (; i < len; i++) {
        if (encodeURIComponent(pars[i]).lastIndexOf(prefix, 0) !== -1) {
            pars.splice(i, 1);
        }
    }

    url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');

    return url;
}

function removeParams(names, url) {
    var result = url || '';
    var names = names.split(' ');
    var i = 0,
        len = names.length;
    if (names.length === 0) return false;

    for (; i < len; i++) {
        result = removeParam(names[i], result);
    }
    return result;
}

window.appCallback_share = function () {
    var textObj = {
        title: share.title,
        text: share.text,
        image: '0',
        imageURL: share.imgUrl,
        url: share.link,
        pureText: share.text,
        prefix: ''
    };
    var textObj1 = {
        title: share.title,
        text: share.text,
        image: '0',
        imageURL: share.imgUrl,
        targetUrl: share.link,
        perfix: ''
    };
    try {
        if (window.ylwindow) {
            ylwindow.reportHasShare(true);
            location.href = 'protocol://share:' + encodeURI(JSON.stringify(textObj1));
        }
        else {
            location.href = 'protocol://share#' + encodeURI(JSON.stringify(textObj));
        }
    }
    catch (e) { }
    return 1;
};

