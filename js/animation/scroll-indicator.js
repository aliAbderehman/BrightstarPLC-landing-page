const arrowGroup = document.getElementById("arrowGroup");
const percentageDisplay = document.getElementById("percentage");
const arrowContainer = document.getElementById("arrowContainer");

// Function to generate a random color
// function getRandomColor() {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

// Scroll event to rotate the arrow and update percentage
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / docHeight) * 100;

  // Calculate the rotation degree based on scroll percentage
  const degrees = scrollPercentage * 10.2; // Increased from 3.6 to 7.2 for faster rotation

  // Rotate the entire group (arrow head)
  arrowGroup.setAttribute("transform", `rotate(${degrees} 44.54 44.54)`);

  // Update percentage in the center
  percentageDisplay.innerText = `${Math.round(scrollPercentage)}%`;

  // Change the percentage color smoothly
  //   percentageDisplay.style.color = getRandomColor();
});

// Click event to scroll back to the top smoothly
arrowContainer.addEventListener("click", () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth", // Smooth scrolling
  //   });

  window.lenis.scrollTo(0, {
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
});

// const scrollTopBtn = document.getElementById("scrollTopBtn");
// scrollTopBtn.addEventListener("click", () => {
//   window.lenis.scrollTo(0, {
//     duration: 1.5,
//     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//   });
// });
