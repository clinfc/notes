# decorator

* 装饰器本身是一个函数
* 装饰器通过 @ 符来使用
* 装饰器执行顺序
 * 方法 > 类
<br><br>

## 类装饰器

* 装饰在类定义好的时候进行调用一次，而不是实例化的时候调用
* 多个装饰器按照从右到左、从下到上的顺序执行
<br>

> 语法
```ts
function testDecorator(constructor: any) {}

@testDecorator
class Test {}
```
<br>

> 非标准用法
```ts
function testDecorator(flag: boolean) {
  if (flag) {
    return function(constructor: any) {
      constructor.prototype.getName = () => {
        console.log('...')
      }
    }
  } else {
    return function(constructor: any) {}
  }
}

@testDecorator(true)
class Test {}
```
<br>

> 标准用法
```ts
function testDecorator() {
  return function<T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      getName() {
        return this.name
      }
    }
  }
}

const Test = testDecorator()(class {
  name: string;
  constructor(name: string) {
    this.name = name
  }
})

let test = new Test('李白')
test.getName()
```
<br><br>


## 方法装饰器

* 普通方法：
 * target 对应的是类的 prototype
 * method 对应的是方法名

* 静态方法：
 * target 对应的是类的构造函数
 * method 对应的是方法名

```ts
function fnDecorator(target: any, method: string, descriptor: PropertyDescriptor) {
  // 禁止重写该方法
  descriptor.writable = false
  descriptor.value = function() {
    return '李白'
  }
}

class Test {
  constructor(private name: string) {}
  
  @fnDecorator
  getName() {
    return this.name
  }
  
  @fnDecorator
  static getAge() {
    
  }
}
```
<br><br>


## 访问器装饰器

* getter 和 setter 不能用同名的装饰器

```ts
function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {}

class Test {
  constructor(private _name: string) {}
  
  get name() {
    return this._name
  }
  
  @visitDecorator
  set name(value: string) {
    this._name = value
  }
}
```
<br><br>


## 属性装饰器

```ts
function attribueDecorator(target: any, key: string): any {
  // 修改的是原型链上的属性
  target[key] = '杜甫'
  
  // 修改属性的 descriptor
  const descriptor: PropertyDescriptor = {
    writable: false
  }
  return descriptor
}

class Test {
  
  @attributeDecorator
  name = '李白';
}
```
<br><br>


## 参数装饰器

```ts
// 原型、方法名、参数位置索引
function paramDecorator(target: any, method: string, paramIndex: number) {
  
}

class Test {
  
  join(@paramDecorator name: string, @paramDecorator age: number) {
    return { name,  age }
  }
}
```
<br><br>


## 案例：异常捕获

```ts
const info: any = undefined

function error(message: string) {
  return function(target: any, key: string, descriptor: PorpertyDescriptor) {
  const fn = descriptor.value
    descriptor.value = function() {
      try {
        fn()
      } catch(e) {
        console.log(message)
      }
    }
  }
}

class Test {
  
  @error('info.name 不存在')
  getName() {
    return info.name
  }
  
  @error('info.age 不存在')
  getAge() {
    return info.age
  }
}
```