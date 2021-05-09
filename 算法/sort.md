<details>
<summary>归并排序</summary>

* 分：把数组劈成两半，再递归对子数组进行“分”操作，直到分成一个个单独的数组
* 合：把两个数合并为有序数组，再对有序数组进行合并，直到把全部子数组合并为一个完整的数组

```js
function merage(data) {
    if (data.length < 2) {
        return data
    }
    
    const middle = Math.floor(data.length / 2)
    const left = merage(data.slice(0, middle))
    const right = merage(data.slice(middle))
    
    const temp = []
    while(left.length && right.length) {
        temp.push(left[0] < right[0] ? left.shift() : right.shift())
    }
    
    return temp.concat(left, right)
}
```
</details>




<details>
<summary>希尔排序</summary>

* 通过动态定义的 gap 来排序，先排序距离较远的元素，再逐渐递进

```js
function xier(data) {
    let gap = Math.floor(data.length / 2)
    
    while(gap > 0) {
        for(let i = gap; i < data.length; i++) {
            const refer = data[i]
            
            // 本次需要进行对比的元素索引
            let c = i - gap
            
            while(data[c] > refer) {
                data[c + gap] = data[c]
                c -= gap
            }
            data[c + gap] = refer
        }
        gap = Math.floor(gap / 2)
    }
    
    return data
}
```
</details>




<details>
<summary>快速排序</summary>

* 分区：从数组中任意选择一个“基准”，所有比这个基准小的元素放在基准前面，比基准大的元素放在基准后面
* 递归：递归地对基准前后的子数组进行分区

```js
function quick(data) {
    if (data.length < 2) {
        return data
    }
    
    const left = []
    const right = []
    const refer = data[0]
    
    for(let i = 1; i < data.length; i++) {
        data[i] < refer ? left.push(data[i]) : right.push(data[i])
    }
    
    return [...quick(left), refer, ...quick(right)]
}
```
</details>