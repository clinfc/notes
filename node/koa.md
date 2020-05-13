# koa plugin

### 请求体解析器 

#### [koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser)

安装
```
npm i koa-bodyparser
```

使用

```javascript
var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
 
var app = new Koa();
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}));
```