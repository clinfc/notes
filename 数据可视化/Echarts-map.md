# type: map

* 引入地理数据

```js
import 'echarts/map/js/china'
```

* 配置项

```js
let option = {
  visualMap: {
    type: 'piecewise',
    min: 0,
    max: 10000,
    left: '90%',
    top: 'middle',
    splitNumber: 10,
    inRange: {
      color: ['#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#800080']
    },
    outOfRange: {
      color: 'rgba(0, 0, 0, .5)',
    }
  },
  series: [{
    type: 'map',
    map: 'china',
    label: {
      show: true
    },
    data: [
      { name: '重庆', value: Math.round(Math.random()*10000) },
      { name: '北京', value: Math.round(Math.random()*10000) },
      { name: '天津', value: Math.round(Math.random()*10000) },
      { name: '四川', value: Math.round(Math.random()*10000) },
      { name: '贵州', value: Math.round(Math.random()*10000) },
      { name: '江苏', value: Math.round(Math.random()*10000) },
      { name: '河北', value: Math.round(Math.random()*10000) },
      { name: '湖南', value: Math.round(Math.random()*10000) },
      { name: '湖北', value: Math.round(Math.random()*10000) },
      { name: '安徽', value: Math.round(Math.random()*10000) },
      { name: '浙江', value: Math.round(Math.random()*10000) },
      { name: '福建', value: Math.round(Math.random()*10000) },
      { name: '上海', value: Math.round(Math.random()*10000) }
    ]
  }]
}
```