//node核心文件
const path = require('path');
const fs = require("fs");
//引入gulp核心文件
const gulp = require('gulp');
//区别生产环境还是开发环境
//const gulpif = require('gulp-if');
//重命名文件
const rename = require('gulp-rename');
//定位文件
const sourcemaps = require('gulp-sourcemaps');
//引入browserify文件打包js
const browserify = require('browserify');
//字节流
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
//压缩文件
const uglify = require('gulp-uglify');
//压缩css
const cleanCSS = require('gulp-clean-css');
//增量更新
const watchify = require('watchify');
//gulp增量更新
const watch = require('gulp-watch');
//引入gulp-less文件处理less
const less = require('gulp-less');
//添加私有前缀
autoprefixer = require('gulp-autoprefixer');
//清理文件
const clean = require('gulp-clean');
var plumber = require('gulp-plumber');
//制定执行顺序
var runSequence = require('gulp-run-sequence');
var tinify = require("tinify");
tinify.key = "7YbR_WHd0xzXBD3ZsUWxgTyJkVXBgWwR";

function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {

            var obj = {}; //定义一个对象存放文件的路径和名字
            obj.path = path; //路径
            obj.filename = itm //名字
            filesList.push(obj);
        }

    })
}
//清理文件
gulp.task('clean', () => {
    return gulp.src(['dist/js', 'dist/css'], { read: false })
        .pipe(clean());
});
//处理less文件
gulp.task('handle-less', () => {
    //编译src目录下的所有less文件
    //除了reset.less和test.less（**匹配src/less的0个或多个子文件夹）
    gulp.src(['src/less/style.less', '!src/less/**/{reset,test}.less'])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: [
                'Android >= 4',
                'Chrome >= 40',
                'last 6 Firefox versions',
                'iOS >= 6',
                'Safari >= 6'
            ],
            cascade: false
        }))
        .pipe(cleanCSS({ debug: true }, function (details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/css'));
});
//处理js文件
gulp.task('handle-js', () => {
    browserify("src/js/index.js", { debug: true })
        .transform("babelify", {
            presets: ["es2015"],
            plugins: ['transform-runtime']
        })
        .bundle()
        .on('error', function (err) {
            console.log(err.message);
            this.emit('end');
        })
        .pipe(plumber())
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'))

});
//处理html文件
gulp.task('handle-html', () => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('./dist'));
});

//处理image
gulp.task('handle-img', () => {
    var obj = [];
    gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img'));
    readFileList('src/img/', obj);
    obj.forEach((v, k) => {
        fs.readFile(v.path + v.filename, (err, sourceData) => {
            if (err) throw err;
            tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
                if (err) throw err;
                fs.writeFile(path.resolve('./dist/img/' + v.filename), resultData, (err) => {
                    if (err)
                        return console.error(err);
                    console.log(v.filename + '转换成功');
                });
            });
        });
    });

});

gulp.task('watch', () => {
    gulp.watch(['src/less/*.less', 'src/js/*.js', 'src/*.html'], (event) => {
        if (event.path.indexOf('less') > -1) {
            gulp.start('handle-less');
        } else if (event.path.indexOf('js') > -1) {
            gulp.start('handle-js');
        } else if (event.path.indexOf('html') > -1) {
            gulp.start('handle-html');
        }
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
//默认任务
gulp.task('default', (cb) => {
    runSequence('clean', ['handle-js', 'handle-less', 'handle-html', 'watch'], cb);
});
gulp.task('build', (cb) => {
    runSequence(['handle-js', 'handle-less', 'handle-html'], cb);
});
