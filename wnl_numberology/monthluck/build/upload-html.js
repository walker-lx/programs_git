const Client = require('ftp');
const path = require('path');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');

let c = new Client();
c.on('ready', function() {
	c.list('/mobile.51wnl.com/', function(err, list) {
		if (err) {
			throw err;
		}
		let directoryObj = list.find((item) => {
			return item.name === config.build.directoryName;
		});
		let directoryPath = '/mobile.51wnl.com/' + config.build.directoryName + '/';
		//已存在当前项目的目录，直接更新
		if (directoryObj) {
			Object.keys(baseWebpackConfig.entry).forEach(function(name) {
				let filename = path.resolve(__dirname, '../dist/' + name + '.html');
				(function(filename) {
					c.append(filename, directoryPath + name + '.html', function(err) {
						if (err) {
							throw err;
						}
						console.log(filename + " -- " + directoryPath);
						c.end();
					});
				})(filename);
			});
		}
		//不存在，新建
		else {
			c.mkdir(directoryPath, function(err) {
				if (err) {
					throw err;
				}
				Object.keys(baseWebpackConfig.entry).forEach(function(name) {
					let filename = path.resolve(__dirname, '../dist/' + name + '.html');
					(function(filename) {
						c.put(filename, directoryPath + name + '.html', function(err) {
							if (err) {
								throw err;
							}
							console.log(filename + " -- " + directoryPath);
							c.end();
						});
					})(filename);
				});
			});
		}
	});
});
c.connect(config.build.htmlFtp);
