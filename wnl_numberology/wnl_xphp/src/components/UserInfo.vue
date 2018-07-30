<template>
  <div class="user-info" :style="{backgroundImage:bgSrc[0]}" v-if="isUserInfoShow">
    <div class="header-content">
      <div class="mxhp" v-if="isMxhp">
        <img src="../assets/img/mxhp.png">
        <div class="avator1"><img :src="headerImg"></div>
        <div class="avator2"><img src="https://qiniu.image.cq-wnl.com/content/201801097117b8e9cd784bf5a36d6df3c3a0a511.jpg"></div>
      </div>
      <div class="jzhp" v-if="isJzhp"><img src="../assets/img/jzhp1.png"></div>
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
    <div class="btn" @click="infoConfirm"><img src="../assets/img/btn3.png"></div>
    <IphoneX></IphoneX>
    <WxGesture v-if="isShowWxGesture" @closeGesture='closeGesture'></WxGesture>
  </div>
</template>

<script>
import WxGesture from './WxGesture';
import { orderInfo, userInfo } from '../utils/info';
import { creatOrder, modifyUser } from '../utils/api';
import IphoneX from './IphoneX';
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
      isYqhp: false,
      isMxhp: false,
      isJzhp: false,
      isUserInfoShow: false,
      hpSort: '', // 合盘类型 0:邀请合盘,1:明星合盘,2:精准合盘
      bgSrc: ['url(' + require('../assets/img/bg.png') + ')', 'url(' + require('../assets/img/info1.png') + ')']
    };
  },
  components: {
    WxGesture,
    IphoneX
  },
  mounted() {
    this.initCityPicker();
    this.nickName = this.$route.query.nickName;
    this.headerImg = this.$route.query.headerImg;
    this.userId = this.$route.query.unionid;
    this.hpSort = this.$route.query.hpSort;
    switch (parseInt(this.hpSort)) {
      case 0:
        this.isYqhp = true;
        break;
      case 1:
        this.isMxhp = true;
        break;
      case 2:
        this.isJzhp = true;
        break;
    };
    this.isUserInfoShow = true;
    window.wnlui.wxShare({
      title: wxSharInfo.title,
      text: wxSharInfo.text,
      imgUrl: wxSharInfo.imgUrl,
      url: wxSharInfo.url
    });
  },
  methods: {
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
    infoConfirm() {
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
      // 用户信息
      userInfo.name = this.nickName;
      userInfo.img = this.headerImg;
      userInfo.calendartype = 1;
      userInfo.birthday = this.birthDate;
      userInfo.glbirthday = this.GLBirthday === '' ? this.birthDate : this.GLBirthday;
      userInfo.birthtimehour = this.birthTimeValue;
      userInfo.birthdaycity = this.birthPlace;
      userInfo.sex = this.sex === 1 ? 'true' : 'false';
      userInfo.long = this.longitude;
      userInfo.lat = this.latitude;
      userInfo.userid = this.userId;
      // 订单信息
      orderInfo.Name = this.nickName;
      orderInfo.Lat = this.latitude;
      orderInfo.Long = this.longitude;
      orderInfo.BirthdayCity = this.birthPlace;
      orderInfo.Sex = this.sex === 1 ? 'true' : 'false';
      orderInfo.BirthDay = this.birthDate;
      orderInfo.GLBirthDay = this.GLBirthday;
      orderInfo.Calendartype = 1;
      orderInfo.BirthTimeHour = this.birthTimeValue;
      orderInfo.Img = this.headerImg;
      orderInfo.UserID = this.userId;
      orderInfo.IsShareDisc = false;
      orderInfo.Tag = 0;
      /*
      *添加用户信息
       */
      modifyUser(userInfo).then(res => {
        let hpSort = parseInt(this.hpSort);
        /* 判断合盘方式 */
        switch (hpSort) {
          case 0:
            shareFriend();
            break;
          case 1:
            starHp();
            break;
          case 2:
            jzHp();
            break;
        }
        function shareFriend() {
          if (res.data.data) {
            creatOrder(orderInfo).then(res => {
              orderInfo.OrderID = res.data.data.orderID;
              wxSharInfo.url = 'http://mobile.51wnl.com/numberology/xphp/#/wxShare/?orderId=' + orderInfo.OrderID + '&userId=' + userInfo.userid;
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
              pageloading.hide();
              _this.isShowWxGesture = true;
            });
          }
        }
        function starHp() {
          pageloading.hide();
          _this.$router.push({ path: '/star-hp', query: '' });
        }
        function jzHp() {
          pageloading.hide();
          _this.$router.push({ path: '/jz-hp', query: '' });
        }
      });
    },
    closeGesture(data) {
      this.isShowWxGesture = false;
    }
  }
};
</script>

<style>

</style>
