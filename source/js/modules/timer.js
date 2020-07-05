class Timer {
  constructor(timeInMinutes) {
    this.timer = document.querySelector(`.game__counter`);
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
    let minutes = `0${Math.floor(timeToEnd / 60)}`.slice(-2);
    let seconds = `0${Math.floor(timeToEnd % 60)}`.slice(-2);
    this.timer.innerHTML = `<span>${minutes}</span>:<span>${seconds}</span>`;
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

const timer = new Timer(5);
export {timer};
