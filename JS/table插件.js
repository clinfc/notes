define([ "jquery" ], function() {

    /**
     * 功能：
     * 封装一个限时 table - td 标签宽度的库，并且能够查看被省略部分的内容
     *
     * 使用说明：
     * 1、table 标签需要添加 custom-table="over-hide" 属性用于监控
     * 2、td 标签需要添加 custom-filter="over-hide" 属性用于过滤
     * 3、添加有 custom-filter="over-hide" 属性的 td 需要限制宽度，在该 td 对应的 th 上添加 width 属性值，或者直接在该元素上添加 width 属性值
     * 4、涉及到字体图标，需要在css文件中添加：@import url(/static/comm/css/font-awesome.min.css);
     *
     * 使用限制
     * 1、只能在后台使用，某些数据基于后台架构的设计（page属性）
     * 2、tr 标签不能添加 click 事件，详情按钮委托于 table 标签，点击详情按钮也会触发 tr 标签的 click 事件（解决方案请查看后台汇款招领页面）
     * 3、貌似不支持IE
     *
     * 移植需要自定义修改的地方
     * 2、_monitor：计算详情框的算法部分
     */
    (function($) {

        "use strict";

        // 用于在style标签中添加自定义样式
        (function () {
            if (window.table_init) {
                return ;
            }
            let head = document.getElementsByTagName('head')[0];
            let style = document.getElementsByTagName('style')[0];
            if (head === undefined) {
                head = document.createElement('head');
                document.getElementsByTagName('body').lastChild(head);
            }
            if (style === undefined) {
                style = document.createElement('style');
                style.type = "text/css";
                head.appendChild(style);
            }
            let tdCss = ".custom-table [custom-filter=over-hide]{overflow: hidden; -ms-text-overflow: ellipsis; text-overflow: ellipsis; white-space: nowrap; position: relative;}";
            // 打开详情框的按钮的样式
            let detailBtnCss = ".custom-table i[data-custom=detail]{position: absolute; top: 0px; right: 0px; display: block; padding: 0px 10px; background: white; cursor: pointer; border-left: 1px solid rgb(220, 220, 220); color: rgb(255, 87, 34); line-height: 41px;}";
            // 背景遮罩
            let shadeCss = "[data-custom=shade]{position: fixed; width: 100%; height: 100%; opacity: 0; left: 0px; top: 0px; z-index: 998;}";
            // 弹出框样式（用于显示详情内容元素的css）
            let detailBoxCss = ".detail-box{position: fixed; top: 0; left: 0; color: rgb(0, 64, 133); width: 350px; line-height: 18px; padding: 10px; border: 1px solid rgb(184, 218, 255); background-color: rgb(204, 229, 255); z-index: 999;}";
            try{
                style.appendChild(document.createTextNode(tdCss));
                style.appendChild(document.createTextNode(detailBtnCss));
                style.appendChild(document.createTextNode(shadeCss));
                style.appendChild(document.createTextNode(detailBoxCss));
            } catch(e) {
                style.styleSheet.cssText = tdCss;    //针对IE
                style.styleSheet.cssText = detailBtnCss;
                style.styleSheet.cssText = shadeCss;
                style.styleSheet.cssText = detailBoxCss;
            } finally {
                window.table_init = true;
            }
        })();

        var table = (function() {
            function table(element) {
                this.element = element;
                this.init();
            }

            table.prototype = {
                // 初始化
                init: function() {
                    this.element.css('table-layout', 'fixed');
                    this._bind();
                    this._monitor();
                },
                // 绑定需要的详情框的元素
                _bind: function() {
                    var $this = this;
                    this.element.on('mouseenter mouseleave', '[custom-filter=over-hide]', function(e) {
                        if (this.scrollWidth > this.offsetWidth) {
                            // 鼠标悬浮
                            if(e.type == "mouseenter"){
                                $(this).append('<i class="fa fa-arrows-alt" data-custom="detail" style="' + this.offsetHeight + 'px"></i>');
                            }
                            // 鼠标离开
                            else if(e.type == "mouseleave"){
                                $(this).find('[data-custom=detail]').remove();
                            }
                        }
                    })
                },
                // 监控 详情按钮|关闭按钮 的 点击事件
                _monitor: function() {
                    var $this = this;
                    // 详情按钮
                    this.element.on('click', '[data-custom=detail]', function(e) {
                        let text = $(this).parent().text();
                        $this.box  = {
                            'margin-top': e.clientY - e.offsetY,
                            // 此处的 350 为弹出框的宽度
                            'margin-left': e.clientX - e.offsetX - 350
                        };
                        console.log(e);
                        let div = document.createElement('div');
                        div = $(div).addClass('detail-box').css($this.box).text(text).attr('data-custom', 'detail-box')
                            .append('<i class="fa fa-remove fa-lg" style="color: red;position: absolute;top: 0;right: 0" title="关闭" custom-filter="shade"></i>')[0];
                        $('body').append(div).append('<div custom-filter="shade" data-custom="shade"></div>');
                    });
                    // 关闭按钮
                    $('body').on('click', '[custom-filter=shade]', function() {
                        $('[data-custom=detail-box]').remove();
                        $('[data-custom=shade]').remove();
                    })
                }
            };

            return table;
        })();

        $.fn.table = function() {
            return this.each(function() {
                var $this = $(this);
                var instance = $this.data('table');
                if (!instance) {
                    $this.data('table', (new table($this)));
                }
            })
        };

        $(function(){
            $('[custom-table=over-hide]').table();
        })
    })(jQuery);

})