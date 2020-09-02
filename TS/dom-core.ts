
interface StringObject {
  [propName: string]: string
}

interface ElementConfig {
  class?: string[] | string,  // class
  style?: StringObject,   // style
  data?: StringObject,    // dataset
  attr?: StringObject,    // attribute
  prop?: object,          // others
}

function setElementProperty(callback: Function, data: object) {
  let map = Object.entries(data)
  map.forEach(callback)
}

export default class Doms {
  
  /**
   * 创建一个 Element 元素
   */
  static createElement(tagName: string, config?: ElementConfig): HTMLElement {
    let el = document.createElement(tagName)
    
    if (!config) {
      return el
    }
    
    let entries = Object.entries(config)
    
    if (entries.length) {
      entries.forEach(function([type, data]) {
        switch(type) {
          case 'class':
            if (Array.isArray(data)) {
              el.classList.add(...data)
            } else {
              el.classList.add(data)
            }
            break
          case 'style':
            setElementProperty(function([k, v]) {
              el.style[k] = v
            }, data)
            break
          case 'data':
            setElementProperty(function([k, v]) {
              el.dataset[k] = v
            }, data)
            break
          case 'attr':
            setElementProperty(function([k, v]) {
              el.setAttribute(k, v)
            }, data)
            break
          case 'prop':
          default:
            setElementProperty(function([k, v]) {
              el[k] = v
            }, data)
            break
        }
      })
    }
    
    return el
  }
  
  /**
   * 创建一个 text node
   */
  static createTextNode(content: string): Text {
    return document.createTextNode(content)
  }
  
  /**
   * 将一个或多个元素追加到父元素
   */
  static append(target: Element|DocumentFragment, elements: Element|Element[]|DocumentFragment|Text|Text[]): void {
    if (Array.isArray(elements)) {
      elements.forEach((el) => target.appendChild(el))
    } else {
      target.appendChild(elements)
    }
  }
  
  static isElement(node: any): node is Element {
    return node && typeof node === 'object' && node.nodeType && node.nodeType === Node.ELEMENT_NODE;
  }
  
  static isFragment(node: any): node is DocumentFragment {
    return node && typeof node === 'object' && node.nodeType && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
  }
  
  static isHTMLString(str: string): boolean {
    let el = document.createElement('div')
    el.innerHTML = str
    
    return el.childElementCount > 0
  }
  
  /**
   * Return array of names of block html elements
   */
  static get blockElements(): string[] {
    return [
      'address',
      'article',
      'aside',
      'blockquote',
      'canvas',
      'div',
      'dl',
      'dt',
      'fieldset',
      'figcaption',
      'figure',
      'footer',
      'form',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'header',
      'hgroup',
      'hr',
      'li',
      'main',
      'nav',
      'noscript',
      'ol',
      'output',
      'p',
      'pre',
      'ruby',
      'section',
      'table',
      'tr',
      'tfoot',
      'ul',
      'video',
    ];
  }
  
  
}