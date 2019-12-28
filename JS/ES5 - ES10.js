
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

		ES7：

			array.includes(val)					返回 true 或 false

 */

 /*
	函数参数：

		var array = [1, 2, 3]

		ES5：

			function fn(x, y, z) {
				Array.prototype.forEach.call(arguments, function (item) {})
			}

			fn.applay(this, array)				将数组中的每一个元素作为函数参数

		ES6：

			function fn(x, y, z = 2) {
				fn.length						获取没有设置默认值的参数的个数
			}

			function fn(...args) {				args 为 arguments 替换方案（rest）
				args.forEach(function (item) {})
			}

			fn(...array)						将数组中的每一个元素作为函数参数（spread）

	ES6 箭头函数：

		零个参数：

			var fn = () => {}

		一个参数：

			var fn = (name) => {}

			var fn = name => {}

		多个参数：

			var fn = (name, age) => {}

		返回表达式：

			var fn = (x, y, z) => {
				return x + y + z
			}

			var fn = (x, y, z) => {
				x + y + z
			}

			var fn = (x, y, z) => x + y + z

		返回字面量对象：

			var fn = (x, y, z) => {
				return {
					x: x,
					y: y,
					z: z
				}
			}

			var fn = (x, y, z) => ({
				x: x,
				y: y,
				z: z
			})

		this指向：

			在书写代码时this的指向，而非执行时this的指向
		
 */

 /*
	Object：

		ES5：

			var x = 1, y = 2, z = 3;

			var obj = {
				x: x,				变量名作为键名
				y: y,
				eat: function() {}	声明方法（此处为常规函数，ES5中的Object中不允许异步函数）
			}
			obj[z] = 5;				变量值作为键名
			obj[x+y] = 6;			表达式结果作为键名

		ES6：

			var x = 1, y = 2, z = 3;

			var obj = {
				x,					变量名作为键名（简写）
				y,
				eat () {},			声明方法（此处为常规函数）
				* eat () {},		声明方法（此处为异步函数）
				[z]: 5,				变量值作为键名
				[z+y]: 6			表达式结果作为键名
			}

	Set：存储任意类型的值

		优点：数据唯一性（过滤掉已存在的数据）

		ES6：

			var set = new Set()

			var set = new Set([1, 2, 3])		参数为可遍历的对象

			set.add(4).add(5)					增

			set.delete(1)						删

			set.clear()							删

			set.has(2)							查

			set.keys()

			set.values()

			set.entries()

			set.forEach()

			set.size							数据条数


	WeakSet：存储对象类型的值


	Map：任意类型的键（key）

		var map = new Map([['name', '李白'], ['age', '123']])

		map.forEach((value, key) => {})

		for (let [value, key] of map) {}


	WeakMap：对象类型的键（key）
 */

 /*
	RegExp：

		ES6：

			y：

			u：匹配大于两个字节的字符

			Unicode码点：/\u{20BB7}/u
 */

 /*
	模板字面量

		生成字符串：我叫 李白，5年后我就 10 岁了

		ES5：

			var name = '李白'
			var age = 5
			var str = '我叫 ' + name + '，5年后我就 ' + (age + 5) + ' 岁了'

		ES6：

			let name = '李白'
			let age = 5
			let str = `我叫 ${name}，5年后我就 ${$age + 5} 岁了`

			function info(templates, name, age) {
				return `${templates[0]}${name}${templates[1]}${age + 5}${templates[2]}`
			}
			let str = info`我叫 ${'李白'}，5年后我就 ${5} 岁了`
 */

 /*
	解构赋值

		ES6：

			let array = [123, 456, 789]
			let [first, next, last] = array
			let [first, , last] = array

			let info = {name: '李白', age: 12};
			[info.name, info.age] = ['杜甫', 32]

			let info = {name: '李白', age: 12};
			for (let [key, value] of Object.entries(info)) {}

			let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
			let [one, two, ...other] = array

			let info = {name: '李白', age: 12, sex: '男'};
			let {name, age, sex} = info					简写，变量名必须与属性名一致
			let {name: userName, age, sex} = info		变量名与属性名不一致
			let (name = '杜甫', age, sex) = info			默认值

			let info = {name: '李白', age: 12, sex: '男'};
			let {name, ...other} = info

			let infos = {
				info: {name: '李白', age: 12, sex: '男'},
				nick: ['诗仙太白', '湿人'],
				other: true
			};
			let {info: {name, age, sex}, nick: [one, two], other} = infos
 */

 /*
	异步操作

		ES6：

			Promise：

				new Promise((resolve, reject) => {})				

				Promise.resolve('error')							静态方法。返回 Promise 实例

				Promise.reject(new Error(''))						静态方法。返回 Promise 实例

				Promise.all([promise1, promise2])					静态方法。返回 Promise 实例（相当于“与”，当全部异步操作完成才继续执行）

				Promise.race([promise1, promise2])					静态方法。返回 Promise 实例（相当于“或”，当其中一个异步操作成功则继续执行）

				promise.then(onFulfilled, onRejected)				实例方法。如果 onFulfilled、onRejected 为非函数，then返回的是空 Promise 对象

				promise.catch(err => {})							实例方法。统一错误处理（链式操作中处理多个 then 的错误）。catch 只能捕获 reject 触发的错误，无法捕获 throw

				promise.finally(() => {})							ES9：类似于 try...catch...finally...

				
			
			串行案例：按顺序加载 1.js、2.js、3.js

				function renderJs(src) {
					return new Promise((resolve, reject) => {
						let script = dcoument.createElement('script')
						script.src = src
						script.onload = () => resolve(src)					fulfilled
						script.oerror = (err) => reject(err)				rejected
					})
				}

				renderJs('1.js')
				.then(() => {
					return renderJs('2.js')							如果不加 return 返回加载 2.js 的 Promise 实例对象，返回的则是一个空 Promise 对象
				}, (err) => {
					
				}).then(() => {
					return renderJs('3.js')
				}, (err) => {
					
				})

				renderJs('1.js')
				.then(() => {
					return renderJs('2.js')
				}).then(() => {
					return renderJs('3.js')
				}).catch(err => {
	
				})


		ES8：（async 和 await 为 Promise 的语法糖）

			async function asyncTest() {							定义
				return '渣渣辉'										自定义返回（返回的非 Promise 对象时，自动转换为 Promise.resolve('渣渣辉') ）
			}
			let at = asyncTest()									返回 Promise 对象
			at.then(value => {										接收自定义返回（value 的值为 “渣渣辉”）
				
			})


			async function asyncTest() {
				let promise = new Promise((resolve, reject) => {})

				await promise 										在异步函数中执行异步函数并确保执行顺序（await 将自动处理为 Promise 对象）

				console.log('')
			}


		ES9：（for await of）遍历异步操作集合

			function gen(time) {
				return new Promise((resolve, reject) => {
					setTimeout(function () {
						resolve(time)
					}, time)
				})
			}
			async function test () {
				let array = [gen(100), gen(200), gen(300)]

				for await (let item of array) {						for await of
					console.log(Date.now(), item)
				}
			}
			test()


			let object = {
				count: 0,
				gen (time) {
					return new Promise((resolve, reject) => {
						setTimeout(function () {
							resolve({dome: false, value: time})
						}, time)
					})
				},
				[Symbol.asyncIterator] () {
					let self = this
					return {
						next () {
							self.count++
							if (self.count < 4) {
								return self.gen(Math.random() * 1000)
							} else {
								return Promise.resolve({
									done: true,
									value: ''
								})
							}
						}
					}
				}
			}
			async function test () {
				for await (let item of object) {						for await of
					console.log(Date.now(), item)
				}
			}
			test()
 */

 /*
	反射机制

		ES6：

			price > 100 ? Math.floor.apply(null, [price]) : Math.ceil.apply(null, [price])
			Reflect.apply(price > 100 ? Math.floor : Math.ceil, null, [price])

			new Date()
			Reflect.construct(Date, [])			实例化对象

			Object.defineProperty(fn, 'name', {value: ''})
			Reflect.defineProperty(fn, 'name', {value: ''})

			Reflect.getPrototypeOf({})						获取原型

			Reflect.setPrototypeOf({}, String.prototype)	设置原型

			Reflect.get([1, 2, 3, 4], 0)		读数据

			Reflect.set([1, 2, 3], 3, 'x')		写数据

			Reflect.has({x: 1, y: 2}, 'x')		判断属性

			Object.freeze(object)
			Reflect.preventExtensions(object)	冻结对象

			Reflect.isExtensible(object)		判断对象是否处于冻结（不可扩展）状态

			Reflect.ownKeys(object)				获取对象自有属性
 */

 /*
	代理（中介）

		ES6：

			let proxy = new Proxy(object, {})					仅含代理数据，不含撤销操作的方法
			let proxy = Proxy.revocable(object, {})				含代理数据，含撤销操作的方法
			proxy.revoke()										撤销代理

		案例：

			let object = {name: '李白', age: 9, sex: '男'}
			let proxy = new Proxy(object, {
				get (target, key) {
					return key == 'age' ? target[key]++ : target[key]
				},
				set (target, key, value) {
					return false;
				}
			})

			class Custom		生成唯一只读属性
			{
				constructor () {
					this.proxy = new Proxy({
						id: Math.random().toString(36).slice(-8)
					})
				}
				get id() {
					return this.proxy.id
				}
			}
 */

 /*
	暂停遍历（generator）：

		ES6：

			function * loop() {						functio与函数名之间加 *
				for (let i = 0; i < 10; i++) {
					yield console.log(i)			操作前面加 yield 关键字
				}
			}
			let l = loop()							此时不会输出
			l.next()								此时输出“0”。调用一次“next”，输出一次。类似于“下一步”
			l.next()								此时输出“1”
			l.return()								终止循环
			l.throw(new Error('error'))				抛入异常（内部通过 try...catch... 捕获异常）

			l.next(10)								设置值
			l.return(10)							设置值

	数据结构“可遍历”化（自定义遍历）（iterator）：

		let obj = {
			a: {
				a1: [],
				a2: [],
				a3: []
			},
			b: []
		}

		ES5：

			let r = []
			for (let [, v] of Object.entrices(obj.a)) {
				r = r.concat(v)
			}

		ES6：

			自定义遍历器：一：显示迭代器协议

				obj[Symbol.iterator] = function () {
					let all = this.a
					let keys = Reflect.ownKeys(all)
					let vals = []
					return {							输出（返回一个对象）
						next () {						输出对象中必须要有【next】方法
							if (!vals.length) {
								if (keys.length) {
									vals = all[key[0]]
									keys.shift()
								}
							}
							return {					【next】方法返回固定的对象结构
								done: !vals.length,
								value: vals.shift()
							}
						}
					}
				}
				let a = []
				for (let v of obj) {
					a.push(v.value)
				}
				console.log(a)							包含所有啊a下的 a1,a2,a3 值的集合

			自定义遍历器：二：隐式迭代器协议

				obj[Symbol.iterator] = function * () {
					let all = this.a
					let keys = Reflect.ownKeys(all)
					let vals = []
					while (true) {
						if (!vals.length) {
							if (keys.length) {
								vals = all[keys[0]]
								keys.shift()
								yield vals.shift()
							} else {
								return false
							}
						} else {
							yield vals.shift()
						}
					}
				}
				let a = []
				for (let v of obj) {
					a.push(v.value)
				}
				console.log(a)
 */

 /*
	模块化开发：

		ES5：require.js

		ES6：

			导出导入：一

				export let name = '李白' 

				import {name} from './***'					此处写导入文件的路径，但是需要省略掉 .js 后缀


			导出导入：二：多变量导出

				var name = '李白'
				var age = 123
				var sex = '男'
				export {
					name,
					age,
					sex
				}

				import {name, age, sex} from './***'


			导出导入：三：定义默认导出项

				var name = '李白'
				var age = 123
				var sex = '男'
				export default name 					默认导出项（唯一的，只允许有一个）
				export {
					age,
					sex
				}

				import name, {age, sex} from './***'
				import name from './***'				只导入默认导出项（默认导出项在导入时可以自定义名字）


			导出导入：四：自定义导入名

				var name = '李白'
				var age = 123
				var sex = '男'
				export default name 					默认导出项（唯一的，只允许有一个）
				export {
					age,
					sex
				}

				import name, {age as ages} from './***'	自定义导入名


			导出导入：五：导出对象

				export default {			写法一
					name: '李白',
					age: 123
				}

				var data = {}				写法二
				var desc = {}
				export default {
					data,
					desc
				}

				import object from './***'


			导出导入：六：导出类

				class Test {}				写法一
				export default Test

				export class Test {}		写法二

				export default class {}		写法三

				import Test from './***'


			导出导入：七：将所有的导入写入一个对象

				import * as mo from './***'
 */

 /*
	ES8：

		Math.pow(2, 5) === 2 ** 5

		Object.keys()

		Object.values()

		'1'.padStart(3, '0')				前补白（ 此处得到 001 ）

		'1'.padEnd(3, '0')					后补白（ 此处得到 100 ）
 */

 /*
	ES9：

		spread：（深拷贝）

			let input = {
				a: 1, 
				b: 2
			}
			let output = {
				...input,					将 input 打散并填充到 output 中
				c: 3
			}

		rest：

			let input = {
				a: 1, 
				b: 2,
				c: 3,
				d: 4,
				e: 5
			}
			let {a, b, ...rest} = input

		正则命名分组：

			let mat = '2019-12-28'.match(/(?<year>\d{4})-(?<month>\d{2}(?<day>\d{2}/)

			let year = mat.groups.year
			let month = mat.groups.month
			let day = mat.groups.day

		先行断言：（一直支持）（先遇到一个条件，在去判断是否满足后面的条件）

			'hello word'.match(/hello(?=\sword)/)			“hello”的后面为“ word”

		后行断言：

			'hello word'.match(/(?<=hello\s)word/)			“word”前面为“hello ”

			'hello word'.match(/(?<!hello\s)word/)			“word”前面不为“hello ”
 */