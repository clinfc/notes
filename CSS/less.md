## 安装

```
npm install -g less
```

## 注释

```less
// 单行注释

/* 多行注释 */
```


## 变量声明

```less
// 声明
@color: #FFF;

// 引用
.box {
	color: @color;
}
```


## 运算操作

```less
@size: 10px;

.box {
	padding: @size + 10px;
	margin: @size - 10px;
	font-size: @size * 2;
	border-width: @size / 2;
}
```


## @import

```less
// global.less
* {
	margin: 0;
	padding: 0;
}

// box.less
@import "global.less";
.box {
	width: 20px;
}
```


## 扩展

```less
.global {
	margin: 0;
	padding: 0;
}
.box {
	color: red;
	// 扩展语法
	&:extend(.global);
}

// 编译后

.global, .box {
	margin: 0;
	padding: 0;
}
.box {
	color: red;
}
```


## 混合

```less
.global {
	font-size: 12px;
}
.box {
	color: red;
	// 混合语法
	.global();
}
.nav {
	color: blue;
	// 混合语法
	.global;
}

// 编译后

.global {
	font-size: 12px;
}
.box {
	color: red;
	font-size: 12px;
}
.nav {
	color: blue;
	font-size: 12px;
}
```


## 混合参数

```less
.global(@width, @color, @size: 12px) {
	width: @width;
	color: @color;
	font-size: @size
}
.box {
	.global(12px, red, 14px)
}
.nav {
	.global(@color: red, @width: 12px);
}

// 编译后

.box {
	width: 12px;
	color: red;
	font-size: 14px;
}
.nav {
	width: 12px;
	color: red;
	font-size: 12px;
}
```


## 

```less

```


## 

```less

```


## 

```less

```


## 

```less

```