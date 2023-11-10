import { getSocketIO } from "./index.js";

export function GameUpdate(roomId, gameState) {
  getSocketIO().to(roomId).emit("game-update", gameState); //roomID room.toDdo
}

export function RoomClosed(roomId) {
  getSocketIO().to(roomId).emit("room-closed");
}

export function GameEnded(roomId, gameState) {
  getSocketIO().to(roomId).emit("game-end", gameState);
}

export function GameTimeChanged(roomId, time) {
  getSocketIO().to(roomId).emit("game-time-changed", time);
}
