<template>
	<transition name="actionsheet-float">
		<div v-show="currentValue" class="picker_vue">
			<div class="weui-picker__hd">
				<a href="javascript:;" data-action="cancel" class="weui-picker__action" @click="handleClose(onCancel)">{{headActions[0].label}}</a>
				<a href="javascript:;" data-action="select" class="weui-picker__action" id="weui-picker-confirm" @click="handleClose(handleChanges)">{{headActions[1].label}}</a>
			</div>
			<div class="weui-picker__bd">
				<pickerGroup v-for="(group, i) in dateGroups" :ref="'pickerGroup'+i" :key="i" :items="group.items" :onChange="handleChange" :groupIndex="i" :defaultIndex="defaultIndexList[i]"></pickerGroup>
			</div>
			<div class="date_select_footer">
				<div :class="{date_l_btn,active:!isSolar}" @click="dateLunarTap">
					<div class="date_select_circle"></div>
					<div class="date_select_l">农历</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Popup from '../popup/index';
	import calendar from '../calendar';
	import pickerGroup from '../picker_group';
	export default {
		name: 'datePicker',
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
				default: true
			},
			closeOnClickModal: {
				default: true
			},
			actions: {
				type: Array,
				default: () => []
			},
			viewDate: {
				type: Date,
				default: function() {
					return new Date();
				}
			},
			groups: Array,
			onChange: Function,
			onGroupChange: Function,
			onCancel: Function,
			onConfirm: Function
		},
		data() {
			return {
				minDate: new Date(1901, 1, 19), //公历最小支持日期
				maxDate: new Date(2099, 11, 31), //公历最大支持日期
				minLDate: [1901, 0, 1], //农历最小支持日期    月份从0开始 日期从1开始
				maxLDate: [2099, 11, 20], //农历最大支持日期
				currentValue: false,
				headActions: this.actions && this.actions.length > 0 ? this.actions : [{
						label: '取消'
					},
					{
						label: '确认'
					}
				],
				dateNow: new Date(),
				dateGroups: [],
				defaultIndexList: [],
				date_l_btn: 'date_l_btn',
				isSolar: true
			};
		},
		created() {
			// this.initSolarDateSelect();
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
				if (val && this.dateGroups.length === 0) {
					this.initSolarDateSelect();
				}
			}
		},
		methods: {
			handleClose(cb) {
				this.currentValue = false;
				setTimeout(() => {
					if (cb) cb();
				}, 100);
			},
			handleChanges() {
				this.handleClose(() => {
					let confirmObj = {
						dateObj: [],
						isSolar: this.isSolar
					};
					if (this.isSolar) {
						let year = this.defaultIndexList[0] + this.minDate.getFullYear();
						let month = this.defaultIndexList[1];
						let day = this.defaultIndexList[2] + 1;
						confirmObj.dateObj = calendar.solar2lunar(year, month, day);
					}
					else {
						let year = this.defaultIndexList[0] + this.minLDate[0];
						let month = this.defaultIndexList[1];
						let day = this.defaultIndexList[2] + 1;
						let solarObj;
						if (calendar.leapMonth(year) > 0) {
							if (month < calendar.leapMonth(year)) {
								month++;
								solarObj = calendar.lunar2solar(year, month, day);
							}
							else if (month === calendar.leapMonth(year)) {
								solarObj = calendar.lunar2solar(year, month, day, true);
							}
							else {
								solarObj = calendar.lunar2solar(year, month, day);
							}
						}
						else {
							month++;
							solarObj = calendar.lunar2solar(year, month, day);
						}
						confirmObj.dateObj = solarObj;
					}
					if (this.onConfirm) this.onConfirm(confirmObj, this);
				});
			},
			handleChange(item, i, groupIndex) {
				let lastIndex = this.defaultIndexList[groupIndex];
				if(lastIndex===i){
					return;
				}
				this.$set(this.defaultIndexList, groupIndex,i);
				this.$nextTick(() => {
					this.onSelectChange(item, this.defaultIndexList[groupIndex], groupIndex, lastIndex);
					if (this.onGroupChange) this.onGroupChange(item, i, groupIndex, this.defaultIndexList, this);
				});
			},
			onSelectChange: function(item, selectIndex, groupIndex, lastIndex) {
				if (groupIndex === 0 && selectIndex < this.dateGroups[0].items.length) {
					this.defaultIndexList[0] = selectIndex;
					this.getDateSelectMonthInfo(lastIndex);
					this.getDateSelectDayInfo();
				}
				else if (groupIndex === 1 && this.defaultIndexList[1] < this.dateGroups[1].items.length) {
					//公历
					if (this.isSolar) {
						if (this.defaultIndexList[0] === 0 && selectIndex < this.minDate.getMonth()) {
							this.defaultIndexList[1] = this.minDate.getMonth();
							this.$refs['pickerGroup' + groupIndex][0].$emit('adjustPosition', this.defaultIndexList[1]);
						}
						else {
							this.defaultIndexList[1] = selectIndex;
						}
					}
					//农历
					else {
						if (this.defaultIndexList[0] === 0 && selectIndex > this.maxLDate[1]) {
							this.defaultIndexList[1] = this.maxLDate[1];
							this.$refs['pickerGroup' + groupIndex][0].$emit('adjustPosition', this.defaultIndexList[1]);
						}
						else {
							this.defaultIndexList[1] = selectIndex;
						}
					}
					this.getDateSelectDayInfo();
				}
				else if (groupIndex === 2 && this.defaultIndexList[2] + 1 < this.dateGroups[2].items.length) {
					//公历
					if (this.isSolar) {
						if (this.defaultIndexList[0] === 0 && this.defaultIndexList[1] === this.minDate.getMonth() && selectIndex < this.minDate.getDate()) {
							this.defaultIndexList[2] = this.minDate.getDate() - 1;
							this.$refs['pickerGroup' + groupIndex][0].$emit('adjustPosition', this.defaultIndexList[2]);
						}
						else {
							this.defaultIndexList[2] = selectIndex;
						}
					}
					//农历
					else {
						if (this.defaultIndexList[0] === this.maxLDate[0] - this.minLDate[0] && this.defaultIndexList[1] === this.maxLDate[1] && selectIndex + 1 > this.maxLDate[2]) {
							this.defaultIndexList[2] = this.maxLDate[2] - 1;
							this.$refs['pickerGroup' + groupIndex][0].$emit('adjustPosition', this.defaultIndexList[2]);
						}
						else {
							this.defaultIndexList[2] = selectIndex;
						}
					}
				}
			},
			getDateSelectMonthInfo(lastIndex) {
				let monthList = {
						items: []
					},
					monthToView = 0;
				let year = this.viewDate.getFullYear(),
					month = this.viewDate.getMonth();
				let i = 0;
				//公历
				if (this.isSolar) {
					month = this.defaultIndexList[0];
					for (i = 0; i <= 11; i++) {
						if (month === i) {
							monthToView = i;
						}
						let valueString = (i + 1) + '月';
						monthList.items.push({
							index: valueString,
							label: valueString
						});
					}
				}
				//农历
				else {
					year = this.defaultIndexList[0] + this.minLDate[0];
					month = this.defaultIndexList[1];
					let leapMonth = calendar.leapMonth(year);
					let monthCount = 11;
					if (leapMonth > 0) {
						monthCount++;
					}
					for (i = 0; i <= monthCount; i++) {
						if (month === i) {
							monthToView = i;
							//现在选择的年月是有闰月的
							if (leapMonth > 0) {
								if (month >= leapMonth) {
									monthToView++;
								}
							}
							//现在选择的是没有闰月的
							else {
								//判断之前的选择是否有闰月
								let prevLeapMonth = lastIndex ? calendar.leapMonth(lastIndex + +this.minLDate[0]) : 0;
								if (prevLeapMonth > 0 && month >= prevLeapMonth) {
									monthToView--;
								}
							}
						}
						if (leapMonth > 0) {
							if (i < leapMonth) {
								monthList.items.push({
									index: i,
									label: calendar.toChinaMonth(i + 1)
								});
							}
							else if (i === leapMonth) {
								monthList.items.push({
									index: i,
									label: '闰' + calendar.toChinaMonth(leapMonth)
								});
							}
							else {
								monthList.items.push({
									index: i,
									label: calendar.toChinaMonth(i)
								});
							}
						}
						else {
							monthList.items.push({
								index: i,
								label: calendar.toChinaMonth(i + 1)
							});
						}
					}
				}
				console.log(monthToView);
				this.$set(this.dateGroups, 1, monthList);
				this.$set(this.defaultIndexList, 1,monthToView);
			},
			getDateSelectDayInfo() {
				let dayList = {
						items: []
					},
					dayToView = 0;
				let i = 0;
				//公历
				if (this.isSolar) {
					let year = this.defaultIndexList[0] + this.minDate.getFullYear();
					let month = this.defaultIndexList[1];
					let day = this.defaultIndexList[2] + 1;
					let dayCount = calendar.solarDays(year, month);
					let dateObj = new Date(year, month, 1);
					for (i = 1; i <= dayCount; i++) {
						if (day === i) {
							dayToView = i - 1;
						}
						dateObj.setDate(i);
						if (year === this.dateNow.getFullYear() && month === this.dateNow.getMonth() && i === this.dateNow.getDate()) {
							dayList.items.push({
								index: i,
								label: '今天'
							});
						}
						else {
							dayList.items.push({
								index: i,
								label: i + '日' + '周' + calendar.nStr1[dateObj.getDay()]
							});
						}
					}
					if (day > dayCount) {
						dayToView = dayCount - 1;
					}
				}
				//农历
				else {
					let isLeap = false;
					let year = this.defaultIndexList[0] + this.minLDate[0];
					let month = this.defaultIndexList[1];
					let day = this.defaultIndexList[2] + 1;
					if (calendar.leapMonth(year) > 0) {
						if (month < calendar.leapMonth(year)) {
							month++;
						}
						else if (month === calendar.leapMonth(year)) {
							isLeap = true;
						}
					}
					else {
						month++;
					}
					let dayCount = isLeap ? calendar.leapDays(year) : calendar.monthDays(year, month);
					let solarObj = {};
					for (i = 1; i <= dayCount; i++) {
						if (day === i) {
							dayToView = i - 1;
						}
						solarObj = calendar.lunar2solar(year, month, i, isLeap);
						dayList.items.push({
							index: i,
							label: calendar.toChinaDay(i) + '周' + calendar.nStr1[solarObj.nWeek]
						});
					}
				}
				this.$set(this.dateGroups, 2, dayList);
				this.$set(this.defaultIndexList, 2, dayToView);
			},
			initSolarDateSelect: function(year, month, day) {
				year = year ? year : this.viewDate.getFullYear();
				month = month || month === 0 ? month : this.viewDate.getMonth();
				day = day ? day : this.viewDate.getDate();
				let i = 0;
				let yearList = {
						items: []
					},
					yearToView = 0;
				let monthList = {
						items: []
					},
					monthToView = 0;
				let dayList = {
						items: []
					},
					dayToView = 0;
				for (i = this.minDate.getFullYear(); i <= this.maxDate.getFullYear(); i++) {
					if (year === i) {
						yearToView = i - this.minDate.getFullYear();
					}
					yearList.items.push({
						label: i + '年'
					});
				}
				if (year < this.minDate.getFullYear()) {
					yearToView = 0;
				}
				if (year > this.maxDate.getFullYear()) {
					yearToView = this.maxDate.getFullYear() - this.minDate.getFullYear();
				}

				for (i = 0; i <= 11; i++) {
					if (month === i) {
						monthToView = i;
					}
					let valueString = (i + 1) + '月';
					monthList.items.push({
						label: valueString
					});
				}

				let dayCount = calendar.solarDays(year, month);
				let dateObj = new Date(year, month, 1);
				for (i = 1; i <= dayCount; i++) {
					if (day === i) {
						dayToView = i - 1;
					}
					dateObj.setDate(i);
					if (year === this.dateNow.getFullYear() && month === this.dateNow.getMonth() && i === this.dateNow.getDate()) {
						dayList.items.push({
							label: '今天'
						});
					}
					else {
						dayList.items.push({
							label: i + '日' + '周' + calendar.nStr1[dateObj.getDay()]
						});
					}
				}
				if (day > dayCount) {
					dayToView = dayCount - 1;
				}
				this.$set(this.dateGroups, 0, yearList);
				this.$set(this.defaultIndexList, 0, yearToView);
				this.$set(this.dateGroups, 1, monthList);
				this.$set(this.defaultIndexList, 1,monthToView);
				this.$set(this.dateGroups, 2, dayList);
				this.$set(this.defaultIndexList, 2,dayToView);
			},
			initLunarDateSelect: function(year, month, day) {
				let i = 0;
				let lunarObj = calendar.solar2lunar(year, month, day);
				let yearList = {
						items: []
					},
					yearToView = 0;
				let monthList = {
						items: []
					},
					monthToView = 0,
					monthCount = 11;
				let dayList = {
						items: []
					},
					dayToView = 0,
					solarObj = {};
				for (i = this.minLDate[0]; i <= this.maxLDate[0]; i++) {
					if (lunarObj.lYear === i) {
						yearToView = i - this.minLDate[0];
					}
					yearList.items.push({
						label: i + '年'
					});
				}
				let leapMonth = calendar.leapMonth(lunarObj.lYear);
				if (leapMonth > 0) {
					monthCount++;
				}
				for (i = 0; i <= monthCount; i++) {
					if (lunarObj.lMonth - 1 === i) {
						monthToView = i;
						if (leapMonth > 0 && lunarObj.lMonth > leapMonth) {
							monthToView++;
						}
					}
					if (leapMonth > 0) {
						if (i < leapMonth) {
							monthList.items.push({
								label: calendar.toChinaMonth(i + 1)
							});
						}
						else if (i === leapMonth) {
							monthList.items.push({
								label: '闰' + calendar.toChinaMonth(leapMonth)
							});
						}
						else {
							monthList.items.push({
								label: calendar.toChinaMonth(i)
							});
						}
					}
					else {
						monthList.items.push({
							label: calendar.toChinaMonth(i + 1)
						});
					}
				}
				if (lunarObj.isLeap) {
					monthToView = leapMonth;
				}
				let dayCount = (leapMonth === lunarObj.lMonth ? calendar.leapDays(lunarObj.lYear) : calendar.monthDays(lunarObj.lYear, lunarObj.lMonth));
				for (i = 1; i <= dayCount; i++) {
					if (lunarObj.lDay === i) {
						dayToView = i - 1;
					}
					solarObj = calendar.lunar2solar(lunarObj.lYear, lunarObj.lMonth, i, lunarObj.isLeap);
					if (solarObj.cYear === this.dateNow.getFullYear() && solarObj.cMonth - 1 === this.dateNow.getMonth() && solarObj.cDay === this.dateNow.getDate()) {
						dayList.items.push({
							label: '今天'
						});
					}
					else {
						dayList.items.push({
							label: calendar.toChinaDay(i) + '周' + calendar.nStr1[solarObj.nWeek]
						});
					}
				}
				this.$set(this.dateGroups, 0, yearList);
				this.$set(this.defaultIndexList, 0, yearToView);
				this.$set(this.dateGroups, 1, monthList);
				this.$set(this.defaultIndexList, 1,monthToView);
				this.$set(this.dateGroups, 2, dayList);
				this.$set(this.defaultIndexList, 2,dayToView);
			},
			dateLunarTap() {
				//当前是农历，转公历
				if (!this.isSolar) {
					let isLeap=false;
					let year = this.defaultIndexList[0] + this.minLDate[0];
					let month = this.defaultIndexList[1];
					let day = this.defaultIndexList[2] + 1;
					if (calendar.leapMonth(year) > 0) {
						if (month < calendar.leapMonth(year)) {
							month++;
						}
						else if (month === calendar.leapMonth(year)) {
							isLeap = true;
						}
					}
					else {
						month++;
					}
					console.log(year);
					console.log(month);
					console.log(day);
					let solarObj = calendar.lunar2solar(year, month, day,isLeap);
					console.log(solarObj);
					if (solarObj.cMonth - 1 < 0) {
						this.initSolarDateSelect(solarObj.cYear - 1, 11, solarObj.cDay);
					}
					else {
						this.initSolarDateSelect(solarObj.cYear, solarObj.cMonth - 1, solarObj.cDay);
					}
				}
				//当前是公历，转农历
				else {
					let year = this.defaultIndexList[0] + this.minDate.getFullYear();
					let month = this.defaultIndexList[1];
					let day = this.defaultIndexList[2] + 1;
					this.initLunarDateSelect(year, month, day);
				}
				this.isSolar = !this.isSolar;
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
	.date_select_footer {
		width: 100%;
		height: 44px;
		background-color: #ffffff;
		position: relative;
	}
	.date_select_footer:before {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid #E5E5E5;
		color: #E5E5E5;
		-webkit-transform-origin: 0 100%;
		transform-origin: 0 100%;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}
	.date_l_btn {
		float: right;
	}
	.date_select_circle {
		float: left;
		width: 18px;
		height: 18px;
		border-radius: 100%;
		background-color: transparent;
		border: solid 2px #dfdfdf;
		margin: 11px 10px;
	}
	.date_l_btn.active .date_select_circle {
		background: url('https://www.51wnl.com/wxapp_resource/wnl/pop-radio-ok-icon.png') center no-repeat;
		background-size: 18px 18px;
	}
	.date_select_l {
		float: left;
		font-size: 17px;
		height: 44px;
		line-height: 44px;
		color: #111111;
		margin-right: 15px;
	}
	.actionsheet-float-enter,
	.actionsheet-float-leave-active {
		-webkit-transform: translate3d(-50%, 100%, 0);
		transform: translate3d(-50%, 100%, 0);
	}
</style>
<style src="../popup/popup.css" scoped></style>