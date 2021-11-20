import filmTemplate from './template/card';
import {refs} from './js/refs';


// Выводим значение
export default function showResult(array) {
  if (array.length === 0) {
    // ansver = false; // если ничего не пришло в ответе
    return
  };
  // console.log('page =', searshDate.page) // номер листа в ответе

  // Добавляем новую разметку для элементов
  const markup = filmTemplate(array);
  refs.elementContainer.insertAdjacentHTML('beforeend', markup);
  // searshDate.page += 1;
  // ansver = true;
  // слушаем клик по галлерее
  // refs.galleryList.addEventListener("click", onOpenModal);
  
};