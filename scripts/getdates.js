document.addEventListener("DOMContentLoaded", () => {
  const currentYearElement = document.getElementById("currentyear");
  if (currentYearElement) {
    currentYearElement.innerHTML = new Date().getFullYear();
  }

  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.innerHTML = `Last Modification: ${document.lastModified}`;
  }
});
