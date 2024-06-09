document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');
  const offset = 110;

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const top = targetElement.getBoundingClientRect().top;
        window.scrollTo({
          top: top + window.pageYOffset - offset,
          behavior: "smooth",
        });
      }
    });
  });
});
