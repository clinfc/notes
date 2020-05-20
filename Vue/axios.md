
## axios 常用方法

```axios.get```		获取数据

```axios.post```提交数据（表单提交 + 文件时上传）

```axios.put```		提交数据（所有数据推送到后端）

```axios.patch```更新数据（只将修改的数据推送到后端）

```axios.delete```删除数据

#### axios.get

```javascript
// 参数一：URL；参数二：包含其它配置项的对象
axios.get('/user/login', {
	// params: 需要传递的参数，此参数将被拼接在URL上
	params: {
		name: '李白',
		pass: '123'
	}
}).then(response => {
	
}).catch(error => {
	
}).finally(() => {
	
})
```
```javascript
axios({
	method: 'get',
	url: '/user/login',
	data: {
		name: '李白',
		pass: '123'
	}
}).then(response => {
	
}).catch(error => {
	
}).finally(() => {
	
})
```

#### axios.post

```javascript
// 参数一：URL；参数二：data；参数三：包含其它配置项的对象
axios.post('/user/login', {
	name: '李白',
	pass: '123'
}, {
	// 其它配置项
}).then(response => {
	
}).catch(error => {
	
}).finally(() => {
	
})
```
```javascript
axios({
	method: 'post',
	url: '/user/login',
	data: {
		name: '李白',
		pass: '123'
	}
}).then(response => {
	
}).catch(error => {
	
}).finally(() => {
	
})
```

#### axios.delete

```javascript
axios.delete('/user/delete', {
	// 参数将拼接在URL上（query string）
	params: {}
}).then(response => {
	
}).catch(error => {
	
}).finally(() => {
	
})
```
```javascript
axios.delete('/user/delete', {
	// 参数将被放在请求体中（request payload）
	data: {}
}).then(response => {
	
}).catch(error => {
	
}).finally(() => {
	
})
```
```javascript
axios({
	method: 'delete',
	url: '/user/delete',
	data: {
		name: '李白',
		pass: '123'
	}
}).then(response => {
	
}).catch(error => {
	
}).finally(() => {
	
})
```

## 并发请求（需要请求多个接口，但又需要同时处理数据时）

#### axios.all 和 axios.spread
```javascript
axios.all([
	axios.get('/user/info'),
	axios.get('/vip/info'),
]).then(axios.spread( (userInfo, vipInfo) => {
	
}))
```

## axios 配置

#### axios 全局配置（优先级：低）
```javascript
axios.defaults.timeout = 1000
```

#### axios 实例配置（优先级：中）

```javascript
import axios from 'axios'
const instance = axios.create({
	baseURL: '',			// 请求的域名，基本地址
	timeout: '1000',	// 请求超时时长（毫秒）
	url: '',					// 请求路径
	method: '',				// get, post, put, patch, delete...
	headers: {},			// 请求头
	params: {},				// 请求参数（参数将被拼接在URL上）
	data: {},					// 请求参数（参数将被放在请求体中）
})
// 修改实例配置
instance.defaults.timeout = 3000
export default instance
```

#### axios 请求配置（优先级：高）

```javascript
instance.get('/data.json', {
	timeout: 5000
})
```

## 拦截器（在请求或响应被处理前进行拦截）

#### 请求拦截器

```javascript
let interceptor = axios.interceptors.request.use(config => {
	// 在发送前做的事情
	return config
}, error => {
	// 在请求错误时做的事情
	// 请求错误（一般http状态码以4开头：404：not found、401：超时）
	return Promise.reject(error)
})
```

#### 响应拦截器

```javascript
let interceptor = axios.interceptors.response.use(response => {
	// 在请求成功后对响应的数据进行处理
	return response
}, error => {
	// 在响应错误时做的事情
	// 响应错误（一般http状态码以5开头：500：系统错误、502：系统重启）
	return Promise.reject(error)
})
```

#### 取消拦截器

```javascript
axios.interceptors.request.eject(interceptor)
```

#### 取消请求

```javascript
let source = axios.CancelToken.source()
axios.get('/user/info', {
	cancelToken: source.token
}).then(response => {
	
}).catch(error => {
	
})
// 取消请求
source.cancel('message')
```