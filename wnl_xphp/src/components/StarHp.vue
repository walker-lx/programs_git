<template>
  <div class="star-content" :style="{backgroundImage:bgSrc[0]}" v-if="isStarShow">
    <div class="header-content">
      <img src="../assets/img/mxhp.png">
      <div class="avator1"><img :src="avator1Src"></div>
      <div class="avator2"><img :src="avator2Src"></div>
    </div>
    <div class="main-content" :style="{backgroundImage:bgSrc[1]}">
      <div class="star-warp">
        <div class="star-item" v-for="(item,index) in starListShow">
          <img :src='item.img' :data-id="item.id" :data-imgSrc="item.img" :data-index="index" @click="selectStar" ref="starItem" style="width:1.71rem;height:1.71rem">
          <div class="star-name">{{item.name}}</div>
        </div>
      </div>
      <div class="getMore" v-if="isShowMore" @click="getMoreList">更多</div>
      <div class="flodList" v-if="isShowFlod" @click="getFlodList">收起</div>
    </div>
    <div class="btn" @click="creatOrderStar"><img src="../assets/img/ljhp1.png"></div>
    <IphoneX></IphoneX>
  </div>
</template>

<script>
import { orderInfo, userInfo } from '../utils/info';
import { getUser, getStarList, creatOrder } from '../utils/api';
// let userInfo = JSON.parse(localStorage.getItem('userInfoPro'));
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
      userId: '',
      avator1Src: '',
      avator2Src: '',
      starList: [],
      starListShow: [],
      isShowMore: false,
      isShowFlod: false,
      StarTempID: 1,
      orderId: '',
      isStarShow: false,
      bgSrc: ['url(' + require('../assets/img/bg.png') + ')', 'url(' + require('../assets/img/mxhpbj.png') + ')']
    };
  },
  mounted() {
    this.getUserInfo();
    this.getStarInfo();
    this.isStarShow = true;
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
        _this.avator1Src = userInfo.img;
      });
    },
    getStarInfo() {
      let _this = this;
      getStarList().then(res => {
        // testData
        // let list = [{ 'id': 1, 'name': 's', 'img': 'https://qiniu.image.cq-wnl.com/4a8f8d9bb0984f2aab83a41b8e18e016.png' }, { 'id': 2, 'name': '菜单', 'img': 'https://qiniu.image.cq-wnl.com/788a2ae461714866bdb8f326bb503327.png' }, { 'id': 3, 'name': 'xx', 'img': 'https://qiniu.image.cq-wnl.com/c0114256c44141e7be5c08df187d04d1.png' }, { 'id': 4, 'name': 's', 'img': 'https://qiniu.image.cq-wnl.com/4a8f8d9bb0984f2aab83a41b8e18e016.png' }, { 'id': 5, 'name': 's', 'img': 'https://qiniu.image.cq-wnl.com/4a8f8d9bb0984f2aab83a41b8e18e016.png' }, { 'id': 6, 'name': 's', 'img': 'https://qiniu.image.cq-wnl.com/4a8f8d9bb0984f2aab83a41b8e18e016.png' }, { 'id': 7, 'name': 's', 'img': 'https://qiniu.image.cq-wnl.com/4a8f8d9bb0984f2aab83a41b8e18e016.png' }];
        // _this.starList = list;
        _this.starList = res.data.data;
        _this.avator2Src = _this.starList[0].img;
        if (_this.starList.length > 6) {
          _this.starListShow = _this.starList.slice(0, 6);
          _this.isShowMore = true;
        } else {
          _this.starListShow = _this.starList;
        }
      });
    },
    getMoreList() {
      this.starListShow = this.starList;
      this.isShowMore = false;
      this.isShowFlod = true;
    },
    getFlodList() {
      this.starListShow = this.starList.slice(0, 6);
      this.isShowMore = true;
      this.isShowFlod = false;
    },
    selectStar(e) {
      let _this = this;
      let starImg = e.target.dataset.imgsrc;
      let starId = e.target.dataset.id;
      let index = e.target.dataset.index;
      this.StarTempID = parseInt(starId);
      this.avator2Src = starImg;
      // 滚动
      let distance = document.documentElement.scrollTop || document.body.scrollTop;
      let total = this.$refs.starItem[index].offsetTop;
      let step = total / 60;
      function smoothUp() {
        if (distance < total && distance > 0) {
          distance -= step;
          document.body.scrollTop = parseInt(distance);
          document.documentElement.scrollTop = parseInt(distance);
          setTimeout(smoothUp, 10);
        } else {
          _this.getFlodList();
        }
      }
      if (_this.starList.length > 6) {
        smoothUp();
      }
    },
    creatOrderStar() {
      let _this = this;
      let pageloading = new wnlui.pageloading(); //eslint-disable-line
      pageloading.show();
      // 订单信息
      orderInfo.Name = userInfo.name;
      orderInfo.Lat = userInfo.lat;
      orderInfo.Long = userInfo.long;
      orderInfo.BirthdayCity = userInfo.birthdaycity;
      orderInfo.Sex = userInfo.sex;
      orderInfo.BirthDay = userInfo.birthday;
      orderInfo.GLBirthDay = userInfo.glbirthday;
      orderInfo.Calendartype = 1;
      orderInfo.BirthTimeHour = userInfo.birthtimehour;
      orderInfo.Img = userInfo.img;
      orderInfo.UserID = userInfo.userid;
      orderInfo.IsShareDisc = false;
      orderInfo.Tag = 1;
      orderInfo.StarTempID = this.StarTempID;
      creatOrder(orderInfo).then(res => {
        pageloading.hide();
        _this.orderId = res.data.data.orderID;
        // result
        _this.$router.push({ path: '/result', query: { orderId: _this.orderId, userId: _this.userId, isShare: false, hpSort: '1' } });
      });
    }
  }
};
</script>

<style>

</style>
