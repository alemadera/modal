import { fetchAllMovies } from './api.js';
import { toggleModal } from './modal-info.js';
import { addToWatched, addToQueue } from './add-movie.js';

const galleryList = document.getElementById('gallery-list');
const firstModal = document.querySelector('li[first-modal]');

fetchAllMovies().then(data => {
  firstModal.classList.add('is-hidden');
  data.results.forEach(element => {
    galleryList.innerHTML += `
    <li class="gallery__item">
        <div class="gallery__container"  id=${element.id} data-modal-open="">
            <img
                class="gallery__img"
                src="https://image.tmdb.org/t/p/original${element.poster_path}"
                alt="${element.media_type}"
            />
            </div>
                <div class="gallery__description">
                <h3 class="gallery__title" style="font-style:uppercase">${element.title}</h3>
                <p class="gallery__subtitle">${element.genre_ids} | </p>
            </div>
        </div>
    </li>`;
 
  });
});

galleryList.addEventListener('click', event => {
  const movieId = event.target.closest('.gallery__container').id;
  const modalButtonWatched = document.getElementById('watched-list');
  const modalButtonQueue = document.getElementById('queue-list');

  modalButtonWatched.dataset.movieId = movieId;
  modalButtonQueue.dataset.movieId = movieId;

  toggleModal(event.target.offsetParent.id);

/*fetchSameMovies('tears', 1);
fetchMovieDetails(1217605);
*/
});
document.addEventListener('click', event => {
  if (event.target.matches('#watched-list')) {
    const movieId = event.target.dataset.movieId;
    addToWatched(movieId);
  } else if (event.target.matches('#queue-list')) {
    const movieId = event.target.dataset.movieId;
    addToQueue(movieId);
  }
});