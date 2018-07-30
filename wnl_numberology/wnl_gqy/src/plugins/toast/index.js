import Vue from 'vue';
const ToastConstructor = Vue.extend(require('./toast.vue'));
let toastPool = [];
let getAnInstance = () => {
	if (toastPool.length > 0) {
		let instance = toastPool[0];
		toastPool.splice(0, 1);
		return instance;
	}
	return new ToastConstructor({
		el: document.createElement('div')
	});
};
let returnAnInstance = instance => {
	if (instance) {
		toastPool.push(instance);
	}
};
let removeDom = event => {
	if (event.target.parentNode) {
		event.target.parentNode.removeChild(event.target);
		document.querySelector('.temp_toast_txt')&&document.body.removeChild(document.querySelector('.temp_toast_txt'));
	}
};
ToastConstructor.prototype.close = function () {
	this.visible = false;
	this.$el.addEventListener('transitionend', removeDom);
	this.closed = true;
	returnAnInstance(this);
};
let Toast = (options = {}) => {
	let duration = options.duration || 3000;
	let instance = getAnInstance();
	instance.closed = false;
	clearTimeout(instance.timer);
	instance.message = typeof options === 'string' ? options : options.message;
	document.body.appendChild(instance.$el);
	let temp_toast_txt = document.createElement('span');
	temp_toast_txt.className = 'temp_toast_txt';
	temp_toast_txt.innerHTML = instance.message;
	document.body.appendChild(temp_toast_txt);
	instance.toastWidth = temp_toast_txt.offsetWidth;
	Vue.nextTick(function () {
		instance.visible = true;
		instance.$el.removeEventListener('transitionend', removeDom);
		instance.timer = setTimeout(function () {
			if (instance.closed) return;
			instance.close();
		}, duration);
	});
	return instance;
};
export default Toast;