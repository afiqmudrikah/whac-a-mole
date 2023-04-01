const grid = document.querySelectorAll('.grid');
const displayPoints = document.querySelector('#points');
let startBtn = document.querySelector('#startBtn');
let points = 0;

let timer;
let movingTarget;
let currentTime;
const timeLimit = document.querySelector('#time-limit');

let gameOver;

// initialize game
function initGame() {
  for (const target of grid) {
    target.removeAttribute('style', 'background-color: red');
  }
  displayPoints.textContent = `Points: ${(points = 0)}`;
  movingTarget = setInterval(generateTarget, 2500);
  timer = setInterval(countdown, 1000);
  currentTime = 10;
  gameOver = false;
}

startBtn.addEventListener('click', initGame);

function generateTarget() {
  for (const target of grid) {
    target.removeAttribute('style', 'background-color: red');
  }
  const gridTarget = document.querySelectorAll('.grid');
  const randomNum = Math.floor(Math.random() * 8); // generates pseudo-random integer
  const newTarget = gridTarget[randomNum];
  newTarget.setAttribute('style', 'background-color: red');
}

function targetHit() {
  for (const target of grid) {
    target.addEventListener('click', function () {
      if (target.hasAttribute('style', 'background-color: red')) {
        points++;
        generateTarget();
        displayPoints.textContent = `Points: ${points}`;
      } else if (!gameOver) {
        points--; // penalty if user misclicks
        displayPoints.textContent = `Points: ${points}`;
      }
    });
  }
}
targetHit();

function countdown() {
  currentTime--;
  timeLimit.textContent = currentTime;

  if (currentTime === 0) {
    gameOver = true;
    clearInterval(timer);
    clearInterval(movingTarget);
    alert(`Game is over, your points is ${points}`);
    for (const target of grid) {
      target.removeAttribute('style', 'background-color: red');
    }
  }
}
