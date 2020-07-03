
### node 安装 (linux)

```
cd /usr/local
wget https://nodejs.org/dist/v8.11.4/node-v8.11.4-linux-x64.tar.xz 
tar -xvf node-*** node

vim /etc/profile
export PATH=$PATH:/usr/local/node/bin
source /etc/profile
// 或
ln -s /usr/local/node/bin/node /usr/local/bin/node
ln -s /usr/local/node/bin/npm /usr/local/bin/npm
```
	
### 安装 vue-cli

```
npm install -g @vue/cli
cnpm i -g @vue/cli
yarn global add @vue/cli
```

### 启动 vue-ui
```
vue ui
// 或
yarn serve
```
	
### 创建 vue 项目

```
vue create fremall
```
  
### 添加 element 组件库

```
vue add element
```
