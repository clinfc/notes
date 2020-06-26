# this
> 全局：this 指代当前页面的 window
> 函数：this 根据函数运行时的对象而定
> 通过 apply 和 call 来改变 this 的指向

# prototype
> 原型链

# constructor
> constructor 始终指向创建当前对象的构造函数

```javascript
let arr = []
let con = arr.constructor === Array	// true
let pro = Array.prototype.constructor === Array // true
let cop = arr.constructor.prototype.constructor === Array // true
```