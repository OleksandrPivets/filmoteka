import { apiService, refs } from './variables.global';
import genres from '../db/genres.json';
// import galleryItems from '../templates/movie-card.hbs'; // << уже не нужно
import galleryItems from '../templates/card.hbs'


export async function renderTrending() {
    const trending = await apiService.getTrendingMovies();
    refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(trending.results));
    console.log(trending);
    console.log(genres);
    
}

async function renderSearchResults(searchQuery) {
    apiService.searchQuery = searchQuery;
    if (apiService.searchQuery === '') {
        return;
    }
    const searchResults = await apiService.searchMovie();
    const movies = searchResults.results;
    refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(movies));
    console.log(searchResults);
    console.log(movies);
}

export const renderHome = (event) => {
    event.preventDefault();
    apiService.resetPage();
    refs.movieGallery.innerHTML = '';
    renderTrending();
    
}

const search = (event) => {
    let submitter = event.submitter;
    let searchQuery = refs.searchInput.value;

    if (submitter) {
        event.preventDefault();
        apiService.resetPage();
        refs.movieGallery.innerHTML = '';
        if (searchQuery === '') {
            return
        }
        renderSearchResults(searchQuery);
    }
};

const removeAutoLoad = () => {
    setTimeout(() => {
        document.removeEventListener('DOMContentLoaded', renderTrending);
    }, 1000)
}

//  Пока не доделано. Для доделки и переделки нужен пагинатор

document.addEventListener('DOMContentLoaded', renderTrending);

removeAutoLoad();

refs.searchForm.addEventListener('submit', search);
// refs.homeBtn.forEach(btn => btn.addEventListener('click', renderHome));