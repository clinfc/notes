# 钩子函数

> main.test.js

```js
// 所有用例测试开始之前
beforeAll(() => {})


// 每个用例测试开始之前
beforeEach(() => {})


// 所有用例测试结束之后
afterAll(() => {})


// 每个用例测试结束之后
afterEach(() => {})


// 作用域（分组）
// 不要把准备型的代码放在 describe 中，应该放在钩子函数中
describe('描述', () => {
  beforeAll(() => {})
  beforeEach(() => {})
  
  afterAll(() => {})
  afterEach(() => {})
  
  test('xxx', () => {})
  test('xxx', () => {})
})


// 单个用例测试（自动忽略其它用例）
test.only('xxx', () => {})
```