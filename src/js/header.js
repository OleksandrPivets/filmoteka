import { refs } from './variables.global';
import { renderHome } from './main-page-rendering';
import { renderQueue, renderWatched } from './library-rendering';

function openLibrary (event) {
    refs.header.classList.add('header-library');
    refs.homeBtn.forEach(btn => {
        if (btn.classList.contains('home')) {
            btn.classList.remove('current')           
        }
    });
    refs.libraryBtn.classList.add('current');
    refs.headerFormBox.classList.add('is-hidden');
    refs.headerButtonBox.classList.remove('is-hidden');
    refs.searchForm.classList.add('form-search__border');
    event.preventDefault()
    renderWatched()
    refs.watchedBtn.addEventListener('click', renderWatched);
    refs.queueBtn.addEventListener('click', renderQueue);
}

function openHome(){
    refs.header.classList.remove('header-library');
    refs.searchForm.classList.remove('form-search__border');
    refs.libraryBtn.classList.remove('current');
    refs.homeBtn.forEach(btn => {
        if (btn.classList.contains('home')) {
            btn.classList.add('current')            
        }
    });
    refs.headerFormBox.classList.remove('is-hidden');
    refs.headerButtonBox.classList.add('is-hidden');
    refs.watchedBtn.removeEventListener('click', renderWatched);
    refs.queueBtn.removeEventListener('click', renderQueue);
    renderHome();
}

refs.libraryBtn.addEventListener('click', openLibrary);
refs.homeBtn.forEach(btn => btn.addEventListener('click', openHome));
