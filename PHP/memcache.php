<?php

/*
	使用场景：
		1、非持久化存储：对数据存储要求不高
		2、分布式存储：不适合单机使用
		3、key/value存储：格式简单，不支持list、array数据存储
		
	服务端安装：
		yum memcached
		
	客户度安装：
		1、安装 libmemcached
		2、安装 PHP 扩展
		
	命令：
		启动服务：
			memcached -d -l 127.0.0.1 -p 11211	-m 150 -u root
				-d：以守护进程的方式启动
				-l：服务的IP地址
				-m：给服务分配的内存大小为 150M
				-u：启动服务的用户
				
		查看服务状态：
			ps -ef | grep memcach
			
	PHP中使用Memcache
		系统类：addServer、addServers、getStats、getVersion
		数据类：add、set、delete、flush、replace、get、increment、decrement
		进阶类：setMulti、deleteMulti、getMulti、getResultCode、getResultMessage
*/

// 实例化 memcached
$cache = new Memcached();		

// 添加单台服务器
$cache -> addServers('127.0.0.1', 11211);

// 添加多台服务器
$cache -> addServers([
	['127.0.0.1', 11211],
	['127.0.0.2', 11211]
]);

// 获取服务器状态
$array = $cache -> getStats();
$array = $cache -> getVersion();

// 数据添加
$cache -> add('key', 'value', 60);		// 数据将在 60s 后失效

// 数据重写
$cache -> replace('key', 'val', 60);	// 使用 add 多次添加同一个键，其值不会被覆盖

// 数据添加/重写
$cache -> set('key', 'value', 60);		// 该键不存在，添加数据；该键存在，重写该数据

// 数据删除
$cache -> delete('key');				// 清除单项数据
$cache -> flush();						// 清除所有数据

// 数据获取
$result = $cache -> get('key');

// int数据
$cache -> increment('key', 5);			// 每次对该 int 数据的值增加 5，相当于 $i += 5;
$cache -> decrement('key', 5);			// 每次对该 int 数据的值减去 5，相当于 $i -= 5;


// 数据添加 - 批量
$cache -> setMulti([
	'key1' => 'value1',
	'key2' => 'value2'
], 60);

// 数据获取 - 批量
$array = $cache -> getMulti(['key1', 'key2']);	// 返回关联数据

// 数据删除 - 批量
$cache -> deleteMulti(['key1', 'key2']);

// 获取上次操作结果的编码
$result = $cache -> getResultCode();

// 获取上次操作结果的信息
$result = $cache -> getResultMessage();


// 自定义封装
class Cache {
	public function server($data) {
		if(count($data) == count($data, 1)) {
			// 如果传入的是一维数组
		} else {
			// 如果传入的不是一维数组
		}
	}
	public function set($k, $v, $t = null) {
		if($t === null) {
			$t = $this -> time;
		}
		$this -> cache -> set($k, $v, $t);
		if($this->cache->getResultCode()) {
			return $this -> getError();
		}
	}
	public function cache($key, $val, $time) {
		// 获取传递给当前用户定义函数的参数的个数
		$num = func_num_args();
		if($num == 1) {
			// get
		} elseif($num >= 2) {
			if($val) {
				// set
				$this -> set($k, $v, $t);
			} else {
				// delete
			}
		}
	}
	public function getError() {
		if($this->error) {
			return $this -> error;
		} else {
			return $this -> cache -> getResultMessage();
		}
	}
}
