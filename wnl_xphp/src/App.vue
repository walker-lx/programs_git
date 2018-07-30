<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { preloadimages } from './utils/util';
import './scss/style.scss';
export default {
  name: 'app',
  data() {
    return {
      imgArr: [
        require('./assets/img/header.png'),
        require('./assets/img/xgzl.png'),
        require('./assets/img/hpjlbj.png'),
        require('./assets/img/yqhy.png'),
        require('./assets/img/mxhpIndex.png'),
        require('./assets/img/info1.png'),
        require('./assets/img/jzhp.png'),
        require('./assets/img/mxhp.png'),
        require('./assets/img/hpjlfx.png'),
        require('./assets/img/mxhpbj.png'),
        require('./assets/img/bgC.png'),
        require('./assets/img/hpbgHeader.png'),
        require('./assets/img/yuanfenzhishubeijin.png'),
        require('./assets/img/wenzibj.png'),
        require('./assets/img/hpbgbj.png'),
        require('./assets/img/hpbgbj1.png'),
        require('./assets/img/srdfzl.png'),
        require('./assets/img/jzhp1.png'),
        require('./assets/img/hkhp.png')
      ]
    };
  },
  mounted() {
    let _this = this;
    let isLoadingImg = localStorage.getItem('isLoadedImg');
    _this.loadingImg();
    if (isLoadingImg === 'true') {
    } else {
      _this.loadingImg();
    }
  },
  methods: {
    loadingImg() {
      preloadimages(this.imgArr).done(function (img) {
        localStorage.setItem('isLoadedImg', true);
      });
    }
  }
};
</script>

<style lang='scss'>
input:disabled,
input[disabled] {
  -webkit-opacity: 1;
  opacity: 1;
  color: #fff;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
