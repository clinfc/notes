/**
 * data-custom="maxlength": 		绑定监控元素
 * data-custom="maxlength-show"		绑定数据显示元素
 * custom-filter=""					定义过滤器名称，当当前页面存在多个监控元素时，此属性不可缺（监控元素与显示元素的过滤器名称必须保持一致）
 * custom-sep="/"					定义数据显示分隔符（非必须，默认值：/）
 * maxlength="100"					定义监控元素可输入最大字符长度（非必须，默认值：100）
 */
(function($){

	// 使用严格模式
	"use strict";

	var maxLength = (function(){
		function maxLength(element, options) {
			this.set = $.extend(true, {}, $.fn.maxLength.defaults, options || {});
			this.element = element;
			this.init();
		};
		maxLength.prototype = {
			// 当前字符长度
			len: 0,
			// 显示元素最终显示出来的内容
			text: '',
			// 显示元素的对象集合
			target: [],
			// 初始化插件
			init: function() {
				this._initLen();
				this._initSeparator();
				this._binding();
				this._initMax();
				this._initTarget();
				this._exhibition();
				this._monitor();
			},
			// 初始化当前字符长度，当监控元素被设置了默认值
			_initLen: function() {
				this.len = this.element.val().length;
			},
			// 初始化数据分隔符
			_initSeparator: function() {
				var sep = this.element.attr('custom-sep');
				if (sep != undefined) {
					this.set.separator = sep;
				}
			},
			// 绑定监控元素与显示元素
			_binding: function() {
				var k = this.element.attr('custom-filter');
				var v = $(this.set.target + '[custom-filter=' + k + ']');

				if (k != undefined && v.length > 0) {
					this.targetTemp = v;
				} else {
					this.targetTemp = $(this.set.target);
				}
			},
			// 初始化监控对象的最大字符长度
			_initMax: function() {
				let max = this.set.max;
				if ($.type(max) !== 'number') {
					max = parseInt(max);
				}
				if (isNaN(max)) {
					this.set.max = 100;
				} else if (max < 0) {
					this.set.max = Math.abs(max);
				} else {
					this.set.max = max;
				}
				// 
				if (this.element.attr('maxlength') == undefined) {
					this.element.attr('maxlength', this.set.max);
				} else {
					this.set.max = this.element.attr('maxlength');
				}
				this.text = 0 + this.set.separator + this.set.max;
			},
			// 初始化用于数据显示的元素
			_initTarget: function() {
				var $this = this;
				$this.target = [];
				$.each($this.targetTemp, function(i, v) {
					if (['INPUT', 'TEXTAREA'].indexOf(v.nodeName) == -1) {
						$(v).text($this.text);
						$this.target.push([$(v), false]);
					} else {
						$(v).val($this.text);
						$this.target.push([$(v), true]);
					}
				});
			},
			// 监控元素的字符长度变化
			_monitor: function() {
				var $this = this;

				// 输入中文是锁定长度
				$this.lock = false;

				// 当前已输入内容的长度
				$this.len = 0;

				// 中文输入开始的时候，会触发此函数
				$this.element.on('compositionstart', function() {
					$this.lock = true;
				});

				// 中文输入结束的时候，会触发此方法
				$this.element.on('compositionend', function() {
					$this.lock = false;
				});

				// 输入即可触发【不区分中文和英文】
				$this.element.on('input', function(e) {
					if (!$this.lock) {
						$this.len = e.target.value.length;
						$this._exhibition();
					}
				});
			},
			// 显示数据
			_exhibition: function() {
				this.text = this.len + this.set.separator + this.set.max;
				var $this = this;
				$.each($this.target, function(i, v) {
					if (v[1]) {
						v[0].val($this.text);
					} else {
						v[0].text($this.text);
					}
				});
			}
		};
		return maxLength;
	})();

	// 单例模式
	$.fn.maxLength = function(options) {
		return this.each(function() {
			var $this = $(this);
			var instance = $this.data('maxLength');
			if (!instance) {
				$this.data('maxLength', (instance = new maxLength($this, options)));
			}
		})
	};

	// 声明默认配置项
	$.fn.maxLength.defaults = {
		// 字数最大长度
		max: 100,
		// 显示数据的元素对象
		target: "[data-custom=maxlength-show]",
		// 分割符
		separator: "/"
	};

	$(function() {
		$('[data-custom=maxlength]').maxLength();
	})

})(jQuery);