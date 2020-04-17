
## 注释

```scss
// 单行注释：在编译后去掉

/*
 * 多行注释：在编译后保留，压缩后去掉
 */

/*!
 * 强制注释：在编译压缩后任保留
 */
```


## 变量

```scss
// 变量声明
$color: #FAFAFA;
$border-color: #FAFAFA;
$border_color: #FAFAFA;

// 变量引用
.box {
	color: $color;
	border: 1px solid $color;
}
```


## 选择器嵌套

```scss
.box {
	color: red;
	
	// 后代选择器：.box ul
	ul {
		display: inline-block;
	}
	
	// 伪类选择器：.box:hover
	&:hover {
		color: yellow;
	}
	
	// 引用选择器：.box .box-text
	& &-text {
		text-align: center;
	}
}
```


## 属性嵌套

```scss
.box {
	font: {
		family: Helvetica;
		size: 15px;
		weight: normal;
	}
}
// 编译后
.box {
	font-family: Helvetica;
	font-size: 15px;
	font-weight: normal;
}

.nav {
	border: 1px solid #000 {
		left: 0;
		right: 0;
	}
}
// 编译后
.nav {
	border: 1px solid #000;
	border-left: 0;
	border-right: 0;
}
```


## mixin

```scss
// 格式：@mixin name (param, param, ...) {}

// mixin 定义
@mixin box {
	color: red;
	background-color: #FAFAFA;
	a {
		color: yellow;
	}
}
// mixin 调用
.box {
	@include box;
}

// mixin 定义
@mixin nav($color, $bg_color) {
	color: $color;
	background-color: $bg_color;
	a {
		clor: darken($color, 10%);
	}
}
// mixin 引用（默认参数顺序）
.nav {
	@include nav(#333, #3F3F3F);
}
// mixin 引用（指定参数名）
.nav {
	@include nav($bg_color:#3F3F3F, $color:#333);
}
```


## 继承（ @extend ）

```scss
.box {
	padding: 15px;
}
.box .alert {
	margin: 10px;
}
.nav {
	@extend .box;
	background-color: red;
}
// 编译后
.box, .nav {
	padding: 15px;
}
.box .alert, .box .alert {
	margin: 10px;
}
.nav {
	background-color: red;
}
```


## partials 与 @import

```scss
// global.scss
body {
	margin: 0;
	padding: 0;
	font-size: 12px;
}

// box.scss
@import "global";		// 引入 global.scss
.box {
	color: red;
}
```


## 数字函数

```scss
// 取绝对值
abs(-1)

// 四舍五入
round(3.4)

// 向上取整
ceil(3.4)

// 向下取整
floor(3.4)

// 百分比
percentage(650 / 1000)

// 取最小值
min(1, 2, 3)

// 取最大值
max(1, 2, 3)
```


## 字符串函数

```scss
// 转换为大写
to-upper-case("abc")

// 转换为小写
to-lower-case("ABC")

// 字符串长度
str-length("abc")

// 字符串索引
str-index("abcdefg", "cd")

// 插入字符串
str-insert("abc", "defg", 4)
```


## 颜色函数

```scss
rgb(0, 0, 255)
rgb(0, 0, 100%)

rgba(0, 0, 255, 0.5)

hsl(0, 100%, 50%)
hsl(360, 100%, 50%)

hsla(360, 100%, 50%, 0.5)

// 让明度增加 130 度
adjust-hue(red, 130deg)

// 增加 30% 明度
lighten(red, 30%)

// 减少 30% 明度
darken(red, 30%)

// 增加 30% 饱和度
saturate(red, 30%)

// 减少 30% 饱和度
desaturate(red, 30%)

// 增加 0.3 的不透明度
transparentize(rgba(0, 0, 0, 0.5), 0.3)

// 减少 0.3 的不透明度
opacify(rgba(0, 0, 0, 0.5), 0.3)
```


## 列表函数

```scss
// 列表长度
length(5px 2px 3px)

// 获取列表项
nth(5px 2px 3px, 1)

// 获取列表项位置
index(5px 2px 3px, 2px)

// 追加项
append(5px 2px 3px, 10px)

// 合并列表
join(5px 2px, 10px 3px)

// 合并列表并以 , 分割类表象
join(5px 2px, 10px 3px, comma)
```


## Map

```scss
// 声明
$color: (rd: red, yw: yellow)

// 获取值
map-get($color, yw)

// 获取所有键
map-keys($color)

// 获取所有值
map-values($color)

// 判断键
map-has-key($color, yw)

// 合并
map-merge($color, (be: blue))
$color: map-merge($color, (be: blue))

// 移除项
map-remove($color, yw, be)
```


## Boolean函数

```scss
not(5 > 3)
```


## 插值语句

```scss
$version: "1.0.1"
/* 版本号：#{$version} */
$name: "info";
$bg: "background";
.box-#{$name} {
	#{$bg}-color: red;
}

// 编译后

/* 版本号：1.0.0 */
.box-info{
	background-color: red;
}
```


## @if @else if @else

```scss
$box: "yw";
.box {
	@if $box == yw {
		background-color: yellow;
	} @else if $box == be {
		background-color: blue;
	} @else {
		background-color: red;
	}
}
```


## @for

```scss
$end: 4;
// 包含结束值
@for $i from 1 through $end {
	.box-#{$i} {
		width: 100% / $end * $i;
	}
}

// 不包含结束值
@for $i from 1 to $end {
	.box-#{$i} {
		width: 100% / $end * $i;
	}
}
```


## @each

```scss
$list: success error warning;

@each $item in $list {
	.box-#{$item} {
		background-img: url(#{$item}.png);
	}
}
```


## @while

```scss
$i: 12;

@while $i > 0 {
	.box-#{$i} {
		width: 12px / $i;
	}
	$i: $i - 1;
}
```


## function

```scss
$color: (yw: yellow, be: blue, rd: red)

@function color($key) {
	return map-get($color, $key);
}

.box {
	border-color: color(yw)
}
```


## @warn @error

```scss
$color: (yw: yellow, be: blue, rd: red)

@function color($key) {
	@if not map-has-key($color) {
		@warn "不存在的键 #{$key}"
		@error "不存在的键 #{$key}"
	}
	return map-get($color, $key);
}

.box {
	border-color: color(yw)
}
```