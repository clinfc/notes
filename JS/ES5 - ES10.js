
/*
	作用域：
		全局作用域、函数作用域、块作用域（let）、动态作用域(this)

	var：
		1、var 定义的全局变量可以通过 window. 进行访问
		2、var 定义的变量允许重复定义
		3、var 定义的变量会进行变量提升
		4、var 定义的变量会进行前置处理（在定义之前进行调用，其值为 undefined）
	let：
		1、let 定义的全局变量不可以通过 window. 进行访问
		2、let 定义的变量不允许重复定义
		3、let 定义的变量不会进行变量提升
		4、let 定义的变量具有块级作用域
		4、let 定义的变量不会进行前置处理（在定义之前进行调用，会报错）
	const：
		1、支持 let 的全部特性
		2、const 定义的是常量（不允许重新赋值、不允许先声明后赋值）
 */

/*
	数组遍历

		ES5:

			for：
				1、支持 break 和 continue

			forEach：
				1、将遍历每一个元素
				2、不支持 break 和 continue

			every：
				1、是否继续遍历，取决于函数的返回值（true：继续，false：终止）

			for in：
				1、for in 是为 object 设计的，但可以遍历数组（遍历数组有瑕疵：数字字符串以外的索引也将被遍历）
				2、for in 支持 break 和 continue

		ES6：

			 for of：

	伪数组转数组：

		ES5：

			Array.prototype.slice.call(NodeList)

		ES6：

			Array.from(NodeList)

	生成指定长度和内容的数组：

		ES6：

			Array.from({ length: 5 }, function() { return 1 })

			Array.of(1, 1, 1, 1, 1)

			Array(5).fill(1)

	数组元素查找：

		ES5：

			array.filter(function(item) {		返回所有满足条件的值
				return item
			})

		ES6:

			array.find(function(item) {			返回第一个满足条件的值
				return item === 6
			})

			array.findIndex(function(item) {	返回第一个满足条件的索引
				return 
			})
 */