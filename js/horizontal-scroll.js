// const scrollers = document.querySelectorAll(".scroller");

// if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
//   addAnimation();
// }

// function addAnimation() {
//   scrollers.forEach((scroller) => {
//     scroller.setAttribute("data-animated", true);

//     const scrollerInner = scroller.querySelector(".scroller__inner");
//     const scrollerContent = Array.from(scrollerInner.children);

//     scrollerContent.forEach((item) => {
//       const duplicatedItem = item.cloneNode(true);
//       duplicatedItem.setAttribute("area-hidden", true);
//       scrollerInner.appendChild(duplicatedItem);
//     });
//   });
// }

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

// gsap.registerPlugin(ScrollTrigger);

// const scroller = document.querySelector(".scroller");
// const inner = document.querySelector(".scroller__inner");

// // Clone until we cover at least 2x viewport width
// let totalContentWidth = inner.offsetWidth;
// while (totalContentWidth < window.innerWidth * 2) {
//   const clone = inner.cloneNode(true);
//   scroller.appendChild(clone);
//   totalContentWidth += inner.offsetWidth;
// }

// let currentX = 0;
// let velocity = 0;
// let direction = -1;
// const speed = 1;

// ScrollTrigger.create({
//   start: 0,
//   end: "max",
//   onUpdate: (self) => {
//     velocity = self.getVelocity();
//     direction = velocity > 0 ? -1 : velocity < 0 ? 1 : direction;
//   },
// });

// gsap.ticker.add(() => {
//   currentX += velocity * -0.02;
//   velocity *= 0.9;
//   currentX += speed * direction;

//   scroller.style.transform = `translateX(${currentX}px)`;

//   // When we've shifted past one innerWidth, reset position
//   if (currentX <= -inner.offsetWidth) {
//     currentX += inner.offsetWidth;
//   } else if (currentX >= 0) {
//     currentX -= inner.offsetWidth;
//   }
// });

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const scroller = document.querySelector(".scroller");
  const inner = scroller.querySelector(".scroller__inner");

  // Clone content for seamless loop
  const clone = inner.cloneNode(true);
  scroller.appendChild(clone);

  let currentX = 0;
  let velocity = 0;
  let direction = -1; // -1 = left, 1 = right
  const baseSpeed = 1; // adjust base speed if needed
  const decay = 0.92;

  const totalWidth = inner.offsetWidth;

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const scrollVel = self.getVelocity();
      velocity = scrollVel * 0.005;

      if (velocity > 0.5) direction = 1; // scroll down = right
      else if (velocity < -0.5) direction = -1; // scroll up = left
    },
  });

  let isHovered = false;
  scroller.addEventListener("mouseenter", () => {
    isHovered = true;
  });
  scroller.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  gsap.ticker.add(() => {
    currentX += velocity;
    velocity *= decay;
    currentX += baseSpeed * direction;

    if (currentX <= -totalWidth) currentX += totalWidth;
    else if (currentX >= 0) currentX -= totalWidth;

    scroller.style.transform = `translateX(${currentX}px)`;
  });
});
