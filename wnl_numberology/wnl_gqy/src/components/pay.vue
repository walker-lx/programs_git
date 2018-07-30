<template>
    <div class="pay"
         v-show="show">
        <div class="pay-mask"
             @click="hiddenPay">
        </div>
        <div class="pay-content"
             :style="{marginTop:marginTop}">
            <div class="pay-text">
                <div class="pay-texta">解锁获取你的姻缘解析完整版</div>
                <div class="pay-textb">是劫是缘？一测便知！</div>
            </div>
            <div class="pay-money"
                 v-show="!orderInfo.sale">支付金额：{{orderInfo.orderPrice}}元</div>
            <div class="pay-money-sale"
                 v-show="orderInfo.sale">
                <div class="sale-before clearfix">
                    <span class="sale-before-name">原价</span>
                    <span class="sale-before-val">{{parseFloat(orderInfo.orderPrice)}}元</span>
                </div>
                <div class="sale-price clearfix">
                    <span class="sale-price-name">优惠券抵扣：</span>
                    <span class="sale-price-val">{{parseFloat(orderInfo.salePrice)}}元</span>
                </div>
                <div class="sale-after clearfix">
                    <span class="sale-after-name">需支付金额</span>
                    <span class="sale-after-val">{{parseFloat(orderInfo.payPrice)}}元</span>
                </div>
            </div>
            <div class="btn pay-btn"
                 @click="payOrder">支付</div>
            <template v-if="!showUseCoupon&&!orderInfo.sale" >
                <div class="coupon-tips"
                     @click="showUseCoupon=true" v-show="showCouponSection">使用优惠券</div>
            </template>
            <template v-else>
                <div class="use-coupon">
                    <input type="text"
                           class="coupon-input"
                           v-model="clientInfo.couponId"
                           :disabled="orderInfo.sale"
                           placeholder="请输入优惠券码">
                    <div class="coupon-use-btn"
                         :class="{disabled:clientInfo.couponId==''||clientInfo.couponId==undefined||orderInfo.sale}"
                         @click="useCoupon">使用</div>
                </div>
            </template>
            <div class="coupon-status">{{msg}}</div>
        </div>
    </div>
</template>
<script>
import device from '../util/device.js'
import axios from 'axios'
import { hex_md5 } from '../util/md5.js'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            showUseCoupon: false,
            msg: '',
            salePrice: 0,
            marginTop: '33%',
            showCouponSection: true
        }
    },
    created () {
      if(!device.wnl && !device.weixin) {
            this.showCouponSection = false;
        }
    },
    computed: mapState({
        orderInfo: state => state.orderInfo,
        clientInfo: state => state.clientInfo
    }),
    mounted() {
        this.setPosition();
        setTimeout(() => {
            if (this.clientInfo.couponId) {
                this.useCoupon();
            }
        }, 600);
        wnlui.wxShare({
            title: '塔罗感情运',
            text: '我在万年历看【塔罗感情运】，分享给你，一起看吧！',
            imgUrl: 'https://www.51wnl.com/wnl_bless/img/gqyshareicon.jpg',
            imageUrl: 'https://www.51wnl.com/wnl_bless/img/gqyshareicon.jpg',
            url: location.origin + '/numberology/gqy/#/?posId=[posId]'
        });
    },
    methods: {
        hiddenPay() {
            this.$emit('hiddenPay');
        },
        payOrder() {
            const money = this.orderInfo.orderPrice - this.orderInfo.salePrice;
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
            var url = '//coco70.51wnl.com/numberologynew/gqy/#/result?userId=' + userId + '&deviceId=' + deviceId + '&pushToken=' + pushToken + '&pToken=' + pushToken + '&mac=' + mac + '&imei=' + imei + '&boundid=' + boundid + '&posId=' + posId + '&orderId=' + orderId;

            var url2 = '//coco70.51wnl.com/numberologynew/gqy/#/?userId=' + userId + '&deviceId=' + deviceId + '&pushToken=' + pushToken + '&pToken=' + pushToken + '&mac=' + mac + '&imei=' + imei + '&boundid=' + boundid + '&posId=' + posId;

            var uid = userId ? userId : deviceId
            if (device.weixin) {
                window.location.href = '//order.51wnl.com/pay_web/index_t.html?money=' + money + '&source=' + name + '&parterid=' + parterId + '&goodsid=' + goodsId + '&parteruserid=' + uid + '&posId=' + posId + '&data=' + orderId + '&openid=' + openId + '&returnUrl=' + encodeURIComponent(url) + '&failUrl=' + encodeURIComponent(url2) + '';
            } else {
                window.location.href = '//order.51wnl.com/pay_web/index_t.html?money=' + money + '&source=' + name + '&parterid=' + parterId + '&goodsid=' + goodsId + '&parteruserid=' + uid + '&posId=' + posId + '&data=' + orderId + '&returnUrl=' + encodeURIComponent(url) + '&failUrl=' + encodeURIComponent(url2) + '';
            }
        },
        useCoupon() {
            if (!this.orderInfo.sale) {
                this.checkCouponID().then((result) => {
                    console.log(result)
                    if (result.data.status === -1) {
                        this.msg = result.data.msg
                    } else {
                        var coupon = result.data.data.coupon;
                        this.msg = '';
                        this.$store.commit({
                            type: 'setSale',
                            couponPrice: coupon.price,
                            couponId: coupon.couponID,
                            payPrice: this.orderInfo.orderPrice - coupon.price
                        });
                    }
                })
            }
        },
        checkCouponID() {
            var data = {
                Goodsid: this.orderInfo.goodsId,
                Parterid: this.orderInfo.parterId,
                OrderId: this.orderInfo.orderId,
                CouponID: this.clientInfo.couponId,
            }
            var PrivateKey = 'WnlPay_Youloft_20161129_PrivateKey';
            data.sign = this.getSign(data, PrivateKey);
            return axios({
                method: 'POST',
                url: '//order.51wnl.com/api/coupon/CheckCouponID',
                data: data
            });
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
            keys.forEach(function (v, k, arr) {
                k < arr.length - 1 ? sign += v + '=' + data[v] + '&' :
                    sign += v + '=' + data[v]
            });
            return hex_md5(sign);
        },
        setPosition() {
            if (device.android) {
                var wHeight = window.innerHeight;
                window.addEventListener('resize', function () {
                    var hh = window.innerHeight;
                    if (wHeight > hh) {
                        this.marginTop = '6%';
                        document.querySelector('.pay-content').style.marginTop = '6%';
                    } else {
                        this.marginTop = '33%';
                        document.querySelector('.pay-content').style.marginTop = '33%';
                    }
                    wHeight = hh;
                });
            }
            if (device.ios) {
                var wHeight = window.innerHeight;
                window.addEventListener('resize', function () {
                    var hh = window.innerHeight;
                    if (wHeight > hh) {
                        this.marginTop = '44%';
                        document.querySelector('.pay-content').style.marginTop = '44%';
                        console.log(this.marginTop)
                    } else {
                        this.marginTop = '33%';
                        document.querySelector('.pay-content').style.marginTop = '33%';
                        console.log(this.marginTop)
                    }
                    wHeight = hh;
                });
            }
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
}

</script>
<style scoped>

</style>
