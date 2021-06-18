
import SearchApiTrend from "./apiTrendService.js";

import trendMovieTpl from '../templates/trendfilm-cards.hbs';

const refs = {
    trendContainer: document.querySelector('.js-trend-list'),
}

SearchApiTrend.fetchtrend().then(results => {
    renderMovies(results)
});

function renderMovies(results) {
    // console.log(results);
    const markUp = trendMovieTpl(results);
    fetchGenres();
    refs.trendContainer.insertAdjacentHTML('beforeend',markUp);
}

function fetchGenres() {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=61153224aaaa08b03f5d3b14add082d2&language=en-US')
    .then(r => r.json())
    .then(({ genres }) => genres )
}

console.log(trendMovieTpl)









