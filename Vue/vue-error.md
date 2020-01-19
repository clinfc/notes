
## [```no-console/no-debugger```](https://www.jianshu.com/p/4f2a6ca1f562)

#### 错误描述
```Unexpected console statement (no-console) at src\pages\tree.vue:10:9```

#### 解决方案

配置```package.json``` 的 ```rules```

```
"rules": {
  "no-console": "off",
  "no-debugger": "off"
}
```


## [```runtime-only```](https://cli.vuejs.org/zh/config/#runtimecompiler)

#### 错误描述
```You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.```

#### 解决方案

1、创建```/vue.config.js```

2、配置```runtimeCompiler```为 ```true```

```
module.exports = {
  runtimeCompiler: true
}
```