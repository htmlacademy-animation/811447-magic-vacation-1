const animateDuration = (render, duration) => new Promise((resolve) => {
  let start = Date.now();
  (function loop() {
    let p = Date.now() - start;
    if (p > duration) {
      // отрисовка анимации
      render(duration);
      // передаём в промис информацию о заверешении анимации
      resolve();
    } else {
      requestAnimationFrame(loop);
      // отрисовка анимации
      render(p);
    }
  }());
});

export {animateDuration};
