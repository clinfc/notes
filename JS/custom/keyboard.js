const keyCode = (function() {
    const temp = {
        backspace: 8,
        tab: 9,
        clear: 12,
        enter: 13,
        cape_lock: 20,
        esc: 27,
        spacebar: 32,
        pg_up: 33,
        pg_down: 34,
        end: 35,
        home: 36,
        l_arrow: 37,
        u_arrow: 38,
        r_arrow: 39,
        d_arrow: 40,
        insert: 45,
        delete: 46,
        num_lock: 144,
        ';': 186,
        ':': 186,
        '=': 187,
        '+': 187,
        ',': 188,
        '<': 188,
        '-': 189,
        '_': 189,
        '.': 190,
        '>': 190,
        '/': 191,
        '?': 191,
        '`': 192,
        '~': 192,
        '[': 219,
        '{': 219,
        '\\': 220,
        ']': 221,
        '}': 221,
        '\'': 222,
        '"': 222
    }

    function reduce(code, key) {
        temp[key] = code++
            return code
    }
    'abcdefghijklmnopqrstuvwxyz'.split('').reduce(reduce, 65)
    '0123456789'.split('').reduce(reduce, 48)
    'f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12'.split(',').reduce(reduce, 112)
    return temp
})()

/**
 * @example
 * new KeyboardTool({
 *     revoke: [{
 *         key: 'ctrl + z',
 *         repeat: false,
 *         composing: false,
 *     }],
 *     restore: ['alt + z']
 * })
 */
class KeyboardTool {
    /**
     * 特殊按键映射
     */
    static keyMap = [
        ['ctrl', 'e.ctrlKey'],
        ['alt', 'e.altKey'],
        ['shift', 'e.shiftKey'],
        ['meta', 'e.metaKey'],
        ['repeat', 'e.repeat'],
        ['composing', 'e.isComposing'],
    ]

    /**
     * 反向映射
     */
    static inverseMap = [
        ['ctrl', '!ctrl'],
        ['alt', '!alt'],
        ['shift', '!shift'],
        ['meta', '!meta'],
    ]

    /**
     * 功能键
     */
    static functionKeys = new Set(['ctrl', 'alt', 'shift', 'meta'])

    static keyCode = new Map(Object.entries(keyCode))

    /**
     * 已存在的组合键
     */
    combinationKeys = new Set()

    /**
     * 生成的规则
     */
    rules = new Map()

    /**
     * 已存在的快捷键组合
     */
    existing = new Set()

    constructor(option) {
        if (typeof option === 'object') {
            this.inserts(option)
        }
    }

    /**
     * 生成规则字符串
     * @param {Array} rules 
     * @returns 
     */
    compile(rules) {
        return rules.map((row) => {
            let key = ''
            let repeat = '!'
            let composing = '!'
            switch (typeof row) {
                case 'object':
                    key = row.key.toLowerCase()
                    row.repeat && (repeat = '')
                    row.composing && (composing = '')
                    break
                case 'string':
                    key = row.toLowerCase()
                    break
                default:
                    throw new Error(`无效的快捷键配置：{ uuid: ${uuid}, rule: ${row}}`)
            }
            const temp = new Set([...key.split(/\s*\+\s*/)])
            temp.forEach(key => {
                if (KeyboardTool.keyCode.has(key)) {
                    temp.delete(key)
                    temp.add(`e.keyCode === ${KeyboardTool.keyCode.get(key)}`)
                }
            })
            KeyboardTool.inverseMap.forEach(([key, val]) => {
                if (!temp.has(key)) {
                    temp.add(val)
                }
            })
            temp.add(`${repeat}repeat`)
            temp.add(`${composing}composing`)
            let rule = [...temp].sort().join(' && ')
            KeyboardTool.keyMap.forEach(([k, v]) => {
                rule = rule.replace(k, v)
            })
            return rule
        })
    }

    /**
     * 追加规则
     * @param {String} uuid 唯一标识
     * @param {Array} rules 规则配置项
     */
    insert(uuid, rules) {
        if (!this.rules.has(uuid)) {
            this.rules.set(uuid, [])
        }
        const temp = this.rules.get(uuid)
        this.compile(rules)
            .forEach(rule => {
                if (this.existing.has(rule)) {
                    console.error(`已存在的快捷键组合：${rule}`)
                } else {
                    this.existing.add(rule)
                    temp.push(Function(`return function(e) { return ${rule} }`)())
                }
            })
    }

    /**
     * 批量注册
     * @param {Object} options 
     */
    inserts(options) {
        Object.entries(options).forEach(([uuid, rules]) => {
            this.insert(uuid, rules)
        })
    }

    /**
     * 验证当前按键是否符合规则
     * @param {String} uuid 注册的唯一标识
     * @param {KeyboardEvent} e event
     * @returns 
     */
    valid(uuid, e) {
        if (this.rules.has(uuid)) {
            return this.rules.get(uuid).reduce((r, fn) => r || fn(e), false)
        }
        return false
    }
}