<template>
	<div class="top" v-show="showtop">
		<img src="../../static/img/icon.png" alt="" class="icon" v-show="showicon">
		<audio src="../assets/bg.mp3" ref="music" id="audio" autoplay="autoplay" loop="loop"></audio>
		<img v-show="pause" src="../../static/img/yy.png" alt="" class="musicicon circle" @click="pausemusic">
		<img v-show="play"src="../../static/img/yy1.png" alt="" class="musicicon" @click="playmusic">
	</div>
</template>

<script>
import getparam from '../assets/utils/getparam'
import '../assets/utils/autoplay.js'
export default {
	data () {
		return {
			pause: true,
			play: false,
			showicon: true,
			showtop: true
		}
	},
	mounted () {
		if (getparam('share')) {
			this.showtop = false
			setTimeout(() => {
				this.showtop = true
				this.showicon = false
			}, 1700);
		}
		// else {
		// 	console.log('play')
		// }
	},
	methods: {
		pausemusic () {
			this.$refs.music.pause()
			this.pause = false
			this.play = true
		},
		playmusic () {
			this.$refs.music.play()
			this.pause = true
			this.play = false
		}
	}
}
</script>

<style lang="scss">
.top {
	position: absolute;
	top: 10px;
	left: 0;
	width: 100%;
	height: 50px;
	line-height: 40px;
	z-index: 99;
	.icon {
		width: 30px;
		height: 30px;
		margin-top: 9px;
		margin-left: 10px;
	}
	.musicicon {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 30px;
		height: 30px;
		z-index: 10;
		&.circle {
			animation: circle 2s infinite linear;
		}
		@keyframes circle {
			0% {
				transform: rotate(0)
			}
			100% {
				transform: rotate(1turn)
			}
		}
	}
}
</style>

