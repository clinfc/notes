* webpack.config.js

```js
const HtmpWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: 'src/main.js',
    admin: 'src/admin.js'
  },
  plugins: [
    new HtmpWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      // 需要引入的 JS 文件
      chunks: ['runtime', 'vendors', 'main']
    }),
    new HtmpWebpackPlugin({
      template: 'src/index.html',
      filename: 'admin.html',
      // 需要引入的 JS 文件
      chunks: ['runtime', 'vendors', 'admin']
    })
  ]
}
```