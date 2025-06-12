let lenis;

function initLenis() {
  // ✅ Skip Lenis on mobile
  const isMobile = window.innerWidth < 768;
  if (isMobile) return;

  // Destroy existing instance if any
  if (lenis) lenis.destroy();

  // Create new Lenis instance
  lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: true,
    infinite: false, // Important for dynamic content
  });

  // RAF loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Auto-resize handler
  const resizeObserver = new ResizeObserver(() => {
    lenis.resize();
  });

  // Observe both body and main content area
  resizeObserver.observe(document.body);
  const mainContent =
    document.querySelector("main") || document.querySelector(".content");
  if (mainContent) resizeObserver.observe(mainContent);

  // Make available globally
  window.lenis = lenis;
}

// Initialize on load
document.addEventListener("DOMContentLoaded", initLenis);

// Export function to manually trigger refresh
window.refreshLenis = function () {
  if (lenis) {
    lenis.resize();
    // Small timeout to ensure recalculation
    setTimeout(() => lenis.resize(), 100);
  }
};

// SMOOTH SCROLL EFFECT
const allLinks = document.querySelectorAll(".nav-link");

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // Only handle internal links
    if (href && href.startsWith("#")) {
      e.preventDefault();

      const sectionEl = document.querySelector(href);
      if (sectionEl && window.lenis) {
        // Force Lenis to scroll, even if the hash doesn't change
        lenis.scrollTo(sectionEl, {
          offset: 0,
          immediate: false,
        });

        // Replace the current hash
        history.replaceState(null, null, " ");
        history.pushState(null, null, href);
      }
    }

    if (href === "#") {
      e.preventDefault();
      if (window.lenis) lenis.scrollTo(0);
    }

    if (link.classList.contains("nav-link")) {
      navEl.classList.toggle("nav-open");
    }
  });
});
