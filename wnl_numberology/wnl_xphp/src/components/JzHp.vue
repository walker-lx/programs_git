<template>
  <div class="jzhp-content" :style="{backgroundImage:bgSrc[0]}" v-if="isJzhpShow" style="position: absolute">
    <div class="header-content">
      <img src="../assets/img/jzhp1.png">
    </div>
    <div class="user-info-content" :style="{backgroundImage:bgSrc[1]}" :class="{yqMargin:isYqhp}">
      <div class="input-group">
        <div class="input-content">
          <label for="name">姓名</label>
          <input type="text" placeholder="请输入姓名" v-model="nickName" id="input-name">
          <div class="sex">
            <div class="sex-option male" :class="{checked:sex==0}" data-sex='0' @click="setSex">女</div>
            <div class="sex-option female" :class="{checked:sex==1}" data-sex='1' @click="setSex">男</div>
          </div>
        </div>
        <div class="input-content" @click="setBirthDate">
          <label for="name">出生日期</label>
          <input type="text" placeholder="选择出生日期" v-model="birthDate" readonly="readonly" disabled="disabled">
        </div>
        <div class="input-content" @click="setBirthTime">
          <label for="name">出生时间</label>
          <input type="text" placeholder="选择出生时间" v-model="birthTime" readonly="readonly" disabled="disabled">
        </div>
        <div class="input-content" @click="setBirthPlace">
          <label for="name">出生地点</label>
          <input type="text" placeholder="选择出生地点" v-model="birthPlace" readonly="readonly" disabled="disabled">
        </div>
      </div>
    </div>
    <div class="btn" @click="creatOrderJZ"><img src="../assets/img/ljhp1.png"></div>
    <IphoneX></IphoneX>
  </div>
</template>

<script>
import { orderInfo, userInfo } from '../utils/info';
import { creatOrder, getUser } from '../utils/api';
import IphoneX from './IphoneX';
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
      nickName: '',
      headerImg: '',
      userId: '',
      GLBirthday: '',
      Calendrtype: 0,
      sex: 1,
      birthDate: '',
      birthTime: '不清楚',
      birthTimeValue: '12:01',
      birthPlace: '',
      longitude: '',
      latitude: '',
      isShowWxGesture: '',
      orderId: '',
      isYqhp: false,
      isMxhp: false,
      isJzhp: false,
      isJzhpShow: false,
      hpSort: '', // 合盘类型 0:邀请合盘,1:明星合盘,2:精准合盘
      bgSrc: ['url(' + require('../assets/img/bg.png') + ')', 'url(' + require('../assets/img/srdfzl.png') + ')']
    };
  },
  components: {
    IphoneX
  },
  mounted() {
    this.initCityPicker();
    this.getUserInfo();
    this.isJzhpShow = true;
    window.wnlui.wxShare({
      title: wxSharInfo.title,
      text: wxSharInfo.text,
      imgUrl: wxSharInfo.imgUrl,
      url: wxSharInfo.url
    });
  },
  methods: {
    getUserInfo() {
      let _this = this;
      let wxUserInfo = JSON.parse(localStorage.getItem('wxUserInfo'));
      _this.userId = wxUserInfo.unionid;
      let userInfoGet = {
        UserID: _this.userId,
        deviceid: ''
      };
      getUser(userInfoGet).then(res => {
        let resultData = res.data.data;
        userInfo.name = resultData.name;
        userInfo.img = resultData.img;
        userInfo.calendartype = resultData.calendarType;
        userInfo.birthday = resultData.birthday;
        userInfo.glbirthday = resultData.glBirthDay;
        userInfo.birthtimehour = resultData.birthTimeHour;
        userInfo.birthdaycity = resultData.birthdayCity;
        userInfo.sex = resultData.sex;
        userInfo.long = resultData.long;
        userInfo.lat = resultData.lat;
        userInfo.userid = resultData.userID;
        userInfo.deviceid = resultData.deviceID;
        if (!userInfo.glbirthday) {
          userInfo.glbirthday = resultData.birthday;
        }
      });
    },
    initCityPicker() {
      var that = this;
      window.cityPicker = new wnlui.cityPicker({ //eslint-disable-line
        cityCode: false,
        onConfirm: function (result) {
          that.birthPlace = result[0].label + '-' + result[1].label + '-' + result[2].label;
          that.longitude = result[2].longitude;
          that.latitude = result[2].latitude;
        }
      });
    },
    setBirthDate() {
      var that = this;
      let datePicker = new wnlui.datePicker({ //eslint-disable-line
        showLunar: true,
        defaultValue: [1990, 1, 1],
        onConfirm: function (result) {
          var date = result.dateObj;
          var month = date.cMonth < 10 ? '0' + date.cMonth : date.cMonth;
          var day = date.cDay < 10 ? '0' + date.cDay : date.cDay;
          that.GLBirthday = date.cYear + '-' + month + '-' + day;
          that.Calendrtype = result.isSolar ? 0 : 1;
          var lunar = '农历 ' + date.lYear + '年' + date.IMonthCn + date.IDayCn;
          that.birthDate = result.isSolar ? that.GLBirthday : lunar;
        }
      });
      datePicker.show();
    },
    setBirthTime() {
      var that = this;
      var timeList = [];
      let item;
      for (let i = 0; i < 25; i++) {
        if (i === 0) {
          item = {
            label: '不清楚',
            value: '12:01'
          };
        } else {
          if (i < 10) {
            var k = '0' + (i - 1);
          }
          k = i - 1;
          item = {
            label: k + ':00-' + k + ':59',
            value: k + ':30'
          };
        }
        timeList.push(item);
      }
      wnlui.picker(timeList, { //eslint-disable-line
        className: 'custom-classname',
        container: 'body',
        defaultValue: ['12:01'],
        onConfirm: function (result) {
          that.birthTime = result[0].label;
          that.birthTimeValue = result[0].value;
        },
        id: 'singleLinePicker'
      });
    },
    setBirthPlace() {
      window.cityPicker.show();
    },
    setSex(e) {
      let _this = this;
      _this.sex = e.target.dataset.sex;
    },
    creatOrderJZ() {
      let _this = this;
      let toast = new wnlui.toast(); //eslint-disable-line
      let pageloading = new wnlui.pageloading(); //eslint-disable-line
      if (/(^[\u4e00-\u9fa5]{1,5}$)|(^[a-zA-Z]{1,20}$)|(^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,10}$)/ig.test(this.nickName) === false) {
        toast.show('请输入5个以内中文字符或者20个以内英文字符');
        return false;
      }
      if (this.birthDate === '') {
        toast.show('请输入你的出生日期');
        return false;
      }
      if (this.birthPlace === '') {
        toast.show('请输入出生地点');
        return false;
      }
      pageloading.show();
      _this.userId = userInfo.userid;
      // 订单信息
      orderInfo.Img = userInfo.img;
      orderInfo.UserID = userInfo.userid;
      orderInfo.Name = userInfo.name;
      orderInfo.Lat = userInfo.lat;
      orderInfo.Long = userInfo.long;
      orderInfo.BirthdayCity = userInfo.birthdaycity;
      orderInfo.Sex = userInfo.sex;
      orderInfo.BirthDay = userInfo.birthday;
      orderInfo.GLBirthDay = userInfo.glbirthday;
      orderInfo.Calendartype = 1;
      orderInfo.BirthTimeHour = userInfo.birthtimehour;

      /* orderInfo.Img1 = userInfo.img; */
      orderInfo.UserID1 = userInfo.userid;
      orderInfo.Name1 = this.nickName;
      orderInfo.Lat1 = this.latitude;
      orderInfo.Long1 = this.longitude;
      orderInfo.BirthdayCity1 = this.birthPlace;
      orderInfo.Sex1 = this.sex === 1 ? 'true' : 'false';
      orderInfo.BirthDay1 = this.birthDate;
      orderInfo.GLBirthDay1 = this.GLBirthday;
      orderInfo.Calendartype1 = 1;
      orderInfo.BirthTimeHour1 = this.birthTimeValue;
      orderInfo.IsShareDisc = false;
      orderInfo.Tag = 2;
      creatOrder(orderInfo).then(res => {
        pageloading.hide();
        _this.orderId = res.data.data.orderID;
        _this.$router.push({ path: '/result', query: { orderId: _this.orderId, userId: _this.userId, isShare: false, hpSort: '2' } });
      });
    }
  }
};
</script>

<style>

</style>
