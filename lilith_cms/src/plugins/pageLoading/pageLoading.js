import $ from '../../utils/dom';
import './pageLoading.css';

export default class pageLoading {
	$loaderItem = null;
	htmlTpl = '<div class="pageload_mask hidden"><div class="maskImage"></div><div class="maskContent"></div></div>';
	constructor() {
		this.$loaderItem = $($.render(this.htmlTpl, {}));
	}
	show() {
		this.$loaderItem.removeClass('hidden');
		this.$loaderItem.find('.maskImage').removeClass('jumpOut');
		this.$loaderItem.find('.maskContent').removeClass('jumpOut');
		if ($(document.body).find('.pageload_mask').length === 0) {
			$(document.body).append(this.$loaderItem);
		}
	}
	hide() {
		this.$loaderItem.find('.maskImage').addClass('jumpOut');
		this.$loaderItem.find('.maskContent').addClass('jumpOut');
		setTimeout(() => {
			this.$loaderItem.remove();
		}, 330);
	}
}
