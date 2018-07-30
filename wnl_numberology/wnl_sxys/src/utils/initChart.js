let level = ['差', '偏差', '中等', '偏好', '好'];
let colors = ['#777777', '#777777', '#333333', '#F9B90E', '#F9B90E'];
let offset = [54, -22];
export default function setOption(data, sxIndex) {
  // console.log(data);
  // console.log(sxIndex);
  let grid = {
    top: 30,
    left: '14%',
    right: '8%',
    bottom: 40
  }
  if (window.innerWidth == 320) {
    grid = {
      top: 30,
      left: '10%',
      right: '0%',
      bottom: 40,
      width: 280
    }
  }
  if (sxIndex === 7) {
    offset = [0, -22];
  }
  if (sxIndex === 6) {
    offset = [50, -22];
  }
  let xMinAxis = getMinMarkPointer(data).x;
  let yMinAxis = getMinMarkPointer(data).y;
  let xMaxAxis = getMaxMarkPointer(data).x;
  let yMaxAxis = getMaxMarkPointer(data).y;

  return {
    legend: {
    },
    grid: grid,
    //X轴线
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(249,185,14,1)'
        }
      },
      //分割线
      splitLine: {
        show: true,
        lineStyle: {
          color: getMarkLine(xMinAxis),
          width: 1
        }
      },
      axisTick: false,
      axisLabel: {
        textStyle: {
          color: function (value, index) {
            return value.indexOf('月') > -1 ? '#F9B90E' : '#777777';
          }
        }
      },
      data: getXAxisData(data),
    },
    //Y轴线
    yAxis: {
      boundaryGap: false,
      axisLine: true,
      //分割线
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#FBEDCE']
        }
      },
      min: 1,
      max: 5,
      axisLabel: {
        show: true,
        color(value, index) {
          return colors[index]
        },
        formatter(value, index) {
          return level.filter((v, k) => value - 1 == k);
        },
      },
      //是否显示刻度
      axisTick: false,
    },
    //数据
    series: [{
      itemStyle: {
        color: '#F9B90E'
      },
      type: 'line',
      smooth: false,
      areaStyle: {
        color: 'rgba(255,219,123,0.5)'
      },
      symbolSize: 5,
      showAllSymbol: true,
      clipOverflow: false,
      data: data,
      markPoint: {
        symbolSize: 10,
        label: {
          position: 'right',
          color: 'rgba(163,103,64,1)',
          backgroundColor: '#FADA8F',
          padding: 3,
          borderRadius: 10
        },
        data: [{
          symbol: 'circle',
          value: '运势高点及时把握',
          xAxis: xMaxAxis,
          yAxis: yMaxAxis,
          itemStyle: {
            color: 'transparent'
          },
          label: {
            position: 'insideTop',
            offset: offset
          }
        }, {
          symbol: 'circle',
          value: '低迷期尽早转运',
          xAxis: xMinAxis,
          yAxis: yMinAxis,
          itemStyle: {
            color: '#FFCF4D'
          }
        }]
      }
    }]
  };
}

function getXAxisData(value) {
  let list = value.map((v, k) => {
    return {
      value: v,
      type: 2
    }
  })
  list.some(v => {
    if (v.value === Math.min.apply(null, value)) {
      v.type = 1;
      return true;
    }
  })
  list.some(v => {
    if (v.value === Math.max.apply(null, value)) {
      v.type = 3;
      return true;
    }
  })
  let data = list.map((v, k) => {
    let item = {
      value: k + 1 + '',
      textStyle: {
        fontSize: 12,
        color: '#777777'
      }
    }
    if (v.type === 1) {
      item.value = k + 1 + '月';
      item.textStyle.color = '#F9B90E';
    }
    return item;
  })
  return data;
}

//最小标记点
function getMinMarkPointer(value) {
  let item = {};
  value.some((v, k) => {
    if (v === Math.min.apply(null, value)) {
      item.x = k;
      item.y = v;
      return true;
    }
  })
  return item;
}

//最大标记点
function getMaxMarkPointer(value) {
  let item = {};
  value.some((v, k) => {
    if (v === Math.max.apply(null, value)) {
      item.x = k;
      item.y = v;
      return true;
    }
  })
  return item;
}

//高亮分割线
function getMarkLine(index) {
  let colorList = [];
  for (let i = 0; i < 12; i++) {
    if (i === index) {
      colorList.push('#F9B90E');
    } else {
      colorList.push('#FBEDCE');
    }
  }
  return colorList;
}