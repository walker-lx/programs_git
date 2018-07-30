var path = require('path');
var utils = require('./utils');
var config = require('../config');
var isProduction = process.env.NODE_ENV === 'production';
var webpack = require('webpack');

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	// entry: {
	// 	index: './src/index.js'
	// },
	entry: utils.entries(),
	// devtool: 'inline-source-map',
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.json', '.ts', '.tsx'],
		alias: {
			'@': resolve('src')
		}
	},
	module: {
		rules: [{
				test: /\.(js)$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				include: resolve('src'),
				exclude: /node_modules/,
				options: {
					formatter: require('eslint-friendly-formatter')
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader?cacheDirectory=true', // 开启缓存
				include: resolve('src'),
				exclude: /node_modules/
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				include: resolve('src'),
				exclude: /node_modules/
			},
			{
				test: /\.(woff2?|eot|ttf|otf|png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				},
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'image-webpack-loader', // 压缩图片
				// options: {
				// 	limit: 10000,
				// 	name: utils.assetsPath('img/[name].[hash:7].[ext]')
				// },
			},
			{
				test: /\.html$/,
				loader: "html-loader",
				options: {
					ignoreCustomFragments: [/\{\{.*?}}/],
					// root: path.resolve(__dirname, '../dist/static/img'),
					// publicPath: '../',
					attrs: ['img:src', 'link:href']
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	]
}
