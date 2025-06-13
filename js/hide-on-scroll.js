let lastScroll = 0;
const navbar = document.getElementById("navbar");
const navbarHeight = navbar.offsetHeight;
const header = document.querySelector(".header");
let isMouseInHeader = false;

// 1. Scroll Behavior (Original Working Version)
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // At top of page - always show
  if (currentScroll <= 10) {
    showNavbar();
    return;
  }

  // Only hide/show if mouse isn't in header area
  if (!isMouseInHeader) {
    // Scrolling DOWN - hide
    if (currentScroll > lastScroll && currentScroll > 100) {
      hideNavbar();
    }
    // Scrolling UP - show
    else if (currentScroll < lastScroll) {
      showNavbar();
    }
  }

  lastScroll = currentScroll;
});

// 2. Mouse Detection (Fixed Version)
function showNavbar() {
  navbar.style.top = "0";
}

function hideNavbar() {
  navbar.style.top = `-${navbarHeight}px`;
}

// Expanded header area detection
header.addEventListener("mouseenter", () => {
  isMouseInHeader = true;
  showNavbar();
});

header.addEventListener("mouseleave", () => {
  isMouseInHeader = false;
  // Only hide if scrolling down
  if (window.pageYOffset > lastScroll && window.pageYOffset > 100) {
    hideNavbar();
  }
});

// 3. Touch Support
header.addEventListener("touchstart", () => {
  isMouseInHeader = true;
  showNavbar();
});

// Hide only after scrolling down on touch devices
window.addEventListener(
  "scroll",
  () => {
    if (
      isMouseInHeader &&
      window.pageYOffset > lastScroll &&
      window.pageYOffset > 100
    ) {
      isMouseInHeader = false;
      hideNavbar();
    }
  },
  { passive: true }
);
