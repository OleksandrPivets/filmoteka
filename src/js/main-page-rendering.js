import { apiService, refs } from './variables.global';
import genres from '../db/genres.json';
import galleryItems from '../templates/card.hbs';
import Notiflix from 'notiflix';
import delayIndicator from './delayIndicator';
import { renderPagesList, hideFirstLastBtn, isHideBtn, activeBtn } from './pagination';

export let totalPages;
export let searchQuerySaved;

export async function renderTrending() {
  const trending = await apiService.getTrendingMovies();
  refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(trending.results));
  // Добавляем индикатор задержки загрузки
  const onLoadGallery = document.querySelectorAll('.film__card');
  delayIndicator(onLoadGallery, 'film__link', 'film__img', false);
  console.log(trending);
  console.log(genres);
  renderPagesList(apiService.page);
  hideFirstLastBtn();
  isHideBtn();
  activeBtn();
}

export async function renderSearchResults(searchQuery) {
  apiService.searchQuery = searchQuery;
  apiService.searchQuery = searchQuery.trim();
  //оповещение о пустом инпуте
  if (apiService.searchQuery === '') {
    return Notiflix.Notify.warning('The field is empty! Enter the title of the movie.');
  }

  const searchResults = await apiService.searchMovie();
  const movies = searchResults.results;
  //оповещение о не корректном вводе
  if (!movies.length) {
    return Notiflix.Notify.warning(
      'Search result not successful. Enter the correct movie name and',
    );
  }

  refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(movies));
  // Добавляем индикатор задержки загрузки
  const onLoadGallery = document.querySelectorAll('.film__card');
  delayIndicator(onLoadGallery, 'film__link', 'film__img', false);
  console.log(searchResults);
  console.log(movies);
  if (apiService.page === 1) {
    totalPages = searchResults.total_pages;
    refs.lastBtn.textContent = totalPages;
  }
  renderPagesList(apiService.page);
  hideFirstLastBtn();
  isHideBtn();
  activeBtn();
}

export const renderHome = event => {
  event.preventDefault();
  apiService.resetPage();

  refs.movieGallery.innerHTML = '';
  refs.pageList.innerHTML = '';
  renderTrending();
  activeBtn();
};

const search = event => {
  let submitter = event.submitter;
  let searchQuery = refs.searchInput.value;

  if (submitter) {
    event.preventDefault();
    apiService.resetPage();
    refs.movieGallery.innerHTML = '';
    if (searchQuery === '') {
      return;
    }
    renderSearchResults(searchQuery);
    searchQuerySaved = searchQuery;
  }
};

const removeAutoLoad = () => {
  setTimeout(() => {
    document.removeEventListener('DOMContentLoaded', renderTrending);
  }, 1000);
};

export async function renderOnStart() {
  const trending = await apiService.getTrendingMovies();
  refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(trending.results));
  totalPages = trending.total_pages;
  refs.lastBtn.textContent = totalPages;
  console.log(totalPages);

  renderPagesList(apiService.page);
  hideFirstLastBtn();
  isHideBtn();
  activeBtn();
  const onLoadGallery = document.querySelectorAll('.film__card');
  delayIndicator(onLoadGallery, 'film__link', 'film__img', false);
}

//  Пока не доделано. Для доделки и переделки нужен пагинатор

document.addEventListener('DOMContentLoaded', renderOnStart);

removeAutoLoad();

refs.searchForm.addEventListener('submit', search);
// refs.homeBtn.forEach(btn => btn.addEventListener('click', renderHome));

//Настройка стилей оповещений
Notiflix.Notify.init({
  position: 'center-top',

  fontFamily: 'Roboto',
  fontSize: '14px',
  useIcon: false,

  warning: {
    background: 'none',
    textColor: '#FF001B',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
});
