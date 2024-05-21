let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let index = 0;
let currentPlayingIndex = -1;

let songs = [
    { songName: "Legion", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Trap", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "They Mad", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Rich The Kid", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "The Song", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "The Safety Dance", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Back It Up", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "She", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Orange", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "True Love", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

let src = document.querySelectorAll(".songItem img");
let songName = document.querySelectorAll(".songName");

for (let i = 0; i < songs.length; i++) {
    songName[i].innerHTML = songs[i].songName;
    src[i].setAttribute("src", songs[i].coverPath);
}

masterPlay.addEventListener("click", function () {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
        if (currentPlayingIndex !== -1) {
            document.getElementById(currentPlayingIndex).classList.remove("fa-play-circle");
            document.getElementById(currentPlayingIndex).classList.add("fa-pause-circle");
        }
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
        if (currentPlayingIndex !== -1) {
            document.getElementById(currentPlayingIndex).classList.remove("fa-pause-circle");
            document.getElementById(currentPlayingIndex).classList.add("fa-play-circle");
        }
    }
});

audioElement.addEventListener("timeupdate", function () {
    var progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", function () {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = function () {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(function (element) {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(function (element) {
    element.addEventListener("click", function () {
        index = parseInt(this.id);
        if (currentPlayingIndex !== index) {
            makeAllPlays();
            this.classList.remove("fa-play-circle");
            this.classList.add("fa-pause-circle");

            audioElement.src = songs[index].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            gif.style.opacity = 1;
            document.querySelector(".songInfo span").innerHTML = songs[index].songName;
            myProgressBar.value = 0;  // Reset progress bar to 0%
            currentPlayingIndex = index;
        } else {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                this.classList.remove("fa-play-circle");
                this.classList.add("fa-pause-circle");
                masterPlay.classList.remove("fa-play-circle");
                masterPlay.classList.add("fa-pause-circle");
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                this.classList.remove("fa-pause-circle");
                this.classList.add("fa-play-circle");
                masterPlay.classList.remove("fa-pause-circle");
                masterPlay.classList.add("fa-play-circle");
                gif.style.opacity = 0;
            }
        }
    });
});

document.getElementById("next").addEventListener("click", function () {
    if (index >= 9) {
        index = 0;
    } else {
        index += 1;
    }
    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    document.querySelector(".songInfo span").innerHTML = songs[index].songName;
    makeAllPlays();
    document.getElementById(index).classList.remove("fa-play-circle");
    document.getElementById(index).classList.add("fa-pause-circle");
    myProgressBar.value = 0;  // Reset progress bar to 0%
    currentPlayingIndex = index;
});

document.getElementById("previous").addEventListener("click", function () {
    if (index <= 0) {
        index = 9;
    } else {
        index -= 1;
    }
    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    document.querySelector(".songInfo span").innerHTML = songs[index].songName;
    makeAllPlays();
    document.getElementById(index).classList.remove("fa-play-circle");
    document.getElementById(index).classList.add("fa-pause-circle");
    myProgressBar.value = 0;  // Reset progress bar to 0%
    currentPlayingIndex = index;
});

