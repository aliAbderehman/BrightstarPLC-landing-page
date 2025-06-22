// document.addEventListener("DOMContentLoaded", () => {
//   gsap.registerPlugin(ScrollTrigger, SplitText);

//   // initSplitText();
//   initPathAnimations();
//   initScrollAnimations();
//   initElementAnimations();
//   initMistScrollAnimations();
// });

// document.addEventListener("blogsReady", initFooterPath);

// // Debounced refresh on resize
// let resizeTimeout;
// window.addEventListener("resize", () => {
//   clearTimeout(resizeTimeout);
//   resizeTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
// });

// // -------------------------
// // SplitText
// function initSplitText() {
//   SplitText.create(".heading-primary", {
//     type: "lines",
//     linesClass: "line",
//     aria: true,
//   });
// }

// // -------------------------
// // Path Animations
// function animatePath(selector, trigger, start, end) {
//   const path = document.querySelector(selector);
//   if (!path) return;

//   const length = path.getTotalLength();
//   path.style.strokeDasharray = length;
//   path.style.strokeDashoffset = length;

//   gsap.to(path, {
//     strokeDashoffset: 0,
//     ease: "none",
//     scrollTrigger: {
//       trigger: trigger || path,
//       start,
//       end,
//       scrub: 1,
//       invalidateOnRefresh: true,
//       anticipatePin: 1,
//     },
//   });
// }

// function initPathAnimations() {
//   animatePath(".fill-path", ".path-container", "top 90%", "top 20%");
// }

// function initFooterPath() {
//   animatePath(".fill-path--footer", null, "-20% 100%", "top 30%");
// }

// // -------------------------
// // Scroll-triggered movements
// function initScrollAnimations() {
//   const animations = [
//     {
//       selector: ".out-right",
//       x: 700,
//       start: "50% 40%",
//       end: (el) => `+=${el.offsetWidth}`,
//       scrub: 1,
//     },
//     {
//       selector: ".out-right-cont",
//       x: 700,
//       start: "center 40%",
//       end: "bottom 10%",
//       scrub: 1,
//     },
//     {
//       selector: ".in-right",
//       x: (el) => `+=${el.offsetWidth}`,
//       from: true,
//       start: "top bottom",
//       end: "center 60%",
//     },
//     {
//       selector: ".out-left",
//       x: (el) => `+=${el.offsetWidth * -1}`,
//       opacity: 0,
//       start: "bottom 20%",
//       end: "bottom top",
//       scrub: 1,
//     },
//     {
//       selector: ".in-left",
//       x: (el) => `+=${el.offsetWidth * -1}`,
//       from: true,
//       start: "top bottom",
//       end: "bottom center",
//     },
//     {
//       selector: ".out-fade-up",
//       y: -50,
//       opacity: 0,
//       start: "center top",
//       end: "center top",
//     },
//     {
//       selector: ".in-fade-up",
//       y: 50,
//       opacity: 0,
//       from: true,
//       start: "top bottom",
//       end: "top center",
//     },
//     {
//       selector: ".out-left-cont",
//       x: -700,
//       rotation: -30,
//       start: "center 40%",
//       end: "bottom 10%",
//       scrub: 1,
//     },
//   ];

//   animations.forEach(
//     ({ selector, from, start, end, scrub = false, ...props }) => {
//       const elements = document.querySelectorAll(selector);
//       if (!elements.length) return;

//       elements.forEach((el) => {
//         const config = {
//           ...props,
//           scrollTrigger: {
//             trigger: el,
//             start,
//             end: typeof end === "function" ? end(el) : end,
//             scrub,
//             toggleActions: "play none none none",
//             once: from,
//           },
//           ease: "power1.out",
//           willChange: "transform, opacity",
//         };

//         from ? gsap.from(el, config) : gsap.to(el, config);
//       });
//     }
//   );
// }

// // -------------------------
// // Static entrance elements
// function initElementAnimations() {
//   const elements = [
//     { selector: ".hero__img-1", opacity: 0, scale: 1.3, duration: 1 },
//     { selector: ".hero__decor-2", opacity: 0, scale: 1.6, duration: 2 },
//   ];

//   elements.forEach(({ selector, opacity, scale, duration }) => {
//     const el = document.querySelector(selector);
//     if (el) {
//       gsap.from(el, {
//         opacity,
//         scale,
//         duration,
//         ease: "power2.out",
//         willChange: "transform, opacity",
//       });
//     }
//   });
// }

// // -------------------------
// // Mist reveal (optimized)
// function initMistScrollAnimations() {
//   ScrollTrigger.batch(".mist-reveal", {
//     onEnter: (batch) => {
//       gsap.to(batch, {
//         opacity: 1,
//         y: 0,
//         stagger: 0.1,
//         duration: 0.6,
//         ease: "power2.out",
//         overwrite: "auto",
//       });
//     },
//     start: "top 90%",
//     once: true,
//   });

//   // Initial styles (CSS fallback also recommended)
//   document.querySelectorAll(".mist-reveal").forEach((el) => {
//     gsap.set(el, {
//       opacity: 0,
//       y: 40,
//       willChange: "opacity, transform",
//     });
//   });
// }
