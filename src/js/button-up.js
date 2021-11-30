import {refs} from './variables.global';
const {buttonUpEl} = refs;

window.addEventListener('scroll', showButtonUp);
buttonUpEl.addEventListener('click', onButtonUpClick);

function showButtonUp() {
  if (window.pageYOffset < document.documentElement.clientHeight) {
    buttonUpEl.classList.add('visually-hidden');
  } else {
    buttonUpEl.classList.remove('visually-hidden');
  }
}

function onButtonUpClick() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}