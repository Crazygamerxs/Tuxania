'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}



// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}
document.addEventListener("DOMContentLoaded", function() {
  const sliderContainer = document.querySelector(".slider-container");
  const sliderItems = document.querySelectorAll(".slider-item");
  const sliderWidth = sliderContainer.offsetWidth;
  let currentIndex = 0;
  const intervalTime = 5000; // 5 seconds
  let slideInterval;

  function startSlide() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  function nextSlide() {
    // Move to the next slide
    currentIndex = (currentIndex + 1) % sliderItems.length;
    scrollToCurrentSlide();
  }

  function scrollToCurrentSlide() {
    // Calculate the scroll position based on currentIndex
    const scrollPosition = currentIndex * sliderWidth;
    sliderContainer.scrollTo({
      left: scrollPosition,
      behavior: "smooth"
    });

    // If we are at the last slide, reset to the first slide after a delay
    if (currentIndex === sliderItems.length - 1) {
      setTimeout(() => {
        currentIndex = 0;
        sliderContainer.scrollTo({
          left: 0,
          behavior: "auto" // Instant scroll without animation
        });
      }, 5000); // Adjust delay as needed for the transition
    }
  }

  sliderContainer.addEventListener("mouseenter", function() {
    clearInterval(slideInterval);
  });

  sliderContainer.addEventListener("mouseleave", function() {
    startSlide();
  });

  // Initialize the slide interval
  startSlide();
});