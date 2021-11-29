import { apiService, refs } from './variables.global';
import { getQueue, getWatched } from './LocalStorage';
import galleryItems from '../templates/card.hbs';
import prepareForShow from './prepareForShow';
import delayIndicator from './delayIndicator';
import cardPerPage from './cardPerPage'
import { renderLibraryPagesList } from './pagination'

export async function renderWatched() {
  const watchedIds = getWatched(1, cardPerPage());
  const totalPages = watchedIds.pages;
  const watchedMovies = await getLibraryMovies(watchedIds);
  refs.movieGallery.innerHTML = '';
  renderLibraryPagesList(totalPages);
  refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(watchedMovies));
  console.log(watchedMovies);
  // Добавляем индикатор задержки загрузки
  const onLoadGallery = document.querySelectorAll('.film__card');
  delayIndicator(onLoadGallery, 'film__link', 'film__img', false);
  // Показываем VOTE в карточке фильмЫ
  document.querySelectorAll('.film__vote_average').forEach(element => {
    element.classList.remove('is-hidden');
  });
  if (!refs.watchedBtn.classList.contains('active-button')) {
    refs.watchedBtn.classList.add('active-button');
    refs.queueBtn.classList.remove('active-button');
  }
}
  
export async function renderQueue() {
  const queueIds = getQueue(1, cardPerPage());
  const totalPages = queueIds.pages;
  const queueMovies = await getLibraryMovies(queueIds);
  refs.movieGallery.innerHTML = '';
  renderLibraryPagesList(totalPages);
  refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(queueMovies));
  console.log(queueMovies);
  // Добавляем индикатор задержки загрузки
  const onLoadGallery = document.querySelectorAll('.film__card');
  delayIndicator(onLoadGallery, 'film__link', 'film__img', false);
  // Показываем VOTE в карточке фильмЫ
  document.querySelectorAll('.film__vote_average').forEach(element => {
    element.classList.remove('is-hidden');
  });
  if (!refs.queueBtn.classList.contains('active-button')) {
    refs.queueBtn.classList.add('active-button');
    refs.watchedBtn.classList.remove('active-button');
  }
}

async function getLibraryMovies(ids) {
  const movies = await Promise.all(
    ids.list.map(async function getWatchedMovie(id) {
      const movie = await apiService.getMovieById(id);
      prepareForShow(movie);
      return movie;
    }),
  );
  return movies;
}
