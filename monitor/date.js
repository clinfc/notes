;(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.date = factory());
}(this, function() { "use strict";
	function date() {
		Object.defineProperties(this, {
			msec: {		// 返回 1970 年 1 月 1 日至今的毫秒数
					enumerable: true,
					get: function () {
						return new Date().getTime();
					}
			},
			timestamp: {		// 获取当前时间戳(1970 年 1 月 1 日至今的秒数)
				enumerable: true,
				get: function () {
					return Math.round(this.msec / 1000);
				}
			},
			/**
			 * 将时间戳格式化为时间
			 * @param template string 输出时间的格式模板
			 * @param timestamp timestamp 欲格式化的时间戳（不设置则默认为当前时间戳）
			 * 模板参数：
			 *  Y	年	4位数字完整表示的年份
			 *  y	年	2位数字表示的年份
			 *  M 月	表示的月份，有前导零（01~12）
			 *  m 月	表示的月份，无前导零（1~12）
			 *  D 日	月份中的第几天，有前导零（01~31）
			 *  d 日	月份中的第几天，无前导零（1~31）
			 *  H 时	24小时格式，有前导零（00~23）
			 *  h 时	24小时格式，无前导零（0~23）
			 *  G 时	12小时格式，有前导零（01~12）
			 *  g 时	12小时格式，无前导零（1~12）
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
			add: {
				enumerable: true,
				value: function(interval) {
					
				}
			}
		})
	}
	
	return new date();
}));