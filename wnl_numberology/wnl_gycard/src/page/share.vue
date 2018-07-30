<template>
    <div class="sharePage">
        <div class="shareImg">
            <img :src="shareImg" v-touch:long="handleLongTouch">
        </div>
    </div>
</template>

<script>
import 'babel-polyfill';
import util from "../plugin/util";
export default {
  name: 'Share',
  data () {
    return {
        shareImg: ''
    }
  },
  mounted: function() {
    console.log(this.$route.params.shareSrc);
    this.shareImg = 'https://qiniu.image.cq-wnl.com/' + this.$route.params.shareSrc;
  },
  methods: {
    handleLongTouch: function() {
        _czc.push(['_trackEvent', 'LDJ2018_pressShare_wx', 'press']);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
