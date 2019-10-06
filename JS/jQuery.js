
/* 入口函数 */

/* js入口函数与jQuery入口函数的区别：
		1、js入口函数执行比jQuery入口函数晚一些
		2、js入口函数会等待页面和图片都加载完成才开始执行
		3、jQuery入口函数会等页面加载完成才执行，但不会等图片的加载状况
*/
$(document).ready(function(){
	console.log("这是jQuery入口函数第一种写法");
});

$(document(){
	console.log("这是jQuery入口函数的第二种写法");
});

window.onload = function(){
	console.log("这是js的入口函数");
};



/* DOM对象与jq对象 
	1、jQuery对象就是js对象的一个集合，伪数组，里面存放了一大堆的js对象（宏观上） 
	2、DOM对象无法调用jQuery对象的方法：因为是两个不同的对象 
	3、将DOM对象转换成jQuery对象即可调用jQuery对象方法
 */

// DOM对象（js对象）：使用js方式获取的元素
var li = document.getElementById("li");
li.style.backgroundColor = "pink";
$(li).text("内容");		// 转换成jQuery对象

// jQuery对象：使用jq的方式获取到的元素
var $li = $("li");
$li.text("文本");
$li[0].style.backgroundColor = "red";		// 转换成DOM对象
$li.get(0).style.backgroundColor = "back";	// 转换成DOM对象














//----------------实例----------------//

/* 网页加载完毕后自动弹出窗口事件 */
window.onload = init; // 页面加载完后执行 init 
function init(){
	window.open("a.html","a","width=20,height=30,left=333,top=23");
}



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
























