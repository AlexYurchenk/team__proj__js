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
    next:document.querySelector('.js-btn-next'),
    pr: document.querySelector('.js-btn-pr'),
    btnList : document.querySelector('.button-list__container')

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
refs.trendContainer.addEventListener('click',e => {
    if(e.target.nodeName !=='IMG'){
        return
      }
    const a = e.target.id
    return fetch(`https://api.themoviedb.org/3/movie/${a}?api_key=44d74a10460e9a32f8546bed31d47780&language=en-US`)
    .then(r => r.json())
    .then( film => {
        console.log(film)
        console.log(film.id)
        return film
    })
    .then(film => {
        const markUp = articleTpl(film);

        refs.lightbox.classList.toggle('modal-is-open')
        refs.overlayModal.insertAdjacentHTML('beforeend',markUp)
        
    })
})
refs.closeModalBtn.addEventListener('click',onBtnClose)
function onBtnClose(){

    refs.lightbox.classList.remove('modal-is-open')
    refs.overlayModal.removeChild(refs.overlayModal.firstChild)
  }


///////////////////////начало пагинации 
const API__KEY = '44d74a10460e9a32f8546bed31d47780';
const BASE__URL = 'https://api.themoviedb.org/3/discover/';
let n = 1;
refs.next.addEventListener('click',e => {
    console.log(e.target)
    n += 1;
     if(n > 500){
         n--
         return
     }
     btnCreate()
    return feachMuvie()

})
refs.pr.addEventListener('click', e =>{
    n-=1;
    if(n === 0){
        n++
        return
    }
    btnCreate()
    return feachMuvie()

})
refs.btnList.addEventListener('click', e => {

    
    if(e.target.nodeName!== 'BUTTON'){
        return
    }
    
    console.log(e.target.nodeName,e.currentTarget)
    
    n = e.target.textContent -0;
    btnCreate()
    feachMuvie()

})

function kekw(kuda, n){
	refs.btnList.insertAdjacentHTML(kuda,`<li class="button-list__item"><button>${n}</button></li>`)
}
function btnCreate(){
    refs.btnList.innerHTML = '';
    refs.btnList.insertAdjacentHTML('afterbegin',`<li class="button-list__item button-list__item--curretn"><button>${n}</button></li>`)
    for(let i = 1; i < 3; i++){
    if(n+i < 501)
      kekw('beforeend', n+i);
     if(n-i > 0)
            kekw('afterbegin', n-i);
    }

}

function feachMuvie(){
    fetch(`${BASE__URL}movie?api_key=${API__KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${n}&with_watch_monetization_types=flatrate`)
    .then(r => r.json())
    .then( films => {
        console.log(films)
        return films
    })
    .then( ({results}) =>{

        const markUp = trendMovieTpl(results);
        refs.trendContainer.innerHTML = ''
        refs.trendContainer.insertAdjacentHTML('beforeend',markUp);
    })
} 

//конеуц пагинации