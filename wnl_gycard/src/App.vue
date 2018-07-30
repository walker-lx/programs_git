<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import util from "./plugin/util";
export default {
  name: 'App',
  data() {
  	return {
  		isPlaying: false,
      iosPlayFlag: false
  	}
  },
  mounted: function() {
    const script = document.createElement('script')
    script.src = 'https://s19.cnzz.com/z_stat.php?id=1273778918&web_id=1273778918'
    script.language = 'JavaScript'
    document.body.appendChild(script)
  },
  watch: {
    '$route' () {
      if (window._czc) {
        let location = window.location
        let contentUrl = location.pathname + location.hash
        let refererUrl = '/'
        window._czc.push(['_trackPageview', contentUrl, refererUrl])
      }
    }
  }
}
</script>

<style>
@import "./assets/style.css";
</style>
