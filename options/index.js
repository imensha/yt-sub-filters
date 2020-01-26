const d = document
const $ = (...args) => {
    const result = d.querySelectorAll(...args)
    if (result.length === 1)
        return result[0]

    return result
}

const StorageKeys = {
    EXCLUDE: "yt_exclude"
}

function saveOptions(e) {
    // prevent default submit action
    e.preventDefault();

    browser.storage.local.set({
        [StorageKeys.EXCLUDE]: $("#yt_exclude").value
    });
}

function restoreOptions() {
    var gettingItem = browser.storage.local.get(StorageKeys.EXCLUDE);
    gettingItem.then(res => {
        $("#yt_exclude").value = res[StorageKeys.EXCLUDE] || 'Firefox red';
    });
}

d.addEventListener('DOMContentLoaded', restoreOptions);
const form = $("form")
form.addEventListener("submit", saveOptions);