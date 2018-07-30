<template>
	<transition name="mint-indicator">
		<div class="mint-indicator" v-show="visible">
			<div class="mint-indicator-wrapper" :style="{ 'padding': text ? '20px' : '15px' }">
				
				<span class="mint-indicator-text" v-show="text">{{ text }}</span>
			</div>
			<div class="mint-indicator-mask" @touchmove.stop.prevent></div>
		</div>
	</transition>
</template>

<style>
	.mint-indicator {
		-webkit-transition: opacity .2s linear;
		transition: opacity .2s linear;
	}
	.mint-indicator-wrapper {
		top: 50%;
		left: 50%;
		position: fixed;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		border-radius: 5px;
		background: rgba(0, 0, 0, 0.7);
		color: white;
		box-sizing: border-box;
		text-align: center;
	}
	.mint-indicator-text {
		display: block;
		color: #fff;
		text-align: center;
		margin-top: 10px;
		font-size: 16px;
	}
	.mint-indicator-spin {
		display: inline-block;
		text-align: center;
	}
	.mint-indicator-mask {
		top: 0;
		left: 0;
		position: fixed;
		width: 100%;
		height: 100%;
		opacity: 0;
		background: transparent;
	}
	.mint-indicator-enter,
	.mint-indicator-leave-active {
		opacity: 0;
	}
</style>

<script>
	export default {
		data() {
			return {
				visible: false
			};
		},
		props: {
			text: String
		}
	};
</script>