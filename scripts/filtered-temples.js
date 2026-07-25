const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');
const templeGrid = document.getElementById('templeGrid');
const currentYearElement = document.getElementById('currentyear');
const lastModifiedElement = document.getElementById('lastModified');
const navLinks = document.querySelectorAll('nav a[data-filter]');

const temples = [
  {
    templeName: 'Aba Nigeria',
    location: 'Aba, Nigeria',
    dedicated: '2005, August, 7',
    area: 11500,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg'
  },
  {
    templeName: 'Manti Utah',
    location: 'Manti, Utah, United States',
    dedicated: '1888, May, 21',
    area: 74792,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg'
  },
  {
    templeName: 'Payson Utah',
    location: 'Payson, Utah, United States',
    dedicated: '2015, June, 7',
    area: 96630,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg'
  },
  {
    templeName: 'Yigo Guam',
    location: 'Yigo, Guam',
    dedicated: '2020, May, 2',
    area: 6861,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg'
  },
  {
    templeName: 'Washington D.C.',
    location: 'Kensington, Maryland, United States',
    dedicated: '1974, November, 19',
    area: 156558,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg'
  },
  {
    templeName: 'Lima Perú',
    location: 'Lima, Perú',
    dedicated: '1986, January, 10',
    area: 9600,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg'
  },
  {
    templeName: 'Mexico City Mexico',
    location: 'Mexico City, Mexico',
    dedicated: '1983, December, 2',
    area: 116642,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg'
  },
  {
    templeName: 'Bern Switzerland',
    location: 'Bern, Switzerland',
    dedicated: '1955, October, 7',
    area: 16939,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/bern-switzerland/400x250/bern_switzerland_temple_exterior_4.jpg'
  },
  {
    templeName: 'Tokyo Japan',
    location: 'Tokyo, Japan',
    dedicated: '1980, October, 27',
    area: 53564,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x250/tokyo-japan-temple-exterior-2.jpg'
  },
  {
    templeName: 'Laie Hawaii',
    location: 'Laie, Hawaii, United States',
    dedicated: '1919, November, 27',
    area: 51000,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/laie-hawaii/400x250/laie-hawaii-temple-604913-wallpaper.jpg'
  },
  {
    templeName: 'Curitiba Brazil',
    location: 'Curitiba, Brazil',
    dedicated: '2008, June, 01',
    area: 27850,
    imageUrl:
      'https://churchofjesuschristtemples.org/assets/img/temples/curitiba-brazil-temple/curitiba-brazil-temple-4882.jpg'
  },
  {
    templeName: 'Maceio Brazil',
    location: 'Maceio, Brazil',
    dedicated: 'Still under construction',
    area: 19000,
    imageUrl:
      'https://churchofjesuschristtemples.org/assets/img/temples/maceio-brazil-temple/maceio-brazil-temple-48800.jpg'
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/sao-paulo-brazil-temple/sao-paulo-brazil-temple-70817.jpg",
  }
];

function getYear(dedicatedText) {
  return Number(dedicatedText.split(',')[0]);
}

function createTempleCard(temple) {
  const figure = document.createElement('figure');

  figure.innerHTML = `
    <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
    <figcaption>${temple.templeName}</figcaption>
    <p><strong>Location:</strong> ${temple.location}</p>
    <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
    <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
  `;

  return figure;
}

function displayTemples(list) {
  templeGrid.innerHTML = '';

  if (list.length === 0) {
    templeGrid.innerHTML = '<p>No temples match this filter.</p>';
    return;
  }

  list.forEach((temple) => {
    templeGrid.appendChild(createTempleCard(temple));
  });
}

function filterTemples(type) {
  const filters = {
    home: () => temples,
    old: () => temples.filter((temple) => getYear(temple.dedicated) < 1900),
    new: () => temples.filter((temple) => getYear(temple.dedicated) > 2000 || temple.dedicated === 'Still under construction'),
    large: () => temples.filter((temple) => temple.area > 90000),
    small: () => temples.filter((temple) => temple.area < 10000),
    brazilian: () => temples.filter((temple) => {
      const value = `${temple.templeName} ${temple.location}`.toLowerCase();
      return value.includes('brazil');
    })
  };

  return filters[type] ? filters[type]() : temples;
}

function setActiveLink(target) {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.filter === target);
  });
}

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

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const filterType = event.currentTarget.dataset.filter;
    displayTemples(filterTemples(filterType));
    setActiveLink(filterType);
  });
});

currentYearElement.textContent = new Date().getFullYear();
lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;

displayTemples(temples);
setActiveLink('home');
