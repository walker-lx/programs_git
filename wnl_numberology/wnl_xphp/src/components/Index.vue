<template>
  <div class="index" :style="{backgroundImage:bgSrc[0]}" v-if="isShowIndex">
    <div class="header-content">
      <img src="../assets/img/header.png">
    </div>
    <div class="desc-info-content">
      <img src="../assets/img/yqhy.png">
      <div class="btn" @click="shareToFriend"><img src="../assets/img/btn1.png"></div>
    </div>
    <div class="mxhp-content">
      <img src="../assets/img/mxhpIndex.png">
      <div class="btn" @click="starHp">
        <img src="../assets/img/btn2.png">
      </div>
    </div>
    <div class="jzhp-content-index">
      <img src="../assets/img/jzhp.png" @click="jzHp">
      <div class="btn">
        <!-- <img src="../assets/img/btn2.png"> -->
      </div>
    </div>
    <IphoneX></IphoneX>
    <WxGesture v-if="isShowWxGesture" @closeGesture='closeGesture'></WxGesture>
    <div class="user-center-btn" @click="toUsercenter"><img src="../assets/img/userCcenter.png"></div>
  </div>
</template>

<script>
import { getQueryValue } from '../utils/util';
import { getUser, creatOrder } from '../utils/api';
import { userInfo, orderInfo } from '../utils/info';
import WxGesture from './WxGesture';
import IphoneX from './IphoneX';
let toast = new wnlui.toast(); //eslint-disable-line
let pageloading = new wnlui.pageloading(); //eslint-disable-line
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
      wxUserInfo: {},
      bgSrc: ['url(' + require('../assets/img/bg.png') + ')'],
      isFillInfo: '',
      isShowWxGesture: false,
      isShowIndex: false
    };
  },
  components: {
    WxGesture,
    IphoneX
  },
  mounted() {
    this.wxAuthorization();
    this.isShowIndex = true;
    window.wnlui.wxShare({
      title: wxSharInfo.title,
      text: wxSharInfo.text,
      imgUrl: wxSharInfo.imgUrl,
      url: wxSharInfo.url
    });
  },
  methods: {
    wxAuthorization() {
      let nickName, headerImg;
      let wxUserInfo = localStorage.getItem('wxUserInfo');
      let openid = getQueryValue('openid');
      let unionid = getQueryValue('unionid');
      if (!openid && !wxUserInfo) location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
      if (wxUserInfo) {
        nickName = JSON.parse(wxUserInfo).nickName;
        headerImg = JSON.parse(wxUserInfo).headerImg;
        openid = JSON.parse(wxUserInfo).openid;
        unionid = JSON.parse(wxUserInfo).unionid;
      } else {
        nickName = getQueryValue('nickname');
        headerImg = getQueryValue('headimgurl');
      }
      if (nickName && headerImg) {
        localStorage.setItem('wxUserInfo', JSON.stringify({
          nickName: nickName,
          headerImg: headerImg,
          openid: openid,
          unionid: unionid
        }));
      }
      this.wxUserInfo = {
        nickName: nickName,
        headerImg: headerImg,
        openid: openid,
        unionid: unionid
      };
      let userInfoGet = {
        UserID: this.wxUserInfo.unionid,
        deviceid: ''
      };
      getUser(userInfoGet).then(res => {
        let resultData = res.data.data;
        if (resultData.birthdaycity !== '' && resultData.birthday !== '' && resultData.glBirthDay !== '' && resultData.long !== '' && resultData.lat !== '') {
          this.isFillInfo = true;
        }
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
    shareToFriend() {
      // pageloading.show();
      let _this = this;
      if (this.isFillInfo) {
        orderInfo.Name = userInfo.name;
        orderInfo.Lat = userInfo.lat;
        orderInfo.Long = userInfo.long;
        orderInfo.BirthdayCity = userInfo.birthdaycity;
        orderInfo.Sex = userInfo.sex;
        orderInfo.BirthDay = userInfo.birthday;
        orderInfo.GLBirthDay = userInfo.glbirthday;
        orderInfo.Calendartype = userInfo.calendartype;
        orderInfo.BirthTimeHour = userInfo.birthtimehour;
        orderInfo.Img = userInfo.img;
        orderInfo.UserID = userInfo.userid;
        orderInfo.IsShareDisc = false;
        orderInfo.Tag = 0;
        creatOrder(orderInfo).then(res => {
          orderInfo.OrderID = res.data.data.orderID;
          wxSharInfo.url = '//mobile.51wnl.com/numberology/xphp/#/wxShare/?orderId=' + orderInfo.OrderID + '&userId=' + userInfo.userid;
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
          _this.isShowWxGesture = true;
        });
      } else {
        this.$router.push({ path: '/userinfo?hpSort=0', query: this.wxUserInfo });
      }
    },
    starHp() {
      if (this.isFillInfo) {
        this.$router.push({ path: '/star-hp', query: '' });
      } else {
        this.$router.push({ path: '/userinfo?hpSort=1', query: this.wxUserInfo });
      }
    },
    jzHp() {
      if (this.isFillInfo) {
        this.$router.push({ path: '/jz-hp', query: '' });
      } else {
        this.$router.push({ path: '/userinfo?hpSort=2', query: this.wxUserInfo });
      }
    },
    toUsercenter() {
      // 时间戳
      let timestamp = Date.parse(new Date());
      this.$router.push({ path: '/user-center?userId=' + this.wxUserInfo.unionid + '&timestamp=' + timestamp, query: '' });
    },
    closeGesture(data) {
      this.isShowWxGesture = false;
    }
  }
};
</script>

<style>

</style>
