(function($) {

	"use strict";

	// 导航栏点击监听
	(function monitor() {
		$('.side-nav').on('click', '.nav a', function() {
			let o = $('.nav a.active');
			let e = $(this);
			// 打开目录操作
			if (e.attr('href') == 'javascript:;') {
				// 一级菜单栏
				if (e.parents('.sub-menu').length == 0) {
					// 点击的是当前已选择的
					if (e.hasClass('active')) {
						e.find('.drop').toggleClass('down');
						e.siblings('.sub-menu').slideToggle();
					} 
					// 点击的不是当前已选择的
					else {
						if (e.find('.drop').hasClass('down')) {
							e.find('.drop').removeClass('down');
							e.siblings('.sub-menu').slideUp();
						} else {
							$('.nav>li>a>.drop').removeClass('down');
							$('.nav>li>.sub-menu').slideUp();
							e.find('.drop').addClass('down');
							e.siblings('.sub-menu').slideDown();
						}
					}
				}
				// 非一级菜单栏
				if (e.parents('.sub-menu').length > 0) {
					e.find('.drop').toggleClass('down');
					e.siblings('.sub-menu').slideToggle();
				}
			}
			o.removeClass('active');
			e.addClass('active');
		})
	})();

	var aside = (function() {
		function aside(element, menu) {
			this.element = element || [];
			this.menu = menu;
			this.init();
		}

		aside.prototype = {
			href: window.location.href,
			// 用于存储导航栏相关原始数据的数组
			menu: null,
			// 存储当前页面在导航栏中的坐标
			coord: [],
			element: null,
			// 初始化操作
			init: function() {
				let li = this.create(this.menu);
				this.element.append('<ul class="nav">' + li + '</ul>');
			},
			// 生成导航栏
			create: function(data) {
				var $this = this;
				var temp = '';
				$.each(data, function() {
					switch (typeof this[1]) {
						// 为数组（含子菜单）
						case 'object':
							let a = '<a href="javascript:;"class=""><i class="iconfont left-nav-li"></i><cite>' + this[0] + '</cite><i class="iconfont icon-icon_left drop"></i></a>';
							let sub = '<ul class="sub-menu">' + $this.create(this[1]) + '</ul>';
							temp += '<li>' + a + sub + '</li>';
							break;

						// 为链接（不含子菜单）
						default:
							temp += '<li><a href="' + this[1] + '"><i class="iconfont"></i><cite>' + this[0] + '</cite></a></li>';
							break;
					}
				});
				return temp;
			},
			// 设置导航栏默认选中项
			active: function() {
				
			}
		};

		return aside;
	})();

	$.fn.aside = function(menu) {
		return this.each(function() {
			var $this = $(this);
			var instance = $this.data('aside');
			if (!instance) {
				$this.data('aside', (instance = new aside($this, menu)));
			}
		})
	}

})(jQuery);

var menu = [
	['会员管理', [
		['统计页面', '#'],
		['会员列表', '#'],
		['会员删除', '#'],
		['会员管理', [
			['会员等级', '#'],
			['用户等级', '#'],
			['设置中心', '#']
		]]
	]],
	['会员管理', [
		['统计页面', '#'],
		['会员列表', '#'],
		['会员删除', '#'],
		['会员管理', [
			['会员等级', '#']
		]]
	]],
	['会员管理', [
		['统计页面', '#'],
		['会员列表', '#'],
		['会员删除', '#'],
		['会员管理', [
			['会员等级', '#']
		]]
	]],
	['用户中心', '#']
];

$('.side-nav').aside(menu);