>### 连接客户端

命令|说明
:-|:-
`redis-cli`|连接本地的Redis服务
`redis-cli -h 127.0.0.1 -p 6379 -a password`|连接主机：127.0.0.1，端口号：6379，密码：password

>### 键

命令|说明
:-|:-
`DEL key`|在 key 存在时删除 key
`DUMP key`|序列号给定 key 的值。如果 key 不存在，返回 nil
`EXISTS key`|检查 key 是否存在，存在返回 1，否则返回 0
`EXPIRE key 60`|设置 key 的过期时长（单位：秒）。设置成功返回 1，否则返回 0 。
`EXPIREAT key timestamp`|设置 key 的过期时间（时间戳）
`PEXPIRE key 1500`|设置 key 的过期时长（单位：毫秒）
`PEXPIREAT key m-timestamp`|设置 key 的过期时间（毫秒 = 时间戳 * 1000）
`KEYS pattern`|查找所有符合 pattern 的 key
`MOVE key db`|将 key 移动到 db 数据库中
`PRESIST key`|移除 key 的过期时间，key 将永不过期
`TTL key`|获取 key 的剩余过期时间（单位：秒）。不存在：-2，已到期：-1，未设置：OK
`PTTL key`|获取 key 的剩余过期时间（单位：毫秒）。不存在：-2，已到期：-1，未设置：OK
`RANDOMKEY`|随机获取数据库中的一个 key
`RENAME oldk newk`|修改 key 的名称。成功返回 OK，否则返回一个 error
`RENAMENX oldk newk`|newk 不存在时，修改 oldk 为 newk。成功返回 1，否则返回 0
`TYPE key`|返回 key 的值的类型
`SCAN cursor`|

>### 字符串

命令|说明
:-|:-
`SET key value`|设置/修改 key 的值为 value
`GET key`|获取 key 的值。key不存在返回 nil。key不是字符串，那么返回一个错误
`GETSET key value`|设置 key 的值并返回旧值。key不存在返回 nil；key存在但不是字符串，返回错误
`GETRANGE key start end`|获取 key 值中的子字符串，截取范围 start ~ end （包含start、end）
`SETBIT key offset value`|对 key 所储存的字符串值，设置或清除指定偏移量上的位(bit)
`GETBIT key offset`|
`MSET key value key value`|同时设置一个或多个 key-value 对
`MGET key [key...]`|获取一个或多个 key 的值
`SETNX key value`|key 不存在时，设置 key 值为 value
`MSETNX key value key value`|同时设置一个或多个 key-value 对（当 key 不存在时设置）
`SETEX key timeout value`|设置 key 的 过期时长（秒） 和 value
`PSETEX key timeout value`|设置 key 的 过期时长（毫秒） 和 value
`SETRANGE key offset value`|用 value 覆盖 key 的值，从 offset 处开始覆盖
`STRLEN key`|返回 key 值的长度。key值不为字符串，返回一个错误
`INCR key`|将 key 中储存的数字值增一。key不存在，先赋值为0，再incr操作。key值类型不为number，返回错误。
`INCRBY key number`|将 key 中储存的数字值加上增量值。key不存在，先赋值为0，再incr操作。key值类型不为number，返回错误。
`INCRBYFLOAT key float`|将 key 中储存的数字值加上float增量值
`DECR key`|将 key 中储存的数字值减一
`DECRBY key number`|
`APPEND key value`|如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾。

>### 哈希

Redis hash 是一个 string 类型的 field 和 value 的映射表，hash 特别适合用于存储对象。

Redis 中每个 hash 可以存储 232 - 1 键值对（40多亿）。

命令|说明
:-|:-
`HEXISTS key field`|查看哈希表的指定字段是否存在。
`HDEL key field [field...]`|删除哈希表 key 中的一个或多个指定字段，不存在的字段将被忽略。
`HSET key field val`|将哈希表 key 中的字段 field 的值设为 value 
`HSETNX key field val`|只有在字段 field 不存在时，设置哈希表字段的值。
`HGET key field`|获取哈希表中指定字段的值。
`HGETALL key`|获取在哈希表中指定 key 的所有字段和值
`HINCRBY key field increment`|为哈希表 key 中的指定字段的整数值加上增量 increment 。
`HINCRBYFLOAT key field increment`|为哈希表 key 中的指定字段的浮点数值加上增量 increment 。
`HKEYS key`|获取所有哈希表中的字段（field）
`HLEN key`|获取哈希表中字段（field）的数量
`HMSET key field val field val`|同时将多个 field-value (域-值)对设置到哈希表 key 中。
`HMGET key field [field...]`|获取哈希表中，一个或多个给定字段（field）的值。如果field不存在，则该field返回一个 nil 值。
`HAVLS key`|获取 key 中的所有 field 的值。 当 key 不存在时，返回一个空表。
`HSCAN key cursor [MATCH pattern] [COUNT count]`|迭代哈希表中的键值对。