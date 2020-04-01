
## 路由

### 安装```vue-router```

```
npm install vue-router --save
```

### 定义路由文件：```/src/router.js```

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import tree from './pages/tree.vue'
import layer from './pages/layer.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/layer',
      component: layer
    },
    {
      path: '/tree',
      component: tree
    }
  ]
})
```

### 设置入口文件：```/src/main.js```

```javascript
import Vue from 'vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router
}).$mount('#app')
```

### 嵌套路由（将路由创建的视图插入公共模板中）：```/public/index.html```

```
<div id="app">

  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
  
</div>
```

### 路由跳转（导航）：```/public/index.html```

```html
<div id="app">

  <!-- 使用 router-link 组件来导航. -->
  <!-- 通过传入 `to` 属性指定链接. -->
  <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
  <router-link to="/layer"> to layer </router-link>
  <router-link to="/tree"> to tree </router-link>
  
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
  
</div>
```