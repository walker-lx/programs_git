export function getSxysData(data) {
  // console.log(data);
  let monthData = data.filter(v => v.type === 1);
  let zy = data.filter(v => v.type === 2);
  let ysTypes = data.filter(v => v.type === 3);
  let ysxp = data.filter(v => v.type === 4);
  let scores = monthData.map(v => v.starScore);
  return {
    monthData,
    zy,
    ysTypes,
    ysxp,
    scores
  }
}

export function stringify(obj) {
  var str = '';
  var keys = Object.keys(obj);
  keys.forEach(function (v, k, arr) {
    k < arr.length - 1 ?
      str += v + '=' + obj[v] + '&' :
      str += v + '=' + obj[v]
  });
  return str;
}

function formatTimeStamp(date, time = '0:0:0') {
  return new Date(`${date} ${time}`) || new Date(`${date.replace(/-/g, '/')} ${time}`)
}

export function getShowMonth() {
  let nowDate = new Date().getTime();
  let sxMonth = ["2018-2-4～2018-3-4",
    "2018-3-5～2018-4-4",
    "2018-4-5～2018-5-4",
    "2018-5-5～2018-6-5",
    "2018-6-6～2018-7-6",
    "2018-7-7～2018-8-6",
    "2018-8-7～2018-9-7",
    "2018-9-8～2018-10-7",
    "2018-10-8～2018-11-6",
    "2018-11-7～2018-12-6",
    "2018-12-7～2019-1-4",
    "2019-1-5～2019-2-3"];
  let sxTimeList = sxMonth.map(v => {
    let startTime = v.split('～')[0].replace(/-/ig, '/');
    let endTime = v.split('～')[1].replace(/-/ig, '/');
    startTime = new Date(startTime).getTime();
    endTime = new Date(endTime).getTime();
    return {
      startTime,
      endTime
    }
  })

  let index = 0;
  sxTimeList.some((v, k) => {
    if (nowDate > v.startTime && nowDate < v.endTime) {
      index = k;
      return true
    }
  })

  return index;
}
