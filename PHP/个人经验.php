

	1、页面跳转方法
		<html>
			<head>
				//定时刷新但不跳转
				<meta http-equiv="refresh" content="2" />				
				//定时刷新并跳转		
				<meta http-equiv="refresh" content="2;url=*.php?act=123" />		
			</head>
			<body>
				//点击跳转
				<button type="button" onClick="location='*.php?act=123'" value="" />
				<button type="button" onclick="window.location.href='*.php?act=page'" />
			</body>
		</html>
		<?php
			//立即跳转
			header('location:*.html?act=123');
			//延迟3秒跳转
			header('refresh:3;url=*.php?act=123');
			
			require '*.php';
			require_once('./*.php');
		?>
		
	2、$_Files['name']接收数据提示“name”未定义
		<html>
			<!-- form表单必须有属性：enctype="multipart/form-data" -->
			<form method="post" action="" enctype="multipart/form-data" ></form>
		</html>
		
	3、验证码
	<?php 
		$check=rand(1000,9999);
		Session_start();
		$_SESSION["check"] = $check;
		$img = imagecreate(100,40);
		imagefill($img,0,0,imagecolorallocatealpha($img,127,127,127,100));
		$y1=rand(0,30);
		$y2=rand(0,30);
		$y3=rand(0,30);
		$y4=rand(0,30);
		imageline($img,0,$y1,70, $y3,ImageColorAllocate($img,55,255,25));
		imageline($img,0,$y2,70, $y4,ImageColorAllocate($img,55,55,255));
		$strx=rand(3,15);
		$stry=rand(2,15);
		imagestring($img,5,$strx,$stry,substr($check,0,1),ImageColorAllocate($img,220,20,60));
		$strx+=rand(15,20);
		$stry=rand(2,15);
		imagestring($img,5,$strx,$stry,substr($check,1,1),ImageColorAllocate($img,255,140,0));
		$strx+=rand(15,20);
		$stry=rand(2,15);
		imagestring($img,5,$strx,$stry,substr($check,2,1),ImageColorAllocate($img,0,0,0));
		$strx+=rand(15,20);
		$stry=rand(2,15);
		imagestring($img,5,$strx,$stry,substr($check,3,1),ImageColorAllocate($img,153,50,204));
		Header("Content-type: image/PNG");
		ImagePNG($img);
		imagedestroy($img);
	?>
	<html>
		<input type="text" name="code" placeholder="验证码" />
		<img  src="code.php" onclick="this.src = this.src + '?' + new Date().getTime();" />
	</html>
	<?php
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
		if($_SESSION["check"]!=intval($_POST["code"])){
			echo '<script>alert("验证码错误！");</script>';
			header("refresh:0.01;url='jump.php?act=tologin'");
			exit();
		}
	}?>
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	