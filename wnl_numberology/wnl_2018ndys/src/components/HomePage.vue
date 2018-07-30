<template>
  <div class="home">
    <div class="toppicture"></div>
    <div class="layout">
      <div class="total">已有{{countNumber}}用户参与测试，97%的用户点赞</div>
      <div class="tips firsttips">了解未来运势，掌握吉凶祸福</div>
      <div class="info">
        <div class="top-line"></div>
        <div class="layout-info">
          <div class="input-group input-group-name">
            <div class="sex">
              <div class="sex-option male" :class="{checked:sex==1}" @click="setSex" data-sex='1'></div>
              <div class="sex-option famale" :class="{checked:sex==0}" @click="setSex" data-sex='0'></div>
            </div>
            <label for="name">您的姓名</label>
            <input type="text" v-model="name" placeholder="请输入您的姓名" id="name">
          </div>
          <div class="input-group input-group-date" @click="setBirthday">
            <label for="name">出生日期</label>
            <input type="text" name="birthdayDate" v-model="birthday" readonly="readonly" disabled="disabled">
          </div>
          <div class="input-group input-group-time" @click="setBirthtime">
            <label for="name">出生时间</label>
            <input type="text" name="setBirthMoment" placeholder="不清楚" v-model="birthtime" disabled="disabled">
          </div>
          <div class="input-group input-address" @click="setBirthplace">
            <label for="name" style="line-height:1.2">出生地点</label>
            <input type="text" name="address" readonly="readonly" placeholder="请完善出生地点" v-model="birthplace" disabled="disabled">
          </div>
        </div>
        <div class="bottom-line"></div>
      </div>
      <div class="btn btn1" @click="createOrder">立即查看</div>
      <div class="explain" @click="showTips">
        <span>为什么需要精确到出生时间</span>
        <i></i>
      </div>
      <div class="smalltips-mask" v-if="showSmalltips" @click="hiddenTips">
        <div class="smalltips" @click="showTips"></div>
      </div>
      <div class="tips">专业大师定制，拒绝模凌两可</div>
      <div class="home-section section1">
        <div class="pattern">
          <div class="text text1">回顾上半年</div>
          <div class="text text2">提前掌握下半年关键</div>
        </div>
      </div>
      <div class="box">
        <div class="box-left">
          <div class="block"></div>
          <div class="block"></div>
        </div>
        <div class="box-right">
          <div class="block"></div>
          <div class="block"></div>
        </div>
      </div>
      <div class="home-section">
        <div class="pattern">
          <div class="text text1">专业大师倾力打造</div>
          <div class="text text2">中西方结合算法，拒绝模凌两可</div>
        </div>
      </div>
      <div class="box">
        <div class="box-left">
          <div class="block"></div>
          <div class="block"></div>
        </div>
        <div class="box-right">
          <div class="block"></div>
          <div class="block"></div>
        </div>
      </div>
      <div class="home-section">
        <div class="pattern">
          <div class="text text1">100%纯干货呈现</div>
          <div class="text text2">让你看到的都是你最关心的</div>
        </div>
      </div>
      <div class="btn btn2" @click="backTop">立即抢占下半年运</div>
      <div class="tips tips2">选择不同，你的2018年大不同</div>
      <div class="billboard-list">
        <div class="billboard-list-wrap" v-for="(list,index) in billboardList" :key="index" :data-index="index">
          <div class="billboard" v-for="(item,index) in list" :key="index" :data-index="index">
            <div class="billboard-rope"></div>
            <div class="billboard-case">
              <div class="block">
                <div class="block-case">
                  <span>{{item.title}}</span>
                  <div class="block-case-box block-case-topleft"></div>
                  <div class="block-case-box block-case-topright"></div>
                  <div class="block-case-box block-case-bottomleft"></div>
                  <div class="block-case-box block-case-bottomright"></div>
                </div>
              </div>
              <div class="text">{{item.text}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn btn3" @click="backTop">立即改运2018年</div>
      <div class="short-tips">用户反馈</div>
      <div class="feedback-wrap">
        <div class="layout-feedback">
          <div class="top-line"></div>
          <div class="feedback">
            <div class="feedback-list">
              <div class="item" v-for="(item,index) in feedbackList" :key="index">
                <div class="feedback-name">
                  <span>{{ item.name }}</span>
                  <span>{{ item.phone }}</span>
                </div>
                <div class="feedback-text">{{ item.text }}</div>
              </div>
            </div>
            <div class="bottom-line"></div>
          </div>
        </div>
      </div>
      <div class="ad-board" style="margin-top:15px">
        <div class="ad-board-case">
          <div class="ad-board-title">猜你喜欢</div>
          <div class="ad-board-swiper">
            <div class="ad-icon-box" v-for="(item,index) in ad" :key="index">
              <a class="ad-icon" :href="item.url">
                <img :src="item.img" alt="">
                <div class="ad-text">{{item.title}}</div>
              </a>
            </div>
            <!--<div class="ad-icon-box" v-for="(item,index) in 8" :key="index">
                <a class="ad-icon" :href="item.url">
                  <img :src="item.img" alt="">
                  <div class="ad-text">1111111111</div>
                </a>
              </div>-->
          </div>
        </div>
      </div>
      <div class="copyright-info">
        <div>
          <div class="span">QQ：1436953644</div>
          <div class="span" style="padding-left:1.5rem"> 电话：023-88756857</div>
        </div>
        <div>
          <div class="span">公众号：暗月莉莉斯</div>
          <div class="span" style="padding-left:1rem"> 微信：Lilith_Queen</div>
        </div>
        <div>Copyright © CALENDAR Tech. All Rights Reserved.</div>
      </div>
    </div>
  </div>
</template>

<script>
import feedback from "../utils/feedback.js";
import '../plugin/picker-master/picker.css'
import { billboardList } from '../utils/data'
import { createOrder, getCeSuanOrderNum, getRelevantGoodsList } from '../api/api'
import { getItem, setItem, fixIphoneX, _$ } from '../utils/utils';
import orderInfo from '../utils/order'
import getQueryStringArgs from '../utils/parseurl'
import device from '../utils/device'

export default {
  data() {
    return {
      feedbackList: feedback.list,
      name: '',
      birthday: '1990-01-01',
      GLBirthday: '1990-01-01',
      Calendrtype: 0,
      birthtime: '不清楚',
      birthtimeValue: '12:01',
      birthplace: '',
      sex: 1,
      longitude: '',
      latitude: '',
      billboardList: billboardList,
      showSmalltips: false,
      countNumber: 0,
      ad: []
    };
  },
  mounted() {
    console.log('ready111111111');
    if (window.navigator.appVersion.indexOf('vivo') > -1) {
      console.log('fix vivo');
      // document.querySelector(".input-address").classList.add('input-fix');
      _$('.input-address').classList.add('input-fix');
      _$('.input-group-date').classList.add('input-fix');
      _$('.input-group-name').classList.add('input-fix');
      _$('.input-group-time').classList.add('input-fix');
    }
    fixIphoneX(() => {
      _$('.copyright-info').style.paddingBottom = '34px';
      _$('.input-group-name').classList.add('inputx');
      _$('.input-address').classList.add('inputx');
      _$('.input-group-date').classList.add('inputx');
    })
    var that = this;
    this.initCityPicker();
    feedback.showFeedback();
    getCeSuanOrderNum().then(res => {
      this.countNumber = 500 + res.data.data;
    });
    getRelevantGoodsList().then(res => {
      console.log(1);
      console.log(res.data.data)
      this.ad = res.data.data
      if (res.data.data.length > 8) {
        this.ad = res.data.data.slice(0, 8)
      }
    })
    var wnl_tlp_local = JSON.parse(localStorage.getItem('wnl_tlp_local'));
    if (!wnl_tlp_local && device.weixin) {
      _$('.wnl_history_btn').style.display = 'none';
    } else {
      _$('.wnl_history_btn').style.display = 'block';
    }
    console.log(weChatShare.wxShare);
    weChatShare.wxShare({
      title: '2018年年运',
      // text: '我在万年历看【2018年年运】，分享给你，一起看吧！',
      text: '2018已过半，回顾你的上半年，揭秘下半年的关键点。',
      imgUrl: location.origin + '/numberology/2018ndys/static/img/icon.jpg',
      imageUrl: location.origin + '/numberology/2018ndys/static/img/icon.jpg',
      url: location.href
    });
  },
  methods: {
    showTips() {
      this.showSmalltips = true;
      document.body.style.overflow = 'hidden';
    },
    hiddenTips() {
      this.showSmalltips = false;
      document.body.style.overflow = 'initial';
    },
    backTop() {
      window.scrollTo(0, 0);
    },
    initCityPicker() {
      var that = this;
      window.cityPicker = new wnlui.cityPicker({
        cityCode: false,
        onChange: function(result) {
          // console.log(result);
        },
        onConfirm: function(result) {
          console.log(result);
          that.birthplace = result[0].label + ' ' + result[1].label + ' ' + result[2].label;
          that.longitude = result[2].longitude;
          that.latitude = result[2].latitude;
        }
      });
    },
    setSex(e) {
      this.sex = e.target.dataset.sex;
    },
    setBirthday() {
      var that = this;
      let datePicker = new wnlui.datePicker({
        showLunar: true,
        defaultValue: [1990, 1, 1],
        onChange: function(result) {
          // console.log(result);
        },
        onConfirm: function(result) {
          console.log(result);
          var date = result.dateObj;
          var month = date.cMonth < 10 ? '0' + date.cMonth : date.cMonth;
          var day = date.cDay < 10 ? '0' + date.cDay : date.cDay;
          that.GLBirthday = date.cYear + '-' + month + '-' + day;
          that.Calendrtype = result.isSolar ? 0 : 1;
          var lunar = '农历 ' + date.lYear + '年' + date.IMonthCn + date.IDayCn
          that.birthday = result.isSolar ? that.GLBirthday : lunar
        }
      });
      datePicker.show();
    },
    setBirthtime() {
      var that = this;
      var timeList = [];
      for (let i = 0; i < 25; i++) {
        if (i === 0) {
          var item = {
            label: '不清楚',
            value: '12:01'
          }
        } else {
          if (i < 10) {
            var k = '0' + (i - 1);
          }
          k = i - 1;
          var item = {
            label: k + ':00-' + k + ':59',
            value: k + ':00'
          }
        }
        timeList.push(item);
      }
      wnlui.picker(timeList, {
        className: 'custom-classname',
        container: 'body',
        defaultValue: ['12:01'],
        onChange: function(result) {
          // console.log(result);
        },
        onConfirm: function(result) {
          console.log(result);
          that.birthtime = result[0].label;
          that.birthtimeValue = result[0].value;
        },
        id: 'singleLinePicker'
      });
    },
    setBirthplace() {
      window.cityPicker.show();
    },
    createOrder() {
      var toast = new wnlui.toast();
      if (this.name == '') {
        toast.show('请输入你的姓名');
        return false;
      }
      if (/(^[\u4e00-\u9fa5]{1,5}$)|(^[a-zA-Z]{1,20}$)/ig.test(this.name) === false) {
        toast.show('请输入5个以内中文字符或者20个以内英文字符');
        return false;
      }
      if (this.birthplace == '') {
        toast.show('请输入出生地点');
        return false;
      }
      if (orderInfo.posId == "" || orderInfo.posId == "[posId]") {
        orderInfo.posId = 'defaultyearluck';
      }
      orderInfo.Name = this.name;
      orderInfo.Birthday = this.birthday;
      orderInfo.GLBirthday = this.GLBirthday;
      orderInfo.Calendrtype = this.Calendrtype;
      orderInfo.birthtimeHour = this.birthtimeValue;
      orderInfo.Long = this.longitude;
      orderInfo.Lat = this.latitude;
      orderInfo.birthdaycity = this.birthplace;
      orderInfo.Sex = this.sex;
      console.log(orderInfo)
      var pageloading = new wnlui.pageloading();
      pageloading.show();
      createOrder(orderInfo).then(res => {
        // console.log(res)
        // var urlParams = {
        //   orderId: res.data.data.orderID
        // }
        var urlParams = orderInfo;
        urlParams.orderId = res.data.data.orderID;
        pageloading.hide();
        this.$router.push({ path: 'order', query: urlParams });
      })
    }
  }
};
</script>
      <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
