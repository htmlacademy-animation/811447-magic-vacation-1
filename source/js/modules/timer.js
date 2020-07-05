// export default (timeInMinutes) => {
//     const timer = document.querySelector(`.game__counter`);
//     let timeInSeconds = timeInMinutes * 60;
//     let interval = 1000;
//     let start = Date.now();
//     let now;
//     let then = Date.now();
//     let elapsed;
//     let requestId;

//     const draw = () => {
//         const timePassed = Math.ceil((Date.now() - start) / 1000);
//         let minutes = `0${Math.floor((timeInSeconds - timePassed) / 60)}`.slice(-2);
//         let seconds = `0${Math.floor((timeInSeconds - timePassed) % 60)}`.slice(-2);
//         timer.innerHTML = `<span>${minutes}</span>:<span>${seconds}</span>`;
//         if ((timeInSeconds - timePassed) <= 0) {
//             // clearInterval(timerId);
//             cancelAnimationFrame(requestId);
//         }
//     };

//     // let timerId = setInterval(draw, interval);

//     const tick = () => {
//         requestId = requestAnimationFrame(tick);
//         now = Date.now();
//         elapsed = now - then;

//         if (elapsed > interval) {
//             then = now - (elapsed % interval);
//             draw();
//         }
//     }
    
//     requestId = requestAnimationFrame(tick);
// }

export default class Timer {
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
        this.cancel = this.cancel.bind(this);
        this.init = this.init.bind(this);
    }

    draw() {
        console.log(this.requestId);
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

    cancel() {
        cancelAnimationFrame(this.requestId);
        this.requestId = null;
        this.start = Date.now();
        console.log(this.requestId);
    }

    init() {
        this.requestId = requestAnimationFrame(this.tick);
        this.start = Date.now();
        console.log(this.requestId);
    }
}
