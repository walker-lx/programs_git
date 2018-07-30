// pages/form/form.js 测试页面
let app = getApp();
const month = [];
const day = [];
const hour = [];
const minute = [];

function getMonthDate(y, m) {
  var date = new Date();
  var year = y || date.getFullYear();
  var month = m || date.getMonth() + 1;
  var d = new Date(year, month, 0);
  return d.getDate();
}
Page({

})