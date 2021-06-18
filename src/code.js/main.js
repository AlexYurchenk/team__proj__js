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
    .then( a => {
        let temp = {};
        for(let e of a){
            temp[e.id] = e.name;
        }
        for(let i = 0; i < results.length; i++){
            results[i].genre_ids = results[i].genre_ids.map( gen => temp[gen])
        }

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

