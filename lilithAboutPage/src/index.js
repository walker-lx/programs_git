import 'babel-polyfill';
import './css/index.scss';

//获取url地址中的参数
function getQueryString(name) {
	let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	let r = window.location.search.substr(1).match(reg);
	if (r !== null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}
if (getQueryString('v')) {
	$('.appversion').html(getQueryString('v'));
}
else {
	$('.appversion').html('v1.0');
}

