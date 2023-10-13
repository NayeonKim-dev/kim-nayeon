$(function(){
    // sc-visual main slide
    var mainSlide = new Swiper(".sc-visual .vis-swiper",{
        centeredSlides: true,
        loop: true,
        effect: 'fade',
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".btn.next",
          prevEl: ".btn.prev",
        },
    });

    // sc-visual bg-slide
    var bgSlide = new Swiper(".sc-visual .bg-swiper",{
        loop: true,
        effect: 'fade',
        touchRatio:0,
    });

    // main & bg slide 연동
    mainSlide.controller.control = bgSlide;

    //slide btn - addClass, autoplay stop & start
    $('.sc-visual .btn.auto-play').click(function(){
      $(this).toggleClass('on');

      if ($('.sc-visual .btn.auto-play').hasClass('on')) {
          mainSlide.autoplay.stop();
        } else {
          mainSlide.autoplay.start();
        }
    });

})