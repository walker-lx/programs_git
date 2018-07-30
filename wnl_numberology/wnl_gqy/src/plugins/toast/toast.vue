<template>
	<transition name="toast-fade">
		<div transition="toast-fade" class="toast_txt" v-show="visible" :style="{marginLeft:'-'+toastWidth/2+'px'}">{{message}}</div>
	</transition>
</template>
<script>
	export default {
		props: {
			message: String,
			toastWidth:{
				type:Number,
				default:100
			}
		},
		data() {
			return {
				visible: false
			};
		}
	};

</script>
<style>
	.toast_txt {
		position: fixed;
		bottom: 20px;
		left: 50%;
		height: 30px;
		line-height: 30px;
		background-color: #000000;
		color: #ffffff;
		text-align: center;
		opacity: 0.8;
		border-radius: 10px;
		font-size: 14px;
		font-weight: 500;
		padding: 0 10px;
		z-index: 9999;
		/*The good stuff */
		-webkit-transition: opacity 0.5s ease-out;
		/* Saf3.2+, Chrome */
		-moz-transition: opacity 0.5s ease-out;
		/* FF4+ */
		-ms-transition: opacity 0.5s ease-out;
		/* IE10? */
		-o-transition: opacity 0.5s ease-out;
		/* Opera 10.5+ */
		transition: opacity 0.5s ease-out;
	}
	.toast-fade-enter,
	.toast-fade-leave-active {
		opacity: 0;
	}
	.temp_toast_txt{
		opacity: 0;
		height: 0;
		font-size: 16px; 
		font-weight: 500; 
		padding: 0 10px; 
		visibility: hidden; 
		white-space: nowrap;
	}
</style>