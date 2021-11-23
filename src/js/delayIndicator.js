import beautiSpinner from '../templates/spiner';

// Индикатор задержки загрузки
export default function delayIndicator(array, classConteiner, classImg, permit) {

  array.forEach(element => {
    // если разметки нет то
    if (!element.getElementsByClassName('delay-indicator')[0]) { 
      // вставляем разметку индикатора в HTML 
      const cardItem = element.getElementsByClassName(classConteiner)[0];
      cardItem.insertAdjacentHTML('afterbegin', beautiSpinner());
      permit = true;
    };
    // анализируем код и
    const delayIndicator = element.getElementsByClassName('delay-indicator')[0];
    const imgPhoto = element.getElementsByClassName(classImg)[0];

    if (permit) {
      delayIndicator.classList.remove('is-hidden'); // показываем индикатор
      imgPhoto.onload = function () { // ловим событие окончания загрузки
        delayIndicator.classList.add('is-hidden'); // посмотрели и хватит
      };
      permit = false; // Все для вас на одн раз (с)Борис Зубков, Евгений Муслин "Непрочный, непрочный, непрочный мир..."
    };
  });
};