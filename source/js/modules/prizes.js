export default () => {
  const primaryPrize = document.querySelector(`.prizes__item--journeys`);
  const primaryPrizeImage = primaryPrize.querySelector(`.prizes__icon img`);

  const secondaryPrize = document.querySelector(`.prizes__item--cases`);
  const secondaryPrizeDesc = document.querySelector(`.prizes__item--cases .prizes__desc`);
  const secondaryPrizeImage = secondaryPrize.querySelector(`.prizes__icon img`);
  const secondaryPrizeCounter = secondaryPrize.querySelector(`.prizes__desc b`);

  const additionalPrize = document.querySelector(`.prizes__item--codes`);
  const additionalPrizeDesc = document.querySelector(`.prizes__item--codes .prizes__desc`);
  const additionalPrizeImage = additionalPrize.querySelector(`.prizes__icon img`);
  const additionalPrizeCounter = additionalPrize.querySelector(`.prizes__desc b`);
  const drawCounter = (numbers, container) => {
    container.innerHTML = numbers.shift();
  };

  const counter = (fps, numbers, container) => {
    const fpsInterval = 1000 / fps;
    let now;
    let then = Date.now();
    let elapsed;
    const numbersToDraw = numbers.slice();

    function tick() {
      requestAnimationFrame(tick);
      now = Date.now();
      elapsed = now - then;

      if (elapsed > fpsInterval && numbersToDraw.length > 0) {
        then = now - (elapsed % fpsInterval);
        drawCounter(numbersToDraw, container);
      }
    }

    requestAnimationFrame(tick);
  };

  primaryPrize.addEventListener(`animationstart`, () => {
    primaryPrizeImage.src = primaryPrizeImage.dataset.src;
    secondaryPrizeImage.src = `img/secondary-award.svg`;
    additionalPrizeImage.src = `img/additional-award.svg`;
  });

  secondaryPrizeDesc.addEventListener(`animationstart`, () => {
    const fps = 12;
    const numbers = [1, 2, 3, 4, 5, 6, 7];
    additionalPrizeCounter.style.opacity = 1;
    secondaryPrizeCounter.style.opacity = 1;
    counter(fps, numbers, secondaryPrizeCounter);
  });

  additionalPrizeDesc.addEventListener(`animationstart`, () => {
    const fps = 12;
    const numbers = [11, 121, 178, 254, 341, 385, 489, 573, 625, 712, 783, 900];
    additionalPrizeCounter.style.opacity = 1;
    counter(fps, numbers, additionalPrizeCounter);
  });
};
