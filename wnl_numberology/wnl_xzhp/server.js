/**
 * Require Browsersync
 */
var browserSync = require('browser-sync');
/**
 * Run Browsersync with server config
 */
browserSync({
	server: './',
	files: ['./src/*.html','./src/*.js', './src/*.css']
});
