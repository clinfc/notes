# 异步测试

### async callback

> main.js

```js
export function callback(fn) {
  axios.get('xxx.xxx').then((response) => {
    fn(response.data)
  })
}
```

> main.test.js

```js
import { callback } from './main.js'

test('async', (done) => {
  callback((data) => {
    expect(data).toEqual({ code: 0 })
    // 手动告知：测试结束
    done()
  })
})
```


### async Promise then

> main.js

```js
export function promise() {
  return axios.get('xxx.xxx')
}
```

> main.test.js

```js
import { promise } from './main.js'

test('async', () => {
  // 返回
  return promise().then((response) => {
    expect(response.data).toEqual({ code: 0 })
  })
})

test('async', () => {
  return expect(promise()).resolves.toMatchObject({
    data: { code: 0 }
  })
})

test('async', async () => {
  await expect(promise()).resolves.toMatchObject({
    data: { code: 0 }
  })
})

test('async', async () => {
  const response = await promise()
  expect(response.data).toEqual({ code: 0 })
})
```


### async Pomise catch（error code）

> main.js

```js
export function promise() {
  return axios.get('xxx.xxx')
}
```

> main.test.js

```js
import { promise } from './main.js'

test('async', () => {
  // 后续必要要执行至少一个 expect 语法且该语法的执行结果必须为真
  expect.assertions(1)
  return promise().catch((e) => {
    expect(e.toString().indexOf('404') > -1).toBe(true)
  })
})

test('async', () => {
  return expect(promise()).rejects.toThrow()
})

test('async', async () => {
  await expect(promise()).rejects.toThrow()
})

test('async', async () => {
  expect.assertions(1)
  try {
    await promise()
  } catch(e) {
    expect(e.toString()).toEqual('Error: Requst failed with status code 404')
  }
})
```