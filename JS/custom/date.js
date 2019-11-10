;(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.date = factory());
}(this, function() { "use strict";
	function date() {
		Object.defineProperties(this, {
			/**
			 * 返回 1970 年 1 月 1 日至今的毫秒数
			 */
			msec: {
					enumerable: true,
					get: function () {
						return new Date().getTime();
					}
			},
			/**
			 * 获取当前时间戳(1970 年 1 月 1 日至今的秒数)
			 */
			timestamp: {
				enumerable: true,
				get: function () {
					return Math.round(this.msec / 1000);
				}
			},
			/**
			 * 将时间戳格式化为时间
			 * @param template string 输出时间的格式模板
			 * @param timestamp timestamp 欲格式化的时间戳（不设置则默认为当前时间戳）
			 * template参数：
			 *  Y	年	4位数字完整表示的年份
			 *  y	年	2位数字表示的年份
			 *  M 月	表示的月份，有前导零（01~12）
			 *  m 月	表示的月份，无前导零（1~12）
			 *  D 日	月份中的第几天，有前导零（01~31）
			 *  d 日	月份中的第几天，无前导零（1~31）
			 *  H 时	24小时格式，有前导零（00~23）
			 *  h 时	24小时格式，无前导零（0~23）
			 *  G 时	12小时格式，有前导零（00~12）
			 *  g 时	12小时格式，无前导零（0~12）
			 *  I 分	分钟数，有前导零（01~59）
			 *  i 分	分钟数，无前导零（1~59）
			 *  S 分	秒数，有前导零（01~59）
			 *  s 分	秒数，无前导零（1~59）
			 */
			format: {
				enumerable: true,
				value: function format(template, timestamp) {
					if (typeof template != 'string') {
						throw new Error('请输入字符串类型的时间格式');
					}
					var dobj = new Date();
					if (undefined != timestamp) {
						dobj.setTime(timestamp*1000);
					}
					function fixed(number) {	// 添加前导零
						if (number < 10) {
							number = '0' + number;
						}
						return number;
					}
					function short(bool) {	// 用于计算 12 小时制时
						var h = dobj.getHours();
						if (h > 12)
							h -= 12;
						if (bool)
							h = fixed(h);
						return h;
					}
					return template.replace('Y', dobj.getFullYear()).replace('y', ('' + dobj.getFullYear()).slice(2)).replace('M', fixed(dobj.getMonth() + 1)).replace('m', dobj.getMonth() + 1).replace('D', fixed(dobj.getDate())).replace('d', dobj.getDate()).replace('H', fixed(dobj.getHours())).replace('h', dobj.getHours()).replace('G', short(true)).replace('g', short()).replace('I', fixed(dobj.getMinutes())).replace('i', dobj.getMinutes()).replace('S', fixed(dobj.getSeconds())).replace('s', dobj.getSeconds());
				}
			},
			/**
			 * 时间计算
			 * 
			 * @param interval String 时间差字符串
			 * @param timestamp timestamp 设置一个时间，在此基础上进行计算（不设置则默认为当前时间戳）
			 * @param retype bool 计算结束后返回的类型。为true时，返回时间对象；为false时，返回时间戳（默认返回时间戳）
			 * interval参数：
			 *  年：Y|y（不区分大小写）eg：2y、+2y、-2y
			 *  月：M|m（不区分大小写）eg：2m、+2m、-2m
			 *  日：D|d（不区分大小写）eg：2d、+2d、-2d
			 *  时：H|h（不区分大小写）eg：2h、+2h、-2h
			 *  分：I|i（不区分大小写）eg：2i、+2i、-2i
			 *  秒：S|s（不区分大小写）eg：2s、+2s、-2s
			 * 
			 * 下面三种写法等效：
			 * date.interval("2y-2m+3d4h-5i-6s")
			 * date.interval("2y-2m+3d4h-5i-6s", date.timestamp)
			 * date.interval("2y-2m+3d4h-5i-6s", date.timestamp, false)
			 */
			interval: {
				enumerable: true,
				value: function(interval, timestamp, retype) {
					if (typeof interval != 'string') {
						throw new Error('请输入字符串类型的 interval 值');
					}
					var dobj = new Date(),
							diff = match(interval);
							timestamp = parseInt(timestamp) * 1000;
					if (timestamp >= 0 && timestamp < 10000000000) {
						dobj.setTime(timestamp);
					}
					dobj.setFullYear(dobj.getFullYear() + diff.y, dobj.getMonth() + diff.m, dobj.getDate() + diff.d);
					dobj.setHours(dobj.getHours() + diff.h, dobj.getMinutes() + diff.i, dobj.getSeconds() + diff.s);
					if (retype == true) {
						return dobj;
					}
					return  Math.round(dobj.getTime()/1000);
				}
			}
		});
		
		// 分解字符串，供 date.interval() 调用
		function match(interval) {
			function count(arr, restr) {
				if (arr == null) {
					return 0;
				}
				var temp = 0;
				arr.forEach(function(item) {
					temp += parseInt(item)
				});
				return temp;
			}
			interval = interval.toLowerCase();
			return {
				y: count(interval.match(/[+-]?\d+y/g), 'y'),
				m: count(interval.match(/[+-]?\d+m/g), 'm'),
				d: count(interval.match(/[+-]?\d+d/g), 'd'),
				h: count(interval.match(/[+-]?\d+h/g), 'h'),
				i: count(interval.match(/[+-]?\d+i/g), 'i'),
				s: count(interval.match(/[+-]?\d+s/g), 's')
			}
		}

	}
	
	return new date();
}));