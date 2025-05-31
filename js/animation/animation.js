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
