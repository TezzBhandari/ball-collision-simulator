import { getRandomInt } from "./utilities";

const colorArray = ["#00b6d3", "red", "green", "magenta"];
class Ball {
  private speed: number = 4;
  private velocityX: number = 0;
  private velocityY: number = 0;
  private X: number = 0;
  private Y: number = 0;
  private density: number = 0;
  private color: string = "#00b6d3";
  private radius: number = 0;
  private centerX: number = this.X + this.radius;
  private centerY: number = this.Y + this.radius;
  private upperBoundary: number = 0;
  private lowerBoundary: number = 600 - this.radius * 2;
  private leftBoundary: number = 0;
  private rightBoundary: number = 600 - this.radius * 2;

  private ball: HTMLDivElement = document.createElement("div");

  constructor(x: number, y: number, density: number, radius: number) {
    this.density = density;
    this.radius = radius;
    this.upperBoundary = 0;
    this.lowerBoundary = 600 - this.radius * 2;
    this.leftBoundary = 0;
    this.rightBoundary = 600 - this.radius * 2;

    const angle = Math.floor(Math.random() * (360 - 0 + 1)) + 0;

    this.velocityX = this.speed * Math.cos(angle);
    this.velocityY = this.speed * Math.sin(angle);

    this.color = colorArray[getRandomInt(0, colorArray.length - 1)];
    this.X =
      Math.floor(Math.random() * (this.rightBoundary - this.leftBoundary + 1)) +
      this.leftBoundary;
    this.Y =
      Math.floor(
        Math.random() * (this.lowerBoundary - this.upperBoundary + 1)
      ) + this.upperBoundary;

    this.updateCenter();
  }

  public updateCenter() {
    this.centerX = this.X + this.radius;
    this.centerY = this.Y + this.radius;
  }

  public getCenterX() {
    return this.centerX;
  }

  public getCenterY() {
    return this.centerY;
  }

  public getRadius() {
    return this.radius;
  }

  public moveBall() {
    this.X += this.velocityX;
    this.Y += this.velocityY;

    if (this.X >= this.rightBoundary) {
      this.velocityX = -1 * this.velocityX;
      this.X = this.rightBoundary;
    } else if (this.X <= this.leftBoundary) {
      this.velocityX = -1 * this.velocityX;
      this.X = this.leftBoundary;
    } else if (this.Y >= this.lowerBoundary) {
      this.velocityY = -1 * this.velocityY;
      this.Y = this.lowerBoundary;
    } else if (this.Y <= this.upperBoundary) {
      this.velocityY = -1 * this.velocityY;
      this.Y = this.upperBoundary;
    }

    this.updateCenter();

    this.ball.style.left = `${this.X}px`;
    this.ball.style.top = `${this.Y}px`;
  }

  public render() {
    const simulationContainer = document.getElementById("simulation-container");
    if (simulationContainer === null) {
      throw new Error("simulation container missing");
    }
    this.ball.style.width = `${this.radius * 2}px`;
    this.ball.style.height = `${this.radius * 2}px`;
    this.ball.style.borderRadius = "50%";
    this.ball.style.position = "absolute";
    this.ball.style.top = `${this.X}px`;
    this.ball.style.left = `${this.Y}px`;
    this.ball.style.backgroundImage = `radial-gradient(
        circle at 65% 15%,
        #fff5ee 1%,
        ${this.color} 60%,
        ${this.color} 100%
      )`;
    simulationContainer.appendChild(this.ball);
  }

  public remove() {
    const simulationContainer = document.getElementById("simulation-container");
    simulationContainer?.removeChild(this.ball);
  }

  public stopBall() {
    this.velocityX = 0;
    this.velocityY = 0;
  }

  public getVolume() {
    return (4 / 3) * Math.PI * Math.pow(this.radius, 3);
  }

  public getMass() {
    return this.getVolume() * this.density;
  }

  public getDensity() {
    return this.density;
  }

  public updateVelocity(Vx: number, Vy: number) {
    this.velocityX = Vx;
    this.velocityY = Vy;
  }

  public getVelocityX() {
    return this.velocityX;
  }

  public getVelocityY() {
    return this.velocityY;
  }
}

export { Ball };
