// // Example: After async fetch and DOM update
// function animateBlogCards() {
//   const cards = document.querySelectorAll(".blog__card");
//   if (cards.length === 0) return;

//   gsap.to(cards, {
//     rotation: 360,
//     duration: 8,
//   });
// }

// // Call this after your async content is added
// fetchSomeContent().then(() => {
//   // Content inserted into DOM
//   animateBlogCards();
// });

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const cards = gsap.utils.toArray(".card");

  cards.forEach((card) => {
    // card.style.transition = "none";
    gsap.from(card, {
      // rotation: 360,
      x: 500,
      ease: "none", // prevents easing lag
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom 90%",
        // scrub: true,
        // markers: true,
      },
    });
  });
});

// gsap.registerPlugin(SplitText);

// gsap.set("h1", { opacity: 1 });

// let split = SplitText.create(".heading-primary", { type: "chars" });
// //now animate each character into place from 20px below, fading in:
// gsap.from(split.chars, {
//   y: 20,
//   autoAlpha: 0,
//   stagger: 0.05,
// });

// split elements with the class "split" into words and characters

gsap.registerPlugin(SplitText);

let split = SplitText.create(".heading-primary", {
  type: " lines",
  // wordsClass: "word",
  linesClass: "line",
  aria: true,
});

gsap.from(split.lines, {
  y: 100,
  autoAlpha: 0,
  stagger: 0.05,
});

// now animate the characters in a staggered fashion
// SplitText.create(split, {
//   type: "words, chars",
//   onSplit(self) {
//     gsap.from(self.chars, {
//       duration: 1,
//       y: 100,
//       autoAlpha: 0,
//       stagger: 0.05,
//     });
//   },
// });

// /////////////////////////////////////////
// path animation?
// /////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const fillPath = document.querySelector(".fill-path");
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
      trigger: ".path-container", // Use the container as trigger
      start: "top 90%", // Start when top of container hits 80% viewport
      end: "top 20%", // End when top of container hits 30% viewport
      scrub: 1, // Smooth scrubbing
      // markers: true, // For debugging (remove in production)
      // toggleActions: "play none none none" // Alternative to scrub
    },
  });

  // Optional: Color change during scroll
  gsap.to(fillPath, {
    stroke: "#00B1F7FF",
    scrollTrigger: {
      trigger: ".path-container",
      start: "top 80%",
      end: "top 10%",
      scrub: 1,
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const fillPath = document.querySelector(".fill-path-footer");
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
      trigger: ".path-container-footer", // Use the container as trigger
      start: "top 50%", // Start when top of container hits 80% viewport
      end: "top -30%", // End when top of container hits 30% viewport
      scrub: 1, // Smooth scrubbing
      // markers: true, // For debugging (remove in production)
      // toggleActions: "play none none none" // Alternative to scrub
    },
  });

  // Optional: Color change during scroll
  gsap.to(fillPath, {
    stroke: "#00B1F7FF",
    scrollTrigger: {
      trigger: ".path-container",
      start: "top 80%",
      end: "top 10%",
      scrub: 1,
    },
  });
});
