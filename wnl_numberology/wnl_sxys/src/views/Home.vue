<template>
 <div class="home">
  <div class="img-title">
    <img :src="getImg('top_pic.jpg')"/>
  </div>
  <div class="layout">
    <div class="sx-box img-sx-box img">
      <div class="sx-box-inside">
        <div class="sx-item active" v-for="(item,index) in sxList" :key="index" @click="selectSX(item)">
          <img :src="getImg(item.ename+'.png')"/>
        </div>
      </div>
    </div>
    <div class="fts-title">
      <img :src="getImg('fantaisui_title.png')"/>
    </div>
    <div class="fts-text">以下属相及情况，很可能冲犯到太岁</div>
    <div class="fts-sx-box">
      <div class="fts-sx-item active" v-for="(item,index) in fantaisuiImgList" :key="index" @click="selectFTSSX(item)">
        <img :src="getImg(`fantanshui_${item}_icon@3x.jpg`)"/>
      </div>
    </div>
    <div class="situation-box">
      <div class="situation-item" v-for="(item,index) in situationList" :key="index">
        <div class="situation-item-img">
          <img :src="getImg(`${item.img}@3x.jpg`)"/>
        </div>
        <div class="situation-item-text">{{item.name}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from "vue";
import { sxList, situationList } from "../utils/dataList";
import calendar from '../utils/calendar';
import PageLoader from '../plugin/pageloader';
import { getShowMonth } from '../utils/util';

export default Vue.extend({
  data() {
    return {
      sxList,
      situationList,
      fantaisuiImgList: ["niu", "long", "yang", "ji", "gou"],
      month: ''
    };
  },
  name: "home",
  mounted() {
    document.querySelector('.wnl_history_btn').classList.remove('hidden');
    this.month = getShowMonth();
  },
  methods: {
    selectSX(item) {
      this.$router.push(`result/${item.ename}/${this.month}`);
    },
    selectFTSSX(item) {
      this.$router.push(`result/${item}/${this.month}`);
    },
    getImg(name) {
      return require(`../assets/img/${name}`);
    }
  }
});
</script>
<style lang="less" scoped>
@import "../css/home.less";
</style>
