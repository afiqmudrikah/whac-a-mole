const grid = document.querySelectorAll('.grid');
const displayPoints = document.querySelector('#points');
let startBtn = document.querySelector('#startBtn');
let points = 0;

let timer; // Game time countdown variable
let currentTime; // Initial game time at start
const timeLimit = document.querySelector('#time-limit');

let gameOver = true; // Game state variable
let highscore = 0;
const newHighscore = document.querySelector('#highscore');

let difficultyOfGame = 'easy'; // Default set to 'easy'
const selectDifficulty = document.querySelector('#select-difficulty');

// Initialize game
function initGame() {
  clearGrid();
  displayPoints.textContent = `Points: ${(points = 0)}`;
  generateRandomInterval();
  timer = setInterval(countdown, 1000); // (set to 1sec per interval)
  currentTime = 10;
  gameOver = false;
  selectDifficulty.setAttribute('disabled', '');

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
  newTarget.setAttribute('style', 'background-color: red');
}

// Generates a random time and calls generateTarget()
function generateRandomInterval(min = 1000, max = 2000) {
  let generateRandomTime = randomTime(min, max);
  if (difficultyOfGame === 'hard') {
    generateRandomTime = randomTime((min = 200), (max = 300));
    console.log('hard', generateRandomTime);
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
      if (target.hasAttribute('style', 'background-color: red')) {
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
    selectDifficulty.removeAttribute('disabled', '');
    for (const target of grid) {
      target.removeAttribute('style', 'background-color: red');
    }
  }
}

// Generates a random number within a specified range
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Clears the grid
function clearGrid() {
  for (const target of grid) {
    target.removeAttribute('style', 'background-color: red');
  }
}

// Checks for new highscore
function checkHighscore() {
  if (points > highscore) {
    highscore = points;
    newHighscore.textContent = `Current highscore: ${highscore}`;
  }
}

// Sets the difficulty (Easy/Hard)
function selectionOfDifficulty() {
  difficultyOfGame = document.querySelector('#select-difficulty').value;
  if (difficultyOfGame.includes('easy')) {
    console.log('easy mode');
    difficultyOfGame = 'easy';
  } else if (difficultyOfGame.includes('hard')) {
    console.log('hard mode');
    difficultyOfGame = 'hard';
  }
}

// Listens for option changes
selectDifficulty.addEventListener('change', selectionOfDifficulty);

// Start screen
const startScreen = document.querySelector('#start-screen');
