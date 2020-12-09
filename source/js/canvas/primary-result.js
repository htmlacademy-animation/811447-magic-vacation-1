import {animateDuration} from "../helpers/animate-duration.js";
import {animateEasing} from "../helpers/animate-easing.js";
import {bezierEasing} from "../helpers/cubic-bezier.js";

const sizesCanvas = {
  back: {
    radius: 162,
    width: 586,
    height: 324
  },
  airplane: {
    width: 120,
    height: 120
  },
  tree: {
    width: 38,
    height: 101
  },
  tree2: {
    width: 50,
    height: 159
  }
};

function drawSeeCalf() {
  const canvas = document.querySelector(`#sea-calf`);
  if (canvas.getContext) {
    const backContext = canvas.getContext(`2d`);

    let backOpacity = 1;
    let backScale = 0;
    let backAnimations = [];

    let airplaneRotate = 70;
    let airplaneTranslateX = 0;
    let airplaneTranslateY = -280;
    // let airplaneAnimations = [];

    const drawBackCanvas = () => {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      let backCX = Math.round((windowWidth / 2 - 150));
      let backCY = Math.round((windowHeight - 120 - (windowHeight / 2 - sizesCanvas.back.radius * backScale)));
      let backRadius = sizesCanvas.back.height * backScale / 2;
      let backStartAngle = 0;
      let backEndAngle = Math.PI * 2;

      let airplaneX = Math.round((windowWidth - sizesCanvas.airplane.width) / 2 + airplaneTranslateX);
      let airplaneY = Math.round((windowHeight - sizesCanvas.airplane.height) / 2 + airplaneTranslateY + 120);

      canvas.width = windowWidth;
      canvas.height = windowHeight;
      backContext.globalAlpha = backOpacity;
      backContext.clearRect(0, 0, windowWidth, windowHeight);
      backContext.save();

      backContext.beginPath();
      backContext.moveTo(backCX, backCY + backRadius);
      // backContext.bezierCurveTo(backCX, backCY - backRadius + 200, backCX, backCY + backRadius, airplaneX, airplaneY + 120);
      backContext.lineTo(airplaneX, airplaneY + 120);
      backContext.lineTo(backCX, backCY - backRadius);
      // backContext.fillStyle = `#acc3ff`;
      backContext.fill();

      backContext.arc(backCX, backCY, backRadius, backStartAngle, backEndAngle, true);
      backContext.fillStyle = `#acc3ff`;
      backContext.fill();


      // backContext.drawImage(backImg, Math.round((windowWidth - sizesCanvas.back.width * backScale) / 2), Math.round((windowHeight - sizesCanvas.back.height * backScale) / 2 + 120), sizesCanvas.back.width * backScale, sizesCanvas.back.height * backScale);

      rotateAirplane(airplaneRotate, windowWidth / 2, windowHeight / 2);
      backContext.drawImage(airplaneImg, airplaneX, airplaneY, sizesCanvas.airplane.width, sizesCanvas.airplane.height);

      backContext.restore();
    };


    // const backOpacityAnimationTick = (from, to) => (progress) => {
    //   backOpacity = from + progress * (to - from);
    // };

    const backScaleAnimationTick = (from, to) => (progress) => {
      backScale = from + progress * (to - from);
    };

    const globalBackAnimationTick = (globalProgress) => {
      if (globalProgress >= 0 && backAnimations.indexOf(`backAnimation`) === -1) {
        backAnimations.push(`backAnimation`);

        // animateEasing(backOpacityAnimationTick(0, 1), 1000, bezierEasing(0, 0, 0.58, 1));
        animateEasing(backScaleAnimationTick(0, 1.1), 1000, bezierEasing(0, 0, 0.58, 1));

        animateEasing(airplaneRotateAnimationTick(airplaneRotate, 0), 1000, bezierEasing(0, 0, 0.58, 1));
        animateEasing(airplaneTranslateXAnimationTick(airplaneTranslateX, 360), 1000, bezierEasing(0, 0, 0.58, 1));
        animateEasing(airplaneTranslateYAnimationTick(airplaneTranslateY, -100), 1000, bezierEasing(0, 0, 0.58, 1));
      }
      drawBackCanvas();
    };

    const airplaneImg = new Image();
    airplaneImg.onload = () => {
      drawBackCanvas();
      animateDuration(globalBackAnimationTick, 1000);
    };

    airplaneImg.src = `/img/airplane.png`;
    window.addEventListener(`resize`, drawBackCanvas);

    const rotateAirplane = (angle, cx, cy) => {
      backContext.translate(cx, cy);
      backContext.rotate(angle * Math.PI / 180);
      backContext.translate(-cx, -cy);
    };

    const airplaneTranslateXAnimationTick = (from, to) => (progress) => {
      airplaneTranslateX = from + progress * (to - from);
    };

    const airplaneTranslateYAnimationTick = (from, to) => (progress) => {
      airplaneTranslateY = from + progress * (to - from);
    };

    const airplaneRotateAnimationTick = (from, to) => (progress) => {
      airplaneRotate = from + progress * (to - from);
    };

  }

}

export {drawSeeCalf};
