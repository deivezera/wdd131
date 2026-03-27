document.getElementById('currentyear').textContent = new Date().getFullYear();

document.getElementById('lastModified').textContent = document.lastModified;

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

const calculateWindChill = (temp, windSpeed) => 35.74 + (0.6215 * temp) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temp * Math.pow(windSpeed, 0.16));


const weatherCard = document.querySelector('.place-weather');
const temperature = parseInt(weatherCard.getAttribute('data-temp'));
const windSpeed = parseInt(weatherCard.getAttribute('data-windspeed'));

const windchillElement = document.getElementById('windchill-value');

if (temperature <= 50 && windSpeed > 3) {
  const windChill = calculateWindChill(temperature, windSpeed);
  windchillElement.textContent = windChill.toFixed(1) + '°F';
} else {
  windchillElement.textContent = 'N/A';
}