
	目录：
		表单传值
		文件上传
		mysql扩展



	表单传值
	
	传值方式：get | post
		
	PHP接收传值方式：
		<?php
			$_GET["地址参数|表单控件名"]
			$_POST["表单控件名"]
			$_REQUEST["地址参数|表单控件名"] = $_GET + $_POST
		?>
	复选框数据处理：
		<form method=" get | post " action="*.php">
			<input type="checkbox" name="hobby[]" value="fruit" />水果
			<input type="checkbox" name="hobby[]" value="read" />阅读
			<input type="checkbox" name="hobby[]" value="game" />游戏
			<input type="checkbox" name="hobby[]" value="play" />运动
			<input type="submit" value="提交" />
		</form>
		<?php
			$xueli=$_GET["hobby"] | $xueli=$_POST["hobby"];	//数据接收
			$xueli_str_in = implode($xueli, " ");			//将数组值以空格连接形成字符串 ==> 保存到数据库
			$xueli_str_out = explode(" ", $xueli_str_in);	//将字符串以空格分割形成数组 ==> 从数据库取出
		?>
	下拉框数据处理：
		<form method=" get | post " action="*.php">
			<select name="xueli[]" multiple="multiple">
				<option value="1">初中</option>
				<option value="2">高中</option>
				<option value="3">专科</option>
				<option value="4">本科</option>
			</select>
			<input type="submit" value="提交" />
		</form>	
		<?php 
			$xueli=$_GET["xueli"] | $xueli=$_POST["xueli"];
		?>
	
	
	文件上传
	
	原理：文件从用户本地电脑通过传送方式（web表单）保存到服务器所在的电脑指定的目录下
	
	表单要求：
		1、method属性：必须为“post”
		2、enctype属性：form表单属性，主要是规范表单数据编码方式
		3、上传表单：“file” 表单
		<form method="post" enctype="multipart/form-data" action="*.php">
			<input type="file" name="files" />
			<input type="submit" name="" value="提交" />
		</form>	
	PHP处理：
		$_FILES属性：
			name：文件原名
			type：MIME（多功能互联网邮件扩展）类型，用来在计算机中客户端识别文件类型
			tmp_name：文件上传到服务器后操作系统保存的临时路径
			error：文件上传代号，用于告知文件上传中出现的错误
			size：文件大小（PHP根据实际需求来确定是否该保留）
		<?php
			//获取文件信息
			$file=$_FILES["files"];
			//判断是否为上传文件：临时文件
			if(is_uploaded_file($file['tmp_name'])){
				//判断文件保存是否成功
				if(move_uploaded_file($file['tmp_name'],'uploads/'.$file['name'])){
					echo '文件保存成功';
				}else{
					echo '文件保存失败';
				}
			}else{
				echo "文件上传失败";
			}
		?>
		
	多文件上传：
		商品需要上传多个图片进行展示：
			同名表单：针对一个内容，不同文件说明
			<form method="post" enctype="multipart/form-data" action="*.php">
				<input type="file" name="files[]" />
				<input type="file" name="files[]" />
				<input type="file" name="files[]" />
				<input type="file" name="files[]" />
				<input type="submit" name="" value="提交" />
			</form>
			<?php
				if(isset($_FILES['files']['name|tmp_name|error|size|type']) && is_array($_FILES['files']['name|tmp_name|error|size|type'])){
					$files = array();
					foreach($_FILES['files']['name'] as $key => $file){
						$files[] = array(
							'name' => $file,
							'tmp_name' => $_FILES['files']['tmp_name'][$key],
							'type' => $_FILES['files']['type'][$key],
							'error' => $_FILES['files']['error'][$key],
							'size' => $_FILES['files']['size'][$key]
						);
					}
				}
			?>
		商品需要上传多维度图片进行说明
			不同名表单：不同内容表单名不同	
			<form method="post" enctype="multipart/form-data" action="*.php">
				<input type="file" name="files1" />
				<input type="file" name="files2" />
				<input type="file" name="files3" />
				<input type="file" name="files4" />
				<input type="submit" name="" value="提交" />
			</form>
			注：form表单 “ enctype ” 属性值必须为 “ multipart/form-data ”
			注：form表单 “ method ” 属性值必须为 “ post ”
			<?php
				foreach($_FILES as $file){
					if(is_uploaded_file($file['tmp_name'])){
						move_uploaded_file($file['tmp_name'],'uploads/'.$file['name'];
					}
				}
			?>	
			
	将文件上传封装成函数：
		条件判断：
			1、文件类型判断，外部指定MIME类型
			2、文件存储位置，外部指定
			3、文件格式限制，外部限定
			4、文件的大小，外部指定
		实现文件上错车：
			1、成功：结果可以在以后看到：需要将文件的路径和文件名字返回（存储到数组库）
			2、失败：返回false，指定错误原因（引用参数）
		<?php
			/*
			 * @param1 array  $file 				上传的文件信息；以为5元数组（name\tmp_name\type\error\size）
			 * @param2 array  $allow_type			允许上传的MIME类型
			 * @param3 string $path					存储路径
			 * @param4 string &$error				出现错误的原因
			 * @param5 array  $allow_format			允许上传的文件格式
			 * @param6 int 	  $max_size = 2000000	允许上传的最大值
			*/
			function upload_single($file,$allow_type,$path,&$error,$allow_format = array(),$max_size = 2000000){
				//判断文件是否有效
				if(!is_array($file) || !isset($file['error'])){//文件无效
					$error = "文件无效";
					return false;
				}
				//判断文件路径是否有效
				if(!is_dir($path)){//文件路径不存在
					$error = "文件存储路径不存在";
					return false;
				}
				//判断文件上传过程中是否出错
				switch($file['error']){
					case 1:
					case 2:
						$error = "文件超出服务器允许大小";
						return false;
					case 3:
						$error = "文件上传出错，只上传了一部分";
						return false;
					case 4:
						$error = "用户未选择上传的文件";
						return false;
					case 6:
					case 7:
						$error = "文件保存失败";
						return false;
				}
				//判断MIME类型
				if(!in_array($file['type'],$allow_type)){
					$error = '当前文件类型不允许上传';
					return false;
				}
				//判断后缀是否允许
				$ext = ltrim(strrchr($file['name'],'.'),'.');	//取出后缀，默认带“.”，使用ltrim去除
				if(!empty($allow_format) && !in_array($ext,$allow_format)){	//!empty($allow_format)表示不为空
					$error = '当前文件的格式不允许上传';
					return false;
				}
				//判断当前文件大小是否满足当前要求
				if($file['size'] > $max_size){
					$error = '当前文件过大，大小为'.$max_size.'字节';
					return false;
				}
				//构造问价名字：类型_年月日_随机字符串.$ext
				$fullname = strstr($file['type'],'/',true).data('YYYYmmdd');
				for($i = 0;$i <4;$i++){	//产生随机字符串
					$fullname .= chr(mt_rand(65,90));
				}
				$fullname .= '.' .$ext;
				//移动到指定目录
				if(!is_uploaded_file($file['tmp_name'])){
					$error = '错误：不是上传文件';
					return false;
				}
				if(move_uploaded_file($file['tmp_name']),$path.'/'.$fullname)){
					return $fullname;
				}else{
					$error = '文件上传失败';	//移动失败
					return false;
				}
			}
		?>
			
			
	mysql扩展
		<?php
			//连接数据库。
			//mysqli_connect默认是对一个服务器连接一次，如果需要对一个资源访问两次，则使用第四个参数：true
			$link = mysqli_connect( localhost|127.0.0.1|ip, username, password, database_name ) or die("数据库连接失败");
			
			//设置PHP与数据库引擎交互的字符集
			mysqli_query($link,"set names utf8");	//此处为 “utf8” 而非 “utf-8”
			mysqli_set_charset('utf8');
			
			//选择数据库
			//mysqli_query('use database_name');
			
			//关闭连接
			mysqli_close();
		?>
		
	http协议
		<?php
			//http请求（请求行、请求头、请求体）
			
			//内容类型，MIME类型，使浏览器能正确解析内容
			header('Content-type:text/html;charset:utf-8');
			
			//内容类型，MIME类型扩展，激活浏览器文件下载对话框
			header('Content-disposition:attachment;filename=file_name');
			
			//立即重定向
			header('location:*.php');
			
			//延迟重定向
			header('refresh:3;url=*.php');
			
			
			//Curl扩展
			
			//开启会话
			$cu = curl_init();
			
			//设置连接选项
			curl_setopt($cu,CURLOPT_URL,'*.php');			//文件选项
			curl_setopt($cu,CURLOP_RETURNTRANSFER,true);	//文件流形式返回数据（不直接显示）
			curl_setopt($cu,CURLOP_HEADER,0);				//是否获取响应头信息
			
			//执行连接
			$content = curl_exec($cu);
			
			//关闭资源
			curl_close($cu);
		?>
		
	文件编程
		<?php
			文件操作（目录操作、文件操作）
			
			目录操作：文件夹，用于存放文件的特殊文件
			
				//创建目录结构，返回true或false，其中 “@” 为错误抑制符
				$res = @mkdir('path');	
				
				//删除目录结构，其中 “@” 为错误抑制符
				$res = @rmdir('path');		
				
				//读取资源
				//读取方式：将文件夹（路径）按照资源方式打开
				$open = opendir();		//打开资源，返回一个路径资源，包含指定目录下的所有文件、文件夹	
				$read = readdir();		//从资源中读取当前指针所在的文件夹名字，然后指针下移，知道指针移出资源
				
				//输出读取到的资源 / 遍历
				$open = opendir('path|file');
				while($read = readdir($open)){
					echo $res,'<br/>';
				}
				
				//关闭资源
				closedir($open);
			
			文件操作：用来存放内容
			
				//得到当前 目录/文件 的上一层路径
				dirname('path|file');
				
				//得到当前目录的真实路径，如果是文件，返回false
				realpath('path');
				
				//判断指定路径是否是目录，返回true或false
				is_dir('')；
				
				//获取指定路径下的所有文件信息，以数字形式返回
				scandir('');
				
			递归遍历目录
			/输出指定目录下的所有文件和目录，及目录内的所有内容
			$dir = '';
			/*
			 *@param1 string $dir 		指定路径
			 *@param2 int 	 $level=0	层级，默认顶层
			*/
			function mydir($dir, $level = 0){
				if(!is_dir($dir){	//保证文件安全，如果不是路径，程序将不再执行
					dir($dir.'<br/>');
				}
				$files = scandir($dir);	//读取全部路径信息，遍历输出
				foreach($files as $file){
					echo str_repeat("$nbsp;$nbsp;",$level);	//层级结构
					echo $file.'<br/>';
					if($file == '.' || $file == '..'){	//排除.和..
						continue;
					}
					$file_dir = $dir.'/'.$file;	//构造路径
					if(is_dir($file_dir)){	//判断路径
						mydir($file_dir, $level + 1);	//递归调用
					}
				}
			}
			
			常见文件操作函数
			//PHP5
			$get = @file_get_contents('path');		//获取指定文件的所有内容
			$put = file_put_contents($get, 'file');	//将一个字符串写入文件（可以在指定路径创建文件，但不可以创建路径）
			//PHP4
			$fo = fopen('path',mode);		//打开资源。mode打开的模式
			$fr = fread($fo,number);		//读取一定长度的资源
			$fw = fwrite($fo,'content');	//写入文件
			$fc = fclose($fo);				//关闭资源
			//其他
			is_file('file');			//判断文件是否存在（不识别路径）
			filesize('file');			//获取文件大小
			file_exists('file|path');	//判断文件是否存在（识别路径）
			unlink('file');				//删除文件（取消文件与磁盘地址的连接）
			filemtime();				//获取文件最后一次修改的时间
			fseek();					//设定fopen打开的文件的指针位置
			fgetc();					//一次获取一个字符
			fgets();					//一次获取一个字符串（默认为一行，大于一行只读一行）
			file();						//读取整个文件，以行为单位，返回数组
		?>
		
	cookie
		<?php
			//设置cookie
			setcookie('age','20');					//普通cookie，关闭网站即失效
			setcookie('age','20',0);				//“0”生命周期，关闭网站即失效
			setcookie('age','20',7*24*60*60);		//格林威治时间7天过期
			setcookie('age','20',time()+7*24*60*60);//格林威治时间从现在开始7天后过期
			
			//“删除”cookie（控制生命周期）
			setcookie('age','');					//清空内容
			setcookie('age','20',time());			//设定时间戳过期
			
			//cookie作用范围
			setcookie('age','20',time(),'/');		//全局访问
			
			//cookie跨子域
			setcookie('age','20',time(),'/','www.sie.com');	//指定域名cookie
			
			//读取cookie
			$cookie = $_COOKIE[];
			
			//数组数据（伪装数组）
			setcookie('age[0]','00');
			setcookie('age[1]','10');
			setcookie('age[2]','20');
			setcookie('age[3]','30');
			setcookie('age[4]','40');
			
			//数组数据访问
			$res = $_COOKIE;			//访问所有数据
			$res = $_COOKIE['age'][2];	//访问单个数据
		?>
	session
		<?php
			//开启session
			session_start();
			
			//设置session数据（无限制）
			$_SESSION['name'] = 'yu';
			$_SESSION['hobby'] = array('play','read','football');
			
			//访问session数据
			$res = $_SESSION['name'];
			
			//清除session数据（不会删除对应的session文件）
			unset($_SESSION[name]);		//删除单个session数据
			$_SESSION = array();		//删除全部session数据
			
			//销毁session（删除对应的session文件）
			session_destroy();
			
			//session基础设置
			session.name
			session.auto_start			//是否自动启动session（无需手动session_start）
			session.save_handler		//session数据保存方式，默认为文件形式
			session.save_path			//session文件的默认保存位置
			
			//session常用设置
			session.cookie_lifetime		//sessionID在浏览器端对应cookie的生命周期，默认会话结束
			session.cookie_path			//sessionID在浏览器存储之后允许服务器访问的路径（cookie的作用范围）
			session.cookie_domain		//cookie允许的子域，默认当前主机访问
			
			//垃圾回收参数设置
			session.gc_maxlifetime = 1440	//规定session文件的最大生命周期为1440秒
			session.gc_probability = 1		//垃圾回收触发概率分子
			session.gc_divisor = 1000		//垃圾回收触发概率分母
			
			//配置方式
			php.ini		全局配置
			ini_set		脚本配置，项目级配置
		?>
	1、禁用cookie后如何使用session
	
	2、禁用cookie后不能使用session的原因
		session需要利用cookie技术来保存sessionID，从而使得PHP能后跨脚本时得到相同的sessionID，从而访问session文件
	3、如何实现无cookie使用session
		<?php
			//方案一
			//脚本一种
				session_start();
				$id = session_id();			//获取sessionID
				$name = session_name();		//获取session名字
				$_SESSION['age'] = 20;		//设置session 
				echo "<a href='*.php?{$name}={$id}'>onclick</a>";	//传递到另一个脚本
			//脚本二中
				$name = session_name();	//接收数据
				$id = $_GET[$name];		//接收数据
				session_id($id);		//设置sessionID，阻止session_start产生新ID，告诉它已存在sessionID
				session_start();		//开启session
				var_dump($_SESSION);	//访问session数据
				
			/*方案二：php.ini
				原因一：默认session配置只允许使用cookie保存sessionID
				原因二：默认关闭了其他能够传送数据的方式，只保留了cookie
			*/
			//php.ini
				session.use_only_cookies = 0
				session.use_trans_sid = 1
			//脚本一 
				session_start();
				$_SESSION['age'] = 20;
				echo "<a href='*.php'>oclick</a>";
		?>
		
		
	GD图像处理
		<?php
			//创建画布资源
			$img = imagecreate(width,height);			//创建空白画布（背景为白色）
			$img = imagecreatetruecolor(width,height);	//创建真彩画布（背景为黑色，需填充）
			$img = imagecreatefromjpeg('path');			//打开JPEG资源
			$img = imagecreatefromgif('path');			//打开GIF资源
			$img = imagecreatefrompng('path');			//打开PNG资源
			
			//操作画布资源
			$color = imagecolorallocate($img,r,g,b);	//分配颜色（根据RGB指定画布资源分配一组颜色，返回颜色句柄）
			imagefill($img,x_s,y_s,$color); 
			
			//输出画布资源
			imagepng($img);
			imagejpeg($img);
			
			//销毁画布资源
			imagedestroy($img)
		?>
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
				
				
				
				