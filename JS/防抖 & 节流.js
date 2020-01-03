
/* ----------------------------------------------------------- 防抖：普攻间隔 ----------------------------------------------------------- */

/* ------------------------------------ 在事件被触发n秒之后执行，如果在此期间再次触发事件，则重新开始计时 ------------------------------------ */

`<input type="tel" id="tx" title="需要监控的表单元素" />`

// 防抖函数
function antiShake(callback, timeLag) {
    let timeout;
    // 使用闭包，保证每次使用的定时器是同一个
    return arg => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(arg);
            // 结束之后清除定时器
            clearTimeout(timeout);
        }, timeLag)
    }
}
// 需要触发的函数
function call(e) {
    console.log(e.target, e.target.value);
}

let listen = antiShake(call, 1000)

let tx = document.querySelector('#tx');
tx.addEventListener('input', event => {
    listen(event);
}, false)


/* ----------------------------------------------------------- 节流：技能冷却 ----------------------------------------------------------- */

`<button id="tx">节流</button>`

// 节流器
function throttle(callback, timeLag) {
    let timeout;
    return () => {
        if (timeout) {
            console.log('定时器存在，节流未结束')
        } else {
            callback();
            timeout = setTimeout(() => {
                clearTimeout(timeout);
                // 必须设值为 null，否则将一直处于节流状态
                timeout = null;
            }, timeLag)
        }
    }
}
// 需要执行的函数
function callback() {
    console.log('定时器不存在，执行函数并开启新一轮节流')
}
let listen = throttle(callback, 2000)

let tx = document.querySelector('#tx')
tx.addEventListener('click', event => {
    listen()
}, false);