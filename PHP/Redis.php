<?php

// Redis是远程的、是基于内存的、是菲关系型数据库

// Redis的应用场景：缓存、队列、数据存储（硬盘持久化机制）

// Redis安装
wget http://download.redis.io/releases/redis-5.0.4.tar.gz
tar xzf redis-5.0.4.tar.gz
cd redis-5.0.4
make
sudo make install
// 自定义配置
cp redis.conf /usr/local/redis/redis.conf
redis-server /usr/local/redis/redis.comf


/*Redis数据类型

 * 数据类型		存储的值				读写能力
 
 * string		string、int、float		对字符串操作、对正式类型加减
 
 * list			一个序列集合且每个		序列两端推入或弹出元素修剪、
				节点都包好了一个元素	查找或移除元素
				
 * set			各不相同的元素			聪集合中插入或删除元素
 
 * hash			有键值对的散列祖，其	按照键进行增删
				中键是字符串，值是元素
				
 * sort set		带分数的score-value有	集合增删，按照分数范围查找
				序集合，起重score为浮
				点，value为元素
 */
 
 
 // Redis-string类型操作：
 set str1 stringval		// 设置string类型
 get str1				// 获取string类型
 set str2 4
 incr str2				// string类型自增操作
 decrby str2 2			// string类型减2操作 
 
 // Redis-list类型操作：
 lpusth lists 12		// 推入操作
 lpusth lists 13		// 推入操作
 rpop lists				// 推出操作
 llen lists				// 查看元素个数
 
 // Redis-set类型操作：
 sadd sets 12			// 插入元素
 scard sets				// 查看元素个数
 sismember sets 12		// 判断12是否在sets中
 srem sets 12			// 删除元素12
 
 // Redis-hash类型操作：
 hset hashs k1 12		// 插入元素
 hget hashs k1			// 获取元素
 hmget hashs k1 k2		// 获取多个元素
 
 // Redis-sortSet类型操作：
 zadd zsets 10.1 value	// 插入元素
 zcard zsets			// 查看元素个数
 zrange zsets 0 2 withscores	// 打印排名0-2的排名元素
 
 
 php -m					// 查看PHP安装的扩展
 php --ini				// 查看 php.ini 存放位置
 yum install php-devel	// 安装PHP扩展开发包
 
 // PHP Redis扩展安装（需要已安装 phpize 和 php-config ）
 unzip develop.zip
 phpize
 ./configure --with-php-config=/usr/bin/php-config
 make 
 make install
 vim php.ini [extension=redis.so]