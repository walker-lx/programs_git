<template>
  <div class="user-center" :style="{backgroundImage:bgSrc[0]}" v-if="isUserCenterShow">
    <div class="hp-history-list" :style="{backgroundImage:bgSrc[1]}" id="history">
      <div class="title"><img src="../assets/img/historyTitle.png"></div>
      <div class="list-wrap" ref="listWrap">
        <div>
          <div class="list-item" :style="{backgroundImage:bgSrc[2]}" v-for="(item,index) in hpHistoryList" ref="slideWarp">
            <div class="slide-item" :data-orderId="item.orderID" @click="viewDetail">
              <div class="avator1"><img :src="item.img1" style="width:1rem;height:1rem"></div>
              <div class="hp-name">{{item.name1}}</div>
              <div class="star">
                <img style="width:0.5rem;height:0.43rem" :starNum="item.score" v-for="item in itemClasses[index]" :src="item">
              </div>
              <!-- <div class="avator2"><img :src="item.img1"></div> -->
            </div>
            <div class="slide-del" @click="onDeleteItem" :data-orderId="item.orderID" :data-index="index">删除</div>
          </div>
        </div>
      </div>
      <div class="not-history" v-if="isHasHistroy">暂无合盘记录...</div>
    </div>
    <div class="user-info-content" :style="{backgroundImage:bgSrc[3]}">
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
    <div class="btn" @click="updateUserInfo"><img src="../assets/img/save.png"></div>
    <IphoneX></IphoneX>
  </div>
</template>

<script>
import { getQueryValue } from '../utils/util';
import { getList, modify, getUser, modifyUser } from '../utils/api';
import Bscroll from 'better-scroll';
import IphoneX from './IphoneX';
/* import router from '../router/index'; */
let toast = new wnlui.toast(); //eslint-disable-line
let pageloading = new wnlui.pageloading(); //eslint-disable-line
// 设置微信分享
let wxSharInfo = {
  title: ' 缘分天注定，测测你与TA的缘分指数！',
  text: ' 合盘查看你们之间的亲密缘分！',
  imgUrl: 'https://qiniu.image.cq-wnl.com/content/201801084c0dd2ba1321450494be407581c3d8e7.jpg',
  url: '//mobile.51wnl.com/numberology/xphp/#/'
};
const STAR_ON = './static/img/ax2.png';
const STAR_OFF = './static/img/ax1.png';
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
      hpHistoryList: [],
      hpScore: [],
      isHasHistroy: false,
      isUserCenterShow: true,
      isUpdateInfo: false,
      bgSrc: ['url(' + require('../assets/img/bg.png') + ')', 'url(' + require('../assets/img/hpjlbj.png') + ')', 'url(' + require('../assets/img/hpjlfx.png') + ')', 'url(' + require('../assets/img/xgzl.png') + ')']
    };
  },
  watch: {
  },
  computed: {
    itemClasses() {
      let result = new Array(); //eslint-disable-line
      for (var i = 0; i < this.hpScore.length; i++) {
        result[i] = new Array(); //eslint-disable-line
        let valueNow = this.hpScore[i];
        let integer = Math.floor(parseInt(valueNow) * 2) / 2;
        let hasDecimal = valueNow % 1 !== 0;
        for (var j = 0; j < integer; j++) {
          result[i].push(STAR_ON);
        };
        if (hasDecimal) {
          result[i].push(STAR_OFF);
        };
      }
      return result;
    }
  },
  created() {
  },
  components: {
    IphoneX
  },
  mounted() {
    // router.go(0);
    this.getHistoryList();
    this.initCityPicker();
    this._initSlideDelete();
    this.getUserInfo();
    window.wnlui.wxShare({
      title: wxSharInfo.title,
      text: wxSharInfo.text,
      imgUrl: wxSharInfo.imgUrl,
      url: wxSharInfo.url
    });
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.listWrap, {
        click: true // better-scroll 默认会阻止浏览器的原生 click 事件
      });
    });
  },
  methods: {
    getHistoryList() {
      let _this = this;
      let userId = getQueryValue('userId');
      this.userId = userId;
      let getListData = {
        UserID: userId
      };
      getList(getListData).then(res => {
        _this.hpHistoryList = res.data.data;
        if (_this.hpHistoryList.length === 0) {
          _this.isHasHistroy = true;
        }
        // 获取score
        let hpScore = [];
        for (var value of _this.hpHistoryList) {
          hpScore.push(value.score);
        }
        _this.hpScore = hpScore;
      });
    },
    getUserInfo() {
      let getUserInfoData = {
        userid: this.userId,
        deviceid: ''
      };
      let localUserInfo = localStorage.getItem('wxUserInfo');
      this.headerImg = JSON.parse(localUserInfo).headerImg;
      getUser(getUserInfoData).then(res => {
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
        this.$watch('nickName', function (val, oldVal) { this.isUpdateInfo = true; }, { deep: true });
        this.$watch('birthDate', function (val, oldVal) { this.isUpdateInfo = true; }, { deep: true });
        this.$watch('birthTime', function (val, oldVal) { this.isUpdateInfo = true; }, { deep: true });
        this.$watch('birthPlace', function (val, oldVal) { this.isUpdateInfo = true; }, { deep: true });
      });
    },
    initCityPicker() {
      var that = this;
      window.cityPicker = new wnlui.cityPicker({ //eslint-disable-line
        cityCode: false,
        showAuto: false,
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
      _this.isUpdateInfo = true;
    },
    _initSlideDelete() {
      let initX; // 触摸位置
      let initY;
      let moveX; // 滑动时的位置
      let moveY;
      let X = 0; // 移动距离
      let Y = 0;
      let objX = 0; // 目标对象位置
      document.getElementById('history').addEventListener('touchstart', function (event) {
        let obj = event.target.nextElementSibling;
        if (obj) {
          if (obj.className === 'slide-del') {
            initX = event.targetTouches[0].pageX;
            initY = event.targetTouches[0].pageY;
            objX =
              obj.style.WebkitTransform
                .replace(/translateX\(/g, '')
                .replace(/px\)/g, '') * 1;
          }
        }
        if (objX === 0) {
          document.getElementById('history').addEventListener('touchmove', function (event) {
            let obj = event.target.nextElementSibling;
            if (obj) {
              if (obj.className === 'slide-del') {
                moveX = event.targetTouches[0].pageX;
                moveY = event.targetTouches[0].pageY;
                X = moveX - initX;
                Y = moveY - initY;
                let yMathAb = Math.abs(Y);
                if (X >= 0 && yMathAb < 10) {
                  obj.style.WebkitTransform = 'translateX(' + 0 + 'px)';
                } else if (X < 0 && yMathAb < 10) {
                  let l = Math.abs(X);
                  obj.style.WebkitTransform = 'translateX(' + -l + 'px)';
                  if (l > 119) {
                    l = 119;
                    obj.style.WebkitTransform = 'translateX(' + -l + 'px)';
                  }
                }
              }
            }
          });
        } else if (objX < 0) {
          document.getElementById('history').addEventListener('touchmove', function (event) {
            let obj = event.target.nextElementSibling;
            if (obj) {
              if (obj.className === 'slide-del') {
                moveX = event.targetTouches[0].pageX;
                X = moveX - initX;
                Y = moveY - initY;
                let yMathAb = Math.abs(Y);
                if (X >= 0 && yMathAb < 10) {
                  let r = -119 + Math.abs(X);
                  obj.style.WebkitTransform = 'translateX(' + r + 'px)';
                  if (r > 0) {
                    r = 0;
                    obj.style.WebkitTransform = 'translateX(' + r + 'px)';
                  }
                } else {
                  // 向左滑动
                  // obj.style.WebkitTransform = 'translateX(' + -119 + 'px)';
                }
              }
            }
          });
        }
      });
      document.getElementById('history').addEventListener('touchend', function (event) {
        let obj = event.target.nextElementSibling;
        if (obj) {
          if (obj.className === 'slide-del') {
            objX =
              obj.style.WebkitTransform
                .replace(/translateX\(/g, '')
                .replace(/px\)/g, '') * 1;
            if (objX > -60) {
              obj.style.WebkitTransform = 'translateX(' + 0 + 'px)';
              objX = 0;
            } else {
              obj.style.WebkitTransform = 'translateX(' + -119 + 'px)';
              objX = -119;
            }
          }
        }
      });
    },
    onDeleteItem(e) {
      let _this = this;
      let index = e.target.dataset.index;
      this.$refs.slideWarp[index].childNodes[2].style.WebkitTransform = 'translateX(' + 0 + 'px)';
      pageloading.show();
      let orderId = e.target.dataset.orderid;
      // 删除订单
      let modifyData = {
        orderid: orderId,
        userid: _this.userId
      };
      modify(modifyData).then(res => {
        if (res.data.data) {
          _this.getHistoryList();
          pageloading.hide();
          toast.show('合盘记录删除成功~');
        } else {
          pageloading.hide();
          toast.show('网络错误，请稍后重试~');
        }
      });
    },
    updateUserInfo() {
      if (/(^[\u4e00-\u9fa5]{1,5}$)|(^[a-zA-Z]{1,20}$)|(^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,10}$)/ig.test(this.nickName) === false) {
        toast.show('请输入5个以内中文字符或者20个以内英文字符');
        this.isUpdateInfo = false;
        return false;
      }
      if (this.isUpdateInfo) {
        pageloading.show();
        let userUpateInfo = {
          name: this.nickName,
          img: this.headerImg,
          calendartype: this.Calendrtype,
          birthday: this.birthDate,
          glbirthday: this.GLBirthday === '' ? this.birthDate : this.GLBirthday,
          birthtimehour: this.birthTimeValue,
          birthdaycity: this.birthPlace,
          sex: parseInt(this.sex) === 1 ? 'true' : 'false',
          long: this.longitude,
          lat: this.latitude,
          userid: this.userId,
          deviceid: ''
        };
        modifyUser(userUpateInfo).then(res => {
          pageloading.hide();
          toast.show('修改成功~');
          this.isUpdateInfo = false;
        });
      } else {
        toast.show('没有修改哦~');
      }
    },
    viewDetail(e) {
      let orderId = e.target.dataset.orderid;
      this.$router.push({ path: '/result', query: { orderId: orderId, userId: this.userId, isShare: false } });
    }
  }
};
</script>

<style>

</style>
