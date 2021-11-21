// Выводим значение
export default function showResult(array) {
  if (array.length === 0) {
    // ansver = false; // если ничего не пришло в ответе
    return
  };
  if (array.genres.length === 0) { 
    array.genres[0] = 'Other'; // если нет данных
  }  
  if (array.genres.length >= 3) {
    array.genres = array.genres.slice(0, 2);  // делаем обрезание ;-))

    array.genres[2] = 'Other';
  }
  array.genreShow = array.genres.join(', '); // дорисовываем запятые
  array.release_year = array.release_date.substring(0, 4); // делаем год релиза

  // Добавляем новую разметку для элементов
  // const markup = filmTemplate(array);

  // refs.elementContainer.insertAdjacentHTML('beforeend', markup);
  // ansver = true;
  return array;
};