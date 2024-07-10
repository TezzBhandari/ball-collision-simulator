import { Ball } from "./ball";
import "./style.css";
import { checkForCollision } from "./utilities";
let ballArray: Array<Ball> = [];

const resetSimulation = () => {
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].remove();
  }
};

function initializeSimulation() {
  for (let i = 0; i < 6; i++) [ballArray.push(new Ball())];
}

function simulate() {
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].render();
    ballArray[i].moveBall();
  }

  for (let i = 0; i < ballArray.length; i++) {
    for (let j = i + 1; j < ballArray.length; j++) {
      const hasCollided = checkForCollision(ballArray[i], ballArray[j]);
      if (hasCollided) {
        ballArray[i].stopBall();
        ballArray[j].stopBall();
      }
    }
  }
  requestAnimationFrame(simulate);
}

const spawn = document.getElementById("spawn");
if (spawn === null) {
  throw new Error("spawn button doesnot exists");
}
spawn.addEventListener("click", (e) => {
  e.preventDefault();
  resetSimulation();
  const inputValue = document.getElementById("ball-input") as HTMLInputElement;
  const numberOfBall = parseInt(inputValue.value);
  ballArray = [];

  for (let i = 0; i < numberOfBall; i++) {
    ballArray.push(new Ball());
  }
});

initializeSimulation();
simulate();
