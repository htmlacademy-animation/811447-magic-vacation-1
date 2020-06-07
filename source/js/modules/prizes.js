export default () => {
  const primaryPrize = document.querySelector(`.prizes__item--journeys`);
  const primaryPrizeImage = primaryPrize.querySelector(`.prizes__icon img`);

  const secondaryPrize = document.querySelector(`.prizes__item--cases`);
  const secondaryPrizeImage = secondaryPrize.querySelector(`.prizes__icon img`);

  primaryPrize.addEventListener(`animationstart`, () => {
    primaryPrizeImage.src = primaryPrizeImage.dataset.src;
    secondaryPrizeImage.src = `img/secondary-award.svg`;
  });
};
