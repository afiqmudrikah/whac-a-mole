const grid = document.querySelectorAll('.grid');
const displayPoints = document.querySelector('#points');
const timeLimit = document.querySelector('#time-limit');
const newHighscore = document.querySelector('#highscore');
const userPoints = document.querySelector('#user-points');
const setHighscoreMsg = document.querySelector('#new-highscore');
const selectDifficulty = document.querySelectorAll('.difficulty');
const startScreen = document.querySelector('#start-screen');
const startBtn = document.querySelector('#startBtn');

let points = 0;
let highscore = 0;
let timer; // Game time countdown variable
let currentTime; // Initial game time at start
let gameOver = true; // Game state variable
let difficultyOfGame = 'easy'; // Default set to 'easy'
timeLimit.textContent = `Time remaining: `;

// Initialize game
function initGame() {
  currentTime = 15;
  clearGrid();
  displayPoints.textContent = `Points: ${(points = 0)}`;
  generateRandomInterval();
  timer = setInterval(countdown, 1000); // (set to 1sec per interval)
  gameOver = false;

  // Start screen
  startScreen.setAttribute('style', 'display:none');
}

// Generates random 'target' grid
function generateTarget() {
  clearGrid();
  const gridTarget = document.querySelectorAll('.grid');
  const randomNum = Math.floor(Math.random() * 9); // Generates pseudo-random integer
  const newTarget = gridTarget[randomNum];
  newTarget.classList.add('target');
}

// Generates a random time and calls generateTarget()
function generateRandomInterval(min = 1000, max = 2000) {
  let generateRandomTime = randomTime(min, max);
  if (difficultyOfGame === 'hard') {
    generateRandomTime = randomTime((min = 500), (max = 600));
  }
  setTimeout(() => {
    if (!gameOver) {
      generateTarget();
      generateRandomInterval();
    }
  }, generateRandomTime);
}

// Handles the click event
function targetHit() {
  for (const target of grid) {
    target.addEventListener('click', function () {
      if (target.classList.contains('target')) {
        points++;
        clearGrid();
        displayPoints.textContent = `Points: ${points}`;
      } else if (!gameOver) {
        points--; // penalty if user misclicks
        displayPoints.textContent = `Points: ${points}`;
      }
    });
  }
}

// Function that runs down the game time
function countdown() {
  currentTime--;
  timeLimit.textContent = `Time remaining: ${currentTime}`;
  if (currentTime === 0) {
    gameOver = true;
    clearInterval(timer);
    alert(`Game is over, you scored ${points} points`);
    checkHighscore();
    startScreen.setAttribute('style', 'display:');
    clearGrid();
  }
}

// Generates a random number within a specified range
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Clears the grid
function clearGrid() {
  for (const target of grid) {
    target.classList.remove('target');
  }
}

// Checks for new highscore
function checkHighscore() {
  userPoints.textContent = `Your score: ${points}`;
  if (points > highscore) {
    highscore = points;
    setHighscoreMsg.setAttribute('style', 'display: block');
    newHighscore.textContent = `Current highscore: ${highscore}`;
  } else if (points <= highscore && highscore === 0) {
    setHighscoreMsg.setAttribute('style', 'display: none');
    newHighscore.textContent = `Current highscore: ${highscore}
    (No points?)`;
  } else if (points === highscore) {
    setHighscoreMsg.setAttribute('style', 'display: none');
    newHighscore.textContent = `Current highscore: ${highscore}
    (Tied highscore!)`;
  } else {
    setHighscoreMsg.setAttribute('style', 'display: none');
    newHighscore.textContent = `Current highscore: ${highscore}
    (Try again!)`;
  }
}

// Sets the difficulty (Easy/Hard)
function selectionOfDifficulty() {
  let display = document.querySelector('#display-difficulty');
  for (const option of selectDifficulty) {
    option.addEventListener('click', function () {
      if (option.getAttribute('value') === 'easy') {
        difficultyOfGame = 'easy';
        display.textContent = `Select difficulty: ${option.textContent}😎`;
      } else if (option.getAttribute('value') === 'hard') {
        difficultyOfGame = 'hard';
        display.textContent = `Select difficulty: ${option.textContent}😈`;
      }
    });
  }
}

// Functions and event listeners
startBtn.addEventListener('click', initGame);
targetHit();
selectionOfDifficulty();
