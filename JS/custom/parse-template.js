`
<div class="root">
    <p i18-title="p.title">i18{{p.text}}</p>
    <span i18-title="span.title">i18{{span.name}} -- i18{{span.value}}</span>
</div>
`

import mitt from 'https://unpkg.com/mitt/dist/mitt.umd.js'
import i18next from 'https://unpkg.com/i18next/dist/umd/i18next.min.js'

const events = new mitt()
const root = document.querySelector('.root')

i18next.init({
    lng: 'cn',
    ns: 'test',
    defaultNS: 'test',
    resources: {
        cn: {
            test: {
                p: {
                    title: '这是段落title',
                    text: '这是段落'
                },
                span: {
                    title: '人物',
                    name: '诗仙',
                    value: '诗仙太白'
                }
            }
        },
        en: {
            test: {
                p: {
                    title: 'title',
                    text: 'this is a title'
                },
                span: {
                    title: 'people',
                    name: 'anlia',
                    value: 'path'
                }
            }
        }
    }
})

i18next.on('languageChanged', function() {
    events.emit('i18change')
})

// 绑定 attribute
const attrI18 = /i18-(.+?)=/g
const selectors = new Set(root.outerHTML.match(attrI18))
selectors.forEach(selector => {
    const els = root.querySelectorAll(`[${selector.slice(0, -1)}]`)
    for (let el of els) {
        [...el.attributes].forEach(attr => {
            const {
                name,
                value
            } = attr
            el.removeAttribute(name)

            function update() {
                el.setAttribute(name.slice(4), i18next.t(value))
            }
            update()
            events.on('i18change', update)
        })
    }
})

// 绑定 text node
const textI18 = /i18\{\{\s*(.+?)\s*\}\}/g
const texts = document.createNodeIterator(root, 4, {
    acceptNode(node) {
        if (textI18.test(node.data)) {
            return NodeFilter.FILTER_ACCEPT
        }
    }
})
while (texts.nextNode()) {
    const node = texts.referenceNode
    const tpl = node.data

    function update() {
        node.data = tpl.replace(textI18, function(...arg) {
            return i18next.t(arg[1])
        })
    }
    update()
    events.on('i18change', update)
}
