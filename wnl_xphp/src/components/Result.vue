<template>
  <div class="result-content" :style="{backgroundImage:bgSrc[0]}" v-if="isResultShow">
    <div class="header-content">
      <img src="../assets/img/hpbgHeader.png">
      <div class="avator1"><img :src="avator1"></div>
      <div class="avator2"><img :src="avator2"></div>
    </div>
    <div class="result-detail" :style="{backgroundImage:bgSrc[1]}">
      <!-- 缘分指数 -->
      <div class="yuanfen-content" :style="{backgroundImage:bgSrc[2]}">
        <div class="desc">
          <div class="label">缘分指数</div>
          <div class="star">
            <img v-for="(itemClass,index) in itemClasses" :src="itemClass" style="width:0.5rem;margin-right: 0.14rem;height:0.43rem">
          </div>
          <div class="score">{{yuanfenData[0]}}分</div>
        </div>
      </div>
      <div class="other-detail">
        <!-- 吸引力 -->
        <div class="detail-item" :style="{backgroundImage:bgSrc[3]}">
          <div class="item-header">
            <div class="label" style="width:1.3rem">吸引力</div>
            <div class="icon" style="width:0.43rem; height:0.46rem;"><img src="../assets/img/sd.png" style="width:0.17rem; height:0.46rem;"></div>
            <div class="scoreDive">
              <div class="scoreValue" style="background-color: #feb77e;" :style="score1"></div>
            </div>
            <div class="score">{{xylData[0]}}分</div>
          </div>
          <div class="detail-content">{{xylData[1]}}</div>
          <div class="yh"><img src="../assets/img/yh.png"></div>
        </div>
        <!-- 默契 -->
        <div class="detail-item" :style="{backgroundImage:bgSrc[3]}">
          <div class="item-header">
            <div class="label" style="width:1.3rem">默契</div>
            <div class="icon" style="width:0.43rem; height:0.46rem;"><img src="../assets/img/ax.png" style="width: 0.38rem; height: 0.35rem"></div>
            <div class="scoreDive">
              <div class="scoreValue" style="background-color: #d768f2;" :style="score2"></div>
            </div>
            <div class="score">{{mqData[0]}}分</div>
          </div>
          <div class="detail-content">{{mqData[1]}}</div>
          <div class="yh"><img src="../assets/img/yh.png"></div>
        </div>
        <!-- 羁绊 -->
        <div class="detail-item" :style="{backgroundImage:bgSrc[3]}">
          <div class="item-header">
            <div class="label" style="width:1.3rem">羁绊</div>
            <div class="icon" style="width:0.43rem; height:0.46rem;"><img src="../assets/img/s.png" style="width: 0.36rem; height: 0.32rem"></div>
            <div class="scoreDive">
              <div class="scoreValue" style="background-color: #ec5d96;" :style="score3"></div>
            </div>
            <div class="score">{{jbData[0]}}分</div>
          </div>
          <div class="detail-content">{{jbData[1]}}</div>
          <div class="yh"><img src="../assets/img/yh.png"></div>
        </div>
        <!-- 沟通 -->
        <div class="detail-item" :style="{backgroundImage:bgSrc[3]}">
          <div class="item-header">
            <div class="label" style="width:1.3rem">沟通</div>
            <div class="icon" style="width:0.43rem; height:0.46rem;"><img src="../assets/img/yy.png" style="width: 0.28rem; height: 0.39rem"></div>
            <div class="scoreDive">
              <div class="scoreValue" style="background-color: #00c0cf;" :style="score4"></div>
            </div>
            <div class="score">{{gtData[0]}}分</div>
          </div>
          <div class="detail-content">{{gtData[1]}}</div>
          <div class="yh"><img src="../assets/img/yh.png"></div>
        </div>
        <!-- 激情 -->
        <div class="detail-item" :style="{backgroundImage:bgSrc[3]}">
          <div class="item-header">
            <div class="label" style="width:1.3rem">激情</div>
            <div class="icon" style="width:0.43rem; height:0.46rem;"><img src="../assets/img/huoyan.png" style="width: 0.24rem; height: 0.38rem"></div>
            <div class="scoreDive">
              <div class="scoreValue" style="background-color: #ffa20d;" :style="score5"></div>
            </div>
            <div class="score">{{jqData[0]}}分</div>
          </div>
          <div class="detail-content">{{jqData[1]}}</div>
          <div class="yh"><img src="../assets/img/yh.png"></div>
        </div>
        <!-- 感受 -->
        <div class="detail-item" :style="{backgroundImage:bgSrc[3]}">
          <div class="item-header">
            <div class="label" style="width:1.3rem">感受</div>
            <div class="icon" style="width:0.43rem; height:0.46rem;"><img src="../assets/img/wjx.png" style="width: 0.43rem; height: 0.41rem"></div>
            <div class="scoreDive">
              <div class="scoreValue" style="background-color: #ffce00;" :style="score6"></div>
            </div>
            <div class="score">{{gsData[0]}}分</div>
          </div>
          <div class="detail-content">{{gsData[1]}}</div>
          <div class="yh"><img src="../assets/img/yh.png"></div>
        </div>
      </div>
    </div>
    <div class="bottom" v-if="isResult">
      <div class="share" @click="shareFriend"><img src="../assets/img/fx.png"></div>
      <div class="play-again" @click="playAgain"><img src="../assets/img/fh1.png"></div>
    </div>
    <div class="bottom" v-if="isShare">
      <div class="ewm"><img src="../assets/img/ewm.png"></div>
    </div>
    <IphoneX></IphoneX>
    <WxGesture v-if="isShowWxGesture" @closeGesture='closeGesture'></WxGesture>
  </div>
</template>

<script type="text/ecmascript-6">
'use strict';
import { getOrderDetail } from '../utils/api';
import { getQueryValue } from '../utils/util';
import WxGesture from './WxGesture';
import IphoneX from './IphoneX';
/* import device from '../utils/device'; */
const STAR_ON = './static/img/ax2.png';
const STAR_OFF = './static/img/ax1.png';
// 设置微信分享
let wxSharInfo = {
  title: ' 缘分天注定，测测你与TA的缘分指数！',
  text: ' 合盘查看你们之间的亲密缘分！',
  imgUrl: 'https://qiniu.image.cq-wnl.com/content/201801084c0dd2ba1321450494be407581c3d8e7.jpg',
  url: '//mobile.51wnl.com/numberology/xphp/#/'
};
export default {
  data() {
    return {
      orderId: '',
      userId: '',
      score1: '',
      score2: '',
      score3: '',
      score4: '',
      score5: '',
      score6: '',
      yuanfenData: [],
      xylData: [],
      mqData: [],
      jbData: [],
      gtData: [],
      jqData: [],
      gsData: [],
      avator1: '',
      avator2: '',
      isResultShow: false,
      isShowWxGesture: false,
      isShareDisc: '',
      /* itemClassesData: [], */
      isShare: false,
      isResult: false,
      isShowStar: true,
      hpSort: '', // 合盘类型 0:邀请合盘,1:明星合盘,2:精准合盘
      bgSrc: ['url(' + require('../assets/img/bgC.png') + ')', 'url(' + require('../assets/img/hpbgbj.png') + ')', 'url(' + require('../assets/img/yuanfenzhishubeijin.png') + ')', 'url(' + require('../assets/img/wenzibj.png') + ')']
    };
  },
  computed: {
    itemClasses: function () {
      let result = [];
      let integer = Math.floor(parseInt(this.yuanfenData[0]) * 2) / 2;
      let hasDecimal = this.yuanfenData[0] % 1 !== 0;
      for (let i = 0; i < integer; i++) {
        result.push(STAR_ON);
      };
      if (hasDecimal) {
        result.push(STAR_OFF);
      };
      return result;
    }
  },
  components: {
    WxGesture,
    IphoneX
  },
  mounted() {
    this.getUrlParam();
    this.getResultDetail();
    wxSharInfo.url = '//mobile.51wnl.com/numberology/xphp/#/result/?orderId=' + this.orderId + '&userId=' + this.userId + '&isShare=true';
    window.wnlui.wxShare({
      title: wxSharInfo.title,
      text: wxSharInfo.text,
      imgUrl: wxSharInfo.imgUrl,
      url: wxSharInfo.url
    });
    this.isResultShow = true;
    this.hpSort = parseInt(getQueryValue('hpSort'));
  },
  methods: {
    getUrlParam() {
      this.orderId = this.$route.query.orderId;
      this.userId = this.$route.query.userId;
      this.isShareDisc = this.$route.query.isShareDisc;
      if (getQueryValue('isShare') === 'true') {
        this.isShare = true;
        this.isResult = false;
      } else {
        this.isShare = false;
        this.isResult = true;
      }
    },
    getResultDetail() {
      let _this = this;
      let dataInfo = {
        OrderID: _this.orderId,
        UserID: _this.userId,
        IsShareDisc: _this.isShareDisc
      };
      getOrderDetail(dataInfo).then(res => {
        let resultData = res.data.data.contentData;
        // 设置分享的信息
        // 明星合盘
        if (this.hpSort === 1) {
          wxSharInfo.title = '我和' + res.data.data.name1 + '的缘分指数竟然有…';
          window.wnlui.wxShare({
            title: wxSharInfo.title,
            text: wxSharInfo.text,
            imgUrl: wxSharInfo.imgUrl,
            url: wxSharInfo.url,
            callback: function (e) {
              _this.isShowWxGesture = false;
            }
          });
        }
        if (this.hpSort === 2) {
          wxSharInfo.title = res.data.data.name + '和' + res.data.data.name1 + '的合盘报告';
          window.wnlui.wxShare({
            title: wxSharInfo.title,
            text: wxSharInfo.text,
            imgUrl: wxSharInfo.imgUrl,
            url: wxSharInfo.url,
            callback: function (e) {
              _this.isShowWxGesture = false;
            }
          });
        }
        this.avator1 = res.data.data.img;
        this.avator2 = res.data.data.img1;
        this.yuanfenData = resultData.k1.split('#');
        /* 吸引力 */
        this.xylData = resultData.k2.split('#');
        let score1Style = parseFloat(this.xylData[0] / 5) * 100 + '%';
        this.score1 = 'width:' + score1Style;
        /* 默契 */
        this.mqData = resultData.k3.split('#');
        let score2Style = parseFloat(this.mqData[0] / 5) * 100 + '%';
        this.score2 = 'width:' + score2Style;
        /* 羁绊 */
        this.jbData = resultData.k4.split('#');
        let score3Style = parseFloat(this.jbData[0] / 5) * 100 + '%';
        this.score3 = 'width:' + score3Style;
        /* 沟通 */
        this.gtData = resultData.k5.split('#');
        let score4Style = parseFloat(this.gtData[0] / 5) * 100 + '%';
        this.score4 = 'width:' + score4Style;
        /* 激情 */
        this.jqData = resultData.k6.split('#');
        let score5Style = parseFloat(this.jqData[0] / 5) * 100 + '%';
        this.score5 = 'width:' + score5Style;
        /* 感受 */
        this.gsData = resultData.k7.split('#');
        let score6Style = parseFloat(this.gsData[0] / 5) * 100 + '%';
        this.score6 = 'width:' + score6Style;
      });
    },
    shareFriend() {
      let _this = this;
      this.isShowWxGesture = true;
      wxSharInfo.url = '//mobile.51wnl.com/numberology/xphp/#/result/?orderId=' + this.orderId + '&userId=' + this.userId + '&isShare=true';
      window.wnlui.wxShare({
        title: wxSharInfo.title,
        text: wxSharInfo.text,
        imgUrl: wxSharInfo.imgUrl,
        url: wxSharInfo.url,
        callback: function (e) {
          _this.isShowWxGesture = false;
          /* if(e.errMsg.indexOf('cancel')) this.isShowWxGesture = false;
          if(e.errMsg.indexOf('cancel')) this.isShowWxGesture = false; */
        }
      });
    },
    playAgain() {
      this.$router.push({ path: '/', query: '' });
    },
    closeGesture(data) {
      this.isShowWxGesture = false;
    }
  }
};
</script>

<style>

</style>
