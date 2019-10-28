
JSON.stringify()			// 将数组、对象、... 转换成JSON字符串
JSON.parse()				// 将JSON字符串转换成Object

JSON.parse('{"age":15, "name":"fzc"}', function(k, v) {
	if(k === '') 			// 如果到了最顶层，则直接返回属性值
		return v;	
	if(k == 'name') 
		return v;
	if(k == 'age') 
		return 2*v;
})

JSON.parse("['age':15,]")	// 不允许用逗号作为结尾，否则报错：SyntaxError

// 节点
document.createElement('div');
even.appendChild('<div id="new"></div>')
even.removeChild()
even.hasChildNodes()
even.replaceChild()
even.insertBefore()
even.getRootNode()
even.lastChild
even.firstChild
even.parentNode
even.childNodes
even.nextSibling
even.previousSibling

// 监听节点（节点添加：在一个节点作为子节点被插入到另一个节点中时触发，触发时已添加节点）
even.addEventListener('DOMNodeInserted', _ => {})

// 监听节点（节点添加：在一个节点被直接插入文档中或者通过子树间接插入文档后触发。在DOMNodeInserted之后触发）
even.addEventListener('DOMNodeInsertedIntoDocument', _ => {})

// 监听节点（节点删除：在节点从其父节点中被移除时触发，即触发时还未移除节点）
even.addEventListener('DOMNodeRemoved', _ => {})

// 监听节点（节点删除：在一个节点被直接从文档中删除或通过子树间接从文档中移除之前触发。在DOMNodeRemoved之后触发）
even.addEventListener('DOMNodeRemovedFromDocument', _ => {})

// 监听节点（添加|删除：在DOM结构中发生任何变化时触发，触发时已添加/移除）=> 废弃
even.addEventListener('DOMSubtreeModified', _ => {})

// 监听节点（属性监听：在特性被修改之后触发）=> 废弃
even.addEventListener('DOMAttrModified', _ => {})


// 节点监听（https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver）
var observer = new MutationObserver(function(mutationsList) {
    for(var mutation of mutationsList) {
        ...
    }
});
// 开始观察已配置突变的目标节点
observer.observe(targetNode, { attributes: true, childList: true, subtree: true })
// 停止监听
observer.disconnect()

// 获取浏览器前缀
function prefix() {  
    var div = document.createElement('div');  
    var cssText = '-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';  
    div.style.cssText = cssText;  
    var style = div.style;  
    if (style.webkitTransition) {  
        return '-webkit-';  
    }  
    if (style.MozTransition) {  
        return '-moz-';  
    }  
    if (style.oTransition) {  
        return '-o-';  
    }  
    if (style.msTransition) {  
        return '-ms-';  
    }  
    return '';  
}

// 节点属性
even.getAttribute('title')
even.setAttribute('title', 'title')
even.hasAttribute('title')

// 节点属性 data-*
even.dataset.id                 // 获取 data-id 属性的值
even.dataset.id = 1             // 设置 data-id 属性的值

// 元素可编辑
even.contentEditable = true;	// 设置（还可通过元素属性值的方式设置）
even.isContentEditable			// 获取

// 文档可编辑
document.designMode = 'on|off'

// textarea动态高度
even.addEventListener("input", function() {
	if (this.scrollHeight > this.clientHeight) {
		this.rows++;
	}
})

// 单继承
function FaFun() {}
function MyFun() {
    FaFun.call(this);
}
MyFun.prototype = Object.create(FaFun.prototype);
MyFun.prototype.constructor = MyFun;


// 多继承
function MyFun() {
    FaFun1.call(this);
    FaFun2.clll(this);
}
MyFun.prototype = Object.create(FaFun1.prototype);
Object.assign(MyFun.prototype, FaFun2.prototype);
MyFun.prototype.constructor = MyFun;

// 重写时调用父类方法
// 类型一
FaFun.prototype.init = function() {}
MyFun.prototype.init = function() {
    FaFun.prototype.init.apply(this, arguments);
}
// 类型二
function FaFun(name) {
    this.name = name;
}
function MyFun(name) {
    FaFun.call(this, name);
}
MyFun.prototype = Object.create(FaFun.prototype);
MyFun.prototype.constructor = MyFun;


// 继承时定义属性
Object.create(Object.prototype, {
    sex: {
        value: '男',
        writable: true,     // 可写的，默认false
        enumerable: true,   // 可枚举的，默认false
        configurable: true  // 可配置的，默认false
    }
})

// 兼容处理 Object.assign
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

// 获取对象原型
MyObject.__proto__
Object.getPrototypeOf(MyObject)

// 判断对象属性是否可被枚举
MyObject.prototypeIsEnumerable('name')

// 获取属性的标签
Object.getOwnPropertyDescriptor(MyObject, 'name')