<template>
  <div class="result">
  <div class="result-title">
    <div class="change-sx-btn" @click="showSXBox=true">
       <div class="change-sx img img-change-sx"></div>
    </div>
    <img :src="getImg(`top2-${sxTitle}.jpg`)"/>
  </div>
  <div class="result-tssy">{{tssy}}</div>
  <div class="title-text title-1">
    <div class="title-icon img-title-icon-1"></div>
    <div class="text">本年运势走势</div>
    <div class="title-icon img-title-icon-2"></div>
  </div>
  <!-- 图表 -->
  <div class="chart" ref="myChart"></div>
  <!-- 跳转每月运势 -->
  <div class="result-btn result-btn-1" @click="toMYYS">
    <div class="text">{{ysButtonName}}</div>
    <div class="arrow img img-arrow"></div>
  </div>
  <div class="line line-1"></div>
  <!-- 月份 -->
  <div class="month">
    <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
      <template v-for="(item,index) in 12">
        <swiper-slide class="month-slide" :key="index">
          <div v-if="item-1===currentMonth" class="month-item active" @click="setMonth(index)">{{nStr1[item-1]}}月</div>
          <div v-else class="month-item" @click="setMonth(index)">{{nStr1[item-1]}}月</div>
        </swiper-slide>
      </template>
  </swiper>
  </div>
  <!-- 月运势 -->
  <div class="ys-month">
    <div class="img-corner c1"></div>
    <div class="img-corner c2"></div>
    <div class="img-corner c3"></div>
    <div class="img-corner c4"></div>
    <div class="title">{{monthData.lunarTitle}}</div>
    <div class="date">{{monthData.timeSpan}}</div>
    <!-- 保守之月 -->
    <div class="bszy" v-if="monthData.starScore<3">
      <img :src="getImg('bszy.png')"/>
    </div>
    <!-- 进取之月 -->
    <div class="bszy" v-if="monthData.starScore>3">
      <img :src="getImg('jqzy.png')"/>
    </div>
    <div class="level">
      <div class="text">运势指数：</div>
      <template v-for="item in 5">
        <div v-if="item<monthData.starScore" class="star img img-star" :key="item"></div>
        <div v-else class="star img img-star-bg" :key="item"></div>
      </template>
    </div>
    <div class="article" v-if="monthData.contentTxt!==''">{{monthData.contentTxt}}</div>
    <!-- 支付 -->
    <div class="shield" v-else>
      <img :src="getImg(`word_pic@3x.png`)"/>
      <div class="result-btn img-result-btn img result-btn-3" @click="createOrder">
        <div class="text">只需¥3.00，立即查看本月运势详情</div>
        <div class="arrow img img-arrow"></div>
      </div>
    </div>
  </div>
  <div class="line"></div>
  <!-- 运势概况 -->
  <div class="title-text title-2">
    <div class="title-icon img-title-icon-1"></div>
    <div class="text">{{zy.displayName}}</div>
    <div class="title-icon img-title-icon-2"></div>
  </div>
  <div class="sxys-brief">{{zy.contentTxt}}</div>
  <!-- 运势类别 -->
  <div class="section">
    <template v-for="(item,index) in ysTypes">
      <div v-if="index===ysTypesIndex"  class="section-item active" @click="ysTypesIndex=index" :key="index">
        <div>{{item.displayName}}</div>
        <div class="sign img-sign img"></div>
      </div>
      <div v-else class="section-item" @click="ysTypesIndex=index" :key="index">{{item.displayName}}</div>
    </template>
  </div>
  <!-- 类别详情 -->
  <div class="sxys-detail">
    <div class="img-corner img c1"></div>
    <div class="img-corner img c2"></div>
    <div class="img-corner img c3"></div>
    <div class="img-corner img c4"></div>
    <div class="level">
      <div class="text">运势指数：</div>
      <template v-for="(item,index) in 5">
        <div v-if="index<ysType.starScore" class="star img img-star" :key="item"></div>
        <div v-else class="star img img-star-bg" :key="item"></div>
      </template>
    </div>
    <div class="sxys-text">{{ysType.contentTxt}}</div>
    <!-- 大师运势 -->
    <div class="result-btn result-btn-2" @click="toBZYS">
      <div class="text">{{ysType.csButtonName}}</div>
      <div class="arrow img img-arrow"></div>
    </div>
  </div>
  <div class="line"></div>
  <div class="title-text title-3">
    <div class="title-icon img-title-icon-1"></div>
    <div class="text">{{zy.displayName}}</div>
    <div class="title-icon img-title-icon-2"></div>
  </div>
  <!-- 吉运 -->
  <div class="sxys-tips">
    <div class="title">
      <div class="text">吉运把握</div>
      <div class="great btn" @click="playGreatAnimation">
        <div class="great-text-1">点赞集好运</div>
        <div class="img-great-ani great-icon" :style="{'background-position-x':greatPos+'px'}"></div>
        <div class="great-text-2">999+</div>
      </div>
    </div>
    <div class="jx">{{ysxp1.displayName}}</div>
    <div class="content">{{ysxp1.contentTxt}}</div>
  </div>
  <!-- 凶运 -->
  <div class="sxys-tips">
    <div class="title">
      <div class="text">凶运提示</div>
      <div class="great btn" @click="playUnGreatAnimation">
        <div class="great-text-1">凶运快走开</div>
        <div class="img-ungreat-ani great-icon" :style="{'background-position-x':ungreatPos+'px'}"></div>
        <div class="great-text-2">999+</div>
      </div>
    </div>
    <div class="jx">{{ysxp2.displayName}}</div>
    <div class="content">{{ysxp2.contentTxt}}</div>
  </div>
  <!-- 切换生肖 -->
  <div class="ys-box"></div>
  <div class="choose-sx" v-if="showSXBox">
    <div class="choose-sx-mask" @click="showSXBox=false"></div>
    <div class="choose-sx-box">
      <div class="choose-sx-title">切换生肖</div>
      <div class="sx-box-inside">
        <div class="sx-item" v-for="(item,index) in sxList" :key="index" @click="changeSX(item.ename)">
          <img :src="getImg(`${item.ename}.png`)"/>
          <div class="checked img-sx-checked img" v-if="index===sxIndex"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Vue from "vue";
import api from "../api";
import { mapState } from "vuex";
import { sxList, nStr1 } from "../utils/dataList";
import calendar from '../utils/calendar';
import setOption from '../utils/initChart';
import { getSxysData, stringify } from '../utils/util';
import device from '../utils/device';
import PageLoader from '../plugin/pageloader';
import types from '../store/types';

export default Vue.extend({
  data() {
    return {
      swiperOption: {
        freeMode: true,
        slidesPerView: 'auto',
        observer: true
      },
      sxysData: Object,
      zy: Object,
      monthData: Object,
      sxList: sxList,
      ysTypes: [],
      ysType: Object,
      ysxp1: [],
      ysxp2: [],
      tssy: "",
      nStr1: nStr1,
      ysButtonName: "根据命主八字，详解每月运势",
      sxTitle: "shu",
      sxName: "鼠",
      flag: true,
      currentMonth: 0,
      ysTypesIndex: 0,
      sxIndex: 0,
      showSXBox: false,
      isShowDialog: false,
      ispay: true,
      greatPos: 0,
      ungreatPos: 0,
      chartClass: "",
      loading: Object
    };
  },
  computed: {
    ...mapState(["userInfo", "clientInfo"]),
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    myChart() {
      return this.$refs.myChart
    }
  },
  beforeRouteUpdate(to, from, next) {
    let index = to.params.month;
    this.currentMonth = parseInt(index);
    this.setMonthData(index);
    if (from.params.sx !== to.params.sx) {
      let sx = to.params.sx;
      this.getOrderDetail(sx);
    }
    let protocol = window.location.protocol;
    let shareUrl = `${protocol}//mobile.51wnl.com/numberology/sxys/#/result/${to.params.sx}/${this.currentMonth}`
    this.$store.commit(types.SET_SHARE, {
      url: shareUrl
    });
    next()
  },
  mounted() {
    this.loading = new PageLoader();
    this.sxList = sxList;
    let sxName = this.$route.params.sx;
    let month = this.$route.params.month;
    this.getOrderDetail(sxName);
    this.currentMonth = parseInt(month);
    if (month > 2) {
      this.swiper.slideTo(month - 2);
    }
    let protocol = window.location.protocol;
    let shareUrl = `${protocol}//mobile.51wnl.com/numberology/sxys/#/result/${sxName}/${this.currentMonth}`
    this.$store.commit(types.SET_SHARE, {
      url: shareUrl
    });
  },
  methods: {
    getOrderDetail(sxName) {
      this.loading.show();
      this.sxTitle = sxName;
      let cname = sxList.filter(v => v.ename === sxName)[0].name;
      this.sxName = cname;
      setTimeout(() => {
        api.getOrderDetail(this.userInfo, cname).then(res => {
          // console.log(res.data.data);
          this.sxysData = getSxysData(res.data.data);
          this.setMonthData();
          this.initChart();
          this.loading.hide();
          document.querySelector('.wnl_history_btn').classList.add('hidden');
        });
      }, 200);
    },
    setMonthData() {
      this.tssy = this.sxysData.monthData[this.currentMonth].tssy;
      this.monthData = this.sxysData.monthData[this.currentMonth];
      this.ysType = this.sxysData.ysTypes[this.ysTypesIndex];
      this.ysButtonName = this.sxysData.monthData[this.currentMonth].ysButtonName;
      this.zy = this.sxysData.zy[0];
      this.ysxp1 = this.sxysData.ysxp[0];
      this.ysxp2 = this.sxysData.ysxp[1];
    },
    setMonth(index) {
      this.$router.replace(`/result/${this.sxTitle}/${index}`);
    },
    getImg(name) {
      return require(`../assets/img/${name}`);
    },
    playGreatAnimation() {
      if (this.greatPos > 0) {
        return false;
      }
      let step = 30;
      let animation = setInterval(() => {
        let greatPos = parseInt(this.greatPos);
        if (greatPos > -360) {
          this.greatPos = greatPos -= step
        } else {
          this.greatPos = 0;
          clearInterval(animation);
        }
      }, 80)
    },
    playUnGreatAnimation() {
      if (this.ungreatPos > 0) {
        return false;
      }
      let step = 30;
      let animation = setInterval(() => {
        let ungreatPos = parseInt(this.ungreatPos);
        if (ungreatPos > -360) {
          this.ungreatPos = ungreatPos -= step;
        } else {
          this.ungreatPos = 0;
          clearInterval(animation);
        }
      }, 80)
    },
    changeSX(name) {
      // this.getOrderDetail(name);
      this.showSXBox = false;
      this.$router.replace(`/result/${name}/${this.currentMonth}`);
    },
    initChart() {
      let myChart = echarts.init(this.myChart);
      let sxIndex = sxList.findIndex((v, k) => v.ename === this.sxTitle);
      // 指定图表的配置项和数据
      let option = setOption(this.sxysData.scores, sxIndex);
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    createOrder() {
      this.loading.show();
      // console.log(this.clientInfo)
      const year = new Date().getFullYear();
      const params = {
        sxName: this.sxName,
        LockMonth: year + '-' + (this.currentMonth + 1)
      }
      api.createOrder(params).then(res => {
        let data = res.data.data.data;
        console.log('data', data)
        this.payOrder(data);
      });
    },
    payOrder(orderInfo) {
      this.loading.hide();
      var urlParams = {
        userId: this.userInfo.userId,
        deviceId: this.userInfo.deviceId,
        pushToken: this.clientInfo.pushToken,
        pToken: this.clientInfo.pushToken,
        mac: this.clientInfo.mac,
        imei: this.clientInfo.imei,
        boundid: this.clientInfo.boundid,
        posId: this.clientInfo.posId,
        orderId: orderInfo.orderId
      };
      var openId = "";
      if (device.weixin) {
        openId = JSON.parse(window.localStorage.getItem("wnl_tlp_local")).openid;
      }
      var url = window.location.href.split('?')[0] + '?' + stringify(urlParams);

      delete urlParams.orderId;

      var url2 = window.location.href.split('?')[0] + '?' + stringify(urlParams);

      var uid = this.userInfo.userId ? this.userInfo.userId : this.userInfo.deviceId;
      var params = {
        money: orderInfo.price,
        source: '生肖运势',
        parterid: 'wnl_mall_dongyiqi',
        goodsid: orderInfo.goodsID,
        parteruserid: uid,
        posId: this.clientInfo.posId,
        data: orderInfo.detailOrderID,
        returnUrl: encodeURIComponent(url),
        failUrl: encodeURIComponent(url2),
        couponId: "",
        imei: this.clientInfo.imei
      };
      if (device.weixin) {
        params.openid = openId;
        let protocol = window.location.protocol;
        let returnUrl = `${protocol}//mobile.51wnl.com/numberology/sxys/#/result/${this.sxTitle}/${this.currentMonth}`
        params.returnUrl = encodeURIComponent(returnUrl);
      }
      window.location.href = "//order.51wnl.com/pay_web/index_t.html?" + stringify(params);
    },
    toMYYS() {
      window.location.href = 'https://www.51wnl.com/linksite/DoLink.aspx?key=6033&loc=10&MAC=[MAC]&IDFA=[IDFA]&OPENUDID=[OPENUDID]&IMEI=[IMEI]&WNLUSERID=[WNLUSERID]';
    },
    toBZYS() {
      window.location.href = 'https://www.51wnl.com/linksite/DoLink.aspx?key=6032&loc=10&MAC=[MAC]&IDFA=[IDFA]&OPENUDID=[OPENUDID]&IMEI=[IMEI]&WNLUSERID=[WNLUSERID]';
    }
  }
});
</script>
<style lang="less" scoped>
@import "../css/result.less";
</style>
