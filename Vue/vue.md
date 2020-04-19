## 

v-|简写|说明|示例
:--:|:|:--|:--
`v-model="value"`||表单输入和应用状态之间的双向绑定|`<input v-model="name"/>`
`v-if="true"`||条件控制|`<div v-if="true"></div>`
`v-else-if="true"`||条件控制|`<div v-else-if="true"></div>`
`v-else="true"`||条件控制|`<div v-else></div>`
`v-show="true"`||带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS 属性 display|`<h1 v-show="true">Hello!</h1>`
`v-for="(item, index) in arrayList"`||数组/对象遍历|`<div v-for="i in 5" :key="i"></div>`
`v-on:click=""`|`@click=""`|事件绑定|`<div v-on:click="submit"></div>`
`v-bind:title="msg"`|`:title="msg"`|绑定attribute属性|`<div v-bind:title="title"></div>`
`v-once`||执行一次性地插值，当数据改变时，插值处的内容不会更新|`<span v-once>{{msg}}</span>`
`v-html="rawHtml"`||将数据解释为HTML|`<span v-html="rawHtml"></span>`
`key="key-name"`||添加key值的元素间相互独立，不会被复用|`<input key="username-input">`

## vue 生命周期

![vue生命周期](./images/lifecycle.png)


## class 与 style 绑定

```html
<div v-bind:class="{active: true, on: false}"></div>
```

#### 对象数据绑定
```html
<div v-bind:class="active"></div>
<script>
new Vue({
	el: "#app",
	data: {
		active: {
			on: true
		}
	}
})
</script>
```

#### 计算属性
```html
<div v-bind:class="active"></div>
<script>
new Vue({
	el: "#app",
	computed: {
		active: function() {
			return {
				on: true
			}
		}
	}
})
</script>
```

#### 数组语法
```html
<div v-bind:class="[act1, act2]"></div>
<script>
new Vue({
	el: "#app",
	computed: {
		active: function() {
			return {
				act1: 'active-on',
				act2: 'block'
			}
		}
	}
})
</script>
```

#### 多重值

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```


## 数组更新检测

#### 变异方法

`push()`

`pop()`

`shift()`

`unshift()`

`splice()`

`sort()`

`reverse()`

#### 原始数据

```javascript
let vm = new Vue({
	data: {
		items: ["李白", "杜甫", "李清照"]
	}
})
```

#### 替换数组

```javascript
vm.items = vm.items.filter(item => {
	return `item => ${item}`
})
```

#### 重新赋值

```javascript
// 方法一
Vue.set(vm.items, 1, "诗仙李白");
// 方法二
vm.items.splice(1, 1, "李白诗仙")
```

#### 修改数组长度

```javascript
vm.items.splice(1)
```


## 对象数据

```javascript
let vm = new Vue({
	data: {
		info: {
			name: "李白"
		}
	}
})
```

#### 添加新值

```javascript
// 方法一
Vue.set(vm.info, "age", 27)
// 方法二：使用 Vue.set 的别名
vm.$set(vm.info, "age", 27)
```

#### 批量添加

```javascript
vm.info = Object.assign({}, vm.info, {
	age: 27,
	sex: "男"
})
```


## 事件处理

#### event 对象

```html
<div v-on:click="check($event)"></div>
```
```javascript
new Vue({
	methods: {
		check: function(event) {
			
		}
	}
})
```

#### 事件修饰符

修饰符||说明
:--|:--|:-
`.stop`|`event.stopPropagation()`|阻止事件冒泡
`.prevent`|`event.preventDefault()`|关闭默认事件
`.capture`||
`.self`||
`.once`||事件只被触发一次
`.passive`|`target.addEventListener("click", null, {passive: true})`|设置为true时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>
```

```html
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
```

```html
<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>
```

```html
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
```

```html
<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>
```

```html
<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

```html
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

```html
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

#### 按键修饰符

```html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
```

```html
<!-- 可以直接将 KeyboardEvent.key 暴露的任意有效按键名转换为 kebab-case 来作为修饰符 -->
<!-- 处理函数只会在 $event.key 等于 PageDown 时被调用 -->
<input v-on:keyup.page-down="onPageDown">
```

#### 按键码别名

别名|示例|说明
:--|:-|:-
`.enter`|`<input v-on:keyup.enter="submit">`|
`.tab`|`<input v-on:keyup.tab="submit">`|
`.delete`|`<input v-on:keyup.delete="submit">`|
`.esc`|`<input v-on:keyup.esc="submit">`|
`.space`|`<input v-on:keyup.space="submit">`|
`.up`|`<input v-on:keyup.up="submit">`|
`.down`|`<input v-on:keyup.down="submit">`|
`.left`|`<input v-on:keyup.left="submit">`|
`.right`|`<input v-on:keyup.right="submit">`|
`.ctrl`|`<input v-on:keyup.ctrl="submit">`|
`.alt`|`<input v-on:keyup.alt="submit">`|
`.shift`|`<input v-on:keyup.shift="submit">`|
`.meta`|`<input v-on:keyup.meta="submit">`|
`.left`||鼠标修饰符
`.right`||鼠标修饰符
`.middle`||鼠标修饰符

#### .evact 修饰符

.exact 修饰符允许你控制由精确的系统修饰符组合触发的事件

```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

## 表单输入绑定

修饰符|示例|说明
:-|:-|:-
`.lazy`|`<input v-model.lazy="msg" >`|将`input`转换为`change`事件进行同步
`.number`|`<input v-model.number="age" type="number">`|自动将用户的输入值转为数值类型
`.trim`|`<input v-model.trim="msg">`|自动过滤用户输入的首尾空白字符


## 组件

#### prop

```javascript
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```
```javascript
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```
prop验证
```javascript
props: {
	// 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
	propA: Number,
	// 多个可能的类型
	propB: [String, Number],
	// 必填的字符串
	propC: {
		type: String,
		required: true
	},
	// 带有默认值的数字
	propD: {
		type: Number,
		default: 100
	},
	// 带有默认值的对象
	propE: {
		type: Object,
		// 对象或数组默认值必须从一个工厂函数获取
		default: function () {
			return { message: 'hello' }
		}
	},
	// 自定义验证函数
	propF: {
		validator: function (value) {
			// 这个值必须匹配下列字符串中的一个
			return ['success', 'warning', 'danger'].indexOf(value) !== -1
		}
	}
}
```