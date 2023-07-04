const modalContent = document.getElementById('modal-content-rating');
import { handleError } from "./errorHandling.js";
import { IMG_URL,account_id } from "./config.js";

export async function addRating(id,value) {
  try {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDMzYzY2YmMxZjc5NzUwMjAzN2M3MTBiYTZkNDU2MyIsInN1YiI6IjY0OTA1NmM1YzNjODkxMDEyZDVlZGQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZmqkExo4mc6PlkHlvspxLOzktz_PWWU-paepfMOHOg'
        },
        body: `{"value": ${value}}`
      };
    
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?`, options);
      const data = await res.json();
      if(value<0 || value>10 ) throw new Error(data.status_message);
      else if(value == null) return;
      else alert("Rating successfully stored ✔");
      await addToModalRating();
  } catch (error) {
      handleError(error.message);
  }
}

export async function getRatedMovie() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDMzYzY2YmMxZjc5NzUwMjAzN2M3MTBiYTZkNDU2MyIsInN1YiI6IjY0OTA1NmM1YzNjODkxMDEyZDVlZGQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZmqkExo4mc6PlkHlvspxLOzktz_PWWU-paepfMOHOg'
    }
  };
  
  const res =await fetch(`https://api.themoviedb.org/3/account/${account_id}/rated/movies?language=en-US&page=1&sort_by=created_at.desc`, options)
  const data = await res.json();
  const rated = await data.results;
  return rated;
}


export async function addToModalRating() {

  try {
      const rate = await getRatedMovie();
      if (rate.length === 0)
          modalContent.innerHTML = `<p>
              No ratings yet. Add a new one! 😊
              </p>`
      else {
          modalContent.innerHTML = '';
          for (const { poster_path, title, id, rating } of rate) {
              const liEL = document.createElement("li");
              liEL.classList.add("preview");
              liEL.innerHTML = `<br><hr>
              <div class="preview__link">
              <figure >
              <img class="preview__fig" src="
              ${poster_path ? IMG_URL + poster_path : 'https://placehold.co?text=No+Image'}" alt="${title}"}" alt="Test" />
              </figure>
              <div class="preview__data">
              <h4 class="preview__name">
              ${title}
              </h4>
              <div>
              <span>Your rating: ${rating}</span>
              <button id='${id}remove' class="remove" style="float:right; margin-right:4px">Delete Rating</button>
              <button id='${id}rate' class="rate" style="float:right">Rate again</button>
              </div>
              `;
              modalContent.appendChild(liEL);
              document.getElementById(`${id}rate`).addEventListener('click',async()=>{
                let value = (prompt("Enter a rating between 1 to 10:"));
                await addRating(id, value);
            })
              document.getElementById(`${id}remove`).addEventListener('click',async()=>{
                await removeRating(id);
                await addToModalRating();
            })
          }
  
      }
  } catch (error) {
      handleError(error.message);
  }
}

async function removeRating(id){
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDMzYzY2YmMxZjc5NzUwMjAzN2M3MTBiYTZkNDU2MyIsInN1YiI6IjY0OTA1NmM1YzNjODkxMDEyZDVlZGQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZmqkExo4mc6PlkHlvspxLOzktz_PWWU-paepfMOHOg'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/movie/${id}/rating`, options)
    .then(response => response.json())
    .then(response => {
      addToModalRating();
    })
    .catch(err => handleError(err.message));
}