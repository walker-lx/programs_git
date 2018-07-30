<template>
  <div class="result">
    <div class="layout">
      <div class="tips">您的专属2018年运</div>
      <div class="info">
        <div class="info-case">
          <div class="item clearfix text-points" v-for="(value,key) in userInfo" :key="key">
            <div class="item-name">{{getChineseName(key)}}</div>
            <div class="item-value">{{value}}</div>
          </div>
        </div>
      </div>
      <!-- list -->
      <div class="list-wrap" v-if="isPay">
        <div class="tips">您的专属2018年运</div>
        <div class="list clearfix">
          <div class="item" v-for="(item,index) in  text" :key="index">
            <div class="text">{{item.text1}}</div>
            <div class="text">{{item.text2}}</div>
          </div>
        </div>
      </div>
      <div class="result-report">
        <div class="keywords section">
          <div class="section-inside">
            <div class="keywords-title">
              <div class="keywords-title-line">
                <span class="keywords-text">年度关键词</span>
                <span class="keywords-text">{{report.g1}}</span>
              </div>
            </div>
            <div class="content">{{report.z1}}</div>
          </div>
        </div>
        <!-- 事业 -->
        <div class="career section">
          <div class="section-inside">
            <div class="charts-title">
              <div class="star-list">
                <span class="charts-title-text">事业运</span>
                <i class="star" :class="{active:index<score1}" v-for="(item,index) in 5" :key="index"></i>
              </div>
            </div>
            <div class="canvasDiv-wrap">
              <div id="canvasDiv1"></div>
              <div class="canvas-icon canvas-icon1">
                <div class="icon-circle icon-circle1"></div>
              </div>
              <div class="month-icon">月份</div>
            </div>
            <div class="best-month">
              <div class="best-month-text">最佳事业月份</div>
              <div class="best-month-list">
                <span v-for="(item,index) in bestMonth1" :key="index">{{item}}</span>
              </div>
            </div>
            <div class="charts-title2">
              <div class="text">运势预测</div>
            </div>
            <div class="charts-content">{{report.z2}}</div>
          </div>
        </div>
        <!-- 感情 -->
        <div class="career section">
          <div class="section-inside">
            <div class="charts-title">
              <div class="star-list love">
                <span class="charts-title-text love">感情运</span>
                <i class="star" :class="{active:index<score2}" v-for="(item,index) in 5" :key="index"></i>
              </div>
            </div>
            <div class="canvasDiv-wrap">
              <div id="canvasDiv2"></div>
              <div class="canvas-icon canvas-icon2">
                <div class="icon-circle icon-circle2"></div>
              </div>
              <div class="month-icon love">月份</div>
            </div>
            <div class="best-month">
              <div class="best-month-text love">最佳感情月份</div>
              <div class="best-month-list">
                <span class="love" v-for="(item,index) in bestMonth2" :key="index">{{item}}</span>
              </div>
            </div>
            <div class="charts-title2">
              <div class="text love">运势预测</div>
            </div>
            <div class="charts-content">{{report.z3}}</div>
          </div>
        </div>
        <!-- 财富 -->
        <div class="career section">
          <div class="section-inside">
            <div class="charts-title">
              <div class="star-list money">
                <span class="charts-title-text money">财富运</span>
                <i class="star" :class="{active:index<score3}" v-for="(item,index) in 5" :key="index"></i>
              </div>
            </div>
            <div class="canvasDiv-wrap">
              <div id="canvasDiv3"></div>
              <div class="canvas-icon canvas-icon3">
                <div class="icon-circle icon-circle3"></div>
              </div>
              <div class="month-icon money">月份</div>
            </div>
            <div class="best-month">
              <div class="best-month-text money">最佳财富月份</div>
              <div class="best-month-list">
                <span class="money" v-for="(item,index) in bestMonth3" :key="index">{{item}}</span>
              </div>
            </div>
            <div class="charts-title2">
              <div class="text money">运势预测</div>
            </div>
            <div class="charts-content">{{report.z4}}</div>
          </div>
        </div>
      </div>
      <div class="wrap-tab" style="margin-bottom:0">↓↓↓ 查看详细运势，点击下列标签 ↓↓↓</div>
    </div>
    <div class="window-wrap">
      <div class="window">
        <div class="month" v-for="(item,index) in 4" :key="index" :class="{'currentmonth':index==currentMonth,'lasttwomonth':index>1}" @click="selectMonth(index)">
          {{(index+1)*3-2}}-{{(index+1)*3}}月</div>
      </div>
    </div>
  </div>
</template>
<script>
import { redPackageText, report, getSC } from '../utils/data'
import initCharts from '../utils/drawChart'
import { getItem, setItem, fixIphoneX, _$ } from '../utils/utils';
import { getOrderDetail, getRelevantGoodsList } from '../api/api'
import orderInfo from '../utils/order'
import device from '../utils/device'
import getQueryStringArgs from '../utils/parseurl'
import { Slider, SliderItem } from 'vue-easy-slider'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

var list = [];

export default {
  data() {
    return {
      swiperOption: {
        autoplay: 3000,
        grabCursor: true,
        setWrapperSize: true,
        paginationClickable: false,
        mousewheelControl: true,
        observeParents: true,
        autoplayDisableOnInteraction: false,
        // loop: true,
        onTransitionStart(e) {
          var index = e.activeIndex;
          _$('.ad-board-title').innerText = list[index].title;
        }
      },
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
      list: [],
      goodName: '',
      report: '',
      keyWords: [],
      isPay: false,
      text: redPackageText,
      bestMonth1: [],
      bestMonth2: [],
      bestMonth3: [],
      score1: 0,
      score2: 1,
      score3: 3,
      currentMonth: 2,
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    var month=new Date().getMonth()+1;
    if (month >= 7 && month <= 9) {
       this.currentMonth = 2;
    }
    else if (month >= 10 && month <= 12) {
      this.currentMonth = 3;
    }
    console.log(this.currentMonth)
    document.querySelector('.wnl_history_btn').style.display = 'none';
    fixIphoneX(() => {
      document.querySelector('.window-wrap').style.paddingBottom = '34px';
      document.querySelector('.result .layout').style.paddingBottom = '94px';
    })
    this.windowScrollObserver();
    window.scrollTo(0, 0);
    var that = this;
    this.orderId = this.$route.query.orderId;
    // console.log(this.orderId)
    var pageloading = new wnlui.pageloading();
    pageloading.show();
    getRelevantGoodsList().then(res => {
      console.log("==============")
      console.log(res)
      this.list = res.data.data.filter(v => v.type == 2);
      list = this.list;
      this.goodName = this.list[0] ? this.list[0].title : '';
    })
    getOrderDetail({ userId: orderInfo.userId, deviceId: orderInfo.deviceId, orderId: this.orderId }).then(res => {
      pageloading.hide();
      console.log(res)
      var data = res.data.data;
      if (data.birthTimeHour.split(':')[1] > 0) {
        data.birthTimeHour = '不清楚';
        that.userInfo.birthtime = data.birthTimeHour;
      } else {
        // console.log(data.birthTimeHour);
        that.userInfo.birthtime = data.birthTimeHour + '（' + getSC(data.birthTimeHour) + '）';
      }
      that.userInfo.name = data.name;
      that.userInfo.birthday = data.birthday;
      that.userInfo.birthplace = data.birthdayCity;
      that.report = data.contentData;
      report.data = data.contentData;
      setItem('wnl_2018ndys_data', report.data);
      that.bestMonth1 = that.report.g2.split('、');
      that.bestMonth2 = that.report.g3.split('、');
      that.bestMonth3 = that.report.g4.split('、');
      that.score1 = parseInt(that.report.f1);
      that.score2 = parseInt(that.report.f2);
      that.score3 = parseInt(that.report.f3);
      initCharts({ id: 'canvasDiv1', score: that.report.q1, color: '#8178D6', icon: '.canvas-icon1' });
      initCharts({ id: 'canvasDiv2', score: that.report.q2, color: '#fc7066', icon: '.canvas-icon2' });
      initCharts({ id: 'canvasDiv3', score: that.report.q3, color: '#e27b00', icon: '.canvas-icon3' });
      //红包
      window.shareRedPackage({
        goodsId: orderInfo.goodsid,
        parterId: orderInfo.parterid,
        orderId: this.orderId,
        url: window.location.href.replace('#/result?', '#/?'),
        wxShareTitle: '2018年年运',
        wxShareText: '2018已过半，回顾你的上半年，揭秘下半年的关键点。',
        wxShareImage: 'https://mobile.51wnl.com/numberology/2018ndys/static/img/icon.jpg',
        wxShareUrl: window.location.href.replace('#/result?', '#/?')
      });
    })
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
    windowScrollObserver() {
      window.addEventListener('scroll', function() {
        var quarter = _$('.window-wrap');
        // var height = quarter.getBoundingClientRect().height;
        quarter.style.bottom = 0;
      })
    },
    change(ob) {
      this.goodName = this.list[ob.index].title;
    },
    getChineseName(key) {
      return this.cName[key]
    },
    selectMonth(index) {
      // console.log(index)
      this.$router.push({ path: '/quarter/' + (index + 1) });
    },
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#canvasDiv1,
#canvasDiv2,
#canvasDiv3 {
  width: 100%;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
}

.swiper-wrapper {
  display: flex;
  height: 100%;
}

.ad-board-swiper {
  overflow: hidden;
}

.swiper-slide {
  height: 140px;
}

.canvasDiv-wrap {
  position: relative;
}

.wrap-tab {
  font-size: 16px;
  color: rgba(104, 81, 74, 1);
  line-height: 16px;
  margin-top: 16px;
  text-align: center;
  text-shadow: 0px 1px rgba(255, 255, 255, 0.7);
}
@media screen and (max-width: 321px) {
    .wrap-tab {
        font-size: 15px!important;
    }
}
</style>
