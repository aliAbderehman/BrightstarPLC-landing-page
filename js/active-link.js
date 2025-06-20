document.addEventListener("DOMContentLoaded", function () {
  // ===== CORE NAVIGATION =====
  const navLinks = document.querySelectorAll(".nav-link");
  const activeIndicator = document.querySelector(".active-indicator");
  let activeLink = document.querySelector('.nav-link[href="index.html"]');
  const breakpointMobile = 700;

  // Update indicator position
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

  // ===== SERVICES SECTION SCROLL =====
  function setupServicesScroll() {
    const servicesSection = document.getElementById("services");
    if (!servicesSection) return;

    const container = servicesSection.querySelector(".services__cards");
    let wasMobile = window.innerWidth <= breakpointMobile;

    function initScroll() {
      const isMobile = window.innerWidth <= breakpointMobile;

      // Clear previous triggers
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === servicesSection) t.kill();
      });

      if (!isMobile) {
        // Desktop horizontal scroll
        gsap.set(container, { x: "15%" });

        gsap.to(container, {
          x: () => -(container.scrollWidth - window.innerWidth + 50),
          ease: "none",
          scrollTrigger: {
            trigger: servicesSection,
            start: "-20% top",
            end: () => "+=" + (container.scrollWidth - window.innerWidth),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => highlightLink("#services"),
            onUpdate: (self) => {
              if (self.progress > 0 && self.progress < 1) {
                highlightLink("#services");
              }
            },
            onLeave: () => highlightLink("index.html"),
            onEnterBack: () => highlightLink("#services"),
            onLeaveBack: () => highlightLink("index.html"),
          },
        });
      } else {
        // gsap.registerPlugin(ScrollTrigger);

        const container = document.querySelector(".services__cards");
        const section = document.querySelector(".section-services");

        section.offsetHeight;

        gsap.to(container, {
          y: () => -(container.scrollHeight - window.innerHeight),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + (container.scrollHeight - window.innerHeight),
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: true,
          },
        });

        // 5. Ensure proper stacking context
        // servicesSection.style.zIndex = "10";
        // servicesSection.style.position = "relative";
      }
    }

    initScroll();

    // Handle responsive changes
    window.addEventListener("resize", function () {
      const isNowMobile = window.innerWidth <= breakpointMobile;
      if (isNowMobile !== wasMobile) {
        wasMobile = isNowMobile;
        initScroll();
      }
      ScrollTrigger.refresh();
    });
  }

  // ===== CROSS-PAGE HIGHLIGHTING =====
  function highlightLink(target) {
    const link = document.querySelector(`.nav-link[href="${target}"], 
                                       .nav-link[href*="${
                                         target.split("#")[0]
                                       }"]`);
    if (link) {
      activeLink = link;
      updateActiveIndicator(link, true);
    }
  }

  // ===== CLICK HANDLERS =====
  function setupClickHandlers() {
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const targetUrl = this.getAttribute("href");
        const isHomepageLink =
          targetUrl.includes("index.html") || targetUrl === "/";
        const isSamePage =
          window.location.pathname.split("/").pop() === targetUrl.split("#")[0];

        if (!isSamePage && targetUrl.includes("#") && isHomepageLink) {
          e.preventDefault();
          updateActiveIndicator(this, true);
          sessionStorage.setItem("pendingScroll", targetUrl.split("#")[1]);
          window.location.href = targetUrl.split("#")[0];
          return;
        }

        if (!isSamePage) {
          e.preventDefault();
          updateActiveIndicator(this, true);
          setTimeout(() => (window.location.href = targetUrl), 300);
          return;
        }

        if (this.hash) {
          e.preventDefault();
          updateActiveIndicator(this, true);
          smoothScrollTo(this.hash);
        }
      });
    });
  }

  function smoothScrollTo(hash) {
    const target = document.querySelector(hash);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 20,
        behavior: "smooth",
      });
      setTimeout(() => highlightLink(hash), 500);
    }
  }

  // ===== INITIALIZATION =====
  function initNavigation() {
    setupClickHandlers();

    // Handle pending scroll from other pages
    const pendingScroll = sessionStorage.getItem("pendingScroll");
    if (pendingScroll) {
      smoothScrollTo(`#${pendingScroll}`);
      sessionStorage.removeItem("pendingScroll");
    }

    // Homepage setup
    if (window.location.pathname.match(/(\/|index\.html)$/)) {
      setupServicesScroll();

      // Other sections
      document.querySelectorAll("section[id]").forEach((section) => {
        if (section.id === "services") return;

        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => highlightLink(`#${section.id}`),
          onEnterBack: () => highlightLink(`#${section.id}`),
        });
      });

      // Home link at top
      ScrollTrigger.create({
        start: "top top",
        end: "top+=100 top",
        onEnter: () => highlightLink("index.html"),
        onLeaveBack: () => highlightLink("index.html"),
      });
    } else {
      // Highlight current page for non-homepage
      const currentPage = window.location.pathname.split("/").pop();
      highlightLink(currentPage);
    }
  }

  // Start everything
  initNavigation();
  new ResizeObserver(() => updateActiveIndicator(activeLink, false)).observe(
    document.body
  );
});
