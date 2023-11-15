import { Socket } from "socket.io";
import { Player } from "../models/Player.js";
import { Room } from "../models/Room.js";
import { generateString } from "./util.js";
import { GameUpdate, GameTimeChanged, GameEnded } from "../socket/emit.js";

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
      //boardSize,
      const { level, roundTime, breakTime } = config;

      // Check all input parameters meet certain conditions isNaN(boardSize) ||
      if (isNaN(level) || isNaN(roundTime) || isNaN(breakTime)) {
        return false;
      }

      const newlevel = Number(level);

      room.config.level = newlevel;

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
      room.initPlayerPosition();
      room.initBoard(room.config.level);

      room.initTimer(
        () => {
          room.closeGame();

          let numSurvivor = 0;

          let breaker;
          room.players.forEach((player) => {
            player.isReady = false;
            if (player.isAlive && !player.isBreaker) {
              numSurvivor++;
            }
            if (player.isBreaker) {
              breaker = player;
            }
          });
          if (numSurvivor == 0) {
            breaker.score += room.players.size;
          }

          room.colorStatus = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ];

          GameEnded(roomId, room.toDto());
        },
        (time) => {
          room.checkIsAllPlayerDead();
          GameTimeChanged(roomId, time);
        }
      );

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

  static movePlayer(roomId, playerId, x, y, direction) {
    let room = rooms.get(roomId);
    if (room) {
      let player = room.players.get(playerId);
      if (player && room.board) {
        player.x = Number(x);
        player.y = Number(y);
        player.direction = direction;

        if (!player.isBreaker && room.board.getTile(player.x, player.y) === 4) {
          player.score++;
          room.board.setTile(player.x, player.y, 1);
        }

        GameUpdate(roomId, room.toDto());
        if (!room.checkPlayerAlive(playerId)) {
          this.playerDead(roomId, player);
        }
      }
    }
  }
  static playerDead(roomId, player) {
    const message = player.name + " is dead!";
  }

  static breakTile(roomId, x, y) {
    let room = rooms.get(roomId);
    if (room && room.board) {
      room.board.break(x, y);

      room.players.forEach((player, playerId) => {
        if (!room.checkPlayerAlive(playerId)) {
          this.playerDead(roomId, player);
        }
      });
      GameUpdate(roomId, room.toDto());
    }
  }

  static breakTileOnly(roomId, x, y) {
    let room = rooms.get(roomId);
    if (room && room.board) {
      room.board.breakOnly(x, y);

      room.players.forEach((player, playerId) => {
        if (!room.checkPlayerAlive(playerId)) {
          this.playerDead(roomId, player);
        }
      });
      GameUpdate(roomId, room.toDto());
    }
  }

  static getRoomInformation(roomId) {
    let room = rooms.get(roomId);
    if (room) {
      return { ...room.toDto() };
    }
  }
}
