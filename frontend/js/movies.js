const API_KEY = "3f16a76f";
const BASE_URL = "https://www.omdbapi.com/";

export default class Movie {
    constructor() {
        this.Title = "";
        this.imdbID = "";
        this.BoxOffice = "";
        this.Genre = "";
        this.Language = "";
        this.Poster = "";
        this.imdbRating = "";
        this.Writer = "";
        this.Awards = "";

        this.result = [];
        this.filtered = [];

        this.isFavorite = false;
        this.customNotes = "";
        this.customRating = null;
        this.customPoster = null;
        this.watchStatus = "planned";
    }

    async getMovieDetails(id) {
        try {
            const res = await fetch(
                `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(id)}`
            );
            const data = await res.json();

            if (data.Response === "False") {
                console.error(data.Error);
                return null;
            }

            return data;
        } catch (err) {
            console.error("Failed to fetch movie details:", err);
            return null;
        }
    }

    async searchByTitle(title) {
        try {
            const res = await fetch(
                `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}`
            );
            const data = await res.json();

            this.result = [];
            this.filtered = [];

            if (data.Response === "False") {
                console.error(data.Error);
                return this;
            }

            for (const movie of data.Search) {
                const movieDetail = await this.getMovieDetails(movie.imdbID);
                if (movieDetail) {
                    this.result.push(movieDetail);
                }
            }

            return this;
        } catch (err) {
            console.error("Search failed:", err);
            return this;
        }
    }

    getById(id) {
        const source = this.filtered.length ? this.filtered : this.result;
        return source.find(movie => movie.imdbID === id) || null;
    }

    filterByYear(minYear) {
        const source = this.filtered.length ? this.filtered : this.result;

        this.filtered = source.filter(movie => {
            if (!movie.Year) return false;

            const parts = movie.Year.split("-");
            const startYear = Number(parts[0]);

            return !Number.isNaN(startYear) && startYear >= minYear;
        });

        return this;
    }

    filterByGenre(genre) {
        const source = this.filtered.length ? this.filtered : this.result;

        this.filtered = source.filter(movie => {
            if (!movie.Genre) return false;
            return movie.Genre.split(", ").includes(genre);
        });

        return this;
    }

    filterByRating(rating) {
        const source = this.filtered.length ? this.filtered : this.result;

        this.filtered = source.filter(movie => {
            if (!movie.imdbRating || movie.imdbRating === "N/A") return false;
            return Number(movie.imdbRating) >= rating;
        });

        return this;
    }

    getMovies() {
        return this.filtered.length ? this.filtered : this.result;
    }
}


