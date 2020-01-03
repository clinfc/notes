
/* ----------------------------------------------------------- 堆栈 ----------------------------------------------------------- */

let stack = new WeakMap()

class Stack
{
	constructor() {
		stack.set(this, [])
	}
	push(value) {	// 入栈
		stack.get(this).push(value)
	}
	pop() {			// 出栈
		stack.get(this).pop()
	}
	clear() {		// 清空栈
		stack.get(this).splice(0)
	}
	get size() {	// 栈的长度
		return stack.get(this).length
	}
}


/* ----------------------------------------------------------- 队列 ----------------------------------------------------------- */

let queue = new WeakMap()

class Queue
{
	constructor() {
		queue.set(this, [])
	}
	enqueue(value) {	// 入列
		queue.get(this).push(value)
	}
	dequeue() {			// 出列
		queue.get(this).shift()
	}
	clear() {			// 清空列
		queue.get(this).splice(0)
	}
	get size() {		// 队列的长度
		return queue.get(this).length
	}
}