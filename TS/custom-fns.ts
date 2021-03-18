/**
 * Returns true if passed key code is printable (a-Z, 0-9, etc) character.
 *
 * @param {number} keyCode - key code
 *
 * @returns {boolean}
 */
export function isPrintableKey(keyCode: number): boolean {
  return (keyCode > 47 && keyCode < 58) || // number keys
    keyCode === 32 || keyCode === 13 || // Spacebar & return key(s)
    keyCode === 229 || // processing key input for certain languages — Chinese, Japanese, etc.
    (keyCode > 64 && keyCode < 91) || // letter keys
    (keyCode > 95 && keyCode < 112) || // Numpad keys
    (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
    (keyCode > 218 && keyCode < 223); // [\]' (in order)
}

/**
 * Check if passed function is a class
 *
 * @param {Function} fn - function to check
 *
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isClass(fn: any): boolean {
  return typeof fn === 'function' && /^\s*class\s+/.test(fn.toString());
}

/**
 * Checks if object is empty
 *
 * @param {object} object - object to check
 *
 * @returns {boolean}
 */
export function isEmptyObject(object: object): boolean {
  if (!object) {
    return true;
  }

  return Object.keys(object).length === 0 && object.constructor === Object;
}

/**
 * Check if passed object is a Promise
 *
 * @param  {*}  object - object to check
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPromise(object: any): object is Promise<any> {
  return Promise.resolve(object) === object;
}

/**
 * Delays method execution
 *
 * @param {Function} method - method to execute
 * @param {number} timeout - timeout in ms
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function delay(method: (...args: any[]) => any, timeout: number) {
  return function (): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this,
        // eslint-disable-next-line prefer-rest-params
        args = arguments;

    window.setTimeout(() => method.apply(context, args), timeout);
  };
}

/**
 * Get file extension
 *
 * @param {File} file - file
 *
 * @returns {string}
 */
export function getFileExtension(file: File): string {
  return file.name.split('.').pop();
}

/**
 * Check if string is MIME type
 *
 * @param {string} type - string to check
 *
 * @returns {boolean}
 */
export function isValidMimeType(type: string): boolean {
  return /^[-\w]+\/([-+\w]+|\*)$/.test(type);
}

/**
 * Debouncing method
 * Call method after passed time
 *
 * Note that this method returns Function and declared variable need to be called
 *
 * @param {Function} func - function that we're throttling
 * @param {number} wait - time in milliseconds
 * @param {boolean} immediate - call now
 * @returns {Function}
 */
export function debounce(func: () => void, wait?: number, immediate?: boolean): () => void {
  let timeout;

  return (): void => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this,
        // eslint-disable-next-line prefer-rest-params
        args = arguments;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    window.clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

/**
 * Copies passed text to the clipboard
 *
 * @param text - text to copy
 */
export function copyTextToClipboard(text): void {
  let el = document.createElement('div')
  el.style.width = 0
  el.style.height = 0
  el.style.overflow = 'hidden'
  el.innerHTML = text

  document.body.appendChild(el);

  const selection = window.getSelection();
  const range = document.createRange();

  range.selectNode(el);

  window.getSelection().removeAllRanges();
  selection.addRange(range);

  document.execCommand('copy');
  document.body.removeChild(el);
}

/**
 * Return string representation of the object type
 *
 * @param {*} object - object to get type
 *
 * @returns {string}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function typeOf(object: any): string {
  // return Object.prototype.toString.call(object).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  return Object.prototype.toString.call(target).toLowerCase().replace(/(\[[a-z]+\s|\])/g, '');
}

/**
 * Returns valid URL. If it is going outside and valid, it returns itself
 * If url has `one slash`, then it concatenates with window location origin
 * or when url has `two lack` it appends only protocol
 *
 * @param {string} url - url to prettify
 */
export function getValidUrl(url: string): string {
  try {
    const urlObject = new URL(url);

    return urlObject.href;
  } catch (e) {
    // do nothing but handle below
  }

  if (url.substring(0, 2) === '//') {
    return window.location.protocol + url;
  } else {
    return window.location.origin + url;
  }
}