// 转换时间
function strtotime (time_str, fix_time) {
  let time = (new Date()).getTime()
  if (time_str) {
    let str = time_str.split('-')
    if (3 === str.length) {
      let year = str[0] - 0
      let month = str[1] - 0 - 1
      let day = str[2] - 0
      if (fix_time) {
        let fix = fix_time.split(':')
        if (3 === fix.length) {
          let hour = fix[0] - 0
          let minute = fix[1] - 0
          time = (new Date(year, month, day, hour, minute)).getTime()
        }
      }else {
        time = (new Date(year, month, day)).getTime()
      }
    }
  }
  time = time / 1000
  return time
}
// 时间格式化
function formatDateTime (date) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let h = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  m = m < 10 ? ('0' + m) : m
  d = d < 10 ? ('0' + d) : d
  h = h < 10 ? ('0' + h) : h
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}
function gethourtype (n) {
  if (n < 10) {
    return '0' + n
  }
  else {
    return n.toString()
  }
}
function getMonthDate (y, m) {
  let date = new Date()
  let year = y || date.getFullYear()
  let month = m || date.getMonth() + 1
  let d = new Date(year, month, 0)
  return d.getDate()
}
let utils = {
  strtotime,
  formatDateTime,
  gethourtype,
  getMonthDate
}
export default utils
