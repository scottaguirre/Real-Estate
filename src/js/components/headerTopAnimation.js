const headerTopAnimation = () => {
  $(document).ready(() => {
    $(window).on('scroll', () => {
      if ($(window).scrollTop() > 0) {
        $('.header-small').addClass('header-effect');
        $('.header-big').addClass('header-effect');
      } else {
        $('.header-small').removeClass('header-effect');
        $('.header-big').removeClass('header-effect');
      }
    });
  });
};

export default headerTopAnimation;
