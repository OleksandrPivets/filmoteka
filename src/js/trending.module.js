import { apiService, refs } from './variables.global';
import genres from '../db/genres.json'


async function renderTrending() {
    const trending = await apiService.getTrendingMovies();
    // refs.movieGallery.innerHTML = '';
    // refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(trending));
    console.log(trending);
    console.log(genres);
    
}
//  Пока не доделано. Для доделки и переделки нужен темплейт и пагинатор

document.addEventListener('DOMContentLoaded', renderTrending); 
// refs.homeBtn.addEventListener('click', renderTrending);