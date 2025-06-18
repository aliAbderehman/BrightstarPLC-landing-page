document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const themeToggles = document.querySelectorAll(".theme-toggle-input");
  const visualElement = document.querySelector(".visual-camera");

  // Initialize theme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", currentTheme);
  document.documentElement.setAttribute(
    "data-prefers-theme",
    savedTheme ? "saved" : "system"
  );

  // Set toggle checked state
  themeToggles.forEach((toggle) => {
    toggle.checked = currentTheme === "dark";
  });

  // Set visual background image
  if (visualElement) {
    visualElement.style.backgroundImage =
      currentTheme === "dark"
        ? "url('/assets/images/dark/img-main-01.png')"
        : "url('/assets/images/light/img-main-01.png')";
  }

  // Theme toggle logic
  themeToggles.forEach((toggle) => {
    toggle.addEventListener("change", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const newTheme = current === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Sync all toggles
      themeToggles.forEach((t) => {
        t.checked = newTheme === "dark";
      });

      // Update background image
      if (visualElement) {
        visualElement.style.backgroundImage =
          newTheme === "dark"
            ? "url('/assets/images/dark/img-main-01.png')"
            : "url('/assets/images/light/img-main-01.png')";
      }
    });
  });
});
