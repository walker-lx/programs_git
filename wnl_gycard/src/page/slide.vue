<template>
    <div class="slidePage" v-bind:class="classObject">
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide class="slide1">
              <div class="content staff_con" v-show="showStaffCon">
                无私奉献的<span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>，下班能数星星，有时还能看日出。
              </div>
              <div class="content soho_con" v-show="showSohoCon">
                世界那么大，<span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>就要到处走走看看，领略不一样的风景。
              </div>
              <div class="content laoban_con" v-show="showBossCon">
                <span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>是公司最核心的骨干，因为创业公司，没有几个人。
              </div>
              <div class="content student_con" v-show="showStudentCon">
                <span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>是新时代好学生，只专注学习，一点也不败家。
              </div>
              <div class="content other_con" v-show="showOtherCon">
                全靠主妇<span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>往上撑，才能家和万事兴，真不容易。
              </div>
              <p class="writeTip">下划线自定义填写</p>
            </swiper-slide>
            <swiper-slide class="slide2">
              <div class="content staff_con" v-show="showStaffCon">
                <span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>不是在公司，就是在去公司的路上，永无止境的人生。
              </div>
              <div class="content soho_con" v-show="showSohoCon">
                <span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>就要做自己，那个敢于燃烧自己，让人生光明灿烂。
              </div>
              <div class="content laoban_con" v-show="showBossCon">
                公司员工都仰仗<span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>，因为要一手搬砖，一手发工资。
              </div>
              <div class="content student_con" v-show="showStudentCon">
                <span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>一直在承受自己年纪不该有的智慧与压力，真的好累。
              </div>
              <div class="content other_con" v-show="showOtherCon">
                儿女辛苦<span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>来帮，洗衣做饭样样强，是他们坚强的后盾。
              </div>
              <p class="writeTip">下划线自定义填写</p>
            </swiper-slide>
            <swiper-slide class="slide3">
              <div class="content staff_con" v-show="showStaffCon">
                黑夜总是给<span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>带来黑色的眼圈，将会用它来迎接黎明。
              </div>
              <div class="content soho_con" v-show="showSohoCon">
                <span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>为自己代言，不走寻常路，人生就要与众不同。
              </div>
              <div class="content laoban_con" v-show="showBossCon">
                <span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>感觉这次会成功，已经幻想过无数次，相信坚持就能胜利。
              </div>
              <div class="content student_con" v-show="showStudentCon">
                <span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>每天起早贪黑，把分数看作命根，指引着前进的道路。
              </div>
              <div class="content other_con" v-show="showOtherCon">
                <span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>是新时代青年，24小时朋友圈摆摊，每天让节操碎一地。
              </div>
              <p class="writeTip">下划线自定义填写</p>
            </swiper-slide>
            <swiper-slide class="slide4">
              <div class="content">
                <span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>要给自己颁个<span class="inputWrap1"><input v-model="ugcText1" class="ugctext1" maxlength="8" type="text" /></span>荣誉，因为这是对自己劳动付出最好的证明！
              </div>
              <p class="writeTip">下划线自定义填写</p>
            </swiper-slide>
            <swiper-slide class="slide5">
              <div class="content">
                <span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>是<span class="inputWrap2"><input v-model="ugcText2" class="ugctext2" maxlength="6" type="text" /></span>最重要的人，因为<span class="inputWrap"><input class="ugcname" maxlength="4" type="text" v-model="ugcName" /></span>辛勤的劳动创造出幸福美好的生活。
              </div>
              <p class="writeTip">下划线自定义填写</p>
            </swiper-slide>
        </swiper>
        <p class="tip swipe_tip">可左右滑动选择劳模模板</p>
        <div class="btns makebtns">
          <button class="remake" @click="remake"></button>
          <button class="makeCard" @click="makeCard"></button>
        </div>
        <div class="wnlogo"></div>
        <div v-show="showLoading" class="loading" id="loading">
            <div class="loadingTip">
                <span class="loadingIco"></span>{{loadingText}}
            </div>
        </div>
    </div>
</template>

<script>
import 'babel-polyfill';
import util from "../plugin/util";
export default {
  name: 'Slide',
  data () {
    return {
        isLogin: false,
        showLoading: false,
        loadingText: '生成中，请稍后...',
        showStaffCon: false,
        showSohoCon: false,
        showBossCon: false,
        showStudentCon: false,
        showOtherCon: false,
        tempImgSrc: '',
        ugcName: '你',
        nickName: '',
        ugcText1: '',
        ugcText2: '',
        canText: '',
        swiperOption: {
            effect: 'slide',
            roundLengths: true,
            direction: 'horizontal',
            loop: false,
            initialSlide: 0,
            spaceBetween: 15,
            slidesPerView: 'auto',
            centeredSlides: true,
            observer:true,
            observeParents:true,
            on:{
              slideChange: function(){
                let input = document.getElementsByTagName('input');
                for (var i = 0; i < input.length; i++) {
                  input[i].blur();
                }
              }
            }
        }
    }
  },
    computed: {
        classObject: function () {
          return {
            staff: this.showStaffCon && !this.error,
            'soho': this.showSohoCon && !this.error,
            'boss': this.showBossCon && !this.error,
            'student': this.showStudentCon && !this.error,
            'other': this.showOtherCon && !this.error
          }
        },
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        userName() {
            return this.$store.state.userName;
        }
    },
  mounted: function() {
    wnlui.wnlShare.setShareData({
      title: '是时候，万年历给你送上一份劳模殊荣啦！',
      text: '还不赶紧来领取，让这个五一不白过！',
      image: location.origin + '/20180501/static/img/share.jpg',
      url: window.location.origin + '/20180501/index.html'
    });
    wnlui.wxShare({
        title: '是时候，万年历给你送上一份劳模殊荣啦！',
        text: '还不赶紧来领取，让这个五一不白过！',
        imgUrl: location.origin + '/20180501/static/img/share.jpg',
        imageUrl: location.origin + '/20180501/static/img/share.jpg',
        url: window.location.origin + '/20180501/index.html',
        callback: function(){
          _czc.push(['_trackEvent', 'LDJ2018_shared_wx', 'share']);
        }
    });
    if (this.userName) {
      // setTimeout(()=>{
        console.log(this.userName);
        this.ugcName = this.userName.substring(0,4);
      // },500);
    }
    let role = this.$route.params.role;
    if (role == 'staff') {
      this.showStaffCon = true;
      this.tempImgSrc = './static/img/staff.png';
    }else if (role == 'soho') {
      this.showSohoCon = true;
      this.tempImgSrc = './static/img/soho.png';
    }else if (role == 'boss') {
      this.showBossCon = true;
      this.tempImgSrc = './static/img/boss.png';
    }else if (role == 'student') {
      this.showStudentCon = true;
      this.tempImgSrc = './static/img/student.png';
    }else if (role == 'other') {
      this.showOtherCon = true;
      this.tempImgSrc = './static/img/other1.png';
    }

  },
  methods: {
    remake: function(){
      if (util.isWnl) {
        if (util.isIOS) {
            _czc.push(['_trackEvent', 'LDJ2018_rechooseBtn_wnl', 'click', 'ios']);
        }else if (util.isAndroid) {
            _czc.push(['_trackEvent', 'LDJ2018_rechooseBtn_wnl', 'click', 'az']);
        }
      }else if (util.isWeixin) {
        _czc.push(['_trackEvent', 'LDJ2018_rechooseBtn_wx', 'click']);
      }
      history.back();
    },
    makeCard: function() {
        this.showLoading = true;
        this.$store.commit('setShareName', this.ugcName);
        if (util.isWnl) {
          if (util.isIOS) {
              _czc.push(['_trackEvent', 'LDJ2018_cardBtn_wnl', 'click', 'ios']);
          }else if (util.isAndroid) {
              _czc.push(['_trackEvent', 'LDJ2018_cardBtn_wnl', 'click', 'az']);
          }
        }else if (util.isWeixin) {
          _czc.push(['_trackEvent', 'LDJ2018_cardBtn_wx', 'click']);
        }
        // 创建画布
        let cav = document.createElement('canvas');
        let ctx = cav.getContext('2d');
        cav.width = 640;
        cav.height = 840;
        ctx.fillStyle = '#fff3e7';
        ctx.fillRect(0, 0, 640, 840);
        let _this = this;
        let lastName = this.ugcName?this.ugcName:'你';
        let slideIndex = this.swiper.activeIndex;
        let lineWidth = 540, lineHeight = 56, posX = 52, posY = 200;
        if (util.isAndroid) {
          posX = 56;
        }
        switch (this.$route.params.role) {
          case 'staff': {
            if (slideIndex === 0) {
              this.canText = '无私奉献的' + lastName + '，下班能数星星，有时还能看日出。';
              this.tempImgSrc = './static/img/staff.png';
            } else if (slideIndex === 1) {
              this.canText = lastName + '不是在公司，就是在去公司的路上，永无止境的人生。';
              this.tempImgSrc = './static/img/staff.png';
            } else if (slideIndex === 2) {
              this.canText = '黑夜总是给' + lastName + '带来黑色的眼圈，将会用它来迎接黎明。';
              this.tempImgSrc = './static/img/staff.png';
            } else if (slideIndex === 3) {
              this.canText = lastName + '要给自己颁个' + this.ugcText1 + '荣誉，因为这是对自己劳动付出最好的证明！';
              this.tempImgSrc = './static/img/staff2.png';
            } else if (slideIndex === 4) {
              this.canText = lastName + '是' + this.ugcText2 + '最重要的人，因为' + lastName + '辛勤的劳动创造出幸福美好的生活。';
              this.tempImgSrc = './static/img/staff2.png';
            }
            break;
          }
          case 'boss': {
            if (slideIndex === 0) {
              this.canText = lastName + '是公司最核心的骨干，因为创业公司，没有几个人。';
              this.tempImgSrc = './static/img/boss.png';
            } else if (slideIndex === 1) {
              this.canText = '公司员工都仰仗' + lastName + '，因为要一手搬砖，一手发工资。';
              this.tempImgSrc = './static/img/boss.png';
            } else if (slideIndex === 2) {
              lineWidth = 560;
              posX = 50;
              this.canText = lastName + '感觉这次会成功，已幻想过无数次，相信坚持就能胜利。';
              this.tempImgSrc = './static/img/boss.png';
            } else if (slideIndex === 3) {
              this.canText = lastName + '要给自己颁个' + this.ugcText1 + '荣誉，因为这是对自己劳动付出最好的证明！';
              this.tempImgSrc = './static/img/boss2.png';
            } else if (slideIndex === 4) {
              this.canText = lastName + '是' + this.ugcText2 + '最重要的人，因为' + lastName + '辛勤的劳动创造出幸福美好的生活。';
              this.tempImgSrc = './static/img/boss2.png';
            }
            break;
          }
          case 'soho': {
            if (slideIndex === 0) {
              this.canText = '世界那么大，' + lastName + '就要到处走走看看，领略不一样的风景。';
              this.tempImgSrc = './static/img/soho.png';
            } else if (slideIndex === 1) {
              this.canText = lastName + '就要做自己，那个敢于燃烧自己，让人生光明灿烂。';
              this.tempImgSrc = './static/img/soho.png';
            } else if (slideIndex === 2) {
              this.canText = lastName + '为自己代言，不走寻常路，人生就要与众不同。';
              this.tempImgSrc = './static/img/soho.png';
            } else if (slideIndex === 3) {
              this.canText = lastName + '要给自己颁个' + this.ugcText1 + '荣誉，因为这是对自己劳动付出最好的证明！';
              this.tempImgSrc = './static/img/soho2.png';
            } else if (slideIndex === 4) {
              this.canText = lastName + '是' + this.ugcText2 + '最重要的人，因为' + lastName + '辛勤的劳动创造出幸福美好的生活。';
              this.tempImgSrc = './static/img/soho2.png';
            }
            break;
          }
          case 'student': {
            if (slideIndex === 0) {
              this.canText = lastName + '是新时代好学生，只专注学习，一点也不败家。';
              this.tempImgSrc = './static/img/student.png';
            } else if (slideIndex === 1) {
              this.canText = lastName + '一直在承受自己年纪不该有的智慧与压力，真的好累。';
              this.tempImgSrc = './static/img/student.png';
            } else if (slideIndex === 2) {
              this.canText = lastName + '每天起早贪黑，把分数看作命根，指引着前进的道路。';
              this.tempImgSrc = './static/img/student.png';
            } else if (slideIndex === 3) {
              this.canText = lastName + '要给自己颁个' + this.ugcText1 + '荣誉，因为这是对自己劳动付出最好的证明！';
              this.tempImgSrc = './static/img/student2.png';
            } else if (slideIndex === 4) {
              this.canText = lastName + '是' + this.ugcText2 + '最重要的人，因为' + lastName + '辛勤的劳动创造出幸福美好的生活。';
              this.tempImgSrc = './static/img/student2.png';
            }
            break;
          }
          case 'other': {
            if (slideIndex === 0) {
              this.canText = '全靠主妇' + lastName + '往上撑，才能家和万事兴，真不容易。';
              this.tempImgSrc = './static/img/other1.png';
            } else if (slideIndex === 1) {
              this.canText = '儿女辛苦' + lastName + '来帮，洗衣做饭样样强，是他们坚强的后盾。';
              this.tempImgSrc = './static/img/other1.png';
            } else if (slideIndex === 2) {
              lineWidth = 560;
              posX = 50;
              this.canText = lastName + '是新时代青年，24小时朋友圈摆摊，每天让节操碎一地。';
              this.tempImgSrc = './static/img/other2.png';
            } else if (slideIndex === 3) {
              this.canText = lastName + '要给自己颁个' + this.ugcText1 + '荣誉，因为这是对自己劳动付出最好的证明！';
              this.tempImgSrc = './static/img/other4.png';
            } else if (slideIndex === 4) {
              this.canText = lastName + '是' + this.ugcText2 + '最重要的人，因为' + lastName + '辛勤的劳动创造出幸福美好的生活。';
              this.tempImgSrc = './static/img/other4.png';
            }
            break;
          }
          default:
        }


        let canvasbg = new Image();
        canvasbg.src = this.tempImgSrc;
        canvasbg.onload = function() {
            ctx.drawImage(canvasbg, 0, 0, 640, 840);
            ctx.fillStyle = '#8b3b31';
            ctx.font = '36px -apple-system, "Helvetica Neue", "Helvetica", "STHeitiSC-Light", "Arial", sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            let result = util.breakLinesForCanvas(cav, _this.canText, lineWidth, ctx.font);
            console.log(result);
            result.forEach(function (line, index) {
              ctx.fillText(line, posX, lineHeight * index + posY);
            });
            let imgdata = cav.toDataURL("image/jpeg", 0.8);
            _this.$store.commit('changeBase64Img', imgdata);
            let resultImg = new Image();
            resultImg.src = imgdata;
            resultImg.onload = function(){
              setTimeout(function(){
                _this.showLoading = false;
                _this.$router.push("/result");
              },1000);
            }
        }


    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
