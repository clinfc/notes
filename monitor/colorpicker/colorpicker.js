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
	lg.addColorStop(1/7, '#FF0000')
	lg.addColorStop(2/7, '#FF0')
	lg.addColorStop(3/7, '#0F0')
	lg.addColorStop(4/7, '#0FF')
	lg.addColorStop(5/7, '#00F')
	lg.addColorStop(6/7, '#F0F')
	lg.addColorStop(1, '#FF0000')
	ctx.fillStyle = lg
	ctx.fillRect(0, 0, 12, 180)
}

asideGradient(aside.getContext('2d'))
panelGradient(panel.getContext('2d'), '#ff0000')