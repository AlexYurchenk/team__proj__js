const API_KEY = '61153224aaaa08b03f5d3b14add082d2';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class newsApiService{
    constructor (){
        this.searchQuery = '';
        this.page = 1;
    }    
    async fetchFilm () {
        const url = `${BASE_URL}api_key=${KEY}&query=${this.searchQuery}&page=${this.page}`;        
        const film = await fetch(url);
        const newFilms = await film.json();              
        return newFilms;
    }
    incrementPage(){
        this.page +=1;
    }
    resetPage(){
        this.page = 1;
    }
    get query(){
        return this.searchQuery;
    }
    set query(newQuery){
        return this.searchQuery = newQuery;
    }
}