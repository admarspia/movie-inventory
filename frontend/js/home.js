import { loadHTML } from "./include.js";
import Movie from "./movies.js";

// ⬇️ ADD THIS IMPORT ⬇️
import { initAuth } from "./authentication.js";
 
function addMovieCard(movie, containerId = "movie-list") {
    const container = document.getElementById(containerId);
    if (!container || !movie) {
        console.log("Can't find container or movie");
        return;
    }

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

  // 2. ⬇️ LOAD THE LOGIN POPUP (Critical for Auth) ⬇️
  await loadHTML("auth-modal", "partials/authentication.html");

  // 3. ⬇️ START THE AUTH LOGIC (Makes the button work) ⬇️
  initAuth();

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
        await movieLoader.searchByTitle(title);
        const movies = movieLoader.getMovies();
        if (movies.length > 0) {
            addMovieCard(movies[0]);
        }
    }

    updateSliderValue("year", "year-value");
    updateSliderValue("rating", "rating-value");

    document.getElementById("year").addEventListener("input", function() {
        updateSliderValue("year", "year-value");
    });

    document.getElementById("rating").addEventListener("input", function() {
        updateSliderValue("rating", "rating-value");
    });

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    });
}

function updateSliderValue(sliderId, displayId) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(displayId);
    if (slider && display) {
        display.textContent = slider.value;
    }
}

async function handleSearch() {
    const query = document.getElementById("search-input").value.trim();
    if (!query) return;

    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";

    const movieLoader = new Movie();

    try {
        await movieLoader.searchByTitle(query);
        
        const filterEnabled = document.getElementById("filter-enable").checked;
        
        if (filterEnabled) {
            // Apply filters using Movie class methods
            const genreFilter = document.getElementById("genre").value;
            const yearFilter = parseInt(document.getElementById("year").value);
            const ratingFilter = parseInt(document.getElementById("rating").value);
            
            if (genreFilter) {
                movieLoader.filterByGenre(genreFilter);
            }
            
            if (yearFilter) {
                movieLoader.filterByYear(yearFilter);
            }
            
            if (ratingFilter > 0) {
                movieLoader.filterByRating(ratingFilter);
            }
        }
        
        const filteredMovies = movieLoader.getMovies();

        if (filteredMovies.length === 0) {
            searchResults.innerHTML = "<p>No movies found. Try a different search.</p>";
            return;
        }

        for (let movie of filteredMovies) {
            addMovieCard(movie, "search-results");
        }
        
    } catch (error) {
        console.error("Search error:", error);
        searchResults.innerHTML = "<p>Error searching for movies. Please try again.</p>";
    }
}

initHomePage();

window.handleSearch = handleSearch;
