/**
 * 利用栈实现撤销重做
 */

const MAX_SIZE = 15

// 一个限制最大长度的栈，当超出最大长度时，最先添加的将被删除
export class Stack {
  // 栈中允许缓存的最大数据条数
  #max = MAX_SIZE;
  
  // 数据存储
  #data = [];
  
  constructor(maxSize) {
    let size = parseInt(maxSize)
    if (!isNaN(size)) {
      this.#max = size
    }
  }
  
  // 获取当前栈内的数据总条数
  get size() {
    return this.#data.length
  }
  
  // 入栈
  push(data) {
    this.#data.unshift(data)
    if (this.#max > 0 && this.size > this.#max) {
      this.#data.length = this.#max
    }
    return this
  }
  
  // 出栈
  pop() {
    return this.#data.shift()
  }
  
  // 清空栈内数据
  clear() {
    this.#data.length = 0
    return this
  }
}

export class Revok {
  // 用于正常缓存的栈实例
  #cache;
  
  // 用于缓存被撤销数据的栈实例
  #revoked;
  
  // 上一次操作是否为撤销或重做
  #isRe = false;
  
  constructor(maxSize) {
    this.#cache = new Stack(maxSize)
    this.#revoked = new Stack(maxSize)
  }
  
  // 添加数据
  add(data) {
    if (this.#isRe) {
      this.#revoked.clear()
      this.#isRe = false
    }
    
    this.#cache.push(data)
    
    return this
  }
  
  // 撤销
  revoke() {
    this.#isRe = true
    
    if (this.#cache.size) {
      let data = this.#cache.pop()
      this.#revoked.push(data)
      return true
    }
    return false
  }
  
  // 重做
  redo() {
    if (this.#revoked.size) {
      let data = this.#revoked.pop()
      this.#cache.push(data)
      return true
    }
    return false
  }
  
  // 清除缓存
  clear() {
    this.#cache.clear()
    this.#revoked.clear()
    return this
  }
}