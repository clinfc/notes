## assets 资源文件引用（需要 Webpack 做构建编译处理）

#### CSS 中

```css
/* 从Nuxt 2.0开始，~/alias将无法在CSS文件中正确解析。你必须在url CSS引用中使用~assets（没有斜杠）或@别名 */
.box {
	background:url("~assets/banner.svg")
}
```

#### HTML 中

```html
<img src="~/assets/image.png">
```


## static 静态资源引用（不需要 Webpack 做构建编译处理）

Nuxt 服务器启动的时候，static 目录下的文件会映射至应用的根路径 / 下

```html
<!-- 引用 static 目录下的图片 -->
<img src="/my-image.png"/>
```