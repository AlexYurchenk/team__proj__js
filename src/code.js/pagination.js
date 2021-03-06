import refs from './main.js';
import trendMovieTpl from '../templates/trendfilm-cards.hbs';


import sizesPagination from './sizes.js';

 

const API__KEY = '44d74a10460e9a32f8546bed31d47780';
const BASE__URL = 'https://api.themoviedb.org/3/discover/';
let n = 1;

let pageSize = document.documentElement.clientWidth;

export default class PaginationService {
    constructor() {
        this.n = 1;
    }

    feachMovie(){
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
}

const makePagination = new PaginationService;

first();
function first() {
    if(n === 1){
        refs.btnListPage.classList.add('button-list__page--current')    
    }
}

refs.next.addEventListener('click',e => {
    console.log(e.target)
    
    n += 1;
     if(n > 500){
         n--
         return
     }
     btnCreate()
    return makePagination.feachMovie()
})


refs.pr.addEventListener('click', e =>{
    n-=1;
    if(n === 0){
        n++
        return
    }
    btnCreate();
    return makePagination.feachMovie();

})

refs.btnList.addEventListener('click', e => {
    if(e.target.nodeName!== 'BUTTON'){
        return
    }
    
    console.log(e.target.nodeName,e.currentTarget)
    
    n = e.target.textContent -0;
    btnCreate()

    makePagination.feachMovie()
})

function kekw(kuda, n){
	refs.btnList.insertAdjacentHTML(kuda,`<li class="button-list__item"><button class="button-list__page">${n}</button></li>`)
}

function btnCreate(){
    refs.btnList.innerHTML = '';
    refs.btnList.insertAdjacentHTML('afterbegin',`<li class="button-list__item button-list__item--curretn"><button class="button-list__page button-list__page--current">${n}</button></li>`)
  
    for(let i = 1; i < 3; i++){
      
    if(n+i < 501)
      kekw('beforeend', n+i);
     if(n-i > 0)
            kekw('afterbegin', n-i);
    } 
}

