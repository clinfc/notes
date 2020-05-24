### 安装

```
npm i webpack webpack-cli -D
```

### `package.json` 中 `scripts` 配置

参数|作用|默认值
:-|:-|:-
`--config`|指定一个 `webpack` 配置文件|`webpack.config.js`
`--mode`|设置打包环境|`development`、`production`
|入口文件|`./src/index.js`
`--output`|出口文件|`./dist/main.js`
`--module-bind`|指定文件处理的loader|`js=babel-loader`
`--progress`|显示打包进度|
`--display-error-details`|打印错误详情|
`--watch`|开启监听模式|
`--json`|将打包结果保存到 `json` 文件中|`> stats.json` 一定要加管道符！！！
`--profile`|显示每个打包节点的用时，方便排查打包速度瓶颈|


```json
{
	"scripts": {
		"dev": "webpack --mode development ./src/index.js --output ./dist/main.js --json > stats.json --module-bind js=babel-loader",
		"build": "webpack --mode production ./src/index.js --output ./dist/main.js --json > stats.json --module-bind js=babel-loader",
	}
}
```

### `webpack` 常见名词

参数|说明|值类型
:-|:-|:-
`mode`|
`context`|项目的绝对路径，一般不需要配置，默认为`process.cwd()`即工作目录。|`String`
`entry`|入口文件|`String`、`Array`、`Object`
`output`|出口文件|`Object`

多配置数组
```javascript
module.exports = [
	{ mode: "production" },
	{ mode: "development" }
]
```

文件入口：`entry`
```javascript
module.exports = {
	// 单文件入口
	entry: "path/to/my/entry/file.js",
	entry: ["path/to/my/entry/one.js", "path/to/my/entry/two.js"],
	entry: {
		main: "path/to/my/entry/file.js"
	},
	// 多文件入口
	entry: {
		home: "path/to/my/entry/home.js",
		search: "path/to/my/entry/search.js"
	}
}
```

文件输出：`output`
```javascript
module.exports = {
	entry: {
		home: 'path/to/my/entry/home.js',
		search: 'path/to/my/entry/search.js'
	},
	// 多文件输出
	output: {
		filename: '[name].js',
		path: __dirname + '/dist'
	}
}
```



