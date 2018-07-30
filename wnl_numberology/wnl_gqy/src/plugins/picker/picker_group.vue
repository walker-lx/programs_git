<template>
	<div class="weui-picker__group" @touchstart="handleTouchStart($event)" @touchmove="handleTouchMove($event)" @touchend="handleTouchEnd($event)">
		<div class="weui-picker__mask"></div>
		<div class="weui-picker__indicator"></div>
		<div class="weui-picker__content" :style="{transform:'translate(0, '+translate+'px)',transition:animating ? 'transform .3s' : 'none'}">
			<div v-for="item in items" class="weui-picker__item">{{item.label}}</div>
			<!--<div class="weui-picker__item">火车票</div>
			<div class="weui-picker__item">的士票</div>
			<div class="weui-picker__item weui-picker__item_disabled">公交票 (disabled)</div>
			<div class="weui-picker__item">其他</div>-->
		</div>
	</div>
</template>
<script>
	export default {
		name: 'picker_group',
		props: {
			items: {
				type: Array,
				default: []
			},
			height: {
				type: Number,
				default: 238
			},
			itemHeight: {
				type: Number,
				default: 34
			},
			indicatorTop: {
				type: Number,
				default: 102
			},
			indicatorHeight: {
				type: Number,
				default: 34
			},
			onChange: {
				type: Function
			},
			aniamtion: {
				type: Boolean,
				default: true
			},
			groupIndex: {
				type: Number,
				default: -1
			},
			defaultIndex: {
				type: Number,
				default: -1
			}
		},
		data() {
			return {
				touching: false,
				ogY: 0,
				ogTranslate: 0,
				touchId: undefined,
				translate: 0,
				totalHeight: 0,
				animating: this.aniamtion,
				selectIndex: this.defaultIndex
			};
		},
		watch: {
			items: {
				handler() {
					this.adjustPosition(this.defaultIndex);
				},
				deep: true
			}
		},
		created() {
			this.adjustPosition(this.defaultIndex);
			this.$on('adjustPosition', (defaultIndex) => {
				this.adjustPosition(defaultIndex);
			});
		},
		methods: {
			adjustPosition(defaultIndex) {
				let items = this.items;
				let indicatorTop = this.indicatorTop;
				let itemHeight = this.itemHeight;
				const totalHeight = items.length * itemHeight;
				let translate = totalHeight <= indicatorTop ? indicatorTop : 0;
				if (defaultIndex > -1) {
					if (translate === 0) {
						let upperCount = Math.floor(indicatorTop / itemHeight);
						if (defaultIndex > upperCount) {
							//over
							let overCount = defaultIndex - upperCount;
							translate -= overCount * itemHeight;
						}
						else if (defaultIndex === upperCount) {
							translate = 0;
						}
						else {
							//less
							translate += (Math.abs(upperCount - defaultIndex) * itemHeight);
						}
					}
					else {
						//total item less than indicator height
						translate -= itemHeight * defaultIndex;
					}
				}
				this.ogTranslate = translate;
				this.totalHeight = totalHeight;
				this.translate = translate;
				this.$nextTick(() => defaultIndex > -1 ? this.updateSelected(false) : this.updateSelected());
			},

			updateSelected(propagate = true) {
				let selected = 0;
				for (let [i, item] of this.items.entries()) {
					if (!item.disabled && (this.translate + (this.itemHeight * i)) >= this.indicatorTop &&(this.translate + (this.itemHeight * i) + this.itemHeight) <= this.indicatorTop + this.indicatorHeight) {
						selected = i;
					}
				}
				this.selectIndex = selected;
				if (this.onChange && propagate) {
					this.onChange(this.items[selected], selected, this.groupIndex);
				}
			},

			handleTouchStart(e) {
				if (this.touching || this.items.length <= 1) return;
				this.touching = true;
				this.ogTranslate = this.translate;
				this.touchId = e.targetTouches[0].identifier;
				this.ogY = this.translate === 0 ? e.targetTouches[0].pageY : e.targetTouches[0].pageY - this.translate;
				this.animating = false;
			},

			handleTouchMove(e) {
				if (!this.touching || this.items.length <= 1) return;
				if (e.targetTouches[0].identifier !== this.touchId) return;
				const pageY = e.targetTouches[0].pageY;
				const diffY = pageY - this.ogY;
				this.translate = diffY;
			},

			handleTouchEnd() {
				if (!this.touching || this.items.length <= 1) return;
				let indicatorTop = this.indicatorTop;
				let indicatorHeight = this.indicatorHeight;
				let itemHeight = this.itemHeight;
				let translate = this.translate;
				if (Math.abs(translate - this.ogTranslate) < (itemHeight * 0.51)) {
					translate = this.ogTranslate;
				}
				else if (translate > indicatorTop) {
					//top boundry
					translate = indicatorTop;
				}
				else if (translate + this.totalHeight < indicatorTop + indicatorHeight) {
					//bottom
					translate = indicatorTop + indicatorHeight - this.totalHeight;
				}
				else {
					//pass single item range but not exceed boundry
					let step = 0,
						adjust = 0;
					let diff = (translate - this.ogTranslate) / itemHeight;
					if (Math.abs(diff) < 1) {
						step = diff > 0 ? 1 : -1;
					}
					else {
						adjust = Math.abs((diff % 1) * 100) > 50 ? 1 : 0;
						step = diff > 0 ? Math.floor(diff) + adjust : Math.ceil(diff) - adjust;
					}

					translate = this.ogTranslate + (step * itemHeight);
				}
				this.touching = false;
				this.ogY = 0;
				this.touchId = undefined;
				this.ogTranslate = 0;
				this.animating = true;
				this.translate = translate;
				this.$nextTick(() => this.updateSelected());
			}
		}
	};
</script>
<style>
	.weui-picker__group {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		position: relative;
		height: 100%;
	}
	.weui-picker__mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		z-index: 3;
		background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
		background-position: top, bottom;
		background-size: 100% 102px;
		background-repeat: no-repeat;
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
	}
	.weui-picker__indicator {
		width: 100%;
		height: 34px;
		position: absolute;
		left: 0;
		top: 102px;
		z-index: 3;
	}
	.weui-picker__indicator:before {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #E5E5E5;
		color: #E5E5E5;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}
	.weui-picker__indicator:after {
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
	.weui-picker__content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	.weui-picker__item {
		height: 34px;
		line-height: 34px;
		text-align: center;
		color: #000;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		transform: translateZ(0);
	}
	.weui-picker__item_disabled {
		color: #999999;
	}
</style>