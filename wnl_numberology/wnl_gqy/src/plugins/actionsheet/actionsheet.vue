<template>
	<transition name="actionsheet-float">
		<div v-show="currentValue" class="mint-actionsheet">
			<div class="mint-actionsheet-title" v-if="actionsheetTitle">{{actionsheetTitle}}</div>
			<ul class="mint-actionsheet-list" :style="{ 'margin-bottom': cancelText ? '5px' : '0' }">
				<li v-for="item in actions" class="mint-actionsheet-listitem" @click="itemClick(item)">{{ item.name }}</li>
			</ul>
			<a class="mint-actionsheet-button" @click="currentValue = false" v-if="cancelText">{{ cancelText }}</a>
		</div>
	</transition>
</template>

<style>
	.mint-actionsheet {
		position: fixed;
		background: #e0e0e0;
		width: 100%;
		text-align: center;
		bottom: 0;
		left: 50%;
		-webkit-transform: translate3d(-50%, 0, 0);
				transform: translate3d(-50%, 0, 0);
		-webkit-backface-visibility: hidden;
				backface-visibility: hidden;
		-webkit-transition: -webkit-transform .3s ease-out;
		transition: -webkit-transform .3s ease-out;
		transition: transform .3s ease-out;
		transition: transform .3s ease-out, -webkit-transform .3s ease-out;
	}
	.mint-actionsheet-title{
		display: block;
		width: 100%;
		height: 45px;
		line-height: 45px;
		font-size: 15px;
		color: #333;
		background-color: #fff;
		border-bottom: solid 1px #e0e0e0;
	}
	.mint-actionsheet-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.mint-actionsheet-listitem {
		border-bottom: solid 1px #e0e0e0;
	}
	.mint-actionsheet-listitem, .mint-actionsheet-button {
		display: block;
		width: 100%;
		height: 45px;
		line-height: 45px;
		font-size: 18px;
		color: #333;
		background-color: #fff;
	}
	.mint-actionsheet-listitem:active, .mint-actionsheet-button:active {
		background-color: #f0f0f0;
	}
	.actionsheet-float-enter, .actionsheet-float-leave-active {
		-webkit-transform: translate3d(-50%, 100%, 0);
				transform: translate3d(-50%, 100%, 0);
	}
	.v-modal-enter {
		-webkit-animation: v-modal-in .2s ease;
				animation: v-modal-in .2s ease;
	}
	.v-modal-leave {
		-webkit-animation: v-modal-out .2s ease forwards;
				animation: v-modal-out .2s ease forwards;
	}
	@-webkit-keyframes v-modal-in {
		0% {
			opacity: 0;
		}
		100% {
	}
	}
	@keyframes v-modal-in {
		0% {
			opacity: 0;
		}
		100% {}
	}
	@-webkit-keyframes v-modal-out {
		0% {
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes v-modal-out {
		0% {
		}
		100% {
			opacity: 0;
		}
	}
	.v-modal {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0.5;
		background: #000;
	}
</style>

<script type="text/babel">
	import Popup from '../popup/index';
	export default {
		name: 'actionsheet',
		mixins: [Popup],
		props: {
			modal: {
				default: true
			},
			modalFade: {
				default: false
			},
			lockScroll: {
				default: false
			},
			closeOnClickModal: {
				default: true
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			actionsheetTitle: {
				type: String,
				default: ''
			},
			actions: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				currentValue: false
			};
		},
		watch: {
			currentValue(val) {
				this.$emit('input', val);
			},
			value(val) {
				this.currentValue = val;
			}
		},
		methods: {
			itemClick(item) {
				if (item.method && typeof item.method === 'function') {
					item.method();
				}
				this.currentValue = false;
			}
		},
		mounted() {
			if (this.value) {
				this.rendered = true;
				this.currentValue = true;
				this.open();
			}
		}
	};
</script>