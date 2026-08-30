export const checkCollision = (rect1, rect2) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};

export const checkCircleCollision = (circle, rect) => {
  const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

  const dx = circle.x - closestX;
  const dy = circle.y - closestY;

  return dx * dx + dy * dy < circle.radius * circle.radius;
};

export const resolveCollision = (obj1, obj2) => {
  const overlapX = Math.min(
    obj1.x + obj1.width - obj2.x,
    obj2.x + obj2.width - obj1.x
  );
  const overlapY = Math.min(
    obj1.y + obj1.height - obj2.y,
    obj2.y + obj2.height - obj1.y
  );

  if (overlapX < overlapY) {
    // Push apart horizontally
    if (obj1.x < obj2.x) {
      obj1.x -= overlapX / 2;
      obj2.x += overlapX / 2;
    } else {
      obj1.x += overlapX / 2;
      obj2.x -= overlapX / 2;
    }
  } else {
    // Push apart vertically
    if (obj1.y < obj2.y) {
      obj1.y -= overlapY / 2;
      obj2.y += overlapY / 2;
    } else {
      obj1.y += overlapY / 2;
      obj2.y -= overlapY / 2;
    }
  }
};
