import { loadHTML } from "./include.js";


const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
// if (!loggedInUser) {
//     alert("Please sign in to access Favorites.");
//     window.location.href = "authentication.html";
// }

let favoriteMovies = []; 
let filteredFavorites = []; 

async function initFavoritesPage() {
    await loadHTML("header", "partials/header.html");
    await loadHTML("footer", "partials/footer.html");

    favoriteMovies = JSON.parse(localStorage.getItem("moviehub_favorites") || "[]");
    filteredFavorites = [...favoriteMovies];

    displayFavorites(filteredFavorites);

    const searchInput = document.getElementById("favorite-search");
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            applyFilters();
        });
    }

    const statusFilter = document.getElementById("status-filter"); // optional if you have it
    if (statusFilter) {
        statusFilter.addEventListener("change", () => {
            applyFilters();
        });
    }

    const ratingFilter = document.getElementById("rating-filter"); // optional if you have it
    if (ratingFilter) {
        ratingFilter.addEventListener("input", () => {
            applyFilters();
        });
    }

    const container = document.querySelector(".favorite-list");
    container.addEventListener("click", (e) => {
        if (!e.target.classList.contains("remove-favorite")) return;

        const imdbID = e.target.dataset.id;
        favoriteMovies = favoriteMovies.filter(m => m.imdbID !== imdbID);
        localStorage.setItem("moviehub_favorites", JSON.stringify(favoriteMovies));

        applyFilters();
    });
}

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

function applyFilters() {
    const searchTerm = document.getElementById("favorite-search")?.value.toLowerCase() || "";
    const statusFilter = document.getElementById("status-filter")?.value || "";
    const ratingFilter = parseFloat(document.getElementById("rating-filter")?.value || 0);

    filteredFavorites = favoriteMovies.filter(movie => {
        const matchesSearch = movie.Title.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter ? movie.watchStatus === statusFilter : true;
        const matchesRating = movie.customRating
            ? movie.customRating >= ratingFilter
            : (movie.imdbRating && parseFloat(movie.imdbRating) >= ratingFilter);

        return matchesSearch && matchesStatus && matchesRating;
    });

    displayFavorites(filteredFavorites);
}

initFavoritesPage();
