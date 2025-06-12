// Store particle instances for easy access
const particleInstances = {};

function initParticles(elementId, options = {}) {
  // First destroy existing instance if any
  if (particleInstances[elementId]) {
    particleInstances[elementId].destroy();
  }

  const isMobile = window.innerWidth < 768;

  const config = {
    fullScreen: { enable: false },
    particles: {
      number: {
        value: isMobile ? 30 : 80,
        density: { enable: false },
      },
      color: { value: options.particleColor || "#058FCC" },
      shape: { type: "circle" },
      opacity: { value: 0.7, random: true },
      size: { value: isMobile ? 2.5 : 4, random: true },
      move: {
        enable: true,
        speed: isMobile ? 0.3 : 0.7,
        outModes: "bounce",
      },
      links: {
        enable: true,
        distance: isMobile ? 80 : 130,
        color: options.linkColor || "#0FA8EC",
        opacity: 0.4,
        width: 0.8,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
          distance: isMobile ? 100 : 150,
        },
      },
      modes: {
        grab: {
          distance: isMobile ? 100 : 150,
          line_linked: { opacity: 0.8 },
        },
      },
    },
    detectRetina: true,
  };

  // Load and store the instance
  tsParticles.load(elementId, config).then((instance) => {
    particleInstances[elementId] = instance;
  });
}

// Initialize both particle systems
initParticles("tsparticles", {
  particleColor: "#058FCC",
  linkColor: "#0FA8EC",
});

initParticles("tsparticles-trust", {
  particleColor: "#3C8DAD",
  linkColor: "#86B7C8",
});

// Smart resize handler with debouncing
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const isNowMobile = window.innerWidth < 768;

    // Only reinitialize if crossing mobile/desktop threshold
    const wasMobile =
      Object.values(particleInstances)[0]?.options?.particles?.number?.value <=
      40;

    if (isNowMobile !== wasMobile) {
      initParticles("tsparticles", {
        particleColor: "#058FCC",
        linkColor: "#0FA8EC",
      });

      initParticles("tsparticles-trust", {
        particleColor: "#3C8DAD",
        linkColor: "#86B7C8",
      });
    } else {
      // Just refresh existing instances
      Object.values(particleInstances).forEach((instance) =>
        instance.refresh()
      );
    }
  }, 300); // 300ms debounce time
});
