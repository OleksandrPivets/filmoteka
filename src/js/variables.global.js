//  В этот файл добавляем только глобальные переменные которые будут использоваться в нескольких модулях.
//  Локальные для модуля пишите в модуле
//  Желательно подписывать комментами что это такое и для чего

//  Тут импорты
import ApiService from './apiService';

//  Тут переменные
export const apiService = new ApiService(); //  Апишка
export const breakpoints = {
  // it, as is
  mobile: 320,
  tablet: 768,
  desktop: 1024,
};

//  Ниже ссылки на обьекты DOM-дерева
export const refs = {
  navList: document.querySelector('[data-navigation]'),
  homeBtn: document.querySelectorAll('[data-home]'), //  Просьба добавить эти два атрибута на кнопки в хедере
  libraryBtn: document.querySelector('[data-library]'), //  Просьба добавить эти два атрибута на кнопки в хедере
  movieGallery: document.querySelector('[data-movie-gallery]'), //  Этот атрибут повесить на галерею
  searchForm: document.querySelector('#form-search'),
  searchInput: document.querySelector('.search-input'),
  header: document.getElementById('header'),
  headerFormBox: document.getElementById('form-box'),
  headerButtonBox: document.getElementById('button-box'),

  paginationList: document.querySelector('.pagination-box'),
  pageList: document.querySelector('.pages'),
  lastBtn: document.getElementById('last-page'),
  prevBtn: document.getElementById('button-prev'),
  nextBtn: document.getElementById('button-next'),
  firstPage: document.querySelector('.first'),
  lastPage: document.querySelector('.last'),

  watchedBtn: document.querySelector('[data-watched]'),
  queueBtn: document.querySelector('[data-queue]'),
  btnFooterEl: document.querySelector('.footer__link'),
  footerBackdropEl: document.querySelector('#footer-backdrop'),
  closeModalTeamBtn: document.querySelector('[data-action="close-modal-team"]'),

  bodyEl: document.querySelector('body'),
  lightbox: document.querySelector('.lightbox__content'),
  checkboxEl:document.querySelector('.theme-switch__toggle'),
};
