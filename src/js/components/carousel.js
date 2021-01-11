const carousel = () => {

    // get the width of the container
    let carousel_item_img = document.querySelectorAll('.carousel-item-img');
    let num = 0;
    let slideTransitionDuration = null;
   
    const gettingContainerImgtWith = () => {
        let containerImageTotalWith = null;
        // getting the margin of an element
        let style = getComputedStyle(carousel_item_img[0]);
        let marginLeft = parseInt(style.marginLeft);
        let marginRight = parseInt(style.marginRight);

        // getting the offset of an element; including content, border, padding but not margin
        let offsetImage = carousel_item_img[0].offsetWidth;

        // result of adding content + margin
        containerImageTotalWith = offsetImage + marginLeft + marginRight;
        return containerImageTotalWith;
    }

    // adding translate values and class to move container-image to the left every 3 seconds

    const updatinTheValueOfNum = (elem) =>{
        if(elem.textAlign === 'right'){     
            num = carousel_item_img.length - 1;
        }else if(elem.textAlign === 'center'){
            num = carousel_item_img.length - 2;
        }else{
            num = carousel_item_img.length - 3;
        }
    };
  
    const runningCarousel = () => {
        const elem = getComputedStyle(carousel_item_img[0]);
        updatinTheValueOfNum(elem);
            let count = 1;
            slideTransitionDuration = setInterval( () =>{                
                if(count <= num){
                        carousel_item_img.forEach((container_image) => {
                            container_image.style.transition = `all 0.6s ease-in-out`;          
                            container_image.style.transform = `translateX(-${gettingContainerImgtWith() * count }px)`;
                        });
                        count++;
                    }else{
                        carousel_item_img.forEach((container_image) => { 
                            container_image.style.transition = `none`;
                            container_image.style.transform = `translateX(0)`;             
                        });
                        count = 1;
                    }      
            }, 3000);
    };
    const adaptingToWindowSize = () => {
        clearInterval(slideTransitionDuration);
        runningCarousel();
    }

    runningCarousel();
    window.addEventListener('resize', adaptingToWindowSize);
};

export default carousel;
