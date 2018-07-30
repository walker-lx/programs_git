<template>
  <div class="result order">
    <div class="layout">
      <div class="tips">您的专属2018年运</div>
      <div class="info">
        <div class="info-case">
          <!--<div class="case-pattern case-topleft"></div>
          <div class="case-pattern case-topright"></div>
          <div class="case-pattern case-bottomleft"></div>
          <div class="case-pattern case-bottomright"></div>-->
          <div class="item clearfix text-points"
               v-for="(value,key) in userInfo"
               :key="key">
            <div class="item-name">{{getChineseName(key)}}</div>
            <div class="item-value">{{value}}</div>
          </div>
        </div>
      </div>
      <!-- list -->
      <div class="list-wrap">
        <div class="tips">解锁后您将获得</div>
        <div class="list clearfix">
          <div class="item"
               v-for="(item,index) in  text"
               :key="index">
            <div class="text">{{item.text1}}</div>
            <div class="text">{{item.text2}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <div class="btn"
           @click="payOrder">立即解锁</div>
    </div>
  </div>

</template>

<script>
import { redPackageText, getSC } from '../utils/data'
import { getItem, stringify, fixIphoneX, _$ } from '../utils/utils';
import orderInfo from '../utils/order'
import { getOrderDetail } from '../api/api'
import device from '../utils/device'
import getQueryStringArgs from '../utils/parseurl'

export default {
  data() {
    return {
      orderId: '',
      userInfo: {
        name: '',
        birthday: '',
        birthtime: '',
        birthplace: ''
      },
      cName: {
        name: '您的姓名',
        birthday: '出生日期',
        birthtime: '出生时间',
        birthplace: '出生地点'
      },
      text: redPackageText
    }
  },
  created() {
    window.scrollTo(0, 0);
  },
  mounted() {
     document.querySelector('.wnl_history_btn').style.display = 'none';
    fixIphoneX(() => {
      _$('.btn-wrap').style.paddingBottom = '34px';
      _$('.order .layout').style.paddingBottom = '98px';
      _$('.order .btn').style.margin = '0 15px';
    })
    _$('.wnl_history_btn').style.display = 'none';
    var that = this;
    this.orderId = this.$route.query.orderId;
    // console.log(this.orderId)
    getOrderDetail({
      userId: orderInfo.userId,
      deviceId: orderInfo.deviceId,
      orderId: this.orderId
    }).then(res => {
      console.log(res)
      var data = res.data.data;
      // console.log(data.birthTimeHour.split(':')[1])
      if (data.birthTimeHour.split(':')[1] > 0) {
        data.birthTimeHour = '不清楚';
        that.userInfo.birthtime = data.birthTimeHour;
      } else {
        that.userInfo.birthtime = data.birthTimeHour + '（' + getSC(data.birthTimeHour) + '）';
      }
      that.userInfo.name = data.name;
      that.userInfo.birthday = data.birthday;
      that.userInfo.birthplace = data.birthdayCity;
    })
    weChatShare.wxShare({
       title: '2018年年运',
       text: '2018已过半，回顾你的上半年，揭秘下半年的关键点。',
       imgUrl: location.origin + '/numberology/2018ndys/static/img/icon.jpg',
       imageUrl: location.origin + '/numberology/2018ndys/static/img/icon.jpg',
       url: location.origin + '/numberology/2018ndys/#/?posId=[posId]'
    });
  },
  methods: {
    getChineseName(key) {
      return this.cName[key]
    },
    selectMonth(index) {
      console.log(index)
    },
    payOrder() {
      var urlParams = {
        userId: orderInfo.userId,
        deviceId: orderInfo.deviceId,
        pushToken: orderInfo.pushToken,
        pToken: orderInfo.pushToken,
        mac: orderInfo.mac,
        imei: orderInfo.imei,
        boundid: orderInfo.boundid,
        posId: orderInfo.posId,
        orderId: this.orderId
      }
      var openId = '';
      if (device.weixin) {
        openId = JSON.parse(window.localStorage.getItem('wnl_tlp_local')).openid;
      }
      var url = '//mobile.51wnl.com/numberology/2018ndys/#/result?' + stringify(urlParams);

      delete urlParams.orderId

      var url2 = '//mobile.51wnl.com/numberology/2018ndys/#/?' + stringify(urlParams);

      var uid = orderInfo.userId ? orderInfo.userId : orderInfo.deviceId
       if (orderInfo.posId == "" || orderInfo.posId == "[posId]") {
        orderInfo.posId = 'defaultyearluck';
      }
      var params = {
        money: orderInfo.TotalFee,
        source: orderInfo.ordername,
        parterid: orderInfo.parterid,
        goodsid: orderInfo.goodsid,
        parteruserid: uid,
        posId: orderInfo.posId,
        data: this.orderId,
        returnUrl: encodeURIComponent(url),
        failUrl: encodeURIComponent(url2),
        couponId: orderInfo.couponId || '',
        imei: orderInfo.imei
      }
      if (device.weixin) {
        params.openid = openId
      }
      window.location.href = '//order.51wnl.com/pay_web/index_t.html?' + stringify(params);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#canvasDiv{
  width: 100%;
  overflow: hidden;
}
</style>
