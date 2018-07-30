function getWnlUserInfo(info, cb) {
	var param = {
		OpenId: info.openid,
		UnionId: info.unionid,
		Gender: info.gender,
		Platform: '2',
		OpenName: info.openName,
		Desc: '',
		AppId: 'ServiceAccount',
	};
	var data = {
		DataString: JSON.stringify(param)
	}
	$.ajax({
		url: '//u.51wnl.com/Login/OpenLogin?cid=Youloft_Android&av=4.2.6&mac=00:11:22:33:44:55&idfa=b622c089e7e14d2c2fa8c9129dafbb51&did=b622c089e7e14d2c2fa8c9129dafbb51&chn=wnl_anzhi&cc=CN&lang=zh&bd=com.youloft.calendar ',
    dataType: 'json',
		type: 'POST',
		data: data,
		success: function (result) {
			if (typeof cb === 'function') {
				cb(result);
			}
		},
		error: function (e) {
			console.log(e);
		}
	});
}
