export let lastURL = '';
import { controlPage ,scrollToResultTop} from "./pagination.js";
import { getFavourite, addToModal } from "./favorite.js";
import {showMovies} from "../js/script.js"
import { addToModalRating, getRatedMovie } from "./rating.js";
import { handleError } from "./errorHandling.js";
import { addToModalWatchlist, getWatchlist } from "./watchlist.js";

export const getMovies = async function (url) {
    lastURL = url;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.results.length !== 0) {
            showMovies(data.results);
            controlPage(data);
            scrollToResultTop();
            await getFavourite();
            await addToModal();
            await getRatedMovie();
            await addToModalRating();
            await getWatchlist();
            await addToModalWatchlist();
        } else
            main.innerHTML = `<h1 class="no-results">No Results Found</h1>`
    } catch (error) {
        handleError(error.message);
    }
}