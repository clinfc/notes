
## 目录结构

名称|说明
:--:|:--
componets|**组件**目录
hybrid|存放本地网页的目录
pages|**业务页面文件**存放的目录
platforms|存放各个平台专用页面的目录
static|粗放应用引用 **静态资源** 的目录
wxcomponents|存放 **小程序组件** 的目录
App.vue|Vue 初始化 **入口文件**
main.js|应用配置，用来配置 **App全局样式** 以及 **监听**
manifest.json|配置 **应用名称**、**APPID**、**logo**、**版本** 等打包信息
pages.json|配置页面 **路由**、**导航条**、**选项卡** 等页面信息


## .vue 文件

#### .vue 是自定义文件类型，类 HTML 语法描述的一个Vue

#### 组成部分

1、template：视图层，组件

2、script：逻辑层

3、style：样式层


## 常用的基础组件
组件|对应的HTML|说明
--|:--:|:--:
view|div|容器组件
text|span|文字组件
image|img|图片组件


## 生命周期

#### 注：uni-app 完整支持 Vue 的生命周期

#### 应用生命周期：App.vue

周期名称|说明|应用
--|:---|:--
onLauch|应用初始化完成触发。全局只触发一次|登录
onShow|应用启动、或从后台进入前台触发|停留时长
onHide|应用从前台进入后台触发|
onError|应用报错时触发|

#### 页面生命周期

周期名称|说明|应用
--|:---|:--
onLoad|监听页面加载，接受上个页面传递的参数|请求后台接口、渲染前的操作
onReady|监听页面初次渲染完成|获取节点信息
onShow|监听页面显示，只要页面出现就会触发|
onHide|监听页面隐藏|
onUnload|监听页面卸载|


## uni-app 路由

页面跳转方法|实现
:--|:--
tabBar|配置```pages.json```中的```tabBar.list```
内置组件|```<navigator url="">跳转</navigator>```
API接口|```uni.navigateTo```、```uni.redirectTo```、```uni.reLaunch```、```uni.switchTab```、```uni.navigateBack```


## 样式布局

#### 尺寸单位：px、rpx
title|content
:--:|:--
转换公式|设计稿的```1px```/ 设计稿基准宽度 = 框架样式的```1rpx```/屏幕基准宽度```750rpx```
备注|```rpx```不支持```横竖屏```切换

#### 外部样式的导入

title|content
:--:|:--
App.vue|定义全局样式
@import|引入外部 css，例如：```@import './common/base.css'```。备注：如果在 ```App.vue``` 中引入，则为```全局样式```
