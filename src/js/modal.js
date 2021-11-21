import { apiService, refs } from './variables.global';
import movieInfoTmp from '../templates/movie-info.hbs';
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

let buttonModalRefs = {};

refs.movieGallery.addEventListener('click', onImageClick);
modalRefs.closeModalBtn.addEventListener('click', onCloseBtnClick);
modalRefs.lightboxOverlayEl.addEventListener('click', onOverlayClick);

function onImageClick(event) {
  const movieCard = event.target.closest('li');
  const movieId = movieCard.dataset.id;
  event.preventDefault();
  const isGalleryImage = event.target.classList.contains('film__img');
  window.addEventListener('keydown', onEscKeyPress);
  if (!isGalleryImage) {
    return;
  }
  modalRefs.lightboxEl.classList.add('is-open');
  renderMovieInfo(movieId);
}

function onCloseBtnClick() {
  window.removeEventListener('keydown', onEscKeyPress);
  modalRefs.movieInfo.innerHTML = '';
  modalRefs.lightboxEl.classList.remove('is-open');

  buttonModalRefs.button_queue.removeEventListener('click', addToQueue);
  buttonModalRefs.button_watched.removeEventListener('click', addToWatched);
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

  //Adding EventListeners
  buttonModalRefs.button_watched = document.querySelector('.button-watched');
  buttonModalRefs.button_queue = document.querySelector('.button-queue');
  buttonModalRefs.button_queue.addEventListener('click', addToQueue);
  buttonModalRefs.button_watched.addEventListener('click', addToWatched);
}
