let lastScroll = 0;
const navbar = document.getElementById("navbar");
const mobNav = document.querySelector(".mob-navigation");
const navbarHeight = navbar ? navbar.offsetHeight : 0;
const mobNavHeight = mobNav ? mobNav.offsetHeight : 0;
const header = document.querySelector(".header");
let isMouseInHeader = false;

// 1. Scroll Behavior
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // At top of page - always show
  if (currentScroll <= 10) {
    showAllNavs();
    return;
  }

  // Only hide/show if mouse isn't in header area
  if (!isMouseInHeader) {
    // Scrolling DOWN - hide
    if (currentScroll > lastScroll && currentScroll > 100) {
      hideAllNavs();
    }
    // Scrolling UP - show
    else if (currentScroll < lastScroll) {
      showAllNavs();
    }
  }

  lastScroll = currentScroll;
});

// 2. Navigation Control Functions
function showAllNavs() {
  if (navbar) navbar.style.top = "0";
  if (mobNav) mobNav.style.bottom = "0";
}

function hideAllNavs() {
  if (navbar) navbar.style.top = `-${navbarHeight}px`;
  if (mobNav) mobNav.style.bottom = `-${mobNavHeight}px`;
}

// 3. Mouse/Touch Detection
function setupHeaderHover() {
  if (!header) return;

  header.addEventListener("mouseenter", () => {
    isMouseInHeader = true;
    showAllNavs();
  });

  header.addEventListener("mouseleave", () => {
    isMouseInHeader = false;
    if (window.pageYOffset > lastScroll && window.pageYOffset > 100) {
      hideAllNavs();
    }
  });

  // Touch support
  header.addEventListener(
    "touchstart",
    () => {
      isMouseInHeader = true;
      showAllNavs();
    },
    { passive: true }
  );
}

// 4. Mobile Menu Toggle Handling
function handleMobileMenu() {
  const mobileToggles = document.querySelectorAll("[data-mobile-toggle]");

  mobileToggles.forEach((toggle) => {
    toggle.addEventListener(
      "click",
      () => {
        // When opening mobile menu, ensure it's visible
        if (mobNav) {
          const isOpen =
            mobNav.style.bottom === "0px" || mobNav.classList.contains("open");
          if (!isOpen) {
            showAllNavs();
          }
        }
      },
      { passive: true }
    );
  });
}

// Initialize everything
setupHeaderHover();
handleMobileMenu();

// 5. Responsive Adjustment
window.addEventListener(
  "resize",
  () => {
    // Show navs when resizing to prevent them being stuck hidden
    showAllNavs();
  },
  { passive: true }
);
