import { handleError } from "./errorHandling.js";
import { addRating } from "./rating.js";
import { addFavorite } from "./favorite.js";
import { API_KEY, AUTHORIZATION_KEY, BASE_URL, IMG_URL } from "./config.js";
import { addWatchlist } from "./watchlist.js";
let modalSingle = document.getElementById('singleModal');
const closeSingleBtn = document.getElementById('close-single');

export async function getMovieById(id) {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: AUTHORIZATION_KEY
        }
      };
  
      const response = await fetch(BASE_URL+'/movie/' + id + '?language=en-US&' + API_KEY, options);
      const data = await response.json();
      return data;
    } catch (error) {
      handleError(error.message);
    }
  }
  
export async function showDetails(id) {
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
            <button class='single' id="favor">Add to Favorites</button>
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
        document.getElementById(`watchlist`).addEventListener('click', async () => {
          await addWatchlist(id);
        })
      }
    } catch (error) {
      handleError(error.message);
    }
  }