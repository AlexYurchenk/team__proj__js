
import SearchApiTrend from "./apiTrendService.js";

import trendMovieTpl from '../templates/trendfilm-cards.hbs';

const refs = {
    trendContainer: document.querySelector('.js-trend-list'),
}

SearchApiTrend.fetchtrend().then(results => {
    renderMovies(results)
});

function renderMovies(results) {
    console.log(results);
    const markUp = trendMovieTpl(results);
    refs.trendContainer.insertAdjacentHTML('beforeend',markUp);
}

