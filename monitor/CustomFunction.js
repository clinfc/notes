
class CustomFunction
{
	/**
	 * 获取当前的时间戳
	 */
	get timestamp() {
		return Math.floor(Date.now() / 1000)
	}
	
	/**
	 * 生成唯一标识
	 */
	get uuid() {
		return [
      Math.random().toString(16).slice(2),
      new Date().getTime().toString(16),
      Math.random().toString(16).slice(2),
    ].join('')
	}
	
	isString(target) {
		return Object.prototype.toString.call(target) === '[object String]'
	}
	
	/**
	 * 提取 二维数组/数组子对象 中的某一列数据（灵感来源于 PHP 的 array_column）
	 * @param {Array} target 数组
	 * @param {String} column_key 被提取的列名（键）。如果未定义，则返回整个数组 
	 * @param {String} index_key 作为返回数组的索引/键的列，它可以是该列的整数索引，或者字符串键值  
	 * @return {Array|Object}
	 */
	arrayColumn(target, column_key = '', index_key = '') {
		if (!Array.isArray(target)) {
			throw new Error('target 只能为数组类型！')
		}
		if (!this.isString(column_key)) {
			throw new Error('column_key 只能为字符串类型！')
		}
		if (!this.isString(index_key)) {
			throw new Error('index_key 只能为字符串类型！')
		}
		let temp
		if (column_key && index_key) {
			temp = {}
			target.forEach((row) => {
				temp[row[index_key]] = row[column_key]
			})
		} else if (column_key && !index_key) {
			temp = []
			target.forEach((row) => {
				temp.push(row[column_key])
			})
		} else if (!column_key && index_key) {
			temp = {}
			target.forEach((row) => {
				temp[row[index_key]] = row
			})
		} else {
			temp = []
		}
		return this.copy(temp)
	}
	
	/**
	 * 数组去重
	 * @param {Array} target
	 * @param {Boolean} concat 是否合并子数组
	 * @return {Array}
	 */
	arrayUnique(target, concat = false) {
	  if (Array.isArray(target)) {
	    if (concat) {
	      target = [].concat(...target)
	    }
	    return [...new Set(target)]
	  }
	  return []
	}
	
	/**
	 * 深拷贝
	 */
	copy(target) {
		let temp
		if (Array.isArray(target)) {
			temp = []
			target.forEach((v, k) => {
				temp[k] = this.copy(v)
			})
			return temp
		} else if (target instanceof Object) {
			temp = {}
			for(const k in target) {
				temp[k] = this.copy(target[k])
			}
			return temp
		} else {
			return target
		}
	}
	
	/**
	 * 位数补齐
	 * 
	 */
	polishing(target, length, char = 0) {
		return `${Array(length).join(char)}${target}`.slice(-length)
	}
	
	/**
	 * @param {Date|Timestamp} target 需要被格式化的时间
	 * @param {String} template 格式化模板 
	 * 	y：四位年。例如：2020
	 *  M：1 ~ 12 月 的英文缩写
	 *  m：1 ~ 12 月
	 *  w：星期一 到 星期日 的英文缩写
	 *  d：1 ~ 31 天
	 *  H：24 小时
	 *  i：60 分钟
	 *  s：60 秒
	 *  u：0 ~ 999 毫秒
	 * @param {String|Enum} type target的数据类型。
	 * 	d：为Date对象；
	 * 	s：时间戳；
	 * 	ms：毫秒级的时间戳
	 * @param {Boolean} response 是否返回时间分割后的数据
	 * @return {String|Array}
	 */
	format(target, template, type = 'd', response = false) {
		let date = new Date()
		switch (type) {
			case "s":
				date.setTime(target * 1000)
				break
			case "ms":
				date.setTime(target)
				break
			default:
				date = target
				break
		}
		const [ w, M, d, y, His ] = date.toString().split(' ')
		const [ H, i, s ] = His.split(':')
		const m = `${date.getMonth() + 1}`
		const u = this.polishing(date.getMilliseconds(), 3)
		
		const result = template
			.replace(/y+/, y)
			.replace(/m+/, m)
			.replace(/d+/, d)
			.replace(/H+/, H)
			.replace(/i+/, i)
			.replace(/s+/, s)
			.replace(/u+/, u)
			.replace(/w+/, w)
			.replace(/M+/, M)
			
		if (!response) {
			return result
		}
		return [ result, { y, M, m, w, d, H, i, s, u } ]
	}
  
  /**
   * 将缓存中的数据下载到本地
   * @param {Object} option 配置项
   *  data：变量名（数据）
   *  name：下载到本地时的文件名
   *  compress：是否压缩数据
   */
  download({ data, name, compress }) {
    if (!data) {
      throw new Error('请定义数据源')
    }
    if (typeof data === 'object') {
      data = compress ? JSON.stringify(data) : JSON.stringify(data, undefined, 2)
    }
    let blob = new Blob([data], { type: 'application/json' })
    
    let a = document.createElement('a')
    a.download = name || 'data.json'
    a.href = URL.createObjectURL(blob)
    
    a.click()
  }
  
  /**
   * 将数据转换为树形结构，转换后的数据将与原数据不再有关联
   * @param {Array} target 将数据行数组转换为 tree 解构
   * @param {String} k 主键
   * @param {String} fk 外键名。将依据此键进行数据 tree 化操作
   * @param {Function} filter 最终返回数据的过滤函数
   * @return {Array}
   */
  toTree(target, k, fk, filter) {
    const temp = []
    const data = this.copy(target)
    data.forEach((row) => {
      if (!temp[row[fk]]) {
        temp[row[fk]] = []
      }
      temp[row[fk]].push(row)
    })
    return data.filter((row) => {
      if (temp[row[k]]) {
        row.children = temp[row[k]]
      }
      return filter(row)
    })
  }
  
  /**
   * 生成 min <= num <= max 的区间数
   * 
   * @param {Number} min 区间最小值
   * @param {Number} max 区间最大值
   * @return {Number}
   */
  random(...arg) {
    let min = Math.min(...arg)
    let max = Math.max(...arg)
    return min + Math.round(Math.random() * (max - min))
  }
  
  /**
   * 得到两个数的百分数
   * 
   * @param {Number} num1 数值1
   * @param {Number} num2 数值2
   * @param {Int} len 保留的小数位
   * @return {String} 百分数
   */
  percent(num1, num2, len = 0) {
    return `${Math.round((num1 / num2) * Math.pow(10, len+2)) / 100}%`
  }
  
  /**
   * 千分位（数字格式化）
   * 
   * @param {Number|String} target 需要被格式化的数字
   * @param {String} char 用于分割的字符
   * @return {String}
   */
  thousands(target, char = ',') {
    return `${target}`.replace(/\d{1,3}(?=(\d{3})+$)/g, `$&${char}`)
  }
}