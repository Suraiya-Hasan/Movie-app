import { API_KEY, BASE_URL, IMG_URL, account_id, AUTHORIZATION_KEY } from "./config.js";
import { handleError } from "./errorHandling.js";
import { addRating, addToModalRating } from "./rating.js";
const modalContent = document.getElementById('modal-content');
export async function addFavorite(id) {
    try {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: AUTHORIZATION_KEY
            },
            body: JSON.stringify({ media_type: 'movie', media_id: id, favorite: true })
        };
    
        const response = await fetch(`${BASE_URL}/account/${account_id}/favorite?` + API_KEY, options)
        const data = await response.json();
        await getFavourite();
        await addToModal();
        if (data.success == false)
            throw new Error("Could not add to favorite. 🚫");
        alert(`Successfully added to favorite. ✔`);
    } catch (error) {
        handleError(error.message);
    }

}
export async function removeFavorite(id) {
    //get favorites elements for a session
    try {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: AUTHORIZATION_KEY
            },
            body: JSON.stringify({ media_type: 'movie', media_id: id, favorite: false })
        };

        const res = await fetch(`${BASE_URL}/account/${account_id}/favorite?` + API_KEY, options);
        const data = res.json();
        await getFavourite();
        await addToModal();
        return data;
    } catch (error) {
        handleError(error.message);
    }
}



export async function getFavourite() {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: AUTHORIZATION_KEY
            }
        };

        const res = await fetch(`${BASE_URL}/account/${account_id}/favorite/movies?language=en-US&page=1&sort_by=created_at.desc&` + API_KEY, options)
        const data = await res.json();
        const favorites = await data.results;
        return favorites;
    } catch (error) {
        handleError(error.message);
    }
}


export async function addToModal() {

    try {
        const fav = await getFavourite();
        if (fav.length === 0)
            modalContent.innerHTML = `<p>
                No favorites yet. Add a new one! 🎬
                </p>`
        else {
            modalContent.innerHTML = '';
            for (const { poster_path, title, id } of fav) {
                const liEL = document.createElement("li");
                liEL.classList.add("preview");
                liEL.innerHTML = `<br><hr>
                <div class="preview__link">
                <figure >
                <img class="preview__fig" src="${poster_path ? IMG_URL + poster_path : 'https://placehold.co?text=No+Image'}" alt="${title}"}" alt="Test" />
                </figure>
                <div class="preview__data">
                <h4 class="preview__name">
                ${title}
                </h4>
                </div>
                <button class = 'rate' id='rate${id}'>Rate</button>
                <button class = 'remove' id='${id}'>Remove</button>
                </div>
                <hr>
                `;
                modalContent.appendChild(liEL);
                document.getElementById(`rate${id}`).addEventListener('click', async () => {
                    let value = (prompt("Enter a rating between 1 to 10:"));
                    await addRating(id, value);
                })
                await addToModalRating();
                document.getElementById(id).addEventListener('click', async () => {
                    await removeFavorite(id);
                })
            }

        }
    } catch (error) {
        handleError(error.message);
    }
}
