import refs from './main.js';
import './apiService';
import NewsApiService from './apiService';
import trendMovieTpl from '../templates/trendfilm-cards.hbs';
const debounce = require('lodash.debounce');

const newsApiService = new NewsApiService();

refs.formRef.addEventListener('input', debounce(onSearch, 500));

async function onSearch (e) {
    e.preventDefault();
    try {        
     clearArticlesConteiner();     
    newsApiService.query = e.target.value.trim();    
        if (newsApiService.query === '') {
            refs.spanRef.classList.add('js-notification');
        addArticlesMarcup();              
        return 
        }
      if (newsApiService.query === '') {         
        return alert('Вы ничего не ввели');
        }
        else {
        refs.spanRef.classList.remove('js-notification');

    }
    newsApiService.resetPage();
    const fetch = await newsApiService.fetchFilm();
    if (fetch.total_results === 0) {
      refs.spanRef.classList.add('js-notification');
      addArticlesMarcup();
      return;
    } else {
      refs.spanRef.classList.remove('js-notification');
    }
    const marcup = addArticlesMarcup(fetch.results);
    return marcup; 
  } catch (error) {
    console.log('error');
  }
}
function addArticlesMarcup(newFilms) {
  return refs.trendContainer.insertAdjacentHTML('beforeend',trendMovieTpl(newFilms));
      }
      
function clearArticlesConteiner() {
  refs.trendContainer.innerHTML = '';
}