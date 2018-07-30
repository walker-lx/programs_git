<template>
    <div class="result">
        <div class="result-title">
            <div class="result-title1">
                <div class="result-title1-card"
                     :class="{cardrotate:rotate==1}">
                    <img :src="imgsrc">
                </div>
                <div class="result-title1-name">
                    <div class="result-title-name1">桃花指数</div>
                    <div class="result-title-name2">牌名</div>
                    <div class="result-title-name3">关键词</div>
                </div>
                <div class="result-title1-text">
                    <div class="result-title1-text1">
                        <i class="result-title-text1-icon result-title-text1-icon1"
                           v-for="n in happyLevel"
                           :key="n"></i>
                        <i class="result-title-text1-icon result-title-text1-icon2"
                           v-if="isrp"></i>
                    </div>
                    <div class="result-title1-text2">{{cardDetail.freeData.cardName}}</div>
                    <div class="result-title1-text3">{{cardDetail.freeData.keyWord}}</div>
                </div>
            </div>
            <div class="result-title2">{{cardDetail.freeData.cardIdea}}</div>
        </div>
        <div class="result-list"
             :style="{display:isHd}">
            <template v-if="!payStatus">
                <div class="result-item fuzz"
                     @click="payOrder"
                     v-for="v in resultTitle"
                     :key="v">
                    <div class="result-item-title">
                        <div class="result-item-title-text">{{v}}</div>
                    </div>
                    <div class="result-item-content">
                        <div class="result-show-all"
                             v-if="!payStatus">
                        </div>
                        <div class="result-item-content-corner result-item-content-tl"></div>
                        <div class="result-item-content-corner result-item-content-tr"></div>
                        <div class="result-item-content-corner result-item-content-bl"></div>
                        <div class="result-item-content-corner result-item-content-br"></div>
                        <div class="result-tiem-content-text fuzz">
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="result-item"
                     @click="showPay"
                     v-for="(v,index) in resultContent"
                     style="height:auto"
                     :key="v">
                    <div class="result-item-title">
                        <div class="result-item-title-text">{{v.Title}}</div>
                    </div>
                    <div class="result-item-content">
                        <div class="result-item-content-corner result-item-content-tl"></div>
                        <div class="result-item-content-corner result-item-content-tr"></div>
                        <div class="result-item-content-corner result-item-content-bl"></div>
                        <div class="result-item-content-corner result-item-content-br"></div>
                        <template v-if="index!=3">
                            <div class="result-tiem-content-text">{{v.Content}}</div>
                        </template>
                        <template v-else>
                            <div class="result-tiem-content-text">{{v.Content.Girl}}</div>
                            <div class="result-tiem-content-text">{{v.Content.Boy}}</div>
                        </template>
                    </div>
                </div>
            </template>
            <div class="result-show-kyjl"
                 @click="toNewLink"
                 v-if="payStatus&&!weixin">
            </div>
        </div>
        <div class="result-show-pay-wrap"
             v-if="!payStatus"
             :style="{display:isHd}">
            <div class="btn result-show-pay"
                 @click="payOrder">立即解锁幸福秘诀
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import getQueryStringArgs from '../util/parseurl.js'
import device from '../util/device.js'
import { mapState } from 'vuex'
import Velocity from 'velocity-animate'
import { hex_md5 } from '../util/md5.js'

export default {
    data() {
        return {
            showPayBtn: false,
            happyLevel: 0,
            isrp: false,
            isHd: 'none',
            cardDetail: {
                freeData: {}
            },
            resultTitleList:
            [
                ['我近期桃花运如何？', '我会邂逅什么样的对象？', '在哪里遇到命定之人？', '专属提升魅力开运秘法！'],
                ['我和他/她有可能在一起吗？', '他/她对我们关系的看法？', '我们交往需要注意什么？', '专属提升魅力开运秘法！'],
                ['他/她是我对的人吗？', '我们存在第三者的困扰吗？', '如何让我们感情增温？', '专属提升魅力开运秘法！'],
                ['我们的婚姻质量乐观吗？', '如何面对“七年之痒”？', '我们的婚姻中有信任危机吗？', '专属提升魅力开运秘法！']
            ],
            resultTitle: [],
            resultContent: [],
            cardCode: '',
            status: '',
            rotate: '',
            payStatus: false,
            imgsrc: '',
            orderId: null,
            isLogin: this.$store.state.isLogin,
            weixin: device.weixin
        }
    },
    computed: mapState({
        orderInfo: state => state.orderInfo,
        clientInfo: state => state.clientInfo
    }),
    created() {
        var url = window.location.href;
        if (decodeURIComponent(url).indexOf('?') > -1) {
            var clientInfo = getQueryStringArgs(decodeURIComponent(url));
            console.log(clientInfo);
            this.$store.commit('setClientInfo', clientInfo);
            if (clientInfo.orderId != null && clientInfo.orderId != undefined && clientInfo.orderId != '') {
                this.orderId = clientInfo.orderId;
                this.$store.commit('createOrder', this.orderId);
            }
        }
    },
    mounted() {
        document.querySelector('.wnl_history_btn').style.display = 'none';
        this.getOrderDetail();
        wnlui.wxShare({
            title: '塔罗感情运',
            text: '我在万年历看【塔罗感情运】，分享给你，一起看吧！',
            imgUrl: 'https://www.51wnl.com/wnl_bless/img/gqyshareicon.jpg',
            imageUrl: 'https://www.51wnl.com/wnl_bless/img/gqyshareicon.jpg',
            url: location.origin + '/numberology/gqy/#/?posId=[posId]'
        });
    },
    methods: {
        showPay() {
            if (!this.payStatus) {
                this.showPayBtn = true;
            }
        },
        hiddenPay() {
            this.showPayBtn = false;
        },
        toNewLink() {
            window.location.href = '//coco70.51wnl.com/numberologynew/xzhp/src/index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&channel=[CHANNEL]&posId=[posId]&boundId=[BUNDLE]&pushToken=[PTOKEN]&pToken=[PTOKEN]';
        },
        getOrderDetail() {
            this.$vux.loading.show({
                text: '加载中'
            });
            axios({
                method: 'POST',
                url: '//coco70.51wnl.com/numberologynew/TarotLove/GetOrderDetail',
                data: {
                    OrderID: this.orderId,
                    UserID: this.clientInfo.userId,
                    DeviceID: this.clientInfo.deviceId,
                },
            }).then((result) => {
                console.log(result);
                this.isHd = 'block';
                this.$vux.loading.hide();
                this.cardDetail = result.data.data.data;
                this.happyLevel = this.cardDetail.freeData.happyZS;
                this.cardCode = parseInt(this.cardDetail.cardCode.substring(0, 2));
                this.rotate = this.cardDetail.cardCode.substring(2, 3);
                this.status = this.cardDetail.cardCode.substring(3, 4) - 1;
                this.payStatus = result.data.data.payStatus == 1 ? true : false;
                this.resultTitle = this.resultTitleList[this.status];
                this.imgsrc = '//coco70.51wnl.com/numberologynew/gqy/cards/c' + this.cardCode + '.png';
                if (this.happyLevel !== parseInt(this.happyLevel)) {
                    this.isrp = true;
                    this.happyLevel = parseInt(this.happyLevel);
                }
                if (this.payStatus) {
                    for (var k in this.cardDetail.payData) {
                        this.resultContent.push(this.cardDetail.payData[k]);
                    }

                    window.shareRedPackage({
                        goodsId: this.orderInfo.goodsId,
                        parterId: this.orderInfo.parterId,
                        orderId: result.data.data.orderID,
                        url: window.location.href.replace('#/result?', '#/entry?'),
                        wxShareTitle: '是劫是缘，一测便知！',
                        wxShareText: '直击矛盾根源，让迷茫感情拨云见日！',
                        wxShareImage: 'https://www.51wnl.com/wnl_bless/img/gqyshareicon.jpg',
                        wxShareUrl: location.href
                    });
                }
            })
        },
        //支付
        payOrder() {
            const money = this.orderInfo.orderPrice;
            const name = '塔罗感情运';//goodsName
            const goodsId = this.orderInfo.goodsId;
            const parterId = this.orderInfo.parterId;
            const parterName = '塔罗感情运';
            const orderId = this.orderInfo.orderId;
            const userId = this.clientInfo.userId;
            const deviceId = this.clientInfo.deviceId;
            const pushToken = this.clientInfo.pushToken;
            const imei = this.clientInfo.imei;
            const mac = this.clientInfo.mac;
            const boundid = this.clientInfo.boundid;
            const posId = this.clientInfo.posId;

            var openId = '';
            if (device.weixin) {
                openId = JSON.parse(localStorage.getItem('wnl_tlp_local')).openid;
            }
            var url = '//mobile.51wnl.com/numberology/gqy/#/result?userId=' + userId + '&deviceId=' + deviceId + '&pushToken=' + pushToken + '&pToken=' + pushToken + '&mac=' + mac + '&imei=' + imei + '&boundid=' + boundid + '&posId=' + posId + '&orderId=' + orderId;

            var url2 = '//mobile.51wnl.com/numberology/gqy/#/?userId=' + userId + '&deviceId=' + deviceId + '&pushToken=' + pushToken + '&pToken=' + pushToken + '&mac=' + mac + '&imei=' + imei + '&boundid=' + boundid + '&posId=' + posId;

            var uid = userId ? userId : deviceId

            var params = {
                money: money,
                source: name,
                parterid: parterId,
                goodsid: goodsId,
                parteruserid: uid,
                posId: posId,
                data: orderId,
                returnUrl: encodeURIComponent(url),
                failUrl: encodeURIComponent(url2),
                couponId: this.clientInfo.couponId || '',
                imei: imei
            }

            if (device.weixin) {
                params.openid = openId
            }
            window.location.href = '//order.51wnl.com/pay_web/index_t.html?' + this.stringify(params);
        },
        stringify(obj) {
            var str = '';
            var keys = Object.keys(obj);
            keys.forEach(function(v, k, arr) {
                k < arr.length - 1 ?
                    str += v + '=' + obj[v] + '&' :

                    str += v + '=' + obj[v]
            });
            return str;
        },
        getSign(data, privateKey) {
            function deepCopy(p, c) {
                c = c || {}
                for (var i in p) {
                    if (p.hasOwnProperty(i)) {
                        if (typeof p[i] === 'object') {
                            c[i] = Array.isArray(p[i]) ? [] : {}
                            deepCopy(p[i], c[i])
                        } else {
                            c[i] = p[i]
                        }
                    }
                }
                return c
            }
            var obj = deepCopy(data);
            obj.PrivateKey = privateKey;
            var sign = '';
            var keys = Object.keys(obj).sort();
            console.log(keys)
            keys.forEach(function(v, k, arr) {
                k < arr.length - 1 ? sign += v + '=' + data[v] + '&' :
                    sign += v + '=' + data[v]
            });
            return hex_md5(sign);
        }
    }
}

</script>
<style scoped>
.result-item.fuzz:last-child {
    padding-bottom: 3rem;
}

.result-title1-card img {
    width: 100%;
    height: 100%;
}
</style>
