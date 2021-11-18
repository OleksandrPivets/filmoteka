import './sass/main.scss'

import { apiService } from './js/variables.global'
import ApiService from './js/apiService';


async function getTrendingMovies() {
  apiService.setPage(5);
    const result = await apiService.getTrendingMovies();
    const genres = await apiService.getGenres();
    console.log(result);
    console.log(genres);
}
getTrendingMovies();

