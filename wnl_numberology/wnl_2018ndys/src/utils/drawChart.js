import iChart from 'ichart'

export default function initCharts(params) {
  var width = document.querySelector('.career .section-inside').getBoundingClientRect().width;
  var score = [];
  score = params.score.split(',');
  var data = [
    {
      name: '',
      value: score,
      color: params.color,
      line_width: 2
    }
  ];

  var chart = new iChart.Area2D({
    render: params.id,
    turn_off_touchmove: true,
    data: data,
    title: '',
    width: width,
    height: 200,
    background_color: 'rgba(255, 242, 213, 0)',
    border: {
      enable: false,
    },
    coordinate: {
      //配置自定义坐标轴
      grid_color: 'rgba(202,193,175,1)',
      gridVStyle: {
        solid: false,
        size: 4,
        fator: 0.6
      },
      axis: {
        width: [0, 0, 0, 0]
      },
      scale: [{//配置自定义值轴
        position: 'left',//配置左值轴
        start_scale: 1,//设置开始刻度为0
        end_scale: 5,//设置结束刻度为26
        scale_space: 1,//设置刻度间距
        scale_enable: false,
        scale2grid: false,
        label: {
          color: params.color,
          fontsize: 12,
        },
      },
      {//配置自定义值轴
        position: 'bottom',//配置左值轴
        start_scale: 1,//设置开始刻度为0
        end_scale: 12,//设置结束刻度为26
        scale_space: 1,//设置刻度间距
        scale_enable: false,
        label: {
          color: '#CAC1AF',
          fontsize: 12,
        },
      }]
    },
    sub_option: {
      smooth: true,
      label: false,
      hollow: false,
      hollow_inside: false,
      point_size: 0
    }
  });
  chart.draw();
  // console.log(score[score.length-1])
  var icon = document.querySelector(params.icon);
  // console.log(score[score.length - 1])
  var iconScore = 1 - score[score.length - 1] / 5;
  // console.log(iconScore)
  icon.style.top = 100 * (iconScore + 0.032) + '%';
  return score[score.length - 1];
}
