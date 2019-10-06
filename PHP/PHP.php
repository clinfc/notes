注：用notepad++查看，记事本打开会格式混乱，不利于查看。

	
	什么是PHP：
		以前：personal home page		个人网页
		现在：hypertext preprocessor  	超文本预处理器
		
	PHP优势：
		1、开放源代码
		2、完全免费
		3、跨平台
		4、对硬件配置要求低
		
	PHP标签：
		标准标签：<?php code ?>
		短标签：<? code ?>
		ASP标签：<% code %>
		script标签：<script language="php"> code </script>
		
	php的注释：
		单行注释：//
		多行注释：/**/
		
	PHP与浏览器较好的字符集：
		<?php header("Content-Type:text/html;charset=UTF8"); ?>
		<mate http-equiv="content-type" content="text/html;charset=utf8"/>
	
	变量的作用域：（函数见307行）
		1、局部变量：在函数体内声明的变量。在函数体外不能访问。
			》静态局部变量：
				> 概念：在函数体内声明的以关键字 “static” 修饰的局部变量
				> 作用：统计函数被访问的次数
				eg：<?php 
					function nums(){
						static $num = 0;
						$num++;
						echo '你被调用了：'.$num.'次<br/>';
					}
					nums();	 ==输出结果==>	你被调用了：1次
					nums();	 ==输出结果==>	你被调用了：2次
					nums();	 ==输出结果==>	你被调用了：3次
					?>
		2、全局变量：在函数体外声明的变量。在函数体内不能访问。
			》借助预定义变量 “$GLOBALS” 在函数体内访问全局变量。
				eg：<?php 
					$name = "李白";
					function t(){
						$name = $GLOBALS["name"];
						echo $name;
					}
					t(); ?>
			》借助关键字 “global” 在函数体内访问全局变量。
				eg：<?php 
					$name = "李白";
					function t(){
						global $name;
					}
					t(); ?>
		3、超级全局变量：$_POST，$_GET特征，在函数体内外都可以访问。
			eg：<?php 
				$_POST["name"] = "李白";
				$_GET["age"] = 15;
				function data(){
					echo $_POST["name"];
				}
				echo $_GET["age"]; ?>
		
	变量分类：（变量本质上代表几个连续的存储单元）
		自定义变量、预定义变量
	
	自定义变量：
		变量的语法：$name = value;
		变量的功能：将输入的数据存储起来（程序代码做三件事：输入数据、出来数据、输出数据）
			注：变量的值是具体的值；变量名与变量值之间的关系叫引用
		变量的命名：
			》区分大小写，尽量使用小写
			》变量名由字母、数字、下划线组成，不能以数字开头
			》变量名要见名知意
			》多单词的变量名表达方式有：
				> 大驼峰：每个单词首字母大写
				> 小驼峰：第一个单词首字母小写，其他单词首字母大写
				> 用下划线连接每个单词
		变量的作用：
			在内存中开辟存储单元，把输入的数据存储起来
		变量的操作：
			增：声明新变量
			删：将分配给变量的内存单元回收
				（语法：unser($name)）
			改：让变量名指向新的引用
			查：读取变量值
				（三种方式：echo $name；var_dump($name)；print_r($name)）
		变量的赋值：
			1、传值赋值
				》变量名分别指向自己的存储单元，一个变量值的修改不会影响到另一个变量
				》语法：$name1 = $name
					（“=”在此次为赋值运算；先将右侧的值读取出来，然后写到左侧的变量中去）
			2、引用赋值
				》两个变量指向同一个存储单元一个变量的值改变将影响另一个变量的值
				》语法：$name1 = & $name
		可变变量：
			将变量值当变量名用
			eg：$name='number';
				$$name=1000;	（$$name相当于$number）
				echo $number;	（输出的值为1000）
	
	预定义变量：系统已经定义好的变量
		$_GET		一是接收地址参数，二是接收 method=get 的表单控件数据
		$_POST		接收 method=post的 表单数据
		$_REQUEST = $_GET + $_POST
		$_SERVER	客户端和服务器端的信息
		$_ENV		环境信息
		$_ESSION	处理session数据
		$_COOKIE	处理cookie数据
		$_FILES		接收文件
		$LOBALS		全局变量5
	
		$_GET：
			语法：$_GET["地址参数|表单控件名"]
			功能：接收地址参数或接收method=get表单控件数据
			eg：一个参数
				<a href="*.php?number=23"></a>
				<?php $number=$_GET["number"] ?>
			eg：两个及多个同名参数（地址名后面加[]，调用使用var_dump）
				<a href="*.php?name[]=xl&name[]=12"></a>
				<?php $name=$_GET["name"]; var_dump($name); ?>
			eg：接收method=get表单数据
				<form method="get" action="*.php">
					<input type="text" name="username" />
					<input type="password" name="pwd" />
					<input type="submit" value="提交" />
				</form>	
				<?php 
					$name=$_GET["username"];
					$pwd=$_GET["password"];
					echo $name;
					echo $pwd;
				?>
			eg：复选框接收method=get表单数据（在name的属性的值后面加[]）
				<form method="get" action="*.php">
					<input type="checkbox" name="hobby[]" value="fruit" />水果
					<input type="checkbox" name="hobby[]" value="read" />阅读
					<input type="checkbox" name="hobby[]" value="game" />游戏
					<input type="checkbox" name="hobby[]" value="play" />运动
					<input type="submit" value="提交" />
				</form>	
				<?php 
					$hobby=$_GET["hobby"];
					var_dump($hobby);
				?>
			eg：下拉菜单接收method=get表单数据（在下拉菜单的name属性的值的后面加[]）
				<form method="get" action="*.php">
					<select name="xueli[]" multiple="multiple">
						<option value="1">初中</option>
						<option value="2">高中</option>
						<option value="3">专科</option>
						<option value="4">本科</option>
					</select>
					<input type="submit" value="提交" />
				</form>	
				<?php 
					$xueli=$_GET["xueli"];
					var_dump($xuelei);
				?>
		$_POST：
			语法：$_POST["表单控件名"]
			功能：接收method=post表单控件数据
			eg：<form method="post" action="*.php">
					<input type="text" name="username" />
					<input type="password" name="pwd" />
					<input type="submit" value="提交" />
				</form>	
				<?php 
					$name=$_POST["username"];
					$pwd=$_POST["password"];
					echo $name;
					echo $pwd;
				?>
		$_REQUEST = $_GET + $_POST		
			语法：	$_REQUEST["地址参数|表单控件名"]
			eg：<form method="post" action="*.php?sex=男">
					<input type="text" name="username" />
					<input type="password" name="pwd" />
					<input type="submit" value="提交" />
				</form>	
				<?php 
					$sex=$_REQUEST[sex];			
					$name=$_REQUEST["username"];	
					$pwd=$_REQUEST["password"];
					echo $sex;
					echo $name;
					echo $pwd;
				?>	
		$_SERVER：
			$_SERVER['HTTP_HOST']		[请求的域名]
			$_SERVER['REMOTE_ADDR']		[正在浏览当前页面的IP地址]
			$_SERVER['SERVER_ADDR']		[服务器端的IP地址]
			$_SERVER['DOCUMENT_ROOT']	[站点的绝对地址]
			$_SERVER['PHP_SELF']		[当前运行的脚本（文件）]
		
	常量：
		概念：本质上代表值不可以改变几个连续的存储单元
		语法：define("name","value")（当值为数字的时候不加引号）
			eg：define("PI",3.14);
				echo PI;
			eg：difine('^_^',"笑脸");（使用特殊字符命名常量）
				echo constant('^_^');
		操作：
			增：define("name","value")
			删：常量不能删除
			改：常量值不可更改
			查：echo name
		判断常量是否定义：
			define("name");	返回值为 1（已定义）或 无返回值（未定义）
		预定义常量：
			PHP_VERSION		PHP版本
			PHP_OS			操作系统
			PHP_INT_MAX		整型值的最大取值
		魔术常量：	
			__LINE__		当前光标所在的行号
			__DIR__			当前运行文件的路径
			__FILE__		当前运行文件
			
	数据类型：
		标准型：整型（int）、浮点型（float）、字符串型（String）、布尔型（Boolean)
		复合型：对象、数组
		特殊类型：资源型、null
			
		整数的表达方式：十进制、八进制（以0开头）、十六进制（以0x开头）
			进制转换：
				bindec(number)	（二转十）
				decbin(number)	（十转二）
				decoct(number)	（十转八）
				dechex(number)	（十转十六）
				base_convert("number",进制1,进制2)	（进制1转换成进制2。eg：base_convert("32",10,8)）
			
		小数：
			1、小数有14位有效数字
			2、支持8字节的双精度数
			3、计数法
				》标准计数法：1356466
				》科学计数法1.35e3=1.35*10³
			
		布尔变量的定义：
			1、直接赋值为true或false
			2、关系运算和逻辑预算结果赋值
			3、0、0.0、""、空数组、null这六个值表示false，其余值全部为true
			
		字符串：
			1、PHP中没有字符类型，只有字符串类型
			2、字符串变量的定义
				》用单引号括起来的字符串赋值的变量（$name='智障'）
				》用双引号括起来的字符串赋值的变量（$name="渣渣"）
				》用 heredoc 方式赋值的变量
					$name = <<<abc  开始定界符
						value 
					abc;	结束定界符																>
				》用 nowdoc 方法赋值的变量
					$name = <<<'bc' 开始定界符
						value 
					bc;		结束定界符																>
				注：>单引号和双引号是单行赋值，heredoc 和 nowdoc 是多行赋值
					>双引号和 heredoc两种方式可以解析变量（解析变量：将变量值读出来）
					>heredoc 和 nowdoc 的开始定界符和结束定界符必须一致；结束定界符要顶格，以分号结束
				
		关系运算符：
			==		存在数据类型的隐式转换
			!=
			===		全等，数据类型与值必须完全一致
			!==		只是值或数据类型中的任意一个不一致就是不全等
				
		屏蔽错误运算符：@(表达式)		
				
	替换语法：
	  ----------------------------------------
		if(){				if:
			statement;	==>		statement;
		}					endif;
	  ----------------------------------------
		switch(){			switch():	
			statement;	==>		statement;	
		}					endswitch;
	  ----------------------------------------
		while(){			while():	
			statement;	==>		statement;	
		}					endwhile;	
	  ----------------------------------------
		for(){				for():
			statement;	==>		statement;
		}					endfor;
		
	文件包含路径：
		include("路径");	文件包含，遇到致命错误，脚本不会终止
		require("路径");	包含文件，遇到致命错误，脚本终止
		include once("路径");	文件加载前，检测文件是否已包含
		require once("路径");	文件加载前，检测问价是否已包含
		注：在动态页面中，“./” 加或不加是有区别的，但在静态页面中无区别
			
	函数：
		概念：将功能代码封装在一起的形式
		分类：自定义函数、预定义函数
				
		自定义函数：
			|-------------------------------|-------------------------------|	
			|	声明语法：					|	调用语法：					|
			|-------------------------------|-------------------------------|	
			|	function name([形参]){		|								|
			|		功能代码;				|	name([实参]);				|
			|	}							|								|
			|-------------------------------|-------------------------------|
			|	function name([形参]){		|								|
			|		功能代码;				|	$name1 = name([实参]);		|
			|		return value;			|								|
			|	}							|								|
			|-------------------------------|-------------------------------|		
			|	function name(形参=参值){	|	$name1 = name();  无参		|	function data($name="李白",$age=10){}
			|		功能代码；				|	$name1 = name(部分参值);	|	
			|		return value1;			|	$name1 = name(全部参值);	|
			|	}							|								|
			|-------------------------------|-------------------------------|	
			参数传值方式：（与变量的赋值类似，变量赋值在第92行）
				数值传值：
					实际参数和形式参数指向各自的存储单元，形式参数修改不会影响实际参数的值
				引用传值：
					实际参数和形式参数指向同一个存储单元，形式参数的修改将影响实际参数的值
					用法：在形参前面加上“&”符号
					eg：<?php 
						function exchange(&$a,&$b){
							$c = $a;
							$a = $b;
							$b = $c;
						}
						$num1 = 100;
						$num2 = 200;
						exchange($num1,$num2);
						echo "num1=".$num1."<br/>"."num2=".$num2; ?>
		
		通过变量调用函数：
			eg：<?php 
				function disname($name,$age){}
				$dis = "disname";
				$dis("李白",65); ?>
		
		匿名函数：
			没有函数名，直接将函数体赋值给一个变量，也是通过变量直接调用函数。
			eg：<?php 
				$dis = function($name,$age){};（此处以分号结束）
				$dis("李白",65); ?>	
				
	递归：
		概念：函数自己调用自己。
		特征：
			1、递归的规模呈缩小趋势
			2、递归中前一次的输出是为下一次的输入做准备的。
			3、当规模达到最小是，将不再递归，直接给出答案。递归是有条件的，无条件的递归将形成死循环。
		eg：<?php 
			//输出1、2、3（注：递归类似于循环，可以用循环的思路理解递归）
			function digui($i){
				echo $i.'、';
				$i++;
				if($i<=3){
					digui($i);
				}
			}	
			digui(1); ?>
		eg：<?php 
			//输出4、3、2（注：此案例中的参数传值方式为“数值传值”。参数传值方式详见320行）
			function digui($i){
				$i++;
				if($i<=3){
					digui($i);
				}
				echo $i.'、';
			}
			digui(1); ?>
		eg：<?php 
			//九九乘法表
			function cfb($i){
				for($j=1;$j<=$i;$j++){
					echo "$j*$i=".$j*$i."$nbsp;";
				}
				echo "<br/>";
				$i++;
				if($i<=9){
					cfb($i);
				}
			}
			cfb(1); ?>	
				
	数组：
		概念：表面上就是多个数据存储在一块，本质上代表是护短连续的存储单元
		分类：索引数组（键名是数字）、关联数组（键名是字符串）
		语法：
			$name = array("value"|number,...)
				eg：<?php $date = array("李白",20); ?>
			$name = array("键名"=>"键值",...)（键名可以是整数、小数、负数、表达式、常量）
				eg：<?php 
					define("name","杜甫");//声明常量
					$date = array("李白"=>20, 2=>0, 0.9=>30, -9=>"lsi", name=>203);
					?>
		数组元素的访问：
			$name[键名|索引]		（如果键名是字符串要加双引号，若果为数字则不加双引号）
		二维数组：
			eg：<?php 
				//二维数组的声明
				$a1 = array(
					array(),
					array(),...
				)
				$a2 = array(
					"s"=>array(), 
					2=>array(),...
				)
				//二维数组的调用
				var_dump($a1[1]);
				var_dump($a1[1][2]);
				var_dump($a2["s"][...]) ?>
		数组元素的操作：
			<?php 
			//一维数组
				$a1 = array("李白",83,"女");
				$a2 = array("name"=>"李白","age"=>83,"sex"=>"女");
				//增
				$a1[3] = "重庆";
				$a2["site"] = "重庆";
				//删
				unset($a1[2]);
				unset($a2["age"]);
				//改
				$a1[0] = "杜甫";
				$a2["name"] = "杜甫";
			//二维数组
				//增
				$a1[索引|键名] = array(...);
				$a1[索引|键名][索引|键名] = "value";
				//删
				unset($a1[索引|键名]);
				unset($a2[索引|键名][索引|键名]);
				//改
				$a1[索引|键名] = array(...);
				$a1[索引|键名][索引|键名] = "value";
			?>	
		foreach遍历数组：
			<?php
			//一维数组
				$a2 = array("name"=>"李白","age"=>83,"sex"=>"女");
				//中括号里的内容可以省略（其中$name和$value随意命名，无特殊含义）
				foreach($a2 as [$name =>] $value){
					echo [$name."=>"].$value;
					echo "<br/>";
				}	
			//二维数组
				//方法一
				foreach($a as [$name =>] $value){
					[echo $name."<br/>";]
					var_dump($value);
				}
				//方法二
				foreach($a as [$name =>] $value){
					[echo $name."<br/>";]
					foreach($value as [$n =>] $v){
						echo [$n."=>"].$;
						echo "<br/>";
					}
				}
			?>	
		指针遍历数组：
			1、current
				语法：current($array_name);
				功能：抓取当前数组指针指向的数组元素的键值。
			2、key
				语法：key($array_name);
				功能：抓取当前数组指针指向的数组元素的键名。
			3、next
				语法：next($array_name);
				功能：向下移动数组指针，每运动一次就移动一次。
				eg：<?php
					$arr = array("liba","iej",68,46);
					for($i=0;$i<count($arr);$i++){
						echo key($arr)."=>".current($arr);
						next($arr);
						echo "<br/>";
					}
					?>
			4、reset
				语法：reset($array_name);
				功能：将数组指针回复到第一条记录。
			5、prev
				语法：prev($array_name);
				功能：向上移动数组指针，与next()相反
			6、end
				语法：end($array_name);
				功能：将数组指针移动到最后一个元素。
		while_list_each遍历数组：
			1、each
				语法：echo($array_name);
				功能：
					1、将数组中的元素的键名和键值组成一个新数组返回，返回的数组分别是关联数组和索引数组
					2、每运行一次，指针都将下移一次。当指针移动到最后一个元素的后一位时，返回false。
			2、list（list不是PHP中的内置函数而是一种数据结构）
				语法：list($variate_name1, $variate_name2) = array(element1, element2);（此数组只能为索引数组）
				功能：将数组中的元素依次赋值给list中的变量
			eg：<?php
				//一维数组
					//索引数组
					$arr = array("liba","iej",68,46);
					while(list($key,$value)=each($arr)){
						echo $key.">".$value;
						echo "<br/>";
					}
					//关联数组
					$a2 = array("name"=>"李白","age"=>83,"sex"=>"女");	
					while(list($key,$value)=each($arr)){
						echo $key.">".$value;
						echo "<br/>";
					}	
				//二维数组
					//方法一
					while(list($k1,$v1)=each($array_name)){
						echo $k1."=>";
						var_dump($v1);
						echo "<br/>";
					}
					//方法二
					while(list($k1,$v1)=each($array_name)){
						echo $k1."=>";
						while(list($k2,$v2)=each($v1)){
							echo $k2."=>".$v2;
							echo "<br/>";
						}
					}
				?>	
					
	功能函数：
		1、基本函数
		<?php
			array_values($array_name);		//抓取数组中的键值，形成一个新的索引数组
			array_keys($array_name);		//抓取数组中的键名，形成一个新的索引数组
			array_flip($array_name);		//交换数组的键名与键值
			in_array(value,$array_name);	//查询数组中是否存在键值“value”，存在返回true，不存在返回false
			array_search(value,$array_name);//查询数组中是否存在键值“value”，存在返回键名，不存在返回false
			array_key_exists(key,$array_name);//查询数组中是否存在键名“key”，存在返回true，不存在返回false
			range(start,end);				//指定字母或数字的范围，返回一个数组
			array_unique($array_name);		//去掉数组中重复的键值
			array_reverse($array_name);		//将数组的元素反向排列
			array_rand($array_name,number);	//随机抽取 “number” 个键名 
			shuffle($array_name);			//打乱数组元素的顺序，使其重新随机排序
			count($array_name);				//统计数组元素的个数（即数组长度）
			array_merge($array[1],...$array[n]);//将多个数组连接起来，但不能有重复的数组名
			array_sum($array_name);			//将数组元素累加求和
			array_product($array_name);		//将数组元素累乘求积
			array_intersect($array[1],...$array[n]);//查询多个数组中共有的元素，返回数组
			array_diff($array[1],...$array[n]);//比较键值，返回第一个数组在后面每个数组中均为出现的键值，返回键名不变
		?>
		2、与字符相关函数
		<?php
			explode("分割符",$str_name);	//将字符串按分割符进行分割，分割符部分将被舍弃，返回数组
			implode("连接符",$str_name);	//将数组元素用连接符连接起来，连接符将被加入其中，返回字符串
		?>
		3、与变量相关函数
		<?php
			extract($array_name);			//抽取数组元素，生成变量（键名=>变量名，键值=>变量值）
			compact("变量名1",..."变量n");	//将变量封装到一个数组中（变量名=>键名，变量值=>键值）
		?>
		4、数组的分割与填充
		<?php
			array_slice($array_name,start,length);//从start开始截取一个长度为length的子数组
			array_chunk($array_name,length);//将数组以length长度进行分割，返回一个二维索引数组
			array_pad($array_name,length,"字符串");/*如果 “length>count($array)” 将用字符串填充
													 如果 “length<count($array)” 什么都不做 */
			array_fill(start,length,"字符串");//用字符串填充一个长度为length的以start开始的索引数组
		?>
		5、数组模拟栈
		<?php
			array_push($array,value[1],...value[n]);//将多个数值压如数组中
			array_pop($array);				//将数组元素出栈，最后进入栈的最先出栈
		?>
		6、数组模拟队列
		<?php
			array_push($array,value[1],...value[n]);//将多个数值压如数组中
			array_shift($array);			//将数组元素从队列中弹出，最先入的最先被弹出
		?>
		7、回调函数（参数也是函数的函数）
		<?php
			array_map("函数名"|$name,$array);//支持“内置函数”、“自定义函数”、“匿名函数”、“多数组”
			array_walk($array,"函数名");	
		?>
		8、排序
		<?php
			sort($array);					//将数组的 “键值” 进行 “由小到大” 的排序，返回一个新的索引数组
			rsort($array);					//将数组的 “键值” 进行 “由大到小” 的排序，返回一个新的索引数组
			asort($array);					//将数组的 “键值” 进行 “由小到大” 的排序，保留键名
			arsort($array);					//将数组的 “键值” 进行 “由大到小” 的排序，保留键名
			ksort($array);					//将数组的 “键名” 进行 “由小到大” 的排序
			krsort($array);					//将数组的 “键名” 进行 “由大到小” 的排序
			natsort($array);				//类似于asort
			usort($array);	
		?>
		9、字符串
		<?php
			[]
			寻找子串的位置（主串：$str；子串：$str1）
				strpos($str,$str1);				//在主串中查找子串的位置，区分大小写
				stripos($str,$str1);			//在主串中查找子串的位置，不区分大小写
				
			截取子串（主串：$str；子串：$str1）
				substr($str,$str1,length);		//在主串中截取以子串开始、长度为length的字符串
				strstr($str,$str1);				//在主串中，以子串开始截取，区分大小写
				stristr($str,$str1);			//在主串中，以子串开始截取，不区分大小写
				strrchr($str,$str1);			//在主串中，以子串开始截取，以子串最后一次出现开始截取
			
			子串替换（主串：$str；子串：$str1；用于替换的字符串：$str2）
				substr_replace($str,$str2,$str1,length);
				str_replace($str1,$str2,$str);
			
			统计字符长度
				strlen($str);
			
			分割字符串
				str_split($str,length);			//将字符串分割，每段的长度为length
			
			字母字符串处理
				strtoupper($str);				//将小写字母转换成大写
				strtolower($str);				//将大写字母转换成小写
				ucfirst($str);					//将字符串的首字母大写
				ucwords($str);					//将字符串中的每个单词的首字母大写
			
			去字符串空格
				trim($str[,"char"]);			//去除字符串首尾处的空白字符（或者其他字符）
				ltrim($str[,"char"]);			//删除字符串开头的空白字符（或其他字符）
				rtrim($str[,"char"]);			//删除字符串末端的空白字符（或者其他字符）
		?>
		10、与HTML相关的函数
		<?php
			nl2br($str);						//在字符串中的新行（\n）之前插入换行符
			strip_tags($str);					//从字符串中去除 HTML 和 PHP 标记
			urlencode($str);					//编码 URL 字符串
			urldecode($str);					//解码已编码的 URL 字符串
			htmlspecialchars($str);				//将字符串中的HTML标签转化成实体字符
			addslashes($str);					//将字符串的特殊字符转义
		?>
		11、与数学相关的函数
		<?php
			ceil			//向上取整
			floor			//向下取整
			round			//取近似值
			pow				//指数表达式
			sqrt			//开平方
			max				//找出最大值
			min				//找出最小值
			number_format	//以千位分隔符方式格式化一个数字
		?>
		
