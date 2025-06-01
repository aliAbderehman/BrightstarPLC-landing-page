document.addEventListener("blogsReady", function () {
  const titleEl = document.querySelectorAll(".blog__card-title");
  const textEl = document.querySelectorAll(".blog__card-text");

  const titleMaxLength = 40;
  const textMaxLength = 160;

  titleEl.forEach((text) => {
    if (text.textContent.length > titleMaxLength) {
      text.textContent = text.textContent.slice(0, titleMaxLength) + "...";
    }
  });

  textEl.forEach((text) => {
    if (text.textContent.length > textMaxLength) {
      text.textContent = text.textContent.slice(0, textMaxLength) + "...";
    }
  });
});
