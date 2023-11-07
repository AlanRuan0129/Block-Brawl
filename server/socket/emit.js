import { getSocketIO } from "./index.js";

export function GameUpdate(roomId, gameState) {
  getSocketIO().to(roomId).emit("game-update", gameState); //roomID room.toDdo
}
