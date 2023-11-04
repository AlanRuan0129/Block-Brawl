import { Socket } from "socket.io";
import { Player } from "../models/Player.js";
import { Room } from "../models/Room.js";
import { generateString } from "./util.js";

let rooms = new Map();

export class RoomManager {
  static createRoom(socket, name) {
    const roomId = generateString(6);
    socket.join(roomId);

    const host = new Player(socket.id, name);
    const room = new Room(roomId, host);
    rooms.set(room.roomId, room);
    room.toDto();
    // GameUpdate(roomId, room.toDto());
    return room;
  }

  static getRoom(roomId) {
    return rooms.get(roomId);
  }

  static joinRoom(socket, roomId, name) {
    const room = rooms.get(roomId);
    if (room && room.isOpen && room.players.size < room.config.roomSize) {
      socket.join(roomId);
      room.addPlayer(new Player(socket.id, name));
      const messageValue = name + " has joined the room!";
      room.toDto();
      return room;
    } else {
      return null;
    }
  }
}
