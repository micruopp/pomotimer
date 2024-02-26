const settingsButton = document.getElementById('settings-toggle');
settingsButton.addEventListener('click', () => {
  window.bridge.openSettings('hi');
});
