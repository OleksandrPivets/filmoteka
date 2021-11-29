import markupMovie from '../templates/card.hbs';
import { apiService, refs } from '../js/variables.global';
import {
  renderOnStart,
  totalPages,
  renderTrending,
  renderSearchResults,
  searchQuerySaved,
} from './main-page-rendering';

// export default refs = {
//   paginationList: document.querySelector('.pagination-box'),
//   pageList: document.querySelector('.pages'),
//   lastBtn: document.getElementById('last-page'),
//   prevBtn: document.getElementById('button-prev'),
//   nextBtn: document.getElementById('button-next'),
//   firstPage: document.querySelector('.first'),
//   lastPage: document.querySelector('.last'),
// }

let currentPage = 1;

const pageRange = 2;

async function renderPagesList(apiPage) {
  currentPage = apiPage;
  refs.pageList.innerHTML = '';
  const start = currentPage - pageRange;
  const end = currentPage + pageRange;

  for (let i = start; i <= end; i += 1) {
    if (i > 0 && i <= totalPages) {
      refs.pageList.insertAdjacentHTML(
        'beforeend',
        `<li class="pages-item"><button type="button" class="pagination-btn">${i}</button></li>`,
      );
    }
  }
}

refs.paginationList.addEventListener('click', onBtnClick);
refs.prevBtn.addEventListener('click', onPrevBtnClick);
refs.nextBtn.addEventListener('click', onNextBtnClick);

function onBtnClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  scrollPage();
  refs.movieGallery.innerHTML = '';
  refs.pageList.innerHTML = '';

  currentPage = Number(e.target.textContent);
  apiService.setPage(currentPage);

  if (apiService.query) {
    renderSearchResults(searchQuerySaved);
  } else {
    renderTrending();
  }
}

function onPrevBtnClick(e) {
  e.preventDefault();

  if (currentPage > 1) {
    currentPage -= 1;
    apiService.setPage(currentPage);
    refs.movieGallery.innerHTML = '';
    refs.pageList.innerHTML = '';

    scrollPage();
  }
  if (apiService.query) {
    renderSearchResults(searchQuerySaved);
  } else {
    renderTrending();
  }
}

function onNextBtnClick(e) {
  e.preventDefault();

  if (currentPage !== totalPages) {
    currentPage += 1;
  }
  scrollPage();
  refs.movieGallery.innerHTML = '';
  refs.pageList.innerHTML = '';
  apiService.setPage(currentPage);
  if (apiService.query) {
    renderSearchResults(searchQuerySaved);
  } else {
    renderTrending();
  }
}
function isHideBtn() {
  if (currentPage === 1) {
    refs.prevBtn.disabled = true;
  } else {
    refs.prevBtn.disabled = false;
  }
  if (currentPage === totalPages) {
    refs.nextBtn.disabled = true;
  } else {
    refs.nextBtn.disabled = false;
  }
}
function activeBtn() {
  let pagesItem = refs.pageList.querySelectorAll('button');
  for (let i = 0; i < pagesItem.length; i += 1) {
    if (Number(pagesItem[i].textContent) === currentPage) {
      pagesItem[i].classList.add('active-btn');
    }
    if (
      Number(pagesItem[i].textContent) !== currentPage &&
      pagesItem[i].classList.contains('active-btn')
    ) {
      pagesItem[i].classList.remove('active-btn');
    }
  }
}

function hideFirstLastBtn() {
  if (currentPage < 4) {
    refs.firstPage.hidden = true;
  } else {
    refs.firstPage.hidden = false;
  }
  if (currentPage > totalPages - 3) {
    refs.lastPage.hidden = true;
  } else {
    refs.lastPage.hidden = false;
  }
}

function scrollPage() {
  refs.header.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

export { renderPagesList, hideFirstLastBtn, isHideBtn, activeBtn };
