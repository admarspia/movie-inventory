import { loadHTML } from "./include.js";

async function initHomePage() {
    await loadHTML("header", "partials/header.html");
    await loadHTML("footer", "partials/footer.html");
 const movieCards = document.querySelectorAll(".movie-card");
  const detailCard = document.querySelector(".movie-detail-card");

  movieCards.forEach(card => {
    card.addEventListener("click", () => {
      detailCard.classList.remove("hidden");
      detailCard.innerHTML = `
        <h2>${card.querySelector("h4").textContent}</h2>
        <p>More details about ${card.querySelector("h4").textContent} will go here.</p>
      `;
    });
  });
}

}

initHomePage();
