var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
	baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						sourceMap: config.dev.cssSourceMap
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: config.dev.cssSourceMap,
						plugins: (loader) => [
							require('postcss-import')({
								root: loader.resourcePath
							}),
							require('postcss-cssnext')({
								browsers: [
									'iOS >= 7',
									'Android >=4.0'
								]
							}),
							require('cssnano')({
								autoprefixer: false
							})
						]
					}
				}
			]
		}]
	},
	// cheap-module-eval-source-map is faster for development
	devtool: '#cheap-module-eval-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': config.dev.env
		}),
		// https://github.com/glenjamin/webpack-hot-middleware#installation--usage
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'article.html',
			template: 'article.html',
			inject: true
		}),
		new FriendlyErrorsPlugin()
	]
})
