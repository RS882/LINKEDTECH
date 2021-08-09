new Swiper ('.swiper-container',{ // можно задать другой класс где расположен слайдер


//стрелки
navigation: {
    nextEl: '.swiper-button-next', //можно задать другие классы объектов при надатие на которые буде переключение 
    prevEl: '.swiper-button-prev',
  },

pagination: { //точки буллеты
   el: '.swiper-pagination',
clickable: true, // можно нажимать на точки
},


mousewheel: true, //управление колесом мыши

loop: true,

/*effect: 'fade', //эффест смены прозразночности

fadeEffect: {
crossFade:true
},*/

});