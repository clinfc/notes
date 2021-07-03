# 简单使用

* plugin/custom-plugin.js

```js
module.exports = class CustomPlugin {
    apply(compiler) {}
}
```

* webpack.config.js

```js
const CustomPlugin = require('./plugin/custom-plugin.js')
module.exports = {
    plugin: [
        new CustomPlugin()
    ]
}
```


# plugin 调试

* package.json

参数|作用|默认值
:-|:-|:-
`--inspect`|开启调试工具|
`--inspect-brk`|在第一行打断点|

```json
{
  "scripts": {
    "debug": "node --inspect --inspect-brk node_modules/webpack/bin/webpack.js"
  },
}
```