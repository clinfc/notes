/**
 * 支持排序的数据缓存器
 */
;(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.dataCache = factory());
}(this, function() { "use strict";
		
	// 判断为空字符串
	function emptyStr(str) {
		if (typeof str != 'string' || str == "") {
			return true;
		}
		return false;
	}
	
	// 对象浅拷贝
	function shallowCopy(object) {
		var temp = {};
		if (typeof object == 'object') {
			for (var k in object) {
				if (object.hasOwnProperty(k)) {
					temp[k] = object[k];
				}
			}
		}
		return temp;
	}
		
	// 唯一值
	var unique = (function () {
		var history = [],	// 存储已经创建过的字符串
			chars = chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		function create(len) {
			var temp = [], nots = true, i = 0;
			while (nots) {
				i = Math.round(Math.random() * chars.length);
				chars[i] && temp.push(chars[i]);
				if (temp.length == len) {
					nots = false;
				}
			}
			return temp.join('');
		}
		return {
			has: function(key) {
				return -1 != history.indexOf(key) ? true : false;
			},
			create: function(len) {
				len = parseInt(len);
				if (isNaN(len) || len < 1) {
					len = 6;
				}
				var str = create(len);
				while(this.has(str)) {
					str = create(len);
				}
				history.push(str);
				return str;
			}
		}
	})();
	
	var data = {}, order = [], keylen = 6;
	
	function dataCache(options) {
		if (typeof options == 'object') {
			options.keylen *= 1;
			if (!isNaN(options.keylen) && options.keylen > 0)
				keylen = options.keylen;
		}
	}
	
	dataCache.prototype = {
		// 返回键数组
		keys: function() {
			return order.join(',').split(',');
		},
		// 返回值数组(以键的顺序进行排序)
		vals: function() {
			var response = [];
			order.forEach(function(key) {
				response.push(data[key])
			});
			return response;
		},
		// 返回键值对对象
		kvs: function() {
			var response = {};
			order.forEach(function(key) {
				response[key] = data[key];
			});
			return response;
		},
		// 获取键名为key的值
		get: function(key) {
			return shallowCopy(data[key]);
		},
		/**
		 * 设置键名为key的值,如果key不存在,则生成key并添加到最后
		 * @param {Stirng} key - 键
		 * @param {Object} value - 值
		 */
		set: function(key, value) {
			if (data[key] == undefined) {
				key = unique.create(keylen);
				order.push(key);
			}
			data[key] = value;
			return true;
		},
		// 判断是否存在键名为key的数据
		has: function(key) {
			return data[key] ? true : false;
		},
		// 返回键名为key的索引值
		index: function(key) {
			return order.indexOf(key);
		},
		/**
		 * 在键名为key的前面插入一条数据,如果该key不存在,则将数据添加到末尾
		 * @param key - 键
		 * @param value - 值
		 */
		before: function(key, value) {
			var index = this.index(key);
				key = unique.create(keylen);
			-1 == index ? order.push(key) : order.splice(index, 0, key);
			data[key] = value;
			return key;
		},
		/**
		 * 在键名为key的后面插入一条数据,如果该key不存在,则将数据添加到末尾
		 * @param key - 键
		 * @param value - 值
		 */
		after: function(key, value) {
			var index = this.index(key);
				key = unique.create(keylen);
			-1 == index ? order.push(key) : order.splice(++index, 0, key);
			data[key] = value;
			return key;
		},
		// 添加一条数据
		add: function(value) {
			var key = unique.create(keylen);
			order.push(key);
			data[key] = value;
			return key;
		},
		// 删除键名为key的值
		remove: function(key) {
			var index = this.index(key);
			if (index > -1) {
				order.splice(index, 1);
				delete data[key];
			}
			return true;
		},
		filter: function(call) {
			if (typeof call == 'function') {
				
			}
		}
	}
	
	return dataCache;
}));