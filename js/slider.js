"use strict";

/* Accessible auto-playing slider with arrows, dots, swipe and pause on hover/focus. */
(() => {
  const root = document.querySelector("[data-slider]");
  if (!root) return;

  const track = root.querySelector(".slider-track");
  const slides = [...root.querySelectorAll(".slide")];
  const dotsBox = root.querySelector(".slider-dots");
  let index = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `სლაიდი ${i + 1}`);
    b.addEventListener("click", () => go(i));
    dotsBox.append(b);
    return b;
  });

  function go(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((s, n) => s.setAttribute("aria-hidden", String(n !== index)));
    dots.forEach((d, n) => d.setAttribute("aria-current", String(n === index)));
  }

  const start = () => {
    stop();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = setInterval(() => go(index + 1), 5000);
    }
  };
  const stop = () => clearInterval(timer);

  root.querySelector(".slider-btn--prev").addEventListener("click", () => go(index - 1));
  root.querySelector(".slider-btn--next").addEventListener("click", () => go(index + 1));
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  });

  let startX = 0;
  root.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  root.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  });

  go(0);
  start();
})();
