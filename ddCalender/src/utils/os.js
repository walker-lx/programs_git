function isMobile() {
	let regexMatch = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|noletra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;
	let u = navigator.userAgent;
	if (u === null) {
		return false;
	}
	let result = regexMatch.exec(u);
	if (result === null) {
		return false;
	}
	return true;
	// let windowwidth = $(window).width();
	// if (windowwidth < 1024) {
	// 	return true
	// }
	// return false
}
export default isMobile;
