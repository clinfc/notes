# 多叉树

```js
const data = {
    val: 'a',
    childs: [
        {
            val: 'b',
            childs: [
                {
                    val: 'd',
                    childs: []
                },
                {
                    val: 'e',
                    childs: []
                }
            ]
        },
        {
            val: 'c',
            childs: [
                {
                    val: 'f',
                    childs: []
                },
                {
                    val: 'g',
                    childs: []
                }
            ]
        }
    ]
}
```


## 深度优先遍历

* 访问根节点
* 多根节点的 children 挨个进行深度优先遍历

> 递归

```js
function dfs(root) {
    console.log(root.val)
    root.childs.forEach(dfs)
}

dfs(data)
```


## 广度优先遍历

* 新建队列，把根节点插入队列
* 队头元素出列
* 把队头元素的 children 挨个入列

> 队列

```js
function bfs(root) {
    const queue = [root]
    while(queue.length > 0) {
        const item = queue.shift()
        console.log(item.val)
        queue.push(...item.childs)
    }
}
```


# 二叉树

* 树中每个节点最多只能有两个子节点
* 在 JavaScript 中常用 Object 来模拟二叉树

```js
const data = {
    val: '1',
    left: {
        val: '2',
        left: {
            val: '4',
            left: null,
            right: null
        },
        right: {
            val: '5',
            left: null,
            right: null
        }
    },
    right: {
        val: '3',
        left: {
            val: '6',
            left: null,
            right: null
        },
        right: {
            val: '7',
            left: null,
            right: null
        }
    }
}
```

## 先序遍历

* 访问根节点
* 对根节点的左子树进行优先遍历
* 对根节点的右子树进行优先遍历

> 递归

```js
function preorder(root) {
    if (root) {
        console.log(root.val)
        preorder(root.left)
        preorder(root.right)
    }
}
preorder(data)
```

> 栈

```js
function preorder(root) {
    if (root) {
        const stack = [root]
        
        while(stack.length) {
            const item = stack.pop()
            
            console.log(item.val)
            item.right && stack.push(item.right)
            item.left && stack.push(item.left)
        }
    }
}
```

## 中序遍历

* 对根节点的左子树进行中序遍历
* 访问根节点
* 对跟节点的右子树进行中序遍历

> 递归

```js
function inorder(root) {
    if (root) {
        inorder(root.left)
        console.log(root.val)
        inorder(root.right)
    }
}
```

> 栈

```js
function inorder(root) {
    if (root) {
        const stack = [root]
        let point = root
        
        while(stack.length || point) {
            while(point) {
                stack.push(point.left)
                point = point.left
            }
            
            const item = stack.pop()
            console.log(item.val)
            point = item.right
        }
    }
}
```

## 后序遍历

* 对根节点的左子树进行后续遍历
* 多根节点的右子树进行后续遍历
* 访问根节点

> 递归

```js
function postorder(root) {
    if (root) {
        postorder(root.left)
        postorder(root.right)
        console.log(root.val)
    }
}
```

> 栈

```js
function postorder(root) {
    if (root) {
        const rstack = []
        const stack = [root]
        while(stack.length) {
            const item = stack.pop()
            rstack.push(item)
            item.left && stack.push(item.left)
            item.right && stack.push(item.right)
        }
        while(rstack.length) {
            const item = rstack.pop()
            console.log(item.val)
        }
    }
}
```