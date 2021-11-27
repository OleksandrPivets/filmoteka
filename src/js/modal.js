import { apiService, refs } from './variables.global';
import movieInfoTmp from '../templates/movie-info.hbs';
import delayIndicator from './delayIndicator';
import prepareForShow from './prepareForShow';
import {
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

  const breakScrol = refs.forBreakScrol;
  breakScrol.style.overflov = "hidden";
  // console.log(breakScrol)

  renderMovieInfo(movieId);
}

function onCloseBtnClick() {
  window.removeEventListener('keydown', onEscKeyPress);
  modalRefs.movieInfo.innerHTML = '';
  modalRefs.lightboxEl.classList.remove('is-open');

  modalRefs.button_queue.removeEventListener('click', onAddQueueClick);
  modalRefs.button_watched.removeEventListener('click', onAddWatchedClick);
  modalRefs.button_queue.removeEventListener('click', onRemoveQueueClick);
  modalRefs.button_watched.removeEventListener('click', onRemoveWatchedClick);
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
  prepareForShow(movieInfo);
  modalRefs.movieImg.src = `${movieInfo.poster_path}`;
  modalRefs.movieInfo.insertAdjacentHTML('beforeend', movieInfoTmp(movieInfo));

  // Добавляем индикатор задержки загрузки
  if (movieInfo.poster_path) {
    // якщо нема постера - дзуськи!
    const onLoadObj = document.querySelectorAll('.lightbox__content');
    delayIndicator(onLoadObj, 'classToInsertCodeAfter', 'movie-img', true);
  }

  //Adding EventListeners
  modalRefs.button_watched = document.querySelector('.button__watched');
  modalRefs.button_queue = document.querySelector('.button__queue');
  if (checkIfInQueue(id)) {
    modalRefs.button_queue.textContent = 'delete from queue';
    modalRefs.button_queue.addEventListener('click', onRemoveQueueClick);
  } else {
    modalRefs.button_queue.addEventListener('click', onAddQueueClick);
  }
  if (checkIfInWatched(id)) {
    modalRefs.button_watched.textContent = 'delete from watched';
    modalRefs.button_watched.addEventListener('click', onRemoveWatchedClick);
  } else {
    modalRefs.button_watched.addEventListener('click', onAddWatchedClick);
  }
}

function onRemoveWatchedClick(event) {
  removeFromWatched(event);
  modalRefs.button_watched.textContent = 'add to watched';
  modalRefs.button_watched.addEventListener('click', onAddWatchedClick);
  modalRefs.button_watched.removeEventListener('click', onRemoveWatchedClick);
}
function onRemoveQueueClick(event) {
  removeFromQueue(event);
  modalRefs.button_queue.textContent = 'add to queue';
  modalRefs.button_queue.addEventListener('click', onAddQueueClick);
  modalRefs.button_queue.removeEventListener('click', onRemoveQueueClick);
}
function onAddWatchedClick(event) {
  addToWatched(event);
  modalRefs.button_watched.textContent = 'delete from watched';
  modalRefs.button_watched.addEventListener('click', onRemoveWatchedClick);
  modalRefs.button_watched.removeEventListener('click', onAddWatchedClick);
}
function onAddQueueClick(event) {
  addToQueue(event);
  modalRefs.button_queue.textContent = 'delete from queue';
  modalRefs.button_queue.addEventListener('click', onRemoveQueueClick);
  modalRefs.button_watched.removeEventListener('click', onAddQueueClick);
}
