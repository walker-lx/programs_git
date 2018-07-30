<template>
    <div class="select">
        <div class="select-title"></div>
        <div class="select-card-list clearfix"
             :class="{active:active}">
            <div class="select-col-card"
                 v-for="col in cardList"
                 :key="col">
                <div class="select-card"
                     v-for="(row,index) in col"
                     :key="index"
                     :class="{active:row.select}"
                     @click="selectCard(row)">
                    <div class="select-card-p"></div>
                    <div class="select-card-n"
                         :style="{backgroundImage: 'url(' + row.imgsrc + ')'}">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import device from '../util/device.js'
import getQueryStringArgs from '../util/parseurl.js'
import Velocity from 'velocity-animate'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            active: false,
            clientType: device.ios ? 'Youloft_IOS' : 'Youloft_Android',
            channel: device.ios ? 'wnl_ios' : 'wnl_android',
            cardList: [],
            urlParams: {},
            orderId: '',
            isClick: false,
        }
    },
    computed: mapState({
        clientInfo: state => state.clientInfo
    }),
    created() {
        var url = window.location.href;
        let baseArray = [3, 4, 4, 3];
        let array = [];

        baseArray.forEach((v, k) => this.cardList[k] = new Array(v));
        while (array.length < 14) {
            let number = (Math.random() * 13).toFixed();
            if (array.indexOf(number) < 0) {
                array.push(number);
            }
        }
        let length = array.length - 1;
        baseArray.forEach((v, k) => {
            for (let i = 0; i < baseArray[k]; i++) {
                this.cardList[k][i] = new Object();
                this.cardList[k][i].num = array[length];
                this.cardList[k][i].select = false;
                this.cardList[k][i].imgsrc = '//coco70.51wnl.com/numberologynew/gqy/cards/c' + array[length] + '.png';
                length--;
            }
        });
    },
    mounted() {
        setTimeout(() => {
            this.active = true;
        }, 200);
        wnlui.wxShare({
            title: '塔罗感情运',
            text: '我在万年历看【塔罗感情运】，分享给你，一起看吧！',
            imgUrl: 'https://www.51wnl.com/wnl_bless/img/gqyshareicon.jpg',
            imageUrl: 'https://www.51wnl.com/wnl_bless/img/gqyshareicon.jpg',
            url: location.origin + '/numberology/gqy/#/?posId=[posId]'
        });
    },
    methods: {
        selectCard(row) {
            if (!this.isClick) {
                this.isClick = true;
                this.$set(this.cardList, 0, this.cardList[0]);
                row.select = true;
                row.num = row.num > 9 ? row.num : '0' + row.num;
                const num1 = (Math.random() * 1).toFixed();
                this.$store.commit('setCardNumber', {
                    num1: row.num,
                    num2: num1
                });
                let cards = document.querySelectorAll('.select-card');
                Velocity(cards, { opacity: 0 }, { duration: 1000 });
                setTimeout(() => {
                    let card = document.querySelectorAll('.select-card.active');
                    Velocity(card, {
                        scale: 1.3,
                    }, { duration: 1000 });
                    Velocity(card, { rotateY: -180, }, {
                        duration: 2000,
                        complete: () => {
                            var list = document.querySelector('.select-card-list');
                            Velocity(list, {
                                opacity: 0,
                            }, { duration: 2000 });
                            this.createOrder();
                        }
                    });
                }, 50);
            }
        },
        createOrder() {
            let userInfo = this.$store.state.user;
            axios({
                method: 'POST',
                url: '//coco70.51wnl.com/numberologynew/TarotLove/CreateOrder',
                data: {
                    Name: userInfo.name,
                    BirthDay: userInfo.birthday,
                    CardCode: userInfo.cardCode,
                    ClientType: this.clientType,
                    channel: this.channel,
                    PToken: this.clientInfo.pToken,
                    Token: this.clientInfo.pushToken,
                    UserID: this.clientInfo.userId,
                    DeviceID: this.clientInfo.deviceId,
                    Idfa: this.clientInfo.posId,
                    DeviceMac: this.clientInfo.mac,
                    ImeiNumber: this.clientInfo.imei,
                    boundid: this.clientInfo.boundid,
                    orderName: '塔罗感情运',
                    goodsId: this.$store.state.orderInfo.goodsId,
                    appVersion: device.appVersion,
                    sysVersion: device.sysVersion
                },
            }).then((result) => {
                this.$vux.loading.hide();
                if (result.data.msg === '下单成功') {
                    const orderId = result.data.data.orderID;
                    this.orderId = result.data.data.orderID;
                    this.$store.commit('createOrder', orderId);
                    this.$store.commit('clearUserInfo');
                    this.setParams();
                    this.$router.push({ path: 'result', query: this.urlParams });
                }
            })
        },
        setParams() {
            this.urlParams = {
                userId: this.clientInfo.userId,
                deviceId: this.clientInfo.deviceId,
                pushToken: this.pushToken,
                pToken: this.clientInfo.pToken,
                mac: this.clientInfo.mac,
                imei: this.clientInfo.imei,
                boundid: this.clientInfo.boundid,
                posId: this.clientInfo.posId,
                orderId: this.orderId,
                couponId: this.clientInfo.couponId
            }
        }
    }
}

</script>
<style scoped>

</style>
