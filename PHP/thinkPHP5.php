<?php

	-> composer：依赖管理工具（非包管理工具）
	
	-> tp5安装
		=> composer官网
		=> 安装composer
		=> 安装镜像
		=> composer官网 >> 安装包列表 
		=> 搜索thinkphp 
		=> 选择topthink/think 
		=> 选择版本 
		=> 复制命令：composer create-project topthink/think
		=> 命令行目录切换：D:\myphp_www\PHPTutorial\WWW> 
		=> 粘贴命令：composer create-project topthink/think tp51
		=> 回车两次
	
	-> 扩展安装：必须在项目目录下执行命令行

	
 * 路由形式
 
	->	URL访问模式
	
		=>	普通方式：域名/index.php?m=模块&c=控制器&a=方法&键=值
 
		=>	pathinfo方式：域名/index.php/模块/控制器/方法/键1/值1/键2/值2
		
		=>	兼容方式：域名/index.php?s=模块/控制器/方法/键1/值1/键2/值2
		
	->	tp5 URL访问模式
		
		=>	域名/index.php/模块/控制器/方法?键1=值1&键2=值2
	
		=>	域名/index.php/模块/控制器/方法/键1/值1/键2/值2
		
		=>	域名/index.php?s=模块/控制器/方法/键1/值1/键2/值2

		
 * 命名空间

	->	namespace app\index\controller;
		include 'Demo.php';
		class Index{
			public function index(){
				$demo = new Demo();		//实例化当前空间中的Demo类
				$demo = new \Demo();	//实例化全局空间中的Demo类(先导入)
			}
		}
		
	->	对函数：先在本空间查找，如果未找到，再到全局中查找
		

 * 入口文件
 
	> 更改入口文件
	
		->	public/index.php
			namespace think;
			define('APP_PATH',__DIR__.'/../admin/');
			require __DIR__.'/../thinkphp/base.php';
			Container::get('admin')->path(APP_PATH)->run()->send();
			
	> 将入口文件放在根目录下
	
		->	index.php
			namespace think;
			define('APP_PATH',__DIR__.'/admin/');
			require __DIR__.'/thinkphp/base.php';
			Container::get('admin')->path(APP_PATH)->run()->send();
			
	> 入口绑定
	
		->	app.php >> 'auto_bind_module'=>true
		
 
 * 开启 调试模式、trace、应用命名空间
 
	=>	根目录下创建：.env
	=>	APP_DEBUG = true
		APP_TRACE = true
		APP_NAMESPACE = application
		
 
 * 控制器	接收用户的请求并将处理结果返回给调用者的工具，本质上就是一个类

	> 功能：处理请求，返回处理结果，相当于CPU
	
	> 用途：处理请求数据
	
	> 命名空间
		
		->	创建
		
			=>	根目录下创建：.env
			=>	APP_NAMESPACE = application
			
		->	应用
		
			=>	namespace application\index\controller;
			
		->	修改默认的控制器层	
		
			=>	app.php >> 'url_controller_layer'=>'controller'
	
	
 * 请求对象	可以理解为URL地址、URL对象；将客户端请求的资源以URL的方式发送到服务器上，
			服务器响应请求并将资源返回给客户端

	> 功能：接受用户请求，响应请求
	
	> 用途：实现用户界面与数据库的交互
	
	> 参数绑定
	
		->	app.php >> 'url_param_type'=>0	// URL参数方式 0 按名称成对解析 1 按顺序解析
	
 
 * 设计模式
 
	> 单例模式：一个类只允许别实例化一次
	
		->	class Hubby{
				// 构造器私有化
				private function __construct(){}
				// 克隆方法私有化
				private function __clone(){}
				// 创建类的内部静态属性，保存类的唯一实例
				protected static $instance = null;
				// 创建一个外部接口，创建并返回当前类的唯一实例
				public static function getInstance(){
					if(is_null(static::$instance)){
						static::$instance = new static();
					}
					// 此时 $instance 中保存的不再是 null 
					return static::$instance;
				}
			}
		
		->	$h1 = Hubby::getInstance();
		->	$h2 = Hubby::getInstance();
	
	> 工厂模式：根据用户的需求，动态生成类的实例
	
		->	class Student{
				public function name1(){}
			}
			
		->	class Car{
				public function name1(){}
			}
		
		->	// 创建一个工厂类
			class Factry{
				public static function creote($name){
					switch(strtolower($name){
						case 'student':
							return new Student();
							break;
						case 'car':
							return new Car();
							break;
					}
				}
			}
			
		->	//通过工厂类实例化 
			class User{
				public function study(){
					$user = Factry::creote('Student');
				}
			}
	
	
 * 依赖注入：将当前依赖的对象以参数的方式注入到当前类中
	
	->	class Girl{
			public function work(){}
			public function hobby(){}
		}
	
	->	1、以构造方法实现
	
		=>	class Boy{
				private $girl = null;
				public function __construct(Girl $girl){
					$this -> girl = $girl;
				}
				public function getG(){
					return '我的女朋友'.$this->girl->work();
				}
			}
		
		=>	$boy = new Boy(new Girl);
			echo $boy -> getG();
		
	->	2、普通方法
	
		=>	class Boy{
				public function getG(Girl $girl){
					return '我的女朋友'.$girl->work();
				}
			}
			
		=>	$boy = new Boy(new Girl);
			echo $boy -> getG();
			
 
 * 容器：也叫服务容器（IOC）
 
	> 基本思想：拿来就用，最大限度简化外部对象调用，类似于即插即用
	
	> 基本实现：
		
		->	创建容器：本质就是讲一个类与它的实现绑定到一个关联数组。
		->	服务注册：初始化这个关联数组，将工作类绑定到容器中。
		->	容器依赖：也叫依赖容器。调用时直接传一个容器对象即可，不用一个一个传具体对象。
 
			=>	创建对象A、B：// Clas.php
				class A{
					public function aa(){}
				}
				class B{
					public function bb(){}
				}
				
			=>	服务注册	// Container.php
				require 'Clas.php';
				// 创建容器类
				class Container{
					// 创建一个空数组用来保存工具类以及实现方法
					protected $instance = [];
					
					// 将实例化类与实现方法绑定：将对象容器初始化
					public function bind($abstract,Closure $process){
						$this -> instance[$abstract] = $process;
					}
					
					// 创建特定类的实例
					public function make($abstract,$params = []){
						return call_user_func_array($this -> instance[$abstract], []);
					}
				}
				
				// 服务注册：其实就是调用容器的bind()将对象注册到容器中
				$container = new Container();
				
				// 将A类绑定到容器中
				$container -> bind('a',function(){
					return new A();
				});
				
				// 将B类绑定到容器中
				$container -> bind('b',function(){
					return new B();
				});
				
			=>	容器注入：将所有用到的对象，以容器的方式，注入到当前的工作类中
				require 'Container.php';
				class User{
					public function login(Container $container){
						// 实例化A类并调用A类方法
						echo $container -> make('a') -> aa();
						// 实例化A类并调用B类方法
						echo $container -> make('b') -> bb();
					}
				} 
				
				$user = new User();
				echo $user -> login($container);
		
				
 * facade：门面模式|外观模式
 
	> facade：就是将一些操作封装，对外提供一个操作接口
	
	> facade与容器、依赖注入是黄金搭档
	
		->	案例
		
			=>	Facade类
				require 'Container.php';
				class Facade{
					public static function connect(Container $con){
						return $con -> make('a') -> aa();
					}
					public static function check(Container $con){
						return $con -> make('b') -> bb();
					}
				}
				
			=>	客户端调用
				$re1 = Facade::connect($container);
				$re2 = Facade::check($container);
				
		->	案例简化
		
			=>	require 'Container.php';
				class Facade{
					// 保存容器对象
					protected static $con = null;
					// 创建初始化方法，给容器对象赋值
					public static function initialize(Container $cont){
						static::$con = $cont;
					}
					// 类A
					public static function connect(){
						return static::$con -> make('a') -> aa();
					}
					// 类B
					public static function check(){
						return static::$con -> make('b') -> bb();
					}
				}
				Facade::initialize($container);
				echo Facade::connect();
				echo Facade::check();
			

 * 数据库操作	开发过程中不要在控制器中直接操作，建议在模型中操作
 
	> 数据库操作的入口类：thinkphp/library/think/Db.php
 
	> 三大主键：thinkphp/library/think/db/
	
		->	Connection.php	  连接器类
		
			=>	1、连接数据库 
			=>	2、进行原生查询
			=>	3、执行SQL查询
		
		->	Query.php	查询器类
		
			=>	1、为所有的数据库查询提供了统一的方法接口
			=>	2、自动调用生成器，生成SQL语句
		
		->	Builder.php	   生成器类
			
			=>	生成SQL语句

	> 数据库配置

		->	静态配置：config/database.php
		
		×->	动态配置：connect()
		
	> 原生查询：使用到连接器类Connection中的 query() 和 execute() 操作
	
		->	query()	读操作：R
		
			×=>	$sql = "select * from t_name where age>15 limit 5 ";		
				Db::query($sql);
				
			×=>	//使用通用占位符，放在SQL注入；依赖参数顺序
				$sql = "select * from t_name where age>? limit ? ";		
				Db::query($sql,[15,5]);
				
			×=>	//使用命名占位符；不依赖参数顺序。
				$sql = "select * from t_name where age > :age limit :num ";		
				Db::query($sql,['age'=>15,'num'=>5]);
			
			=>	//将字符型15和5转换成数值类型
				$sql = "select * from t_name where age > :age limit :num ";		
				Db::query($sql,['age'=>[15,\PDO::PATH_INT],'num'=>[5,\PDO::PATH_INT]]);
				
		->	execute()  写操作：CUD
		
			=>	//将字符型15和5转换成数值类型
				$sql = "update t_name set age = :age where id = :num ";		
				Db::query($sql,['age'=>[15,\PDO::PATH_INT],'num'=>[5,\PDO::PATH_INT]]);
	
	> 构造器查询
	
		->	读操作	成功 >> 二维数组	无记录 >> 空数组	失败 >> 
			
			=>	Db::table('t_name') 
				-> field('name,age')
				-> field('name','age')
				-> field(['name'=>'姓名','age'])
				-> where('name','zs') 
				-> where('age > 15')
				-> where('age','>',15)
				-> order('age DESC')
				-> order('age','DESC')
				-> limit(5)
				-> select()
				-> find();
				
				
		-> 写操作	返回受影响的记录数。无记录 >> 0
		
			=>	insert()	// 添加一条记录
			
				$data = [
					'name' => '',
					'age'  => 15,
				];
				$num = Db::table('t_name') -> insert($data);
				$id = Db::getLastInsID();
				return $num ? '添加成功，ID='.$id : '未被添加';
				
			×=>	insertGetId() = insert() + getLastInsID();
				
				$id = Db::table('t_name') -> insertGetId($data);
				return $num ? '添加成功，ID='.$id : '未被添加';
				
			=>	insertAll()		// 添加多条记录
			
				$data = [
					['name'=>'', 'age'=> 15],
					['name'=>'', 'age'=> 5],
				];
				$num = Db::table('t_name') -> insertAll($data);
				
			=>	update()	// 基于前置查询，不允许无条件更新
			
				Db::table('t_name') 
					-> where('salary <= 3000') 
					-> data(['salary' => Db::raw('salary+1000')]) 
					-> update();
					
				Db::table('t_name') -> update(['sex'=>1,'id'=>12]);
				
			=>	delete()	// 基于前置查询，不允许无条件删除
			
				Db::table('t_name') -> delete(true);				//清空数据表
				Db::table('t_name') -> delete(9);
				Db::table('t_name') -> where('id',9) -> delete();
				Db::table('t_name') -> delete([1,3,5,9]);
	

 * 模型		一般对应一张数据表
 
	> Db与模型的区别与联系
		1、Db只负责数据表的访问
		2、模型是业务数据与业务逻辑的完美封装
		3、Db是模型的基础，模型最终依赖Db实现的
		4、Db返回数组，模型返回对象
		
	> 模型本质是一个类：think\Model.php
	
	> ORM(对象关系映射)
		模型类		<-->	数据表
		模型对象	<-->	记录
		
	> 命令行创建
	
		项目目录下：
			php think make:model index/Staff
			php think make:model [common/]Staff
			
	> 实例
	
		->	模型
		
			namespace app\index\model;
			use think\Model;
			class Staff extends Model{
				protected $table = 'staff';		// 设置数据表名称
				protected $pk = 'staff_id';		// 设置主键：默认为id
			}
			
		->	控制器
		
			namespace app\index\controller;
			use think\Controller;
			use app\index\model\Staff as StaffModel;
			class Staff extends Controller{
				public function instance(StaffModel $staff){// 模型实例化
					// 新增一条数据
					$staff -> name = '';
					$staff -> age = 0;
					$staff -> sex = 0;
					// 添加数据
					$staff -> save();
				}
			}
			
	> 模型的操作方法
	
		->	闭包：就是一个匿名函数，将函数作为参数进行传递
		
			$name = function(){}
	
			
		->	模型查询
		
			=>	单条记录	get(主键/闭包)：返回对象
			
				public function query(){
					// get(主键)
					$staff = StaffModel::get(2);	
					echo $staff['name'];			// 数组形式：输出某项数据
					echo $staff -> name;			// 对象形式：输出某项数据
					
					// get(闭包)
					$staff = StaffModel::get(function($query){	
						$query -> where('sex',0) -> where('salary>8000');
					});
					echo $staff['name'];			// 数组形式：输出某项数据
					echo $staff -> name;			// 对象形式：输出某项数据
					
					// 静态调用Db类的查询构造器进行查询
					StaffModel::where('sex',0)	// StaffModel == Db::table('staff')
						-> where('salary',5000)
						-> find();
				}
				
			=>	多条记录查询	all(主键列表/闭包)：返回二维数组/对象数组
				
				public function query(){
					// all(主键列表)
					$staffs = StaffModel::all();				// 获取所有数据
					$staffs = StaffModel::all([1,3,5]);		// 获取部分数据
					
					// all(闭包)
					$staffs = StaffModel::all(function($query){
						$query -> where('age','>',15);
					});
					foreach($staffs as $v){
						echo '姓名'.$v->name.'<br/>';
						echo '性别'.$v->sex.'<br/>';
						echo '年龄'.$v->age.'<br/>';
						echo '工资'.$v->salary.'<hr/>';
					}
					
					// $this -> request	请求对象
					$age = $this -> request -> param('age') ?: 40;			// 获取请求对象
					$salary = $this -> request -> param('salary') ?: 4000;	// 获取请求对象
					// all(闭包)：变量注入。导入请求变量
					$staffs = StaffModel::all(function($query) use ($age,$salary){
						$query -> where('age','>',$age) -> where('salary','>',$salary);
					});
				}
				
				
		->	模型更新：基于查询，不允许无条件更新
		
				public function update(){
					$staff = StaffModel::get(2);
					$staff -> name = '龙女';		// 更新字段
					$staff -> save();				// 将更新写入表
				}
			
			=> 静态方法：update(数据,条件,字段)
			
				public function update(){
					StaffModel::update(
						['name'=>'小龙女'],
						['staff_id'=>2]
					)
				}
				public function update(){
					StaffModel::update(
						['salary' => \think\Db::raw('salary+1000')],
						function($query){
							$query -> where('age > 50');
						}
					)
				}
			
			=> 查询构造器
			
				public function update(){
					StaffModel::where('age > 15')
						-> data(['salary' => \think\Db::raw('salary+1000')])
						-> update();
				}
			
				
		->	模型创建（添加数据）
		
			=>	create(数据,字段)
			
				public function create(){
					$data = [
						'name' => '',
						'age' => 0,
						'sex' => 1,
						'salary' => 9999
					];
					$field = ['name','age','sex','salary'];
					StaffModel::create($data,$field);
				}
				
			=>	查询构造器
			
				public function create(){
					$data = [
						'name' => '',
						'age' => 0,
						'sex' => 1,
						'salary' => 9999
					];
					StaffModel::data($data) -> insert();
				}
				
				
		->	模型删除
		
			=>	destroy(主键/主键列表/闭包)
			
				// 主键[列表]
				public function delete(){
					StaffModel::destroy(2[,3,6,8]);
				}
				// 闭包
				public function delete(){
					StaffModel::destroy(function($query){
						$query -> where('age > 15') -> where('salary >= 1000');
					});
				}
				
			=>	查询构造器
			
				StaffModel::where('age > 15') -> delete();
				
	>	模型软删除
		/*
		 * 删除步骤
			->	在表中添加字段：删除时间（删除标志）：del_time
			->	在模型类中添加属性：$deleteTime = 'del_time'
			->	在模型中导入软删除的trait类库：SoftDelete
			->	最新版支持设置软删除的默认字段
		*/
		
		->	在模型中
			namespace app\index\model;
			use think\Model;
			// 在模型中导入软删除的trait类库
			use think\model\concern\SoftDelete;		// trait方法集
			class Staff extends Model{
				
				use SoftDelete;						// 引用到当前类中（类的合并）
				
				protected $table = 'staff';			// 设置数据表名称
				
				protected $pk = 'staff_id';			// 设置主键：默认为id
				
				protected $deleteTime = 'del_tiem';	// 设置删除时间的字段
				
				protected $defaultSoftDelete = 0;	// 设置软删除字段
			}
			
		->	在控制器中
			namespace app\index\controller;
			use think\Controller;
			use think\index\model\Staff as StaffModel;
			class Staff{
				public function softDelete(){		// 软删除：必须在模型中进行配置
					StaffModel::destroy(1);
				}
				
				public function select(){			// 软删除的数据在普通查询中不可见
					StaffModel::where('staff_id > 10') -> select();
				}
				
				public function selAll(){			// 查询所有数据，包括被软删除的
					StaffModel::withTrashed() 		// withTrashed：把回收站内容包含进去
						-> where('staff_id > 10') 
						-> select();
				}
				
				public function selDel(){			// 查询被软删除的数据
					StaffModel::onlyTrashed() -> select();
				}
			}
	
	> 模型获取器
	
		->	模型（获取器命名规则：get+首字母大写的字段名+Attr）
			// 获取单个字段值
			protected function getSexAttr($value){
				$sex = [0=>'男',1=>'女'];
				return $sex[$value];
			}
			// 传入第二个参数，获取所有字段值
			protected function getSalaryAttr($value,$data){
				return $data['name'].'的工资是'.$value;
			}
			// 为表中不存在的字段设置，纯粹的拼装字段内容
			protected function getStaffInfoAttr($value,$data){
				// $value：仅仅是一个占位符
				return '我叫'.$data['name'].'；今年'.$data['age'].'睡';
			}
			
		->	控制器
			public function gets(){
				$re = StaffModel::get(2);
				dump($re);
				echo $re -> sex,'<br/>';		// 调用sex获取器
				$sex = $re -> getData('sex');	// 获取字段原始值
				echo $re -> salary,'<br/>';		// 调用salary获取器
				echo $re -> staff_info,'<br/>';	// 调用staff_info获取器
			}
	> 模型修改器
	
		->	模型（修改器命名规则：set+首字母大写的字段名+Attr）
			// 只传入一个参数
			protected function setEntryTimeAttr($value){
				return strtotime($value);
			}
	
		->	控制器
			public function set(){
				$re = StaffModel::get(3);
				$re -> entry_time = '2.15-5.22';
				$re -> save();
			}
	
		->	模型
			// 传入连个参数
			protected function setSalaryAttr($value){
				return $value+$data['age'];
			}
	
		->	控制器
			public function set(){
				$re = StaffModel::get(3);
				$re -> salary = 7800;
				$re -> save();
			}
			
	> 类型转换
	
		->	模型
			protected $type = [
				'staff_id' => 'interger',
				'sex' => 'interger',
				'age' => 'interger'
			];
			
	> 自动完成（针对写操作：新增、更新）
	
		->	模型（命名不可变更）
			// 相当于给字段设置默认值
			protected $insert = [	// 针对新增
				'sex' => 0,
				'salary' => 1000
			];
			protected $update = [];	// 针对更新
			protected $auto = [];	// 针对新增和更新
			
		->	控制器
			public function auto(){
				StaffModel::create([
					'name' => '',
					'sex' => 0,
				]);
			}
			
	> 自动时间戳
		
		->	数据表中要有两个字段：create_time、update_time
		
		×->	config/database.php >> 'auto_timestamp'=>true
		
		->	模8
			protected $autoWriteTimestamp = true;	// 开启当前模型的自动时间戳功能
			protected $createTime = 'create_time';	// 设置用户自定义的新增字段名
			protected $updateTime = 'update_time';	// 设置用户自定义的更新字段名
			
	> 验证
	
		->	验证器类（位置不固定）
		
			=>	验证类
				namespace app\index\controller;
				use think\Validate;
				class Validator extends Validate{
					// 验证规则。命名固定
					protected $rule = [
						'name' => 'require|length:5,15';
						'sex' => 'in:0,1';
						'age' => 'require|between:18,60';
						'salary' => 'require|gt:1500';
					];
					// 错误信息
					protected $message = [
						'name.require' => '员工姓名不能为空',
						'name.length' => '姓名长度为5~15',
						'sex.in' => '姓名只能为男或女',
						...
					];
				}
				
			=>	控制器
				namespace app\index\controller;
				use think\Container;
				use app\index\controller\Validator;
				class Ver extends Container{
					public function demo(){	// 验证器
						$data = [];
						$validator = new Validator();
						$re = $validate -> check($data);	// 返回true或false
						if($re){
							return '验证通过';
						}else{
							dump($validator->getError());
						}
					}
				}
				
			=>	控制器简化（ $this->validate($data,$rule,$mess) ）
				namespace app\index\controller;
				use think\Container;
				class Ver extends Container{
					public function demo(){	// 验证器
						$data = [];
						$rule = 'app\index\controller\Validator';	// 引入验证规则类
						$re = $this -> validate($data,$rule);		// 返回true或错误信息
						if(true !== $re){
							true $re;
						}
						return '验证成功';
					}
				}
				
				
		->	简单的验证控制器
			namespace app\index\controller;
			use think\Container;
			class Ver extends Container{
				public function demo(){	// 验证器
					$data = [];
					$rule = ['age' => 'between:10,50'];
					$mess = ['age.between' => '年龄必须在10到50之间'];
					$re = $this -> validate($data,$rule,$mess);		// 返回true或错误信息
					if(true !== $re){
						true $re;
					}
					return '验证成功';
				}
			}
			
		
		->	独立验证
			public function co(){
				$rule = ['age' => 'require|between:8,28'];	// 创建验证规则
				$mess = [	// 创建错误信息
					'age.require' => '年龄不能为空',
					'age.between' => '年龄必须在8到28之间'
				];
				$data = [];	// 创建数据
				$validate = \think\Validate::make($rule,$mess);	// 创建验证规则并返回验证对象
				$re = $validate -> check($data);			// 返回true或错误信息
				return $re ? '验证通过' : $validate -> getError();
			}
			
 * 视图
	
	->	视图模板配置：config\template.php
 
	->	视图文件存放：application\index\view\控制器名文件夹\操作方法名文件
 
	->	模板展示：控制器
	
		=>	视图类
			namespace app\index\controller;
			use think\facade\View;
			class In{
				public function test(){
					$name = 'sjfklsd';
					// 使用视图渲染内容
					return View::display($name);	
					// fetch('模板表达式')指定一个模板进行内容输出
					// 模板表达式：模块@控制器/操作方法
					return fetch('index@in/test',['name'=>$name]);
				}
			}
			
		=>	继承Controller
			namespace app\index\controller;
			use think\Controller;
			class In extends Container{
				public function test(){
					$name = 'sjfkej';
					// 通过controller中的$view属性调用
					return $this -> view -> fetch('index@in/test',['name'=>$name]);	// 传参赋值
					// 简化：越过$view属性调用
					return $this -> fetch('index@in/test',['name'=>$name]);	// 传参赋值
					// 简化：通过默认规则来定位模板
					return $this -> fetch('test',['name'=>$name]);	// 传参赋值
					// 简化：通过默认规则来定位模板
					return $this -> fetch('',['name'=>$name]);	// 传参赋值
					// 简化：通过默认规则来定位模板
					$this -> assign('name',$name);	// 模板赋值
					$this -> view -> name = $naem;	// 对象赋值
					$this -> view -> salary = 5000;	// 对象赋值
					return $this -> fetch();		// 展示模板
				}
			}
			
		×=>	助手函数 view() 不依赖任何函数
			namespace app\index\controller;
			class In{
				public function test(){
					$name = 'skdjfl';
					return view('test',['name'=>$name]);
				}
			}
			
	->	模板展示：视图中
			...{$name}...
			...{$salary}...
			
	->	模板过滤与替换
		
		=>	控制器
			namespace app\index\controller;
			use think\Controller;
			class In extends Controller{
					public function test(){
					$this -> view -> name = 'abcd';
					$this -> view -> salary = 5000;
					// 替换匿名函数
					$filter = function($con){
						str_replace('abc','安吉斯',$con);
					}
					// 实现替换
					return $this -> filter($filter) -> fetch();
				}
				public function test(){
					$this -> view -> name = 'abcd';
					$this -> view -> salary = 5000;
					// 实现过滤
					return $this -> filter(function($con){
						str_replace('abc','',$con);
					}) -> fetch();
				}
			}
			
	> 模板布局
	
		->	全局配置
	
			=>	开启模板布局：config/template.php
				'layout_on' => true,		// 开启模板布局
				'layout_name' => 'layout',	// 制定模板布局文件
				
			
			=>	创建公共文件：application/index/view/public/ *.html
			
			=>	创建 layout 文件：application/index/view/layout.html
				{include file="public/header" /}	// 头部
				{__CONTENT__}						// 默认部分
				{include file="public/footer" /}	// 尾部
			
			=>	控制器
				namespace app\index\controller;
				use think\Controller;
				class In extends Controller{
					public function test(){
						$this -> view -> fetch();
					}
				}
				
			=>	创建test视图：application/index/view/in/test.html
				{__NOLAYOUT__}	// 禁止当前模板引用 layout
				......
				
		->	模板标签配置
				
		
			=>	创建公共文件：
				application/index/view/public/header.html
				application/index/view/public/footer.html
			
			=>	创建 layout 文件：application/index/view/layout.html
				{include file="public/header" /}	// 头部
				{__CONTENT__}						// 默认部分
				{include file="public/footer" /}	// 尾部
			
			=>	控制器
				namespace app\index\controller;
				use think\Controller;
				class In extends Controller{
					public function test(){
						$this -> view -> fetch();
					}
				}
				
			=>	创建test视图：application/index/view/in/test.html
				{layout name="layout" /}
				......
				
		->	动态配置：无需配置、无需添加标签
			
			1=>	创建 layout 文件：application/index/view/layout.html
				{include file="public/header" /}	// 头部
				{__CONTENT__}						// 默认部分
				{include file="public/footer" /}	// 尾部
		
			1=>	控制器
				namespace app\index\controller;
				use think\Controller;
				class In extends Controller{
					public function test(){
						$this -> view -> engine -> layout(true);	// 开启布局
						$this -> view -> engine -> layout(false);	// 关闭布局
						$this -> view -> fetch('test');
					}
				}
			
			2=>	创建 layout 文件：application/index/view/layout.html
				{include file="public/header" /}	// 头部
				{__TEXT__}							// 默认部分。__TEXT__为自定义
				{include file="public/footer" /}	// 尾部
		
			2=>	控制器
				namespace app\index\controller;
				use think\Controller;
				class In extends Controller{
					public function test(){
						$this -> view -> engine -> layout('layout','{__TEXT__}');
						$this -> view -> fetch('test');
					}
				}
			
			3=>	创建 layout 文件：application/index/view/layout.html
				{include file="public/header" /}	// 头部
				{__CONTENT__}						// 默认部分
				{include file="public/footer" /}	// 尾部
		
			3=>	控制器
				namespace app\index\controller;
				use think\Controller;
				class In extends Controller{
					public function test(){
						return $this 
							-> view 				// 调用视图对象
							-> engine 				// 模板引擎对象
							-> layout(true) 		// 开启布局
							-> fetch('in/test');	// 必须填写参数，且参数至少达到控制器
					}
				}
			
	> 模板继承
			
		->	创建基础模板：application/index/view/base.html	
		
			=>	{block name="header"}		// 基础（父）模板中只允许出现 block 标签
					{include file="public/header" /}
				{/block}
				{block name="main"}是否及时缴费：{/block}
				{block name="course"}课程名称：{/block}
				{block name="name"}课程价格：{/block}
				{block name="footer"}
					{include file="public/footer" /}
				{/block}
				<a href=""></a>		// 父模板中写在区块（block）外的标签将被原样输出
			
		->	创建子模板：application/index/view/test.html	// 子模板中区块的顺序不固定
			
			=>	{extend name="base" /}
				{block name="main"}		// 重写父模板中的主体部分
					记得覅是的
				{/block}
				{block name="course"}		
					{__block__} PHP编程	// {__block__} 用于引用父模板中的内容
				{/block}
				{block name="name"}{/block}	// 当子模板中的区块间无内容时，父模板中的内容不输出
				<a href=""></a>				// 子模板中，写在区块（block）外的标签将被忽略
				
				
 * 循环标签
 
	> foreach
 
		=>	模型
			namespace app\index\model;
			use think\Model;
			class Staff extends Model{
				protected $table = "staff";
				protected $pk = "id";
			}
	 
		=>	控制器
			namespace app\index\controller;
			use think\Container;
			use app\index\model\Staff as StaffModel;
			class Staff extends Controller{
				public function test(){
					$stas = StaffModel::all(function($query){
						$query -> field(['id','name','age']);
					});
					$this -> view -> assign('stas',$stas);
					return $this -> view -> fetch();
				}
			}
		
		=>	视图
			{foreach $stas as $sta}
				<tr>
					<td>{$sta.id}</td>
					<td>{$sta.name}</td>
					<td>{$sta.age}</td>
				</tr>
			{/foreach}
			
	> volist
	
		=>	模型：同上
		
		=>	控制器：同上
	
		=>	视图
		// offset：偏移量，原生foreach中的 $k 偏移个数
		// length：长度，输出条数
		{volist name="stas" id="sta" offset="3" length="5"}
			<tr>
				<td>{$sta.id}</td>
				<td>{$sta.name}</td>
				<td>{$sta.age}</td>
			</tr>
		{/volist}
		// 模除运算
		{volist name="stas" id="sta" mod="2"}
			{eq name="mod" value="1"}	// 输出偶数行的记录
			{eq name="mod" value="0"}	// 输出奇数行的记录
				<tr>
					<td>{$sta.id}</td>
					<td>{$sta.name}</td>
					<td>{$sta.age}</td>
				</tr>
			{/eq}
		{/volist}
		// 当前记录为空（无数据）
		{empty name="stas"}
			<h3>无数据！</h3>
		{else /}
			{volist name="stas" id="sta"}
				<tr>
					<td>{$sta.id}</td>
					<td>{$sta.name}</td>
					<td>{$sta.age}</td>
				</tr>
			{/volist}
		{/empty}
		
	
 * 分页

	=>	模型
		namespace app\index\model;
		use think\Model;
		class Staff extends Model{
			protected $table = "staff";
			protected $pk = "id";
		}
 
	=>	控制器
		namespace app\index\controller;
		use think\Container;
		use app\index\model\Staff as StaffModel;
		class Staff extends Controller{
			public function test(){
				// 分页配置
				$config = [
					'type' => 'bootstrap',	// 驱动类型名
					'var_page' => 'page'	// 分页变量名
				];
				$num = 5;					// 每页显示的条数
				$simple = false;			// 是否为简单分页。简单分页：仅有上一页、下一页
				
				// 用模型获取所有分页数据
				$paginage = StaffModel::paginage($num,$simple,$config);	// 返回的是分页对象
				
				// 渲染分页HTML代码，返回分页变量
				$page = $paginage -> render();
				
				// 将分页数据赋值给模板
				$this -> view -> assign('stas',$paginate);
				
				// 将分页变量赋值给模板
				$this -> view -> assign('page',$page);
				
				// 渲染模板
				return $this -> view -> fetch();
			}
		}
		
	=>	视图
		<table>
			{volist name="stas" id="sta" offset="3" length="5"}
				<tr>
					<td>{$sta.id}</td>
					<td>{$sta.name}</td>
					<td>
						{between name="sta.age" value="20,30"}小年轻{/between}	// 年龄在20~30之间
						{between name="sta.age" value="31,50"}中年人{else /}准备退休吧{/between}
					</td>
					<td>
						{in name="sta.sex" value="0,1"}	// 性别的合法值为 0 或 1
							{if $sta.sex == 0}男
							{else /}女
							{/if}
						{/in}
					</td>
				</tr>
			{/volist}
		</table>
		{$page|raw}	// 输出导航条并解析
		
		
 * 文件上传
 
	->	单文件上载
 
		=>	视图
			<form action="{:url('test')}" method="post" enctype="multipart/form-data">
				<input type="file" name="fname" />
				<input type="submit" value="上传" />
			</form>
			
		=>	控制器
			namespace app\index\controller;
			use think\Controller;
			class Test extends Container{
				// 文件上传处理
				public function test(){
					$file = Request::file('fname');		// 获取文件信息
					
					if(is_null($file)){					// 判断上载文件是否为空
						$this -> error('请选择您需要上传的文件！');
					}
					
					// 将文件移动到服务器指定目录
					// 成功返回文件对象，失败返回false
					$res = $file -> validate(['ext'=>'jpg,jpeg,png']) -> move('uploads');
					
					// 验证文件：文件大小、文件类型
					if(false == $res){
						$this -> error($file -> getError());
					}
					$this -> success('上传成功');
				}
			}
	
			
 * 微信公众号开发
 
	> 一台公网可访问的主机
	
		->	云主机
		->	虚拟主机
		->	本地映射（花生壳，ngrok）