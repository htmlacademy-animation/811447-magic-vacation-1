/* eslint-disable no-undef */
/* eslint-disable new-cap */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
let NEWTON_ITERATIONS = 4;
let NEWTON_MIN_SLOPE = 0.001;
let SUBDIVISION_PRECISION = 0.0000001;
let SUBDIVISION_MAX_ITERATIONS = 10;

let kSplineTableSize = 11;
let kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

let float32ArraySupported = `Float32Array` in window;

function A(aA1, aA2) {
  return 1.0 - 3.0 * aA2 + 3.0 * aA1;
}

function B(aA1, aA2) {
  return 3.0 * aA2 - 6.0 * aA1;
}

function C(aA1) {
  return 3.0 * aA1;
}

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier(aT, aA1, aA2) {
  return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
}

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope(aT, aA1, aA2) {
  return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
}

function binarySubdivide(aX, aA, aB) {
  let currentX; let currentT; let i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

const bezierEasing = (mX1, mY1, mX2, mY2) => {
  if (mX1 < 0 || mX1 > 1 || mX2 < 0 || mX2 > 1) {
    throw new Error(`BezierEasing x values must be in [0, 1] range.`);
  }

  let mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);

  function newtonRaphsonIterate(aX, aGuessT) {
    for (let i = 0; i < NEWTON_ITERATIONS; ++i) {
      let currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) {
        return aGuessT;
      }
      let currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  function calcSampleValues() {
    for (let i = 0; i < kSplineTableSize; ++i) {
      mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }
  }

  function getTForX(aX) {
    let intervalStart = 0.0;
    let currentSample = 1;
    let lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    let dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]);
    let guessForT = intervalStart + dist * kSampleStepSize;

    let initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
    }
  }

  let _precomputed = false;

  function precompute() {
    _precomputed = true;
    if (mX1 !== mY1 || mX2 !== mY2) {
      calcSampleValues();
    }
  }

  let f = function (aX) {
    if (!_precomputed) {
      precompute();
    }
    if (mX1 === mY1 && mX2 === mY2) {
      return aX;
    } // linear
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (aX === 0) {
      return 0;
    }
    if (aX === 1) {
      return 1;
    }
    return calcBezier(getTForX(aX), mY1, mY2);
  };

  f.getControlPoints = function () {
    return [{x: mX1, y: mY1}, {x: mX2, y: mY2}];
  };

  let args = [mX1, mY1, mX2, mY2];
  let str = `BezierEasing(` + args + `)`;
  f.toString = function () {
    return str;
  };

  let css = `cubic-bezier(` + args + `)`;
  f.toCSS = function () {
    return css;
  };

  return f;
};
//
// // CSS mapping
// BezierEasing.css = {
//   "ease": BezierEasing(0.25, 0.1, 0.25, 1.0),
//   "linear": BezierEasing(0.00, 0.0, 1.00, 1.0),
//   "ease-in": BezierEasing(0.42, 0.0, 1.00, 1.0),
//   "ease-out": BezierEasing(0.00, 0.0, 0.58, 1.0),
//   "ease-in-out": BezierEasing(0.42, 0.0, 0.58, 1.0)
// };

export {bezierEasing};
