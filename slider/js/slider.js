$(document).ready(function() {
  // Обрабатывает клик на картинке
  $('.img_block img').click(function() {
    // Получаем адрес картинки
    var imgAddr = $(this).attr(&quot;src&quot;);
    // Задаем свойство SRC картинке, которая в скрытом диве.
    $('#img_big_block img').attr({src: imgAddr});
    // Показываем скрытый контейнер
    $('#img_big_block').fadeIn('slow');
  });
 
  // Обрабатывает клик по большой картинке
  $('#img_big_block').click(function() {
    $(this).fadeOut();
  });
});
 