


拆分用户输入的整数并输出
var number = Number(prompt("请输入一个数字"));	//接收用户输入
if(number){
	number = parseInt(number);	//去掉小数部分
	do{
		var tmp = number % 10;	//取出当前个位的数值
		number = parseInt(number / 10);
		console.log(tmp);
	}while(number);
}else if{
	console.log("0");
}else{
	console.log("出错");
}



遍历添加数组值
//方法一
var array = [];
var i = 0;
for(var j = 1; j <= 100; j++){
	array[i++] = j;
}
//方法二
var array = [];
for(var i = 0; i <=100; i++){
	array[array.length] = i;
}



求一数组中最大值
function getMax(array){
	//判断传入数组是否为空数组
	array = array || [];	
	//当数组为空时
	if(array.length == 0) return undefined;	
	//假设数组最大值为第一个元素
	var max = array[0];
	//判断最大值
	for(var i = 0; i < array.length; i++){
		max = max < array[i] ? array[i] : max;
	}
	return max;
}



//翻转数组
function reverse(array){
	array = array || [];
	if(array.length == 0) return undefined;
	var newArray = [];
	for(var i = array.length - 1; i >= 0; i--){
		newArray[newArray.length] = array[i];
	}
	return newArray;
}



//数组排序
function sort(array){
	var isSort = true;
	var tmp = 0;
	for(var i = 0; i < array.length - 1; i++){
		for(var j = 0; j < array.length - 1 - i; j++){
			if(array[j] > array[j+1]){
				tmp = array[j];
				array[j] = array[j+1];
				array[j+1] = tmp;
				isSort = false;
			}
		}
		if(isSort) break;
	}
	return array;
}



//面试题
var num = 10;
fun();
function fun(){
	console.log(num);	==输出==> undefined
	var num = 20;
}//理解代码
	//第一步：在全局作用域中预解析
	var num;
	function fun(){
		console.log(num);
		var num = 20;
	}
	//第二步：执行代码
	num = 10;
	//第三步：执行到fun()，调用fun() 函数
	fun();
	//第四步：在局部作用域中预解析
	function fun(){
		var num;
	}
	//第五布：执行代码
	function fun(){
		var num;
		console.log(num);
		num = 20;
	}
	

	
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


	
f();
console.log(c);
console.log(b);
console.log(a);
function f(){
	var a = b = c = 9;
	console.log(a);
	console.log(b);
	console.log(c);
}//浏览器解析过程
	//第一步：全局作用域下的预解析
	function f(){
		var a = b = c = 9;
		console.log(a);
		console.log(b);
		console.log(c);
	}
	//第二步：单行执行到f()；调用f()函数
	f();
	//第三步：在局部作用域中预解析
	function f(){
		var a;
	}
	//第四步：单行执行
	function f(){
		var a;
		a = b = c = 9;	//此处 b 和 c 为全局变量，a为局部变量
		console.log(a);
		console.log(b);
		console.log(c);
	}
	//第五步：跳出函数，单行执行
	console.log(c);	//c为在函数f()中定义的全局变量
	console.log(b);	//b为在函数f()中定义的全局变量
	console.log(a);	//此处a未定义



//判断素数
function isSu(n){
	var flag = true;
	fo(var i = 2; i < Math.sqrt(n); i++){	//Math.sqrt() 表示开方。n=a*b；其中a>n开方，则b<=n开方
		if(n % i === 0){
			flag = false;
			break;
		}
	}
	return flag;
}



//阶乘
function factorial(n){
	var num = 1;
	for(var i = 2; i <= n; i++) 
		num *= i;
	return num;
}
//阶乘求和
function sum(n){
	var sum = 0;
	for(var i = 1; i <= n; i++) 
		sum += factorial(i);
	return sum;
}



//求培波纳契数列Fibonacci中的第n个数
function getF(n){
	n = n || 0;
	if(n <= 0) return -1;	//无意义
	var n1 = 1;
	var n2 = 1;
	var sum = 0;
	for(var i = 3; i <= n; i++){
		sum = n1 + n2;
		n1 = n2;
		n2 = sum;
	}
	return sum;
}


//输入某年某月某日，输出是该年的第多少天
function isLeapYear(year) {	//判断是否为闰年
	if(year % === 0 && year % 100 !== 0 || year % 400 === 0){
		return true;
	}
	return false;
} 
function getDays(year,month,day) {	
	//总共天数
	var days = day;
	//将每个月的天数放置在数组中
	var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];  
	for (var i = 1; i < month - 1; i++){
		days += months[i];
	}
	//如果月份大于2且为闰年，2月份为29天
	if(month > 2 && isLeapYear(year)){
		days++;
	}
	return days;
}



//递归累加
function getSum(n){
	if(n === 1){
		return 1;
	}
	return n + getSum(n - 1);
}



//递归求培波纳契数列Fibonacci中的第n个数
function getF(n){
	if(n <= 0){
		return -1;
	}
	if(n ===1 || n ===2){
		return 1;
	}
	return getF(n -1) + getF(n-2);
}



function get(a, b, fn){
	fn(a,b);
}
var result = get(5, 6, function(a,b){console.log(a+b);} );
//等价于
function get(a, b, fn){
	fn(a,b);
}
var getF = function(a,b){
	console.log(a+b);
}
var result = get(5, 6, getF);


























