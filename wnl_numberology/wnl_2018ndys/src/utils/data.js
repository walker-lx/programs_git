var redPackageText = [{
  text1: '2018 年',
  text2: '大师叮嘱'
}, {
  text1: '2018 年',
  text2: '年度事业运'
}, {
  text1: '2018 年',
  text2: '年度感情运'
}, {
  text1: '2018 年',
  text2: '年度财富运'
}, {
  text1: '感情',
  text2: '运势详批'
}, {
  text1: '事业',
  text2: '运势详批'
}, {
  text1: '财富',
  text2: '运势详批'
}, {
  text1: '人际',
  text2: '运势详批'
}, {
  text1: '季度',
  text2: '运势详批'
}, {
  text1: '开运',
  text2: '锦囊'
}]
var list = [{
  title: '整年运势',
  text: '提前预判整年起落，让你有备无患'
}, {
  title: '季度运势',
  text: '起落之间暗藏机会与陷阱，如何趋利避害'
}, {
  title: '事业运势',
  text: '升职加薪，开市创业。抓准时机就能飞黄腾达！'
}, {
  title: '感情运势',
  text: '今年我的感情运势顺利吗？选对正确的人才能成就圆满的感情！'
}, {
  title: '财富运势',
  text: '何时发达，如何发达？盯准机遇，打开你财富的聚宝盆。'
}, {
  title: '人际运势',
  text: '命定的机遇与贵人，何时出现？'
}, {
  title: '健康运势',
  text: '如何规避你的健康盲区？'
}, {
  title: '家庭运势',
  text: '为你预测家庭人际关系。'
}, {
  title: '大师叮嘱',
  text: '趋利避害，打造完满人生。'
},]
var billboardList = [];
for (var i = 0, len = list.length; i < len; i += 3) {
  billboardList.push(list.slice(i, i + 3));
}
var sc = [
  { key: '子时', value: '23:00-00:59' },
  { key: '子时', value: '00:00-00:59' },
  { key: '丑时', value: '01:00-02:59' },
  { key: '丑时', value: '02:00-02:59' },
  { key: '寅时', value: '03:00-04:59' },
  { key: '寅时', value: '04:00-04:59' },
  { key: '卯时', value: '05:00-06:59' },
  { key: '卯时', value: '06:00-06:59' },
  { key: '辰时', value: '07:00-08:59' },
  { key: '辰时', value: '08:00-08:59' },
  { key: '巳时', value: '09:00-10:59' },
  { key: '巳时', value: '10:00-10:59' },
  { key: '午时', value: '11:00-12:59' },
  { key: '午时', value: '12:00-12:59' },
  { key: '未时', value: '13:00-13:59' },
  { key: '未时', value: '14:00-14:59' },
  { key: '申时', value: '15:00-16:59' },
  { key: '申时', value: '16:00-16:59' },
  { key: '酉时', value: '17:00-18:59' },
  { key: '酉时', value: '18:00-18:59' },
  { key: '戌时', value: '19:00-20:59' },
  { key: '戌时', value: '20:00-20:59' },
  { key: '亥时', value: '21:00-22:59' },
  { key: '亥时', value: '22:00-22:59' }
]

function getSC(time) {
  var x = sc.filter(v => {
    // console.log(v.value.split('-')[0])
    return parseInt(v.value.split('-')[0]) == parseInt(time);
  })
  return x[0].key;
}

var report = {
  data: {},
  firstQuarter: {}
}



export { redPackageText, billboardList, report, sc, getSC }
