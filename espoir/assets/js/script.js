$(function(){
    // a태그 클릭 시 새로고침 방지
    $('a').click(function(e){
      e.preventDefault;
    })

    // [header-visual 섹션 관련 스크립트] -------------------------------------------------------------------------------------
    // header color change 에 쓸 선택자 변수
    const headerElements = $('.header .auth-area, .header .util-area .cart span, .header .menu-link');
    const utilElements = $('.header .logo, .header .util-area .search, .header .util-area .cart, .header .menu-link');

    // 컬러 변경 조건문 함수
    function headerColor(currentIndex) {
      if (currentIndex === 0 || currentIndex === 1) {
          headerElements.css('color', '#000');
          utilElements.removeClass('red white');
      } else if (currentIndex === 2) {
          headerElements.css('color', '#fff');
          utilElements.addClass('white').removeClass('red');
      } else if (currentIndex === 3) {
          headerElements.css('color', '#ce0e0f');
          utilElements.removeClass('white').addClass('red');
      } else {
          return false;
      }
    }

    // sc-visual - auto slide swiper
    let mainSlide = new Swiper(".sc-visual .swiper", {
      slidesPerView: "auto",
      loop: true,
      effect: "fade",
      centeredSlides: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".pagination",
        type: "progressbar",
        clickable: true,
      },
      on: {
        activeIndexChange: function () {
          // 슬라이드 변경 시 헤더 텍스트 컬러 변경
          headerColor(this.realIndex);
        }
      }
    });

    // sc-visual 이후 색상
    // 윈도우 스크롤 이벤트 핸들러
    $(window).scroll(function () {
      let scroll = $(window).scrollTop();
    
      if (scroll > 605) {
          // 스크롤 위치가 605 이상일 때, 스와이퍼 자동 재생 일시 중지
          mainSlide.autoplay.stop();
          // 선택요소 color #000으로 변경
          headerElements.css('color', '#000');
          utilElements.removeClass('red white');
      } else {
          // 스크롤 위치가 605 이하일 때, 스와이퍼 자동 재생 다시 시작
          mainSlide.autoplay.delay = 0;
          mainSlide.autoplay.start();
          // 현재 스와이퍼 인덱스 값 전달해 컬러 변경 함수 실행
          // => 현재 인덱스 값에 맞게 헤더 요소 컬러 변경
          headerColor(mainSlide.realIndex);
      }
    });

    
    // [side-menu 관련 스크립트] -------------------------------------------------------------------------------------
    // side-menu - scrollbar
    $(window).on("load",function(){
      $(".mCustomScrollbar").mCustomScrollbar({
        theme:"light-2"
      });   
    });

    // side-menu lang btn on/off
    $('.side-menu .side-inner.lang .title').click(function(){
      $(this).toggleClass('on');
      if ($(this).hasClass('on')) {  
        $(this).siblings().slideDown();
    } else {
        $(this).siblings().slideUp();
    }
    });

    // [sc-consult 관련 스크립트] -------------------------------------------------------------------------------------
    //sc-consult - animation
    $(window).scroll(function(){
      let consScroll = $(window).scrollTop();

      // .person animation effect
      if (consScroll < 125) {
        $('.sc-consult .person').removeClass('on');
      } else if (consScroll > 125) {
        $('.sc-consult .person').addClass('on');
      } else if (consScroll > 300) {
        $('.sc-consult .person').removeClass('on');
      };
      
      // .deco-area animation effect
      if (consScroll < 895) {
        $('.sc-consult .deco-area').removeClass('on');
      } else if (consScroll > 895) {
        $('.sc-consult .deco-area').addClass('on');
      } else if (consScroll > 950) {
        $('.sc-consult .deco-area').removeClass('on');
      }
    });
    
    // [sc-nbest 관련 스크립트] -------------------------------------------------------------------------------------
    // sc-nbest - navigation
    let nbestSlide = new Swiper(".sc-nbest .swiper", {
       loop:true,
       loopAdditionalSlides: 1,
       speed: 500,
        navigation: {
          nextEl: ".next",
          prevEl: ".prev",
        },
        on : {
          activeIndexChange: function() {	
            let slideIndex = this.realIndex;
            $('.sc-nbest .product-item').removeClass('on').eq(slideIndex).addClass('on');
        }
        }
      });
    
    // [sc-gift 관련 스크립트] -------------------------------------------------------------------------------------
    // sc-gift - Slides per view auto
    let giftSlide = new Swiper(".sc-gift .swiper", {
      slidesPerView: "auto",
      spaceBetween: 20,
      loop:true,
      loopAdditionalSlides: 1,
      speed: 500,
      pagination: {
        el: ".sc-gift .pagination",
        type: "progressbar",
        clickable: true,
      },
      navigation: {
        nextEl: ".next",
        prevEl: ".prev",
      },
    });

    // [sc-live 관련 스크립트] -------------------------------------------------------------------------------------
    // sc-live - youtube slide
    let liveSlide = new Swiper(".sc-live .swiper", {
      slidesPerView: "auto",
      spaceBetween: 20,
      loop:true,
      loopAdditionalSlides: 1,
      speed: 500,
      pagination: {
        el: ".sc-live .pagination",
        type: "progressbar",
        clickable: true,
      },
      navigation: {
        nextEl: ".next",
        prevEl: ".prev",
      },
      on : {
        activeIndexChange: function() {	
          let liveIndex = this.realIndex;
          $('.sc-live .text-group').removeClass('on').eq(liveIndex).addClass('on');
      }
      }
    });

    // sc-live iframe
    // iframe on
    $('.sc-live .swiper-slide a').click(function(e){
      let url = $(this).data('embed');
      let livepopEl = `<div class="iframe-container">
        <div class="iframe-area">
          <button class="close"></button>
          <div class="iframe-box">
            <iframe width="1030" height="579" src="https://www.youtube.com/embed/${url}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </div>
        </div>`
      e.preventDefault();
      $('.sc-live').append(livepopEl);
      $("html").addClass('no-scroll');
    });

    // iframe close
    $(document).on('click','.sc-live .iframe-area .close', function(){
      $("html").removeClass('no-scroll');
      $('.sc-live .iframe-container').remove();
    })

    // [sc-tok 관련 스크립트] -------------------------------------------------------------------------------------
    // sc-tok
    let tokSlide = new Swiper(".sc-tok .swiper", {
      slidesPerView: "4",
      spaceBetween: 50,
      loop:true,
      loopAdditionalSlides: 1,
      speed: 500,
      pagination: {
        el: ".sc-tok .pagination",
        type: "progressbar",
        clickable: true,
      },
      navigation: {
        nextEl: ".next",
        prevEl: ".prev",
      }
    });

    // sc-tok iframe 
    // iframe on
    $('.sc-tok .swiper-slide a').click(function(e){
      let url = $(this).data('embed');
      let tokpopEl = `<div class="iframe-container">
        <div class="iframe-area">
          <button class="close"></button>
          <div class="iframe-box">
          <iframe
          src="https://www.tiktok.com/embed/v2/${url}?lang=ko-KR"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
            <script async src="https://www.tiktok.com/embed.js"></script>  
          </div>
        </div>
        </div>`
      e.preventDefault();
      $('.sc-tok').append(tokpopEl);
      $("html").addClass('no-scroll');
    });

    // iframe close
    $(document).on('click','.sc-tok .iframe-area .close', function(){
      $("html").removeClass('no-scroll');
      $('.sc-tok .iframe-container').remove();
    });

    // [sc-board 관련 스크립트] -------------------------------------------------------------------------------------
    // sc-board - Vertical
    let bdSlide = new Swiper(".sc-board .swiper", {
      direction: "vertical",
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
    });

    // [top-up 관련 스크립트] -------------------------------------------------------------------------------------
    // top up
    $(window).on('scroll', function() {
        let scrollValue = $(window).scrollTop();
        // 스크롤 버튼 사라짐
        if (scrollValue < 785) {
            $('.top-up').addClass('off');
        } else if(scrollValue >= 785 && scrollValue <= 5020){
          // 스크롤 버튼 나타남
          $('.top-up').removeClass('off');
        }else {
          // 스크롤 버튼 고정
          $('.top-up').addClass('off').css('opacity', '1');
        }
    });
  
    // 클릭 후 top up
    $('.top-up').click(function(){
      $('html, body').animate({scrollTop: 0}, 200);
    });

})

