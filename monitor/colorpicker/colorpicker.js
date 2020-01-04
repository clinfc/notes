let panel = document.querySelector('#zc-panel')
let aside = document.querySelector('#zc-aside')

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

function asideGradient(ctx) {
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

asideGradient(aside.getContext('2d'))
panelGradient(panel.getContext('2d'), '#ff0000')

// 拖拽监控
function a(even) {
	even.on('mousedown', function(e) {
			let down = true;
			let elem = even.offset();
			let wh = $this.window.height();
			let ww = $this.window.width();
			$this.document.on('mousemove', function(ee) {
					event.stopPropagation();
					if (down) {
							if (ee.clientY > 0 && ee.clientY < wh) {
									$this.top = ee.clientY - e.clientY + elem.top;
							}
							if (ee.clientX > 0 && ee.clientX < ww) {
									$this.left = ee.clientX - e.clientX + elem.left;
							}
							$this.initCss();
					}
			}).on('mouseup', function() {
					down = false;
			})
	})
}