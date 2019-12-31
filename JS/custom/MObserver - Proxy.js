/**
 * 封装 MutationObserver
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined'
		? module.exports = factory()
		: typeof define === 'function' && define.amd
			? define(factory)
			: (global.MObserver = factory());
}(this, (function () { 'use strict';
	
	/**
	 * 初始化配置项
	 * @param {Object} target
	 */
	function initConfig(target) {
		target = typeof config == 'object' ? target : {};
		target.id = Math.random().toString(36).slice(-8);
		
		return new Proxy(target, {
			get (target, key) {
				return target[key];
			},
			set (target, key, value) {
				if (key != 'id') {
					target[key] = value;
				}
				return true;
			}
		})
	}

	/**
	 * 保存每个实例的配置项
	 */
	var config = {};

	/**
	 * 封装 MutationObserver
	 */
	class MObserver
	{
		constructor(options) {
			this.proxy = initConfig({
				childList: false,						// 观察目标子节点的变化，添加或者删除
				attributes: false,					// 观察属性变动
				subtree: false,							// 默认为 false，设置为 true 可以观察后代节点
				all_callback: undefined,		// 不区分监控类型的回调
				attr_callback: undefined,		// attributes 的回调
				child_callback: undefined,	// childList 的回调
				target: [],									// 监听的元素集合
				observe: undefined					// MutationObserver 实例化对象
			});

			if (options && typeof options == 'object') {
				this.subtree = options.subtree;
				this.childList = options.childList || options.child;
				this.attributes = options.attributes || options.attr;
				this.target = options.target || options.tar;
				this.callback = options.callback || options.cback;
			}
		}

		/**
		 * 获取本次示例对象的唯一id
		 * @returns {string}
		 */
		get id() {
			return this.proxy.id;
		}
		
		/**
		 * 获取 MutationObserver 的配置项
		 */
		get options() {
			let self = this;
			return {
				subtree: self.subtree,
				childList: self.childList,
				attributes: self.attributes
			}
		}

		/**
		 * 获取当前的监控元素
		 */
		get target() {
			return this.proxy.target;
		}

		/**
		 * 设置监控元素
		 * @param {String|Element} [#id, .class, attribute, element] value
		 */
		set target(tar) {
			if (!tar) {
				return this.proxy.target;
			}
			// tar 为元素节点
			if (tar.nodeType == 1) {
				this.proxy.target = [tar];
			}
			// tar 为 【id 属性】或【class 属性】或【节点属性，例如：[title]】
			else if (/((\#|\.|).+|\[.+\])/.test(tar)) {
				let tars = document.querySelectorAll(tar);
				if (typeof tars.forEach != 'function') {
					let tarss = [];
					Array.prototype.forEach.call(tars, function (item) {
						tarss.push(item);
					});
					tars = tarss;
				}
				this.proxy.target = tars;
			}
			return this.proxy.target;
		}

		/**
		 * 获取当前配置项的 childList 属性值
		 * @returns {boolean}
		 */
		get childList() {
			return this.proxy.childList;
		}

		/**
		 *
		 * @param {Boolean} value
		 * @returns {boolean} 返回当前配置项的 childList 属性值
		 */
		set childList(value) {
			this.proxy.childList = (value == true);
			return this.childList;
		}

		/**
		 * 获取当前配置项的 attributes 属性值
		 * @returns {boolean}
		 */
		get attributes() {
			return this.proxy.attributes;
		}

		/**
		 *
		 * @param {Boolean} value
		 * @returns {boolean} 返回当前配置项的 attributes 属性值
		 */
		set attributes(value) {
			this.proxy.attributes = value == true;
			return this.attributes;
		}

		/**
		 * 获取当前配置项的 subtree 属性值
		 * @returns {boolean}
		 */
		get subtree() {
			return this.proxy.subtree;
		}

		/**
		 *
		 * @param {Boolean} value
		 * @returns {boolean} 返回当前配置项的 subtree 属性值
		 */
		set subtree(value) {
			this.proxy.subtree = value == true;
			return this.subtree;
		}

		/**
		 * 设置所有监控的类型的统一回调
		 * @param {Function} cback
		 * @returns {MObserver}
		 */
		set callback(cback) {
			if (typeof cback == 'function') {
				this.proxy.all_callback = cback
			}
			return this;
		}

		/**
		 * 设置 attributes 监控的回调
		 * @param {Function} cback
		 * @returns {MObserver}
		 */
		set attributesCback(cback) {
			if (typeof cback == 'function') {
				this.proxy.attr_callback = cback
			}
			return this;
		}

		/**
		 * 设置 childList 监控的回调
		 * @param {Function} cback
		 * @returns {MObserver}
		 */
		set childListCback(cback) {
			if (typeof cback == 'function') {
				this.proxy.child_callback = cback
			}
			return this;
		}

		/**
		 * 配置MutationObserver在DOM更改匹配给定选项时，通过其回调函数开始接收通知
		 */
		observe() {
			if (!this.target.length) {
				throw new Error('当前未设置监听元素！');
			}
			
			if (!this.proxy.observer) {
				this.proxy.observer = new MutationObserver((mutations, observer)=>{
					
					this.proxy.all_callback && this.proxy.all_callback(mutations, observer);
					
					mutations.forEach(mutation => {
						switch (mutation.type) {
							// 被监控元素中添加或移除一个或更多的子节点
							case "childList":
								this.proxy.child_callback && this.proxy.child_callback(mutation, observer);
								break;
							// 被监控元素中某节点的一个属性值被更改
							case "attributes":
								this.proxy.attr_callback && this.proxy.attr_callback(mutation, observer);
								break;
							default:
								break;
						}
					})
				})
			}
			
			let options = this.options;
			this.target.forEach(elem => {
				this.proxy.observer.observe(elem, options)
			});
		}

		/**
		 * 封装 MutationObserver 的 disconnect
		 * 阻止 MutationObserver 实例继续接收的通知，直到再次调用其observe()方法，该观察者对象包含的回调函数都不会再被调用
		 */
		disconnect () {
			this.proxy.observer.disconnect();
		}

		/**
		 * 封装 MutationObserver 的 takeRecords
		 * 从 MutationObserver 的通知队列中删除所有待处理的通知，并将它们返回到 MutationRecord 对象的新 Array 中
		 *
		 * @param {Function} callback 对 observer.takeRecords 得到的数组进行处理的回调函数
		 * @param {Boolean} disconnect 是否调用 observer.disconnect
		 */
		takeRecords (...agrs) {
			let disconect = args[1] == true;
			let mutations = this.proxy.observer.takeRecords();
			if (typeof agrs[0] == 'function') {
				agrs[0](mutations);
			}
			agrs[1] = agrs[1] === false ? false : true;
			if (agrs[1]) {
				this.disconnect();
			}
		}
	}

	return MObserver;
})));