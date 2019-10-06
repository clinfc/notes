

//HTML中引用js文件
	<scrip src="*.js" type="" sync="sync"|async="async"|defer="defer" ></scrip>
	/* syn   同步：一个人有序的做多件事儿（默认值）
	 * async 异步：多个人同时做多件事儿（当js加载完成便立即执行）
	 * defer 异步：多个人同时做多件事儿（当所有HTML内容加载完成才执行）
	 */
 
 
 //定义变量
	 var num = 50;
	 num = "50";//不推荐重赋值其他类型
	 var name;
	 name = "张三";
	 var age,sex,tel;
	 /* 变量命名规则
		由字母、数组、下划线、$组成
		不能是关键字和保留字
		区分大小写
	  *变量命名规范
		变量名称要有意义
		变量命名遵循驼峰命名法，首字母小写，第二个单词首字母大写
	  */
  
  
  //数值检测
	  NaN	//非数值。NaN与任何值都不相等，包括NaN本身
	  isNaN //判断是否为非数值。任何非数值的值都将会返回true
  
  
  /* boolean返回false
   *	空字符串、0（数字非字符串）、null、NaN、undefined
   */
  
  
  //类型转换
		toString()	//除了null和undefined，其他类型都可以转换
		String();	//可以将null和undefined转换为字符串
		var age = 10;
		age.toString();		//数值类型的toString，默认10进制
		age.toString(10);	//数值类型的toString，按10进制解析
		age.toString(2);	//数值类型的toString，按2进制解析
		age.toString(8);	//数值类型的toString，按8进制解析
		age.toString(16);	//数值类型的toString，按16进制解析
		Number(true);		//true返回1，false返回0
		Number(undefined);	//返回NaN
		Number("hello");	//返回NaN
		Number("");			//返回0
		Number(123);		//返回123，如果为数字简单返回
		parseInt(16.8);		//返回16
		parseInt("0xA");	//返回10
		parseInt("10");		//返回10
		parseInt("10.3av");	//返回10
		parseInt("av12");	//返回NaN
		parseInt("");		//返回NaN
		parseInt("A",16);	//A按16进制进行解析
		parseFloat();
		var eg =  ;
		Boolean(eg);		//当eg的值为 false、""、0、NaN、null 时返回false
		!"123";				//返回false
		!!"123";			//返回true
  
  
var b = "bcd" && "dfg";		//如果两个操作上转换成布尔类型都是true，返回第二个操作数
var b = "bcd" && null;		//只要其中一个转换成布尔类型为false，返回第一个为false的操作数
var b = "bcd" || "dfg"; 	//只要其中一个转换成布尔类型为true，返回第一个为true的操作数
var b = null || undefined;	//如果操作数转换成布尔类型全为false，返回最后一个操作数
  
  
var date = new Date();		//获取当前日期
var week = date.getDay();	//获取当前星期，返回 0~6 的数字，0表示星期天
var day = date.getDate();	//获取当前是本月的第几天
  

//数组  
var array = ["lis","sdji"];
console.log(array);			//直接输出数组
for(var i=0;i<array.length;i++){}	//遍历输出数组

var array = new Array();	
array[0] = "lis";

var array =new Array(4);			//设置数组长度为4
var array =new Array(4,3,5,7,3);	//设置数组元素分别为4,3,5,7,3
var array =new Array("4");			//设置数组第一个元素为4


函数
//JavaScript函数没有重载，相同的函数名将会被后定义的函数覆盖
//函数是一种数据类型，类型为function
function funName(){}			//声明方式：函数声明
var funName = function(){};		//声明方式：函数表达式
(function(){...})();			//自调用函数，只执行一次；局部变量不会与外部变量冲突


//为什么下列代码会出错
console.log(fun(a,b));
var fun = function(a,b){
	return a+b;
}//浏览器解析后单行执行过程如下
	var fun;
	console.log(fun(1,2));	//执行到此处，解析器在已执行的代码中找不到fun()函数，报错
	fun = function(a,b){
		return a+b;
	}


变量
/* 
 * 全局变量：在函数体声明的变量；不使用var声明的变量都是全局变量；
 * 局部变量：在函数体内部声明的变量，只能在函数内部使用；当变量超出作用域范围后将会被垃圾回收机制销毁
 
 * 在JavaScript中没有块作用域，除函数体内的变量均为全局变量
 * 全局作用域：在任何位置都可以访问
 * 局部作用域：在函数每部声明的变量，只能在函数内部访问
 */


JavaScript解析过程
/* 	预解析（全局作用域）
 *		1：在全局作用域下找到var、function和参数。
 * 		2：将var声明（不赋值）和function提取到首端
 *	从上往下执行
 */
var num = 10;
fun();
function fun(){
	console.log(num);	==输出结果==> undefined
	var num = 20;
}//理解代码
	//第一步：预解析
	var num;
	function fun(){
		console.log(num);
		var num = 20;
	}
	//第二步：执行代码
	num = 10;
	//第三步：执行到fun()，调用fun() 函数
	fun();
	//第四步：在函数内预解析
	function fun(){
		var num;
	}
	//第五布：执行代码
	function fun(){
		var num;
		console.log(num);
		num = 20;
	}


//对象：无序属性的集合，我们可以把对象看成键值对
//对象作用：封装一些数据

//创建对象
var student = new Object();	
//对象的属性	
student.name = "张三丰";
//对象的方法		
student.learn = function(){			
	console.log("say hello!");
}
//方法调用
student.learn();

/*
 * 构造函数：构造一个对象，并且返回的函数
 * 	自定义构造函数
 * 	调用构造函数		var student = new Object();
 */

//创建对象函数：调用
function cObject(name,age){
	var newOj = new Object();
	newOj.name = name;
	newOj.age = age;
	return newOj;
}

//自定义构造函数
function newObject(name,age,sex){
	this.name = name;
	this.age = age;
	this.sex = sex;
	this.sayHello = function() {
		console.log("Hello every one! My name's " + this.name);
	}
}
var n = new newObject("李白",12,1);
console.log(n.name);
console.log(n["name"]);




字面量
//数组字面量
var array = [];

//对象字面量
var cObject = {
	name: "李白",
	age: 19,
	hobby: {},
	sayHello: function(){}
};
for(var key in cObject){
	console.log(key);	//输出属性名
	console.log(cObject[key]);	//输出属性值
}

//json
var cObject = {
	"name": "李白",
	"age": 19,
	"hobby": {},
	"sayHello": function(){}
};

/*
 * typeof和instanceof的区别
 *		typeof：可以获取任意变量的类型；任意类型的对象使用typeof获取到的都是object
 *		instanceof：只能判断对象的类型
 */



/* 

 * 面向对象（过程）：使用/通过 对象（过程）开发

 * JavaScript是基于对象的多范式编程语言	（多范式：支持面向对象、面向过程、函数式编程方式）
 
 * 面向对象不是面向过程的替代，而是面向过程的封装
 
 * 在JavaScript中所谓的对象就是键值对的集合
	> 键值 ==> 是数据（基础数据、复合数据、空数据），称为属性
	> 键值 ==> 是函数，称为方法
 
 * 面向对象的特性：封装性、继承性、抽象性
	> 抽象性：
		1、抽取对象的核心数据；
		2、不再特定条件下不知道是什么
	> 封装性：
		对象将数据与功能组合到一起，即封装。
		对象将属性与方法封装到一起。
		方法就是将过程封装起来。
	> 继承性：
		继承是实现复用的一种手段（自己没有，但别人有，将别人拿过来成为自己的）
	
 */
 
 
 面向过程创建div
 
	 // 1、创建一个div标签
	 var di = document.createElement('div');
	 // 2、将div加入页面中
	 document.appendChild(di);
	 // 3、设置div样式
	 di.style.border = '1px dashed red';
	 di.style.width = '400px';
	 di.style.height = '200px';
 
 面向对象创建div 
 
	/* 
	 * 面向对象的方式去思考
	 * 	1、抽取对象（名词提炼）：div body
	 * 	2、分析属性和方法（动词提炼）：加到 设置样式
	 */
	// 普通面向对象
	function DivTag(){	// 需要一个div构造函数
		this.DOM = document.createElement('div');	//创建div对象
		this.add = function(node){		//将创建的对象添加到“node”中
			node.appendChild(this.DOM);
		}
		this.edit_css = function(name,value){	//设置对象的样式
			this.DOM.style[name] = value;
		}
		this.ecss = function(option){	//设置对象的样式
			for(var k in option){
				this.DOM.style[k] = option[k];
			}
		}
	}
	var divTag = new DivTag();
	divTag.add(document.body);
	divTag.edit_css('border','1px solid red');
	divTag.ecss({
		'width': '200px',
		'height': '200px',
		'backgroundColor': 'pink'
	});
	// 中级面向对象
	function DivTag(){
		this.DOM = document.createElement('div');
		this.appendTo = function(node){
			node.appendChild(this.DOM);
			return this;
		}
		this.ecss = function(option){
			for(var k in option){
				this.DOM.style[k] = option[k];
			}
			return this;
		}
	}
	new DivTag().appendTo(document.body).ecss({
		'border': '1px solid red',
		'width': '200px',
		'height': '200px',
		'backgroundColor': 'pink'
	});
 
 
/*

 * 拷贝：将对象数据复制一份
 
 * 深拷贝与浅拷贝
	在讨论深拷贝和浅拷贝的时候一定要保证拷贝对象的属性也是引用类型
 
 * 深拷贝
	拷贝的时候将所有引用结构都拷贝一份，那么数据在内存中独立就是深拷贝
	
 * 浅拷贝
	拷贝的时候只针对当前对象的属性（数据）进行拷贝，那么就是浅拷贝
	
 */

var car = {name: '法拉利'};
var p = {name: '张珊', age: 19, car: car};

// 这并不是拷贝，未对对象做任何拷贝行为
var pCopy = p;

// 浅拷贝
var pCopy = {};
pCopy.name = p.name;
pCopy.age = p.age;
pCopy.car = p.car;

// 深拷贝
var pCopy = {};
pCopy.name = p.name;
pCopy.age = p.age;
pCopy.car = {};
pCopy.car.name = p.car.name;


// 封装 浅拷贝
var p = {
	name: '张三';
	age: 18,
	sex: '男'
	copy: function(){
		var temp = {};
		for(var k in this){	// this表示当前对象p
			temp[k] = this[k];
		}
		return temp;	//返回对象
	}
};
var pp = p.copy();
 
 
// 封装 深拷贝
var Copy = function(){
	var temp = {};
	for(var k in this){
		if(typeof this[k] === 'object'){
			temp[k] = this[k].copy();
		}else{
			temp[k] = this[k];
		}
	}
	return temp;
}
var car = {name: '法拉利',copy:Copy};
var p = {name: '张珊',age: 19,car: car.Copy,copy:Copy};
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 






