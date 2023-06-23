let activeSlide = 0;
let totalVideos = 0;
const overlayContent = document.getElementById('overlay-content');
const leftArr = document.getElementById('left-arrow');
const rightArr = document.getElementById('right-arrow');
import { BASE_URL, API_KEY } from "./config.js";

export function openNav(movie) {
    let id = movie.id;
    fetch(BASE_URL + '/movie/' + id + '/videos?' + API_KEY)
        .then(res => res.json())
        .then(videoData => {
            if (videoData) {
                document.getElementById("myNav").style.width = "100%";
                if (videoData.results?.length > 0) {
                    let embed = [];
                    let dots = [];
                    videoData.results.forEach((video, idx) => {
                        let { name, key, site } = video;
                            if (site=="YouTube") {
                                embed.push(`
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                `)
                            dots.push(`
                        <span class = 'dot'>${idx + 1}</span>`)
                            }

                    })
                    let content = `<h1 class='no-results'>
                ${movie.original_title}</h1>
                <br/>
                ${embed.join('')}
                <br/>
                <div class="dots">${dots.join('')}</div>`

                    overlayContent.innerHTML = content;
                    activeSlide = 0;
                    showVideos();
                }
                else {
                    overlayContent.innerHTML = `<h1 class='no-results'>No Results Found</h1>`
                }
            } else {
                overlayContent.innerHTML = `<h1 class='no-results'>No Results Found</h1>`
            }
        }).catch(err=>console.error(err.message));
}

/* Close when someone clicks on the "x" symbol inside the overlay */
export function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}


export function showVideos() {
    let embedclasses = document.querySelectorAll('.embed');
    let dots = document.querySelectorAll('.dot');
    totalVideos = embedclasses.length;
    embedclasses.forEach((embedTag, idx) => {
        if (activeSlide == idx) {
            embedTag.classList.add('show');
            embedTag.classList.remove('hide');
        }
        else {
            embedTag.classList.add('hide');
            embedTag.classList.remove('show');
        }
    })

    dots.forEach((dot, idx) => {
        if (activeSlide == idx) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');

        }
    })
}

leftArr.addEventListener('click', () => {
    if (activeSlide > 0) {
        activeSlide--
    } else {
        activeSlide = totalVideos - 1;
    }
    showVideos();
})
rightArr.addEventListener('click', () => {
    if (activeSlide < totalVideos - 1) {
        activeSlide++;
    } else {
        activeSlide = 0;
    }
    showVideos();

})