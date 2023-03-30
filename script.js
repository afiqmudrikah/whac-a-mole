const grid = document.querySelectorAll('.grid');
const displayPoints = document.querySelector('#points');
let startBtn = document.querySelector('#startBtn');
let points = 0;

// initialize game
function initGame() {
  for (const target of grid) {
    target.removeAttribute('style', 'background-color: red');
  }
  displayPoints.textContent = `Points: ${(points = 0)}`;
  setInterval(generateTarget, 5000);
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
  for (let i = 0; i < grid.length; i++) {
    grid[i].addEventListener('click', function () {
      if (grid[i].hasAttribute('style', 'background-color: red')) {
        // alert('Hit!');
        points++;
        generateTarget();
        displayPoints.textContent = `Points: ${points}`;
      } else {
        points--; // penalty if user misclicks
        generateTarget();
        displayPoints.textContent = `Points: ${points}`;
      }
    });
  }
}
targetHit();
