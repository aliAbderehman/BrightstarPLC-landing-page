const container = document.getElementById("cardContainer");
const scrollAmount = 300; // Adjust based on your card width

const cardWidth = container.querySelector(".blog__card").offsetWidth + 16; // includes gap

function scrollNext() {
  // container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  container.scrollBy({ left: cardWidth, behavior: "smooth" });
}

function scrollPrev() {
  // container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  container.scrollBy({ left: -cardWidth, behavior: "smooth" });
}
