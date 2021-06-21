import ApiTrendService from "./apiTrendService.js";
import ApiTrendMovies from "./main.js";
import trendMovieTpl from '../templates/trendfilm-cards.hbs';

const refs = {
    libraryLink:document.querySelector('.js-nav__item'),
    button:document.querySelector('.btn-list'),
    trendContainer: document.querySelector('.js-trend-list'),
    headerInput: document.querySelector('.js-header__input'),

    
    btnShowWatched: document.querySelector('.btn-watched'),
    btnShowQueue: document.querySelector('.btn-queue'),
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
 
refs.btnShowWatched.addEventListener('click', e => {    
    document.querySelectorAll('.list__item').forEach(li => li.remove())
    const watchedCollection = JSON.parse(localStorage.getItem('watched'))
    fetchPersonsCollectionMovies(watchedCollection)
    refs.btnShowWatched.disabled = true
    refs.btnShowQueue.disabled = false
});

refs.btnShowQueue.addEventListener('click', e => {
    document.querySelectorAll('.list__item').forEach(li => li.remove())
    const queueCollection = JSON.parse(localStorage.getItem('queue'))
    fetchPersonsCollectionMovies(queueCollection)
    refs.btnShowQueue.disabled = true
    refs.btnShowWatched.disabled = false
});

function fetchPersonsCollectionMovies(e) {
    const moviesCollection = e;
    console.log('moviesCollection', moviesCollection)
    
    moviesCollection.forEach(movie_id => {
        console.log('id', movie_id)
        fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=44d74a10460e9a32f8546bed31d47780&language=en-US`)
            .then(res => {
            console.log(res)
            if (res.ok) {
            console.log('res.json ',res)
            return res.json()
            }
        })
        .then(res => {
            console.log('markUp ', res)
            const markUp = trendMovieTpl([res]);
            refs.trendContainer.insertAdjacentHTML('beforeend', markUp);
        })
    })
}

