import device from './device'

var orderInfo = {
  orderId: '',
  Name: '',	//名称
  Birthday: '',	//生日
  GLBirthday: '',//	公历生日
  Calendrtype: '0',	//历法	0,公历 1,农历
  birthtimeHour: '',//出生时辰
  Long: '',//出生城市经度
  Lat: '',//出生城市纬度
  birthdaycity: '',//出生城市
  Sex: '1',//性别	1,男 0,女
  ordername: '2018年运',//订单名称 可同产品名称
  goodsid: 'DDC3803F548D4F109FA7A6B140AE6888',	//产品编号7AF400E6617A4110935F30BD404377BF,6290ABD5FACA4E17BBA38DD4AC9465B1
  parterid: 'wnlzx',//商户id
  ClientType: device.ios ? 'Youloft_IOS' : 'Youloft_Android',//平台名称	可取值，Youloft_IOS（默认），Youloft_Android
  PToken: '',//android推送token
  Token: '',//ios推送token
  userId: '',//登录用户编号
  deviceId: '',	//设备编号
  Idfa: '',	//广告标识符
  DeviceMac: '',	//mac
  ImeiNumber: '',	//imei
  sysversion: device.sysVersion,	//系统版本好
  appversion: device.appVersion,	//app版本号
  boundid: '',//包名
  TotalFee: '28',	//订单价格
  Channel: device.ios ? 'ios' : 'android',	//渠道编号
  couponId: '',//优惠码
  posId: '',
  imei: ''
}
export default orderInfo
