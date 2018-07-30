$(function () {
	function GetCommentList() {
		$.ajax({
			url: '//coco70.51wnl.com/NumberologyNew/CeSuanComment/GetCommentList?size=10&type=0',
			type: 'POST',
			dataType: 'json',
			beforeSend: function () {},
			success: function (res) {
				var feedbackTemplate;
				var feedbackTemplate1 =
					'<div class="feedbackContentDetail marqueeItem">\
				<div class="feedbackTitleLeft">\
					<div class="customerName"><%- name %></div>\
					<div class="customerCity"><%- city %></div>\
				</div>\
				<div class="feedbackStars feedbackTitleRight">\
                    <ul class="feeling-stars">\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
					</ul>\
				</div>\
				<div class="feedbackContent"><%- content %></div>\
				<div class="feedbackBottomHr"></div>\
            </div>';

				var feedbackTemplate2 =
					'<div class="feedbackContentDetail marqueeItem">\
				<div class="feedbackTitleLeft">\
					<div class="customerName"><%- name %></div>\
					<div class="customerCity"><%- city %></div>\
				</div>\
				<div class="feedbackStars feedbackTitleRight">\
                    <ul class="feeling-stars">\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
					</ul>\
				</div>\
				<div class="feedbackContent"><%- content %></div>\
				<div class="feedbackBottomHr"></div>\
            </div>';
				var feedbackTemplate3 =
					'<div class="feedbackContentDetail marqueeItem">\
				<div class="feedbackTitleLeft">\
					<div class="customerName"><%- name %></div>\
					<div class="customerCity"><%- city %></div>\
				</div>\
				<div class="feedbackStars feedbackTitleRight">\
                    <ul class="feeling-stars">\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
					</ul>\
				</div>\
				<div class="feedbackContent"><%- content %></div>\
				<div class="feedbackBottomHr"></div>\
            </div>';
				var feedbackTemplate4 =
					'<div class="feedbackContentDetail marqueeItem">\
				<div class="feedbackTitleLeft">\
					<div class="customerName"><%- name %></div>\
					<div class="customerCity"><%- city %></div>\
				</div>\
				<div class="feedbackStars feedbackTitleRight">\
                    <ul class="feeling-stars">\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
					</ul>\
				</div>\
				<div class="feedbackContent"><%- content %></div>\
				<div class="feedbackBottomHr"></div>\
            </div>';
				var feedbackTemplate5 =
					'<div class="feedbackContentDetail marqueeItem">\
				<div class="feedbackTitleLeft">\
					<div class="customerName"><%- name %></div>\
					<div class="customerCity"><%- city %></div>\
				</div>\
				<div class="feedbackStars feedbackTitleRight">\
                    <ul class="feeling-stars">\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/gray-star.png"></li>\
					</ul>\
				</div>\
				<div class="feedbackContent"><%- content %></div>\
				<div class="feedbackBottomHr"></div>\
            </div>';
				var feedbackTemplate6 =
					'<div class="feedbackContentDetail marqueeItem">\
				<div class="feedbackTitleLeft">\
					<div class="customerName"><%- name %></div>\
					<div class="customerCity"><%- city %></div>\
				</div>\
				<div class="feedbackStars feedbackTitleRight">\
                    <ul class="feeling-stars">\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
						<li class="gary"><img src="./img/bzcs/red-star.png"></li>\
					</ul>\
				</div>\
				<div class="feedbackContent"><%- content %></div>\
				<div class="feedbackBottomHr"></div>\
            </div>';

				$.each(res.data, function (index, item) {
					var score = res.data[index].score;
					console.log(item);
					if (score == 0) {
						feedbackTemplate = feedbackTemplate1;
					} 
					else if (score == 1) {
						feedbackTemplate = feedbackTemplate2;
					} 
					else if (score == 2) {
						feedbackTemplate = feedbackTemplate3;
					} 
					else if (score == 3) {
						feedbackTemplate = feedbackTemplate4;
					} 
					else if (score == 4) {
						feedbackTemplate = feedbackTemplate5;
					} 
					else if (score == 5) {
						feedbackTemplate = feedbackTemplate6;
					}
					var mkpItem = _.template(feedbackTemplate)({
						name: this.name,
						city: this.city,
						content: this.content
					});
					$('#marquee-top').append(mkpItem);
					localStorage.setItem('mkpItem', mkpItem);
				});
			},
			err: function (err) {
				console.log('err:' + err);
			}
		});
	}
	GetCommentList();
});
