const animateEasing = (render, duration, easing) => new Promise((resolve) => {
  let start = Date.now();
  (function loop() {
    let p = (Date.now() - start) / duration;
    if (p > 1) {
      // отрисовка анимации
      render(1);
      // передаём в промис информацию о заверешении анимации
      resolve();
    } else {
      requestAnimationFrame(loop);
      // отрисовка анимации
      render(easing(p));
    }
  }());
});

export {animateEasing};
