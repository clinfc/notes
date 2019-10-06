// 事件绑定
function on(elem, eventType, callback) {
	// DOM 二级事件处理程序
	if (elem.addEventListener) {
		elem.addEventListener(eventType, callback, false);	// false：冒泡阶段执行程序； true：捕获阶段执行程序
	}
	// IE 事件处理程序
	else if (elem.attachEvent) {
		elem.attachEvent('on' + eventType, callback);
	}
	// DOM 零级事件处理程序
	else {
		elem['on' + eventType] = callback;
	}
}

// 事件解绑
function un(elem, eventType, callback) {
	// DOM 二级事件处理程序
	if (elem.removeEventListener) {
		elem.removeEventListener(eventType, callback, false);
	}
	// IE 事件处理程序
	else if (elem.detachEvent) {
		elem.detachEvent('on' + eventType, callback);
	}
	// DOM 零级事件处理程序
	else {
		elem['on' + eventType] = null;
	}
}

function event(event) {
	return event || window.event;
}

// 获取事件触发对象
function target(event) {
	return event.target || event.srcElement;
}

// 阻止默认事件
function preventDefault(event) {
	if (event.preventDefault) {
		event.preventDefault();
	}
	// IE
	else {
		event.returnValue = false;
	}
}

// 阻止事件冒泡
function stopPropagation(event) {
	if (event.stopPropagation) {
		event.stopPropagation();
	}
	// IE
	else {
		event.cancelBubble = true;
	}
}

function classList(elem) {
	if (elem.classList) {
		return elem.classList;
	}
	function classList(elem) {
		this.value = elem.className;
		this.list = this.value.split(' ');
		this.length = this.list.length;
		this._init(elem);
	}
	classList.prototype = {
		elem: null,
		_init: function(elem) {
			this.elem = elem;
		},
		add: function add(name) {
			if (false === this.list.includes(name)) {
				this.list.push(name);
			}
			this._update();
		},
		remove: function remove(name) {
			var index = this.list.indexOf(name);
			if (index != -1) {
				this.list.splice(index, 1);
			}
			this._update();
		},
		toggle: function toggle(name) {
			if (false === this.list.includes(name)) {
				this.list.push(name);
			} else {
				this.list.splice(this.list.indexOf(name), 1);
			}
			this._update();
			return this.list.includes(name);
		},
		contains: function contains(name) {
			return this.list.includes(name);
		},
		item: function item(index) {
			return this.list[index] || null;
		},
		_update: function _update() {
			this.length = this.list.length;
			this.value = this.list.join(' ');
			this.elem.className = this.value;
		}
	}
	return new classList(elem);
}

// DOM 节点监控
function DOMNodeMonitor(options) {

	function DOMNodeMonitor(options) {
		this.options = options;
		this._init();
	}

	DOMNodeMonitor.prototype = {
		obs: null,
		config: { attributes: false, childList: false, subtree: false },
		subtree: null,
		childList: null,
		attributes: null,
		_callback: null,
		_init: function init() {
			var self = this;
			for (var k in this.options) {
				if (['attributes', 'childList', 'subtree'].includes(k)) {
					self[k] = this.options[k];
					self.config[k] = true;
				}
			}
			this._callback = function(mutationsList) {
				for(var mutation of mutationsList) {
			        switch (mutation.type) {
			        	case 'subtree':
			        		self.subtree(mutation);
			        		break;
			        	case 'childList':
			        	    self.childList(mutation);
			        		break;
			        	case 'attributes':
			        		self.attributes(mutation);
			        		break;
			        }
			    }
			}
			this.obs = new MutationObserver(this._callback);
		},
		observe: function observe(targetNode) {
			this.obs.observe(targetNode, this.config);
		},
		disconnect: function disconnect() {
			this.obs.disconnect();
		},
		takeRecords: function takeRecords(callback) {
			var mutations = observer.takeRecords();
			if ('function' != typeof callback) {
				return mutations;
			}
			else if (mutations) {
			  callback(mutations);
			}
		}
	};

	return new DOMNodeMonitor(options);
}


function storage() {
	function storage() {}
	storage.prototype = {};

	return new storage();
}