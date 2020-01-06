// 从一段 HTML 代码创建 DOM
function fromHtml(html) {
	let div = document.createElement('div');
	div.innerHTML = html;
	return div.childNodes[0];
}

// 判断是否为 function
function isFunction(fn) {
   return typeof fn === 'function';
}

// 判断是否为 object
function isObject(tar) {
	return typeof tar == 'object';
}

// 转换成 int 类型, munus: 允许为负数
function toInt(tar, minus = true) {
	tar = parseInt(tar);
	tar = isNaN(tar) ? 0 : (minus == false && tar < 0) ? -tar : tar;
	return tar;
}

// 转换成 float 类型, munus: 允许为负数
function toFloat(tar, minus = true) {
	tar = parseFloat(tar);
	tar = isNaN(tar) ? 0 : (minus == false && tar < 0) ? -tar : tar;
	return tar;
}

class drag
{
	/**
	 * @param {Object} el 监控的元素
	 * @param {String} type 拖拽的类型。水平：accross；垂直：vertical；水平 + 垂直：both。
	 * @param {Function} callback 回调函数。参数：(offsetX, offsetY, parentWidth, parentHeight)
	 */
	constructor(option) {
		if (!isObject(option) || option.el.nodeType !== 1) {
			throw new Error('初始化失败')
		}
		this.callback = isFunction(option.callback) ? option.callback : function (x, y, w, h) {
			console.log(x, y, w, h);
		}
	  this.type = (['across', 'vertical'].indexOf(option.type) == -1 ) ? 'both' : option.type;
		this.el = option.el;
		this.parent = this.el.parentNode;
		
		let pcss = document.defaultView.getComputedStyle(this.parent, null);
		// 父容器的宽高
		this.pw = toFloat(pcss.width, false);
		this.ph = toFloat(pcss.height, false);
		
		// 监控鼠标是否为按下状态
		this.mousedown = false;
		
		let self = this;
		
		// 计算位移
		function computedMove(event) {
			if (self.mousedown) {
				let x = event.clientX - self.x;
				let y = event.clientY - self.y;
				self.offset(x, y);
			}
		}
		
		// 计算父容器的左上角坐标
		function computedCoordinates(event) {
			self.x = event.clientX - event.offsetX;
			self.y = event.clientY - event.offsetY;
		}
		
		this.el.addEventListener('mousedown', event => {
			event.stopPropagation();
			self.mousedown = true;
			
			document.addEventListener('mousemove', event => {
				computedMove(event)
			}, false);
		});
		
		// 监听鼠标按下
		this.parent.addEventListener('mousedown', event => {
			self.mousedown = true;
			computedCoordinates(event);
			self.offset(event.offsetX, event.offsetY);
			
			document.addEventListener('mousemove', event => {
				computedMove(event)
			}, false);
		}, false);
		
		// 监听鼠标松开
		document.addEventListener('mouseup', () => {
			self.mousedown = false;
		}, false);
	}
	
	/**
	 * @param {Object} x 	对应left
	 * @param {Object} y	对应top
	 */
	offset(x, y) {
		// left
		x = x < 0 ? 0 : x > this.pw ? this.pw : x;
		// top
		y = y < 0 ? 0 : y > this.ph ? this.ph : y;
		
		switch (this.type) {
			case 'across':
				if (this.left != x) {
					this.el.setAttribute('style', `left:${x}px`);
					this.callback(x, 0, this.pw, 0);
				}
				break;
			case 'vertical':
				if (this.top != y) {
					this.el.setAttribute('style', `top:${y}px`);
					this.callback(0, y, 0, this.ph);
				}
				break;
			default:
				if (this.top != y || this.left != x) {
					this.el.setAttribute('style', `left:${x}px;top:${y}px`);
					this.callback(x, y, this.pw, this.ph);
				}
				break;
		}
		this.left = x;
		this.top = y;
	}
}

// 选色主面板
function panelGradient(ctx, color) {
	// 横向渐变
	let lgc = ctx.createLinearGradient(0, 0, 260, 0)
	lgc.addColorStop(0, '#ffffff')
	lgc.addColorStop(1, color)
	ctx.fillStyle = lgc
	ctx.fillRect(0, 0, 260, 180)
	
	// 纵向渐变
	let lgl = ctx.createLinearGradient(0, 0, 0, 180)
	lgl.addColorStop(0, 'rgba(0,0,0,0)')
	lgl.addColorStop(1, '#000000')
	ctx.fillStyle = lgl
	ctx.fillRect(0, 0, 260, 180)
}

// 测边彩条
function colorbarGradient(ctx) {
	let lg = ctx.createLinearGradient(0, 0, 0, 180)
	lg.addColorStop(0, '#FF0000')
	lg.addColorStop(1/6, '#FF0')
	lg.addColorStop(2/6, '#0F0')
	lg.addColorStop(3/6, '#0FF')
	lg.addColorStop(4/6, '#00F')
	lg.addColorStop(5/6, '#F0F')
	lg.addColorStop(1, '#FF0000')
	ctx.fillStyle = lg
	ctx.fillRect(0, 0, 12, 180)
}

// 
function AcrossCallback(x, y, w, h) {
	console.log(x,y,w,h);
}
// 
function VerticalCallback(x, y, w, h) {
	console.log(x,y,w,h);
}
// 
function BothCallback(x, y, w, h) {
	console.log(x,y,w,h);
}

// 绑定色块选择器的拖拽
function BindDrag(main) {
	let drags = main.querySelectorAll('[data-zccp-drag]');
	drags.forEach(item => {
		console.log(new drag({
			el: item,
			type: item.dataset.zccpDrag
		}));
	});
}

// 生成配置项代理
function CreateConfigProxy() {
	
	/**
	 * 设置项示例
	 * @param {String|Element} - elem - 指向容器选择器  
	 * @param {Stirng} - color - 默认颜色
	 * @param {Array} - colors - 预定义颜色集合
	 * @param {Boolean} - alpha - 是否启用透明度  
	 * @param {Boolean} - predefine - 是否启用预定义颜色列表  
	 * @param {Function} - done - 颜色选择后的回调  
	 * @param {Function} - change - 颜色被改变的回调  
	 */
	let target = {
		id: Math.random().toString(36).slice(-8),
		elem: null,
		color: '#ff0000',
		colors: [],
		alpha: false,
		predefine: false,
		done: undefined,
		change: undefined
	};
	
	return new Proxy(target, {
		get (target, key) {
			if (['done', 'change'].indexOf(key) == -1) {
				return target[key]
			}
			return null;
		},
		set (target, key, value) {
			switch (key) {
				case "id":
					break;
				case "elem":
					if (typeof value == 'string' && /((\#|\.|).+|\[.+\])/.test(value)) {
						value = document.querySelector(value);
					}
					if (value.nodeType == 1) {
						target[key] = value;
					}
					break;
				case "color":
					if (/^(\#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})|rgb\(\d{1,3},\s{0,}\d{1,3},\s{0,}\d{1,3}\)|rgba\(\d{1,3},\s{0,}\d{1,3},\s{0,}\d{1,3},\s{0,}([01]|0?\.\d+)\))$/.test(value)) {
						target[key] = value;
					}
					break;
				case "colors":
					value.forEach(color => {
						color = color.replace(/\s+/g, '');
						if (/^(\#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})|rgb\(\d{1,3},\d{1,3},\d{1,3}\)|rgba\(\d{1,3},\d{1,3},\d{1,3},([01]|0?\.\d+)\))$/.test(color)) {
							target[key].push(color);
						}
					});
					break;
				case "alpha":
				case "predefine":
					target[key] = value == true;
					break;
				case "done":
				case "change":
					if (isFunction(value)) {
						target[key] = value;
					}
					break;
				default:
					target[key] = value;
					break;
			}
			return true;
		}
	})
}

// 生成缓存代理
function CreateCacheProxy() {
	let target = {};
	return new Proxy(target, {});
}

// 生成预定义颜色列表的静态HTML
function CreateColorsHtml(colors) {
	if (colors.lenght > 0) {
		let span = '';
		colors.forEach(color => {
			span += `<span style="background-color: ${color}" data-zccp-color="${color}"></span>`
		});
		return `<div class="zc-colorpicker-colors">${span}</div>`
	}
	return '';
}

// 生成整个颜色选择器的静态HTML
function CreateCacheHtml() {
	let id = this.id;
	// 预定义颜色集
	let colorsHtml = this.predine ? CreateColorsHtml(this.colors) : '';
	// 透明度
	let alphaHtml = this.alpha ? `<div id="zccp-alpha-${id}" class="zc-colorpicker-alpha" style="background: linear-gradient(to right, transparent, ${this.color});">
		<div class="zc-colorpicker-alpha-handle" data-zccp-drag="across"></div></div>` : '';
	
	return `<div class="zc-colorpicker-main zc-inline-block" id="zccp-${id}">
			<div class="zc-colorpicker-wrapper">
				<div class="zc-colorpicker-panel zc-inline-block">
					<canvas id="zccp-panel-${id}" width="260" height="180"></canvas>
					<div class="zc-colorpicker-panel-handle zc-inline-block" data-zccp-drag="both"></div>
				</div>
				<div class="zc-colorpicker-colorbar zc-right">
					<canvas id="zccp-colorbar-${id}" width="12" height="180"></canvas>
					<div class="zc-colorpicker-colorbar-handle" data-zccp-drag="vertical"></div>
				</div>
			</div>
			${alphaHtml}${colorsHtml}
			<div class="zc-colorpicker-input-groups">
				<input type="text" class="zc-colorpicker-input" data-zccp-input />
				<button type="button" class="zc-colorpicker-btn-default" data-zccp-btn="cancel">取消</button>
				<button type="button" class="zc-colorpicker-btn-success" data-zccp-btn="affirm">确认</button>
			</div>
		</div>`
}

class colorpicker
{
	constructor(option) {
		this.config = CreateConfigProxy();
	  if (isObject(option)) {
	  	if (option.elem) {
				this.elem = option.elem;
			}
	  	if (option.done) {
				this.done = option.done;
			}
	  	if (option.change) {
				this.change = option.change;
			}
	  	if (option.color) {
				this.color = option.color;
			}
	  	if (option.colors) {
				this.colors = option.colors;
			}
	  	if (option.alpha) {
				this.alpha = option.alpha;
			}
			if (option.predefine) {
				this.predefine = option.predefine;
			}
	  }
	}
	
	/**
	 * 获取本次实例的唯一标识
	 */
	get id() {
		return this.config.id;
	}
	
	/**
	 * 获取指向容器选择器配置
	 */
	get elem() {
		return this.config.elem;
	}
	
	/**
	 * 设置指向容器选择器
	 * @param {String|Object} value
	 */
	set elem(value) {
		this.config.elem = value;
		return this;
	}
	
	/**
	 * 设置颜色【选择后】的回调
	 * @param {Function} value
	 */
	set done(value) {
		this.config.done = value;
		return this;
	}
	
	/**
	 * 设置颜色【被改变】的回调 
	 * @param {Function} value
	 */
	set change(value) {
		this.config.change = value;
		return this;
	}
	
	/**
	 * 获取默认颜色配置
	 */
	get color() {
		return this.config.color;
	}
	
	/**
	 * 设置默认颜色
	 * @param {String} value
	 */
	set color(value) {
		this.config.color = value;
		return this;
	}
	
	/**
	 * 获取自定义颜色集合配置
	 */
	get colors() {
		return this.config.colors;
	}
	
	/**
	 * 设置自定义颜色集合
	 * @param {String} value
	 */
	set colors(value) {
		this.config.colors = value;
		return this;
	}
	
	/**
	 * 获取透明度选项配置
	 */
	get alpha() {
		return this.config.alpha;
	}
	
	/**
	 * 设置透明度是否启用透明度选项
	 * @param {Boolean} value
	 */
	set alpha(value) {
		this.config.alpha = value;
		return this;
	}
	
	/**
	 * 获取预定义颜色的开启状态
	 */
	get predefine() {
		return this.config.predefine;
	}
	
	/**
	 * 设置预定义颜色的开启状态
	 * @param {Boolean} value
	 */
	set predefine(value) {
		this.config.predefine = value;
		return this;
	}
	
	render() {
		if (this.cache instanceof Proxy) {
			throw new Error('已初始化，不可重复操作');
		}
		// 颜色选择器缓存
		this.cache = CreateCacheProxy();
		
		let id = this.id;
		let cache = this.cache;
		
		// 颜色选择器的静态HTML
		cache.html = CreateCacheHtml.call(this);
		
		// 颜色选择器的DOM对象
		cache.main = fromHtml(cache.html);
		
		// 透明度（div元素）
		cache.alpha = cache.main.querySelector(`#zccp-alpha-${id}`);
		
		// 选色面板（canvas元素）
		cache.panel = cache.main.querySelector(`#zccp-panel-${id}`);
		cache.ptx = cache.panel.getContext('2d');
		
		// 彩色条（canvas元素）
		cache.colorbar = cache.main.querySelector(`#zccp-colorbar-${id}`);
		cache.ctx = cache.colorbar.getContext('2d');
		
		// 渲染canvas
		panelGradient(cache.ptx, this.color);
		colorbarGradient(cache.ctx);
		
		// 绑定颜色选择滑块的拖拽事件
		BindDrag(cache.main);
		
		// 指定原色绑定事件
		document.body.appendChild(cache.main);
	}
}

