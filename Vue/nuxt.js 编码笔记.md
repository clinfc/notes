## 在 server 中支持 import

#### 第一步：安装 `babel-preset-env`

```
npm install babel-preset-env
```

####　第二步：根目录下配置文件 `.babelrc`

```json
{
  "presets": ["env"]
}
```

#### 第三步：配置 `package.json`

```json
{
	"scripts": {
		// 追加 --exec babel-node
	  "dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server --exec babel-node",
	}
}
```

## `axios` 跨域代理

因 `nuxt.js` 本身集成了 `axios.js`，故只需在 `nuxt.config.js` 中配置即可。更详细的配置[见此](https://www.jianshu.com/p/a2047c2a0fc1)

#### 配置示例

```javascript
module.exports = {
	axios: {
		// 开启代理
	  proxy: true,
		// 开启 debug 模式
	  debug: true,
	  // 添加一个拦截器，该拦截器withCredentials在向baseURL 需要将身份验证头传递到后端的请求发出请求时自动设置axios配置
	  credentials: true,
	  // 在SSR上下文中，此选项将客户端请求标头设置为axios请求的默认标头。
	  // 这对于在服务器端发出需要基于cookie的身份验证的请求很有用。这也有助于在SSR和客户端代码中发出一致的请求
	  proxyHeaders: true,
	  headers: {
	    'Content-Type': 'application/json;charset=utf-8',
	    'crossDomain': true
	  }
	},
	// 代理配置
	proxy: {
	  '/api/': { 
			target: 'http://mtapi.com', 
			// 在请求链接中将去掉 “/api/”，即转义后的 URL 将不包含 “/api/”
			pathRewrite: {'^/api/': ''} 
		}
	}
}
```

#### 使用示例

```javascript
// 此处的 URL 将被转义成 http://mtapi.com/user/getUserInfo
this.$axios.$get('/api/user/getUserInfo')
```

#### 跨域 api [见此](https://www.jianshu.com/p/a2047c2a0fc1)

## `nuxt.js` 中使用第三方字体图标

#### 第一步：将第三方字体图标放在资源文件夹下，比如 `assets` 或 `static` 目录下

#### 第二步：配置 `nuxt.config.js`

```javascript
module.exports = {
	// 全局 css
	css: [
		// 将字体图标放在 assets 目录下的引入方式
	  '@/assets/iconfont/iconfont.css'
		// 将字体图标放在 static 目录下的引入方式
	  '@/static/iconfont/iconfont.css'
	]
}
```