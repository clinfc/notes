/**
 * 对 Proxy 的应用
 */

/**
 * 代理 Element 的 attributes 属性
 * @param {Element} el
 * @returns
 */
export function proxyAttribute(el) {
    return new Proxy(el, {
        get(t, p) {
            if (p === 'fn') {
                return {
                    keys() {
                        return [...t.attributes].map(row => row.nodeName)
                    },
                    values() {
                        return [...t.attributes].map(row => row.nodeValue)
                    },
                    entries() {
                        return [...t.attributes].map(row => [row.nodeName, row.nodeValue])
                    },
                }
            }
            return t.getAttribute(p)
        },
        set(t, p, v) {
            if (v === null) {
                t.removeAttribute(p)
            } else {
                t.setAttribute(p, v)
            }
            return true
        },
        has(t, p) {
            return t.hasAttribute(p)
        },
        deleteProperty(t, p) {
            t.removeAttribute(p)
            return true
        },
        ownKeys(t) {
            return [...t.attributes].map(row => row.nodeName)
        },
    })
}