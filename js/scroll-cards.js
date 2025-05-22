const container = document.getElementById("cardContainer");
const scrollAmount = 300; // Adjust based on your card width

const cardWidth = container.querySelector(".blog__card").offsetWidth + 50; // includes gap

function scrollNext() {
  // container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  container.scrollBy({ left: cardWidth, behavior: "smooth" });
}

function scrollPrev() {
  // container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  container.scrollBy({ left: -cardWidth, behavior: "smooth" });
}

// /////////////////

let isDown = false;
let startX;
let scrollLeft;

container.addEventListener("mousedown", (e) => {
  isDown = true;
  container.classList.add("active");
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener("mouseleave", () => {
  isDown = false;
  container.classList.remove("active");
});

container.addEventListener("mouseup", () => {
  isDown = false;
  container.classList.remove("active");
});

container.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 1.5; // scroll-fast multiplier
  container.scrollLeft = scrollLeft - walk;
});

// const container = document.querySelector('.cards-container');

container.addEventListener(
  "wheel",
  (e) => {
    const isHovering = container.matches(":hover");
    const hasHorizontalScroll = container.scrollWidth > container.clientWidth;
    const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);

    const tolerance = 5;
    const atEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - tolerance;
    const atStart = container.scrollLeft <= tolerance;

    const scrollSpeed = 2.5;

    if (isHovering && hasHorizontalScroll && isVerticalScroll) {
      if (!(atEnd && e.deltaY > 0) && !(atStart && e.deltaY < 0)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * scrollSpeed;
      }
    }
  },
  { passive: false }
);
