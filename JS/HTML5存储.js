
// 本地存储

/** 
 * localStorage|sessionStorage
 * 注意事项：
 *  1、使用前判断浏览器支持度（先set一次，在setItem中捕获异常，未捕获则能用）
 *  2、写数据时需要异常处理，避免超容报错
 *  3、避免存入敏感信息
 *  4、key的唯一性
 * 使用限制：
 *  1、存储更新策略，过期控制
 *  2、子域名之间是不能共享存储数据的，需要跨域处理
 *  3、超出容量（5M）后如何存储（LRU，FIFO）
 *  4、server端如何获取
 */


/**
 * IndexedDB
 */
 
 
 // 离线缓存：manifest
 
 // 检测当前网络是否在线：navigator.onLine
 
/**
 * 非主流存储
 * userData（IE）
 * googleGears（Google）
 * 64SQLite
 