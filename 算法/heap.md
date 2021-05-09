
---

<details>
<summary>堆</summary>

```js
{
    value: 1,
    left: {
        value: 3,
        left: {
            value: 5
        },
        right: {
            value: 9
        }
    },
    right: {
        value: 6,
        left: {
            value: 8
        }
    }
}
```

* 堆是一种特殊的**完全二叉树**
* 所有的及诶单都大于等于最大堆或小于等于最小堆它的子节点

</details>

---

<details>
<summary>JS 中的堆</summary>

```js
[1, 3, 6, 5, 9, 8]      // 用数组表示堆
```

* JS 中的堆常用数组表示
* 左侧子节点的位置是：2 * index + 1
* 右侧子节点的位置是：2 * index + 2
* 父节点的位置是：(index - 1) / 2 后取商

</details>


---

<details>
<summary>堆的应用</summary>

* 堆能高效、快速地找出最大值和最小值
* 找出第 K 个最大/最小元素
</details>


---

<details>
<summary>最小堆</summary>

* 插入
    + 将值插入堆的底部，即数组的尾部
    + 然后上移（将这个值和它的父节点进行交换，直到节点小于等于插入的值）
    + 时间复杂度：O(logn)
* 删除堆顶
    + 用数组尾部元素替换堆顶（直接删除堆顶会破坏堆结构）
    + 然后下移（将新堆顶和它的子节点进行交换，知道子节点大于等于这个新堆顶）
    + 时间复杂度：O(logn)
* 获取堆顶
* 获取堆长

```js
/**
 * 获取父节点的位置
 * @param {Int} i
 */
function parantIndex(i) {
    // return Math.floor((i - 1) / 2 )
    return (i - 1) >> 1
}

/**
 * 获取左子节点的位置
 * @param {Int} i
 */
function leftIndex(i) {
    return 2 * i + 1
}

/**
 * 获取右子节点的位置
 * @param {Int} i
 */
function rightIndex(i) {
    return 2 * i + 2
}

class MinHeap {
    constructor() {
        this.heap = []
    }
    
    /**
     * 节点换位
     * @param {Int} m
     * @param {Int} n
     */
    swap(m, n) {
        const t = this.heap[m]
        this.heap[m] = this.heap[n]
        this.heap[n] = t
    }
    
    /**
     * 节点上移
     * @param {Int} i
     */
    shiftUp(i) {
        // 堆顶
        if (i === 0) return
        
        const p = parantIndex(i)
        if (this.heap[p] > this.heap[i]) {
            this.swap(i, p)
            this.shiftUp(p)
        }
    }
    
    /**
     * 节点下移
     * @param {Int} i
     */
    shiftDown(i) {
        const l = leftIndex(i)
        const r = rightIndex(i)
        if (this.heap[l] < this.heap[i]) {
            this.swap(i, l)
            this.shiftDown(l)
        }
        if (this.heap[r] < this.heap[i]) {
            this.swap(i, r)
            this.shiftDown(r)
        }
    }
    
    /**
     * 插入
     * @param {Number} value
     */
    insert(value) {
        this.heap.push(value)
        this.shiftUp(this.heap.length - 1)
    }
    
    /**
     * 删除堆顶
     */
    shift() {
        this.heap[0] = this.heap.pop()
        this.shiftDown(0)
    }
    
    /**
     * 获取堆顶
     */
    roof() {
        return this.heap[0]
    }
    
    /**
     * 获取堆的大小
     */
    size() {
        return this.heap.length
    }
}
```
</details>


<details>
<summary>第 K 个最大元素</summary>

* 构建一个最小堆，并将元素依次插入堆中
* 当堆的容量超过 K，就删除堆顶
* 插入结束后，堆顶就是第 K 个最大元素

```js
const k = 4
const data = []

const heap = new MinHeap()
data.forEach(num => {
    heap.insert(num)
    if (heap.size() > k) {
        heap.shift()
    }
})
```
</details>


<details>
<summary>第 K 个最小元素</summary>

* 构建一个最大堆，并将元素依次插入堆中
* 当堆的容量超过 K，就删除堆顶
* 插入结束后，堆顶就是第 K 个最小元素

</details>