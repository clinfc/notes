## 数据管理 添加数据与编辑数据公用表单

属性|说明|value
:-|:-|:-
`:type`|当前表单类型：添加 / 编辑|`add`/`edit`
`:data`|表单数据|`{}` / `data`
`:show-form`|控制表单的显示|`true` / `false`

方法|说明
:-|:-
`@close`|关闭表单
`@reload`|表单提交后用于刷新数据

#### 父组件

```html
<button type="button" @click="append">添加</button>
<button type="button" @click="edit">编辑</button>
<tag-form
	:data="data"
	:type="type"
	:show-form="showForm"
	@close="close"
	@reload="reload"
/>
```
```javascript
export default {
	data() {
		return {
			type: 'edit',
			data: {},
			showForm: false
		}
	},
	methods: {
		// 显示表单
		open() {
			this.showForm = true
		},
		// 隐藏表单
		close() {
			this.showForm = false
		},
		// 数据重载
		reload() {
			// 自定义逻辑
		},
		// 添加数据
		append() {
			this.data = {}
			this.type = 'add'
			this.open()
		},
		// 编辑数据
		edit() {
			this.data = { id: 1, name: '李白' }
			this.type = 'edit'
			this.open()
		}
	}
}
```

#### 子组件

```html
<el-form ref="form" :model="form" label-width="100px">
	<el-form-item label="标签名" required>
		<el-input v-model="form.name" autocomplete="off" placeholder="请输入标签名" />
	</el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
	<el-button @click="$emit('close')">取 消</el-button>
	<el-button @click="submit">保 存</el-button>
</div>
```

```javascript
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    showForm: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  data () {
    return {
      form: {
        id: 0,
        name: ''
      }
    }
  },
  methods: {
		// 打开动画结束时的回调。用于关联数据
    darlogOpend () {
      if (this.type === 'add') {
        this.form = {
          id: 0,
          name: '',
        }
      } else {
        this.form = { ...this.data }
      }
    },
    // 提交表单
    submit () {
			let self = this
			this.$refs['form'].validate(valid => {
			  if (valid) {
			    let { id, pid, name }
			    self.$axios.put('/api/tag/add', {
			      id: id || '',
			      pid: pid || 0,
			      name
			    }).then(({ status, data }) => {
			      if (status === 200 && data.code === 0) {
			        // 数据重载
			        self.$emit('reload')
							// 关闭表单
			        self.$emit('close')
			      } else {
			        self.$alert(data && data.msg ? data.msg : '连接失败', '异常')
			      }
			    })
			  }
			})
		}
  }
}
```