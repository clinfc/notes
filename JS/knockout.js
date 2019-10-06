
// 定义数据源
var viewModel = {
	name: '扎哈会',
	age: 28
}


// 激活knockout。
ko.applyBindings(viewModel[, element]);			// viewModel：数据源；element：绑定的DOM对象



/* ------------------------------------------- 数据监控 ------------------------------------------- */

// Observables订阅。开启数据监控，当值改变时，view会自动更新
var viewModel = {
	name: ko.observable('扎哈会'),
	age: ko.observable(28)	
}

// 监控属性（Observables）的显式订阅
var subs = viewModel.name.subscribe(function (newVal) {});
// 终止显示订阅
subs.dispose();

// 使用依赖监控属性(Dependent Observables)
viewModel.info = ko.dependentObservable(function () {
	return "姓名：" + this.name() + "&emsp;年龄：" + this.age();
}, viewModel);
// 注：作为函数参数的 viewModel 是函数中 this.name() 和 this.age() 数据来源的依据，没有它，this将引用不到数据
// 将依赖监控绑定元素
<span data-bind="text:info"></span>



/* ------------------------------------------- 绑定语法 ------------------------------------------- */

// visible 绑定

// 绑定元素是否显示取决于其值为真值或假值
var viewModel = {
	isShow: ko.observable(true)			// 当前为element元素显示
}
ko.applyBindings(viewModel);
<span data-bind="visible:isShow"></span>

viewModel.isShow(false);				// 当前为element元素隐藏
viewModel.isShow(true);					// 当前为element元素显示
// 注：当参数设置为假值（false,null,undefined,0,...）时，元素隐藏；
// 注：当参数设置为真值（true,non-null,...）时，元素显示
// 注：当参数是监控熟悉时，元素visible将动态变化，否则元素visible设置一次后不再更新


// text 绑定

// 设置元素的 innerText 或 textContent （而不是 innerHTML ），没有HTML或者脚本注入的风险
var viewModel = {
	txt: ko.observable('原始数据')
	price: ko.observable(30);
}
ko.applyBindings(viewModel);
<span data-bind="text:txt"></span>
viewModel.txt('更新数据');

// 写法一
viewModel.showTxt = ko.dependentObservable(function () {
	return this.price > 50 ? '超过50元' : '50元及以内';			
}, viewModel);
// 写法二
<span data-bind="text:price() > 50 ? '超过50元' : '50元及以内'"></span>


// HTML 绑定

// 设置该参数值到元素的innerHTML属性上，元素之前的内容将被覆盖
// 如果你传的是不是数字或者字符串（例如一个对象或者数组），那显示的文本将是yourParameter.toString()的等价内容。
var viewModel = {
	details: ko.observable('<span>宛若智障</span>')
}
<div data-bind="html:details"></div>


// CSS 绑定

// 添加或删除一个或多个CSS class到DOM元素上。 非常有用，比如当数字变成负数时高亮显示
var viewModel = {
	curr: ko.observable(150)
	infe: ko.observable(true);
}
ko.applyBindings(viewModel);
viewModel.curr(-50);
// 注：当 curr < 0 时，添加 profit CSS class 到元素上，如果 curr > 0 时，删除 profit CSS class属性
<div data-bind="css: {profit: curr() < 0}"></div>
// 也可以同时设置多个。
// 注：应用的CSS class的名字不是合法的JavaScript变量命名，应将 cla-css 写成 'cla-css'
<div data-bind="css: {profit: curr() < 0, 'cla-css': infe() }"></div>


// style 绑定

// 添加或删除一个或多个DOM元素上的style值
var viewModel = {
	styles: ko.observable(true),
	num: ko.observable(21)
}
ko.applyBindings(viewModel);
<div data-bind="style: {color: styles() ? 'red' : 'black', float: num() > 18 ? 'right' : 'left'} ></div>

// 如果你需要应用font-weight或者text-decoration，你不能直接使用，而是要使用style对应的JavaScript名称。
// 错误： { font-weight: someValue };			正确： { fontWeight: someValue }
// 错误： { text-decoration: someValue };		正确： { textDecoration: someValue }


// attr 绑定

// 设置DOM元素的任何属性值。使用绑定，当模型属性改变的时候，它会自动更新
var viewModel = {
	url: ko.observable('index.html'),
	title: ko.observable('登录按钮')
}
ko.applyBindings(viewModel);
<a data-bind="attr: {href: url, title: title}></a>

// 注：应当使用标准的JavaScript名称
<div data-bind="attr: { 'data-something': someValue }"></div>


// click 绑定

// 在DOM元素上添加事件句柄以便元素被点击的时候执行定义的JavaScript 函数
var viewModel = {
	myFun: function () {}
}
ko.applyBindings(viewModel);
<input type="button" data-bind="click: myFun" value="提交" />

// 注：可以声明任何JavaScript函数，不一定非要是view model里的函数

// 注意1：传参数给你的click 句柄
<input type="button" data-bind="click: function() {viewModel.myFun(param,param)}" value="提交" />

// 注意2：有些情况，可能需要使用事件源对象，Knockout会将这个对象传递到你函数的第一个参数
var viewModel = {
	myFun: function (e) {}
}
ko.applyBindings(viewModel);
// 注意2：访问事件源对象
// 如果需要的话，可以使用匿名函数的第一个参数传进去，然后在里面调用
<div>You've clicked <span data-bind="text: numberOfClicks">&nbsp;</span> times</div> 
<button data-bind="click: registerClick, enable: !hasClickedTooManyTimes()">Click me</button> 
<div data-bind="visible: hasClickedTooManyTimes">
    That's too many clicks! Please stop before you wear out your fingers.
    <button data-bind="click: function() { numberOfClicks(0) }">Reset clicks</button>
</div>
</body>
<script type="text/javascript">
var clickCounterViewModel = function () {
    this.numberOfClicks = ko.observable(0); 
    this.registerClick = function () {
		this.numberOfClicks(this.numberOfClicks() + 1);
    } 
    this.hasClickedTooManyTimes = ko.dependentObservable(function () {
        return this.numberOfClicks() >= 3;
    }, this);
};
ko.applyBindings(new clickCounterViewModel());

// 注意3：允许执行默认事件
// 默认情况下，Knockout会阻止冒泡，防止默认的事件继续执行。如果需要让默认的事件继续执行，可以在自定义函数里返回true。

// 注意4：控制this句柄
// KO在调用定义的函数时，会将view model传给this对象
// 引用其他对象一：可以和注1里那样使用匿名函数，因为它支持任意JavaScript 对象
// 引用其他对象二：也可以直接引用任何函数对象。你可以使用bind使callback函数设置this为任何你选择的对象
<button data-bind="click: someObject.someFun.bind(someObject)"></button>

// 注意5：防止时间冒泡
// 默认情况下，Knockout允许click事件继续在更高一层的事件句柄上冒泡执行。可以通过额外的绑定clickBubble来禁止冒泡
 <button data-bind="click: myFun, clickBubble: false"></button>


// event 绑定

// 在DOM元素上添加指定的事件句柄以便元素被触发的时候执行定义的JavaScript 函数
var viewModel = {
	detail: ko.observable(false),
	enable: function () {
		this.detail(true);
	},
	disable: function() {
		this.detail(false);
	}
}
ko.applyBindings(viewModel);
<img src="" data-bind="visible:detail" />
<input type="" data-bind="event: {mouseover:enable, mouseout:disable}" />

// 注：可以声明任何JavaScript函数，不一定非要是view model里的函数，可以声明任意对象上的任何函数，例如： event: { mouseover: someObject.someFunction }

// 注意1：传参数给你的click句柄
<button data-bind="event: {mouseover: function() {viewModel.myFun('param')}} ></button>
// 这样，KO就会调用这个匿名函数，里面会执行viewModel.myFun()，并且传进了'param1'参数。

// 注意2：访问事件源对象
// 有些情况，可能需要使用事件源对象，Knockout会将这个对象传递到你函数的第一个参数
<div data-bind="event: { mouseover: myFun }"></div>
var viewModel = {
	myFun: function (e) {}
};
// 如果你需要的话，可以使用匿名函数的第一个参数传进去，然后在里面调用
<div data-bind="event: { mouseover: function(e) { viewModel.myFun(e, 'param') } }"></div>

// 注意3：允许执行默认事件
// 默认情况下，Knockout会阻止冒泡，防止默认的事件继续执行，如果想让默认的事件继续执行，你可以在你event的自定义函数里返回true。

// 注意4:控制this句柄
// KO在调用定义的函数时，会将view model传给this对象
// 引用其他对象一：可以和注1里那样使用匿名函数，因为它支持任意JavaScript 对象
// 引用其他对象二：也可以直接引用任何函数对象。你可以使用bind使callback函数设置this为任何你选择的对象
<div data-bind="event: { mouseover: someObject.someFun.bind(someObject) }"></div>


// 注意5：防止时间冒泡
// 默认情况下，Knockout允许click事件继续在更高一层的事件句柄上冒泡执行。可以通过额外的绑定youreventBubble来禁止冒泡
<button data-bind="event: { mouseover: myFun }, mouseoverBubble: false"></button>


// submit 绑定

// submit绑定在form表单上。只能用在表单form元素上。当使用submit绑定的时候， Knockout会阻止form表单默认的submit动作。
var viewModel = {
	submit: function (e) {}
};
ko.applyBindings(viewModel);
<form data-bind="submit: submit">
    <button type="submit">Submit</button>
</div>

// 注：在form上，你可以使用click绑定代替submit绑定。不过submit可以handle其它的submit行为，比如在输入框里输入回车的时候可以提交表单
// 关于如果传递更多的参数给submit绑定函数，或者当调用非view model里的函数的时如何控制this，请参考click绑定。所有click绑定相关的notes也都适用于submit绑定。


// enable 绑定

// enable绑定使DOM元素只有在参数值为 true的时候才enabled
// 非布尔值会被解析成布尔值。例如0和null被解析成false，21和非null对象被解析给true
var viewModel = {
	enable: ko.observable(true),
	price: ko.observable(5)
}
ko.applyBindings(viewModel);
<input type="text" data-bind="enable: enable" />
<input type="text" data-bind="enable: price() != 5" />


// disable 绑定

// disable绑定使DOM元素只有在参数值为 true的时候才disabled。disable绑定和enable绑定正好相反，详情请参考enable绑定。


// value 绑定

// value绑定是关联DOM元素的值到view model的属性上。主要是用在表单控件<input>，<select>和<textarea>上。
// 当用户编辑表单控件的时候， view model对应的属性值会自动更新。同样，当你更新view model属性的时候，相对应的元素值在页面上也会自动更新。
var viewModel = {
	name: ko.observable('渣渣辉'),
	age: ko.observable(28)
};
ko.applyBindings(viewModel);
<input data-bind="value: name" name="name" />

// 注：如果你在checkbox或者radio button上使用checked绑定来读取或者写入元素的 checked状态，而不是value 值的绑定。

// 其他参数：valueUpdate
<input data-bind="value: age, valueUpdate: 'change'|'keyup'|'keypress'|'aferkeydown' " name="age" />
// change: 默认值。当失去焦点或select元素被选中的时候更新 view model，
// keyup: 当用户敲完一个字符后立即更新view model
// keypress: 当用户正在敲一个字符但没有释放键盘的时候更新view model。不像keyup，这个更新和keydown一样
// afterkeydown: 当用户开始输入字符的时候就跟新view model。主要是捕获浏览器的keydown事件或异步handle事件

// 注意1：绑定下拉菜单drop-down list（例如SELECT）
// Knockout对下拉菜单drop-down list绑定有一个特殊的支持，那就是在读取和写入绑定的时候，这个值可以是任意JavaScript对象，而不必非得是字符串

// 注意2：更新observable和non-observable属性值
// 如果你用value绑定将你的表单元素和你的observable属性关联起来，KO设置的2-way的双向绑定，任何一方改变都会更新另外一方的值


// checked 绑定

// 当用户check关联的form表单控件的时候，view model对应的值也会自动更新，相反，如果view model的值改变了，那控件元素的check/uncheck状态也会跟着改变。
var viewModel = {
	check: ko.observable(true)
}
ko.applyBindings(viewModel);
<input type="radio" data-bind="checked:check" value="绑定checked" />

// 注：对text box，drop-down list和所有non-checkable的form表单控件，用value绑定来读取和写入是该元素的值，而不是checked绑定

// ckeckbox 关联到数组。注：数组的值为checked复选框的value值
var viewModel = {
	check: ko.observableArray(['first', 'then'])
}
ko.applyBindings(viewModel);
// 添加未选中的多选框
viewModel.check.push('last');
<input type="checked" data-bind="checked:check" value="first" />
<input type="checked" data-bind="checked:check" value="then" />
<input type="checked" data-bind="checked:check" value="last" />

// radio：注：check关联的值为radio的value值
var viewModel = {
	check: ko.observable("first")
}
ko.applyBindings(viewModel);
<input type="radio" name="radioChecked" data-bind="checked:check" value="first" />
<input type="radio" name="radioChecked" data-bind="checked:check" value="then" />
<input type="radio" name="radioChecked" data-bind="checked:check" value="last" />


// options 绑定

// options绑定不能用于<select>之外的元素。关联的数据应是数组（或者是observable数组），<select>会遍历显示数组里的所有的项。

// 注：对于multi-select列表，设置或者获取选择的多项需要使用selectedOptions绑定。对于single-select列表，你也可以使用value绑定读取或者设置元素的selected项。

// Drop-down list
var viewModel = {
	options: ko.observableArray(['first','then', 'secondly'])
}
ko.applyBindings(viewModel);
<select data-bind="options: options"></select>

// Multi-select list
var viewModel = {
	options: ko.observableArray(['first','then', 'secondly'])
}
ko.applyBindings(viewModel);
<select data-bind="options: options" size="5" multiple="true"></select>

// Drop-down list展示的任意JavaScript对象，不仅仅是字符串
var country = function(name,val) {
	this.name = name;
	this.val = val;
}
var viewModel = {
	// 用于遍历保存 options 的每个子数据，类似于PHP中的数组遍历 foreach($options => $option){}
	option: ko.observable(),
	options: ko.observableArray([
		new country('first', 'first value'),
		new country('then', 'then value'),
		new country('secondly', 'secondly value')
	])
}
ko.applyBindings(viewModel);
/*
	options：options。数据源绑定
	value：option。类似于PHP中的数组遍历 foreach($options => $option){}
	optionsText：'name'。$option 的键名，并将 $option['name'] 赋值给 option 元素的text属性
*/
<select data-bind="options: options, optionsText: 'name', value: option, optionsCaption: 'default caption'"></select>
<div data-bind="visible: option">
	您选择的下拉框是持续为：<span data-bind="text:option() ? option().val : 'unknown'"></span>
</dev>

// Drop-down list展示的任意JavaScript对象，显示text是function的返回值
var optionText = function(e) {
	return e.name + '<popu>' + e.popu;
}
<select data-bind="options: options, optionsText: optionText(e), value: defa, optionsCaption: 'default caption'"></select>
// 注：报错，未确定正确的用法，请忽略

/* 
相关参数：
	options：绑定数据源
	optionsCaption：设置select下拉框的默认选项值，类似于layUI的请选择，设置optionsValue值为undefined。所以，如果myChosenValue被设置为undefined（默认是observable的），那么上述的第一个项就会被选中。
	optionsText：设置select下的每个option的text值
	optionsValue：设置select下的每个option的value值
	selectedOptions：请参考： selectedOptions 绑定
*/


// selectedOptions 绑定

// selectedOptions绑定用于控制multi-select列表已经被选择的元素，用在使用options绑定的<select>元素上。
var viewModel = {
	country: ko.observableArray(['first','then','last']);
	isSelects: ko.observableArray(['first']);
}
ko.applyBindings(viewModel);
<select data-bind="options:country,selectedOptions:isSelects" size="5" multiple="true"></select>
// 注：相当于目前已选择的option元素集，每次更新之前的已选择项将被覆盖


// uniqueName 绑定

// uniqueName绑定确保所绑定的元素有一个非空的name属性。如果该元素没有name属性，那绑定会给它设置一个unique的字符串值作为name属性
<input data-bind="value: someModelProperty, uniqueName: true"/>
// 参数：传入true（或者可以转成true的值）以启用uniqueName绑定



/* ------------------------------------------- 模板绑定 ------------------------------------------- */



/* ------------------------------------------- 自定义绑定 ----------------------------------------- */

// 注册自定义绑定
ko.bindingHandlers.myBindingName = {
	// 在绑定首次应用于元素时调用,在此处设置任何初始状态、事件处理程序等
	init: function(element, valueAccessor, allBindingsAccessor, viewModel) {},
	/* 当绑定首次应用于元素时，将调用一次此函数；
	   当关联的Observable更改值时，将再次调用此函数。
	   请根据此处提供的值更新dom元素。*/
	update: function(element, valueAccessor, allBindingsAccessor, viewModel) {}
}
<div bind-data="myBindingName: someValue"></div>
// 注：你实际上没必要把init和update这两个callbacks都定义，你可以只定义其中的任意一个。

/* 
update 回调：

当管理的observable改变的时候，KO会调用你的update callback函数，然后传递以下参数：
	element：使用这个绑定的DOM元素
	valueAccessor：JavaScript函数，通过valueAccessor()可以得到应用到这个绑定的model上的当前属性值。
	allBindingsAccessor：JavaScript函数，通过allBindingsAccessor ()得到这个元素上所有model的属性值
	viewModel：传递给ko.applyBindings使用的 view model参数，如果是模板内部的话，那这个参数就是传递给该模板的数据
*/
ko.bindingHandlers.myBindingName = {
	update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		// 首先获取我们要绑定的最新数据
		var val = valueAccessor();
		var all = allBindingsAccessor();
		// 接下来，不管所提供的模型属性是否可见，获取它的当前值
		var cval = ko.utils.unwrapObservable(val);
		// 从另一个绑定属性获取更多数据
		// 除非另有说明，否则400ms是默认持续时间
		var dur = all.slideDuration || 400;
		// 现在操作DOM元素
		if(cval == true ) {
			// 让元素可见
			$(element).slideDown(dur);
		} else {
			// 使元素不可见
			$(element).slideUp(dur);
		}
	}
}
var viewModel = {
	wrap: ko.observable(true)
};
ko.applyBindings(viewModel);
<div data-bind="myBindingName: wrap, slideDuration: 600"></div>

/*
init 回调：

init的两个重要用途
1、为DOM元素设置初始值
2、注册事件句柄，如：当用户点击或编辑DOM元素时，改变相关observeable值的状态
*/
// 继上一个例子
ko.bindingHandlers.myBindingName = {
	init: function (element, valueAccessor) {
		// 获取我们绑定到的当前属性的当前值
		var val = ko.utils.unwrapObservable(valueAccessor);
		// jQuery将根据“value”或true或false隐藏/显示元素
		$(element).toggle(val);
	}
}

// DOM事件之后更新observable值
ko.bindingHandlers.hasFocus = {
	init: function (element, valueAccessor) {
		$(element).focus(function(){
			var val = valueAccessor();
			val(true);
		});
		$(element).blur(function(){
			var val = valueAccessor();
			val(false);
		});
	},
	update: function(element, valueAccessor) {
		var val = valueAccessor();
		if(ko.utils.unwrapObservable(val)) {
			element.focus();
		} else {
			element.blur();
		}
	}
}
var viewModel = {
	editName: ko.observable()
}
ko.applyBindings(viewModel);
<input data-bind="hasFocus: editName" />
<div data-bind="visible: editName" >You're editing the name</div>
<button data-bind="enable: !editName(), click: function() {editName(true)}">EditName</button>




/* ------------------------------------------- JSON数据 ------------------------------------------- */

/*
加载或保存数据

Knockout不限制你用任何技术加载和保存数据。你可以使用任何技术和服务器来交互。
1、对于加载，更新你接收到的数据到你的view model上。
2、对于保存，让你的view model数据转换成简单的JSON格式，以方便使用上面的技术来保存数据。
*/

/*
转化View Model数据到JSON格式

由于view model都是JavaScript对象，所以你需要使用标准的JSON序列化工具让转化view model为JSON格式。
为了使view model数据序列化方便（包括序列化observables等格式），Knockout提供了2个帮助函数：
1、 ko.toJS：克隆你的view model对象，并且替换所有的observable 对象为当前的值，这样你可以得到一个干净的和Knockout无关的数据copy。
2、 ko.toJSON：将view model对象转化成JSON字符串。原理就是：先调在view model上调用ko.toJS，然后调用浏览器原生的JSON 序列化器得到结果。
注：一些老浏览器版本不支持原生的JSON 序列化器（例如：IE7和以前的版本），你需要引用json2.js类库。
*/
var plainJs = ko.toJS(viewModel);
var jsonData = ko.toJSON(viewModel);

/*
使用JSON更新View Model数据

如果你从服务器端获取数据并且更新到view model上，最简单的方式是自己实现
*/
var data = <?=$data?>
var parse = JSON.parse(data);
viewModel.name(parse.name).age(parse.age);



/* ------------------------------------------- mapping -------------------------------------------- */


// 使用ko.mapping

// 通过mapping插件创建view model，直接使用ko.mapping.fromJS函数来创建：
var viewModel = ko.mapping.fromJS(data);

/* 它会自动将data里所有的属性创建成observable类型的属性。
   你可以通过ko.mapping.fromJS 函数定期从服务器获取数据，然后更新你的view model：*/
ko.mapping.fromJS(data, viewModel);

// 如果你想让map过的对象转换成原来的JavaScript对象，使用如下方式
var unmapped = ko.mapping.toJS(viewModel);


/* ------------------------------------------- 模板绑定 ------------------------------------------- */




/* ------------------------------------------- 模板绑定 ------------------------------------------- */





// -----------------------简单的操作----------------------------

// -------------------------案例一------------------------------
var myViewModel = {	// 数据声明
	name: '渣渣辉',
	age: 12,
	content: {}
}
<span data-bind="text:name"></span>	// 数据绑定
ko.applyBindings(myViewModel);	// 激活knockout
ko.applyBindings(myViewModel, document.getElementById('elem'));		// 激活knockout并绑定DOM对象

// -------------------------案例二------------------------------
<body>
	<form>
		// 绑定数据源
		<select data-bind="options: Meals,optionsText: 'name'"></select>
	</form>
</body>
<script type="text/javascript" src="js/knockout/knockout-3.5.0.js"></script>
<script type="text/javascript">
	// 定义数据源
	var Meals = [
		{name: 'Standard', description: 'Dry crusts of bread', extraCost: 0 },
		{name: 'Premium', description: 'Fresh bread with cheese', extraCost: 9.95 },
		{name: 'Deluxe', description: 'Caviar and vintage Dr Pepper', extraCost: 18.50 }
	];
	var viewModel = {};
	ko.applyBindings(viewModel); // 注意：ko. applyBindings需要在上述HTML之后应用才有效
</script>

// -------------------------案例三------------------------------
<body>
	<form>
		<select data-bind="options: Meals,optionsText: 'name',value: chosenMeal"></select>
		<p>
			You've chosen:
			<b data-bind="text: chosenMeal().description"></b>
			(price: <span data-bind='text: Price(chosenMeal().extraCost)'></span>)
		</p>
	</form>
</body>
<!-- <script type="text/javascript" src="./require/require.js"></script> -->
<script type="text/javascript" src="js/knockout/knockout-3.5.0.js"></script>
<script type="text/javascript">
	// 定义数据处理函数
	function Price(price) {
		return price == 0 ? "Free" : "$" + price.toFixed(2);
	}
	var Meals = [
		{name: 'Standard', description: 'Dry crusts of bread', extraCost: 0 },
		{name: 'Premium', description: 'Fresh bread with cheese', extraCost: 9.95 },
		{name: 'Deluxe', description: 'Caviar and vintage Dr Pepper', extraCost: 18.50 }
	];
	var viewModel = {
		chosenMeal: ko.observable(Meals[0])
	};
	ko.applyBindings(viewModel); // 注意：ko. applyBindings需要在上述HTML之后应用才有效
</script>




















