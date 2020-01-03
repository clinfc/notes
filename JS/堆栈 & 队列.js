
/* ----------------------------------------------------------- 堆栈 ----------------------------------------------------------- */

let stack = new WeakMap()

class Stack
{
	constructor() {
		stack.set(this, [])
	}

	// 入栈
	push(value) {
		stack.get(this).push(value)
	}

	// 出栈
	pop() {
		return stack.get(this).pop()
	}

	// 清空栈
	clear() {
		stack.get(this).splice(0)
	}
	
	// 栈的长度
	get size() {
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

	// 入列
	enqueue(value) {
		queue.get(this).push(value)
	}

	// 出列
	dequeue() {
		return queue.get(this).shift()
	}

	// 清空列
	clear() {
		queue.get(this).splice(0)
	}

	// 队列的长度
	get size() {
		return queue.get(this).length
	}
}


/* --------------------------------------------------------- 优先队列 --------------------------------------------------------- */

let queue = new WeakMap()

// 修正权重
function correctionWeight(weight) {
	weight = parseInt(weight);
	return isNaN(weight) ? 0 : weight;
}

class PriorityQueue
{
	constructor() {
		queue.set(this, [])
	}

	// 入列
	enqueue(value, weight) {
		weight = correctionWeight(weight);
		let qe = queue.get(this);
		let ue = {weight, value};
		// 如果存在小于当前 weight 的 item，就添加到该节点之前
		let re = qe.some((item, index) => {
			if (item.weight < weight) {
				qe.splice(index, 0, ue);	
				return true;
			}
		});
		// 如果不存在小于当前 weight 的 item，就添加到最后
		if (!re) {
			queue.get(this).push(ue)
		}
	}

	// 出列
	dequeue() {
		return queue.get(this).shift()['value']
	}

	// 清空列
	clear() {
		queue.get(this).splice(0)
	}

	// 队列的长度
	get size() {
		return queue.get(this).length
	}
}