
## koa2

#### 安装脚手架

```
npm install -g koa-generator
```

#### 创建项目

```
koa2 -e MyKoa2Project
```

#### 初始化安装

```
cd MyKoa2Project && npm install
```

#### 运行

```
DEBUG=koa* & npm start koaLearn

localhost:3000
```

#### 实时更新（监听）

```
npm run dev

localhost:3000
```

#### 简单中间件（koa）

```javascript
function tree(ctx) {
  console.log(ctx)
}

module.exports = function() {
  return async function(ctx, next) {
    tree(ctx)
    await next()
  }
}
```