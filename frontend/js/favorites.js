import { loadHTML } from "./include.js";
import ensureLogin from './ensureLogin.js';

ensureLogin();

let favoriteMovies = [];
let filteredFavorites = [];

// ===== Initialize Page =====
async function initFavoritesPage() {
    await loadHTML("header", "partials/header.html");
    await loadHTML("footer", "partials/footer.html");

    favoriteMovies = JSON.parse(localStorage.getItem("moviehub_favorites") || "[]");
    filteredFavorites = [...favoriteMovies];

    displayFavorites(filteredFavorites);

    setupFilters();
    setupRemoveButtons();
}

// ===== Display Favorites =====
function displayFavorites(movies) {
    const container = document.querySelector(".favorite-list");
    container.innerHTML = "";

    if (movies.length === 0) {
        container.innerHTML = `
            <div class="no-favorites">
                <h3>No favorites yet</h3>
                <p>Start adding movies from the Home page!</p>
                <a href="index.html" class="btn-primary">Browse Movies</a>
            </div>
        `;
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        movieCard.innerHTML = `
            <img src="${movie.customPoster || movie.Poster}" alt="${movie.Title}">
            <h4>${movie.Title}</h4>
            <p>${movie.Year} • ${movie.Genre}</p>
            <p>Rating: ${movie.customRating || movie.imdbRating}</p>
            <p>Status: ${movie.watchStatus || "planned"}</p>
            <button class="remove-favorite" data-id="${movie.imdbID}">Remove</button>
        `;
        container.appendChild(movieCard);
    });
}

// ===== Filters (Search + Status + Sliders) =====
function setupFilters() {
    const searchInput = document.getElementById("favorite-search");
    const statusFilter = document.getElementById("status-filter");
    const ratingSlider = document.getElementById("rating-filter");
    const ratingValue = document.getElementById("rating-value");
    const yearSlider = document.getElementById("year-filter");
    const yearValue = document.getElementById("year-value");

    // Search input
    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }

    // Status filter
    if (statusFilter) {
        statusFilter.addEventListener("change", applyFilters);
    }

    // Rating slider
    if (ratingSlider && ratingValue) {
        ratingValue.textContent = ratingSlider.value;
        ratingSlider.addEventListener("input", () => {
            ratingValue.textContent = ratingSlider.value;
            applyFilters();
        });
    }

    // Year slider (optional)
    if (yearSlider && yearValue) {
        yearValue.textContent = yearSlider.value;
        yearSlider.addEventListener("input", () => {
            yearValue.textContent = yearSlider.value;
            applyFilters();
        });
    }
}

// ===== Apply Filters =====
function applyFilters() {
    const searchTerm = document.getElementById("favorite-search")?.value.toLowerCase() || "";
    const statusFilter = document.getElementById("status-filter")?.value || "";
    const ratingFilter = parseFloat(document.getElementById("rating-filter")?.value || 0);
    const yearFilter = parseInt(document.getElementById("year-filter")?.value || 0);

    filteredFavorites = favoriteMovies.filter(movie => {
        const matchesSearch = movie.Title.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter ? movie.watchStatus === statusFilter : true;
        const matchesRating = movie.customRating
            ? movie.customRating >= ratingFilter
            : (movie.imdbRating && parseFloat(movie.imdbRating) >= ratingFilter);
        const matchesYear = yearFilter ? parseInt(movie.Year) >= yearFilter : true;

        return matchesSearch && matchesStatus && matchesRating && matchesYear;
    });

    displayFavorites(filteredFavorites);
}

// ===== Remove Button Handler =====
function setupRemoveButtons() {
    const container = document.querySelector(".favorite-list");
    container.addEventListener("click", (e) => {
        if (!e.target.classList.contains("remove-favorite")) return;

        const imdbID = e.target.dataset.id;
        favoriteMovies = favoriteMovies.filter(m => m.imdbID !== imdbID);
        localStorage.setItem("moviehub_favorites", JSON.stringify(favoriteMovies));
        applyFilters();
    });
}

// ===== Initialize =====
initFavoritesPage();
