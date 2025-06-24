document.addEventListener("DOMContentLoaded", () => {
  const arrowGroup = document.getElementById("arrowGroup");
  const percentageDisplay = document.getElementById("percentage");
  const arrowContainer = document.getElementById("arrowContainer");

  if (arrowGroup && percentageDisplay) {
    window.addEventListener("scroll", () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / docHeight) * 100;
      const degrees = scrollPercentage * 10.2;

      arrowGroup.setAttribute("transform", `rotate(${degrees} 44.54 44.54)`);
      percentageDisplay.innerText = `${Math.round(scrollPercentage)}%`;
    });
  }

  if (arrowContainer) {
    arrowContainer.addEventListener("click", () => {
      if (window.lenis) {
        window.lenis.scrollTo(0, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
});
