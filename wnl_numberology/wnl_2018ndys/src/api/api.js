import axios from 'axios'

export function createOrder(params) {
  return axios.request('//coco70.51wnl.com/numberologynew/ChartYearLuck/CreateOrder', {
    method: 'get',
    params: params
  })
}

export function getOrderDetail(params) {
  return axios.request('//coco70.51wnl.com/numberologynew/ChartYearLuck/GetOrderDetail', {
    method: 'get',
    params: {
      UserID: params.userId,
      deviceId: params.deviceId,
      OrderID: params.orderId
    }
  })
}

export function getRelevantGoodsList(params) {
  return axios.request('//coco70.51wnl.com/numberologynew/BaseCeSuan/GetRelevantGoodsList?type=1&size=8', {
    method: 'get',
  })
}

export function getCeSuanOrderNum() {
  return axios.request('//coco70.51wnl.com/numberologynew/ChartYearLuck/getCeSuanOrderNum', {
    method: 'get'
  })
}

export function getWnlUserInfo(info) {
  var param = {
    OpenId: info.openid,
    UnionId: info.unionid,
    Gender: info.gender,
    Platform: '2',
    OpenName: info.nickname,
    Desc: '',
    AppId: 'ServiceAccount',
  };
  var data = {
    DataString: JSON.stringify(param)
  }
  return axios({
    url: '//u.51wnl.com/Login/OpenLogin?cid=Youloft_Android&av=4.2.6&mac=00:11:22:33:44:55&idfa=b622c089e7e14d2c2fa8c9129dafbb51&did=b622c089e7e14d2c2fa8c9129dafbb51&chn=wnl_anzhi&cc=CN&lang=zh&bd=com.youloft.calendar',
    dataType: 'json',
    method: 'POST',
    data: data
  });
}
