import { apiService, refs } from './variables.global';
import movieInfoTmp from '../templates/movie-info.hbs';
import delayIndicator from './delayIndicator';
import {
  getQueue,
  getWatched,
  checkIfInQueue,
  checkIfInWatched,
  removeFromQueue,
  removeFromWatched,
  addToQueue,
  addToWatched,
} from './LocalStorage';

const modalRefs = {
  lightboxEl: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightboxOverlayEl: document.querySelector('.lightbox__overlay'),
  movieInfo: document.querySelector('.movie-info'),
  movieImg: document.querySelector('[data-movie-img]'),
};

refs.movieGallery.addEventListener('click', onImageClick);
modalRefs.closeModalBtn.addEventListener('click', onCloseBtnClick);
modalRefs.lightboxOverlayEl.addEventListener('click', onOverlayClick);

function onImageClick(event) {
  const isGalleryImage = event.target.classList.contains('film__img');
  if (!isGalleryImage) {
    return;
  }
  const movieCard = event.target.closest('li');
  const movieId = movieCard.dataset.id;
  event.preventDefault();
  window.addEventListener('keydown', onEscKeyPress);
  modalRefs.lightboxEl.classList.add('is-open');
  renderMovieInfo(movieId);
}

function onCloseBtnClick() {
  window.removeEventListener('keydown', onEscKeyPress);
  modalRefs.movieInfo.innerHTML = '';
  modalRefs.lightboxEl.classList.remove('is-open');

  modalRefs.button_queue.removeEventListener('click', addToQueue);
  modalRefs.button_watched.removeEventListener('click', addToWatched);
}

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseBtnClick();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseBtnClick();
  }
}

async function renderMovieInfo(id) {
  const movieInfo = await apiService.getMovieById(id);
  console.log(movieInfo);
  modalRefs.movieImg.src = `${movieInfo.poster_path}`;
  modalRefs.movieInfo.insertAdjacentHTML('beforeend', movieInfoTmp(movieInfo));
  // Добавляем индикатор задержки загрузки
  const onLoadObj = document.querySelectorAll('.lightbox__content');
  delayIndicator(onLoadObj,'classToInsertCodeAfter', 'movie-img', true);
  
  //Adding EventListeners
  modalRefs.button_watched = document.querySelector('.button-watched');
  modalRefs.button_queue = document.querySelector('.button-queue');
  modalRefs.button_queue.addEventListener('click', addToQueue);
  modalRefs.button_watched.addEventListener('click', addToWatched);
}
