# matchers



### 普通匹配器

```js
test('精确匹配（Object.is || ===）', () => {
  expect(10).toBe(10)
})


test('内容匹配', () => {
  expect({ like: true }).toEqual({ like: true })
})
```



### Truthiness

```js
test('null', () => {
  expect(null).toBeNull()
})


test('undefined', () => {
  expect(undefined).toBeUndefined()
})


test('!undefined', () => {
  expect(null).toBeDefined()
})


test('为真', () => {
  expect(1).toBeTruthy()
})


test('为假', () => {
  expect(0).toBeFalsy()
})


test('not', () => {
  expect(true).toBeTruthy()
  expect(true).not.toBeFalsy()
})
```



### Number 匹配器

```js
test('等于（int）', () => {
  // toBe和toEqual对数字来说是等价的
  expect(10).toBe(10)
  expect(10).toEqual(10)
})


test('等于（float）', () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3)
})


test('大于', () => {
  expect(10).toBeGreaterThan(9)
})


test('大于等于', () => {
  expect(10).toBeGreaterThanOrEqual(10)
})


test('小于', () => {
  expect(9).toBeLessThan(10)
})


test('小于等于', () => {
  expect(9).toBeLessThanOrEqual(9)
})
```



### String 匹配器

```js
test('包含', () => {
  expect('爱你哟').toMatch('爱')
  expect('爱你哟').toMatch(/爱/)
})
```



### Array、Set 匹配器

```js
test('包含', () => {
  const arr = ['爱', '你', '哟']
  const set = new Set(arr)
  expect(arr).toContain('爱')
  expect(set).toContain('爱')
})
```



### Error 匹配器

```js
function error() {
  throw new Error('将会抛出一个异常')
}

test('异常', () => {
  expect(error).toThrow()
  // 匹配抛出的异常内容
  expect(error).toThrow('将会抛出一个异常')
  // 匹配抛出的异常内容（正则匹配）
  expect(error).toThrow(/将会抛出一个异常/)
})
```



