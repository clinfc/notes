
————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	商品状态回显：
		<?php
		$f1 = "否";
		$f2 = "否";
		$f3 = "否";
		$sum = 0;
		if(isset($_POST["goods"])){
			//接收所有来自表单的商品状态
			$goods = $_POST["goods"];
			//数组累加求和
			for($i=0;$i<count($goods);$i++){
				$sum += $goods[$i];
			}
			//判断精品状态是否选中
			if($sum & 4){
				$f1 = "是";
			}
			//判断新品状态是否选中
			if($sum & 2){
				$f2 = "是";
			}
			//判断热销状态是否选中
			if($sum & 1){
				$f3 = "是";
			}
		} ?>
		请选择商品状态：<br/>
		<form action="#" method="post">
			<input type="checkbox" name="goods[]" value="4" <?php if($f1=="是") echo "checked"?> />精品
			<input type="checkbox" name="goods[]" value="2" <?php if($f2=="是") echo "checked"?> />新品
			<input type="checkbox" name="goods[]" value="1" <?php if($f3=="是") echo "checked"?> />热销<br/>
			<input type="submit" value="提交" />
		</form>
		您所选商品状态为：<br/>
		精品：<?php echo $f1;?><br/>
		新品：<?php echo $f2;?><br/>
		热销：<?php echo $f3;?><br/>
————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	排序：
		<?php
		$arr = array(99,36,59,48,71,21,0,2,61);
		for($i=0;$i<count($arr);$i++){
			for($j=$i+1;$j<count($arr);$j++){
				if($arr[$i] > $arr[$j]){
					$temp = $arr[$i];
					$arr[$i] = $arr[$j];
					$arr[$j] = $temp;
				}
			}
		} ?>
————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	简单计算器：
		<?php
		$one = "";
		$tow = "";
		$char = "";
		$result = "";
		function counts($one,$tow,$char){
			switch($char){
				case "+": $rel = $one + $tow; break;
				case "-": $rel = $one - $tow; break;
				case "*": $rel = $one * $tow; break;
				case "/":
					if($one != 0){
						$rel = $one / $tow;
					}else{
						$rel="除数不能为0";
					}
					break;
				case "%":
					if($one != 0){
						$rel = $one % $tow;
					}else{
						$rel="除数不能为0";
					}
					break;
			}
			return $rel;
		}
		if(isset($_POST["one"])){
			$one = $_POST["one"];
			$tow = $_POST["tow"];
			$char = $_POST["char"];
			$result = counts($one,$tow,$char);
		}
		?>
		<form action="#" method="post"  >
			<input type="text" name="one" value="<?php echo $one; ?>" />
			<select name="char">
				<option vlaue="+" <?php if($char=="+") echo "select"; ?>>+</option>
				<option vlaue="-" <?php if($char=="-") echo "select"; ?>>-</option>
				<option vlaue="*" <?php if($char=="*") echo "select"; ?>>*</option>
				<option vlaue="/" <?php if($char=="/") echo "select"; ?>>/</option>
				<option vlaue="%" <?php if($char=="%") echo "select"; ?>>%</option>
			</select>
			<input type="text" name="tow" value="<?php echo $tow;  ?>" />
			<input type="submit" value="=" />
		</form>
		<input type="text" value="<?php echo "$result" ?>" />
————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————		
		
————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————		
		
————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————

————————————————————————————————————————————————————————————————————————————————————————————————————————————————		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		