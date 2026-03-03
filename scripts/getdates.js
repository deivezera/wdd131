document.addEventListener("DOMContentLoaded", () => {
  // Output the copyright year dynamically
  const currentYearElement = document.getElementById("currentyear");
  if (currentYearElement) {
    currentYearElement.innerHTML = new Date().getFullYear();
  }

  // Output document last modified dynamically
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.innerHTML = `Last Modification: ${document.lastModified}`;
  }
});
