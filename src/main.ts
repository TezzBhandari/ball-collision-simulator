import { Ball } from "./ball";
import "./style.css";
let ballArray: Array<Ball> = [];

const resetSimulation = () => {
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].remove();
  }
};

function initializeSimulation() {
  for (let i = 0; i < 4; i++) [ballArray.push(new Ball())];
}

function simulate() {
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].render();
    ballArray[i].moveBall();
  }
}

initializeSimulation();
let intervalId = setInterval(simulate, 40);

const spawn = document.getElementById("spawn");
spawn?.addEventListener("click", (e) => {
  e.preventDefault();
  resetSimulation();
  const inputValue = document.getElementById("ball-input") as HTMLInputElement;
  const numberOfBall = parseInt(inputValue.value);
  ballArray = [];
  clearInterval(intervalId);

  for (let i = 0; i < numberOfBall; i++) {
    ballArray.push(new Ball());
  }
  intervalId = setInterval(simulate, 40);
});
