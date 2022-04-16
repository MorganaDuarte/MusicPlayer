let img = document.getElementById("img")
let title = document.getElementById("title")
let audio = document.getElementById("audio")
let stop = document.getElementById("stop")
let start = document.getElementById("start")
let pause = document.getElementById("pause")
let seekSlider = document.getElementById("seekSlider")
let currentTime = document.getElementById("currentTime")
let musicIndex = 0


function updateScreen() {
    title.innerHTML = musicList[musicIndex].title
    audio.setAttribute("src", musicList[musicIndex].audioSrc)
    img.setAttribute("src", musicList[musicIndex].imgSrc)
    audio.load()
}

function next() {
    if (musicIndex == musicList.length - 1) {
        musicIndex = 0
    } else {
        musicIndex++
    }
    updateScreen()
}

function back() {
    if (musicIndex == 0) {
        musicIndex = musicList.length - 1
    } else {
        musicIndex--
    }
    updateScreen()
}

function playMusic() {
    audio.play()

    pause.classList.toggle("hidden")
    start.classList.toggle("hidden")
}

function stopMusic() {
    audio.pause()
    audio.currentTime = 0
}

function pauseMusic() {
    audio.pause()

    pause.classList.toggle("hidden")
    start.classList.toggle("hidden")
}

audio.ontimeupdate = function() {
    seekSlider.value = audio.currentTime
    currentTime.innerHTML = convert(audio.currentTime)
}

seekSlider.onchange = function() {
    audio.currentTime = seekSlider.value
}

audio.onloadeddata = function() {
    seekSlider.max = audio.duration
}

function convert(value) {
    const sec = parseInt(value, 10)
    let hours = Math.floor(sec / 3600)
    let minutes = Math.floor((sec - (hours * 3600)) / 60)
    let seconds = sec - (hours * 3600) - (minutes * 60)
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return minutes + ':' + seconds
}


updateScreen()