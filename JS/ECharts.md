### CDN
```html
<div id="chart" style="width: 600px;height: 600px"></div>
<script src="echarts.min.js"></script>
<script>
	let dom = document.getElementById('chart')
	let chart = echarts.init(dom)
	chart.setOption({
		// 标题
		title: {
			text: "标题内容"
		},
		// X 轴
		xAxis: {
			data: ['vue', 'vuex', 'vue-router']
		},
		// Y 轴
		yAxis: {},
		// 数据
		series: {
			type: "bar",
			data: [10, 50]
		}
	})
</script>
```