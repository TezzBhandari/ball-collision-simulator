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

export { checkForCollision, distanceBetweenTwoBall };
