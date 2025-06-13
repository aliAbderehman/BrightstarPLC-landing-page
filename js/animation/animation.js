document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Animate cards
  // gsap.utils.toArray(".card").forEach((card) => {
  //   gsap.from(card, {
  //     x: 500,
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: card,
  //       start: "top bottom",
  //       end: "bottom 90%",
  //     },
  //   });
  // });

  // Animate heading with SplitText
  const split = SplitText.create(".heading-primary", {
    type: "lines",
    linesClass: "line",
    aria: true,
  });

  // gsap.from(split.lines, {
  //   y: 100,
  //   autoAlpha: 0,
  //   stagger: 0.05,
  // });

  // Path animation
  const fillPath = document.querySelector(".fill-path");
  if (fillPath) {
    const pathLength = fillPath.getTotalLength();
    fillPath.style.strokeDasharray = pathLength;
    fillPath.style.strokeDashoffset = pathLength;

    gsap.to(fillPath, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".path-container",
        start: "top 90%",
        end: "top 20%",
        scrub: 1,
      },
    });
  }
});
// phath footer///////////////////////////////
// phath footer///////////////////////////////

document.addEventListener("blogsReady", () => {
  gsap.registerPlugin(ScrollTrigger);

  const fillPath = document.querySelector(".fill-path--footer");
  if (!fillPath) return;

  // Calculate path length
  const pathLength = fillPath.getTotalLength();
  fillPath.style.strokeDasharray = pathLength;
  fillPath.style.strokeDashoffset = pathLength;

  // Animation timeline
  gsap.to(fillPath, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: fillPath,
      start: "-20% 100%",
      end: "top 30%",
      scrub: 1,

      // toggleClass: "green-path",
    },
  });
});

/////////////////////////////////
// outro////////////
/////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const outRight = document.querySelectorAll(".out-right");
  const outRightCont = document.querySelectorAll(".out-right-cont");

  const outLeft = document.querySelectorAll(".out-left");
  const outLeftCont = document.querySelectorAll(".out-left-cont");

  const inRight = document.querySelectorAll(".in-right");
  const inRightCont = document.querySelectorAll(".in-right-cont");

  const inLeft = document.querySelectorAll(".in-left");
  const inLeftCont = document.querySelectorAll(".in-left-cont");

  const outFadeUp = document.querySelectorAll(".out-fade-up");
  const inFadeUp = document.querySelectorAll(".in-fade-up");
  // const outFadeUp = document.querySelector(".in-left-cont");

  // //////////////////////////////////////
  // PINNED HORIZONTAL SCROLL CARDS
  ///////////////////////////////////////////
  // const container = document.querySelector(".services__cards");
  // const section = document.querySelector(".section-services");

  // gsap.set(container, {
  //   x: "15%", // Optional starting offset
  // });

  // gsap.to(container, {
  //   x: () => {
  //     const scrollAmount = container.scrollWidth - window.innerWidth + 50;
  //     return -scrollAmount;
  //   },
  //   scrollTrigger: {
  //     trigger: section,
  //     start: "top top",
  //     end: () => {
  //       const scrollAmount = container.scrollWidth - window.innerWidth;
  //       return "+=" + scrollAmount;
  //     },

  //     scrub: 1,
  //     pin: true,
  //     anticipatePin: 1,
  //     // pinSpacing: false,
  //     invalidateOnRefresh: true,
  //   },
  // });

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  // PINNED HORIZONTAL SCROLL CARDS
  // PINNED HORIZONTAL SCROLL CARDS
  // const container = document.querySelector(".services__cards");
  // const section = document.querySelector(".section-services");

  // gsap.set(container, {
  //   x: "15%",
  // });

  // gsap.to(container, {
  //   x: () => {
  //     const scrollAmount = container.scrollWidth - window.innerWidth + 50;
  //     return -scrollAmount;
  //   },
  //   scrollTrigger: {
  //     trigger: section,
  //     start: "top top",
  //     end: () => {
  //       const scrollAmount = container.scrollWidth - window.innerWidth;
  //       return "+=" + scrollAmount;
  //     },
  //     scrub: 1,
  //     pin: true,
  //     anticipatePin: 1,
  //     invalidateOnRefresh: true,
  //   },
  // });
  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////

  /////////////////////////
  // WAVY ANIMATION
  ////////////////////////////

  // First: Set initial states for ALL animations

  const cards = gsap.utils.toArray(" .wavy");

  // Set initial state (hidden below)
  gsap.set(cards, {
    x: 100,
    opacity: 0,
    // rotation: 5,
  });

  // Create the wavy animation
  cards.forEach((card, index) => {
    gsap.to(card, {
      force3D: true,
      x: 0,
      // opacity: 1,
      // rotation: 0,
      duration: 1,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "top 30%",

        toggleActions: "play none none none",
        // Stagger the animation based on index
        onEnter: () => animateCard(card, index),
      },
    });
  });

  // Sequential wavy animation function
  function animateCard(card, index) {
    const delay = index * 0.15; // 0.15s between each card

    gsap.fromTo(
      card,
      {
        x: 100,
        opacity: 0,
        // rotation: 5,
      },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 1,
        delay: delay,
        ease: "elastic.out(1, 0.5)",
        overwrite: "auto",
      }
    );
  }

  ////////////////////////////////////////
  /////// OUT RIGHT | IN RIGHT////////////
  ////////////////////////////////////////

  outRight.forEach((oRight) => {
    gsap.to(oRight, {
      duration: 3,
      x: 700,
      // rotation: 30,
      scrollTrigger: {
        trigger: oRight,
        start: "50% 40%",
        end: () => "+=" + oRight.offsetWidth,
        scrub: 1,
        toggleAction: "play none none none ",
      },
    });
  });

  gsap.to(outRightCont, {
    duration: 2,
    x: 700,
    // rotation: 30,
    scrollTrigger: {
      trigger: outRightCont,
      start: "center 40%",
      end: "bottom 10%",
      scrub: 2,
    },
  });

  inRight.forEach((iRight) => {
    gsap.from(iRight, {
      x: () => "+=" + iRight.offsetWidth,
      // rotation: 30,
      // opacity: 0,

      scrollTrigger: {
        trigger: iRight,
        start: "top bottom",
        end: "center 60%",
        scrub: 1,
        toggleAction: "play none none none ",
        once: true,
        // () => "+=" + iRight.offsetWidth
      },
    });
  });

  ////////////////////////////////////////
  /////// OUT LEFT | IN LEFT////////////
  ////////////////////////////////////////

  outLeft.forEach((oLeft) => {
    gsap.to(oLeft, {
      opacity: 0,

      x: () => "+=" + oLeft.offsetWidth * -1,
      opacity: 0,
      scrollTrigger: {
        trigger: oLeft,
        start: "bottom 20%",
        end: "bottom top",
        // markers: true,
        scrub: true,
      },
    });
  });

  inLeft.forEach((iLeft) => {
    gsap.from(iLeft, {
      x: () => "+=" + iLeft.offsetWidth * -1,
      scrollTrigger: {
        trigger: iLeft,
        start: "top bottom",
        end: "bottom center",
        scrub: 1,
        toggleActions: "play none none none",
        once: true,
      },
    });
  });

  ////////////////////////////////////////////////
  // OUT FADE UP | IN FADE UP ///////////////////
  ////////////////////////////////////////////////

  outFadeUp.forEach((oFadeUp) => {
    gsap.to(oFadeUp, {
      y: -50,
      opacity: 0,
      scrollTrigger: {
        trigger: oFadeUp,
        start: "center top", // try this for more natural timing
        end: "center top", // or "+=100" for fixed length
        scrub: 1,
        // markers: true,
        toggleActions: "none play none none",
      },
    });
  });

  ////////////////////////////////////////////////
  // IN FADE UP
  ////////////////////////////////////////////////

  inFadeUp.forEach((iFadeUp) => {
    gsap.from(iFadeUp, {
      y: 50,
      opacity: 0,
      scrollTrigger: {
        trigger: iFadeUp,
        start: "top bottom",
        end: "top center",
        scrub: 1,
        // markers: true,
        toggleAction: "none play none none ",
        once: true,
      },
    });
  });

  /////////////////////////////////////////
  // outLeft
  ///////////////////////////////////////

  gsap.to(outLeftCont, {
    duration: 2,
    x: -700,
    rotation: -30,
    scrollTrigger: {
      trigger: outLeftCont,
      start: "center 40%",
      end: "bottom 10%",
      scrub: 1,
    },
  });
});

gsap.from(document.querySelector("#tsparticles"), {
  duration: 3,
  opacity: 0,
  scale: 1.3,
});

gsap.from(document.querySelector(".hero__img-1"), {
  duration: 1,
  opacity: 0,
  scale: 1.3,
});

gsap.from(document.querySelector(".hero__decor-2"), {
  duration: 2,
  opacity: 0,
  scale: 1.6,
});

///////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
