import { loadHTML } from "./include.js";

async function initFavoritesPage() {
    await loadHTML("header", "/partials/header.html");
    await loadHTML("footer", "/partials/footer.html");
    

    const favorites = JSON.parse(localStorage.getItem('moviehub_favorites') || '[]');
    const container = document.querySelector('.favorite-list');
    
    if (!container) return;
    
    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="no-favorites">
                <h3>No favorites yet</h3>
                <p>Start adding movies from the Home page!</p>
                <a href="/" class="btn-primary">Browse Movies</a>
            </div>
        `;
        return;
    }
    
  
    favorites.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h4>${movie.Title}</h4>
            <p>${movie.Year} • ${movie.Genre}</p>
            <button class="remove-favorite" data-id="${movie.imdbID}">Remove</button>
        `;
        container.appendChild(movieCard);
    });
    
 
    const searchInput = document.getElementById('favorite-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = container.querySelectorAll('.movie-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                card.style.display = title.includes(term) ? 'block' : 'none';
            });
        });
    }
}

initFavoritesPage();
