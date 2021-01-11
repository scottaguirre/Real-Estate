const carousel = () => {
  let carousel_item_img = document.querySelectorAll('.carousel-item-img');
  let carousel_featured_properties = document.querySelector(
    '.carousel-featured-properties'
  );
  let leftArrow = document.querySelector('.left-arrow');
  let rightArrow = document.querySelector('.right-arrow');
  let slideTransitionDuration = null;

  //==== Function ====//
  // this function gets the width of the image container including the margins
  const gettingContainerImgWidth = () => {
    let containerImageTotalWidth = null;
    // getting the margin of an element
    let style = getComputedStyle(carousel_item_img[0]);
    let marginLeft = parseInt(style.marginLeft);
    let marginRight = parseInt(style.marginRight);
    // getting the offset of an element; including content, border, padding but not margin
    let offsetImage = carousel_item_img[0].offsetWidth;
    // The result of adding content + margin
    containerImageTotalWidth = offsetImage + marginLeft + marginRight;
    return containerImageTotalWidth;
  };

  //===== Function ====//
  // Adding transitionend EventListener and removing transitionend EventListener
  let addingTransitionEndAndRemovingTransitionEnd = () => {
    // 1. Declaring the function that's triggered when the transition ends.
    let appendContainerImg = () => {
      carousel_featured_properties.style.transition = `none`;
      carousel_featured_properties.style.transform = `translateX(0)`;
      carousel_featured_properties.appendChild(
        carousel_featured_properties.firstElementChild
      );
    };

    // 2. Adding transitionend Eventlistener
    carousel_featured_properties.addEventListener(
      'transitionend',
      appendContainerImg
    );

    // 3. Removing transitioned Eventlistener when the transition ends
    setTimeout(function () {
      carousel_featured_properties.removeEventListener(
        'transitionend',
        appendContainerImg
      );
      // 4. adding transition property back to the element
      carousel_featured_properties.style.transition = `all 0.6s linear`;
    }, 650);
  };

  //=== Function =====//
  // Adding translate values to move container-image to the left every 3 seconds
  const runningCarousel = () => {
    slideTransitionDuration = setInterval(() => {
      // 1. Starting the transition
      carousel_featured_properties.style.transform = `translateX(-${gettingContainerImgWidth()}px)`;
      //2. Adding transitionend and removing transitionend
      addingTransitionEndAndRemovingTransitionEnd();
    }, 3000);
  };

  //==== Function ====//
  // Adding translate value to move container-image to the left manually with the lef arrow
  const movingToLeft = () => {
    leftArrow.addEventListener('click', (ev) => {
      // 1. Stopping the setInterval
      clearInterval(slideTransitionDuration);
      // 2. Starting the transition
      carousel_featured_properties.style.transform = `translateX(-${gettingContainerImgWidth()}px)`;
      // 3. Adding transitionend and removing transitionend
      addingTransitionEndAndRemovingTransitionEnd();
    });
  };

  //==== Function ====//
  // Adding translate value to move container-image to the right manually with the right arrow
  const movingToRight = () => {
    rightArrow.addEventListener('click', (ev) => {
      // 1. Stopping the setInterval
      clearInterval(slideTransitionDuration);
      // 2. Starting the transition to the right
      carousel_featured_properties.style.transform = `translateX(${gettingContainerImgWidth()}px)`;
    });
  };

  runningCarousel();
  movingToLeft();
  movingToRight();
};

export default carousel;
