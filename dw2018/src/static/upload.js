// import lrz from 'lrz';

// import { device } from '../tool';
import ajax from './ajax';

const tokenUrl = 'https://msg.51wnl.com/api/Active/qintoken';
/**
 * 图片上传组件
 * @export imgupload
 * @class imgupload
 */
export default class imgupload {
	// $el = null;
	// uploadCallback = null;
	// base64String = '';
	/**
	 * Creates an instance of imgupload.
	 * @param {Element} $el input输入框元素
	 * @param {Object} options 配置回调
	 * @memberof imgupload
	 */
	constructor(options) {
		// if ($el) {
		// 	this.$el = $el;
		// }
		this.uploadCallback = options.uploadCallback;
		if (options.base64String) {
			if (options.base64String.indexOf('base64') > -1) {
				let base64 = options.base64String.substr(options.base64String.indexOf('base64,') + 7);
				this.base64String = base64;
			}
			else {
				this.base64String = options.base64String;
			}
			// this.base64String = options.base64String;
			this.getImgSrc(this.base64String);
		}
		// else {
		// 	this.getDeviceType();
		// }
	}
	// getDeviceType() {
	// 	return (device.isAndroid && device.isWnl) === true
	// 		? this.dealWithAndroidWnl()
	// 		: this.dealWithOther();
	// }
	// dealWithAndroidWnl() {
	// 	if (this.$el) {
	// 		this.$el.onclick = (event) => {
	// 			event.preventDefault();
	// 			console.log('protocol://getfilecode#filecodecallback');
	// 			window.location.href = 'protocol://getfilecode#filecodecallback';
	// 		};
	// 	}
	// 	window.filecodecallback = (data) => {
	// 		this.getImgSrc(data);
	// 	};
	// }
	getImgSrc(base64) {
		// console.log('getimg');
		// alert('aa');					
		ajax
			.getJSON(tokenUrl)
			.then((res) => {
				let token = JSON.parse(res).token;
				// alert('aa');							
				this.uptoQiniu(token, base64);
			})
			.catch((err) => {
				// alert(JSON.stringify(err));
				// console.log(err)
			});
		// 上传图片，获取地址
		// let url = '//c.51wnl.com/contentapi/api4.4.0/UserFback/UploadImg';
		// ajax.postJSON(url, base64)
		// .then((res) => {
		// 	console.log(res);
		// }).catch((err) => {
		// 	console.log(err);
		// });
	}
	// dealWithOther() {
	// 	this.$el.addEventListener('change', () => {
	// 		lrz(this.$el.files[0], {
	// 			width: 512,
	// 			quality: 1
	// 		})
	// 			.then((rst) => {
	// 				// 处理成功会执行
	// 				// console.log(rst);
	// 				let base64 = rst.base64.substr(rst.base64.indexOf('base64,') + 7);
	// 				this.getImgSrc(base64);
	// 			})
	// 			.catch((err) => {
	// 				// 处理失败会执行
	// 				console.log(err);
	// 			})
	// 			.always(() => {
	// 				// 不管是成功失败，都会执行
	// 			});
	// 	});
	// }
	/**
	 *
	 * @param {string} token //获取的token响应
	 * @param {string} base64 // 获取到图片的base64值
	 * @memberof imgUpload
	 */
	uptoQiniu(token, base64) {
		let url = '//upload.qiniu.com/putb64/-1'; //非华东空间需要根据注意事项 1 修改上传域名
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				let resData = JSON.parse(xhr.responseText);
				let resultImg = new Image();
				resultImg.src = 'https://qiniu.image.cq-wnl.com/' + resData.key;
				resultImg.onload = () => {
					//执行操作
					if (this.uploadCallback) {
						this.uploadCallback(resultImg.src);
					}
				};
			}
		};
		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/octet-stream');
		xhr.setRequestHeader('Authorization', 'UpToken ' + token);
		xhr.send(base64);
	}
}
