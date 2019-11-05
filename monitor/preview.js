(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.preview = factory());
}(this, function() {'use strict';

/**
 * 处理兼容
 * proyfill
 */
function prolfill() {
	// 兼容 Object.assign
	if (typeof Object.assign != 'function') {
	  // 配置项： writable: true, enumerable: false, configurable: true
	  Object.defineProperty(Object, "assign", {
	    value: function assign(target, varArgs) {
	      'use strict';
	
	      if (target == null) {
	        // 如果未定义或为空，则为TypeError
	        throw new TypeError('无法将未定义或null转换为对象');
	      }
	
	      var to = Object(target);
	
	      for (var index = 1; index < arguments.length; index++) {
	        var nextSource = arguments[index];
	
	        if (nextSource != null) {
	          // 如果未定义或为空，则跳过
	          for (var nextKey in nextSource) {
	            // 当hasOwnProperty被隐藏时，避免bug
	            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
	              to[nextKey] = nextSource[nextKey];
	            }
	          }
	        }
	      }
	      return to;
	    },
	    writable: true,
	    configurable: true
	  });
	}
	
	// 兼容 Element.prototype.classList
	if (!("classList" in document.documentElement)) {
	    Object.defineProperty(HTMLElement.prototype, 'classList', {
	        get: function() {
	            var self = this;
	            function update(fn) {
	                return function(value) {
	                    var classes = self.className.split(/\s+/g),
	                        index = classes.indexOf(value);
	 
	                    fn(classes, index, value);
	                    self.className = classes.join(" ");
	                }
	            }
	            return {
	                add: update(function(classes, index, value) {
	                    if (!~index) classes.push(value);
	                }),
	                remove: update(function(classes, index) {
	                    if (~index) classes.splice(index, 1);
	                }),
	                toggle: update(function(classes, index, value) {
	                    if (~index)
	                        classes.splice(index, 1);
	                    else
	                        classes.push(value);
	                }),
	                contains: function(value) {
	                    return !!~self.className.split(/\s+/g).indexOf(value);
	                },
	                item: function(i) {
	                    return self.className.split(/\s+/g)[i] || null;
	                }
	            };
	        }
	    });
	}

	if (!('dataset' in document.documentElement)) {
		Object.defineProperties(HTMLElement.prototype, 'dataset', {
			get: function() {
				var self = this;
			}
		})
	}
}

// 移除当前元素
function remove(elem) {
	elem.parentNode.removeChild(elem)
}

// 清空子元素
function removeAllChild(elem) {
	while (elem.firstChild) {
		elem.removeChild(elem.firstChild)
	}
}

// 添加子元素
function append(elem, childElem) {
	elem.appendChild(childElem);
}




}))