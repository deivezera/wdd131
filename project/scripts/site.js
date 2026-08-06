const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

function getCurrentPage() {
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function setActiveNav() {
  const currentPage = getCurrentPage();
  siteNav.querySelectorAll("a").forEach((link) => {
    if (link.classList.contains("nav-cta")) {
      return;
    }
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

function setMenuState(isOpen) {
  siteNav.classList.toggle("open", isOpen);
  document.body.classList.toggle("no-scroll", isOpen);
  navToggle.textContent = `${isOpen ? "✕" : "☰"}`;
  navToggle.setAttribute("aria-expanded", `${isOpen}`);
  navToggle.setAttribute("aria-label", `${isOpen ? "Close menu" : "Open menu"}`);
}

function setDates() {
  currentYear.textContent = new Date().getFullYear();
  lastModified.textContent = `Last modified: ${document.lastModified}`;
}

function initMenu() {
  navToggle.addEventListener("click", () => {
    const isOpen = !siteNav.classList.contains("open");
    setMenuState(isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuState(false);
    }
  });
}

initMenu();
setActiveNav();
setDates();
