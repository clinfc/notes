```
npm init -y
npm i -D webpack webpack-cli webpack-merge clean-webpack-plugin typescript ts-loader cross-env
npx tsc --init
```

## 常用配置

> tsconfig.json

```json
{
    "compilerOptions": {
        "declaration": true,        // 生成 .d.ts 文件
    },
    "include": ["src"],             // 需要被包含的路径
    "exclude": ["node_modules"],    // 需要被排除的路径
}
```


## 路径别名

> tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    },
  },
}
```

> webpack.config.js

```js
module.exports = {
    entry: path.resolve(__dirname, "src"),
    resolve: {
        alias: {
            "~": path.join(__dirname, "src"),
        },
    },
}
```


## css/sass/scss

> 安装依赖

```
npm i -D style-loader css-loader autoprefixer postcss postcss-loader sass dart-sass sass-loader
```

```
npm i -D style-loader css-loader autoprefixer postcss postcss-loader@4 sass dart-sass sass-loader@10
```

> postcss.config.js

```js
module.exports = {
    plugins: [require('autoprefixer')],
}
```

> webpack.config.js

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.css', '.sass', '.scss'],
    },
}
```