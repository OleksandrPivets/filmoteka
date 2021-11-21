import { apiService, refs } from './variables.global';
import movieInfoTmp from '../templates/movie-info.hbs'

const modalRefs = {
  lightboxEl: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightboxOverlayEl: document.querySelector('.lightbox__overlay'),
  movieInfo: document.querySelector('.movie-info'),
  movieImg: document.querySelector('[data-movie-img]'),
}

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
  renderMovieInfo(movieId)
}

function onCloseBtnClick() {
  window.removeEventListener('keydown', onEscKeyPress);
  modalRefs.movieInfo.innerHTML = '';
  modalRefs.lightboxEl.classList.remove('is-open');
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
  console.log(movieInfo)
  modalRefs.movieImg.src = `${movieInfo.poster_path}`;
  modalRefs.movieInfo.insertAdjacentHTML('beforeend', movieInfoTmp(movieInfo));
}