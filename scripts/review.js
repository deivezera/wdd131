const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

const REVIEW_COUNT_KEY = "reviewsCompleted";

function getProductName(productId) {
  const product = products.find((item) => item.id === productId);
  return product ? product.name : "Unknown product";
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");
  const reviewsCompleted = document.getElementById("reviewsCompleted");
  const reviewIntro = document.getElementById("reviewIntro");

  if (!reviewsCompleted || !reviewIntro) {
    return;
  }

  if (productId) {
    const currentCount = parseInt(localStorage.getItem(REVIEW_COUNT_KEY), 10) || 0;
    const nextCount = currentCount + 1;
    localStorage.setItem(REVIEW_COUNT_KEY, nextCount);
    reviewsCompleted.textContent = nextCount;
    reviewIntro.textContent = "Thank you for submitting your review. Your input is recorded and the number of completed reviews is tracked locally.";
  } else {
    reviewsCompleted.textContent = parseInt(localStorage.getItem(REVIEW_COUNT_KEY), 10) || 0;
    reviewIntro.textContent = "This page displays the number of reviews completed. Submit a review from the form to increment the count.";
  }
});
