import $ from 'jquery';
import util from './utils/util';
import './css/index.css';
import PageLoading from './plugins/pageLoading/pageLoading';
import Toast from './plugins/toast/toast';
import loadSchema from './utils/openapp';

let loaderItem = new PageLoading();
let toast = new Toast();

let textObj = {
	title: '莉莉斯星座',
	text: '莉莉斯星座',
	image: '0',
	imageURL: '',
	url: location.href + '&share=1',
	targetUrl: location.href + '&share=1',
	pureText: '莉莉斯星座',
	prefix: '',
	perfix: ''
};

function getQueryString(name) {
	let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	let r = window.location.search.substr(1).match(reg);
	if (r !== null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}

$(() => {
	let contentHeight = 0;
	loaderItem.show();
	let articleId = util.getQueryValue('id');
	$.getJSON('//lilith.51wnl.com/GetArticles?ArticlesId=' + articleId).then((data) => {
		if (data.status !== 200) {
			toast.show('服务器异常,请重试');
			return;
		}
		textObj.title = data.data.title;
		document.title = data.data.title;
		$('h1').html(data.data.title);
		$('.article_resource').html(data.data.author);
		$('.article_resource').html(data.data.author);
		$('.article_viewer').html((data.data.readNo + data.data.hits) + '人浏览');
		$('.content_inner').html(data.data.contents);
		$('.template_main').removeClass('visibility_hidden');
		setTimeout(() => {
			contentHeight = $('.content_inner').height();
			if (contentHeight > 1000) {
				$('.content_inner').addClass('ovh');
				$('.article_more').removeClass('hidden');
			}
			textObj.text = $('.content_inner p:first-child').text();
			textObj.pureText = $('.content_inner p:first-child').text();
			textObj.imageURL = $('.content_inner img:first-child').attr('src');
		}, 150);
		loaderItem.hide();
	}).fail(() => {
		toast.show('服务器异常,请重试');
		loaderItem.hide();
	});

	let currentFontSize = 1.7;
	let initFontSize = 1.7;
	let lineHeight = 2.7;
	let fontSizeList = [1.4, 1.7, 2, 2.1, 2.4];
	let fontSizeTipList = ['已调整为小号字体', '已调整为正常字体', '已调整为中号字体', '已调整为大号字体', '已调整为特大号字体'];
	let maxFontTip = '当前已是最大字体';
	let minFontTip = '当前已是最小字体';
	let toastTip = '';

	function changeFont(isAdd) {
		if (isAdd && (!currentFontSize || currentFontSize >= 2.4)) {
			toastTip = maxFontTip;
		}
		else if (!isAdd && currentFontSize <= 1.4) {
			toastTip = minFontTip;
		}
		else {
			let currentFontIndex = fontSizeList.findIndex(item => item === currentFontSize);
			currentFontIndex = isAdd ? currentFontIndex + 1 : currentFontIndex - 1;
			currentFontSize = fontSizeList[currentFontIndex];
			toastTip = fontSizeTipList[currentFontIndex];
			$('.content_inner').css('font-size', currentFontSize + 'rem');
			$('.content_inner').css('line-height', ((currentFontSize * lineHeight) / initFontSize).toFixed(1) + 'rem');
		}
		toast.show(toastTip);
	}
	$('.font_big').on('click', () => {
		changeFont(true);
	});
	$('.font_small').on('click', () => {
		changeFont();
	});

	$('.article_more').on('click', () => {
		$('.content_inner').animate({
			height: contentHeight + 10
		}, 500, () => {
			$('.article_more').addClass('hidden');
			$('.content_inner').removeClass('ovh');
			$('.content_inner').css('height', 'auto');
		});
	});
	//打开app或下载
	$('#llsBanner').on('click', () => {
		loadSchema('https://qiniu.image.cq-wnl.com/lilith/download/android.apk?v=201708161443');
	});
	if (getQueryString('share')) {
		$('#llsBanner').removeClass('hidden');
	}
});

window.appCallback_share = function() {
	console.log(textObj);
	if (window.ylwindow) {
		window.ylwindow.reportHasShare(true);
		location.href = 'protocol://share:' + encodeURI(JSON.stringify(textObj));
	}
	else {
		location.href = 'protocol://share#' + encodeURI(JSON.stringify(textObj));
	}
	return 1;
};
