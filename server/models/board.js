export class Board {
  constructor(level) {
    if (level === 1) {
      this.board = [
        [3, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 3],
        [11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12],
        [11, 1, 6, 0, 6, 1, 3, 1, 6, 0, 6, 1, 12],
        [11, 1, 9, 4, 9, 1, 1, 1, 9, 4, 9, 1, 12],
        [11, 1, 6, 0, 6, 1, 1, 1, 6, 0, 6, 1, 12],
        [11, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 12],
        [11, 1, 3, 1, 1, 6, 8, 6, 1, 1, 3, 1, 12],
        [11, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 12],
        [11, 1, 6, 0, 6, 1, 1, 1, 6, 0, 6, 1, 12],
        [11, 1, 9, 4, 9, 1, 1, 1, 9, 4, 9, 1, 12],
        [11, 1, 6, 0, 6, 1, 3, 1, 6, 0, 6, 1, 12],
        [11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12],
        [3, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 3],
      ];
    } else if (level === 2) {
      this.board = [
        [3, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 3],
        [11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12],
        [11, 1, 6, 7, 0, 3, 9, 0, 0, 9, 3, 0, 7, 6, 1, 12],
        [11, 1, 8, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 8, 1, 12],
        [11, 1, 0, 1, 7, 9, 6, 0, 0, 6, 9, 7, 1, 0, 1, 12],
        [11, 1, 3, 1, 9, 1, 1, 1, 1, 1, 1, 9, 1, 3, 1, 12],
        [11, 1, 0, 1, 3, 1, 6, 0, 0, 6, 1, 3, 1, 0, 1, 12],
        [11, 1, 9, 1, 0, 1, 0, 4, 4, 0, 1, 0, 1, 9, 1, 12],
        [11, 1, 9, 1, 0, 1, 0, 4, 4, 0, 1, 0, 1, 9, 1, 12],
        [11, 1, 0, 1, 3, 1, 6, 0, 0, 6, 1, 3, 1, 0, 1, 12],
        [11, 1, 3, 1, 9, 1, 1, 1, 1, 1, 1, 9, 1, 3, 1, 12],
        [11, 1, 0, 1, 7, 9, 6, 0, 0, 6, 9, 7, 1, 0, 1, 12],
        [11, 1, 8, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 8, 1, 12],
        [11, 1, 6, 7, 0, 3, 9, 0, 0, 9, 3, 0, 7, 6, 1, 12],
        [11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12],
        [3, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 3],
      ];
    } else {
      throw new Error("Invalid configuration specified");
    }
  }

  break(x, y) {
    if (this.board[x][y] === 1) {
      this.board[x][y] = 0;
    } else if (this.board[x][y] === 0) {
      this.board[x][y] = 1;
    } else if (this.board[x][y] === 4) {
      this.board[x][y] = 5;
    } else if (this.board[x][y] === 5) {
      this.board[x][y] = 4;
    }
  }

  breakOnly(x, y) {
    this.board[x][y] = 1;
  }

  // Method to get the value of a tile at (x, y).
  getTile(x, y) {
    if (x >= 0 && x < this.board.length && y >= 0 && y < this.board.length) {
      return this.board[x][y];
    } else {
      throw new Error(
        "Attempted to access a tile out of the board boundaries."
      );
    }
  }

  // Method to set the value of a tile at (x, y).
  setTile(x, y, value) {
    if (x >= 0 && x < this.board.length && y >= 0 && y < this.board.length) {
      this.board[x][y] = value;
    } else {
      throw new Error("Attempted to set a tile out of the board boundaries.");
    }
  }

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
