/**
 * @name     lRun.js
 * @desc     跑马灯效果
 * @depend   jQuery
 * @author   GL
 * @date     2016-3-11
 * @version  1.0.1 
 ** 
 */
;
(function($) {

	var lRun = function(elem, option) {

		this.config = $.extend({}, this.defaults, option);
		$(elem).addClass('lRun');
		this.init();
	};

	lRun.prototype = {
		/**
		 * 默认配置
		 * @type {Object}
		 */
		defaults: {
			timer: null, //自动跑定时器
			boxWidth: 1000, //跑马灯的宽度
			boxHeight: 150, //跑马灯的高度
			imgWidth: 150, //每张图片的宽度
			imgHeight: 150, //每张图片的高度
			directionNav: true, //是否显示左右切换按钮
			moveSpeed: 2000, //移动速度
			direction: 'left'//移动的方向分left和right
		},

		/**
		 * 样式设置
		 * @type {Object}
		 */
		setStyle: function() {

			var _this = this,
				boxWidth = _this.config.boxWidth,
				boxHeight = _this.config.boxHeight,
				imgWidth = _this.config.imgWidth,
				imgHeight = _this.config.imgHeight,
				count = Math.floor(boxWidth / imgWidth),
				space = Math.floor((boxWidth - count * _this.config.imgWidth) / (count - 1)),
				runTemplate = '<div class="lRun-wrapper"></div>';

			$('.lRun').css({
				'width': boxWidth,
				'height': boxHeight + 3,
				'overflow': 'hidden'
			}).wrap(runTemplate);

			var marginTop = $('.lRun').css('margin-top'),
				marginBottom = $('.lRun').css('margin-bottom'),
				marginLeft = $('.lRun').css('margin-left') == '0px' ? 'auto' : $('.lRun').css('margin-left'),
				marginRight = $('.lRun').css('margin-right') == '0px' ? 'auto' : $('.lRun').css('margin-right');

			$('.lRun-wrapper').css({
				width: boxWidth,
				height: boxHeight,
				marginTop: marginTop,
				marginBottom: marginBottom,
				marginLeft: marginLeft,
				marginRight: marginRight
			}).find('.lRun').css('margin', 0);

			$('.lRun ul li').css({
				'width': imgWidth,
				'height': imgHeight,
				'margin-right': space + 'px'
			}).find('img').css('height', imgHeight);

			return this;
		},

		/**
		 * 自动播放
		 * @type {Object}
		 */
		runing: function() {

			var _this = this,
				speed = _this.config.moveSpeed,
				moveSize = _this.config.imgWidth + parseInt($('.lRun ul li').css('margin-right')) + 'px'; //根据图片设置大小自动计算移动距离

			_this.config.timer = setInterval(function() {

				var $box = $('.lRun ul'),
					$children = $box.find('li');

				if ($box.css('margin-left') >= '0px') {

					if (_this.config.direction == 'right') {

						$box.css('margin-left', '-' + moveSize);

						$children.first().before($children.last());

						$box.animate({
							'marginLeft': 0
						}, speed / 2);

					} else {
						$box.animate({
							'marginLeft': '-' + moveSize
						}, speed / 2, function() {

							$children.last().after($children.first());							
							$(this).css('margin-left', 0);
						});
					}
				}

				$box.find('li').removeClass('now').first().addClass('now');
				
			}, speed);

			return this;
		},

		/**
		 * 左右切换
		 * @type {Object}
		 */
		mouseOperate: function() {

			var _this = this,
				target = _this.config.imgWidth + parseInt($('.lRun ul li').css('margin-right')),
				template = '<div class="lRun-arrow">' +
				'<div class="lRun-left">&lt</div>' +
				'<div class="lRun-right">&gt</div>' +
				'</div>';

			//出现方向切换按钮
			if (_this.config.directionNav) {

				$('.lRun').append(template);
				var top = (_this.config.boxHeight - 40) / 2 + 'px';

				$('.lRun .lRun-left,.lRun .lRun-right').css('top', top);

				$('.lRun').hover(function() {

					$('.lRun-arrow').fadeIn(500);
					clearInterval(_this.config.timer);
				}, function() {

					$('.lRun-arrow').fadeOut(500);
					_this.runing();
				});

				$('.lRun .lRun-left').on('click', function() {

					_this.moveOperate('-' + target, 0);
				});

				$('.lRun .lRun-right').on('click', function() {

					$('.lRun ul').css('margin-left', '-' + target + 'px');

					$('.lRun ul li').first().before($('.lRun ul li').last());

					_this.moveOperate(0);
				});
			}

			return this;
		},

		/**
		 * 左右切换
		 * @type {Object}
		 */
		moveOperate: function(target, source) {

			var _this = this,
				speed = _this.config.moveSpeed,
				left = $('.lRun ul').css('margin-left');

			$('.lRun ul').animate({
				'margin-left': target + 'px'
			}, speed / 4, function() {

				if (source == 0) {

					$('.lRun ul').css('margin-left', source + 'px');
					$('.lRun ul li').last().after($('.lRun ul li').first());
				};

				$('.lRun ul li').removeClass('now').first().addClass('now');
			});

			return this;
		},

		//初始化
		init: function() {

			$('.lRun,.lRun ul li').hover(function() {

				$('.lRun,.lRun ul li').removeClass('now');
				$(this).addClass('now');
			}, function() {

				$(this).removeClass('now');
			});

			this.setStyle().runing().mouseOperate();
		}
	};

	$.fn.lRun = function(option) {

		return new lRun(this, option);
	}

})(jQuery);