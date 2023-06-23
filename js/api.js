export let lastURL = '';
import { controlPage ,scrollToResultTop} from "./pagination.js";
import { showMovies, getFavourite, addToModal } from "./script.js";
//fetching data
export const getMovies = async function (url) {
    lastURL = url;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.results.length !== 0) {
            showMovies(data.results);
            controlPage(data);
            scrollToResultTop();
            await addToModal();
        } else
            main.innerHTML = `<h1 class="no-results">No Results Found</h1>`
    } catch (error) {
        console.log(error.message);
    }
}