// constants.js
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=7d33c66bc1f797502037c710ba6d4563";
const API_URL = `${BASE_URL}/discover/movie?&language=en-US&sort_by=popuality.desc&${API_KEY}`;
const SRC_URL = `${BASE_URL}/search/movie?&language=en-US&${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const account_id = `20033207`;

const genres = [
  {"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}
];

export { BASE_URL, API_KEY, API_URL, SRC_URL, IMG_URL, genres, account_id };
