<?php

// 魔术方法

// 在类内部调用本类中一个不可访问的方法时，无论是面向对象方法还是静态方法，调用__call
// 在类外部调用一个类中一个不可范文的方法时，面向对象触发__call，静态方式触发__callStatic
__call($fun_name, $args)
__callStatic($fun_name, $args)









