const g = {
    Selectors: {
        Video: "ytd-grid-video-renderer",
        VideoTitle: "#video-title"
    }
};

async function parseFilters() {
    // get filters from local storage
    const pGetStorage = browser.storage.local.get('yt_exclude')
    const { yt_exclude: filterText } = await pGetStorage
    
    let filterTexts = filterText.split("\n")
    // make filters lower case
    filterTexts = filterTexts.map(text => text.toLowerCase())
    // exclude filters beginning with #, consider these comments
    filterTexts = filterTexts.filter(
        text => text[0] != "#" && text.length > 0
    )

    g.Filters = {
        Exclude: filterTexts.map(filter => filter.toLowerCase())
    }

    return pGetStorage
}
async function main() {
    while (1) {
        // initialize
        await parseFilters();

        // get videos
        const $ = document.querySelectorAll.bind(document)
        const elVideos = $(g.Selectors.Video)

        // only filter videos if global variable yt_exclude is defined
        console.log("Exclude: ", g.Filters.Exclude)
            // iterate video tiles
        for (const el of elVideos) {
            const title = el.querySelector(g.Selectors.VideoTitle).innerHTML.toLowerCase()

            // hide element if title matches exclude string
            for (const filter of g.Filters.Exclude) {
                if (title.includes(filter)) {
                    el.style.display = "none"
                }
            }
        }

        // rerun in 2 seconds
        await new Promise((res, rej) => setTimeout(res, 4000))
    }
}

setTimeout(main, 2000)