### uni-app 规范

* 页面文件遵循 vue 单文件组件（SFC）规范
* 组件标签靠近小程序规范
* 接口能力（JS API）靠近微信小程序规范
* 数据绑定及时间处理同 vue 规范
* 为兼容多端运行，建议使用 flex 布局进行开发

### uni-app 特色

* 条件编译
* APP 端的 nvue 开发
* APP 端的 HTML5+

条件编译写法|说明
:-|:-
`#ifdef APP-PLUS ... #endif`|仅出现在 APP 平台下的代码
`#ifndef H5 ... #endif`|除了 H5 平台，其它平台均存在的代码
`#ifdef H5 \|\| MP-WEIXIN ... #endif`|在 H5 或 微信小程序 平台存在的代码（这里只有 \|\|，不可能存在 &&）

### uni-app 核心知识点

* 组件：基础组件、自定义组件
* API、路由
* 生命周期：钩子函数
* 语法、布局样式

### uni-app 生命周期

* 应用生命周期（只在 `app.vue` 中有效）
```javascript
export default {
	// 初始化完成触发一次，全局只触发一次
	onLaunch: function() {
		// 登录、获取全局变量、其它
	},
	// 应用启动时、应用从后台进入前台时触发
	onShwo: function() {
		
	},
	// 应用从前台进入后台时触发
	onHide: function() {
		
	}
}
```

* 页面生命周期
```
onLoad => onShow => onReady => onHide/onUnload
```
```javascript
export default {
	// 监听页面加载
	onLoad: function() {
		
	},
	// 监听页面初次渲染完成
	onReady: function() {
		// 如果渲染速度足够块，会在页面进入动画完成之前触发
	},
	// 监听页面显示
	onShow: function() {
		
	},
	// 监听页面隐藏
	onHide: function() {
		
	},
	// 监听页面卸载
	onUnload: function() {
		
	}
}
```

* 组件（vue）生命周期