<?php

【查找字符】
strstr('index.php', '.', [false])		// 查找字符串的首次出现【返回第一次“.”处开始至末尾内容，否则返回false】【区分大小写】【为true则返回“.”之前的内容】
stristr('index.php', '.', [false])		// 查找字符串的首次出现【返回第一次“.”处开始至末尾内容，否则返回false】【不区分大小写】【为true则返回“.”之前的内容】
strrchr('index.php', '.')				// 查找指定字符在字符串中的最后一次出现【返回“.”至末尾内容，否则返回false】
strpos('index.php', '.', [offset])		// 查找字符串首次出现的位置 【区分大小写】
stripos('index.php', '.', [offset])		// 查找字符串首次出现的位置【不区分大小写】
strrpos('index.php', '.', [offset])		// 计算指定字符串在目标字符串中最后一次出现的位置【区分大小写】 
strripos('index.php', '.', [offset])	// 计算指定字符串在目标字符串中最后一次出现的位置【不区分大小写】

【字符串替换】
substr_replace('x.p', '.', start[, len])// 替换字符串的子串 

【字母大小写转换】
lcfirst($str)							// 如果str的第一个字符是字母，则将其转换为小写
ucfirst($str)							// 如果str的第一个字符是字母，则将其转换为大写 
strtolower($str)						// 将 str 中所有的字母字符转换为小写
strtoupper($str)						// 将 str 中所有的字母字符转换为大写
ucwords($str)							// 将 str 中每个单词的首字符（如果首字符是字母）转换为大写【这里单词的定义是紧跟在空白字符（空格符、制表符、换行符、回车符、水平线以及竖线）之后的子字符串】
mb_convert_case($str, $mode[, 'UTF-8'])	// 对一个 string  进行大小写转换，转换模式由 mode 指定【mode类型：MB_CASE_UPPER 、 MB_CASE_LOWER、MB_CASE_TITLE 】
mb_strtolower($str[, 'UTF-8'])			// 使 str 小写【和 strtolower()  不同的是，“字母”是通过 Unicode 字符属性来确定的。因此不会受语言环境（locale）设置影响】
mb_strtoupper($str[, 'UTF-8'])			// 使 str 大写【和 strtoupper()  不同的是，“字母”是通过 Unicode 字符属性来确定的。因此不会受语言环境（locale）设置影响】

【String <=> Array】
str_split($str[, len])					// 【return array】【if len < 0 return false】
explode('.', 'index.php'[, limit])		// 【return array】【if str == '' return false】【if non-existent str && limit < 0 return empty array】【不含切割符】
implode('.', $arr)						// 将一个一维数组的值转化为字符串 


【Array】
array_keys(arr[, search_val, strict])	// 【获取键】【return part or all arr_key】【search_val：return the arr_key contain search_val】【strict ? === : ==】
array_values(arr)						// 【获取值】【return all arr_value】
array_combine(key_arr, val_arr)			// 【创建数组】【return array or false】【if count(key_arr) != count(val_arr) return false】
array_merge(arr[, arr])					// 【数组合并】【键名相同：覆盖】【一个数字索引数组：重新索引】
array_replace(arr, arr[, arr])			// 【数组替换】【if exist key replace val; else add k=>v】【error: return null】
array_key_exists(key, arr)				// 【return true or false】【检索是否存在指定键名】


【Array：压栈】
array_unshift($arr, $val[,...])			// 在数组开头插入一个或多个单元 【注意单元是作为整体被插入的，因此传入单元将保持同样的顺序】
array_push($arr, $val[,...])			// 将传入的变量压入 array 的末尾【如果只增加一个元素，建议用 $arr[] = $val】【返回处理之后数组的元素个数】

【Array：弹栈】
array_shift($arr)						// 将数组开头的单元移出数组，将 array 的长度减一并将所有其它单元向前移动一位【数字键名将改为从零开始计数，文字键名将不变】【如果 array 为空（或者不是数组）将返回 NULL】
array_pop($arr)							// 将数组最后一个单元弹出（出栈，并将数组 array 的长度减一【如果 array 为空（或者不是数组）将返回 NULL】

【Array：排序】
sort()									// 【return true or false】【升】【值】【索引保持：否】
rsort()									// 【return true or false】【降】【值】【索引保持：否】
asort()									// 【return true or false】【升】【值】【索引保持：是】
arsort()								// 【return true or false】【降】【值】【索引保持：是】
ksort()									// 【return true or false】【升】【键】【索引保持：是】
krsort()								// 【return true or false】【降】【键】【索引保持：是】
shuffle()								// 【return true or false】【随机】【值】【索引保持：否】
natsort()								// 【return true or false】【自然】【值】【索引保持：是】【敏感：是】
natcasesort()							// 【return true or false】【自然】【值】【索引保持：是】【敏感：否】

















