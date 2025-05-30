function animateCountUp(element, duration = 2000) {
  const target = +element.getAttribute("data-target");
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // limit to 1
    const currentValue = Math.floor(progress * target);

    element.innerText = currentValue.toLocaleString() + "+"; // Adds '+' at the end

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.innerText = target.toLocaleString() + "+";
    }
  }

  requestAnimationFrame(update);
}

function handleScrollAnimations() {
  const counters = document.querySelectorAll(".count-up");
  counters.forEach((counter) => {
    const rect = counter.getBoundingClientRect();
    if (
      rect.top < window.innerHeight &&
      !counter.classList.contains("counted")
    ) {
      counter.classList.add("counted"); // Prevent re-trigger
      animateCountUp(counter);
    }
  });
}

window.addEventListener("scroll", handleScrollAnimations);
window.addEventListener("load", handleScrollAnimations); // in case some are already in view
