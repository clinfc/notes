let te = document.querySelector('canvas')


/**
 * 访问绘画上下文
 */
let ctx = te.getContext('2d')


/**
 * 颜色
 */
ctx.fillStyle = "rgb(0, 0, 0)"          						// 设置图形的填充颜色
ctx.strokeStyle = "rgb(0, 0, 0)"        						// 设置图形轮廓的颜色


/**
 * 透明度（全局配置）（类似于 rgba 中的 a）
 */
ctx.globalAlpha = "0.1"											// 这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0


/**
 * 设置线条宽度
 */
ctx.lineWidth = 1   											// 描述线段宽度的数字。 0、 负数、 Infinity 和 NaN 会被忽略


/**
 * 设置线条末端样式
 */
ctx.lineCap = "butt"    										// 线段末端以方形结束（默认值）
ctx.lineCap = "round"   										// 线段末端以圆形结束
ctx.lineCap = "square"  										// 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域


/**
 * 设定线条与线条间接合处的样式
 */
ctx.lineJoin = "bevel"  										// 圆弧。通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度
ctx.lineJoin = "round"  										// 折角。在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角
ctx.lineJoin = "miter"  										// 直角。通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 miterLimit 属性看到效果
ctx.miterLimit = 1      										// 限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度


/**
 * 虚线样式
 */
ctx.setLineDash([5, 10, 15, 20, 25])    						// 设置填充线时使用虚线模式。 它使用一组值来指定描述模式的线和间隙的交替长度。（将值设为空数组，则切换为实线模式）
ctx.getLineDash()                       						// 一组描述交替绘制线段和间距（坐标空间单位）长度的数字
ctx.lineDashOffset = 0.0										// 设置虚线偏移量（偏移量是float精度的数字。 初始值为 0.0）


/**
 * 渐变 Gradients
 */
let lg = ctx.createLinearGradient(x0, y0, x1, y1)				// 创建出 canvasGradient 对象。接受 4 个参数，表示渐变的起点 (x1, y1) 与终点 (x2, y2)
let lg = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2)		// 创建出 canvasGradient 对象。接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆
lg.addColorStop(offset, color)									// 添加颜色。offset：0 ~ 1，渐变中颜色处所在的相对位置。color：颜色
// 举例：缓冲渐变
let lg = ctx.createLinearGradient(0, 0, 0, 150)
lg.addColorStop(0, '#00ABEB')
lg.addColorStop(0.5, '#ff9214')
lg.addColorStop(1, '#ff1558')
ctx.fillStyle = lg
ctx.fillRect(10, 10, 130, 130)


/**
 * 图案样式 Patterns
 */
let ptn = ctx.createPattern(image, type)						// image：imageObject、canvasObject。 type：repeat、repeat-x、repeat-y、no-repeat
// 举例：
let img = new Image()
img.src = 'someimage.png'
img.onload = function() {
	let ptn = ctx.createPattern(img, 'repeat')
	ctx.fillStyle = ptn
	ctx.fillRect(0, 0, 150, 150)
}


/**
 * 阴影 Shadows
 */
ctx.shadowColor = 'red'											// 设置阴影的颜色
ctx.shadowOffsetX = 0.0											// 设置阴影的水平偏移量。（默认值是 0。  Infinity 或者NaN 都会被忽略）
ctx.shadowOffsetY = 0.0											// 设置阴影的垂直偏移量。（默认值是 0。  Infinity 或者NaN 都会被忽略）
ctx.shadowBlur = 0.0   											// 设置阴影的模糊程度。（默认值是 0。 负数、 Infinity 或者 NaN 都会被忽略）


/**
 * 绘制矩形
 */
ctx.fillRect(x, y, width, height)								// 实心矩形
ctx.strokeRect(x, y, width, height)								// 矩形边框
ctx.clearRect(x, y, width, height)								// 清除矩形区域，使该区域透明


/**
 * 绘制路径
 *
 * 1、首先，你需要创建路径起始点。
 * 2、然后你使用画图命令去画出路径。
 * 3、之后你把路径封闭。
 * 4、一旦路径生成，你就能通过描边或填充路径区域来渲染图形。
 */
ctx.beginPath()                                                 // 新建路径。生成之后，图形绘制命令被指向到路径上生成路径
ctx.closePath()                                                 // 闭合路径。闭合路径之后图形绘制命令又重新指向到上下文中

ctx.moveTo(x, y)                                                // 移动笔触。将笔触移动到指定的坐标x以及y上（用于生成非连续的路径）

ctx.lineTo(x, y)                                                // 绘制直线。绘制一条从当前位置到指定x以及y位置的直线

ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)		// 绘制圆弧(圆)。画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成

ctx.quadraticCurveTo(cpx, cpy, x, y)							// 二次贝塞尔曲线。cpx,cpy为一个控制点，x,y为结束点
ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)                 // 三次贝塞尔曲线。cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点

ctx.stroke()                                                    // 通过线条来绘制图形轮廓 （在路径绘制完后调用）
ctx.fill()                                                      // 填充路径的内容区域生成实心的图形 （在路径绘制完后调用）


/**
 * 绘制文本
 */
ctx.font = "10px sans-serif"									// 设置文本的字体样式。需符合 CSS font 语法的DOMString 字符串。默认字体是 10px sans-serif
ctx.textAlign = "start"											// 设置文本的水平对齐方式。可选的值：start, end, left, right or center。 默认值是 start
ctx.textBaseline = "alphabetic"									// 设置文本的垂直对齐方式。可选的值：top, hanging, middle, alphabetic, ideographic, bottom。 默认值是 alphabetic
ctx.direction = "inherit"										// 设置文本的方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit
ctx.fillText(text, x, y [, maxWidth])       					// 实体文字。在指定的(x, y)位置填充指定的文本，绘制的最大宽度是可选的
ctx.strokeText(text, x, y [, maxWidth])     					// 边框文字。在指定的(x, y)位置填充指定的文本，绘制的最大宽度是可选的
ctx.measureText(text)											// 预测量文本信息。text：需要测量的string。将返回一个 TextMetrics对象的宽度、所在像素，这些体现文本特性的属性


/**
 * 绘制图片
 */
ctx.mozImageSmoothingEnabled = true								// 图像是否进行平滑地缩放。默认是 true
ctx.drawImage(image, x, y)      								// 其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标
ctx.drawImage(image, x, y, width, height)       				// width 和 height 这两个参数用来控制 当向canvas画入时应该缩放的大小
/*
 * image
 * 绘制到上下文的元素。允许任何的 canvas 图像源(CanvasImageSource)，例如：CSSImageValue，HTMLImageElement，SVGImageElement，HTMLVideoElement，HTMLCanvasElement，ImageBitmap 或者OffscreenCanvas。
 *
 * sx 【可选】
 * 需要绘制到目标上下文中的，image的矩形（裁剪）选择框的左上角 X 轴坐标。
 *
 * sy 【可选】
 * 需要绘制到目标上下文中的，image的矩形（裁剪）选择框的左上角 Y 轴坐标。
 *
 * sWidth 【可选】
 * 需要绘制到目标上下文中的，image的矩形（裁剪）选择框的宽度。如果不说明，整个矩形（裁剪）从坐标的sx和sy开始，到image的右下角结束。
 *
 * sHeight 【可选】
 * 需要绘制到目标上下文中的，image的矩形（裁剪）选择框的高度。
 *
 * dx
 * image的左上角在目标canvas上 X 轴坐标。
 *
 * dy
 * image的左上角在目标canvas上 Y 轴坐标。
 *
 * dWidth 【可选】
 * image在目标canvas上绘制的宽度。 允许对绘制的image进行缩放。 如果不说明， 在绘制时image宽度不会缩放。
 *
 * dHeight 【可选】
 * image在目标canvas上绘制的高度。 允许对绘制的image进行缩放。 如果不说明， 在绘制时image高度不会缩放。
 */
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)


/**
 * 状态的保存和恢复
 */
ctx.save();     												// 保存画布(canvas)当前的所有状态为默认状态
ctx.restore();  												// 恢复画布(canvas)到最近的保存的默认状态。 如果没有保存状态，此方法不做任何改变


/**
 * 移动 Translating
 */
ctx.translate(x, y)												// 移动 canvas 和它的原点到一个不同的位置。x 是左右偏移量，y 是上下偏移量
// 案例：九宫格
for (var i = 0; i < 3; i++) {
	for (var j = 0; j < 3; j++) {
		ctx.save();
		ctx.fillStyle = 'rgb(' + (51 * i) + ', ' + (255 - 51 * i) + ', 255)';
		ctx.translate(10 + j * 50, 10 + i * 50);
		ctx.fillRect(0, 0, 25, 25);
		ctx.restore();
	}
}


/**
 * 旋转 Rotating
 */
ctx.rotate(angle)												// 用于以原点为中心旋转 canvas。 angle：旋转的角度，它是顺时针方向的，以弧度为单位的值


/**
 * Path2D 对象
 *
 * 用来缓存或记录绘画命令，以简化代码和提高性能
 */
new Path2D()													// 空的Path对象
new Path2D(path)												// 克隆Path对象
new Path2D(d)													// 从SVG建立Path对象