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
        const resultTitle = targetEl[0].querySelector(`.result__title`);
        const svg = resultTitle.querySelector(`.svg-animation`);
        const svgClone = svg.cloneNode(true);
        svg.remove();
        resultTitle.appendChild(svgClone);
        const paths = svgClone.querySelectorAll(`path`);
        paths.forEach((path) => {
          const animation = path.querySelector(`.dasharray-animation`);

          const pathLength = path.getTotalLength();
          path.setAttribute(`stroke-dasharray`, `0 ${pathLength * 0.5}`);

          if (animation) {
            animation.setAttribute(`from`, `0 ${pathLength * 0.5}`);
            animation.setAttribute(`to`, `${pathLength * 0.5} 0`);
          }
        });
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
};
