const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value;
    sendRequest(userInput).then(res => {
        const songs = JSON.parse(res);
        const singleSong = songs.data;
        console.log(singleSong)
        showSongs(singleSong)
    })
    .catch(err => {
        console.log(err);
    })
})
const sendRequest = async (song) => {
    const promise1 = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `https://api.lyrics.ovh/suggest/${song}`);
        xhr.onload = () => {
            const data = xhr.response;
            return resolve(data);
        }
        xhr.onerror =() => {
            const message = "Sorry Something went wrong";
            return reject(message);
        }
        xhr.send();
    })
    return promise1;
}

const showSongs = (data) => {
    data.forEach(song => {
        const searchResult = document.getElementById("search-result");
        const newSong = document.createElement("div");
        newSong.innerHTML = `
        <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls src="${song.preview}"></audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button class="btn btn-success">Get Lyrics</button>
        </div>
    </div>
        `;

    searchResult.appendChild(newSong);

    })
}

