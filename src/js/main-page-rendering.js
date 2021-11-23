import { apiService, refs } from './variables.global';
import genres from '../db/genres.json';
// import galleryItems from '../templates/movie-card.hbs'; // << уже не нужно
import galleryItems from '../templates/card.hbs';
import delayIndicator from './delayIndicator';
import { renderPagesList } from './pagination'

export let totalPages;

async function renderTrending() {
  const trending = await apiService.getTrendingMovies();
  refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(trending.results));
  // Добавляем индикатор задержки загрузки
  const onLoadGallery = document.querySelectorAll('.film__card');
  delayIndicator(onLoadGallery, "film__link", 'film__img', false);
  console.log(trending);
  console.log(genres);
  renderPagesList();

}

async function renderSearchResults(searchQuery) {
  apiService.searchQuery = searchQuery;
  if (apiService.searchQuery === '') {
      return;
  }
  const searchResults = await apiService.searchMovie();
  const movies = searchResults.results;
  refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(movies));
  // Добавляем индикатор задержки загрузки
  const onLoadGallery = document.querySelectorAll('.film__card');
  delayIndicator(onLoadGallery, "film__link", 'film__img', false);
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
        document.removeEventListener('DOMContentLoaded', renderOnStart);
    }, 1000)
}

export async function renderOnStart() {
    const trending = await apiService.getTrendingMovies();
    refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(trending.results));
    totalPages = trending.total_pages;
    console.log(totalPages)
    renderPagesList()
    const onLoadGallery = document.querySelectorAll('.film__card');
  delayIndicator(onLoadGallery, "film__link", 'film__img', false);
}

//  Пока не доделано. Для доделки и переделки нужен пагинатор

document.addEventListener('DOMContentLoaded', renderOnStart);

removeAutoLoad();

refs.searchForm.addEventListener('submit', search);
// refs.homeBtn.forEach(btn => btn.addEventListener('click', renderHome));