import { loadHTML } from "./include.js";
import Movie from "./movies.js";


 

function addMovieCard(movie) {
  const container = document.getElementById("movie-list");
  if (!container || !movie) {
    console.log("can't find movie-list");
  };

  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  movieCard.innerHTML = `
    <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}" />
    <h4>${movie.Title}</h4>
    <p>${movie.Year}</p>
    <p>${movie.Genre}</p>
  `;

  container.appendChild(movieCard);
}


async function initHomePage() {
  await loadHTML("header", "partials/header.html");
  await loadHTML("footer", "partials/footer.html");

  const selectedMovies = [
    "The Shawshank Redemption", 
    "The Godfather",
    "The Dark Knight",
    "Inception",
    "Forrest Gump",
    "Interstellar",
    "Gladiator",
    "Jurassic Park",
    "Pulp Fiction",
    "The Matrix",
    "Back to the Future",
    "Fight Club"
  ];

  const movieLoader = new Movie();

  for (let title of selectedMovies) {
    // Await searchByTitle, get first movie
    await movieLoader.searchByTitle(title);
    const movies = movieLoader.getMovies();
    if (movies.length > 0) {
      console.log(movies[0]);
      addMovieCard(movies[0]);
    }
  }
}



initHomePage();
