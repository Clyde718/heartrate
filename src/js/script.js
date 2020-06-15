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

});