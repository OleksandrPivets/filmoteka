import ApiService from './js/apiService';
const apiService = new ApiService();
async function getTrendingMovies() {
  apiService.setPage(5);
    const result = await apiService.getTrendingMovies();
    const genres = await apiService.getGenres();
    console.log(result);
    console.log(genres);
}
getTrendingMovies();