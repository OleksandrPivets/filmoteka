import ApiService from "./apiService";
import markupMovie from "../templates/movie-card.hbs"

export default refs = {
  paginationList: document.querySelector('.pagination-box'),
  pageList: document.querySelector('.pages'),
  lastBtn: document.getElementById('last-page'),
  prevBtn: document.getElementById('button-prev'),
  nextBtn: document.getElementById('button-next'),
  firstPage: document.querySelector('.first'),
  lastPage: document.querySelector('.last'),
}

const apiService = new ApiService();
let currentPage = 1;
let totalPages;
const pageRange = 2;

function renderPagesList() {
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