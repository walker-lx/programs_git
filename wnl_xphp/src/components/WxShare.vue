<template>
  <div class="wxShare-content" :style="{backgroundImage:bgSrc[0]}" v-if="isWxShareShow">
    <div class="header-content">
      <img src="../assets/img/hpbgbj1.png">
      <div class="txt">{{titleTxt}}</div>
      <div class="avator1"><img :src="avator1Src"></div>
      <div class="avator2"><img :src="avator2Src"></div>
    </div>
    <div class="user-info-content" :style="{backgroundImage:bgSrc[1]}">
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
    <div class="btn" @click="shareCreatOrder"><img src="../assets/img/btn4.png"></div>
    <IphoneX></IphoneX>
  </div>
</template>

<script>
import { getQueryValue } from '../utils/util';
import { orderInfo } from '../utils/info';
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
      avator1Src: '',
      avator2Src: '',
      orderId: '',
      deviceId: '',
      creatUserId: '',
      titleTxt: '',
      isWxShareShow: false,
      bgSrc: ['url(' + require('../assets/img/bg.png') + ')', 'url(' + require('../assets/img/hkhp.png') + ')']
    };
  },
  mounted() {
    this.wxAuthorization();
    this.initCityPicker();
    this.getShareUserInfo();
    this.isWxShareShow = true;
    window.wnlui.wxShare({
      title: wxSharInfo.title,
      text: wxSharInfo.text,
      imgUrl: wxSharInfo.imgUrl,
      url: wxSharInfo.url
    });
  },
  components: {
    IphoneX
  },
  methods: {
    wxAuthorization() {
      let _this = this;
      let nickName, headerImg;
      let wxUserInfo = localStorage.getItem('wxUserInfo');
      let openid = getQueryValue('openid');
      let unionid = getQueryValue('unionid');
      if (!openid && !wxUserInfo) location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + encodeURIComponent(window.location.href);
      if (wxUserInfo) {
        nickName = JSON.parse(wxUserInfo).nickName;
        headerImg = JSON.parse(wxUserInfo).headerImg;
        openid = JSON.parse(wxUserInfo).openid;
        unionid = JSON.parse(wxUserInfo).unionid;
        _this.userId = unionid;
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
    },
    getShareUserInfo() {
      let userId = getQueryValue('userId');
      this.creatUserId = userId;
      let wxUserInfo = localStorage.getItem('wxUserInfo');
      let shareUserInfo = {
        userid: userId,
        deviceId: ''
      };
      let sharedInfo = {
        userid: this.userId,
        deviceId: ''
      };
      this.orderId = getQueryValue('orderId');
      this.userId = JSON.parse(wxUserInfo).unionid;
      this.nickName = JSON.parse(wxUserInfo).nickName;
      this.headerImg = JSON.parse(wxUserInfo).headerImg;
      // 获取分享着的信息
      getUser(shareUserInfo).then(res => {
        this.avator2Src = JSON.parse(wxUserInfo).headerImg;
        this.avator1Src = res.data.data.img;
        this.titleTxt = res.data.data.name + '邀请你与TA合盘';
      });
      // 被分享着
      getUser(sharedInfo).then(res => {
        let resultData = res.data.data;
        if (resultData.name) {
          let birthTime = resultData.birthTimeHour.split(':')[1] === '01' ? '不清楚' : resultData.birthTimeHour.split(':')[0] + ':00-' + resultData.birthTimeHour.split(':')[0] + ':59';
          this.nickName = resultData.name;
          this.birthDate = resultData.birthday;
          this.birthPlace = resultData.birthdayCity;
          this.sex = resultData.sex === true ? 1 : 0;
          this.longitude = resultData.long;
          this.latitude = resultData.lat;
          this.birthTime = birthTime;
          this.GLBirthday = resultData.glBirthDay;
          this.birthTimeValue = resultData.birthTimeHour;
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
    shareCreatOrder() {
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

      // 订单信息
      orderInfo.Name1 = this.nickName;
      orderInfo.Lat1 = this.latitude;
      orderInfo.Long1 = this.longitude;
      orderInfo.Sex1 = this.sex === 1 ? 'true' : 'false';
      orderInfo.BirthdayCity1 = this.birthPlace;
      orderInfo.BirthDay1 = this.birthDate;
      orderInfo.GLBirthDay1 = this.GLBirthday;
      orderInfo.Calendartype1 = 1;
      orderInfo.BirthTimeHour1 = this.birthTimeValue;
      orderInfo.Img1 = this.headerImg;
      orderInfo.UserID1 = this.userId;
      orderInfo.IsShareDisc = true;
      orderInfo.OrderID = this.orderId;
      orderInfo.Tag = 0;
      creatOrder(orderInfo).then(res => {
        _this.orderId = res.data.data.orderID;
        pageloading.hide();
        this.$router.push({ path: '/result', query: { orderId: _this.orderId, userId: _this.creatUserId, isShare: true, isShareDisc: true } });
      });
    }
  }
};
</script>

<style>

</style>
