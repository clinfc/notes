
## 组件

### 父组件：```/src/App.vue```

```
<template>
  <div id="app">
  
    <!-- 传入参数、设置子组件的自定义事件 -->
    <layer :msg="age" @clog="echo" />
    
    <h3 slot="slot1"> 插槽语法：vue-version < 2.6 </h3>
    
    <template v-slot:slot2>
      <h3> 插槽语法：vue-version >= 2.6 </h3>
    </template>
    
  </div>
</template>

<script>
import layer from './components/layer.vue'

export default {
  name: 'app',
  components: {
    layer
  },
  data() {
    return {
      age: 18
    }
  },
  methods: {
    echo(e) {
      console.log(e);
    }
  }
}
</script>
```

### 子组件：```/src/components/layer.vue```

```
<template>
  <div class="layer">
  
    <!-- $emit 调用父容器中设置的【自定义事件】。注：$event 为事件对象 event -->
    <button type="button" @click="$emit('clog', $event)"> {{msg}} </button>
    
    <!-- 设置插槽 -->
    <slot name="slot-1"></slot>
    <slot name="slot-2"></slot>
    
  </div>
</template>

<script>
  export default {
    name: 'layer',
    props: ['msg']  // 外部传参的变量名
  }
</script>
```


## 路由

### 安装```vue-router```

```
npm install vue-router --save
```

### 定义路由文件：```/src/router.js```

```
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

```
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

```
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


## 组件数据共用（Vuex）

#### 安装```Vuex```

```npm install vuex --save```

#### 定义规则：```/src/store.js```

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 1
};

const mutations = {
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count--
  }
}

const actions = {
  increment: ({commit}) => {
    
    // 对应 mutations 中的 increment
    commit('increment')
    
  },
  decrement: ({commit}) => {
    
    // 对应 mutations 中的 decrement
    commit('decrement')
    
  }
}

export default new Vuex.Store({state, actions, mutations})
```

### 设置入口文件：```/src/main.js```

```
import Vue from 'vue'
import App from './App.vue'
import store from './store.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
```