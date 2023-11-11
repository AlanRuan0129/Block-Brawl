export class Board {
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
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1],
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
    // this.board[x][y] = this.board[x][y] === 1 ? 0 : 1;
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
