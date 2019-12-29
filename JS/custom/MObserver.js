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
	 * 配置项示例
	 */
	var defaultConfig = {
		options: {
			childList: false,		// 观察目标子节点的变化，添加或者删除
			attributes: false,		// 观察属性变动
			subtree: false			// 默认为 false，设置为 true 可以观察后代节点
		},
		callback:{					// 回调函数
			all: undefined,			// 不区分监控类型的回调
			attr: undefined,		// attributes 的回调
			child: undefined,		// childList 的回调
		},
		target: [],					// 监听的元素集合
		observe: undefined			// MutationObserver 实例化对象
	};

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
			// 生成本次实例化对象的唯一id
			this.proxy = new Proxy({"id": Math.random().toString(36).slice(-8)}, {
				get (target, key) {
					return target[key];
				},
				set (target, key, value) {}
			});

			/**
			 * 配置项
			 */
			config[this.id] = {
				options: {
					childList: false,		// 观察目标子节点的变化，添加或者删除
					attributes: false,		// 观察属性变动
					subtree: false			// 默认为 false，设置为 true 可以观察后代节点
				},
				callback:{					// 回调函数
					all: undefined,			// 不区分监控类型的回调
					attr: undefined,		// attributes 的回调
					child: undefined,		// childList 的回调
				},
				target: [],					// 鉴定的元素
				observe: undefined			// MutationObserver 实例化对象
			};

			if (options && typeof options == 'object') {
				this.childList = options.childList || options.child;
				this.attributes = options.attributes || options.attr;
				this.subtree = options.subtree;
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
		 * 获取当前的监控元素
		 */
		get target() {
			return config[this.id].target;
		}

		/**
		 * 设置监控元素
		 * @param {String|Element} [#id, .class, attribute, element] value
		 */
		set target(tar) {
			// tar 为元素节点
			if (tar.nodeType == 1) {
				config[this.id].target = [tar];
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
				config[this.id].target = tars;
			}
			return this.target;
		}

		/**
		 * 获取当前配置项的 childList 属性值
		 * @returns {boolean}
		 */
		get childList() {
			return config[this.id].options.childList;
		}

		/**
		 *
		 * @param {Boolean} value
		 * @returns {boolean} 返回当前配置项的 childList 属性值
		 */
		set childList(value) {
			config[this.id].options.childList = value == true;
			return this.childList;
		}

		/**
		 * 获取当前配置项的 attributes 属性值
		 * @returns {boolean}
		 */
		get attributes() {
			return config[this.id].options.attributes;
		}

		/**
		 *
		 * @param {Boolean} value
		 * @returns {boolean} 返回当前配置项的 subtree 属性值
		 */
		set attributes(value) {
			config[this.id].options.attributes = value == true;
			return this.attributes;
		}

		/**
		 * 获取当前配置项的 subtree 属性值
		 * @returns {boolean}
		 */
		get subtree() {
			return config[this.id].options.subtree;
		}

		/**
		 *
		 * @param {Boolean} value
		 * @returns {boolean} 返回当前配置项的 subtree 属性值
		 */
		set subtree(value) {
			config[this.id].options.subtree = value == true;
			return this.subtree;
		}

		/**
		 * 设置所有监控的类型的统一回调
		 * @param {Function} cback
		 * @returns {MObserver}
		 */
		set callback(cback) {
			if (typeof cback == 'function') {
				config[this.id].callback.all = cback
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
				config[this.id].callback.attr = cback
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
				config[this.id].callback.child = cback
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
			if (!config[this.id].observer) {
				config[this.id].observer = new MutationObserver((mutations, observer)=>{
					config[this.id].callback.all && config[this.id].callback.all(mutations, observer);
					mutations.forEach(mutation => {
						switch (mutation.type) {
							// 被监控元素中添加或移除一个或更多的子节点
							case "childList":
								config[this.id].callback.child && config[this.id].callback.child(mutation, observer);
								break;
							// 被监控元素中某节点的一个属性值被更改
							case "attributes":
								config[this.id].callback.attr && config[this.id].callback.attr(mutation, observer);
								break;
							default:
								break;
						}
					})
				})
			}
			this.target.forEach(elem => {
				config[this.id].observer.observe(elem, config[this.id].options)
			});
		}

		/**
		 * 封装 MutationObserver 的 disconnect
		 * 阻止 MutationObserver 实例继续接收的通知，直到再次调用其observe()方法，该观察者对象包含的回调函数都不会再被调用
		 */
		disconnect () {
			config[this.id].observer.disconnect();
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
			let mutations = config[this.id].observer.takeRecords();
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