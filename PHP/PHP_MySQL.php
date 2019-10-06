<?php

	//数据库初始化；指定PHP与浏览器交互的字符集
	header("Content-Type:text/html;charset=utf8");
		
	//连接数据库
	$link = mysqli_connect( localhost:3306|127.0.0.1|ip, username, password, database_name ) or die("数据库连接失败");

	//设置PHP与数据库引擎交互的字符集
	mysqli_query($link,"set names utf8");
	
	//构造SQL语句
	$sql = "select * from student";
	
	//发送并执行，返回一个结果
	$results = mysqli_query($link,$sql);
	
	//释放资源：关闭数据为链接
	mysqli_close($link);
	
	/*	
	sql语句分类
	 一类：create alter insert update delete	[执行成功，返回true的结果集；执行失败，返回false的结果集]
	 二类：select desc show		[执行成功，返回一个资源型的结果集（整理后才可用）；执行失败，返回false的结果集]
	*/
	
	//整理资源型结果集
	$row = mysqli_fetch_assoc($results);	//返回关联数组
	$row = mysqli_fetch_row($results);		//返回索引数组
	$row = mysqli_fetch_array($results);	//返回两种数组类型（索引、关联）
	$row = mysqli_fetch_array($results,MYSQLI_BOTH);	//返回两种数组类型（索引、关联）
	$row = mysqli_fetch_array($results,MYSQLI_ASSOC);	//返回关联数组
	$row = mysqli_fetch_array($results,MYSQLI_NUM);		//返回索引数组
	
	//记录指针移动
	mysqli_data_seek($results,num);		//num从0开始计数
	
	//受影响的记录条数
	mysqli_affected_rows($link);
	
	//获取刚写入记录的id号
	mysqli_insert_id($results);
	
	//释放资源：如果结果集是一个资源型结果集（布尔型不可用）
	mysqli_free_result($results);
	
	//统计资源集中记录的条数
	$num = mysqli_num_rows($results);
	
	//获取指定结果集中的字段总数
	$num = mysqli_num_fields($results);
	
	//获取结果集中指定字段的名称
	$name = mysql_field_name($results,0);
	
	//返回上次插入生成的id
	$num = mysqli_insert_id();8

	//保存数据是受到影响的地方及优先级
	//字段定义 > 数据表 > 数据库 > 数据库系统
	
	//显示字符集命令
	show charset;
	show variables like '%char%';
	
	character_set_client		//客户端想服务器发送数据采用的字符集
	character_set_connection	//客户端与服务器端链接时采用的字符集
	character_set_filesystem	//文件系统采用的字符集
	character_set_results		//结果集采用的字符集
	character_set_server		//服务器向客户端返回结果时采用的字符集
	character_set_system		//系统数据采用的字符集
	
	//字符集校对
	collate utf8_bin			//区分大小写
	collate utf8_general_ci		//不区分大小写
	
/*
	乱码
	》文档内容采用的编码方式
	》文件本身采用的编码方式
	》数据库采用的编码方式
	》PHP与浏览器交互的字符集
	》PHP与数据库引擎交互的字符集
*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
?>