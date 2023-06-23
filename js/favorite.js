import { API_KEY, IMG_URL } from "./config.js";
const modalContent = document.getElementById('modal-content');
export async function addFavorite(id) {
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
        .then(response => {
            getFavourite();
            addToModal();
            console.log(response)
        })
        .catch(err => console.log(err.status_message));
}
export async function removeFavorite(id) {
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

    const res = await fetch('https://api.themoviedb.org/3/account/20033207/favorite?' + API_KEY, options);
    const data = res.json();
    await getFavourite();
    await addToModal();
    return data;
}



export async function getFavourite() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDMzYzY2YmMxZjc5NzUwMjAzN2M3MTBiYTZkNDU2MyIsInN1YiI6IjY0OTA1NmM1YzNjODkxMDEyZDVlZGQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZmqkExo4mc6PlkHlvspxLOzktz_PWWU-paepfMOHOg'
        }
    };

    const res = await fetch('https://api.themoviedb.org/3/account/20033207/favorite/movies?language=en-US&page=1&sort_by=created_at.desc&' + API_KEY, options)
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