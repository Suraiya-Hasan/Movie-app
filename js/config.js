// constants.js
export const BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = "api_key=7d33c66bc1f797502037c710ba6d4563";
export const API_URL = `${BASE_URL}/discover/movie?&language=en-US&sort_by=popularity.desc&${API_KEY}`;
export const SRC_URL = `${BASE_URL}/search/movie?&language=en-US&${API_KEY}`;
export const IMG_URL = "https://image.tmdb.org/t/p/w500";
export const account_id = `20033207`;
export const AUTHORIZATION_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDMzYzY2YmMxZjc5NzUwMjAzN2M3MTBiYTZkNDU2MyIsInN1YiI6IjY0OTA1NmM1YzNjODkxMDEyZDVlZGQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZmqkExo4mc6PlkHlvspxLOzktz_PWWU-paepfMOHOg'

export const genres = [
  {"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}
];

