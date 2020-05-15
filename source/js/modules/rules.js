export default () => {
  const rulesItems = document.querySelectorAll(`.rules__item p`);
  const rulesLink = document.querySelector(`.rules__link`);

  rulesItems[0].addEventListener(`animationstart`, () => {
    rulesLink.classList.remove(`rules__link--animated`);
  });

  rulesItems[rulesItems.length - 1].addEventListener(`animationend`, () => {
    rulesLink.classList.add(`rules__link--animated`);
  });
};
