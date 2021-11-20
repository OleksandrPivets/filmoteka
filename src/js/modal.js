const listEl = document.querySelector('.gallery__list');
const lightboxEl = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const lightboxOverlayEl = document.querySelector('.lightbox__overlay');

listEl.addEventListener('click', onImageClick);
closeModalBtn.addEventListener('click', onCloseBtnClick);
lightboxOverlayEl.addEventListener('click', onOverlayClick);

function onImageClick(event) {
  event.preventDefault();

  window.addEventListener('keydown', onEscKeyPress);

  const isGalleryImage = event.target.classList.contains('card-img');
  console.log(event.target);

  if (!isGalleryImage) return;

  lightboxEl.classList.add('is-open');
}

function onCloseBtnClick() {
  window.removeEventListener('keydown', onEscKeyPress);

  lightboxEl.classList.remove('is-open');
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
