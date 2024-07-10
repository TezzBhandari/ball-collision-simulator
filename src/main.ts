import { Ball } from "./ball";
import "./style.css";
import { checkForCollision, getRandomInt, handleCollision } from "./utilities";
let ballArray: Array<Ball> = [];

function createBall() {
  const density = getRandomInt(50, 800);
  const x = getRandomInt(0, 600);
  const y = getRandomInt(0, 600);
  const radius = getRandomInt(6, 12);
  return new Ball(x, y, density, radius);
}

const resetSimulation = () => {
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].remove();
  }
  ballArray = [];
};

function initializeSimulation(n: number) {
  for (let i = 0; i < n; i++) {
    const ball = createBall();
    ball.render();
    ballArray.push(ball);
  }
}

function checkAndHandleCollision() {
  for (let i = 0; i < ballArray.length; i++) {
    for (let j = i + 1; j < ballArray.length; j++) {
      const hasCollided = checkForCollision(ballArray[i], ballArray[j]);
      if (hasCollided) {
        handleCollision(ballArray[i], ballArray[j]);
      }
    }
  }
}

function simulate() {
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].moveBall();
  }
  checkAndHandleCollision();
  requestAnimationFrame(simulate);
}

const spawn = document.getElementById("spawn");
if (spawn === null) {
  throw new Error("spawn button doesnot exists");
}
spawn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputValue = document.getElementById("ball-input") as HTMLInputElement;
  const numberOfBall = parseInt(inputValue.value);

  if (numberOfBall < 5 || numberOfBall > 100) {
    return;
  }

  resetSimulation();
  initializeSimulation(numberOfBall);
});

initializeSimulation(10);
simulate();
