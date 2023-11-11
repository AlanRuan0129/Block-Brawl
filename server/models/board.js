export class Board {
  // constructor(size) {
  //   this.board = Array(size)
  //     .fill()
  //     .map(() => Array(size).fill(1));
  // }

  constructor(level) {
    if (level === 1) {
      this.board = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
      ];
    } else if (level === 2) {
      this.board = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ];
    } else {
      throw new Error("Invalid configuration specified");
    }
  }

  break(x, y) {
    // Toggle the state of the ice block: if it's intact (1), break it (set to 0);
    // if it's already broken (0), repair it (set back to 1).
    this.board[x][y] = this.board[x][y] === 1 ? 0 : 1;
  }

  breakOnly(x, y) {
    // Toggle the state of the ice block: if it's intact (1), break it (set to 0);
    // if it's already broken (0), repair it (set back to 1).
    this.board[x][y] = 1;
  }

  // check(x, y) {
  //   if (this.board[x][y] === 1) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  check(x, y) {
    if (this.board[x][y] === 3) {
      return false;
    } else {
      return true;
    }
  }

  toDto() {
    return this.board;
  }
}
