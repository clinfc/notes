<?php

class Pro {}				// 类名首字母大写，驼峰命名
$p = new Pro();				// 类实例化


// 属性、方法
class Pro {
	public name;			// 定义属性
	public age = 15;		
	public function na(){}	// 定义方法
}
echo $p->name;				// 调用属性
echo $p->na();				// 调用方法

	
// 常量
// const用于类成员常量的定义，一经定义，不可改变
// const可在类中使用，define不能
// const不能在条件语句中定义
// const定义的常量区分大小写，而define可以通过第三个参数（为true不敏感）来指定大小写是否敏感

class Pro {
	const NAME = "礼拜";	// 定义常量
}
echo Pro::NAME;				// 调用常量
echo $p::NAME;				// 调用常量


// 创建类时如果需要初始化操作
class Pro {
	
	// 初始化方法一：构造函数
	function __construct(){	
		// 初始化操作
	}
	
	// 初始化方法二：同类名函数
	function Pro(){			
		// 初始化操作
	}
}


// 析构函数
// 能够在对象释放时自动调用的方法
// 垃圾回收机制，当对象内部的操作执行完毕时，__destruct() 才会被调用，然后释放对象所使用的内存
class Pro {
	public __destruct(){
		
	}
}


// $this关键字
// 是用来访问当前对象中的对象属性和对象方法的系统变量
// 仅能在当前类中使用
class Pro {
	public $name;
	public __construct($name){
		$this->name = $name;
		$this->fl();
	}
	public function fl(){
		
	}
}


// 访问控制符
private		// 私有的：只能在本类内部使用
protected	// 受保护的：只有在本类、子类中可以访问
public		// 公共的：全局通用



// 自动加载函数
// 作用：快速取得对象名称并自动载入当前页面
// 此方法是在类意外单独的方法，也就是我们所谓的构造函数
function __autoload($class_name){
	include("{$class_name}.php");
}



// 类的继承
// 单一继承，可以多重继承，不可多继承；
// 子类（派生类）会继承父类（基类）的属性和方法
class Sta extends Pro {

}



// parent
// 访问父类中的属性或方法
class Pro {
	function test() {

	}
}
class Sta extends Pro {
	function text() {
		parent::test();
	}
}



// 方法重载（方法重写）
class Pro {
	function test() {

	}
}
class Sta extends Pro {
	function test() {
		
	}
}


// 范围操作符（::)
// 用于在类中（非对象中）访问成员及属性
// 使用场景：在类中，父类和子类具有相同的属性和方法时，可避免混淆。eg：parent::test();
// 使用场景：在类外，在没有创建对象的情况下访问类成员（类常量、静态方法、静态属性）。eg：Sta::test();



// 静态成员（类、函数、变量）
// 静态变量属于类，而不是属于类的实例，这个变量对所有实例都有效。
// 静态成员都不能引用实例方法或变量
// 静态变量和方法都不能通过实例对象引用，只能通过类名引用



// trait技术
// trait是一种为类似PHP的单继承语言而准备的代码复用机制。为减少单继承语言的限制
trait Pro {}	// 声明trait类
class Sta {
	use Pro;	// 使用trait类，不继承而引用
}


// 抽象类：abstract
// 一个抽象类中至少有一个抽象方法。抽象类可以和普通方法共存
// 抽象方法中不允许有方法体，即：{}
// 抽象类不允许被实例化，只允许被继承
// 继承的派生类中必须实现（重载）基类中所有抽象方法
abstract class Pro {
	function test() {}			// 允许普通方法
	abstract function usb();	// 抽象方法
}


// 接口：interface
// 一种成员属性全部为抽象的特殊抽象类，在程序中为规范作用
// 类中全部为抽象方法
// 接口不能实例化，只能被继承或引用；派生类必须重载所有抽象方法
interface Pro {
	const NAME;			// 对象属性必须为常量		
	function test();	// 接口中的抽象方法前不用加abstract，应为public
}
// 普通类实现（引用）接口
class Sta implements Pro1, Pro2, Pro3 {}
// 抽象类实现（引用）接口
abstract class Sta implements Pro1, Pro2, Pro3 {}


// self
// 访问当前类中的关键字，类似于 $this 关键字，但 $this 是需要实例化才可以使用，而self可以直接使用当前类中成员
// self一般用于访问类中的静态成员、常量、或其他特定内容


// final
// 定义类和方法的一个重要关键字
final class Prp {			// final定义的类不能被继承
	final function test(){}	// final定义的方法将不能被重载
}


// 对象复制与克隆
$clone_name = clone $name;



// 面向对象操作数据库
$myLink = new mysqli('db_host','db_user','db_pass'[,'db_name']);	// 连接数据库
$myLink -> select_db('db_name');	// 选择数据库
$myLink -> set_charset('utf8');		// 设置字符集
$result = $myLink -> query($sql);	// 数据操作，select返回结果集（资源）
$res = $myLink -> fetch_row();		// 整理结果集（资源）
$res = $myLink -> fetch_assoc();	// 整理结果集（资源）
$res = $myLink -> fetch_array();	// 整理结果集（资源）
$res = $myLink -> fetch_all();		// 整理结果集（资源）
$result -> close();					// 释放资源
$myLink -> close();					// 关闭链接


// 魔术方法：__get(string $name)
// 在读取不可访问（不存在或无权限）的属性值时自动调用该函数
class Pro {
	private $age;
	public $name;
	function __get($name) {		// 进行数据过滤
		if($this->name == 'admin'){
			return $this -> age;
		}else{
			return "无权访问";
		}
	}
}
$pro = new Pro();
$pro -> name = "admin";
echo $pro -> age;


// 魔术方法：__set(string $name, mixed $val)
// 设置不可访问（不存在或无权限）的值时自动调用该方法
class Pro {
	private $age;
	public $sex;
	public function __set($name, $val) {
		if($this -> sex == '男') {
			$this -> $name = $val;
		}else{
			$this -> name = 0;
		}
	}
}
$pro = new Pro();
$pro -> age = 18;


// 魔术方法：__toString
// 尝试直接访问（输出）一个被实例化对象时调用该方法
class Pro {
	public function __toString() {
		return "***";	// 必须有返回值
	}
}
$pro = new Pro();
echo $pro;


// 魔术方法：__sleep
// 可用于清理对象并返回一个包含对象中多有应该被序列化的变量名称的数组
// 长用于提交未提交的数据，或类似的数据清理工作。
// 如果该方法未返回任何内容，则null被序列化，并产生 E_NOTICE 级别的错误


// 魔术方法：__call
// 在类内部调用本类中一个不可访问的方法时，无论是面向对象方法还是静态方法，调用__call
__call($fun_name, $args)


// 魔术方法：__callStatic
// 在类外部调用一个类中一个不可范文的方法时，面向对象触发__call，静态方式触发__callStatic
__callStatic($fun_name, $args)