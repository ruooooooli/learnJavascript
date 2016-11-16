/**
 * 代码的组织和部署
 */

/**
 * 模块路径解析规则
 *
 * 1.内置模块:不做路径解析,直接返回内部模块导出的对象 eg: require('fs')
 * 2.NodeJS 定义了一个特殊的 node_modules 目录 加载一个模块时候依次从下面的路径加载
 * 		/home/user/node_modules/*
 * 		/home/node_modules/*
 * 		/node_modules/*
 * 3.NODE_PATH 变量 NodeJS 允许通过  NODE_PATH 环境变量来指定额外的模块搜索路径
 * 		NODE_PATH=/home/user/lib:/home/lib
 * 	 在加载的时候 require('foo/bar') 依次从下面的路径加载
 * 	 	/home/user/lib/foo/bar
 * 	 	/home/lib/foo/bar
 */


/**
 * 以下实现了一个简单的模块
 *
 * - part-3/
 * 		head.js
 * 		body.js
 * 		main.js
 */

/**
 * 当别的地方需要使用这个模块的时候需要完整的路径
 *
 * var create = require('/home/user/work/nodejs/part-3/main');
 *
 * 但是当模块的文件名称是 index.js 的时候可以省略文件名(以下两个路径相等)
 *
 * var create = require('/home/user/work/nodejs/part-3');
 * var create = require('/home/user/work/nodejs/part-3/index');
 */

var head = require('./head');
var body = require('./body');

exports.create = function (name)
{
    return {
        name : name,
        head : head.create(),
        body : body.create(),
    };
}


/**
 * 自定义模块的路径需要使用 package.json
 *
 */
{
    "name" : "create",
    "main" : "./lib/main.js",
}
