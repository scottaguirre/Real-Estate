const initialOverlayEffect =  () => {
    const effect =  document.querySelector('.initial-overlay-effect');
    const overlayEffectContainer =  document.querySelector('.overlay-effect-container');
    
        window.onload = () =>{
            effect.classList.add('effect-applied')
            overlayEffectContainer.classList.add('effect-applied');
        };
        
};

export default initialOverlayEffect;