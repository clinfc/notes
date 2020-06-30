## npm 命令

项目初始化
```
npm init
```

-f：项目初始化时使用默认配置进行初始化
```
npm init -f
```

i：install 的简写
```
npm i vue-cli
```

-D：--save-dev 的简写，将安装包信息加入到 devDependencies （开发阶段的依赖）

-S：--save 的简写，将安装包信息加入到 dependencies （生产阶段的依赖）

-g：全局安装
```
npm install -g vue-cli
```

查看全局安装路径
```
npm root -g
```

更新依赖包
```
npm update
npm putdated
```

卸载依赖包
```
npm uninstall ioredis
npm uninstall -D babel-cli
```

查看包信息
```
npm info babel-cli
```

查看模块
```
npm list
npm list --global
```


## 淘宝镜像 [链接](https://developer.aliyun.com/mirror/NPM?from=tnpm)

永久设置npm安装源为淘宝镜像
```
npm config set registry https://registry.npm.taobao.org
```

cnpm 安装
```
npm i -g cnpm --registry=https://registry.npm.taobao.org
```

# `package.json`

### 创建 `package.json`

```
npm init
```

创建默认的 `package.json`
```
npm init --yes
npm init -y
```
默认内容如下
```json
{
  "name": "my_package",
  "description": "",
  "version": "1.0.0",
  "main": "index.js",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ashleygwilliams/my_package.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/ashleygwilliams/my_package/issues"
  },
  "homepage": "https://github.com/ashleygwilliams/my_package"
}
```

### 配置项

选项名|说明|注意事项|权重
:-|:-|:-|:-
`name`|项目名|必须小写、不能有空格、可以有下划线和破折号|必选
`version`|版本号|必须是 `x.x.x` 格式、遵循 [server](https://docs.npmjs.com/getting-started/semantic-versioning) 规范|必选
`private`|私有的，将不被发送到线上公共服务器|
`description`|自述信息|（空）字符串|
`main`||总是 `index.js`|
`dependencies`|指定依赖项|这些包是生产应用程序所需要的|
`devDependencies`|指定依赖项|这些包只需要用于开发和测试|