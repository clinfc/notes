<?php

// 开启错误提示：php.ini => display_errors = On

// 错误类型：语法错误、执行错误、逻辑错误

//	--------------------------- 常见的错误类型 ---------------------------	//
//	值		常量					描述
//	1		E_ERROR				致命的运行时错误
//	2		E_WARNING			运行时警告（非致命错误）。仅给出提示信息，但是脚本不会终止运行
//	8		E_NOTICE			运行时通知。表示脚本遇到可能会表现为错误的情况
//	64		E_COMPILE_ERROR		致命编译时错误。类似 E_ERROR
//	2048	E_STRICT			启用 PHP 对代码的修改建议，以确保代码具有最佳的或操作性和向前兼容
//	8192	E_DEPRECATED		运行时通知。启用后将会对在未来版本中可能无法正常工作的代码给出警告
//	8191	E_ALL				所有错误和警告，除级别 E_ERROR 以外

// 错误级别配置
// 1、配置文件：php.ini => error_reporting = E_ALL
// 2、函数配置：error_reporting(~E_ALL & ~E_STRICT)
// 3、函数配置：set_error_handler


// 异常处理
class UserDefinedException extedns Exception
{
	# 处理代码
}

try {
	throw new UserDefinedException("错误提示信息", 1);
} catch (UserDefinedException $e) {
	# 获取错误文件
	$error_file = $e->getFile();
	# 获取错误代码
	$error_code = $e->getCode();
	# 获取错误行号
	$error_line = $e->getLine();
	# 获取错误信息
	$error_msg  = $e->getMessage();
} catch (Exception $e) {
	# 如果 Exception 位列 UserDefinedException 之前，也可接收到 UserDefinedException 抛出的错误，因为 UserDefinedException 继承了 Exception
} finally {
	# 无论有误异常，此段代码都将执行
}


/**
 * Deprecated：
 *	最低级的错误，表示系统不推荐，但是不影响正常使用
 *
 * Notice：
 *	通知级别的错误，不影响正常使用
 *
 * Warning：
 *	警告界别的错误，结果受影响
 *
 * Fatal error：
 *	致命级别的错误，程序中断
 *
 * Parse error：
 *	语法解析错误
 *
 * E_USER*：
 *	用户自定义错误
 */