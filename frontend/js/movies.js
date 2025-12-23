const API_KEY = "3f16a76f"
const BASE_URL = "http://www.omdbapi.com/"


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
    }

    async getMovieDetails(id) {
        const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
        const data = await res.json();

        if (data.Response === "False") {
            console.log(data.Error);
            return null;
        }

        return data;
    }

    async searchByTitle(title) {
        const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}`);
        const data = await res.json();

        if (data.Response === "False") {
            console.log(data.Error);
            this.result = [];
            return this; 
        }

        this.result = [];

        for (const movie of data.Search) {
            const movieDetail = await this.getMovieDetails(movie.imdbID);
            if (movieDetail) this.result.push(movieDetail);
        }

        this.filtered = [];
        return this; 
    }

    filterByYear(minYear) {
        const source = this.filtered.length ? this.filtered : this.result;

        this.filtered = source.filter(m => {
            if (!m.Year) return false;
            const parts = m.Year.split("-");
            const startYear = Number(parts[0]);
            return !isNaN(startYear) && startYear >= minYear;
        });

        return this;
    }

    filterByGenre(genre) {
        const source = this.filtered.length ? this.filtered : this.result;

        this.filtered = source.filter(m => {
            if (!m.Genre) return false;
            return m.Genre.split(", ").includes(genre);
        });

        return this;
    }

    filterByRating(rating) {
        const source = this.filtered.length ? this.filtered : this.result;

        this.filtered = source.filter(m => {
            if (!m.imdbRating || m.imdbRating === "N/A") return false;
            return Number(m.imdbRating) >= rating;
        });

        return this;
    }

    getMovies() {
        return this.filtered.length ? this.filtered : this.result;
    }
}


