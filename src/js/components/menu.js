const menu = () => {
    let cover = document.querySelector(".cover");
    let menuContainer = document.querySelector(".menu-container");
    let hamburger = document.querySelector(".hamburger");
    let menuOpen = false;
    
    cover.addEventListener("click", () => {
      if (!menuOpen) {
        hamburger.classList.add("open");
        menuContainer.classList.add('open');
        menuOpen = !menuOpen;
      } else {
        hamburger.classList.remove("open");
        menuContainer.classList.remove('open');
        menuOpen = !menuOpen;
      }
    });
};

export default menu;



