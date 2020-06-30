### 基础案例

```js
const dom = document.getElementById('div')
const chart = echarts.init(dom, 'dark', { renderer: 'svg' })
chart.setOption({
  title: {
    text: '主标题',
    subtext: '副标题'
  },
  // x 轴
  xAxis: {
    data: ['内衣', '手机', '家电', '餐具']
  },
  // y 轴
  yAxis: {},
  series: {
    // bar：柱状图
    type: 'bar',
    data: [100, 200, 50, 25]
  }
})
```

### 多系列图、dataset

```js
const dom = document.getElementById('div')
const chart = echarts.init(dom)
chart.setOption({
  title: {
    text: '基础案例',
    left: 'center'
  },
  tooltip: {
    formatter: function(params) {
      let {name, data, marker} = params
      if (params.componentSubType == 'pie') {
        let idx = params.encode.value[0]
        return [`${marker} ${name}`, `用时：${data[idx]} 小时`, `占比：${(data[idx] / 24 * 100).toFixed(2)}%`].join('<br/>')
      }
      if (params.componentSubType == 'bar') {
        let { y: [idx] } = params.encode
        return `${marker} ${name}<br/>收益：${data[idx]}万`
      }
    }
  },
  // 直角坐标系内绘图网格
  grid: {
    top: '35%',
    show: true,
    // 必须指定 show 为 true 才会生效
    backgroundColor: '#5FB878'
  },
  xAxis: {
    type: 'category',
    axisTick: {
      // 保证刻度线和标签对齐
      alignWithLabel: true
    }
  },
  yAxis: {},
  dataset: {
    source: [
      ["1月", 88, 33, '吃饭', 3],
      ["2月", 30, 26, '睡觉', 8],
      ["3月", 23, 18, '学习', 7],
      ["4月", 82, 48, '打游戏', 2],
      ["5月", 93, 19, '运动', 2],
      ["6月", 59, 14, '看小说', 2],
      ["7月", 66, 38],
      ["8月", 43, 8],
      ["9月", 51, 30],
      ["10月", 90, 15],
      ["11月", 24, 10],
      ["12月", 14, 47]
    ]
  },
  series: [
    {
      type: 'bar',
      encode: {
        x: 0,
        y: 2
      },
      itemStyle: {
        color: '#393D49'
      }
    },
    {
      type: 'pie',
      // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
      center: ['30%', '20%'],
      // 饼图的外半径值
      radius: '25%',
      encode: {
        itemName: 3,
        value: 4
      },
      label: {}
    },
    {
      type: 'pie',
      center: ['70%', '20%'],
      // 分别表示饼图的 内半径值 和 外半径值
      radius: ['15%', '25%'],
      encode: {
        itemName: 3,
        value: 4
      },
      // 设置每个 item 的样式，实现隔断效果
      itemStyle: {
        borderWidth: 5,
        borderColor: '#FFF'
      },
      // true：顺时针绘制（默认值）。false：逆时针绘制
      clockwise: false,
    }
  ]
})
```


### legend（图例组件）

```js
const dom = document.getElementById('div')
const chart = echarts.init(dom)
chart.setOption({
  title: {
    text: 'ECharts 多系列案例'
  },
  // x 轴
  xAxis: {
    data: ['一季度', '二季度', '三季度', '四季度']
  },
  dataset: [
    ['一季度', 30, 100, '分类1', 100],
    ['二季度', 60, 30, '分类2', 200],
    ['三季度', 40, 50, '分类3', 50],
    ['四季度', 90, 99, '分类4', 25]
  ],
  // 图例声明
  legend: {
    data: ['饼图', '折线图', '柱状图']
  },
  series: [
    {
      // 图例绑定
      name: '饼图',
      type: 'pie',
      center: ['60%', 60],
      radius: 35,
      encode: {
        itemName: 3,
        value: 4
      }
    },
    {
      // 图例绑定
      name: '折线图',
      type: 'line',
      encode: {
        x: 0,
        y: 2
      }
    },
    {
      // 图例绑定
      name: '柱状图',
      type: 'bar',
      encode: {
        x: 0,
        y: 1
      }
    }
  ]
})
```

### toolbox

```js
const dom = document.getElementById('div')
const chart = echarts.init(dom)
chart.setOption({
  title: {
    text: 'ECharts 多系列案例'
  },
  toolbox: {
    feature: {
      dataZoom: {},
      restore: {},
      saveAsImage: {}
    }
  }
})
```

### dataZoom

```js
const dom = document.getElementById('div')
const chart = echarts.init(dom)
chart.setOption({
  title: {
    text: 'ECharts 多系列案例'
  },
  dataZoom: [
    {
      show: true,
      start: 0,
      end: 100
    }
  ]
})
```

### 定位

```js
const dom = document.getElementById('div')
const chart = echarts.init(dom)
chart.setOption({
  title: {
    text: 'ECharts 多系列案例'
  },
  grid: {
    top: 100,
    left: '10%',
    right: '10%',
    bottom: 100
  }
})
```

### 双轴系列

```js
const dom = document.getElementById('div')
const chart = echarts.init(dom)
chart.setOption({
  title: {
    text: '双轴案例',
    subtext: '双 Y 轴',
    left: 'center'
    
  },
  xAxis: {
    type: 'category'
  },
  yAxis: [
    // 配置 min/max 的作用是让两个Y轴的分割线保持一致，否则会出现两种单位的分割线
    { min: 0, max: 100 },
    { 
      min: 0, 
      max: 100, 
      // 第二种防止分割线错乱的方式是隐藏其中某一Y轴的分割线
      // splitLine: { show: false }
    },
  ],
  tooltip: {},
  dataset: {
    source: [
      ['月份', ...Array(12).fill(1).map((i, k) => `${++k}月`)],
      ['投入', ...Array(12).fill(1).map(() => parseInt(Math.random() * 100))],
      ['收益', ...Array(12).fill(1).map(() => parseInt(Math.random() * 100))]
    ]
  },
  series: [
    {
      type: 'bar',
      // 以行的方式获取数据
      seriesLayoutBy: 'row',
      // y 轴坐标系为左侧坐标轴
      yAxisIndex: 0
    },
    {
      type: 'line',
      // 以行的方式获取数据
      seriesLayoutBy: 'row',
      // y 轴坐标系为右侧坐标轴
      yAxisIndex: 1
    }
  ]
}
```

### 多坐标系

```js
const dom = document.getElementById('div')
const chart = echarts.init(dom)
chart.setOption({
  title: {
    text: 'ECharts 多坐标系案例',
    subtext: '双轴 + 双坐标系',
    left: 'center'
  },
  // 将绘图网格分为上下两个区域
  grid: [
    { bottom: '55%' },
    { top: '55%' }
  ],
  xAxis: [
    {
      type: 'category',
      // 指定此条 X 轴属于绘图网格的上半区域（对应 grid 属性数组的索引值）
      gridIndex: 0
    },
    {
      type: 'category',
      // 指定此条 X 轴属于绘图网格的下半区域（对应 grid 属性数组的索引值）
      gridIndex: 1
    }
  ],
  yAxis: [
    // 指定此条 X 轴属于绘图网格的上半区域（对应 grid 属性数组的索引值）
    { gridIndex: 0, },
    // 指定此条 X 轴属于绘图网格的上半区域（对应 grid 属性数组的索引值）
    { gridIndex: 0, },
    // 指定此条 X 轴属于绘图网格的下半区域（对应 grid 属性数组的索引值）
    { gridIndex: 1, }
  ],
  tooltip: {},
  dataset: {
    source: [
      ['月份', ...Array(12).fill(1).map((i, k) => `${++k}月`)],
      ['红柱', ...Array(12).fill(1).map(() => parseInt(Math.random() * 100))],
      ['折线', ...Array(12).fill(1).map(() => parseInt(Math.random() * 100))],
      ['蓝柱', ...Array(12).fill(1).map(() => parseInt(Math.random() * 100))]
    ]
  },
  series: [{
      type: 'bar',
      // 与 dataset 联动使用，表 dataset 的一行数据为当前图的 data
      seriesLayoutBy: 'row',
      // 对饮 xAxis 属性数组的索引值
      xAxisIndex: 0,
      // 对饮 yAxis 属性数组的索引值
      yAxisIndex: 0
    },
    {
      type: 'line',
      // 与 dataset 联动使用，表 dataset 的一行数据为当前图的 data
      seriesLayoutBy: 'row',
      // 对饮 xAxis 属性数组的索引值
      xAxisIndex: 0,
      // 对饮 yAxis 属性数组的索引值
      yAxisIndex: 1
    },
    {
      type: 'bar',
      // 与 dataset 联动使用，表 dataset 的一行数据为当前图的 data
      seriesLayoutBy: 'row',
      // 对饮 xAxis 属性数组的索引值
      xAxisIndex: 1,
      // 对饮 yAxis 属性数组的索引值
      yAxisIndex: 2
    }
  ]
})
```