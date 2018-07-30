var gulp = require('gulp'),
	concat = require('gulp-concat'), //文件合并
	uglify = require('gulp-uglify'), //js压缩
	cleanCSS = require('gulp-clean-css'); //css压缩
var base64 = require('gulp-base64');
var rev = require('gulp-rev'), //对文件名加MD5后缀
	processhtml = require('gulp-processhtml'),
	del = require('del'),
	revCollector = require('gulp-rev-collector'); //路径替换
//删除dist
gulp.task('clean-dist', function (cb) {
	return del([
		'./dist/*'
	], cb);
});
//js处理任务
gulp.task('mini-js', ['clean-dist'], function () {
	return gulp.src(['./src/jquery-3.1.1.min.js', './src/index.js', './src/jquery.event.js', './src/jquery.touchSlider.js','./src/productsList.js'])
		.pipe(concat('index.js'))
		.pipe(gulp.dest('./middleware'));
});
//js合并
gulp.task('js-concat', ['mini-js'], function () {
	return gulp.src(['./middleware/index.js'])
		.pipe(uglify({
			outSourceMap: true
		}))
		.pipe(rev())
		.pipe(gulp.dest('./dist/'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./rev/js'));
});
//css图片base64
gulp.task('base64', function () {
	return gulp.src('./src/index.css')
		.pipe(base64({
			maxImageSize: 8 * 1024
		}))
		.pipe(gulp.dest('./middleware/'));
});
//css处理任务
gulp.task('mini-css', ['base64'], function () {
	return gulp.src(['./middleware/index.css'])
		.pipe(cleanCSS({
			keepSpecialComments: '*',
			aggressiveMerging: false
		}))
		.pipe(rev())
		.pipe(gulp.dest('./dist/'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./rev/css'));
});
//html处理
gulp.task('processhtml', function () {
	return gulp.src('./src/*.html')
		.pipe(processhtml({}))
		.pipe(gulp.dest('middleware'));
});
//路径替换任务
gulp.task('rev', ['processhtml', 'js-concat', 'mini-css'], function () {
	return gulp.src(['./rev/*/*json', './middleware/*.html'])
		.pipe(revCollector({
			// replaceReved: true,
			dirReplacements: {
				// '/assets/css/': '/assets/dist/',
				// './src/': './dist/'
			}
		}))
		.pipe(gulp.dest('./dist/'));
});
gulp.task('watch', function () {
	var watcher = gulp.watch(['./src/*.html', './src/*.js', './src/*.css'], ['js-concat', 'mini-css', 'rev']);
	watcher.on('change', function (event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});
gulp.task('default', ['js-concat', 'mini-css', 'rev']);