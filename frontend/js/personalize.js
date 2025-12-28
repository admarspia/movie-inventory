import { loadHTML } from "./include.js";
import Movie from "./movies.js";

document.addEventListener("DOMContentLoaded", () => {
    const statusEl = document.getElementById("status");
    const noteEl = document.getElementById("notes");
    const ratingEl = document.getElementById("personalRating");
    const posterEl = document.getElementById("poster");
    const saveBtn = document.getElementById("btn-submit");

    if (!saveBtn) return;

    saveBtn.addEventListener("click", (e) => {
        e.preventDefault(); 
        savePersonalization(statusEl, noteEl, ratingEl, posterEl);
    });
});

function savePersonalization(statusEl, noteEl, ratingEl, posterEl) {
    const rawMovie = localStorage.getItem("personalizing");
    if (!rawMovie) {
        console.error("No movie to personalize");
        alert("No movie selected to personalize.");
        return;
    }

    const movie = JSON.parse(rawMovie);

    const favoriteRadio = document.querySelector('input[name="favorite"]:checked');
    const isFavorite = favoriteRadio ? favoriteRadio.value === "true" : false;

    movie.watchStatus = statusEl.value;
    movie.customNotes = noteEl.value;
    movie.isFavorite = isFavorite;
    movie.customRating = ratingEl.value ? Number(ratingEl.value) : null;

    const file = posterEl.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            movie.customPoster = reader.result;
            storeMovie(movie, isFavorite);
        };
        reader.readAsDataURL(file);
    } else {
        storeMovie(movie, isFavorite);
    }
}

function storeMovie(movie, isFavorite) {
    const stored = localStorage.getItem("personalized");
    const personalized = stored ? JSON.parse(stored) : [];
    personalized.push(movie);
    localStorage.setItem("personalized", JSON.stringify(personalized));
    localStorage.removeItem("personalizing");

    if (isFavorite) {
        const storedFav = localStorage.getItem("moviehub_favorites");
        const favoriteMovies = storedFav ? JSON.parse(storedFav) : [];
        favoriteMovies.push(movie);
        localStorage.setItem("moviehub_favorites", JSON.stringify(favoriteMovies));
    }

    alert("Movie saved successfully!");
    console.log("Movie personalized successfully");
    window.location.href = "personalized.html";
}
