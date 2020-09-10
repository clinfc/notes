/**
 * 链表
 */

/*
  单向链表
  双向链表
  单向循环链表
  双向循环链表
*/

const EMPTY_FN = function () {}

export class ChainTable {

  // 链表数据
  #data = [];
  
  #pointer = 0;
  
  #findIndex(tar) {
    return this.#data.indexOf(tar)
  }
  
  // 头插入
  unshift(data) {
    this.#data.unshift(data)
    return this
  }
  
  // 尾插入
  push(data) {
    this.#data.push(data)
    return this
  }
  
  // 插入指定元素节点之前
  before(tar, data) {
    let i = this.#findIndex(tar)
    switch(i) {
      case -1:
        this.#data.push(data)
        break
      case 0:
        this.#data.unshift(data)
        break
      default:
        this.#data.replace(--i, 0, data)
        break
    }
    return this
  }
  
  // 插入在指定节点之后
  after(tar, data) {
    let i = this.#findIndex(tar)
    if (tar !== -1) {
      this.#data.splice(i, 0, data)
    } else {
      this.#data.push(data)
    }
    return this
  }
  
  // 替换
  replace(tar, data) {
    let i = this.#findIndex(tar)
    if (tar !== -1) {
      this.#data.splice(tar, 1, data)
    }
    return this
  }
  
  // 删除
  delete(tar) {
    let i = this.#findIndex(tar)
    if (i !== -1) {
      this.#data.splice(i, 1)
      return true
    }
    return false
  }
  
  // 遍历链表
  forEach(callback = EMPTY_FN) {
    this.#data.forEach(callback)
  }
}