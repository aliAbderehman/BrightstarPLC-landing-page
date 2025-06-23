const isMobile = window.innerWidth < 768;

function getParticleConfig(color, linkColor) {
  return {
    fullScreen: { enable: false },
    fpsLimit: isMobile ? 45 : 60,
    retina_detect: true,
    smooth: true,
    particles: {
      number: {
        value: isMobile ? 70 : 100,
        density: {
          enable: true,
          area: 1000,
        },
      },
      color: { value: color },
      shape: { type: "circle" },
      opacity: { value: 0.8 },
      size: {
        value: 3,
        random: true,
      },
      move: {
        enable: true,
        speed: isMobile ? 0.5 : 0,
        direction: "none",
        outModes: { default: "bounce" },
      },
      links: {
        enable: !isMobile,
        distance: isMobile ? 100 : 150,
        color: linkColor,
        opacity: isMobile ? 0.4 : 0.5,
        width: 0.5,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: !isMobile,
          mode: "grab",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 150,
          line_linked: {
            opacity: 0.8,
            width: 1,
          },
        },
      },
    },
  };
}

function getCurrentTheme() {
  return document.documentElement.getAttribute("data-theme");
}

function loadParticlesForTheme() {
  const theme = getCurrentTheme();

  // Adjust colors per your theme, can be customized further
  const heroParticleColor = theme === "dark" ? "#0FA8EC" : "#073B94FF";
  const heroLinkColor = theme === "dark" ? "#0FA8EC" : "#073B94FF";

  const trustParticleColor = theme === "dark" ? "#86B7C8FF" : "#307691FF";
  const trustLinkColor = theme === "dark" ? "#86B7C8FF" : "#86B7C8FF";

  // Destroy existing instances if any before reloading
  if (tsParticles.domItem(0)) tsParticles.domItem(0).destroy();
  if (tsParticles.domItem(1)) tsParticles.domItem(1).destroy();

  // Reload with theme colors
  tsParticles.load(
    "tsparticles",
    getParticleConfig(heroParticleColor, heroLinkColor)
  );
  tsParticles.load(
    "tsparticles-trust",
    getParticleConfig(trustParticleColor, trustLinkColor)
  );
}

// On DOMContentLoaded, init particles with correct theme
document.addEventListener("DOMContentLoaded", () => {
  loadParticlesForTheme();

  // Your theme toggle logic should also call loadParticlesForTheme() after toggling theme
  const themeToggles = document.querySelectorAll(".theme-toggle-input");

  themeToggles.forEach((toggle) => {
    toggle.addEventListener("change", () => {
      // Slight delay to ensure data-theme is updated before reloading particles
      setTimeout(() => {
        loadParticlesForTheme();
      }, 100);
    });
  });
});
