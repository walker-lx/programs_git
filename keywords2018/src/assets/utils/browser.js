let browser = {
  isAndroid: () => {
    return navigator.userAgent.match(/Android/i) ? true : false
  },
  isIOS: () => {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false
  },
  isWx: () => {
    return navigator.userAgent.match(/micromessenger/i) ? true : false
  },
  isWp: () => {
    return navigator.userAgent.toLowerCase().indexOf('windows phone') > -1
  },
  isWnl: () => {
    return navigator.userAgent.toLowerCase().indexOf('wnl') > -1
  },
  getIOSVersion: () => {
    if (window.MSStream) {
      return false
    }
    let match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
    let version
    if (match !== undefined && match !== null) {
      version = [
        parseInt(match[1], 10),
        parseInt(match[2], 10),
        parseInt(match[3] || 0, 10)
      ]
      return parseFloat(version.join('.'))
    }
    return false
  }
}
export default browser
