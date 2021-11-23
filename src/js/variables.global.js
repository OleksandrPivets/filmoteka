//  В этот файл добавляем только глобальные переменные которые будут использоваться в нескольких модулях.
//  Локальные для модуля пишите в модуле
//  Желательно подписывать комментами что это такое и для чего

//  Тут импорты
import ApiService from './apiService';


//  Тут переменные
export const apiService = new ApiService(); //  Апишка











//  Ниже ссылки на обьекты DOM-дерева 
export const refs = {
    navList: document.querySelector('[data-navigation]'),
    homeBtn: document.querySelectorAll('[data-home]'),                     //  Просьба добавить эти два атрибута на кнопки в хедере
    libraryBtn: document.querySelector('[data-library]'),               //  Просьба добавить эти два атрибута на кнопки в хедере
    movieGallery: document.querySelector('[data-movie-gallery]'),       //  Этот атрибут повесить на галерею
    searchForm: document.querySelector('#form-search'),
    searchInput: document.querySelector('.search-input'),
    header: document.getElementById('header'),
    headerFormBox: document.getElementById('form-box'),
    headerButtonBox: document.getElementById('button-box'),
    watchedBtn: document.querySelector('[data-watched]'),
    queueBtn: document.querySelector('[data-queue]'),
}