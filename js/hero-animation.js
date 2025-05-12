tsParticles.load("tsparticles", {
  fullScreen: { enable: false },
  // background: { color: "#09101e" },
  particles: {
    fps_limit: 60,
    number: {
      value: 100,
      density: {
        enable: false,
        // value_area: 800,
      },
    },
    color: { value: "#00ffff" },
    shape: { type: "circle" },
    opacity: {
      value: 0.5,
      anim: { enable: false },
    },
    size: {
      value: 4,
      random: true,
      anim: { enable: false },
    },
    move: {
      enable: true,

      speed: 0.8,
      direction: "none",
      outModes: { default: "bounce" },
    },
    links: {
      enable: true,
      distance: 150,
      color: "#00ffff",
      opacity: 0.2,
      width: 0.5,
    },
  },

  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
        parallax: { enable: false },
        // parallax: { enable: true, force: 60, smooth: 10 },
      },
      resize: true,
    },

    // modes: {
    //   slow: {
    //     factor: 0.1,
    //     radius: 150,
    //   },
    // },

    modes: {
      grab: {
        distance: 150, // You can adjust this for more extended interaction
        line_linked: {
          width: 1,
          opacity: 0.8, // Increase opacity when hovering
        },
      },
    },
  },
  retina_detect: true,
  smooth: true,
});

// let resizeTimeout;
// window.addEventListener("resize", () => {
//   clearTimeout(resizeTimeout);
//   resizeTimeout = setTimeout(() => {
//     tsParticles.domItem(0).refresh();
//   }, 250);
// });

// <!-- background: linear-gradient(to right, #061328, #14282f, #183440); -->
