
var WINDOW = typeof window !== 'undefined' ? window : {};

/**
 * 检查给定的值是否不是一个数字
 */
var isNaN = Number.isNaN || WINDOW.isNaN;

/**
 * 检查给定的值是否是一个数字
 * @param {*} value - 要检查的值
 * @returns {boolean} 如果给定的值是一个数字，则返回“true”，否则返回“false”
 */
function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

/**
 * 检查给定值是否未定义
 * @param {*} value - 要检查的值.
 * @returns {boolean} 如果给定值未定义，则返回“true”，否则返回“false”
 */
function isUndefined(value) {
    return typeof value === 'undefined';
}

/**
 * 检查给定值是否为对象
 * @param {*} value - 要检查的值
 * @returns {boolean} 如果给定的值是一个对象，则返回“true”，否则返回“false”
 */
function isObject(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 检查给定的值是否是普通对象
 * @param {*} value - 要检查的值
 * @returns {boolean} 如果给定的值是一个普通对象，则返回“true”，否则返回“false”
 */

function isPlainObject(value) {
    if (!isObject(value)) {
        return false;
    }

    try {
        var _constructor = value.constructor;
        var prototype = _constructor.prototype;


        return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
    } catch (e) {
        return false;
    }
}

/**
 * 检查给定值是否为函数
 * @param {*} value - 要检查的值
 * @returns {boolean} 如果给定的值是一个函数，则返回“true”，否则返回“false”
 */
function isFunction(value) {
    return typeof value === 'function';
}

/**
 * 数据迭代
 * @param {*} data - 要迭代的数据
 * @param {Function} callback - 每个元素的流程函数
 * @returns {*} 原始数据
 */
function forEach(data, callback) {
    if (data && isFunction(callback)) {
        if (Array.isArray(data) || isNumber(data.length) /* array-like */) {
            var length = data.length;

            var i = void 0;

            for (i = 0; i < length; i += 1) {
                if (callback.call(data, data[i], i, data) === false) {
                    break;
                }
            }
        } else if (isObject(data)) {
            Object.keys(data).forEach(function (key) {
                callback.call(data, data[key], key, data);
            });
        }
    }
    return data;
}

var location = WINDOW.location;

var REGEXP_ORIGINS = /^(https?:)\/\/([^:/?#]+):?(\d*)/i;

/**
 * 检查给定的URL是否是跨源URL
 * @param {string} url - 目标URL
 * @returns {boolean} 如果给定的URL是一个跨源URL，则返回“true”，否则返回“false”
 */
function isCrossOriginURL(url) {
    var parts = url.match(REGEXP_ORIGINS);
    return parts && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
}

/**
 * 向给定URL添加时间戳
 * @param {string} url - 目标URL
 * @returns {string} 结果URL
 */
function addTimestamp(url) {
    var timestamp = 'timestamp=' + new Date().getTime();
    return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
}

/**
 * 检查给定的值是否是一个有限的数
 */
var isFinite = Number.isFinite || WINDOW.isFinite;

/**
 * 在给定的长宽比下获得矩形中的最大尺寸
 * @param {Object} data - 原来的尺寸
 * @param {string} [type='contain'] - 调整类型
 * @returns {Object} 结果大小
 */
function getAdjustedSizes(_ref4) // or 'cover'
{
    var aspectRatio = _ref4.aspectRatio,
        height = _ref4.height,
        width = _ref4.width;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'contain';

    var isValidNumber = function isValidNumber(value) {
        return isFinite(value) && value > 0;
    };

    if (isValidNumber(width) && isValidNumber(height)) {
        var adjustedWidth = height * aspectRatio;

        if (type === 'contain' && adjustedWidth > width || type === 'cover' && adjustedWidth < width) {
            height = width / aspectRatio;
        } else {
            width = height * aspectRatio;
        }
    } else if (isValidNumber(width)) {
        height = width / aspectRatio;
    } else if (isValidNumber(height)) {
        width = height * aspectRatio;
    }

    return {
        width: width,
        height: height
    };
}


function hash()
{
    var hash = WINDOW.location.hash.replace('#', '').split('/');
}

/**
 * 手机的类型
 */
var phone = new Array("android", "iphone", "symbianos", "windows phone", "ipad", "ipod");

/**
 * 检查当前访问的是否为PC端
 * @returns {boolean} 如果当前访问的是PC端，则返回“true”，否则返回“false”
 */
function isPc()
{
    var flag = true;
    var agent = navigator.userAgent.toLowerCase();
    for (var i = phone.length - 1; i >= 0; i--) {
        if (agent.indexOf(phone[i]) != -1) {
            flag = false;
            break;
        }
    }
    return flag;
}

/**
 * 检查当前访问的是否为手机端
 * @returns {boolean} 如果当前访问的是手机端，则返回“true”，否则返回“false”
 */
function isPhone()
{
    var flag = false;
    var agent = navigator.userAgent.toLowerCase();
    for (var i = phone.length - 1; i >= 0; i--) {
        if (agent.indexOf(phone[i]) != -1) {
            flag = true;
            break;
        }
    }
    return flag;
}