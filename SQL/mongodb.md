
### 安装
[<kbd>MongoDB</kbd>](https://www.mongodb.com/download-center/community)
[<kbd>Robo 3T</kbd>](https://robomongo.org)

### 启动服务

手动启动
```
// --dbpath：数据存储的路径配置。配置的路径必须存在，否则将报错
mongod --dbpath E:/MongoDB/db
```
将MongoDB服务器作为Windows服务运行
```
// 安装服务
mongod --dbpath "E:/MongoDB/db" --logpath "E:/MongoDB/log/mongodb.log" --serviceName "mongodb" --serviceDisplayName "mongodb" --install
// 启动服务
net start mongodb
```
mongodb常用启动参数

参数|描述
:-|:-
--bind_ip|绑定服务IP，若绑定127.0.0.1，则只能本机访问，不指定默认本地所有IP
--logpath|定MongoDB日志文件，注意是指定文件不是目录
--logappend|使用追加的方式写日志
--dbpath|指定数据库路径
--port|指定服务端口号，默认端口27017
--serviceName|指定服务名称
--serviceDisplayName|指定服务名称，有多个mongodb服务时执行。
--install|指定作为一个Windows服务安装。

### MongoDB - 连接

#### 通过shell连接MongoDB服务

`localhost`为主机名，这个选项是必须的

```
mongodb://localhost
```

#### MongoDB连接命令格式

使用用户名和密码连接到`MongoDB`服务器，你必须使用 '`username:password@hostname/dbname`' 格式，'`username`'为用户名，'`password`' 为密码。

```
mongodb://admin:123456@localhost/test
```

#### 参数选项说明

标准格式：
```
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```
标准的连接格式包含了多个选项(options)，如下所示：

选项|描述
:-|:-
replicaSet=name|验证replica set的名称。 Impliesconnect=replicaSet.
slaveOk=true|在connect=direct模式下，驱动会连接第一台机器，即使这台服务器不是主。在connect=replicaSet模式下，驱动会发送所有的写请求到主并且把读取操作分布在其他从服务器。
slaveOk=false|在 connect=direct模式下，驱动会自动找寻主服务器. 在connect=replicaSet 模式下，驱动仅仅连接主服务器，并且所有的读写命令都连接到主服务器。
safe=true|在执行更新操作之后，驱动都会发送getLastError命令来确保更新成功。(还要参考 wtimeoutMS).
safe=false|在每次更新之后，驱动不会发送getLastError来确保更新成功。
w=n	|驱动添加 { w : n } 到getLastError命令. 应用于safe=true。
wtimeoutMS=ms|驱动添加 { wtimeout : ms } 到 getlasterror 命令. 应用于 safe=true.
fsync=true|驱动添加 { fsync : true } 到 getlasterror 命令.应用于 safe=true.
fsync=false|驱动不会添加到getLastError命令中。
journal=true/false|如果设置为 true, 同步到 journal (在提交到数据库前写入到实体中). 应用于 safe=true
connectTimeoutMS=ms|可以打开连接的时间。
socketTimeoutMS=ms|发送和接受sockets的时间。

### 数据增删

#### 创建数据库


命令|说明
:-|:-
`use DATABASE_NAME`|如果数据库不存在，则创建数据库，否则切换到指定数据库
`show dbs`|查看所有数据库
`db`|当前使用的数据库
`db.mongo.insert({"name": "李白"}) WriteResult({ "nInserted" : 1 })`|
`db.dropDatabase()  { "dropped" : "runoob", "ok" : 1 }`|删除数据库
`db.collection.drop()`|删除集合