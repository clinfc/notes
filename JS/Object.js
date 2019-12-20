
// 单继承
function FaFun() {}
function MyFun() {
    FaFun.call(this);
}
MyFun.prototype = Object.create(FaFun.prototype);
MyFun.prototype.constructor = MyFun;

// 继承，设置原型
function MyFun() {}
MyFun.prototype = Object.create(FaFun.prototype, Object.getOwnPropertyDescriptors({
	get name() {},
	set name() {}
}))


// 多继承
function MyFun() {
    FaFun1.call(this);
    FaFun2.clll(this);
}
MyFun.prototype = Object.create(FaFun1.prototype);
Object.assign(MyFun.prototype, FaFun2.prototype);
MyFun.prototype.constructor = MyFun;

// 重写时调用父类方法
// 类型一
FaFun.prototype.init = function() {}
MyFun.prototype.init = function() {
    FaFun.prototype.init.apply(this, arguments);
}
// 类型二
function FaFun(name) {
    this.name = name;
}
function MyFun(name) {
    FaFun.call(this, name);
}
MyFun.prototype = Object.create(FaFun.prototype);
MyFun.prototype.constructor = MyFun;

// 备注：Object.assign实现的是浅拷贝（可能会造成数据的丢失）

// 兼容处理 Object.assign
if (typeof Object.assign != 'function') {
  // 配置项： writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      'use strict';

      if (target == null) {
        // 如果未定义或为空，则为TypeError
        throw new TypeError('无法将未定义或null转换为对象');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // 如果未定义或为空，则跳过
          for (var nextKey in nextSource) {
            // 当hasOwnProperty被隐藏时，避免bug
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

// 获取对象原型
MyObject.__proto__
Object.getPrototypeOf(MyObject)

// 继承时定义属性和属性的标签
Object.create(Object.prototype, {
    sex: {
        value: '男',
        writable: true,     // 可写的，默认false
        enumerable: true,   // 可枚举的，默认false
        configurable: true  // 可配置的，默认false
    }
})

// 单独定义自身属性的标签
Object.defineProperty(MyObject, 'name', {
    writable: true,         // 可写的，默认false
    enumerable: true,       // 可枚举的，默认false
    configurable: true      // 可配置的，默认false
})

// 获取属性的标签
Object.getOwnPropertyDescriptor(MyObject, 'name')

// 判断对象属性是否可被枚举
MyObject.prototypeIsEnumerable('name')

// 对象属性可扩展性：extensible标签
Object.isExtensible(MyObject)       // 查看
Object.preventExtensions(MyObject)  // 设置可扩展为false

// 配置所有属性的configurable标签为false（在Object.preventExtensions基础上实现对象的不可扩展不可配置）
Object.seal(MyObject)

// 判断对象是否被 Object.seal 过
Object.isSealed(MyObject)

// 冻结（不可扩展、不可配置、不可写、不可删）
Object.freeze(MyObject)

// 判断对象是否被冻结
Object.isFrozen(MyObject)

// 重写原型链上的方法属性
function FaFun() {}
FaFun.prototype.log = function() {}
var fn = new FaFun()
fn.constructor.prototype.log = function(){}

// 静态方法（备注：静态方法与实例对象绝缘，无法访问实例中的属性）
FaFun.init = function() {}

// 静态方法的调用（即使在实例化对象上，也不可以通过 this.init() 进行访问）
FaFun.init()