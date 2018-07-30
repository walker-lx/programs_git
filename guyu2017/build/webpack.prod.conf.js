var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var proWebpackConfig = {
	module: {
		rules: [{
			test:  /\.(css|scss)$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					'postcss-loader',
					{
						loader: 'sass-loader'
					},
				],
				publicPath:'../../'
			})
		}]
	},
	devtool: config.build.productionSourceMap ? '#source-map' : false,
	output: {
		path: config.build.assetsRoot,
		filename: utils.assetsPath('js/[name].[chunkhash].js'),
		chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
	},
	plugins: [
		// http://vuejs.github.io/vue-loader/en/workflow/production.html
		new webpack.DefinePlugin({
			'process.env': config.build.env
		}),
		new webpack.optimize.UglifyJsPlugin({
			// compress: {
			// 	warnings: false
			// },
			// 最紧凑的输出
			beautify: false,
			// 删除所有的注释
			comments: false,
			compress: {
			  // 在UglifyJs删除没有用到的代码时不输出警告  
			  warnings: false,
			  // 删除所有的 `console` 语句
			  // 还可以兼容ie浏览器
			  drop_console: true,
			  // 内嵌定义了但是只用到一次的变量
			  collapse_vars: true,
			  // 提取出出现多次但是没有定义成变量去引用的静态值
			  reduce_vars: true,
			},
			sourceMap: true
		}),
		// extract css into its own file
		new ExtractTextPlugin({
			filename: utils.assetsPath('css/[name].[contenthash].css')
			// disable: false,
			// allChunks: true
		}),
		// Compress extracted CSS. We are using this plugin so that possible
		// duplicated CSS from different components can be deduped.
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),
		// split vendor js into its own file
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function(module, count) {
				// any required modules inside node_modules are extracted to vendor
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname, '../node_modules')
					) === 0 && count >= 2
				)
			}
		}),
		// extract webpack runtime and module manifest to its own file in order to
		// prevent vendor hash from being updated whenever app bundle is updated
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor'],
			minChunks: Infinity
		}),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor',
		// 	chunks: ['index', 'zhuanpan', 'history'],
		// 	minChunks: 3
		// }),
		// copy custom static assets
		new CopyWebpackPlugin([{
			from: path.resolve(__dirname, '../static'),
			to: config.build.assetsSubDirectory,
			ignore: ['.*']
		}])
	].concat(utils.htmlPlugin())
};
// Object.keys(baseWebpackConfig.entry).forEach(function(name) {
// 	// 每个页面生成一个html
// 	var plugin = new HtmlWebpackPlugin({
// 		// 生成出来的html文件名
// 		filename: path.resolve(__dirname, '../dist/' + name + '.html'),
// 		// 每个html的模版，这里多个页面使用同一个模版
// 		template: name + '.html',
// 		// 自动将引用插入html
// 		inject: true,
// 		// 每个html引用的js模块，也可以在这里加上vendor等公用模块
// 		chunks: ['manifest', 'vendor', name],
// 		// necessary to consistently work with multiple chunks via CommonsChunkPlugin
// 		chunksSortMode: 'dependency',
// 	});
// 	proWebpackConfig.plugins.push(plugin);
// })
var webpackConfig = merge(baseWebpackConfig, proWebpackConfig);

if (config.build.productionGzip) {
	var CompressionWebpackPlugin = require('compression-webpack-plugin')
	webpackConfig.plugins.push(
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp(
				'\\.(' +
				config.build.productionGzipExtensions.join('|') +
				')$'
			),
			threshold: 10240,
			minRatio: 0.8
		})
	)
}

// if (config.build.bundleAnalyzerReport) {
// 	var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 	webpackConfig.plugins.push(new BundleAnalyzerPlugin({
// 		analyzerPort: 9988
// 	}))
// }

module.exports = webpackConfig
