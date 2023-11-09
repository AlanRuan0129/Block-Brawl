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

export function playerMove(keyName, player, boardSize) {
  if (keyName === W && player.x > 0) player.x--;
  else if (keyName === S && player.x < boardSize - 1) player.x++;
  else if (keyName === A && player.y > 0) player.y--;
  else if (keyName === D && player.y < boardSize - 1) player.y++;
}
