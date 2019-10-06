<?php

// 初始化curl
$curl = curl_init();
// 设置访问的网页
curl_setopt($curl,CURLOPT_URL,"www.baidu.com");
// 执行后不打印出来
curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
// 执行
$result=curl_exec($curl);
// 关闭cURL
curl_copy_handle($curl);
