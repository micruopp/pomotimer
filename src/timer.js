function Timer(duration, onTick, onCompletion) {
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

  this.isRunning = false;

  let lastTick = 0;
  let intervalId = null;

  let tick = () => {
    let dt = Date.now() - lastTick;
    let remaining = this.remaining - dt;

    this.remaining = remaining < 0 ? 0 : remaining;

    if (this.remaining === 0) {
      this.pause();
      this.onCompletion();
    } else {
      this.onTick();
      lastTick = Date.now();
    }
  };

  this.start = () => {
    this.isRunning = true;
    lastTick = Date.now();
    intervalId = setInterval(tick);
  };

  this.pause = () => {
    this.isRunning = false;
    if (intervalId) {
        clearInterval(intervalId);
    }
  };

  this.toggle = () => {
    this.isRunning ? this.pause() : this.start();
  };

  this.onTick = onTick;
  this.onCompletion = onCompletion;

  this.reset = () => {
    this.pause();
    this.remaining = this.duration * 60 * 1000;
  };

}
