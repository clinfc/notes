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

### 多系列案例

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
  series: [
    {
      // pie：饼图
      type: 'pie',
      // 中心点
      center: ['60%', 60],
      // 半径
      radius: 35,
      data: [
        { name: '分类1', value: 30 },
        { name: '分类2', value: 60 },
        { name: '分类3', value: 40 },
        { name: '分类4', value: 90 },
      ]
    },
    {
      // line：折线图
      type: 'line',
      data: [100, 30, 50, 99]
    },
    {
      // bar：柱状图
      type: 'bar',
      data: [100, 200, 50, 25]
    }
  ]
})
```

### dataset

```js
const dom = document.getElementById('div')
const chart = echarts.init(dom)
chart.setOption({
  title: {
    text: 'ECharts 多系列案例'
  },
  xAxis: {
    data: ['一季度', '二季度', '三季度', '四季度']
  },
  dataset: [
    ['一季度', 30, 100, '分类1', 100],
    ['二季度', 60, 30, '分类2', 200],
    ['三季度', 40, 50, '分类3', 50],
    ['四季度', 90, 99, '分类4', 25]
  ],
  series: [
    {
      type: 'pie',
      center: ['60%', 60],
      radius: 35,
      // 与 dataset 进行数据绑定
      encode: {
        itemName: 3,
        value: 4
      }
    },
    {
      type: 'line',
      // 与 dataset 进行数据绑定
      encode: {
        x: 0,
        y: 2
      }
    },
    {
      type: 'bar',
      // 与 dataset 进行数据绑定
      encode: {
        x: 0,
        y: 1
      }
    }
  ]
})
```


### legend（图例）

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

### 双坐标系

```js
const dom = document.getElementById('div')
const chart = echarts.init(dom)
chart.setOption({
  title: {
    text: 'ECharts 多系列案例'
  },
  xAxis: {
    // 指定 x 轴的类型
    type: 'category'
  },
  // 声明两个 y 轴
  yAxis: [{}, {
    // 隐藏第二坐标轴线条
    splitLine: {
      show: false
    }
  }]
  dataset: {
    source: {
      ['product', 2016, 2017, 2018, 2019],
      ['投入', 41.4, 45.2, 46.7, 48.9],
      ['收入', 81, 85, 89, 91]
    }
  },
  series: [
    {
      type: 'bar',
      // 以行的方式获取数据
      seriesLayoutBy: 'row',
      // y 轴坐标系为第一个坐标轴
      yAxisIndex: 0
    },
    {
      type: 'line',
      // 以行的方式获取数据
      seriesLayoutBy: 'row',
      // y 轴坐标系为第二个坐标轴
      yAxisIndex: 1
    }
  ]
})
```

### 多坐标系

```js
const dom = document.getElementById('div')
const chart = echarts.init(dom)
chart.setOption({
  title: {
    text: 'ECharts 多系列案例'
  },
  grid: [
    {
      bottom: '50%'
    }, 
    {
      top: '50%'
    }
  ],
  xAxis: [
    {
      type: 'category',
      gridIndex: 0
    },
    {
      type: 'category',
      gridIndex: 1
    }
  ],
  yAxis: [
    {
      gridIndex: 0,
    },
    {
      splitLine: {
        show: false
      },
      gridIndex: 0,
    },
    {
      min: 0,
      max: 150,
      gridIndex: 1,
    }
  ]
  dataset: {
    source: [
      ['product', 2016, 2017, 2018, 2019],
      ['投入', 41.4, 45.2, 46.7, 48.9],
      ['收入', 81, 85, 89, 91]
    ]
  },
  series: [
    {
      type: 'bar',
      seriesLayoutBy: 'row',
      xAxisIndex: 0,
      yAxisIndex: 0
    },
    {
      type: 'line',
      seriesLayoutBy: 'row',
      xAxisIndex: 0,
      yAxisIndex: 1
    },
    {
      type: 'bar',
      seriesLayoutBy: 'row',
      xAxisIndex: 1,
      yAxisIndex: 2
    }
  ]
})
```