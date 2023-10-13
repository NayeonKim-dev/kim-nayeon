$(function () {
  // [swiper setting] -----------------------------------------
  // sc-visual 
  let visSlide = new Swiper(".vis-swiper", {
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".pagination",
      type: "fraction",
    },
  });

  // sc-pdtview, sc-promt, sc-sale, sc-only(top),sc-theme
  let freeSlide = new Swiper(".free-swiper", {
    slidesPerView: 'auto',
    freeMode: true,
    spaceBetween: 10,
  });

  // sc-tiping 
  let tipSlide = new Swiper(".tiping-swiper", {
    slidesPerView: 'auto',
    freeMode: true,
    spaceBetween: 15,
  });

  // sc-expert
  let exeSlide = new Swiper(".exe-swiper", {
    slidesPerView: 'auto',
    spaceBetween: 10,
  });

  // sc-focus
  let focusSlide = new Swiper(".focus-swiper", {
    slidesPerView: 'auto',
    spaceBetween: 10,
  });

  // sc-popul, sc-only(bottom)  
  let listSlide = new Swiper(".list-swiper", {
    slidesPerView: 1.2,
    grid: {
      rows: 3,
    },
    spaceBetween: 10,
    freeMode: true,
  });

  // sc-benft, sc-spon  
  let progSlide = new Swiper(".progress-swiper", {
    spaceBetween: 30,
    effect: "coverflow",
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".pagination"
    }
  });

  // sc-newbd
  let topDownSlide = new Swiper(".topdown-swiper", {
    spaceBetween: 10,
    slidesPerView: 'auto',
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".pagination"
    }
  });

  // rank 순위 증가 출력
  $(".list-swiper").each(function () {
    let rankEl = $(this).find(".ranking");

    rankEl.each(function (index) {
      let rank = index + 1;
      $(this).text(rank);
    });
  });


  // [tab, catagory setting] -----------------------------------------
  // sc-sale catagory slide 
  let catgSlide = new Swiper(".catag-swiper", {
    slidesPerView: 'auto',
    observer: true,
    observeParents: true,
    freeMode: true,
    spaceBetween: 10
  });

  // sc-sale catagory slide click 
  $('.catag-swiper .swiper-slide').click(function () {
    // css effect on / off
    $(this).addClass('on');
    $(this).siblings().removeClass('on');
  });

  // sc-sale tab menu click 
  $('.sc-sale .sale-item.hot').click(function () {
    $('.sc-sale .timer-box').css('display', 'none');
    $('.sc-sale .timer-box').siblings().css('display', 'block');
  });
  $('.sc-sale .sale-item.special').click(function () {
    $('.sc-sale .catag-swiper').css('display', 'none');
    $('.sc-sale .catag-swiper').siblings().css('display', 'block');
  });

  // tab-item on (color change) 
  $('.tab-item').click(function () {
    $(this).addClass('on').siblings().removeClass('on');
  });

  // sc-popul tab slide
  let swiper = new Swiper('.sc-popul .tab-swiper', {
    slidesPerView: 'auto',
    observer: true,
    observeParents: true
  });

  // tab slide move
  let tabSwiperItem = $('.sc-popul .tab-swiper .swiper-wrapper .swiper-slide a');
  tabSwiperItem.click(function () {
    let target = $(this).parent();
    muCenter(target);
  });

  function muCenter(target) {
    let tabwrap = $('.sc-popul .tab-swiper .swiper-wrapper');
    let targetPos = target.position(); 
    let box = $('.sc-popul .tab-swiper');
    let boxHarf = box.width() / 2;
    let pos;
    let swiperDom = $('.sc-popul .tab-swiper .swiper-wrapper')[0];
    let swiperGap = parseFloat(getComputedStyle(swiperDom).gap);
    let listWidth = 0;
    tabwrap.find('.swiper-slide').each(function () { listWidth += $(this).outerWidth() + swiperGap; })


    let selectTargetPos = targetPos.left + target.outerWidth() / 2;
    if (selectTargetPos <= boxHarf) { // left
      pos = 0;
    } else if ((listWidth - selectTargetPos) <= boxHarf) { //right
      pos = listWidth - box.width();
    } else {
      pos = selectTargetPos - boxHarf;
    }

    setTimeout(function () {
      tabwrap.css({
        "transform": "translate3d(" + (pos * -1) + "px, 0, 0)",
        "transition-duration": "500ms"
      })
    }, 200);
  };

  // tab - main slide 연동
  // sc-expert
  $('.sc-expert .tab-item').click(function () {
    exeSlide.slideTo($(this).index(), 1000, false);
  });

  // sc-focus
  $('.sc-focus .tab-item').click(function () {
    focusSlide.slideTo($(this).index(), 1000, false);
  });

  // tab,catagory 클릭 시 - 각 tab slide 출력
  // sc-popul
  $('.sc-popul .tab-item a').click(function () {
    let popCatag = $(this).data('cata');
    $('.sc-popul .list-swiper.' + popCatag).css('display', 'block');
    $('.sc-popul .list-swiper.' + popCatag).siblings('.list-swiper').css('display', 'none');
  });

  // sc-benft
  $('.sc-benft .tab-item a').click(function () {
    let bnCatag = $(this).data('cata');
    $('.sc-benft .progress-swiper.' + bnCatag).css('display', 'block');
    $('.sc-benft .progress-swiper.' + bnCatag).siblings('.progress-swiper').css('display', 'none');
    progress-swiper.slideTo(0);
  });

  // sc-sale - special과 hotsale 슬라이드 출력 컨트롤
  $('.sc-sale .sale-item a').click(function () {
    let salCatag = $(this).data('cata');
    $('.sc-sale .sale-area .slide-inner ' + '.' + salCatag).css('display', 'block');
    $('.sc-sale .sale-area .slide-inner ' + '.' + salCatag).siblings().css('display', 'none');

    // 빨간 원 선택 효과
    $(this).addClass('on');
    $(this).parent().siblings().find('a').removeClass('on');
  });

  // sc-sale - hotsale 안 카테고리 슬라이드 출력 컨트롤
  $('.sc-sale .catag-swiper .swiper-slide a').click(function () {
    let salCatag = $(this).data('cata');
    $('.sc-sale .hot-box .free-swiper.' + salCatag).css('display', 'block');
    $('.sc-sale .hot-box .free-swiper.' + salCatag).siblings().css('display', 'none');
  });

  // sc-only (bottom)
  $('.sc-only .tab-item a').click(function () {
    let onCatag = $(this).data('cata');
    $('.sc-only .list-swiper.' + onCatag).css('display', 'flex');
    $('.sc-only .list-swiper.' + onCatag).siblings().css('display', 'none');
  });



  // [timer setting] -----------------------------------------
  // sc-sale count down timer 
  function updateTimer() {
    const future = Date.parse("2024/01/01 00:00:00");
    const now = new Date();
    const diff = future - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));
    const secs = Math.floor(diff / 1000);

    const h = hours - days * 24;
    const m = mins - hours * 60;
    const s = secs - mins * 60;

    $(".sc-sale .timer-box .time").html(h + ":" + m + ":" + s);
  };
  setInterval(updateTimer, 1000);

  // [footer setting] -----------------------------------------
  //footer bis-box title arrow & address 
  $('.footer .bis-box .title').click(function () {
    $(this).toggleClass('on');
    $('.footer .bis-box address').toggleClass('on');
  });

  // [pop up alert setting] -----------------------------------------
  // alert pop  
  // sc-pdtview like click - login pop up
  $('.sc-pdtview .like').click(function () {
    $('html').addClass('no-scroll');
    $('.login-alert').css('display', 'block');
    $('.login-alert .alert-bg').addClass('on');
    setTimeout(function () {
      $(".login-alert .alert-area").addClass('on');
    }, 50);
    $('.login-alert .desc.login').css('display', 'block');
    $('.login-alert .desc.login').siblings().css('display', 'none');
    $('.login-alert .btn.confirm').prop('href', '#login-confirm');
  });

  // sc-tiping img-box click - app pop up
  $('.sc-tiping .img-box').click(function () {
    $('html').addClass('no-scroll');
    $('.login-alert').css('display', 'block');
    $('.login-alert .alert-bg').addClass('on');
    setTimeout(function () {
      $(".login-alert .alert-area").addClass('on');
    }, 50);
    $('.login-alert .desc.app').css('display', 'block');
    $('.login-alert .desc.app').siblings().css('display', 'none');
    $('.login-alert .btn.confirm').prop('href', '#app-confirm');
  });

  // pop up alert confirm & cancle
  const confirmBtn = $('.login-alert .btn-box .btn.confirm');
  const cancleBtn = $('.login-alert .btn-box .btn.cancle');

  $(confirmBtn).add(cancleBtn).click(function () {
    $('html').removeClass('no-scroll');
    $('.login-alert .alert-bg').removeClass('on');
    $('.login-alert .alert-area').removeClass('on');
    setTimeout(function () {
      $('.login-alert').css('display', 'none');
    }, 200);
  });


  // [other animation setting] -----------------------------------------
  //top-up  
  $('.top-up').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
    return false;
  });

}) //end 