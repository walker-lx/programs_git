/*
 * marquee plugin
 * @animateTime 运动时间
 * @stopTime 暂停时间
 * @adjustHeight 调整高度
 */
;
(function ($) {
    // console.log('aa')
	$.fn.marquee = function (option) {
		var self = this;
		var defaultSetting = {
			animateTime: 1000,
			stopTime: 4000,
			adjustHeight: 56
		};
		var setting = $.extend(defaultSetting, option);
		setTimeout(function () {
			setInterval(function () {
				var size = parseInt(self.find('.marqueeItem:first').height()) + setting.adjustHeight;
				self.animate({
					marginTop: -size + 'px'
				}, setting.animateTime, function () {
					self.find('.marqueeItem').next().prependTo(self);
					self.find(".marqueeItem:first").hide();
					self.css({
						marginTop: 0 + 'px'
					});
					self.find('.marqueeItem:last').removeClass('hidden');
					self.find('.marqueeItem:first').show();
				});
			}, setting.stopTime);
		}, 0)
		return this;
	}
}(jQuery));