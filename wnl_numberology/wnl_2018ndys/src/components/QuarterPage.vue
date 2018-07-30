<template>
  <div class="quarter">
    <div class="layout">
      <div class="tips quarter-tips1">{{titleList[index-1]}}-大师叮嘱</div>
      <div class="section">
        <div class="section-inside">
          <div class="keywords">
            <div class="title">季度关键词</div>
            <div class="keywords-text">{{report.g5}}</div>
          </div>
          <div class="content">{{report.z5}}</div>
        </div>
      </div>
      <div class="tips quarter-tips1">{{titleList[index-1]}}-重点关注</div>
      <div class="section">
        <div class="section-inside">
          <div class="keywords">
            <div class="title">季度关键词</div>
            <div class="keywords-text">{{report.g6}}</div>
          </div>
          <div class="content">{{report.z6}}</div>
          <div class="content">{{report.z7}}</div>
        </div>
      </div>
      <div class="tips quarter-tips1">{{titleList[index-1]}}-感情运势</div>
      <div class="section">
        <div class="section-inside">
          <div class="keywords">
            <div class="title">季度关键词</div>
            <div class="keywords-text">{{report.g7}}</div>
          </div>
          <div class="content">{{report.z8}}</div>
          <div class="content">{{report.z9}}</div>
        </div>
      </div>
      <div class="tips quarter-tips1">{{titleList[index-1]}}-事业运势</div>
      <div class="section">
        <div class="section-inside">
          <div class="keywords">
            <div class="title">季度关键词</div>
            <div class="keywords-text">{{report.g8}}</div>
          </div>
          <div class="content">{{report.z10}}</div>
        </div>
      </div>
      <div class="tips quarter-tips1">{{titleList[index-1]}}-财富运势</div>
      <div class="section">
        <div class="section-inside">
          <div class="content">{{report.z11}}</div>
        </div>
      </div>
      <div class="ad-board">
        <div class="ad-board-case">
          <div class="ad-board-title">猜你喜欢</div>
          <div class="ad-board-swiper">
            <div class="ad-icon-box" v-for="(item,index) in ad" :key="index">
              <a class="ad-icon" :href="item.url">
                <img :src="item.img" alt="">
                <div class="ad-text">{{item.title}}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-tab">↓↓↓ 查看详细运势，点击下列标签 ↓↓↓</div>
    </div>
    <div class="window-wrap">
      <div class="window">
        <div class="month" v-for="(item,index) in 4" :key="index" :class="{'currentmonth2':index==activeIndex-1,'lasttwomonth':index>1}" @click="selectMonth(index)">{{(index+1)*3-2}}-{{(index+1)*3}}月</div>
      </div>
    </div>
  </div>
  <!-- :class="{active:index==activeIndex-1}"-->
  <!-- :class="{'currentmonth':index==currentMonth}"-->
</template>

<script>
import { report } from '../utils/data'
import { fixIphoneX, _$, getItem, isEmptyObject } from '../utils/utils'
import { getOrderDetail, getRelevantGoodsList } from '../api/api'

export default {
  data() {
    return {
      report: '',
      q1: {},
      q2: {},
      q3: {},
      q4: {},
      index: 0,
      activeIndex: 0,
      titleList: ['1-3月', '4-6月', '7-9月', '10-12月'],
      goodList: [],
      ad: []
    }
  },
  beforeRouteUpdate(to, from, next) {
    window.scrollTo(0, 0);
    var index = to.params.id;
    this.index = to.params.id;
    this.activeIndex = this.index;
    if (index == 1) {
      this.report = this.q1;
    } if (index == 2) {
      this.report = this.q2;
    } if (index == 3) {
      this.report = this.q3;
    } if (index == 4) {
      this.report = this.q4;
    }
    next()
  },
  mounted() {
    window.scrollTo(0, 0);
    document.querySelector('.wnl_history_btn').style.display = 'none';
    fixIphoneX(() => {
      _$('.window-wrap').style.paddingBottom = '34px';
      _$('.wrap-tab').style.paddingBottom = '34px';
    })
    getRelevantGoodsList().then(res => {
      console.log(1);
      console.log(res.data.data)
      this.ad = res.data.data
      if (res.data.data.length > 8) {
        this.ad = res.data.data.slice(0, 8)
      }

      // this.goodList = res.data.data.filter(v => v.type == 1);
    })
    _$('.wnl_history_btn').style.display = 'none';
    var index = this.$route.params.id;
    this.index = this.$route.params.id;
    this.activeIndex = this.index;

    if (isEmptyObject(report.data)) {
      report.data = getItem('wnl_2018ndys_data');
    }
    console.log(report)
    // 一季度
    this.q1.g5 = report.data.g5;
    this.q1.g6 = report.data.g6;
    this.q1.g7 = report.data.g7;
    this.q1.g8 = report.data.g8;

    this.q1.z5 = report.data.z5;
    this.q1.z6 = report.data.z6;
    this.q1.z7 = report.data.z7;
    this.q1.z8 = report.data.z8;
    this.q1.z9 = report.data.z9;
    this.q1.z10 = report.data.z10;
    this.q1.z11 = report.data.z11;
    // 二季度
    this.q2.g5 = report.data.g9;
    this.q2.g6 = report.data.g10;
    this.q2.g7 = report.data.g11;
    this.q2.g8 = report.data.g12;

    this.q2.z5 = report.data.z12;
    this.q2.z6 = report.data.z13;
    this.q2.z7 = report.data.z14;
    this.q2.z8 = report.data.z15;
    this.q2.z9 = report.data.z16;
    this.q2.z10 = report.data.z17;
    this.q2.z11 = report.data.z18;
    // 三季度
    this.q3.g5 = report.data.g13;
    this.q3.g6 = report.data.g14;
    this.q3.g7 = report.data.g15;
    this.q3.g8 = report.data.g16;

    this.q3.z5 = report.data.z19;
    this.q3.z6 = report.data.z20;
    this.q3.z7 = report.data.z21;
    this.q3.z8 = report.data.z22;
    this.q3.z9 = report.data.z23;
    this.q3.z10 = report.data.z24;
    this.q3.z11 = report.data.z25;
    // 四季度
    this.q4.g5 = report.data.g17;
    this.q4.g6 = report.data.g18;
    this.q4.g7 = report.data.g19;
    this.q4.g8 = report.data.g20;

    this.q4.z5 = report.data.z26;
    this.q4.z6 = report.data.z27;
    this.q4.z7 = report.data.z28;
    this.q4.z8 = report.data.z29;
    this.q4.z9 = report.data.z30;
    this.q4.z10 = report.data.z31;
    this.q4.z11 = report.data.z32;

    if (index == 1) {
      this.report = this.q1;
    } if (index == 2) {
      this.report = this.q2;
    } if (index == 3) {
      this.report = this.q3;
    } if (index == 4) {
      this.report = this.q4;
    }
    weChatShare.wxShare({
      title: '2018年年运',
      // text: '我在万年历看【2018年年运】，分享给你，一起看吧！',
      text: '2018已过半，回顾你的上半年，揭秘下半年的关键点。',
      imgUrl: location.origin + '/numberology/2018ndys/static/img/icon.jpg',
      imageUrl: location.origin + '/numberology/2018ndys/static/img/icon.jpg',
      url: location.origin + '/numberology/2018ndys/#/?posId=[posId]'
    });
  },
  methods: {
    selectMonth(index) {
      // console.log(index)
      this.$router.replace(`/quarter/${index + 1}`);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap-tab {
  font-size: 16px;
  color: rgba(104, 81, 74, 1);
  line-height: 16px;
  margin-top: 27px;
  margin-bottom: 37px;
  text-align: center;
  text-shadow: 0px 1px rgba(255, 255, 255, 0.7);
}
@media screen and (max-width: 321px) {
    .wrap-tab {
        font-size: 15px!important;
    }
}
</style>
