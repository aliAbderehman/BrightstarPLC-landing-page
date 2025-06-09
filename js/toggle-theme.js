document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(MorphSVGPlugin);

  // DOM elements
  const themeToggle = document.querySelector(".theme-toggle-input");
  const visualElement = document.querySelector(".visual-camera");
  const celestialBody = document.querySelector(".celestial-body");

  // Animation elements
  const sunCore = document.querySelector(".sun-core");
  const moonBody = document.querySelector(".moon-body");
  const sunRays = gsap.utils.toArray(".sun-ray");
  const craters = gsap.utils.toArray("[class^='crater-']");

  // Create master timeline
  const masterTL = gsap.timeline({ paused: true });

  // Sun rays animation
  const raysTL = gsap.timeline();
  raysTL.to(sunRays, {
    rotation: () => gsap.utils.random(90, 270),
    scale: 0,
    opacity: 0,
    duration: 0.6,
    stagger: {
      each: 0.05,
      from: "random",
    },
    ease: "back.in",
  });

  // Core morph animation
  const morphTL = gsap.timeline();

  // Pre-squash effect
  morphTL.to(sunCore, {
    scaleY: 0.85,
    scaleX: 1.1,
    duration: 0.2,
    transformOrigin: "50% 50%",
    ease: "power2.inOut",
  });

  // Morph shape to moon
  morphTL.to(
    sunCore,
    {
      morphSVG: moonBody,
      duration: 0.7,
      ease: "power4.inOut",
    },
    "-=0.1"
  );

  // Unsquash back with bounce
  morphTL.to(
    sunCore,
    {
      scaleY: 1,
      scaleX: 1,
      duration: 0.3,
      ease: "elastic.out(1, 0.4)",
    },
    "-=0.4"
  );

  // Optional subtle rotation for personality
  morphTL.to(
    celestialBody,
    {
      rotation: "+=5",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    },
    "-=0.5"
  );

  // Crater reveal animation
  const cratersTL = gsap.timeline();
  // cratersTL.to(
  //   craters,
  //   {
  //     opacity: 1,
  //     scale: 0,
  //     duration: 0.3,
  //     stagger: 0.1,
  //     ease: "back.out",
  //   },
  //   0.4
  // );

  // Combine animations
  masterTL.add(raysTL).add(morphTL, "-=0.7").add(cratersTL, "-=0.5");

  // Initialize theme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", currentTheme);
  document.documentElement.setAttribute(
    "data-prefers-theme",
    savedTheme ? "saved" : "system"
  );

  // Set initial state
  if (currentTheme === "dark") {
    themeToggle.checked = true;
    masterTL.progress(1);
    // gsap.set(craters, { opacity: 1, scale: 1 });
    gsap.set(sunRays, { opacity: 0, scale: 0 });
    if (visualElement) {
      visualElement.style.backgroundImage =
        "url('/assets/images/dark/img-main-01.png')";
    }
  } else {
    themeToggle.checked = false;
    if (visualElement) {
      visualElement.style.backgroundImage =
        "url('/assets/images/light/img-main-01.png')";
    }
  }

  // Toggle theme
  themeToggle.addEventListener("change", () => {
    const theme = document.documentElement.getAttribute("data-theme");
    let newTheme;

    if (theme === "dark") {
      newTheme = "light";
      masterTL.reverse();
      if (visualElement) {
        visualElement.style.backgroundImage =
          "url('/assets/images/light/img-main-01.png')";
      }
    } else {
      newTheme = "dark";
      masterTL.play();
      if (visualElement) {
        visualElement.style.backgroundImage =
          "url('/assets/images/dark/img-main-01.png')";
      }
    }

    // Add gravity effect
    gsap.to(celestialBody, {
      y: "-=10",
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    // Add sparkle effect
    gsap.to(".cosmic-dust", {
      scale: 1.2,
      opacity: 1,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    });

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
});
