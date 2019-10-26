
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
