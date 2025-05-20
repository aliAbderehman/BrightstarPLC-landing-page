let prevScroll = window.pageYOffset;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > prevScroll) {
    // Scrolling down
    navbar.style.top = "-100px"; // hide
  } else {
    // Scrolling up
    navbar.style.top = "0"; // show
  }

  prevScroll = currentScroll;
});
