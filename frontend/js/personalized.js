import { loadHTML } from "./include.js";


const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// if (!loggedInUser) {
//     alert("Please sign in to access Personalized Movies.");
//     window.location.href = "authentication.html";
// }

let personalizedMovies = []; 
let filteredMovies = []; 

async function initPersonalizedPage() {
    await loadHTML("header", "partials/header.html");
    await loadHTML("footer", "partials/footer.html");

    personalizedMovies = JSON.parse(localStorage.getItem("personalized") || "[]");
    filteredMovies = [...personalizedMovies];

    displayMovies(filteredMovies);

    const searchInput = document.getElementById("personal-search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            filteredMovies = personalizedMovies.filter(movie =>
                movie.Title.toLowerCase().includes(term)
            );
            applyFilters();
        });
    }

    const statusFilter = document.getElementById("status-filter");
    if (statusFilter) {
        statusFilter.addEventListener("change", () => {
            applyFilters();
        });
    }

    const ratingFilter = document.getElementById("rating-filter");
    if (ratingFilter) {
        ratingFilter.addEventListener("input", () => {
            applyFilters();
        });
    }

    const container = document.querySelector(".personalized-list");
    container.addEventListener("click", (e) => {
        if (!e.target.classList.contains("remove-personalized")) return;

        const imdbID = e.target.dataset.id;
        personalizedMovies = personalizedMovies.filter(m => m.imdbID !== imdbID);
        localStorage.setItem("personalized", JSON.stringify(personalizedMovies));
        applyFilters();
    });
}

function displayMovies(movies) {
    if (movies == []) console.log("empty movies");
    console.log(movies);
    const container = document.querySelector(".personalized-list");
    container.innerHTML = "";

    if (movies.length === 0) {
        container.innerHTML = `
            <div class="no-personalized">
                <h3>No movies found</h3>
                <p>Start personalizing movies from the Home page!</p>
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
            <p>Status: ${movie.watchStatus || "planned"}</p>
            <p>Rating: ${movie.customRating || movie.imdbRating}</p>
            <p>Notes: ${movie.customNotes || "None"}</p>
            <button class="remove-personalized" data-id="${movie.imdbID}">Remove</button>
        `;

        if (movieCard.length === 0) console.log("card is not created");

        container.appendChild(movieCard);
    });
}

// ===== Apply search + filters =====
function applyFilters() {
    const statusFilter = document.getElementById("status-filter").value;
    const ratingFilter = parseFloat(document.getElementById("rating-filter").value || 0);
    const searchTerm = document.getElementById("personal-search").value.toLowerCase();

    filteredMovies = personalizedMovies.filter(movie => {
        const matchesStatus = statusFilter ? movie.watchStatus === statusFilter : true;
        const matchesRating = movie.customRating
            ? movie.customRating >= ratingFilter
            : movie.imdbRating >= ratingFilter;
        const matchesSearch = movie.Title.toLowerCase().includes(searchTerm);

        return matchesStatus && matchesRating && matchesSearch;
    });

    displayMovies(filteredMovies);
}

// ===== Initialize page =====
initPersonalizedPage();
