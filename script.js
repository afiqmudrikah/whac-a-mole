const grid = document.querySelectorAll('.grid');

function generateTarget() {
  const gridTarget = document.querySelectorAll('.grid');
  const randomNum = Math.floor(Math.random() * 2); // generates pseudo-random integer
  const newTarget = gridTarget[randomNum];
  newTarget.setAttribute('style', 'background-color: red');
  console.log(randomNum);
}

generateTarget();

function targetHit() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].addEventListener('click', function () {
      if (grid[i].hasAttribute('style', 'background-color: red')) {
        alert('Hit!');
      }
    });
  }
}

targetHit();
