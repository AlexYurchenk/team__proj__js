const API_KEY = '61153224aaaa08b03f5d3b14add082d2';
const BASE_URL = 'https://api.themoviedb.org/3';


// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>


// fetchtrend().then(renderMovies);

function fetchtrend() {
    return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
    .then(r => {
        if(r.ok) {
            return r.json()
        }
  
})
.then(({ results }) => {

    return results;
})
}

export default { fetchtrend };
