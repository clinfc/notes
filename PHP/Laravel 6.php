
// 查看当前路由列表
php artisan route:list


/**
 * 路由：分组
 */
Route::prefix('admin')->group(function() {
	Route::get('login', function () {})
});

Route::prefix('admin')->namespace('Admin')->group(function() {				// 带命名空间的路由分组
	Route::resource('account', 'AccountController');
})

Route::group(['prefix' => 'admin', 'namespace' => 'Admin'], function () {	// 带命名空间的路由分组
	Route::resource('account', 'AccountController');
});


/**
 * 路由：一般控制器
 */
Route::get('account/register', 'AccountController@register');


/**
 * 路由：资源控制器
 */
php artisan make:controller AccountController --resource		// 创建资源路由控制器

Route::resource('account', 'AccountController');				// 在路由中设置路由

Route::get('account', 'AccountController@index');				// 此七条等效于上面一条
Route::get('account/create', 'AccountController@create');
Route::post('account', 'AccountController@store');
Route::get('account/{id}', 'AccountController@show');
Route::get('account/{id}/edit', 'AccountController@edit');
Route::put('account/{id}', 'AccountController@update');
Route::delete('account/{id}', 'AccountController@destory');


/**
 * HTTP请求
 */
function index(Request $request) {

	$name = $request->name;								// 获取 name
	$name = $request->input('name');					// 获取 name，默认值为 null
	$name = $request->input('name', 'default_value');	// 获取 name，默认值为 default_value

	$all = $request->input();							// 获取所有的参数
	$all = $request->all();								// 获取所有的参数

	$only = $request->only('name', 'age');				// 只获取 name 和 age
	$only = $request->only(['name', 'age']);			// 只获取 name 和 age

	$except = $request->except('name', 'age');			// 排除 name 和 age
	$except = $request->except(['name', 'age']);		// 排除 name 和 age

	$bool = $request->has('name');						// 是否存在，返回 true or false
	$bool = $request->has(['name', 'age']);				// 是否全部存在，返回 true or false
	$bool = $request->filled('name');					// 是否存在且不为空，返回 true or false

	$bool = $request->is('admin/account');				// 判断当前的访问路径是否为指定的路径（不包含域名，不包含参数：查询字符串）
	$path = $request->path();							// 获取当前的访问路径（不包含域名，不包含参数：查询字符串）
	$path = $request->url();							// 获取当前的访问路径（包含域名，不包含参数：查询字符串）
	$path = $request->fullUrl();						// 获取当前的访问路径（包含域名，包含参数：查询字符串）

	$name = $request->query('name');					// 获取查询字符串中的 name
	$name = $request->query('name', 'default_value');	// 获取查询字符串中的 name，默认值为 default_value
	$all = $request->query();							// 获取查询字符串中的所有参数

	$method = $request->method();						// 获取当前的 HTTP 的访问方式
	$bool = $request->isMethod('GET');					// 判断当前的 HTTP 访问方式
}


/**
 * HTTP响应
 */
function index() {

	return 'welcome';									// 返回 字符串

	return view('welcome');								// 返回 view （视图）

	return [1, 2, 3, 4];								// 返回 数组

	return ['name'=>'李白'];							// 返回 JSON（自动转为JSON）

	return response()->json(['name'=>'李白'], 200);		// 返回 JSON（订制状态码）
	
	return User::where('active', 1)->get();				// 返回 Eloquent集合

	return response()->download($file);					// 下载文件

	return redirect('admin');							// 站内跳转

	return redirect()->action('AdminController@index');	// 站内跳转

	return redirect()->away('http://www.baidu.com');	// 站外跳转
}


/**
 * 视图
 */
function index() {

	return view('index');								// 视图

	return view('admin.account.index');					// 含目录层级的视图

	return view('index', ['name' => '李白']);			// 视图传参
}


/**
 * 模板
 */

@yield('content')										// 存在于父模板中，表示这里将由子模板的内容进行填充

@extends('layout.default')								// 存在于子模板中，表示将继承于指定的模板
@section('content')										// 存在于子模板中
	子模板内容 . . . . . .
@stop

@section('title', 'title value')						// 存在于子模板中（简写）

@section('content')										// 控制结构

	@foreach($list as $item)
		{{ $item }}  索引：{{ $loop->index }}
	@endforeach

	@if($name == '李白')
		...
	@else
		...
	@endif

	@switch($name)
	  @case('李白')
	    ...
		@break
	  @default
	  	...
		@break
@stop


/**
 * 表单
 */
<form action="" method="post">
	@csrf												// 生成 _token
	<div class="form-group">
		<label for="name">用户名</label>
		<input type="text" name="name" id="name">
		@error('name')									// 表单验证失败的错误信息
			{{$message}}
		@enderror
	</div>
</form>

/**
 * 表单验证
 */
function index(Request $request) {

	$request->validate([								// 指定验证规则
		'name' => ['required', 'min:4'],
		'age' => ['required', 'max:5']
	]);

	$request->validate([
		'name' => ['required', 'min:4'],
		'age' => ['required', 'max:5']
	], [												// 自定义验证错误信息
		'required' => '必填项',
		'min' => '该项最少需要 min 个字符',
		'max' => '该项最多需要 max 个字符',
	]);
}


/**
 * session
 */
function index(Request $request) {

	$request->session()->all();							// 获取 session
	$request->session()->get('name');					// 获取 session

	session()->get('name');								// 获取 session
	session()->pull('name');							// 获取并删除 session

	session(['name' => '李白']);						// 设置 session
	session()->put('names', ['李白']);					// 设置 session
	session()->push('names', '杜甫');					// 追加 session

	session()->flash('name', '李白');					// 设置 session，限定访问一次

	session()->forget('name');							// 删除 session

	session()->has('name');								// 存在 session 键，且值且不为空
	session()->exists('name');							// 存在 session 键，值不限定
}


/**
 * 自动生成用户认证前端页面
 */
php artisan make:auth									// version < 6.0

composer require laravel/ui
php artisan ui:auth										// version >= 6.0

npm install
npm run dev												// 修复页面异常