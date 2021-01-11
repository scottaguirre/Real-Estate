// All animation using CSS classes and jQuery

$(document).ready(() => {
    let $animation_elements = $(".animation-element");
    let $window = $(window);
  
    let check_if_in_view = () => {
      let window_height = $window.height();
      let window_top_position = $window.scrollTop();
      let window_bottom_position = window_top_position + window_height;
  
      $.each($animation_elements, (index, el) => {
        let $element = $(el);
  
        let element_height = $element.outerHeight();
        let element_top_position = $element.offset().top;
        let element_bottom_position = element_top_position + element_height;
  
        //check to see if this current container is within viewport
        if (
          element_bottom_position >= window_top_position &&
          element_top_position <= window_bottom_position
        ) {
           
          if ($element.hasClass("slide-right")) {
            $element.addClass("in-view-right");
          }
  
          if ($element.hasClass("slide-right-top")) {
            $element.addClass("in-view-right-top");
          }
  
          if ($element.hasClass("slide-top")) {
            $element.addClass("in-view-top");
          }
  
          if ($element.hasClass("slide-left")) {
            $element.addClass("in-view-left");
          }
        }
      });
    };
  
    $window.on("scroll", check_if_in_view);
    $window.trigger("scroll");
  });
  