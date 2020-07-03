# webpack-eslint

> npm i eslint eslint-loader -D

> npx eslint --init

* webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          // 配置 eslint-loader
          {
            loader: 'eslint-loader',
            options: {
              // 自动格式化代码
              fix: true
            },
            // 强制 eslint 先执行
            force: 'pre'
          }
        ]
      }
    ]
  },
  devServer: {
    // 开启错误提示弹层
    overlay: true
  }
}
```

# resolve

* webpack.config.js

```js
module.exports = {
  resolve: {
    // 从其它文件引入文件时（省略文件类型后缀时），默认寻找这几类文件
    extensions: ['.js', '.vue']
  }
}
```