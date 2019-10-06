<?php

 * 字符串
 
	> 字符串是一个标量：单值变量，需要定界符
	
		->	定界符
		
			=>	单引号：''	// 1、可以声明普通字符串；2、只能转义单引号和反斜线；3、不能解析变量
			=>	双引号：""	// 1、可以声明普通字符串；2、可以转义所有转义字符；3、能解析变量
			=>	heredoc		// 1、换行、空格将被保留；2、无需转义引号，适合打断HTML代码；
							// 3、可自动解析变量；4、heredoc/nowdoc与其他字符串拼接，结尾不要用分号
			=>	nowdoc
			
		->	字符串的增、删、改、查
		
			=>	$str = "www.uc123.com";
			
			=>	查
				echo $str[3];	// 数字 3 为索引，索引从 0 开始
				echo $str{3};	// 数字 3 为索引，索引从 0 开始
				
			=>	增
				$str[strlen($str)] = "/";
				$str{strlen($str)} = "/";
				
			=>	删
				$str[3] = '';	// 字符串长度不变
				
			=>	改				
				$str[3] = "n";
				$str{3} = "n";
				
	> 字符串处理函数
	
		=>	/* 截取字符串，返回子串
				> $str：被操作的字符串；
				> $start：开始索引；
				> $length：截取长度
			 */
			substr($str,$start,$length)		
		
		=>	/* 替换子串
				> $str：被操作的字符串；
				> $chars：用于替换的字符串
				> $start：开始索引；
				> $length：截取长度
			 */
			substr_replace($str,$chars,$start,$length)
			substr_replace($str,'',$start,$length)			// 插入式删除
			substr_replace($str,$chars,0,0)					// 在起始位置插入
			
		=>	/* 字符串替换
				> $search：被替换的字符串
				> $chars：用于替换的字符串
				> $str：被操作的字符串；
			 */
			str_replace($search,$chars,$str)
			
		=>	/* 查询子串出现的频率
				> $str：被操作的字符串；
				> $chars：被查询的子串
				> $start：开始索引；
				> $end：结束索引；
			 */
			substr_count($str,$chars[,$start,$end])
			
		=>	/* 字符串比较
				> $str1：主字符串
				> $chars：子字符串
				> $str_start：主串索引值，从主串该除与子串进行比较
				> $lenght：比较的长度
			 */
			substr_compare($str1,$chars[,$str_start,$lenght])
			
		=>	/* 子串检索，获取子串的索引值
				> $str：主字符串
				> $chars：子字符串
				> $start：起始索引
			 */
			strpos($str,$chars[,$start])		// utf8，出现中文时，一个中文占三个字节（索引）
			mb_strpos($str,$chars[,$start])		// utf8，多字节安全函数，一个中文占一个索引
			
		=>	/* 子串检索
				> $str：主字符串
				> $chars：子字符串
			 */
			strstr($str,$chars)					// 返回子串到结尾的中间所有内容
			strstr($str,$chars,true)			// 返回开始到子串的中间所有内容
			
		=>	/* 字符串填充
				> $str：主字符串
				> $lenght：如果值是负数，小于或者等于输入字符串的长度，不会发生任何填充，并会返回 input 
				> $chars：子字符串，用于填充的字符串
			 */
			str_pad($str,$length,$chars[,STR_PAD_RIGHT])	// 右侧填充
			str_pad($str,$length,$chars,STR_PAD_LEFT)		// 左侧填充
			str_pad($str,$length,$chars,STR_PAD_BOTH)		// 两侧填充
			
		=>	/* 字符重复
				> $str：重复的字符
				> $num：重复的次数
			 */
			str_repeat($str,$num)
			
		=>	/* 随机打乱
				> $str：被操作的字符串；
			 */
			str_shuffle$str)
			
		=>	/* 计算字符串长度
				> $str：被操作的字符串；
			 */
			strlen($str)			// utf8，出现中文时，一个中文占三个字节（索引）
			mb_strlen($str)			// utf8，多字节安全函数，一个中文占一个索引
			mb_strwidth($str)		// 将所有的多字节文字全部按照 2字节 处理
			
		=>	/* 字符串分割：返回数组
				> $chars：用于分割的字符，主串中的该部分将被切掉，返回的数组中的所有字符将不包含该字符
				> $str：被操作的字符串；
			 */
			explode($chars,$str)
			
		=>	/* 字符串组合：基于数组，返回字符串
				> $chars：用于连接的字符，将添加到返回的字符串中
				> $array：被操作的数组
			 */
			implode($chars,$array)
			
		=>	// 大小写转换
			strtolower($str)	// 转换为小写
			strtoupper($str)	// 转换为大写
			
		=>	// 字符串转时间戳
			date_default_timezone_set()		// 设置默认时区
			strtotime('2017-10-10')
			
		=>	// 千位分隔符
			number_format(138238948934)
			number_format(138238948934.334, 2)		// 保留两位小数位
			number_format(138238948934.334,'*','#')	// 自定义小数点为*，自定义千位符为#
			
		=>	// 字符串过滤
			trim($str)					// 去掉首尾(两边)空格
			ltrim($str)					// 去掉首(左边)空格
			rtrim($str)					// 去掉尾(右边)空格
			strip_tags($str)			// 去掉HTML标签
			strip_tags($str,'<h1>')		// 去掉除<h1>以外的HTML标签
			
		=>	// 字符串转码
			htmlspecialchars($str)		
			htmlspecialchars_decode($str)
			
		=>	// json
			json_encode($arr/$obj)		// 将数组或对象转换为json格式的字符串
			json_decode($str)			// 将json格式的字符串转换为PHP对象