import 'babel-polyfill';
import './css/common.css';
import './sass/index.scss';

$(() => {
	let copyleft = (document.body.clientWidth - $('.copyright').width()) / 2;
	$('.copyright').css('marginLeft', copyleft);
});

