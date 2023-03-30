const grid = document.querySelectorAll('.grid');

let points = 0;

function generateTarget() {
  for (const target of grid) {
    target.removeAttribute('style', 'background-color: red');
  }
  const gridTarget = document.querySelectorAll('.grid');
  const randomNum = Math.floor(Math.random() * 8); // generates pseudo-random integer
  const newTarget = gridTarget[randomNum];
  newTarget.setAttribute('style', 'background-color: red');
  // console.log(randomNum);
}

function targetHit() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].addEventListener('click', function () {
      if (grid[i].hasAttribute('style', 'background-color: red')) {
        alert('Hit!');
        points++;
        generateTarget();
        console.log(points);
      }
    });
  }
}

targetHit();

setInterval(generateTarget, 1000);
