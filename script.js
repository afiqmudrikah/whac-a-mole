const grid = document.querySelectorAll('.grid');
const displayPoints = document.querySelector('#points');
let startBtn = document.querySelector('#startBtn');
let points = 0;

let timer; // Game time countdown variable
let currentTime; // Initial game time at start
const timeLimit = document.querySelector('#time-limit');

let gameOver; // Game state variable

// Initialize game
function initGame() {
  clearGrid();
  displayPoints.textContent = `Points: ${(points = 0)}`;
  generateRandomInterval();
  timer = setInterval(countdown, 1000); // (set to 1sec per interval)
  currentTime = 10;
  gameOver = false;
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
function generateRandomInterval() {
  let generateRandomTime = randomTime(500, 2000);
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
  timeLimit.textContent = currentTime;

  if (currentTime === 0) {
    gameOver = true;
    clearInterval(timer);
    alert(`Game is over, your points is ${points}`);
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
