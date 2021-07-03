# 定义和使用

* loaders/custom-loader.js

```js
// 不可使用箭头函数
module.exports = function (source) {
    return source.replace('name', '李白')
}
```

* webpack.config.js

```js
const path = require('path')
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                // 普通的字符串写法
                    path.resolve(__dirname, './loaders/custom-loader.js'),
                ]
            },
        ]
    }
}
```

```js
module.exports = {
    // 指定 loader 的引入路径
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['custom-loader']
            },
        ]
    }
}
```

## options > query

```
npm install loader-utils -D
```

* loaders/custom-loader.js

```js
const loaderUtils = require('loader-utils')

module.exports = function (source) {
    // 调用 options 数据（原始写法）
    return source.replace('name', this.query.name)
    
    // 调用 options 数据（辅助工具）
    const options = loaderUtils.getOptions(this)
    return source.replace('name', options.name)
}
```

* webpack.config.js

```js
const path = require('path')
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
            {
                loader: path.resolve(__dirname, './loaders/custom-loader.js'),
                // 配置参数（在 loader 中通过 this.query 拿取到此配置）
                options: {
                    name: '李白'
                }
            },
        ]
      },
    ]
  }
}
```

# 数据返回

* loaders/custom-loader.js

```js
module.exports = function (source) {
    const result = source.replace('name', this.query.name)
    
    // 直接返回结果
    return result
    
    // 携带额外数据的返回
    this.callback(null, result)
    this.callback(
        err: Error | null,
        content: String | Buffer,
        sourceMap?: SourceMap,
        meta?: any
    )
    
    // 异步返回结果（同 this.callback 的参数一样）
    this.async(null, result)
}
```