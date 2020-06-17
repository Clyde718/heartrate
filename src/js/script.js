$(document).ready(function () {
  $('.slider__inner').slick({
    speed: 500,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>'
  });


  // tabs
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tabsItem--active)', function () {
    $(this)
      .addClass('catalog__tabsItem--active').siblings().removeClass('catalog__tabsItem--active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
  });

  // innerTabs
  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content--active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list--active');
      })
    })
  }

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');


  // modal
  $('[data-modal=consultation]').on('click', function () {
    $('#consultation, .overlay').fadeIn(); // открыть заказ консультации 
  })
  $('.modal__close').on('click', function () {
    $('#consultation, #order, #thanks, .overlay').fadeOut(); // закрывать любое окно по клику на крестик 
  })

  // btn-mini
  // $('.button--catalog-item').on('click', function () {
  //   $('#order, .overlay').fadeIn();
  // })
  $('.button--catalog-item').each(function (i) {
    $(this).on('click', function () {
      $('.modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('#order, .overlay').fadeIn();
    })
  });




  // validate form
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Пожалуйста, введите свое имя!",
        phone: "Пожалуйста, введите свой номер телефона!",
        email: {
          required: "Пожалуйста, введите свою почту!",
          email: "Неправильный формат почты"
        }
      }
    });
  }


  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');


  // mask
  $('input[name="phone"]').mask("+38(999) 999-9999");



  // mailer
  $('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function () {
      $(this).find('input').val('');
      $('#consultation, #order').fadeOut();
      $('#thanks').fadeIn();



      $('form').trigger('reset');
    });
    return false;
  });



  // up-arrow
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $('.up-arrow').fadeIn();
    } else {
      $('.up-arrow').fadeOut();
    }
  });


  // smooth scrolling
  $("a[href='#up']").click(function () {
    var _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });


  // animate
  new WOW().init();
});