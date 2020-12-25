function toArray(tar) {
    return Array.prototype.slice.call(tar)
}

/**
 * 获取 mime 类型
 * https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */

// 元素数据
const data = toArray(document.querySelector('tbody').children).map(tr => toArray(tr.children).map(td => td.textContent))

// 拆解数据
const data = [].concat(...[].concat(
    ...toArray(document.querySelector('tbody').children).map(tr => {
        const child = tr.children
        const describe = child[1].textContent
        return child[0].textContent.split(/\s+/).map(name => {
            return child[2].textContent.split(/\s+/).map(type => ({
                name,
                type,
                describe
            }))
        })
    })))
