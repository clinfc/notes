<?php

/*
 * 路由形式
 
 * 普通路由形式（get形式）
  	> 路由形式：http://网址/入口文件?m=分组名&c=控制器名&a=方法名&参数名=参数值
  	> eg：http://www.tp3.com/index.php?m=Home&c=User&a=test&id=100
    > 缺点：传递参数可见，既不安全亦不好看
 
 * pathinfo路由形式（默认）
	> 路由形式：http://网址/入口文件/分组名/控制器名/方法/参数名1/参数值1/参数名2/参数值2
	> eg：http://www.tp3.com/index.php/Home/User/test/id=100
	
 * rewrite路由形式
	> 路由形式：http://网址/分组名/控制器名/方法/参数名1/参数值1/参数名2/参数值2
	> eg：http://www.tp3.com/Home/User/test/id=100
	> 注意：此路由形式不能直接使用，需要配置。此形式需要Apache的支持。
	
 * 兼容路由形式（集合了前三种）
	> 路由形式：http/网址/入口文件?s=/分组名/控制器名/方法/参数名1/参数值1/参数名2/参数值2
	> 此路由形式只有一个参数，参数名为 s ，等号后面的都是参数值
	> eg：http://www.tp3.com/index.php?s=/Home/User/test/id=100
	
 */
 
 
 
/*
 * 控制器中的跳转
 
 * Url组装
	* Url组装是根据某种规则，来组成一个Url地址，这个功能就叫做Url组装
	* 在thinkPHP中，系统提供一个分组函数来处理url的组装，这个方法叫做U方法
	* U方法语法格式：
		> U('[分组名/控制器名/]方法名',参数数组);
		> {:U('[分组名/控制器名/]方法名',参数数组)}	在模板中
		> eg：U('test');
			  U('User/test');
			  U('User/test',array('id'=>100));
	* 快速方法包括：A B C D E F G I M U R S。这些方法都丁义珍系统函数库（functions.php）中
 
 * 系统跳转方法
	
	* 成功跳转
		> $this->success(跳转提示[, 跳转地址, 等待时间]);
		> eg：$this -> success('操作成功', U('test'), 3);
		> 注：跳转提示必须有，没有跳转地址则跳转到上一页
	
	* 失败跳转
		> $this->error(跳转提示[, 跳转地址, 等待时间]);
		> eg：$this ->error('sorry', U('test'), 3);
		> 注：跳转提示必须有，没有跳转地址则跳转到上一页
		
 */


 
/*
 * thinkPHP中的视图
 
 * 什么是视图
	> 视图就是MVC三大组成部分中的V（view），主要负责信息的输出和展示
	
 * 视图的创建
	> 创建位置：分组view目录下与控制器名相同的目录（文件夹）中
	> eg：Application/Home/View/Index/log.html
	> 注：其中Index为默认控制器的名称的文件夹，log.html中的log为控制器中的方法名
	
 * 视图的展示
	> 在thinkPHP中是Display方法
	> 语法格式：
		$this->display();						展示当前控制器下雨当前请求方法名称一致的模板文件
		$this->display('log[不带后缀]');		展示当前控制器下的指定模板文件
		$this->display('Index/log[不带后缀]');	展示指定控制器目录下的指定模板文件
 */
 
 
 
/*
 * thinkPHP中的视图2
 
 * 模板内容获取方法
	> $this->display();		展示模板（无返回值）
	> $this->fetch();		获取模板（有返回值）

 * 两种方法的底层实现上的差异
	> display：替换模板中常量/变量 -> 获取模板内容 -> 输出模板内容
	> fetch：替换模板中常量/变量 -> 获取模板内容
	> 注：display的前两步是调用fetch实现的
	
 * thinkPHP中的视图注释
	> 行注释：{// 内容 }
	> 块注释：{/* 内容 */}
	> 注：普通的HTML注释（客户端注释）在浏览器的源码中将会被输出，二thinkPHP（服务器端注释）不会。
	> 注：在thinkPHP注释中不要再出现大括号（模板变量）
 */


 
 
/*
 * 变量分配（初阶）
 
 * 定义：实际开发中，不仅展示模板，还需要展示数据，这个时候变量还在控制器方法中，
		 需要将数据传递到模板中展示，这个过程叫变量分配。
		 
 * 预定义方法：assign
	> 语法格式：$this->assign('模板中变量',php中的变量名);
	> eg：
		php中代码：$this -> assign('names',$name);
		HTML中代码：{$names}

  * 变量分割符
  * 在thinkPHP中默认 “{” 和 “}”，可在convention.php中更改
  
  */
  
  
  
  
  
 /* 
  * 变量输出（进阶）
  
  * 一维数组
	> 控制器中：
		public function test(){
			$array = array();					定义数组
			$this -> assign('array',$array);	变量分配，不考虑类型，通用
			$this -> display();					展示模板
		}
	> 在模板（HTML文件）中：
		点形式：{$array.k}
		中括号：{$array[k]} 
		
 * 二维数组
	> 在控制器中：
		public function test(){
			$array = array();					定义数组
			$this -> assign('array',$array);	变量分配，不考虑类型，通用
			$this -> display();					展示模板
		}
	> 在模板（HTML文件）中：
		点形式：{$array.k.k}
		中括号：{$array[k][k]} 
		
 * 对象变量
	> 创建对象
		路径：Home\Controller\Student.class.php
		内容：
			namespace Home\Controller;
			class Student{
				
			}
	> 变量分配（对象）
		function test(){
			$stu = new Student();		实例化student对象
			$stu -> id = 100;			赋值
			$stu -> name = '马冬梅';	赋值
			$stu -> sex = '女';			赋值
			$this -> assign('stu',$stu);变量分配
			$this -> display();			视图展示
		}
	> 模板输出（thinkPHP）
		箭头形式：{$stu -> id}
		冒号形式：{$stu : id}
		不支持点形式
		
*/
  
  
  
  
/*
 * 模板常量替换机制
 
 * 作用：将一些复杂的路径用一些特殊常量将路径简单化
 
 * thinkPHP中默认的几个常用模板常量：
	__MODULE__		/index.php/Home 				【从域名后面开始一直到分组名结束的路由】
	__CONTROLLER__	/index.php/Home/Index			【从域名后面开始一直到控制器结束的路由】
	__ACTION__		/index.php/Home/Index/log		【从域名后面开始一直到方法名结束的路由】
	__PUBLIC__		/Public							【站点根目录下的public路由】
	__SELF__		/index.php/Home/Index/log[/id/1]【从域名后面开始一直到路由的最后】
	
 * 自定义模板常量（在config.php文件中，添加）
	'TMPL_PARSE_STRING' => array( '__ADMIN__' => __ROOT__.'/Public/Admin' ),
   > 注：__ADMIN__ 和 /Public/Admin 为自定义内容
   
 */
	


/*
 * 系统变量
	$Think.server		等价于$_SERVER，获取服务器信息
	$Think.get			等价于$_GET，获取get请求信息
	$Think.post			等价于$_POST，获取post请求信息
	$Think.request		等价于$_REQUEST，获取get和post信息
	$Think.cookie		等价于$_COOKIE，获取cookie信息
	$Think.session		等价于$_SESSION，获取session信息
	$Think.config		获取thinkPHP中所有配置文件的总和，如果后面指定了元素，则获取指定配置
 
 */
 
 
 
 
 
/*
 * 在视图中使用函数
 
 * 语法格式：{$name | 函数名1 | 函数名2 = 参数1,参数2,...}
 
 * eg：时间戳在模板中的格式化
	> 控制器中：
		public function test(){
			$time = time();					定义时间戳
			$this -> assign('time',$time);	传递给模板，变量分配
			$this -> display();				展示模板
		}
	> 在模板中：
		{$time|date='Y-m-d H:i:s',###}		###表示变量自身，即$time
		
		> 特别说明：
			1.1、只有一个函数且参数为本身时，###可以省略不写
			1.2、当函数有多个参数且第一个参数为变量本身时，###可以省略不写
			2.1、函数名必须是php内置函数或是函数库文件中定义好的
			
 * eg：定义一个字符串，截取前五个并转换为大写
	> 控制器中：
		public function test(){
			$str = 'aBdfGH';
			$this -> assign('str',$str);
			$this -> display();				
		}
	> 在模板中：
	{$str|substr=[###,]0,5|strtoupper}		其中###可以省略不写
	
 */
 
 
 
 
/*
 * 默认值

 * 含义：当某个变量不存在或为空时，将显示默认字符

 * 语法格式：{$name|default='...'}

 */
	
		

/*
 * 模板中变量的运算
	+	{$a+$b}
	-	{$a-$b}
	* 	{$a*$b}
	/	{$a/$b}
	%	{$a%$b}
	++	{$a++}、{++$a}
	--	{$a--}、{--$a}
	
 */




/*
 * 文件包含
 
 * 将公共部分放在单独的文件中，后期直接引入。可以减少代码重复、易于维护
 
 * 语法格式：<include file='' />

 * 在控制器中：
	 public class header(){
		$this -> display();
	 }
	 
 * 在模板中：
	 <body>
		<include file='Application/Home/View/Index/header.html' />
		<include file='View/Index/header.html' />
		<include file='Index/header.html' /> 
	 </body>
	 
 * 在模板中引用并传递参数
 
	> 引用的文件（参数值必须引起来，无论单双）
		<include file='Index/header.html' name='thinkPHP3' />  
		
	> 被引用的文件以“[name]”的形式使用参数
		<div>tp3就是 [name]</div>
	 
 */
 
 
 
 
 
/*
 * 循环遍历
 
	> thinkPHP系统提供了两个标签
		volist标签： <volist name='遍历的变量名' id='遍历的元素'>循环体</volist>
		foreach标签：<foreach name='遍历的变量名' item='遍历的元素'>循环体</foreach>
		
	> 两个标签的区别
		volist标签： 除了name和id属性，可以支持更多的属性
		foreach标签：除了name和item属性，只支持key属性
 
 * 遍历一维数组
 
	> 在控制器中：
		public function test(){
			$array = array();
			$this -> assign('array',$array);
			$this -> display();
		}
	
	> 在模板中：
	
		<volist name='array' id='vol'> {$vol} </volist>
		
		<foreach name='array' item='for'> {$for} </foreach>
		
 * 遍历二维数组
	
	> 在控制器中：
		public function test(){
			$array = array();
			$this -> assign('array',$array);
			$this -> display();
		}
	
	> 在模板中：
		<volist name='array' id='vo'>
			<volist name='vo' id='vol'>{$vol} -> </volist>
		</volist>
		
		<foreach name='array' item='fo'>
			<foreach name='fo' item='for'>{$for} -> </foreach>
		</foreach>
		
 */
 
 
 
 
/*
 * if标签
	> 作用：用于流程控制
	
	> 语法格式：
		<if condition='条件表达式'>输出内容
		<elseif condition='条件表达式'>输出内容
		<else>输出内容
		</if>
		
	> eg：
		=>	public function test(){
				$day = date('N',time());
				$this -> assign('day',$day);
				$this -> display();
			}
		
		=>	<if condition='$day==1'>星期一
			<elseif condition='$day==2' />星期二
			<elseif condition='$day==3' />星期三
			<elseif condition='$day==4' />星期四
			<elseif condition='$day==5' />星期五
			<elseif condition='$day==6' />星期六
			<else />星期天
			</if>
		
		=>	<if condition="$da.id == $db.id ">注意空格个数和位置
			<elseif condition="$da['id']==$db['id'] />中括号形式跟空格无关
			</if>
			
 */
 
 
 
 
/*			
 * PHP标签
	> 作用：在thinkPHP标签中使用PHP语法格式；不建议使用。
	
	> 语法格式：
		PHP内置标签：<?php ?>
		thinkPHP封装：<php></php>
		
	> eg：thinkPHP封装
		<php>echo 'hello word';</php>
		
	> 禁用PHP标签（只能禁用PHP内置标签），不建议禁用
		ThinkPHP/Conf/convention.php -> TMPL_DENY_PHP -> true
		
 */	
 
 
 
 
 
/* 
 * 模型：MVC中的model
	> 作用：负责与数据表的数据交互
	> 本质：是一个类，需要实例化
 
 * 创建模型
	> 命名规范：模型名（不带前缀的表名、首字母大写）+Model关键字+.class.php
	> eg：
		UserModel.class.php
		
		namespace Home\Model;			声明命名空间
		use Think\Model;				引入父类模型
		class UserModel extends Model{	声明模型并继承父类
			
		}
		
		
 * 实例化模型
 
	> 普通实例化：自己编写代码来new一个对象
		在控制器中：
		public function test(){
			$user = new \Home\Model\UserModel();
		}
		
	> 快速方法M、D
	
		D方法：
			$obj = D(['模型名']);
			实例化自定义模型（Application/Home/Model/UserModel.class.php）
			如果指定模型名不存在或未指定，则实例化父类模型（Model.class.php）
			
		M方法：
			$obj = M(['不带前缀的表名']);
			直接实例化父类模型（Think/Model.class.php 即 ThinkPHP/Model/Lite/Model.class.php）
			如果指定了表名，实例化时将关联表；
			如果未指定表名，则不关联表，一般用于执行原生SQL语句：M()->query($sql)
			
		如何选择：
			如果需要使用的操作父类中已经操作好了，则直接实例化父类，即M方法；
			如果父类中方法无法满足，需要自己定义方法，则用D方法。
		
 */




/*
 * 模型 CURD操作

 * C：Create > 增加 > add方法
	
	> 语法格式：
		$model->add(一维数组);
		$model -> addAll(二维数组);
		注：一维数组必须是键值/关联数组，且键名与表的字段名一致，否则将被过滤。
	
	> eg：添加一条记录
		控制器中：
			public function test(){
				$model = M('User');
				$data = array(
					'name' => 'fzc',
					'age' => 12,
					'sex' => 1,
					'remark => '外聘'
				);
				$result = $model -> add($data);		返回的是新增记录的主键值
			}
			
	> eg：添加多条记录
		方法一：循环使用add方法
		方法二：$model -> addAll(二维数组);		外层为索引数组；内层为关联数组，且键值顺序一致（即以第一个为准）
			在控制器中：
				public function test(){
					$model = M('User');
					$data = array(array(),array());
				}
 
  * U：Update > 修改 > save方法
	
	> 语法格式：
		$model -> save(一位关联数组);
		一位关联数组必须有主键信息，无主键则相当于批量删除，thinkPHP防止误删，不允许批量删除。
		
	> eg：
		在控制器中：
			public function test(){
				$model = M('User');
				$array = array(
					'id' => '1',
					'name' => '吱吱'
				);
				$result = $model ->save($array);	返回false表示未执行，而非执行失败。否则返回收到影响的行数。
			}
			
 * R：Select > 查询 > select方法、find方法
	
	> 语法格式：
	
		select方法：成功 >> 二维数组。出错 >> false。为空 >> null
			$model->select();				select * from user;
			$model->select(val);			select * from user where id = val;			id表示主键
			$model->select('val1,val2');	select * from user where id in(val1,val2);	id表示主键
			
		find方法：成功 >> 一维数组。出错 >> false。为空 >> null
			$model->find();					select * from user limit 1;
			$model->find(val);				select * from user where id = val;			id表示主键
		
	> eg：
		public function test(){
			$model = M('User');
			$s1 = $model -> select();
			$s2 = $model -> select(1);
			$s3 = $model -> select('1,3,5');
			$f1 = $model -> find();
			$f2 = $model -> find(1);
		}
 
 * D：Delete > 删除 > delete方法
	> 未执行返回false，执行成功返回受影响的行数
 
	> 语法格式：
		$model->delete(val);				delete from user where id = val;			id为主键
		$model->delete(va1,va2,va3);		delete from user where id in (va1,va2);		id为主键
		
	> eg：
		public function test(){
			$model = M('User');
			$re = $model -> delete(2);
			$re = $model -> delete('1,4,5');
		}
		
	> 物理删除：真删除。
	> 逻辑删除：假删除，本质是修改操作，将不再被读取出来。
 
*/



/* 
 * thinkPHP中实用项
 
 * 跟踪信息
	> 默认关闭：SHOW_PAGE_TRACE（主配置文件中不存在）
	> Application/Home/Common/Conf/config.php（应用级别的文件）
	  'SHOW_PAGE_TRACE' => true,
 
 * 两种开发模式
	
	> 为方便开发，提供了两种模式（默认生产模式）：
	
		> 开发模式：开发调试阶段使用的模式，错误信息比较详细
			配置项：
				入口文件index.pnp中
				define('APP_DEBUG',true);		开启，开发模式
				define('APP_DEBUG',false);		关闭，生产模式；默认值
			
		> 生产模式：项目上线的时候使用的模式，错误信息比较模糊
 
 * SQL调试：
 
	> getLastSql()，别名 _sql()。用于调试逻辑错误，返回查询结果或错误。
	
		语法格式：$model->getLastSql();	获取当前模型中最后执行成功的SQL语句
		
		public function test(){
			$model = M('User');
			$data = $model -> select();
			$re = $model -> _sql();		返回SQL语句
		}
		
	> fetchSql（thinkPHP3.2.3）。可以调试语法错误，返回SQL语句，不执行SQL语句。
	
		语法格式：$model -> where() -> limit() -> order() -> fetchSql(true) -> CURD;
 
 * 性能调试：快速方法G
 
	> 语法格式：G('开始标记','结束标记',数字/字母);
		
		public function test(){
			G('s');			开始标记
			G('e');			结束标记
			G('s','e',4);	统计开始
		}
	
 */



/*
 * AR模式
 
	> AR模式即active record模式，是一个对象关系映射（orm）技术。每个AR类代表一张
	  数据表（或视图），数据表的字段在AR类中体现为类的属性，一个AR实例则表示表中的一行
	
	> AR模式的核心：三个映射/对应
		AR类		<==>	表 
		AR类的属性	<==>	表的字段
		AR类的实例	<==>	表的记录
 
 * AR模式在thinkPHP中的典型应用：CURD操作
		$model = M('User');
		$model -> 属性/表字段 = 字段值;
		...
		$model -> CURD操作（无参数）;
		
	> CURD
		C：无需参数
			public function C(){
				$model = M('User');			第一个映射（类 <==> 表）
				$model -> name = 'tp3';		第二个映射（属性 <==> 字段）
				$model -> age = 3;			第二个映射（属性 <==> 字段）
				$re = $model -> add();		第三个映射（实例 <==> 记录）
			}
			
		U：无需参数，必须有主键
			public function U(){
				$model = M('User');			第一个映射（类 <==> 表）
				$model -> id = 2;			第二个映射（属性 <==> 字段）
				$model -> age = 3;			第二个映射（属性 <==> 字段）
				$re = $model -> save();		第三个映射（实例 <==> 记录）
			}
			
		R：无
		
		D：无需参数，必须有主键，可以指定多个主键
			public function D(){
				$model = M('User');			第一个映射（类 <==> 表）
				$model -> id = '2,4,7';		第二个映射（属性 <==> 字段）
				$re = $model -> delete();	第三个映射（实例 <==> 记录）
			}
 
  * thinkPHP中的辅助方法
  
	> where		限制查询条件
	
		$re = $model -> where('name = f and age > 10') -> select();			字符串条件
		
		$re = $model -> where(array('name'=>'f', 'age'=>10)) -> select();	数组条件
	
	> limit		限制输出条数
	
		$re = $model -> limit(n) -> select();		查询。n：条数/长度
		
		$re = $model -> limit(m,n) -> select();		分页。m：起始位置；n：偏移量/长度
	
	> field		限制输出字段
	
		$re = $model -> field('name,SUM(age),sex as 性别') -> select();				字符串条件
		
		$re = $model -> field(array('name','SUM(age)','sex'=>'性别')) -> select();	数组条件
		
		$re = $model -> field('name,age',true) -> select();		字段排除，查询除name、age外的所有字段
	
	> order		按指定的字段排序
	
		$re = $model -> order('id desc,age') -> select();				字符串条件
		
		$re = $model -> order(array('id'=>'desc','age')) ->select();	数组条件
	
	> group		按指定的字段分组
	
		$re = $model -> group('name,age') -> select();
 
 */
 
 
 
 
/*
 * 连贯操作
 
	> 就是将辅助方法全部写在一行上的写法，就叫做连贯操作
	
	> 语法格式：
	
		$model -> where() -> limit() -> order() -> select();
 
 */




/*
 * thinkPHP中的统计查询
 
	> count		查询表中总记录数
	
		$re = $model -> count();
	
	> max		查询某字段最大值
	
		$re = $model -> max('age');
	
	> min		查询某字段最小值
	
		$re = $model -> min('age');
	
	> avg		查询某字段平均值
	
		$re = $model -> avg('age');
	
	> sum		查询某字段总和
	
		$re = $model -> sum('age');

 */
 
 
 
/*
 * 表单数据处理：I方法
 
	> 可以接收任何类型的数据，且自带防SQL注入的方法
 
	> 语法格式：I('变量类型.变量名',['默认值'],['过滤方法'],['额外数据源'])
	
		变量类型：get、post、put、session、cookie、server、path、param、request、data
		
		默认值：当使用过滤方法后原先的内容变成空字符串，则用默认值代替
		
		过滤方法：是对thinkPHP默认提供的htmlspecialchars的补充，函数名可以是PHP内置，也可以是函数库中的
		
		注：一次性接收所有数据：I('poat.')
		
 */
		
 
 
 
/*
 * 数据对象的创建：create方法
 
	> 作用：批量设置数据对象的方法
	
	> eg：
		$model -> create();
		$model -> add();
		等效于
		$datas = $model -> create();
		$model -> add([$datas]);
		等效于
		$datas = I('post.');
		$model -> add($datas);
		
	> 关于是否接收 create 返回值
		1、如果需要打印返回值，则接收；否则可以不接收，那么在CURD操作是也不需要传递参数。
		2、在使用自动验证是需要接收返回值
		
 * 自动验证（单个）
	
	> 在提交数据是系统会按照指定的[自定义]规则进行数据的有效性、合理性的验证。
 
	> 语法格式：没有语法，由数据对象创建方法create方法去实现验证，只需添加验证规则。
	
	> 验证规则定义： 
		=>	Model.class.php >> protected $_validate = array()				找到预定义格式
		=>	DeptModel.class.php >> protected $_validate = array();			复制添加到自定义模型中
		
		=>  protected $_validate = array(
				array(验证字段,验证规则,错误提示,[验证条件,附加规则,验证时间]),
				array(验证字段,验证规则,错误提示,[验证条件,附加规则,验证时间]),
			);	
			验证字段：表单项的name属性值
			验证规则：针对验证字段的要求格式限制；
					  包括：require字段必须、email邮箱、URL地址、currency货币、number数字。
			错误提示：验证不合格给出的提示信息
			验证条件：
					0：字段存在就验证，默认值
					1：必须验证
					2：字段不为空则验证
			附加规则：配合验证规则使用，详见参考手册
			验证时间：
					1：新增数据时验证
					2：编辑时验证
					3：所有情况下都验证，默认值
					
		=>  因为规则定义在自定义模型中，所以模型在实例化时必须实例化自定义模型，即D方法
 
	> 自动验证成功，create方法返回数组；验证失败，create方法返回false。
	
	> 输出错误提示信息：$model -> getError();
	
 * 自动验证（批量）
 
	> 开启批量验证：DeptModel.class.php >> protected $pathValidate = true;
	
	> $model -> getError(); 返回数组
	
 * 字段映射
 
	> 使用前提：使用create方法创建对象
 
	> 语法格式：无语法格式，只有规则的定义
	
		=>	DeptModel.class.php >> protected $_map = array('表单name' => '字段name');
	
		=>	protected $_map = array(
				'abb' => 'name',
				'da'  => 'age',
			);
	
 * 特殊表的实例化

	> 特殊表：
		1、数据表没有前缀
		2、数据表前缀不是配置文件中配置的前缀
	
	> 创建特殊表模型
	
		SpecialModel.class.php >> protected $trueTableName = 'tal_name';
		
		namespace Admin\Model;
		use Think\Model;
		class SpecialModel extends Model{
			//实际数据库名，此设置表示该数据表已包含前缀
			protected $trueTableName = 'special';
		}
		
	> 控制器中实例化
	
		public function test(){
			$model = D('Special');
		}
	
 */




/*
 * 会话控制
 
 * session；session方法定义在functions.php中
 
	> session('name','value');		创建session
	
	> session('name');				读取session
	
	> session('name',null);			删除session
		
	> session(null);				删除全部session
	
	> session();					读取全部session
	
	> session('?name');				判断session是否存在

 * cookie
 
	> cookie('name','value')		创建cookie
	
	> cookie('name','value'3600)	创建cookie，有效期为3600s
	
	> cookie('name')				读取cookie
	
	> cookie('name',null)			删除cookie
	
	> cookie(null)					删除全部cookie，有问题，无法实现，需修改functions.php
	
	> cookie()						读取全部cookie

 * 文件加载
 
	> 函数库形式加载
	
		=>	Application/Common/Common/function.php		自定义函数库
		
			<?php
				function sayhello($who){
					echo 'hello '.$who;
				}
			?>
			
		=>	public function test(){
				sayhello('word');		直接调用函数名即可
			}
		
	> 通过配置项动态加载
	
		=>	Application/Common/Conf/config.php
		
			'LOAD_EXT_FILE' => 'info,admi,...'		通过逗号分隔多个配置项文件名（不带后缀名）
			
		=>	Application/Common/Common/info.php 
		
			<?php
				function getInfo(){		直接添加函数即可
					phpinfo();
				}
			?>
			
		=>	public function test(){
				getInfo();				直接调用函数名即可
			}

	> 通过load方法加载
 
		->	使用前提：文件必须存在于分组级别的函数库目录汇总，并且只能用于定义的分组中
	 
		->	语法格式：load('@/不带后缀的PHP文件名');
		
			=>	Application/Home/Common/name.php
			
				<?php
					function sayhello($who){
						echo 'hello '.$who;
					}
				?>
				
			=>	public function test()
					load('@/name');		加载文件
					sayhello('word');	直接调用函数
				}
			
 */
 
 
 
/*
 * thinkPHP功能类
 
 * 验证码
 
	> 验证码：captcha（全自动识别机器与人类的图灵测试）
	
	> 分类：图片验证码、短信验证码、语音验证码
	
	> 验证码类：ThinkPHP/Library/Think/Verify.class.php
	
		->	__construct		实例化时传递一个数组，用于和其成员属性config进行合并，生成新配置
		
		->	check			校验验证码，传递参数，用户输入的验证码
		
			=>	$verify -> check(I('post.captcha'));
		
		->	entry			输出图片，将验证码保存到session中
		
	> 生成常规验证码
	
		=>	验证项模板：ThinkPHP/Library/Think/Verify.class.php
	
		=>	public function test(){
				$cfg = array(						配置项
					'fontSize'  =>  25,              // 验证码字体大小(px)
					'useCurve'  =>  false,           // 是否画混淆曲线
					'useNoise'  =>  true,            // 是否添加杂点	
					'length'    =>  4,               // 验证码位数
					'fontttf'   =>  '4.ttf',         // 验证码字体，不设置随机获取
				);
				$verify = new \Think\Verify($cfg);	实例化验证码类
				$verify -> entry();					输出图片
			}
			
	> 生成中文验证码
	
		=>	1、不到万不得已，不要使用
			2、中文验证码需要中文字体的支持
			3、需要开启PHP的扩展：
				extension=php_mbstring.dll
				extension=php_curl.dll
	
		=>	将中文字体复制到：ThinkPHP/Library/Think/Verify/zhttfs/
	
		=>	验证项模板：ThinkPHP/Library/Think/Verify.class.php
	
		=>	public function test(){
				$cfg = array(						配置项
					'useZh'     =>  true,            // 使用中文验证码 
					'fontSize'  =>  25,              // 验证码字体大小(px)
					'useCurve'  =>  false,           // 是否画混淆曲线
					'useNoise'  =>  true,            // 是否添加杂点	
					'length'    =>  4,               // 验证码位数
					'fontttf'   =>  '',         	 // 验证码字体，不设置随机获取
				);
				$verify = new \Think\Verify($cfg);		实例化图片
				$verify -> entry();					输出图片
			}
 
 */
 
 
 

/*
 * 扩展
 
 * 快速方法C：操作thinkPHP中的配置项
 
	> C(name,value)		设置配置项
	
	> C(name)			读取配置项
	
	> C()				读取全部配置项


 */


