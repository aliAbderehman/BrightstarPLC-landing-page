const container = document.getElementById("cardContainer");
const scrollAmount = 300; // Adjust based on your card width

const cardWidth = container.querySelector(".blog__card").offsetWidth + 45; // includes gap

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
