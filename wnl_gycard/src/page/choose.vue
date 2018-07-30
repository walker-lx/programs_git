<template>
    <div class="choosePage">
      <div class="topbanner2">
      </div>
      <div class="qst_title">
        {{questionText.split("：")[0]}}<span></span>{{questionText.split("：")[1]}}
      </div>
      <div class="cardWrap">
        <ul>
          <li v-for="i in 10" class="card_item" :class="{popup:i==cardIndex}" @click="selectCard(i)">
            <img src="../assets/img/card.jpg"/>
          </li>
        </ul>
      </div>
      <div v-if="selected" class="btnWrap">
        <button class="confirmBtn" @click="confirm">确认选择此牌</button>
      </div>
      <div class="select_tip" v-else>
        <span class="shade leftShade"></span>点击牌面选牌<span class="shade rightShade"></span>
      </div>
    </div>
</template>

<script>
import 'babel-polyfill';
import { toast, pageloading, wnlShare, wxShare } from '../plugin/wnlui';
import util from "../plugin/util";
import getQueryStringArgs from '../plugin/parseurl'
export default {
  name: 'Choose',
  data () {
    return {
      cardIndex: 0,
      selected: false,
      urlParams: {},
      cardId: 2
    }
  },
  computed: {
      questionText() {
          return this.$store.state.cardText?this.$store.state.cardText:localStorage.getItem('gycard_cardText');
      },
      clientInfo() {
          return JSON.parse(localStorage.getItem('clientInfo'));
      }
  },
  mounted: function() {
      document.body.addEventListener('touchstart',function(){},false);
      var url = window.location.href;
      this.urlParams = getQueryStringArgs(decodeURIComponent(url));

      util.addClass(document.querySelector("#app"), "absolute_page");
      document.querySelector('.wnl_history_btn').style.display = 'none';
      window.wnlShare.setShareData({
        title: '一张能帮你解决98%问题的观音卡',
        text: '》》》点击立刻占卜',
        image: location.origin + '/numberology/gycard/static/img/share.jpg',
        url: location.origin + '/numberology/gycard/index.html?posId=' + this.clientInfo.posId
      });
      wxShare({
          title: '一张能帮你解决98%问题的观音卡',
          text: '》》》点击立刻占卜',
          imgUrl: location.origin + '/numberology/gycard/static/img/share.jpg',
          imageUrl: location.origin + '/numberology/gycard/static/img/share.jpg',
          url: location.origin + '/numberology/gycard/index.html?posId=' + this.clientInfo.posId,
          callback: function(){
              _czc.push(['_trackEvent', 'Shengyucard_shared', 'share']);
          }
      });

      let wnlsharemask = document.querySelector('.wnlshare-mask');
      if (wnlsharemask) {
        wnlsharemask.addEventListener('touchmove', function(event) {
          event.preventDefault();
        },false);
      }
      let wnlsharewrap = document.querySelector('.wnlshare-wrap');
      if (wnlsharewrap) {
        wnlsharewrap.addEventListener('touchmove', function(event) {
          event.preventDefault();
        },false);
      }
  },
  methods: {
    setParams() {
        this.urlParams = {
            userId: this.clientInfo.userId,
            deviceId: this.clientInfo.deviceId,
            pushToken: this.pushToken,
            pToken: this.clientInfo.pToken,
            mac: this.clientInfo.mac,
            imei: this.clientInfo.imei,
            boundId: this.clientInfo.boundId,
            posId: this.clientInfo.posId
        };
        if (this.clientInfo.couponId) {
            this.urlParams.couponId = this.clientInfo.couponId;
        }
    },
    selectCard(i) {
      this.selected = true;
      if (this.cardIndex == i) {
        let loading = new pageloading();
        loading.show();
        let cardId = Math.floor(Math.random()*44);
        localStorage.setItem('gycard_cardId', cardId);
        this.$store.commit('setCardId', cardId);
        this.cardId = cardId;
        console.log(cardId);
        let clientType = util.isIOS?'Youloft_IOS':'Youloft_Android';
        let channel = util.isIOS?'iOS':'Android';
        let postData = {
           "UserID": this.urlParams.userId,
           "QuestionID": this.urlParams.questionId,
           "DeviceID": this.urlParams.deviceId,
           "PosID": this.urlParams.posId!=='undefined'?this.urlParams.posId:'default',
           "OrderName": '观音占卜卡',
           "ParterID": "wnlzx",
           "ClientType": clientType,
           "Channel": channel,
           "APPVersion": "1.0",
           "GoodsID": "8A187E8F83E644E7B706CA5C18B1BB41",
           "CardID": cardId,
           "HomePageUrl": location.origin + '/numberology/gycard/index.html',
           "DetailsUrl": location.origin + '/numberology/gycard/index.html#/result?orderId=[ORDERID]&questionId='+this.urlParams.questionId+'&cardId='+cardId+'&userId='+this.urlParams.userId+'&deviceId='+this.urlParams.deviceId,
           "UnPayUrl": location.origin + '/numberology/gycard/index.html#/result?orderId=[ORDERID]&questionId='+this.urlParams.questionId+'&cardId='+cardId+'&userId='+this.urlParams.userId+'&deviceId='+this.urlParams.deviceId
        };
        this.$http.post('//coco70.51wnl.com/numberologynew/TarotGod/CreateOrder', postData).then(response => {
            // console.log(response, '下单');
            loading.hide();
            const orderInfo = response.body.data;
            localStorage.setItem('gycard_orderInfo', JSON.stringify(orderInfo.data));
            this.$store.commit('setOrderInfo', orderInfo.data);
            // this.setParams();
            this.urlParams.cardId = cardId;
            // this.urlParams.orderId = orderInfo.orderID;
            this.urlParams.orderId = orderInfo.data.orderID;
            // console.log(this.urlParams, orderInfo.data.orderID, 'params');
            // debugger;
            this.$router.push({ path: '/result', query: this.urlParams });
            // console.log(state.orderInfo);
        });
      }else {
        this.cardIndex = i;
      }
    },
    confirm() {
      let loading = new pageloading();
      loading.show();
      // let cardId = Math.floor(Math.random()*44);
      // localStorage.setItem('gycard_cardId', cardId);
      // this.$store.commit('setCardId', cardId);
      let clientType = util.isIOS?'Youloft_IOS':'Youloft_Android';
      let channel = util.isIOS?'iOS':'Android';
      let postData = {
         "UserID": this.urlParams.userId,
         "QuestionID": this.urlParams.questionId,
         "DeviceID": this.urlParams.deviceId,
         "PosID": this.urlParams.posId!=='undefined'?this.urlParams.posId:'default',
         "OrderName": '观音占卜卡',
         "ParterID": "wnlzx",
         "ClientType": clientType,
         "Channel": channel,
         "APPVersion": "1.0",
         "GoodsID": "8A187E8F83E644E7B706CA5C18B1BB41",
         "CardID": this.cardId,
         "HomePageUrl": location.origin + '/numberology/gycard/index.html',
         "DetailsUrl": location.origin + '/numberology/gycard/index.html#/result?orderId=[ORDERID]&questionId='+this.urlParams.questionId+'&cardId='+this.cardId+'&userId='+this.urlParams.userId+'&deviceId='+this.urlParams.deviceId,
         "UnPayUrl": location.origin + '/numberology/gycard/index.html#/result?orderId=[ORDERID]&questionId='+this.urlParams.questionId+'&cardId='+this.cardId+'&userId='+this.urlParams.userId+'&deviceId='+this.urlParams.deviceId
      };
      this.$http.post('//coco70.51wnl.com/numberologynew/TarotGod/CreateOrder', postData).then(response => {
          console.log(response);
          loading.hide();
          const orderInfo = response.body.data;
          localStorage.setItem('gycard_orderInfo', JSON.stringify(orderInfo.data));
          this.$store.commit('setOrderInfo', orderInfo.data);
          // this.setParams();
          this.urlParams.cardId = this.cardId;
          // this.urlParams.orderId = orderInfo.orderID;
          this.urlParams.orderId = orderInfo.data.orderID;
          this.$router.push({ path: '/result', query: this.urlParams });
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  width: 100%;
  height: 100%;
}
.wnlshare-platform {
  min-height: 100%;
}
</style>
