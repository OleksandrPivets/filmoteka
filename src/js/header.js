import { refs } from './variables.global';

refs.libraryBtn.addEventListener('click', function (event) {
    refs.header.classList.add('header-library');
    refs.homeBtn.classList.remove('current');
    refs.libraryBtn.classList.add('current');
    refs.headerFormBox.classList.add('is-hidden');
    refs.headerButtonBox.classList.remove('is-hidden');
    refs.searchForm.classList.add('form-search__border');
    event.preventDefault();
});
refs.homeBtn.forEach(element => element.addEventListener('click',function(){
    refs.header.classList.remove('header-library');
    refs.searchForm.classList.remove('form-search__border');
    refs.libraryBtn.classList.remove('current');
    refs.homeBtn.classList.add('current');
    refs.headerFormBox.classList.remove('is-hidden');
    refs.headerButtonBox.classList.add('is-hidden');
}));
