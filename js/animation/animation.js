document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Initialize animations
  initSplitText();
  initPathAnimations();
  initScrollAnimations();
  initElementAnimations();
  initMistScrollAnimations();
});

// Custom event listener
document.addEventListener("blogsReady", initFooterPath);

// Throttle ScrollTrigger.refresh on resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
});

// Animation functions
function initSplitText() {
  SplitText.create(".heading-primary", {
    type: "lines",
    linesClass: "line",
    aria: true,
  });
}

function initPathAnimations() {
  animatePath(".fill-path", ".path-container", "top 90%", "top 20%");
}

function initFooterPath() {
  animatePath(".fill-path--footer", null, "-20% 100%", "top 30%");
}

function animatePath(selector, trigger, start, end) {
  const path = document.querySelector(selector);
  if (!path) return;

  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: trigger || path,
      start,
      end,
      scrub: 1,
      invalidateOnRefresh: true, // refresh on resize to recalc lengths
      anticipatePin: 1, // smoother scrubbing
    },
  });
}

function initScrollAnimations() {
  const animations = [
    {
      selector: ".out-right",
      x: 700,
      start: "50% 40%",
      end: (el) => `+=${el.offsetWidth}`,
      scrub: 1,
    },
    {
      selector: ".out-right-cont",
      x: 700,
      start: "center 40%",
      end: "bottom 10%",
      scrub: 2,
    },
    {
      selector: ".in-right",
      x: (el) => `+=${el.offsetWidth}`,
      from: true,
      start: "top bottom",
      end: "center 60%",
      scrub: 1,
    },
    {
      selector: ".out-left",
      x: (el) => `+=${el.offsetWidth * -1}`,
      opacity: 0,
      start: "bottom 20%",
      end: "bottom top",
      scrub: 1,
    },
    {
      selector: ".in-left",
      x: (el) => `+=${el.offsetWidth * -1}`,
      from: true,
      start: "top bottom",
      end: "bottom center",
      scrub: 1,
    },
    {
      selector: ".out-fade-up",
      y: -50,
      opacity: 0,
      start: "center top",
      end: "center top",
      scrub: 1,
    },
    {
      selector: ".in-fade-up",
      y: 50,
      opacity: 0,
      from: true,
      start: "top bottom",
      end: "top center",
      scrub: 1,
    },
    {
      selector: ".out-left-cont",
      x: -700,
      rotation: -30,
      start: "center 40%",
      end: "bottom 10%",
      scrub: 1,
    },
  ];

  animations.forEach(({ selector, from, start, end, scrub = 1, ...props }) => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    elements.forEach((el) => {
      const endValue = typeof end === "function" ? end(el) : end;

      const config = {
        ...props,
        scrollTrigger: {
          trigger: el,
          start,
          end: endValue,
          scrub,
          toggleActions: "play none none none",
          once: from,
        },
        ease: "power1.out",
        willChange: "transform, opacity",
      };

      if (from) {
        gsap.from(el, config);
      } else {
        gsap.to(el, config);
      }
    });
  });
}

function initElementAnimations() {
  const elements = [
    // { selector: "#tsparticles", opacity: 0, scale: 1.3, duration: 3 },
    { selector: ".hero__img-1", opacity: 0, scale: 1.3, duration: 1 },
    { selector: ".hero__decor-2", opacity: 0, scale: 1.6, duration: 2 },
  ];

  elements.forEach(({ selector, opacity, scale, duration }) => {
    const element = document.querySelector(selector);
    if (element) {
      gsap.from(element, {
        opacity,
        scale,
        duration,
        ease: "power2.out",
        willChange: "transform, opacity",
      });
    }
  });
}

function initMistScrollAnimations() {
  const elements = document.querySelectorAll(".mist-reveal");
  if (!elements.length) return;

  elements.forEach((el) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        filter: "blur(10px)",
        y: 100,
        scale: 0.95,
        willChange: "opacity, filter, transform",
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 100%",
          end: "top 80%",
          scrub: 0.5,
          toggleActions: "play none none none",
        },
      }
    );
  });
}
