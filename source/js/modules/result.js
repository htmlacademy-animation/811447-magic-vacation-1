export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);
  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }

  const resultTitles = document.querySelectorAll(`.result__title svg`);

  resultTitles.forEach((title) => {
    title.addEventListener(`animationstart`, () => {

      const paths = title.querySelectorAll(`path`);
      paths.forEach((path) => {
        const animation = path.querySelector(`.dasharray-animation`);

        const pathLength = path.getTotalLength();
        path.setAttribute(`stroke-dasharray`, `0 0`);

        if (animation) {
          animation.setAttribute(`from`, `0 ${pathLength * 0.5}`);
          animation.setAttribute(`to`, `${pathLength * 0.5} 0`);
        }    
      })
    });
  })
  
};
