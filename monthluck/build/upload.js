const Client = require('ftp');
const path = require('path');
const fs = require('fs');
const config = require('../config');

// let walk = function(dir, done) {
// 	let results = [];
// 	fs.readdir(dir, function(err, list) {
// 		if (err) return done(err);
// 		let pending = list.length;
// 		if (!pending) return done(null, results);
// 		list.forEach(function(file) {
// 			file = path.resolve(dir, file);
// 			fs.stat(file, function(err, stat) {
// 				if (stat && stat.isDirectory()) {
// 					walk(file, function(err, res) {
// 						results = results.concat(res);
// 						if (!--pending) done(null, results);
// 					});
// 				}
// 				else {
// 					results.push(file);
// 					if (!--pending) done(null, results);
// 				}
// 			});
// 		});
// 	});
// };

// walk(dirPath, function(err, results) {
// 	if (err) {
// 		throw err;
// 	}
// 	results.forEach(function(filename) {
// 		(function(filename) {
// 			let ftpPath = directoryPath + filename.substr(filename.indexOf('dist') + 5).replace(/\\/g, '/');
// 			console.log(filename + " -- " + ftpPath);
// 		})(filename)
// 	});
// });


//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */
function geFileList(path) {
	var filesList = [];
	var targetObj = {};
	readFile(path, filesList, targetObj);
	return filesList;
}

//遍历读取文件
function readFile(pathDir, filesList, targetObj) {
	files = fs.readdirSync(pathDir); //需要用到同步读取
	files.forEach(walk);

	function walk(file) {
		states = fs.statSync(pathDir + '/' + file);
		if (states.isDirectory()) {
			var item;
			if (targetObj["children"]) {
				item = { name: file, children: [] };
				targetObj["children"].push(item);
			}
			else {
				item = { name: file, children: [] };
				filesList.push(item);
			}
			readFile(pathDir + '/' + file, filesList, item);
		}
		else {
			//创建一个对象保存信息
			var obj = new Object();
			obj.size = states.size; //文件大小，以字节为单位
			obj.name = file; //文件名
			obj.path = path.resolve(pathDir, file).replace(/\\{1}/g, '/'); //文件绝对路径
			if (targetObj["children"]) {
				var item = { name: file, value: obj.path }
				targetObj["children"].push(item);
			}
			else {
				var item = { name: file, value: obj.path };
				filesList.push(item);
			}
		}
	}
}

let directoryPath = '/mobile.51wnl.com/' + config.build.directoryName + '/';
let dirPath = path.resolve(__dirname, '../dist');

let filesList = geFileList(dirPath);
let dirPathList = [directoryPath];
let filePathList = [];

function putFilesList(filesList, pItem) {
	filesList.forEach(walk);

	function walk(item) {
		if (item.children) {
			pItemPath = pItem ? pItem.pItemPath : '';
			item.pItemPath = pItemPath + item.name + '/';
			dirPathList.push(directoryPath + item.pItemPath);
			putFilesList(item.children, item);
		}
		else {
			let ftpPath = directoryPath + item.value.substr(item.value.indexOf('dist') + 5).replace(/\\/g, '/');
			filePathList.push({ localPath: item.value, ftpPath: ftpPath });
		}
	}
}
putFilesList(filesList);


let c = new Client();
c.on('ready', function() {
	putDirectoryList(putFileList);
});
c.connect(config.build.htmlFtp);

function putDirectoryList(done) {
	let dirLenth = dirPathList.length;
	dirPathList.forEach(function(pathName) {
		(function(pathName) {
			c.mkdir(pathName, true, function(err) {
				console.log(pathName, 'creat');
				if (!--dirLenth) {
					done();
				}
			});
		})(pathName);
	});
}

function putFileList() {
	let fileLenth = filePathList.length;
	filePathList.forEach(function(item) {
		(function(item) {
			c.get(item.ftpPath, function(err) {
				if (err) {
					console.log(item.ftpPath, 'no');
					c.append(item.localPath, item.ftpPath, function(err) {
						if (err) {
							throw err;
						}
						console.log(item.ftpPath, 'creat');
						if (!--fileLenth) {
							c.end();
						}
					});
				}
				else {
					console.log(item.ftpPath, 'yes');
					if (!--fileLenth) {
						c.end();
					}
				}
			});
		})(item);
	});
}
