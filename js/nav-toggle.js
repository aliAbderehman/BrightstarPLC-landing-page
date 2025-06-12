const navToggle = document.getElementById("nav-toggle");
const mobNav = document.querySelector(".mob-navigation");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", !expanded);
  mobNav.classList.toggle("open");
});
