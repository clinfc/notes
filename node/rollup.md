### 安装

```
> npm init -y
> npm i rollup -D
```

# 配置

* package.json

```json
{
  "scripts": {
    "dev": "rollup -c rollup.config.js"
  }
}
```

* rollup.config.js

```js
const path = require('path')

module.exports = {
  // 入口
  input: path.resolve(__dirname, './src/main.js'),
  output: {
    // 出口
    file: path.resolve(__dirname, './dist/main.js'),
    // 打包模式：umd、es、cjs
    format: 'umd'
  }
}
```

# plugins

```
npm i rollup-plugin-node-resolve -D
npm i rollup-plugin-commonjs -D
npm i rollup-plugin-babel -D
npm i rollup-plugin-json -D
npm i rollup-plugin-terser -D

npm i @vue/compiler-sfc -D
npm i rollup-plugin-vue -D

npm i sass -D
npm i rollup-plugin-postcss -D
```

* rollup.config.js

```js
const vue = require('rollup-plugin-vue')
const json = require('rollup-plugin-json')
const babel = require('rollup-plugin-babel')
const postcss = require('rollup-plugin-postcss')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const { terser } = require('rollup-plugin-terser')

module.exports = {
  output: {
    format: 'cjs'
  },
  plugins: [
    // 将第三方模块与源码进行混合打包
    resolve(),
    // rollup.js 默认不支持 CommonJS 模块
    commonjs(),
    babel({
      // node_modules 下的文件不进行 babel 编译
      exclude: 'node_modules/**'
    }),
    // 对 json 文件进行支持
    json(),
    // 对 .vue 文件进行支持
    vue(),
    // 
    postcss({
      plugins: []
    }),
    // 代码压缩
    terser()
  ]
}
```


# babel

```
npm install @babel/node @babel/core @babel/cli @babel/preset-env -D
```

* .babelrc

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1",
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.4",
      }
    ]
  ]
}
```

# Tree Shaking

* export.js

```js
// ES Module
export const a = 12
export const b = 14
export const c = 16
// CommonJS
exports.a = 12
exports.b = 14
exports.c = 16
```

* import.js

```js
import { a } from 'export.js'
```


# external

> 有些场景下，虽然我们使用了resolve插件，但我们仍然希望某些库保持外部引用状态

* rollup.config.js

```js
module.exports = {
  external: ['axios']
}
```

# eslint

```
npm i eslint -D
npx eslint --init
```


# npm link

* package.json

```json
{
  "name": "multiple-component",
  "main": "dist/main.min.js",
  "files": [
    "src",
    "dist"
  ],
  "keywords": [
    "vue",
    "multiple"
  ]
}
```

### 将组件映射到本地 node 组件库中

```
npm link
```

### 在项目中使用组件

* package.json

```json
{
  // 手动添加依赖
  "dependencies": {
    "multiple-component": "1.0.0"
  }
}
```

```
npm link multiple-component
```