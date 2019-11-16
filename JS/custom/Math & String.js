var random = Math.random;
/**
 * 重写 Math.random
 * Math.random()					返回一个0~1之间的数
 * Math.random(5)					返回一个字符长度为5的数字
 * Math.random(5, 5.5)		返回一个5~5.5之间的数
 * Math.random(5, 5.5, 2)	返回一个5~5.5之间的数,且保留两位小数
 */
Object.defineProperty(Math, 'random', {
	enumerable: true,
	value: function() {
		switch (arguments.length) {
			case 1:
				var len = parseInt(arguments[0]),
					num;
				if (isNaN(len) || len <= 1) {
					return this.round(random() * this.pow(10, 1));
				}
				len = this.pow(10, len);
				num = this.round(random() * len);
				while (num < len / 10) {
					num = this.round(random() * len);
				}
				return num;
			case 2:
			case 3:
				arguments[0] = parseFloat(arguments[0]);
				arguments[1] = parseFloat(arguments[1]);
				if (isNaN(arguments[0]) || isNaN(arguments[1])) {
					throw new Error('此函数只接受数字参数');
				}
				var min = arguments[0] < arguments[1] ? arguments[0] : arguments[1];
				var max = arguments[0] > arguments[1] ? arguments[0] : arguments[1];
				var dec = decimalPlace(arguments);
				if (!dec) {
					return this.round(random() * (max - min)) + min;
				}
				dec = this.pow(10, dec);
				return this.round((random() * (max - min) + min) * dec) / dec;
			default:
				return random();
		}
		// 获取小数位数
		function decimalPlace(arg) {
			// debugger;
			var arg1 = arg[0].toString(),
				arg1 = /\./.test(arg1) ? arg1.replace(/\d+\./, '').length : 0,
				arg2 = arg[1].toString(),
				arg2 = /\./.test(arg2) ? arg2.replace(/\d+\./, '').length : 0,
				arg3 = Math.abs(parseInt(arg[2]) || 0);
			return Math.max(arg1, arg2, arg3);
		}
	}
})
/**
 * 从自定义字符串中生成一个指定长度的随机字符串
 * @param chars - String - 自定义字符串
 * @param length - Number - 生成字符串的长度
 * @return {String}
 */
Object.defineProperty(String, 'create', {
	enumerable: true,
	value: function(chars, length) {
		length = parseInt(length);
		if (typeof chars != 'string' || isNaN(length) || length < 1) {
			return '';
		}
		var temp = [];
		var nots = true;
		var i = 0;
		while (nots) {
			i = Math.round(Math.random() * chars.length);
			chars[i] && temp.push(chars[i]);
			if (temp.length == length) {
				nots = false;
			}
		}
		return temp.join('');
	}
});
/**
 * 生成随机字符串,该字符串包含数字和大小写字母
 * @param length - Number - 生成字符串的长度
 * @param forbiddenChars - Boolean(false) - 不剔除模糊(不易辨别的)字符
 * @param forbiddenChars - String - 自定义需要剔除的字符(未定义则默认剔除"0oO1Il")
 * @return {String}
 */
Object.defineProperty(String, 'code', {
	enumerable: true,
	value: function(length, forbiddenChars) {
		var codes = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (forbiddenChars === false) {
			return this.create(codes, length);
		}
		forbiddenChars = typeof forbiddenChars == 'string' ? '[' + forbiddenChars + ']' : '[0oO1Il]';
		var reg = new RegExp(forbiddenChars, 'g');
		codes = codes.replace(reg, '');
		return this.create(codes, length);
	}
});
/**
 * 生成随机字符串,该字符串仅包含小写字母
 * @param length - Number - 生成字符串的长度
 * @param forbiddenChars - String - 自定义需要剔除的字符
 * @param return {String}
 */
Object.defineProperty(String, 'lower', {
	enumerable: true,
	value: function(length, forbiddenChars) {
		var codes = 'abcdefghijklmnopqrstuvwxyz';
		if (typeof forbiddenChars == 'string') {
			var reg = new RegExp('[' + forbiddenChars + ']', 'g');
			codes = codes.replace(reg, '');
		}
		return this.create(codes, length);
	}
});
/**
 * 生成随机字符串,该字符串仅包含大写字母
 * @param length - Number - 生成字符串的长度
 * @param forbiddenChars - String - 自定义需要剔除的字符
 * @param return {String}
 */
Object.defineProperty(String, 'upper', {
	enumerable: true,
	value: function(length, forbiddenChars) {
		var codes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (typeof forbiddenChars == 'string') {
			var reg = new RegExp('[' + forbiddenChars + ']', 'g');
			codes = codes.replace(reg, '');
		}
		return this.create(codes, length);
	}
});
Object.defineProperty(String, 'semiangle', {
