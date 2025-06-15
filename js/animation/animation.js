document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Initialize animations
  initSplitText();
  initPathAnimations();
  initScrollAnimations();
  initElementAnimations();
});

document.addEventListener("blogsReady", initFooterPath);

window.addEventListener("resize", () => ScrollTrigger.refresh());

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
    },
    {
      selector: ".out-left",
      x: (el) => `+=${el.offsetWidth * -1}`,
      opacity: 0,
      start: "bottom 20%",
      end: "bottom top",
    },
    {
      selector: ".in-left",
      x: (el) => `+=${el.offsetWidth * -1}`,
      from: true,
      start: "top bottom",
      end: "bottom center",
    },
    {
      selector: ".out-fade-up",
      y: -50,
      opacity: 0,
      start: "center top",
      end: "center top",
    },
    {
      selector: ".in-fade-up",
      y: 50,
      opacity: 0,
      from: true,
      start: "top bottom",
      end: "top center",
    },
    {
      selector: ".out-left-cont",
      x: -700,
      rotation: -30,
      start: "center 40%",
      end: "bottom 10%",
    },
  ];

  animations.forEach((anim) => {
    const elements = document.querySelectorAll(anim.selector);
    if (!elements.length) return;

    elements.forEach((el) => {
      const config = {
        ...anim,
        scrollTrigger: {
          trigger: el,
          start: anim.start,
          end: typeof anim.end === "function" ? anim.end(el) : anim.end,
          scrub: anim.scrub || 1,
          toggleActions: "play none none none",
          once: anim.from,
        },
      };

      delete config.selector;
      delete config.start;
      delete config.end;
      delete config.from;
      delete config.scrub;

      if (anim.from) {
        gsap.from(el, config);
      } else {
        gsap.to(el, config);
      }
    });
  });
}

function initElementAnimations() {
  const elements = [
    { selector: "#tsparticles", opacity: 0, scale: 1.3, duration: 3 },
    { selector: ".hero__img-1", opacity: 0, scale: 1.3, duration: 1 },
    { selector: ".hero__decor-2", opacity: 0, scale: 1.6, duration: 2 },
  ];

  elements.forEach((el) => {
    const element = document.querySelector(el.selector);
    if (element) {
      gsap.from(element, {
        opacity: el.opacity,
        scale: el.scale,
        duration: el.duration,
      });
    }
  });
}
