const W = "ArrowUp";
const S = "ArrowDown";
const A = "ArrowLeft";
const D = "ArrowRight";

export function changeDirection(player, keyName) {
  if (keyName === W) player.direction = "UP";
  else if (keyName === S) player.direction = "DOWN";
  else if (keyName === A) player.direction = "RIGHT";
  else if (keyName === D) player.direction = "LEFT";
}

export function playerMove(keyName, player, boardSize, board) {
  let newX = player.x;
  let newY = player.y;

  if (keyName === W) newX--;
  else if (keyName === S) newX++;
  else if (keyName === A) newY--;
  else if (keyName === D) newY++;

  if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
    if (
      board[newX][newY] !== 0 &&
      board[newX][newY] !== 5 &&
      board[newX][newY] !== 6 &&
      board[newX][newY] !== 7 &&
      board[newX][newY] !== 8 &&
      board[newX][newY] !== 9 &&
      board[newX][newY] !== 11 &&
      board[newX][newY] !== 12 &&
      board[newX][newY] !== 13
    ) {
      player.x = newX;
      player.y = newY;
    }
  }
}

export function breakSetBlock(player, board, handleBreak) {
  if (player.direction === "UP") handleBreak(player.x - 1, player.y);
  else if (player.direction === "DOWN") handleBreak(player.x + 1, player.y);
  else if (player.direction === "RIGHT") handleBreak(player.x, player.y - 1);
  else if (player.direction === "LEFT") handleBreak(player.x, player.y + 1);
}
