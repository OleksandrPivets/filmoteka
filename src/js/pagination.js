import { apiService, PAGIN_MODES, refs } from "../js/variables.global";
import { renderTrending, renderSearchResults } from './main-page-rendering';
import { renderQueue, renderWatched } from './library-rendering';



export default class Paginator {
  constructor() {
    this.currentPage = 1;
    this.totalPages = 1;
    this.pageRange = 2;
    this.mode = '';
    
  }
  
  renderPagesList(page, totalPages, mode) {
    if (totalPages === 1) {
      refs.paginationRef.classList.add('is-hidden');
      return;
    } else {
      if (refs.paginationRef.classList.contains('is-hidden')) {
        refs.paginationRef.classList.remove('is-hidden');
      }
    }
    this.currentPage = page;
    this.totalPages = totalPages;
    this.mode = mode;
    const start = this.currentPage - this.pageRange;
    const end = this.currentPage + this.pageRange;
    refs.pageList.innerHTML = '';

    for (let i = start; i <= end; i++){
      if (i > 0 && i <= this.totalPages) {
        refs.pageList.insertAdjacentHTML(
          'beforeend',
          `<li class="pages-item"><button type="button" class="pagination-btn">${i}</button></li>`
        );
      }
    }
    refs.lastBtn.textContent = this.totalPages;
    this.isHideBtn(page);
    this.activeBtn(page);
    this.hideFirstLstBtn(page);
  }

  onBtnClick(e) {
    e.preventDefault();

    if (e.target.nodeName !== 'BUTTON') {
      return;
    };
    this.currentPage = Number(e.target.textContent);
    this.render();
  }
  onPrevBtnClick(e) {
    e.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
      this.render();
    }
  }

  onNextBtnClick(e) {
    e.preventDefault();

    if (this.currentPage !== this.totalPages) {
      this.currentPage++;
    };
    this.render();
  }

  isHideBtn(page) {
    if (page = 1) {
      refs.prevBtn.disabled = true;
    } else {
      refs.prevBtn.disabled = false;
    };

    if (page === this.totalPages) {
      refs.nextBtn.disabled = true;
    } else {
      refs.nextBtn.disabled = false;
    };
  }

  activeBtn(page) {
    let pagesItem = refs.pageList.querySelectorAll('button');
    for (let i = 0; i < pagesItem.length; i++){
      if (Number(pagesItem[i].textContent) === page) {
        pagesItem[i].classList.add('active-btn');
      } else if (
        Number(pagesItem[i].textContent) !== page &&
        pagesItem[i].classList.contains('active-btn')) {
        pagesItem[i].classList.remove('active-btn')
      };
    }
  }
  hideFirstLstBtn(page) {
    if (page < 4) {
      refs.firstPage.hidden = true;
    } else {
      refs.firstPage.hidden = false;
    };
    if (page > this.totalPages - 3) {
      refs.lastPage.hidden = true;
    } else {
      refs.lastPage.hidden = false;
    };
  }

  scrollPage() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      block: 'end',
    });
  }

  render() {
    refs.movieGallery.innerHTML = '';
    refs.pageList.innerHTML = '';
    this.scrollPage();
    if (this.mode === PAGIN_MODES.TREND) {
      apiService.setPage(this.currentPage);
      renderTrending();
      return;
    } else if (this.mode === PAGIN_MODES.SEARCH) {
      apiService.setPage(this.currentPage);
      renderSearchResults(apiService.query);
      return;
    } else if (this.mode === PAGIN_MODES.WATCHED) {
      renderWatched(this.currentPage);
      return;
    } else if (this.mode === PAGIN_MODES.QUEUE) {
      renderQueue(this.currentPage);
      return;
    }
  }
}