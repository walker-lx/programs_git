<template>
	<div class="content">
		<top v-show="showtop"></top>
		<div class="index" v-show="indexshow">
			<div class="mask" v-show="maskshow"></div>
			<div class="indextext">
				<div class="jm">揭秘你的2018</div>
				<div class="time">专属</div>
				<!-- <div class="will">即将到来</div> -->
				<img class="keys" src="../../static/img/gjc.png"></img>
			</div>
			<div class="indexgif"></div>
			<div class="jmclick" ref="jmclick">
				<img v-show="beforejm" src="../../static/img/jm1.png" @click="jmclick"></img>
				<img v-show="afterjm" src="../../static/img/jm2.png"></img>
			</div>
			<!-- <button @click="sharebtn">揭秘</button> -->
			<!-- <div class="wnlicon">
				<img src="../../static/img/icon.png" alt="">
			</div> -->
		</div>
		<div class="transition" v-show="transitionshow">
			<div class="label">
				<canvas id="label" :width="labelwidth" :height="labelheight"></canvas>
			</div>
			<div class="spanning">正在揭秘...</div>
		</div>
		<div class="result" v-show="resultshow">
			<div class="result-img">
				<!-- <img src="../../static/img/gb.png" alt=""> -->
				<img alt="" v-for="item in imglist" :src="'https://b.cqyouloft.com/yuandan2018/static/img/img' + item.id + '.png'" v-show="item.showimg">
			</div>
			<div class="qr">
				<img src="../../static/img/qr1.png" alt="">
			</div>
			<div class="btn">
				<div class="share" ref="share" @click="shareclick">
					<img src="../../static/img/djfx1.png" alt="" v-show="beforeshare" >
					<img src="../../static/img/djfx2.png" alt="" v-show="aftershare">
				</div>
				<div class="again">
					<img src="../../static/img/hc1.png" alt="" v-show="beforehc" @click="hcclick">
					<img src="../../static/img/hc2.png" alt="" v-show="afterhc" @click="hcclick">
				</div>
			</div>
			<div class="wxguide" v-show="showguide" @click="hideguide">
				<img src="../../static/img/guide.png" alt="">
			</div>
		</div>
		<div class="resultimg" v-show="showresultimg">
			<img :src="resultimgsrc" alt="" class="pic">
		</div>
	</div>
</template>

<script>
// import Vue from 'vue'
import self from '../assets/self/self.js'
import Base64 from 'js-base64'
import browser from '../assets/utils/browser.js'
import getparam from '../assets/utils/getparam.js'
// import Toast from 'vue2-toast'
import Bezier from '../assets/utils/bezier'
import top from './top'
import 'vue2-toast/lib/toast.css'
import $ from 'jquery'

let resultarr = ['爱情甜蜜', '坚持', '健康', '开心', '财源广进', '改变', '贵人相助', '旅行', '忙', '升职加薪', '无所畏惧']
let num
let wxNickName = ''
let name = '我'
let resultsrc
let wnltype, wxtype
if (browser.isWnl()) {
	if (browser.isIOS()) {
		wnltype = 'wni_ios'
	}
	else if (browser.isAndroid()) {
		wnltype = 'wni_az'
	}
}
if (browser.isWx()) {
	if (browser.isIOS()) {
		wxtype = 'wx_ios'
	}
	else if (browser.isAndroid()) {
		wxtype = 'wx_az'
	}
}

export default {
	data () {
		return {
			indexshow: true,
			transitionshow: false,
			resultshow: false,
			username: '',
			showresultimg: false,
			ctxwidth: 0,
			ctxheight: 0,
			resultimgsrc: '',
			labelwidth: 0,
			labelheight: 0,
			resultvalue: '',
			wx: '',
			beforejm: true,
			afterjm: false,
			beforeshare: true,
			aftershare: false,
			beforehc: true,
			afterhc: false,
			imglist: [],
			maskshow: false,
			sharemask: false,
			sharetool: false,
			showguide: false,
			showtop: true,
			name: '我',
			text: ''
		}
	},
	components: {
		top
	},
	created () {
		//设置分享
		self.wnlui.wnlShare.setShareData({
			title: '快来这里，揭秘你的2018专属关键词',
			text: '查看你的专属关键词，赶紧点击我！',
			image: 'https://b.cqyouloft.com/yuandan2018/img/shareicon.jpg',
			url: 'https://b.cqyouloft.com/yuandan2018/index.html'
		});
		// window.wnlui.wnlShare.showSharePlatform();
		self.wnlui.wxShare({
			title: '快来这里，揭秘你的2018专属关键词',
			text: '查看你的专属关键词，赶紧点击我！',
			imgUrl: 'https://b.cqyouloft.com/yuandan2018/img/shareicon.jpg',
			url: 'https://b.cqyouloft.com/yuandan2018/index.html'
		});
		if (browser.isWx()) {
			let openid = getparam('openid')
			if (openid) {
				this.maskshow = false
				wxNickName = getparam('nickname') || '我'
				name = wxNickName.length > 4 ? wxNickName.slice(0, 4) : wxNickName
				// console.log('已获取到信息')
			}
			else {
				this.maskshow = true
				location.href = 'https://b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + encodeURIComponent(window.location.href)
			}
		}
		for (let i = 0; i < 12; i++) {
			this.imglist.push({ showimg: false, id: i })
		}
	},
	mounted () {
		// console.log(window.wnlui.wnlShare)
		this.$nextTick(function () {
			this.ctxwidth = document.body.offsetWidth
			this.ctxheight = document.body.offsetHeight
			// console.log(document.body.offsetWidth)
			// console.log(document.body.offsetHeight)
			this.labelwidth = this.ctxwidth
			this.labelheight = this.ctxheight - 200
			if (getparam('share')) {
				this.drawResultPage(parseInt(getparam('num')), decodeURIComponent(getparam('name')))
				this.indexshow = false
				this.transitionshow = false
				this.resultshow = false
				setTimeout(() => {
					this.showresultimg = true
				}, 2400);
				_czc.push(['_trackEvent', 'yuandan2018openshare' + wnltype, 'show']) //eslint-disable-line
				_czc.push(['_trackEvent', 'yuandan2018openshare' + wxtype, 'show']) //eslint-disable-line
			}
		})
		_czc.push(['_trackEvent', 'yuandan2018showindex' + wnltype, 'show']) //eslint-disable-line
		_czc.push(['_trackEvent', 'yuandan2018showindex' + wxtype, 'show']) //eslint-disable-line
	},
	methods: {
		canvasResultTitle (ctx, str, initx, inity, color) {
			let strwidth = 0
			let strleft
			ctx.beginPath()
			ctx.shadowColor = 0
			ctx.shadowBlur = 0
			ctx.shadowOffsetX = 0
			ctx.shadowOffsetY = 0
			ctx.font = '600 normal 18px "PingFangSC"'
			ctx.fillStyle = color || 'black'
			for (let i = 0, len = str.length; i < len; i++) {
				strwidth = strwidth + ctx.measureText(str[i]).width
			}
			// strwidth = strwidth + str.length - 1
			strleft = (this.ctxwidth - strwidth) / 2 + 6
			ctx.fillText(str, strleft, inity)
			ctx.closePath()
		},
		canvasResultText (ctx, str, inity, fontweight, fontsize, font, color, initx) {
			let strwidth = 0
			let strleft
			ctx.beginPath()
			ctx.font = fontweight + ' normal ' + fontsize + ' ' + font
			ctx.fillStyle = color || 'black'
			for (let i = 0, len = str.length; i < len; i++) {
				strwidth = strwidth + ctx.measureText(str[i]).width
			}
			strleft = (this.ctxwidth - strwidth) / 2
			// ctx.fillText(str, strleft, inity)
			initx = initx || strleft
			ctx.fillText(str, initx, inity)
			ctx.closePath()
		},
		getRandomy () {
			let y = Math.floor(Math.random() * this.labelheight + 40)
			if (y >= this.labelheight - 10) {
				y = this.labelheight - 60
			}
			return y
		},
		transitionAnimate () {
			let that = this
			let ctx = document.getElementById('label')
			let canvas = ctx.getContext('2d')
			let w = this.labelwidth - 60
			let h = this.labelheight
			let p1 = { x: 20, y: 50 }
			let p2 = { x: 50, y: 90 }
			let p3 = { x: 160, y: 170 }
			let p4 = { x: 230, y: 60 }
			let p5 = { x: 40, y: 30 }
			new Bezier({
				points: [p1, p2, p3, p4, p5],
				frame: function () {
					canvas.clearRect(0, 0, w + 120, h)
					that.canvasResultText(canvas, '自由', that.getRandomy(), 500, '20px', 'text', '#8c2f03', Math.floor(Math.random() * w))
					that.canvasResultText(canvas, '健康', that.getRandomy(), 500, '40px', 'text', '#8c2f03', Math.floor(Math.random() * w))
					that.canvasResultText(canvas, '旅行', that.getRandomy(), 500, '18.15px', 'text', '#8c2f03', Math.floor(Math.random() * w))
					that.canvasResultText(canvas, '爱情甜蜜', that.getRandomy(), 700, '27.5px', 'text', '#8c2f03', Math.floor(Math.random() * w))
					that.canvasResultText(canvas, '升职加薪', that.getRandomy(), 600, '30px', 'text', '#8c2f03', Math.floor(Math.random() * w))
					that.canvasResultText(canvas, '财源广进', that.getRandomy(), 600, '28.5px', 'text', '#8c2f03', Math.floor(Math.random() * w))
					that.canvasResultText(canvas, '无所畏惧', that.getRandomy(), 600, '25px', 'text', '#8c2f03', Math.floor(Math.random() * w))
					that.canvasResultText(canvas, '忙', that.getRandomy(), 600, '35px', 'text', '#8c2f03', Math.floor(Math.random() * w))
					that.canvasResultText(canvas, '坚持', that.getRandomy(), 600, '20px', 'text', '#8c2f03', Math.floor(Math.random() * w))
					that.canvasResultText(canvas, '贵人相助', that.getRandomy(), 600, '27.5px', 'text', '#8c2f03', Math.floor(Math.random() * w))
					that.canvasResultText(canvas, '改变', that.getRandomy(), 600, '22.5px', 'text', '#8c2f03', Math.floor(Math.random() * w))
					that.canvasResultText(canvas, '开心', that.getRandomy(), 600, '25.1px', 'text', '#8c2f03', Math.floor(Math.random() * w))
				},
				duration: 2250
			})
			setTimeout(() => {
				this.transitionshow = false
				this.resultshow = true
				_czc.push(['_trackEvent', 'yuandan2018showresult' + wnltype, 'show']) //eslint-disable-line
				_czc.push(['_trackEvent', 'yuandan2018showresult' + wxtype, 'show']) //eslint-disable-line
			}, 2200)
		},
		drawImg (ctx, imgsrc, w, h, y, x) {
			let img = new Image()
			let xzb = (this.ctxwidth - w) / 2
			let x1 = x || xzb
			// let height = this.ctxheight
			img.onload = function () {
				ctx.beginPath()
				ctx.drawImage(img, x1, y, w, h)
				ctx.closePath()
			}
			img.src = imgsrc
		},
		drawResultPage (n, username) {
			let that = this
			let randomn = n || num
			let nickname = username || name
			let ctx = document.createElement('canvas')
			let canvas = ctx.getContext('2d')
			ctx.width = document.body.offsetWidth * 3 || that.ctxwidth * 3
			ctx.height = document.body.offsetHeight * 3 || that.ctxheight * 3
			// ctx.height = 1000 * 3
			canvas.scale(3, 3)
			canvas.fillStyle = '#fff'
			canvas.fillRect(0, 0, this.ctxwidth, this.ctxheight)
			this.drawImg(canvas, 'https://b.cqyouloft.com/yuandan2018/img/bj.png', that.ctxwidth, that.ctxheight, 0, 0)
			setTimeout(() => {
				that.canvasResultTitle(canvas, nickname + '的年度关键词为', 0, 30, '#c12c04')
			}, 1300);
			setTimeout(() => {
				if (that.ctxheight <= 485) {
					that.drawImg(canvas, 'https://b.cqyouloft.com/yuandan2018/img/img' + randomn + '.png', that.ctxwidth * 0.68, that.ctxwidth * 0.68 * 1.52, 50, ((that.ctxwidth - that.ctxwidth * 0.68) / 2) - 20)
				}
				else {
					that.drawImg(canvas, 'https://b.cqyouloft.com/yuandan2018/img/img' + randomn + '.png', that.ctxwidth * 0.744, that.ctxwidth * 0.744 * 1.52, 50, ((that.ctxwidth - that.ctxwidth * 0.744) / 2) - 20)
				}
			}, 200);
			setTimeout(() => {
				that.drawImg(canvas, 'https://b.cqyouloft.com/yuandan2018/img/icon.png', 30, 30, 19, 10)
				that.drawImg(canvas, 'https://b.cqyouloft.com/yuandan2018/img/qr.png', that.ctxwidth * 0.744, that.ctxwidth * 0.744 * 0.3, that.ctxheight * 0.84)
			}, 400);
			setTimeout(() => {
				let imgsrc = ctx.toDataURL('image/jpeg', 0.6)
				that.resultimgsrc = imgsrc
				this.geturl(imgsrc)
			}, 2000);
		},
		//base64图片转换
		geturl (imgsrc) {
			$.ajax({
				url: '//msg.51wnl.com/index.php/Asset/ImageLoader/ltt',
				dataType: 'JSON',
				type: 'POST',
				data: {
					'img': imgsrc
				},
				success: function (res) {
					resultsrc = res.data.url
					self.wnlui.wnlShare.setShareData({
						image: resultsrc
					});
				}
			})
		},
		jmclick () {
			let that = this
			this.beforejm = false
			this.afterjm = true
			num = Math.floor(Math.random() * 11)
			for (let i = 0; i < 11; i++) {
				if (i === num) {
					this.imglist[i].showimg = true
				}
				else {
					this.imglist[i].showimg = false
				}
			}
			// this.text = resultarr[num]
			this.drawResultPage()
			this.indexshow = false
			this.transitionshow = true
			this.transitionAnimate()
			self.wnlui.wxShare({
				title: '我的2018专属关键词是“' + resultarr[num] + '”，你的呢？',
				text: '新的一年，揭秘你的专属关键词',
				imgUrl: 'https://b.cqyouloft.com/yuandan2018/img/shareicon.jpg',
				url: 'https://b.cqyouloft.com/yuandan2018/index.html?share=1&num=' + num + '&name=' + encodeURIComponent(name),
				callback: () => {
					that.showguide = false
				}
			});
			if (browser.isWnl()) {
				name = '我'
				// setTimeout(() => {
				window.location.href = 'protocol://getuserinfo#userinfocallback'
				window.userinfocallback = function (rel) {
					let data = Base64.Base64.decode(rel)
					data = JSON.parse(data)
					if (data.native_usercenter.name) {
						let username = data.native_usercenter.name || data.native_usercenter.nickname
						name = username.length > 4 ? username.slice(0, 4) : username
					}
					else {
						name = '我'
					}
				}
				// }, 5000);
			}
			else {
				// name = '我'
			}
			_czc.push(['_trackEvent', 'yuandan2018clickjm' + wnltype, 'click']) //eslint-disable-line
			_czc.push(['_trackEvent', 'yuandan2018clickjm' + wxtype, 'click']) //eslint-disable-line
		},
		shareclick () {
			if (browser.isWnl()) {
				self.wnlui.wnlShare.showSharePlatform();
			}
			if (browser.isWx()) {
				this.showguide = true
			}
			this.beforeshare = false
			this.aftershare = true
			// this.resultshow = false
			// this.showresultimg = true
			this.$refs.share.className = 'share'
			_czc.push(['_trackEvent', 'yuandan2018clickshare' + wnltype, 'click']) //eslint-disable-line
			_czc.push(['_trackEvent', 'yuandan2018clickshare' + wxtype, 'click']) //eslint-disable-line
		},
		hideguide () {
			this.showguide = false
		},
		hcclick () {
			let that = this
			this.beforehc = false
			this.afterhc = true
			num = Math.floor(Math.random() * 11)
			self.wnlui.wxShare({
				title: '我的2018专属关键词是“' + resultarr[num] + '”，你的呢？',
				text: '新的一年，揭秘你的专属关键词',
				imgUrl: 'https://b.cqyouloft.com/yuandan2018/img/shareicon.jpg',
				url: 'https://b.cqyouloft.com/yuandan2018/index.html?share=1&num=' + num + '&name=' + encodeURIComponent(name),
				callback: () => {
					that.showguide = false
				}
			});
			this.text = resultarr[num]
			this.drawResultPage()
			setTimeout(() => {
				for (let i = 0; i < 11; i++) {
					if (i === num) {
						this.imglist[i].showimg = true
					}
					else {
						this.imglist[i].showimg = false
					}
				}
				this.beforeshare = true
				this.aftershare = false
				this.resultshow = false
				this.transitionshow = true
				this.transitionAnimate()
			}, 200);
			_czc.push(['_trackEvent', 'yuandan2018showhc' + wnltype, 'click']) //eslint-disable-line
			_czc.push(['_trackEvent', 'yuandan2018showhc' + wxtype, 'click']) //eslint-disable-line
		}
	}
}
</script>

<style lang="scss">
.content {
	width: 100vw;
	height: 100vh;
	// text-align: center;
	overflow: hidden;
	.resultimg {
		position: relative;
		.pic {
			width: 100%;
			height: 100%;
		}
	}
	.hidden {
		display: none !important;
	}
	.index {
		width: 100%;
		height: 100%;
		padding-top: 14px;
		background-image: linear-gradient(354deg, #f3d2b7, #fbecd6), linear-gradient(#fbecd6, #fbecd6);
		@media screen and (min-width: 414px) {
			padding-top: 86px;
		}
		.mask {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #fff;
			z-index: 9999;
		}
		.indextext {
			text-align: center;
			font-family: 'text';
			font-size: 22.5px;
			color: #fc9503;
			.time {
				font-size: 36px;
				animation: time-slide 1s ease-out;
				@keyframes time-slide {
					0% {
						transform: translate3d(-160%, 0, 0);
					}
					100% {
						transform: translate3d(0, 0, 0);
					}
				}
			}
			// .will {
			// 	animation: will-slide .7s ease-out;
			// 	@keyframes will-slide {
			// 		0% {
			// 			transform: translate3d(-100%, 0, 0);
			// 		}
			// 		100% {
			// 			transform: translate3d(0, 0, 0);
			// 		}
			// 	}
			// }
			.jm {
				font-size: 35px;
				animation: jm-slide .4s ease-out;
				@keyframes jm-slide {
					0% {
						transform: translate3d(-100%, 0, 0);
					}
					100% {
						transform: translate3d(0, 0, 0);
					}
				}
			}
			.keys {
				display: block;
				width: 300px;
				height: 99px;
				margin: 10.5px auto;
				animation: keys-slide 1.4s ease-out;
				@keyframes keys-slide {
					0% {
						transform: translate3d(-1000px, 0, 0);
					}
					100% {
						transform: translate3d(0, 0, 0);
					}
				}
				@media screen and (device-height: 480px) {
					width: 230.3px;
					height: 76px;
					margin: 5px auto;
				}
			}
		}
		.indexgif {
			width: 320px;
			height: 227.2px;
			margin: 19.5px auto 0;
			background-image: url('../../static/img/index.gif');
			background-repeat: no-repeat;
			background-size: 320px 227.2px;
			@media screen and (max-width: 355px) {
				width: 280px;
				height: 199px;
				background-size: 280px 199px;
			}
			@media screen and (device-height: 480px) {
				margin: 6px auto 0;
				width: 260px;
				height: 184.6px;
				background-size: 260px 184.6px;
			}
		}
		.jmclick {
			width: 188px;
			height: 59.5px;
			margin: 6.75px auto 0;
			animation: jm 1.6s ease-out;
			@keyframes jm {
				from {
					transform: translate3d(-1400px, 0, 0)
				}
				to {
					transform: translate3d(0, 0, 0)
				}
			}
			@media screen and (device-height: 480px) {
				margin: 4px auto 0;
			}
			img {
				width: 188px;
				height: 59.5px;
				// animation: jmflash .4s 1.8s ease-in-out;
				// @keyframes jmflash {
				// 	0% {
				// 		opacity: 0;
				// 	}
				// 	100% {
				// 		opacity: 1;
				// 	}
				// }
				@media screen and (max-width: 355px) {
					width: 125.96px;
					height: 39.865px;
				}
			}
			@media screen and (max-width: 355px) {
				width: 125.96px;
				height: 39.865px;
			}
		}
		// .wnlicon {
		// 	width: 30px;
		// 	height: 30px;
		// 	margin: 20px auto;
		// 	display: flex;
		// 	justify-content: center;
		// 	img {
		// 		width: 30px;
		// 		height: 30px;
		// 	}
		// 	@media screen and (device-height: 480px) {
		// 		margin: 6px auto;
		// 	}
		// }
	}
	.transition {
		width: 100%;
		height: 100%;
		padding-top: 40px;
		background-image: url('../../static/img/bj.png');
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: 100% 100%;
		transition: all .8s;
		.spanning {
			text-align: center;
			margin-top: 50px;
			color: #8c2f03;
			font-size: 18.15px;
			letter-spacing: 0.4px;
			@media screen and (max-width: 355px) {
				font-size: 12.16px;
			}
		}
	}
	.result {
		width: 100%;
		height: 100%;
		background-image: url('../../static/img/bj.png');
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: 100% calc(100vh + 64px);
		background-position: 50% -64px;
		transition: all .7s;
		text-align: center;
		padding-top: 5px;
		@media screen and (min-width: 414px) {
			padding-top: 65px;
		}
		.result-img {
			width: 270px;
			height: 410px;
			margin: 0 auto 0 28px;
			@media screen and (max-width: 355px) {
				width: 223.2px;
				height: 339.2px;
				margin: 0 auto 0 30px;
			}
			@media screen and (device-width: 360px) {
				// width: 223.2px;
				// height: 339.2px;
				margin: 0 auto 0 20px;
			}
			@media screen and (min-width: 412px) {
				margin: 0 auto 0 49px;
			}
			img {
				width: 270px;
				height: 410px;
				@media screen and (max-width: 355px) {
					width: 223.2px;
					height: 339.2px;
				}
			}
		}
		.qr {
			width: 60px;
			height: 60px;
			margin: 0 auto;
			img {
				width: 60px;
				height: 60px;
			}
		}
		.wxguide {
			position: fixed;
			width: 100vw;
			height: 100vh;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, .3);
			img {
				margin-left: 88px;
				margin-top: 30px;
			}
		}
		.btn {
			padding: 0;
			text-align: center;
			// display: flex;
			// justify-content: center;
			// width: 99%;
			margin: 4px auto;
			img {
				width: 151px;
				height: 58.9px;
				@media screen and (max-width: 355px) {
					width: 125.6px;
					height: 49px;
				}
			}
			.share, .again {
				display: inline-block;
				// margin-left: -25px;
				width: 151px;
				height: 58.9px;
				text-align: center;
				@media screen and (max-width: 355px) {
					width: 125.6px;
					height: 49px;
				}
			}
			// .again {
			// 	float: right;
			// }
			.share {
				&.flash {
					// float: left;
					animation: flash .5s infinite ease-in-out;
					@keyframes flash {
						0% {
							opacity: 0;
						}
						66% {
							opacity: 0.6;
						}
						100% {
							opacity: 1;
						}
					}
				}
			}
		}
	}
	@media screen and (device-height: 480px) {

	}
}
</style>


