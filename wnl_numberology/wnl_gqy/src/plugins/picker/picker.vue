<template>
	<transition name="actionsheet-float">
		<div v-show="currentValue" class="picker_vue">
			<div class="weui-picker__hd">
				<a href="javascript:;" data-action="cancel" class="weui-picker__action" @click="handleClose(onCancel)">{{headActions[0].label}}</a>
				<a href="javascript:;" data-action="select" class="weui-picker__action" id="weui-picker-confirm" @click="handleClose(handleChanges)">{{headActions[1].label}}</a>
			</div>
			<div class="weui-picker__bd">
				<pickerGroup v-for="(group, i) in groups" :key="i" :items="group.items" :onChange="handleChange" :groupIndex="i" :defaultIndex="selectedArray[i]"></pickerGroup>
			</div>
		</div>
	</transition>
</template>

<script>
	import Popup from '../popup/index';
	import pickerGroup from '../picker_group';
	export default {
		name: 'picker',
		components: {
			pickerGroup
		},
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
			/**
			 * consists of array of object(max 2) with property `label` and others pass into element
			 *
			 */
			actions: {
				type: Array,
				default: []
			},
			/**
			 * array objects consists of groups for each scroll group
			 *
			 */
			groups: Array,
			/**
			 * default group index thats selected, if not provide, automatic chose the best fiting item when mounted
			 *
			 */
			defaultSelect: Array,
			/**
			 * on selected change, pass property `selected` for array of slected index to `groups`
			 *
			 */
			onChange: Function,
			/**
			 * trigger when individual group change, pass property(`item`, `item index in group`, `group index in groups`, `selected`, `picker instance`)
			 *
			 */
			onGroupChange: Function,
			onCancel: Function,
			onConfirm: Function
		},
		data() {
			return {
				currentValue: false,
				selectedArray: this.defaultSelect ? this.defaultSelect : Array(this.groups.length).fill(-1),
				headActions: this.actions.length > 0 ? this.actions : [{
						label: '取消'
					},
					{
						label: '确认'
					}
				]
			};
		},
		mounted() {
			if (this.value) {
				this.rendered = true;
				this.currentValue = true;
				this.open();
			}
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
			handleClose(cb) {
				this.currentValue = false;
				setTimeout(() => {
					if (cb) cb();
				}, 300);
			},
			handleChanges() {
				this.handleClose(() => {
					if (this.onConfirm) this.onConfirm(this.selectedArray, this);
				});
			},
			handleChange(item, i, groupIndex) {
				this.selectedArray[groupIndex] = i;
				this.$nextTick(() => {
					if (this.onGroupChange) this.onGroupChange(item, i, groupIndex, this.selectedArray, this);
				});
			}
		}
	};
</script>

<style>
	.picker_vue {
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
	.weui-picker__hd {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		padding: 10px 15px;
		background-color: #fbf9fe;
		position: relative;
		text-align: center;
	}
	.weui-picker__action {
		display: block;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		color: #586C94;
	}
	.weui-picker__action:first-child {
		text-align: left;
	}
	.weui-picker__action:last-child {
		text-align: right;
	}
	.weui-picker__hd:after {
		content: " ";
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid #E5E5E5;
		color: #E5E5E5;
		-webkit-transform-origin: 0 100%;
		transform-origin: 0 100%;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}
	.weui-picker__bd {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		position: relative;
		background-color: #fff;
		height: 238px;
		overflow: hidden;
	}
	.actionsheet-float-enter,
	.actionsheet-float-leave-active {
		-webkit-transform: translate3d(-50%, 100%, 0);
		transform: translate3d(-50%, 100%, 0);
	}
</style>
<style src="../popup/popup.css" scoped></style>