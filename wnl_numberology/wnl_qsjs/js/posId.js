global.posId = getQueryValue('posId') || getQueryValue('posid');
function getQueryValue(key) {
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg) || window.location.hash.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

if(posId && posId !==null) {
    localStorage.setItem('posId-qsjs',posId);
}