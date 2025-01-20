let allSongs = [
  {
    id: 1,
    name: "Starboy",
    artist: "The Weeknd",
    img: "The_Weeknd_-_Starboy.png",
    genre: "Rock",
    source: "one.mp3",
  },
  {
    id: 2,
    name: "Gods plan",
    artist: "Drake",
    img: "started.png",
    genre: "Pop",
    source: "two.mp3",
  },
  {
    id: 3,
    name: "Started from the bottom",
    artist: "Drake",
    img: "download.png",
    genre: "Hip Hop",
    source: "three.mp3",
  },
  {
    id: 4,
    name: "Skyfall",
    artist: "Adele",
    img: "Skyfall_cover.png",
    genre: "Hip Hop",
    source: "four.mp3",
  },
  {
    id: 5,
    name: "Timber",
    artist: "Pitbull",
    img: "pitbull.jpg",
    genre: "Pop",
    source: "five.mp3",
  },
  {
    id: 6,
    name: "Famous",
    artist: "Ye",
    img: "kanye.jpg",
    genre: "Rock",
    source: "six.mp3",
  },
  {
    id: 7,
    name: "Humble",
    artist: "Kendrick Lamar",
    img: "damn.jpg",
    genre: "Rock",
    source: "seven.mp3",
  },
];
let playlists = [];
const selectSong = document.getElementById("selectSong");
const songDetails = document.getElementById("songDetails");
const songCard = document.getElementById("details");
const playlist = document.getElementById("playlist");
const all_songs = document.getElementById("all-songs");

const unique = new Set();
allSongs.forEach((song) => {
  unique.add(song.genre);
});
const toggle = document.getElementById("checkbox");
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    songCard.id='newSongCard';
    all_songs.id='new-all-songs'
    playlist.id='newplaylist'
    
  } else {
    songCard.id='details';
    all_songs.id='all-songs'
    playlist.id='playlist'
    
  }
});

function showSongs() {
  unique.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    selectSong.appendChild(option);
  });
  selectSong.addEventListener("change", function () {
    songDetails.innerHTML = "";
    const selectedGenre = this.value;
    displayNames(selectedGenre);
  });
  function displayNames(genre) {
    if (genre == "All") {
      allSongs.forEach((song) => {
        const p = document.createElement("p");
        p.classList.add("song-name");
        p.textContent = song.name;
        songDetails.appendChild(p);

        p.addEventListener("click", () => {
          displaySong(song);
        });
      });
    } else {
      const namearr = allSongs.filter((song) => song.genre === genre);
      namearr.forEach((song) => {
        const p = document.createElement("p");
        p.classList.add("song-name");
        p.textContent = song.name;
        p.addEventListener("click", () => {
          displaySong(song);
        });
        songDetails.appendChild(p);
      });
    }
  }
}
function displaySong(song) {
  songCard.innerHTML = "";
  const albumart = document.createElement("img");
  albumart.classList.add("albumart");
  albumart.src = song.img;
  const songname = document.createElement("p");
  songname.textContent = song.name;
  songname.classList.add("songname");

  const albumname = document.createElement("p");
  albumname.textContent = song.artist;
  albumname.classList.add("albumname");

  const audio = document.createElement("audio");
  audio.src = song.source || "";
  audio.controls = true;
  audio.classList.add("audio");
  const left = document.createElement("button");
  left.textContent = "<=";
  left.addEventListener("click", () => prev(song));
  left.classList.add("left");

  const right = document.createElement("button");
  right.textContent = "=>";
  right.addEventListener("click", () => next(song));
  right.classList.add("right");
  const add = document.createElement("button");
  add.textContent = "Add to playlist";
  add.addEventListener("click", () => addSongsCurr(song));

  songCard.appendChild(albumart);
  songCard.appendChild(songname);
  songCard.appendChild(albumname);
  songCard.appendChild(audio);
  songCard.appendChild(left);
  songCard.appendChild(right);
  songCard.appendChild(add);
}

function showPlaylist() {
  const curr = document.createElement("h2");
  curr.textContent = "Current playlist";
  playlist.appendChild(curr);
  const all = document.createElement("h2");
  all.textContent = "All playlist";
  playlist.appendChild(all);
  const allPlaylistContainer = document.createElement("div");
  playlist.appendChild(allPlaylistContainer);
  const curr_playlist = document.createElement("div");
  curr.appendChild(curr_playlist);
  const button = document.getElementById("submit");
  button.addEventListener("click", (e) => {
    allPlaylistContainer.innerHTML = "";
    e.preventDefault();
    const add = document.getElementById("input");
    let obj = { name: add.value, songs: [] };
    playlists.push(obj);

    playlists.forEach((s) => {
      const names = document.createElement("p");
      names.textContent = s.name;
      allPlaylistContainer.appendChild(names);
      function addSongsCurr(song) {
        names.addEventListener("click", () => {
          const play_list = playlists.filter((p) => p.name === s.name);
          play_list.songs.push(song);
        });
      }
    });
  });
}

function next(song) {
  let num = song.id + 1;
  if (num > allSongs.length) {
    num = 1;
  }
  const nextsong = allSongs.find((s) => s.id === num);
  displaySong(nextsong);
}
function prev(song) {
  let num = song.id - 1;
  if (num < 1) {
    num = allSongs.length;
  }
  const nextsong = allSongs.find((s) => s.id === num);
  displaySong(nextsong);
}
showSongs();
showPlaylist();
