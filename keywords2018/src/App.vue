<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
import index from './components/main'
export default {
	name: 'app',
	components: {
		index
	}
}
</script>

<style>
@import url('../static/reset.css');
#app {
  font-family: -apple-system, "SF Pro SC", "HanHei SC", "SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Apple Legacy Chevron", "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@font-face {
	font-family: 'text';
	src: url('./assets/text.ttf');
}
</style>
