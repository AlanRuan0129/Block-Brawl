import { RoomManager } from "../manager/RoomManager.js";
import { MessageToChat } from "./emit.js";

export function CreateRoomOn(socket) {
  socket.on("create-room", ({ name }, callback) => {
    let room = RoomManager.createRoom(socket, name);
    if (callback) {
      const roomStatus = room.toDto();
      callback(roomStatus);
    }
  });
}

export function JoinRoomOn(socket) {
  socket.on("join-room", ({ roomId, name }, callback) => {
    let room = RoomManager.joinRoom(socket, roomId, name);
    if (callback) {
      if (room) {
        const roomStatus = room.toDto();
        callback(roomStatus);
      } else {
        callback(null);
      }
    }
  });
}

// // Outside RoomManager class, in your socket event handlers
// export function JoinRoomOn(socket) {
//   socket.on("join-room", ({ roomId, name }, callback) => {
//     const result = RoomManager.joinRoom(socket, roomId, name);
//     if (result.error) {
//       // If there is an error, send it back through the callback
//       callback({ error: result.error });
//     } else if (result.room) {
//       // If a room object is returned, send its status back
//       callback(result.room.toDto());
//     } else {
//       // Handle any other cases (this shouldn't happen with the above logic)
//       callback({ error: "An unexpected error occurred." });
//     }
//   });
// }

export function StartGameOn(socket) {
  socket.on("start-game", ({ roomId }, callback) => {
    let isSuccess = RoomManager.startGame(roomId);
    if (callback) {
      callback(isSuccess);
    }
  });
}

export function PlayerReadyOn(socket) {
  socket.on("player-ready", ({ roomId, playerId, checkedColor }, callback) => {
    const isSuccess = RoomManager.playerReady(roomId, playerId, checkedColor);
    if (callback) {
      callback(isSuccess);
    }
  });
}

export function UpdateConfigOn(socket) {
  socket.on("update-config", ({ roomId, config }, callback) => {
    const isSuccess = RoomManager.updateConfig(roomId, config);
    if (callback) {
      callback(isSuccess);
    }
  });
}

export function BoardBreakOn(socket) {
  socket.on("break", ({ roomId, x, y }, callback) => {
    RoomManager.breakTile(roomId, x, y);
  });
}

export function BoardBreakOnOnly(socket) {
  socket.on("breakonly", ({ roomId, x, y }, callback) => {
    RoomManager.breakTileOnly(roomId, x, y);
  });
}

export function PlayerUnReadyOn(socket) {
  socket.on("player-unready", ({ roomId, playerId }) => {
    RoomManager.playerUnReady(roomId, playerId);
  });
}

export function OnRoomInformationRequest(socket) {
  socket.on("room-information", ({ roomId }, callback) => {
    if (callback) {
      callback(RoomManager.getRoomInformation(roomId));
    }
  });
}

export function BoardMovementOn(socket) {
  socket.on("movement", ({ roomId, x, y, direction }, callback) => {
    RoomManager.movePlayer(roomId, socket.id, x, y, direction);
  });
}

export function MessageOn(socket) {
  socket.on("send-message", ({ roomID, name, chatMessage }, callback) => {
    MessageToChat(roomID, name, chatMessage, "chat");
  });
}
