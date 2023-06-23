let selectedGenre = [];
import { genres, API_URL } from "./config.js";
import { getMovies } from "./api.js";
export const tagsEl = document.getElementById('tags');



export function setGenre() {
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if (selectedGenre.length === 0) {
                selectedGenre.push(genre.id);
            }
            else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, index) => {
                        if (id === genre.id) {
                            selectedGenre.splice(index, 1);
                        }
                    })
                } else {
                    selectedGenre.push(genre.id);
                }
            }
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
            highlightSelection();
        })
        tagsEl.append(t);
    })
}


export function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight');
    })
    clearBtn();
    if (selectedGenre.length !== 0) {
        selectedGenre.forEach(id => {
            const highlightedTag = document.getElementById(id);
            highlightedTag.classList.add('highlight');
        })
    }
}

export function clearBtn() {
    let clearBtn = document.getElementById('clear');
    if (clearBtn) {
        clearBtn.classList.add('highlight-red');
    } else {
        let clear = document.createElement('div');
        clear.classList.add('tag', 'highlight-red');
        clear.id = 'clear';
        clear.innerText = "Clear ✖";
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();
            getMovies(API_URL);
        })
        tagsEl.append(clear);
    }
}