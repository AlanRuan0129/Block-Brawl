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

// export function playerMove(keyName, player, boardSize) {
//   if (keyName === W && player.x > 0) player.x--;
//   else if (keyName === S && player.x < boardSize - 1) player.x++;
//   else if (keyName === A && player.y > 0) player.y--;
//   else if (keyName === D && player.y < boardSize - 1) player.y++;
// }

export function playerMove(keyName, player, boardSize, board) {
  let newX = player.x;
  let newY = player.y;

  if (keyName === W) newX--;
  else if (keyName === S) newX++;
  else if (keyName === A) newY--;
  else if (keyName === D) newY++;

  // 确保新位置在board边界内
  if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
    // 如果新位置的ice不为0，则允许移动
    if (board[newX][newY] !== 0 && board[newX][newY] !== 5 && board[newX][newY] !== 6 && board[newX][newY] !== 7 && board[newX][newY] !== 8 && board[newX][newY] !== 9  && board[newX][newY] !== 11 && board[newX][newY] !== 12 && board[newX][newY] !== 13) {
      player.x = newX;
      player.y = newY;
    }
  }
}

// export function breakSetBlock(player, board, handleSetBreak) {
//   if (player.direction === "UP" && board[player.x - 1][player.y] === 1)
//     handleSetBreak(player.x - 1, player.y);
//   else if (player.direction === "DOWN" && board[player.x + 1][player.y] === 1)
//     handleSetBreak(player.x + 1, player.y);
//   else if (player.direction === "RIGHT" && board[player.x][player.y - 1] === 1)
//     handleSetBreak(player.x, player.y - 1);
//   else if (player.direction === "LEFT" && board[player.x][player.y + 1] === 1)
//     handleSetBreak(player.x, player.y + 1);
// }

export function breakSetBlock(player, board, handleBreak) {
  if (player.direction === "UP") handleBreak(player.x - 1, player.y);
  else if (player.direction === "DOWN") handleBreak(player.x + 1, player.y);
  else if (player.direction === "RIGHT") handleBreak(player.x, player.y - 1);
  else if (player.direction === "LEFT") handleBreak(player.x, player.y + 1);
}

// export function breakerMove(keyName, player, board) {
//   const boardSize = board.length;
//   if (keyName === W && player.x > 0 && board[player.x - 1][player.y] === 0)
//     player.x--;
//   else if (
//     keyName === S &&
//     player.x < boardSize - 1 &&
//     board[player.x + 1][player.y] === 0
//   )
//     player.x++;
//   else if (keyName === A && player.y > 0 && board[player.x][player.y - 1] === 0)
//     player.y--;
//   else if (
//     keyName === D &&
//     player.y < boardSize - 1 &&
//     board[player.x][player.y + 1] === 0
//   )
//     player.y++;
// }
