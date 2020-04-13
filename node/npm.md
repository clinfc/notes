## npm 参数

```
// 项目初始化
npm init

// -f：项目初始化时使用默认配置进行初始化
npm init -f

// i：install的简写
npm i vue-cli

// -D：--save --dev的简写，将安装包信息加入到 devDependencies （开发阶段的依赖）

// -S：--save的简写，将安装包信息加入到 dependencies （生产阶段的依赖）

// -g：全局安装
npm install -g vue-cli

// 查看全局安装路径
npm root -g
```

## 淘宝镜像

```
// 永久设置npm安装源为淘宝镜像
npm config set registry https://registry.npm.taobao.org

// cnpm 安装
npm i -g cnpm --registry=https://registry.npm.taobao.org
```