
// ------------------------------------------------------ 字符串截取 ------------------------------------------------------ //

/**
 * @method slice(start-index, end-index)
 * @param {int}start-index	截取字符开始的索引
 * @param {int}end-index	截取字符结束的索引
 * @return {string}			截取的字符串
 * 
 * @notes 如果 start-index < 0，则将该值加上字符串长度后再进行计算（如果加上字符串的长度后还是负数，则从0开始截取）
 *
 * @notes 如果 start-index >= string.length，则返回空字符串
 *
 * @notes 如果 end-index 省略不写，则将字符提取到字符串的末尾
 *
 * @notes 如果 end-index < 0，它被视为  string.length + end-index
 *
 */
'自定义字符串'.slice(0, 3)	// 从字符索引 0 开始，截取到字符索引 3 结束

/**
 * @method substr(start-index, length)
 * @param {int}start-index	截取字符开始的索引
 * @param {int}length		截取字符传递长度
 * @return {string}			截取的字符串
 *
 * @nates 如果 length 大于能截取的长度，则截取到字符串末尾
 *
 * @notes 如果 start-index > 0 && start-index >= string.length，返回空字符串
 *
 * @notes 如果 start < 0，则将该值加上字符串长度后再进行计算（如果加上字符串的长度后还是负数，则从0开始截取）
 *
 * @notes 如果 length <= 0，则返回一个空字符串。如果 length 省略，则将字符提取到字符串的末尾
 * 
 */
'自定义字符串'.substr(0, 3)		// 从字符索引 0 开始，截取 3 个字符

/**
 * @method substring(start-index, end-index)
 * @param {int}start-index	截取字符开始的索引（非负数）
 * @param {int}end-index	截取字符结束的索引（非负数）
 * @return {string}			截取的字符串
 * 
 * @notes 从提取的字符 start-index 可达但不包括 end-index
 *
 * @notes 如果 start-index 等于 end-index，则返回一个空字符串
 *
 * @notes end-index 可以省略不写
 *
 * @notes 如果任一参数小于0或是NaN，它被视为为0
 *
 * @notes 如果任意一个参数大于string.length，则被认定为string.length
 *
 * @notes string.substring(0, 3) == string.substring(3, 0)
 *
 */
'自定义字符串'.substring(0, 3)	// 从字符索引 0 开始，截取到字符索引 3 结束