//  В этот файл добавляем только глобальные переменные которые будут использоваться в нескольких модулях.
//  Локальные для модуля пишите в модуле
//  Желательно подписывать комментами что это такое и для чего

//  Тут импорты
import ApiService from './apiService';


//  Тут переменные
export const apiService = new ApiService(); //  Апишка











//  Ниже ссылки на обьекты DOM-дерева 
export const refs = {
    homeBtn: document.querySelector('[data-home]'),                     //  Просьба добавить эти два атрибута на кнопки в хедере
    libraryBtn: document.querySelector('[data-library]'),               //  Просьба добавить эти два атрибута на кнопки в хедере
    movieGallery: document.querySelector('[data-movie-gallery]')        //  Этот атрибут повесить на галерею


}