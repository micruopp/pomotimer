function Pomodoro() {

  let updateDisplay = () => {
    let minutes = currTimer.toMinutes();
    let seconds = currTimer.toSeconds();
    timerMinutes.innerHTML = `${minutes}`;
    timerSeconds.innerHTML = `${seconds < 10 ? '0' + seconds : seconds}`;
    for (const s of timerSeparators) {
      seconds % 2 === 0 ? s.classList.add('hidden') : s.classList.remove('hidden');
    }
  };

  const focusDuration = 25; // minutes
  const focusLabel = 'Focus';

  let focusTimer = new Timer(focusDuration, updateDisplay, () => {
    timerLabel.innerText = breakLabel;
    currTimer = breakTimer;
    updateDisplay();

    window.electron.showWindow();
    breakTimer.start();
  });

  const breakDuration = 5; // minutes
  const breakLabel = 'Break';

  let breakTimer = new Timer(breakDuration, updateDisplay, () => {
    focusTimer.reset();
    breakTimer.reset();
    timerLabel.innerText = focusLabel;
    currTimer = focusTimer;
    updateDisplay();
  });

  let currTimer = focusTimer;

  let timerDisplay = document.getElementById('timer-display');
  let timerMinutes = document.getElementById('timer-display-minutes');
  let timerSeconds = document.getElementById('timer-display-seconds');
  let timerSeparators = document.getElementsByClassName('timer-display-separator');

  let timerLabel = document.getElementById('timer-label');

  this.start = () => {
    currTimer.start();
    window.electron.hideWindow();
  };

  this.pause = () => {
    currTimer.start();
  };

  this.toggle = () => {
    currTimer.isRunning ? this.pause() : this.start();
  };

}

(() => {

  window.addEventListener('DOMContentLoaded', () => {
    let pomodoro = new Pomodoro();
    
    let timerStateButton = document.getElementById('timer-start-stop-button');
    timerStateButton.addEventListener('click', pomodoro.toggle);
  });

})();
