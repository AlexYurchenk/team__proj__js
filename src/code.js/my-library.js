import ApiTrendService from "./apiTrendService.js";
import ApiTrendMovies from "./main.js";
import trendMovieTpl from '../templates/trendfilm-cards.hbs';

const refs = {
    libraryLink:document.querySelector('.js-nav__item'),
    button:document.querySelector('.btn-list'),
    trendContainer: document.querySelector('.js-trend-list'),
    headerInput: document.querySelector('.js-header__input'),
}

refs.libraryLink.addEventListener('click', onMyLibraryClick);

function onMyLibraryClick(e) {
 e.preventDefault();
 refs.button.classList.remove('none');
 refs.headerInput.classList.add('none');


 ApiTrendService.fetchtrend().then(results => {
    renderMovies(results)
 })
}

ApiTrendService.fetchtrend();

function renderMovies(results) {
    // console.log(results);
    fetchGenres()
    .then( genres => {

        results.forEach(result => {
            result.genre_ids = result.genre_ids.map( genre => genres[genre])
            result.release_date = result.release_date.slice(0,4)
        });

        const markUp = trendMovieTpl(results);
        refs.trendContainer.insertAdjacentHTML('beforeend',markUp);
      
    })
}

function fetchGenres() {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=61153224aaaa08b03f5d3b14add082d2&language=en-US%27')
     .then(r => r.json())
     .then(({ genres }) => {
         let temp = {};
         for(let genre of genres){
             temp[genre.id] = genre.name;
         };
         return temp;
     })
 }