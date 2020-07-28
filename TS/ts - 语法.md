
### 安装

```
> npm i typescript -g
> npm i ts-node -g
```

### 编译

```
> tsc demo.ts
> node demo.js
```

```
> ts-node demo.ts
```

### 初始化配置文件

```
> tsc --init
```

<br><br>


# 数据类型


* 类型注解（type annotation）
 * 我们来告诉 TS 变量是什么类型

* 类型推断（type inference）
 * TS 会自动尝试去分析变量的类型


>### 基础类型

* number
* string
* symbol
* boolean
* undefined
* null
* void


>### 对象类型

* Object
* Array
* class
* Function
<br><br>


# Object

```ts
const teacher: {
  name: string;
  age: number
}
teacher = { name: '李白', age: 12 }
```  
<br><br>


# Array

```ts
// 数字类型的数组
const array: number[] = [1, 2, 3]

const array: (number | string)[] = [1, 2, 3, 'a']

const array: { name: string }[] = [ { name: '李白' } ]

// 类型别名
type User = { name: string }
const array: User[] = [ { name: '李白' } ]

class User {
  name: string;
  age: number
}
const array: User[] = [
  { name: '李白', age: 12 }
]
```
<br><br>


# tuple

```ts
const array: [string, string, number] = ['李白', '男', 12]

const array: [string, string, number][] = [
  ['李白', '男', 12],
  ['杜甫', '男', 13]
]
```
<br><br>


# class

```ts
class Person {}
const person: Person = new Person()

class Person {
  author: string;
  public author: string;
  private name: string;
  protected age: number;
  readonly sex: string;
  
  constructor(author: string) {
    this.author = author
  }
}
```
<br>

> 初始化赋值：方式一
```ts
class Person {
  author: string;
  constructor(author: string) {
    this.author = author
  }
}
// 继承
class Teacher extends Person {
  name: string;
  constructor(author: string, name: string) {
    super(author)
    this.name = name
  }
}
```
<br>

> 初始化赋值：方式二
```ts
class Person {
  constructor(public author: string) {}
}
// 继承
class Teacher extends Person {
  constructor(public name: string, author: string) {
    super(author)
  }
}
```

<br>

> getter/setter
```ts
class Person {
  
  constructor(private _name: string) {}
  
  get name() {
    return this._name
  }
  
  set name(value: string) {
    this._name = value
  }
}
```
<br>

> abstract
```ts
// 抽象类（只能被继承）
abstract class Geom {
  // 抽象方法
  abstract getArea(): number;
  
  getType() {
    return this.type
  }
}

class Circle extends Geom {
  getArea() {
    return Math.PI * this.radius ** 2
  }
}
```
<br><br>


# Function

```ts
// getTotal 是一个函数，函数的返回值是一个 number
const getTotal: (first: number, second: number) => number
getTotal = (first, second) => {
  return first + second
}

const getTotal = function(first: number, second: number): number {
  return first + second
}

function getTotal(first: number, second: number): number {
  return first + second
}

function log(): void {
  console.log('hello')
}

function error(): never {
  throw new Error('')
  console.log('.....')
}

function circulation(): never {
  while(true) {}
}

// 解构
function getFirst({ first }: { first: number }): number {
  return first
}
function getTotal({ first, second }: { first: number, second: number }): number {
  return first + second
}
```

<br><br>


# type & interface

* type
 * 类型别名
 * 可以用来表示基础类型：type str = string

* interface
 * 只能代表函数或对象，不能代表基础类型
 * 能用接口就用接口，非不得已才用类型别名

* 注意事项
 * 当以字面量对象直接作为实参传递的时候，TS 会对对象进行强校验

<br>

```ts
type Person = {
  name: string
}

// 对象类型的接口
interface Person {
  name: string;             // 必选项属性
  age?: number;             // 非必选项属性
  readonly sex: string;     // 只读属性
  [propName: string]: any;  // key: string，value: any 的属性
  say(): string;            // 返回字符串类型的方法
}

// 函数类型的接口
interface each {
  (word: string): string    // 传入一个 string 类型的参数，返回一个 string 类型的数据
}
const log: each = (word: string) => {
  return word
}
```

<br><br>


# 联合类型 & 类型保护

* 类型保护方案
 * 断言
 * in
 * typeof
 * instanceof

<br>

> 类型保护：案例一

```ts
interface Brid {
  fly: boolean;
  sing: () => {};
}

interface Dog {
  fly: boolean;
  bark: () => {}
}

// 方案一
function trainAnimal(animal: Brid | Dog) {
  if (animal.fly) {
    // 断言
    (animal as Brid).sing();
  } else {
    (animal as Dog).bark()
  }
}

// 方案二
function trainAnimal(animal: Brid | Dog) {
  if ('sing' in animal) {
    animal.sing()
  } else {
    animal.bark()
  }
}
```

<br>

> 类型保护：案例二

```ts
function merge(first: string | number, second: string | number) {
  if (typeof first === 'string' || typeof second === 'string') {
    return `${first}${second}`
  }
  return first + second
}
```

<br>

> 类型保护：案例三

```ts
class Obj {
  count: number;
}

function merge(first: object | Obj, second: object | Obj) {
  if (first instanceof Obj && second instanceof Obj) {
    return first.count + second.count
  }
  return 0
}
```

<br><br>


# 枚举类型（enum）

```ts
enum status {       // 默认从“0”开始
  ZERO,
  ONE,
  TWO
}

enum status {       // 从指定数“1”开始
  ONE = 1,
  TWO,
  THREE
}
```

<br><br>


# 泛型（generic）

<br>

> 函数泛型

```ts
function join<T>(first: T, second: T) {
  return `${first}${second}`
}
join<string>('1', '2')
join<number>(1, 2)


function join<T>(params: Array<T>) {
  return params.join('')
}
join<string>(['1', '2'])
join<number>([1, 2])

function join<T, P>(first: T, second: P) {
  return `${first}${second}`
}
join<string, number>('1', 2)
join('1', 2)
```
<br>

> 类中泛型

```ts
// 单一类型
class Demo<T> {
  constructor(private data: T[]) {}
}
let demo = new Demo<string>(['1', '2'])

// 多类型
class Demo<T extends string | number> {
  constructor(private data: T[]) {}
}

// 对象类型
interface Item {
  name: string;
}
class Demo<T extends Item> {
  constructor(private data: T[]) {}
  
  getName(index: number): string {
    return this.data[index].name
  }
}
let demo = new Demo<string>([
  { name: '李白' },
  { name: '杜甫' }
])
```
<br>

> keyof

```ts
interface Person {
  name: string;
  age: number;
  sex: string;
}

class Teacher {
  constructor(public data: Person) {}
  
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.data[key]
  }
}
```
<br><br>


# 命名空间（namespace）

<br>

> 基础用法

```ts
// 定义
namespace Demo {
  
  class Demo1 {}
  
  class Demo2 {}
  
  class Demo3 {}
  
  // 只有导出的才会被访问到
  export class Main {}
  
  // 子命名空间
  export namespace Page {
    
    export class Main {}
  }
}

// 使用
new Demo.Main()
```
<br>

> 拆分引用
<br>

* demo.ts

```ts
namespace Demo {
  
  export class Demo1 {}
  
  export class Demo2 {}
  
  export class Demo3 {}
}
```
<br>

* page.ts

第一行代码的作用是声明引用关系
```ts
///<reference path="./demp.ts" />

namespace Page {
  export class Main {
    constructor() {
      new Demo.Demo1();
      new Demo.Demo2();
      new Demo.Demo3();
    }
  }
}
```