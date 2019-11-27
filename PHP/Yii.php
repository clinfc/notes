<?php

/**
 * 路由配置：
 *  config/web.php => urlManager
 * 
 * 错误处理：
 *  config/web.php => errorHandler => errorAction
 * 
 * 持续迭代（CI）之版本号实现
 *  版本号作用：
 *    1、记录系统的成长迭代
 *    2、可以方便错误回滚
 *    3、解决静态文件缓存
 *  设置：
 *    在入口文件处定义一个版本号常量
 * 
 * GII 生成 Module 实习业务架构调整
 *  GII配置：
 *    1、config/web.php => allowedIPs
 *    2、浏览器访问：custom-domain-name/gii
 */