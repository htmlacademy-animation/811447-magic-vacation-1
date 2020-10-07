import {animateDuration} from "../helpers/animate-duration.js";
import {animateEasing} from "../helpers/animate-easing.js";
import {bezierEasing} from "../helpers/cubic-bezier.js";
// import {runSerial} from "../helpers/run-serial.js";

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

  const sizesCanvas = {
    back: {
      width: 586,
      height: 324
    },
    airplane: {
      width: 120,
      height: 120
    },
  };


  const backCanvas = document.querySelector(`canvas#back`);
  if (backCanvas.getContext) {
    const backContext = backCanvas.getContext(`2d`);

    let backOpacity = 0;
    let backScale = 0;
    let backAnimations = [];

    const drawBackCanvas = () => {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      backCanvas.width = windowWidth;
      backCanvas.height = windowHeight;
      backContext.globalAlpha = backOpacity;
      backContext.clearRect(0, 0, windowWidth, windowHeight);
      backContext.save();
      backContext.drawImage(backImg, Math.round((windowWidth - sizesCanvas.back.width * backScale) / 2), Math.round((windowHeight - sizesCanvas.back.height * backScale) / 2), sizesCanvas.back.width * backScale, sizesCanvas.back.height * backScale);
      backContext.restore();
    };

    const backOpacityAnimationTick = (from, to) => (progress) => {
      backOpacity = from + progress * (to - from);
    };

    const backScaleAnimationTick = (from, to) => (progress) => {
      backScale = from + progress * (to - from);
    };

    const globalBackAnimationTick = (globalProgress) => {
      if (globalProgress >= 0 && backAnimations.indexOf(`backAnimation`) === -1) {
        backAnimations.push(`backAnimation`);

        animateEasing(backOpacityAnimationTick(0, 1), 1000, bezierEasing(0, 0, 0.58, 1));
        animateEasing(backScaleAnimationTick(0, 1.1), 1000, bezierEasing(0, 0, 0.58, 1));
      }
      drawBackCanvas();
    };

    const backImg = new Image();
    backImg.onload = () => {
      drawBackCanvas();

      animateDuration(globalBackAnimationTick, 1000);
    };

    backImg.src = `/img/back.png`;
    window.addEventListener(`resize`, drawBackCanvas);
  }

  const airplaneCanvas = document.querySelector(`canvas#airplane`);
  if (airplaneCanvas.getContext) {
    const airplaneContext = airplaneCanvas.getContext(`2d`);

    let airplaneOpacity = 0;
    let airplaneScale = 1;
    let airplaneRotate = 70;
    let airplaneTranslateX = -80;
    let airplaneTranslateY = -80;
    let airplaneAnimations = [];

    const drawAirplaneCanvas = () => {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      airplaneCanvas.width = windowWidth;
      airplaneCanvas.height = windowHeight;
      airplaneContext.globalAlpha = airplaneOpacity;

      airplaneContext.clearRect(0, 0, windowWidth, windowHeight);
      airplaneContext.save();
      rotateAirplane(airplaneRotate, windowWidth / 2, windowHeight / 2);
      airplaneContext.drawImage(airplaneImg, Math.round((windowWidth - sizesCanvas.airplane.width) / 2 + airplaneTranslateX), Math.round((windowHeight - sizesCanvas.airplane.height) / 2 + airplaneTranslateY), sizesCanvas.airplane.width * airplaneScale, sizesCanvas.airplane.height * airplaneScale);
      airplaneContext.restore();
    };

    const rotateAirplane = (angle, cx, cy) => {
      airplaneContext.translate(cx, cy);
      airplaneContext.rotate(angle * Math.PI / 180);
      airplaneContext.translate(-cx, -cy);
    };

    const airplaneTranslateXAnimationTick = (from, to) => (progress) => {
      airplaneTranslateX = from + progress * (to - from);
    };

    const airplaneTranslateYAnimationTick = (from, to) => (progress) => {
      airplaneTranslateY = from + progress * (to - from);
    };

    const airplaneOpacityAnimationTick = (from, to) => (progress) => {
      airplaneOpacity = from + progress * (to - from);
    };

    const airplaneScaleAnimationTick = (from, to) => (progress) => {
      airplaneScale = from + progress * (to - from);
    };

    const airplaneRotateAnimationTick = (from, to) => (progress) => {
      airplaneRotate = from + progress * (to - from);
    };

    const globalAirplaneAnimationTick = (globalProgress) => {
      if (globalProgress >= 0 && airplaneAnimations.indexOf(`airplaneAnimation`) === -1) {
        airplaneAnimations.push(`airplaneAnimation`);

        animateEasing(airplaneOpacityAnimationTick(0, 1), 1000, bezierEasing(0, 0, 0.58, 1));
        animateEasing(airplaneScaleAnimationTick(0, 1), 1000, bezierEasing(0, 0, 0.58, 1));
        animateEasing(airplaneRotateAnimationTick(70, 0), 1000, bezierEasing(0, 0, 0.58, 1));
        animateEasing(airplaneTranslateXAnimationTick(airplaneTranslateX, 360), 1000, bezierEasing(0, 0, 0.58, 1));
        animateEasing(airplaneTranslateYAnimationTick(airplaneTranslateY, -100), 1000, bezierEasing(0, 0, 0.58, 1));
      }
      drawAirplaneCanvas();
    };

    const airplaneImg = new Image();
    airplaneImg.onload = () => {
      drawAirplaneCanvas();

      animateDuration(globalAirplaneAnimationTick, 1000);
    };

    airplaneImg.src = `/img/airplane.png`;
    window.addEventListener(`resize`, drawAirplaneCanvas);
  }

};
