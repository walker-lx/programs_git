//index.js
//获取应用实例
const utils = require('../../utils/util.js')
const app = getApp()
let _orderid = ''
let sysh
let postop
let timer
let _list = []
let top = -70
const ajaxUrl = {
	dev: {
		getdetail: 'http://192.168.1.178:3000/mock/14/LifeNum/GetOrderDetail',
		buy: 'http://192.168.1.178:3000/mock/14/LifeNum/CreateOrder',
		getOtherMini: 'http://192.168.1.110:8988/numberologynew/BaseCeSuan/GetRelevantGoodsList?type=14&ismini=true',
		getComment: 'http://192.168.1.178:3000/mock/14/CeSuanComment/GetCommentList?type=8&size=10',
		getunionid: 'http://192.168.1.178:3000/mock/14/MiniProgram/AES_decrypt'
	},
	pro: {
		getdetail: 'https://coco70.51wnl.com/numberologynew/LifeNum/GetOrderDetail',
		buy: 'https://coco70.51wnl.com/numberologynew/LifeNum/CreateOrder',
		isopen: 'https://coco70.51wnl.com/numberologynew/MiniProgram/GetPayConfig',
		getOtherMini: 'https://coco70.51wnl.com/numberologynew/BaseCeSuan/GetRelevantGoodsList?type=14&ismini=true',
		getComment: 'https://coco70.51wnl.com/numberologynew/CeSuanComment/GetCommentList?type=8&size=10',
		getOrderList: 'https://coco70.51wnl.com/numberologynew/LifeNum/GetOrderList',
		add: 'https://coco70.51wnl.com/numberologynew/LifeNum/AddOrModifyUser?tag=add',
		getunionid: 'https://coco70.51wnl.com/numberologynew/MiniProgram/AES_decrypt'
	}
}
let todayclick = 1
let monthclick = 1
let defaultGame = [
	{ date1: '20180320', img: 'https://qiniu.image.cq-wnl.com/content/2018050329ee4ee7a9be45949cc2de7bcdec361d.jpg', imgDesc: '今天属于你的这张卡，图卡表象呈现的是一个母亲和一个孩子，反应的是我们和母亲的关系，在你注视这张图卡时，你的感受是温暖、是冷漠、是关爱、是责备……无论你的感受是什么，图卡正在提醒着你和母亲的关系，是你有机会可以去转化' },
	{ date1: '20180321', img: 'https://qiniu.image.cq-wnl.com/content/20180503e77827dce68f408582c8808bab555c30.jpg', imgDesc: '一个黑暗的人，在黑夜里，面部全黑，不见五官，但却两眼发光。眼睛是寻魂之窗，只要仍有光芒，生命就有希望，因为代表了心光不灭。' },
	{ date1: '20180322', img: 'https://qiniu.image.cq-wnl.com/content/201805037266f2530a4a498bb8c1b7c454476773.jpg', imgDesc: '一个大人和小孩的互动。大人是熟人或是陌生人，取决于生命中和你关系密切的男性是谁？那个小孩正在对那大人说话，如同你内心想去找的那个人，你有话想对他（她）说。' },
	{ date1: '20180323', img: 'https://qiniu.image.cq-wnl.com/content/2018050307d804e0b0004c23aeaf9530e95f766d.jpg', imgDesc: '2个人在一个跑场上，是合作？是竞争？这取决于你的心态，一个跑场上，也可以是团队一起的共同训练、成长。是竞争是合作，你怎么看呢？' },
	{ date1: '20180324', img: 'https://qiniu.image.cq-wnl.com/content/20180503ba57bd9eddbd4c1488932c83f5ce7104.jpg', imgDesc: '一个人站在一面红墙边，你注意到的是人，还是红色的墙？你注意的如果是人，人在做什么？请你反思你近来的心情，是否有相似之处呢？请你注意墙，那个红色是舒服还是不舒服？' },
	{ date1: '20180325', img: 'https://qiniu.image.cq-wnl.com/content/201805031815a9a5efd9416f9514066bff278084.jpg', imgDesc: '一支铁锹放在墙边，是准备工作呢？还是已经完成了工作？是紧张还是放松呢？它正反应了你对你现在工作的状态，好好思考，你也许会有新发现。' },
	{ date1: '20180326', img: 'https://qiniu.image.cq-wnl.com/content/201805031c92ed2263514e8fafac9d23322cf735.jpg', imgDesc: '', luckPropose: '今日图腾，如同你的幸运般，也是如此不同，你在图卡上，见到了什么？'}
]
let sharetitle = ''
let todayluck = 0
let lifeNum = 8
let scrollCheck = true
let buttonBottom = 600
let todayLuckObj = {}
let nextLuckObj = {}
let monthLuckObj = {}
let nextMonthLuckObj = {}
let zy_aq = [], zy_sy = [], zy_cf = [], zy_noaq = [], zy_nosy = [], zy_nocf = [], aq_num, sy_num, cy_num
let sdate, ldate, datetype = 1
let translateNum = {
	0: 0,
	1: 20,
	2: 40,
	3: 60,
	4: 80,
	5: 100
}
let userinfo = {
	nickname: '',
	openid: '',
	userid: '',
	avtar: '',
	deviceid: '',
	unionid: ''
}
let sys = {
	"ClientType": "",
	"Channel": "",
	"APPVersion": "1.0.1",
	"ParterID": "wnl",
	"GoodsID": "775F426CC9C245E4AEDF4DCFF68E817C",
}
let fklist = []
let isInputDate = 0
let allowpay = 1
function num2Int (n) {
	if (n >= 0 && n < 20) {
		return 0
	}
	else if (n >= 20 && n < 40) {
		return 1
	}
	else if (n >= 40 && n < 60) {
		return 2
	}
	else if (n >= 60 && n < 80) {
		return 3
	}
	else if (n >= 80 && n < 100) {
		return 4
	}
	return 5
}
// function scrollCheckFunc(__this) {
// 	if (!scrollCheck) {
// 		return;
// 	}
// 	let query = wx.createSelectorQuery()
// 	// query.select('#button').boundingClientRect()
// 	query.selectViewport().scrollOffset()
// 	query.exec(function (res) {
// 		// console.log(res)
// 		if (buttonBottom > res[0].scrollTop) {
// 			scrollCheck = false;
// 			// console.log('top')
// 			__this.setData({
// 				fixButtonShow: false
// 			})
// 			setTimeout(function () {
// 				scrollCheck = true;
// 				scrollCheckFunc(__this);
// 			}, 600)
// 		} else if (buttonBottom < res[0].scrollTop) {
// 			// console.log('bottom')			
// 			scrollCheck = false;
// 			__this.setData({
// 				fixButtonShow: true
// 			})
// 			setTimeout(function () {
// 				scrollCheck = true;
// 				scrollCheckFunc(__this);
// 			}, 600)
// 		}
// 	})
// }

Page({
  data: {
	  hasdata: true,
	  allowpay: 0,
	  monthtext: '解析当月运势，查看本月开运建议',
	  orderid: '',
	  defaultGame: defaultGame,
	  tkShow: true,
	  isNextMonth: true,
	  isNext: true,
	  stopscroll: false,
	  isFixed: '',
	  peoplenum: 43553,
	  ispay: true,
	  tkid: new Date().getFullYear() + utils.formatNumber(new Date().getMonth() + 1) + utils.formatNumber(new Date().getDate()),
	  isInput: false,
	  anishow: false,
	  btnshow: false,
	  lifenum: 8,
	//   _number: 8,
	  lifenum_desc: '数字8代表颜色为白色，对应足三里穴位，数字8的人，有数字天分，有经济头脑，喜爱金钱游戏，对财富需求大，生命变化大，很喜欢折腾自己，一生来学习富足的考验。',
	  color: '靛色',
	  birth: '1995年03月26日',
	  dyw: '眉心轮',
	  color_text: '深灰色',
	  wp_text: '黑米',
	  people_text: '数字8的人',
	  numDesc: {
		  1: {
			  text: '数字1代表颜色为红色，对应海底轮，数字1的人一生对自我生命价值的看重和价值感要求高，独立、自主、孤独、有个性，自我要求高，对他人要求也高，执行力强，一生来学习自我接受和肯定。',
			  color: '红色',
			  dyw: '海底轮'
		  },
		  2: {
			  text: '数字2代表颜色为橙色，对应生殖轮，数字2的人，特重关系，喜好与人在一起，追求爱情，喜爱恋爱，不喜孤独，喜欢性和爱，一生来学习关系平衡。',
			  color: '橙色',
			  dyw: '生殖轮'
		  },
		  3: {
			  text: '数字3代表颜色为黄色，对应脐轮，也称太阳神经从轮，数字3的人，勇敢，冒险，火爆，勇于创新，喜欢新潮，刺激，热情，生命力强大，一生来学习改变和突破。',
			  color: '黄色',
			  dyw: '脐轮'
		  },
		  4: {
			  text: '数字4代表颜色为绿色，对应心轮，数字4的人，善良，有爱心，害羞，喜欢小动物，亲近大自然，心灵手巧，喜好艺文活动，一生来学习打开心意识力量。',
			  color: '绿色',
			  dyw: '心轮'
		  },
		  5: {
			  text: '数字5代表颜色为蓝色，对应喉轮，数字5的人，口才好，喜说话，凡事讲求公平公正，表达能力很强，理解力也很强，一生来学习自由平等。',
			  color: '蓝色',
			  dyw: '喉轮'
		  },
		  6: {
			  text: '数字6代表颜色为靛色，对应眉心轮，数字6的人，喜欢社会服务，喜欢志工活动，对生命充满好奇，内心柔软，直觉性强，敏感，灵感很强，一生来学习悟性觉知。',
			  color: '靛色',
			  dyw: '眉心轮'
		  },
		  7: {
			  text: '数字7代表颜色为紫色，对应顶轮，数字7的人，喜欢探索真相，不喜隐瞒，追求真理，有研究精神，喜追根究底，大部分拥有敏感性体质，是很好的能量接收者，一生来学习证明真理。',
			  color: '紫色',
			  dyw: '顶轮'
		  },
		  8: {
			  text: '数字8代表颜色为白色，对应足三里穴位，数字8的人，有数字天分，有经济头脑，喜爱金钱游戏，对财富需求大，生命变化大，很喜欢折腾自己，一生来学习富足的考验。',
			  color: '白色',
			  dyw: '足三里穴'
		  },
		  9: {
			  text: '数字9代表颜色为黑色，对应涌泉穴，数字9的人，坚毅，追求理想和使命，固执，执着，有大格局思路，一生学习创造新天新地新人生。',
			  color: '黑色',
			  dyw: '涌泉穴'
		  }
	  },
	  index: '0',
	  datePickerMode: 'hidden',
	  datePickerValue: {},
	  isSolar: false,
	  usersMaskShow: false,
	  smlsMaskShow: false,
	  tkMaskShow: false,
	  aq_num: 40,
	  sy_num: 60,
	  cy_num: 80,
	  aq_num_width: '144rpx',
	  sy_num_width: '200rpx',
	  cy_num_width: '290rpx',
	  today_opa: true,
	  next_opa: false,
	  month_opa: true,
	  nextmonth_opa: false,
	  defaultLuck: true,
	  hastk: false,
	  toasttext: '',
	  tkobj: [
		  {},
		  {},
		  {},
		  {},
		  {},
		  {},
		  {}
	  ],
	  tktext: '今天属于你的这张卡，图卡表象呈现的是一个母亲和一个孩子，反应的是我们和母亲的关系，在你注视这张图卡时，你的感受是温暖、是冷漠、是关爱、是责备……无论你的感受是什么，图卡正在提醒着你和母亲的关系，是你有机会可以去转化的，给她打个电话吧！如果她不在了，请在心里告诉她，你想她！你爱她！',
	  month_aq: [],
	  month_sy: [],
	  month_cf: [],
	  month_noaq: [],
	  month_nosy: [],
	  month_nocf: [],
	  zy_aq: [],
	  zy_sy: [],
	  zy_cf: [],
	  zy_noaq: [],
	  zy_nosy: [],
	  zy_nocf: [],
	  zy_aq_desc: '在今日的你有财运没爱运，要留意和家人的对话语气，深呼吸会让你避过口角。',
	  zy_sy_desc: '在今日的你，因财运旺盛，事业也相帮衬，做起事来得心应手，在工作上可以多发力',
	  zy_cy_desc: '在今日的你，因天时旺你偏财运，可以出点小财，买个体彩，既帮人又给自己一个希望。',	  
	  nopay: true,
	  dayluck: false,
	  nextmonthpay: 0,
	  monthpay: 0,
	  kfMaskShow: false,
	  monthnum: new Date().getFullYear() + '-' + utils.formatNumber(new Date().getMonth() + 1) + '-01',
	  nextmonthnum: new Date().getFullYear() + '-' + (utils.formatNumber(new Date().getMonth() + 2) > '12' ? '01' : utils.formatNumber(new Date().getMonth() + 2)) + '-01',
	  onepay: 0,
	  daybtnshow: false,
	  nobtn: false,
	  monthbtnshow: false,
	  monthbtnshow1: false,
	  monthluck: true,
	  yryz: ' 你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？ 整体来说请多保持一颗“喜乐”的心，会更容易掌握好运势。',
	  clickstyle: ['clickstyle1', 'clickstyl2', 'clickstyle3', 'clickstyle4', 'clickstyle5', 'clickstyle6', 'clickstyle7', 'clickstyle8', 'clickstyle9']
  },
  //事件处理函数
//   upper: function() {
// 	  console.log('scroll')
//   },
  disscroll: function (e) {
	//   e.preventDefault()
	// console.log(e, 'move')
  },
  fix: function () {},
  openPay: function (num, text) { // 打开客服会话
	  this.setData({
		  responsenum: '2',
		  responsetext: '立即获得你的月运哦!',
		  kfMaskShow: true,
		  // stopscroll: true,
		  isFixed: 'fix'
	  })
  },
//   openPay: function (e) { //跳转支付页面
// 	  let that = this
// 	//   console.log(userinfo.deviceid)
// 	  let defaultDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-1'
// 	  wx.showLoading({
// 		  title: '加载中...',
// 	  })
// 	  let date = e.currentTarget.dataset.monthnum || defaultDate
// 	  console.log(date, '立即')
// 	  let orderData = {
// 		  "Name": that.data.nickname,
// 		  "CalendarType": datetype, // 1:公历  0：农历
// 		  "DeviceID": userinfo.unionid,
// 		  "userID": '',
// 		  "ParterID": sys.ParterID || "wnl",
// 		  "ClientType": sys.ClientType,
// 		  "Channel": sys.Channel,
// 		  "APPVersion": '1.0',
// 		  "GoodsID": sys.GoodsID,
// 		  "orderID": _orderid,
// 		  "LsDetail": [
// 			  {
// 				  "Date": date
// 			  }
// 		  ],
// 		  "Birthday": datetype ? that.data.birth.slice(0, 4) + '-' + that.data.birth.slice(5, 7) + '-' + that.data.birth.slice(8, 10) : ldate,
// 		  "GLBirthDay": sdate ? sdate : that.data.birth.slice(0, 4) + '-' + that.data.birth.slice(5, 7) + '-' + that.data.birth.slice(8, 10)	
// 	  }
// 	//   console.log(JSON.stringify(orderData), 'order')
// 	  wx.request({
// 		  url: ajaxUrl.pro.buy,
// 		  method: 'post',
// 		  ContentType: 'application/json',
// 		  data: orderData,
// 		  success: (res) => {
// 			//   console.log(JSON.stringify(res), '返回')
// 			  let obj = res.data.data.data
// 			  wx.navigateTo({
// 				  url: '../../pages/pay/pay?parterID=wnl&ordernum=' + (parseInt(date.split('-')[1]) || (new Date().getMonth() + 1)) + '&orderID=' + obj.detailOrderID + '&goodsID=' + obj.goodsID + '&mnID=wxaf5f5069ea45e959' + '&money=' + obj.price + '&name=' + orderData.Name + '&deviceid=' + orderData.DeviceID + '&birthday=' + orderData.Birthday + '&glbirthday=' + orderData.GLBirthDay + '&date=' + orderData.LsDetail[0].Date,
// 			  })
// 			  wx.hideLoading()			  			  			  
// 		  }
// 	  })
//   },
  closeAni: function () { // 关闭动画
	this.setData({
		anishow: false,
		stopscroll: false,
		isFixed: ''			  				
	})
  },
  closeNum: function () { // 关闭动画
	  this.setData({
		  numshow: false,
		  stopscroll: false,
			isFixed: ''			  
	  })
  },
  change: function(e) {
	//   console.log(e)
  },
  openDatePicker: function () {
	  this.setData({
		  datePickerMode: 'show',
		//   stopscroll: true,
		  isFixed: 'fix'
	  })
  },
  cancel: function () { // 关闭日期
	  this.setData({
		  stopscroll: false,
		  isFixed: ''
	  })
  },
  openKfMask: function () { // 打开客服
	this.setData({
		responsenum: '1',
		responsetext: '立即进入大师亲算',
		kfMaskShow: true,
		// stopscroll: true,
		isFixed: 'fix'
	})
  },
  closeKfMask: function () { // 关闭客服
	  this.setData({
		  kfMaskShow: false,
		//   stopscroll: false	
		  isFixed: ''			  
	  })
  },
  toast: function (text) {
	  this.setData({
		  isactive: true,
		  toasttext: text
	  })
	  setTimeout(() => {
		  this.setData({
			  isactive: false
		  })
	  }, 800)
  },
  getDateInfo: function (e) { // 获取选择日期
	//   console.log(e.detail)
	  let that = this
	  that.setData({
		//   stopscroll: false
		  isFixed: ''		
	  })
	  if (e.detail.year) { // 公历
		  let chooseBirth = e.detail.year + '年' + e.detail.month + '月' + e.detail.day + '日'
		  datetype = 1
		  sdate = e.detail.year + '-' + e.detail.month + '-' + e.detail.day
		  ldate = sdate
		  wx.setStorageSync('sdate', sdate)
		  wx.setStorageSync('ldate', ldate)	  
		  this.setData({
			  birth: chooseBirth
		  })
	  } else { // 农历
		  let chooseBirth = e.detail.cYear + '年' + e.detail.cMonth + '月' + e.detail.cDay + '日'
		  datetype = 0
		  ldate = e.detail.lYear + '-' + e.detail.lMonth + '-' + e.detail.lDay
		  sdate = e.detail.cYear + '-' + e.detail.cMonth + '-' + e.detail.cDay
		  wx.setStorageSync('sdate', sdate)
		  wx.setStorageSync('ldate', ldate)	  
		  this.setData({
			  birth: chooseBirth
		  })
	  }
	  let buydata = {
		  "Name": that.data.nickname,
		  "CalendarType": datetype, // 1:公历  0：农历
		  "DeviceID": userinfo.unionid,
		  "userID": '',
		  "ParterID": sys.ParterID || "wnl",
		  "ClientType": sys.ClientType,
		  "Channel": sys.Channel,
		  "APPVersion": sys.APPVersion,
		  "GoodsID": sys.GoodsID,
		  "Birthday": ldate ? ldate : (that.data.birth.slice(0, 4) + '-' + that.data.birth.slice(5, 7) + '-' + that.data.birth.slice(8, 10)),
		  "GLBirthDay": sdate ? sdate : (that.data.birth.slice(0, 4) + '-' + that.data.birth.slice(5, 7) + '-' + that.data.birth.slice(8, 10)),
		  "img": 1
	  }
	//   console.log(JSON.stringify(buydata), '购买') 
	//   that.setData({
	// 		// stopscroll: true,	
	// 	//   isFixed: 'fix',						  
	// 		// numshow: true,
	// 		defaultLuck: false,
	// 		isInput: true
	// 	})
	  let y = parseInt(buydata.GLBirthDay.split('-')[0])
	  let m = parseInt(buydata.GLBirthDay.split('-')[1])
	  let d = parseInt(buydata.GLBirthDay.split('-')[2])
	//   console.log(new Date(y, m - 1, d), 'choose')
	//   console.log(new Date(), 'now')
	//   console.log(new Date(y, m - 1, d) > new Date())	  
	  if (new Date(y, m - 1, d).getTime() > new Date().getTime()) {
		// setTimeout(() => {
		// 	that.setData({
		// 		_number: lifeNum,
		// 		isnumactive: true
		// 	})
		// }, 1600)
		//   wx.showToast({
		// 	  title: '请选择正确的出生日期',
		//   })
		  that.toast('请选择正确的出生日期')	
	} else {
		// this.toast('请选择正确的出生日期')
		// wx.showToast({
		// 	title: '请选择正确的出生日期',
		// })
		wx.request({
			url: ajaxUrl.pro.add,
			method: 'post',
			ContentType: 'application/json',
			data: buydata,
			success: (res) => {
				//   console.log(res)
				that.getDetail(buydata, false, true)
			}
		})
	}
  },
  changeclick: function () { //切换用户按钮点击态
	this.setData({
		changeopa: 'changeopa'
	})
  },
  removechangeclick: function () {
	  this.setData({
		  changeopa: ''
	  })
  },
  openSmlsMask: function () { // 显示数字对应的详解
	//   let num = parseInt(Math.random() * 10 + 1)
	  let num = lifeNum
	  this.setData({
		  lifenum: lifeNum,
		  lifenum_desc: this.data.numDesc[num].text,
		  smlsMaskShow: true,
		//   stopscroll: true	
		  isFixed: 'fix'			  
	  })
  },
  openUsersMask: function () { // 打开切换用户弹窗
	// console.log('切换')
	// this.setData({
	// 	usersMaskShow: true
	// })
	wx.navigateTo({
		url: '../../pages/users/users',
	})
  },
//   closeUsersMask: function () { // 关闭切换用户弹窗
// 	this.setData({
// 		usersMaskShow: false
// 	})
//   },
  closeSmlsMask: function () { // 关闭生命灵数详解弹窗
	this.setData({
		smlsMaskShow: false,
		// stopscroll: false	
		isFixed: ''			
	})
  },
  openTkMask: function (e) { // 打开图卡弹窗
	//   console.log(e.currentTarget.dataset.tktext)
	  let text = e.currentTarget.dataset.tktext || ''
	  let imgsrc = e.currentTarget.dataset.tkimg || ''
	  let date = e.currentTarget.dataset.date || ''
	//   console.log(text, 'text')
	//   console.log(imgsrc, 'img')
	//   console.log(date, 'date')
	//   console.log(date >= this.data.tkid) 		  	  
	//   console.log(this.data.hastk)
	  if (date >= this.data.tkid && this.data.hastk) {
		  console.log('')
	  }
	  else if (date >= '20180326' && !this.data.hastk) {
		  
		  console.log('')
	  }
	  else {
		  
		  this.setData({
			  tktext: text,
			  tkMaskShow: true,
			  //   stopscroll: true,
			  isFixed: 'fix',
			  _tkimg: imgsrc,
			  fixheight: postop - 200
		  })
	  }
  },
  closeTkMask: function () { // 关闭图卡弹窗
	this.setData({
		tkMaskShow: false,
		// stopscroll: false
		isFixed: ''				
	})
  },
  openTodayLuck: function () { // 打开今日运势
	//   console.log(todayLuckObj, 'today')
	todayclick = 1
	this.setData({
		aq_num: todayLuckObj.loveScore || 40,
		sy_num: todayLuckObj.workScore || 60,
		cy_num: todayLuckObj.moneyScore || 80,
		aq_num_width: todayLuckObj.loveScore ? (392 * (todayLuckObj.loveScore / 100) + 'rpx') : (392 * 0.4 + 'rpx'),
		sy_num_width: todayLuckObj.workScore ? (392 * (todayLuckObj.workScore / 100) + 'rpx') : (392 * 0.6 + 'rpx'),
		cy_num_width: todayLuckObj.moneyScore ? (392 * (todayLuckObj.moneyScore / 100) + 'rpx') : (392 * 0.8 + 'rpx'),
		color_text: todayLuckObj.luckColorTxt || '深灰色',
		wp_text: todayLuckObj.luckProduct || '黑米',
		people_text: todayLuckObj.luckPerson || '数字8的人',
		// zy_aq: zy_aq || '',
		// zy_sy: zy_sy || '',
		// zy_cf: zy_cf || '',
		// zy_noaq: zy_noaq || '',
		// zy_nosy: zy_nosy || '',
		// zy_nocf: zy_nocf || '',
		zy_aq_desc: todayLuckObj.loveZY || '在今日的你有财运没爱运，要留意和家人的对话语气，深呼吸会让你避过口角。',
		zy_sy_desc: todayLuckObj.workZY || '在今日的你，因财运旺盛，事业也相帮衬，做起事来得心应手，在工作上可以多发力。',
		zy_cy_desc: todayLuckObj.moneyZY || '在今日的你，因天时旺你偏财运，可以出点小财，买个体彩，既帮人又给自己一个希望。',
		today_opa: true,
		next_opa: false,
		dayluck: false,
		isToday: false,
		isNext: true,
		tkShow: true,
		todayyryz: (todayLuckObj.yryz && todayLuckObj.yryz.length > 0) ? todayLuckObj.yryz : '今天在心中默念十句“我是富有的”增强自己这个月的财富运势。'
	})
  },
  openNextLuck: function (e) { // 打开明日运势
		let that = this
		todayclick = 0		
		// console.log(nextLuckObj, 'nextday')
		this.setData({
			today_opa: false,
			next_opa: true,
			aq_num: nextLuckObj.loveScore || 40,
			sy_num: nextLuckObj.workScore || 60,
			cy_num: nextLuckObj.moneyScore || 80,
			aq_num_width: nextLuckObj.loveScore ? (392 * (nextLuckObj.loveScore / 100) + 'rpx') : (392 * 0.4 + 'rpx'),
			sy_num_width: nextLuckObj.workScore ? (392 * (nextLuckObj.workScore / 100) + 'rpx') : (392 * 0.6 + 'rpx'),
			cy_num_width: nextLuckObj.moneyScore ? (392 * (nextLuckObj.moneyScore / 100) + 'rpx') : (392 * 0.8 + 'rpx'),
			color_text: nextLuckObj.luckColorTxt || '深灰色',
			wp_text: nextLuckObj.luckProduct || '黑米',
			people_text: nextLuckObj.luckPerson || '数字8的人',
			zy_aq_desc: nextLuckObj.loveZY || '在今日的你有财运没爱运，要留意和家人的对话语气，深呼吸会让你避过口角。',
			zy_sy_desc: nextLuckObj.workZY || '在今日的你，因财运旺盛，事业也相帮衬，做起事来得心应手，在工作上可以多发力。',
			zy_cy_desc: nextLuckObj.moneyZY || '在今日的你，因天时旺你偏财运，可以出点小财，买个体彩，既帮人又给自己一个希望。',
			// dayluck: true
			isToday: true,
			isNext: false,
			tkShow: false,
			todayyryz: (nextLuckObj.yryz && nextLuckObj.yryz.length > 0) ? nextLuckObj.yryz : '今天在心中默念十句“我是富有的”增强自己这个月的财富运势。'
					
		})
		if (allowpay === 0 && that.data.onepay === 0) {
			that.setData({
				dayluck: false
			})
		}
		else if (allowpay === 1 && that.data.onepay === 0) {
			that.setData({
				dayluck: true
			})
		}
		else {
			that.setData({
				dayluck: false
			})
		}
  },
  openMonthLuck: function (e) { // 打开本月运势
	// console.log(e.currentTarget.dataset.monthpay)
	// console.log(monthLuckObj)
	let that = this 
	monthclick = 1
	let mpay = e.currentTarget.dataset.monthpay
	this.setData({
		month_opa: true,
		nextmonth_opa: false,
		monthnum: new Date().getFullYear() + '-' + utils.formatNumber(new Date().getMonth() + 1) + '-01',
		isNextMonth: true,
		isMonth: false,
		monthtext: '解析当月运势，查看本月开运建议',
		yryz: monthLuckObj.yryz ? monthLuckObj.yryz : '你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？'
	})
	// console.log(this.data.monthpay)
	// if (allowpay === 0 && that.data.monthpay === 0) {
	if (allowpay === 0) {		
		this.setData({
			monthluck: false,
			ismonthpay: true,
			monthbtnshow: false,
			monthbtnshow1: false,
			nobtn: true,
		})
	}
	else if (allowpay === 1 && that.data.monthpay === 1) {
		this.setData({
			monthluck: false,
			ismonthpay: false,
			monthbtnshow: false,
			monthbtnshow1: false,
			nobtn: true										
		})
	}
	// else if (allowpay === 1 && that.data.nextmonthpay === 0 && monthclick === 0) {
	// 	this.setData({
	// 		monthluck: true,
	// 		ismonthpay: false,
	// 		monthbtnshow: false,
	// 		monthbtnshow1: true,
	// 		nobtn: false
	// 	})
	// }
	else {
		this.setData({
			monthluck: true,
			ismonthpay: true,
			monthbtnshow: true,
			monthbtnshow1: false,
			nobtn: false,
			yryz: '你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？'					
		})
	}
  },
  openNextMonthLuck: function (e) { // 打开下月运势
//   console.log('下月')
	  let mpay = e.currentTarget.dataset.monthpay  
	  let that = this
	  monthclick = 0	  
	this.setData({
		month_opa: false,
		nextmonth_opa: true,
		monthnum: this.getNextMonth(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),
		isNextMonth: false,
		isMonth: true,
		monthtext: '提前预知下月运势，查看开运建议',
		yryz: nextMonthLuckObj.yryz ? nextMonthLuckObj.yryz : '你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？'
	})
	console.log(that.data.monthnum)
	// if (allowpay === 0 && that.data.nextmonthpay === 0) {
	if (allowpay === 0) {		
		this.setData({
			monthluck: false, 
			ismonthpay: true,
			monthbtnshow: false,
			monthbtnshow1: false,
			nobtn: true	
		})
	}
	else if (allowpay === 1 && that.data.nextmonthpay === 1) {
		this.setData({
			monthluck: false,
			ismonthpay: false,
			monthbtnshow: false,
			monthbtnshow1: false,
			nobtn: true					
		})
	}
	else {
		this.setData({
			monthluck: true,
			ismonthpay: true,
			monthbtnshow: false,
			monthbtnshow1: true,
			nobtn: false,
			yryz: '你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？'	
		})
	}
  },
//   setdata: function () {
// 	  this.setData({
// 		  jr: '你好'
// 	  })
//   },
  openHistoryLuck: function () { // 打开历史月运
	wx.navigateTo({
		url: '../../pages/historyluck/historyluck?orderid=' + _orderid,
	})
  },
  getLuck: function (love, work, money) { //获取运势
	  let aq = [], sy = [], cf = [], noaq = [], nosy = [], nocf = []
	  for (let i = 0; i < num2Int(love); i++) {
		  aq.push({})
	  }
	  for (let i = 0; i < num2Int(work); i++) {
		  sy.push({})
	  }
	  for (let i = 0; i < num2Int(money); i++) {
		  cf.push({})
	  }
	  for (let i = 0; i < 5 - num2Int(love); i++) {
		  noaq.push({})
	  }
	  for (let i = 0; i < 5 - num2Int(work); i++) {
		  nosy.push({})
	  }
	  for (let i = 0; i < 5 - num2Int(money); i++) {
		  nocf.push({})
	  }
	  zy_aq = aq
	  zy_sy = sy
	  zy_cf = cf
	  zy_noaq = noaq
	  zy_nosy = nosy
	  zy_nocf = nocf
	  aq_num = love
	  sy_num = work
	  cy_num = money
  },
  getDetail: function (data, _flag1, _flag2) { // 获取运势详情
	  let that = this
	//   console.log(ajaxdata, '请求')
	// console.log(_flag2)
	  if (_flag1) {
		wx.showLoading({
			title: '页面刷新中...',
		})
	}
	  //获取详情
	  wx.request({
		  url: ajaxUrl.pro.getdetail,
		  method: 'post',
		  data: {
			  "DeviceID": userinfo.unionid || 'test',
			  "UserID": '',
			  "name": data.name || that.data.nickname,
			  "GLBirthDay": data.GLBirthDay || '1995-5-20',
			  "ParterID": 'wnl',
			  "ClientType": sys.ClientType,
			  "APPVersion": '1.0.1',
			//   orderid: data.orderid || '',
		  },
		  success: (resdata) => {
			//   console.log(resdata, '返回')
			  if (resdata.statusCode === 200) {
				  console.log(resdata.data, '获取详情成功')
				  let rel = resdata.data.data
				  let gamedata = rel.game ? [...rel.game] : []
				  if (rel.isPay) { // 明日运势展示
					  that.setData({
						  onepay: 1
					  })
				  }
				  else {
					  that.setData({
						//   ispay: false,
						  onepay: 0
					  })
				  }
				  if (allowpay === 0 && that.data.onepay === 0) {
					  that.setData({
						  dayluck: false
					  })
				  }
				  else if (allowpay === 1 && that.data.onepay === 0) {
					  that.setData({
						  dayluck: true
					  })
				  }
				  else {
					  that.setData({
						  dayluck: false				  
					  })
				  }
				  let isupdate = 0
				  let datearr = []
				//   console.log(rel.content[0])
				//   for (let i = 0; i <= rel.content.length; i++) {
				// 	  rel.content[i]._date = rel.content[i].date.split('T')[0].split('-').join('')
				// 	//   if (rel.content[i]._date !== that.data.tkid) {
				// 	// 	  isupdate = 0
				// 	// 	  break
				// 	//   }
				// 	//   else {
				// 	// 	  continue
				// 	//   }
				// 	  datearr.push(rel.content[i]._date)
				//   };
				  rel.content.forEach(item => {
					//   console.log(item)
						item._date = item.date.split('T')[0].split('-').join('')
						datearr.push(item._date)
				  })
				//   console.log(datearr)
				//   console.log(datearr.indexOf(that.data.tkid))
				if (datearr.indexOf(that.data.tkid) < 0) {
					isupdate = 1
				}
				else {
					isupdate = 0
				}
				// console.log(isupdate)
				  
				//   else if (rel.content[0].luckProduct <= 0) {
				if (isupdate === 1 && rel.userInfo.orderID.length <= 0) {
						isInputDate = 0
						todayLuckObj.yryz = '今天在心中默念十句“我是富有的”增强自己这个月的财富运势。'
						nextLuckObj.yryz = '今天在心中默念十句“我是富有的”增强自己这个月的财富运势。'
						that.setData({
							defaultLuck: true,
							isInput: false,
							daybtnshow: true,
							anishow: true,
							stopscroll: true,
							isFixed: 'fix',
							nobtn: false,
							hastk: false,
							hasdata: false,
							monthbtnshow: false,
							monthbtnshow1: false,
							avtar: userinfo.avtar,
							todayyryz: '今天在心中默念十句“我是富有的”增强自己这个月的财富运势。',
							nickname: userinfo.nickname.length > 4 ? userinfo.nickname.slice(0, 4) + '...' : userinfo.nickname
						})
						setTimeout(() => {
							this.setData({
								hasuserinfo: true,
								nouserinfo: false
							}, 200)
						})
					}
				  else if (isupdate === 1) {
					//   console.log(isupdate)
					//   console.log('无')
							todayLuckObj.yryz = '今天在心中默念十句“我是富有的”增强自己这个月的财富运势。'
							nextLuckObj.yryz = '今天在心中默念十句“我是富有的”增强自己这个月的财富运势。'
							that.setData({
								defaultLuck: true, // 展示默认数据
								isInput: false,
								daybtnshow: false,
								hastk: false,
								//   anishow: true,
								//   stopscroll: true,
								//   isFixed: 'fix',
								hasdata: false, // 展示默认数据
								nobtn: true,
								monthbtnshow: false,
								monthbtnshow1: false,
								avtar: userinfo.avtar,
								nickname: userinfo.nickname.length > 4 ? userinfo.nickname.slice(0, 4) + '...' : userinfo.nickname,
								todayyryz: '今天在心中默念十句“我是富有的”增强自己这个月的财富运势。',
							})
							setTimeout(() => {
								this.setData({
									hasuserinfo: true,
									nouserinfo: false
								}, 200)
							})
				  }
				  else if (rel.userInfo.orderID.length <= 0) { // 展示默认信息
					  //   if (1 > 0) { // 展示默认信息				
					  // console.log('user')
					  isInputDate = 0
					  that.setData({
						  hasdata: true,
						  defaultLuck: true,
						  isInput: false,
						  daybtnshow: true,
						  anishow: true,
						  stopscroll: true,
						  isFixed: 'fix',
						  nobtn: false,
						  hastk: false,
						  monthbtnshow: false,
						  monthbtnshow1: false,
						  avtar: userinfo.avtar,
						  nickname: userinfo.nickname.length > 4 ? userinfo.nickname.slice(0, 4) + '...' : userinfo.nickname
					  })
					  setTimeout(() => {
						  this.setData({
							  hasuserinfo: true,
							  nouserinfo: false
						  }, 200)
					  })
				  }
				  else {
					that.setData({
						hastk: true
					})
					  if (rel.userInfo.img !== "1") {
						  that.setData({
							  avtar: 'https://qiniu.image.cq-wnl.com/content/201804264f6c88638faf4feaa029da3b8ffa7eb6.jpg',
							//   nickname: userinfo.nickname
						  })
					  }
					  else {
						  that.setData({
							  avtar: userinfo.avtar,
							  nickname: userinfo.nickname.length > 4 ? userinfo.nickname.slice(0, 4) + '...' : userinfo.nickname
						  })
					  }
					  _orderid = rel.userInfo.orderID
					  lifeNum = rel.userInfo.lifeNum
					  isInputDate = 1
					  let birth = rel.userInfo.glBirthday.split('T')[0].split('-')[0] + '年' + rel.userInfo.glBirthday.split('T')[0].split('-')[1] + '月' + rel.userInfo.glBirthday.split('T')[0].split('-')[2] + '日'
					//   lifeNum = rel.userInfo.lifeNum
					  let content = [...rel.content]
					  let now = new Date().getFullYear() + '-' + utils.formatNumber(new Date().getMonth() + 1) + '-' + utils.formatNumber(new Date().getDate())
					//   console.log(now)
					  content.forEach((item) => {
						  if (item.type === 0) { // 今日或明日运势
							  if (now === item.date.split('T')[0]) { //今日运势
								//   console.log('jinri', item.date.split('T')[0])
								  Object.assign(todayLuckObj, {
									  date: item.date,
									  loveScore: item.loveScore || 40,
									  loveZY: item.loveZY || '在今日的你有财运没爱运，要留意和家人的对话语气，深呼吸会让你避过口角。',
									  luckColorTxt: item.luckColorTxt || '深灰色',
									  luckPerson: item.luckPerson || '数字8的人',
									  luckProduct: item.luckProduct || '黑米',
									  moneyScore: item.moneyScore || 80,
									  moneyZY: item.moneyZY || '在今日的你，因天时旺你偏财运，可以出点小财，买个体彩，既帮人又给自己一个希望。',
									  workScore: item.workScore || 60,
									  workZY: item.workZY || '在今日的你，因财运旺盛，事业也相帮衬，做起事来得心应手，在工作上可以多发力。',
									  yryz: item.oneDayOneForward || '今天在心中默念十句“我是富有的”增强自己这个月的财富运势。'
								  })
								//   console.log(todayLuckObj, '今天')
								  that.setData({
									  aq_num: item.loveScore || 40,
									  sy_num: item.workScore || 60,
									  cy_num: item.moneyScore || 80,
									//   aq_num_width: '152rpx',
									//   sy_num_width: '200rpx',
									//   cy_num_width: '290rpx',
									//   aq_num_width: 392 * (item.loveScore / 100) + 'rpx',
									//   sy_num_width: 392 * (item.workScore / 100) + 'rpx',
									//   cy_num_width: 392 * (item.moneyScore / 100) + 'rpx',
									  aq_num_width: item.loveScore ? (392 * (item.loveScore / 100) + 'rpx') : (392 * 0.4 + 'rpx'),
									  sy_num_width: item.workScore ? (392 * (item.workScore / 100) + 'rpx') : (392 * 0.6 + 'rpx'),
									  cy_num_width: item.moneyScore ? (392 * (item.moneyScore / 100) + 'rpx') : (392 * 0.8 + 'rpx'),
									  color_text: item.luckColorTxt || '深灰色',
									  wp_text: item.luckProduct || '黑米',
									  people_text: item.luckPerson || '数字8的人',
									  zy_aq_desc: item.loveZY || '在今日的你有财运没爱运，要留意和家人的对话语气，深呼吸会让你避过口角。',
									  zy_sy_desc: item.workZY || '在今日的你，因财运旺盛，事业也相帮衬，做起事来得心应手，在工作上可以多发力。',
									  zy_cy_desc: item.moneyZY || '在今日的你，因天时旺你偏财运，可以出点小财，买个体彩，既帮人又给自己一个希望。',						  
									  daluck: false,
									  todayyryz: item.oneDayOneForward || '今天在心中默念十句“我是富有的”增强自己这个月的财富运势。'
								  })
							  }
							  else { //明日
								  Object.assign(nextLuckObj, {
									  date: item.date,
									  loveScore: item.loveScore || 40,
									  loveZY: item.loveZY || '在今日的你有财运没爱运，要留意和家人的对话语气，深呼吸会让你避过口角。',
									  luckColorTxt: item.luckColorTxt || '深灰色',
									  luckPerson: item.luckPerson || '数字8的人',
									  luckProduct: item.luckProduct || '黑米',
									  moneyScore: item.moneyScore || 80,
									  moneyZY: item.moneyZY || '在今日的你，因天时旺你偏财运，可以出点小财，买个体彩，既帮人又给自己一个希望。',
									  workScore: item.workScore || 60,
									  workZY: item.workZY || '在今日的你，因财运旺盛，事业也相帮衬，做起事来得心应手，在工作上可以多发力。',
									  yryz: item.oneDayOneForward || '今天在心中默念十句“我是富有的”增强自己这个月的财富运势。'									  
								  })
								  that.getLuck(item.loveScore, item.workScore, item.moneyScore)
								//   console.log(nextLuckObj, '今天')
								//   that.setData({
								// 	  today_opa: false,
								// 	  next_opa: true,
								// 	  aq_num: nextLuckObj.loveScore || 40,
								// 	  sy_num: nextLuckObj.moneyScore || 60,
								// 	  cy_num: nextLuckObj.workScore || 80,
								// 	  aq_num_width: 392 * (nextLuckObj.loveScore / 100) + 'rpx',
								// 	  sy_num_width: 392 * (nextLuckObj.moneyScore / 100) + 'rpx',
								// 	  cy_num_width: 392 * (nextLuckObj.workScore / 100) + 'rpx',
								// 	  color_text: nextLuckObj.luckColorTxt || '',
								// 	  wp_text: nextLuckObj.luckProduct || '',
								// 	  people_text: nextLuckObj.luckPerson || '',
								// 	  zy_aq_desc: nextLuckObj.loveZY || '',
								// 	  zy_sy_desc: nextLuckObj.workZY || '',
								// 	  zy_cy_desc: nextLuckObj.moneyZY || '',
								// 	  // dayluck: true
								// 	  isToday: true,
								// 	  isNext: false,
								// 	  tkShow: false,
								// 	  todayyryz: nextLuckObj.yryz || ''
								//   })
								  if (nextLuckObj.yryz && todayclick === 0 && that.data.onepay === 1) {
									//   console.log('设置')
									  that.setData({
										  dayluck: false,
										  today_opa: false,
										  next_opa: true,
										  aq_num: nextLuckObj.loveScore || 40,
										  sy_num: nextLuckObj.workScore || 60,
										  cy_num: nextLuckObj.moneyScore || 80,
										//   aq_num_width: (392 * (nextLuckObj.loveScore / 100) + 'rpx') || (392 * (40 / 100) + 'rpx'),
										//   sy_num_width: (392 * (nextLuckObj.workScore / 100) + 'rpx') || (392 * (60 / 100) + 'rpx'),
										//   cy_num_width: (392 * (nextLuckObj.moneyScore / 100) + 'rpx') || (392 * (80 / 100) + 'rpx'),
										  aq_num_width: nextLuckObj.loveScore ? (392 * (nextLuckObj.loveScore / 100) + 'rpx') : (392 * 0.4 + 'rpx'),
										  sy_num_width: nextLuckObj.workScore ? (392 * (nextLuckObj.workScore / 100) + 'rpx') : (392 * 0.6 + 'rpx'),
										  cy_num_width: nextLuckObj.moneyScore ? (392 * (nextLuckObj.moneyScore / 100) + 'rpx') : (392 * 0.8 + 'rpx'),
										  color_text: nextLuckObj.luckColorTxt || '深灰色',
										  wp_text: nextLuckObj.luckProduct || '黑米',
										  people_text: nextLuckObj.luckPerson || '数字8的人',
										  zy_aq_desc: nextLuckObj.loveZY || '在今日的你有财运没爱运，要留意和家人的对话语气，深呼吸会让你避过口角。',
										  zy_sy_desc: nextLuckObj.workZY || '在今日的你，因财运旺盛，事业也相帮衬，做起事来得心应手，在工作上可以多发力。',
										  zy_cy_desc: nextLuckObj.moneyZY || '在今日的你，因天时旺你偏财运，可以出点小财，买个体彩，既帮人又给自己一个希望。',
										  // dayluck: true
										  isToday: true,
										  isNext: false,
										  tkShow: false,
										  todayyryz: nextLuckObj.yryz || '今天在心中默念十句“我是富有的”增强自己这个月的财富运势。'
									  })
								  }
								//   console.log(nextLuckObj, 'next')
							  }
						  }
						  else { // 本月或下月运势
							  let nowMonth = new Date().getMonth() + 1
							  if (nowMonth === parseInt(item.date.split('T')[0].split('-')[1])) { //本月
								  if (item.luckPropose.length <= 0) {
										  that.setData({
											//   nextmonthpay: 0,
											  monthpay: 0,
											  monthluck: true,
											  ismonthpay: false,
											  monthbtnshow: true,
											  monthbtnshow1: false,
											  yryz: '你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？'									  
										  })
									}
									else {
									//   console.log('本月')							  								
									  Object.assign(monthLuckObj, {
										  aq: item.loveScore,
										  sy: item.workScore,
										  cy: item.moneyScore,
										  noaq: 5 - item.loveScore,
										  nosy: 5 - item.workScore,
										  nocy: 5 - item.moneyScore,
										  luckPropose: item.luckPropose,
										  yryz: item.oneDayOneForward.length > 0 ? item.oneDayOneForward : '你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？'
									  })
									  let aqlist = [], noaqlist = [], sylist = [], nosylist = [], cylist = [], nocylist = []
									  for (let i = 0; i < monthLuckObj.aq; i++) {
										  aqlist.push({})
									  }
									  for (let i = 0; i < monthLuckObj.noaq; i++) {
										  noaqlist.push({})
									  }
									  for (let i = 0; i < monthLuckObj.sy; i++) {
										  sylist.push({})
									  }
									  for (let i = 0; i < monthLuckObj.nosy; i++) {
										  nosylist.push({})
									  }
									  for (let i = 0; i < monthLuckObj.cy; i++) {
										  cylist.push({})
									  }
									  for (let i = 0; i < monthLuckObj.nocy; i++) {
										  nocylist.push({})
									  }
									  that.setData({
										  month_aq: aqlist,
										  month_sy: sylist,
										  month_cf: cylist,
										  month_noaq: noaqlist,
										  month_nosy: nosylist,
										  month_nocf: nocylist,
										  hyjy: monthLuckObj.luckPropose,
										  yryz: monthLuckObj.yryz.length > 0 ? monthLuckObj.yryz : '你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？',
										//   nextmonthpay: 0,
										  monthpay: 1,
										  monthluck: false,
										  ismonthpay: true,
										  monthbtnshow: false,
										  monthbtnshow1: false,
									  })
									}
							  }
							  else {
								  if (item.luckPropose.length <= 0) {
									  that.setData({
										  nextmonthpay: 0,
										//   monthpay: 0,
										  monthluck: true,
										//   monthbtnshow: false,
										//   monthbtnshow1: true,
										  yryz: '你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？'								
									  })
								  }
								  else {
									//   console.log('下月')									  
									  Object.assign(nextMonthLuckObj, {
										  aq: item.loveScore,
										  sy: item.workScore,
										  cy: item.moneyScore,
										  noaq: 5 - item.loveScore,
										  nosy: 5 - item.workScore,
										  nocy: 5 - item.moneyScore,
										  luckPropose: item.luckPropose,
										  yryz: item.oneDayOneForward.length > 0 ? item.oneDayOneForward : '你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？'
									  })
									  let aqlist = [], noaqlist = [], sylist = [], nosylist = [], cylist = [], nocylist = []
									  for (let i = 0; i < nextMonthLuckObj.aq; i++) {
										  aqlist.push({})
									  }
									  for (let i = 0; i < nextMonthLuckObj.noaq; i++) {
										  noaqlist.push({})
									  }
									  for (let i = 0; i < nextMonthLuckObj.sy; i++) {
										  sylist.push({})
									  }
									  for (let i = 0; i < nextMonthLuckObj.nosy; i++) {
										  nosylist.push({})
									  }
									  for (let i = 0; i < nextMonthLuckObj.cy; i++) {
										  cylist.push({})
									  }
									  for (let i = 0; i < nextMonthLuckObj.nocy; i++) {
										  nocylist.push({})
									  }
									//   if (monthclick === 0) {
										  that.setData({
											  month_aq: aqlist,
											  month_sy: sylist,
											  month_cf: cylist,
											  month_noaq: noaqlist,
											  month_nosy: nosylist,
											  month_nocf: nocylist,
											  hyjy: nextMonthLuckObj.luckPropose,
											  yryz: nextMonthLuckObj.yryz.length > 0 ? nextMonthLuckObj.yryz : '你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？',
											  nextmonthpay: 1,
											  monthluck: false,
											//   monthbtnshow: false,
											//   monthbtnshow1: true,
											  //   monthpay: 0,
										  })
									//   }
								  }
							  }
						  }
					  })
					  that.setData({
						  nickname: rel.userInfo.name.length > 4 ? rel.userInfo.name.slice(0, 4) + '...' : rel.userInfo.name,
						  defaultLuck: false,
						  isInput: true,
						  anishow: false,
						//   stopscroll: false,
						  isFixed: '',						
						  // color_text: '深灰色',
						  // wp_text: '黑米',
						  // people_text: '数字1的人',
						  color: that.data.numDesc[lifeNum].color,
						  birth: birth,
						  dyw: that.data.numDesc[lifeNum].dyw,
						  lifenum: lifeNum,
					  })
					//   console.log(rel.userInfo, 'user')
					  if (allowpay === 1 && that.data.monthpay === 0 && monthclick === 1 && rel.userInfo.orderID.length > 0 && isupdate === 0) {
						  that.setData({
							  daybtnshow: false,
							  monthbtnshow: true,
							  monthbtnshow1: false,
							  nobtn: false							  
						  })
					  }
					  else if (allowpay === 1 && that.data.nextmonthpay === 0 && monthclick === 0 && rel.userInfo.orderID.length > 0 && isupdate === 0) {
						  that.setData({
							  daybtnshow: false,
							  monthbtnshow: false,
							  monthbtnshow1: true,
							  nobtn: false
						  })
					  }
					  else {
						  that.setData({
							  daybtnshow: false,
							  monthbtnshow: false,
							  monthbtnshow1: false,
							  nobtn: true
							//   monthpay: 0,
							//   nextmonthpay: 0
						  })
					  }
				  }
				  gamedata.forEach((item, index) => {
					  let dateobj = item.date.split('T')[0].split('-')
					  let imgdesc = item.imgDesc || ''
					  item.date1 = dateobj.join('')
					//   console.log(item.date)				  
					//   if (item.date1 === that.data.tkid) {
					// 	  that.setData({
					// 		  hastk: true
					// 	  })
					//   }
					//   else {
					// 	  that.setData({
					// 		  hastk: false
					// 	  })
					//   }
					//   item.imgDesc = item.imgDesc.length ? item.imgDesc.slice(0, 34) : item.luckPropose
					  if (imgdesc.length >= 34 && that.data.hastk) {
						//   console.log('islong')
						item.islong = true
						item.desc = imgdesc.slice(0, 34)
					  }
					  else if (imgdesc.length > 0 && that.data.hastk) {
						//   console.log('没有')					  
						  item.desc = imgdesc
						  item.islong = false				  
					  }
					  else {
						  item.desc = item.luckPropose
						  item.islong = false											  
					  }
				  })
				//   console.log(gamedata, 'game')
				  if (todayclick === 1) { // 返回当时选中状态的页面
					  that.setData({
						  tkobj: gamedata,
						//   isNextMonth: true,
						//   isMonth: false,
						  isToday: false,
						  isNext: true,
						  today_opa: true,
						  next_opa: false,
						//   month_opa: true,
						//   nextmonth_opa: false,
						  dayluck: false
					  })
				  }
				  else {
					  that.setData({
						  tkobj: gamedata,
						//   isNextMonth: true,
						//   isMonth: false,
						  isToday: true,
						  isNext: false,
						  today_opa: false,
						  next_opa: true,
						//   month_opa: true,
						//   nextmonth_opa: false,
						//   dayluck: false
					  })
				  }
				  if (monthclick === 1 && rel.userInfo.orderID.length > 0 && isupdate === 0) { // 之前点击了本月(返回点击本月的状态)
					  if (that.data.monthpay === 1) {
						  that.setData({
							  tkobj: gamedata,
							  isNextMonth: true,
							  isMonth: false,
							  month_opa: true,
							  nextmonth_opa: false,
							  monthluck: false,
							  monthbtnshow: false,
							  monthbtnshow1: false,
							  nobtn: true
						  })
					  }
					//   else if (that.data.nextmonthpay === 1) {
					// 	//   console.log('显示')						  						  
					// 	  that.setData({
					// 		  tkobj: gamedata,
					// 		  isNextMonth: true,
					// 		  isMonth: false,
					// 		  month_opa: true,
					// 		  nextmonth_opa: false,
					// 		  monthluck: true,
					// 		//   monthbtnshow: true,
					// 		  monthbtnshow1: false,
					// 		  nobtn: false
					// 	  })
					//   }
					  else {
						  that.setData({
							  tkobj: gamedata,
							  isNextMonth: true,
							  isMonth: false,
							  month_opa: true,
							  nextmonth_opa: false,
							  monthluck: true,
							    monthbtnshow: true,
							  monthbtnshow1: false,
							  nobtn: false,
							  yryz: '你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？'
						  })
					  }
				  }
				  else if (monthclick === 0 && rel.userInfo.orderID.length > 0 && isupdate === 0) { // 返回点击下月的状态
					  if (that.data.nextmonthpay === 1) {
						  that.setData({
							  tkobj: gamedata,
							  isNextMonth: false,
							  isMonth: true,
							  month_opa: false,
							  nextmonth_opa: true,
							  monthluck: false,
							  monthbtnshow: false,
							  monthbtnshow1: false,
							  nobtn: true
						  })
					  }
					//   else if (that.data.nextmonthpay === 1) {
					// 	  that.setData({
					// 		  tkobj: gamedata,
					// 		  isNextMonth: false,
					// 		  isMonth: true,
					// 		  month_opa: false,
					// 		  nextmonth_opa: true,
					// 		  monthluck: true,
					// 		  monthbtnshow: false,
					// 		  monthbtnshow1: false,
					// 		  nobtn: false
					// 	  })
					//   }
					  else {
						  that.setData({
							  tkobj: gamedata,
							  isNextMonth: false,
							  isMonth: true,
							  month_opa: false,
							  nextmonth_opa: true,
							  monthluck: true,
							  monthbtnshow: false,
							  monthbtnshow1: true,
							  nobtn: false,
							  yryz: '你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？'
						  })
					  }
					  
				  }
				//   if (that.data.monthpay === 1) {
				// 	  that.setData({
				// 		  monthluck: false,
				// 		  monthbtnshow: false,
				// 		  nobtn: true
				// 	  })
				//   }
				//   else if (that.data.nextmonthpay === 1) {
				// 	  that.setData({
				// 		  monthluck: false,
				// 		  monthbtnshow: false,
				// 		  nobtn: true
				// 	  })
				//   }
				  if (that.data.nextmonthpay === 1 && that.data.monthpay === 1) {
					  that.setData({
						  monthluck: false
						//   monthbtnshow: true			  
					  })
				  }
				  if (_flag2) {
					  that.setData({
						  tkobj: gamedata,
						  stopscroll: true,
						  numshow: true,
						  isInput: true,
						  defaultLuck: false,
						  isFixed: 'fix'
					  })
					  setTimeout(() => {
						//   console.log(lifeNum)						  
						  that.setData({
							  _number: lifeNum || 8,
							  isnumactive: true
						  })
					  }, 1600)
				  }
				  wx.hideLoading()
			  }
			  else {
				  wx.showToast({
					  title: '数据出错',
				  })
			  }
		  },
		  fail: () => {
			  wx.showToast({
				  title: '请求数据失败',
			  })
		  }
	  })
  },
  addclick: function (n) {
	  let num = n.toString() || ''
	  this.setData({
		  clickstyle: 'clickstyle' + num
	  })
  },
  removeclick: function () {
	  this.setData({
		  clickstyle: ''
	  })
  },
//   按钮点击态
	addclick1: function () {
		this.setData({
			clickstyle1: 'clickstyle1'
		})
	},
	removeaddclick1: function () {
		this.setData({
			clickstyle1: ''
		})
	},
	addclick2: function () {
		this.setData({
			clickstyle2: 'clickstyle2'
		})
	},
	removeaddclick2: function () {
		this.setData({
			clickstyle2: ''
		})
	},
	addclick3: function () {
		this.setData({
			clickstyle3: 'clickstyle3'
		})
	},
	removeaddclick3: function () {
		this.setData({
			clickstyle3: ''
		})
	},
	addclick4: function () {
		this.setData({
			clickstyle4: 'clickstyle4'
		})
	},
	removeaddclick4: function () {
		this.setData({
			clickstyle4: ''
		})
	},
	addclick5: function () {
		this.setData({
			clickstyle5: 'clickstyle5'
		})
	},
	removeaddclick5: function () {
		this.setData({
			clickstyle5: ''
		})
	},
	addclick6: function () {
		this.setData({
			clickstyle6: 'clickstyle6'
		})
	},
	removeaddclick6: function () {
		this.setData({
			clickstyle6: ''
		})
	},
	addclick7: function () {
		this.setData({
			clickstyle7: 'clickstyle7'
		})
	},
	removeaddclick7: function () {
		this.setData({
			clickstyle7: ''
		})
	},
	addclick8: function () {
		this.setData({
			clickstyle8: 'clickstyle8'
		})
	},
	removeaddclick8: function () {
		this.setData({
			clickstyle8: ''
		})
	},
	addclick9: function () {
		this.setData({
			clickstyle9: 'clickstyle9'
		})
	},
	removeaddclick9: function () {
		this.setData({
			clickstyle9: ''
		})
	},
  getNextMonth: function(date) {
		let arr = date.split('-');
		let year = arr[0]; //获取当前日期的年份
		let month = arr[1]; //获取当前日期的月份
		let day = arr[2]; //获取当前日期的日
		let days = new Date(year, month, 0);
		days = days.getDate(); //获取当前日期中的月的天数
		let year2 = year;
		let month2 = parseInt(month) + 1;
		if(month2 === 13) {
			year2 = parseInt(year2) + 1;
			month2 = 1;
		}
		let day2 = day;
		let days2 = new Date(year2, month2, 0);
		days2 = days2.getDate();
		if(day2 > days2) {
			day2 = days2;
		}
            if (month2 < 10) {
			month2 = '0' + month2;
		}
        
		// let t2 = year2 + '-' + month2 + '-' + day2;
		let t2 = year2 + '-' + month2 + '-01';	
		// return parseInt(month2);
		return t2
	},
    openOther: function (e) { //打开其他小程序
		console.log(e.currentTarget.dataset.url)
		wx.navigateToMiniProgram({
			appId: e.currentTarget.dataset.url,
			path: 'pages/index/index',
			envVersion: 'release',
			success: (res) => {
				// 打开成功
			}
		})
	},
	whclick: function () {
		this.setData({
			whclick: 'whclickstyle'
		})
	},
	removewhclick: function () {
		this.setData({
			whclick: ''
		})
	},
	addsharestyle: function () {
		this.setData({
			shareclickstyle: 'shareclickstyle'
		})
	},
	removesharestyle: function () {
		this.setData({
			shareclickstyle: ''
		})
	},
	addtoday: function () {
		this.setData({
			todaystyle: 'todaystyle'
		})
	},
	removetoday: function () {
		this.setData({
			todaystyle: ''
		})
	},
	onReady: function () {
		var query = wx.createSelectorQuery()
		// let scrollHeight
		query.select('#tk').boundingClientRect()
		// // query.select('#comment2').boundingClientRect()
		// query.select('#button').boundingClientRect()
		query.exec(function (res) {
			res[0].top       // #the-id节点的上边界坐标
			// res[1].Top // 显示区域的竖直滚动位置
			// scrollHeight = res[0].top - res[1].top
			// buttonBottom = res[0].bottom
			// console.log(res[0].top)
			// postop = res[0].top
		})
	},
	onHide: function () {
		clearInterval(timer)
	},
	getinfo: function (res) {
		// console.log(res, 'res')
		let that = this
		let _res = res.detail
		// this.setData({
		// 	hasuserinfo: true,
		// 	nouserinfo: false
		// })
		let unionobj = {}
		unionobj.encryptedDataStr = _res.encryptedData
		unionobj.iv = _res.iv
		userinfo.avtar = _res.userInfo.avatarUrl
		userinfo.nickname = _res.userInfo.nickName.length > 4 ? _res.userInfo.nickName.slice(0, 4) + '...' : _res.userInfo.nickName
		wx.setStorageSync('nickname', userinfo.nickname)
		wx.setStorageSync('avtar', userinfo.avtar)
		wx.login({
			success: res => {
				let code = res.code
				console.log(res, '12')
				wx.request({
					url: 'https://b.cqyouloft.com/atcapi/WeChat/GetMiniProgramUserInfo?name=smls&code=' + code,
					method: 'get',
					success: res => {
						console.log(res, 'aaaaa')
						unionobj.key = res.data.Session_key
						userinfo.deviceid = res.data.OpenID
						wx.setStorageSync('openid', res.data.OpenID)
						console.log(res.data.Unionid, 'res')
						if (res.data.Unionid) {
							// console.log('unionid')
							// console.log(JSON.parse(res.data.data).unionId, 'uid')
							let unionid = res.data.Unionid
							userinfo.unionid = unionid
							// console.log(unionid)
							wx.setStorageSync('unionid', unionid)
							// console.log(userinfo)
							//获取用户列表
							wx.request({
								url: ajaxUrl.pro.getOrderList,
								method: 'POST',
								dataType: 'json',
								ContentType: 'application/json',
								data: {
									"DeviceID": wx.getStorageSync('unionid') || "test1"
								},
								success: (_res) => {
									console.log(_res, 'res', _res.data.data.length)
									let userdata = _res.data.data.length > 0 ? _res.data.data[0] : {}
									let birth = _res.data.data.length > 0 ? userdata.glBirthDay.split('T')[0] : '1995-03-26'
									// console.log(birth, 'birth')
									let _data = {
										"name": userdata.name || '张三',
										"UserID": "",
										"DeviceID": unionid,
										// "GLBirthDay": that.data.birth.slice(0, 4) + '-' + that.data.birth.slice(5, 7) + '-' + that.data.birth.slice(8, 10) || '1995-03-26',
										"GLBirthDay": birth || '1995-03-26',
										"ParterID": 'wnl',
										"ClientType": sys.ClientType
									}
									// console.log(_data, '_data')
									
									that.getDetail(_data)
									this.setData({
										hasuserinfo: true,
										nouserinfo: false
									})
								}
							})

						}
						else {
							wx.request({
								url: ajaxUrl.pro.getunionid,
								method: 'POST',
								contentType: 'application/x-www-form-urlencoded',
								data: unionobj,
								success: (rel) => {
									// console.log(JSON.parse(res.data.data).unionId, 'uid')
									let unionid = JSON.parse(rel.data.data).unionId
									userinfo.unionid = unionid
									// console.log(unionid)
									wx.setStorageSync('unionid', unionid)
									// console.log(userinfo)
									//获取用户列表
									wx.request({
										url: ajaxUrl.pro.getOrderList,
										method: 'POST',
										ContentType: 'application/json',
										data: {
											"DeviceID": wx.getStorageSync('unionid') || "test1"
										},
										success: (_res) => {
											// console.log(_res, 'res')
											let userdata = _res.data.data.length > 0 ? [..._res.data.data][0] : {}
											let birth = _res.data.data.length > 0 ? userdata.glBirthDay.split('T')[0] : '1995-03-26'
											let _data = {
												"name": userdata.name || that.data.nickname,
												"UserID": "",
												"DeviceID": unionid,
												"GLBirthDay": birth || that.data.birth.slice(0, 4) + '-' + that.data.birth.slice(5, 7) + '-' + that.data.birth.slice(8, 10),
												"ParterID": 'wnl',
												"ClientType": sys.ClientType
											}
											// console.log(_data, '_data')
											that.getDetail(_data)
											setTimeout(() => {
												this.setData({
													hasuserinfo: true,
													nouserinfo: false
												}, 200)
											})
										}
									})
								}
							})
						}
					},
					error: res => {
						console.log(res)
					}
				});
			}
		});
	},
  onLoad: function (_obj, flag1, flag2) {
	//   console.log(this.data.lifenum, 'lifenum')
	  let that = this
	  let top = -140
	  let default_n = 1
	//   that.toast('请选择正确的出生事件')
	//   let y = parseInt(this.data.birth.slice(0, 4))
	//   let m = parseInt(this.data.birth.slice(5, 7))
	//   let d = parseInt(this.data.birth.slice(8, 10))
	//   console.log(y)
	//   console.log(new Date(y, m - 1, d), 'choose')
	//   console.log(new Date(2017, 08, 21).getTime())
	  defaultGame.forEach((item, index) => {
		  //   let dateobj = item.date.split('T')[0].split('-')
		  let imgdesc = item.imgDesc || ''
		  if (imgdesc.length >= 34) {
			item.islong = true
			  item.desc = imgdesc.slice(0, 34)
		  }
		  else if (imgdesc.length > 0) {
			  item.desc = imgdesc
			  item.islong = false			  
		  }
		  else {
			  item.desc = item.luckPropose
			  item.islong = false		  
		  }
	  })
	  that.setData({
		  defaultGame: defaultGame
	  })
	  wx.getSystemInfo({ // 获取设备信息
		  success: (res) => {
			  console.log(res, '设备')
			  sys.Channel = res.system.split(' ')[0]
			  sys.ClientType = res.system.split(' ')[0].toLocaleLowerCase() === 'ios' ? 'Youloft_IOS' : 'Youloft_Android'
			  wx.setStorageSync('sys', sys)
			  sysh = res.screenHeight
			  if (res.pixelRatio > 2 && res.screenWidth < 412) {
				  this.setData({
					  tip_top: 10 + 'rpx'
				  })
				//   fklist.forEach((item) => {
				// 	  item.content = item.content.length >= 20 ? item.content.slice(0, 20) + '...' : item.content
				//   })
			  }
			//   支付开关接口
			  wx.request({
				  url: ajaxUrl.pro.isopen,
				  data: {
					  parterID: 'wnl',
					  appVersion: '1.0.1',
					  clientType: sys.ClientType
				  },
				  success: (res) => {
					  console.log(res, 'pay')
					  let allowpayobj = res.data.data
					  if (allowpayobj.ispay) {
						  allowpay = 1
						  that.setData({
							  ispay: true,
			  				  allowpay: 1,
								nobtn: true		
						  })
					  }
					  else {
						  allowpay = 0
							that.setData({
								ispay: true,
								nobtn: false,
								allowpay: 0		
							})
					  }
				  }
			  })
			  // console.log(wx.getStorageSync('sys'))
		  },
		  fail: function () {
			  console.log('失败')
		  }
	  })
	//   console.log(new Date().getSeconds(), 'before')
	  wx.request({
		  url: ajaxUrl.pro.getComment,
		  method: 'get',
		  success: (res) => {
			  fklist = res.data.data
			  this.setData({
				  fklist: fklist,
				//   peoplenum: fklist.length
			  })
			//   console.log(new Date().getSeconds(), 'after')			  
			  let that = this
			  let _top = top
			  let default_n = 1
			  timer = setInterval(() => {
				  that.setData({
					  scrolltop: _top + 'px'
				  })
				  _top -= 70
				  if (default_n % 3 === 0) {
					  _list = _list.concat(fklist)
					  that.setData({
						  fklist: _list
					  })
				  }
				  default_n++
				  top = _top
			  }, 2500)
		  }
	  })
	// 获取其他小程序
	wx.request({
		url: ajaxUrl.pro.getOtherMini,
		method: 'get',
		success: (res) => {
			let miniList = res.data.data
			// console.log(res, '其他测算信息')
			that.setData({
				miniList: miniList
			})
		}
	})
		wx.getUserInfo({
			success: res => {
				// 可以将 res 发送给后台解码出 unionId
				//   console.log(res, 'res')
				this.setData({
					hasuserinfo: true,
					nouserinfo: false
				})
				let unionobj = {}
				unionobj.encryptedDataStr = res.encryptedData
				unionobj.iv = res.iv
				userinfo.avtar = res.userInfo.avatarUrl
				userinfo.nickname = res.userInfo.nickName.length > 4 ? res.userInfo.nickName.slice(0, 4) + '...' : res.userInfo.nickName
				wx.setStorageSync('nickname', userinfo.nickname)
				wx.setStorageSync('avtar', userinfo.avtar)
				wx.login({
					success: res => {
						let code = res.code
						// console.log(res)
						wx.request({
							url: 'https://b.cqyouloft.com/atcapi/WeChat/GetMiniProgramUserInfo?name=smls&code=' + code,
							method: 'get',
							success: res => {
								unionobj.key = res.data.Session_key
								userinfo.deviceid = res.data.OpenID
								wx.setStorageSync('openid', res.data.OpenID)
								console.log(res.data.Unionid, 'res')
								if (res.data.Unionid) {
									// console.log('unionid')
											// console.log(JSON.parse(res.data.data).unionId, 'uid')
									let unionid = res.data.Unionid
									userinfo.unionid = unionid
									// console.log(unionid)
									wx.setStorageSync('unionid', unionid)
									// console.log(userinfo)
									//获取用户列表
									wx.request({
										url: ajaxUrl.pro.getOrderList,
										method: 'POST',
										ContentType: 'application/json',
										data: {
											"DeviceID": wx.getStorageSync('unionid') || "test1"
										},
										success: (_res) => {
											// console.log(_res, 'res')
											let userdata = _res.data.data.length > 0 ? [..._res.data.data][0] : {}
											let _data = {
												"name": _obj.name || userdata.name || that.data.nickname,
												"UserID": "",
												"DeviceID": unionid,
												"GLBirthDay": _obj.glBirthDay || userdata.glBirthDay || that.data.birth.slice(0, 4) + '-' + that.data.birth.slice(5, 7) + '-' + that.data.birth.slice(8, 10),
												"ParterID": 'wnl',
												"ClientType": sys.ClientType
											}
											// console.log(_data, '_data')
											that.getDetail(_data, flag1, flag2)
										}
									})
									
								}
								else {
									wx.request({
										url: ajaxUrl.pro.getunionid,
										method: 'POST',
										contentType: 'application/x-www-form-urlencoded',
										data: unionobj,
										success: (rel) => {
											// console.log(JSON.parse(res.data.data).unionId, 'uid')
											let unionid = JSON.parse(rel.data.data).unionId
											userinfo.unionid = unionid
											// console.log(unionid)
											wx.setStorageSync('unionid', unionid)
											// console.log(userinfo)
											//获取用户列表
											wx.request({
												url: ajaxUrl.pro.getOrderList,
												method: 'POST',
												ContentType: 'application/json',
												data: {
													"DeviceID": wx.getStorageSync('unionid') || "test1"
												},
												success: (_res) => {
													// console.log(_res, 'res')
													let userdata = _res.data.data.length > 0 ? [..._res.data.data][0] : {}
													let birth = _res.data.data.length > 0 ? userdata.glBirthDay.split('T')[0] : '1995-03-26'
													let _data = {
														"name": _obj.name || userdata.name || that.data.nickname,
														"UserID": "",
														"DeviceID": unionid,
														"GLBirthDay": _obj.glBirthDay || birth || that.data.birth.slice(0, 4) + '-' + that.data.birth.slice(5, 7) + '-' + that.data.birth.slice(8, 10),
														"ParterID": 'wnl',
														"ClientType": sys.ClientType
													}
													// console.log(_data, '_data')
													that.getDetail(_data, flag1, flag2)
												}
											})
										}
									})
								}
							},
							error: res => {
								console.log(res)
							}
						});
					}
				});
				// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
				// 所以此处加入 callback 以防止这种情况
				if (this.userInfoReadyCallback) {
					this.userInfoReadyCallback(res)
				}
			},
			fail: res => {
				this.setData({
					hasuserinfo: false,
					nouserinfo: true,
					avtar: 'https://qiniu.image.cq-wnl.com/content/201804264f6c88638faf4feaa029da3b8ffa7eb6.jpg',
					
				})
			}
		})
		// setTimeout(() => {
		// 	that.setData({
		// 		// anishow: false,
		// 		stopscroll: false
		// 	})
		// }, 6500)
  },
  // 分享
  onShareAppMessage: function (res) {
	  if (res.from === 'button') {
		  // console.log(res.target)
		  sharetitle = '这是我的生命能量密码，快来看看你的'
		  return {
			  title: sharetitle,
			  path: 'pages/index/index',
			  success: function (res) {
				  // 转发成功
			  },
			  fail: function (res) {
				  // 转发失败
			  }
		  }
	  }
	  else {
		  sharetitle = '超准的运势，快来看看你的吧'
		  return {
			  title: sharetitle,
			  path: 'pages/index/index',
			  imageUrl: 'https://qiniu.image.cq-wnl.com/content/20180425f3b95c60c0344574b3c91c5e4b4fbe3d.jpg',
			  success: function (res) {
				  // 转发成功
			  },
			  fail: function (res) {
				  // 转发失败
			  }
		  }
	  }
  },
  onPageScroll: function (e) {
	//   console.log(e)
	//   wx.pageScrollTo({
	// 	  scrollTop: 0,
	//   })
  }
})
