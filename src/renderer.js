const settingsButton = document.getElementById('settings-toggle');
settingsButton.addEventListener('click', () => {
  window.electron.openSettings('hi');
});
