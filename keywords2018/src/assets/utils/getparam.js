export default function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r !== null) {
    return decodeURIComponent(r[2])
  }
  return null
}
// export default function getParam (name, url) {
//   if (typeof name !== 'string') return false
//   if (!url) url = window.location.href
//   name = name.replace(/[\[\]]/g, '\\$&')
//   var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
//   var results = regex.exec(url)
//   if (!results) return null
//   if (!results[2]) return ''
//   return decodeURIComponent(results[2].replace(/\+/g, ' '))
// }
