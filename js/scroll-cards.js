// horizontalScroll.js
document.addEventListener("DOMContentLoaded", () => {
  // ...the same code as above
});

// const container = document.querySelector(".blog__cards");

// let isAtEnd = false;

// container.addEventListener("mouseenter", () => {
//   window.addEventListener("wheel", handleWheel, { passive: false });
// });

// container.addEventListener("mouseleave", () => {
//   window.removeEventListener("wheel", handleWheel);
// });

// function handleWheel(e) {
//   // Only handle vertical scrolling converted to horizontal
//   if (e.deltaY === 0) return;

//   const maxScrollLeft = container.scrollWidth - container.clientWidth;

//   if (
//     (container.scrollLeft === 0 && e.deltaY < 0) || // Already at start
//     (container.scrollLeft >= maxScrollLeft && e.deltaY > 0) // Already at end
//   ) {
//     // Let it scroll normally outside
//     return;
//   }

//   // Prevent default vertical scroll
//   e.preventDefault();
//   container.scrollLeft += e.deltaY * 3; // 2x faster
// }

function setupScroll() {
  const container = document.getElementById("cardContainer");

  // Wait until at least one card is available
  const sampleCard = container.querySelector(".blog__card");

  if (!sampleCard) {
    console.warn("No cards found to calculate scroll width.");
    return;
  }

  const gap = 32; // same as gap in CSS
  const cardWidth = sampleCard.offsetWidth + gap; // Adjust spacing if needed

  // Optional: Expose for external buttons (good for external use)
  window.scrollNext = function () {
    container.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  window.scrollPrev = function () {
    container.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };
}

document.getElementById("scrollLeftBtn").addEventListener("click", () => {
  if (window.scrollPrev) scrollPrev();
});

document.getElementById("scrollRightBtn").addEventListener("click", () => {
  if (window.scrollNext) scrollNext();
});
