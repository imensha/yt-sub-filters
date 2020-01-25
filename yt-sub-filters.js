const VIDEO_TILE_SELECTOR = "ytd-grid-video-renderer"
const VIDEO_TITLE_SELECTOR = "#video-title"

console.log(window, window.onload);

const YT_EXCLUDE = [
    /* phrases to exclude */
]

setTimeout(() => {
    const $ = document.querySelectorAll.bind(document)
    const elVideos = $(VIDEO_TILE_SELECTOR)
    console.log(elVideos)

    // only filter videos if global variable yt_exclude is defined
    console.log("Exclude: ", YT_EXCLUDE)
        // iterate video tiles
    for (const el of elVideos) {
        const title = el.querySelector(VIDEO_TITLE_SELECTOR).innerHTML

        // hide element if title matches exclude string
        for (const filter of YT_EXCLUDE) {
            if (title.includes(filter)) {
                el.style.display = "none"
            }
        }
    }
}, 5000)