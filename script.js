const meditationVideo = document.getElementById('meditation-video');
const meditationAudio = document.getElementById('meditation-audio');
const soundButtons = document.querySelectorAll('.sound-picker button');
const timeButtons = document.querySelectorAll('.time-buttons button');
const timeDisplay = document.querySelector('.time-display');
const playPauseButton = document.getElementById('play-pause');

let currentTime = 10 * 60; // 10 minutes by default
let isPlaying = false;

function updateTimerDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function switchSound(soundFileName) {
    meditationAudio.src = `sounds/${soundFileName}.mp3`;
}

function resetTimer() {
    currentTime = parseInt(this.dataset.time); // Get time from button's data attribute
    updateTimerDisplay();
    if (isPlaying) {
        playPauseButton.textContent = 'Pause';
    } else {
        playPauseButton.textContent = 'Play';
    }
}

soundButtons.forEach(button => {
    button.addEventListener('click', function () {
        switchSound(this.textContent);
    });
});

timeButtons.forEach(button => {
    button.addEventListener('click', resetTimer);
});

playPauseButton.addEventListener('click', function () {
    if (isPlaying) {
        meditationAudio.pause();
        isPlaying = false;
        this.textContent = 'Play';
    } else {
        meditationAudio.play();
        isPlaying = true;
        this.textContent = 'Pause';
    }
});

meditationAudio.addEventListener('timeupdate', function () {
    currentTime--;
    if (currentTime <= 0) {
        meditationAudio.pause();
        isPlaying = false;
        playPauseButton.textContent = 'Play';
        currentTime = 10 * 60; // Reset timer to 10 minutes
    }
    updateTimerDisplay();
});

updateTimerDisplay(); // Initial display

