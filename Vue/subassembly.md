
## 组件

### 父组件：```/src/App.vue```

```html
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

```html
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

