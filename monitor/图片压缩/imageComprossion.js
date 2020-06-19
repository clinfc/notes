class imageComprossion
{
  option;
  
  constructor(arg) {
    let option = Object.assign({
      w: 1024,
      h: 1024,
      type: 'image/jpg',
      size: 0.92
    }, arg || {})
    this.option = new Proxy(option, {
      get(target, key) {
        return target[key]
      },
      set(target, key, value) {
        switch(key) {
          case "w":
          case "h":
            value = parseFloat(value)
            if (isNaN(value)) {
              value = 1024
            }
            target[key] = value
            break
          case "type":
            target[key] = value
            break
          case "size":
            value = parseFloat(value)
            if (isNaN(value)) {
              value = 0.92
            }
            target[key] = value
            break
        }
        return true
      }
    })
  }
  
  get w() {
    return this.option.w
  }
  
  set w(v) {
    this.option.w = v
  }
  
  get h() {
    return this.option.h
  }
  
  set h(v) {
    this.option.h = v
  }
  
  get type() {
    return this.option.type
  }
  
  set type(v) {
    this.option.type = v
  }
  
  get size() {
    return this.option.size
  }
  
  set size(v) {
    this.option.size = v
  }
  
  /**
   * 将图片文件转换为 base64
   * @param {File} file
   * @return {Promise}
   */
  toBase64(file) {
    return new Promise(function(resolve, reject) {
      if (!/^image\/\w+$/.test(file.type)) {
        reject(new Error('非图片格式的 File 对象'))
        return 
      }
      let reader = new FileReader()
      reader.addEventListener('load', function(event) {
        resolve(event.target.result)
      })
      reader.addEventListener('error', function(error) {
        reject(error)
      })
      reader.readAsDataURL(file)
    })
  }
  
  /**
   * 执行图片压缩
   * @param {File} file
   * @return {Promise}
   */
  compress(file) {
    return new Promise((resolve, reject) => {
      this.toBase64(file).then(base64 => {
        let image = new Image()
        image.addEventListener('load', event => {
          let ratio
          let need = false
          let w = image.naturalWidth
          let h = image.naturalHeight
          
          if (w >= h && w > this.w) {
            need = true
            ratio = w / this.w
            this.h = h / ratio
          }
          if (h > w && h > this.h) {
            need = true
            ratio = h / this.h
            this.w = w / ratio
          }
          if (!need) {
            this.w = w
            this.h = h
          }
          
          let canvas = document.createElement('canvas')
          canvas.width = this.w
          canvas.height = this.h
          
          let ctx = canvas.getContext('2d')
          ctx.clearRect(0, 0, this.w, this.h)
          ctx.drawImage(image, 0, 0, this.w, this.h)
          
          resolve(canvas.toDataURL(this.type, this.size))
          canvas.remove()
        })
        image.addEventListener('error', error => {
          reject(error)
        })
        image.src = base64
      }).catch(error => {
        reject(error)
      })
    })
  }
  
  /**
   * 批量|单个 进行图片压缩处理，支持 callback 和 Promise 两种数据回调处理
   * @param {File|FileList} file
   * @param {Function} callback 通过回调函数处理压缩后的图片资源。可选
   * @return {Promise}
   */
  render(file, callback) {
    if (typeof callback === 'function') {
      if (file.length >= 0) {
        let all = []
        for(let row of file) {
          all.push(this.compress(row))
        }
        Promise.all(all).then(result => {
          callback(result)
        })
      } else {
        this.compress(file).then(result => {
          callback(result)
        })
      }
    } else {
      if (file.length >= 0) {
        let all = []
        for(let row of file) {
          all.push(this.compress(row))
        }
        return Promise.all(all)
      } else {
        return this.compress(file)
      }
    }
  }
}