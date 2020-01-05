// 从一段 HTML 代码创建 DOM
function fromHtml(html) {
	let div = document.createElement('div');
	div.innerHTML = html;
	return div.childNodes;
}

// 判断是否为 function
function isFunction(fn) {
   return typeof fn === 'function';
}

// 判断是否为 object
function isObject(tar) {
	return typeof tar == 'object';
}

// 获取css样式
function getStyle(elem, name) {
	return document.defaultView.getComputedStyle(elem, null).getPropertyValue(name)
}

// 转换成 int 类型, munus: 允许为负数
function toInt(tar, minus = true) {
	tar = parseInt(tar);
	tar = isNaN(tar) ? 0 : (minus == false && tar < 0) ? -tar : tar;
	return tar;
}

// 转换成 float 类型, munus: 允许为负数
function toFloat(tar, minus = true) {
	tar = parseFloat(tar);
	tar = isNaN(tar) ? 0 : (minus == false && tar < 0) ? -tar : tar;
	return tar;
}

// 防抖函数
function antiShake(callback, timeLag) {
    let timeout;
    // 使用闭包，保证每次使用的定时器是同一个
    return arg => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(arg);
            // 结束之后清除定时器
            clearTimeout(timeout);
        }, timeLag)
    }
}

// 获取 DOM List (构造器)
class $nodes
{
	constructor(tar) {
	  if (!tar) {
			return ;
		}
		if (tar instanceof $nodes) {
			return tar;
		}
		this.selecter = tar;
		// id选择器, class选择器, 属性选择器
		if (/((\.|\#).+|\[.+\])/.test(tar)) {
			this.doms = document.querySelectorAll(tar);
		}
	}
	// 绑定事件
	onEvent(type, callback) {
		this.forEach(dom => {
			dom.addEventListener(type, event => {
				callback.call(dom, event)
			}, false)
		})
	}
	// 遍历DOM元素
	forEach(callback) {
		if (!isFunction(this.doms.forEach)) {
			Array.prototype.forEach.call(this.doms, (dom, index) => {
				callback(dom, index)
			});
		} else {
			this.doms.forEach(callback)
		}
	}
	// 获取指定索引的 DOM 对象
	item(index) {
		index = toInt(index, false);
		return this.doms[index]
	}
}

function $el(tar) {
	return new $nodes(tar)
}

class drag
{
	/**
	 * @param {String} type 拖拽的类型。水平：accross；垂直：vertical；水平 + 垂直：both。
	 */
	constructor(option) {
		if (!isObject(option) || option.el.nodeType !== 1) {
			throw new Error('初始化失败')
		}
	  this.type = (['across', 'vertical'].indexOf(option.type) == -1 ) ? 'both' : option.type;
		this.el = option.el;
		this.parent = this.el.parentNode;
		
		let ecss = document.defaultView.getComputedStyle(this.el, null);
		// 监控元素的宽高
		this.w = toFloat(ecss.width, false);
		this.h = toFloat(ecss.height, false);
		
		let pcss = document.defaultView.getComputedStyle(this.parent, null);
		// 监控元素父元素的宽高
		this.pw = toFloat(pcss.width, false);
		this.ph = toFloat(pcss.height, false);
		
		this.history = null;
		
		let self = this;
		
		function computed(event) {
			if (document.zccpDown) {
				if (self.history) {
					let css = document.defaultView.getComputedStyle(self.el, null)
					let x = toFloat(css.left) + event.clientX - self.history.clientX;
					let y = toFloat(css.top) + event.clientY - self.history.clientY;
					self.offset(x, y);
				}
				self.history = event;
			}
		}
		
		this.el.addEventListener('mousedown', event => {
			event.stopPropagation();
			document.zccpDown = true;
			
			document.addEventListener('mousemove', event => {
				computed(event)
			}, false);
		})
		
		// 监听鼠标按下
		this.parent.addEventListener('mousedown', event => {
			document.zccpDown = true;
			self.offset(event.offsetX, event.offsetY);
			
			document.addEventListener('mousemove', event => {
				computed(event)
			}, false);
		}, false);
		
		// 监听鼠标松开
		document.addEventListener('mouseup', () => {
			document.zccpDown = false;
		}, false);
	}
	
	/**
	 * @param {Object} x 	对应left
	 * @param {Object} y	对应top
	 */
	offset(x, y) {
		console.log(x, y);
		// left
		x = x < 0 ? 0 : x > this.pw ? this.pw : x;
		// top
		y = y < 0 ? 0 : y > this.ph ? this.ph : y;
		switch (this.type) {
			case 'across':
				this.el.setAttribute('style', `left:${x}px`);
				break;
			case 'vertical':
				this.el.setAttribute('style', `top:${y}px`);
				break;
			default:
				this.el.setAttribute('style', `left:${x}px;top:${y}px`);
				break;
		}
	}
}