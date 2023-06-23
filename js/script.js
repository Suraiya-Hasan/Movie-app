// constants.js
import { API_KEY, API_URL, SRC_URL, IMG_URL } from "./config.js";
import { handleError } from "./errorHandling.js";
import { addFavorite, removeFavorite, addToModal, getFavourite } from "./favorite.js";
import { prevListener, nextListner } from "./pagination.js";
import { setGenre } from "./genreTags.js";
import { getMovies } from "./api.js";
import { openNav, closeNav } from "./movieDetails.js";

const session_id = 'session_id=aa167500938b65502f7a4adc20fe557e288f4fe4';

const main = document.getElementById("main");
const form = document.getElementById('form');
const search = document.getElementById('search');

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const fvModalBtn = document.getElementById('favorite-btn');

const fvAddBtn = document.querySelector('.fav-add-btn');
const closeBtn = document.getElementById('closebtn');

let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

const selectedFavorite = [];


//show movies to dom
export const showMovies = function (data) {
    main.innerHTML = "";
    data.forEach(movie => {
        const { title, vote_average, id } = movie;
        let { poster_path, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <img src="${poster_path ? IMG_URL + poster_path : 'https://placehold.co/300x450?text=No+Image'}" alt="${title}" width="300" height="450"}>
        <div class="movie-info">
            <h2>${title}</h2>
            <span class="${getColor(vote_average)}">${+vote_average.toFixed(1)}</span>
        </div>
        <div class="overview">
            <h3>${title}</h3>
            ${overview};
            <br/>
            <button class = 'know-more' id='${id}'> Know More </button>
            <button class = 'favorite fav-add-btn ' id='${id}&fav-add-btn' style="width: auto; border-radius: 50px"> Add to favorite </button>
        </div>
        `

        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
            openNav(movie);
        });
        document.getElementById(`${id}&fav-add-btn`).addEventListener('click', async () => {
            if (selectedFavorite.length === 0) {
                selectedFavorite.push(id);
                await addFavorite(id);
                await getFavourite();
                await addToModal();
            }
            else {
                if (selectedFavorite.includes(id)) {
                    selectedFavorite.forEach((fid, index) => {
                        if (fid === id) {
                            selectedFavorite.splice(index, 1);
                        }
                    }
                    )
                    await removeFavorite(id);
                    await getFavourite();
                    await addToModal();
                } else {
                    selectedFavorite.push(id);
                    await addFavorite(id);
                    await getFavourite();

                    await addToModal();
                }
            }
        });
    })
}

function getColor(vote) {
    if (vote >= 8) return "green";
    else if (vote >= 5) return "orange";
    else return "red";
}

getMovies(API_URL);

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
    if (event.target == modal) {
        modal.style.display = "none";
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

setGenre();
