class Ball {
  private speed: number = 5;
  private velocityX: number = 0;
  private velocityY: number = 0;
  private X: number = 0;
  private Y: number = 0;
  private color: string = "#00b6d3";
  private size: number = 18;
  private upperBoundary: number = 0;
  private lowerBoundary: number = 600 - this.size;
  private leftBoundary: number = 0;
  private rightBoundary: number = 600 - this.size;

  private ball: HTMLDivElement = document.createElement("div");

  constructor() {
    const angle = Math.floor(Math.random() * (360 - 0 + 1)) + 0;
    this.velocityX = this.speed * Math.cos(angle);
    this.velocityY = this.speed * Math.sin(angle);
    this.X =
      Math.floor(Math.random() * (this.rightBoundary - this.leftBoundary + 1)) +
      this.leftBoundary;
    this.Y =
      Math.floor(
        Math.random() * (this.lowerBoundary - this.upperBoundary + 1)
      ) + this.upperBoundary;
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
    this.ball.style.left = `${this.X}px`;
    this.ball.style.top = `${this.Y}px`;
  }

  public render() {
    const simulationContainer = document.getElementById("simulation-container");
    if (simulationContainer === null) {
      throw new Error("simulation container missing");
    }
    this.ball.style.width = `${this.size}px`;
    this.ball.style.height = `${this.size}px`;
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
}

export { Ball };
