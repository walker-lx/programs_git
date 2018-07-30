// let util = require('../../utils/util');
let calendar = require('./calender-data/calendar');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示组件
    datePickerMode: {
      type: String,
      value: 'hidden',
      observer: function (newVal, oldVal) {
      }
    },
    isSolar: {
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal) {
      }
    }
  },
  data: {
    dateNow: new Date(), //当前日期
    pickerDate: new Date(), //当前显示的日期
    minDate: new Date(1901, 1, 19), //公历最小支持日期
    maxDate: new Date(2099, 11, 31), //公历最大支持日期
    minLDate: [1901, 0, 1], //农历最小支持日期    月份从0开始 日期从1开始
    maxLDate: [2099, 11, 20], //农历最大支持日期
    lunarClass: '', //日期选择class
    pickerDataList1: [],
    pickerDataList2: [],
    pickerDataList3: [],
    datePickerViewValue: [0, 0, 0],
    dateSelectProps: {
      height: 238,
      itemHeight: 34,
      indicatorTop: 68,
      indicatorHeight: 34,
      animation: wx.createAnimation({
        duration: 0,
        delay: 0
      }),
      dataState1: {
        groupIndex: 1,
        defaultIndex: -1,
        defaultList: [],
        selected: 0
      },
      dataState2: {
        groupIndex: 1,
        defaultIndex: -1,
        defaultList: [],
        selected: 0
      },
      dataState3: {
        groupIndex: 1,
        defaultIndex: -1,
        defaultList: [],
        selected: 0
      },
    }
  },
  /**
   * 组件生命周期
   */
  ready: function () {
    this.setData({
      dateNow: new Date(), //当前日期
      pickerDate: new Date(), //当前显示的日期
      minDate: new Date(1901, 1, 19), //公历最小支持日期
      maxDate: new Date(2099, 11, 31), //公历最大支持日期
    })
    this.init();
    console.log(this.data.isSolar);
    this.dateSelectShow(this.data.isSolar, new Date());
  },
  methods: {
    init() {
      this.initSolarDateSelect();
      console.log('date init');
      this.setData({
        'datePickerViewValue': [this.data.dateSelectProps.dataState1.defaultIndex, this.data.dateSelectProps.dataState2.defaultIndex, this.data.dateSelectProps.dataState3.defaultIndex]
      });
    },
    //点击日期弹出
    dateSelectShow(isSolar, initSolarDate) {
      this.setData({
        lunarClass: isSolar ? '' : 'active'
      });
      if (initSolarDate) {
        let year = initSolarDate.getFullYear();
        let month = initSolarDate.getMonth();
        let day = initSolarDate.getDate();
        this.data.pickerDate = new Date(year, month, day);
      }
      //公历
      if (isSolar) {
        let valArray = [this.data.pickerDate.getFullYear() - this.data.minDate.getFullYear(), this.data.pickerDate.getMonth(), this.data.pickerDate.getDate() - 1];
        let groupIndex = this.getGroupIndex(valArray);
        let lastIndex = -1;
        if (groupIndex === 1) {
          lastIndex = this.data.dateSelectProps.dataState1.defaultIndex;
          this.data.dateSelectProps.dataState2.defaultIndex = valArray[1];
          this.data.dateSelectProps.dataState3.defaultIndex = valArray[2];
        }
        else if (groupIndex === 2) {
          lastIndex = this.data.dateSelectProps.dataState2.defaultIndex;
          this.data.dateSelectProps.dataState3.defaultIndex = valArray[2];
        }
        else if (groupIndex === 3) {
          lastIndex = this.data.dateSelectProps.dataState3.defaultIndex;
        }
        if (this.onChange) this.onChange(null, valArray[groupIndex - 1], groupIndex, lastIndex);
      }
      //农历
      else {
        this.initLunarDateSelect(initSolarDate.getFullYear(), initSolarDate.getMonth(), initSolarDate.getDate());
        this.setData({
          'datePickerViewValue': [this.data.dateSelectProps.dataState1.defaultIndex, this.data.dateSelectProps.dataState2.defaultIndex, this.data.dateSelectProps.dataState3.defaultIndex]
        });
      }
    },
    datePickerChange(e) {
      let groupIndex = this.getGroupIndex(e.detail.value);
      let lastIndex = 0;
      if (groupIndex === 1) {
        lastIndex = this.data.dateSelectProps.dataState1.defaultIndex;
      }
      else if (groupIndex === 2) {
        lastIndex = this.data.dateSelectProps.dataState2.defaultIndex;
      }
      else if (groupIndex === 3) {
        lastIndex = this.data.dateSelectProps.dataState3.defaultIndex;
      }
      if (this.onChange) this.onChange(null, e.detail.value[groupIndex - 1], groupIndex, lastIndex);
    },
    getGroupIndex(value) {
      let index = -1;
      if (this.data.dateSelectProps.dataState1.defaultIndex !== value[0]) {
        index = 1;
      }
      else if (this.data.dateSelectProps.dataState2.defaultIndex !== value[1]) {
        index = 2;
      }
      else if (this.data.dateSelectProps.dataState3.defaultIndex !== value[2]) {
        index = 3;
      }
      return index;
    },
    onChange(item, selectedIndex, groupIndex, lastIndex) {
      if (groupIndex < 1) {
        return false;
      }
      if (groupIndex === 1 && selectedIndex < this.data.dateSelectProps.dataState1.defaultList.length) {
        this.data.dateSelectProps.dataState1.defaultIndex = selectedIndex;
        if (this.data.dateSelectProps.dataState1.defaultIndex === 0) {
          if (this.data.dateSelectProps.dataState2.defaultIndex < this.data.minDate.getMonth()) {
            this.data.dateSelectProps.dataState2.defaultIndex = this.data.minDate.getMonth();
          }
          if (this.data.dateSelectProps.dataState3.defaultIndex < this.data.minDate.getDate()) {
            this.data.dateSelectProps.dataState3.defaultIndex = this.data.minDate.getDate() - 1;
          }
        }
        this.getDateSelectMonthInfo(lastIndex);
        this.getDateSelectDayInfo();
      }
      else if (groupIndex === 2 && selectedIndex < this.data.dateSelectProps.dataState2.defaultList.length) {
        this.data.dateSelectProps.dataState2.defaultIndex = selectedIndex;
        //公历
        if (this.data.isSolar) {
          if (this.data.dateSelectProps.dataState1.defaultIndex === 0 && selectedIndex < this.data.minDate.getMonth()) {
            this.data.dateSelectProps.dataState2.defaultIndex = this.data.minDate.getMonth();
          }
        }
        //农历
        else {
          if (this.data.dateSelectProps.dataState1.defaultIndex === this.data.maxLDate[0] - this.data.minLDate[0] && selectedIndex > this.data.maxLDate[1]) {
            this.data.dateSelectProps.dataState2.defaultIndex = this.data.maxLDate[1];
          }
        }
        this.getDateSelectDayInfo();
      }
      else if (groupIndex === 3 && selectedIndex < this.data.dateSelectProps.dataState3.defaultList.length) {
        this.data.dateSelectProps.dataState3.defaultIndex = selectedIndex;
        //公历
        if (this.data.isSolar) {
          if (this.data.dateSelectProps.dataState1.defaultIndex === 0 && this.data.dateSelectProps.dataState2.defaultIndex === this.data.minDate.getMonth() && selectedIndex < this.data.minDate.getDate()) {
            this.data.dateSelectProps.dataState3.defaultIndex = this.data.minDate.getDate() - 1;
          }
        }
        //农历
        else {
          if (this.data.dateSelectProps.dataState1.defaultIndex === this.data.maxLDate[0] - this.data.minLDate[0] && this.data.dateSelectProps.dataState2.defaultIndex === this.data.maxLDate[1] && selectedIndex + 1 > this.data.maxLDate[2]) {
            this.data.dateSelectProps.dataState3.defaultIndex = this.data.maxLDate[2] - 1;
          }
        }
      }
      this.setData({
        'datePickerViewValue': [this.data.dateSelectProps.dataState1.defaultIndex, this.data.dateSelectProps.dataState2.defaultIndex, this.data.dateSelectProps.dataState3.defaultIndex]
      });
    },
    dateLunarTap() {
      //公历转农历
      if (this.data.isSolar) {
        let year = this.data.dateSelectProps.dataState1.defaultIndex + this.data.minDate.getFullYear();
        let month = this.data.dateSelectProps.dataState2.defaultIndex;
        let day = this.data.dateSelectProps.dataState3.defaultIndex + 1;
        this.initLunarDateSelect(year, month, day);
        this.setData({
          'datePickerViewValue': [this.data.dateSelectProps.dataState1.defaultIndex, this.data.dateSelectProps.dataState2.defaultIndex, this.data.dateSelectProps.dataState3.defaultIndex]
        });
        this.data.isSolar = false;
        this.setData({
          lunarClass: 'active'
        });
      }
      //农历转公历
      else {
        let year = this.data.dateSelectProps.dataState1.defaultIndex + this.data.minLDate[0];
        let month = this.data.dateSelectProps.dataState2.defaultIndex;
        let day = this.data.dateSelectProps.dataState3.defaultIndex + 1;
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
        if (solarObj.cMonth - 1 < 0) {
          this.initSolarDateSelect(solarObj.cYear - 1, 11, solarObj.cDay);
        }
        else {
          this.initSolarDateSelect(solarObj.cYear, solarObj.cMonth - 1, solarObj.cDay);
        }
        this.data.isSolar = true;
        this.setData({
          'datePickerViewValue': [this.data.dateSelectProps.dataState1.defaultIndex, this.data.dateSelectProps.dataState2.defaultIndex, this.data.dateSelectProps.dataState3.defaultIndex]
        });
        this.setData({
          lunarClass: ''
        });
      }
    },
    initSolarDateSelect(year, month, day) {
      year = year ? year : this.data.pickerDate.getFullYear();
      month = month || month === 0 ? month : this.data.pickerDate.getMonth();
      day = day ? day : this.data.pickerDate.getDate();
      let maxYear = this.data.maxDate.getFullYear();
      let minYear = this.data.minDate.getFullYear();
      let yearList = [];
      let yearToView = 0;
      for (let i = minYear; i <= maxYear; i++) {
        if (year === i) {
          yearToView = i - minYear;
        }
        yearList.push(i + '年');
      }
      if (year < minYear) {
        yearToView = 0;
      }
      if (year > maxYear) {
        yearToView = maxYear - minYear;
      }

      let monthList = [],
        monthToView = 0;
      for (let i = 0; i <= 11; i++) {
        if (month === i) {
          monthToView = i;
        }
        let valueString = (i + 1) + '月';
        monthList.push(valueString);
      }

      let dayCount = calendar.solarDays(year, month);
      let dayList = [],
        dayToView = 0;
      let dateObj = new Date(year, month, 1);
      for (let i = 1; i <= dayCount; i++) {
        if (day === i) {
          dayToView = i - 1;
        }
        dateObj.setDate(i);
        if (year === this.data.dateNow.getFullYear()
          && month === this.data.dateNow.getMonth()
          && i === this.data.dateNow.getDate()) {
          dayList.push('今天');
        }
        else {
          dayList.push(i + '日' + '周' + calendar.nStr1[dateObj.getDay()]);
        }
      }
      if (day > dayCount) {
        dayToView = dayCount - 1;
      }

      this.data.dateSelectProps.dataState1.defaultList = yearList;
      this.data.dateSelectProps.dataState2.defaultList = monthList;
      this.data.dateSelectProps.dataState3.defaultList = dayList;
      this.data.dateSelectProps.dataState1.defaultIndex = yearToView;
      this.data.dateSelectProps.dataState2.defaultIndex = monthToView;
      this.data.dateSelectProps.dataState3.defaultIndex = dayToView;
      this.setData({
        pickerDataList1: yearList,
        pickerDataList2: monthList,
        pickerDataList3: dayList
      });
    },
    initLunarDateSelect(year, month, day) {
      let lunarObj = calendar.solar2lunar(year, month, day);
      let yearList = [],
        yearToView = 0;
      for (let i = this.data.minLDate[0]; i <= this.data.maxLDate[0]; i++) {
        if (lunarObj.lYear === i) {
          yearToView = i - this.data.minLDate[0];
        }
        yearList.push(i + '年');
      }
      let leapMonth = calendar.leapMonth(lunarObj.lYear);
      let monthList = [],
        monthToView = 0,
        monthCount = 11;
      if (leapMonth > 0) {
        monthCount++;
      }
      for (let i = 0; i <= monthCount; i++) {
        if (lunarObj.lMonth - 1 === i) {
          monthToView = i;
          if (leapMonth > 0 && lunarObj.lMonth > leapMonth) {
            monthToView++;
          }
        }
        if (leapMonth > 0) {
          if (i < leapMonth) {
            monthList.push(calendar.toChinaMonth(i + 1));
          }
          else if (i === leapMonth) {
            monthList.push('闰' + calendar.toChinaMonth(leapMonth));
          }
          else {
            monthList.push(calendar.toChinaMonth(i));
          }
        }
        else {
          monthList.push(calendar.toChinaMonth(i + 1));
        }
      }
      if (lunarObj.isLeap) {
        monthToView = leapMonth;
      }
      let dayCount = (leapMonth === lunarObj.lMonth ? calendar.leapDays(lunarObj.lYear) : calendar.monthDays(lunarObj.lYear, lunarObj.lMonth));
      let dayList = [],
        dayToView = 0,
        solarObj = {};
      for (let i = 1; i <= dayCount; i++) {
        if (lunarObj.lDay === i) {
          dayToView = i - 1;
        }
        solarObj = calendar.lunar2solar(lunarObj.lYear, lunarObj.lMonth, i, lunarObj.isLeap);
        if (solarObj.cYear === this.data.dateNow.getFullYear() && solarObj.cMonth - 1 === this.data.dateNow.getMonth() && solarObj.cDay === this.data.dateNow.getDate()) {
          dayList.push('今天');
        }
        else {
          dayList.push(calendar.toChinaDay(i) + '周' + calendar.nStr1[solarObj.nWeek]);
        }
      }
      this.data.dateSelectProps.dataState1.defaultList = yearList;
      this.data.dateSelectProps.dataState2.defaultList = monthList;
      this.data.dateSelectProps.dataState3.defaultList = dayList;
      this.data.dateSelectProps.dataState1.defaultIndex = yearToView;
      this.data.dateSelectProps.dataState2.defaultIndex = monthToView;
      this.data.dateSelectProps.dataState3.defaultIndex = dayToView;
      this.setData({
        pickerDataList1: yearList,
        pickerDataList2: monthList,
        pickerDataList3: dayList
      });
    },
    getDateSelectMonthInfo(lastIndex) {
      let monthList = [],
        monthToView = 0;
      let year = this.data.pickerDate.getFullYear(),
        month = this.data.pickerDate.getMonth();
      //公历
      if (this.data.isSolar) {
        month = this.data.dateSelectProps.dataState2.defaultIndex;
        for (let i = 0; i <= 11; i++) {
          if (month === i) {
            monthToView = i;
          }
          let valueString = (i + 1) + '月';
          monthList.push(valueString);
        }
      }
      //农历
      else {
        year = this.data.dateSelectProps.dataState1.defaultIndex + this.data.minLDate[0];
        month = this.data.dateSelectProps.dataState2.defaultIndex;
        let leapMonth = calendar.leapMonth(year);
        let monthCount = 11;
        if (leapMonth > 0) {
          monthCount++;
        }
        for (let i = 0; i <= monthCount; i++) {
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
              let prevLeapMonth = lastIndex ? calendar.leapMonth(lastIndex + +this.data.minLDate[0]) : 0;
              if (prevLeapMonth > 0 && month >= prevLeapMonth) {
                monthToView--;
              }
            }
          }
          if (leapMonth > 0) {
            if (i < leapMonth) {
              monthList.push(calendar.toChinaMonth(i + 1));
            }
            else if (i === leapMonth) {
              monthList.push('闰' + calendar.toChinaMonth(leapMonth));
            }
            else {
              monthList.push(calendar.toChinaMonth(i));
            }
          }
          else {
            monthList.push(calendar.toChinaMonth(i + 1));
          }
        }
      }
      this.data.dateSelectProps.dataState2.defaultList = monthList;
      this.setData({
        pickerDataList2: monthList
      });
      this.data.dateSelectProps.dataState2.defaultIndex = monthToView;
    },
    getDateSelectDayInfo: function () {
      let dayList = [],
        dayToView = 0;
      //公历
      if (this.data.isSolar) {
        let year = this.data.dateSelectProps.dataState1.defaultIndex + this.data.minDate.getFullYear();
        let month = this.data.dateSelectProps.dataState2.defaultIndex;
        let day = this.data.dateSelectProps.dataState3.defaultIndex + 1;
        let dayCount = calendar.solarDays(year, month);

        let dateObj = new Date(year, month, 1);
        for (let i = 1; i <= dayCount; i++) {
          if (day === i) {
            dayToView = i - 1;
          }
          dateObj.setDate(i);
          if (year === this.data.dateNow.getFullYear() && month === this.data.dateNow.getMonth() && i === this.data.dateNow.getDate()) {
            dayList.push('今天');
          }
          else {
            dayList.push(i + '日' + '周' + calendar.nStr1[dateObj.getDay()]);
          }
        }
        if (day > dayCount) {
          dayToView = dayCount - 1;
        }
      }
      //农历
      else {
        let isLeap = false;
        let year = this.data.dateSelectProps.dataState1.defaultIndex + this.data.minLDate[0];
        let month = this.data.dateSelectProps.dataState2.defaultIndex;
        let day = this.data.dateSelectProps.dataState3.defaultIndex + 1;
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
        for (let i = 1; i <= dayCount; i++) {
          if (day === i) {
            dayToView = i - 1;
          }
          solarObj = calendar.lunar2solar(year, month, i, isLeap);
          if (solarObj.cYear === this.data.dateNow.getFullYear() && solarObj.cMonth - 1 === this.data.dateNow.getMonth() && solarObj.cDay === this.data.dateNow.getDate()) {
            dayList.push('今天');
          }
          else {
            dayList.push(calendar.toChinaDay(i) + '周' + calendar.nStr1[solarObj.nWeek]);
          }
        }
      }
      this.data.dateSelectProps.dataState3.defaultList = dayList;
      this.setData({
        pickerDataList3: dayList
      });
      this.data.dateSelectProps.dataState3.defaultIndex = dayToView;
    },
    //阴影点击
    maskTap() {
      this.dateSelectModuleHide();
    },
    //日期选确认点击
    dateSelectConfirmTap() {
      let year = this.data.pickerDate.getFullYear(),
        month = this.data.pickerDate.getMonth(),
        day = this.data.pickerDate.getDate();
      //公历
      if (this.data.isSolar) {
        year = this.data.dateSelectProps.dataState1.defaultIndex + this.data.minDate.getFullYear();
        month = this.data.dateSelectProps.dataState2.defaultIndex;
        day = this.data.dateSelectProps.dataState3.defaultIndex + 1;
		this.triggerEvent('dateSelectConfirm', {year, month: month + 1, day});				
      }
      //农历
      else {
        year = this.data.dateSelectProps.dataState1.defaultIndex + this.data.minLDate[0];
        month = this.data.dateSelectProps.dataState2.defaultIndex;
        day = this.data.dateSelectProps.dataState3.defaultIndex + 1;
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
        if (solarObj.cnth - 1 < 0) {
          year = solarObj.cYear - 1;
          month = 11;
          day = solarObj.cDay;
        }
        else {
          year = solarObj.cYear;
          month = solarObj.cMonth - 1;
          day = solarObj.cDay;
        }
        setTimeout(() => {
          this.setData({
            lunarClass: ''
          });
          this.initSolarDateSelect(year, month, day);
          this.setData({
            'datePickerViewValue': [this.data.dateSelectProps.dataState1.defaultIndex, this.data.dateSelectProps.dataState2.defaultIndex, this.data.dateSelectProps.dataState3.defaultIndex]
          });
		  this.triggerEvent('dateSelectConfirm', solarObj);		  
        }, 0);
      }
      this.data.pickerDate = new Date(year, month, day);
      this.dateSelectModuleHide();
      console.log(year, month, day);
      // this.dateSelectCallback(year, month, day);
    },
    dateSelectModuleShow() {
      this.setData({
        datePickerMode: 'show'
      })
    },
    dateSelectModuleHide() {
      this.setData({
        datePickerMode: 'hidden'
      })
      if (!this.data.isSolar) {
        setTimeout(() => {
          this.data.isSolar = true;
          this.setData({
            lunarClass: ''
          });
          this.initSolarDateSelect();
          this.setData({
            'datePickerViewValue': [this.data.dateSelectProps.dataState1.defaultIndex, this.data.dateSelectProps.dataState2.defaultIndex, this.data.dateSelectProps.dataState3.defaultIndex]
          });
        }, 0);
      }
    },
    maskTapDate() {
      this.setData({
        datePickerMode: 'hidden'
      })
    },
    //日期选择取消点击
    dateSelectCancelTap() {
      this.setData({
        datePickerMode: 'hidden'
      })
	  this.triggerEvent('dateSelectCancel');
    },
    catchMaskTouchMove() { }
  }
})