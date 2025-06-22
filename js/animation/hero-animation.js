const isMobile = window.innerWidth < 768;

// === Hero Section ===
const heroParticles = {
  fullScreen: { enable: false },
  fpsLimit: isMobile ? 30 : 60,
  retina_detect: !isMobile,
  smooth: true,
  particles: {
    number: {
      value: isMobile ? 35 : 100, // reduce number on mobile
      density: {
        enable: true,
        area: 1000,
      },
    },
    color: { value: "#058FCC" },
    shape: { type: "circle" },
    opacity: {
      value: 0.8,
    },
    size: {
      value: 3,
      random: true,
    },
    move: {
      enable: true,
      speed: isMobile ? 0.3 : 0.8,
      direction: "none",
      outModes: { default: "bounce" },
    },
    links: {
      enable: true, // ✅ keep it on
      distance: isMobile ? 100 : 150,
      color: "#0FA8EC",
      opacity: isMobile ? 0.3 : 0.5,
      width: 0.5,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: false, // 💡 keep this off on mobile
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

// === Trust Section ===
const trustParticles = {
  fullScreen: { enable: false },
  fpsLimit: isMobile ? 30 : 60,
  retina_detect: !isMobile,
  smooth: true,
  particles: {
    number: {
      value: isMobile ? 35 : 100,
      density: {
        enable: true,
        area: 1000,
      },
    },
    color: { value: "#3C8DADFF" },
    shape: { type: "circle" },
    opacity: {
      value: 0.8,
    },
    size: {
      value: 3,
      random: true,
    },
    move: {
      enable: true,
      speed: isMobile ? 0.3 : 0.8,
      direction: "none",
      outModes: { default: "bounce" },
    },
    links: {
      enable: true,
      distance: isMobile ? 100 : 150,
      color: "#86B7C8FF",
      opacity: isMobile ? 0.3 : 0.5,
      width: 0.5,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: false,
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

// === Load Particles ===
tsParticles.load("tsparticles", heroParticles);
tsParticles.load("tsparticles-trust", trustParticles);
