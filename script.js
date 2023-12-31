// Get the elements
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resumeBtn = document.getElementById("resumeBtn"); // New resume button
const resetBtn = document.getElementById("resetBtn");
const timerDisplay = document.getElementById("timer");

let timerInterval;
let totalTime = 0;
let isActive = false;

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resumeBtn.addEventListener("click", resumeTimer); // Event listener for resume button

function startTimer() {
  const minutes = parseInt(minutesInput.value);
  const seconds = parseInt(secondsInput.value);

  if ((!minutes && minutes !== 0) || (!seconds && seconds !== 0)) {
    alert("Please enter a valid time");
    return;
  }
  if (minutes === 0 && seconds === 0) {
    alert("Please enter a valid time");
    return;
  }

  if (minutes > 59) {
    alert("Minutes cannot exceed 59");
    return;
  }

  totalTime = minutes * 60 + seconds;
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
  isActive = true;
}

function stopTimer() {
  clearInterval(timerInterval);
  isActive = false;
}

function resumeTimer() {
  if (!isActive) {
    timerInterval = setInterval(updateTimer, 1000);
    isActive = true;
  }
}

function updateTimer() {
  let minutes = Math.floor(totalTime / 60);
  let seconds = totalTime % 60;

  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  if (totalTime <= 0) {
    clearInterval(timerInterval);
    timerDisplay.textContent = "00:00";
  } else {
    totalTime--;
  }
}

resetBtn.addEventListener("click", function () {
  clearInterval(timerInterval);
  minutesInput.value = "";
  secondsInput.value = "";
  timerDisplay.textContent = "00:00";
  totalTime = 0;
  isActive = false;
});
