# Mock

* 捕获函数的调用、返回值、调用顺序 和 this 指向
* 自由定义返回值
* 改变函数内部实现


### 捕获函数调用


> main.js

```js
export function run(fn) {
  fn()
}
```

> main.test.js

```js
import { run } from './main.js'

test('mock', () => {
  const fn = jest.fn()
  run(fn)
  // toBeCalled 表示 fn 是否被调用过
  expect(fn).toBeCalled()
})


test('mock', () => {
  const fn = jest.fn()
  run(fn)
  fun(fn)
  // fn 被调用了两次
  expect(fn.mock.calls.length).toBe(2)
})
```


### 返回值

> main.js

```js
export function run(fn) {
  fn()
}
```

> main.test.js

```js
import { run } from './main.js'

test('mock', () => {
  const fn = jest.fn(() => {
    return '爱你哟'
  })
  run(fn)
  expect(fn.mock.results[0].value).toBe('爱你哟')
})


test('mock', () => {
  const fn = jest.fn()
  fn.mockReturnValue('爱你哟')
  run(fn)
  run(fn)
  run(fn)
  expect(fn.mock.results[0].value).toBe('爱你哟')
  expect(fn.mock.results[1].value).toBe('爱你哟')
  expect(fn.mock.results[2].value).toBe('爱你哟')
})


test('mock', () => {
  const fn = jest.fn()
  fn.mockReturnValueOnce('爱你哟').mockReturnValueOnce('也爱你')
  run(fn)
  run(fn)
  run(fn)
  expect(fn.mock.results[0].value).toBe('爱你哟')
  expect(fn.mock.results[1].value).toBe('也爱你')
  expect(fn.mock.results[2].value).toBe(undefined)
})
```


### 改变函数的内部实现

> main.js

```js
import axios from 'axios'
export function run() {
  return axios.get('xxx.xxx').then(response => response.data)
}
```

> main.test.js

```js
import axios from 'axios'
import { run } from './main.js'

test('mock', async () => {
  // jest 模拟 axios
  jest.mock('axios')
  axios.get.mockResolvedValue({ data: { code: 0 } })
  await run().then(data => {
    expect(data).toEqual({ code: 0 })
  })
})
```


### 语法补充

```js
test('mock', () => {
  const fn = jest.fn()
  fn.mockReturnValue('爱你哟')
  fn.mockImplementation(() => {
    // do something
    return '爱你哟'
  })
})


test('mock', () => {
  const fn = jest.fn()
  fn.mockReturnValueOnce('爱你哟')
  fn.mockImplementationOnce(() => {
    // do something
    return '爱你哟'
  })
})


test('mock', () => {
  const fn = jest.fn()
  fn.mockReturnThis()
  fn.mockImplementation(() => {
    // do something
    return this
  })
  expect(fn.mock.results[0].value).toBeUndefined()
})
```


### 深入（文件模拟）

> main.js

```js
export function promise() {
  // response.data：(function () { return { code: 0, msg: '爱你哟' } })
  return axios.get('xxx.xxx').then(response => response.data)
}

export function run() {
  return 10
}
```

> __mocks__/main.js

```js
export function promise() {
  return new Promise(function(resolve, reject) {
    resolve('(function () { return { code: 0, msg: '爱你哟' } })')
  })
}
```

> main.test.js

```js
// 模拟 main.js 中的内容（会去 __mocks__/main.js 中去找对应的内容）
jest.mock('./main.js')

// 取消模拟
// jest.unmock('./main.js')

// run 函数会直接去 main.js 中获取，而不会去 __mocks__/main.js 去获取
const { run } = jest.requireActual('./demo.js')

import { promise } from './main.js'

test('mock', () => {
  return promise.then(data => {
    expect(eval(data)).toEqual({ code: 0, msg: '爱你哟' })
  })
})

test('mock', () => {
  expect(run()).toBe(10)
})
```

#### 自动模拟文件

> jest.config.js

```js
module.exports = {
  automock: true,
}
```



### mock timers

> main.js

```js
export function run(callback) {
  setTimeout(function () {
    callback()
    // 在回调用创建新的 timer
    setTimeout(function () {
      callback()
    }, 3000)
  }, 3000)
}
```

> main.test.js

```js
import { run } from './main.js'

test('mock timer', () => {
  const fn = jest.fn()
  run(fn)
  // 模拟 timers（定时器初始化）
  jest.useFakeTimers()
  // 立即执行所有的 timers
  jest.runAllTimers()
  // fn 被运行两次
  expect(fn).toHaveBeenCalledTimes(2)
})

test('mock timer', () => {
  const fn = jest.fn()
  run(fn)
  // 模拟 timers（定时器初始化）
  jest.useFakeTimers()
  // 立即执行当前已被创建的 timer，不会执行还未被创建的 timer
  jest.runOnlyPendingTimers()
  // fn 被执行一次
  expect(fn).toHaveBeenCalledTimes(1)
})

test('mock timer', () => {
  const fn = jest.fn()
  run(fn)
  // 模拟 timers（定时器初始化）
  jest.useFakeTimers()
  // 时间快进 3 秒
  jest.advanceTimersByTime(3000)
  // fn 被执行一次
  expect(fn).toHaveBeenCalledTimes(1)
  // 再次时间快进 3 秒
  jest.advanceTimersByTime(3000)
  // fn 被执行两次
  expect(fn).toHaveBeenCalledTimes(2)
})
```


### mock class

> observer.js

```js
export default class Observer {
  observe() {}
  
  connect() {}
  
  disconnect() {}
}
```

> main.js

```js
import Observer from './observer.js'

export function run(m, n) {
  const observer = new Observer()
  observer.observe(m)
  observer.connect(n)
}
```

> main.test.js

```js
jest.mock('./observer.js')

import Observer from './observer.js'
import { run } from './main.js'

test('mock class', () => {
  run()
  expect(Observer).toHaveBeenCalled()
  expect(Observer.mock.instances[0].observe).toHaveBeenCalled()
  expect(Observer.mock.instances[0].connect).toHaveBeenCalled()
})
```