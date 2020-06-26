# URL

```html
<input type="file" name="file" id="file" accept="image/*" />
```
```js
document.querySelector('#file').addEventListener('change', function() {
  let file = this.files[0]
  let img = document.createElement('img')
  document.body.appendChild(img)
  
  img.src = window.URL.createObjectURL(file)
  img.addEventListener('load', function() {
    // 释放资源
    window.URL.remockObjectURL(this.src)
  }, false)
}, false)
```

# FileReader

```html
<input type="file" name="file" id="file" accept="image/*" />
```
```js
document.querySelector('#file').addEventListener('change', function() {
  let file = this.files[0]
  let img = document.createElement('img')
  document.body.appendChild(img)
  
  var reader = new FileReader();
  reader.addEventListener('load', function() {
    // img.src 是一个 base64 数据
    img.src = this.result
  })
  reader.readAsDataURL(file);
}, false)
```