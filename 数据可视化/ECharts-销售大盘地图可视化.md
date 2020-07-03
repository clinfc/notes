# ECharts + Vue-ECharts + 百度地图

* 需要在静态模板文件中引入 百度地图2.0 => 不足之处
* 在 vue 组件中引入 ECharts 扩展 bmap => 不足之处
* 设置配置项

```html
<!-- v 必须为 2.0 -->
<script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=我的秘钥"></script>
```

```html
<template>
  <div class="map">
    <v-chart :options="options"></v-chart>
  </div>
</template>

<script>
import 'echarts/extension/bmap/bmap'
import data from '../assets/json/bmap.json'
import styleJson from '../assets/json/styleJson.json'

let lader = data.sort((m, n) => n.value[2] - m.value[2])

export default {
  data() {
    return {
      options: {}
    }
  },
  mounted() {
    this.options = {
      title: {
        text: '年度销售额',
        subtext: '2019年度销售额汇总',
        left: 'center'
      },
      bmap: {
        key: 'kGNFvzccNhXtVfwGDi5iIQZtACfiViEB',
        center: [104.114129, 37.550339],
        zoom: 5,
        roam: false,
        mapStyle: {
          styleJson: styleJson
        }
      },
      tooltip: {},
      series: [{
        name: '销售额',
        // 散点图
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: lader.slice(10),
        encode: {
          value: 2
        },
        itemStyle: {
          color: 'pink'
        },
        // 设置点的大小
        symbolSize: function(val) {
          return val[2] / 30
        },
        label: {
          // show: true,
          position: 'right',
          formatter: function({data}) {
            return `${data.name}: ${data.value[2]}`
          }
        },
        // 起强调作用。在 :hover 时才显示 label
        emphasis: {
          label: {
            show: true
          }
        }
      }, {
        name: '销售排行 TOP-10',
        // 带动效的散点图
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: lader.slice(0, 10),
        symbolSize: function(val) {
          return val[2] / 30
        },
        encode: {
          value: 2
        },
        label: {
          show: true,
          formatter: function({data}) {
            return `${data.name}: ${data.value[2]}`
          },
          position: 'right'
        },
        // 悬浮动画
        hoverAnimation: true,
        // 波纹
        rippleEffect: {
          brushType: 'stroke'
        },
        itemStyle: {
          color: 'red',
          shadowBlur: 10,
          shadowColor: '#999'
        }
      }]
    }
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 800px;
}
</style>
```

# 数据

* bmap.json
* styleJson.json

### styleJson.json

```json
[
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": {
      "color": "#d1d1d1"
    }
  },
  {
    "featureType": "land",
    "elementType": "all",
    "stylers": {
      "color": "#f3f3f3"
    }
  },
  {
    "featureType": "railway",
    "elementType": "all",
    "stylers": {
      "visibility": "off"
    }
  },
  {
    "featureType": "highway",
    "elementType": "all",
    "stylers": {
      "color": "#fdfdfd"
    }
  },
  {
    "featureType": "highway",
    "elementType": "labels",
    "stylers": {
      "visibility": "off"
    }
  },
  {
    "featureType": "arterial",
    "elementType": "geometry",
    "stylers": {
      "color": "#fefefe"
    }
  },
  {
    "featureType": "arterial",
    "elementType": "geometry.fill",
    "stylers": {
      "color": "#fefefe"
    }
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": {
      "visibility": "off"
    }
  },
  {
    "featureType": "green",
    "elementType": "all",
    "stylers": {
      "visibility": "off"
    }
  },
  {
    "featureType": "subway",
    "elementType": "all",
    "stylers": {
      "visibility": "off"
    }
  },
  {
    "featureType": "manmade",
    "elementType": "all",
    "stylers": {
      "color": "#d1d1d1"
    }
  },
  {
    "featureType": "local",
    "elementType": "all",
    "stylers": {
      "color": "#d1d1d1"
    }
  },
  {
    "featureType": "arterial",
    "elementType": "labels",
    "stylers": {
      "visibility": "off"
    }
  },
  {
    "featureType": "boundary",
    "elementType": "all",
    "stylers": {
      "color": "#fefefe"
    }
  },
  {
    "featureType": "building",
    "elementType": "all",
    "stylers": {
      "color": "#d1d1d1"
    }
  },
  {
    "featureType": "label",
    "elementType": "labels.text.fill",
    "stylers": {
      "color": "#999999"
    }
  }
]
```

### bmap.json

```json
[
  {
    "name": "海门",
    "value": [
      121.15,
      31.89,
      339.7
    ]
  },
  {
    "name": "鄂尔多斯",
    "value": [
      109.781327,
      39.608266,
      497.17
    ]
  },
  {
    "name": "招远",
    "value": [
      120.38,
      37.35,
      118.54
    ]
  },
  {
    "name": "舟山",
    "value": [
      122.207216,
      29.985295,
      136.56
    ]
  },
  {
    "name": "齐齐哈尔",
    "value": [
      123.97,
      47.33,
      282.01
    ]
  },
  {
    "name": "盐城",
    "value": [
      120.13,
      33.38,
      478.59
    ]
  },
  {
    "name": "赤峰",
    "value": [
      118.87,
      42.28,
      259.84
    ]
  },
  {
    "name": "青岛",
    "value": [
      120.33,
      36.07,
      294.59
    ]
  },
  {
    "name": "乳山",
    "value": [
      121.52,
      36.89,
      306.76
    ]
  },
  {
    "name": "金昌",
    "value": [
      102.188043,
      38.520089,
      97.19
    ]
  },
  {
    "name": "泉州",
    "value": [
      118.58,
      24.93,
      335.65
    ]
  },
  {
    "name": "莱西",
    "value": [
      120.53,
      36.86,
      157.92
    ]
  },
  {
    "name": "日照",
    "value": [
      119.46,
      35.42,
      281.32
    ]
  },
  {
    "name": "胶南",
    "value": [
      119.97,
      35.88,
      383.66
    ]
  },
  {
    "name": "南通",
    "value": [
      121.05,
      32.08,
      385.45
    ]
  },
  {
    "name": "拉萨",
    "value": [
      91.11,
      29.97,
      299.26
    ]
  },
  {
    "name": "云浮",
    "value": [
      112.02,
      22.93,
      249.06
    ]
  },
  {
    "name": "梅州",
    "value": [
      116.1,
      24.55,
      131.03
    ]
  },
  {
    "name": "文登",
    "value": [
      122.05,
      37.2,
      142.56
    ]
  },
  {
    "name": "上海",
    "value": [
      121.48,
      31.22,
      48.52
    ]
  },
  {
    "name": "攀枝花",
    "value": [
      101.718637,
      26.582347,
      299.14
    ]
  },
  {
    "name": "威海",
    "value": [
      122.1,
      37.5,
      143.61
    ]
  },
  {
    "name": "承德",
    "value": [
      117.93,
      40.97,
      5.93
    ]
  },
  {
    "name": "厦门",
    "value": [
      118.1,
      24.46,
      382.28
    ]
  },
  {
    "name": "汕尾",
    "value": [
      115.375279,
      22.786211,
      465.73
    ]
  },
  {
    "name": "潮州",
    "value": [
      116.63,
      23.68,
      196.94
    ]
  },
  {
    "name": "丹东",
    "value": [
      124.37,
      40.13,
      272.24
    ]
  },
  {
    "name": "太仓",
    "value": [
      121.1,
      31.45,
      368.28
    ]
  },
  {
    "name": "曲靖",
    "value": [
      103.79,
      25.51,
      179.49
    ]
  },
  {
    "name": "烟台",
    "value": [
      121.39,
      37.52,
      212.77
    ]
  },
  {
    "name": "福州",
    "value": [
      119.3,
      26.08,
      376.41
    ]
  },
  {
    "name": "瓦房店",
    "value": [
      121.979603,
      39.627114,
      464.56
    ]
  },
  {
    "name": "即墨",
    "value": [
      120.45,
      36.38,
      161.63
    ]
  },
  {
    "name": "抚顺",
    "value": [
      123.97,
      41.97,
      394.19
    ]
  },
  {
    "name": "玉溪",
    "value": [
      102.52,
      24.35,
      365.33
    ]
  },
  {
    "name": "张家口",
    "value": [
      114.87,
      40.82,
      414.27
    ]
  },
  {
    "name": "阳泉",
    "value": [
      113.57,
      37.85,
      31.88
    ]
  },
  {
    "name": "莱州",
    "value": [
      119.942327,
      37.177017,
      113.76
    ]
  },
  {
    "name": "湖州",
    "value": [
      120.1,
      30.86,
      202.48
    ]
  },
  {
    "name": "汕头",
    "value": [
      116.69,
      23.39,
      480.55
    ]
  },
  {
    "name": "昆山",
    "value": [
      120.95,
      31.39,
      431.1
    ]
  },
  {
    "name": "宁波",
    "value": [
      121.56,
      29.86,
      273.48
    ]
  },
  {
    "name": "湛江",
    "value": [
      110.359377,
      21.270708,
      147.19
    ]
  },
  {
    "name": "揭阳",
    "value": [
      116.35,
      23.55,
      372.16
    ]
  },
  {
    "name": "荣成",
    "value": [
      122.41,
      37.16,
      62.9
    ]
  },
  {
    "name": "连云港",
    "value": [
      119.16,
      34.59,
      329.21
    ]
  },
  {
    "name": "葫芦岛",
    "value": [
      120.836932,
      40.711052,
      237.49
    ]
  },
  {
    "name": "常熟",
    "value": [
      120.74,
      31.64,
      190.98
    ]
  },
  {
    "name": "东莞",
    "value": [
      113.75,
      23.04,
      86.01
    ]
  },
  {
    "name": "河源",
    "value": [
      114.68,
      23.73,
      381.26
    ]
  },
  {
    "name": "淮安",
    "value": [
      119.15,
      33.5,
      196.2
    ]
  },
  {
    "name": "泰州",
    "value": [
      119.9,
      32.49,
      30.54
    ]
  },
  {
    "name": "南宁",
    "value": [
      108.33,
      22.84,
      71.63
    ]
  },
  {
    "name": "营口",
    "value": [
      122.18,
      40.65,
      4.05
    ]
  },
  {
    "name": "惠州",
    "value": [
      114.4,
      23.09,
      99.21
    ]
  },
  {
    "name": "江阴",
    "value": [
      120.26,
      31.91,
      392.08
    ]
  },
  {
    "name": "蓬莱",
    "value": [
      120.75,
      37.8,
      65.84
    ]
  },
  {
    "name": "韶关",
    "value": [
      113.62,
      24.84,
      332.16
    ]
  },
  {
    "name": "嘉峪关",
    "value": [
      98.289152,
      39.77313,
      239.83
    ]
  },
  {
    "name": "广州",
    "value": [
      113.23,
      23.16,
      142.94
    ]
  },
  {
    "name": "延安",
    "value": [
      109.47,
      36.6,
      89.36
    ]
  },
  {
    "name": "太原",
    "value": [
      112.53,
      37.87,
      62.63
    ]
  },
  {
    "name": "清远",
    "value": [
      113.01,
      23.7,
      275.24
    ]
  },
  {
    "name": "中山",
    "value": [
      113.38,
      22.52,
      173.98
    ]
  },
  {
    "name": "昆明",
    "value": [
      102.73,
      25.04,
      104.06
    ]
  },
  {
    "name": "寿光",
    "value": [
      118.73,
      36.86,
      142.9
    ]
  },
  {
    "name": "盘锦",
    "value": [
      122.070714,
      41.119997,
      111.08
    ]
  },
  {
    "name": "长治",
    "value": [
      113.08,
      36.18,
      179.58
    ]
  },
  {
    "name": "深圳",
    "value": [
      114.07,
      22.62,
      158.75
    ]
  },
  {
    "name": "珠海",
    "value": [
      113.52,
      22.3,
      391.46
    ]
  },
  {
    "name": "宿迁",
    "value": [
      118.3,
      33.96,
      403.61
    ]
  },
  {
    "name": "咸阳",
    "value": [
      108.72,
      34.36,
      394.48
    ]
  },
  {
    "name": "铜川",
    "value": [
      109.11,
      35.09,
      361.32
    ]
  },
  {
    "name": "平度",
    "value": [
      119.97,
      36.77,
      195.96
    ]
  },
  {
    "name": "佛山",
    "value": [
      113.11,
      23.05,
      56.45
    ]
  },
  {
    "name": "海口",
    "value": [
      110.35,
      20.02,
      98.26
    ]
  },
  {
    "name": "江门",
    "value": [
      113.06,
      22.61,
      244.56
    ]
  },
  {
    "name": "章丘",
    "value": [
      117.53,
      36.72,
      195.83
    ]
  },
  {
    "name": "肇庆",
    "value": [
      112.44,
      23.05,
      396.54
    ]
  },
  {
    "name": "大连",
    "value": [
      121.62,
      38.92,
      149.52
    ]
  },
  {
    "name": "临汾",
    "value": [
      111.5,
      36.08,
      57.04
    ]
  },
  {
    "name": "吴江",
    "value": [
      120.63,
      31.16,
      117.99
    ]
  },
  {
    "name": "石嘴山",
    "value": [
      106.39,
      39.04,
      51.56
    ]
  },
  {
    "name": "沈阳",
    "value": [
      123.38,
      41.8,
      134.01
    ]
  },
  {
    "name": "苏州",
    "value": [
      120.62,
      31.32,
      153.34
    ]
  },
  {
    "name": "茂名",
    "value": [
      110.88,
      21.68,
      216.48
    ]
  },
  {
    "name": "嘉兴",
    "value": [
      120.76,
      30.77,
      368.72
    ]
  },
  {
    "name": "长春",
    "value": [
      125.35,
      43.88,
      331.02
    ]
  },
  {
    "name": "胶州",
    "value": [
      120.03336,
      36.264622,
      488.98
    ]
  },
  {
    "name": "银川",
    "value": [
      106.27,
      38.47,
      485.73
    ]
  },
  {
    "name": "张家港",
    "value": [
      120.555821,
      31.875428,
      292.81
    ]
  },
  {
    "name": "三门峡",
    "value": [
      111.19,
      34.76,
      210.03
    ]
  },
  {
    "name": "锦州",
    "value": [
      121.15,
      41.13,
      447.22
    ]
  },
  {
    "name": "南昌",
    "value": [
      115.89,
      28.68,
      371.92
    ]
  },
  {
    "name": "柳州",
    "value": [
      109.4,
      24.33,
      319.98
    ]
  },
  {
    "name": "三亚",
    "value": [
      109.511909,
      18.252847,
      325.78
    ]
  },
  {
    "name": "自贡",
    "value": [
      104.778442,
      29.33903,
      453.36
    ]
  },
  {
    "name": "吉林",
    "value": [
      126.57,
      43.87,
      329.47
    ]
  },
  {
    "name": "阳江",
    "value": [
      111.95,
      21.85,
      197.13
    ]
  },
  {
    "name": "泸州",
    "value": [
      105.39,
      28.91,
      420.99
    ]
  },
  {
    "name": "西宁",
    "value": [
      101.74,
      36.56,
      486.88
    ]
  },
  {
    "name": "宜宾",
    "value": [
      104.56,
      29.77,
      244.8
    ]
  },
  {
    "name": "呼和浩特",
    "value": [
      111.65,
      40.82,
      11.83
    ]
  },
  {
    "name": "成都",
    "value": [
      104.06,
      30.67,
      427.83
    ]
  },
  {
    "name": "大同",
    "value": [
      113.3,
      40.12,
      215.61
    ]
  },
  {
    "name": "镇江",
    "value": [
      119.44,
      32.2,
      231.4
    ]
  },
  {
    "name": "桂林",
    "value": [
      110.28,
      25.29,
      3.56
    ]
  },
  {
    "name": "张家界",
    "value": [
      110.479191,
      29.117096,
      300.18
    ]
  },
  {
    "name": "宜兴",
    "value": [
      119.82,
      31.36,
      341.61
    ]
  },
  {
    "name": "北海",
    "value": [
      109.12,
      21.49,
      45.34
    ]
  },
  {
    "name": "西安",
    "value": [
      108.95,
      34.27,
      192.02
    ]
  },
  {
    "name": "金坛",
    "value": [
      119.56,
      31.74,
      337.73
    ]
  },
  {
    "name": "东营",
    "value": [
      118.49,
      37.46,
      470.96
    ]
  },
  {
    "name": "牡丹江",
    "value": [
      129.58,
      44.6,
      3.75
    ]
  },
  {
    "name": "遵义",
    "value": [
      106.9,
      27.7,
      244.25
    ]
  },
  {
    "name": "绍兴",
    "value": [
      120.58,
      30.01,
      123.07
    ]
  },
  {
    "name": "扬州",
    "value": [
      119.42,
      32.39,
      399.76
    ]
  },
  {
    "name": "常州",
    "value": [
      119.95,
      31.79,
      285.68
    ]
  },
  {
    "name": "潍坊",
    "value": [
      119.1,
      36.62,
      245.17
    ]
  },
  {
    "name": "重庆",
    "value": [
      106.54,
      29.59,
      148.14
    ]
  },
  {
    "name": "台州",
    "value": [
      121.420757,
      28.656386,
      222.21
    ]
  },
  {
    "name": "南京",
    "value": [
      118.78,
      32.04,
      484.76
    ]
  },
  {
    "name": "滨州",
    "value": [
      118.03,
      37.36,
      204.3
    ]
  },
  {
    "name": "贵阳",
    "value": [
      106.71,
      26.57,
      40.96
    ]
  },
  {
    "name": "无锡",
    "value": [
      120.29,
      31.59,
      206.48
    ]
  },
  {
    "name": "本溪",
    "value": [
      123.73,
      41.3,
      140.69
    ]
  },
  {
    "name": "克拉玛依",
    "value": [
      84.77,
      45.59,
      239.36
    ]
  },
  {
    "name": "渭南",
    "value": [
      109.5,
      34.52,
      486.94
    ]
  },
  {
    "name": "马鞍山",
    "value": [
      118.48,
      31.56,
      136.28
    ]
  },
  {
    "name": "宝鸡",
    "value": [
      107.15,
      34.38,
      228.56
    ]
  },
  {
    "name": "焦作",
    "value": [
      113.21,
      35.24,
      229.15
    ]
  },
  {
    "name": "句容",
    "value": [
      119.16,
      31.95,
      433.34
    ]
  },
  {
    "name": "北京",
    "value": [
      116.46,
      39.92,
      399.16
    ]
  },
  {
    "name": "徐州",
    "value": [
      117.2,
      34.26,
      341.76
    ]
  },
  {
    "name": "衡水",
    "value": [
      115.72,
      37.72,
      26.87
    ]
  },
  {
    "name": "包头",
    "value": [
      110,
      40.58,
      218.6
    ]
  },
  {
    "name": "绵阳",
    "value": [
      104.73,
      31.48,
      384.76
    ]
  },
  {
    "name": "乌鲁木齐",
    "value": [
      87.68,
      43.77,
      355.97
    ]
  },
  {
    "name": "枣庄",
    "value": [
      117.57,
      34.86,
      105.59
    ]
  },
  {
    "name": "杭州",
    "value": [
      120.19,
      30.26,
      446.36
    ]
  },
  {
    "name": "淄博",
    "value": [
      118.05,
      36.78,
      247.76
    ]
  },
  {
    "name": "鞍山",
    "value": [
      122.85,
      41.12,
      290.22
    ]
  },
  {
    "name": "溧阳",
    "value": [
      119.48,
      31.43,
      94.78
    ]
  },
  {
    "name": "库尔勒",
    "value": [
      86.06,
      41.68,
      206.02
    ]
  },
  {
    "name": "安阳",
    "value": [
      114.35,
      36.1,
      54.11
    ]
  },
  {
    "name": "开封",
    "value": [
      114.35,
      34.79,
      109.88
    ]
  },
  {
    "name": "济南",
    "value": [
      117,
      36.65,
      48.21
    ]
  },
  {
    "name": "德阳",
    "value": [
      104.37,
      31.13,
      220.16
    ]
  },
  {
    "name": "温州",
    "value": [
      120.65,
      28.01,
      130.7
    ]
  },
  {
    "name": "九江",
    "value": [
      115.97,
      29.71,
      182.26
    ]
  },
  {
    "name": "邯郸",
    "value": [
      114.47,
      36.6,
      221.15
    ]
  },
  {
    "name": "临安",
    "value": [
      119.72,
      30.23,
      161.75
    ]
  },
  {
    "name": "兰州",
    "value": [
      103.73,
      36.03,
      278.51
    ]
  },
  {
    "name": "沧州",
    "value": [
      116.83,
      38.33,
      159.15
    ]
  },
  {
    "name": "临沂",
    "value": [
      118.35,
      35.05,
      87.09
    ]
  },
  {
    "name": "南充",
    "value": [
      106.110698,
      30.837793,
      224.53
    ]
  },
  {
    "name": "天津",
    "value": [
      117.2,
      39.13,
      314.83
    ]
  },
  {
    "name": "富阳",
    "value": [
      119.95,
      30.07,
      285.69
    ]
  },
  {
    "name": "泰安",
    "value": [
      117.13,
      36.18,
      467.64
    ]
  },
  {
    "name": "诸暨",
    "value": [
      120.23,
      29.71,
      307.56
    ]
  },
  {
    "name": "郑州",
    "value": [
      113.65,
      34.76,
      55.77
    ]
  },
  {
    "name": "哈尔滨",
    "value": [
      126.63,
      45.75,
      117.42
    ]
  },
  {
    "name": "聊城",
    "value": [
      115.97,
      36.45,
      96.17
    ]
  },
  {
    "name": "芜湖",
    "value": [
      118.38,
      31.33,
      11.09
    ]
  },
  {
    "name": "唐山",
    "value": [
      118.02,
      39.63,
      87.48
    ]
  },
  {
    "name": "平顶山",
    "value": [
      113.29,
      33.75,
      42.64
    ]
  },
  {
    "name": "邢台",
    "value": [
      114.48,
      37.05,
      306.47
    ]
  },
  {
    "name": "德州",
    "value": [
      116.29,
      37.45,
      275.11
    ]
  },
  {
    "name": "济宁",
    "value": [
      116.59,
      35.38,
      346.84
    ]
  },
  {
    "name": "荆州",
    "value": [
      112.239741,
      30.335165,
      218.87
    ]
  },
  {
    "name": "宜昌",
    "value": [
      111.3,
      30.7,
      382.05
    ]
  },
  {
    "name": "义乌",
    "value": [
      120.06,
      29.32,
      24.56
    ]
  },
  {
    "name": "丽水",
    "value": [
      119.92,
      28.45,
      97.14
    ]
  },
  {
    "name": "洛阳",
    "value": [
      112.44,
      34.7,
      388.19
    ]
  },
  {
    "name": "秦皇岛",
    "value": [
      119.57,
      39.95,
      485.87
    ]
  },
  {
    "name": "株洲",
    "value": [
      113.16,
      27.83,
      180.42
    ]
  },
  {
    "name": "石家庄",
    "value": [
      114.48,
      38.03,
      458.52
    ]
  },
  {
    "name": "莱芜",
    "value": [
      117.67,
      36.19,
      435.19
    ]
  },
  {
    "name": "常德",
    "value": [
      111.69,
      29.05,
      74.61
    ]
  },
  {
    "name": "保定",
    "value": [
      115.48,
      38.85,
      455.92
    ]
  },
  {
    "name": "湘潭",
    "value": [
      112.91,
      27.87,
      403.32
    ]
  },
  {
    "name": "金华",
    "value": [
      119.64,
      29.12,
      104.36
    ]
  },
  {
    "name": "岳阳",
    "value": [
      113.09,
      29.37,
      468.82
    ]
  },
  {
    "name": "长沙",
    "value": [
      113,
      28.21,
      327.77
    ]
  },
  {
    "name": "衢州",
    "value": [
      118.88,
      28.97,
      173.43
    ]
  },
  {
    "name": "廊坊",
    "value": [
      116.7,
      39.53,
      322.54
    ]
  },
  {
    "name": "菏泽",
    "value": [
      115.480656,
      35.23375,
      465.64
    ]
  },
  {
    "name": "合肥",
    "value": [
      117.27,
      31.86,
      40.47
    ]
  },
  {
    "name": "武汉",
    "value": [
      114.31,
      30.52,
      467.04
    ]
  },
  {
    "name": "大庆",
    "value": [
      125.03,
      46.58,
      468.49
    ]
  }
]
```