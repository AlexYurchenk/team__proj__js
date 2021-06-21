import './apiService';
import NewApiService from './apiService';
const debounce = require('lodash.debounce');
const newsApiService = new NewApiService();
const refs = {
    formRef: document.querySelector('#search-form'),
    spanRef: document.querySelector('.notification'),
    gallery: document.querySelector('.js-trend-list'),
}
refs.formRef.addEventListener('input', debounce(onSearch, 500));


async function onSearch (e) {
    e.preventDefault();
    try {        
     clearArticlesConteiner();     
    newsApiService.query = e.target.value.trim();    
        if (newsApiService.query.trim() === '') {
            refs.spanRef.classList.add('js-notification');
        toCreateGallery();              
        return 
        }
        else {
        refs.spanRef.classList.remove('js-notification');

    }
    newsApiService.resetPage();
    const fetch = await newsApiService.fetchFilm();
    if (fetch.total_results === 0) {
      refs.spanRef.classList.add('js-notification');
      toCreateGallery();
      return;
    } else {
      refs.spanRef.classList.remove('js-notification');
    }
    const marcup = await addArticlesMarcup(fetch.results);
    return marcup;
  } catch (error) {
    console.log('error');
  }
}
function addArticlesMarcup(newFilms) {
  return refs.gallery.insertAdjacentHTML('beforeend', filmTpl(newFilms));
      }
      
function clearArticlesConteiner() {
  refs.gallery.innerHTML = '';
}