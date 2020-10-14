# snapshot 快照


### 普通快照

> main.js

```js
export function data() {
  return {
    code: 0,
    msg: ''
  }
}
```

> main.test.js

```js
import { data } from './main.js'

test('snapshot', () => {
  expect(data()).toMatchSnapshot()
})
```


### 特殊快照

> main.js

```js
export function data() {
  return {
    code: 0,
    msg: ''，
    time: new Date(),
    timestamp: Date.now()
  }
}
```

> main.test.js

```js
import { data } from './main.js'

test('snapshot', () => {
  expect(data()).toMatchSnapshot({
    time: expect.any(Date),
    timestamp: expect.any(Number)
  })
})
```


### 行内快照

```
npm install prettier
```

> main.js

```js
export function data() {
  return {
    code: 0,
    msg: ''，
    time: new Date()
  }
}
```

> main.test.js

```js
import { data } from './main.js'

test('snapshot', () => {
  expect(data()).toMatchInlineSnapshot({
    time: expect.any(Date)
  })
})
```