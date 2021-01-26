const carouselVariation = () => {
    let carousel_item_img = document.querySelectorAll('.carousel-item-img');
    let carousel_featured_properties = document.querySelector(
      '.carousel-featured-properties'
    );
    let leftArrow = document.querySelector('.left-arrow');
    let rightArrow = document.querySelector('.right-arrow');
    let slideTransitionDuration = null;
    let imageArray = [];
  
    //==== Function 1 ====//
    // 1. This function gets the width of the image container including the margins
    const gettingContainerImgWidth = () => {
      let containerImageTotalWidth = null;

      // 1.1 getting the margin of an element
      let style = getComputedStyle(carousel_item_img[1]);
      let marginLeft = parseFloat(style.marginLeft);
      let marginRight = parseFloat(style.marginRight);
      
      // 1.2 getting the offset of an element; including content, border, padding but not margin
      let offsetImage = parseFloat(carousel_item_img[0].offsetWidth);
     
      // 1.3 The result of adding content + margin
      containerImageTotalWidth = parseFloat(offsetImage + marginLeft + marginRight);
      return containerImageTotalWidth;
    };

    //==== Function 2 ====//
    // 2. It removes the transitionend eventListener when the transition ends (the tansition is the new position).
          // the transition ends (the tansition is the new position).
    const removingTransitionendEventListener = () =>{ 
    
      // 2.1 Remove the transitionend eventListener and the handler
      carousel_item_img[1].removeEventListener(
        'transitionend',
        settingNewPosition
      );
      //console.log('4. event removed***');

      // 2.2 Set transition on carousel_item_img[] again
      carousel_item_img.forEach((ele)=> {
        ele.style.transition = `all 0.6s linear`;
      });

    };


    //==== Function 3 ====//
    // 3. Declaring a function that will be triggered when the translateX-transition
          // of carousel_item_img[1] ends. It'll set the new position of carousel_item_img.   
     let settingNewPosition = (ev) => {

      carousel_item_img.forEach( (ele, ind) => {
        ele.style.transition = `none`;
        ele.style.transform = `translateX(0)`;

        // 3.1 The first element carousel_item_img[0] will become the last-one.
          ele.style.left = `${imageArray[ind][1] * gettingContainerImgWidth()}px`; 
      });
      //console.log(`3. New position set - `);
    };

    // Create an array of indexes from the position of container-images
    carousel_item_img.forEach((ele, ind)=> {
      imageArray.push([ind, ind - 1]);  
    });

    //=== Function 4 =====//
    // 4. This function is the core code that slides everything to the left
    const coreMovingToLeft = () => {

      // 4.1 Adding eventListener to second carousel_item_img container
        // This is the first container seen on the screen but second in html markup
      carousel_item_img[1].addEventListener('transitionend', settingNewPosition);
      //console.log(`1. event transitionend added`);
      carousel_item_img.forEach((ele, ind)=> {
              
        // 4.1.1 Starting transitioning the carousel_item_img containers and re-position them 
        ele.style.transform = `translateX(-${gettingContainerImgWidth()}px)`; 
            
        // 4.1.2 This changes the position of every carousel_item_img in the array imageArray 
        if(imageArray[ind][1] === -1){ // if its index is the first element now will the last one.
          imageArray[ind][1] = imageArray.length - 2;
        }else{
          imageArray[ind][1] = imageArray[ind][1] - 1;
        }      
      });

      setTimeout(removingTransitionendEventListener, 640);
    };

    //=== Function 5 =====//
    // 5. Adding translate values to move container-image to the left every 3 seconds
    const runningCarousel = () => {

      // Starting the loop every 3 seconds with setInterval
      slideTransitionDuration = setInterval(() => {
        
        coreMovingToLeft();

      }, 3000);
    };

  
    //==== Function 6 ====//
    // 6. Adding translate value to move container-image to the left manually with the lef arrow.
    const movingToLeft = () => {

      leftArrow.addEventListener('click', (ev) => {

        // 6.1. Stopping the setInterval
        if(slideTransitionDuration){
          clearInterval(slideTransitionDuration);
          slideTransitionDuration = null;
        }
          
        coreMovingToLeft();

    });
  };
  
    //==== Function 7 ====//
    // 7. Adding translate value to move container-image to the right manually with the right arrow
    const movingToRight = () => {

      rightArrow.addEventListener('click', (ev) => {

        // 7.1. Stopping the setInterval
        if(slideTransitionDuration){
          clearInterval(slideTransitionDuration);
          slideTransitionDuration = null;
        }  

        // 7.2 Adding eventListener to second carousel_item_img container
        // This is the first container seen on the screen but second in html markup
        carousel_item_img[1].addEventListener('transitionend', settingNewPosition);
        //console.log(`1. event transitionend added`);
        carousel_item_img.forEach((ele, ind)=> {
                
          // 7.2.1 Starting transitioning the carousel_item_img containers to the right
          ele.style.transform = `translateX(${gettingContainerImgWidth()}px)`; 
              
          // 7.2.2 This changes the position of every carousel_item_img in the array imageArray 
          if(imageArray[ind][1] === imageArray.length - 2){ // if its index is the last element now will the first one.
            imageArray[ind][1] = -1;
          }else{
            imageArray[ind][1] = imageArray[ind][1] + 1;
          }      
        });

        setTimeout(removingTransitionendEventListener, 640);

      });
    };

    //==== Function 8 ====//
    // 8. This function gets the Height of the image container including the margins.
    const gettingContainerImgHeight = () => {
      let containerImageTotalHeight = null;

      // 8.1 getting the margin of an element
      let style = getComputedStyle(carousel_item_img[0]);
      let marginTop = parseFloat(style.marginTop);
      let marginBottom = parseFloat(style.marginBottom);

      // 8.2 getting the offset of an element; including content, border, padding but not margin
      let offsetImage = carousel_item_img[0].offsetHeight;

      // 8.3 The result of adding content + margin
      containerImageTotalHeight = offsetImage + marginTop + marginBottom;
      return containerImageTotalHeight;
    };


    //=== Function 9 =====//
    // 9. This function adjusts the height of the carousel_feature_properties when the window is resized.
      const adjustingHeightOfCarouselFeaturedProperties = () =>{
      console.log(`${gettingContainerImgHeight()}px`);
      carousel_featured_properties.style.height = `${gettingContainerImgHeight()}px`;    
    };


    //=== Function 10 =====//
    // 10. This function positions the absolute carousel-item-img[] containers next to each other in a row.
    const LayoutOfAbsoluteCarouselItemImg = () => {
      carousel_item_img.forEach( (imageContainer, ind) => {
        imageContainer.style.left = `${gettingContainerImgWidth() * (ind - 1)}px`;
      });
    };
  
  

    window.onresize = adjustingHeightOfCarouselFeaturedProperties;
    LayoutOfAbsoluteCarouselItemImg();
    runningCarousel();
    movingToLeft();
    movingToRight();
  };


  
  export default carouselVariation;
  