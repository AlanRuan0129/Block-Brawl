import { Socket } from "socket.io";
import { Player } from "../models/Player.js";
import { Room } from "../models/Room.js";
import { generateString } from "./util.js";
import { GameUpdate } from "../socket/emit.js";

let rooms = new Map();

export class RoomManager {
  static createRoom(socket, name) {
    const roomId = generateString(6);
    socket.join(roomId);

    const host = new Player(socket.id, name);
    const room = new Room(roomId, host);
    rooms.set(room.roomId, room);

    GameUpdate(roomId, room.toDto());
    return room;
  }

  static getRoom(roomId) {
    return rooms.get(roomId);
  }

  static playerReady(roomId, playerId, checkedColor) {
    let room = rooms.get(roomId);
    if (room) {
      let player = room.players.get(playerId);
      if (player && checkedColor !== null && !room.colorStatus[checkedColor]) {
        room.colorStatus[checkedColor] = playerId;
        player.colorId = checkedColor;
        player.isReady = true;
        GameUpdate(roomId, room.toDto());
        return true;
      } else {
        return false;
      }
    }
  }

  static updateConfig(roomId, config) {
    let room = rooms.get(roomId);
    if (room && config) {
      const { boardSize, roundTime, breakTime } = config;

      // Check all input parameters meet certain conditions
      if (isNaN(boardSize) || isNaN(roundTime) || isNaN(breakTime)) {
        return false;
      }
      // const newRoomSize = Number(roomSize);
      // if (newRoomSize < room.players.size) {
      //   return false;
      // }

      const newBoardSize = Number(boardSize);
      // if (!(newBoardSize >= 5 && newBoardSize <= 20)) {
      //   return false;
      // }

      // room.config.roomSize = newRoomSize;

      room.config.boardSize = newBoardSize;

      const newRoundTime = Number(roundTime);
      room.config.roundTime = newRoundTime;

      const newBreakTime = Number(breakTime);
      room.config.breakTime = newBreakTime;
    } else {
      return false;
    }
    GameUpdate(roomId, room.toDto());
    return true;
  }

  static startGame(roomId) {
    let room = rooms.get(roomId);

    if (room) {
      let players = [...room.players.values()];
      if (players.filter((p) => !p.isReady).length != 0) {
        return false;
      }
      room.isOpen = false;
      room.initBoard(room.config.boardSize);

      GameUpdate(roomId, room.toDto());
      return true;
    }
  }

  static joinRoom(socket, roomId, name) {
    const room = rooms.get(roomId);
    if (room && room.isOpen && room.players.size < room.config.roomSize) {
      socket.join(roomId);
      room.addPlayer(new Player(socket.id, name));
      const messageValue = name + " has joined the room!";
      GameUpdate(roomId, room.toDto());
      return room;
    } else {
      return null;
    }
  }

  static playerUnReady(roomId, playerId) {
    let room = rooms.get(roomId);
    if (room) {
      let player = room.players.get(playerId);
      if (player && player.isReady) {
        room.colorStatus[player.colorId] = null;
        player.colorId = null;
        player.isReady = false;
        GameUpdate(roomId, room.toDto());
      }
    }
  }

  static getRoomInformation(roomId) {
    let room = rooms.get(roomId);
    if (room) {
      return { ...room.toDto() };
    }
  }
}
