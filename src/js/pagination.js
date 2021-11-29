import markupMovie from "../templates/card.hbs";
import { apiService, refs } from "../js/variables.global";
import { totalPages, renderTrending, renderSearchResults, searchQuerySaved } from './main-page-rendering';

let currentPage = 1;

const pageRange = 2;

function renderPagesList(apiPage) {
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
    refs.lastBtn.textContent = totalPages;    
}

refs.paginationList.addEventListener('click', onBtnClick);
refs.prevBtn.addEventListener('click', onPrevBtnClick);
refs.nextBtn.addEventListener('click', onNextBtnClick);

function onBtnClick(e) {
  e.preventDefault();
  
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
 scrollPage()
  refs.movieGallery.innerHTML = '';
  refs.pageList.innerHTML = '';

  currentPage = Number(e.target.textContent);
  apiService.setPage(currentPage);

  if (apiService.query) {
    renderSearchResults(searchQuerySaved);
  }
  else {
    
  renderTrending()}
}

function onPrevBtnClick(e) {
  e.preventDefault();
 
  if (currentPage > 1) {
    scrollPage();
    currentPage -= 1;
    apiService.setPage(currentPage)
    refs.movieGallery.innerHTML = '';
    refs.pageList.innerHTML = '';
    
    
  }
  if (apiService.query) {
    renderSearchResults(searchQuerySaved);
  }
  else {
    
  renderTrending()}
}

 function onNextBtnClick(e) {
   e.preventDefault();
   
  if (currentPage !== totalPages) {
    currentPage += 1;
    
   }
    scrollPage();
    refs.movieGallery.innerHTML = '';
    refs.pageList.innerHTML = '';
    apiService.setPage(currentPage) 
   if (apiService.query) {
    renderSearchResults(searchQuerySaved);
  }
  else {
    
  renderTrending()}
   
}
function isHideBtn() {
  if (currentPage === 1) {
    refs.prevBtn.disabled = true
  }
  else {refs.prevBtn.disabled = false}
   if (currentPage === totalPages) {
    refs.nextBtn.disabled = true
  }
  else {refs.nextBtn.disabled = false}
 }
function activeBtn() {
let pagesItem = refs.pageList.querySelectorAll('button');
  for (let i = 0; i < pagesItem.length; i += 1) {
    if (Number(pagesItem[i].textContent) === currentPage) {
      pagesItem[i].classList.add('active-btn');
    }
    if (Number(pagesItem[i].textContent) !== currentPage && pagesItem[i].classList.contains('active-btn')) {
        pagesItem[i].classList.remove('active-btn');
      }
    }
  }


function hideFirstLastBtn() {
  if (currentPage < 4) { refs.firstPage.hidden = true }
  else { refs.firstPage.hidden = false };
  if (currentPage > totalPages - 3) { refs.lastPage.hidden = true }
  else { refs.lastPage.hidden = false };
}


function scrollPage() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
    block: 'end',
  });
}

export {
  renderPagesList,
  hideFirstLastBtn,
  isHideBtn,
  activeBtn,
  renderLibraryPagesList,
}

function renderLibraryPagesList(totalPages) {
  currentPage = currentPage;
  refs.pageList.innerHTML = '';
  if (totalPages === 1) {
    refs.paginationList.innerHTML = '';
    refs.nextBtn.innerHTML = '';
    refs.prevBtn.innerHTML = '';
    return;
  }
  
   console.log(refs.lastPage)
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

  hideFirstLastBtn(),
  isHideBtn(),
  activeBtn(),
    refs.lastBtn.textContent = totalPages;  
    if (totalPages < 5) {
    refs.firstPage.hidden = true;
    refs.lastPage.hidden = true;
  }  
}