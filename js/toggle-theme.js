document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".toggle-input");
  const visualElement = document.querySelector(".visual-camera");

  // Initialize theme
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Set initial toggle state and icon
  if (currentTheme === "dark") {
    themeToggle.checked = true; // Toggle to dark position
    themeToggle.textContent = "light_mode"; // Shows sun (next state)
    visualElement.style.backgroundImage =
      "url('/assets/images/dark/img-main-01.png')";
  } else {
    themeToggle.checked = false; // Toggle to light position
    themeToggle.textContent = "dark_mode"; // Shows moon (next state)
    visualElement.style.backgroundImage =
      "url('/assets/images/light/img-main-01.png')";
  }

  // Toggle theme
  themeToggle.addEventListener("change", () => {
    const theme = document.documentElement.getAttribute("data-theme");
    let newTheme;

    if (theme === "dark") {
      newTheme = "light";
      themeToggle.textContent = "dark_mode";
      visualElement.style.backgroundImage =
        "url('/assets/images/light/img-main-01.png')";
    } else {
      newTheme = "dark";
      themeToggle.textContent = "light_mode";
      visualElement.style.backgroundImage =
        "url('/assets/images/dark/img-main-01.png')";
    }

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
});
