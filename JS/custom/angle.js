define(['jquery'], function () {
    (function ($) {

        "use strict";

        /**
         * 功能：
         * 监控输入，实现全角与半角间的相互转换
         *
         * 备注：
         * 如果调用了此插件发现没有效果，可以啥试着将调用语句放在稍后一些的位置
         *
         * 用法：
         * 1、默认项参数使用
         * $('#id').angle()			默认将输入的全角转换为半角
         *
         * 2、自定义使用
         * $('#id').angle({
						 angle: 'toFull'		自定义转换为全角或半角。参数值：toFull、tofull、full、true、1 将被定义为转换为全角，其余的任意值将被定义为转换为半角
				 })
         */
        var angle = (function() {
            function angle(element, option) {
                this.element = element;
                this.set = $.extend(true, $.fn.angle.defaults, option);
                this.init();
            }

            angle.prototype = {
                elem: null,
                // 是否转换为全角
                full: null,
                // 当前字符
                str: 0,
                // 转换后的字符串
                temp: '',
                // 当前的输入为中文
                isLock: false,
                // 存储光标索引
                cursor: null,
                // 初始化
                init: function () {
                    this.elem = this.element.get(0);
                    if (['full', 'toFull', 'tofull', true, 1].indexOf(this.set.angle) != -1) {
                        this.full = true;
                    } else {
                        this.full = false;
                    }
                    this.monitor();
                },
                // 监控字符变化
                monitor: function () {
                    var $this = this;
                    // 输入即可触发【不区分中文和英文】
                    this.element.on('input',function(){
                        $this.str = $this.element.val();
                        // 当前为非中文输入，且有值时才继续判断是否需要转换
                        if (!$this.isLock && $this.str) {
                            // 需要转换为全角，且当前字符串中含有半角 或 需要转换为半角，且当前字符串中含有全角
                            if ($this.full && /[\u0000-\u00ff\u0020]/g.test($this.str)) {
                                $this.toFull();
                                $this.getCursor();
                                $this.element.val($this.temp);
                                $this.setCursor();
                            }
                            // 需要转换为半角，且当前字符串中含有全角
                            else if (!$this.full && /[\uff00-\uffff\u3000]/g.test($this.str)) {
                                $this.toHalf();
                                $this.getCursor();
                                $this.element.val($this.temp);
                                $this.setCursor();
                            }
                        }
                    });
                    // 中文输入开始的时候，会触发此函数
                    this.element.on('compositionstart',function(){
                        $this.isLock = true;//此时在输入中，加锁
                    });
                    // 中文输入结束的时候，会触发此方法
                    this.element.on('compositionend',function(){
                        $this.isLock = false;
                    });
                },
                // 转为全角
                toFull: function () {
                    let char = null;
                    let code = null;
                    this.temp = this.str;
                    while (char = /[\u0000-\u00ff\u0020]/g.exec(this.temp)) {
                        code = char[0].charCodeAt();
                        if (code == 32) {
                            code = 12288;
                        } else if (code >= 33 && code <= 126) {
                            code += 65248;
                        }
                        this.temp = this.temp.replace(new RegExp(char[0], 'gi'), String.fromCharCode(code));
                    }
                },
                // 转为半角
                toHalf: function () {
                    let char = null;
                    let code = null;
                    this.temp = this.str;
                    while (char = /[\uff00-\uffff\u3000]/g.exec(this.temp)) {
                        code = char[0].charCodeAt();
                        if (code == 12288){
                            code = 32;
                        } if (code >= 65281 && code <= 65374){
                            code = code - 65248;
                        }
                        this.temp = this.temp.replace(new RegExp(char[0], 'gi'), String.fromCharCode(code));
                    }
                },
                // 获取光标的位置
                getCursor: function() {
                    if ('selectionStart' in this.elem) {
                        this.cursor = this.elem.selectionStart;
                    } else if ('selection' in document) {
                        this.elem.focus();
                        var sel = document.selection.createRange();
                        var selLen = document.selection.createRange().text.length;
                        Sel.moveStart('character', -this.element.value.length);
                        this.cursor = sel.text.length - selLen;
                    }
                },
                // 设置光标位置
                setCursor: function() {
                    var len = this.temp.length;
                    // 超过文本长度直接返回
                    if (len <= this.cursor) return;
                    this.elem.focus();
                    if (this.elem.setSelectionRange) { // 标准浏览器
                        this.elem.setSelectionRange(this.cursor, this.cursor);
                    } else { // IE9-
                        var range = this.elem.createTextRange();
                        range.moveStart("character", -len);
                        range.moveEnd("character", -len);
                        range.moveStart("character", this.cursor);
                        range.moveEnd("character", 0);
                        range.select();
                    }
                }
            };

            return angle;
        })();

        $.fn.angle = function(option) {
            this.each(function () {
                var $this = $(this);
                var instance = $this.data('angle');
                if (!instance) {
                    $this.data('angle', (instance = new angle($this, option)));
                }
            })
        };

        $.fn.angle.defaults = {
            angle: 'toHalf'
        };
    })(jQuery);
});