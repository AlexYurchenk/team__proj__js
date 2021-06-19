import movieCardTpl from '../templates/trendfilm-cards.hbs';
const API_KEY = '44d74a10460e9a32f8546bed31d47780';
const BASE_URL = 'https://api.themoviedb.org/';

const homeBtn = document.querySelector('.home-js');
const logoBth = document.querySelector('.logo-js');
const moviesList = document.querySelector('.js-trend-list');

homeBtn.addEventListener('click', onHomeLogoBtnClick);
logoBth.addEventListener('click', onHomeLogoBtnClick);

function onHomeLogoBtnClick (event) {
  event.preventDefault();

  fetchMovieCards().then(results => {
    console.log(results);
    moviesList.insertAdjacentHTML('beforeend', movieCardTpl(results));
  });
}

function fetchMovieCards () {
  const url = `${BASE_URL}3/trending/movie/week?api_key=${API_KEY}`;

  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(({ results }) => {
      return results;
    })
    .catch(error => console.log(error));
}
