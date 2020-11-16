function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        seekOffset: document.querySelector("#seekOffset").value,
        speedOffset: document.querySelector("#speedOffset").value
    });
}

function restoreOptions() {

    function setCurrentChoice(result) {
        document.querySelector("#seekOffset").value = result.seekOffset || 5;
        document.querySelector("#speedOffset").value = result.speedOffset || 0.1;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting_seek = browser.storage.sync.get("seekOffset");
    getting_seek.then(setCurrentChoice, onError);
    let getting_speed = browser.storage.sync.get("speedOffset");
    getting_speed.then(setCurrentChoice, onError)
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);