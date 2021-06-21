import SearchApiTrend from "./apiTrendService.js";

import trendMovieTpl from '../templates/trendfilm-cards.hbs';
import articleTpl from '../templates/modal-card.hbs'

const refs = {
    trendContainer: document.querySelector('.js-trend-list'),

    button:document.querySelector('.btn-list'),

    modal: document.querySelector('.modal'),
    lightbox: document.querySelector('.modal-movie-lightbox'),
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
    overlayModal: document.querySelector('.modal-movie-overlay'),

    btnAddWatched: document.querySelector('[data-name="watched"]'),
    btnAddQueue: document.querySelector('[data-name="queue"]'),
}

SearchApiTrend.fetchtrend().then(results => {
    renderMovies(results)
});

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
        refs.button.classList.add('none');
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
refs.trendContainer.addEventListener('click', onModalFilmCard)

function onModalFilmCard(e) {
    if (e.target.nodeName !== 'IMG') {
        return
    }
    const a = e.target.id
    return fetch(`https://api.themoviedb.org/3/movie/${a}?api_key=44d74a10460e9a32f8546bed31d47780&language=en-US`)
        .then(r => r.json())
        .then(film => {
            console.log(film)

            refs.btnAddWatched.addEventListener('click', e => {
                const watched = JSON.parse(localStorage.getItem('watched')) || [];
                localStorage.setItem('watched', JSON.stringify(watched))
                
                if (localStorage.getItem('watched').includes(JSON.stringify(film.id))) {
                    return
                }
                watched.push(film.id)
                console.log(watched)
                localStorage.setItem('watched', JSON.stringify(watched))

            })

            refs.btnAddQueue.addEventListener('click', e => {
                const queue = JSON.parse(localStorage.getItem('queue')) || [];
                localStorage.setItem('queue', JSON.stringify(queue))

                if(localStorage.getItem('queue').includes(JSON.stringify(film.id))) {
                    return
                }
                queue.push(film.id);
                console.log(queue)
                localStorage.setItem('queue', JSON.stringify(queue))
            })

            return film
        })
        .then(film => {
            const markUp = articleTpl(film);

            refs.lightbox.classList.toggle('modal-is-open')
            refs.overlayModal.insertAdjacentHTML('beforeend', markUp)
        
        })
}

function fetchMovie() {
    fetch(`https://api.themoviedb.org/3/movie/${a}?api_key=44d74a10460e9a32f8546bed31d47780&language=en-US`)
        .then(r => r.json())
        .then(film => {
            console.log(film)
            console.log(film.id)
            return film
        })
}

refs.closeModalBtn.addEventListener('click',onBtnClose)
function onBtnClose(){

    refs.lightbox.classList.remove('modal-is-open')
    refs.overlayModal.removeChild(refs.overlayModal.firstChild)
  }

/////////////////////////
// const API__KEY = '44d74a10460e9a32f8546bed31d47780';
// const BASE__URL = 'https://api.themoviedb.org/3/discover/';
// export default class NewApiService{
//     constructor(){
//         this.page = 1;
//     }
//     fetchFilms (){
//         const url = `${BASE__URL}movie?api_key=${API__KEY}&language=ua-UA&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
//         return fetch(url)
//             .then(r =>{
//                 return r.json()})
//                 .then(film =>{
//                     console.log(film)
//                     this.incrementPage();
//                     return film
//                 })

//     }
//     incrementPage(){
//         this.page +=1;
//     }

// }