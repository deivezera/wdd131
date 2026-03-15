const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', () => {
  menu.classList.toggle('open');
  
  if (menu.classList.contains('open')) {
    menuButton.textContent = '✕';
    menuButton.setAttribute('aria-label', 'Close menu');
  } else {
    menuButton.textContent = '☰';
    menuButton.setAttribute('aria-label', 'Toggle menu');
  }
});

const currentYearElement = document.getElementById('currentyear');
const lastModifiedElement = document.getElementById('lastModified');

const currentYear = new Date().getFullYear();
currentYearElement.textContent = currentYear;

const lastModified = document.lastModified;
lastModifiedElement.textContent = `Last Modified: ${lastModified}`;
