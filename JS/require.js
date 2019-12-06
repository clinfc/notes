
define()		// 定义一个模块
require()		// 加载依赖模块
requirejs()		// 加载依赖模块


// 定义【独立模块】【不依赖任何其他模块，可以直接用define方法生成】
define({
	method: function(){},
	method: function(){},
})
// 定义【独立模块】【自由度更高，可以在函数体内写一些模块初始化代码】
define(function(){
	// define定义的模块可以返回任何值，不限于对象
	return {
		method: function() {},
		method: function() {}
	}
})


// 定义【非独立模块】【 其中“jquery” 等同于“./jquery”，表示当前文件夹下的“./jquery.js”文件， 】
define(['jquery'], function($){
	// function：当数组所有成员被调用时，加载此函数 【参数成员与数组成员一一对应】
	
	// 回调函数必须返回一个对象，供其他模块调用
	return {
		method: function() {},
	}
})


// 其中
define(['dep1', 'dep2', 'dep3', 'dep4'], function(dep1,dep2,dep3,dep4){
	return {
		method: function(){}
	}
})
// 等价于
define(function(require){
	var dep1 = require('dep1'),
		dep2 = require('dep2'),
		dep3 = require('dep3'),
		dep4 = require('dep4');
	return {
		method: function(){}
	}
})



// 其中
require.config({
	paths: {
		'jquery': '/static/js/jquery',
	}
})
// 等价于
require.config({
	// 定义基目录
	baseUrl: '/static/js/',
	paths: {
		'jquery': 'jquery',
	}
})



// 加载文件
require.config({
	// 定义基目录
	baseUrl: '/static/js/',
	// paths：制定各个模块的位置
	paths: {
		// 多路径，第一个error，加载第二个【加载模块时不能写 .js 后缀】
		"jquery": ["http://libs.baidu.com/jquery/2.0.3/jquery", "jquery"],
		"json-viewer": "jquery-json-viewer.js"
	},
	// shim：加载非AMD兼容/规范的库
	shim: {
		"jquery.from": {
			deps: ['jquery']		// 依赖关系【jquery.from 依赖于 jquery】【标准写法】
		},
		"json-viewer": {
			deps: ["jquery", "css!jquery-json-viewer.css"]
		}
		"jquery.from": ["jquery"]	// 依赖关系【jquery.from 依赖于 jquery】【简化写法】
		"layui": {
			exports: "layui"		// 定义输出的变量名，表明这个模块外部调用时的名称
		}
	}
})
// 类似于layUI、layer，但不同于layUI的是变量名写入 function 的中括号中
require(["jquery"], function($){

})



// 全局配置
// 1、创建 main.js
require.config({
	paths: {
		"jquery": [],
	}
})
// 2、页面中使用 requirejs
<script	data-main="js/main" src="js/require.js" async="async" defer="defer"></script>	/
// 3、调用
require(["jquery"], function($) {

})
/*
注释：async 属性仅适用于外部脚本（只有在使用 src 属性时）。

注释：有多种执行外部脚本的方法：
1、如果 async="async"：脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
2、如果不使用 async 且 defer="defer"：脚本将在页面完成解析时执行
3、如果既不使用 async 也不使用 defer：在浏览器继续解析页面之前，立即读取并执行脚本		*/





/* 
循环依赖：

所谓循环依赖就是a依赖b，b也同时依赖a。
在a执行到require('b')的地方时会停下来去调用b,当去执行b，执行到一半发现require('a'),就停下来去调用a。		*/

/*	
方法一：
	使用exports为模块建立一个空object，该object可以立即被其他模块引用。在循环依赖的两头都如此操作之后，就可以安全地持有其他模块了。
注释：
	这种方法仅在每个模块都是输出object作为模块值的时候有效，换成函数无效。		*/
define(function( require, exports, module ){
	var $ = require('juqery');
	exports.foo = function () {
		return $. ...;
	}
});
/*
方法二：
	使用依赖注入数组的步骤，则可用注入特殊的"exports"来解决			*/
define(['jquery', 'exports'], function ($, exports) {
	exports.foo = function () {
		return $. ...;
	}
});