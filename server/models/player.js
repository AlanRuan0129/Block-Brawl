import { Direction } from "./Direction.js";
export class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.colorId = null;
    this.isBreaker = false;
    this.isReady = false;
    this.x = 0;
    this.y = 0;
    this.direction = Direction.down;
    this.isAlive = true;
    this.score = 0;
  }

  toDto() {
    return {
      id: this.id,
      name: this.name,
      colorId: this.colorId,
      isBreaker: this.isBreaker,
      isReady: this.isReady,
      x: this.x,
      y: this.y,
      direction: this.direction,
      isAlive: this.isAlive,
      score: this.score,
    };
  }
}
