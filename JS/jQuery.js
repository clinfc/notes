
let object = {};
let array = [];


/**
 * @method jQuery.grep(array, callback[,invert]）
 * @param {array}array			需要处理的数组
 * @param {function}callback	回调函数，用于对数组中的元素进行处理
 * @param {bool}invert			是否返回不满足条件的内容，默认为 false
 * @return {array}				返回处理后的数组
 */
let result = $.grep(array, function(i, v) {
	return v > 0 ? v : null;
}, false);

/**
 * @method jQuery.map(array, callback）
 * @param {array}array			需要处理的数组
 * @param {function}callback	回调函数，用于对数组中的元素进行处理
 * @return {array}				返回处理后的数组
 */
let result = $.map(array, function(v) {
	return v > 0 ? v : null;
})
























