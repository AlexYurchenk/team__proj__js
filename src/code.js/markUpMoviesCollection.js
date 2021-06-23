import trendMovieTpl from '../templates/trendfilm-cards.hbs';

export default class markUpMoviesCollection {
    constructor({ selector }) {
        this.refs = this.getRefs(selector);
    }

    getRefs(selector) {
        const refs = {};
        refs.button = document.querySelector(selector);
        refs.container = document.querySelector('.js-trend-list');
        refs.firstButton = document.querySelector('.btn-watched');
        refs.secondButton = document.querySelector('.btn-queue');
        return refs;
    }

    fetchPersonsCollectionMovies(e) {
        const moviesCollection = e;
        console.log('moviesCollection', moviesCollection)

        moviesCollection.forEach(movie_id => {
            console.log('id', movie_id)
            fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=44d74a10460e9a32f8546bed31d47780&language=en-US`)
                .then(res => {
                    console.log(res)
                    if (res.ok) {
                        console.log('res.json ', res)
                        return res.json()
                    }
                })
                .then(res => {
                    console.log('markUp ', res)
                    const markUp = trendMovieTpl([res]);
                    this.refs.container.insertAdjacentHTML('beforeend', markUp);
                })
        })
    }
}