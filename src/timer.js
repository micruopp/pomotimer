function Timer(duration, updateCallback) {
  // https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript

  this.duration = duration;
  this.remaining = duration * 60 * 1000;

  this.toHours = () => {
    return Math.floor(this.remaining / (60 * 60 * 1000));
  };

  this.toMinutes = () => {
    return Math.floor(this.remaining / (60 * 1000));
  };

  this.toSeconds = () => {
    return Math.floor((this.remaining % (60 * 1000)) / 1000);
  };

  let isRunning = false;
  let lastTick = 0;
  let intervalId = null;

  this.start = () => {
    isRunning = true;
    lastTick = Date.now();

    intervalId = setInterval(() => {
      let dt = Date.now() - lastTick;
      let remaining = this.remaining - dt;
      this.remaining = remaining < 0 ? 0 : remaining;
      if (this.remaining === 0) {
        this.pause();
      }
      this.update();
      lastTick = Date.now();
    });
  };

  this.pause = () => {
    isRunning = false;
    if (intervalId) {
        clearInterval(intervalId);
    }
  };

  this.toggle = () => {
    isRunning ? this.pause() : this.start();
  };

  this.update = updateCallback;

  this.reset = () => {
    this.pause();
    this.remaining = this.duration;
  };

}

(() => {
  window.addEventListener('DOMContentLoaded', () => {
    console.log('hi!! from Timer.js');

    let timerDisplay = document.getElementById('timer-display');
    let timerMinutes = document.getElementById('timer-display-minutes');
    let timerSeconds = document.getElementById('timer-display-seconds');

    let timer = new Timer(25, () => {
      let minutes = timer.toMinutes();
      let seconds = timer.toSeconds();
      timerMinutes.innerHTML = `${minutes}`;
      timerSeconds.innerHTML = `${seconds < 10 ? '0' + seconds : seconds}`;
    });

    let timerStateButton = document.getElementById('timer-start-stop-button');
    timerStateButton.addEventListener('click', timer.toggle);
  });
})();
