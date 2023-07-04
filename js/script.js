// constants.js
import { API_KEY, API_URL, SRC_URL, IMG_URL } from "./config.js";
import { handleError } from "./errorHandling.js";
import { addFavorite, removeFavorite, addToModal, getFavourite } from "./favorite.js";
import { prevListener, nextListner } from "./pagination.js";
import { setGenre } from "./genreTags.js";
import { getMovies } from "./api.js";
import { openNav, closeNav } from "./movieDetails.js";
import { addRating } from "../rating.js";


const form = document.getElementById('form');
const search = document.getElementById('search');

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const fvModalBtn = document.getElementById('favorite-btn');
const rtModalBtn = document.getElementById('ratings-btn');
const wlModalBtn = document.getElementById('watchlist-btn');

const closeBtn = document.getElementById('closebtn');

let modal = document.getElementById("myModal");
let modalRating = document.getElementById("myModalRating");
let modalWatchlist = document.getElementById("myModalWatchlist");
let modalSingle = document.getElementById('singleModal');
let span = document.getElementsByClassName("close")[0];
const closeRatingBtn = document.getElementById('close-rating');
const closeWatchlistBtn = document.getElementById('close-watchlist');
const closeSingleBtn = document.getElementById('close-single');

const selectedFavorite = [];


//show movies to dom
export const showMovies = function (data) {
  const main = document.getElementById("main");
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, vote_average, id, poster_path, overview } = movie;
    const movieEl = createMovieElement(title, vote_average, id, poster_path, overview);
    main.appendChild(movieEl);

    document.getElementById(`${id}-title`).addEventListener('click', async () => {
      getMovieById(id);
      showDetails(id);
    })
    document.getElementById(`${id}-img`).addEventListener('click', async () => {
      getMovieById(id);
      showDetails(id);
    })



    document.getElementById(id).addEventListener("click", () => {
      openNav(movie);
    });
    document.getElementById(`${id}&fav-add-btn`).addEventListener("click", async () => {
      if (selectedFavorite.length === 0) {
        selectedFavorite.push(id);
        await addFavorite(id);
      } else {
        if (selectedFavorite.includes(id)) {
          selectedFavorite = selectedFavorite.filter((fid) => fid !== id);
          await removeFavorite(id);
        } else {
          selectedFavorite.push(id);
          await addFavorite(id);
        }
      }
      await getFavourite();
      await addToModal();
    });
  });
};

export function createMovieElement(title, vote_average, id, poster_path, overview) {
  const movieEl = document.createElement("div");
  movieEl.classList.add("movie");

  const posterSrc = poster_path ? IMG_URL + poster_path : "https://placehold.co/300x450?text=No+Image";
  const averageVote = +vote_average.toFixed(1);
  const colorClass = getColor(vote_average);

  movieEl.innerHTML = `
      <img src="${posterSrc}" alt="${title}" id="${id}-img" class="modal-img" width="300" height="450"}>
      <div class="movie-info">
          <h2>${title}</h2>
          <span class="${colorClass}">${averageVote}</span>
      </div>
      <div class="overview ">
          <h3><button  id="${id}-title" class='movie-title-modal movie-title '>${title}</button></h3>
          ${overview};
          <br/>
          <button class="know-more" id="${id}"> Watch Videos </button>
          <button class="favorite fav-add-btn" id="${id}&fav-add-btn" style="width: auto; border-radius: 50px"> Add to favorite </button>
      </div>
    `;

  return movieEl;
}


function getColor(vote) {
  if (vote >= 8) return "green";
  else if (vote >= 5) return "orange";
  else return "red";
}



next.addEventListener('click', nextListner);
prev.addEventListener('click', prevListener)
closeBtn.addEventListener('click', closeNav);
fvModalBtn.onclick = function () {
  modal.style.display = "block";
}
span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal || event.target == modalRating || event.target == modalWatchlist) {
    modal.style.display = "none";
    modalRating.style.display = 'none';
    modalWatchlist.style.display = 'none';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  setGenre();
  if (searchTerm) {
    getMovies(SRC_URL + '&query=' + searchTerm);
  } else {
    getMovies(API_URL);
  }
});
getMovies(API_URL);
setGenre();


rtModalBtn.onclick = function () {
  modalRating.style.display = "block";
}
closeRatingBtn.onclick = function () {
  modalRating.style.display = "none";
}


wlModalBtn.onclick = function () {
  modalWatchlist.style.display = "block";
}
closeWatchlistBtn.onclick = function () {
  modalWatchlist.style.display = "none";
}

async function getMovieById(id) {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDMzYzY2YmMxZjc5NzUwMjAzN2M3MTBiYTZkNDU2MyIsInN1YiI6IjY0OTA1NmM1YzNjODkxMDEyZDVlZGQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZmqkExo4mc6PlkHlvspxLOzktz_PWWU-paepfMOHOg'
      }
    };

    const response = await fetch('https://api.themoviedb.org/3/movie/' + id + '?language=en-US&' + API_KEY, options);
    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error.message);
  }
}

async function showDetails(id) {
  try {
    const data = await getMovieById(id);
    modalSingle.style.display = "block";
    closeSingleBtn.onclick = function () {
      modalSingle.style.display = "none";
    }
    if (data.success == false) document.getElementById('modal-content-single').innerHTML = `<p>
    Data not Found!
  </p>`;
    else {
      document.getElementById('modal-content-single').innerHTML = '';
      const html = `
      <img class="imageSingle" src="${data.poster_path ? IMG_URL + data.poster_path : "https://placehold.co/300x450?text=No+Image"}" alt="${data.title}">
      <div class="detailsSingle">
      <div class="titleSingle">${data.title}</div>
        <div class="overviewSingle">
          ${data.overview}
        </div>
        <div class="buttonsSingle">
          <button class='single' id="favor">Add to Favourites</button>
          <button class='single' id='rate'>Rate the Movie</button>
          <button class='single' id='watchlist'>Add to Watchlist</button>
        </div>
      </div>`
      document.getElementById('modal-content-single').innerHTML = html;
      document.getElementById('favor').addEventListener('click', async () => {
        await addFavorite(id);
      })
      document.getElementById(`rate`).addEventListener('click', async () => {
        let value = (prompt("Enter a rating between 1 to 10:"));
        await addRating(id, value);
      })
    }
  } catch (error) {
    handleError(error.message);
  }
}