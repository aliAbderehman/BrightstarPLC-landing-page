document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const mobNav = document.querySelector(".mob-navigation");
  const desktopBreakpoint = 768;

  function toggleMobileNav() {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    mobNav.classList.toggle("open");
  }

  function closeMobileNav() {
    navToggle.setAttribute("aria-expanded", "false");
    mobNav.classList.remove("open");
  }

  navToggle.addEventListener("click", toggleMobileNav);

  // Close on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > desktopBreakpoint) {
      closeMobileNav();
    }
  });

  // ✅ Close nav on *any* internal anchor click inside .mob-navigation
  mobNav.addEventListener("click", (e) => {
    const target = e.target.closest("a[href^='#']");
    if (target) {
      // Delay closing to allow anchor scroll behavior
      setTimeout(() => {
        closeMobileNav();
      }, 50);
    }
  });
});
