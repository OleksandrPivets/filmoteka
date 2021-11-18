const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'a2131ad5d6a3f97436f48b66c08b88ca';
export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async getTrendingMovies() {
    const url = `${BASE_URL}/trending/movie/day?page=${this.page}&api_key=${API_KEY}`;
    const response = await fetch(url);
    const result = await response.json();
    result.results.map(movie => {
      movie.backdrop_path = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
    });
    return result;
  }
  async searchMovie() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}&include_adult=false`;
    const response = await fetch(url);
    const result = await response.json();
    result.results.map(movie => {
      movie.backdrop_path = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
    });
    return result;
  }
  async getMovieById(id) {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
    const response = await fetch(url);
    const result = await response.json();
    result.backdrop_path = 'https://image.tmdb.org/t/p/w500' + result.backdrop_path;
    return result;
  }
  async getGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    const response = await fetch(url);
    return await response.json();
  }
  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 1;
  }

  setPage(page) {
    this.page = page;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}