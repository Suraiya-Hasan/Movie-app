let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let totalPages = 100;
const curr = document.getElementById('current');
import { lastURL } from "./api.js";
import { getMovies } from "./api.js";
import { tagsEl } from "./genreTags.js";

export function controlPage(data) {
    currentPage = data.page;
    nextPage = currentPage + 1;
    prevPage = currentPage - 1;
    totalPages = data.total_pages;


    curr.innerText = currentPage;
    if (currentPage <= 1) {
        prev.classList.add('disabled');
        next.classList.remove('disabled');
    }
    else if (currentPage >= totalPages) {
        next.classList.add('disbled');
        prev.classList.remove('disabled');
    } else {
        prev.classList.remove('disabled');
        next.classList.remove('disabled');
    }
}



export function pageCall(page) {
    let urlSplit = lastURL.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length - 1].split('=');
    if (key[0] !== 'page') {
        let url = lastURL + '&page=' + page;
        getMovies(url);
    } else {
        key[1] = page.toString();
        let a = key.join('=');
        queryParams[queryParams.length - 1] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] + '?' + b;
        getMovies(url);
    }
}

export function scrollToResultTop() {
    tagsEl.scrollIntoView({ behavior: 'smooth' });
}

export function nextListner(){
    if (nextPage <= totalPages) {
        pageCall(nextPage);
    }

}
export function prevListener(){
if (prevPage > 0) {
    pageCall(prevPage);
}
}