const carousel = () => {
  // get the width of the image container
  let carousel_item_img = document.querySelectorAll('.carousel-item-img');
  let carousel_featured_properties = document.querySelector(
    '.carousel-featured-properties'
  );
  let slideTransitionDuration = null;

  const gettingContainerImgWidth = () => {
    let containerImageTotalWidth = null;
    // getting the margin of an element
    let style = getComputedStyle(carousel_item_img[0]);
    let marginLeft = parseInt(style.marginLeft);
    let marginRight = parseInt(style.marginRight);

    // getting the offset of an element; including content, border, padding but not margin
    let offsetImage = carousel_item_img[0].offsetWidth;

    // result of adding content + margin
    containerImageTotalWidth = offsetImage + marginLeft + marginRight;
    return containerImageTotalWidth;
  };

  // adding translate values and class to move container-image to the left every 3 seconds

  const runningCarousel = () => {
    slideTransitionDuration = setInterval(() => {
      // 1. Starting the transition
      carousel_featured_properties.style.transform = `translateX(-${gettingContainerImgWidth()}px)`;

      // 2. Declaring the function that's triggered when the transition end.
      let appendContainerImg = () => {
        carousel_featured_properties.style.transition = `none`;
        carousel_featured_properties.style.transform = `translateX(0)`;
        carousel_featured_properties.appendChild(
          carousel_featured_properties.firstElementChild
        );
      };

      // 3. Adding transitioned eventlistener
      carousel_featured_properties.addEventListener(
        'transitionend',
        appendContainerImg
      );

      // 4. Removing transitioned eventlistener when transition ends
      setTimeout(function () {
        carousel_featured_properties.removeEventListener(
          'transitionend',
          appendContainerImg
        );
        carousel_featured_properties.style.transition = `all 0.6s linear`;
      }, 650);
    }, 3000);
  };

  runningCarousel();
};

export default carousel;
