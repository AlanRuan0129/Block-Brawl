import { RoomManager } from "../manager/RoomManager.js";

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