const isMobile = window.innerWidth < 768;

function getParticleConfig(color, linkColor) {
  return {
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
      color: { value: color },
      shape: { type: "circle" },
      opacity: { value: 0.8 },
      size: {
        value: 3,
        random: true,
      },
      move: {
        enable: true,
        speed: isMobile ? 0.3 : 0.5,
        direction: "none",
        outModes: { default: "bounce" },
      },
      links: {
        enable: true, // ✅ Always enabled
        distance: isMobile ? 100 : 150,
        color: linkColor,
        opacity: isMobile ? 0.3 : 0.5,
        width: 0.5,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: !isMobile, // ✅ Only on desktop
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

// === Load Hero Section ===
tsParticles.load("tsparticles", getParticleConfig("#058FCC", "#0FA8EC"));

// === Load Trust Section ===
tsParticles.load(
  "tsparticles-trust",
  getParticleConfig("#3C8DADFF", "#86B7C8FF")
);
