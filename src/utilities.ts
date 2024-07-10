import { Ball } from "./ball";

const distanceBetweenTwoBall = (ball1: Ball, ball2: Ball): number => {
  return Math.sqrt(
    Math.pow(ball2.getCenterX() - ball1.getCenterX(), 2) +
      Math.pow(ball2.getCenterY() - ball1.getCenterY(), 2)
  );
};

const checkForCollision = (ball1: Ball, ball2: Ball): boolean => {
  const d = distanceBetweenTwoBall(ball1, ball2);

  return d <= ball1.getRadius() + ball2.getRadius();
};

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const handleCollision = (ball1: Ball, ball2: Ball) => {
  const Vxa =
    ((ball1.getMass() - ball2.getMass()) * ball1.getVelocityX() +
      2 * ball2.getMass() * ball2.getVelocityX()) /
    (ball1.getMass() + ball2.getMass());

  const Vya =
    ((ball1.getMass() - ball2.getMass()) * ball1.getVelocityY() +
      2 * ball2.getMass() * ball2.getVelocityY()) /
    (ball1.getMass() + ball2.getMass());

  const Vxb =
    ((ball2.getMass() - ball1.getMass()) * ball2.getVelocityX() +
      2 * ball1.getMass() * ball1.getVelocityX()) /
    (ball1.getMass() + ball2.getMass());

  const Vyb =
    ((ball2.getMass() - ball1.getMass()) * ball2.getVelocityY() +
      2 * ball1.getMass() * ball1.getVelocityY()) /
    (ball1.getMass() + ball2.getMass());

  console.log("ball1: ", Vxa, Vya);
  console.log("ball2: ", Vxb, Vyb);
  // ball1.stopBall();
  // ball2.stopBall();

  ball1.updateVelocity(Vxa, Vya);
  ball2.updateVelocity(Vxb, Vyb);
  // ball1.updateBallPosition();
  // ball2.updateBallPosition();
};

const volumeOfSphere = (radius: number) => {
  return (4 / 3) * Math.PI * Math.pow(radius, 3);
};

const massOfSphere = (radius: number, density: number) => {
  const v = volumeOfSphere(radius);
  return v * density;
};

export {
  checkForCollision,
  distanceBetweenTwoBall,
  getRandomInt,
  handleCollision,
  volumeOfSphere,
  massOfSphere,
};
