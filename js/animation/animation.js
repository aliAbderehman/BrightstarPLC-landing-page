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

document.addEventListener("blogsReady", (e) => {
  const cards = document.querySelectorAll(".blog__card");

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(cards, {
    rotation: 360,
    duration: 8,
    // scale: -0.5,
    scrollTrigger: {
      trigger: cards,
      // markers: true,
      scrub: true,
    },
  });

  console.log("Number of blog cards:");
});
