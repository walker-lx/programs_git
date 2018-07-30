<template>
    <div class="home">
      <div class="topbanner"></div>
      <div class="toptitle">
        <p>选择想要了解的问题</p>
      </div>
      <div class="qstab">
        <ul class="qstList">
          <li :class="{active:i==nowIndex}" v-for="(item, i) in resultData" @click="switchTab(i)">
            {{item.content}}
          </li>
        </ul>
        <div class="qstWrap">
          <div class="qstInner">
            <div class="qst_item" :class="{active:i==nowQstIndex, 'firsttype': nowIndex==0}" v-for="(item, i) in qstData" @click="selectQst(item.id, i, item.content)">
              {{item.content.split("：")[0]}}<span></span>{{item.content.split("：")[1]}}
            </div>
          </div>
        </div>
      </div>
      <div class="btnWrap">
        <button class="divinaBtn" @click="goPickCard">默念问题·立即占卜</button>
      </div>
      <div class="introduce">
        <div class="corner-tl"></div>
        <div class="corner-tr"></div>
        <div class="corner-bl"></div>
        <div class="corner-br"></div>
        <img class="guanyin" src="../assets/img/card.jpg"/>
        <div class="intro_title">
          <span class="shade leftShade"></span>观音卡介绍<span class="shade rightShade"></span>
        </div>
        <p class="introP1">观音是慈悲之母。她指引我们开启智慧，使我们能够活出和谐、与万物合一的生命，拥有充满爱的人生。当你遇到难题时，观音要你记住 —— 你是神性本真的珍贵灵魂。这个世界最苦的就是心的苦，有苦也说不出。但是，观音却懂你的苦。观音能给到你心的指引，让你从迷雾中找到光。</p>
        <div class="intro_title">
          <span class="shade leftShade"></span>一张牌卡·一个真相<span class="shade rightShade"></span>
        </div>
        <p class="introP2">
          单张牌卡解读，适用于想要得到快速且清楚明确的指引。在心中莫想问题，然后洗牌，从中抽出一张牌来进行解读。
        </p>
      </div>
      <div class="feedback_title">
        <p>
          用户反馈
        </p>
      </div>
      <div class="feedback_wrap container">
        <div class="feedback_inner">
          <vue-seamless-scroll class="scrollWrap" :data="feedData" :class-option="classOption">
            <ul class="feedback_list" id="feedback_list">
              <li class="feedback_item" v-for="item in feedData">
                <h3>{{item.name}}</h3>
                <p>{{item.content}}</p>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
      </div>
      <div class="backTopBtn">
        <!-- <div class="shadow"></div> -->
        <button class="backTop" @click="goTop">最近有困惑？立即占卜吧！</button>
      </div>
      <div class="copyRight">
        <p>
          <span>QQ：1436953644</span>
          <span>电话：023-88756857</span>
        </p>
        <p>Copyright © CALENDAR Tech. All Rights Reserved.</p>
      </div>
    </div>
</template>

<script>
import 'babel-polyfill';
import vueSeamlessScroll from "vue-seamless-scroll";
import { toast, wnlShare, wxShare } from '../plugin/wnlui';
import util from "../plugin/util";
import pageloader from "../plugin/pageloader/index";
// import Toast from '../plugin/Toast.vue';
// import Utils from '../plugin/Utils';
export default {
  name: 'Index',
  // components: {
  //   [Toast.name]: Toast
  // },
  components: {
    vueSeamlessScroll
  },
  data () {
    return {
      nowIndex: 0,
      nowQstIndex: null,
      selected: false,
      resultData: {},
      qstData: {},
      timer: null,
      clientInfo: [],
      urlParams: {},
      questionId: null,
      feedData: [
        {
          name: '王女士',
          content: '最近事业上一直很低迷，来做个小测试瞬间就找到了工作方向！'
        },
        {
          name: '刘女士',
          content: '这个占卜也太全面了吧！好好玩~~我一口气测了好几卦！'
        },
        {
          name: '张先生',
          content: '很好奇为什么会这么准，感觉说的就是我本人没错了。'
        },
        {
          name: '柳女士',
          content: '一直犹豫要不要告白，占卜结果鼓励我去告白，好吧我决定了这次一定要告白成功！'
        },
        {
          name: '江先生',
          content: '背着老婆偷偷帮她占卜了一次，感觉蛮准的！'
        },
        {
          name: '邵先生',
          content: '占卜说我最近财运极佳，我决定马上去买张彩票试试！'
        },
        {
          name: '杜女士',
          content: '最近老是和男朋友风波不断，赶紧来给自己看看到底是怎么回事啊啊啊！！！'
        },
        {
          name: '李先生',
          content: '马上要独自出国留学了，希望塔罗的预言能给我带来好运！！'
        },
        {
          name: '郑女士',
          content: '一直想出去旅游但是拿不定主意，没想到这也能塔罗占卜，太有趣了~~~~'
        },
        {
          name: '曹女士',
          content: '初入职场很迷茫，塔罗给了我无尽的启发~~我会好好加油的！！！'
        },
        {
          name: '廖女士',
          content: '这次看到了占卜结果我真的决定要和他断干净了。'
        },
        {
          name: '吴先生',
          content: '偶尔玩玩这些小测试感觉还是蛮有趣的。'
        },
        {
          name: '王先生',
          content: '女朋友一直埋怨我太过死板，今天一测还真是这样，看来我得好好反思了。'
        },
        {
          name: '胡先生',
          content: '财运极差的我不禁捂住了钱包……'
        },
        {
          name: '秦女士',
          content: '一直想去割双眼皮，但是现在突然就觉得还是谨慎一点好！'
        },
        {
          name: '欧阳先生',
          content: '最近在感情上非常的迷茫，非常感谢神谕卡给我指引了方向！'
        },
        {
          name: '刘小姐',
          content: '一直不知道自己是否该跳槽，通过神谕卡我找到了方向，感恩！'
        },
        {
          name: '陈女士',
          content: '这个占卜真的很准！'
        },
        {
          name: '黄女士',
          content: '在容貌上一直对自己不太自信，还好有神谕卡给我一些指引。'
        },
        {
          name: '胡先生',
          content: '很喜欢这个占卜卡，算得也非常准~'
        },
        {
          name: '张女士',
          content: '我和老公都通过这个占卜卡找到了自己的答案！'
        },
        {
          name: '台女士',
          content: '感觉老公最近跟我有些疏远，偷偷算了一下，这个答案还是令我比较满意~'
        },
        {
          name: '江先生',
          content: '看见老婆在算，我也来算了一卦~最近我是要发财啊~……'
        },
        {
          name: '蒋女士',
          content: '这个测试还是蛮有趣的，还叫了身边的人一起来玩。'
        },
        {
          name: '罗女士',
          content: '减肥一直不成功，正好看见神谕卡可以算，就悄悄的算了一下，原来是我的减肥方式不对啊！'
        },
        {
          name: '钱先生',
          content: '最近想要买房子，但是一直拿不定主意，感谢神谕卡帮我坚定要买房子的心~'
        },
        {
          name: '马女士',
          content: '上司一直不给我升职加薪！感谢神谕卡给我一个是否要跳槽的答案！谢谢！'
        },
        {
          name: '文女士',
          content: '男朋友总是对我若即若离，还好有这个占卜，原来是有第三者了！我得赶紧和渣男分手！'
        },
        {
          name: '陈女士',
          content: '与老公的感情生活越来越不顺利，和老公都算了一下，我们一定会珍惜这段感情的~~'
        },
        {
          name: '郑女士',
          content: '这个神谕卡真的好准啊~想要的答案都在这个里面~谢谢~'
        }
      ]
    }
  },
  computed: {
    classOption: function() {
      return {
        step: 0.5,
        openTouch: false
      };
    }
  },
  created() {
    this.getQuestion();
    this.clientInfo = {
        userId: userId,
        deviceId: deviceId,
        boundId: boundId,
        channel: channel,
        idfa: idfa,
        imei: imei,
        mac: mac,
        pToken: pToken,
        pushToken: pushToken,
        couponId: couponId,
        posId: posId
    }
    localStorage.setItem('clientInfo',JSON.stringify(this.clientInfo));
    this.$store.commit('setClientInfo', this.clientInfo);
  },
  mounted: function() {
      // console.log(loading.show());
      document.body.addEventListener('touchstart',function(){},false);
      util.removeClass(document.querySelector("#app"), "absolute_page");
      document.querySelector('.wnl_history_btn').style.display = 'block';
      window.wnlShare.setShareData({
        title: '一张能帮你解决98%问题的观音卡',
        text: '》》》点击立刻占卜',
        image: location.origin + '/numberology/gycard/static/img/share.jpg',
        url: location.origin + '/numberology/gycard/index.html?posId=' + this.clientInfo.posId
      });
      wxShare({
          title: '一张能帮你解决98%问题的观音卡',
          text: '》》》点击立刻占卜',
          imgUrl: location.origin + '/numberology/gycard/static/img/share.jpg',
          imageUrl: location.origin + '/numberology/gycard/static/img/share.jpg',
          url: location.origin + '/numberology/gycard/index.html?posId=' + this.clientInfo.posId,
          callback: function(){
              _czc.push(['_trackEvent', 'Shengyucard_shared', 'share']);
          }
      });

      let wnlsharemask = document.querySelector('.wnlshare-mask');
      if (wnlsharemask) {
        wnlsharemask.addEventListener('touchmove', function(event) {
          event.preventDefault();
        },false);
      }
      let wnlsharewrap = document.querySelector('.wnlshare-wrap');
      if (wnlsharewrap) {
        wnlsharewrap.addEventListener('touchmove', function(event) {
          event.preventDefault();
        },false);
      }
  },
  methods: {
    getQuestion() {
      this.$http.post('//coco70.51wnl.com/numberologynew/TarotGod/GetQuestion').then(response => {
          this.resultData = response.body.data;
          this.qstData = this.resultData[0].childens;
      });
    },
    switchTab(i) {
      this.nowIndex = i;
      this.nowQstIndex == -1;
      if (this.nowQstIndex > -1) {
        this.nowQstIndex = -1;
      }
      this.qstData = this.resultData[i].childens;
    },
    goPickCard() {
      if (!this.selected) {
        let toast1 = new toast();//初始化toast对象
        toast1.show('请选择要了解的问题再进行占卜');
      }else {
        if (this.nowIndex == 0) {
          _czc.push(['_trackEvent', 'Ganqing_'+(this.nowQstIndex+1), 'click']);
        }else if (this.nowIndex == 1) {
          _czc.push(['_trackEvent', 'Shiye_'+(this.nowQstIndex+1), 'click']);
        }else if (this.nowIndex == 2) {
          _czc.push(['_trackEvent', 'Caiyun_'+(this.nowQstIndex+1), 'click']);
        }else if (this.nowIndex == 3) {
          _czc.push(['_trackEvent', 'Chuxing_'+(this.nowQstIndex+1), 'click']);
        }else if (this.nowIndex == 4) {
          _czc.push(['_trackEvent', 'Xueye_'+(this.nowQstIndex+1), 'click']);
        }else if (this.nowIndex == 5) {
          _czc.push(['_trackEvent', 'Shenghuo_'+(this.nowQstIndex+1), 'click']);
        }
        this.setParams();
        this.urlParams.questionId = this.questionId;
        this.$router.push({ path: '/choose', query: this.urlParams });
      }
    },
    setParams() {
        this.urlParams = {
            userId: this.clientInfo.userId,
            deviceId: this.clientInfo.deviceId,
            pushToken: this.pushToken,
            pToken: this.clientInfo.pToken,
            mac: this.clientInfo.mac,
            imei: this.clientInfo.imei,
            boundId: this.clientInfo.boundId,
            posId: this.clientInfo.posId
        };
        if (this.clientInfo.couponId) {
            this.urlParams.couponId = this.clientInfo.couponId;
        }
    },
    selectQst(id,index,content) {
      if (this.nowQstIndex == index) {
          if (this.nowIndex == 0) {
            _czc.push(['_trackEvent', 'Ganqing_'+(this.nowQstIndex+1), 'click']);
          }else if (this.nowIndex == 1) {
            _czc.push(['_trackEvent', 'Shiye_'+(this.nowQstIndex+1), 'click']);
          }else if (this.nowIndex == 2) {
            _czc.push(['_trackEvent', 'Caiyun_'+(this.nowQstIndex+1), 'click']);
          }else if (this.nowIndex == 3) {
            _czc.push(['_trackEvent', 'Chuxing_'+(this.nowQstIndex+1), 'click']);
          }else if (this.nowIndex == 4) {
            _czc.push(['_trackEvent', 'Xueye_'+(this.nowQstIndex+1), 'click']);
          }else if (this.nowIndex == 5) {
            _czc.push(['_trackEvent', 'Shenghuo_'+(this.nowQstIndex+1), 'click']);
          }
          this.setParams();
          this.urlParams.questionId = id;
          this.$router.push({ path: '/choose', query: this.urlParams });
      }else {
          this.nowQstIndex = index;
          this.selected = true;
          localStorage.setItem('gycard_cardText', content);
          this.$store.commit('changeCardText', content);
          this.$store.commit('setQuestionId', id);
          this.questionId = id;
      }
    },
    goTop () {
      let distTop = document.querySelector('.toptitle').offsetTop;
      document.body.scrollTop = distTop
      document.documentElement.scrollTop = distTop
      // this.timer = setInterval(() => {
      //   let osTop = document.documentElement.scrollTop || document.body.scrollTop
      //   let ispeed = Math.floor(-osTop / 5)
      //   document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
      //   this.isTop = true
      //   if (osTop === distTop) {
      //     clearInterval(this.timer)
      //   }
      // }, 30)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wnlshare-platform {
  min-height: 100%;
}
</style>
