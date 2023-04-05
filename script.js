const grid = document.querySelectorAll('.grid');
const displayPoints = document.querySelector('#points');
let startBtn = document.querySelector('#startBtn');
let points = 0;

let timer; // Game time countdown variable
let currentTime; // Initial game time at start
const timeLimit = document.querySelector('#time-limit');
timeLimit.textContent = `Time remaining: `;

let gameOver = true; // Game state variable
let highscore = 0;
const newHighscore = document.querySelector('#highscore');

let difficultyOfGame = 'easy'; // Default set to 'easy'
const selectDifficulty = document.querySelectorAll('.difficulty');

// Start screen
const startScreen = document.querySelector('#start-screen');

// Initialize game
function initGame() {
  currentTime = 10;
  clearGrid();
  displayPoints.textContent = `Points: ${(points = 0)}`;
  generateRandomInterval();
  timer = setInterval(countdown, 1000); // (set to 1sec per interval)
  gameOver = false;

  // Start screen
  startScreen.setAttribute('style', 'display:none');
}

startBtn.addEventListener('click', initGame);

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
    generateRandomTime = randomTime((min = 350), (max = 500));
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
targetHit();

// Function that runs down the game time
function countdown() {
  currentTime--;
  timeLimit.textContent = `Time remaining: ${currentTime}`;

  if (currentTime === 0) {
    gameOver = true;
    clearInterval(timer);
    alert(`Game is over, your points is ${points}`);
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
  if (points > highscore) {
    highscore = points;
    newHighscore.textContent = `Current highscore: ${highscore}
    You're AMAZING!`;
  } else if (points < highscore && highscore === 0) {
    newHighscore.textContent = `Current highscore: ${highscore}
    No points?`;
  } else {
    newHighscore.textContent = `Current highscore: ${highscore}
    Try again!`;
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
selectionOfDifficulty();
