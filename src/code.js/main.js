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
    fetchGenres()
    .then( genres => {
        let template = {};
        for(let genre of genres){
            template[genre.id] = genre.name;
        }
        results.forEach(result => {
            result.genre_ids = result.genre_ids.map( genre => template[genre])
        });


        const markUp = trendMovieTpl(results);
        refs.trendContainer.insertAdjacentHTML('beforeend',markUp);
    })

}

function fetchGenres() {
   return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=61153224aaaa08b03f5d3b14add082d2&language=en-US%27')
    .then(r => r.json())
    .then(({ genres }) => {
        console.log(genres);
        return genres;
    })
}

