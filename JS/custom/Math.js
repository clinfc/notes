var Math = this.Math,
	random = Math.random;
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
