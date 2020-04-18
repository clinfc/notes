## 安装

```javascript
npm install mysql
```

## 连接配置项

stringifyObjects [#501](https://github.com/mysqljs/mysql/issues/501)

queryFormat [custom format](https://www.npmjs.com/package/mysql#custom-format)

bigNumberStrings [JavaScript Number objects](http://ecma262-5.com/ELS5_HTML.htm#Section_8.5)

flags [connection flags](https://www.npmjs.com/package/mysql#connection-flags)

ssl [SSL options](https://www.npmjs.com/package/mysql#ssl-options)

```javascript
// 配置连接参数
const connect = mysql.createConnection({
	host: "127.0.0.1",
	port: 3306,
	user: "root",
	password: "root",
	// 用于此连接的数据库的名称(可选)
	database: "test",
	// 连接字符集
	charset: "UTF8_GENERAL_CI",
	// 在MySQL服务器上配置的时区
	timezone: "local",
	// 连接超时，单位毫秒（默认：10000）
	connectTimeout: 10000,
	// 将对象字符串化，而不是转换为值。(默认值:false)
	stringifyObjects: false,
	// 允许连接到请求旧的(不安全的)身份验证方法的MySQL实例。(默认值:false)
	insecureAuth: false,
	// 确定列值是否应转换为本机JavaScript类型。(默认值:true)
	typeCast: true,
	// 自定义查询格式函数
	queryFormat: "",
	// 在处理数据库中的大数字(BIGINT和DECIMAL列)时，应该启用此选项(默认值:false)
	supportBigNumbers: false,
	// 同时启用supportBigNumbers和bigNumberStrings会强制将大数字(BIGINT和DECIMAL列)作为JavaScript字符串对象返回(默认:false)。启用supportBigNumbers，但禁用bignumberstring将只在无法用JavaScript Number对象准确表示大数字(当它们超出[-2^53，+2^53]范围时发生)时才返回大数字作为字符串对象，否则它们将作为Number对象返回。如果禁用supportBigNumbers，则忽略此选项。
	bigNumberStrings: false,
	// 强制将日期类型(时间戳、日期时间、日期)作为字符串返回，而不是膨胀为JavaScript日期对象。可以是真/假，也可以是作为字符串保存的类型名称数组。(默认值:false)
	dateStrings: false,
	// 将协议细节打印到标准输出。可以是 true/false，也可以是应该打印的包类型名称数组。(默认值:false)
	debug: false,
	// 在错误上生成堆栈跟踪，以包括图书馆入口的调用站点(“长堆栈跟踪”)。大多数调用的性能损失很小。(默认值:true)
	trace: true,
	// 允许加载数据填充使用本地修改器。(默认值:true)
	localInfile: true,
	// 每个查询允许多个mysql语句。注意这一点，它可能会增加SQL注入攻击的范围。(默认值:false)
	multipleStatements: false,
	// 要使用的非默认连接标志列表。也有可能将默认选项列入黑名单。有关更多信息，请检查 connection flags
	flags: "",
	// 对象，该对象具有ssl参数或包含ssl配置文件名称的字符串。请查看 SSL options
	ssl: {
    ca: fs.readFileSync(__dirname + '/mysql-ca.crt')
  }
});
```


## 创建连接及关闭连接

```javascript
import mysql from 'mysql'
// 配置连接参数
const connection = mysql.createConnection({
	host: "local",
	user: "root",
	password: "root"
});
// 创建显示连接（回调为非必选项）
connection.connect();
connection.connect(error => {
	if (error) {
		// do some thing
		return ;
	}
	// do some thing
})

// 配置连接参数
const connection = mysql.createConnection({
	host: "local",
	user: "root",
	password: "root"
});
// 创建隐式连接（配置参数后直接进行SQL查询）
connection.query('sql', (error, results, fields) => {
	if (error) throw error
})

// 关闭连接：优雅地终止连接（回调为非必选项）
connection.end();
connection.end(error => {});

// 关闭连接：这将导致基础套接字立即终止
connection.destroy();
```


## 创建/关闭连接池

```javascript
// 用法一
const pool = mysql.createPool({
	host: "local",
	user: "root",
	password: "root"
})
pool.query('sql', (error, tesults, fields) => {})

// 用法二
const pool = mysql.createPool({
	host: "local",
	user: "root",
	password: "root"
})
// 创建一个并行连接
pool.getConnection((error, connection) => {
	if (error) throw error;
	connection.query('sql', (error, results, fields) => {
		// 释放当前连接
		connection.release();
		// 释放当前连接并从连接池中移除
		connection.destroy();
		if (error) throw error;
	})
})

// 关闭连接池(回调可选)
pool.end();
pool.end(error => {});
```


## 连接池配置项

```javascript
// 连接池接受与连接选项相同的配置项，一下为连接池额外配置项
let config = {
	// 连接获取过程中发生超时之前的毫秒数。这与connectTimeout稍有不同，因为获取池连接并不总是涉及建立连接。如果连接请求进入队列，则请求在队列中花费的时间不计入此超时。(默认:10000)
	acquireTimeout: 10000,
	// 确定当没有可用连接且达到限制时池的操作。如果为真，则池将对连接请求进行排队，并在连接请求可用时调用它。如果为false，则池将立即回调一个错误。(默认值是真实的)
	waitForConnections: true,
	// 一次创建的最大连接数。(默认值:10)
	connectionLimit: 10,
	// 池在从getConnection返回错误之前将排队的最大连接请求数。如果设置为0，则队列连接请求的数量没有限制。(默认值:0)
	queueLimit: 0
}
```


## 连接池事件

#### acquire

```javascript
/**
 * 当从池中获取连接时，池将发出一个获取事件。在连接上执行了所有获取活动之后，
 * 就在连接被传递到获取代码的回调之前，调用这个函数
 */
pool.on('acquire', connection => {
	
})
```

#### connection

```javascript
/**
 * 当在池中建立新连接时，池将发出连接事件。如果需要在使用连接之前设置会话变量，可以侦听连接事件
 */
pool.on('connection', connection => {
	
})
```

#### enqueue

```javascript
/**
 * 当回调被排队等待可用连接时，池将发出enqueue事件
 */
pool.on('enqueue', () => {
	
})
```

#### release

```javascript
/**
 * 当一个连接被释放回池中时，池将发出一个释放事件。
 * 在连接上执行了所有释放活动之后，将调用此方法，因此在事件发生时，该连接将被列为空闲连接
 */
pool.on('release', connection => {
	
})
```


## 执行查询

```javascript
/**
 * error：如果在查询期间发生错误，则错误将是一个错误
 * results：包含查询的结果
 * fields：包含关于返回结果字段的信息(如果有)
 */
connection.query('select * from user where name = "李白"', (error, results, fields) => {})

connection.query('select * from user where name = ?', "李白", (error, results, fields) => {})

connection.query('select * from user where name = ?', ["李白"], (error, results, fields) => {})

connection.query({
	sql: 'select * from user where name = ?',
	timeout: 40000, // 40s
	values: ["李白"]
}, (error, results, fields) => {})

// 参数 “values” 的优先级高于 “option”，故 “李白” 将被 “杜甫” 覆盖
connection.query({
	sql: 'select * from user where name = ?',
	timeout: 40000, // 40s
	values: ["李白"]
}, ["杜甫"], (error, results, fields) => {})

// select * from user where `name` = '李白'
connection.query('select * from user where ?', {name: "李白"}, (error, results, fields) => {})

// select `username`,`password` from `user` where name = '李白'
connection.query('select ?? from ?? where name = ?', [["username", "password"], "user", "李白"], (error, results, fields) => {})

let sql = mysql.format("select * from ?? where ?? = ?", ["user", "name", "李白"])
connection.query(sql, (error, results, fields) => {})
```

#### [流媒体查询行](https://www.npmjs.com/package/mysql#streaming-query-rows)

```javascript
let query = connection.query('sql')
query.on('error', error => {
	// 处理错误，“结束”事件也将在此之后发出
}).on('fields', fields => {
	// 要跟踪的行的字段包
}).on('result', row => {
	// 如果处理涉及I/O，那么暂停连接是有用的
	connection.pause();
	
	processRow(row, () => {
		connection.resume();
	})
}).on('end', () => {
	// 所有行都已收到
})
```


## error属性、results属性、线程ID

```javascript
connection.query('sql', (error, results, fields) => {
	// timeouts
	let timeouts = error.code === 'PROTOCOL_SEQUENCE_TIMEOUT';
	// 包含MySQL服务器错误号。只从MySQL服务器错误填充
	let errno = error.errno;
	// 布尔值，指示此错误是否是连接对象的终端。如果错误不是来自MySQL协议操作，则不定义此属性。
	let fatal = error.fatal;
	// 字符串，包含失败查询的完整SQL。这在使用高级接口（如生成查询的ORM）时非常有用
	let errsql = error.sql;
	// 字符串，包含5个字符的SQLSTATE值。只从MySQL服务器错误填充
	let sqlState = error.sqlState;
	// 包含提供错误的文本描述的消息字符串。只从MySQL服务器错误填充
	let sqlMsg = error.sqlMessage;
	
	// 如果使用自动递增主键将行插入到表中，则可以像这样检索插入id
	let insertId = results.insertId;
	// 您可以从insert、update或delete语句中获得受影响的行数
	let affected = results.affectedRows;
	// 您可以从update语句中获得更改的行数
	let changed = results.changedRows;
	
	// 您可以使用threadId属性获得给定连接的MySQL连接ID(“threadId”)
	let threadId = connection.threadId;
})
```