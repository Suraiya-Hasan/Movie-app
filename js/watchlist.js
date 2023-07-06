import { API_KEY, account_id, IMG_URL, BASE_URL, AUTHORIZATION_KEY } from "./config.js";
import { handleError } from "./errorHandling.js";
const modalContent = document.getElementById('modal-content-watchlist');

export async function addWatchlist(id) {
    try {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: AUTHORIZATION_KEY
            },
            body: JSON.stringify({ media_type: 'movie', media_id: id, watchlist: true })
        };

        const response = await fetch(`${BASE_URL}/account/${account_id}/watchlist?` + API_KEY, options);
        const data = await response.json();
        await getWatchlist();
        await addToModalWatchlist();
        if (data.success == false) throw new Error('Could not add to watchlist');
        alert(`Successfully added to watchlist 🍿`);
    } catch (error) {
        handleError(error.message);
    }
}
export async function removeWatchlist(id) {
    try {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: AUTHORIZATION_KEY
            },
            body: JSON.stringify({ media_type: 'movie', media_id: id, watchlist: false })
        };

        const response = await fetch(`${BASE_URL}/account/${account_id}/watchlist?` + API_KEY, options);
        const data = await response.json();
        await getWatchlist();
        await addToModalWatchlist();
    } catch (error) {
        handleError(error.message);
    }
}

export async function getWatchlist() {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: AUTHORIZATION_KEY
            }
        };
    
        const response = await fetch(`${BASE_URL}/account/${account_id}/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`, options);
        const data = await response.json();
        const watchlist = await data.results;
        return watchlist;
    } catch (error) {
        handleError(error.message);
    }
}

export async function addToModalWatchlist(){
    try {
        const watch = await getWatchlist();
        if(watch.length === 0)
            modalContent. innerHTML = `
            <p>
            Nothing to watch yet, add a movie 🎥.
            </p>
            `
        else{
            modalContent.innerHTML = '';
            for(const {poster_path, title, id} of watch){
                const liEL = document.createElement('li');
                liEL.classList.add('preview');
                liEL. innerHTML = `
                <br><hr>
                <div class="preview__link">
                <figure >
                <img class="preview__fig" src="${poster_path ? IMG_URL + poster_path : 'https://placehold.co?text=No+Image'}" alt="${title}"}" alt="Test" />
                </figure>
                <div class="preview__data">
                <h4 class="preview__name">
                ${title}
                </h4>
                </div>
                <button class = 'remove' id='${id}'>Remove</button>
                </div>
                <hr>
                `;
                modalContent.appendChild(liEL);

                document.getElementById(id).addEventListener('click',async()=>{
                    await removeWatchlist(id);
                });
            }
        }
    } catch (error) {
        handleError(error.message);
    }
}
