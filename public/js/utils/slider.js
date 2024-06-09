document.addEventListener("DOMContentLoaded", function () {
  const sliderContent = document.querySelector(".testimonial-content");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentIndex = 0;

  function updateSlider() {
    sliderContent.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    updateSlider();
  }

  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = slides.length - 1;
    }
    updateSlider();
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Initial slider setup
  updateSlider();
});
