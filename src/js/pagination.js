import markupMovie from "../templates/card.hbs";
import { apiService, refs } from "../js/variables.global";
import { renderTrending, totalPages } from './main-page-rendering';

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
// let totalPages;
const pageRange = 2;
// setTotalPages();
// async function setTotalPages() {
//   totalPages = await renderOnStart();
//   console.log(totalPages);
// }

async function renderPagesList() {
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

// async function getMoviesCount() {

//   const movies = await apiService.getTrendingMovies();
  
//   console.log('movies: ' + JSON.stringify(movies.page));
//   return movies.length;
// }

// getMoviesCount()



// refs.paginationList.addEventListener('click', onBtnClick);
// refs.prevBtn.addEventListener('click', onPrevBtnClick);
refs.nextBtn.addEventListener('click', onNextBtnClick);

function onNextBtnClick(e) {
  e.preventDefault();
  if (currentPage !== totalPages) {
    currentPage += 1;
    apiService.page = currentPage;
    refs.movieGallery.innerHTML = '';
    renderTrending();
  }
  
  refs.pageList.innerHTML = '';
  // apiServise.setPage(currentPage);
  scrollPage();
}

function scrollPage() {
  try {
    setTimeout(() => {
      window.scrollTo({
        block: 'end',
        behavior: 'smooth',
      });
    }, 500);
  } catch (error) {
    console.log(error);
  }
}

export {
  renderPagesList,
}