import { apiService, refs } from './variables.global';
import { getQueue, getWatched } from './LocalStorage';
import galleryItems from '../templates/card.hbs';

export async function renderWatched() {
    const watchedIds = getWatched();
    const watchedMovies = await getLibraryMovies(watchedIds);
    refs.movieGallery.innerHTML = '';
    refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(watchedMovies));
    console.log(watchedMovies)
    if (!refs.watchedBtn.classList.contains('active-button')) {
        refs.watchedBtn.classList.add('active-button');
        refs.queueBtn.classList.remove('active-button');
    }
};

export async function renderQueue(){
    const queueIds = getQueue();
    const queueMovies = await getLibraryMovies(queueIds);
    refs.movieGallery.innerHTML = '';
    refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(queueMovies));
    console.log(queueMovies);
    if (!refs.queueBtn.classList.contains('active-button')) {
        refs.queueBtn.classList.add('active-button');
        refs.watchedBtn.classList.remove('active-button');
    }
};

async function getLibraryMovies(ids) {
    const movies = await Promise.all(
        ids.map(async function getWatchedMovie(id) {
        const movie = await apiService.getMovieById(id);
        return movie;
    }))
    return movies;
};

