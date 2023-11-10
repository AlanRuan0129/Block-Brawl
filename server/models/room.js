import { Board } from "./Board.js";
import { Player } from "./Player.js";
export class Room {
  constructor(roomId, host) {
    this.roomId = roomId;
    this.hostId = host.id;
    this.board = null;
    this.isOpen = true;
    this.players = new Map();
    this.players.set(host.id, host);
    host.isBreaker = true;

    this.config = {
      roomSize: 3,
      // boardSize: 9,
      level: 1,
      roundTime: 60,
      breakTime: 0.0,
      breakerName: host.name,
    };

    this.colors = ["#e0d1af", "#81a9db", "#ffd11a", "#f19cb7"];

    this.colorStatus = [null, null, null, null, null, null, null, null, null];
  }

  initBoard(level) {
    this.board = new Board(level);
  }

  addPlayer(player) {
    this.players.set(player.id, player);
  }

  getPlayer(id) {
    return this.players.get(id);
  }

  initPlayerPosition() {
    let i = 0;
    this.players.forEach((player, id) => {
      player.x = 0;
      player.y = i;
      i++;
    });
  }

  initTimer(onFinished, onTimerProceeded) {
    if (this.timer) {
      // ensure the previous timer is cleared before creating a new one
      clearInterval(this.timer);
    }
    if (this.config) {
      this.currentGameTime = this.config.roundTime; //seconds, and currently we allow the user to move within 20 seconds
    }
    const countDown = () => {
      onTimerProceeded(this.currentGameTime);
      this.currentGameTime--;
      if (this.currentGameTime < 0) {
        clearInterval(this.timer);
        onFinished();
      }
    };
    this.timer = setInterval(countDown, 1000);
  }

  closeGame() {
    this.isOpen = true;
    if (this.timer) {
      // ensure the previous timer is cleared before creating a new one
      clearInterval(this.timer);
    }
    if (this.board) {
      this.board = null;
    }
  }

  clearTimer() {
    clearInterval(this.timer);
  }

  checkPlayerAlive(playerId) {
    const player = this.getPlayer(playerId);
    if (
      player &&
      player.isAlive &&
      !player.isBreaker &&
      this.board &&
      !this.board.check(player.x, player.y)
    ) {
      player.isAlive = false;
      return false;
    } else {
      return true;
    }
  }

  checkIsAllPlayerDead() {
    const playersList = Array.from(this.players.values());
    let deadCount = playersList.filter((p) => !p.isAlive).length;
    if (deadCount == playersList.length - 1) {
      this.currentGameTime = 0;
    }
  }

  toDto() {
    let players = [];

    this.players.forEach((player, playerId) => {
      players.push({
        ...player.toDto(),
      });
    });

    if (this.isOpen) {
      return {
        roomId: this.roomId,
        hostId: this.hostId,
        players: players,
        board: this.board ? this.board.toDto() : null,
        config: this.config,
        colors: this.colors,
        colorStatus: this.colorStatus,
      };
    } else {
      return {
        roomId: this.roomId,
        hostId: this.hostId,
        board: this.board ? this.board.toDto() : null,
        players: players,
      };
    }
  }
}
