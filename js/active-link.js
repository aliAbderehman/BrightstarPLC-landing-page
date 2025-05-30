document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const activeIndicator = document.querySelector(".active-indicator");

  // Get current page info
  const currentPageUrl = window.location.pathname;
  const currentPage = currentPageUrl.split("/").pop() || "index.html";
  const isHomepage = currentPage === "index.html" || currentPageUrl === "/";

  // Initialize active link
  let activeLink = null;
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (
      currentPageUrl.endsWith(linkPath) ||
      (isHomepage &&
        window.location.hash &&
        link.getAttribute("href") === window.location.hash)
    ) {
      activeLink = link;
    }
  });

  if (!activeLink) {
    activeLink = document.querySelector('.nav-link[href="index.html"]');
  }

  // Initialize indicator
  updateActiveIndicator(activeLink, false);

  // Enhanced click handler
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetUrl = this.getAttribute("href");
      const targetHash = this.hash;
      const isSamePage = targetUrl.split("#")[0] === currentPage.split("#")[0];
      const isHomepageLink =
        targetUrl.split("#")[0] === "index.html" ||
        targetUrl.split("#")[0] === "/";

      // Case 1: Link to homepage section from another page
      if (!isSamePage && targetHash && isHomepageLink) {
        e.preventDefault();
        updateActiveIndicator(this, true);

        // Store hash for after navigation
        sessionStorage.setItem("pendingScroll", targetHash);

        // Navigate to homepage first
        window.location.href = targetUrl.split("#")[0];
        return;
      }

      // Case 2: Normal page transition
      if (!isSamePage) {
        e.preventDefault();
        updateActiveIndicator(this, true);
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 300);
        return;
      }

      // Case 3: Same-page anchor link
      if (targetHash) {
        e.preventDefault();
        updateActiveIndicator(this, true);
        smoothScrollTo(targetHash);
      }
    });
  });

  // Handle pending scroll on homepage load
  if (isHomepage) {
    // Check for pending scroll from another page
    const pendingScroll = sessionStorage.getItem("pendingScroll");
    if (pendingScroll) {
      setTimeout(() => {
        smoothScrollTo(pendingScroll);
        sessionStorage.removeItem("pendingScroll");
      }, 100);
    }

    // Check for URL hash on direct load
    else if (window.location.hash) {
      setTimeout(() => {
        smoothScrollTo(window.location.hash);
      }, 100);
    }

    // Scroll detection for homepage sections
    const sections = document.querySelectorAll("section[id]");
    let isScrolling = false;

    window.addEventListener("scroll", function () {
      if (isScrolling) return;

      let currentSectionId = "";
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentSectionId = section.id;
        }
      });

      const newActiveLink = currentSectionId
        ? document.querySelector(`.nav-link[href="#${currentSectionId}"]`)
        : document.querySelector('.nav-link[href="index.html"]');

      if (newActiveLink && newActiveLink !== activeLink) {
        activeLink = newActiveLink;
        updateActiveIndicator(activeLink, true);
      }
    });
  }

  function smoothScrollTo(hash) {
    const target = document.querySelector(hash);
    if (target) {
      const targetPosition = target.offsetTop - 20;
      isScrolling = true;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Update active link after scroll completes
      setTimeout(() => {
        const newActiveLink = document.querySelector(
          `.nav-link[href="${hash}"]`
        );
        if (newActiveLink) {
          activeLink = newActiveLink;
          updateActiveIndicator(activeLink, true);
        }
        isScrolling = false;
      }, 500);
    }
  }

  function updateActiveIndicator(activeElement, animate = true) {
    navLinks.forEach((link) => link.classList.remove("active"));
    activeElement.classList.add("active");

    const linkRect = activeElement.getBoundingClientRect();
    const navRect = activeElement
      .closest(".nav-container")
      .getBoundingClientRect();

    activeIndicator.style.transition = animate ? "all 0.3s ease" : "none";
    activeIndicator.style.width = `${linkRect.width}px`;
    activeIndicator.style.left = `${linkRect.left - navRect.left}px`;
  }
});
