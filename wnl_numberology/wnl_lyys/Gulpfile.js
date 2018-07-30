// var gulp = require('gulp'),
// 	concat = require('gulp-concat'),//文件合并
// 	uglify = require('gulp-uglify'), //js压缩
// 	cleanCSS = require('gulp-clean-css');//css压缩
// var base64 = require('gulp-base64');
// rename = require("gulp-rename"),
// rev = require('gulp-rev'), //对文件名加MD5后缀
// clean = require('gulp-clean');//清理
// revCollector = require('gulp-rev-collector'); //路径替换
// var gulp = require('gulp'), rev = require('gulp-rev'), revCollector = require('gulp-rev-collector');
var gulp = require('gulp');
var connect = require('gulp-connect');


gulp.task('default', function () {
	connect.server({
		root: '.',
		port: 8080
	});
});
//js处理任务
// gulp.task('mini-js', function () {
// 	gulp.src(['./src/utils.js', './src/index.js'])
// 		.pipe(uglify({
// 			outSourceMap: true
// 		}))
// 		.pipe(gulp.dest('./dist/'));
// });
// //js合并
// gulp.task('js-concat', function () {
// 	return gulp.src(['./src/template.js', './src/base64.min.js', './dist/utils.js', './dist/index.js'])
// 		.pipe(concat('init.js'))
// 		.pipe(gulp.dest('./dist/'));
// });
// //css处理任务
// gulp.task('mini-css', function () {
// 	gulp.src(['./src/init.css'])
// 		.pipe(cleanCSS({
// 			keepSpecialComments: '*', aggressiveMerging: false
// 		}))
// 		.pipe(gulp.dest('./dist/'));
// });
// //css图片base64
// gulp.task('base64', function () {
// 	gulp.src('./dist/init.css')
// 		.pipe(base64())
// 		.pipe(concat('init.css'))
// 		.pipe(gulp.dest('./dist/'));
// });
// gulp.task('default', ['mini-js', 'js-concat', 'mini-css', 'base64']);
// gulp.task('default', ['clean-assets', 'mini-css', 'mini-js', 'rev']);
// gulp.task('default', ['clean-assets', 'mini-css', 'mini-js', 'clean-html']);