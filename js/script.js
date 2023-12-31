// constants.js
import { API_URL, SRC_URL, IMG_URL } from "./config.js";

import { addFavorite, removeFavorite, addToModal, getFavourite } from "./favorite.js";
import { prevListener, nextListener } from "./pagination.js";
import { setGenre } from "./genreTags.js";
import { getMovies } from "./api.js";
import { openNav, closeNav } from "./movieDetails.js";
import { getMovieById, showDetails } from "./singleMovieDetail.js";

const SCROLL_MARGIN = 30;
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
let span = document.getElementsByClassName("close")[0];
const closeRatingBtn = document.getElementById('close-rating');
const closeWatchlistBtn = document.getElementById('close-watchlist');

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
        await getFavourite();
        await addToModal();
      } else {
        if (selectedFavorite.includes(id)) alert('Already in Favorites 🍿');
        else {
          selectedFavorite.push(id);
          await addFavorite(id);
          await getFavourite();
          await addToModal();
        }
      }

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



next.addEventListener('click', nextListener);
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

const scroll = document.getElementById('scroll');
scroll.addEventListener('click', topFunction);
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > SCROLL_MARGIN || document.documentElement.scrollTop > SCROLL_MARGIN) {
    scroll.style.display = "block";
  } else {
    scroll.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.documentElement.scrollIntoView({ behavior: 'smooth' });
}
