
// 颜色
/^(\#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})|rgb\(\d{1,3},\d{1,3},\d{1,3}\)|rgba\(\d{1,3},\d{1,3},\d{1,3},([01]|0?\.\d+)\))$/;
/^(\#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})|rgb\(\d{1,3},\s{0,}\d{1,3},\s{0,}\d{1,3}\)|rgba\(\d{1,3},\s{0,}\d{1,3},\s{0,}\d{1,3},\s{0,}([01]|0?\.\d+)\))$/;

// 颜色：16 进制
/^\#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;

// 颜色：RGB
/^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/;
/^rgb\(\d{1,3},\s{0,}\d{1,3},\s{0,}\d{1,3}\)$/;

// 颜色：RGBA
/^rgba\(\d{1,3},\d{1,3},\d{1,3},([01]|0?\.\d+)\)$/;
/^rgba\(\d{1,3},\s{0,}\d{1,3},\s{0,}\d{1,3},\s{0,}([01]|0?\.\d+)\)$/;

// 千分位。$&：表示匹配到的每一项的内容
'1234567890'.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')

// 转小驼峰
'one_two_three-four'.replace(/[_-]+[a-z]/g, function(m) {
  return m[1].toUpperCase()
})

// 转大驼峰
'one_two_three-four'.replace(/(^[a-z]|[_-]+[a-z])/g, function(t) {
    return t[t.length - 1].toUpperCase()
})

// 匹配 HTML 中的某个 attribute
`<table border="0"></table>`.match(/\<table[a-zA-Z0-9'"%=\s]+?(border="0")/)

// 批量处理 HTML 中的某个 attribute
str.replace(/\<table[a-zA-Z0-9'"%=\s]+?border="\d+"/ig, function(row) {
    return row.replace(/border="(\d+)"/, function($0, $1) {
        return $0.replace($1, 5)
    })
})
str.replace(/\<table[a-zA-Z0-9'"%=\s]+?border="\d+"/ig, function(row) {
    return row.replace(/(border=")\d+(")/, '$1n$2')
})
