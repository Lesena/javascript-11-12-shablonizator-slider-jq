// mySimpleSlider

(function($){
	jQuery.fn.mySimpleSlider = function(options){
		// Cписок свойств и их значения по умолчанию.
		options = $.extend({
			nextBtn:null,	// Селектор кнопки "следующий"
			prevBtn:null,	// Селектор кнопки	"предыдущий"
			playBtn:null,	// Селектор кнопки play/pause
			selectors:null,	// Слектор "переключателей"
			slideWidth:100,	// Шаг прокрутки (px)
			delay:null,		// Интервал между автопролистыванием
			duration:500	// Скорость переключения слайдов
		}, options);
		
		var slider = this;	// Объект к которому применен плагин
		var intervalID;		// Указатель таймера
		
		function setTimer(){
			if(!options.delay) return false;
			if(options.playBtn)
				if($(options.playBtn).hasClass("pause"))
					return false;
					
			intervalID = setInterval(next, options.delay);
		}
		
		function start(){
			$(options.nextBtn).on("click", next);
			$(options.prevBtn).on("click", prev);
			setTimer();
			if(options.selectors)
			{
				$(options.selectors).on("click", function(){
					selectSlide($(this).index())
				});
			}
		}
		
		function finish(){
			$(options.nextBtn).unbind();
			$(options.prevBtn).unbind();
			clearInterval(intervalID);
			$(options.selectors).unbind();
		}
		
		function getIndex(){
			return ($(slider).children("ul").position().left / options.slideWidth)*(-1);
		}
		
		function getCount(){
			return $(slider).children("ul").children("li").length;
		}
		
		function selectSlide(index){
			finish();
			$(slider).children("ul").animate({left:options.slideWidth*-1*index+"px"}, options.duration, start);
			$(options.selectors).removeClass("active");
			$(options.selectors).eq(index).addClass("active");
		}
		
		function next(){
			if(getIndex() == (getCount()-1))
			{
				selectSlide(0);
			}
			else
			{
				selectSlide(getIndex()+1);
			}
		}
		
		function prev(){
			if(getIndex() == 0)
			{
				selectSlide(getCount()-1);
			}
			else
			{
				selectSlide(getIndex()-1);
			}
		}
 
		var make = function(){
			
			if(options.playBtn)
			{
				$(options.playBtn).on("click", function(){
					if($(this).hasClass("pause"))
					{
						$(this).removeClass("pause");
						$(this).addClass("play");
						setTimer();
					}
					else
					{
						clearInterval(intervalID);
						$(this).removeClass("play");
						$(this).addClass("pause");
					}
				});
			}
			
			start();
		};
 
		return this.each(make); 
    // в итоге, метод responsiveBlock вернет текущий объект jQuery обратно
	};
})(jQuery);