const drawTime = (container, minutes, seconds) => {
  container.innerHTML = `<span>${minutes}</span>:<span>${seconds}</span>`;
}

export {drawTime};

export default class Timer {
  constructor(timeInMinutes, timerContainer, drawTime) {
    /// this.timer = document.querySelector(`.game__counter`);
    this.timer = timerContainer;
    this.drawTime = drawTime;
    this.timeInMinutes = timeInMinutes;
    this.timeInSeconds = this.timeInMinutes * 60;
    this.interval = 1000;
    this.start = null;
    this.now = Date.now();
    this.then = Date.now();
    this.elapsed = this.then - this.now;
    this.requestId = null;
    this.draw = this.draw.bind(this);
    this.tick = this.tick.bind(this);
    this.init = this.init.bind(this);
  }

  draw() {
    const timeToEnd = this.timeInSeconds - Math.floor((Date.now() - this.start) / 1000);
    const minutes = `0${Math.floor(timeToEnd / 60)}`.slice(-2);
    const seconds = `0${Math.floor(timeToEnd % 60)}`.slice(-2);
    // this.timer.innerHTML = `<span>${minutes}</span>:<span>${seconds}</span>`;
    this.drawTime(this.timer, minutes, seconds);
    if (timeToEnd <= 0) {
      cancelAnimationFrame(this.requestId);
    }
  }

  tick() {
    this.requestId = requestAnimationFrame(this.tick);
    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.interval) {
      this.then = this.now - (this.elapsed % this.interval);
      this.draw();
    }
  }

  init() {
    this.requestId = requestAnimationFrame(this.tick);
    this.start = Date.now();
  }
}
