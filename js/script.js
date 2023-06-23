// constants.js
import { API_KEY, API_URL, SRC_URL, IMG_URL } from "./config.js";
import { handleError } from "./errorHandling.js";
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
const modalContent = document.getElementById('modal-content');
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
            <button class = 'favorite fav-add-btn' id='${id}&fav-add-btn'> Add to favorite </button>
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
                await addToModal();
            }
            else {
                if (selectedFavorite.includes(id)) {
                    await removeFavorite(id);
                    selectedFavorite.forEach((fid, index) => {
                        if (fid === id) {
                            selectedFavorite.splice(index, 1);
                        }
                    }
                    )
                    await addToModal();
                } else {
                    selectedFavorite.push(id);
                    await addFavorite(id);
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




///doesnt work yet///
async function addFavorite(id) {
    //get favorites elements for a session
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDMzYzY2YmMxZjc5NzUwMjAzN2M3MTBiYTZkNDU2MyIsInN1YiI6IjY0OTA1NmM1YzNjODkxMDEyZDVlZGQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZmqkExo4mc6PlkHlvspxLOzktz_PWWU-paepfMOHOg'
        },
        body: JSON.stringify({ media_type: 'movie', media_id: id, favorite: true })
    };

    fetch('https://api.themoviedb.org/3/account/20033207/favorite?' + API_KEY, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.log(err.status_message));
}
async function removeFavorite(id) {
    //get favorites elements for a session
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDMzYzY2YmMxZjc5NzUwMjAzN2M3MTBiYTZkNDU2MyIsInN1YiI6IjY0OTA1NmM1YzNjODkxMDEyZDVlZGQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZmqkExo4mc6PlkHlvspxLOzktz_PWWU-paepfMOHOg'
        },
        body: JSON.stringify({ media_type: 'movie', media_id: id, favorite: false })
    };

    fetch('https://api.themoviedb.org/3/account/20033207/favorite?' + API_KEY, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => handleError(err.status_message));
}



export async function getFavourite() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDMzYzY2YmMxZjc5NzUwMjAzN2M3MTBiYTZkNDU2MyIsInN1YiI6IjY0OTA1NmM1YzNjODkxMDEyZDVlZGQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZmqkExo4mc6PlkHlvspxLOzktz_PWWU-paepfMOHOg'
        }
    };

    const res = await fetch('https://api.themoviedb.org/3/account/20033207/favorite/movies?language=en-US&page=1&sort_by=created_at.asc&' + API_KEY, options)
    const data = await res.json();
    const favorites = await data.results;
    return favorites;
}


export async function addToModal() {

    const fav = await getFavourite();
    if (fav.length === 0)
        modalContent.innerHTML = `<p>
    No favorites yet. Add a new one! 😊
  </p>`
    else {
        modalContent.innerHTML = '';
        for (const { poster_path, original_title, id } of fav) {
            const liEL = document.createElement("li");
            liEL.classList.add("preview");
            liEL.innerHTML = `<br><hr>
            <div class="preview__link">
            <figure >
            <img class="preview__fig" src="${poster_path ? IMG_URL + poster_path : 'https://placehold.co?text=No+Image'}" alt="${original_title}"}" alt="Test" />
            </figure>
            <div class="preview__data">
            <h4 class="preview__name">
            ${original_title}
            </h4>
            </div>
            <button class = 'remove' id=${id}'>Remove</button>
            </div>
            <hr>
            `;
            modalContent.appendChild(liEL);
        }
    }
}