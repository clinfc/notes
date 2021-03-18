# 安装

```
npm i webpack webpack-cli -D
```


# `package.json` 中 `scripts` 配置

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
		"dev": "webpack --mode development ./src/index.js --output ./dist/main.js --profile --json > stats.json --module-bind js=babel-loader",
		"build": "webpack --mode production ./src/index.js --output ./dist/main.js --profile --json > stats.json --module-bind js=babel-loader",
	}
}
```


# `webpack` 常见名词

参数|说明|值类型
:-|:-|:-
`mode`|
`context`|项目的绝对路径，一般不需要配置，默认为`process.cwd()`即工作目录。|`String`
`entry`|入口文件|`String`、`Array`、`Object`
`output`|出口文件|`Object`


# 多配置数组

* webpack.config.js

```js
module.exports = [
	{ mode: "production" },
	{ mode: "development" }
]
```


# 文件入口：`entry`

* webpack.config.js

```js
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


# 文件输出：`output`

* webpack.config.js

```js
const path = require('path')
module.exports = {
	entry: {
		home: 'path/to/my/entry/home.js',
		search: 'path/to/my/entry/search.js'
	},
	// 多文件输出
	output: {
		filename: '[name].js',
    // 必须是绝对路径
		path: path.resolve(__dirname, 'dist'),
    // 
    publicPath: 'http://cdn.com.cn'
	}
}
```


# resolve（模块解析）

* webpack.config.js

```js
module.exports = {
  resolve: {
    // 创建 import 或 require 的别名
    alias: {
      @: path.resolve(__dirname, '/src'),
      ~: path.resolve(__dirname, '/'),
    }
  },
}
```


# loader（不同类型文件的打包方案）

* webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpg|png|jpeg)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        // 执行顺序：从下到上，从右到左
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader'
        ]
      }
    ]
  }
}
```


# css增加厂商前缀

```
npm i postcss-loader autoprefixer -D
```

* postcss.config.js

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

* webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 如果在 .scss 文件中包含 @import '*.scss'，引入的 scss 文件，在引入之前也会去走前面两个 loader
              importLoaders: 2,
              // CSS 模块化打包。相当于开启 scoped
              module: true
            }
          } 
          'postcss-loader'
          'sass-loader',
        ]
      }
    ]
  }
}
```


# plugins

> plugins：类似于生命周期函数。在webpack运行到某一时刻时，做一些自定义的事情

* src/index.html

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
    <div id="app"></div>
	</body>
</html>
```

* webpack.config.js

```js
// 打包之前对指定文件进行清理
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 在打包结束后，自动生成HTML文件，并把打包生成的JS文件自动引入HTML文件中
const HtmpWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  plugins: [
    new HtmpWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, './')
    }),
  ]
}
```


# devtool

> 错误映射：将打包的代码与开发代码进行映射，当发生错误时，将提示

参数名|作用
:-|:-
`cheap`|只精确到行，不精确到列；只负责业务代码错误，`loader` 错误将被忽略
`module`|`loader` 错误也将被提示
`inline`|生成的 `source-map` 文件将集成到 `js` 文件中，而不是以单独的文件存在
`source-map`|生成独立的 `source-map` 文件

```js
module.exoprts = {
  // 开发环境推荐
  devtool: 'cheap-module-eval-source-map',
  // 生产环境推荐
  devtool: 'cheap-module-source-map'
}
```


# devServer

> npm i webpack-dev-server

* package.json

```json
{
  "scripts": {
    "dev": "webpack-dev-server"
  }
}
```

* webpack.config.js

```js
const webpack = require('webpack')

module.exports = {
  // 开启 web 服务器（在 webpack-dev-server 中才会生效，即在开发环境中才会生效）
  devServer: {
    // 开启错误提示弹出层
    overlay: true,
    // 服务器启动的根路径
    contentBase: './dev',
    // 端口号
    port: 3000,
    // 在第一次启动服务时，自动打开浏览器并进行访问
    open: true,
    // 单页应用中使用 history 路由时，解决除 index 外其它路由无法加载的情况
    historyApiFallback: true,
    // 跨域代理
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // 支持 HTTPS
        secure: true,
        // 路径重写
        pathRewrite: {
          '^/api': '',
          /* /api/header.json => http://localhost:3000/demo.json */
          'header.json': 'demo.json'
        },
        // 改变请求头中的 origin 选项
        changeOrigin: true,
        headers: {
          cookie: '',
          host: '',
        }
      }
    },
    // 热替换
    hot: true,
    // 即使热替换未生效，浏览器也不自动刷新
    hotOnly: true
  },
  plugins: [
    // 热模块替换插件：与热替换合用，方便调试 CSS 时 HTML 不会更改
    new webpack.HotModuleReplacementPlugin()
  ]
}
```


# 仿写一个 devServer 服务

* package.json

```json
{
  "scripts": {
    "dev": "node server.js"
  }
}
```

* server.js

```js
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const config = require('./webpack.config.js')
const complier = webpack(config)

const app = express();

app.use(webpackDevMiddleware(complier, {
  publicPath: config.output.publicPath
}))

app.listen(3000, () => {
  console.log('server is running')
})
```


# Babel （业务代码配置）

> npm install @babel/polyfill --S

> npm install babel-loader @babel/core @babel/preset-env --D

polyfill 会照成全局污染，不适合在组件库代码中使用

* webpack.config.js

```js
module.exports = {
  module: [
    {
      test: /\.js$/,
      // 排除 node_modules 下的 js 文件
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          [
            // 将 ES6 转换为 ES5（仅转换语法，不包含缺失的对象、函数、方法）
            '@babel/preset-env',
            {
              // 根据业务代码补充 ES5 中缺失的对象、函数、方法
              useBuiltIns: 'usage',
              // 根据浏览器的版本决定是否需要执行 ES6 转 ES5
              targets: {
                chorme: 67
              }
            }
          ]
        ]
      }
    }
  ]
}
```

# Babel （类库代码配置）

> npm install @babel/runtime-corejs2 -S

> npm install @babel/plugin-transform-runtime -D

> npm install babel-loader @babel/core @babel/preset-env --D

plugin-transform-runtime 会以闭包的形式注入/引入内容，不会造成全局污染

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                corejs: 2,
                helpers: true,
                regenerator: true,
                useESModules: false
              }
            ]
          ]
        }
      }
    ]
  }
}
```


# 如何将 Babel 的配置内容独立出去

* 在 `webpack.config.js` 同级目录新建 `.babelrc` 文件
* 将 `webpack.config.js` 中 `babel` 的 `options` 内容放入 `.babelrc` 文件中


# tree shaking 

> 作用：只打包被引用并使用的内容

> 只支持 ES Module（import ... from ...） 形式的引入

> 在开发模式下，tree shaking 不会直接去除掉未使用的代码，只会做提示

* package.json

```json
{
  // 所有模块都将 tree shaking
  "sideEffects": false,
  // 该模块不需要做 tree shaking
  "sideEffects": [
    "@babel/polyfill",
    "*.css"
  ]
}
```

* webpack.config.js

```js
module.exports = {
  mode: 'development',
  // 生产环境无需配置此项，默认情况下已配置
  optimization: {
    usedExports: true
  }
}
```

# development 与 production 模式的区分打包

> npm i webpack-merge -D

* webpack.common.js

```js
module.exports = {}
```

* webpack.build.js | webpack.dev.js

```js
const { merge } = require('webpack-merge')
const config = require('webpack.common.js')

const build = {
  mode: 'production'
}

module.exports = merge(config, build)
```

* package.json

```json
{
  "scripts": {
    "dev": "webpack-dev-server --config webpack.dev.js",
    "build": "webpack --config webpack.build.js"
  }
}
```


# Code Splitting （代码分割）

> SplitChunksPlugin

### 同步代码分割

* webpack.cinfig.js

```js
module.exports = {
  optimization: {
    splitChunks: {
      // 需要进行代码分割的代码类型
      chunks: 'all',
      // 只有代码量大于 30kb 才会进行代码分割
      minSize: 30000,
      minRemainingSize: 0,
      // 当代码量大于 50kb 时，会进行二次分割
      maxSize: 50000,
      // 当一个模块被引用的 1 次后面会进行代码分割
      minChunks: 1,
      // 同时加载的最大模块数（最大代码分割数）
      maxAsyncRequests: 6,
      // 入口文件的最大代码分割数
      maxInitialRequests: 4,
      // 生成分割文件的连接符
      automaticNameDelimiter: '~',
      // 代码分割的规则
      cacheGroups: {
        defaultVendors: {
          // 同步代码是否属性 node_modules 目录下，如果是，则分割出去
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // 分割出去的文件名
          filename: 'vernors.js'
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,
          filename: 'common.js'
        }
      }
    }
  }
}
```

### 异步代码分割 （官方库）

> npm i @babel/plugin-syntax-dynamic-import

* index.js

```js
function component() {
  // 自定义此项异步代码分割出去后的文件名称为 lodash
  return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ }) => {
    return _.join([520, 13, 14], '')
  })
}
```

* .babelrc

```
{
  "plugins": [
    "@babel/plugin-syntax-dynamic-import"
  ]
}
```

* webpack.config.js

```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'async'
    }
  }
}
```

### 异步代码分割 （非官方库）

> npm i babel-plugin-dynamic-import-webpack

* .babelrc

```
{
  "plugins": [
    "dynamic-import-webpack"
  ]
}
```


# Preloading、Prefetching （代码优化）


# CSS 文件分割

> npm install mini-css-extract-plugin -D

* webpack.config.js

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  }
}
```

# Caching （浏览器缓存）

* webpack.confing.js

```js
module.exports = {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js'
  },
  optimization: {
    // 兼容旧版本
    runtimeChunk: {
      name: 'runtime'
    }
  }
}
```


# Shimming （垫片）

* webpack.config.js

```js
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
}
```

# Shimming：this 指向变更

> npm i imports-loader -D

* webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'imports-loader?this=>window'
          }
        ]
      }
    ]
  }
}
```


# library 打包

* webpack.config.js

```js
module.exports = {
  output: {
    // 支持 script_src 引入，全局变量名为 custom
    library: 'cumtom',
    // 支持模块引入
    libraryTarget: 'umd'
  },
  // 忽略该库，不将该库打包到最终的代码中（用户使用时，需要自己引入该库）
  externals: [ 'lodash' ],
  externals: {
    lodash: {
      commonjs: 'lodash'
    }
  }
}
```


# PWA

> npm i workbox-webpack-plugin -D

* webpack.config.js

```js
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
module.exports = {
  mode: 'production',
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      SkipWaiting: true
    })
  ]
}
```


# TypeScript

> npm i ts-loader typescript -D

* webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}
```

* ts.config.json

```json
{
  "compilerOptions": {
    // 非必写，webpack 中已配置 output.path
    "outDir": "./dist",
    // TS 中使用的是 ES Module 的模块引入方式
    "module": "es6",
    // 打包成 ES5 语法
    "target": "es5",
    // 允许引入 JS 文件库
    "allowJs": true,
  }
}
```
