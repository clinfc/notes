
### svg

* width 和 height 决定 viewport
* viewBox 决定缩放比

```html
<!-- 以下两种写法效果等同 -->
<svg width="500" height="200" viewBox="0 0 50 20" style="border: 1px solid #000000">
  <rect x="20" y="10" width="10" height="5" style="stroke: #000000; fill:none;"/>
</svg>
<!-- 不推荐的写法：未定义 viewBox -->
<svg width="500" height="200" style="border: 1px solid #000000">
  <rect x="200" y="100" width="100" height="50" stroke-width="10" style="stroke: #000000; fill:none;"/>
</svg>
```