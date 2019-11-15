/*-----------------------------------------冒泡排序-----------------------------------------*/

/**
 * 双向冒泡排序
 * @param {Array} array 需要进行排序的数组
 * @return {Array}
 * 312ms
 */
function bothWayBubblingSort(array) {
	let start = 0;
	let end = array.length - 1;

	while (start < end) {
		let endPos = 0;
		let startPos = 0;
		for (let i = start; i < end; i++) {
			if (array[i] > array[i + 1]) {
				endPos = i;
				swap(array, i, i + 1);
			}
		}
		end = endPos;
		for (let i = end; i > start; i--) {
			if (array[i - 1] > array[i]) {
				startPos = i;
				swap(array, i - 1, i);
			}
		}
		start = startPos;
	}

	return array;
}


/*-----------------------------------------插入排序-----------------------------------------*/
/**
 * 改造二分查找,查找小于value且离value最近的值的索引
 * @param {Object} array
 * @param {Object} max
 * @param {Object} value
 */
function binarySearch(array, max, value) {
	let min = 0;

	while (min <= max) {
		const m = Math.floor((min + max) / 2);

		if (array[m] <= value) {
			min = m + 1;
		} else {
			max = m - 1;
		}
	}

	return min;
}
/**
 * 使用二分法来优化插入排序
 * @param {Object} array
 * 86ms
 */
function insertionSort(array) {
	for (let i = 1, len = array.length; i < len; i++) {
		const temp = array[i];
		const insertIndex = binarySearch(array, i - 1, array[i]);

		for (let preIndex = i - 1; preIndex >= insertIndex; preIndex--) {
			array[preIndex + 1] = array[preIndex];
		}
		array[insertIndex] = temp;
	}

	return array;
}


/*-----------------------------------------并归排序-----------------------------------------*/
/**
 * @param {Object} array
 * 30ms
 */
function concatSort(array) {
	const len = array.length;

	if (len < 2) {
		return array;
	}

	const mid = Math.floor(len / 2);
	const left = array.slice(0, mid);
	const right = array.slice(mid);

	return concat(concatSort(left), concatSort(right));
}

function concat(left, right) {
	const result = [];

	while (left.length > 0 && right.length > 0) {
		result.push(left[0] <= right[0] ? left.shift() : right.shift());
	}

	return result.concat(left, right);
}


/*-----------------------------------------希尔排序-----------------------------------------*/
/**
 * 通过动态定义的 gap 来排序，先排序距离较远的元素，再逐渐递进
 * @param {Object} array
 * 15ms
 */
function shellSort(array) {
	const len = array.length;
	let gap = Math.floor(len / 2);

	while (gap > 0) {
		// gap距离
		for (let i = gap; i < len; i++) {
			const temp = array[i];
			let preIndex = i - gap;

			while (array[preIndex] > temp) {
				array[preIndex + gap] = array[preIndex];
				preIndex -= gap;
			}
			array[preIndex + gap] = temp;
		}
		gap = Math.floor(gap / 2);
	}

	return array;
}
