document.addEventListener("DOMContentLoaded", function () {
  // Navigation Highlight Setup
  const navLinks = document.querySelectorAll(".nav-link");
  const activeIndicator = document.querySelector(".active-indicator");
  let activeLink = document.querySelector('.nav-link[href="index.html"]');

  // Update indicator position and size
  function updateActiveIndicator(activeElement, animate = true) {
    if (!activeElement) return;

    navLinks.forEach((link) => link.classList.remove("active"));
    activeElement.classList.add("active");

    const linkRect = activeElement.getBoundingClientRect();
    const navRect = activeElement
      .closest(".nav-container")
      .getBoundingClientRect();

    activeIndicator.style.transition = animate ? "all 0.3s ease" : "none";
    activeIndicator.style.width = `${linkRect.width}px`;
    activeIndicator.style.height = `${linkRect.height}px`;
    activeIndicator.style.left = `${linkRect.left - navRect.left}px`;
    activeIndicator.style.top = `${linkRect.top - navRect.top}px`;
  }

  // Handle window resize
  function handleResize() {
    if (activeLink) {
      updateActiveIndicator(activeLink, false); // No animation during resize
    }
  }

  // Set up resize observer
  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(document.body);

  // Only proceed if on homepage
  if (
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("index.html")
  ) {
    const servicesSection = document.getElementById("services");

    if (servicesSection) {
      const container = servicesSection.querySelector(".services__cards");

      // Horizontal scroll setup
      gsap.set(container, { x: "15%" });

      const scrollTween = gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth + 50),
        ease: "none",
        scrollTrigger: {
          trigger: servicesSection,
          start: "top top",
          end: () => "+=" + (container.scrollWidth - window.innerWidth),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, // This is key for recalculating values on resize

          // Navigation highlighting
          onEnter: () => {
            const link = document.querySelector('.nav-link[href="#services"]');
            if (link) {
              activeLink = link;
              updateActiveIndicator(link, true);
            }
          },
          onUpdate: (self) => {
            if (self.progress > 0 && self.progress < 1) {
              const link = document.querySelector(
                '.nav-link[href="#services"]'
              );
              if (link) {
                activeLink = link;
                updateActiveIndicator(link, true);
              }
            }
          },
          onLeave: () => {
            const homeLink = document.querySelector(
              '.nav-link[href="index.html"]'
            );
            if (homeLink) {
              activeLink = homeLink;
              updateActiveIndicator(homeLink, true);
            }
          },
          onEnterBack: () => {
            const link = document.querySelector('.nav-link[href="#services"]');
            if (link) {
              activeLink = link;
              updateActiveIndicator(link, true);
            }
          },
          onLeaveBack: () => {
            const homeLink = document.querySelector(
              '.nav-link[href="index.html"]'
            );
            if (homeLink) {
              activeLink = homeLink;
              updateActiveIndicator(homeLink, true);
            }
          },
        },
      });

      // Refresh on resize
      window.addEventListener("resize", () => {
        ScrollTrigger.refresh(); // This will re-run the calculations for all ScrollTriggers
        handleResize(); // Also update indicator position
      });
    }

    // Set up basic section highlighting for other sections
    document.querySelectorAll("section[id]").forEach((section) => {
      if (section.id === "services") return;

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          const link = document.querySelector(
            `.nav-link[href="#${section.id}"]`
          );
          if (link) updateActiveIndicator(link, true);
        },
        onEnterBack: () => {
          const link = document.querySelector(
            `.nav-link[href="#${section.id}"]`
          );
          if (link) updateActiveIndicator(link, true);
        },
      });
    });

    // Home link activation when at top of page
    ScrollTrigger.create({
      start: "top top",
      end: "top+=100 top",
      onEnter: () => {
        const homeLink = document.querySelector('.nav-link[href="index.html"]');
        if (homeLink) updateActiveIndicator(homeLink, true);
      },
      onLeaveBack: () => {
        const homeLink = document.querySelector('.nav-link[href="index.html"]');
        if (homeLink) updateActiveIndicator(homeLink, true);
      },
    });
  }

  // Handle link clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetUrl = this.getAttribute("href");
      const targetHash = this.hash;
      const currentPage =
        window.location.pathname.split("/").pop() || "index.html";
      const isSamePage = targetUrl.split("#")[0] === currentPage.split("#")[0];
      const isHomepageLink =
        targetUrl.split("#")[0] === "index.html" ||
        targetUrl.split("#")[0] === "/";

      if (!isSamePage && targetHash && isHomepageLink) {
        e.preventDefault();
        updateActiveIndicator(this, true);
        sessionStorage.setItem("pendingScroll", targetHash);
        window.location.href = targetUrl.split("#")[0];
        return;
      }

      if (!isSamePage) {
        e.preventDefault();
        updateActiveIndicator(this, true);
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 300);
        return;
      }

      if (targetHash) {
        e.preventDefault();
        updateActiveIndicator(this, true);
        smoothScrollTo(targetHash);
      }
    });
  });

  function smoothScrollTo(hash) {
    const target = document.querySelector(hash);
    if (target) {
      const targetPosition = target.offsetTop - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      setTimeout(() => {
        const newActiveLink = document.querySelector(
          `.nav-link[href="${hash}"]`
        );
        if (newActiveLink) {
          activeLink = newActiveLink;
          updateActiveIndicator(activeLink, true);
        }
      }, 500);
    }
  }
});

// /////////////////
// [].forEach.call(document.querySelectorAll("*"), function (el) {
//   if (el.offsetWidth > document.documentElement.clientWidth) {
//     el.style.outline = "2px solid red";
//     console.log("Overflowing element:", el);
//   }
// });
