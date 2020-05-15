## HTML5 新增内容

>### 区块标签

* `section`
* `article`
* `nav`
* `aside`

>### 表单增强

* 日期、时间、搜索
* 表单验证
* placeholder、autofocus

>### 新增语义

* header：网站的头部、区块（article）的头部（内容完整都可以用）
* footer：网站的尾部、区块（article）的尾部（内容完整都可以用）
* section：零碎的区块。（新闻列表）（会进入大纲算法）
* article：完整的区块。（文章）（会进入大纲算法）
* nav：导航
* aside：不重要的内容（侧边栏）（不会进入算法大纲）
* em：强调，斜体
* strong：强调，粗体
* i：图标（icon）

>### 元素分类

* 按样式分类

	* 块级（block）：独占一行
	* 行内（inline）：不会占据一行
	* 行内块（inline-block）：拥有inline和block共同特性

* 按内容分

	* flow
	* heading：h1~h6、hgroup
	* sectioning：区块元素，section、article、aside、nav
	* interactive：交互元素
	* phrasing：
	* embedded：嵌入资源
	* metadata：信息元素

>### 元素嵌套关系

* 块级元素可以包含行内元素
* 块级元素不一定能包含块级元素（p元素不能包含div）
* 行内元素一般不能包含块级元素（a元素可以包含div）

## HTML面试真题

>### doctype 的意义是什么

>### HTML、XHTML、HTML5 的关系

* HTML 属于 SGML
* XHTML 属于 XML，是 HTML 进行 XML化、严格化的结果
* HTML5 不属于 SGML 或 XML，比 XHTML 宽松

>### HTML5 有什么变化

* 新的语义化元素
* 表单增强
* 新的 API （离线、音视频、图形、实时通信、本地存储、设备能力）
* 分类和嵌套的更新

>### em 和 i 有什么区别

* em 是语义化标签，表强调
* i 是纯样式的标签，表斜体
* HTML5 中 i 不推荐使用，一般用作图标

>### 语义化的意义是什么

* 开发者容易理解
* 机器容易理解结构（搜索、读屏软件）
* 有助于 SEO
* semantic mircodata

>### 哪一些元素可以自闭和

`br` `hr` `img` `meta` `link` `input`

>### HTML 和 DOM 的关系

* HTML 是“死”的
* DOM 是由 HTML 解析而来，是“活”的
* JS 可以维护 DOM

>### property 和 attribute 的区别

* attribute：属性，是 “死” 的
* property：特性，是 “活” 的

>### form 的好处

* 直接提交表单
* 使用 submit / reset 按钮
* 使用浏览器保存表单
* 第三方库可以整体提取值
* 第三方库可以进行表单验证