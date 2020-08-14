```js
.toBe(4)                            // 精确匹配

.toEqual({one: 1})                  // 精确匹配

.toBeNull()                         // null

.toBeUndefined()                    // undefined

.toBeDefined()                      // !undefined

.toBeTruthy()                       // if 为真

.toBeFalsy()                        // if 为假

.toBeGreaterThan(3)

.toBeGreaterThanOrEqual(3.5)

.toBeLessThan(5)

.toBeLessThanOrEqual(4.5)

.toBeCloseTo(0.3)                   // 浮点

.toMatch(/stop/)                    // 正则表达式的字符串

.toContain('beer')                  // 一个数组或可迭代对象是否包含某个特定项

.toThrow()                          // 特定函数抛出一个错误
.toThrow(Error)
.toThrow('you are using the wrong JDK')
.toThrow(/JDK/)
```