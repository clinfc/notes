/**
 * @description 封装 EventListerner 缓存操作
 */

// 原始函数（用户传入的事件回调函数）
type original = Function

// 事件绑定函数（原始函数封装过后的事件回调函数）
type packaged = Function

// 原始函数为键，包装函数为值的 Map 数据
type fns = Map<original, packaged>

// 事件类型
type eventType = String

type events = Map<eventType, fns>

export default class EventFns {
    private events: events

    constructor() {
        this.events = new Map()
    }

    /**
     * 保存 EventListener 回调函数
     * @param type 事件类型
     * @param original 原始函数（用户传入的事件回调函数）
     * @param packaged 事件绑定函数（原始函数封装过后的事件回调函数）
     */
    set(type: eventType, original: original, packaged: packaged): EventFns {
        let fns = this.events.get(type)
        if (!fns) {
            fns = new Map()
            this.events.set(type, fns)
        }
        fns.set(original, packaged)
        return this
    }

    /**
     * 获取 EventListener 回调函数
     * @param type 事件类型
     * @param original 原始函数（用户传入的事件回调函数）
     */
    get(type: eventType, original: original): packaged | undefined {
        let fns = this.events.get(type)
        return fns ? fns.get(original) : undefined
    }

    /**
     * 获取 EventListener 回调函数，并清除相关缓存
     * @param type 事件类型
     * @param original 原始函数（用户传入的事件回调函数）
     */
    splice(type: eventType, original: original): packaged | undefined {
        let fns = this.events.get(type)
        let packaged
        if (fns) {
            packaged = fns.get(original)
            fns.delete(original)
        }
        return packaged
    }
}
