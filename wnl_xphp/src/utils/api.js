import axios from 'axios';

/*
 *创建订单
 */
export function creatOrder(data) {
  return axios.request('//coco70.51wnl.com/numberologynew/ChartDiscFunction/CreateOrder', {
    method: 'post',
    data: data
  });
}

/*
 *修改用户信息
 */
export function modifyUser(data) {
  return axios.request('//coco70.51wnl.com/numberologynew/ChartDiscFunction/ModifyUser', {
    method: 'post',
    data: data
  });
}

/*
 *获取用户信息
 */
export function getUser(data) {
  return axios.request('//coco70.51wnl.com/numberologynew/ChartDiscFunction/GetUser', {
    method: 'post',
    data: data
  });
}

/*
 *获取订单详情
 */
export function getOrderDetail(data) {
  return axios.request('//coco70.51wnl.com/numberologynew/ChartDiscFunction/GetOrderDetail', {
    method: 'post',
    data: data
  });
}

/*
 *获取明星列表
 */
export function getStarList() {
  return axios.request('//coco70.51wnl.com/numberologynew/ChartDiscFunction/GetStarList', {
    method: 'get',
    data: ''
  });
}

/*
 *获取订单列表
 */
export function getList(data) {
  return axios.request('//coco70.51wnl.com/numberologynew/ChartDiscFunction/GetList', {
    method: 'post',
    data: data
  });
}

/*
 *删除订单
 */
export function modify(data) {
  return axios.request('//coco70.51wnl.com/numberologynew/ChartDiscFunction/Modify', {
    method: 'post',
    data: data
  });
}
