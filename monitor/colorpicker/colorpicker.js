(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.colorpicker = factory());
}(this, (function () { 'use strict';

  // 检验是否浏览器环境
  try {
      document;
  } catch (ex) {
      throw new Error('请在浏览器环境下运行');
  }
  
  /**
   * RGB转HSB
   * @param {Object} rgb - {r: 0, g: 0, b: 0}
   * @return {Object} hsb - {h: 0, s: 0, b: 0}
   */
  function RGBToHSB(rgb){
  	var hsb = {h:0, s:0, b:0};
  	var min = Math.min(rgb.r, rgb.g, rgb.b);
  	var max = Math.max(rgb.r, rgb.g, rgb.b);
  	var delta = max - min;
  	hsb.b = max;
  	hsb.s = max != 0 ? 255*delta/max : 0;
  	if(hsb.s != 0){
  		if(rgb.r == max){
  			hsb.h = (rgb.g - rgb.b) / delta;
  		}else if(rgb.g == max){
  			hsb.h = 2 + (rgb.b - rgb.r) / delta;
  		}else{
  			hsb.h = 4 + (rgb.r - rgb.g) / delta;
  		}
  	}else{
  		hsb.h = -1;
  	};
  	if(max == min){ 
  		hsb.h = 0;
  	};
  	hsb.h *= 60;
  	if(hsb.h < 0) {
  		hsb.h += 360;
  	};
  	hsb.s *= 100/255;
  	hsb.b *= 100/255;
  	return hsb;  
  }
  
  /**
   * HEX 转 RGB
   * @param {String} hex - #FF0000
   * @return {Object} rgb - {r: 0, g: 0, b: 0}
   */
  function HEXToRGB(hex) {
    var hex = hex.indexOf('#') > -1 ? hex.substring(1) : hex;
    if(hex.length == 3){
    	var num = hex.split("");
    	hex = num[0]+num[0]+num[1]+num[1]+num[2]+num[2]
    };
    hex = parseInt(hex, 16);
    return {r:hex >> 16, g:(hex & 0x00FF00) >> 8, b:(hex & 0x0000FF)};
  }
  
  /**
   * HEX转HSB
   * @param {String} hex - #FF0000
   * @return {Object} hsb - {h: 0, s: 0, b: 0}
   */
  function HEXToHSB(hex){
  	let rgb = HEXToRGB(hex);
  	return RGBToHSB(rgb);
  }
  
  /**
   * HSB转RGB
   * @param {Object} hsb - {h: 0, s: 0, b: 0}
   * @return {Object} rgb - {r: 0, g: 0, b: 0}
   */
  function HSBToRGB(hsb){
  	var rgb = {};
  	var h = hsb.h;
  	var s = hsb.s*255/100;
  	var b = hsb.b*255/100;
  	if(s == 0){
  		rgb.r = rgb.g = rgb.b = b;
  	}else{
  		var t1 = b;
  		var t2 = (255 - s) * b /255;
  		var t3 = (t1 - t2) * (h % 60) /60;
  		if(h == 360) h = 0;
  		if(h < 60) {rgb.r=t1; rgb.b=t2; rgb.g=t2+t3}
  		else if(h < 120) {rgb.g=t1; rgb.b=t2; rgb.r=t1-t3}
  		else if(h < 180) {rgb.g=t1; rgb.r=t2; rgb.b=t2+t3}
  		else if(h < 240) {rgb.b=t1; rgb.r=t2; rgb.g=t1-t3}
  		else if(h < 300) {rgb.b=t1; rgb.g=t2; rgb.r=t2+t3}
  		else if(h < 360) {rgb.r=t1; rgb.g=t2; rgb.b=t1-t3}
  		else {rgb.r=0; rgb.g=0; rgb.b=0}
  	}
  	return {r:Math.round(rgb.r), g:Math.round(rgb.g), b:Math.round(rgb.b)};
  }
  
  /**
   * HSB转HEX
   * @param {Object} hsb - 
   * @return {String} hex - FF0000
   */
  function HSBToHEX(hsb){
  	var rgb = HSBToRGB(hsb);
  	var hex = [
  		rgb.r.toString(16)
  		,rgb.g.toString(16)
  		,rgb.b.toString(16)
  	];
  	hex.forEach((val, nr) => {
  		if(val.length == 1){
  			hex[nr] = '0' + val;
  		}
  	});
  	return hex.join('');
  }
  
  //转化成所需rgb格式
  function RGBSTo(rgbs){
  	var regexp = /[0-9]{1,3}/g;
  	var re = rgbs.match(regexp) || [];
  	return {r:re[0], g:re[1], b:re[2]};
  }
  
  // RGB转HEX
  function RGBToHEX(rgb) {
  	let {r, g, b} = rgb;
  	let hex = ((1 << 24) + r * (1 << 16) + g * (1 << 8) + b).toString(16).slice(1).toUpperCase();
  	return `#${hex}`;
  }
  
  /**
   * 将颜色值（hex、rgb、rgba）转换成 RGBA 对象
   * @param {String} color
   * @return {Object}
   */
  function toRGBA(color) {
    var rgba = {r: 255, g: 0, b: 0, a: 1};
    // HEX
    if (/^\#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(color)) {
      rgba = HEXToRGB(color);
      rgba.a = 1;
    }
    // RGB OR RGBA
    if (/(rgb\(\d{1,3},\s{0,}\d{1,3},\s{0,}\d{1,3}\)|rgba\(\d{1,3},\s{0,}\d{1,3},\s{0,}\d{1,3},\s{0,}([01]|0?\.\d+)\))/.test(color)) {
      let match = color.match(/\d{1,3}/g);
      rgba = {r: match[0], g: match[1], b: match[2]};
      let a = match[3] || 1;
      rgba.a = a > 1 ? `0.${a}` : a;
    }
    return rgba;
  }
  
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
  
  // 是否为 int 数据类型，不包含 int_string
  function isInt(tar) {
    return Number.isInteger(tar);
  }
  
  // 是否为 float 数据类型，不包含 float_string
  function isFloat(tar) {
    let bool = false;
    if (typeof tar === 'number') {
      bool = /^(\+|-|)\d+\.\d+$/.test(`${tar}`);
    }
    return bool;
  }
  
  // 是否为【数字】或【数字字符串】（包含 int、float、int_string、float_string）
  function isNumeric(tar) {
    let bool = false;
    if (['number', 'string'].indexOf(typeof tar) != -1) {
      bool = /^(\+|\-|)\d+(\.\d+)?$/.test(`${tar}`);
    }
    return bool;
  }
  
  // 转换成 int 类型, munus: 允许为负数
  function toInt(tar, minus = true) {
  	tar = parseInt(tar);
  	tar = isNaN(tar) ? 0 : minus == false ? Math.abs(tar) : tar;
  	return tar;
  }
  
  // 转换成 float 类型, munus: 允许为负数
  function toFloat(tar, minus = true) {
  	tar = parseFloat(tar);
  	tar = isNaN(tar) ? 0 : minus == false ? Math.abs(tar) : tar;
  	return tar;
  }
  
  /**
   * 限定在父元素内的拖拽
   */
  class drag
  {
  	/**
  	 * @param {Object} el 监控的元素
  	 * @param {String} type 拖拽的类型。水平：accross；垂直：vertical；水平 + 垂直：both。
  	 * @param {Function} callback 回调函数。参数：(x:offsetX, y:offsetY, w:parentWidth, h:parentHeight)
  	 */
  	constructor(option) {
  		if (!isObject(option) || option.el.nodeType !== 1) {
  			throw new Error('初始化失败')
  		}
  		this.callback = isFunction(option.callback) ? option.callback : function (x, y, w, h) {}
  	  this.type = (['across', 'vertical'].indexOf(option.type) == -1 ) ? 'both' : option.type;
  		this.el = option.el;
  		this.parent = this.el.parentNode;
  		
  		// 选框滑块的宽高
  		this.x = toFloat(this.el.offsetLeft, false);
  		this.y = toFloat(this.el.offsetTop, false);
  		
  		// 监控鼠标是否为按下状态
  		this.mousedown = false;
  		
  		let self = this;
      
      // 定时器句柄
  		let timer = null;
  		
  		// 获取父容器的【视口偏移量】
      function computedCoordinates() {
        let bcr = self.parent.getBoundingClientRect();
        self.clientX = bcr.left;    // 父容器相对于视口的左上角的 X轴 坐标
        self.clientY = bcr.top;     // 父容器相对于视口的左上角的 Y轴 坐标
      }
  		
  		// 计算位移（40毫秒刷新一次）
  		function computedMove(event) {
  			if (self.mousedown && !timer) {
  				let x = event.clientX - self.clientX;
  				let y = event.clientY - self.clientY;
  				self.offset(x, y);
          
  				timer = setTimeout(() => {
  					clearTimeout(timer);
  					timer = null;
  				}, 40);
  			}
  		}
  		
  		this.el.addEventListener('mousedown', event => {
  			event.stopPropagation();
  			self.mousedown = true;
  			computedCoordinates();
  			
  			document.addEventListener('mousemove', event => {
  				computedMove(event)
  			}, false);
  		});
  		
  		// 监听鼠标按下
  		this.parent.addEventListener('mousedown', event => {
  			self.mousedown = true;
  			computedCoordinates();
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
     * 获取父元素的宽度
     */
    get width() {
      return this.parent.offsetWidth
    }
    
    /**
     * 获取父元素的高度
     */
    get height() {
      return this.parent.offsetHeight
    }
    
    get x() {
      return this.el.offsetLeft
    }
    
    set x(x) {
      x = toFloat(x, false);
      this.el.style.left = `${x}px`;
    }
    
    get y() {
      return this.el.offsetTop
    }
    
    set y(y) {
      y = toFloat(y, false);
      this.el.style.top = `${y}px`;
    }
  	
  	/**
  	 * @param {Object} x 	对应left
  	 * @param {Object} y	对应top
  	 */
  	offset(x, y) {
  		// left
  		x = x < 0 ? 0 : x > this.width ? this.width : x;
  		// top
  		y = y < 0 ? 0 : y > this.height ? this.height : y;
  		
  		switch (this.type) {
  			// 只支持左右拖拽（透明度选择器）
  			case 'across':
  				if (this.x != x) {
  					this.el.setAttribute('style', `left:${x}px`);
  					this.callback(x, 0, this.width, 0);
  				}
  				break;
  			// 只支持上下拖拽（色域选择器）
  			case 'vertical':
  				if (this.y != y) {
  					this.el.setAttribute('style', `top:${y}px`);
  					this.callback(0, y, 0, this.height);
  				}
  				break;
  			// 支持上下左右拖拽（颜色选择器）
  			default:
  				if (this.y != y || this.x != x) {
  					this.el.setAttribute('style', `left:${x}px;top:${y}px`);
  					this.callback(x, y, this.width, this.height);
  				}
  				break;
  		}
  	}
  }
  
  // 选色主面板
  function colorGradient(ctx, color, x, y) {
  	// 横向渐变
  	let lgc = ctx.createLinearGradient(0, 0, x, 0);
  	lgc.addColorStop(1/x, '#ffffff');
  	lgc.addColorStop((x-1)/x, color);
  	ctx.fillStyle = lgc;
  	ctx.fillRect(0, 0, x, y);
  	
  	// 纵向渐变
  	let lgl = ctx.createLinearGradient(0, 0, 0, y);
  	lgl.addColorStop(1/y, 'rgba(0,0,0,0)');
  	lgl.addColorStop((y-1)/y, '#000000');
  	ctx.fillStyle = lgl
  	ctx.fillRect(0, 0, x, y)
  }
  
  // 测边彩条
  function colorbarGradient(ctx, y) {
  	let lg = ctx.createLinearGradient(0, 0, 0, y)
  	let i = (y - 2) / 6;
  	lg.addColorStop(1/y, '#FF0000');
  	lg.addColorStop((1*i+1)/y, '#FF0');
  	lg.addColorStop((2*i+1)/y, '#0F0');
  	lg.addColorStop((3*i+1)/y, '#0FF');
  	lg.addColorStop((4*i+1)/y, '#00F');
  	lg.addColorStop((5*i+1)/y, '#F0F');
  	lg.addColorStop((y - 1)/y, '#FF0000');
  	ctx.fillStyle = lg;
  	ctx.fillRect(0, 0, 12, y);
  }
  
  // 使用指定颜色刷新 colorpicker 对象的 rgba 和 hsb 属性值
  function RefreshRgbaAndHsb(color) {
    // 将默认颜色值转换为 RGBA 并缓存
    let {r, g, b, a} = toRGBA(color);
    this.rgba.r = r;  // this 指向 colorpicker 对象实例
    this.rgba.g = g;
    this.rgba.b = b;
    this.rgba.a = a;
    
    // 将 RGBA 转换成 HSB 并缓存
    this.hsb = RGBToHSB({r, g, b});
  }
  
  // 彩色条拖拽回调
  function colorBar() {
  	let color = colorSel.call(this);	// this 指向 colorpicker 对象实例
  	let ptx = this.cache.ptx;
  	return (x, y, w, h) => {
  		y = y == h ? --y : y;
  		let [r, g, b] = this.cache.ctx.getImageData(0, y, 1, 1).data;
      let pw = this.cache.drag.color.width;
      let ph = this.cache.drag.color.height;
  		// 刷新颜色选择面板
  		colorGradient(ptx, `rgb(${r}, ${g}, ${b})`, pw, ph);
  		color(undefined, undefined, pw, ph);
  	}
  }
  
  // 颜色面板拖拽回调
  function colorSel() {
  	let alpha = alphaSel.call(this);	// this 指向 colorpicker 对象实例
  	return (x, y, w, h) => {
  		x = x == undefined ? this.cache.drag.color.x : x;
  		y = y == undefined ? this.cache.drag.color.y : y;
  		w = w == undefined ? this.cache.drag.color.width : w;
  		h = h == undefined ? this.cache.drag.color.height : h;
  		x = x >= w ? w - 1 : x;
  		y = y >= h ? h - 1 : y;
  		let [r, g, b] = this.cache.ptx.getImageData(x, y, 1, 1).data;
  		this.rgba.r = r;
  		this.rgba.g = g;
  		this.rgba.b = b;
      this.hsb = RGBToHSB({r, g, b});
  		alpha();
  	}
  }
  
  // 透明度拖拽回调
  function alphaSel() {
  	let change = this.change;	// this 指向 colorpicker 对象实例
  	let isAlpha = this.alpha;
  	return (x, y, w, h) => {
  		// 如果开启了透明度选项
  		if (isAlpha) {
  			x = x == undefined ? this.cache.drag.alpha.x : x;
  			w = w == undefined ? this.cache.drag.alpha.width : w;
  			this.rgba.a = x / w;
  			
  			let {r, g, b} = this.rgba;
  			this.cache.alpha.style.background = `linear-gradient(to right, transparent, rgb(${r}, ${g}, ${b}))`;
  		}
  		
  		let value = this.value;
  		this.cache.input.value = value;
  		if (isFunction(change)) {
  			change(value);
  		}
  	}
  }
  
  // 绑定选框拖拽事件
  function onBindDrag() {
    let self = this;  // this 指向 colorpicker 对象实例
    let {colorBar: cbar, color, alpha} = this.cache.dragElement;
    this.cache.drag = {
      "colorBar": new drag({"el": cbar, "type": cbar.dataset.zccpDrag, "callback": colorBar.call(self)}),
      "color": new drag({"el": color, "type": color.dataset.zccpDrag, "callback": colorSel.call(self)}),
      "alpha": new drag({"el": alpha, "type": alpha.dataset.zccpDrag, "callback": alphaSel.call(self)})
    };
  }
  
  // 绑定按钮事件
  function onBindBtns(main) {
  	let self = this;	// this 指向 colorpicker 对象实例
    let colors = main.querySelector('.zc-colorpicker-colors');
  	let cancel = main.querySelector('[data-zccp-btn="cancel"]');
  	let affirm = main.querySelector('[data-zccp-btn="affirm"]');
  	let done = this.done;
    let ptx = this.cache.ptx;
    let input = this.cache.input;
    
    
    // 预定义颜色集合
    colors.addEventListener('click', event => {
      if (event.target.nodeName == 'SPAN') {
        let color = event.target.dataset.zccpColor;
        RefreshRgbaAndHsb.call(self, color);
        self.orientation();
        let huecolor = self.huecolor;
        colorGradient(ptx, huecolor, self.cache.color.width, self.cache.color.height);
        input.value = self.value;
      }
    }, false);
  	
  	// 取消按钮监听
  	cancel.addEventListener('click', () => {
  		document.body.removeChild(main);
  		// 面板状态：关闭（隐藏）
  		self.status = false;
  	}, false);
  	
  	// 确认按钮监听
  	affirm.addEventListener('click', () => {
  		document.body.removeChild(main);
  		// 面板状态：关闭（隐藏）
  		self.status = false;
  		if (isFunction(done)) {
  			done(self.value);
  		}
  	}, false);
  }
  
  // 事件绑定
  function onBindEvent() {
  	let self = this;	// this 指向 colorpicker 对象实例
  	let elem = this.elem;
  	let main = this.cache.main;
  	let name = elem.nodeName == 'INPUT' ? 'focus' : 'click';
  	
  	// 给指向容器选择器绑定触发事件
  	elem.addEventListener(name, event => {
  		// 如果当前的面板状态为：打开（显示）
  		if (self.status) {
  			document.body.removeChild(main);
  			// 更改当前面板状态为：关闭（隐藏）
  			self.status = false;
  		} else {
  			document.body.appendChild(main);
        // 设置 main 的定位
        let x = event.clientX,
          y = event.clientY,
          w = main.offsetWidth,
          h = main.offsetHeight, top, left;
        
  			// 更改当前面板状态为：打开（显示）
  			self.status = true;
  			// 初次触发，绑定 选框拖拽事件、取消按钮事件、确认按钮事件
  			if (self.active !== true) {
  				onBindDrag.call(self);
  				onBindBtns.call(self, main);
  				self.active = true;
          self.orientation();
  			}
  		}
  	}, false);
  }
  
  // 生成预定义颜色列表的静态HTML
  function CreateColorsHtml(colors) {
  	if (colors.length) {
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
  	let id = this.id;	// this 指向 colorpicker 对象实例
  	// 预定义颜色集
  	let colorsHtml = this.predefine ? CreateColorsHtml(this.colors) : '';
  	// 透明度
  	let alphaHtml = `<div id="zccp-alpha-${id}" class="zc-colorpicker-alpha" style="background: linear-gradient(to right, transparent, ${this.color});${this.alpha ? '' : 'display: none'}">
      <div class="zc-colorpicker-alpha-handle" data-zccp-drag="across"></div> </div>`;
  	
  	return `<div class="zc-colorpicker-main zc-inline-block" id="zccp-${id}">
  			<div class="zc-colorpicker-wrapper">
  				<div class="zc-colorpicker-panel zc-inline-block">
  					<canvas id="zccp-panel-${id}" width="257" height="257"></canvas>
  					<div class="zc-colorpicker-panel-handle zc-inline-block" data-zccp-drag="both"></div>
  				</div>
  				<div class="zc-colorpicker-colorbar zc-right">
  					<canvas id="zccp-colorbar-${id}" width="12" height="257"></canvas>
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
  	 * @param {String} - format - 颜色显示/输入格式，可选项：HEX、RGB、RGBA。默认值：RGB，若开启透明度则自动转为RGBA  
  	 */
  	let target = {
  		id: Math.random().toString(36).slice(-8),
  		elem: null,
  		color: '#FF0000',
  		colors: [],
  		alpha: false,
  		predefine: false,
  		done: undefined,
  		change: undefined,
  		format: 'hex'
  	};
  	
  	return new Proxy(target, {
  		get (target, key) {
  			return target[key]
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
  				case "format":
  					value = value.toLowerCase();
  					if (['hex', 'rgb', 'rgba'].indexOf(value) == -1) {
  						value = 'hex';
  					}
  					target[key] = value;
  					break;
  				default:
  					target[key] = value;
  					break;
  			}
  			return true;
  		}
  	})
  }
  
  // 生成颜色缓存代理
  function CreateRGBAProxy() {
  	let target = {r: 0, g: 0, b: 0, a: 1};
  	return new Proxy(target, {
  		get(target, key) {
  			return target[key]
  		},
  		set(target, key, value) {
  			if (key == 'a') {
          // 如果是【数字】或【数字字符串】
          if (isNumeric(value)) {
            value = `${value}`.match(/(1|0(\.\d+)?)/);
            if (!value || value[0] == 1) {
              value = 1;
            } else {
              value = parseFloat(parseFloat(value).toFixed(2));
            }
          }else {
            value = 1;
          }
  			} else {
  				value = toInt(value, false);
  				value = value > 255 ? 255 : value;
  			}
  			target[key] = value;
  			return true;
  		}
  	});
  }
  
  // 生成面板缓存代理
  function CreateCacheProxy() {
  	let target = {};
  	return new Proxy(target, {});
  }
  
  class colorpicker
  {
  	constructor(option) {
  		this.config = CreateConfigProxy();
  		this.rgba = CreateRGBAProxy();
      
  	  if (isObject(option)) {
  			let keys = Object.keys(option);
  			let valid = ['elem', 'done', 'change', 'color', 'colors', 'predefine', 'alpha', 'format']; 
  			keys.forEach(key => {
  				if (valid.indexOf(key) != -1) {
  					this[key] = option[key];
  				}
  			});
  	  }
      
  	}
  	
  	/**
  	 * 获取本次实例的唯一标识
  	 */
  	get id() {
  		return this.config.id;
  	}
  	
  	/**
  	 * 获取颜色输出值
  	 */
  	get value() {
  		let {r, g, b, a} = this.rgba;
  		if (this.alpha) {
  			return `rgba(${r}, ${g}, ${b}, ${a})`;
  		}
  		switch (this.format) {
  			case 'rgb':
  				return `rgb(${r}, ${g}, ${b})`;
  				break;
  			case 'rgba':
  				return `rgba(${r}, ${g}, ${b}, ${a})`;
  			case 'hex':
  			default:
  				return '#' + ((1 << 24) + r * (1 << 16) + g * (1 << 8) + b).toString(16).slice(1).toUpperCase();
  		}
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
  	}
  	
  	/**
  	 * 获取颜色【选择后】的回调
  	 */
  	get done() {
  		return this.config.done;
  	}
  	
  	/**
  	 * 设置颜色【选择后】的回调
  	 * @param {Function} value
  	 */
  	set done(value) {
  		this.config.done = value;
  	}
  	
  	/**
  	 * 获取颜色【被改变】的回调 
  	 */
  	get change() {
  		return this.config.change;
  	}
  	
  	/**
  	 * 设置颜色【被改变】的回调 
  	 * @param {Function} value
  	 */
  	set change(value) {
  		this.config.change = value;
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
  	}
  	
  	/**
  	 * 获取自定义颜色集合
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
  	}
  	
  	/**
  	 * 获取当前的颜色输出格式
  	 */
  	get format() {
  		return this.config.format;
  	}
  	
  	/**
  	 * 设置当前的颜色输出格式
  	 * @param {String} value - 颜色显示/输入格式，可选项：HEX、RGB、RGBA。默认值：RGB，若开启透明度则自动转为RGBA
  	 */
  	set format(value) {
  		this.config.format = value;
  	}
    
    /**
     * 通过色相值获取颜色
     */
    get huecolor() {
      let ctx = this.cache.ctx,
        hue = this.hsb.h,
        height = this.cache.colorbar.height - 2,
        y = hue / 360 * height + 1;
        
      let [r, g, b] = ctx.getImageData(0, y, 1, 1).data;
      return `rgb(${r}, ${g}, ${b})`;
    }
  	
    // 创建面板
  	render() {
  		if (this.cache instanceof Proxy) {
  			throw new Error('已初始化，不可重复操作');
  		}
      
      RefreshRgbaAndHsb.call(this, this.color);
      
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
  		cache.color = cache.main.querySelector(`#zccp-panel-${id}`);
  		cache.ptx = cache.color.getContext('2d');
  		
  		// 彩色条（canvas元素）
  		cache.colorbar = cache.main.querySelector(`#zccp-colorbar-${id}`);
  		cache.ctx = cache.colorbar.getContext('2d');
  		
  		// 颜色值的预览框
  		cache.input = cache.main.querySelector('[data-zccp-input]');
      cache.input.value = this.value;
      
      // 选择器滑块
      cache.dragElement = {
        "colorBar": cache.main.querySelector('[data-zccp-drag="vertical"]'),    // 彩色条
        "color": cache.main.querySelector('[data-zccp-drag="both"]'),           // 颜色
        "alpha": cache.main.querySelector('[data-zccp-drag="across"]')          // 透明度
      }
  		
  		// 渲染canvas
  		colorbarGradient(cache.ctx, cache.colorbar.height);
      let color = this.huecolor;
  		colorGradient(cache.ptx, color, cache.color.width, cache.color.height);
  		
  		// 事件绑定
  		onBindEvent.call(this);
  	}
    
    /**
     * 定位滑块。设置默认值和选择自定义颜色时使用
     */
    orientation() {
      let {colorBar: cbar, color, alpha} = this.cache.dragElement;
      
      // 定位彩色条选框位置
      cbar.style.top = `${this.colorbarLocation}px`;
      
      // 定位颜色选框位置
      let location = this.colorLocation;
      color.setAttribute('style', `top: ${location.top}px; left: ${location.left}px;`);
      
      // 定位透明度选框位置
      alpha.style.left = `${this.alphaLocation}px`;
    }
    
    /**
     * 计算彩色条选框的位置（定位）（不带单位）
     */
    get colorbarLocation() {
      return this.hsb.h / 360 * (this.cache.colorbar.height - 2) + 1
    }
    
    /**
     * 计算颜色选框的位置（定位）（不带单位）
     */
    get colorLocation() {
      let {h, s, b} = this.hsb,
        cel = this.cache.color,
        cw = cel.width - 2,
        ch = cel.height - 2;
      return {
        "top": (10000 - 100*b) / 10000 * ch + 1,
        "left": s / 100 * cw + 1
      }
    }
    
    /**
     * 计算透明度选框的位置（定位）（不带单位）
     */
    get alphaLocation() {
      let width = this.cache.alpha.getBoundingClientRect().width;
      return this.rgba.a * width
    }
  }

  return colorpicker;

})));