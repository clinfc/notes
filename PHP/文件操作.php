<?php

mkdir('./aa/新建文件夹', 777, true);	// 创建文件夹
rmdir()									// 删除文件夹

rename('./a', './b')					// 重命名文件夹
rename('./a', './b/a')					// 移动文件夹
rename('./a', './b/c')					// 移动并重命名文件夹
copy('./a', '../c')						// 拷贝文件

$arr = scandir($path)					// 读取文件夹【返回数组】
$arr = glob($path)						// 读取文件夹【返回数组】

$fp = opendir($path)					// 打开文件夹
$fo = readdir($fp)						// 读取文件夹
while($fo = readdir($fp)){				// 遍历文件、文件夹
	echo $fo;
}
closedir()	// 关闭文件夹
is_dir()	// 判断是否是文件


file_put_contents('./test.text', $str)	// 讲内容写进文件中【创建-写入-关闭】
file_get_contents('./test.text')		// 读取文件内容【打开-读取-关闭】


$fp = fopen()				// 打开文件或路径【返回文件指针】
$fp = fopen('a.text', 'r')	// 【只读】【文件不存在时报错】
$fp = fopen('a.text', 'r+')	// 【读写】【文件不存在时报错】
$fp = fopen('a.text', 'w')	// 【替换 - 只写】【文件不存在时新建】
$fp = fopen('a.text', 'w+')	// 【替换 - 读写】【文件不存在时新建】
$fp = fopen('a.text', 'a')	// 【追加 - 只写】【文件不存在时新建】
$fp = fopen('a.text', 'a+')	// 【追加 - 读写】【文件不存在时新建】
$fp = fopen('a.text', 'x')	// 【创建 - 只写】【文件存在时报错】
$fp = fopen('a.text', 'x+')	// 【创建 - 读写】【文件存在时报错】
$size = filesize($path)		// 获取文件大小
fgets($fp)					// 读取一行，文件指针下移
fgetc($fp)					// 读取一个字节。一个中文三个字节
fread($fp, $size) 			// 文件二进制读取
feof($fp)					// 判断文件指针是否在末尾
while(feof($fp){			// 遍历文件内容
	echo $fgets($fp)
}
fseek($fp, 0)				// 移动文件指针到0
fputs($fp, $str)			// 向文件中写入一行
fclose($fp)					// 关闭文件

is_file()					// 判断是否为文件
file_exists()				// 判断文件夹或文件是否存在
unlink()					// 删除文件