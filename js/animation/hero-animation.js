tsParticles.load("tsparticles", {
  fullScreen: { enable: false },
  // background: { color: "#09101e" },
  particles: {
    fps_limit: 60,

    number: {
      value: 100,
      density: {
        enable: true,
        area: 1000, // tweak this value for balance
      },
    },
    color: { value: "#058FCC" },
    shape: { type: "circle" },
    opacity: {
      value: 0.8,
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
      color: "#0FA8EC",
      opacity: 0.5,
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

tsParticles.load("tsparticles-trust", {
  fullScreen: { enable: false },
  // background: { color: "#09101e" },
  particles: {
    fps_limit: 60,
    number: {
      value: 100,
      density: {
        enable: true,
        area: 1000, // tweak this value for balance
      },
    },
    color: { value: "#3C8DADFF" },
    shape: { type: "circle" },
    opacity: {
      value: 0.8,
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
      color: "#86B7C8FF",
      opacity: 0.5,
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
